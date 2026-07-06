export const BRANCHES = ["CSE", "CSM", "CSD", "EEE", "ECE", "MECH", "AERO"];

// Branches with an empty array have only one section — no picker needed.
export const SECTIONS_BY_BRANCH: Record<string, string[]> = {
  CSE: ["A", "B", "C", "D", "E", "F", "G"],
  CSD: ["A", "B", "C"],
  CSM: ["A", "B", "C"],
  ECE: ["A", "B"],
  EEE: [],
  MECH: [],
  AERO: [],
};

export function branchNeedsSection(branch: string): boolean {
  return (SECTIONS_BY_BRANCH[branch] ?? []).length > 0;
}
