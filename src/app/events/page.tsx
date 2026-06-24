"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Calendar } from "lucide-react";

/* ─── Constants ─────────────────────────────────────────────── */

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

/* 5 featured story panels */
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
    bg: "#07090f",
    side: "right" as const,
    catColor: "#2563EB",
    catBg: "rgba(59,130,246,0.12)",
  },
  {
    idx: "02",
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
    idx: "03",
    category: "Innovation Challenge",
    title: "GI Mahotsav 2024",
    date: "Mar 26–28, 2024",
    dateTime: "2024-03-26",
    body: "Geographical Indications Products Mela — a unique journey through India's rich cultural heritage. Explore and acquire the finest GI-tagged products from every corner of the country.",
    tags: ["GI Products", "Cultural Heritage", "IPFC × MLRIT", "MSME"],
    imgGrad: "linear-gradient(145deg,#060e0a 0%,#14532d 55%,#16a34a 100%)",
    bg: "#060b08",
    side: "right" as const,
    catColor: "#DC2626",
    catBg: "rgba(220,38,38,0.12)",
  },
  {
    idx: "04",
    category: "Hackathon",
    title: "MetaLoop",
    date: "Oct 6–7, 2023",
    dateTime: "2023-10-06",
    body: "Ideate. Immerse. Innovate. — a 36-hour metaverse-themed hackathon in collaboration with Deeploop. ₹75,000 prize pool. Teams competed across augmented reality, virtual worlds, and blockchain integration.",
    tags: ["Metaverse", "36-Hour Hackathon", "₹75K Prize", "CIE × Deeploop"],
    imgGrad: "linear-gradient(145deg,#0c0606 0%,#2d1212 55%,#991b1b 100%)",
    bg: "#0b0606",
    side: "left" as const,
    catColor: "#C04218",
    catBg: "rgba(255,94,44,0.12)",
  },
  {
    idx: "05",
    category: "Innovation Challenge",
    title: "B2B — Business to Brand",
    date: "Apr 3–4, 2025",
    dateTime: "2025-04-03",
    body: "A Brand Revival Hackathon — teams of 3–5 develop strategies to transform brands through Concept & Logo Redesign and Ad-Film Making, backed by exclusive masterclasses from industry experts.",
    tags: ["Brand Revival", "Logo Design", "Ad-Film Making", "Masterclasses"],
    imgGrad: "linear-gradient(145deg,#080c06 0%,#1c2a0d 55%,#4d7c0f 100%)",
    bg: "#070a05",
    side: "right" as const,
    catColor: "#DC2626",
    catBg: "rgba(220,38,38,0.12)",
  },
];

