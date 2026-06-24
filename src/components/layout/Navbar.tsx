"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import CurvedLoop from "@/components/ui/CurvedLoop";

/* ─── Data ─────────────────────────────────────────────────────── */

/* Overlay — only the hero pages */
const NAV_ITEMS = [
  { label: "Home",     href: "/"        },
  { label: "About",    href: "/about"   },
  { label: "Events",   href: "/events"  },
  { label: "Startups", href: "/studios" },
];

/* Persistent top bar — secondary links */
const TOP_LINKS = [
  { label: "Departments", href: "/verticals"  },
  { label: "Facilities",  href: "/facilities" },
  { label: "Gallery",     href: "/tours"      },
  { label: "Team",        href: "/council"    },
];

/* Each grid card has its own gradient + an accent that shifts with hovered nav item */
const GRID_ACCENTS = [
  "#FF5E2C", "#FF7A50", "#F97316", "#FB923C",
  "#FF6B35", "#FF8C42", "#FFA55A", "#FF5E2C",
];

const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn",  href: "#" },
  { label: "Twitter",   href: "#" },
  { label: "YouTube",   href: "#" },
];

/* ─── Overlay animation ─────────────────────────────────────────── */

const overlayVariants = {
  hidden:  { clipPath: "inset(0 0 100% 0)" },
  visible: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.82, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
  },
  exit: {
    clipPath: "inset(0 0 100% 0)",
    transition: { duration: 0.62, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] },
  },
};

const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/* ═══════════════════════════════════════════════════════════════
   Main Navbar
═══════════════════════════════════════════════════════════════ */

