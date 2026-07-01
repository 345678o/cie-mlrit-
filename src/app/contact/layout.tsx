import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with MLRIT CIE. Reach us for collaborations, sponsorships, mentorship, or general inquiries.",
  openGraph: {
    title: "Contact | MLRIT CIE",
    description: "Get in touch with MLRIT CIE. Reach us for collaborations, sponsorships, mentorship, or general inquiries.",
    url: "https://cie.mlrit.ac.in/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
