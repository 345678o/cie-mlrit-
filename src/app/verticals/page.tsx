"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Boxes, Palette, Cpu, CalendarDays, Rocket, ArrowRight } from "lucide-react";
import Link from "next/link";
import PageGeometric from "@/components/ui/PageGeometric";
import { VERTICALS } from "./verticals-data";

/* ─── Icons map ──────────────────────────────────────────────────── */
const ICONS: Record<string, React.ElementType> = {
  mp: Boxes,
  "cie-studios": Palette,
  "product-development": Cpu,
  "startup-cohort": Rocket,
  events: CalendarDays,
};

/* ─── FadeIn ─────────────────────────────────────────────────────── */
function FadeIn({
  children, delay = 0, className = "",
}: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.68, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Vertical card ──────────────────────────────────────────────── */
function VerticalCard({ v, index }: { v: typeof VERTICALS[0]; index: number }) {
  const Icon = ICONS[v.id] ?? Boxes;

  return (
    <FadeIn delay={index * 0.07} className="flex flex-col">
      <Link
        href={`/verticals/${v.id}`}
        style={{ textDecoration: "none", display: "flex", flexDirection: "column", flex: 1 }}
      >
        <motion.div
          whileHover={{ y: -8 }}
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col"
          style={{
            flex: 1,
            borderRadius: "18px",
            overflow: "hidden",
            border: "1px solid rgba(0,0,0,0.07)",
            background: "#FFFFFF",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)",
            cursor: "pointer",
            transition: "box-shadow 0.32s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.boxShadow =
              "0 16px 48px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.06)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.boxShadow =
              "0 2px 8px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)";
          }}
        >
          {/* ── Gradient header ── */}
          <div
            style={{
              height: "116px",
              background: v.gradient,
              position: "relative",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            {/* Dot texture */}
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }} />
            {/* Ghost abbr watermark */}
            <div style={{
              position: "absolute", right: "-4px", bottom: "-18px",
              fontSize: "96px", fontFamily: "var(--font-heading)", fontWeight: 900,
              color: "rgba(255,255,255,0.07)", lineHeight: 1, userSelect: "none",
              pointerEvents: "none",
            }}>
              {v.abbr}
            </div>
            {/* Icon + abbr row */}
            <div style={{
              position: "absolute", left: "22px", top: "50%",
              transform: "translateY(-50%)",
              display: "flex", alignItems: "center", gap: "12px",
            }}>
              <div style={{
                width: "42px", height: "42px", borderRadius: "12px",
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.24)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <Icon size={20} style={{ color: "rgba(255,255,255,0.94)" }} />
              </div>
              <div>
                <span style={{
                  fontFamily: "var(--font-heading)", fontWeight: 900,
                  fontSize: "10.5px", color: "rgba(255,255,255,0.50)",
                  letterSpacing: "0.16em", textTransform: "uppercase",
                  display: "block",
                }}>{v.abbr}</span>
                <span style={{
                  fontFamily: "var(--font-body)", fontSize: "10px", fontWeight: 600,
                  color: "rgba(255,255,255,0.40)", letterSpacing: "0.04em",
                }}>CIE Vertical</span>
              </div>
            </div>
          </div>

          {/* ── Body ── */}
          <div style={{
            padding: "clamp(22px,3vw,28px)",
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}>
            {/* Name */}
            <h3 style={{
              fontFamily: "var(--font-heading)", fontWeight: 800,
              fontSize: "18px", color: "#000000",
              letterSpacing: "-0.02em", marginBottom: "5px",
            }}>
              {v.name}
            </h3>

            {/* Tagline */}
            <p style={{
              fontFamily: "var(--font-body)", fontSize: "11px", fontWeight: 700,
              color: v.color, letterSpacing: "0.06em",
              textTransform: "uppercase", marginBottom: "14px",
            }}>
              {v.tagline}
            </p>

            {/* Description — 3-line clamp */}
            <p style={{
              fontFamily: "var(--font-body)", fontSize: "13.5px",
              lineHeight: 1.72, color: "#6B7280",
              marginBottom: "22px",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical" as const,
              flex: 1,
            }}>
              {v.shortDesc}
            </p>

            {/* Stats strip */}
            {v.stats.length > 0 && (
              <div style={{
                display: "flex", gap: "16px",
                paddingTop: "14px",
                borderTop: "1px solid rgba(0,0,0,0.06)",
                marginBottom: "18px",
              }}>
                {v.stats.slice(0, 2).map((s) => (
                  <div key={s.label}>
                    <div style={{
                      fontFamily: "var(--font-heading)", fontWeight: 900,
                      fontSize: "15px", color: "#000000", lineHeight: 1,
                    }}>
                      {s.value}
                    </div>
                    <div style={{
                      fontFamily: "var(--font-body)", fontSize: "10.5px",
                      color: "#9CA3AF", marginTop: "2px",
                    }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CTA row */}
            <div style={{
              display: "flex", alignItems: "center", gap: "5px",
              color: v.color, fontSize: "12.5px", fontWeight: 700,
              fontFamily: "var(--font-body)",
              marginTop: "auto",
            }}>
              Explore vertical <ArrowRight size={13} />
            </div>
          </div>
        </motion.div>
      </Link>
    </FadeIn>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function VerticalsPage() {
  return (
    <div style={{ background: "#FFFFFF", position: "relative" }}>
      <PageGeometric />

      {/* ══ HERO ═══════════════════════════════════════════════════ */}
      <section
        className="page-hero relative overflow-hidden flex flex-col"
        style={{
          background: "#E8521A",
          paddingTop: "var(--nav-height)",
          minHeight: "68vh",
        }}
      >
        {/* Grain */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.035, mixBlendMode: "multiply" as const,
        }} />

        {/* Arc — top right */}
        <svg aria-hidden className="absolute pointer-events-none"
          style={{ top: "-14%", right: "-8%", width: "46vw", height: "46vw", maxWidth: 540, maxHeight: 540, opacity: 0.18 }}
          viewBox="0 0 540 540" fill="none">
          <circle cx="270" cy="270" r="250" stroke="rgba(255,255,255,1)" strokeWidth="70" fill="none" />
        </svg>

        {/* Arc — bottom left */}
        <svg aria-hidden className="absolute pointer-events-none"
          style={{ bottom: "-10%", left: "-6%", width: "26vw", height: "26vw", maxWidth: 300, maxHeight: 300, opacity: 0.13 }}
          viewBox="0 0 300 300" fill="none">
          <circle cx="150" cy="150" r="130" stroke="rgba(255,255,255,1)" strokeWidth="46" fill="none" />
        </svg>

        {/* Dot grid — top left */}
        <div aria-hidden className="absolute pointer-events-none" style={{
          top: "calc(var(--nav-height) + 16px)", left: "16px",
          width: "72px", height: "72px",
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.30) 1.5px, transparent 1.5px)",
          backgroundSize: "12px 12px",
        }} />

        {/* Ghost watermark */}
        <div aria-hidden className="absolute pointer-events-none select-none" style={{
          bottom: "20px", right: "-12px",
          fontFamily: "var(--font-heading)", fontWeight: 900,
          fontSize: "clamp(120px,22vw,380px)",
          color: "rgba(0,0,0,0.06)", lineHeight: 1, letterSpacing: "-0.06em",
        }}>VERTICALS</div>

        {/* Content */}
        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <div className="page-container w-full" style={{ paddingTop: "clamp(36px,5vw,56px)", paddingBottom: "clamp(48px,6vw,72px)" }}>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "rgba(0,0,0,0.18)", border: "1.5px dashed rgba(255,255,255,0.32)",
                borderRadius: "999px", padding: "5px 16px 5px 6px", marginBottom: "28px",
              }}
            >
              <div style={{
                width: "26px", height: "26px", borderRadius: "50%",
                background: "#FFFFFF", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "12px", flexShrink: 0,
              }}>⚡</div>
              <span style={{
                fontFamily: "var(--font-body)", fontSize: "10.5px", fontWeight: 700,
                letterSpacing: "0.15em", textTransform: "uppercase" as const,
                color: "rgba(255,255,255,0.92)",
              }}>
                {VERTICALS.length} Specialized Domains
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 56 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-heading)", fontWeight: 900,
                fontSize: "clamp(52px, 11vw, 148px)",
                lineHeight: 0.88, letterSpacing: "-0.045em",
                textTransform: "uppercase" as const,
                marginBottom: 0,
              }}
            >
              <span style={{ display: "block", color: "#FFFFFF" }}>OUR</span>
              <span style={{
                display: "block", color: "transparent",
                WebkitTextStroke: "2.5px rgba(255,255,255,0.80)",
              }}>VERTICALS</span>
            </motion.h1>

            {/* Script accent */}
            <motion.p
              initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.50 }}
              style={{
                fontFamily: "var(--font-script)",
                fontSize: "clamp(18px, 2.4vw, 30px)",
                color: "rgba(255,255,255,0.90)", lineHeight: 1.2,
                marginTop: "18px", marginBottom: "20px",
                display: "inline-block", transform: "rotate(-1.5deg)",
              }}
            >
              — pick your path, own your impact
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.62 }}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(14px,1.4vw,16px)", lineHeight: 1.78,
                color: "rgba(255,255,255,0.72)",
                maxWidth: "min(440px,100%)",
                marginBottom: 0,
              }}
            >
              CIE operates through {VERTICALS.length} focused verticals — each with its own team,
              goals, and domain of impact. Together they form the full innovation ecosystem at MLRIT.
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.76 }}
              style={{
                display: "flex", flexWrap: "wrap", gap: "clamp(18px,3vw,32px)",
                marginTop: "clamp(28px,4vw,44px)",
              }}
            >
              {[
                { v: String(VERTICALS.length), l: "Verticals" },
                { v: "500+", l: "Active Members" },
                { v: "80+",  l: "Projects Done" },
                { v: "2024–25", l: "Current Cohort" },
              ].map(({ v, l }) => (
                <div key={l}>
                  <div style={{
                    fontFamily: "var(--font-heading)", fontWeight: 900,
                    fontSize: "clamp(20px,2.8vw,28px)", color: "#FFFFFF", lineHeight: 1,
                  }}>{v}</div>
                  <div style={{
                    fontFamily: "var(--font-body)", fontSize: "11px",
                    color: "rgba(255,255,255,0.55)", marginTop: "3px", fontWeight: 600,
                    letterSpacing: "0.04em",
                  }}>{l}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ CARDS GRID ═════════════════════════════════════════════ */}
      <section style={{
        background: "#FFFFFF",
        paddingTop: "clamp(64px,8vw,96px)",
        paddingBottom: "clamp(80px,10vw,120px)",
      }}>
        <div className="page-container">

          {/* Section header */}
          <FadeIn>
            <div style={{ marginBottom: "clamp(40px,5vw,64px)" }}>
              <span className="section-tag">Explore</span>
              <h2 style={{
                fontFamily: "var(--font-heading)", fontWeight: 900,
                fontSize: "clamp(26px,4vw,42px)", color: "#000000",
                letterSpacing: "-0.03em", lineHeight: 1.1,
                marginTop: "10px", marginBottom: "10px",
              }}>
                The {VERTICALS.length} Verticals
              </h2>
              <p style={{
                fontFamily: "var(--font-body)", fontSize: "clamp(14px,1.3vw,16px)",
                lineHeight: 1.72, color: "#6B7280", maxWidth: "480px",
              }}>
                Each vertical is a focused domain within CIE. Click any card to explore its
                work, team, and how to get involved.
              </p>
            </div>
          </FadeIn>

          {/* Grid — 3 cols desktop → 2 tablet → 1 mobile, equal heights */}
          <div
            className="verticals-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "clamp(18px,2.2vw,26px)",
              alignItems: "stretch",
            }}
          >
            {VERTICALS.map((v, i) => (
              <VerticalCard key={v.id} v={v} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Responsive grid override in JSX <style> */}
      <style>{`
        @media (max-width: 1023px) { .verticals-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 639px)  { .verticals-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
