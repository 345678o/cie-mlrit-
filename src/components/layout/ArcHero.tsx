"use client";

import { motion } from "framer-motion";
import { getGrainDataUri } from "@/lib/grain";

const GRAIN = getGrainDataUri(0.85);

interface StatItem {
  v: string;
  l: string;
}

interface ArcHeroProps {
  watermark: string;
  line1: string;
  line2: string;
  line2FontScale?: number; // gallery renders its outline word smaller than line1
  headlineFontSize: string;
  headlineLineHeight: number;
  scriptText: string;
  description: string;
  descriptionMaxWidth: string;
  stats: StatItem[];
  /** Lets a page target this hero's section node for its own scroll effects (e.g. gallery's GSAP parallax). */
  heroRef?: React.Ref<HTMLElement>;
  /** Gentle idle float on the two decorative arcs (gallery only). */
  floatingArcs?: boolean;
}

/**
 * The "big circle arcs on orange" hero shared by the Gallery and Verticals
 * pages — visually distinct from the standard `PageHero` (no breadcrumb,
 * stats sit inline on the orange background instead of in a separate strip
 * below it).
 */
export default function ArcHero({
  watermark, line1, line2, line2FontScale = 1,
  headlineFontSize, headlineLineHeight,
  scriptText, description, descriptionMaxWidth,
  stats, heroRef, floatingArcs = false,
}: ArcHeroProps) {
  return (
    <section
      ref={heroRef}
      className="page-hero hero-shrink-mobile relative overflow-hidden flex flex-col"
      style={{
        background: "#E8521A",
        paddingTop: "var(--nav-height)",
        minHeight: "68vh",
      }}
    >
      {/* Grain */}
      <div aria-hidden className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: GRAIN,
        opacity: 0.035, mixBlendMode: "multiply" as const,
      }} />

      {/* Arc — top right */}
      <svg aria-hidden className={`absolute pointer-events-none${floatingArcs ? " arc-hero-float-tr" : ""}`}
        style={{ top: "-14%", right: "-8%", width: "46vw", height: "46vw", maxWidth: 540, maxHeight: 540, opacity: 0.18 }}
        viewBox="0 0 540 540" fill="none">
        <circle cx="270" cy="270" r="250" stroke="rgba(255,255,255,1)" strokeWidth="70" fill="none" />
      </svg>

      {/* Arc — bottom left */}
      <svg aria-hidden className={`absolute pointer-events-none${floatingArcs ? " arc-hero-float-bl" : ""}`}
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
        userSelect: "none" as const,
      }}>{watermark}</div>

      {/* Content */}
      <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
        <div className="page-container w-full" style={{ paddingTop: "clamp(36px,5vw,56px)", paddingBottom: "clamp(48px,6vw,72px)" }}>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 56 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-heading)", fontWeight: 900,
              fontSize: headlineFontSize,
              lineHeight: headlineLineHeight, letterSpacing: "-0.045em",
              textTransform: "uppercase" as const,
              marginBottom: 0,
            }}
          >
            <span style={{ display: "block", color: "#FFFFFF" }}>{line1}</span>
            <span style={{
              display: "block", color: "transparent",
              WebkitTextStroke: "2.5px rgba(255,255,255,0.80)",
              fontSize: line2FontScale !== 1 ? `${line2FontScale}em` : undefined,
              marginTop: line2FontScale !== 1 ? "0.04em" : undefined,
            }}>{line2}</span>
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
            {scriptText}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.62 }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(14px,1.4vw,16px)", lineHeight: 1.78,
              color: "rgba(255,255,255,0.72)",
              maxWidth: descriptionMaxWidth,
              marginBottom: 0,
            }}
          >
            {description}
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
            {stats.map(({ v, l }) => (
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

      {floatingArcs && (
        <style>{`
          @keyframes arcHeroFloat {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50%       { transform: translateY(-10px) rotate(1deg); }
          }
          .arc-hero-float-tr { animation: arcHeroFloat 8s ease-in-out infinite; }
          .arc-hero-float-bl { animation: arcHeroFloat 10s ease-in-out infinite reverse; }
        `}</style>
      )}
    </section>
  );
}
