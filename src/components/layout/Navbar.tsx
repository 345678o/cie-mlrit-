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
        color: isActive ? "#111111" : hov ? "#111111" : "#888888",
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
          background: "#444444",
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
              ? "rgba(250,249,247,0.80)"
              : "rgba(251,250,248,0.95)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            border: "1px solid rgba(0,0,0,0.07)",
            borderRadius: "9999px",
            boxShadow: scrolled
              ? "0 8px 40px rgba(0,0,0,0.11), 0 2px 8px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.65)"
              : "0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.75)",
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
                color: "#111111",
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
            className="hidden lg:flex"
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              gap: "clamp(18px, 2.6vw, 36px)",
              display: "flex",
            }}
          >
            {NAV_LINKS.map((item) => (
              <NavLink key={item.href} item={item} isActive={pathname === item.href} />
            ))}
          </nav>

          {/* ── Separator — desktop ───────────────────────────── */}
          <div
            className="hidden lg:block"
            style={{
              width: "1px",
              height: "16px",
              background: "rgba(0,0,0,0.10)",
              flexShrink: 0,
              margin: "0 clamp(12px, 1.6vw, 20px)",
            }}
          />

          {/* ── CTA — desktop ────────────────────────────────── */}
          <Link
            href="/contact"
            className="hidden lg:inline-flex"
            style={{
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
              display: "flex",
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

          {/* ── Hamburger — mobile / tablet ───────────────────── */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="lg:hidden"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "6px 2px",
              marginLeft: "clamp(10px, 2vw, 18px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "5px",
              width: "28px",
              flexShrink: 0,
            }}
          >
            <motion.span
              animate={{ rotate: open ? 45 : 0, y: open ? 6.5 : 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "block",
                height: "1.5px",
                width: "20px",
                background: "#222222",
                borderRadius: "2px",
                transformOrigin: "center",
              }}
            />
            <motion.span
              animate={{ opacity: open ? 0 : 1 }}
              transition={{ duration: 0.18 }}
              style={{
                display: "block",
                height: "1.5px",
                width: "13px",
                background: "#222222",
                borderRadius: "2px",
              }}
            />
            <motion.span
              animate={{ rotate: open ? -45 : 0, y: open ? -6.5 : 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "block",
                height: "1.5px",
                width: "20px",
                background: "#222222",
                borderRadius: "2px",
                transformOrigin: "center",
              }}
            />
          </button>
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
            className="lg:hidden"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99,
              background: "#FAFAF9",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Top strip in overlay */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px clamp(24px, 6vw, 48px)",
                borderBottom: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <Link
                href="/"
                onClick={() => setOpen(false)}
                style={{ display: "inline-flex", alignItems: "baseline", textDecoration: "none" }}
              >
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "20px", letterSpacing: "-0.04em", color: "#111111" }}>
                  CIE
                </span>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "22px", color: "#E8521A" }}>.</span>
              </Link>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "12px",
                  color: "#FFFFFF",
                  background: "#E8521A",
                  borderRadius: "999px",
                  padding: "8px 18px",
                  textDecoration: "none",
                  letterSpacing: "0.01em",
                }}
              >
                Join Now
              </Link>
            </div>

            {/* Nav items */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "clamp(12px, 3vh, 24px) clamp(24px, 6vw, 56px)",
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
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontFamily: "var(--font-heading)",
                      fontWeight: 800,
                      fontSize: "clamp(22px, 5vw, 42px)",
                      letterSpacing: "-0.03em",
                      color: pathname === item.href ? "rgba(0,0,0,0.22)" : "#0A0A0A",
                      textDecoration: "none",
                      padding: "clamp(9px, 1.5vh, 15px) 0",
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

            {/* Bottom — socials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.44, duration: 0.3 }}
              style={{
                padding: "18px clamp(24px, 6vw, 56px)",
                borderTop: "1px solid rgba(0,0,0,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
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
