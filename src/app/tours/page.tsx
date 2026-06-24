"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Camera } from "lucide-react";

/* ─── Constants ─────────────────────────────────────────────── */

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const H_SLIDES = [
  { label: "Workshop Carnival 2.0",   year: "APR 2026", cat: "Workshop",    n: "042", grad: "linear-gradient(145deg,#060d20 0%,#0f2044 55%,#1e40af 100%)" },
  { label: "Equinox E-Summit 2K24",   year: "NOV 2024", cat: "E-Summit",    n: "087", grad: "linear-gradient(145deg,#0e0618 0%,#2d1057 55%,#6d28d9 100%)" },
  { label: "GI Mahotsav 2024",         year: "MAR 2024", cat: "Cultural",    n: "031", grad: "linear-gradient(145deg,#060e0a 0%,#14532d 55%,#16a34a 100%)" },
  { label: "MetaLoop Hackathon",        year: "OCT 2023", cat: "Hackathon",  n: "118", grad: "linear-gradient(145deg,#0c0606 0%,#2d1212 55%,#991b1b 100%)" },
  { label: "B2B — Business to Brand",  year: "APR 2025", cat: "Innovation", n: "063", grad: "linear-gradient(145deg,#080c06 0%,#1c2a0d 55%,#4d7c0f 100%)" },
  { label: "Innovation Lab",            year: "Ongoing",  cat: "Facility",   n: "155", grad: "linear-gradient(145deg,#06090e 0%,#0c1f3d 55%,#0369a1 100%)" },
  { label: "Maker Space",               year: "Ongoing",  cat: "Facility",   n: "092", grad: "linear-gradient(145deg,#0e0606 0%,#3d0c0c 55%,#b91c1c 100%)" },
  { label: "Campus Moments",            year: "2024",     cat: "Archive",    n: "076", grad: "linear-gradient(145deg,#080808 0%,#1c1c1c 55%,#374151 100%)" },
];

const FEATURES = [
  {
    tag: "Innovation",
    h: "Where ideas become reality",
    body: "NVIDIA-powered workstations, CNC routers, 3D printers, and laser cutters — a space that turns any concept into a physical prototype. The Innovation Lab is where CIE students build the future.",
    imgGrad: "linear-gradient(135deg,#0369a1 0%,#0c4a6e 45%,#082f49 100%)",
    side: "right" as const,
    bg: "#07090f",
  },
  {
    tag: "Community",
    h: "500+ founders in the making",
    body: "From idea-stage to pitch-ready — students collaborate with mentors, refine MVPs, and connect with the broader Hyderabad startup ecosystem. CIE is where ambition finds its home.",
    imgGrad: "linear-gradient(135deg,#7c3aed 0%,#4c1d95 45%,#1e1b4b 100%)",
    side: "left" as const,
    bg: "#090709",
  },
  {
    tag: "Events",
    h: "100+ events, one community",
    body: "Hackathons, workshops, e-summits, and guest lectures — each event is a chapter in a story of growth. Explore the visual archive of CIE's most memorable moments.",
    imgGrad: "linear-gradient(135deg,#059669 0%,#047857 45%,#064e3b 100%)",
    side: "right" as const,
    bg: "#060b08",
  },
];

const GRID = [
  { label: "Pitch Day",         grad: "linear-gradient(145deg,#0f172a,#1e3a5f,#0284c7)", cs: 2, rs: 2 },
  { label: "Workshop",          grad: "linear-gradient(145deg,#0a0a0a,#374151)",           cs: 1, rs: 1 },
  { label: "Hackathon Night",   grad: "linear-gradient(145deg,#1c1917,#2d1b69,#7c3aed)",  cs: 1, rs: 1 },
  { label: "Innovation Lab",    grad: "linear-gradient(145deg,#0f0a1e,#2d1570,#4c1d95)",  cs: 1, rs: 2 },
  { label: "Maker Space",       grad: "linear-gradient(145deg,#0a1e0a,#14532d,#16a34a)",  cs: 1, rs: 1 },
  { label: "E-Summit 2024",     grad: "linear-gradient(145deg,#1c0a0a,#7f1d1d,#991b1b)",  cs: 2, rs: 1 },
  { label: "Student Startups",  grad: "linear-gradient(145deg,#1c1c0a,#4d7c0f,#84cc16)", cs: 1, rs: 1 },
  { label: "Campus",            grad: "linear-gradient(145deg,#0a0a0a,#111827,#1f2937)",  cs: 1, rs: 1 },
];

