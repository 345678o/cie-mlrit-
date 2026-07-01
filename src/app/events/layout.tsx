import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
  description: "Explore MLRIT CIE events — hackathons, workshops, e-summits, and innovation challenges. 100+ events, 3000+ participants.",
  openGraph: {
    title: "Events | MLRIT CIE",
    description: "Explore MLRIT CIE events — hackathons, workshops, e-summits, and innovation challenges. 100+ events, 3000+ participants.",
    url: "https://cie.mlrit.ac.in/events",
    images: [{ url: "/events/poster/wc%202.0.png", width: 1080, height: 1350, alt: "Workshop Carnival 2.0" }],
  },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
