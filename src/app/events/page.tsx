"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Calendar } from "lucide-react";

/* ─── Constants ─────────────────────────────────────────────── */

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

/* 7 featured story panels — ordered as requested */
const FEATURED = [
  {
    idx: "01",
    category: "Workshop",
    title: "Workshop Carnival 2.0",
    date: "Apr 10–11, 2026",
    dateTime: "2026-04-10",
    body: "Where learning goes beyond classrooms — into real skills, real challenges, and real innovation. Explore multiple domains, collaborate with like-minded creators, and push your limits through hands-on experiences that actually matter.",
    tags: ["Hands-on Workshops", "Expert Guidance", "Domain Challenges", "Practical Skills"],
    imgGrad: "linear-gradient(145deg,#060d20 0%,#0f2044 55%,#1e40af 100%)",
    img: "/events/workshop-carnival-2.jpg",
    bg: "#07090f",
    side: "right" as const,
    catColor: "#2563EB",
    catBg: "rgba(59,130,246,0.12)",
  },
  {
    idx: "02",
    category: "Innovation Challenge",
    title: "B2B — Business to Brand",
    date: "Apr 3–4, 2025",
    dateTime: "2025-04-03",
    body: "A Brand Revival Hackathon — teams of 3–5 develop strategies to transform brands through Concept & Logo Redesign and Ad-Film Making, backed by exclusive masterclasses from industry experts.",
    tags: ["Brand Revival", "Logo Design", "Ad-Film Making", "Masterclasses"],
    imgGrad: "linear-gradient(145deg,#080c06 0%,#1c2a0d 55%,#4d7c0f 100%)",
    bg: "#070a05",
    side: "left" as const,
    catColor: "#DC2626",
    catBg: "rgba(220,38,38,0.12)",
  },
  {
    idx: "03",
    category: "Innovation Challenge",
    title: "Hustle Mania",
    date: "Apr 24, 2023",
    dateTime: "2023-04-24",
    body: "A high-energy entrepreneurship challenge where teams pushed their limits across negotiation, sales, advertising, and business strategy — all under real-world time pressure.",
    tags: ["Business", "Negotiation", "Sales", "Strategy"],
    imgGrad: "linear-gradient(145deg,#0d0803 0%,#3b1a06 55%,#c2410c 100%)",
    bg: "#0c0804",
    side: "right" as const,
    catColor: "#EA580C",
    catBg: "rgba(234,88,12,0.12)",
  },
  {
    idx: "04",
    category: "Startup Meetup",
    title: "The Equinox E-Summit 2K24",
    date: "Nov 28–30, 2024",
    dateTime: "2024-11-28",
    body: "#WherePassionMeetsPerseverance — a 3-day entrepreneurship summit bringing together student innovators, industry leaders, and investors on the MLRIT campus.",
    tags: ["E-Summit", "Entrepreneurship", "CIE × IIC"],
    imgGrad: "linear-gradient(145deg,#0e0618 0%,#2d1057 55%,#6d28d9 100%)",
    bg: "#090709",
    side: "left" as const,
    catColor: "#16A34A",
    catBg: "rgba(22,163,74,0.12)",
  },
  {
    idx: "05",
    category: "Workshop",
    title: "Workshop Carnival",
    date: "Mar 11–16, 2024",
    dateTime: "2024-03-11",
    body: "Six days of innovation — participants explored UI/UX design, IoT, and WordPress development through hands-on activities, expert sessions, and domain-specific contests.",
    tags: ["IoT", "UI/UX", "WordPress", "6-Day Sprint"],
    imgGrad: "linear-gradient(145deg,#060c1e 0%,#0d1f3c 55%,#1d4ed8 100%)",
    bg: "#060810",
    side: "right" as const,
    catColor: "#2563EB",
    catBg: "rgba(59,130,246,0.12)",
  },
  {
    idx: "06",
    category: "Innovation Challenge",
    title: "GI Mahotsav 2024",
    date: "Mar 26–28, 2024",
    dateTime: "2024-03-26",
    body: "Geographical Indications Products Mela — a unique journey through India's rich cultural heritage. Explore and acquire the finest GI-tagged products from every corner of the country.",
    tags: ["GI Products", "Cultural Heritage", "IPFC × MLRIT", "MSME"],
    imgGrad: "linear-gradient(145deg,#060e0a 0%,#14532d 55%,#16a34a 100%)",
    bg: "#060b08",
    side: "left" as const,
    catColor: "#DC2626",
    catBg: "rgba(220,38,38,0.12)",
  },
  {
    idx: "07",
    category: "Hackathon",
    title: "MetaLoop",
    date: "Oct 6–7, 2023",
    dateTime: "2023-10-06",
    body: "Ideate. Immerse. Innovate. — a 36-hour metaverse-themed hackathon in collaboration with Deeploop. ₹75,000 prize pool. Teams competed across augmented reality, virtual worlds, and blockchain integration.",
    tags: ["Metaverse", "36-Hour Hackathon", "₹75K Prize", "CIE × Deeploop"],
    imgGrad: "linear-gradient(145deg,#0c0606 0%,#2d1212 55%,#991b1b 100%)",
    bg: "#0b0606",
    side: "right" as const,
    catColor: "#C04218",
    catBg: "rgba(255,94,44,0.12)",
  },
];

