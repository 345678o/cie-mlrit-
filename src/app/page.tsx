"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getGrainDataUri } from "@/lib/grain";
import {
  ArrowRight,
  Lightbulb,
  Rocket,
  Users,
  Trophy,
  Zap,
  Mic,
  ChevronRight,
  ChevronLeft,
  TrendingUp,
  CalendarDays,
  Layers,
  Printer,
  Handshake,
  BookOpen,
  PenLine,
  MessageSquare,
} from "lucide-react";


const EQUINOX = {
  href: "https://equinox-2.0.mlritcie.in",
  items: ["The Equinox 2.0", "E-Summit 2K26", "Oct 30 & 31", "Grab your pass ₹769"],
};
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

/* ── Section divider ──────────────────────────────────────────────── */
function SectionDivider({ topBg = "var(--bg-white)", btmBg = "var(--bg-white)" }: { topBg?: string; btmBg?: string }) {
  return (
    <div style={{ background: `linear-gradient(to bottom, ${topBg} 50%, ${btmBg} 50%)` }}>
      <div style={{
        display: "flex", alignItems: "center",
        maxWidth: "1200px", margin: "0 auto",
        padding: "0 clamp(16px, 5vw, 48px)",
      }}>
        <div style={{ flex: 1, height: "1px", background: "rgba(var(--line-rgb),0.08)" }} />
        <div style={{ display: "flex", gap: "6px", padding: "0 14px", alignItems: "center" }}>
          <div style={{ width: "3px", height: "3px", borderRadius: "50%", background: "rgba(var(--line-rgb),0.18)" }} />
          <div style={{ width: "5px", height: "5px", transform: "rotate(45deg)", background: "var(--orange)", opacity: "var(--home-divider-dot-op)" }} />
          <div style={{ width: "3px", height: "3px", borderRadius: "50%", background: "rgba(var(--line-rgb),0.18)" }} />
        </div>
        <div style={{ flex: 1, height: "1px", background: "rgba(var(--line-rgb),0.08)" }} />
      </div>
    </div>
  );
}

/* ── Data ─────────────────────────────────────────────────────────── */
const stats = [
  { value: 1000, suffix: "+", label: "Students Engaged",    icon: Users,      color: "#60A5FA" },
  { value: 15,   suffix: "+", label: "Events Hosted",       icon: Trophy,     color: "#FB923C" },
  { value: 50,   suffix: "+", label: "Projects Launched",   icon: Rocket,     color: "#C084FC" },
  { value: 10,   suffix: "+", label: "Startup Initiatives", icon: TrendingUp, color: "#4ADE80" },
];

const programs = [
  {
    icon: BookOpen,
    title: "Workshop Carnivals",
    desc: "Multi-day, multi-domain skill workshops covering UI/UX, IoT, WordPress, and more — hands-on learning that goes far beyond the classroom.",
    tag: "Workshops",
    color: "#FACC15",
  },
  {
    icon: Trophy,
    title: "Innovation Challenges",
    desc: "Events like B2B — Business to Brand and Hustle Mania push students to ideate, pitch, and execute under real-world constraints.",
    tag: "Challenges",
    color: "#F87171",
  },
  {
    icon: Zap,
    title: "Hackathons",
    desc: "Intensive 24–36 hour sprints like MetaLoop — tackling cutting-edge themes with industry mentors and prize pools up to ₹75,000.",
    tag: "Hackathons",
    color: "#60A5FA",
  },
  {
    icon: Mic,
    title: "E-Summits",
    desc: "The Equinox E-Summit brings together student innovators, startup founders, and investors for 3 days of talks, pitches, and networking.",
    tag: "Summits",
    color: "#22D3EE",
  },
];

const studios = [
  { icon: Lightbulb, name: "Skill Workshops",        color: "#FACC15", desc: "Domain-specific, hands-on workshops in tech, design, and business — run by industry experts and CIE teams across five active verticals." },
  { icon: Trophy,    name: "Competitive Events",      color: "#F87171", desc: "Brand challenges, business competitions, and hackathons that reward real problem-solving, creativity, and execution under pressure." },
  { icon: Mic,       name: "Summits & Networking",    color: "#22D3EE", desc: "Multi-day entrepreneurship summits with guest speakers, investor panels, and startup showcases — open to all MLRIT students." },
  { icon: Handshake, name: "Mentorship & Incubation", color: "#C084FC", desc: "One-on-one guidance from alumni, industry experts, and faculty — from idea-stage to launch-ready, backed by IIC and CIE." },
];

const timeline = [
  { step: "01", title: "Ideate",          desc: "Explore problems, brainstorm solutions, and validate your idea",              icon: Lightbulb,     color: "#FACC15" },
  { step: "02", title: "Build",           desc: "Turn your idea into a prototype or MVP with expert guidance",                icon: PenLine,       color: "#60A5FA" },
  { step: "03", title: "Test & Validate", desc: "Gather user feedback, iterate, and refine your solution",                    icon: MessageSquare, color: "#C084FC" },
  { step: "04", title: "Launch",          desc: "Take your product to market with the support, resources, and network to grow", icon: Rocket,        color: "#FB923C" },
  { step: "05", title: "Scale",           desc: "Build traction, access opportunities, and grow your venture sustainably",     icon: TrendingUp,    color: "#22D3EE" },
];


/* Light-theme (original) category colours, keyed by the dark-theme colour */
const CAT_LIGHT: Record<string, string> = {
  "#FACC15": "#CA8A04",
  "#F87171": "#DC2626",
  "#60A5FA": "#2563EB",
  "#22D3EE": "#0891B2",
  "#C084FC": "#9333EA",
  "#FB923C": "#EA580C",
  "#4ADE80": "#16A34A",
};
/* Per-element vars consumed by the .home-cat / .home-stat rules in the theme <style> */
const catVars = (c: string) =>
  ({ "--home-cat-d": c, "--home-cat-l": CAT_LIGHT[c] ?? c }) as React.CSSProperties;

const homeFacilities = [
  { icon: Lightbulb, title: "Innovation Labs",    desc: "High-performance workstations with NVIDIA GPUs for development, design, and rapid prototyping." },
  { icon: Handshake, title: "Mentorship",         desc: "Industry experts and alumni guiding startups through product, business strategy, and fundraising." },
  { icon: TrendingUp,title: "Investor Network",   desc: "Curated introductions to angel investors and VCs with access to pitch events across Hyderabad." },
  { icon: Layers,    title: "Co-Working Space",   desc: "Dedicated startup bays and flex desks with 24/7 member access and a professional environment." },
  { icon: Printer,   title: "Maker Space",        desc: "3D printers, laser cutters, CNC routers, soldering benches and full electronics fabrication tools." },
  { icon: CalendarDays, title: "Event Auditorium",desc: "300-seat venue with full AV, live-streaming setup, and breakout rooms for every event format." },
];

