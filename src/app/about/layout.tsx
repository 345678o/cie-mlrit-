import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about MLRIT Centre for Innovation & Entrepreneurship — our mission, vision, and the team driving student innovation in Hyderabad.",
  openGraph: {
    title: "About | MLRIT CIE",
    description: "Learn about MLRIT Centre for Innovation & Entrepreneurship — our mission, vision, and the team driving student innovation in Hyderabad.",
    url: "https://mlritcie.in/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
