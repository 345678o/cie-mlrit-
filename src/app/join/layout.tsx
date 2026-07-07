import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join",
  description: "Join MLRIT CIE — we're hiring passionate students to drive innovation, build communities, and create real impact at MLRIT.",
  openGraph: {
    title: "Join | MLRIT CIE",
    description: "Join MLRIT CIE — we're hiring passionate students to drive innovation, build communities, and create real impact at MLRIT.",
    url: "https://mlritcie.in/join",
  },
};

export default function JoinLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
