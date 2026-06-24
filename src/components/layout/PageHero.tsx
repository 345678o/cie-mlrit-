"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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

const ORANGE  = "#FF5E2C";
const CREAM   = "#FFFFFF";

export default function PageHero({
  tag, line1, line2, line3, scriptText, description, stats, cta, watermark,
}: PageHeroProps) {
  const hasLine3 = Boolean(line3);

  return (
    <section
      className="relative overflow-hidden flex flex-col"
      style={{ background: ORANGE, paddingTop: "var(--nav-height)", minHeight: hasLine3 ? "82vh" : "72vh" }}
    >
      {/* Grain texture */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        opacity: 0.035, mixBlendMode: "multiply" as const,
      }} />

      {/* Ghost watermark */}
      {watermark && (
        <div aria-hidden="true" className="absolute pointer-events-none select-none" style={{
          bottom: "30px", right: "-10px",
          fontFamily: "var(--font-heading)", fontWeight: 900,
          fontSize: "clamp(120px, 22vw, 360px)",
          color: "rgba(0,0,0,0.065)", lineHeight: 1, letterSpacing: "-0.06em",
          userSelect: "none" as const,
        }}>{watermark}</div>
      )}

      {/* Dot grid — top left */}
      <div aria-hidden="true" className="absolute pointer-events-none" style={{
        top: "calc(var(--nav-height) + 16px)", left: "16px",
        width: "68px", height: "68px",
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.30) 1.5px, transparent 1.5px)",
        backgroundSize: "12px 12px",
      }} />

      {/* Checkered — top right */}
      <div aria-hidden="true" className="absolute pointer-events-none hidden lg:block" style={{
        top: "calc(var(--nav-height) + 20px)", right: "clamp(52px, 8vw, 128px)",
        width: "52px", height: "52px",
        backgroundImage: "repeating-conic-gradient(rgba(255,255,255,0.26) 0% 25%, transparent 0% 50%)",
        backgroundSize: "13px 13px", borderRadius: "4px",
      }} />

      {/* ── Main content ── */}
      <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
        <div className="page-container w-full" style={{ paddingTop: "44px", paddingBottom: "52px" }}>
          <div className="grid lg:grid-cols-[1fr_380px] gap-8 lg:gap-12 items-center">

            {/* LEFT: text */}
            <div style={{ position: "relative" }}>

              {/* Breadcrumb */}
              <div style={{
                fontFamily: "var(--font-body)", fontSize: "11px",
                color: "rgba(255,255,255,0.50)", marginBottom: "12px",
                letterSpacing: "0.04em",
              }}>
                <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
                <span style={{ margin: "0 6px" }}>/</span>
                <span>{tag}</span>
              </div>

              {/* Tag badge */}
              <motion.div
                initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  background: "rgba(0,0,0,0.18)", border: "1.5px dashed rgba(255,255,255,0.32)",
                  borderRadius: "999px", padding: "4px 14px 4px 5px", marginBottom: "26px",
                }}
              >
                <div style={{
                  width: "26px", height: "26px", borderRadius: "50%",
                  background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "12px", flexShrink: 0,
                }}>✦</div>
                <span style={{
                  fontFamily: "var(--font-body)", fontSize: "10px", fontWeight: 700,
                  letterSpacing: "0.15em", textTransform: "uppercase" as const,
                  color: "rgba(255,255,255,0.90)",
                }}>{tag}</span>
              </motion.div>

              {/* HUGE stacked display text */}
              <motion.h1
                initial={{ opacity: 0, y: 56 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.95, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: "var(--font-heading)", fontWeight: 900,
                  fontSize: hasLine3 ? "clamp(58px, 10vw, 130px)" : "clamp(66px, 12vw, 148px)",
                  lineHeight: 0.88, letterSpacing: "-0.04em",
                  textTransform: "uppercase" as const, marginBottom: 0,
                }}
              >
                <span style={{ display: "block", color: "#FFFFFF" }}>{line1}</span>
                <span style={{
                  display: "block", color: "transparent",
                  WebkitTextStroke: "2.5px rgba(255,255,255,0.80)",
                }}>{line2}</span>
                {hasLine3 && (
                  <span style={{ display: "block", color: "#FFFFFF" }}>{line3}</span>
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
                    color: "rgba(255,255,255,0.95)", lineHeight: 1.2,
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
                  lineHeight: 1.78, color: "rgba(255,255,255,0.88)",
                  maxWidth: "420px", marginTop: scriptText ? 0 : "18px", marginBottom: cta ? "32px" : 0,
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
                    background: "#FFFFFF", color: ORANGE,
                    fontFamily: "var(--font-body)", fontWeight: 800, fontSize: "14px",
                    padding: "12px 24px", borderRadius: "999px", textDecoration: "none",
                    boxShadow: "0 8px 28px rgba(0,0,0,0.20)", letterSpacing: "-0.01em",
                  }}>
                    {cta.label} <ArrowRight size={15} />
                  </Link>
                </motion.div>
              )}
            </div>

            {/* RIGHT: abstract decorative collage (desktop only) */}
            <div className="hidden lg:block" style={{ position: "relative", height: "420px" }}>

              {/* Large outlined circle */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.0, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: "absolute", top: "50%", left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "300px", height: "300px", borderRadius: "50%",
                  border: "1.5px solid rgba(255,255,255,0.16)",
                  pointerEvents: "none",
                }}
              />

              {/* Inner smaller circle */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.0, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: "absolute", top: "50%", left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "180px", height: "180px", borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.10)",
                  pointerEvents: "none",
                }}
              />

              {/* Cream stat card */}
              {stats && stats.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 24, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.55 }}
                  style={{
                    position: "absolute", top: "50%", left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: CREAM, borderRadius: "20px",
                    padding: "20px 24px", textAlign: "center" as const,
                    boxShadow: "0 16px 40px rgba(0,0,0,0.20)", zIndex: 4,
                    minWidth: "140px",
                  }}
                >
                  <p style={{
                    fontFamily: "var(--font-heading)", fontWeight: 900,
                    fontSize: "clamp(28px, 4vw, 40px)", color: "#111111", lineHeight: 1,
                    marginBottom: "4px",
                  }}>{stats[0].value}</p>
                  <p style={{
                    fontFamily: "var(--font-body)", fontSize: "11px",
                    color: "#6B7280", fontWeight: 600, letterSpacing: "0.04em",
                  }}>{stats[0].label}</p>
                </motion.div>
              )}

              {/* ✦ Star decorations */}
              {[
                { top: "8%",  left: "10%",  size: 24, delay: 0.80 },
                { top: "14%", right: "8%",  size: 16, delay: 0.88 },
                { bottom: "20%", left: "8%", size: 18, delay: 0.96 },
                { bottom: "12%", right: "12%", size: 12, delay: 1.04 },
                { top: "42%", left: "2%",   size: 14, delay: 1.10 },
              ].map((s, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, delay: s.delay }}
                  style={{
                    position: "absolute",
                    top: (s as any).top, left: (s as any).left,
                    bottom: (s as any).bottom, right: (s as any).right,
                    fontSize: `${s.size}px`, color: "rgba(255,255,255,0.90)",
                    pointerEvents: "none", display: "block",
                  }}
                >✦</motion.span>
              ))}

              {/* 3×3 dot cluster — top right */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
                style={{
                  position: "absolute", top: "6%", right: "18%",
                  display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "5px",
                  pointerEvents: "none",
                }}
              >
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(0,0,0,0.22)" }} />
                ))}
              </motion.div>

              {/* Small accent dot */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                style={{
                  position: "absolute", bottom: "28%", right: "4%",
                  width: "10px", height: "10px", borderRadius: "50%",
                  background: "rgba(0,0,0,0.20)", pointerEvents: "none",
                }}
              />
            </div>

          </div>
        </div>
      </div>

      {/* ── Bottom stats strip ── */}
      {stats && stats.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          style={{ background: CREAM, position: "relative", zIndex: 10 }}
        >
          <div className="page-container">
            <div style={{
              display: "grid",
              gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)`,
              borderTop: "none",
            }}>
              {stats.slice(0, 4).map((s, i) => (
                <div key={s.label} style={{
                  padding: "18px 20px",
                  borderRight: i < Math.min(stats.length, 4) - 1 ? "1px solid rgba(0,0,0,0.08)" : "none",
                  textAlign: "center" as const,
                }}>
                  <div style={{
                    fontFamily: "var(--font-heading)", fontWeight: 900,
                    fontSize: "22px", color: "#111111", lineHeight: 1,
                  }}>{s.value}</div>
                  <div style={{
                    fontFamily: "var(--font-body)", fontSize: "11px",
                    color: "#6B7280", marginTop: "3px",
                  }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
