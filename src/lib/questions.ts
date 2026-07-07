import { DEPARTMENT_MAP, type DeptKey } from "@/lib/departments";
import type { Question } from "@/types/apply";
import { QUESTIONS_DATA } from "@/lib/questions-data";

export async function getQuestionsForDept(dept: DeptKey): Promise<Question[]> {
  return QUESTIONS_DATA[dept] ?? [];
}

export async function getMinorQuestionsForDept(dept: DeptKey): Promise<Question[]> {
  const deptName = DEPARTMENT_MAP[dept]?.name ?? dept;
  return [
    { id: "minor_q1", label: `Why did you choose ${deptName} as your Minor Preference?`, type: "textarea", options: [], required: true, order: 1 },
    { id: "minor_q2", label: `If your Major Department is unavailable, why would you still be a good fit for ${deptName}? Mention any one skill which makes you a good fit for this department.`, type: "textarea", options: [], required: true, order: 2 },
    { id: "minor_q3", label: `What relevant skills do you have for ${deptName}?`, type: "textarea", options: [], required: true, order: 3 },
  ];
}
