"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNavbarVisibility } from "@/context/NavbarContext";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Data ─────────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: "Home",      href: "/" },
  { label: "About",     href: "/about" },
  { label: "Verticals", href: "/verticals" },
  { label: "Council",   href: "/council" },
  { label: "Events",    href: "/events" },
  { label: "Alumni",    href: "/alumni" },
  { label: "Gallery",   href: "/gallery" },
  { label: "Contact",   href: "/contact" },
];

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/mlritcie/" },
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/cie-center-for-innovation-and-entrepreneurship-mlrit-935971291/" },
  { label: "YouTube",   href: "https://www.youtube.com/@mlritcie" },
  { label: "Twitter",   href: "https://x.com/ciemlrit?s=20" },
];

/* ─── Theme tokens ──────────────────────────────────────────────
   Dark (default) = Equinox look; light = the original orange site.
   The pill stays dark glass in both themes (as it always was).   */
const NAV_THEME_CSS = `
:root {
  --nav-link: rgba(244,245,250,0.58);
  --nav-link-hover: #A5AFFE;
  --nav-link-active: #F4F5FA;
  --nav-dot: #33FF67;
  --nav-dot-glow: 0 0 6px rgba(51,255,103,0.7);
  --nav-dot-glow-lg: 0 0 8px rgba(51,255,103,0.7);
  --nav-underline: #7484FE;
  --nav-pill-bg: linear-gradient(135deg, rgba(116,132,254,0.10) 0%, rgba(255,255,255,0.02) 45%, rgba(116,132,254,0.05) 100%), rgba(22,23,29,0.72);
  --nav-pill-bg-scrolled: linear-gradient(135deg, rgba(116,132,254,0.10) 0%, rgba(255,255,255,0.02) 45%, rgba(116,132,254,0.05) 100%), rgba(22,23,29,0.86);
  --nav-pill-border: rgba(255,255,255,0.08);
  --nav-pill-shadow: 0 6px 30px rgba(0,0,0,0.28), 0 1px 4px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(0,0,0,0.26);
  --nav-pill-shadow-scrolled: 0 10px 44px rgba(0,0,0,0.42), 0 2px 8px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(0,0,0,0.30);
  --nav-drawer-bg: radial-gradient(ellipse 70% 45% at 50% 0%, rgba(116,132,254,0.16) 0%, transparent 70%), #16171D;
  --nav-drawer-line: rgba(255,255,255,0.08);
  --nav-drawer-line-item: rgba(255,255,255,0.08);
  --nav-drawer-logo: #F4F5FA;
  --nav-drawer-tag: rgba(244,245,250,0.38);
  --nav-drawer-link: #F4F5FA;
  --nav-drawer-link-active: #A5AFFE;
  --nav-drawer-link-hover: #A5AFFE;
  --nav-drawer-social: rgba(244,245,250,0.58);
  --nav-drawer-social-hover: #A5AFFE;
  --nav-drawer-foot: rgba(244,245,250,0.38);
}
:root[data-theme="light"] {
  --nav-link: rgba(255,255,255,0.50);
  --nav-link-hover: #FFFFFF;
  --nav-link-active: #FFFFFF;
  --nav-dot: #E8521A;
  --nav-dot-glow: none;
  --nav-dot-glow-lg: none;
  --nav-underline: rgba(255,255,255,0.60);
  --nav-pill-bg: linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.08) 100%), rgba(12,12,14,0.86);
  --nav-pill-bg-scrolled: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 45%, rgba(255,255,255,0.07) 100%), rgba(10,10,12,0.90);
  --nav-pill-border: rgba(255,255,255,0.14);
  --nav-pill-shadow: 0 6px 30px rgba(0,0,0,0.28), 0 1px 4px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.24), inset 0 -1px 0 rgba(0,0,0,0.26);
  --nav-pill-shadow-scrolled: 0 10px 44px rgba(0,0,0,0.42), 0 2px 8px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -1px 0 rgba(0,0,0,0.30);
  --nav-drawer-bg: #FAFAF9;
  --nav-drawer-line: rgba(0,0,0,0.06);
  --nav-drawer-line-item: rgba(0,0,0,0.055);
  --nav-drawer-logo: #111111;
  --nav-drawer-tag: rgba(0,0,0,0.28);
  --nav-drawer-link: #0A0A0A;
  --nav-drawer-link-active: rgba(0,0,0,0.22);
  --nav-drawer-link-hover: rgba(0,0,0,0.4);
  --nav-drawer-social: rgba(0,0,0,0.28);
  --nav-drawer-social-hover: #000000;
  --nav-drawer-foot: rgba(0,0,0,0.18);
}
/* Theme toggle: sits after the desktop separator; on phones/tablets it
   sits just left of the hamburger. */
.nav-theme-toggle { display: flex; align-items: center; flex-shrink: 0; }
@media (max-width: 1023px) {
  .nav-theme-toggle { margin-right: 8px; }
}
`;