export default function Navbar() {
  const [open, setOpen]         = useState(false);
  const [hovered, setHovered]   = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname                = usePathname();

  const rawX   = useMotionValue(0);
  const rawY   = useMotionValue(0);
  const glowX  = useSpring(rawX, { stiffness: 75, damping: 18 });
  const glowY  = useSpring(rawY, { stiffness: 75, damping: 18 });
  const wheelY = useMotionValue(0);

  const onMouseMove = useCallback(
    (e: MouseEvent) => { rawX.set(e.clientX); rawY.set(e.clientY); },
    [rawX, rawY]
  );

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (!open) return;
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [open, onMouseMove]);

  useEffect(() => {
    if (!open) { wheelY.set(0); return; }
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const next = wheelY.get() - e.deltaY * 0.55;
      wheelY.set(Math.max(-260, Math.min(260, next)));
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [open, wheelY]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, []);

  const accent = GRID_ACCENTS[hovered ?? 0];

  return (
    <>
      {/* ══════════════════════════════════════════════════════════
          Top bar
      ══════════════════════════════════════════════════════════ */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          height: "var(--nav-height)",
          background: open
            ? "transparent"
            : scrolled ? "rgba(6,6,6,0.96)" : "rgba(0,0,0,0.68)",
          backdropFilter:       open ? "none" : "blur(24px) saturate(160%)",
          WebkitBackdropFilter: open ? "none" : "blur(24px) saturate(160%)",
          borderBottom: open
            ? "1px solid transparent"
            : `1px solid rgba(255,255,255,${scrolled ? "0.07" : "0.04"})`,
          transition: "background 0.4s ease, border-color 0.4s ease",
        }}
      >
        <div style={{
          maxWidth: "1400px", margin: "0 auto",
          padding: "0 clamp(20px, 4vw, 48px)",
          height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Logo */}
          <Link href="/" onClick={() => setOpen(false)}
            style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "22px", letterSpacing: "-0.04em", color: "#FFFFFF", lineHeight: 1 }}>CIE</span>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "24px", color: "#FF5E2C", lineHeight: 1 }}>.</span>
            </div>
            <div className="hidden sm:flex flex-col" style={{ gap: "2px" }}>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "8.5px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)", lineHeight: 1 }}>MLRIT</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "8.5px", color: "rgba(255,255,255,0.22)", lineHeight: 1 }}>Innovation Hub</span>
            </div>
          </Link>

          {/* Centre nav links (hidden when overlay open) */}
          <AnimatePresence>
            {!open && (
              <motion.nav
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="hidden lg:flex"
                style={{ display: "flex", alignItems: "center", gap: "32px" }}
              >
                {TOP_LINKS.map((link) => (
                  <Link key={link.href} href={link.href}
                    style={{
                      fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: 600,
                      letterSpacing: "0.06em", textTransform: "uppercase",
                      color: pathname === link.href ? "#FF5E2C" : "rgba(255,255,255,0.55)",
                      textDecoration: "none", transition: "color 0.2s ease",
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#FF5E2C"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = pathname === link.href ? "#FF5E2C" : "rgba(255,255,255,0.55)"; }}
                  >
                    {link.label}
                  </Link>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>

          {/* Right controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>

            {/* Premium pill button */}
            <motion.button
              onClick={() => setOpen(v => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "flex", alignItems: "center",
                background: open ? "rgba(255,94,44,0.07)" : "rgba(255,255,255,0.05)",
                border: open ? "1px solid rgba(255,94,44,0.28)" : "1px solid rgba(255,255,255,0.11)",
                borderRadius: "999px", cursor: "pointer",
                padding: "0 18px 0 20px", height: "40px",
                transition: "background 0.3s ease, border-color 0.3s ease", overflow: "hidden",
              }}
            >
              {/* MENU / CLOSE label */}
              <div style={{ position: "relative", height: "14px", width: "42px", overflow: "hidden", flexShrink: 0 }}>
                <AnimatePresence mode="wait" initial={false}>
                  {open ? (
                    <motion.span key="close"
                      initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }}
                      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                      style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", fontFamily: "var(--font-body)", fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "#FF5E2C", whiteSpace: "nowrap" }}>
                      CLOSE
                    </motion.span>
                  ) : (
                    <motion.span key="menu"
                      initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }}
                      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                      style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", fontFamily: "var(--font-body)", fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", whiteSpace: "nowrap" }}>
                      MENU
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Separator */}
              <div aria-hidden style={{ width: "1px", height: "16px", background: open ? "rgba(255,94,44,0.22)" : "rgba(255,255,255,0.1)", margin: "0 14px", flexShrink: 0, transition: "background 0.3s ease" }} />

              {/* Bars → X */}
              <div style={{ display: "flex", flexDirection: "column", gap: "5px", flexShrink: 0 }}>
                <motion.span
                  animate={{ rotate: open ? 45 : 0, y: open ? 3 : 0, backgroundColor: open ? "#FF5E2C" : "#FFFFFF" }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: "block", width: "18px", height: "1.5px", borderRadius: "2px", transformOrigin: "center" }}
                />
                <motion.span
                  animate={{ rotate: open ? -45 : 0, y: open ? -3 : 0, backgroundColor: open ? "#FF5E2C" : "rgba(255,255,255,0.45)", width: open ? "18px" : "12px" }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: "block", height: "1.5px", borderRadius: "2px", transformOrigin: "center" }}
                />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* ══════════════════════════════════════════════════════════
          Fullscreen overlay
      ══════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            style={{
              position: "fixed", inset: 0, zIndex: 99,
              background: "#FFFFFF",
              display: "flex", flexDirection: "column", overflow: "hidden",
            }}
          >
            {/* Grain */}
            <div aria-hidden style={{
              position: "absolute", inset: 0,
              backgroundImage: GRAIN_URL,
              backgroundRepeat: "repeat", backgroundSize: "200px 200px",
              opacity: 0.042, pointerEvents: "none",
            }} />

            {/* Warm orange corner glows — light theme */}
            <div aria-hidden style={{
              position: "absolute", bottom: 0, left: 0,
              width: "55vw", height: "55vw", borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,94,44,0.07) 0%, transparent 68%)",
              transform: "translate(-30%, 30%)", pointerEvents: "none",
            }} />
            <div aria-hidden style={{
              position: "absolute", top: 0, right: 0,
              width: "40vw", height: "40vw", borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,94,44,0.05) 0%, transparent 68%)",
              transform: "translate(30%, -30%)", pointerEvents: "none",
            }} />

            {/* Top accent */}
            <div aria-hidden style={{
              position: "absolute", top: 0, left: 0, right: 0, height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(255,94,44,0.8), transparent)",
            }} />

            {/* Geometric background */}
            <GeometricBackground />

            {/* Mouse glow */}
            <motion.div aria-hidden style={{
              position: "fixed", width: "700px", height: "700px", borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,94,44,0.08) 0%, transparent 62%)",
              pointerEvents: "none", x: glowX, y: glowY, translateX: "-50%", translateY: "-50%", zIndex: 0,
            }} />

            {/* ── Curved marquee — TOP ────────────────────────── */}
            <div style={{
              position: "relative", zIndex: 1, flexShrink: 0,
              paddingTop: "var(--nav-height)",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}>
              <CurvedLoop
                marqueeText="CIE✦ MAKING ✦ THINGS ✦HAPPEN✦"
                speed={1.8}
                curveAmount={40}
                direction="right"
                interactive={false}
              />
            </div>

            {/* ── Content ──────────────────────────────────────── */}
            <div style={{
              position: "relative", zIndex: 1, flex: 1,
              display: "flex",
              maxWidth: "1400px", margin: "0 auto", width: "100%",
              padding: "clamp(12px,2.5vh,24px) clamp(20px,4vw,56px) clamp(12px,2.5vh,24px)",
              gap: "clamp(24px, 5vw, 64px)",
              minHeight: 0,
              overflow: "hidden",
            }}>

              {/* ── LEFT: photo grid (desktop) ─────────────────── */}
              <div className="hidden lg:flex" style={{ width: "44%", flexShrink: 0, minHeight: 0, overflow: "hidden" }}>
                <motion.div
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.18, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  style={{ width: "100%", height: "100%", minHeight: 0 }}
                >
                  <PhotoGrid accent={accent} hoveredIdx={hovered} mouseX={rawX} mouseY={rawY} wheelY={wheelY} />
                </motion.div>
              </div>

              {/* ── RIGHT: nav links ────────────────────────────── */}
              <nav
                aria-label="Main navigation"
                style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}
              >
                {NAV_ITEMS.map((item, i) => (
                  <NavItem
                    key={item.href}
                    item={item}
                    index={i}
                    isActive={pathname === item.href}
                    onHoverStart={() => setHovered(i)}
                    onHoverEnd={() => setHovered(null)}
                    onClick={() => setOpen(false)}
                  />
                ))}
              </nav>
            </div>

            {/* ── Bottom bar ──────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.45 }}
              style={{
                position: "relative", zIndex: 1,
                borderTop: "1px solid rgba(0,0,0,0.08)",
                padding: "16px clamp(20px,4vw,56px)",
              }}
            >
              <div style={{
                maxWidth: "1400px", margin: "0 auto",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                flexWrap: "wrap", gap: "10px",
              }}>
                {/* Socials */}
                <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                  {SOCIALS.map(s => (
                    <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                      whileHover={{ color: "rgba(255,255,255,0.7)" }}
                      style={{ fontFamily: "var(--font-body)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", textDecoration: "none" }}>
                      {s.label}
                    </motion.a>
                  ))}
                </div>

                {/* Branding */}
                <p style={{ fontFamily: "var(--font-body)", fontSize: "9.5px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(0,0,0,0.3)" }}>
                  Centre for Innovation &amp; Entrepreneurship · MLRIT
                </p>

                {/* Contact email */}
                <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
                  <motion.a href="mailto:cie@mlrit.ac.in"
                    whileHover={{ color: "#FF5E2C" }}
                    style={{ fontFamily: "var(--font-body)", fontSize: "10px", color: "rgba(0,0,0,0.4)", textDecoration: "none" }}>
                    cie@mlrit.ac.in
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PhotoGrid — editorial 2×2 image placeholders (left panel)
═══════════════════════════════════════════════════════════════ */

