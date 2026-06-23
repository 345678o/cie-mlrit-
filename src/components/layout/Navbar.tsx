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
import FlowingMenu from "@/components/ui/FlowingMenu";

/* ─── Data ─────────────────────────────────────────────────────── */

/* All pages — rendered equally in the overlay */
const NAV_ITEMS = [
  { label: "Home",        href: "/",          desc: "Start here",               image: "https://picsum.photos/600/400?random=10" },
  { label: "About",       href: "/about",     desc: "Our story & mission",      image: "https://picsum.photos/600/400?random=11" },
  { label: "Events",      href: "/events",    desc: "100+ events & counting",   image: "https://picsum.photos/600/400?random=12" },
  { label: "Startups",    href: "/studios",   desc: "Studios & ventures",       image: "https://picsum.photos/600/400?random=13" },
  { label: "Departments", href: "/verticals", desc: "Our six verticals",        image: "https://picsum.photos/600/400?random=14" },
  { label: "Facilities",  href: "/facilities",desc: "Labs & workspaces",        image: "https://picsum.photos/600/400?random=15" },
  { label: "Gallery",     href: "/tours",     desc: "Behind the scenes",        image: "https://picsum.photos/600/400?random=16" },
  { label: "Team",        href: "/council",   desc: "The people behind CIE",    image: "https://picsum.photos/600/400?random=17" },
  { label: "Contact",     href: "/contact",   desc: "Get in touch",             image: "https://picsum.photos/600/400?random=18" },
];

/* Keep for any other references */
const TOP_LINKS = NAV_ITEMS;

