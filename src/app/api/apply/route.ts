import { NextRequest, NextResponse } from "next/server";
import { isDeptKey, type DeptKey } from "@/lib/departments";
import { branchNeedsSection } from "@/lib/branches";
import { getQuestionsForDept, getMinorQuestionsForDept } from "@/lib/questions";
import { appendResponseAndGetCandidateId } from "@/lib/googleSheet";
import { isQuestionActive, type ApplyPayload, type IntroForm } from "@/types/apply";

export const runtime = "nodejs";

// In-memory, per-instance only — a placeholder guard against accidental double-submits
// and naive bots. On Cloudflare Workers a single isolate can stay warm across thousands
// of requests, so this map must actively evict stale/empty entries and cap growth —
// otherwise a spoofed x-forwarded-for header (client-controlled) or a stuck retry loop
// grows it unbounded until the isolate hits its memory ceiling and Cloudflare kills it
// (Error 1102) for whatever request happens to be in flight at the time.
// Swap for Upstash-backed rate limiting if abuse becomes real.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_TRACKED_IPS = 5000;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);

  if (timestamps.length > 0) {
    // Cap so a single IP hammering the endpoint can't grow its array forever —
    // we only ever need to know it's over the limit, not by how much.
    hits.set(ip, timestamps.slice(-(MAX_REQUESTS + 1)));
  } else {
    hits.delete(ip);
  }

  // Safety valve against unbounded distinct-key growth (e.g. spoofed IPs) —
  // this is a best-effort rate limiter, so a full reset under memory pressure is fine.
  if (hits.size > MAX_TRACKED_IPS) hits.clear();

  return timestamps.length > MAX_REQUESTS;
}

function validateIntro(intro: Partial<IntroForm> | undefined): Record<string, string> {
  const errors: Record<string, string> = {};
  const i = intro ?? ({} as Partial<IntroForm>);
  if (!i.name?.trim()) errors.name = "Full name is required";
  if (!i.rollNo?.trim()) errors.rollNo = "Roll number is required";
  if (!/^\d{10}$/.test((i.phone ?? "").trim())) errors.phone = "Enter a valid 10-digit number";
  if (!(i.email ?? "").includes("@")) errors.email = "Enter a valid email address";
  if (!i.branch) errors.branch = "Please select your branch";
  if (i.branch && branchNeedsSection(i.branch) && !i.section) errors.section = "Please select your section";
  if (!i.year) errors.year = "Please select your year";
  const cgpa = parseFloat(i.cgpa ?? "");
  if (!i.cgpa?.trim()) errors.cgpa = "CGPA is required";
  else if (Number.isNaN(cgpa) || cgpa < 0 || cgpa > 10) errors.cgpa = "Enter a CGPA between 0 and 10";
  if (!i.backlogs?.trim()) errors.backlogs = "Number of backlogs is required";
  else if (!/^\d+$/.test(i.backlogs.trim())) errors.backlogs = "Enter a valid number";
  if ((i.aboutYourself ?? "").trim().length < 20) errors.aboutYourself = "Please write at least 20 characters";
  return errors;
}

async function validateDeptAnswers(
  dept: DeptKey,
  answers: Record<string, string | string[]> | undefined,
  isMinor = false
): Promise<Record<string, string>> {
  const questions = isMinor ? await getMinorQuestionsForDept(dept) : await getQuestionsForDept(dept);
  const errors: Record<string, string> = {};
  for (const q of questions) {
    if (!isQuestionActive(q, answers ?? {})) continue;
    const val = answers?.[q.id];
    const str = Array.isArray(val) ? val.join(",") : (val ?? "").toString();
    if (q.required && !str.trim()) errors[q.id] = `${q.label} is required`;
    else if (q.minLength && str.trim().length < q.minLength) errors[q.id] = `Please write at least ${q.minLength} characters`;
  }
  return errors;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many submissions, try again later" }, { status: 429 });
  }

  let body: ApplyPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (body.honeypot) {
    // Bot tripped the hidden field — pretend success without writing anything.
    return NextResponse.json({ candidateId: "" }, { status: 201 });
  }

  const { intro, major, minor } = body;

  if (!major?.dept || !minor?.dept || !isDeptKey(major.dept) || !isDeptKey(minor.dept)) {
    return NextResponse.json(
      { error: "Validation failed", fields: { major: "Invalid department" } },
      { status: 422 }
    );
  }
  if (major.dept === minor.dept) {
    return NextResponse.json(
      { error: "Validation failed", fields: { minor: "Major and minor must be different" } },
      { status: 422 }
    );
  }

  const introErrors = validateIntro(intro);
  const [majorErrors, minorErrors] = await Promise.all([
    validateDeptAnswers(major.dept, major.answers),
    validateDeptAnswers(minor.dept, minor.answers, true),
  ]);

  const fields = { ...introErrors, ...majorErrors, ...minorErrors };
  if (Object.keys(fields).length > 0) {
    return NextResponse.json({ error: "Validation failed", fields }, { status: 422 });
  }

  try {
    const candidateId = await appendResponseAndGetCandidateId(body);
    return NextResponse.json({ candidateId }, { status: 201 });
  } catch (err) {
    console.error("Failed to save application", err);
    return NextResponse.json({ error: "Could not save your application, please retry" }, { status: 500 });
  }
}
