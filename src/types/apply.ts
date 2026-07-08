import type { DeptKey } from "@/lib/departments";

export type QuestionType = "text" | "textarea" | "select" | "radio" | "checkbox";

export type Question = {
  id: string;
  label: string;
  type: QuestionType;
  options: string[];
  required: boolean;
  minLength?: number;
  order: number;
  code?: string;
  codeLang?: string;
  // Only show this question when the referenced question's answer includes one of these values.
  showIf?: { id: string; includesAny: string[] };
};

export type IntroForm = {
  name: string;
  rollNo: string;
  phone: string;
  email: string;
  branch: string;
  section: string;
  year: string;
  cgpa: string;
  backlogs: string;
  aboutYourself: string;
};

export type ApplyPayload = {
  intro: IntroForm;
  major: { dept: DeptKey; answers: Record<string, string | string[]> };
  minor: { dept: DeptKey; answers: Record<string, string | string[]> };
  honeypot?: string;
};

export type ApplyResponse = { candidateId: string } | { error: string; fields?: Record<string, string> };

export type QuestionsResponse = { dept: DeptKey; deptName: string; questions: Question[] } | { error: string };
