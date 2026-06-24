"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Lightbulb,
  Rocket,
  Users,
  Trophy,
  Zap,
  Code,
  Mic,
  ChevronRight,
  TrendingUp,
  CalendarDays,
  Layers,
  Printer,
  Handshake,
  BookOpen,
} from "lucide-react";

/* ── Animated counter ─────────────────────────────────────────────── */
function AnimatedCounter({
  end,
  suffix = "",
  duration = 2,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const steps = 60;
    const increment = end / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, (duration * 1000) / steps);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return (
    <span ref={ref} aria-live="polite" aria-atomic="true">
      {count}
      {suffix}
    </span>
  );
}

/* ── FadeIn wrapper ───────────────────────────────────────────────── */
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Data ─────────────────────────────────────────────────────────── */
const stats = [
  { value: 1000, suffix: "+", label: "Students Engaged", icon: Users },
  { value: 100,  suffix: "+", label: "Events Hosted",    icon: Trophy },
  { value: 50,   suffix: "+", label: "Projects Launched",icon: Rocket },
  { value: 20,   suffix: "+", label: "Startup Initiatives", icon: TrendingUp },
];

const programs = [
  {
    icon: BookOpen,
    title: "Workshop Carnivals",
    desc: "Multi-day, multi-domain skill workshops covering UI/UX, IoT, WordPress, and more — hands-on learning that goes far beyond the classroom.",
    tag: "Workshops",
  },
  {
    icon: Trophy,
    title: "Innovation Challenges",
    desc: "Events like B2B — Business to Brand and Hustle Mania push students to ideate, pitch, and execute under real-world constraints.",
    tag: "Challenges",
  },
  {
    icon: Zap,
    title: "Hackathons",
    desc: "Intensive 24–36 hour sprints like MetaLoop — tackling cutting-edge themes with industry mentors and prize pools up to ₹75,000.",
    tag: "Hackathons",
  },
  {
    icon: Mic,
    title: "E-Summits",
    desc: "The Equinox E-Summit brings together student innovators, startup founders, and investors for 3 days of talks, pitches, and networking.",
    tag: "Summits",
  },
];

const studios = [
  { icon: Lightbulb, name: "Skill Workshops",        desc: "Domain-specific, hands-on workshops in tech, design, and business — run by industry experts and CIE teams across five active verticals." },
  { icon: Trophy,    name: "Competitive Events",      desc: "Brand challenges, business competitions, and hackathons that reward real problem-solving, creativity, and execution under pressure." },
  { icon: Mic,       name: "Summits & Networking",    desc: "Multi-day entrepreneurship summits with guest speakers, investor panels, and startup showcases — open to all MLRIT students." },
  { icon: Handshake, name: "Mentorship & Incubation", desc: "One-on-one guidance from alumni, industry experts, and faculty — from idea-stage to launch-ready, backed by IIC and CIE." },
];

const timeline = [
  { step: "01", title: "Ideate", desc: "Brainstorm and validate your idea" },
  { step: "02", title: "Build",  desc: "Prototype with expert guidance" },
  { step: "03", title: "Test",   desc: "Iterate through user feedback" },
  { step: "04", title: "Launch", desc: "Go to market with full support" },
];


const homeFacilities = [
  { icon: Lightbulb, title: "Innovation Labs",    desc: "High-performance workstations with NVIDIA GPUs for development, design, and rapid prototyping." },
  { icon: Handshake, title: "Mentorship",         desc: "Industry experts and alumni guiding startups through product, business strategy, and fundraising." },
  { icon: TrendingUp,title: "Investor Network",   desc: "Curated introductions to angel investors and VCs with access to pitch events across Hyderabad." },
  { icon: Layers,    title: "Co-Working Space",   desc: "Dedicated startup bays and flex desks with 24/7 member access and a professional environment." },
  { icon: Printer,   title: "Maker Space",        desc: "3D printers, laser cutters, CNC routers, soldering benches and full electronics fabrication tools." },
  { icon: CalendarDays, title: "Event Auditorium",desc: "300-seat venue with full AV, live-streaming setup, and breakout rooms for every event format." },
];

const recentEvents = [
  {
    category: "Workshop",
    title: "Workshop Carnival 2.0",
    date: "Apr 10–11, 2026",
    desc: "Where learning goes beyond classrooms — into real skills, real challenges, and real innovation. Multiple domains, hands-on experiences, and expert guidance.",
    tags: ["Hands-on Workshops", "Expert Guidance", "Domain Challenges"],
    accent: "#2563EB",
  },
  {
    category: "Innovation Challenge",
    title: "B2B — Business to Brand",
    date: "Apr 3–4, 2025",
    desc: "A Brand Revival Hackathon — teams of 3–5 develop strategies to transform brands through Logo Redesign and Ad-Film Making, backed by industry masterclasses.",
    tags: ["Brand Revival", "Logo Design", "Ad-Film Making"],
    accent: "#E8521A",
  },
  {
    category: "E-Summit",
    title: "The Equinox E-Summit 2K24",
    date: "Nov 28–30, 2024",
    desc: "#WherePassionMeetsPerseverance — a 3-day entrepreneurship summit by MLRIT CIE × IIC bringing together student innovators, industry leaders, and investors.",
    tags: ["E-Summit", "Entrepreneurship", "CIE × IIC"],
    accent: "#059669",
  },
];