/* Each grid card has its own gradient + an accent that shifts with hovered nav item */
const GRID_ACCENTS = [
  "#E8521A", "#F26B38", "#E8521A", "#FB923C",
  "#FF6B35", "#FF8C42", "#FFA55A", "#E8521A",
];

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/mlritcie/" },
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/cie-center-for-innovation-and-entrepreneurship-mlrit-935971291/" },
  { label: "YouTube",   href: "https://www.youtube.com/@mlritcie" },
  { label: "Twitter",   href: "https://x.com/ciemlrit?s=20" },
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
  const [open, setOpen]             = useState(false);
  const [hovered, setHovered]       = useState<number | null>(null);
  const [scrolled, setScrolled]     = useState(false);
  const [menuImage, setMenuImage]   = useState<string | null>(null);
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
            : scrolled ? "rgba(8,8,8,0.96)" : "transparent",
          backdropFilter:       open ? "none" : scrolled ? "blur(24px) saturate(160%)" : "none",
          WebkitBackdropFilter: open ? "none" : scrolled ? "blur(24px) saturate(160%)" : "none",
          borderBottom: open
            ? "1px solid transparent"
            : scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid transparent",
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
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "22px", letterSpacing: "-0.04em", color: scrolled ? "#FFFFFF" : "#000000", lineHeight: 1, transition: "color 0.4s ease" }}>CIE</span>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "24px", color: "#E8521A", lineHeight: 1 }}>.</span>
            </div>
            <div className="hidden sm:flex flex-col" style={{ gap: "2px" }}>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "8.5px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: scrolled ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)", lineHeight: 1, transition: "color 0.4s ease" }}>MLRIT</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "8px", color: scrolled ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.30)", lineHeight: 1, transition: "color 0.4s ease" }}>Centre for Innovation &amp; Entrepreneurship</span>
            </div>
          </Link>

          {/* Right controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
            <AnimatePresence>
              {!open && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
                  <Link href="/contact" className="hidden md:flex" style={{
                    fontFamily: "var(--font-body)", fontSize: "11px", fontWeight: 600,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    color: scrolled ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)",
                    textDecoration: "none", transition: "color 0.2s ease",
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#E8521A"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = scrolled ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)"; }}
                  >
                    Join CIE
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hamburger pill button */}
            <motion.button
              onClick={() => setOpen(v => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "flex", alignItems: "center",
                background: open ? "rgba(232,82,26,0.07)" : scrolled ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.04)",
                border: open ? "1px solid rgba(232,82,26,0.28)" : scrolled ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.10)",
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
                      style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", fontFamily: "var(--font-body)", fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "#E8521A", whiteSpace: "nowrap" }}>
                      CLOSE
                    </motion.span>
                  ) : (
                    <motion.span key="menu"
                      initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }}
                      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                      style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", fontFamily: "var(--font-body)", fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: scrolled ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)", whiteSpace: "nowrap" }}>
                      MENU
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Separator */}
              <div aria-hidden style={{ width: "1px", height: "16px", background: open ? "rgba(232,82,26,0.22)" : scrolled ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)", margin: "0 14px", flexShrink: 0, transition: "background 0.3s ease" }} />

              {/* Bars → X */}
              <div style={{ display: "flex", flexDirection: "column", gap: "5px", flexShrink: 0 }}>
                <motion.span
                  animate={{ rotate: open ? 45 : 0, y: open ? 3 : 0, backgroundColor: open ? "#E8521A" : scrolled ? "#FFFFFF" : "#000000" }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: "block", width: "18px", height: "1.5px", borderRadius: "2px", transformOrigin: "center" }}
                />
                <motion.span
                  animate={{ rotate: open ? -45 : 0, y: open ? -3 : 0, backgroundColor: open ? "#E8521A" : scrolled ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)", width: open ? "18px" : "12px" }}
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
              display: "flex", minHeight: 0,
            }}>

              {/* LEFT: 4-photo grid */}
              <div className="hidden lg:flex" style={{
                width: "38%", flexShrink: 0, minHeight: 0, overflow: "hidden",
                padding: "clamp(10px,1.5vh,16px)",
              }}>
                <motion.div
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.18, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  style={{ width: "100%", height: "100%", minHeight: 0 }}
                >
                  <PhotoGrid accent={accent} hoveredIdx={hovered} mouseX={rawX} mouseY={rawY} wheelY={wheelY} />
                </motion.div>
              </div>

              {/* RIGHT: FlowingMenu */}
              <div style={{ flex: 1, minHeight: 0 }}>
                <FlowingMenu
                  items={NAV_ITEMS.map(item => ({ link: item.href, text: item.label, image: item.image }))}
                  textColor="#000000"
                  bgColor="transparent"
                  hoverColor="#E8521A"
                  borderColor="rgba(0,0,0,0.08)"
                  onItemClick={() => setOpen(false)}
                  onItemHover={(img) => setMenuImage(img)}
                />
              </div>
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

                {/* Contact + CTA */}
                <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
                  <motion.a href="mailto:cie@mlrit.ac.in"
                    whileHover={{ color: "#E8521A" }}
                    style={{ fontFamily: "var(--font-body)", fontSize: "10px", color: "rgba(0,0,0,0.4)", textDecoration: "none" }}>
                    cie@mlrit.ac.in
                  </motion.a>
                  <Link href="/contact" onClick={() => setOpen(false)} className="hidden md:flex"
                    style={{
                      fontFamily: "var(--font-body)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em",
                      textTransform: "uppercase", color: "#E8521A", textDecoration: "none",
                      border: "1px solid rgba(255,94,44,0.28)", borderRadius: "6px", padding: "6px 16px",
                      transition: "background 0.2s ease, border-color 0.2s ease",
                    }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "rgba(255,94,44,0.1)"; el.style.borderColor = "#E8521A"; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "transparent"; el.style.borderColor = "rgba(255,94,44,0.28)"; }}
                  >
                    Join CIE →
                  </Link>
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
  /* col A */
  { src: "https://picsum.photos/seed/cie-collab/800/1100", alt: "Students collaborating at CIE", grow: 3, depth: 0.55 },
  { src: "https://picsum.photos/seed/cie-build/800/700",   alt: "Innovation workspace at CIE",   grow: 2, depth: 0.35 },
  /* col B */
  { src: "https://picsum.photos/seed/cie-pitch/800/700",   alt: "Startup pitch at CIE",          grow: 2, depth: 0.65 },
  { src: "https://picsum.photos/seed/cie-makers/800/1100", alt: "Makers and founders at CIE",    grow: 3, depth: 0.45 },
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
      {/* Column A */}
      <motion.div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px", minHeight: 0, y: colAY }}>
        <GridCard card={CARDS[0]} accent={accent} delay={0.20} isLit={lit} mouseX={mouseX} mouseY={mouseY} />
        <GridCard card={CARDS[1]} accent={accent} delay={0.30} isLit={lit} mouseX={mouseX} mouseY={mouseY} />
      </motion.div>
      {/* Column B */}
      <motion.div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px", minHeight: 0, y: colBY }}>
        <GridCard card={CARDS[2]} accent={accent} delay={0.24} isLit={lit} mouseX={mouseX} mouseY={mouseY} />
        <GridCard card={CARDS[3]} accent={accent} delay={0.34} isLit={lit} mouseX={mouseX} mouseY={mouseY} />
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
   NavItem — editorial: number + rule + label + description
