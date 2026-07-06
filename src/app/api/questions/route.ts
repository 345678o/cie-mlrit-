import { NextRequest, NextResponse } from "next/server";
import { isDeptKey, DEPARTMENT_MAP } from "@/lib/departments";
import { getQuestionsForDept, getMinorQuestionsForDept } from "@/lib/questions";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const dept = req.nextUrl.searchParams.get("dept") ?? "";
  const role = req.nextUrl.searchParams.get("role") ?? "";

  if (!isDeptKey(dept)) {
    return NextResponse.json({ error: "Unknown department" }, { status: 400 });
  }

  const questions = role === "minor" ? await getMinorQuestionsForDept(dept) : await getQuestionsForDept(dept);

  return NextResponse.json(
    { dept, deptName: DEPARTMENT_MAP[dept].name, questions },
    { headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=240" } }
  );
}
