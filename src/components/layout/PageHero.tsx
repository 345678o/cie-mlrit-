"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getGrainDataUri } from "@/lib/grain";

interface StatItem {
  value: string;
  label: string;
}

interface PageHeroProps {
  tag: string;
  line1: string;
  line2: string;        // always rendered as white outline / stroke text
  line3?: string;
  scriptText?: string;
  description: string;
  stats?: StatItem[];
  cta?: { label: string; href: string };
  watermark?: string;   // large bg ghost text
}

/* Theme tokens — dark (Equinox) by default, light = original orange hero. */
const PHERO_THEME_CSS = `
:root {
  --phero-bg: radial-gradient(ellipse 80% 60% at 50% -10%, rgba(116,132,254,0.38) 0%, rgba(116,132,254,0.10) 45%, transparent 75%), radial-gradient(ellipse 40% 45% at 100% 100%, rgba(51,255,103,0.10) 0%, transparent 70%), radial-gradient(ellipse 35% 40% at 0% 100%, rgba(51,255,103,0.06) 0%, transparent 70%), #16171D;
  --phero-grain-opacity: 0.05;
  --phero-grain-blend: overlay;
  --phero-watermark: rgba(255,255,255,0.03);
  --phero-dots: rgba(116,132,254,0.40);
  --phero-checks: rgba(116,132,254,0.30);
  --phero-crumb: rgba(244,245,250,0.58);
  --phero-fg: #F4F5FA;
  --phero-outline: rgba(165,175,254,0.85);
  --phero-script: #A5AFFE;
  --phero-desc: rgba(244,245,250,0.72);
  --phero-cta-bg: var(--grad-accent);
  --phero-cta-fg: #0A0B12;
  --phero-cta-shadow: 0 8px 28px rgba(116,132,254,0.30);
  --phero-strip-bg: #1C1D26;
  --phero-strip-border: 1px solid rgba(255,255,255,0.08);
  --phero-stat-divider: rgba(255,255,255,0.08);
  --phero-stat-value: #F4F5FA;
  --phero-stat-label: rgba(244,245,250,0.58);
}
:root[data-theme="light"] {
  --phero-bg: #FF5E2C;
  --phero-grain-opacity: 0.035;
  --phero-grain-blend: multiply;
  --phero-watermark: rgba(0,0,0,0.065);
  --phero-dots: rgba(255,255,255,0.30);
  --phero-checks: rgba(255,255,255,0.26);
  --phero-crumb: rgba(255,255,255,0.50);
  --phero-fg: #FFFFFF;
  --phero-outline: rgba(255,255,255,0.80);
  --phero-script: rgba(255,255,255,0.95);
  --phero-desc: rgba(255,255,255,0.88);
  --phero-cta-bg: #FFFFFF;
  --phero-cta-fg: #FF5E2C;
  --phero-cta-shadow: 0 8px 28px rgba(0,0,0,0.20);
  --phero-strip-bg: #FFFFFF;
  --phero-strip-border: none;
  --phero-stat-divider: rgba(0,0,0,0.08);
  --phero-stat-value: #111111;
  --phero-stat-label: #6B7280;
}
`;

