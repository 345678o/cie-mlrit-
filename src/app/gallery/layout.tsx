import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Visual archive of MLRIT CIE — 500+ moments from hackathons, workshops, e-summits, and campus events captured over 5 years.",
  openGraph: {
    title: "Gallery | MLRIT CIE",
    description: "Visual archive of MLRIT CIE — 500+ moments from hackathons, workshops, e-summits, and campus events captured over 5 years.",
    url: "https://mlritcie.in/gallery",
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
