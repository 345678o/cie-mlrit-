import { randomBytes } from "crypto";
import { DEPARTMENT_MAP, type DeptKey } from "@/lib/departments";
import { QUESTIONS_DATA } from "@/lib/questions-data";
import type { ApplyPayload, ApplyResponse } from "@/types/apply";

// Matches the tab names already created in the recruitment sheet — each department
// gets its own tab, so a row only carries that dept's own question columns.
const SHEET_TAB_NAMES: Record<DeptKey, string> = {
  tech: "Technical",
  content: "Content",
  creative: "Creative",
  gd: "Graphic Design",
  photography: "photography",
  ps: "Promotions & Sponsorship (P&S)",
  ops: "Operations & Finance (Ops)",
};

// Minor questions are generic (fixed ids, dept name only changes inside the label).
const MINOR_QUESTION_COLUMNS = [
  { id: "minor_q1", label: "Minor — Why did you choose this as your Minor Preference?" },
  { id: "minor_q2", label: "Minor — Fit for this dept if Major is unavailable" },
  { id: "minor_q3", label: "Minor — Relevant skills for this dept" },
];

function answerToString(val: string | string[] | undefined): string {
  return Array.isArray(val) ? val.join(", ") : (val ?? "").toString();
}

// A row-count-based counter (e.g. "next number = current rows + 1") races when two
// submissions land close together and can hand out the same id. A high-entropy
// suffix needs no shared counter/locking, so collisions are practically impossible
// even under concurrent submissions.
function generateCandidateId(prefix: string): string {
  return `${prefix}-${randomBytes(4).toString("hex").toUpperCase()}`;
}

export async function appendResponseAndGetCandidateId(payload: ApplyPayload): Promise<string> {
  const url = process.env.GOOGLE_SHEETS_WEBAPP_URL;
  const secret = process.env.GOOGLE_SHEETS_WEBAPP_SECRET;
  if (!url || !secret) {
    throw new Error("GOOGLE_SHEETS_WEBAPP_URL / GOOGLE_SHEETS_WEBAPP_SECRET is not configured");
  }

  const { intro, major, minor } = payload;
  const candidateId = generateCandidateId(process.env.CANDIDATE_ID_PREFIX || "CIE26");
  const majorQuestions = QUESTIONS_DATA[major.dept] ?? [];
  const majorAnswerCells = majorQuestions.map((q) => answerToString(major.answers[q.id]));
  const minorAnswerCells = MINOR_QUESTION_COLUMNS.map((c) => answerToString(minor.answers[c.id]));

  // Timestamp, CandidateId, Name, Minor Department are the only columns frozen for
  // context while scrolling — keep them first and narrow so the frozen pane stays small.
  const header = [
    "Timestamp", "CandidateId", "Name", "Minor Department",
    "RollNo", "Phone", "Email", "Branch", "Section", "Year", "CGPA", "Backlogs", "AboutYourself",
    ...MINOR_QUESTION_COLUMNS.map((c) => c.label),
    ...majorQuestions.map((q) => q.label),
    "Status", "Notes",
  ];

  const row = [
    new Date().toISOString(),
    candidateId,
    intro.name,
    DEPARTMENT_MAP[minor.dept]?.name ?? minor.dept,
    intro.rollNo,
    intro.phone,
    intro.email,
    intro.branch,
    intro.section,
    intro.year,
    intro.cgpa,
    intro.backlogs,
    intro.aboutYourself,
    ...minorAnswerCells,
    ...majorAnswerCells,
    "", // Status — admin fills manually
    "", // Notes — admin fills manually
  ];

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret,
      sheetName: SHEET_TAB_NAMES[major.dept],
      deptColor: DEPARTMENT_MAP[major.dept]?.color,
      candidateId,
      header,
      row,
    }),
  });

  const data = (await res.json().catch(() => ({}))) as ApplyResponse | Record<string, never>;
  if (!res.ok || "error" in data) {
    const message = "error" in data ? data.error : undefined;
    throw new Error(message || `Google Sheets webapp responded with ${res.status}`);
  }
  // The id is ours (generated above), not whatever the Apps Script echoes back —
  // this is what guarantees uniqueness without relying on its internal counter.
  return candidateId;
}
