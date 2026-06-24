"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Data ─────────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: "Home",      href: "/" },
  { label: "About",     href: "/about" },
  { label: "Verticals", href: "/verticals" },
  { label: "Team",      href: "/council" },
  { label: "Events",    href: "/events" },
  { label: "Gallery",   href: "/tours" },
  { label: "Contact",   href: "/contact" },
];

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/mlritcie/" },
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/cie-center-for-innovation-and-entrepreneurship-mlrit-935971291/" },
  { label: "YouTube",   href: "https://www.youtube.com/@mlritcie" },
  { label: "Twitter",   href: "https://x.com/ciemlrit?s=20" },
];

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
        color: isActive ? "#FFFFFF" : hov ? "#FFFFFF" : "rgba(255,255,255,0.50)",
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
          background: "#E8521A",
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
          background: "rgba(255,255,255,0.60)",
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
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const pathname                = usePathname();

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
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

  return (
    <>
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
          width: "min(1120px, 100%)",
          pointerEvents: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            background: scrolled
              ? "rgba(10,10,10,0.92)"
              : "rgba(14,14,14,0.96)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.09)",
            borderRadius: "9999px",
            boxShadow: scrolled
              ? "0 8px 40px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.07)"
              : "0 4px 24px rgba(0,0,0,0.30), 0 1px 4px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.06)",
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
                color: "#FFFFFF",
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
                color: "#E8521A",
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

          {/* ── CTA — desktop ────────────────────────────────── */}
          <Link
            href="/contact"
            className="nav-desktop-cta"
            style={{
              display: "inline-flex",
              alignItems: "center",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "12.5px",
              letterSpacing: "0.015em",
              color: "#FFFFFF",
              background: "#E8521A",
              borderRadius: "9999px",
              padding: scrolled ? "8px 17px" : "10px 20px",
              textDecoration: "none",
              whiteSpace: "nowrap",
              flexShrink: 0,
              transition: "background 0.2s ease, padding 0.4s cubic-bezier(0.16,1,0.3,1)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#C04218";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#E8521A";
            }}
          >
            Join Now
          </Link>

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
                  ? "1.5px solid #E8521A"
                  : "1.5px solid rgba(255,255,255,0.14)",
                background: open ? "#E8521A" : "rgba(255,255,255,0.08)",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                boxShadow: open
                  ? "0 0 16px rgba(232,82,26,0.40)"
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
              background: "#FAFAF9",
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
                .ov-join { padding: 7px 13px !important; font-size: 11px !important; }
              }
            `}</style>

            {/* Top strip in overlay */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px clamp(20px, 5vw, 48px)",
                borderBottom: "1px solid rgba(0,0,0,0.06)",
                flexShrink: 0,
              }}
            >
              <Link
                href="/"
                onClick={() => setOpen(false)}
                style={{ display: "inline-flex", alignItems: "baseline", textDecoration: "none" }}
              >
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "19px", letterSpacing: "-0.04em", color: "#111111" }}>
                  CIE
                </span>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "21px", color: "#E8521A" }}>.</span>
              </Link>
              <span style={{
                fontFamily: "var(--font-body)", fontSize: "11px",
                fontWeight: 600, letterSpacing: "0.08em",
                textTransform: "uppercase", color: "rgba(0,0,0,0.28)",
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
                  style={{ borderBottom: "1px solid rgba(0,0,0,0.055)" }}
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
                      color: pathname === item.href ? "rgba(0,0,0,0.22)" : "#0A0A0A",
                      textDecoration: "none",
                      padding: "clamp(8px, 1.4vh, 15px) 0",
                      transition: "color 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (pathname !== item.href)
                        (e.currentTarget as HTMLAnchorElement).style.color = "rgba(0,0,0,0.4)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        pathname === item.href ? "rgba(0,0,0,0.22)" : "#0A0A0A";
                    }}
                  >
                    {item.label}
                    {pathname === item.href && (
                      <span
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: "#E8521A",
                          flexShrink: 0,
                        }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Join Now CTA — full width, prominent */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.40, duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              style={{
                padding: "0 clamp(20px, 5vw, 56px) 16px",
                flexShrink: 0,
              }}
            >
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  width: "100%",
                  padding: "15px 24px",
                  borderRadius: "14px",
                  background: "#E8521A",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  fontSize: "15px",
                  letterSpacing: "0.01em",
                  textDecoration: "none",
                  boxShadow: "0 4px 20px rgba(232,82,26,0.35)",
                }}
              >
                Join Now
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </motion.div>

            {/* Bottom — socials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.44, duration: 0.3 }}
              style={{
                padding: "14px clamp(20px, 5vw, 56px)",
                borderTop: "1px solid rgba(0,0,0,0.06)",
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
                      color: "rgba(0,0,0,0.28)",
                      textDecoration: "none",
                      transition: "color 0.18s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "#000000";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "rgba(0,0,0,0.28)";
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
                  color: "rgba(0,0,0,0.18)",
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
