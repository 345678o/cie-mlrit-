"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Boxes, Palette, FlaskConical, Cpu, CalendarDays, Compass,
  ArrowRight, Users, Zap, Code2, Lightbulb,
  Layers, BookOpen, Wrench, Megaphone, Globe, Settings,
  Trophy, Target, Star, Timer, PackageCheck, Camera, Mic,
} from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import PageGeometric from "@/components/ui/PageGeometric";

function FadeIn({
  children, delay = 0, className = "",
}: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

/* ── Vertical Data ──────────────────────────────────────────────── */
const verticals = [
  {
    id: "mp",
    abbr: "MP",
    name: "Microprojects",
    tagline: "Build Small. Think Big.",
    color: "#0891B2",
    textColor: "#0c4a6e",
    gradient: "linear-gradient(145deg, #0c4a6e 0%, #0369a1 55%, #0891B2 100%)",
    lightBg: "rgba(8,145,178,0.07)",
    sectionBg: "#FFFFFF",
    border: "rgba(8,145,178,0.22)",
    icon: Boxes,
    desc: "Microprojects empowers students to build focused, real-world solutions in short sprints. Small in scope, big in learning — each project sharpens skills, builds portfolios, and seeds bigger ideas.",
    stats: [
      { value: "80+",  label: "Projects Completed" },
      { value: "2–4",  label: "Week Sprints" },
      { value: "200+", label: "Students Involved" },
    ],
    activities: [
      { icon: Timer,        name: "Sprint Projects",   desc: "2–4 week focused builds with a defined problem statement, deliverable, and demo." },
      { icon: Zap,          name: "Skill Challenges",  desc: "Targeted mini-challenges that sharpen one skill — UI design, API integration, ML models, and more." },
      { icon: PackageCheck, name: "Project Showcases", desc: "Regular demos where teams present completed microprojects to peers and mentors for feedback." },
      { icon: Lightbulb,    name: "Idea-to-Build",     desc: "Structured pipeline to take a rough idea and deliver a working prototype within weeks, not months." },
    ],
    quote: "The best way to learn to build is to just start building — no matter how small.",
  },
  {
    id: "studios",
    abbr: "ST",
    name: "Studios",
    tagline: "Build Without Limits",
    color: "#7C3AED",
    textColor: "#3b0764",
    gradient: "linear-gradient(145deg, #3b0764 0%, #6d28d9 55%, #7c3aed 100%)",
    lightBg: "rgba(124,58,237,0.07)",
    sectionBg: "#FFFFFF",
    border: "rgba(124,58,237,0.22)",
    icon: Palette,
    desc: "Six specialized creative workspaces — each purpose-built to support a distinct discipline, from industrial design and digital art to professional photography and immersive media production.",
    stats: [
      { value: "6",    label: "Specialized Studios" },
      { value: "200+", label: "Monthly Users" },
      { value: "24/7", label: "Access for Members" },
    ],
    activities: [
      { icon: Palette, name: "Design Studio",   desc: "Product design, UX/UI mockups, branding, and visual identity work." },
      { icon: Layers,  name: "Content Studio",  desc: "High-end video production, live streaming, and post-production editing." },
      { icon: Camera,  name: "Photo Studio",    desc: "Professional lighting setup for product shots, portraits, and events." },
      { icon: Mic,     name: "Podcast & Audio", desc: "Soundproofed recording booths with professional-grade audio equipment." },
    ],
    quote: "Every great product started with the right tools and the right space.",
  },
  {
    id: "research",
    abbr: "RX",
    name: "Research",
    tagline: "Question Everything",
    color: "#2563EB",
    textColor: "#1e3a5f",
    gradient: "linear-gradient(145deg, #1e3a5f 0%, #1d4ed8 55%, #2563eb 100%)",
    lightBg: "rgba(37,99,235,0.07)",
    sectionBg: "#FFFFFF",
    border: "rgba(37,99,235,0.22)",
    icon: FlaskConical,
    desc: "Driving applied innovation through structured research, interdisciplinary collaboration, and partnerships with industry and academia. Turning curiosity into publishable, impactful knowledge.",
    stats: [
      { value: "30+", label: "Active Projects" },
      { value: "8",   label: "Publications" },
      { value: "15+", label: "Industry Partners" },
    ],
    activities: [
      { icon: FlaskConical, name: "Applied R&D",        desc: "Hands-on research solving real problems with engineering and design." },
      { icon: BookOpen,     name: "Publication Support", desc: "Mentoring students through the research paper and journal submission process." },
      { icon: Globe,        name: "Industry Tie-ups",   desc: "Collaborative projects with companies and research institutions." },
      { icon: Lightbulb,   name: "Innovation Grants",   desc: "Internal seed funding and grant guidance for student-led research." },
    ],
    quote: "Research at CIE isn't academic — it's the engine of real-world change.",
  },
  {
    id: "product-dev",
    abbr: "PD",
    name: "Product Dev",
    tagline: "Ship Real Things",
    color: "#059669",
    textColor: "#064e3b",
    gradient: "linear-gradient(145deg, #064e3b 0%, #047857 55%, #059669 100%)",
    lightBg: "rgba(5,150,105,0.07)",
    sectionBg: "#FFFFFF",
    border: "rgba(5,150,105,0.22)",
    icon: Cpu,
    desc: "From napkin sketch to deployed product — the Product Dev vertical gives students the methodology, mentorship, and infrastructure to build software, hardware, and everything in between.",
    stats: [
      { value: "40+",   label: "Products Built" },
      { value: "15",    label: "Live Deployments" },
      { value: "₹20L+", label: "Products Funded" },
    ],
    activities: [
      { icon: Code2,  name: "MVP Development",   desc: "Rapid prototyping cycles to validate ideas with working software in weeks." },
      { icon: Wrench, name: "Hardware Lab",      desc: "3D printing, PCB design, and embedded systems for physical products." },
      { icon: Target, name: "Sprints & Reviews", desc: "Bi-weekly sprint demos and structured code/design reviews with mentors." },
      { icon: Zap,    name: "Launch Support",    desc: "App Store submissions, server setup, and go-to-market strategy guidance." },
    ],
    quote: "Idea to product in 8 weeks. That's the Product Dev standard.",
  },
  {
    id: "event",
    abbr: "EV",
    name: "Event",
    tagline: "Make It Happen",
    color: "#D97706",
    textColor: "#78350f",
    gradient: "linear-gradient(145deg, #78350f 0%, #b45309 55%, #d97706 100%)",
    lightBg: "rgba(217,119,6,0.07)",
    sectionBg: "#FFFFFF",
    border: "rgba(217,119,6,0.22)",
    icon: CalendarDays,
    desc: "Designing and executing transformative events — from 200-person hackathons to intimate mentorship circles. The Event vertical ensures every CIE experience is unforgettable.",
    stats: [
      { value: "50+", label: "Events Per Year" },
      { value: "5K+", label: "Total Attendees" },
      { value: "3",   label: "National Events" },
    ],
    activities: [
      { icon: Trophy,    name: "Hackathons",           desc: "24–48 hour competitive builds with prizes, mentors, and industry judges." },
      { icon: Star,      name: "Demo Days",             desc: "Quarterly showcases where student teams pitch products to real investors." },
      { icon: Megaphone, name: "Speaker Series",        desc: "Bringing founders, VCs, and industry leaders to campus every month." },
      { icon: Users,     name: "Workshops & Bootcamps", desc: "Skill-specific hands-on sessions on design, code, marketing, and more." },
    ],
    quote: "An event isn't a calendar entry — it's a moment that changes trajectories.",
  },
  {
    id: "core",
    abbr: "CR",
    name: "Core",
    tagline: "The Engine Room",
    color: "#FF5E2C",
    textColor: "#7c2d12",
    gradient: "linear-gradient(145deg, #7c2d12 0%, #c2410c 55%, #FF5E2C 100%)",
    lightBg: "rgba(255,94,44,0.07)",
    sectionBg: "#FFFFFF",
    border: "rgba(255,94,44,0.22)",
    icon: Compass,
    desc: "The strategic backbone of CIE. Core drives operations, community health, partnerships, and institutional vision — ensuring every other vertical has what it needs to thrive.",
    stats: [
      { value: "20+",  label: "Core Members" },
      { value: "100+", label: "Partners Managed" },
      { value: "4",    label: "Verticals Supported" },
    ],
    activities: [
      { icon: Settings,  name: "Operations",       desc: "Resource allocation, scheduling, logistics, and day-to-day CIE management." },
      { icon: Globe,     name: "Partnerships",      desc: "Building and maintaining relationships with companies, alumni, and institutions." },
      { icon: Users,     name: "Community",         desc: "Onboarding, retention, culture-building, and member experience programs." },
      { icon: Lightbulb, name: "Strategy & Vision", desc: "Long-term planning, goal-setting, and CIE's broader ecosystem development." },
    ],
    quote: "Strong foundations make extraordinary things possible.",
  },
];

export default function VerticalsPage() {
  return (
    <div style={{ background: "#FFFFFF", position: "relative" }}>
      <PageGeometric />

      <PageHero
        tag="CIE Initiatives"
        line1="SIX"
        line2="VERTICALS"
        line3="ONE VISION"
        scriptText="— pick your path, own your impact"
        description="CIE runs six specialized verticals — each a focused initiative with its own team, goals, and domain of impact. Together they form the full innovation ecosystem at MLRIT."
        stats={[
          { value: "6", label: "Verticals" },
          { value: "500+", label: "Active Members" },
          { value: "80+", label: "Projects Done" },
          { value: "2024–25", label: "Current Cohort" },
        ]}
        watermark="SIX"
      />

      {/* ── Overview grid ─────────────────────────────────────────────────
          gap-8 = 32px between cards
          card body padding = 32px
          title mb = 16px
          desc mb = 24px
          "learn more" mt-auto = always at bottom
      ──────────────────────────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: "#FFFFFF" }}>
        <div className="page-container">
          <FadeIn className="mb-16">
            <span className="section-tag">At a Glance</span>
            <h2 style={{
              color: "#000000",
              fontFamily: "var(--font-heading)",
              fontWeight: 900,
              fontSize: "clamp(28px,4.5vw,44px)",
              lineHeight: 1.1,
              marginTop: "12px",
            }}>
              The Six Verticals
            </h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {verticals.map((v, i) => (
              <FadeIn key={v.id} delay={i * 0.07} className="flex flex-col">
                <a href={`#${v.id}`} style={{ textDecoration: "none", display: "flex", flexDirection: "column", flex: 1 }}>
                  <div
                    className="rounded-2xl overflow-hidden cursor-pointer flex flex-col"
                    style={{
                      flex: 1,
                      border: "1px solid rgba(0,0,0,0.07)",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                      transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                      background: "#FFFFFF",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "translateY(-6px)";
                      el.style.boxShadow = "0 16px 48px rgba(0,0,0,0.10)";
                      el.style.borderColor = v.border;
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.transform = "translateY(0)";
                      el.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
                      el.style.borderColor = "rgba(0,0,0,0.07)";
                    }}
                  >
                    {/* Gradient header */}
                    <div style={{ height: "80px", background: v.gradient, position: "relative", overflow: "hidden", flexShrink: 0 }}>
                      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
                      <div style={{ position: "absolute", right: "-8px", bottom: "-20px", fontSize: "80px", fontFamily: "var(--font-heading)", fontWeight: 900, color: "rgba(255,255,255,0.07)", lineHeight: 1, userSelect: "none" }}>
                        {v.abbr}
                      </div>
                      <div style={{ position: "absolute", left: "20px", top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.22)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)" }}>
                          <v.icon size={18} style={{ color: "rgba(255,255,255,0.90)" }} />
                        </div>
                        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "12px", color: "rgba(255,255,255,0.60)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{v.abbr}</span>
                      </div>
                    </div>

                    {/* Body — padding 32px */}
                    <div style={{ padding: "32px", flex: 1, display: "flex", flexDirection: "column" }}>
                      <h3 style={{
                        color: "#000000",
                        fontFamily: "var(--font-heading)",
                        fontWeight: 800,
                        fontSize: "18px",
                        marginBottom: "16px",
                      }}>
                        {v.name}
                      </h3>
                      <p style={{
                        color: "#6B7280",
                        fontSize: "13px",
                        lineHeight: 1.7,
                        marginBottom: "24px",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical" as const,
                      }}>
                        {v.desc.split(".")[0]}.
                      </p>
                      {/* CTA always at bottom via mt-auto */}
                      <div className="flex items-center gap-1.5" style={{ color: v.color, fontSize: "12px", fontWeight: 700, marginTop: "auto" }}>
                        Learn more <ArrowRight size={13} />
                      </div>
                    </div>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Individual Vertical Sections ───────────────────────────────────
          Each section: 40px top + bottom (80px border-to-border between sections)
          Two-column: lg:grid-cols-[1.2fr_1fr], gap-16 (64px) on desktop
          Description: line-height 1.8, mb 32px
          Quote: padding 16px/20px, visual separator
          Stats: gap 48px between items, flex-col gap-2 per stat
          Activity cards: padding 24px, minHeight 180px, icon mb 20px, title mb 12px
      ──────────────────────────────────────────────────────────────────── */}
      {verticals.map((v, idx) => {
        const isEven = idx % 2 === 0;
        return (
          <section
            key={v.id}
            id={v.id}
            style={{ background: v.sectionBg, scrollMarginTop: "80px", paddingTop: "40px", paddingBottom: "40px" }}
          >
            <div className="page-container">

              {/* Section label + heading */}
              <FadeIn className="mb-6">
                <div className="flex items-center gap-4">
                  <div style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "14px",
                    background: v.gradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: `0 8px 24px ${v.color}30`,
                  }}>
                    <v.icon size={22} style={{ color: "rgba(255,255,255,0.92)" }} />
                  </div>
                  <div>
                    <p style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: v.color,
                      marginBottom: "6px",
                    }}>
                      CIE Vertical · {v.abbr}
                    </p>
                    <h2 style={{
                      color: "#000000",
                      fontFamily: "var(--font-heading)",
                      fontWeight: 900,
                      fontSize: "clamp(26px,4vw,40px)",
                      lineHeight: 1.1,
                    }}>
                      {v.name}
                    </h2>
                  </div>
                </div>
              </FadeIn>

              {/* Two-column layout: 1.2fr info / 1fr activities, gap-16 = 64px */}
              <div className={`grid gap-12 lg:gap-16 items-start lg:grid-cols-[1.2fr_1fr] ${!isEven ? "lg:[&>*:first-child]:order-2" : ""}`}>

                {/* Info column */}
                <FadeIn>
                  {/* Description — line-height 1.8, 32px bottom */}
                  <p style={{
                    fontSize: "18px",
                    lineHeight: 1.8,
                    color: "#374151",
                    marginBottom: "32px",
                  }}>
                    {v.desc}
                  </p>

                  {/* Quote — visual separator, padding 16px/20px, 32px bottom */}
                  <div
                    className="flex items-center gap-3 rounded-xl"
                    style={{
                      background: v.lightBg,
                      border: `1px solid ${v.border}`,
                      padding: "16px 20px",
                      marginBottom: "32px",
                    }}
                  >
                    <div style={{ width: "4px", alignSelf: "stretch", borderRadius: "999px", flexShrink: 0, background: v.color }} />
                    <p style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 700,
                      fontSize: "15px",
                      color: v.textColor,
                      fontStyle: "italic",
                      lineHeight: 1.6,
                    }}>
                      &ldquo;{v.quote}&rdquo;
                    </p>
                  </div>

                  {/* Stats — 32px top from quote, 48px gap between items */}
                  <div style={{ marginTop: "32px", display: "flex", gap: "48px", flexWrap: "wrap" }}>
                    {v.stats.map((s) => (
                      <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <div style={{
                          fontFamily: "var(--font-heading)",
                          fontWeight: 900,
                          fontSize: "clamp(24px,3.5vw,36px)",
                          color: v.color,
                          lineHeight: 1,
                        }}>
                          {s.value}
                        </div>
                        <div style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "13px",
                          color: "#9CA3AF",
                          fontWeight: 500,
                          lineHeight: 1.4,
                        }}>
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </FadeIn>

                {/* Activities column */}
                <FadeIn delay={0.15}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {v.activities.map((act, ai) => (
                      <motion.div
                        key={act.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.6, delay: ai * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                          padding: "24px",
                          borderRadius: "12px",
                          background: "#FFFFFF",
                          border: "1px solid rgba(0,0,0,0.07)",
                          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                          transition: "all 0.3s ease",
                          minHeight: "180px",
                          display: "flex",
                          flexDirection: "column",
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.borderColor = v.border;
                          el.style.boxShadow = `0 8px 24px ${v.color}15`;
                          el.style.transform = "translateY(-3px)";
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.borderColor = "rgba(0,0,0,0.07)";
                          el.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
                          el.style.transform = "translateY(0)";
                        }}
                      >
                        {/* Icon — 40px box, 20px bottom margin */}
                        <div style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "10px",
                          background: v.lightBg,
                          border: `1px solid ${v.border}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginBottom: "20px",
                        }}>
                          <act.icon size={18} style={{ color: v.color }} />
                        </div>

                        {/* Title — 15px, 12px bottom margin */}
                        <h4 style={{
                          color: "#000000",
                          fontFamily: "var(--font-heading)",
                          fontWeight: 700,
                          fontSize: "15px",
                          marginBottom: "12px",
                          lineHeight: 1.3,
                        }}>
                          {act.name}
                        </h4>

                        {/* Description — line-height 1.7 */}
                        <p style={{
                          color: "#6B7280",
                          fontSize: "13px",
                          lineHeight: 1.7,
                        }}>
                          {act.desc}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </FadeIn>

              </div>
            </div>
          </section>
        );
      })}

      {/* ── Join CTA — 120px top, 96px bottom ─────────────────────────── */}
      <section style={{
        background: "linear-gradient(160deg, #000000 0%, #000000 100%)",
        position: "relative",
        overflow: "hidden",
        paddingTop: "80px",
        paddingBottom: "72px",
      }}>
        <div className="absolute inset-0 grid-pattern opacity-15" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,94,44,0.10) 0%, transparent 65%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-1 flex">
          {verticals.map((v) => (
            <div key={v.id} style={{ flex: 1, background: v.color }} />
          ))}
        </div>
        <FadeIn className="relative z-10 page-container flex flex-col items-center text-center">
          <span className="section-tag" style={{ background: "rgba(255,94,44,0.12)", borderColor: "rgba(255,94,44,0.25)", color: "#FF5E2C" }}>
            Get Involved
          </span>
          <h2 className="mt-4" style={{ color: "#FFFFFF", fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(28px,5vw,52px)", lineHeight: 1.1, marginBottom: "56px" }}>
            Pick Your Vertical.<br />Start Making Impact.
          </h2>
          <p className="mx-auto" style={{ color: "rgba(255,255,255,0.60)", fontSize: "17px", lineHeight: 1.7, maxWidth: "520px", marginBottom: "48px" }}>
            Each vertical is open to all MLRIT students. Apply, collaborate, build — and leave a mark on CIE&apos;s growing legacy.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <a href="/contact" className="btn-primary" style={{ fontSize: "15px", padding: "12px 28px" }}>
              Apply to a Vertical <ArrowRight size={16} />
            </a>
            <a href="/about" className="btn-secondary" style={{ fontSize: "15px", padding: "12px 28px" }}>
              Learn About CIE
            </a>
          </div>
        </FadeIn>
      </section>

    </div>
  );
}