/* ─── Desktop nav link ─────────────────────────────────────── */
function NavLink({
  item,
  isActive,
}: {
  item: { label: string; href: string };
  isActive: boolean;
}) {
  const [hov, setHov] = useState(false);

  return (
    <Link
      href={item.href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative",
        fontFamily: "var(--font-body)",
        fontWeight: isActive ? 600 : 400,
        fontSize: "13px",
        letterSpacing: "0.01em",
        color: isActive ? "var(--nav-link-active)" : hov ? "var(--nav-link-hover)" : "var(--nav-link)",
        textDecoration: "none",
        paddingBottom: "6px",
        display: "inline-block",
        transition: "color 0.18s ease",
        whiteSpace: "nowrap",
      }}
    >
      {item.label}

      {/* Active — small orange dot */}
      <span
        style={{
          position: "absolute",
          bottom: "0",
          left: "50%",
          transform: "translateX(-50%)",
          width: "3.5px",
          height: "3.5px",
          borderRadius: "50%",
          background: "var(--nav-dot)",
          boxShadow: "var(--nav-dot-glow)",
          opacity: isActive ? 1 : 0,
          transition: "opacity 0.2s ease",
          pointerEvents: "none",
        }}
      />

      {/* Hover — thin underline slides in */}
      <motion.span
        animate={{ scaleX: hov && !isActive ? 1 : 0 }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute",
          bottom: "0",
          left: 0,
          right: 0,
          height: "1px",
          background: "var(--nav-underline)",
          display: "block",
          transformOrigin: "left",
          pointerEvents: "none",
        }}
      />
    </Link>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Main Navbar — floating pill