/* 3 archive events (compact) */
const ARCHIVE = [
  {
    category: "Workshop",
    title: "Workshop Carnival",
    date: "Mar 11–16, 2024",
    dateTime: "2024-03-11",
    desc: "Six days of innovation — participants explored UI/UX, IoT, and WordPress themes through hands-on activities and contests.",
    tags: ["IoT", "UI-UX", "WordPress"],
    catColor: "#2563EB",
    catBg: "rgba(59,130,246,0.10)",
  },
  {
    category: "Innovation Challenge",
    title: "Hustle Mania 2",
    date: "Apr 24, 2023",
    dateTime: "2023-04-24",
    desc: "A high-energy entrepreneurship challenge covering negotiation, sales, advertising, and business strategy.",
    tags: ["Business", "Negotiation", "Sales"],
    catColor: "#DC2626",
    catBg: "rgba(220,38,38,0.10)",
  },
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
  const timelineRef  = useRef<HTMLDivElement>(null);
  const lineRef      = useRef<SVGLineElement>(null);

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
      gsap.fromTo(".archive-card",
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".archive-grid",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      /* ── 8. Timeline SVG line scaleY draw ──────────────────── */
      const line = lineRef.current;
      if (line && timelineRef.current) {
        const total = line.getTotalLength ? line.getTotalLength() : 600;
        gsap.set(line, { strokeDasharray: total, strokeDashoffset: total });
        gsap.to(line, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
            end: "bottom 55%",
            scrub: 1,
          },
        });
      }

      /* ── 9. Timeline node entrance ──────────────────────────── */
      gsap.fromTo(".tl-node",
        { opacity: 0, scale: 0 },
        {
          opacity: 1, scale: 1,
          duration: 0.5,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 72%",
            toggleActions: "play none none none",
          },
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ background: "#0A0A0A", overflowX: "hidden", color: "#FFFFFF" }}>

      {/* ══════════════════════════════════════════════════════
          HERO — dark cinematic, no orange background
      ══════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        style={{
          position: "relative",
          height: "100vh",
          minHeight: "620px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          paddingBottom: "8vh",
          paddingTop: "var(--nav-height)",
        }}
      >
        {/* Atmospheric bg */}
        <div
          className="eh-bg"
          style={{
            position: "absolute",
            inset: "-14%",
            background:
              "radial-gradient(ellipse 70% 70% at 15% 30%, rgba(232,82,26,0.05) 0%, transparent 55%), radial-gradient(ellipse 55% 55% at 80% 70%, rgba(124,58,237,0.07) 0%, transparent 55%), #0A0A0A",
            willChange: "transform",
          }}
        >
          <div style={{ position: "absolute", inset: 0, backgroundImage: GRAIN, opacity: 0.06 }} />
        </div>

        <div className="page-container" style={{ position: "relative", zIndex: 1, width: "100%" }}>
          {/* Badge */}
          <div className="eh-meta" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <Calendar size={12} style={{ color: "#E8521A" }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: "10.5px", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.32)" }}>
              Events Archive
            </span>
            <div style={{ width: "28px", height: "1px", background: "rgba(255,255,255,0.10)" }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: "10.5px", color: "#E8521A", letterSpacing: "0.1em" }}>2019 — 2026</span>
          </div>

          {/* Headline */}
          <div style={{ overflow: "hidden" }}>
            <div className="eh-line" style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(72px, 13.5vw, 200px)", lineHeight: 0.86, letterSpacing: "-0.045em", textTransform: "uppercase", color: "#FFFFFF" }}>
              MAKE
            </div>
          </div>
          <div style={{ overflow: "hidden" }}>
            <div className="eh-line" style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(72px, 13.5vw, 200px)", lineHeight: 0.86, letterSpacing: "-0.045em", textTransform: "uppercase", color: "transparent", WebkitTextStroke: "2px rgba(255,255,255,0.20)" }}>
              IT
            </div>
          </div>
          <div style={{ overflow: "hidden", marginBottom: "clamp(28px, 5vw, 52px)" }}>
            <div className="eh-line" style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(72px, 13.5vw, 200px)", lineHeight: 0.86, letterSpacing: "-0.045em", textTransform: "uppercase", color: "#FFFFFF" }}>
              HAPPEN
            </div>
          </div>

          {/* Sub row */}
          <div className="eh-meta" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(13px, 1.4vw, 15px)", lineHeight: 1.7, color: "rgba(255,255,255,0.36)", maxWidth: "380px" }}>
              Over 100 events, workshops, hackathons, and summits — each one shaping the next generation of innovators and entrepreneurs.
            </p>
            <div style={{ display: "flex", gap: "clamp(24px, 3vw, 48px)" }}>
              {[["100+", "Events"], ["3000+", "Participants"], ["5 yrs", "Running"]].map(([n, l]) => (
                <div key={l} style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(18px, 2.5vw, 28px)", letterSpacing: "-0.04em", color: "#FFFFFF", lineHeight: 1 }}>{n}</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "9.5px", color: "rgba(255,255,255,0.28)", letterSpacing: "0.09em", marginTop: "2px" }}>{l}</div>
                </div>
              ))}
            </div>
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
                background: ev.imgGrad,
                willChange: "transform",
              }}
            >
              <div style={{ position: "absolute", inset: 0, backgroundImage: GRAIN, opacity: 0.10 }} />
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
            <div style={{ maxWidth: "480px", padding: "clamp(60px, 12vh, 120px) 0" }}>
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
          ARCHIVE — light section, compact cards
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#F9F8F6", padding: "clamp(72px, 10vw, 110px) 0" }}>
        <div className="page-container">
          {/* Header */}
          <div className="ep-reveal" style={{ marginBottom: "clamp(36px, 5vw, 54px)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <div style={{ width: "26px", height: "1px", background: "#E8521A" }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8521A" }}>
                Archive
              </span>
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(26px, 4vw, 40px)", letterSpacing: "-0.03em", color: "#111111", lineHeight: 1.1 }}>
              More from the archive
            </h2>
          </div>

          {/* Archive grid */}
          <div
            className="archive-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "16px",
            }}
          >
            {ARCHIVE.map((ev) => (
              <div
                key={ev.title}
                className="archive-card"
                style={{
                  background: "#FFFFFF",
                  borderRadius: "14px",
                  padding: "clamp(20px, 3vw, 28px)",
                  border: "1px solid rgba(0,0,0,0.07)",
                  willChange: "transform, opacity",
                  transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s cubic-bezier(0.16,1,0.3,1)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "translateY(-4px)";
                  el.style.boxShadow = "0 12px 40px rgba(0,0,0,0.08)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "none";
                  el.style.boxShadow = "none";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "10px", fontWeight: 700, padding: "3px 10px", borderRadius: "999px", background: ev.catBg, color: ev.catColor, letterSpacing: "0.04em" }}>
                    {ev.category}
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "#9CA3AF" }}>
                    <Calendar size={10} />
                    <time dateTime={ev.dateTime} style={{ fontFamily: "var(--font-body)", fontSize: "10.5px" }}>{ev.date}</time>
                  </div>
                </div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(15px, 2vw, 20px)", letterSpacing: "-0.025em", color: "#111111", lineHeight: 1.2, marginBottom: "10px" }}>
                  {ev.title}
                </h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", lineHeight: 1.7, color: "#666666", marginBottom: "16px" }}>
                  {ev.desc}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {ev.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "9.5px",
                        fontWeight: 600,
                        padding: "3px 9px",
                        borderRadius: "999px",
                        background: "rgba(0,0,0,0.04)",
                        border: "1px solid rgba(0,0,0,0.08)",
                        color: "#555555",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TIMELINE — dark, SVG line draw via GSAP scrub
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#111111", padding: "clamp(72px, 11vw, 120px) 0" }}>
        <div className="page-container">
          <div className="ep-reveal" style={{ marginBottom: "clamp(44px, 6vw, 64px)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <div style={{ width: "26px", height: "1px", background: "#E8521A" }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8521A" }}>
                Timeline
              </span>
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(26px, 4vw, 42px)", letterSpacing: "-0.03em", color: "#FFFFFF", lineHeight: 1.1 }}>
              Five years in the making
            </h2>
          </div>

          {/* Timeline body */}
          <div ref={timelineRef} style={{ position: "relative" }}>
            {/* SVG vertical line */}
            <svg
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "clamp(16px, 3vw, 28px)",
                top: 0, bottom: 0,
                width: "2px",
                height: "100%",
                pointerEvents: "none",
              }}
              preserveAspectRatio="none"
            >
              <line
                ref={lineRef}
                x1="1" y1="0"
                x2="1" y2="100%"
                stroke="rgba(232,82,26,0.35)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>

            {/* Timeline nodes */}
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(32px, 5vw, 52px)", paddingLeft: "clamp(44px, 7vw, 72px)" }}>
              {(([...FEATURED, ...ARCHIVE] as Array<{ title: string; category: string; date: string; dateTime: string }>).sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime())).map((ev, i) => (
                <div key={ev.title + i} style={{ position: "relative" }}>
                  {/* Node dot */}
                  <div
                    className="tl-node"
                    style={{
                      position: "absolute",
                      left: "clamp(-38px, -5.5vw, -52px)",
                      top: "6px",
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: "#E8521A",
                      boxShadow: "0 0 0 3px rgba(232,82,26,0.18)",
                      willChange: "transform, opacity",
                    }}
                  />
                  <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "4px", flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(14px, 2vw, 18px)", letterSpacing: "-0.02em", color: "#FFFFFF" }}>
                      {ev.title}
                    </span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "10.5px", color: "rgba(255,255,255,0.28)", letterSpacing: "0.05em", flexShrink: 0 }}>
                      {ev.date}
                    </span>
                  </div>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "10px", fontWeight: 600, padding: "2px 9px", borderRadius: "999px", background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.30)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    {ev.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