const STATS = [
  { n: "100+",  label: "Events Documented" },
  { n: "3000+", label: "Participants Captured" },
  { n: "500+",  label: "Archival Moments" },
  { n: "5 yrs", label: "Of Storytelling" },
];

/* ═══════════════════════════════════════════════════════════════
   Gallery Page
═══════════════════════════════════════════════════════════════ */
export default function GalleryPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef      = useRef<HTMLDivElement>(null);
  const hScrollRef   = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      /* ── 1. Hero text entrance ─────────────────────────────── */
      gsap.fromTo(".gh-line",
        { yPercent: 112, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.1, ease: "power3.out", delay: 0.12 }
      );
      gsap.fromTo(".gh-meta",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.55, ease: "power2.out" }
      );

      /* ── 2. Hero background parallax ───────────────────────── */
      gsap.to(".gh-bg", {
        yPercent: 26,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      /* ── 3. Horizontal gallery (desktop only) ──────────────── */
      const track   = trackRef.current;
      const section = hScrollRef.current;
      if (track && section && window.innerWidth >= 768) {
        const getTotal = () => track.scrollWidth - window.innerWidth;

        const hAnim = gsap.to(track, {
          x: () => -getTotal(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getTotal()}`,
            pin: true,
            scrub: 0.85,
            invalidateOnRefresh: true,
          },
        });

        /* Slide entrance — stagger as horizontal section enters */
        gsap.fromTo(".h-slide",
          { opacity: 0.25, scale: 0.93 },
          {
            opacity: 1, scale: 1,
            duration: 0.9, stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );

        /* Subtle scale-up on each slide tied to scroll via containerAnimation */
        gsap.utils.toArray<HTMLElement>(".h-slide-img").forEach((img) => {
          gsap.to(img, {
            scale: 1.04,
            ease: "none",
            scrollTrigger: {
              containerAnimation: hAnim,
              trigger: img.parentElement!,
              start: "left 80%",
              end: "left 10%",
              scrub: 1,
            },
          });
        });
      }

      /* ── 4. Clip-path reveals on feature images ────────────── */
      gsap.utils.toArray<HTMLElement>(".reveal-img").forEach((el) => {
        gsap.fromTo(el,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.35,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: el,
              start: "top 78%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      /* ── 5. Parallax on feature panel images ───────────────── */
      gsap.utils.toArray<HTMLElement>(".para-img").forEach((el) => {
        const section = el.closest("section");
        gsap.to(el, {
          yPercent: -18,
          ease: "none",
          scrollTrigger: {
            trigger: section || el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      /* ── 6. Generic text reveals ────────────────────────────── */
      gsap.utils.toArray<HTMLElement>(".reveal-text").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 28 },
          {
            opacity: 1, y: 0,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 84%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      /* ── 7. Masonry grid stagger ────────────────────────────── */
      gsap.fromTo(".grid-item",
        { opacity: 0, y: 48, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.9,
          stagger: { amount: 0.75, from: "start" },
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".masonry-grid",
            start: "top 78%",
            toggleActions: "play none none none",
          },
        }
      );

      /* ── 8. Stats entrance ──────────────────────────────────── */
      gsap.fromTo(".stat-item",
        { opacity: 0, y: 22 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          stagger: 0.09,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".stats-row",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ background: "#0C0B09", overflowX: "hidden", color: "#FFFFFF" }}>

      {/* ══════════════════════════════════════════════════════
          HERO — cinematic dark opening
      ══════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        style={{
          position: "relative",
          height: "100vh",
          minHeight: "600px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          paddingBottom: "8vh",
          paddingTop: "var(--nav-height)",
        }}
      >
        {/* Animated background */}
        <div
          className="gh-bg"
          style={{
            position: "absolute",
            inset: "-12%",
            background:
              "radial-gradient(ellipse 80% 80% at 20% 25%, rgba(232,82,26,0.07) 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 80% 75%, rgba(30,64,175,0.10) 0%, transparent 60%), #0C0B09",
            willChange: "transform",
          }}
        >
          <div style={{ position: "absolute", inset: 0, backgroundImage: GRAIN, opacity: 0.065 }} />
        </div>

        <div className="page-container" style={{ position: "relative", zIndex: 1, width: "100%" }}>
          {/* Archive badge */}
          <div
            className="gh-meta"
            style={{
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Camera size={13} style={{ color: "#E8521A", flexShrink: 0 }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: "10.5px", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.36)" }}>
              CIE Visual Archive
            </span>
            <div style={{ width: "32px", height: "1px", background: "rgba(255,255,255,0.12)" }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: "10.5px", color: "#E8521A", letterSpacing: "0.1em" }}>2019 — 2026</span>
          </div>

          {/* Headline lines */}
          <div style={{ overflow: "hidden" }}>
            <div
              className="gh-line"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 900,
                fontSize: "clamp(44px, 13vw, 188px)",
                lineHeight: 0.86,
                letterSpacing: "-0.045em",
                textTransform: "uppercase",
                color: "#FFFFFF",
              }}
            >
              CAPTURED
            </div>
          </div>
          <div style={{ overflow: "hidden", marginBottom: "clamp(28px, 4vw, 48px)" }}>
            <div
              className="gh-line"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 900,
                fontSize: "clamp(44px, 13vw, 188px)",
                lineHeight: 0.86,
                letterSpacing: "-0.045em",
                textTransform: "uppercase",
                color: "transparent",
                WebkitTextStroke: "2px rgba(255,255,255,0.22)",
              }}
            >
              MOMENTS
            </div>
          </div>

          {/* Sub row */}
          <div
            className="gh-meta"
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(13px, 1.4vw, 15px)", lineHeight: 1.7, color: "rgba(255,255,255,0.38)", maxWidth: "380px" }}>
              A visual record of innovation, collaboration, and ambition — from the labs, stages, and workshops of MLRIT CIE.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "32px", height: "1px", background: "rgba(255,255,255,0.16)" }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: "9.5px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.18)" }}>
                Scroll to explore
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          INTRO TEXT — light section
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#F9F8F6", padding: "clamp(72px, 11vw, 130px) 0" }}>
        <div className="page-container">
          <div style={{ maxWidth: "780px" }}>
            <div
              className="reveal-text"
              style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "26px" }}
            >
              <div style={{ width: "28px", height: "1px", background: "#E8521A" }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8521A" }}>
                Visual Archive
              </span>
            </div>
            <h2
              className="reveal-text"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 900,
                fontSize: "clamp(30px, 5vw, 56px)",
                letterSpacing: "-0.03em",
                lineHeight: 1.08,
                color: "#111111",
                marginBottom: "26px",
              }}
            >
              Every frame tells a story of people building something meaningful.
            </h2>
            <p
              className="reveal-text"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(15px, 1.6vw, 18px)",
                lineHeight: 1.78,
                color: "#555555",
              }}
            >
              Five years. A hundred events. Three thousand students. This is not just a photo archive — it is a living document of what happens when curiosity meets opportunity inside MLRIT&apos;s Centre for Innovation &amp; Entrepreneurship.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          HORIZONTAL SCROLL GALLERY
      ══════════════════════════════════════════════════════ */}
      <section
        ref={hScrollRef}
        style={{
          position: "relative",
          overflow: "hidden",
          background: "#0C0B09",
          height: "100vh",
        }}
      >
        {/* Subtle top border */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "rgba(255,255,255,0.06)", zIndex: 10 }} />

        {/* Track */}
        <div
          ref={trackRef}
          className="h-scroll-track"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(12px, 1.8vw, 22px)",
            paddingLeft: "clamp(20px, 5vw, 80px)",
            paddingRight: "clamp(20px, 5vw, 80px)",
            height: "100%",
            willChange: "transform",
          }}
        >
          {/* Header card */}
          <div
            className="h-slide"
            style={{
              flexShrink: 0,
              width: "clamp(180px, 20vw, 300px)",
              paddingRight: "clamp(16px, 2.5vw, 40px)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
              <div style={{ width: "22px", height: "1px", background: "#E8521A" }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8521A" }}>
                Gallery
              </span>
            </div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(24px, 3vw, 40px)", letterSpacing: "-0.03em", color: "#FFFFFF", lineHeight: 1.1, marginBottom: "14px" }}>
              Explore<br />the moments
            </h3>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "12px", lineHeight: 1.65, color: "rgba(255,255,255,0.3)" }}>
              {H_SLIDES.length} collections · Scroll to navigate
            </p>
          </div>

          {/* Image slides */}
          {H_SLIDES.map((slide, i) => (
            <div
              key={i}
              className="h-slide"
              style={{
                flexShrink: 0,
                width: "clamp(220px, 24vw, 360px)",
                height: "clamp(300px, 56vh, 500px)",
                borderRadius: "10px",
                overflow: "hidden",
                position: "relative",
                willChange: "transform, opacity",
              }}
            >
              {/* Photo placeholder */}
              <div
                className="h-slide-img"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: slide.grad,
                  willChange: "transform",
                }}
              >
                <div style={{ position: "absolute", inset: 0, backgroundImage: GRAIN, opacity: 0.09 }} />
              </div>

              {/* Caption */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                padding: "clamp(14px, 2vw, 22px)",
                background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.13em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
                    {slide.cat}
                  </span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "9px", color: "rgba(255,255,255,0.28)", letterSpacing: "0.07em" }}>
                    {slide.year}
                  </span>
                </div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(13px, 1.6vw, 18px)", color: "#FFFFFF", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                  {slide.label}
                </div>
                <div style={{ marginTop: "7px", fontFamily: "var(--font-body)", fontSize: "9px", color: "rgba(255,255,255,0.22)", letterSpacing: "0.07em" }}>
                  {slide.n} frames archived
                </div>
              </div>

              {/* Index */}
              <div style={{ position: "absolute", top: "14px", right: "14px", fontFamily: "var(--font-body)", fontSize: "9.5px", fontWeight: 600, color: "rgba(255,255,255,0.18)", letterSpacing: "0.1em" }}>
                {String(i + 1).padStart(2, "0")}
              </div>
            </div>
          ))}

          {/* End spacer */}
          <div style={{ flexShrink: 0, width: "clamp(20px, 5vw, 80px)" }} />
        </div>

        {/* Scroll hint */}
        <div style={{ position: "absolute", bottom: "20px", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: "6px" }}>
          {H_SLIDES.map((_, i) => (
            <div key={i} style={{ width: i === 0 ? "18px" : "4px", height: "1.5px", borderRadius: "2px", background: i === 0 ? "#E8521A" : "rgba(255,255,255,0.16)", transition: "all 0.3s" }} />
          ))}
        </div>

        {/* Mobile fallback: horizontal scroll natively */}
        <style>{`
          @media (max-width: 767px) {
            .h-scroll-track { overflow-x: auto; -webkit-overflow-scrolling: touch; }
          }
        `}</style>
      </section>

      {/* ══════════════════════════════════════════════════════
          FEATURE PANELS — 3 alternating full-height panels
      ══════════════════════════════════════════════════════ */}
      {FEATURES.map((f, i) => (
        <section
          key={i}
          style={{
            position: "relative",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            background: f.bg,
            overflow: "hidden",
          }}
        >
          {/* Image (clip-path reveal + parallax) */}
          <div
            className="reveal-img"
            style={{
              position: "absolute",
              [f.side === "right" ? "right" : "left"]: 0,
              top: 0,
              width: "clamp(280px, 46%, 640px)",
              height: "100%",
              overflow: "hidden",
            }}
          >
            <div
              className="para-img"
              style={{
                width: "100%",
                height: "132%",
                position: "absolute",
                top: "-16%",
                background: f.imgGrad,
                willChange: "transform",
              }}
            >
              <div style={{ position: "absolute", inset: 0, backgroundImage: GRAIN, opacity: 0.11 }} />
              {/* Corner label */}
              <div style={{ position: "absolute", bottom: "24px", left: "24px" }}>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)" }}>
                  CIE · {f.tag}
                </span>
              </div>
            </div>
          </div>

          {/* Text */}
          <div
            className="page-container"
            style={{
              position: "relative",
              zIndex: 2,
              width: "100%",
              display: "flex",
              justifyContent: f.side === "right" ? "flex-start" : "flex-end",
            }}
          >
            <div style={{ maxWidth: "460px", padding: "clamp(56px, 10vh, 110px) 0" }}>
              <div className="reveal-text" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "22px" }}>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#E8521A" }}>
                  {String(i + 1).padStart(2, "0")} / {String(FEATURES.length).padStart(2, "0")}
                </span>
                <div style={{ width: "22px", height: "1px", background: "rgba(255,255,255,0.14)" }} />
                <span style={{ fontFamily: "var(--font-body)", fontSize: "9.5px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  {f.tag}
                </span>
              </div>
              <h2
                className="reveal-text"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 900,
                  fontSize: "clamp(28px, 4.5vw, 52px)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.07,
                  color: "#FFFFFF",
                  marginBottom: "22px",
                }}
              >
                {f.h}
              </h2>
              <p
                className="reveal-text"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(14px, 1.5vw, 16px)",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.46)",
                }}
              >
                {f.body}
              </p>
            </div>
          </div>
        </section>
      ))}

      {/* ══════════════════════════════════════════════════════
          PHOTO GRID — masonry reveal, light bg
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#F9F8F6", padding: "clamp(72px, 10vw, 120px) 0" }}>
        <div className="page-container">
          {/* Header */}
          <div className="reveal-text" style={{ marginBottom: "clamp(32px, 5vw, 52px)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <div style={{ width: "26px", height: "1px", background: "#E8521A" }} />
              <span style={{ fontFamily: "var(--font-body)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#E8521A" }}>
                Photo Archive
              </span>
            </div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(26px, 4vw, 42px)", letterSpacing: "-0.03em", color: "#111111", lineHeight: 1.1 }}>
              Moments from the archive
            </h2>
          </div>

          {/* Grid */}
          <div
            className="masonry-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gridTemplateRows: "repeat(3, 200px)",
              gap: "10px",
            }}
          >
            {GRID.map((item, i) => (
              <div
                key={i}
                className="grid-item"
                style={{
                  gridColumn: `span ${item.cs}`,
                  gridRow: `span ${item.rs}`,
                  borderRadius: "8px",
                  overflow: "hidden",
                  position: "relative",
                  background: item.grad,
                  cursor: "pointer",
                  willChange: "transform, opacity",
                  transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "scale(0.985)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "scale(1)"; }}
              >
                <div style={{ position: "absolute", inset: 0, backgroundImage: GRAIN, opacity: 0.09 }} />
                <div style={{ position: "absolute", bottom: "12px", left: "14px" }}>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "9px", fontWeight: 600, color: "rgba(255,255,255,0.38)", letterSpacing: "0.06em" }}>
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grid responsive overrides */}
        <style>{`
          @media (max-width: 900px) {
            .masonry-grid { grid-template-columns: repeat(2,1fr) !important; grid-template-rows: repeat(5,160px) !important; }
            .masonry-grid > div { grid-column: span 1 !important; grid-row: span 1 !important; }
          }
          @media (max-width: 560px) {
            .masonry-grid { grid-template-columns: 1fr !important; grid-template-rows: auto !important; }
            .masonry-grid > div { height: 150px; }
          }
        `}</style>
      </section>

      {/* ══════════════════════════════════════════════════════
          STATS — dark, minimal
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#111111", padding: "clamp(72px, 11vw, 110px) 0" }}>
        <div className="page-container">
          <div
            className="stats-row"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "clamp(36px, 6vw, 72px)",
            }}
          >
            {STATS.map((s, i) => (
              <div key={i} className="stat-item" style={{ willChange: "transform, opacity" }}>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(38px, 6.5vw, 80px)", letterSpacing: "-0.045em", color: "#FFFFFF", lineHeight: 1, marginBottom: "8px" }}>
                  {s.n}
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "12.5px", color: "rgba(255,255,255,0.35)", letterSpacing: "0.07em" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(min-width:640px){.stats-row{grid-template-columns:repeat(4,1fr)!important;}}`}</style>
      </section>

      {/* ══════════════════════════════════════════════════════
          CLOSING CTA
      ══════════════════════════════════════════════════════ */}
      <section style={{ background: "#0C0B09", padding: "clamp(88px, 14vw, 160px) 0", textAlign: "center" }}>
        <div className="page-container">
          <div
            className="reveal-text"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "22px" }}
          >
            <div style={{ width: "22px", height: "1px", background: "#E8521A" }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#E8521A" }}>
              Visit us
            </span>
            <div style={{ width: "22px", height: "1px", background: "#E8521A" }} />
          </div>
          <h2
            className="reveal-text"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 900,
              fontSize: "clamp(36px, 7vw, 88px)",
              letterSpacing: "-0.045em",
              color: "#FFFFFF",
              lineHeight: 1.04,
              marginBottom: "22px",
            }}
          >
            See it in person.
          </h2>
          <p
            className="reveal-text"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(14px, 1.5vw, 17px)",
              lineHeight: 1.72,
              color: "rgba(255,255,255,0.38)",
              maxWidth: "400px",
              margin: "0 auto 40px",
            }}
          >
            Tours run Monday–Saturday, 10AM–4PM. Free and open to all MLRIT students, alumni, and visitors.
          </p>
          <div
            className="reveal-text"
            style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}
          >
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
              Book a Tour <ArrowRight size={14} />
            </Link>
            <Link
              href="/contact"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "14px",
                color: "rgba(255,255,255,0.5)",
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: "999px", padding: "13px 30px",
                textDecoration: "none",
              }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
