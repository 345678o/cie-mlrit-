"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Constants ─────────────────────────────────────────────── */

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

type Slide = { img?: string; grad: string };

const FEATURED = [
  {
    idx: "01",
    category: "Workshop",
    title: "Workshop Carnival 2.0",
    date: "Apr 10–11, 2026",
    dateTime: "2026-04-10",
    body: "Where learning goes beyond classrooms — into real skills, real challenges, and real innovation. Explore multiple domains, collaborate with like-minded creators, and push your limits through hands-on experiences that actually matter.",
    tags: ["Hands-on Workshops", "Expert Guidance", "Domain Challenges", "Practical Skills"],
    bg: "#07090f",
    side: "right" as const,
    catColor: "#2563EB",
    catBg: "rgba(59,130,246,0.12)",
    slides: [
      { img: "/events/workshop-carnival-2.jpg", grad: "linear-gradient(145deg,#060d20 0%,#0f2044 55%,#1e40af 100%)" },
      { grad: "linear-gradient(145deg,#060d20 0%,#0a1836 55%,#1a3380 100%)" },
      { grad: "linear-gradient(160deg,#040a18 0%,#0d1f40 50%,#2563eb 100%)" },
      { grad: "linear-gradient(130deg,#050c22 0%,#0f2650 50%,#1e40af 100%)" },
    ] as Slide[],
  },
  {
    idx: "02",
    category: "Innovation Challenge",
    title: "B2B — Business to Brand",
    date: "Apr 3–4, 2025",
    dateTime: "2025-04-03",
    body: "A Brand Revival Hackathon — teams of 3–5 develop strategies to transform brands through Concept & Logo Redesign and Ad-Film Making, backed by exclusive masterclasses from industry experts.",
    tags: ["Brand Revival", "Logo Design", "Ad-Film Making", "Masterclasses"],
    bg: "#070a05",
    side: "left" as const,
    catColor: "#DC2626",
    catBg: "rgba(220,38,38,0.12)",
    slides: [
      { grad: "linear-gradient(145deg,#080c06 0%,#1c2a0d 55%,#4d7c0f 100%)" },
      { grad: "linear-gradient(160deg,#060a04 0%,#14200a 50%,#3d6b0c 100%)" },
      { grad: "linear-gradient(130deg,#080c05 0%,#1a2a0b 50%,#4a7c0e 100%)" },
      { grad: "linear-gradient(150deg,#060905 0%,#182310 50%,#3f6b0a 100%)" },
      { grad: "linear-gradient(140deg,#0a0e06 0%,#1e2e0d 50%,#527f12 100%)" },
    ] as Slide[],
  },
  {
    idx: "03",
    category: "Innovation Challenge",
    title: "Hustle Mania",
    date: "Apr 24, 2023",
    dateTime: "2023-04-24",
    body: "A high-energy entrepreneurship challenge where teams pushed their limits across negotiation, sales, advertising, and business strategy — all under real-world time pressure.",
    tags: ["Business", "Negotiation", "Sales", "Strategy"],
    bg: "#0c0804",
    side: "right" as const,
    catColor: "#EA580C",
    catBg: "rgba(234,88,12,0.12)",
    slides: [
      { grad: "linear-gradient(145deg,#0d0803 0%,#3b1a06 55%,#c2410c 100%)" },
      { grad: "linear-gradient(160deg,#0b0703 0%,#2e1604 50%,#b03a0a 100%)" },
      { grad: "linear-gradient(130deg,#0e0904 0%,#3f1c07 50%,#c74c10 100%)" },
      { grad: "linear-gradient(150deg,#0c0804 0%,#351806 50%,#ba3f0b 100%)" },
    ] as Slide[],
  },
  {
    idx: "04",
    category: "Startup Meetup",
    title: "The Equinox E-Summit 2K24",
    date: "Nov 28–30, 2024",
    dateTime: "2024-11-28",
    body: "#WherePassionMeetsPerseverance — a 3-day entrepreneurship summit bringing together student innovators, industry leaders, and investors on the MLRIT campus.",
    tags: ["E-Summit", "Entrepreneurship", "CIE × IIC"],
    bg: "#090709",
    side: "left" as const,
    catColor: "#16A34A",
    catBg: "rgba(22,163,74,0.12)",
    slides: [
      { grad: "linear-gradient(145deg,#0e0618 0%,#2d1057 55%,#6d28d9 100%)" },
      { grad: "linear-gradient(160deg,#0b0516 0%,#250d48 50%,#5e22c4 100%)" },
      { grad: "linear-gradient(130deg,#0f0619 0%,#301260 50%,#7c32e8 100%)" },
      { grad: "linear-gradient(150deg,#0d0617 0%,#280e52 50%,#6628d0 100%)" },
      { grad: "linear-gradient(140deg,#0c0515 0%,#221040 50%,#5a1ebc 100%)" },
    ] as Slide[],
  },
  {
    idx: "05",
    category: "Workshop",
    title: "Workshop Carnival",
    date: "Mar 11–16, 2024",
    dateTime: "2024-03-11",
    body: "Six days of innovation — participants explored UI/UX design, IoT, and WordPress development through hands-on activities, expert sessions, and domain-specific contests.",
    tags: ["IoT", "UI/UX", "WordPress", "6-Day Sprint"],
    bg: "#060810",
    side: "right" as const,
    catColor: "#2563EB",
    catBg: "rgba(59,130,246,0.12)",
    slides: [
      { grad: "linear-gradient(145deg,#060c1e 0%,#0d1f3c 55%,#1d4ed8 100%)" },
      { grad: "linear-gradient(160deg,#040a18 0%,#0a1930 50%,#1a45c8 100%)" },
      { grad: "linear-gradient(130deg,#060c20 0%,#0e2040 50%,#2155d8 100%)" },
      { grad: "linear-gradient(150deg,#050a1a 0%,#0c1d38 50%,#1c4ad0 100%)" },
    ] as Slide[],
  },
  {
    idx: "06",
    category: "Innovation Challenge",
    title: "GI Mahotsav 2024",
    date: "Mar 26–28, 2024",
    dateTime: "2024-03-26",
    body: "Geographical Indications Products Mela — a unique journey through India's rich cultural heritage. Explore and acquire the finest GI-tagged products from every corner of the country.",
    tags: ["GI Products", "Cultural Heritage", "IPFC × MLRIT", "MSME"],
    bg: "#060b08",
    side: "left" as const,
    catColor: "#DC2626",
    catBg: "rgba(220,38,38,0.12)",
    slides: [
      { grad: "linear-gradient(145deg,#060e0a 0%,#14532d 55%,#16a34a 100%)" },
      { grad: "linear-gradient(160deg,#040c07 0%,#104428 50%,#128c40 100%)" },
      { grad: "linear-gradient(130deg,#060e0b 0%,#155830 50%,#18b050 100%)" },
      { grad: "linear-gradient(150deg,#050d08 0%,#124c2a 50%,#14943e 100%)" },
      { grad: "linear-gradient(140deg,#070f0a 0%,#165a32 50%,#1aae4a 100%)" },
    ] as Slide[],
  },
  {
    idx: "07",
    category: "Hackathon",
    title: "MetaLoop",
    date: "Oct 6–7, 2023",
    dateTime: "2023-10-06",
    body: "Ideate. Immerse. Innovate. — a 36-hour metaverse-themed hackathon in collaboration with Deeploop. ₹75,000 prize pool. Teams competed across augmented reality, virtual worlds, and blockchain integration.",
    tags: ["Metaverse", "36-Hour Hackathon", "₹75K Prize", "CIE × Deeploop"],
    bg: "#0b0606",
    side: "right" as const,
    catColor: "#C04218",
    catBg: "rgba(255,94,44,0.12)",
    slides: [
      { grad: "linear-gradient(145deg,#0c0606 0%,#2d1212 55%,#991b1b 100%)" },
      { grad: "linear-gradient(160deg,#0a0505 0%,#260f0f 50%,#871618 100%)" },
      { grad: "linear-gradient(130deg,#0d0707 0%,#301414 50%,#a61e1e 100%)" },
      { grad: "linear-gradient(150deg,#0b0606 0%,#2a1010 50%,#901818 100%)" },
    ] as Slide[],
  },
];

