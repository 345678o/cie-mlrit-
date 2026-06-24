"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  Boxes, Palette, Cpu, CalendarDays, Rocket,
  ArrowLeft, ArrowRight, Users, CheckCircle2,
  Zap, Trophy, Star,
} from "lucide-react";
import type { Vertical } from "../verticals-data";
import PageGeometric from "@/components/ui/PageGeometric";

const ICONS: Record<string, React.ElementType> = {
  mp: Boxes,
  "cie-studios": Palette,
  "product-development": Cpu,
  "startup-cohort": Rocket,
  events: CalendarDays,
};

const STATUS_COLOR: Record<string, { bg: string; text: string }> = {
  Active:    { bg: "rgba(5,150,105,0.08)",  text: "#059669" },
  Completed: { bg: "rgba(8,145,178,0.08)",  text: "#0891B2" },
  Upcoming:  { bg: "rgba(217,119,6,0.08)",  text: "#D97706" },
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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="section-tag" style={{ marginBottom: "10px", display: "inline-block" }}>
      {children}
    </span>
  );
}

function SectionHeading({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(22px,3.5vw,36px)", color: "#000000", lineHeight: 1.1, marginBottom: "32px" }}>
      {children}
    </h2>
  );
}

export default function VerticalDetailClient({ vertical: v }: { vertical: Vertical }) {
  const Icon = ICONS[v.id] ?? Boxes;

  return (
    <div style={{ background: "#FFFFFF", position: "relative" }}>
      <PageGeometric />

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section style={{ background: v.gradient, position: "relative", overflow: "hidden", paddingTop: "140px", paddingBottom: "80px" }}>
        {/* Dot grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        {/* Watermark abbr */}
        <div style={{ position: "absolute", right: "-40px", bottom: "-60px", fontSize: "clamp(180px,22vw,280px)", fontFamily: "var(--font-heading)", fontWeight: 900, color: "rgba(255,255,255,0.05)", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>
          {v.abbr}
        </div>

        <div className="page-container" style={{ position: "relative", zIndex: 1 }}>
          {/* Back link */}
          <Link href="/verticals" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.55)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", marginBottom: "28px" }}>
            <ArrowLeft size={13} /> All Verticals
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px" }}>
            <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.22)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon size={24} style={{ color: "rgba(255,255,255,0.92)" }} />
            </div>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>
              CIE Vertical · {v.abbr}
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(36px,6vw,72px)", color: "#FFFFFF", lineHeight: 1.0, letterSpacing: "-0.03em", marginBottom: "12px" }}
          >
            {v.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(16px,2vw,22px)", color: "rgba(255,255,255,0.65)", fontStyle: "italic", marginBottom: "36px" }}
          >
            {v.tagline}
          </motion.p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}
          >
            {v.stats.map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(24px,3.5vw,36px)", color: "#FFFFFF", lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: "rgba(255,255,255,0.5)", marginTop: "4px", fontWeight: 500, letterSpacing: "0.04em" }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Overview ──────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: "#FFFFFF" }}>
        <div className="page-container">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <FadeIn>
              <SectionLabel>Overview</SectionLabel>
              <SectionHeading color={v.color}>About {v.name}</SectionHeading>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {v.overview.map((para, i) => (
                  <p key={i} style={{ fontFamily: "var(--font-body)", fontSize: "16px", lineHeight: 1.78, color: "#374151" }}>{para}</p>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.12}>
              {/* Quote */}
              <div style={{ padding: "24px", borderRadius: "16px", background: v.lightBg, border: `1px solid ${v.border}`, marginBottom: "28px" }}>
                <div style={{ width: "3px", height: "100%", position: "absolute" }} />
                <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "16px", color: v.textColor, fontStyle: "italic", lineHeight: 1.65 }}>
                  &ldquo;{v.quote}&rdquo;
                </p>
              </div>

              {/* Achievement pills */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {v.achievements.map((a, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <CheckCircle2 size={15} style={{ color: v.color, flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "#374151", lineHeight: 1.6 }}>{a}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Roles ─────────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: "#F9FAFB" }}>
        <div className="page-container">
          <FadeIn className="mb-12">
            <SectionLabel>Team Structure</SectionLabel>
            <SectionHeading color={v.color}>Roles &amp; Responsibilities</SectionHeading>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {v.roles.map((role, i) => (
              <FadeIn key={role.title} delay={i * 0.06}>
                <div style={{ padding: "22px", borderRadius: "14px", background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", height: "100%" }}>
                  <div style={{ width: "34px", height: "34px", borderRadius: "9px", background: v.lightBg, border: `1px solid ${v.border}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px" }}>
                    <Users size={15} style={{ color: v.color }} />
                  </div>
                  <h4 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "15px", color: "#000000", marginBottom: "8px" }}>{role.title}</h4>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "#6B7280", lineHeight: 1.65 }}>{role.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects ──────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: "#FFFFFF" }}>
        <div className="page-container">
          <FadeIn className="mb-12">
            <SectionLabel>Work</SectionLabel>
            <SectionHeading color={v.color}>Projects &amp; Initiatives</SectionHeading>
          </FadeIn>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {v.projects.map((proj, i) => {
              const sc = STATUS_COLOR[proj.status] ?? STATUS_COLOR["Active"];
              return (
                <FadeIn key={proj.name} delay={i * 0.05}>
                  <div style={{ padding: "20px 24px", borderRadius: "14px", background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.07)", display: "flex", gap: "18px", alignItems: "flex-start", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                    <div style={{ width: "34px", height: "34px", borderRadius: "9px", background: v.lightBg, border: `1px solid ${v.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                      <Zap size={15} style={{ color: v.color }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px", flexWrap: "wrap" }}>
                        <h4 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "15px", color: "#000000" }}>{proj.name}</h4>
                        <span style={{ fontFamily: "var(--font-body)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: sc.text, background: sc.bg, padding: "2px 8px", borderRadius: "999px" }}>
                          {proj.status}
                        </span>
                      </div>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "13.5px", color: "#6B7280", lineHeight: 1.6 }}>{proj.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Events ────────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: "#F9FAFB" }}>
        <div className="page-container">
          <FadeIn className="mb-12">
            <SectionLabel>Programming</SectionLabel>
            <SectionHeading color={v.color}>Events &amp; Gatherings</SectionHeading>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5">
            {v.events.map((ev, i) => (
              <FadeIn key={ev.name} delay={i * 0.07}>
                <div style={{ padding: "22px", borderRadius: "14px", background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "9px", background: v.lightBg, border: `1px solid ${v.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Trophy size={14} style={{ color: v.color }} />
                    </div>
                    <div>
                      <h4 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "15px", color: "#000000", lineHeight: 1.2 }}>{ev.name}</h4>
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "10px", fontWeight: 700, color: v.color, letterSpacing: "0.08em", textTransform: "uppercase" }}>{ev.type}</span>
                    </div>
                  </div>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "#6B7280", lineHeight: 1.65 }}>{ev.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Apply ─────────────────────────────────────────────────── */}
      {v.applyInfo && (
        <section className="py-20" style={{ background: "#FFFFFF" }}>
          <div className="page-container">
            <FadeIn>
              <div style={{ maxWidth: "720px", padding: "36px 40px", borderRadius: "20px", background: v.lightBg, border: `1px solid ${v.border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <Star size={18} style={{ color: v.color }} />
                  <SectionLabel>Get Involved</SectionLabel>
                </div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(20px,3vw,28px)", color: "#000000", marginBottom: "14px", lineHeight: 1.15 }}>
                  How to Join {v.name}
                </h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", lineHeight: 1.78, color: "#374151", marginBottom: "24px" }}>{v.applyInfo}</p>
                <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "13px", letterSpacing: "0.06em", textTransform: "uppercase", color: v.color, textDecoration: "none", border: `1.5px solid ${v.border}`, borderRadius: "999px", padding: "10px 22px", transition: "background 0.2s ease" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = `rgba(0,0,0,0.04)`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
                >
                  Get in Touch <ArrowRight size={13} />
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ── Footer nav ────────────────────────────────────────────── */}
      <section className="py-14" style={{ background: "#F9FAFB", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="page-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <Link href="/verticals" style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "13px", color: "#6B7280", textDecoration: "none" }}>
            <ArrowLeft size={14} /> Back to Verticals
          </Link>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "#9CA3AF" }}>
            CIE · MLRIT · {v.name}
          </span>
        </div>
      </section>
    </div>
  );
}
