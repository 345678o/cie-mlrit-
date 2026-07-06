import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply",
  description: "Submit your application to join MLRIT CIE — pick your major and minor department and tell us why you're a fit.",
  openGraph: {
    title: "Apply | MLRIT CIE",
    description: "Submit your application to join MLRIT CIE — pick your major and minor department and tell us why you're a fit.",
    url: "https://cie.mlrit.ac.in/join/apply",
  },
  robots: { index: false, follow: true },
};

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
