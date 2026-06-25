"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Code, FileText, PenLine, Palette, Camera, Mic, BarChart2, ArrowRight } from "lucide-react";

const ORANGE = "#E8521A";
const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export const DEPARTMENTS = [
  { id: "tech",        name: "Tech",                       color: "#FF5E2C", icon: Code,      desc: "Builds and maintains CIE's digital infrastructure — website, internal tools, AI experiments, and mobile apps.",    skills: ["Web Dev","App Dev","AI / ML","UI Engineering"] },
  { id: "content",     name: "Content",                    color: "#0EA5E9", icon: FileText,  desc: "Produces all written output for CIE — blog posts, event write-ups, newsletters, captions, and long-form content.",  skills: ["Writing","Editing","Storytelling","Research"] },
  { id: "creative",    name: "Creative",                   color: "#3B82F6", icon: PenLine,   desc: "Drives CIE's creative direction — ideating themes, managing brand consistency, and building visual identity.",       skills: ["Concept Design","Brand Strategy","Campaign Planning","Art Direction"] },
  { id: "gd",          name: "GD — Graphic Design",        color: "#FF7A50", icon: Palette,   desc: "Shapes the visual identity of CIE — posters, decks, social assets, UI mockups, and motion content.",               skills: ["Graphic Design","Motion Graphics","Social Media","Figma / Adobe"] },
  { id: "photography", name: "Photography",                color: "#D94E1F", icon: Camera,    desc: "Captures every moment of the CIE journey through photography, videography, and professional post-production.",      skills: ["Photography","Videography","Photo Editing","Post-production"] },
  { id: "ps",          name: "P&S — Public Speaking",      color: "#7C3AED", icon: Mic,       desc: "Represents CIE in every room — anchoring events, running communication workshops, and handling PR.",                skills: ["Public Speaking","Anchoring","Communication","PR & Outreach"] },
  { id: "ops",         name: "Ops — Operations & Finance", color: "#16A34A", icon: BarChart2, desc: "Keeps everything running — event logistics, budgets, vendor relations, and flawless execution.",                    skills: ["Event Logistics","Budget Management","Vendor Coordination","Planning"] },
];

const TICKER_ITEMS = DEPARTMENTS.flatMap(d => [d.name, "·"]);

