"use client";

import Link from "next/link";
import { useNavbarVisibility } from "@/context/NavbarContext";

/* ─── Branded social SVGs ───────────────────────────────────── */

function IconInstagram({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.5" />
    </svg>
  );
}

function IconLinkedIn({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconYouTube({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.593 7.203a2.506 2.506 0 0 0-1.762-1.766C18.265 5.007 12 5 12 5s-6.264-.007-7.831.404a2.56 2.56 0 0 0-1.766 1.778c-.413 1.566-.417 4.814-.417 4.814s-.004 3.264.406 4.814c.23.857.905 1.534 1.763 1.765 1.582.43 7.83.437 7.83.437s6.265.007 7.831-.403a2.515 2.515 0 0 0 1.767-1.763c.414-1.565.417-4.812.417-4.812s.02-3.265-.407-4.831zM9.996 15.005l.005-6 5.207 3.005-5.212 2.995z" />
    </svg>
  );
}

function IconX({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/* Contact icon containers */
function IconMail({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function IconPhone({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.35 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6.29 6.29l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconMapPin({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

/* ─── Data ───────────────────────────────────────────────────── */

const footerLinks = {
  explore: [
    { href: "/about",      label: "About Us" },
    { href: "/verticals",  label: "Verticals" },
    { href: "/studios",    label: "Studios" },
    { href: "/facilities", label: "Facilities" },
    { href: "/tours",      label: "Gallery" },
  ],
  programs: [
    { href: "/events",   label: "Past Events" },
    { href: "/council",  label: "Council Members" },
    { href: "/contact",  label: "Contact Us" },
  ],
};

const socials = [
  {
    Icon: IconInstagram,
    href: "https://www.instagram.com/mlritcie/",
    label: "Instagram",
    color: "#E1306C",
    bg: "rgba(225,48,108,0.12)",
    border: "rgba(225,48,108,0.22)",
    hoverColor: "#E1306C",
    hoverBg: "rgba(225,48,108,0.20)",
    hoverBorder: "rgba(225,48,108,0.40)",
  },
  {
    Icon: IconLinkedIn,
    href: "https://www.linkedin.com/in/cie-center-for-innovation-and-entrepreneurship-mlrit-935971291/",
    label: "LinkedIn",
    color: "#0A66C2",
    bg: "rgba(10,102,194,0.12)",
    border: "rgba(10,102,194,0.22)",
    hoverColor: "#0A66C2",
    hoverBg: "rgba(10,102,194,0.20)",
    hoverBorder: "rgba(10,102,194,0.40)",
  },
  {
    Icon: IconYouTube,
    href: "https://www.youtube.com/@mlritcie",
    label: "YouTube",
    color: "#FF0000",
    bg: "rgba(255,0,0,0.12)",
    border: "rgba(255,0,0,0.20)",
    hoverColor: "#FF0000",
    hoverBg: "rgba(255,0,0,0.20)",
    hoverBorder: "rgba(255,0,0,0.36)",
  },
  {
    Icon: IconX,
    href: "https://x.com/ciemlrit?s=20",
    label: "X (Twitter)",
    color: "#CCCCCC",
    bg: "rgba(255,255,255,0.07)",
    border: "rgba(255,255,255,0.14)",
    hoverColor: "#FFFFFF",
    hoverBg: "rgba(255,255,255,0.12)",
    hoverBorder: "rgba(255,255,255,0.26)",
  },
];

const contactItems = [
  {
    Icon: IconMapPin,
    type: "text" as const,
    value: "MLRIT, Dundigal, Hyderabad,\nTelangana 500043",
    href: undefined,
  },
  {
    Icon: IconMail,
    type: "link" as const,
    value: "ciemlrit@mlrit.ac.in",
    href: "mailto:ciemlrit@mlrit.ac.in",
  },
  {
    Icon: IconMail,
    type: "link" as const,
    value: "cie@mlrinstitutions.ac.in",
    href: "mailto:cie@mlrinstitutions.ac.in",
  },
  {
    Icon: IconPhone,
    type: "link" as const,
    value: "+91 40 2304 3333",
    href: "tel:+914023043333",
  },
];

/* ═══════════════════════════════════════════════════════════════
   Footer
═══════════════════════════════════════════════════════════════ */
export default function Footer() {
  const { hidden } = useNavbarVisibility();
  if (hidden) return null;
  return (
    <footer style={{ background: "#000000", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div
        className="page-container"
        style={{ paddingTop: "clamp(40px,8vw,80px)", paddingBottom: "clamp(28px,5vw,48px)" }}
      >

        {/* ── Mobile: Explore + Programs side by side ─────────────── */}
        <div className="grid grid-cols-2 gap-8 lg:hidden" style={{ marginBottom: "clamp(28px,5vw,40px)" }}>
          {/* Explore */}
          <div>
            <h3 style={{ fontFamily: "var(--font-body)", fontSize: "10px", fontWeight: 700, color: "#FFFFFF", letterSpacing: "0.13em", textTransform: "uppercase", marginBottom: "16px" }}>Explore</h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: "14px", listStyle: "none", padding: 0, margin: 0 }}>
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "#5C6370", textDecoration: "none", display: "block", lineHeight: 1.4 }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#FFFFFF"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#5C6370"; }}
                  >{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Programs */}
          <div>
            <h3 style={{ fontFamily: "var(--font-body)", fontSize: "10px", fontWeight: 700, color: "#FFFFFF", letterSpacing: "0.13em", textTransform: "uppercase", marginBottom: "16px" }}>Programs</h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: "14px", listStyle: "none", padding: 0, margin: 0 }}>
              {footerLinks.programs.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "#5C6370", textDecoration: "none", display: "block", lineHeight: 1.4 }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#FFFFFF"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#5C6370"; }}
                  >{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Mobile: Contact ──────────────────────────────────────── */}
        <div className="lg:hidden" style={{ paddingBottom: "clamp(28px,5vw,40px)", borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: "clamp(28px,5vw,40px)" }}>
          <h3 style={{ fontFamily: "var(--font-body)", fontSize: "10px", fontWeight: 700, color: "#FFFFFF", letterSpacing: "0.13em", textTransform: "uppercase", marginBottom: "16px" }}>Contact</h3>
          <ul style={{ display: "flex", flexDirection: "column", gap: "12px", listStyle: "none", padding: 0, margin: 0 }}>
            {contactItems.map((item, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <div style={{ width: "30px", height: "30px", borderRadius: "7px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", color: "rgba(255,255,255,0.40)", marginTop: "1px" }}>
                  <item.Icon size={14} />
                </div>
                {item.type === "text" ? (
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "13px", lineHeight: 1.65, color: "#5C6370", whiteSpace: "pre-line", paddingTop: "5px" }}>{item.value}</span>
                ) : (
                  <a href={item.href} style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "#5C6370", textDecoration: "none", paddingTop: "5px", lineHeight: 1.4, display: "block" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#FFFFFF"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "#5C6370"; }}
                  >{item.value}</a>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Desktop: original 4-col grid ─────────────────────────── */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-12 items-start" style={{ marginBottom: "clamp(36px,5vw,56px)" }}>
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: "inline-flex", alignItems: "baseline", gap: "1px", textDecoration: "none", marginBottom: "18px" }}>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "28px", color: "#FFFFFF", letterSpacing: "-0.02em" }}>CIE</span>
              <span style={{ color: "var(--orange)", fontWeight: 800, fontSize: "30px" }}>.</span>
            </Link>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {socials.map(({ Icon, href, label, color, bg, border, hoverColor, hoverBg, hoverBorder }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}
                  style={{ width: "36px", height: "36px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", background: bg, border: `1px solid ${border}`, color, textDecoration: "none", transition: "background 0.22s ease, border-color 0.22s ease, color 0.22s ease, transform 0.22s ease", flexShrink: 0 }}
                  onMouseEnter={(e) => { const el = e.currentTarget; el.style.background = hoverBg; el.style.borderColor = hoverBorder; el.style.color = hoverColor; el.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget; el.style.background = bg; el.style.borderColor = border; el.style.color = color; el.style.transform = "none"; }}
                ><Icon size={15} /></a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 style={{ fontFamily: "var(--font-body)", fontSize: "10.5px", fontWeight: 700, color: "#FFFFFF", letterSpacing: "0.13em", textTransform: "uppercase", marginBottom: "20px" }}>Explore</h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: "12px", listStyle: "none", padding: 0, margin: 0 }}>
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    style={{ fontFamily: "var(--font-body)", fontSize: "13.5px", color: "#5C6370", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "7px", transition: "color 0.2s ease" }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "#FFFFFF"; const bar = el.querySelector(".footer-bar") as HTMLElement | null; if (bar) { bar.style.width = "12px"; bar.style.opacity = "1"; } }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "#5C6370"; const bar = el.querySelector(".footer-bar") as HTMLElement | null; if (bar) { bar.style.width = "0px"; bar.style.opacity = "0"; } }}
                  >
                    <span className="footer-bar" style={{ display: "inline-block", height: "1px", width: "0px", opacity: "0", background: "var(--orange)", borderRadius: "1px", flexShrink: 0, transition: "width 0.22s ease, opacity 0.22s ease" }} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 style={{ fontFamily: "var(--font-body)", fontSize: "10.5px", fontWeight: 700, color: "#FFFFFF", letterSpacing: "0.13em", textTransform: "uppercase", marginBottom: "20px" }}>Programs</h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: "12px", listStyle: "none", padding: 0, margin: 0 }}>
              {footerLinks.programs.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    style={{ fontFamily: "var(--font-body)", fontSize: "13.5px", color: "#5C6370", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "7px", transition: "color 0.2s ease" }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "#FFFFFF"; const bar = el.querySelector(".footer-bar") as HTMLElement | null; if (bar) { bar.style.width = "12px"; bar.style.opacity = "1"; } }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = "#5C6370"; const bar = el.querySelector(".footer-bar") as HTMLElement | null; if (bar) { bar.style.width = "0px"; bar.style.opacity = "0"; } }}
                  >
                    <span className="footer-bar" style={{ display: "inline-block", height: "1px", width: "0px", opacity: "0", background: "var(--orange)", borderRadius: "1px", flexShrink: 0, transition: "width 0.22s ease, opacity 0.22s ease" }} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ fontFamily: "var(--font-body)", fontSize: "10.5px", fontWeight: 700, color: "#FFFFFF", letterSpacing: "0.13em", textTransform: "uppercase", marginBottom: "20px" }}>Contact</h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: "14px", listStyle: "none", padding: 0, margin: 0 }}>
              {contactItems.map((item, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "11px" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "6px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.38)", marginTop: "1px" }}>
                    <item.Icon size={13} />
                  </div>
                  {item.type === "text" ? (
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "13px", lineHeight: 1.65, color: "#5C6370", whiteSpace: "pre-line", paddingTop: "5px" }}>{item.value}</span>
                  ) : (
                    <a href={item.href} style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "#5C6370", textDecoration: "none", paddingTop: "5px", lineHeight: 1.4, transition: "color 0.2s ease", display: "block" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#FFFFFF"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "#5C6370"; }}
                    >{item.value}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ──────────────────────────────────────────── */}
        <div
          style={{
            paddingTop: "clamp(16px, 3vw, 24px)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px 16px",
          }}
        >
          <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "#3D4148" }}>
            © {new Date().getFullYear()} MLRIT CIE. All rights reserved.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "#3D4148" }}>Built with</span>
            <span style={{ color: "var(--orange)", fontSize: "11px", lineHeight: 1 }}>▲</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "#3D4148" }}>passion at MLRIT</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
