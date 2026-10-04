import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

// Contact form → Google Apps Script web app (scripts/contact-sheet.gs), which
// appends the message as a row in the CIE contact Google Sheet.

const LIMITS = { name: 100, email: 200, subject: 150, message: 5000 };

// Same best-effort, per-isolate guard as the old /api/apply route: evicts stale
// entries and caps growth so a warm Worker isolate can't run out of memory.
// Campus WiFi shares one NAT IP, so keep the cap generous.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 8;
const MAX_TRACKED_IPS = 5000;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  hits.set(ip, timestamps.slice(-(MAX_REQUESTS + 1)));
  if (hits.size > MAX_TRACKED_IPS) hits.clear();
  return timestamps.length > MAX_REQUESTS;
}

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  website?: string; // honeypot
};

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many messages, please try again in a few minutes." }, { status: 429 });
  }

  let body: ContactPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Bot filled the hidden field — pretend success without sending anything.
  if (body.website) return NextResponse.json({ ok: true });

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const subject = (body.subject ?? "").trim();
  const message = (body.message ?? "").trim();

  const fields: Record<string, string> = {};
  if (!name) fields.name = "Name is required.";
  else if (name.length > LIMITS.name) fields.name = `Keep it under ${LIMITS.name} characters.`;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > LIMITS.email) fields.email = "Enter a valid email address.";
  if (!subject) fields.subject = "Subject is required.";
  else if (subject.length > LIMITS.subject) fields.subject = `Keep it under ${LIMITS.subject} characters.`;
  if (!message) fields.message = "Message is required.";
  else if (message.length > LIMITS.message) fields.message = `Keep it under ${LIMITS.message} characters.`;
  if (Object.keys(fields).length > 0) {
    return NextResponse.json({ error: "Validation failed", fields }, { status: 422 });
  }

  const url = process.env.CONTACT_WEBAPP_URL;
  const secret = process.env.CONTACT_WEBAPP_SECRET;
  if (!url || !secret) {
    console.error("CONTACT_WEBAPP_URL / CONTACT_WEBAPP_SECRET is not configured");
    return NextResponse.json({ error: "Contact form is not set up yet. Please email us directly." }, { status: 500 });
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        name,
        email,
        subject,
        message,
        sentAt: new Date().toISOString(),
      }),
    });
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
    if (!res.ok || !data.ok) throw new Error(data.error || `Apps Script responded with ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to send contact message", err);
    return NextResponse.json({ error: "Could not send your message. Please try again or email us directly." }, { status: 502 });
  }
}
