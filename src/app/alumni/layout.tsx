import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alumni",
  description: "Hear from MLRIT CIE alumni who've gone on to build products, lead teams, and launch startups. Real stories from real people.",
  openGraph: {
    title: "Alumni | MLRIT CIE",
    description: "Hear from MLRIT CIE alumni who've gone on to build products, lead teams, and launch startups. Real stories from real people.",
    url: "https://mlritcie.in/alumni",
  },
};

export default function AlumniLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