/* Archive — older events */
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
  { label: "Hackathons",           n: "12" },
  { label: "Workshops",            n: "28" },
  { label: "Startup Meetups",      n: "8"  },
  { label: "Guest Lectures",       n: "35" },
  { label: "Innovation Challenges",n: "6"  },
  { label: "Bootcamps",            n: "5"  },
];

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

      /* ── 1. Hero text entrance ─────────────────────────────── */
      gsap.fromTo(".eh-line",
        { yPercent: 116, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.1, ease: "power3.out", delay: 0.1 }
      );
      gsap.fromTo(".eh-meta",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.9, delay: 0.5, ease: "power2.out" }
      );

      /* ── 2. Hero bg parallax ──────────────────────────────── */
      gsap.to(".eh-bg", {
        yPercent: 28,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      /* ── 3. Category strip counter fade ────────────────────── */
      gsap.fromTo(".cat-item",
        { opacity: 0, y: 18 },
        {
          opacity: 1, y: 0,
          duration: 0.6,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".cat-strip",
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      /* ── 4. Clip-path reveals on story panel images ─────────── */
      gsap.utils.toArray<HTMLElement>(".ep-img-reveal").forEach((el) => {
        gsap.fromTo(el,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.4,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: el,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      /* ── 5. Parallax on story panel images ─────────────────── */
      gsap.utils.toArray<HTMLElement>(".ep-para-img").forEach((el) => {
        const section = el.closest("section");
        gsap.to(el, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: section || el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      /* ── 6. Panel text staggered reveals ───────────────────── */
      gsap.utils.toArray<HTMLElement>(".ep-reveal").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 32 },
          {
            opacity: 1, y: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 84%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      /* ── 7. Archive card stagger ────────────────────────────── */

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ background: "#E8521A" }}>

      {/* ══════════════════════════════════════════════════════
          HERO — dark cinematic, no orange background
      ══════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="page-hero"
        style={{
          position: "relative",
          minHeight: "72vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingTop: "var(--nav-height)",
        }}
      >
        {/* Atmospheric bg */}
        <div
          className="eh-bg"
          style={{
            position: "absolute",
            inset: "-14%",
            background: "#E8521A",
            willChange: "transform",
          }}
        >
          <div style={{ position: "absolute", inset: 0, backgroundImage: GRAIN, opacity: 0.06 }} />
        </div>

        {/* ── Geometric decorations ── */}

        {/* Large arc — top right */}
        <svg aria-hidden className="absolute pointer-events-none"
          style={{ top: "-18%", right: "-10%", width: "52vw", height: "52vw", maxWidth: 580, maxHeight: 580, opacity: 0.10 }}
          viewBox="0 0 580 580" fill="none">
          <circle cx="290" cy="290" r="265" stroke="rgba(255,255,255,1)" strokeWidth="80" fill="none" />
        </svg>

        {/* Medium arc — bottom left */}
        <svg aria-hidden className="absolute pointer-events-none"
          style={{ bottom: "-12%", left: "-8%", width: "30vw", height: "30vw", maxWidth: 340, maxHeight: 340, opacity: 0.08 }}
          viewBox="0 0 340 340" fill="none">
          <circle cx="170" cy="170" r="150" stroke="rgba(255,255,255,1)" strokeWidth="50" fill="none" />
        </svg>

        {/* Concentric rings — mid right */}
        <svg aria-hidden className="absolute pointer-events-none"
          style={{ top: "28%", right: "5%", width: "18vw", height: "18vw", maxWidth: 200, maxHeight: 200, opacity: 0.10 }}
          viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="88" stroke="rgba(255,255,255,1)" strokeWidth="1.2" fill="none" />
          <circle cx="100" cy="100" r="62" stroke="rgba(255,255,255,1)" strokeWidth="0.9" fill="none" />
          <circle cx="100" cy="100" r="36" stroke="rgba(255,255,255,1)" strokeWidth="0.7" fill="none" />
        </svg>

        {/* Diagonal slash lines — top left */}
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

        {/* Dot grid — top left */}
        <div aria-hidden className="absolute pointer-events-none" style={{
          top: "calc(var(--nav-height) + 18px)", left: "18px",
          width: "72px", height: "72px",
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.25) 1.5px, transparent 1.5px)",
          backgroundSize: "12px 12px",
        }} />

        {/* Dot grid — bottom right */}
        <div aria-hidden className="absolute pointer-events-none" style={{
          bottom: "80px", right: "20px",
          width: "88px", height: "88px",
          backgroundImage: "radial-gradient(circle, rgba(232,82,26,0.50) 1.5px, transparent 1.5px)",
          backgroundSize: "14px 14px",
        }} />

        {/* Orange dot accents */}
        <div aria-hidden className="absolute pointer-events-none" style={{
          top: "28%", left: "48%",
          width: "6px", height: "6px", borderRadius: "50%",
          background: "#E8521A", opacity: 0.60,
        }} />
        <div aria-hidden className="absolute pointer-events-none" style={{
          top: "18%", right: "28%",
          width: "4px", height: "4px", borderRadius: "50%",
          background: "#E8521A", opacity: 0.45,
        }} />

        {/* Ghost watermark */}
        <div aria-hidden className="absolute pointer-events-none select-none" style={{
          bottom: "20px", right: "-14px",
          fontFamily: "var(--font-heading)", fontWeight: 900,
          fontSize: "clamp(100px, 20vw, 340px)",
          color: "rgba(0,0,0,0.06)", lineHeight: 1, letterSpacing: "-0.06em",
          userSelect: "none" as const,
        }}>EVENTS</div>

        <div className="page-container w-full" style={{ position: "relative", zIndex: 1, paddingTop: "clamp(36px,5vw,56px)", paddingBottom: "clamp(48px,6vw,72px)" }}>

          {/* Headline — MAKE IT / HAPPEN */}
          <div style={{ overflow: "hidden" }}>
            <div className="eh-line" style={{
              fontFamily: "var(--font-heading)", fontWeight: 900,
              fontSize: "clamp(48px, 11vw, 152px)",
              lineHeight: 0.90, letterSpacing: "-0.045em",
              textTransform: "uppercase",
              display: "flex", alignItems: "baseline", gap: "0.22em",
            }}>
              <span style={{ color: "#FFFFFF" }}>MAKE</span>
              <span style={{
                color: "transparent",
                WebkitTextStroke: "2.5px rgba(255,255,255,0.80)",
                fontSize: "0.82em",
              }}>IT</span>
            </div>
          </div>
          <div style={{ overflow: "hidden" }}>
            <div className="eh-line" style={{
              fontFamily: "var(--font-heading)", fontWeight: 900,
              fontSize: "clamp(48px, 11vw, 152px)",
              lineHeight: 0.90, letterSpacing: "-0.045em",
              textTransform: "uppercase", color: "#FFFFFF",
              marginTop: "0.04em",
            }}>
              HAPPEN
            </div>
          </div>

          {/* Script accent — same font as other heroes */}
          <div className="eh-meta" style={{
            fontFamily: "var(--font-script)",
            fontSize: "clamp(18px, 2.4vw, 30px)",
            color: "rgba(255,255,255,0.90)", lineHeight: 1.2,
            marginTop: "18px", marginBottom: "20px",
            display: "inline-block", transform: "rotate(-1.5deg)",
          }}>
            — where every event shapes a future
          </div>

          {/* Description */}
          <p className="eh-meta" style={{ fontFamily: "var(--font-body)", fontSize: "clamp(14px, 1.4vw, 16px)", lineHeight: 1.78, color: "rgba(255,255,255,0.72)", maxWidth: "min(440px,100%)", marginBottom: 0, display: "block" }}>
            Over 100 events, workshops, hackathons, and summits — each one shaping the next generation of innovators and entrepreneurs.
          </p>

          {/* Stats row — same layout as Verticals/Gallery */}
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

      {/* ══════════════════════════════════════════════════════
          CATEGORY COUNTER STRIP
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#111111", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="page-container">
          <div
            className="cat-strip"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            {CATS.map((c, i) => (
              <div
                key={c.label}
                className="cat-item"
                style={{
                  padding: "clamp(18px, 3vw, 28px) clamp(16px, 2.5vw, 24px)",
                  borderRight: (i + 1) % 3 !== 0 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none",
                }}
              >
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(24px, 4vw, 40px)", letterSpacing: "-0.04em", color: "#FFFFFF", lineHeight: 1, marginBottom: "4px" }}>{c.n}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "10.5px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em" }}>{c.label}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(min-width:640px){.cat-strip{grid-template-columns:repeat(6,1fr)!important;} .cat-strip > div{border-bottom:none!important;} .cat-strip > div:last-child{border-right:none!important;}}`}</style>
      </section>

      {/* ══════════════════════════════════════════════════════
          FEATURED STORY PANELS — 5 alternating full-height panels
      ══════════════════════════════════════════════════════ */}
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
          {/* Image col: clip-path reveal + parallax */}
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
            <div
              className="ep-para-img"
              style={{
                width: "100%",
                height: "136%",
                position: "absolute",
                top: "-18%",
                background: (ev as typeof ev & { img?: string }).img ? "none" : ev.imgGrad,
                willChange: "transform",
              }}
            >
              {(ev as typeof ev & { img?: string }).img ? (
                <img
                  src={(ev as typeof ev & { img?: string }).img}
                  alt={ev.title}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }}
                />
              ) : (
                <div style={{ position: "absolute", inset: 0, backgroundImage: GRAIN, opacity: 0.10 }} />
              )}
              {/* Index watermark */}
              <div style={{ position: "absolute", bottom: "20px", right: ev.side === "right" ? "20px" : "auto", left: ev.side === "left" ? "20px" : "auto" }}>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(48px, 10vw, 110px)", letterSpacing: "-0.06em", color: "rgba(255,255,255,0.06)", lineHeight: 1 }}>
                  {ev.idx}
                </span>
              </div>
            </div>
          </div>

          {/* Text col */}
          <div
            className="page-container"
            style={{
              position: "relative",
              zIndex: 2,
              width: "100%",
              display: "flex",
              justifyContent: ev.side === "right" ? "flex-start" : "flex-end",
            }}
          >
            <div className="ep-text-block" style={{ maxWidth: "480px", padding: "clamp(60px, 12vh, 120px) 0" }}>
              {/* Event number + category */}
              <div className="ep-reveal" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "22px" }}>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#E8521A" }}>
                  {ev.idx}
                </span>
                <div style={{ width: "18px", height: "1px", background: "rgba(255,255,255,0.12)" }} />
                <span style={{ fontFamily: "var(--font-body)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.11em", textTransform: "uppercase", padding: "3px 10px", borderRadius: "999px", background: ev.catBg, color: ev.catColor }}>
                  {ev.category}
                </span>
              </div>

              {/* Title */}
              <h2
                className="ep-reveal"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 900,
                  fontSize: "clamp(28px, 4.5vw, 54px)",
                  letterSpacing: "-0.035em",
                  lineHeight: 1.06,
                  color: "#FFFFFF",
                  marginBottom: "18px",
                }}
              >
                {ev.title}
              </h2>

              {/* Date */}
              <div className="ep-reveal" style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "18px" }}>
                <Calendar size={11} style={{ color: "rgba(255,255,255,0.3)" }} />
                <time dateTime={ev.dateTime} style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "rgba(255,255,255,0.32)", letterSpacing: "0.04em" }}>
                  {ev.date}
                </time>
              </div>

              {/* Body */}
              <p
                className="ep-reveal"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(13px, 1.5vw, 15.5px)",
                  lineHeight: 1.82,
                  color: "rgba(255,255,255,0.44)",
                  marginBottom: "24px",
                }}
              >
                {ev.body}
              </p>

              {/* Tags */}
              <div className="ep-reveal" style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                {ev.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "9.5px",
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                      padding: "4px 11px",
                      borderRadius: "999px",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.10)",
                      color: "rgba(255,255,255,0.42)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ══════════════════════════════════════════════════════
          CTA — dark closing section
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#0A0A0A", padding: "clamp(88px, 14vw, 160px) 0", textAlign: "center" }}>
        <div className="page-container">
          <div className="ep-reveal" style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "22px" }}>
            <div style={{ width: "22px", height: "1px", background: "#E8521A" }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#E8521A" }}>
              What&apos;s Next
            </span>
            <div style={{ width: "22px", height: "1px", background: "#E8521A" }} />
          </div>
          <h2
            className="ep-reveal"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 900,
              fontSize: "clamp(36px, 7vw, 88px)",
              letterSpacing: "-0.045em",
              color: "#FFFFFF",
              lineHeight: 1.04,
              marginBottom: "20px",
            }}
          >
            Don&apos;t miss<br />the next one.
          </h2>
          <p
            className="ep-reveal"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(14px, 1.5vw, 17px)",
              lineHeight: 1.72,
              color: "rgba(255,255,255,0.36)",
              maxWidth: "420px",
              margin: "0 auto 40px",
            }}
          >
            Stay updated with all upcoming hackathons, workshops, and events at MLRIT CIE. Follow us or sign up for updates.
          </p>
          <div className="ep-reveal" style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/contact"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "14px",
                color: "#FFFFFF", background: "#E8521A",
                borderRadius: "999px", padding: "13px 30px",
                textDecoration: "none", letterSpacing: "-0.01em",
              }}
            >
              Get Involved <ArrowRight size={14} />
            </Link>
            <a
              href="https://www.instagram.com/mlritcie/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "14px",
                color: "rgba(255,255,255,0.5)",
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: "999px", padding: "13px 30px",
                textDecoration: "none",
              }}
            >
              Follow on Instagram
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