═══════════════════════════════════════════════════════════════ */
export default function Navbar() {
  const { hidden }              = useNavbarVisibility();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const pathname                = usePathname();

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    let raf = 0;
    const fn = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setScrolled(window.scrollY > 40);
      });
    };
    setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => { window.removeEventListener("scroll", fn); if (raf) cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, []);

  if (hidden) return null;

  return (
    <>
      <style>{NAV_THEME_CSS}</style>
      {/* ══════════════════════════════════════════════════════
          Floating pill
      ══════════════════════════════════════════════════════ */}
      {/* Centering shell — owns position:fixed + top transition */}
      <div
        style={{
          position: "fixed",
          top: scrolled ? "12px" : "20px",
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          justifyContent: "center",
          padding: "0 14px",
          pointerEvents: "none",
          transition: "top 0.45s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
      {/* FM only drives y entrance — no transform conflict */}
      <motion.div
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.72, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: "min(1240px, 100%)",
          pointerEvents: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            background: scrolled
              ? "var(--nav-pill-bg-scrolled)"
              : "var(--nav-pill-bg)",
            backdropFilter: "blur(20px) saturate(150%)",
            WebkitBackdropFilter: "blur(20px) saturate(150%)",
            border: "1px solid var(--nav-pill-border)",
            borderRadius: "9999px",
            boxShadow: scrolled
              ? "var(--nav-pill-shadow-scrolled)"
              : "var(--nav-pill-shadow)",
            /* Compact padding when scrolled */
            padding: scrolled ? "5px 5px 5px 18px" : "7px 7px 7px 22px",
            gap: 0,
            transition: "background 0.4s ease, box-shadow 0.4s ease, padding 0.4s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {/* ── Logo ─────────────────────────────────────────── */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            style={{
              display: "inline-flex",
              alignItems: "baseline",
              textDecoration: "none",
              flexShrink: 0,
              marginRight: "clamp(14px, 2vw, 26px)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                fontSize: scrolled ? "17px" : "19px",
                letterSpacing: "-0.04em",
                color: "var(--nav-link-active)",
                lineHeight: 1,
                transition: "font-size 0.4s ease",
              }}
            >
              CIE
            </span>
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                fontSize: scrolled ? "19px" : "21px",
                color: "var(--nav-dot)",
                lineHeight: 1,
                transition: "font-size 0.4s ease",
              }}
            >
              .
            </span>
          </Link>

          {/* ── Nav links — desktop (lg+) ─────────────────────── */}
          <nav
            aria-label="Main navigation"
            className="nav-desktop-links"
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "clamp(18px, 2.6vw, 36px)",
            }}
          >
            {NAV_LINKS.map((item) => (
              <NavLink key={item.href} item={item} isActive={pathname === item.href} />
            ))}
          </nav>

          {/* ── Mobile spacer — pushes hamburger to right on <md ── */}
          <div className="nav-mobile-space" style={{ flex: 1 }} />

          {/* ── Separator — desktop ───────────────────────────── */}
          <div
            className="nav-desktop-sep"
            style={{
              width: "1px",
              height: "16px",
              background: "rgba(255,255,255,0.14)",
              flexShrink: 0,
              margin: "0 clamp(12px, 1.6vw, 20px)",
            }}
          />

          {/* Theme toggle hidden for now — site stays on the Equinox (dark) theme.
              Restore <ThemeToggle /> here and the init script in layout.tsx to bring back light mode. */}

          {/* ── Hamburger — phones only (< 768px) ─────────────── */}
          <div className="nav-hamburger" style={{ display: "flex", flexShrink: 0 }}>
            <motion.button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              whileTap={{ scale: 0.9 }}
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "12px",
                border: open
                  ? "1.5px solid var(--orange)"
                  : "1.5px solid rgba(255,255,255,0.14)",
                background: open ? "var(--orange)" : "rgba(255,255,255,0.08)",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                boxShadow: open
                  ? "0 0 16px rgba(var(--primary-rgb),0.40)"
                  : "none",
                transition: "background 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease",
              }}
            >
              <motion.span
                animate={{ rotate: open ? 45 : 0, y: open ? 6.5 : 0 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: "block",
                  height: "2px",
                  width: "18px",
                  background: "#FFFFFF",
                  borderRadius: "2px",
                  transformOrigin: "center",
                  transition: "background 0.22s ease",
                }}
              />
              <motion.span
                animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
                transition={{ duration: 0.18 }}
                style={{
                  display: "block",
                  height: "2px",
                  width: "12px",
                  background: "#FFFFFF",
                  borderRadius: "2px",
                  alignSelf: "flex-end",
                  marginRight: "12px",
                  transition: "background 0.22s ease",
                }}
              />
              <motion.span
                animate={{ rotate: open ? -45 : 0, y: open ? -6.5 : 0 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: "block",
                  height: "2px",
                  width: "18px",
                  background: "#FFFFFF",
                  borderRadius: "2px",
                  transformOrigin: "center",
                  transition: "background 0.22s ease",
                }}
              />
            </motion.button>
          </div>
        </div>
      </motion.div>
      </div>{/* end centering shell */}

      {/* ══════════════════════════════════════════════════════
          Mobile fullscreen overlay
      ══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{
              clipPath: "inset(0 0 0% 0)",
              transition: { duration: 0.52, ease: [0.76, 0, 0.24, 1] },
            }}
            exit={{
              clipPath: "inset(0 0 100% 0)",
              transition: { duration: 0.38, ease: [0.76, 0, 0.24, 1] },
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="flex flex-col"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99,
              background: "var(--nav-drawer-bg)",
              overflow: "hidden",
            }}
          >
            {/* CSS overrides for landscape phones and very small screens */}
            <style>{`
              @media (max-height: 480px) {
                .ov-link { font-size: 16px !important; padding: 5px 0 !important; }
              }
              @media (max-width: 360px) {
                .ov-link { font-size: 19px !important; }
              }
            `}</style>

            {/* Top strip in overlay */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px clamp(20px, 5vw, 48px)",
                borderBottom: "1px solid var(--nav-drawer-line)",
                flexShrink: 0,
              }}
            >
              <Link
                href="/"
                onClick={() => setOpen(false)}
                style={{ display: "inline-flex", alignItems: "baseline", textDecoration: "none" }}
              >
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "19px", letterSpacing: "-0.04em", color: "var(--nav-drawer-logo)" }}>
                  CIE
                </span>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "21px", color: "var(--nav-dot)" }}>.</span>
              </Link>
              <span style={{
                fontFamily: "var(--font-body)", fontSize: "11px",
                fontWeight: 600, letterSpacing: "0.08em",
                textTransform: "uppercase", color: "var(--nav-drawer-tag)",
              }}>
                CIE · MLRIT
              </span>
            </div>

            {/* Nav items — scrollable so landscape phones never clip */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "clamp(8px, 2vh, 20px) clamp(20px, 5vw, 56px)",
                overflowY: "auto",
              }}
            >
              {NAV_LINKS.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.16 + i * 0.04,
                    duration: 0.38,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{ borderBottom: "1px solid var(--nav-drawer-line-item)" }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="ov-link"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontFamily: "var(--font-heading)",
                      fontWeight: 800,
                      fontSize: "clamp(20px, 5vw, 42px)",
                      letterSpacing: "-0.03em",
                      color: pathname === item.href ? "var(--nav-drawer-link-active)" : "var(--nav-drawer-link)",
                      textDecoration: "none",
                      padding: "clamp(8px, 1.4vh, 15px) 0",
                      transition: "color 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (pathname !== item.href)
                        (e.currentTarget as HTMLAnchorElement).style.color = "var(--nav-drawer-link-hover)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        pathname === item.href ? "var(--nav-drawer-link-active)" : "var(--nav-drawer-link)";
                    }}
                  >
                    {item.label}
                    {pathname === item.href && (
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: "var(--nav-dot)",
                          boxShadow: "var(--nav-dot-glow-lg)",
                          flexShrink: 0,
                        }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom — socials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.44, duration: 0.3 }}
              style={{
                padding: "14px clamp(20px, 5vw, 56px)",
                borderTop: "1px solid var(--nav-drawer-line)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "8px",
                flexShrink: 0,
              }}
            >
              <div style={{ display: "flex", gap: "clamp(12px,3vw,20px)", flexWrap: "wrap" }}>
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "9.5px",
                      fontWeight: 600,
                      letterSpacing: "0.10em",
                      textTransform: "uppercase",
                      color: "var(--nav-drawer-social)",
                      textDecoration: "none",
                      transition: "color 0.18s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "var(--nav-drawer-social-hover)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "var(--nav-drawer-social)";
                    }}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "9.5px",
                  letterSpacing: "0.10em",
                  textTransform: "uppercase",
                  color: "var(--nav-drawer-foot)",
                }}
              >
                CIE · MLRIT
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