/*
 * Seeded picsum URLs → deterministic (same seed = same photo every load).
 * Replace any src with a real /public path once CIE photos are available.
 * flex: N uses unitless grow ratio — avoids % height resolution bugs.
 */
/* 6 images across 3 columns — replace src with real /public paths when available */
const CARDS = [
  /* col A – tall then short */
  { src: "https://picsum.photos/seed/cie-collab/800/1100",   alt: "Students collaborating at CIE", grow: 3, depth: 0.55 },
  { src: "https://picsum.photos/seed/cie-build/800/700",     alt: "Innovation workspace at CIE",   grow: 2, depth: 0.35 },
  /* col B – short then tall */
  { src: "https://picsum.photos/seed/cie-pitch/800/700",     alt: "Startup pitch at CIE",          grow: 2, depth: 0.65 },
  { src: "https://picsum.photos/seed/cie-makers/800/1100",   alt: "Makers and founders at CIE",    grow: 3, depth: 0.45 },
  /* col C – medium then tall */
  { src: "https://picsum.photos/seed/cie-hackathon/800/800", alt: "Hackathon at CIE",              grow: 2, depth: 0.58 },
  { src: "https://picsum.photos/seed/cie-demo/800/1000",     alt: "Demo day at CIE",               grow: 3, depth: 0.40 },
];

