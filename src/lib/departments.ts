import { Code, FileText, PenLine, Palette, Camera, Mic, BarChart2, type LucideIcon } from "lucide-react";

const DEPT_KEYS = ["tech", "content", "creative", "gd", "photography", "ps", "ops"] as const;
export type DeptKey = (typeof DEPT_KEYS)[number];

export type Department = {
  key: DeptKey;
  name: string;
  tagline: string;
  desc: string;
  color: string;
  icon: LucideIcon;
  lookingFor: string;
};

export const DEPARTMENTS: Department[] = [
  {
    key: "tech",
    name: "Technical & Product Development",
    tagline: "Build products that thousands of students use.",
    desc: "Build CIE's digital products — websites, tools, AI experiments.",
    color: "#4A7CDB",
    icon: Code,
    lookingFor: "Problem-solvers who love building things.",
  },
  {
    key: "content",
    name: "Content Writing",
    tagline: "Tell stories that make people care.",
    desc: "Write blog posts, event recaps, newsletters, and long-form stories.",
    color: "#CCBA11",
    icon: FileText,
    lookingFor: "Storytellers who make ideas land.",
  },
  {
    key: "creative",
    name: "Creative",
    tagline: "Shape the ideas that define CIE.",
    desc: "Drive CIE's brand direction — campaigns, themes, visual identity.",
    color: "#BE5BFA",
    icon: PenLine,
    lookingFor: "Big-picture thinkers with an eye for detail.",
  },
  {
    key: "gd",
    name: "Graphic Design",
    tagline: "Make people stop scrolling.",
    desc: "Design posters, decks, social assets, and motion content.",
    color: "#68DEF8",
    icon: Palette,
    lookingFor: "Designers who make people stop scrolling.",
  },
  {
    key: "photography",
    name: "Photography and Media",
    tagline: "Capture every moment of the CIE journey.",
    desc: "Capture every CIE moment — photography, video, post-production.",
    color: "#FA7712",
    icon: Camera,
    lookingFor: "Visual storytellers with a sharp eye.",
  },
  {
    key: "ps",
    name: "Promotions & Sponsorship",
    tagline: "Own the room. Represent CIE everywhere.",
    desc: "Anchor events, run workshops, and handle PR & outreach.",
    color: "#D01010",
    icon: Mic,
    lookingFor: "Confident communicators who own the room.",
  },
  {
    key: "ops",
    name: "Event Management",
    tagline: "Keep everything running, flawlessly.",
    desc: "From planning to execution, streamline permissions, budgets, logistics, and vendor coordination for successful events.",
    color: "#22C55E",
    icon: BarChart2,
    lookingFor: "Executors who thrive on making things happen.",
  },
];

export const DEPARTMENT_MAP: Record<DeptKey, Department> = Object.fromEntries(
  DEPARTMENTS.map((d) => [d.key, d])
) as Record<DeptKey, Department>;

// DEPARTMENT_MAP's completeness can't be checked at compile time (it's built from
// a runtime array), so verify it here — a dropped/renamed DEPARTMENTS entry would
// otherwise silently produce a map typed as complete but missing a key.
if (process.env.NODE_ENV !== "production") {
  const missing = DEPT_KEYS.filter((k) => !DEPARTMENT_MAP[k]);
  if (missing.length) {
    throw new Error(`DEPARTMENT_MAP is missing entries for: ${missing.join(", ")}`);
  }
}

export const DEPARTMENT_KEYS: DeptKey[] = [...DEPT_KEYS];

export function isDeptKey(key: string): key is DeptKey {
  return (DEPT_KEYS as readonly string[]).includes(key);
}