/* ── Design tokens ────────────────────────────────────────────────── */
const CONTAINER  = "page-container";
const SECTION_PY = "clamp(48px, 5vw, 80px)";
const T_PRIMARY   = "var(--text-primary)";
const T_SECONDARY = "var(--text-primary)";
const T_MED       = "var(--home-t-med)";
const T_MUTED     = "var(--text-muted)";
const ORANGE      = "var(--orange)";

/* Exact brand palette */
const BG_WHITE   = "var(--bg-white)";         /* 60% base                 */
const BG_CREAM   = "var(--bg-soft-surface)";  /* Soft surface (alternate) */
const BG_SURFACE = "var(--bg-soft-surface)";  /* Soft surface             */
const BG_WARM    = "var(--bg-warm-neutral)";  /* Soft surface (alternate) */
const NAVY       = "var(--text-primary)";     /* Primary text             */
const NAVY_30    = "color-mix(in srgb, var(--text-primary) 18.8%, transparent)"; /* = NAVY + "30" */

/* ═══════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  const timelineScrollRef = useRef<HTMLDivElement>(null);
  const [timelineEdge, setTimelineEdge] = useState({ atStart: true, atEnd: false });
  const updateTimelineEdge = () => {
    const el = timelineScrollRef.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>(":scope > *:not([aria-hidden])"));
    if (!cards.length) return;
    const first = cards[0];
    const last = cards[cards.length - 1];
    const firstTarget = first.offsetLeft + first.offsetWidth / 2 - el.clientWidth / 2;
    const lastTarget = last.offsetLeft + last.offsetWidth / 2 - el.clientWidth / 2;
    setTimelineEdge({ atStart: el.scrollLeft <= firstTarget + 4, atEnd: el.scrollLeft >= lastTarget - 4 });
  };
  useEffect(() => { updateTimelineEdge(); }, []);
  const scrollTimeline = (dir: 1 | -1) => {
    const el = timelineScrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(":scope > *:not([aria-hidden])");
    const step = (card?.offsetWidth ?? 260) + 32;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div style={{ background: BG_WHITE }}>

      {/* ── Theme tokens (dark default / light = original orange site) ── */}
      <style>{`
        :root {
          --home-t-med: rgba(244,245,250,0.72);
          --home-divider-dot-op: 0.7;
          --home-hero-bg: radial-gradient(ellipse 70% 60% at 78% 30%, rgba(116,132,254,0.22) 0%, transparent 65%), radial-gradient(ellipse 55% 50% at 10% 85%, rgba(116,132,254,0.14) 0%, transparent 70%), #16171D;
          --home-hero-deco-rgb: 116,132,254;
          --home-hero-arc1: rgba(116,132,254,0.16);
          --home-hero-arc2: rgba(116,132,254,0.12);
          --home-hero-dot: rgba(165,175,254,0.35);
          --home-hero-watermark: rgba(255,255,255,0.03);
          --home-hero-fg: #F4F5FA;
          --home-hero-stroke: #A5AFFE;
          --home-hero-script: #A5AFFE;
          --home-hero-body: rgba(244,245,250,0.72);
          --home-hero-cta-bg: var(--grad-accent);
          --home-hero-cta-fg: var(--on-accent);
          --home-hero-cta-bc: transparent;
          --home-hero-cta-shadow: 0 8px 28px rgba(51,255,103,0.18);
          --home-hero-cta2: rgba(244,245,250,0.72);
          --home-hero-star: rgba(165,175,254,0.75);
          --home-hero-cluster: rgba(116,132,254,0.45);
          --home-polaroid-border: 1px solid rgba(255,255,255,0.08);
          --home-polaroid-shadow-1: 0 24px 64px rgba(0,0,0,0.5), 0 6px 16px rgba(0,0,0,0.4);
          --home-polaroid-shadow-2: 0 20px 52px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.4);
          --home-polaroid-shadow-3: 0 16px 44px rgba(0,0,0,0.5);
          --home-polaroid-caption: rgba(244,245,250,0.58);
          --home-ribbon: #7484FE;
          --home-ribbon-text: #0A0B12;
          --home-ribbon-shadow: drop-shadow(0 8px 24px rgba(116,132,254,0.30));
          --home-ribbon-shadow-hover: drop-shadow(0 12px 36px rgba(51,255,103,0.40));
          --home-accent-text: #A5AFFE;
          --home-pill-fg: #A5AFFE;
          --home-pill1-bg: rgba(116,132,254,0.12);
          --home-pill1-border: 1px solid rgba(116,132,254,0.22);
          --home-pill2-bg: rgba(116,132,254,0.12);
          --home-pill2-border: 1px solid rgba(116,132,254,0.22);
          --home-pill3-bg: rgba(116,132,254,0.12);
          --home-pill3-border: 1px solid rgba(116,132,254,0.22);
          --home-timeline-bg: #16171D;
          --home-timeline-blob: rgba(116,132,254,0.14);
          --home-timeline-dots: rgba(255,255,255,0.08);
          --home-timeline-line: rgba(255,255,255,0.12);
          --home-timeline-node: #7484FE;
          --home-arrow-border: 1px solid rgba(255,255,255,0.08);
          --home-arrow-shadow: 0 4px 14px rgba(0,0,0,0.4);
          --home-facilities-bg: #16171D;
          --home-fac-hover-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(116,132,254,0.22);
          --home-fac-icon: #A5AFFE;
          --home-fac-title: #F4F5FA;
          --home-fac-desc: rgba(244,245,250,0.72);
          --home-cta-glow: rgba(116,132,254,0.14);
          --home-cta1-bg: var(--grad-accent);
          --home-cta1-fg: var(--on-accent);
          --home-cta1-bc: transparent;
          --home-cta1-shadow: 0 8px 28px rgba(51,255,103,0.18);
          --home-cta1-hover-bg: var(--grad-accent);
          --home-cta1-hover-fg: var(--on-accent);
          --home-cta1-hover-bc: transparent;
          --home-cta1-hover-filter: brightness(1.08);
          --home-cta1-hover-shadow: 0 10px 34px rgba(51,255,103,0.28);
          --home-cta2-hover-bg: rgba(116,132,254,0.08);
          --home-cat-a1: 12.2%;
          --home-cat-a2: 25.1%;
          --home-cat-a3: 10.2%;
        }
        :root[data-theme="light"] {
          --home-t-med: #374151;
          --home-divider-dot-op: 0.45;
          --home-hero-bg: #E8521A;
          --home-hero-deco-rgb: 255,255,255;
          --home-hero-arc1: rgba(255,255,255,0.18);
          --home-hero-arc2: rgba(255,255,255,0.14);
          --home-hero-dot: rgba(255,255,255,0.35);
          --home-hero-watermark: rgba(0,0,0,0.06);
          --home-hero-fg: #FFFFFF;
          --home-hero-stroke: rgba(255,255,255,0.82);
          --home-hero-script: rgba(255,255,255,0.88);
          --home-hero-body: rgba(255,255,255,0.68);
          --home-hero-cta-bg: transparent;
          --home-hero-cta-fg: #FFFFFF;
          --home-hero-cta-bc: rgba(255,255,255,0.38);
          --home-hero-cta-shadow: none;
          --home-hero-cta2: rgba(255,255,255,0.55);
          --home-hero-star: rgba(255,255,255,0.82);
          --home-hero-cluster: rgba(0,0,0,0.22);
          --home-polaroid-border: none;
          --home-polaroid-shadow-1: 0 24px 64px rgba(0,0,0,0.30), 0 6px 16px rgba(0,0,0,0.14);
          --home-polaroid-shadow-2: 0 20px 52px rgba(0,0,0,0.26), 0 4px 12px rgba(0,0,0,0.12);
          --home-polaroid-shadow-3: 0 16px 44px rgba(0,0,0,0.22);
          --home-polaroid-caption: #94A3B8;
          --home-ribbon: #FFFFFF;
          --home-ribbon-text: #E8521A;
          --home-ribbon-shadow: drop-shadow(0 8px 24px rgba(0,0,0,0.18));
          --home-ribbon-shadow-hover: drop-shadow(0 12px 36px rgba(0,0,0,0.28));
          --home-accent-text: #E8521A;
          --home-pill-fg: #EA580C;
          --home-pill1-bg: rgba(234,88,12,0.10);
          --home-pill1-border: none;
          --home-pill2-bg: rgba(234,88,12,0.08);
          --home-pill2-border: 1px solid rgba(234,88,12,0.20);
          --home-pill3-bg: rgba(255,94,44,0.10);
          --home-pill3-border: 1px solid rgba(255,94,44,0.22);
          --home-timeline-bg: #FFF5F0;
          --home-timeline-blob: rgba(251,146,100,0.18);
          --home-timeline-dots: rgba(0,0,0,0.12);
          --home-timeline-line: rgba(0,0,0,0.15);
          --home-timeline-node: #EA580C;
          --home-arrow-border: 1px solid rgba(0,0,0,0.10);
          --home-arrow-shadow: 0 4px 14px rgba(0,0,0,0.10);
          --home-facilities-bg: #F5F5F5;
          --home-fac-hover-shadow: 0 8px 32px rgba(0,0,0,0.10);
          --home-fac-icon: #111111;
          --home-fac-title: #111111;
          --home-fac-desc: #555555;
          --home-cta-glow: transparent;
          --home-cta1-bg: transparent;
          --home-cta1-fg: #000000;
          --home-cta1-bc: rgba(0,0,0,0.188);
          --home-cta1-shadow: none;
          --home-cta1-hover-bg: rgba(255,94,44,0.04);
          --home-cta1-hover-fg: #E8521A;
          --home-cta1-hover-bc: #E8521A;
          --home-cta1-hover-filter: none;
          --home-cta1-hover-shadow: none;
          --home-cta2-hover-bg: rgba(255,94,44,0.04);
          --home-cat-a1: 7.1%;
          --home-cat-a2: 15.7%;
          --home-cat-a3: 6.3%;
        }
        /* Category colours: dark = brighter variant, light = original */
        .home-cat { --home-cat: var(--home-cat-d); }
        :root[data-theme="light"] .home-cat { --home-cat: var(--home-cat-l); }
        /* Stats: dark = uniform indigo/green, light = original per-stat colour */
        .home-stat {
          --home-stat-fg: #A5AFFE;
          --home-stat-num: var(--accent-green);
          --home-stat-bg: rgba(116,132,254,0.12);
          --home-stat-bd: rgba(116,132,254,0.22);
        }
        :root[data-theme="light"] .home-stat {
          --home-stat-fg: var(--home-cat-l);
          --home-stat-num: var(--home-cat-l);
          --home-stat-bg: color-mix(in srgb, var(--home-cat-l) 7.8%, transparent);
          --home-stat-bd: color-mix(in srgb, var(--home-cat-l) 15.7%, transparent);
        }
      `}</style>

      {/* ────────────────────────────────────────────────────────────
          HERO  —  Bold Editorial Collage
      ──────────────────────────────────────────────────────────── */}
      <section
        className="page-hero hero-shrink-mobile relative overflow-hidden flex flex-col"
        style={{ background: "var(--home-hero-bg)", paddingTop: "var(--nav-height)", minHeight: "100vh" }}
      >
        {/* ── Grain texture (matches Image 1 paper grain) ── */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: getGrainDataUri(0.75, 200),
          opacity: 0.13, mixBlendMode: "overlay" as const,
        }} />

        {/* ── Large arc — top right (Image 1 reference) ── */}
        <svg aria-hidden className="absolute pointer-events-none"
          style={{ top: "-18%", right: "-10%", width: "52vw", height: "52vw", maxWidth: 620, maxHeight: 620 }}
          viewBox="0 0 620 620" fill="none">
          <circle cx="310" cy="310" r="290" style={{ stroke: "var(--home-hero-arc1)" }} strokeWidth="80" fill="none" />
        </svg>

        {/* ── Medium arc — bottom right ── */}
        <svg aria-hidden className="absolute pointer-events-none"
          style={{ bottom: "-14%", right: "-6%", width: "28vw", height: "28vw", maxWidth: 340, maxHeight: 340 }}
          viewBox="0 0 340 340" fill="none">
          <circle cx="170" cy="170" r="150" style={{ stroke: "var(--home-hero-arc2)" }} strokeWidth="50" fill="none" />
        </svg>

        {/* ── Diagonal cut — bottom left (Image 1 reference) ── */}
        <svg aria-hidden className="absolute pointer-events-none"
          style={{ bottom: 0, left: 0, width: "36vw", height: "36vw", maxWidth: 420, maxHeight: 420 }}
          viewBox="0 0 420 420" fill="none">
          <path d="M0,420 L280,420 L0,140 Z" style={{ fill: "rgba(var(--home-hero-deco-rgb),0.10)" }} />
          <path d="M0,420 L180,420 L0,260 Z" style={{ fill: "rgba(var(--home-hero-deco-rgb),0.07)" }} />
        </svg>

        {/* ── Small arc — top left ── */}
        <svg aria-hidden className="absolute pointer-events-none"
          style={{ top: "-8%", left: "-8%", width: "20vw", height: "20vw", maxWidth: 220, maxHeight: 220 }}
          viewBox="0 0 220 220" fill="none">
          <circle cx="110" cy="110" r="95" style={{ stroke: "rgba(var(--home-hero-deco-rgb),0.11)" }} strokeWidth="38" fill="none" />
        </svg>

        {/* ── Dot grid accent ── */}
        <div className="absolute pointer-events-none" style={{
          top: "calc(var(--nav-height) + 24px)", left: "28px",
          width: "80px", height: "80px",
          backgroundImage: "radial-gradient(circle, var(--home-hero-dot) 1.5px, transparent 1.5px)",
          backgroundSize: "14px 14px",
        }} />

        {/* ── Ghost CIE watermark ── */}
        <div className="absolute pointer-events-none select-none" style={{
          bottom: "30px", right: "-8px",
          fontFamily: "var(--font-heading)", fontWeight: 900,
          fontSize: "clamp(160px, 28vw, 440px)",
          color: "var(--home-hero-watermark)", lineHeight: 1, letterSpacing: "-0.06em",
          userSelect: "none" as const,
        }}>CIE</div>

        {/* ── Equinox 2.0 announcement bar — top of the hero, under the navbar ── */}
        <a
          href={EQUINOX.href}
          target="_blank" rel="noopener noreferrer"
          aria-label="The Equinox 2.0 — E-Summit 2K26, Oct 30 and 31. Grab your pass for ₹769"
          className="eq-bar"
        >
          <div className="eq-bar-track" aria-hidden="true">
            {[0, 1].map((copy) => (
              <div key={copy} className="eq-bar-group">
                {Array.from({ length: 4 }, (_, i) => (
                  <span key={i} className="eq-bar-item">
                    {EQUINOX.items.map((t) => (
                      <span key={t}>{t}<span className="eq-bar-sep">✦</span></span>
                    ))}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </a>
        <style>{`
          .eq-bar {
            position: relative; z-index: 2; display: block; overflow: hidden;
            margin-top: clamp(8px, 1.2vw, 14px);
            background: var(--grad-accent);
            color: var(--on-accent);
            text-decoration: none;
            box-shadow: 0 8px 28px rgba(116,132,254,0.28);
            -webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
                    mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
            transition: box-shadow 0.3s ease;
          }
          .eq-bar:hover { box-shadow: 0 10px 34px rgba(51,255,103,0.38); }
          .eq-bar-track { display: flex; width: max-content; animation: eq-bar-scroll 38s linear infinite; }
          .eq-bar:hover .eq-bar-track { animation-play-state: paused; }
          .eq-bar-group, .eq-bar-item { display: flex; flex-shrink: 0; }
          .eq-bar-item > span {
            display: inline-flex; align-items: center; white-space: nowrap;
            padding: clamp(9px, 1vw, 12px) 0;
            font-family: var(--font-heading); font-weight: 800;
            font-size: clamp(12px, 1.1vw, 14px); letter-spacing: 0.14em; text-transform: uppercase;
          }
          .eq-bar-sep { margin: 0 clamp(14px, 1.8vw, 24px); opacity: 0.55; }
          @keyframes eq-bar-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          @media (prefers-reduced-motion: reduce) { .eq-bar-track { animation: none; } }
        `}</style>

        {/* ── Main content ── */}
        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <div className={`${CONTAINER} w-full`} style={{ paddingTop: "clamp(32px,5vw,52px)", paddingBottom: "clamp(40px,6vw,60px)" }}>
            <div className="w-full grid lg:grid-cols-2 items-center" style={{ gap: "clamp(40px, 8vw, 120px)" }}>

              {/* ── LEFT: Text ── */}
              <div style={{ position: "relative" }}>

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
                  <span style={{ display: "block", color: "var(--home-hero-fg)" }}>IDEATE</span>
                  <span style={{
                    display: "block", color: "transparent",
                    WebkitTextStroke: "3px var(--home-hero-stroke)",
                  }}>BUILD</span>
                  <span style={{ display: "block", color: "var(--home-hero-fg)", fontSize: "0.74em" }}>INNOVATE</span>
                </motion.h1>

                {/* Handwritten script accent */}
                <motion.p
                  initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.65, delay: 0.52 }}
                  style={{
                    fontFamily: "var(--font-script)",
                    fontSize: "clamp(20px, 2.8vw, 34px)",
                    color: "var(--home-hero-script)", lineHeight: 1.2,
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
                    lineHeight: 1.78, color: "var(--home-hero-body)",
                    maxWidth: "min(400px, 100%)", marginBottom: "14px",
                  }}
                >
                  A place where students come together to explore ideas, build projects,
                  learn new skills, and turn their curiosity into something real.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.70 }}
                  style={{
                    fontFamily: "var(--font-body)", fontSize: "clamp(14px, 1.5vw, 16px)",
                    lineHeight: 1.78, color: "var(--home-hero-body)",
                    maxWidth: "min(400px, 100%)", marginBottom: "36px",
                  }}
                >
                  At CIE, you don&apos;t need to have everything figured out before you
                  begin. You just need an idea, an interest, or the willingness to learn.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.78 }}
                  style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
                >
                  <Link href="/verticals" style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    background: "var(--home-hero-cta-bg)", color: "var(--home-hero-cta-fg)",
                    fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "14.5px",
                    padding: "13px 22px", borderRadius: "999px", textDecoration: "none",
                    border: "1.5px solid var(--home-hero-cta-bc)",
                    boxShadow: "var(--home-hero-cta-shadow)",
                  }}>
                    Our Verticals <ChevronRight size={15} />
                  </Link>
                  <Link href="/about" style={{
                    display: "inline-flex", alignItems: "center", gap: "6px",
                    background: "transparent", color: "var(--home-hero-cta2)",
                    fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "14.5px",
                    padding: "13px 22px", borderRadius: "999px", textDecoration: "none",
                  }}>
                    Our Story <ChevronRight size={15} />
                  </Link>
                </motion.div>

              </div>

              {/* ── RIGHT: Polaroid collage + CIE brand badge ── */}
              <div className="hidden lg:block" style={{ position: "relative", height: "660px" }}>

                {/* Polaroid 1 — large, tilted left */}
                <motion.div
                  initial={{ opacity: 0, rotate: -18, y: 44 }} animate={{ opacity: 1, rotate: -8, y: 0 }}
                  transition={{ duration: 1.05, delay: 0.30, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: "absolute", top: "10px", left: "4%",
                    width: "212px", height: "270px", background: "var(--bg-card)", border: "var(--home-polaroid-border)",
                    borderRadius: "3px", padding: "10px 10px 44px",
                    boxShadow: "var(--home-polaroid-shadow-1)",
                    zIndex: 3,
                  }}
                >
                  <div style={{
                    width: "100%", height: "100%", borderRadius: "2px",
                    position: "relative", overflow: "hidden",
                    display: "flex", flexDirection: "column" as const,
                    alignItems: "center", justifyContent: "flex-end", padding: "14px",
                  }}>
                    <Image
                      src="/gallery/innovation-challenge.webp"
                      alt="Innovation Challenge"
                      fill
                      sizes="212px"
                      style={{ objectFit: "cover", zIndex: 0 }}
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)", zIndex: 1 }} />
                    <span style={{ position: "relative", zIndex: 2, fontFamily: "var(--font-body)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.85)" }}>
                      INNOVATION LAB
                    </span>
                  </div>
                  <p style={{
                    fontFamily: "var(--font-script)", fontSize: "14px",
                    color: "var(--home-polaroid-caption)", textAlign: "center" as const, marginTop: "9px", lineHeight: 1.2,
                  }}>build &amp; create ✦</p>
                </motion.div>

                {/* Polaroid 2 — medium, tilted right */}
                <motion.div
                  initial={{ opacity: 0, rotate: 16, y: 44 }} animate={{ opacity: 1, rotate: 7, y: 0 }}
                  transition={{ duration: 1.05, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: "absolute", top: "48px", right: "3%",
                    width: "178px", height: "228px", background: "var(--bg-card)", border: "var(--home-polaroid-border)",
                    borderRadius: "3px", padding: "9px 9px 36px",
                    boxShadow: "var(--home-polaroid-shadow-2)",
                    zIndex: 4,
                  }}
                >
                  <div style={{
                    width: "100%", height: "100%", borderRadius: "2px",
                    position: "relative", overflow: "hidden",
                    display: "flex", flexDirection: "column" as const,
                    alignItems: "center", justifyContent: "flex-end", padding: "12px",
                  }}>
                    <Image
                      src="/gallery/startup-lab.jpg"
                      alt="Startup Lab"
                      fill
                      sizes="178px"
                      style={{ objectFit: "cover", zIndex: 0 }}
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)", zIndex: 1 }} />
                    <span style={{ position: "relative", zIndex: 2, fontFamily: "var(--font-body)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.85)" }}>
                      STARTUP LAB
                    </span>
                  </div>
                  <p style={{
                    fontFamily: "var(--font-script)", fontSize: "14px",
                    color: "var(--home-polaroid-caption)", textAlign: "center" as const, marginTop: "9px",
                  }}>hackathon ★</p>
                </motion.div>

                {/* Polaroid 3 — small square */}
                <motion.div
                  initial={{ opacity: 0, rotate: 8, y: 32 }} animate={{ opacity: 1, rotate: 4, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: "absolute", top: "310px", left: "calc(50% - 160px)",
                    width: "320px", height: "320px", background: "var(--bg-card)", border: "var(--home-polaroid-border)",
                    borderRadius: "3px", padding: "14px 14px 44px",
                    boxShadow: "var(--home-polaroid-shadow-3)", zIndex: 5,
                  }}
                >
                  <div style={{
                    width: "100%", height: "100%", borderRadius: "2px",
                    position: "relative", overflow: "hidden",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Image
                      src="/gallery/innovation-challenge-group.jpg"
                      alt="Innovation Challenge"
                      fill
                      sizes="320px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </motion.div>

                {/* Star ✦ decorations */}
                {([
                  { top: "6px",    left: "52%",  size: 26, delay: 0.86 },
                  { top: "44%",    left: "-3%",  size: 16, delay: 0.96 },
                  { bottom: "34%", right: "40%", size: 22, delay: 1.06 },
                  { top: "28%",    right: "47%", size: 12, delay: 1.15 },
                ] as { top?: string; left?: string; bottom?: string; right?: string; size: number; delay: number }[]).map((star, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0, rotate: -30 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, delay: star.delay }}
                    style={{
                      position: "absolute",
                      top:    star.top,
                      left:   star.left,
                      bottom: star.bottom,
                      right:  star.right,
                      fontSize: `${star.size}px`,
                      color: "var(--home-hero-star)",
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
                    <div key={i} style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--home-hero-cluster)" }} />
                  ))}
                </motion.div>

              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ────────────────────────────────────────────────────────────
          STATS  —  #1C1D26 (soft surface)
      ──────────────────────────────────────────────────────────── */}
      <section style={{ background: BG_CREAM, paddingTop: SECTION_PY, paddingBottom: SECTION_PY }}>
        <div className={CONTAINER}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 items-stretch justify-items-stretch">
            {stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.08}>
                <div className="card-light home-stat flex flex-col items-center text-center" style={{ gap: "14px", padding: "clamp(16px,4vw,32px)", ...catVars(stat.color) }}>
                  <div
                    style={{
                      width: "48px", height: "48px", borderRadius: "12px",
                      background: "var(--home-stat-bg)",
                      border: "1px solid var(--home-stat-bd)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    <stat.icon size={21} style={{ color: "var(--home-stat-fg)" }} />
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 800,
                      fontSize: "clamp(30px, 4vw, 42px)",
                      lineHeight: 1,
                      color: "var(--home-stat-num)",
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

      <SectionDivider topBg="var(--bg-soft-surface)" btmBg="var(--bg-white)" />

      {/* ────────────────────────────────────────────────────────────
          VISION & MISSION  —  #16171D (base)
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
                maxWidth: "620px",
                marginBottom: "20px",
              }}
            >
              Built on Vision, Driven by Mission
            </h2>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: "16px", lineHeight: 1.8,
              color: T_MED, maxWidth: "980px", marginBottom: "clamp(28px,5vw,52px)",
            }}>
              Every idea starts somewhere — a problem you notice, a conversation with
              friends, or simply the thought: <em>&ldquo;What if we tried this?&rdquo;</em> CIE
              is a student-driven community of builders, designers, writers, and
              first-time founders who learn by doing. You don&apos;t have to be an
              expert to be part of it — you just have to be willing to start.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            {[
              {
                title: "Our Vision",
                content:
                  "We want to build a culture where students are comfortable asking questions, exploring ideas, and taking the first step towards building something of their own. We want students to leave CIE with more than certificates or event memories — with experiences, skills, friendships, confidence, and the belief that they can build something meaningful.",
              },
              {
                title: "Our Mission",
                content:
                  "Our mission is to create opportunities for students to learn through experience — working on projects, workshops, products, events, and real responsibility across different teams. CIE is a place to try things. Some ideas will work, some will not, but every attempt should teach us something. That is the kind of learning environment we want to build.",
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

      <SectionDivider topBg="var(--bg-white)" btmBg="var(--bg-warm-neutral)" />

      {/* ────────────────────────────────────────────────────────────
          WHAT WE DO  —  #1C1D26 (soft surface)
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
            <p style={{
              fontFamily: "var(--font-body)", fontSize: "16px", lineHeight: 1.8,
              color: T_MUTED, maxWidth: "920px", margin: "16px auto 0",
            }}>
              Good ideas rarely grow alone — they grow through conversations, feedback,
              teamwork, and people willing to help. At CIE, most of the learning happens
              through doing: microprojects, product development, workshops, hackathons,
              entrepreneurship, and media, across five active verticals that bring
              different skills together.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-6 items-stretch">
            {studios.map((studio, i) => (
              <FadeIn key={studio.name} delay={i * 0.08}>
                <div
                  className="card-light home-cat h-full"
                  style={{
                    ...catVars(studio.color),
                    padding: "clamp(20px,3vw,32px)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  {/* Icon */}
                  <div style={{
                    width: "64px", height: "64px", borderRadius: "18px",
                    background: "color-mix(in srgb, var(--home-cat) var(--home-cat-a1), transparent)",
                    border: "1px solid color-mix(in srgb, var(--home-cat) var(--home-cat-a2), transparent)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginBottom: "24px",
                  }}>
                    <studio.icon size={24} style={{ color: "var(--home-cat)" }} />
                  </div>
                  {/* Title */}
                  <h3 style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    fontSize: "clamp(20px,2.5vw,28px)",
                    lineHeight: 1.25,
                    letterSpacing: "-0.02em",
                    color: T_SECONDARY,
                    marginBottom: "20px",
                  }}>
                    {studio.name}
                  </h3>
                  {/* Description */}
                  <p style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "17px",
                    lineHeight: 1.8,
                    color: T_MUTED,
                    flex: 1,
                  }}>
                    {studio.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider topBg="var(--bg-warm-neutral)" btmBg="var(--home-timeline-bg)" />

      {/* ────────────────────────────────────────────────────────────
          TIMELINE  —  #16171D (base) + indigo glows
      ──────────────────────────────────────────────────────────── */}
      <section style={{ background: "var(--home-timeline-bg)", paddingTop: SECTION_PY, paddingBottom: SECTION_PY, position: "relative", overflow: "hidden" }}>
        {/* Blob left */}
        <div style={{ position: "absolute", left: "-140px", top: "50%", transform: "translateY(-50%)", width: "340px", height: "420px", borderRadius: "50%", background: "var(--home-timeline-blob)", filter: "blur(72px)", pointerEvents: "none" }} />
        {/* Blob right */}
        <div style={{ position: "absolute", right: "-140px", top: "50%", transform: "translateY(-50%)", width: "340px", height: "420px", borderRadius: "50%", background: "var(--home-timeline-blob)", filter: "blur(72px)", pointerEvents: "none" }} />
        {/* Dot grid top-left */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "180px", height: "180px", backgroundImage: "radial-gradient(circle, var(--home-timeline-dots) 1px, transparent 1px)", backgroundSize: "18px 18px", pointerEvents: "none" }} />
        {/* Dot grid top-right */}
        <div style={{ position: "absolute", top: 0, right: 0, width: "180px", height: "180px", backgroundImage: "radial-gradient(circle, var(--home-timeline-dots) 1px, transparent 1px)", backgroundSize: "18px 18px", pointerEvents: "none" }} />

        <div className={CONTAINER} style={{ position: "relative", zIndex: 1 }}>
          <FadeIn className="text-center mb-20 lg:mb-24">
            <span style={{
              display: "inline-flex", alignItems: "center",
              background: "var(--home-pill1-bg)", border: "var(--home-pill1-border)",
              color: "var(--home-pill-fg)", padding: "0.32rem 0.9rem", borderRadius: "999px",
              fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.07em",
              textTransform: "uppercase", marginBottom: "1.25rem",
              fontFamily: "var(--font-body)",
            }}>Your Journey</span>
            <h2 style={{
              fontFamily: "var(--font-heading)", fontWeight: 800,
              fontSize: "clamp(34px, 4vw, 50px)", letterSpacing: "-0.03em",
              color: T_PRIMARY, marginTop: "0",
            }}>
              Startup Journey Timeline
            </h2>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: "16px",
              color: T_MUTED, marginTop: "16px", lineHeight: 1.7,
              maxWidth: "820px", marginLeft: "auto", marginRight: "auto",
            }}>
              There&apos;s no fixed journey at CIE. Most start with curiosity — you
              explore, find people to work with, try building something, make mistakes,
              and improve. Over time, that curiosity turns into bigger responsibilities
              and real ventures.
            </p>
          </FadeIn>

          <div className="relative" style={{ marginTop: "56px" }}>
            {/* Horizontal connector line */}
            <div className="absolute hidden lg:block" style={{
              top: "32px", left: "10%", right: "10%", height: "1px",
              background: "var(--home-timeline-line)", zIndex: 0,
            }} />
            {/* Orange midpoint dots */}
            {[20, 40, 60, 80].map((pct) => (
              <div key={pct} className="absolute hidden lg:block" style={{
                top: "28px", left: `${pct}%`, transform: "translateX(-50%)",
                width: "8px", height: "8px", borderRadius: "50%",
                background: "var(--home-timeline-node)", zIndex: 2,
              }} />
            ))}

            <div
              ref={timelineScrollRef}
              onScroll={updateTimelineEdge}
              className="flex overflow-x-auto snap-x snap-mandatory gap-12 pb-2 lg:pb-0 lg:grid lg:grid-cols-5 lg:gap-8 lg:overflow-visible"
              style={{ scrollbarWidth: "none", overflowAnchor: "none" }}
            >
              <div aria-hidden className="shrink-0 lg:hidden" style={{ width: "calc(50vw - 130px)" }} />
              {timeline.map((item, i) => (
                <FadeIn key={item.step} delay={i * 0.12} className="shrink-0 w-[70vw] max-w-[260px] snap-center lg:w-auto lg:max-w-none">
                  <div className="home-cat" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "32px", ...catVars(item.color) }}>
                    {/* Circle */}
                    <div style={{
                      width: "64px", height: "64px", borderRadius: "50%",
                      background: "var(--home-cat)", flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      position: "relative", zIndex: 10,
                      fontFamily: "var(--font-heading)", fontWeight: 800,
                      fontSize: "17px", color: "var(--on-accent)",
                    }}>
                      {item.step}
                    </div>
                    {/* Content */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                      {/* Icon */}
                      <div style={{
                        width: "64px", height: "64px", borderRadius: "18px",
                        background: "color-mix(in srgb, var(--home-cat) var(--home-cat-a1), transparent)",
                        border: "1px solid color-mix(in srgb, var(--home-cat) var(--home-cat-a2), transparent)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <item.icon size={28} style={{ color: "var(--home-cat)" }} />
                      </div>
                      {/* Title */}
                      <h3 style={{
                        fontFamily: "var(--font-heading)", fontWeight: 700,
                        fontSize: "26px", letterSpacing: "-0.02em",
                        color: T_SECONDARY, marginTop: "24px",
                      }}>
                        {item.title}
                      </h3>
                      {/* Description */}
                      <p style={{
                        fontFamily: "var(--font-body)", fontSize: "16px",
                        lineHeight: 1.7, color: T_MUTED,
                        marginTop: "16px", maxWidth: "220px",
                      }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
              <div aria-hidden className="shrink-0 lg:hidden" style={{ width: "calc(50vw - 130px)" }} />
            </div>

            {/* Prev/next arrows — mobile carousel only, hidden at each end */}
            {!timelineEdge.atStart && (
              <button
                type="button"
                aria-label="Previous step"
                onClick={() => scrollTimeline(-1)}
                className="lg:hidden absolute z-20 flex items-center justify-center"
                style={{
                  left: "4px", top: "28px", width: "40px", height: "40px",
                  borderRadius: "50%", background: "var(--bg-card)",
                  border: "var(--home-arrow-border)", boxShadow: "var(--home-arrow-shadow)",
                }}
              >
                <ChevronLeft size={20} style={{ color: T_SECONDARY }} />
              </button>
            )}
            {!timelineEdge.atEnd && (
              <button
                type="button"
                aria-label="Next step"
                onClick={() => scrollTimeline(1)}
                className="lg:hidden absolute z-20 flex items-center justify-center"
                style={{
                  right: "4px", top: "28px", width: "40px", height: "40px",
                  borderRadius: "50%", background: "var(--bg-card)",
                  border: "var(--home-arrow-border)", boxShadow: "var(--home-arrow-shadow)",
                }}
              >
                <ChevronRight size={20} style={{ color: T_SECONDARY }} />
              </button>
            )}
          </div>
        </div>
      </section>

      <SectionDivider topBg="var(--home-timeline-bg)" btmBg="var(--bg-soft-surface)" />

      {/* ────────────────────────────────────────────────────────────
          FEATURED PROGRAMS  —  #1C1D26 (soft surface)
      ──────────────────────────────────────────────────────────── */}
      <section style={{ background: BG_CREAM, paddingTop: SECTION_PY, paddingBottom: SECTION_PY }}>
        <div className={CONTAINER}>
          <FadeIn>
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
              style={{ marginBottom: "clamp(28px,5vw,52px)" }}
            >
              <div>
                <span style={{
                  display: "inline-flex", alignItems: "center",
                  background: "var(--home-pill2-bg)", border: "var(--home-pill2-border)",
                  color: "var(--home-pill-fg)", padding: "0.32rem 0.9rem", borderRadius: "999px",
                  fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.07em",
                  textTransform: "uppercase", marginBottom: "1rem",
                  fontFamily: "var(--font-body)",
                }}>Programs</span>
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
                <p style={{
                  fontFamily: "var(--font-body)", fontSize: "16px", color: T_MUTED,
                  marginTop: "10px", maxWidth: "640px", lineHeight: 1.7,
                }}>
                  Ideas matter, but what we do with them matters more. A simple idea can
                  become a microproject, a project can grow into a product, and not
                  everything works on the first attempt — that&apos;s part of the process.
                </p>
              </div>
              <Link href="/verticals" className="btn-secondary-light whitespace-nowrap flex-shrink-0">
                All Programs <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-6 items-stretch">
            {programs.map((prog, i) => (
              <FadeIn key={prog.title} delay={i * 0.08}>
                <div className="card-light home-cat h-full" style={{ padding: "clamp(20px,3vw,32px)", ...catVars(prog.color) }}>
                  <div className="flex items-start gap-4">
                    {/* Icon — left */}
                    <div style={{
                      width: "68px", height: "68px", borderRadius: "16px",
                      background: "color-mix(in srgb, var(--home-cat) var(--home-cat-a1), transparent)",
                      border: "1px solid color-mix(in srgb, var(--home-cat) var(--home-cat-a2), transparent)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <prog.icon size={28} style={{ color: "var(--home-cat)" }} />
                    </div>
                    {/* Text — right */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3" style={{ marginBottom: "10px" }}>
                        <h3 style={{
                          fontFamily: "var(--font-heading)",
                          fontWeight: 800,
                          fontSize: "18px",
                          letterSpacing: "-0.02em",
                          color: T_SECONDARY,
                        }}>
                          {prog.title}
                        </h3>
                        <span style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "10px",
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase" as const,
                          color: "var(--home-cat)",
                          background: "color-mix(in srgb, var(--home-cat) var(--home-cat-a3), transparent)",
                          border: "1px solid color-mix(in srgb, var(--home-cat) var(--home-cat-a2), transparent)",
                          padding: "3px 10px",
                          borderRadius: "999px",
                          whiteSpace: "nowrap" as const,
                          flexShrink: 0,
                        }}>
                          {prog.tag}
                        </span>
                      </div>
                      <p style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "14.5px",
                        lineHeight: 1.72,
                        color: T_MED,
                      }}>
                        {prog.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider topBg="var(--bg-soft-surface)" btmBg="var(--home-facilities-bg)" />

      {/* ────────────────────────────────────────────────────────────
          FACILITIES  —  #16171D (base)
      ──────────────────────────────────────────────────────────── */}
      <section style={{ background: "var(--home-facilities-bg)", paddingTop: SECTION_PY, paddingBottom: SECTION_PY }}>
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
              <Link href="/about#facilities" className="btn-secondary-light whitespace-nowrap flex-shrink-0">
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
                    background: "var(--bg-card)",
                    borderRadius: "14px",
                    border: "1px solid rgba(var(--line-rgb),0.08)",
                    padding: "36px 28px 32px",
                    textAlign: "center",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    transition: "box-shadow 0.25s ease, transform 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--home-fac-hover-shadow)";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ marginBottom: "18px" }}>
                    <f.icon size={42} strokeWidth={1.6} style={{ color: "var(--home-fac-icon)" }} />
                  </div>
                  <h3 style={{ fontSize: "17px", fontWeight: 700, color: "var(--home-fac-title)", marginBottom: "12px", letterSpacing: "-0.01em" }}>
                    {f.title}
                  </h3>
                  <p style={{ fontSize: "13.5px", lineHeight: 1.72, color: "var(--home-fac-desc)" }}>
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

      <SectionDivider topBg="var(--home-facilities-bg)" btmBg="var(--bg-soft-surface)" />

      {/* ────────────────────────────────────────────────────────────
          CTA  —  #1C1D26 soft surface with indigo glow
          Indigo on heading accent, gradient on primary button
      ──────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: `radial-gradient(ellipse 60% 55% at 50% 45%, var(--home-cta-glow) 0%, transparent 70%), linear-gradient(160deg, ${BG_CREAM} 0%, ${BG_SURFACE} 50%, ${BG_WARM} 100%)`,
          paddingTop: SECTION_PY,
          paddingBottom: SECTION_PY,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Decorative layer — symmetrical left + right, z-0 */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
          {/* Concentric rings — bottom-right */}
          <svg className="absolute -bottom-20 -right-20 opacity-[0.25]" style={{ color: ORANGE }} width="480" height="480" viewBox="0 0 480 480">
            <circle cx="240" cy="240" r="220" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="240" cy="240" r="160" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="240" cy="240" r="100" fill="none" stroke="currentColor" strokeWidth="0.7" />
            <circle cx="240" cy="240" r="50"  fill="none" stroke="currentColor" strokeWidth="0.6" />
          </svg>
          {/* Concentric rings — top-left (mirror) */}
          <svg className="absolute -top-20 -left-20 opacity-[0.25]" style={{ color: ORANGE }} width="480" height="480" viewBox="0 0 480 480">
            <circle cx="240" cy="240" r="220" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="240" cy="240" r="160" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="240" cy="240" r="100" fill="none" stroke="currentColor" strokeWidth="0.7" />
            <circle cx="240" cy="240" r="50"  fill="none" stroke="currentColor" strokeWidth="0.6" />
          </svg>
          {/* Centre hexagon */}
          <svg className="absolute opacity-[0.10]" style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", color: ORANGE }} width="600" height="600" viewBox="0 0 600 600">
            <polygon points="300,20 565,165 565,435 300,580 35,435 35,165" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <polygon points="300,110 490,220 490,380 300,490 110,380 110,220" fill="none" stroke="currentColor" strokeWidth="0.8" />
          </svg>
          {/* Symmetrical floating dots */}
          {([
            { s: 6, t: "22%", l: "8%",  o: 0.20 },
            { s: 4, t: "65%", l: "12%", o: 0.15 },
            { s: 6, t: "22%", r: "8%",  o: 0.20 },
            { s: 4, t: "65%", r: "12%", o: 0.15 },
            { s: 5, t: "45%", l: "5%",  o: 0.12 },
            { s: 5, t: "45%", r: "5%",  o: 0.12 },
          ] as { s: number; t: string; l?: string; r?: string; o: number }[]).map((dot, k) => (
            <div key={k} className="absolute rounded-full" style={{
              width: dot.s, height: dot.s,
              background: ORANGE, opacity: dot.o, top: dot.t,
              left: dot.l, right: dot.r,
            }} />
          ))}
        </div>

        {/* CTA content — true center */}
        <div style={{ position: "relative", zIndex: 10, width: "100%" }}>
        <FadeIn>
          <div style={{
            maxWidth: "900px",
            width: "100%",
            margin: "0 auto",
            padding: "0 1.25rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}>
            {/* Label pill */}
            <span
              className="inline-flex items-center gap-2"
              style={{
                background: "var(--home-pill3-bg)",
                border: "var(--home-pill3-border)",
                color: "var(--home-accent-text)",
                padding: "0.32rem 0.9rem",
                borderRadius: "999px",
                fontSize: "0.72rem",
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                marginBottom: "32px",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent-green)" }} />
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
              <span style={{ color: "var(--home-accent-text)" }}>the Future?</span>
            </h2>

            {/* Tagline */}
            <p style={{
              fontFamily: "var(--font-heading)", fontWeight: 700,
              fontSize: "clamp(15px, 1.6vw, 18px)", letterSpacing: "-0.01em",
              color: "var(--home-accent-text)", marginBottom: "20px",
            }}>
              Think Bold. Build Fearlessly. Lead with Purpose.
            </p>

            {/* Subtext */}
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "18px",
                lineHeight: 1.72,
                color: T_MED,
                maxWidth: "820px",
                marginBottom: "40px",
              }}
            >
              Every project you see today once started as an unfinished idea, and every
              skilled founder was once a beginner. Whether you want to build your first
              project, learn how events are organised, or you simply haven&apos;t found
              your thing yet — CIE gives you a space to start, learn, and build alongside
              500+ students figuring it out together.
            </p>

            {/* Buttons */}
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
              <Link
                href="/verticals"
                className="inline-flex items-center gap-2 rounded-[10px] transition-all duration-200"
                style={{
                  fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "1rem",
                  padding: "0.9rem 2.25rem", background: "var(--home-cta1-bg)",
                  color: "var(--home-cta1-fg)", border: "1.5px solid var(--home-cta1-bc)",
                  letterSpacing: "-0.01em", textDecoration: "none",
                  boxShadow: "var(--home-cta1-shadow)",
                }}
                onMouseEnter={(e) => { const s = e.currentTarget.style; s.filter = "var(--home-cta1-hover-filter)"; s.boxShadow = "var(--home-cta1-hover-shadow)"; s.borderColor = "var(--home-cta1-hover-bc)"; s.color = "var(--home-cta1-hover-fg)"; s.background = "var(--home-cta1-hover-bg)"; }}
                onMouseLeave={(e) => { const s = e.currentTarget.style; s.filter = "none"; s.boxShadow = "var(--home-cta1-shadow)"; s.borderColor = "var(--home-cta1-bc)"; s.color = "var(--home-cta1-fg)"; s.background = "var(--home-cta1-bg)"; }}
              >
                Explore Verticals <ChevronRight size={18} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-[10px] transition-all duration-200"
                style={{
                  fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "1rem",
                  padding: "0.9rem 2.25rem", background: "transparent",
                  color: NAVY, border: `1.5px solid ${NAVY_30}`,
                  letterSpacing: "-0.01em", textDecoration: "none",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = ORANGE; e.currentTarget.style.color = "var(--home-accent-text)"; e.currentTarget.style.background = "var(--home-cta2-hover-bg)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = NAVY_30; e.currentTarget.style.color = NAVY; e.currentTarget.style.background = "transparent"; }}
              >
                Get in Touch <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </FadeIn>
        </div>
      </section>
    </div>
  );
}