function PhotoGrid({
  accent, hoveredIdx, mouseX, mouseY, wheelY,
}: {
  accent: string;
  hoveredIdx: number | null;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  wheelY: MotionValue<number>;
}) {
  const lit = hoveredIdx !== null;

  /* Each column moves at a different speed/direction for depth */
  const colAY = useSpring(useTransform(wheelY, (v) =>  v * 0.9), { stiffness: 55, damping: 18 });
  const colBY = useSpring(useTransform(wheelY, (v) => -v * 0.6), { stiffness: 55, damping: 18 });
  const colCY = useSpring(useTransform(wheelY, (v) =>  v * 0.75), { stiffness: 55, damping: 18 });

  return (
    <div style={{ display: "flex", gap: "8px", height: "100%", width: "100%", minHeight: 0 }}>
      {/* Column A — moves up on scroll down */}
      <motion.div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px", minHeight: 0, y: colAY }}>
        <GridCard card={CARDS[0]} accent={accent} delay={0.20} isLit={lit} mouseX={mouseX} mouseY={mouseY} />
        <GridCard card={CARDS[1]} accent={accent} delay={0.30} isLit={lit} mouseX={mouseX} mouseY={mouseY} />
      </motion.div>
      {/* Column B — moves DOWN on scroll down (opposite) */}
      <motion.div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px", minHeight: 0, y: colBY }}>
        <GridCard card={CARDS[2]} accent={accent} delay={0.24} isLit={lit} mouseX={mouseX} mouseY={mouseY} />
        <GridCard card={CARDS[3]} accent={accent} delay={0.34} isLit={lit} mouseX={mouseX} mouseY={mouseY} />
      </motion.div>
      {/* Column C — moves up on scroll down, medium speed */}
      <motion.div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px", minHeight: 0, y: colCY }}>
        <GridCard card={CARDS[4]} accent={accent} delay={0.28} isLit={lit} mouseX={mouseX} mouseY={mouseY} />
        <GridCard card={CARDS[5]} accent={accent} delay={0.38} isLit={lit} mouseX={mouseX} mouseY={mouseY} />
      </motion.div>
    </div>
  );
}