═══════════════════════════════════════════════════════════════ */

function NavItem({
  item, index, isActive, onHoverStart, onHoverEnd, onClick,
}: {
  item: { label: string; href: string; desc?: string };
  index: number;
  isActive: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
}) {
  const [hov, setHov] = useState(false);
  const delay = 0.26 + index * 0.055;

  return (
    <div style={{
      borderBottom: "1px solid rgba(0,0,0,0.06)",
      padding: "clamp(5px, 0.9vh, 12px) 0",
    }}>
      <Link
        href={item.href}
        onClick={onClick}
        onMouseEnter={() => { setHov(true);  onHoverStart(); }}
        onMouseLeave={() => { setHov(false); onHoverEnd();   }}
        style={{ display: "block", textDecoration: "none" }}
      >
        {/* Row: number · rule · label · arrow */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>

          {/* Index */}
          <span style={{
            fontFamily: "var(--font-body)",
            fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em",
            color: hov ? "#E8521A" : "rgba(0,0,0,0.2)",
            transition: "color 0.2s ease", flexShrink: 0,
          }}>
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Thin rule — stretches on hover */}
          <motion.div
            animate={{ width: hov ? 22 : 10, backgroundColor: hov ? "#E8521A" : "rgba(0,0,0,0.12)" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ height: "1px", flexShrink: 0 }}
          />

          {/* Label */}
          <div style={{ flex: 1, overflow: "hidden", paddingBottom: "0.04em" }}>
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ delay, duration: 0.76, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "block",
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(14px, 2vw, 28px)",
                fontWeight: 900,
                letterSpacing: "-0.035em",
                textTransform: "uppercase",
                lineHeight: 1,
                color: hov ? "#E8521A" : isActive ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.9)",
                transition: "color 0.2s ease",
              }}
            >
              {item.label}
            </motion.span>
          </div>

          {/* Arrow */}
          <motion.span
            animate={{ x: hov ? 0 : -10, opacity: hov ? 1 : 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: "15px", color: "#E8521A", flexShrink: 0, lineHeight: 1 }}
          >
            →
          </motion.span>
        </div>

        {/* Description */}
        {item.desc && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.28, duration: 0.38 }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "10.5px",
              fontStyle: "italic",
              letterSpacing: "0.01em",
              color: hov ? "rgba(232,82,26,0.55)" : "rgba(0,0,0,0.28)",
              marginTop: "4px",
              paddingLeft: "44px",
              transition: "color 0.2s ease",
            }}
          >
            {item.desc}
          </motion.p>
        )}
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
        <circle cx="390" cy="390" r="360" stroke="#E8521A" strokeWidth="1.5" opacity="0.22" />
        <circle cx="390" cy="390" r="280" stroke="#E8521A" strokeWidth="1.2" opacity="0.16" />
        <circle cx="390" cy="390" r="200" stroke="#E8521A" strokeWidth="1"   opacity="0.12" />
        <circle cx="390" cy="390" r="120" stroke="#E8521A" strokeWidth="0.8" opacity="0.09"  />
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
        <line x1="0" y1="900" x2="1440" y2="0" stroke="#E8521A" strokeWidth="1"   opacity="0.18" />
        <line x1="0" y1="780" x2="1200" y2="0" stroke="#000000" strokeWidth="0.8" opacity="0.07" />
      </svg>

      {/* ── Scattered plus / cross marks ───────────────────── */}
      <PlusMark x="18%" y="22%" size={16} color="#E8521A" opacity={0.45} />
      <PlusMark x="28%" y="62%" size={11} color="#000000"  opacity={0.18} />
      <PlusMark x="48%" y="18%" size={14} color="#E8521A" opacity={0.38} />
      <PlusMark x="52%" y="75%" size={10} color="#000000"  opacity={0.15} />
      <PlusMark x="72%" y="35%" size={13} color="#E8521A" opacity={0.35} />
      <PlusMark x="84%" y="68%" size={15} color="#000000"  opacity={0.14} />

      {/* ── Small rotated squares (diamond shape) ──────────── */}
      <DiamondMark x="38%" y="82%" size={10} color="#E8521A" opacity={0.35} />
      <DiamondMark x="62%" y="14%" size={12} color="#000000"  opacity={0.14} />
      <DiamondMark x="80%" y="52%" size={9}  color="#E8521A" opacity={0.3}  />

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
