import type { Metadata } from "next";
import { Manrope, Inter, Caveat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { NavbarProvider } from "@/context/NavbarContext";

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

// Rockstar Display — condensed bold uppercase display face (free personal-use).
// Used for council member names on card flip. Self-hosted from /public/fonts.
const rockstar = localFont({
  src: "../../public/fonts/Rockstar-ExtraBold.otf",
  variable: "--font-rockstar",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cie.mlrit.ac.in"),
  title: {
    default: "MLRIT CIE — Centre for Innovation & Entrepreneurship",
    template: "%s | MLRIT CIE",
  },
  description:
    "The official innovation and entrepreneurship hub of MLRIT, empowering students to ideate, build, and launch impactful solutions.",
  keywords: ["MLRIT", "CIE", "innovation", "entrepreneurship", "startups", "Hyderabad", "MLRIT CIE"],
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    other: [
      { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "MLRIT CIE — Centre for Innovation & Entrepreneurship",
    description: "Transforming Ideas into Innovation. Innovation into Impact.",
    type: "website",
    url: "https://cie.mlrit.ac.in",
    siteName: "MLRIT CIE",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "MLRIT CIE" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MLRIT CIE — Centre for Innovation & Entrepreneurship",
    description: "Transforming Ideas into Innovation. Innovation into Impact.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable} ${caveat.variable} ${rockstar.variable} scroll-smooth`} data-scroll-behavior="smooth">
      <body className="min-h-screen flex flex-col antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <NavbarProvider>
          <LoadingScreen />
          <Navbar />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
          <BackToTop />
        </NavbarProvider>
      </body>
    </html>
  );
}