function GridCard({
  card, accent, delay, isLit, mouseX, mouseY,
}: {
  card: { src: string; alt: string; grow: number; depth: number };
  accent: string;
  delay: number;
  isLit: boolean;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) {
  /* Map raw mouse px → parallax offset, spring-smoothed */
  const MAX = card.depth * 22;
  const rawPx = useTransform(mouseX, [0, 1440], [-MAX, MAX]);
  const rawPy = useTransform(mouseY, [0,  900], [-MAX, MAX]);
  const px = useSpring(rawPx, { stiffness: 50, damping: 16 });
  const py = useSpring(rawPy, { stiffness: 50, damping: 16 });

  return (
    <motion.div
      initial={{ opacity: 0, x: -18, filter: "blur(8px)" }}
      animate={{ opacity: 1, x: 0,   filter: "blur(0px)" }}
      transition={{ delay, duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
      style={{
        flex: card.grow,
        minHeight: 0,
        borderRadius: "10px",
        overflow: "hidden",
        position: "relative",
        border: "1px solid rgba(0,0,0,0.08)",
        background: "#F5F5F5",
      }}
    >
      {/* Photo layer — oversized so parallax never reveals edges */}
      <motion.div
        style={{
          position: "absolute",
          inset: "-10%",
          x: px,
          y: py,
        }}
      >
        <Image
          src={card.src}
          alt={card.alt}
          fill
          sizes="(max-width: 1024px) 0px, 22vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority={false}
        />
      </motion.div>

      {/* Dark overlay — editorial B&W tone */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0,
          background: "rgba(0,0,0,0.22)",
          mixBlendMode: "multiply",
        }}
      />

      {/* Orange tint — reacts to hovered nav item */}
      <motion.div
        aria-hidden
        animate={{
          opacity: isLit ? 1 : 0,
          background: `radial-gradient(ellipse at 55% 75%, ${accent}2e 0%, transparent 68%)`,
        }}
        transition={{ duration: 0.38 }}
        style={{ position: "absolute", inset: 0 }}
      />

      {/* Corner accent dot */}
      <motion.div
        animate={{ backgroundColor: isLit ? accent : "rgba(255,255,255,0.2)" }}
        transition={{ duration: 0.32 }}
        style={{
          position: "absolute", top: "12px", right: "12px",
          width: "5px", height: "5px", borderRadius: "50%",
        }}
      />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   NavItem — LandoNorris-style: giant text, strikethrough on active
═══════════════════════════════════════════════════════════════ */

function NavItem({
  item, index, isActive, onHoverStart, onHoverEnd, onClick,
}: {
  item: { label: string; href: string };
  index: number;
  isActive: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
}) {
  const [hov, setHov] = useState(false);
  const delay = 0.38 + index * 0.07;

  return (
    <div>
      <Link
        href={item.href}
        onClick={onClick}
        onMouseEnter={() => { setHov(true);  onHoverStart(); }}
        onMouseLeave={() => { setHov(false); onHoverEnd();   }}
        style={{
          display: "inline-block",
          textDecoration: "none",
          padding: "clamp(2px, 0.55vh, 7px) 0",
          position: "relative",
          lineHeight: 1,
        }}
      >
        {/* Clip container — hides text below the baseline until revealed */}
        <div style={{ overflow: "hidden", paddingBottom: "0.06em" }}>
          {/* Entrance: slides up from 104%; hover: shifts right */}
          <motion.div
            initial={{ y: "104%" }}
            animate={{ y: "0%" }}
            transition={{ delay, duration: 0.82, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span
              animate={{ x: hov && !isActive ? 8 : 0 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "block",
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(36px, 6.2vw, 96px)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                textTransform: "uppercase",
                lineHeight: 1,
                color: hov
                  ? "#FF5E2C"
                  : isActive
                    ? "rgba(0,0,0,0.28)"
                    : "rgba(0,0,0,0.85)",
                transition: "color 0.25s ease",
              }}
            >
              {item.label}
            </motion.span>
          </motion.div>
        </div>

        {/* Strikethrough — scales in after text lands */}
        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          animate={{
            scaleX: isActive ? 1 : hov ? 0.5 : 0,
            backgroundColor: isActive ? "rgba(0,0,0,0.35)" : "#FF5E2C",
          }}
          transition={{
            scaleX: { delay: isActive ? delay + 0.3 : 0, duration: 0.45, ease: [0.16, 1, 0.3, 1] },
            backgroundColor: { duration: 0.25 },
          }}
          style={{
            position: "absolute",
            top: "50%",
            left: "-2%",
            right: "-2%",
            height: "2px",
            borderRadius: "2px",
            transformOrigin: "left",
            pointerEvents: "none",
          }}
        />
      </Link>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   GeometricBackground — decorative SVG/CSS layer inside overlay
═══════════════════════════════════════════════════════════════ */

function GeometricBackground() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* ── Dot matrix ─────────────────────────────────────── */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.18) 1.5px, transparent 1.5px)",
        backgroundSize: "44px 44px",
        opacity: 0.7,
      }} />

      {/* ── Large concentric arcs — top-right ──────────────── */}
      <svg
        style={{ position: "absolute", top: "-18%", right: "-12%", width: "65vw", height: "65vw", maxWidth: 780, maxHeight: 780 }}
        viewBox="0 0 780 780"
        fill="none"
      >
        <circle cx="390" cy="390" r="360" stroke="#FF5E2C" strokeWidth="1.5" opacity="0.22" />
        <circle cx="390" cy="390" r="280" stroke="#FF5E2C" strokeWidth="1.2" opacity="0.16" />
        <circle cx="390" cy="390" r="200" stroke="#FF5E2C" strokeWidth="1"   opacity="0.12" />
        <circle cx="390" cy="390" r="120" stroke="#FF5E2C" strokeWidth="0.8" opacity="0.09"  />
      </svg>

      {/* ── White arcs — bottom-left ────────────────────────── */}
      <svg
        style={{ position: "absolute", bottom: "-20%", left: "-10%", width: "50vw", height: "50vw", maxWidth: 600, maxHeight: 600 }}
        viewBox="0 0 600 600"
        fill="none"
      >
        <circle cx="300" cy="300" r="270" stroke="#000000" strokeWidth="1.2" opacity="0.07" />
        <circle cx="300" cy="300" r="195" stroke="#000000" strokeWidth="1"   opacity="0.05" />
        <circle cx="300" cy="300" r="120" stroke="#000000" strokeWidth="0.8" opacity="0.04" />
      </svg>

      {/* ── Diagonal hairline — full-width ─────────────────── */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
        fill="none"
      >
        <line x1="0" y1="900" x2="1440" y2="0" stroke="#FF5E2C" strokeWidth="1"   opacity="0.18" />
        <line x1="0" y1="780" x2="1200" y2="0" stroke="#000000" strokeWidth="0.8" opacity="0.07" />
      </svg>

      {/* ── Scattered plus / cross marks ───────────────────── */}
      <PlusMark x="18%" y="22%" size={16} color="#FF5E2C" opacity={0.45} />
      <PlusMark x="28%" y="62%" size={11} color="#000000"  opacity={0.18} />
      <PlusMark x="48%" y="18%" size={14} color="#FF5E2C" opacity={0.38} />
      <PlusMark x="52%" y="75%" size={10} color="#000000"  opacity={0.15} />
      <PlusMark x="72%" y="35%" size={13} color="#FF5E2C" opacity={0.35} />
      <PlusMark x="84%" y="68%" size={15} color="#000000"  opacity={0.14} />

      {/* ── Small rotated squares (diamond shape) ──────────── */}
      <DiamondMark x="38%" y="82%" size={10} color="#FF5E2C" opacity={0.35} />
      <DiamondMark x="62%" y="14%" size={12} color="#000000"  opacity={0.14} />
      <DiamondMark x="80%" y="52%" size={9}  color="#FF5E2C" opacity={0.3}  />

      {/* ── Vertical accent lines ──────────────────────────── */}
      <div style={{
        position: "absolute", top: "15%", left: "47%",
        width: "1px", height: "120px",
        background: "linear-gradient(to bottom, transparent, rgba(255,94,44,0.45), transparent)",
      }} />
      <div style={{
        position: "absolute", top: "40%", right: "22%",
        width: "1px", height: "90px",
        background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.18), transparent)",
      }} />

      {/* ── Horizontal accent lines ────────────────────────── */}
      <div style={{
        position: "absolute", top: "55%", left: "44%",
        height: "1px", width: "100px",
        background: "linear-gradient(to right, transparent, rgba(255,94,44,0.35), transparent)",
      }} />
    </div>
  );
}

function PlusMark({
  x, y, size, color, opacity,
}: {
  x: string; y: string; size: number; color: string; opacity: number;
}) {
  const h = size / 2;
  return (
    <svg
      style={{ position: "absolute", left: x, top: y, transform: "translate(-50%,-50%)", opacity }}
      width={size} height={size} viewBox={`0 0 ${size} ${size}`}
      fill="none"
    >
      <line x1={h} y1={0} x2={h} y2={size} stroke={color} strokeWidth="1.2" />
      <line x1={0} y1={h} x2={size} y2={h} stroke={color} strokeWidth="1.2" />
    </svg>
  );
}

function DiamondMark({
  x, y, size, color, opacity,
}: {
  x: string; y: string; size: number; color: string; opacity: number;
}) {
  const h = size / 2;
  return (
    <svg
      style={{ position: "absolute", left: x, top: y, transform: "translate(-50%,-50%) rotate(45deg)", opacity }}
      width={size} height={size} viewBox={`0 0 ${size} ${size}`}
      fill="none"
    >
      <rect x="1" y="1" width={size - 2} height={size - 2} stroke={color} strokeWidth="1.1" />
      <line x1={h} y1={0} x2={h} y2={size} stroke={color} strokeWidth="0.6" opacity="0.5" />
      <line x1={0} y1={h} x2={size} y2={h} stroke={color} strokeWidth="0.6" opacity="0.5" />
    </svg>
  );
}