const ARCHIVE = [
  {
    category: "Innovation Challenge",
    title: "Inventron 2022",
    date: "Jan 27–28, 2023",
    dateTime: "2023-01-27",
    desc: "Formulate Infinite Possibilities — MLRIT CIE's annual innovation challenge where students ideated, prototyped, and presented.",
    tags: ["Innovation", "Prototyping", "Competition"],
    catColor: "#DC2626",
    catBg: "rgba(220,38,38,0.10)",
  },
];

const CATS = [
  { label: "Hackathons",            n: "12" },
  { label: "Workshops",             n: "28" },
  { label: "Startup Meetups",       n: "8"  },
  { label: "Guest Lectures",        n: "35" },
  { label: "Innovation Challenges", n: "6"  },
  { label: "Bootcamps",             n: "5"  },
];

/* ═══════════════════════════════════════════════════════════════
   EventGallery — interactive horizontal image gallery
═══════════════════════════════════════════════════════════════ */

function EventGallery({
  slides, title, side, idx,
}: {
  slides: Slide[];
  title: string;
  side: "left" | "right";
  idx: string;
}) {
  const [current, setCurrent]     = useState(0);
  const [dir, setDir]             = useState<1 | -1>(1);
  const [showArrows, setShowArrows] = useState(false);
  const [dragging, setDragging]   = useState(false);

  const containerRef  = useRef<HTMLDivElement>(null);
  const coolRef       = useRef(false);
  const accRef        = useRef(0);
  const pointerRef    = useRef<{ x: number; y: number; locked: boolean | null } | null>(null);

  const go = useCallback((to: number) => {
    if (coolRef.current) return;
    const clamped = Math.max(0, Math.min(slides.length - 1, to));
    if (clamped === current) return;
    coolRef.current = true;
    setDir(to > current ? 1 : -1);
    setCurrent(clamped);
    setTimeout(() => { coolRef.current = false; accRef.current = 0; }, 380);
  }, [current, slides.length]);

  /* ── Wheel (trackpad horizontal / Shift+wheel) ── */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const isHoriz = Math.abs(e.deltaX) > Math.abs(e.deltaY) * 0.6;
      if (!isHoriz && !e.shiftKey) return;
      e.preventDefault();
      accRef.current += isHoriz ? e.deltaX : e.deltaY;
      if (accRef.current >  55) go(current + 1);
      if (accRef.current < -55) go(current - 1);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [current, go]);

  /* ── Touch swipe ── */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let start: { x: number; y: number } | null = null;
    let axis: "h" | "v" | null = null;

    const onTouchStart = (e: TouchEvent) => {
      start = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      axis = null;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!start) return;
      const dx = e.touches[0].clientX - start.x;
      const dy = e.touches[0].clientY - start.y;
      if (!axis) axis = Math.abs(dx) > Math.abs(dy) ? "h" : "v";
      if (axis === "h") e.preventDefault();
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!start || axis !== "h") return;
      const dx = e.changedTouches[0].clientX - start.x;
      if (dx < -36) go(current + 1);
      else if (dx >  36) go(current - 1);
      start = null; axis = null;
    };

    el.addEventListener("touchstart",  onTouchStart,  { passive: true });
    el.addEventListener("touchmove",   onTouchMove,   { passive: false });
    el.addEventListener("touchend",    onTouchEnd,    { passive: true });
    return () => {
      el.removeEventListener("touchstart",  onTouchStart);
      el.removeEventListener("touchmove",   onTouchMove);
      el.removeEventListener("touchend",    onTouchEnd);
    };
  }, [current, go]);

  /* ── Pointer drag ── */
  const onPointerDown = (e: React.PointerEvent) => {
    pointerRef.current = { x: e.clientX, y: e.clientY, locked: null };
    setDragging(true);
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointerRef.current) return;
    const dx = Math.abs(e.clientX - pointerRef.current.x);
    const dy = Math.abs(e.clientY - pointerRef.current.y);
    if (pointerRef.current.locked === null && (dx > 4 || dy > 4))
      pointerRef.current.locked = dx > dy;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!pointerRef.current?.locked) { pointerRef.current = null; setDragging(false); return; }
    const dx = e.clientX - pointerRef.current.x;
    if (dx < -28) go(current + 1);
    else if (dx > 28) go(current - 1);
    pointerRef.current = null;
    setDragging(false);
  };

  const slide = slides[current];

  /* slide variants — entering slides in from the direction of nav,
     exiting slides with a slight parallax (only 28% offset) */
  const variants = {
    enter:  (d: number) => ({ x: `${d * 100}%`,  opacity: 0,   scale: 0.97 }),
    center:              ({  x: 0,               opacity: 1,   scale: 1    }),
    exit:   (d: number) => ({ x: `${d * -28}%`,  opacity: 0,   scale: 0.97 }),
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        cursor: dragging ? "grabbing" : "grab",
        userSelect: "none",
      }}
    >
      {/* ── Slides ── */}
      <AnimatePresence initial={false} custom={dir}>
        <motion.div
          key={current}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.46, ease: [0.32, 0, 0.24, 1] }}
          style={{
            position: "absolute",
            inset: 0,
            background: slide.grad,
            willChange: "transform, opacity",
          }}
        >
          {slide.img ? (
            <img
              src={slide.img}
              alt={title}
              loading="lazy"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }}
            />
          ) : (
            <div style={{ position: "absolute", inset: 0, backgroundImage: GRAIN, opacity: 0.10 }} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Index watermark */}
      <div aria-hidden style={{
        position: "absolute", bottom: "56px",
        [side === "right" ? "right" : "left"]: "20px",
        zIndex: 2, pointerEvents: "none",
      }}>
        <span style={{
          fontFamily: "var(--font-heading)", fontWeight: 900,
          fontSize: "clamp(48px, 10vw, 110px)", letterSpacing: "-0.06em",
          color: "rgba(255,255,255,0.05)", lineHeight: 1,
        }}>{idx}</span>
      </div>

      {/* ── Counter chip ── */}
      {slides.length > 1 && (
        <div style={{
          position: "absolute", top: "16px",
          [side === "right" ? "left" : "right"]: "16px",
          zIndex: 10, fontFamily: "var(--font-body)", fontSize: "11px",
          fontWeight: 600, letterSpacing: "0.04em",
          color: "rgba(255,255,255,0.70)",
          background: "rgba(0,0,0,0.32)", backdropFilter: "blur(10px)",
          padding: "4px 12px", borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.10)",
        }}>
          {current + 1} / {slides.length}
        </div>
      )}

      {/* ── Dot nav ── */}
      {slides.length > 1 && (
        <div style={{
          position: "absolute", bottom: "18px", left: "50%",
          transform: "translateX(-50%)", display: "flex", gap: "6px", zIndex: 10,
        }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); go(i); }}
              aria-label={`Slide ${i + 1}`}
              style={{
                width: i === current ? "24px" : "6px",
                height: "6px", borderRadius: "3px", border: "none",
                background: i === current ? "rgba(255,255,255,0.90)" : "rgba(255,255,255,0.22)",
                cursor: "pointer", padding: 0,
                transition: "all 0.3s cubic-bezier(0.32,0,0.24,1)",
              }}
            />
          ))}
        </div>
      )}

      {/* ── Prev / Next arrows (hover) ── */}
      <AnimatePresence>
        {showArrows && current > 0 && (
          <motion.button
            key="prev"
            initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.16 }}
            onClick={(e) => { e.stopPropagation(); go(current - 1); }}
            aria-label="Previous image"
            style={{
              position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)",
              width: "38px", height: "38px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(0,0,0,0.42)", backdropFilter: "blur(10px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", zIndex: 10,
            }}
          >
            <ChevronLeft size={15} color="rgba(255,255,255,0.85)" />
          </motion.button>
        )}
        {showArrows && current < slides.length - 1 && (
          <motion.button
            key="next"
            initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 6 }}
            transition={{ duration: 0.16 }}
            onClick={(e) => { e.stopPropagation(); go(current + 1); }}
            aria-label="Next image"
            style={{
              position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)",
              width: "38px", height: "38px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(0,0,0,0.42)", backdropFilter: "blur(10px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", zIndex: 10,
            }}
          >
            <ChevronRight size={15} color="rgba(255,255,255,0.85)" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Events Page
