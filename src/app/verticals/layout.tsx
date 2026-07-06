import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verticals",
  description: "Explore CIE MLRIT's verticals — Media & PR, Studios, Product Development, Startup Cohort, Events, and Inventory — driving student innovation across disciplines.",
  openGraph: {
    title: "Verticals | MLRIT CIE",
    description: "Explore CIE MLRIT's verticals — Media & PR, Studios, Product Development, Startup Cohort, Events, and Inventory — driving student innovation across disciplines.",
    url: "https://cie.mlrit.ac.in/verticals",
  },
};

export default function VerticalsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
