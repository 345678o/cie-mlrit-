import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studios",
  description: "MLRIT CIE Studios — a creative production space for content, design, and media. Podcast booths, camera gear, editing suites, and more.",
  openGraph: {
    title: "Studios | MLRIT CIE",
    description: "MLRIT CIE Studios — a creative production space for content, design, and media. Podcast booths, camera gear, editing suites, and more.",
    url: "https://cie.mlrit.ac.in/studios",
  },
};

export default function StudiosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
