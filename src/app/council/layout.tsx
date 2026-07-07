import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Council",
  description: "Meet the MLRIT CIE student council — the team of passionate innovators, designers, developers, and leaders driving CIE forward.",
  openGraph: {
    title: "Council | MLRIT CIE",
    description: "Meet the MLRIT CIE student council — the team of passionate innovators, designers, developers, and leaders driving CIE forward.",
    url: "https://mlritcie.in/council",
  },
};

export default function CouncilLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