export default function PageHero({
  tag, line1, line2, line3, scriptText, description, stats, cta, watermark,
}: PageHeroProps) {
  const hasLine3 = Boolean(line3);

  return (
    <section
      className="page-hero hero-shrink-mobile relative overflow-hidden flex flex-col"
      style={{ background: "var(--phero-bg)", paddingTop: "var(--nav-height)", minHeight: hasLine3 ? "82vh" : "72vh" }}
    >
      {/* Grain texture */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: getGrainDataUri(0.8),
        opacity: "var(--phero-grain-opacity)",
        mixBlendMode: "var(--phero-grain-blend)" as unknown as React.CSSProperties["mixBlendMode"],
      }} />
      <style>{PHERO_THEME_CSS}</style>

      {/* Ghost watermark */}
      {watermark && (
        <div aria-hidden="true" className="absolute pointer-events-none select-none" style={{
          bottom: "30px", right: "-10px",
          fontFamily: "var(--font-heading)", fontWeight: 900,
          fontSize: "clamp(120px, 22vw, 360px)",
          color: "var(--phero-watermark)", lineHeight: 1, letterSpacing: "-0.06em",
          userSelect: "none" as const,
        }}>{watermark}</div>
      )}

      {/* Dot grid — top left */}
      <div aria-hidden="true" className="absolute pointer-events-none" style={{
        top: "calc(var(--nav-height) + 16px)", left: "16px",
        width: "68px", height: "68px",
        backgroundImage: "radial-gradient(circle, var(--phero-dots) 1.5px, transparent 1.5px)",
        backgroundSize: "12px 12px",
      }} />

      {/* Checkered — top right */}
      <div aria-hidden="true" className="absolute pointer-events-none hidden lg:block" style={{
        top: "calc(var(--nav-height) + 20px)", right: "clamp(52px, 8vw, 128px)",
        width: "52px", height: "52px",
        backgroundImage: "repeating-conic-gradient(var(--phero-checks) 0% 25%, transparent 0% 50%)",
        backgroundSize: "13px 13px", borderRadius: "4px",
      }} />

      {/* ── Main content ── */}
      <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
        <div className="page-container w-full" style={{ paddingTop: "44px", paddingBottom: "52px" }}>
          <div className="grid items-center">

            {/* LEFT: text */}
            <div style={{ position: "relative" }}>

              {/* Breadcrumb */}
              <div style={{
                fontFamily: "var(--font-body)", fontSize: "11px",
                color: "var(--phero-crumb)", marginBottom: "12px",
                letterSpacing: "0.04em",
              }}>
                <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
                <span style={{ margin: "0 6px" }}>/</span>
                <span>{tag}</span>
              </div>


              {/* HUGE stacked display text */}
              <motion.h1
                initial={{ opacity: 0, y: 56 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.95, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: "var(--font-heading)", fontWeight: 900,
                  fontSize: hasLine3 ? "clamp(38px, 10vw, 130px)" : "clamp(42px, 12vw, 148px)",
                  lineHeight: 0.88, letterSpacing: "-0.04em",
                  textTransform: "uppercase" as const, marginBottom: 0,
                }}
              >
                <span style={{ display: "block", color: "var(--phero-fg)" }}>{line1}</span>
                <span style={{
                  display: "block", color: "transparent",
                  WebkitTextStroke: "2.5px var(--phero-outline)",
                }}>{line2}</span>
                {hasLine3 && (
                  <span style={{ display: "block", color: "var(--phero-fg)" }}>{line3}</span>
                )}
              </motion.h1>

              {/* Script accent */}
              {scriptText && (
                <motion.p
                  initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.48 }}
                  style={{
                    fontFamily: "var(--font-script)",
                    fontSize: "clamp(18px, 2.5vw, 30px)",
                    color: "var(--phero-script)", lineHeight: 1.2,
                    marginTop: "18px", marginBottom: "18px",
                    display: "inline-block", transform: "rotate(-1.5deg)",
                  }}
                >{scriptText}</motion.p>
              )}

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.60 }}
                style={{
                  fontFamily: "var(--font-body)", fontSize: "clamp(14px, 1.4vw, 16px)",
                  lineHeight: 1.78, color: "var(--phero-desc)",
                  maxWidth: "min(420px,100%)", marginTop: scriptText ? 0 : "18px", marginBottom: cta ? "32px" : 0,
                }}
              >{description}</motion.p>

              {/* Optional CTA */}
              {cta && (
                <motion.div
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.72 }}
                >
                  <Link href={cta.href} style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    background: "var(--phero-cta-bg)", color: "var(--phero-cta-fg)",
                    fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "14px",
                    padding: "12px 24px", borderRadius: "999px", textDecoration: "none",
                    boxShadow: "var(--phero-cta-shadow)", letterSpacing: "-0.01em",
                  }}>
                    {cta.label} <ArrowRight size={15} />
                  </Link>
                </motion.div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* ── Bottom stats strip ── */}
      {stats && stats.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          style={{ background: "var(--phero-strip-bg)", borderTop: "var(--phero-strip-border)", position: "relative", zIndex: 10 }}
        >
          <div className="page-container">
            <div className="pghero-stats" style={{
              display: "grid",
              gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)`,
            }}>
              {stats.slice(0, 4).map((s, i) => (
                <div key={s.label} style={{
                  padding: "clamp(12px,2vw,18px) clamp(12px,2vw,20px)",
                  borderRight: i < Math.min(stats.length, 4) - 1 ? "1px solid var(--phero-stat-divider)" : "none",
                  textAlign: "center" as const,
                }}>
                  <div style={{
                    fontFamily: "var(--font-heading)", fontWeight: 900,
                    fontSize: "clamp(18px,3vw,22px)", color: "var(--phero-stat-value)", lineHeight: 1,
                  }}>{s.value}</div>
                  <div style={{
                    fontFamily: "var(--font-body)", fontSize: "clamp(9px,1.5vw,11px)",
                    color: "var(--phero-stat-label)", marginTop: "3px",
                  }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <style>{`
            @media (max-width: 639px) {
              .pghero-stats { grid-template-columns: repeat(2, 1fr) !important; }
              .pghero-stats > *:nth-child(2) { border-right: none !important; }
            }
          `}</style>
        </motion.div>
      )}
    </section>
  );
}
