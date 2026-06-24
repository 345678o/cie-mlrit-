"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Camera, Link2, X, Video } from "lucide-react";

const footerLinks = {
  explore: [
    { href: "/about",      label: "About Us" },
    { href: "/verticals",  label: "Verticals" },
    { href: "/studios",    label: "Studios" },
    { href: "/facilities", label: "Facilities" },
    { href: "/tours",      label: "Campus Tours" },
  ],
  programs: [
    { href: "/events", label: "Past Events" },
    { href: "/council", label: "Council Members" },
  ],
};

const socials = [
  { icon: Camera, href: "https://instagram.com", label: "Instagram" },
  { icon: Link2, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: X, href: "https://twitter.com", label: "Twitter / X" },
  { icon: Video, href: "https://youtube.com", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "#000000",
        borderTop: "1px solid rgba(255,94,44,0.10)",
      }}
    >
      <div
        className="page-container"
        style={{ paddingTop: "clamp(48px,8vw,80px)", paddingBottom: "clamp(32px,5vw,48px)" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 items-start content-between">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-baseline gap-0.5 mb-5">
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  fontSize: "28px",
                  color: "#FFFFFF",
                  letterSpacing: "-0.02em",
                }}
              >
                CIE
              </span>
              <span style={{ color: "var(--orange)", fontWeight: 800, fontSize: "30px" }}>.</span>
            </Link>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "13px",
                lineHeight: 1.7,
                color: "#6B7280",
                marginBottom: "24px",
                maxWidth: "220px",
              }}
            >
              Centre for Innovation &amp; Entrepreneurship, MLRIT — empowering the next
              generation of innovators.
            </p>

            <div className="flex items-center gap-2.5">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    color: "#6B7280",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,94,44,0.12)";
                    e.currentTarget.style.borderColor = "rgba(255,94,44,0.3)";
                    e.currentTarget.style.color = "var(--orange)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                    e.currentTarget.style.color = "#6B7280";
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "11px",
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              Explore
            </h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 group transition-colors duration-200"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "14px",
                      color: "#6B7280",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#FFFFFF";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#6B7280";
                    }}
                  >
                    <span
                      className="w-0 h-px group-hover:w-3 transition-all duration-200"
                      style={{ background: "var(--orange)" }}
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs Links */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "11px",
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              Programs
            </h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {footerLinks.programs.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 group transition-colors duration-200"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "14px",
                      color: "#6B7280",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#FFFFFF";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#6B7280";
                    }}
                  >
                    <span
                      className="w-0 h-px group-hover:w-3 transition-all duration-200"
                      style={{ background: "var(--orange)" }}
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "11px",
                fontWeight: 700,
                color: "#FFFFFF",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              Contact
            </h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <li className="flex items-start gap-3">
                <MapPin
                  size={15}
                  className="mt-0.5 flex-shrink-0"
                  style={{ color: "var(--orange)" }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    lineHeight: 1.65,
                    color: "#6B7280",
                  }}
                >
                  MLRIT, Dundigal, Hyderabad, Telangana 500043
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="flex-shrink-0" style={{ color: "var(--orange)" }} />
                <a
                  href="mailto:cie@mlrit.ac.in"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    color: "#6B7280",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#FFFFFF"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#6B7280"; }}
                >
                  cie@mlrit.ac.in
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="flex-shrink-0" style={{ color: "var(--orange)" }} />
                <a
                  href="tel:+914023043333"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "13px",
                    color: "#6B7280",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#FFFFFF"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "#6B7280"; }}
                >
                  +91 40 2304 3333
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              color: "#4B5563",
            }}
          >
            © {new Date().getFullYear()} MLRIT CIE. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "#4B5563" }}>
              Built with
            </span>
            <span style={{ color: "var(--orange)", fontSize: "12px" }}>▲</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "#4B5563" }}>
              passion at MLRIT
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