/* ── Design tokens ────────────────────────────────────────────────── */
const CONTAINER  = "page-container";
const SECTION_PY = "clamp(40px, 8vw, 120px)";
const T_PRIMARY   = "#000000";
const T_SECONDARY = "#000000";
const T_MED       = "#374151";
const T_MUTED     = "#6B7280";
const ORANGE      = "#E8521A";

/* Exact brand palette */
const BG_WHITE   = "#FFFFFF";
const BG_CREAM   = "#FFFFFF";   /* Light Orange Background  */
const BG_SURFACE = "#FFFFFF";   /* Soft Orange Surface      */
const BG_WARM    = "#FFFFFF";   /* Warm Neutral             */
const NAVY       = "#000000";   /* Premium dark accent      */

/* ═══════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <div style={{ background: BG_WHITE }}>

      {/* ────────────────────────────────────────────────────────────
          HERO  —  Bold Editorial Collage
      ──────────────────────────────────────────────────────────── */}
      <section
        className="page-hero relative overflow-hidden flex flex-col"
        style={{ background: ORANGE, paddingTop: "var(--nav-height)", minHeight: "100vh" }}
      >
        {/* ── Grain texture (matches Image 1 paper grain) ── */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.13, mixBlendMode: "overlay" as const,
        }} />

        {/* ── Large arc — top right (Image 1 reference) ── */}
        <svg aria-hidden className="absolute pointer-events-none"
          style={{ top: "-18%", right: "-10%", width: "52vw", height: "52vw", maxWidth: 620, maxHeight: 620 }}
          viewBox="0 0 620 620" fill="none">
          <circle cx="310" cy="310" r="290" stroke="rgba(255,255,255,0.18)" strokeWidth="80" fill="none" />
        </svg>

        {/* ── Medium arc — bottom right ── */}
        <svg aria-hidden className="absolute pointer-events-none"
          style={{ bottom: "-14%", right: "-6%", width: "28vw", height: "28vw", maxWidth: 340, maxHeight: 340 }}
          viewBox="0 0 340 340" fill="none">
          <circle cx="170" cy="170" r="150" stroke="rgba(255,255,255,0.14)" strokeWidth="50" fill="none" />
        </svg>

        {/* ── Diagonal cut — bottom left (Image 1 reference) ── */}
        <svg aria-hidden className="absolute pointer-events-none"
          style={{ bottom: 0, left: 0, width: "36vw", height: "36vw", maxWidth: 420, maxHeight: 420 }}
          viewBox="0 0 420 420" fill="none">
          <path d="M0,420 L280,420 L0,140 Z" fill="rgba(255,255,255,0.10)" />
          <path d="M0,420 L180,420 L0,260 Z" fill="rgba(255,255,255,0.07)" />
        </svg>

        {/* ── Small arc — top left ── */}
        <svg aria-hidden className="absolute pointer-events-none"
          style={{ top: "-8%", left: "-8%", width: "20vw", height: "20vw", maxWidth: 220, maxHeight: 220 }}
          viewBox="0 0 220 220" fill="none">
          <circle cx="110" cy="110" r="95" stroke="rgba(255,255,255,0.11)" strokeWidth="38" fill="none" />
        </svg>

        {/* ── Dot grid accent ── */}
        <div className="absolute pointer-events-none" style={{
          top: "calc(var(--nav-height) + 24px)", left: "28px",
          width: "80px", height: "80px",
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.35) 1.5px, transparent 1.5px)",
          backgroundSize: "14px 14px",
        }} />

        {/* ── Ghost CIE watermark ── */}
        <div className="absolute pointer-events-none select-none" style={{
          bottom: "30px", right: "-8px",
          fontFamily: "var(--font-heading)", fontWeight: 900,
          fontSize: "clamp(160px, 28vw, 440px)",
          color: "rgba(0,0,0,0.06)", lineHeight: 1, letterSpacing: "-0.06em",
          userSelect: "none" as const,
        }}>CIE</div>

        {/* ── Main content ── */}
        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <div className={`${CONTAINER} w-full`} style={{ paddingTop: "clamp(32px,5vw,52px)", paddingBottom: "clamp(40px,6vw,60px)" }}>
            <div className="w-full grid lg:grid-cols-2 gap-10 items-center">

              {/* ── LEFT: Text ── */}
              <div style={{ position: "relative" }}>

                {/* Dashed pill badge */}
                <motion.div
                  initial={{ opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.55, delay: 0.10 }}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    background: "rgba(0,0,0,0.18)", border: "1.5px dashed rgba(255,255,255,0.35)",
                    borderRadius: "999px", padding: "5px 16px 5px 5px", marginBottom: "28px",
                  }}
                >
                  <div style={{
                    width: "28px", height: "28px", borderRadius: "50%",
                    background: "#FFFFFF", display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: "13px", flexShrink: 0,
                  }}>⚡</div>
                  <span style={{
                    fontFamily: "var(--font-body)", fontSize: "10.5px", fontWeight: 700,
                    letterSpacing: "0.15em", textTransform: "uppercase" as const,
                    color: "rgba(255,255,255,0.92)",
                  }}>MLRIT Centre for Innovation</span>
                </motion.div>

                {/* HUGE stacked display headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 64 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.95, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontFamily: "var(--font-heading)", fontWeight: 900,
                    fontSize: "clamp(48px, 13vw, 164px)",
                    lineHeight: 0.86, letterSpacing: "-0.045em",
                    textTransform: "uppercase" as const, marginBottom: 0,
                  }}
                >
                  <span style={{ display: "block", color: "#FFFFFF" }}>IDEATE</span>
                  <span style={{
                    display: "block", color: "transparent",
                    WebkitTextStroke: "3px rgba(255,255,255,0.82)",
                  }}>BUILD</span>
                  <span style={{ display: "block", color: "#FFFFFF" }}>LAUNCH</span>
                </motion.h1>

                {/* Handwritten script accent */}
                <motion.p
                  initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.65, delay: 0.52 }}
                  style={{
                    fontFamily: "var(--font-script)",
                    fontSize: "clamp(20px, 2.8vw, 34px)",
                    color: "rgba(255,255,255,0.88)", lineHeight: 1.2,
                    marginTop: "20px", marginBottom: "22px",
                    display: "inline-block", transform: "rotate(-1.8deg)",
                  }}
                >
                  — where ideas become real ventures
                </motion.p>

                {/* Body copy */}
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.65 }}
                  style={{
                    fontFamily: "var(--font-body)", fontSize: "clamp(14px, 1.5vw, 16px)",
                    lineHeight: 1.78, color: "rgba(255,255,255,0.68)",
                    maxWidth: "min(400px, 100%)", marginBottom: "36px",
                  }}
                >
                  MLRIT&apos;s Centre for Innovation &amp; Entrepreneurship — where students
                  turn ideas into real ventures through workshops, hackathons, summits,
                  and hands-on incubation across five active verticals.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.78 }}
                  style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
                >
                  <Link href="/verticals" style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    background: "transparent", color: "#FFFFFF",
                    fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "14.5px",
                    padding: "13px 22px", borderRadius: "999px", textDecoration: "none",
                    border: "1.5px solid rgba(255,255,255,0.38)",
                  }}>
                    Our Verticals <ChevronRight size={15} />
                  </Link>
                  <Link href="/about" style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    background: "transparent", color: "rgba(255,255,255,0.55)",
                    fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "14.5px",
                    padding: "13px 22px", borderRadius: "999px", textDecoration: "none",
                  }}>
                    Our Story <ChevronRight size={15} />
                  </Link>
                </motion.div>

              </div>

              {/* ── RIGHT: Polaroid collage + CIE brand badge ── */}
              <div className="hidden lg:block" style={{ position: "relative", height: "560px" }}>

                {/* Polaroid 1 — large, tilted left */}
                <motion.div
                  initial={{ opacity: 0, rotate: -18, y: 44 }} animate={{ opacity: 1, rotate: -8, y: 0 }}
                  transition={{ duration: 1.05, delay: 0.30, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: "absolute", top: "10px", left: "4%",
                    width: "212px", height: "270px", background: "#FFFFFF",
                    borderRadius: "3px", padding: "10px 10px 44px",
                    boxShadow: "0 24px 64px rgba(0,0,0,0.30), 0 6px 16px rgba(0,0,0,0.14)",
                    zIndex: 3,
                  }}
                >
                  <div style={{
                    width: "100%", height: "100%", borderRadius: "2px",
                    background: "linear-gradient(145deg, #0c0c1d, #1e3a5f 50%, #0284c7)",
                    display: "flex", flexDirection: "column" as const,
                    alignItems: "center", justifyContent: "flex-end", padding: "14px",
                  }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.38)" }}>
                      INNOVATION LAB
                    </span>
                  </div>
                  <p style={{
                    fontFamily: "var(--font-script)", fontSize: "14px",
                    color: "#94A3B8", textAlign: "center" as const, marginTop: "9px", lineHeight: 1.2,
                  }}>build &amp; create ✦</p>
                </motion.div>

                {/* Polaroid 2 — medium, tilted right */}
                <motion.div
                  initial={{ opacity: 0, rotate: 16, y: 44 }} animate={{ opacity: 1, rotate: 7, y: 0 }}
                  transition={{ duration: 1.05, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: "absolute", top: "48px", right: "3%",
                    width: "178px", height: "228px", background: "#FFFFFF",
                    borderRadius: "3px", padding: "9px 9px 36px",
                    boxShadow: "0 20px 52px rgba(0,0,0,0.26), 0 4px 12px rgba(0,0,0,0.12)",
                    zIndex: 4,
                  }}
                >
                  <div style={{
                    width: "100%", height: "100%", borderRadius: "2px",
                    background: "linear-gradient(145deg, #052e16, #059669 60%, #34d399)",
                    display: "flex", flexDirection: "column" as const,
                    alignItems: "center", justifyContent: "flex-end", padding: "12px",
                  }}>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.38)" }}>
                      STARTUP LAB
                    </span>
                  </div>
                  <p style={{
                    fontFamily: "var(--font-script)", fontSize: "14px",
                    color: "#94A3B8", textAlign: "center" as const, marginTop: "9px",
                  }}>hackathon ★</p>
                </motion.div>

                {/* Polaroid 3 — small square */}
                <motion.div
                  initial={{ opacity: 0, rotate: 8, y: 32 }} animate={{ opacity: 1, rotate: 4, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: "absolute", bottom: "132px", left: "30%",
                    width: "144px", height: "144px", background: "#FFFFFF",
                    borderRadius: "3px", padding: "8px 8px 30px",
                    boxShadow: "0 16px 44px rgba(0,0,0,0.22)", zIndex: 5,
                  }}
                >
                  <div style={{
                    width: "100%", height: "100%", borderRadius: "2px",
                    background: "linear-gradient(145deg, #1e1b4b, #7c3aed 60%, #a78bfa)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{ fontSize: "28px" }}>✨</span>
                  </div>
                </motion.div>

                {/* Stats mini card */}
                <motion.div
                  initial={{ opacity: 0, y: 26, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.72 }}
                  style={{
                    position: "absolute", bottom: "50px", right: "2%",
                    background: BG_CREAM, borderRadius: "18px",
                    padding: "18px 20px", width: "164px",
                    boxShadow: "0 14px 36px rgba(0,0,0,0.18)", zIndex: 6,
                  }}
                >
                  <p style={{
                    fontFamily: "var(--font-body)", fontSize: "9.5px", fontWeight: 700,
                    letterSpacing: "0.14em", textTransform: "uppercase" as const,
                    color: ORANGE, marginBottom: "12px",
                  }}>By the numbers</p>
                  {[
                    { n: "1000+", l: "Students" },
                    { n: "100+",  l: "Events"   },
                    { n: "50+",   l: "Projects" },
                  ].map(({ n, l }) => (
                    <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
                      <span style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "18px", color: T_PRIMARY, lineHeight: 1 }}>{n}</span>
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: T_MUTED }}>{l}</span>
                    </div>
                  ))}
                  <div style={{ height: "1px", background: "rgba(0,0,0,0.08)", margin: "10px 0" }} />
                </motion.div>

                {/* Star ✦ decorations */}
                {[
                  { top: "6px",    left: "52%",  size: 26, delay: 0.86 },
                  { top: "44%",    left: "-3%",  size: 16, delay: 0.96 },
                  { bottom: "34%", right: "40%", size: 22, delay: 1.06 },
                  { top: "28%",    right: "47%", size: 12, delay: 1.15 },
                ].map((star, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0, rotate: -30 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, delay: star.delay }}
                    style={{
                      position: "absolute",
                      top:    (star as any).top,
                      left:   (star as any).left,
                      bottom: (star as any).bottom,
                      right:  (star as any).right,
                      fontSize: `${star.size}px`,
                      color: "rgba(255,255,255,0.82)",
                      pointerEvents: "none", display: "block",
                    }}
                  >✦</motion.span>
                ))}

                {/* 3×3 dot cluster */}
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 1.10 }}
                  style={{
                    position: "absolute", top: "18px", right: "30%",
                    display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "5px",
                    pointerEvents: "none",
                  }}
                >
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(0,0,0,0.22)" }} />
                  ))}
                </motion.div>

              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom stats strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95 }}
          style={{ background: BG_CREAM, position: "relative", zIndex: 10 }}
        >
          <div className={CONTAINER}>
            <div className="grid grid-cols-2 lg:grid-cols-4 items-center">
              {stats.map((s, i) => (
                <div key={s.label} className="stats-strip-cell" style={{
                  padding: "clamp(14px,2vw,20px) clamp(12px,2vw,24px)",
                  borderRight: i < stats.length - 1 ? "1px solid rgba(0,0,0,0.08)" : "none",
                  display: "flex", alignItems: "center", gap: "clamp(8px,1.5vw,12px)",
                }}>
                  <div className="hidden sm:flex" style={{
                    width: "38px", height: "38px", borderRadius: "10px",
                    background: "rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.09)",
                    alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <s.icon size={17} style={{ color: "#555555" }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(17px,2.5vw,21px)", color: "#111111", lineHeight: 1 }}>
                      <AnimatedCounter end={s.value} suffix={s.suffix} />
                    </div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "11.5px", color: T_MUTED, marginTop: "3px" }}>
                      {s.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          STATS  —  #FFFFFF (Light Orange Background)
      ──────────────────────────────────────────────────────────── */}
      <section style={{ background: BG_CREAM, paddingTop: SECTION_PY, paddingBottom: SECTION_PY }}>
        <div className={CONTAINER}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch justify-items-stretch">
            {stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.08}>
                <div className="card-light flex flex-col items-center text-center" style={{ gap: "14px", padding: "clamp(16px,4vw,32px)" }}>
                  <div
                    className="icon-box"
                    style={{ width: "48px", height: "48px", borderRadius: "12px" }}
                  >
                    <stat.icon size={21} style={{ color: "#333333" }} />
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 800,
                      fontSize: "clamp(30px, 4vw, 42px)",
                      lineHeight: 1,
                      color: "#111111",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "13.5px",
                      fontWeight: 500,
                      color: T_MUTED,
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          VISION & MISSION  —  #FFFFFF (White)
      ──────────────────────────────────────────────────────────── */}
      <section style={{ background: BG_WHITE, paddingTop: SECTION_PY, paddingBottom: SECTION_PY }}>
        <div className={CONTAINER}>
          <FadeIn>
            <span className="section-tag">Our Purpose</span>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                fontSize: "clamp(34px, 4vw, 50px)",
                letterSpacing: "-0.03em",
                color: T_PRIMARY,
                maxWidth: "460px",
                marginBottom: "clamp(28px,5vw,52px)",
              }}
            >
              Built on Vision, Driven by Mission
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            {[
              {
                title: "Our Vision",
                content:
                  "To be a leading hub for innovation and entrepreneurship at MLRIT — fostering a culture where every student can ideate, build, and launch solutions that create real-world impact.",
              },
              {
                title: "Our Mission",
                content:
                  "Empowering MLRIT students through workshops, hackathons, summits, and incubation — providing the tools, mentorship, and networks needed to transform ideas into ventures that matter.",
              },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.12}>
                <div className="card-light h-full" style={{ padding: "clamp(24px,4vw,40px) clamp(20px,4vw,44px)" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "3px",
                      background: ORANGE,
                      borderRadius: "2px",
                      marginBottom: "22px",
                    }}
                  />
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 800,
                      fontSize: "22px",
                      letterSpacing: "-0.02em",
                      color: T_SECONDARY,
                      marginBottom: "14px",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "16px",
                      lineHeight: 1.78,
                      color: T_MED,
                    }}
                  >
                    {item.content}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          WHAT WE DO  —  #FFFFFF (Warm Neutral)
      ──────────────────────────────────────────────────────────── */}
      <section style={{ background: BG_WARM, paddingTop: SECTION_PY, paddingBottom: SECTION_PY }}>
        <div className={CONTAINER}>
          <FadeIn className="text-center mb-8 lg:mb-16">
            <span className="section-tag">What We Do</span>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                fontSize: "clamp(34px, 4vw, 50px)",
                letterSpacing: "-0.03em",
                color: T_PRIMARY,
                marginTop: "4px",
              }}
            >
              The Innovation Ecosystem
            </h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
            {studios.map((studio, i) => (
              <FadeIn key={studio.name} delay={i * 0.08}>
                <div className="card-light h-full" style={{ padding: "32px 28px" }}>
                  <div className="icon-box mb-5">
                    <studio.icon size={21} style={{ color: "#333333" }} />
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 700,
                      fontSize: "17px",
                      letterSpacing: "-0.02em",
                      color: T_SECONDARY,
                      marginBottom: "8px",
                    }}
                  >
                    {studio.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "14px",
                      lineHeight: 1.7,
                      color: T_MUTED,
                    }}
                  >
                    {studio.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          TIMELINE  —  #FFFFFF (White)
      ──────────────────────────────────────────────────────────── */}
      <section style={{ background: BG_WHITE, paddingTop: SECTION_PY, paddingBottom: SECTION_PY }}>
        <div className={CONTAINER}>
          <FadeIn className="text-center mb-8 lg:mb-16">
            <span className="section-tag">Your Journey</span>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                fontSize: "clamp(34px, 4vw, 50px)",
                letterSpacing: "-0.03em",
                color: T_PRIMARY,
                marginTop: "4px",
              }}
            >
              Startup Journey Timeline
            </h2>
          </FadeIn>

          <div className="relative">
            <div
              className="absolute top-8 left-0 right-0 h-px hidden lg:block"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(0,0,0,0.12), rgba(0,0,0,0.12), transparent)",
              }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 justify-items-center lg:justify-items-start items-start">
              {timeline.map((item, i) => (
                <FadeIn key={item.step} delay={i * 0.12}>
                  <div className="relative text-center lg:text-left">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-6 relative z-10"
                      style={{
                        background: "#111111",
                        boxShadow: `0 0 0 8px ${BG_WHITE}, 0 0 0 10px rgba(0,0,0,0.08), 0 10px 28px rgba(0,0,0,0.14)`,
                        fontFamily: "var(--font-heading)",
                        fontWeight: 800,
                        fontSize: "17px",
                        color: "#FFFFFF",
                      }}
                    >
                      {item.step}
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 800,
                        fontSize: "19px",
                        letterSpacing: "-0.02em",
                        color: T_SECONDARY,
                        marginBottom: "8px",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "14.5px",
                        lineHeight: 1.68,
                        color: T_MUTED,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          FEATURED PROGRAMS  —  #FFFFFF (Light Orange Background)
      ──────────────────────────────────────────────────────────── */}
      <section style={{ background: BG_CREAM, paddingTop: SECTION_PY, paddingBottom: SECTION_PY }}>
        <div className={CONTAINER}>
          <FadeIn>
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
              style={{ marginBottom: "clamp(28px,5vw,52px)" }}
            >
              <div>
                <span className="section-tag">Programs</span>
                <h2
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 800,
                    fontSize: "clamp(34px, 4vw, 50px)",
                    letterSpacing: "-0.03em",
                    color: T_PRIMARY,
                    marginTop: "4px",
                  }}
                >
                  Featured Programs
                </h2>
              </div>
              <Link href="/studios" className="btn-secondary-light whitespace-nowrap flex-shrink-0">
                All Programs <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-6 items-stretch">
            {programs.map((prog, i) => (
              <FadeIn key={prog.title} delay={i * 0.08}>
                <div className="card-light h-full" style={{ padding: "clamp(20px,4vw,40px)" }}>
                  <div className="flex items-start justify-between mb-6">
                    <div className="icon-box" style={{ width: "54px", height: "54px", borderRadius: "15px" }}>
                      <prog.icon size={23} style={{ color: "#333333" }} />
                    </div>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "10.5px",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase" as const,
                        color: "#555555",
                        background: "rgba(0,0,0,0.05)",
                        border: "1px solid rgba(0,0,0,0.10)",
                        padding: "4px 12px",
                        borderRadius: "999px",
                      }}
                    >
                      {prog.tag}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 800,
                      fontSize: "21px",
                      letterSpacing: "-0.02em",
                      color: T_SECONDARY,
                      marginBottom: "12px",
                    }}
                  >
                    {prog.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "15px",
                      lineHeight: 1.76,
                      color: T_MED,
                    }}
                  >
                    {prog.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          FACILITIES  —  #F5F5F5
      ──────────────────────────────────────────────────────────── */}
      <section style={{ background: "#F5F5F5", paddingTop: SECTION_PY, paddingBottom: SECTION_PY }}>
        <div className={CONTAINER}>
          <FadeIn>
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6" style={{ marginBottom: "clamp(28px,5vw,52px)" }}>
              <div>
                <span className="section-tag">Infrastructure</span>
                <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(34px, 4vw, 50px)", letterSpacing: "-0.03em", color: T_PRIMARY, marginTop: "4px" }}>
                  What We Have for You
                </h2>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "16px", color: T_MUTED, marginTop: "10px", maxWidth: "480px", lineHeight: 1.7 }}>
                  World-class spaces, tools, and networks — all free for MLRIT students.
                </p>
              </div>
              <Link href="/facilities" className="btn-secondary-light whitespace-nowrap flex-shrink-0">
                All Facilities <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>

          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}
            className="home-facilities-grid"
          >
            {homeFacilities.map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.07}>
                <div
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "14px",
                    border: "1px solid rgba(0,0,0,0.08)",
                    padding: "36px 28px 32px",
                    textAlign: "center",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    transition: "box-shadow 0.25s ease, transform 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.10)";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ marginBottom: "18px" }}>
                    <f.icon size={42} strokeWidth={1.6} style={{ color: "#111111" }} />
                  </div>
                  <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#111111", marginBottom: "12px", letterSpacing: "-0.01em" }}>
                    {f.title}
                  </h3>
                  <p style={{ fontSize: "13.5px", lineHeight: 1.72, color: "#555555" }}>
                    {f.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      <style>{`
        @media (max-width: 900px) { .home-facilities-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 560px) { .home-facilities-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      {/* ────────────────────────────────────────────────────────────
          RECENT EVENTS  —  #FFFFFF
      ──────────────────────────────────────────────────────────── */}
      <section style={{ background: BG_WARM, paddingTop: SECTION_PY, paddingBottom: SECTION_PY }}>
        <div className={CONTAINER}>
          <FadeIn>
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6" style={{ marginBottom: "clamp(28px,5vw,52px)" }}>
              <div>
                <span className="section-tag">Recent Events</span>
                <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(34px,4vw,50px)", letterSpacing: "-0.03em", color: T_PRIMARY, marginTop: "4px" }}>
                  What We&apos;ve Been Up To
                </h2>
              </div>
              <Link href="/events" className="btn-secondary-light whitespace-nowrap flex-shrink-0">
                All Events <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {recentEvents.map((ev, i) => (
              <FadeIn key={ev.title} delay={i * 0.10}>
                <div className="card-light flex flex-col h-full" style={{ padding: "0", overflow: "hidden" }}>
                  {/* Colour header strip */}
                  <div style={{ height: "6px", background: ev.accent }} />
                  <div style={{ padding: "clamp(18px,3vw,28px) clamp(18px,3vw,28px) clamp(14px,2vw,24px)", flex: 1, display: "flex", flexDirection: "column" }}>
                    {/* Category + date */}
                    <div className="flex items-center justify-between gap-2" style={{ marginBottom: "14px" }}>
                      <span style={{
                        fontFamily: "var(--font-body)", fontSize: "10px", fontWeight: 700,
                        letterSpacing: "0.1em", textTransform: "uppercase" as const,
                        color: ev.accent, background: `${ev.accent}14`,
                        border: `1px solid ${ev.accent}28`,
                        padding: "3px 10px", borderRadius: "999px",
                      }}>{ev.category}</span>
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: T_MUTED, display: "flex", alignItems: "center", gap: "4px" }}>
                        <CalendarDays size={11} /> {ev.date}
                      </span>
                    </div>
                    {/* Title */}
                    <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "19px", letterSpacing: "-0.02em", color: T_PRIMARY, marginBottom: "10px", lineHeight: 1.2 }}>
                      {ev.title}
                    </h3>
                    {/* Desc */}
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "13.5px", lineHeight: 1.72, color: T_MED, flex: 1, marginBottom: "18px" }}>
                      {ev.desc}
                    </p>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {ev.tags.map(tag => (
                        <span key={tag} style={{
                          fontFamily: "var(--font-body)", fontSize: "10px", fontWeight: 600,
                          padding: "3px 9px", borderRadius: "999px",
                          background: "rgba(0,0,0,0.04)", color: T_MUTED,
                          border: "1px solid rgba(0,0,0,0.08)",
                        }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────────
          CTA  —  warm light gradient (#FFFFFF → #FFFFFF)
          Orange used only on heading accent + primary button
      ──────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(160deg, ${BG_CREAM} 0%, ${BG_SURFACE} 50%, ${BG_WARM} 100%)`,
          paddingTop: SECTION_PY,
          paddingBottom: SECTION_PY,
        }}
      >
        {/* Decorative SVG layer — warm orange, very subtle */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Large concentric rings — bottom right */}
          <svg
            className="absolute -bottom-20 -right-20 opacity-[0.12]"
            width="520" height="520" viewBox="0 0 520 520"
          >
            <circle cx="260" cy="260" r="240" fill="none" stroke={ORANGE} strokeWidth="1.2" />
            <circle cx="260" cy="260" r="175" fill="none" stroke={ORANGE} strokeWidth="0.8" />
            <circle cx="260" cy="260" r="110" fill="none" stroke={ORANGE} strokeWidth="0.7" />
            <circle cx="260" cy="260" r="55"  fill="none" stroke={ORANGE} strokeWidth="0.6" />
            <circle cx="260" cy="260" r="8"   fill={ORANGE} opacity="0.3" />
          </svg>

          {/* Node graph — top left */}
          <svg
            className="absolute -top-10 -left-10 opacity-[0.09]"
            width="380" height="380" viewBox="0 0 380 380"
          >
            <circle cx="75"  cy="75"  r="9"  fill={ORANGE} />
            <circle cx="190" cy="55"  r="7"  fill={ORANGE} />
            <circle cx="305" cy="95"  r="11" fill={ORANGE} />
            <circle cx="55"  cy="190" r="7"  fill={ORANGE} />
            <circle cx="190" cy="190" r="13" fill={ORANGE} />
            <circle cx="320" cy="190" r="8"  fill={ORANGE} />
            <circle cx="95"  cy="305" r="10" fill={ORANGE} />
            <circle cx="250" cy="320" r="7"  fill={ORANGE} />
            <line x1="75"  y1="75"  x2="190" y2="55"  stroke={ORANGE} strokeWidth="0.8" />
            <line x1="190" y1="55"  x2="305" y2="95"  stroke={ORANGE} strokeWidth="0.8" />
            <line x1="75"  y1="75"  x2="55"  y2="190" stroke={ORANGE} strokeWidth="0.8" />
            <line x1="75"  y1="75"  x2="190" y2="190" stroke={ORANGE} strokeWidth="0.8" />
            <line x1="190" y1="55"  x2="190" y2="190" stroke={ORANGE} strokeWidth="0.8" />
            <line x1="305" y1="95"  x2="320" y2="190" stroke={ORANGE} strokeWidth="0.8" />
            <line x1="55"  y1="190" x2="190" y2="190" stroke={ORANGE} strokeWidth="0.8" />
            <line x1="190" y1="190" x2="320" y2="190" stroke={ORANGE} strokeWidth="0.8" />
            <line x1="55"  y1="190" x2="95"  y2="305" stroke={ORANGE} strokeWidth="0.8" />
            <line x1="190" y1="190" x2="250" y2="320" stroke={ORANGE} strokeWidth="0.8" />
            <line x1="320" y1="190" x2="250" y2="320" stroke={ORANGE} strokeWidth="0.8" />
          </svg>

          {/* Centre hexagon */}
          <svg
            className="absolute opacity-[0.05]"
            style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
            width="640" height="640" viewBox="0 0 640 640"
          >
            <polygon points="320,30 595,180 595,460 320,610 45,460 45,180"   fill="none" stroke={ORANGE} strokeWidth="1.2" />
            <polygon points="320,120 520,240 520,400 320,520 120,400 120,240" fill="none" stroke={ORANGE} strokeWidth="0.8" />
          </svg>

          {/* Floating dots */}
          {[
            { s: 6,  t: "22%", l: "28%", o: 0.22 },
            { s: 4,  t: "68%", l: "16%", o: 0.16 },
            { s: 8,  t: "38%", r: "22%", o: 0.14 },
            { s: 5,  t: "58%", r: "38%", o: 0.18 },
          ].map((dot, k) => (
            <div
              key={k}
              className="absolute rounded-full"
              style={{
                width: dot.s, height: dot.s,
                background: ORANGE,
                opacity: dot.o,
                top: dot.t,
                left: (dot as any).l,
                right: (dot as any).r,
              }}
            />
          ))}
        </div>

        {/* CTA content */}
        <FadeIn className="relative z-10">
          <div className={`${CONTAINER} text-center`}>
            {/* Label pill */}
            <span
              className="inline-flex items-center gap-2 mb-8"
              style={{
                background: "rgba(255,94,44,0.10)",
                border: "1px solid rgba(255,94,44,0.22)",
                color: ORANGE,
                padding: "0.32rem 0.9rem",
                borderRadius: "999px",
                fontSize: "0.72rem",
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: ORANGE }}
              />
              CIE · MLRIT
            </span>

            {/* Headline */}
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                fontSize: "clamp(38px, 5.5vw, 64px)",
                letterSpacing: "-0.03em",
                color: T_PRIMARY,
                lineHeight: 1.08,
                marginBottom: "32px",
              }}
            >
              Ready to Build{" "}
              <span style={{ color: ORANGE }}>the Future?</span>
            </h2>

            {/* Subtext */}
            <p
              className="max-w-xl mx-auto mb-10"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "18px",
                lineHeight: 1.72,
                color: T_MED,
              }}
            >
              500+ MLRIT students building products, running startups, and driving innovation
              across five active verticals.
            </p>

            {/* Ghost links */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/verticals"
                className="inline-flex items-center gap-2 rounded-[10px] transition-all duration-200"
                style={{
                  fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "1rem",
                  padding: "0.9rem 2.25rem", background: "transparent",
                  color: NAVY, border: `1.5px solid ${NAVY}30`,
                  letterSpacing: "-0.01em", textDecoration: "none",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = ORANGE; e.currentTarget.style.color = ORANGE; e.currentTarget.style.background = "rgba(255,94,44,0.04)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${NAVY}30`; e.currentTarget.style.color = NAVY; e.currentTarget.style.background = "transparent"; }}
              >
                Explore Verticals <ChevronRight size={18} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-[10px] transition-all duration-200"
                style={{
                  fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "1rem",
                  padding: "0.9rem 2.25rem", background: "transparent",
                  color: NAVY, border: `1.5px solid ${NAVY}30`,
                  letterSpacing: "-0.01em", textDecoration: "none",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = ORANGE; e.currentTarget.style.color = ORANGE; e.currentTarget.style.background = "rgba(255,94,44,0.04)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${NAVY}30`; e.currentTarget.style.color = NAVY; e.currentTarget.style.background = "transparent"; }}
              >
                Get in Touch <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