═══════════════════════════════════════════════════════════════ */
export default function EventsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      /* 1. Hero text entrance */
      gsap.fromTo(".eh-line",
        { yPercent: 116, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.1, ease: "power3.out", delay: 0.1 }
      );
      gsap.fromTo(".eh-meta",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.9, delay: 0.5, ease: "power2.out" }
      );

      /* 2. Hero bg parallax */
      gsap.to(".eh-bg", {
        yPercent: 28, ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1 },
      });

      /* 3. Category strip */
      gsap.fromTo(".cat-item",
        { opacity: 0, y: 18 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.07, ease: "power2.out",
          scrollTrigger: { trigger: ".cat-strip", start: "top 82%", toggleActions: "play none none none" },
        }
      );

      /* 4. Gallery column clip-path reveal */
      gsap.utils.toArray<HTMLElement>(".ep-img-reveal").forEach((el) => {
        gsap.fromTo(el,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)", duration: 1.4, ease: "power2.inOut",
            scrollTrigger: { trigger: el, start: "top 75%", toggleActions: "play none none none" },
          }
        );
      });

      /* 5. Panel text reveals */
      gsap.utils.toArray<HTMLElement>(".ep-reveal").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 32 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 84%", toggleActions: "play none none none" },
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ background: "#E8521A" }}>

      {/* ══ HERO ══ */}
      <section
        ref={heroRef}
        className="page-hero"
        style={{
          position: "relative", minHeight: "72vh", overflow: "hidden",
          display: "flex", flexDirection: "column", justifyContent: "center",
          paddingTop: "var(--nav-height)",
        }}
      >
        <div className="eh-bg" style={{ position: "absolute", inset: "-14%", background: "#E8521A", willChange: "transform" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: GRAIN, opacity: 0.06 }} />
        </div>

        <svg aria-hidden className="absolute pointer-events-none"
          style={{ top: "-18%", right: "-10%", width: "52vw", height: "52vw", maxWidth: 580, maxHeight: 580, opacity: 0.10 }}
          viewBox="0 0 580 580" fill="none">
          <circle cx="290" cy="290" r="265" stroke="rgba(255,255,255,1)" strokeWidth="80" fill="none" />
        </svg>
        <svg aria-hidden className="absolute pointer-events-none"
          style={{ bottom: "-12%", left: "-8%", width: "30vw", height: "30vw", maxWidth: 340, maxHeight: 340, opacity: 0.08 }}
          viewBox="0 0 340 340" fill="none">
          <circle cx="170" cy="170" r="150" stroke="rgba(255,255,255,1)" strokeWidth="50" fill="none" />
        </svg>
        <svg aria-hidden className="absolute pointer-events-none"
          style={{ top: "28%", right: "5%", width: "18vw", height: "18vw", maxWidth: 200, maxHeight: 200, opacity: 0.10 }}
          viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="88" stroke="rgba(255,255,255,1)" strokeWidth="1.2" fill="none" />
          <circle cx="100" cy="100" r="62" stroke="rgba(255,255,255,1)" strokeWidth="0.9" fill="none" />
          <circle cx="100" cy="100" r="36" stroke="rgba(255,255,255,1)" strokeWidth="0.7" fill="none" />
        </svg>
        <svg aria-hidden className="absolute pointer-events-none"
          style={{ top: "calc(var(--nav-height) + 12px)", left: "0", width: "180px", height: "180px", opacity: 0.07 }}
          viewBox="0 0 180 180" fill="none">
          <line x1="0" y1="60"  x2="60"  y2="0"   stroke="white" strokeWidth="1"/>
          <line x1="0" y1="100" x2="100" y2="0"   stroke="white" strokeWidth="1"/>
          <line x1="0" y1="140" x2="140" y2="0"   stroke="white" strokeWidth="1"/>
          <line x1="0" y1="180" x2="180" y2="0"   stroke="white" strokeWidth="1"/>
          <line x1="40" y1="180" x2="180" y2="40" stroke="white" strokeWidth="1"/>
          <line x1="80" y1="180" x2="180" y2="80" stroke="white" strokeWidth="1"/>
        </svg>
        <div aria-hidden className="absolute pointer-events-none" style={{ top: "calc(var(--nav-height) + 18px)", left: "18px", width: "72px", height: "72px", backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.25) 1.5px, transparent 1.5px)", backgroundSize: "12px 12px" }} />
        <div aria-hidden className="absolute pointer-events-none" style={{ bottom: "80px", right: "20px", width: "88px", height: "88px", backgroundImage: "radial-gradient(circle, rgba(232,82,26,0.50) 1.5px, transparent 1.5px)", backgroundSize: "14px 14px" }} />
        <div aria-hidden className="absolute pointer-events-none select-none" style={{ bottom: "20px", right: "-14px", fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(100px, 20vw, 340px)", color: "rgba(0,0,0,0.06)", lineHeight: 1, letterSpacing: "-0.06em" }}>EVENTS</div>

        <div className="page-container w-full" style={{ position: "relative", zIndex: 1, paddingTop: "clamp(36px,5vw,56px)", paddingBottom: "clamp(48px,6vw,72px)" }}>
          <div style={{ overflow: "hidden" }}>
            <div className="eh-line" style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(48px, 11vw, 152px)", lineHeight: 0.90, letterSpacing: "-0.045em", textTransform: "uppercase", display: "flex", alignItems: "baseline", gap: "0.22em" }}>
              <span style={{ color: "#FFFFFF" }}>MAKE</span>
              <span style={{ color: "transparent", WebkitTextStroke: "2.5px rgba(255,255,255,0.80)", fontSize: "0.82em" }}>IT</span>
            </div>
          </div>
          <div style={{ overflow: "hidden" }}>
            <div className="eh-line" style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(48px, 11vw, 152px)", lineHeight: 0.90, letterSpacing: "-0.045em", textTransform: "uppercase", color: "#FFFFFF", marginTop: "0.04em" }}>
              HAPPEN
            </div>
          </div>
          <div className="eh-meta" style={{ fontFamily: "var(--font-script)", fontSize: "clamp(18px, 2.4vw, 30px)", color: "rgba(255,255,255,0.90)", lineHeight: 1.2, marginTop: "18px", marginBottom: "20px", display: "inline-block", transform: "rotate(-1.5deg)" }}>
            — where every event shapes a future
          </div>
          <p className="eh-meta" style={{ fontFamily: "var(--font-body)", fontSize: "clamp(14px, 1.4vw, 16px)", lineHeight: 1.78, color: "rgba(255,255,255,0.72)", maxWidth: "min(440px,100%)", marginBottom: 0, display: "block" }}>
            Over 100 events, workshops, hackathons, and summits — each one shaping the next generation of innovators and entrepreneurs.
          </p>
          <div className="eh-meta" style={{ display: "flex", flexWrap: "wrap", gap: "clamp(18px,3vw,32px)", marginTop: "clamp(28px,4vw,44px)" }}>
            {[["100+", "Events"], ["3000+", "Participants"], ["5 yrs", "Running"], ["6", "Categories"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(20px,2.8vw,28px)", color: "#FFFFFF", lineHeight: 1 }}>{n}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "rgba(255,255,255,0.55)", marginTop: "3px", fontWeight: 600, letterSpacing: "0.04em" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CATEGORY STRIP ══ */}
      <section style={{ background: "#111111", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="page-container">
          <div className="cat-strip" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            {CATS.map((c, i) => (
              <div key={c.label} className="cat-item" style={{ padding: "clamp(18px, 3vw, 28px) clamp(16px, 2.5vw, 24px)", borderRight: (i + 1) % 3 !== 0 ? "1px solid rgba(255,255,255,0.05)" : "none", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(24px, 4vw, 40px)", letterSpacing: "-0.04em", color: "#FFFFFF", lineHeight: 1, marginBottom: "4px" }}>{c.n}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "10.5px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em" }}>{c.label}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(min-width:640px){.cat-strip{grid-template-columns:repeat(6,1fr)!important;} .cat-strip > div{border-bottom:none!important;} .cat-strip > div:last-child{border-right:none!important;}}`}</style>
      </section>

      {/* ══ FEATURED STORY PANELS ══ */}
      {FEATURED.map((ev) => (
        <section
          key={ev.idx}
          style={{
            position: "relative",
            minHeight: "90vh",
            display: "flex",
            alignItems: "center",
            background: ev.bg,
            overflow: "hidden",
          }}
        >
          {/* Gallery column */}
          <div
            className="ep-img-reveal"
            style={{
              position: "absolute",
              [ev.side === "right" ? "right" : "left"]: 0,
              top: 0,
              width: "clamp(260px, 44%, 620px)",
              height: "100%",
              overflow: "hidden",
            }}
          >
            <EventGallery
              slides={ev.slides}
              title={ev.title}
              side={ev.side}
              idx={ev.idx}
            />
          </div>

          {/* Text column */}
          <div
            className="page-container"
            style={{ position: "relative", zIndex: 2, width: "100%", display: "flex", justifyContent: ev.side === "right" ? "flex-start" : "flex-end" }}
          >
            <div className="ep-text-block" style={{ maxWidth: "480px", padding: "clamp(60px, 12vh, 120px) 0" }}>

              <div className="ep-reveal" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "22px" }}>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#E8521A" }}>{ev.idx}</span>
                <div style={{ width: "18px", height: "1px", background: "rgba(255,255,255,0.12)" }} />
                <span style={{ fontFamily: "var(--font-body)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.11em", textTransform: "uppercase", padding: "3px 10px", borderRadius: "999px", background: ev.catBg, color: ev.catColor }}>{ev.category}</span>
              </div>

              <h2 className="ep-reveal" style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(28px, 4.5vw, 54px)", letterSpacing: "-0.035em", lineHeight: 1.06, color: "#FFFFFF", marginBottom: "18px" }}>
                {ev.title}
              </h2>

              <div className="ep-reveal" style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "18px" }}>
                <Calendar size={11} style={{ color: "rgba(255,255,255,0.3)" }} />
                <time dateTime={ev.dateTime} style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "rgba(255,255,255,0.32)", letterSpacing: "0.04em" }}>{ev.date}</time>
              </div>

              <p className="ep-reveal" style={{ fontFamily: "var(--font-body)", fontSize: "clamp(13px, 1.5vw, 15.5px)", lineHeight: 1.82, color: "rgba(255,255,255,0.44)", marginBottom: "24px" }}>
                {ev.body}
              </p>

              <div className="ep-reveal" style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                {ev.tags.map((t) => (
                  <span key={t} style={{ fontFamily: "var(--font-body)", fontSize: "9.5px", fontWeight: 600, letterSpacing: "0.04em", padding: "4px 11px", borderRadius: "999px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.42)" }}>{t}</span>
                ))}
              </div>

            </div>
          </div>
        </section>
      ))}

      {/* ══ CTA ══ */}
      <section style={{ background: "#0A0A0A", padding: "clamp(88px, 14vw, 160px) 0", textAlign: "center" }}>
        <div className="page-container">
          <div className="ep-reveal" style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "22px" }}>
            <div style={{ width: "22px", height: "1px", background: "#E8521A" }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#E8521A" }}>What&apos;s Next</span>
            <div style={{ width: "22px", height: "1px", background: "#E8521A" }} />
          </div>
          <h2 className="ep-reveal" style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(36px, 7vw, 88px)", letterSpacing: "-0.045em", color: "#FFFFFF", lineHeight: 1.04, marginBottom: "20px" }}>
            Don&apos;t miss<br />the next one.
          </h2>
          <p className="ep-reveal" style={{ fontFamily: "var(--font-body)", fontSize: "clamp(14px, 1.5vw, 17px)", lineHeight: 1.72, color: "rgba(255,255,255,0.36)", maxWidth: "420px", margin: "0 auto 40px" }}>
            Stay updated with all upcoming hackathons, workshops, and events at MLRIT CIE. Follow us or sign up for updates.
          </p>
          <div className="ep-reveal" style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "14px", color: "#FFFFFF", background: "#E8521A", borderRadius: "999px", padding: "13px 30px", textDecoration: "none", letterSpacing: "-0.01em" }}>
              Get Involved <ArrowRight size={14} />
            </Link>
            <a href="https://www.instagram.com/mlritcie/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "14px", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: "999px", padding: "13px 30px", textDecoration: "none" }}>
              Follow on Instagram
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