export default function JoinPage() {
  const router = useRouter();

  return (
    <div style={{ background: "#FFFFFF", minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <section
        className="page-hero relative overflow-hidden flex flex-col"
        style={{ background: ORANGE, paddingTop: "var(--nav-height)", minHeight: "58vh" }}
      >
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ backgroundImage: GRAIN, opacity: 0.038, mixBlendMode: "multiply" as const }} />

        {/* arcs */}
        <svg aria-hidden className="absolute pointer-events-none"
          style={{ top: "-16%", right: "-10%", width: "48vw", height: "48vw", maxWidth: 560, maxHeight: 560, opacity: 0.16 }}
          viewBox="0 0 560 560" fill="none">
          <circle cx="280" cy="280" r="258" stroke="white" strokeWidth="72" fill="none" />
        </svg>
        <svg aria-hidden className="absolute pointer-events-none"
          style={{ bottom: "16%", right: "24%", width: "14vw", height: "14vw", maxWidth: 160, maxHeight: 160, opacity: 0.10 }}
          viewBox="0 0 160 160" fill="none">
          <circle cx="80" cy="80" r="70" stroke="white" strokeWidth="24" fill="none" />
        </svg>
        <svg aria-hidden className="absolute pointer-events-none"
          style={{ bottom: "-12%", left: "-6%", width: "28vw", height: "28vw", maxWidth: 320, maxHeight: 320, opacity: 0.11 }}
          viewBox="0 0 320 320" fill="none">
          <circle cx="160" cy="160" r="145" stroke="white" strokeWidth="48" fill="none" />
        </svg>

        {/* dot grid */}
        <div aria-hidden className="absolute pointer-events-none" style={{ top: "calc(var(--nav-height) + 20px)", left: "20px", width: "80px", height: "80px", backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.28) 1.5px, transparent 1.5px)", backgroundSize: "13px 13px" }} />
        <div aria-hidden className="absolute pointer-events-none" style={{ bottom: "28px", right: "clamp(48px,10vw,160px)", width: "56px", height: "56px", backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.14) 1.5px, transparent 1.5px)", backgroundSize: "11px 11px" }} />

        {/* watermark */}
        <div aria-hidden className="absolute pointer-events-none select-none" style={{ bottom: "8px", right: "-10px", fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(110px,22vw,360px)", color: "rgba(0,0,0,0.055)", lineHeight: 1, letterSpacing: "-0.06em", userSelect: "none" as const }}>JOIN</div>

        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <div className="page-container w-full" style={{ paddingTop: "clamp(40px,6vw,64px)", paddingBottom: "clamp(32px,4vw,48px)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }} className="hero-inner">

              {/* left — headline */}
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 56 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.95, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(52px, 12vw, 164px)", lineHeight: 0.88, letterSpacing: "-0.048em", textTransform: "uppercase", marginBottom: 0 }}
                >
                  <span style={{ display: "block", color: "#FFFFFF" }}>JOIN</span>
                  <span style={{ display: "block", color: "transparent", WebkitTextStroke: "2.5px rgba(255,255,255,0.78)", fontSize: "0.82em", marginTop: "0.04em" }}>THE TEAM</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.42 }}
                  style={{ fontFamily: "var(--font-script)", fontSize: "clamp(17px, 2.2vw, 26px)", color: "rgba(255,255,255,0.88)", lineHeight: 1.2, marginTop: "18px", display: "inline-block", transform: "rotate(-1.5deg)" }}
                >
                  — pick your department, own your role
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.55 }}
                  style={{ fontFamily: "var(--font-body)", fontSize: "clamp(13px,1.3vw,15px)", lineHeight: 1.8, color: "rgba(255,255,255,0.68)", maxWidth: "min(420px,100%)", marginTop: "10px" }}
                >
                  Applications open for 2025–26 CIE Council. Choose the department that matches your passion and apply below.
                </motion.p>
              </div>

            </div>
          </div>
        </div>

        {/* ticker strip */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", overflow: "hidden", whiteSpace: "nowrap", padding: "10px 0" }}>
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 22, ease: "linear", repeat: Infinity }}
            style={{ display: "inline-flex", gap: "28px", willChange: "transform" }}
          >
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
              <span key={i} style={{ fontFamily: "var(--font-body)", fontWeight: t === "·" ? 400 : 700, fontSize: "11px", letterSpacing: t === "·" ? 0 : "0.06em", textTransform: "uppercase" as const, color: t === "·" ? "rgba(255,255,255,0.30)" : "rgba(255,255,255,0.55)" }}>{t}</span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Grid section ── */}
      <section style={{ background: "#FFFFFF", paddingTop: "clamp(64px,9vw,100px)", paddingBottom: "clamp(80px,12vw,140px)" }}>
        <div className="page-container">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "clamp(36px,5vw,56px)", flexWrap: "wrap", gap: "12px" }}
          >
            <div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(26px,4vw,42px)", letterSpacing: "-0.035em", color: "#0A0A0A", lineHeight: 1.05, marginBottom: "8px" }}>
                7 Departments.<br />One mission.
              </h2>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "14.5px", color: "#9CA3AF", lineHeight: 1.65 }}>
                Click any card to start your application.
              </p>
            </div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 600, color: "#9CA3AF", border: "1.5px solid rgba(0,0,0,0.10)", borderRadius: "999px", padding: "7px 16px", whiteSpace: "nowrap" as const }}>
              2025–26 Intake
            </div>
          </motion.div>

          {/* Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }} className="dept-grid">
            {DEPARTMENTS.map((d, i) => {
              const Icon = d.icon;
              return (
                <motion.button
                  key={d.id}
                  whileHover="hovered"
                  onClick={() => router.push(`/join/apply?dept=${d.id}`)}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.08 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    textAlign: "left",
                    background: "#FFFFFF",
                    borderRadius: "20px",
                    border: "1.5px solid rgba(0,0,0,0.08)",
                    cursor: "pointer",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column" as const,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                    minHeight: "450px",
                    height: "100%",
                  }}
                >
                  {/* colored top strip — fixed height */}
                  <motion.div
                    variants={{ hovered: { height: "108px" } }}
                    style={{ background: d.color, height: "88px", position: "relative", overflow: "hidden", flexShrink: 0 }}
                  >
                    <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: GRAIN, opacity: 0.06, mixBlendMode: "multiply" as const }} />
                    <svg aria-hidden style={{ position: "absolute", right: "-18%", top: "-40%", width: "140px", height: "140px", opacity: 0.18 }} viewBox="0 0 140 140" fill="none">
                      <circle cx="70" cy="70" r="62" stroke="white" strokeWidth="20" fill="none" />
                    </svg>
                    <div style={{ position: "absolute", bottom: "14px", left: "20px" }}>
                      <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "rgba(255,255,255,0.20)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon size={20} style={{ color: "#FFFFFF" }} />
                      </div>
                    </div>
                  </motion.div>

                  {/* card body */}
                  <div style={{ padding: "20px 22px 22px", flex: 1, display: "flex", flexDirection: "column" as const }}>

                    {/* title — fixed height, no wrapping overflow */}
                    <div style={{ height: "48px", overflow: "hidden", marginBottom: "10px" }}>
                      <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "17px", color: "#0A0A0A", letterSpacing: "-0.025em", lineHeight: 1.25, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>
                        {d.name}
                      </h3>
                    </div>

                    {/* description — fixed 4-line clamp */}
                    <div style={{ height: "90px", overflow: "hidden", marginBottom: "16px" }}>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", lineHeight: 1.72, color: "#6B7280", margin: 0, display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>
                        {d.desc}
                      </p>
                    </div>

                    {/* skill tags — fixed height container */}
                    <div style={{ height: "60px", overflow: "hidden", marginBottom: "0" }}>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                        {d.skills.map(s => (
                          <span key={s} style={{ fontFamily: "var(--font-body)", fontSize: "10px", fontWeight: 600, padding: "3px 9px", borderRadius: "999px", background: `${d.color}0F`, border: `1px solid ${d.color}22`, color: d.color, whiteSpace: "nowrap" as const }}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA — pinned to bottom */}
                    <motion.div
                      variants={{ hovered: { x: 4 } }}
                      transition={{ duration: 0.2 }}
                      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: "16px", borderTop: "1px solid rgba(0,0,0,0.06)" }}
                    >
                      <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "12.5px", color: d.color }}>
                        Apply now
                      </span>
                      <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: `${d.color}14`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <ArrowRight size={14} style={{ color: d.color }} />
                      </div>
                    </motion.div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* bottom note */}
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            style={{ fontFamily: "var(--font-body)", fontSize: "13px", color: "#9CA3AF", textAlign: "center" as const, marginTop: "clamp(40px,5vw,56px)", lineHeight: 1.65 }}
          >
            Applications reviewed on a rolling basis. Selected candidates will be contacted within 7 days.
          </motion.p>
        </div>
      </section>

      <style>{`
        @media (max-width: 1023px) { .dept-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 580px)  { .dept-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
