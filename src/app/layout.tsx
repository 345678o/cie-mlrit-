import type { Metadata } from "next";
import { Manrope, Inter, Caveat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";
import LoadingScreen from "@/components/ui/LoadingScreen";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MLRIT CIE — Centre for Innovation & Entrepreneurship",
  description:
    "The official innovation and entrepreneurship hub of MLRIT, empowering students to ideate, build, and launch impactful solutions.",
  keywords: ["MLRIT", "CIE", "innovation", "entrepreneurship", "startups", "Hyderabad"],
  openGraph: {
    title: "MLRIT CIE — Centre for Innovation & Entrepreneurship",
    description: "Transforming Ideas into Innovation. Innovation into Impact.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable} ${caveat.variable} scroll-smooth`} data-scroll-behavior="smooth">
      <body className="min-h-screen flex flex-col antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <LoadingScreen />
        <Navbar />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
