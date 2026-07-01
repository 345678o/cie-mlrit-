import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facilities",
  description: "Explore MLRIT CIE facilities — NVIDIA-powered workstations, CNC routers, 3D printers, laser cutters, and a fully equipped innovation lab.",
  openGraph: {
    title: "Facilities | MLRIT CIE",
    description: "Explore MLRIT CIE facilities — NVIDIA-powered workstations, CNC routers, 3D printers, laser cutters, and a fully equipped innovation lab.",
    url: "https://cie.mlrit.ac.in/facilities",
  },
};

export default function FacilitiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
