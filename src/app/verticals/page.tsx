"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Boxes, Palette, Cpu, CalendarDays, Rocket, ArrowRight } from "lucide-react";
import Link from "next/link";
import PageHero from "@/components/layout/PageHero";
import PageGeometric from "@/components/ui/PageGeometric";
import { VERTICALS } from "./verticals-data";

const ICONS: Record<string, React.ElementType> = {
  mp: Boxes,
  "cie-studios": Palette,
  "product-development": Cpu,
  "startup-cohort": Rocket,
  events: CalendarDays,
};

function FadeIn({
  children, delay = 0, className = "",
}: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

export default function VerticalsPage() {
  return (
    <div style={{ background: "#FFFFFF", position: "relative" }}>
      <PageGeometric />

      <PageHero
        tag="CIE Initiatives"
        line1="FIVE"
        line2="VERTICALS"
        line3="ONE VISION"
        scriptText="— pick your path, own your impact"
        description="CIE runs five specialized verticals — each a focused initiative with its own team, goals, and domain of impact. Together they form the full innovation ecosystem at MLRIT."
        stats={[
          { value: "5",      label: "Verticals" },
          { value: "500+",   label: "Active Members" },
          { value: "80+",    label: "Projects Done" },
          { value: "2024–25",label: "Current Cohort" },
        ]}
        watermark="FIVE"
      />

      {/* ── Directory ────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: "#FFFFFF" }}>
        <div className="page-container">
          <FadeIn className="mb-16">
            <span className="section-tag">Explore</span>
            <h2 style={{ color: "#000000", fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(26px,4vw,42px)", lineHeight: 1.1, marginTop: "12px" }}>
              The Five Verticals
            </h2>
            <p style={{ color: "#6B7280", fontSize: "16px", lineHeight: 1.7, marginTop: "10px", maxWidth: "480px" }}>
              Each vertical is a focused domain within CIE. Click any card to explore its work, team, and how to get involved.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {VERTICALS.map((v, i) => {
              const Icon = ICONS[v.id] ?? Boxes;
              return (
                <FadeIn key={v.id} delay={i * 0.06} className="flex flex-col">
                  <Link href={`/verticals/${v.id}`} style={{ textDecoration: "none", display: "flex", flexDirection: "column", flex: 1 }}>
                    <motion.div
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="rounded-2xl overflow-hidden flex flex-col"
                      style={{ flex: 1, border: "1px solid rgba(0,0,0,0.08)", background: "#FFFFFF", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", cursor: "pointer" }}
                    >
                      {/* Gradient header */}
                      <div style={{ height: "88px", background: v.gradient, position: "relative", overflow: "hidden", flexShrink: 0 }}>
                        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
                        <div style={{ position: "absolute", right: "-6px", bottom: "-20px", fontSize: "88px", fontFamily: "var(--font-heading)", fontWeight: 900, color: "rgba(255,255,255,0.07)", lineHeight: 1, userSelect: "none" }}>
                          {v.abbr}
                        </div>
                        <div style={{ position: "absolute", left: "20px", top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", gap: "10px" }}>
                          <div style={{ width: "38px", height: "38px", borderRadius: "11px", background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.22)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Icon size={18} style={{ color: "rgba(255,255,255,0.92)" }} />
                          </div>
                          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "11px", color: "rgba(255,255,255,0.55)", letterSpacing: "0.14em", textTransform: "uppercase" }}>{v.abbr}</span>
                        </div>
                      </div>

                      {/* Body */}
                      <div style={{ padding: "28px 28px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                        <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "18px", color: "#000000", letterSpacing: "-0.01em", marginBottom: "6px" }}>{v.name}</h3>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", fontWeight: 600, color: v.color, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "12px" }}>{v.tagline}</p>
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "13.5px", lineHeight: 1.7, color: "#6B7280", marginBottom: "20px", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" as const }}>{v.shortDesc}</p>
                        <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "auto", color: v.color, fontSize: "12.5px", fontWeight: 700 }}>
                          View vertical <ArrowRight size={13} />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
