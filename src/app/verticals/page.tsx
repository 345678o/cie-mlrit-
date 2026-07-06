"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Boxes, Palette, Cpu, CalendarDays, Rocket, ArrowRight, Package } from "lucide-react";
import Link from "next/link";
import PageGeometric from "@/components/ui/PageGeometric";
import ArcHero from "@/components/layout/ArcHero";
import { VERTICALS } from "./verticals-data";

/* ─── Icons map ──────────────────────────────────────────────────── */
const ICONS: Record<string, React.ElementType> = {
  mp: Boxes,
  "cie-studios": Palette,
  "product-development": Cpu,
  "startup-cohort": Rocket,
  events: CalendarDays,
  inventory: Package,
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
      <ArcHero
        watermark="VERTICALS"
        line1="OUR"
        line2="VERTICALS"
        headlineFontSize="clamp(52px, 11vw, 148px)"
        headlineLineHeight={0.88}
        scriptText="— pick your path, own your impact"
        description={`CIE operates through ${VERTICALS.length} focused verticals — each with its own team, goals, and domain of impact. Together they form the full innovation ecosystem at MLRIT.`}
        descriptionMaxWidth="min(440px,100%)"
        stats={[
          { v: String(VERTICALS.length), l: "Verticals" },
          { v: "500+", l: "Active Members" },
          { v: "80+",  l: "Projects Done" },
          { v: "2026–27", l: "Current Cohort" },
        ]}
      />

      {/* ══ CARDS GRID ═════════════════════════════════════════════ */}
      <section style={{
        background: "#FFFFFF",
        paddingTop: "clamp(64px,8vw,96px)",
        paddingBottom: "clamp(80px,10vw,120px)",
      }}>
        <div className="page-container">

          {/* Section header */}
          <FadeIn>
            <div className="text-center" style={{ marginBottom: "clamp(40px,5vw,64px)" }}>
              <span className="section-tag">Explore</span>
              <h2 style={{
                fontFamily: "var(--font-heading)", fontWeight: 900,
                fontSize: "clamp(26px,4vw,42px)", color: "#000000",
                letterSpacing: "-0.03em", lineHeight: 1.1,
                marginTop: "10px", marginBottom: "10px",
              }}>
                Our Verticals
              </h2>
              <p style={{
                fontFamily: "var(--font-body)", fontSize: "clamp(14px,1.3vw,16px)",
                lineHeight: 1.72, color: "#6B7280", maxWidth: "620px",
                marginLeft: "auto", marginRight: "auto",
              }}>
                CIE is made up of different verticals, each focusing on a specific part of
                the innovation ecosystem. Some focus on building. Some focus on developing
                ideas further. Some tell stories. Some support resources and operations.
                Some explore entrepreneurship. Each vertical works differently, but they
                are connected by one thing: students learning through real experience.
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
