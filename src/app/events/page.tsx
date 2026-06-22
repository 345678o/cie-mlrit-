"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Code, Lightbulb, Users, Mic, Trophy, BookOpen, Calendar, ArrowRight, Image as ImgIcon } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import PageGeometric from "@/components/ui/PageGeometric";

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

const eventCategories = [
  { icon: Code,      name: "Hackathons",           count: "12 events", color: "#FF5E2C" },
  { icon: BookOpen,  name: "Workshops",             count: "28 events", color: "#FF7A50" },
  { icon: Users,     name: "Startup Meetups",       count: "8 events",  color: "#D94E1F" },
  { icon: Mic,       name: "Guest Lectures",        count: "35 events", color: "#FF5E2C" },
  { icon: Trophy,    name: "Innovation Challenges", count: "6 events",  color: "#FF7A50" },
  { icon: Lightbulb, name: "Bootcamps",             count: "5 events",  color: "#D94E1F" },
];

const events = [
  {
    category: "Hackathon",
    title: "InnoHack 2024 — 36-Hour Innovation Marathon",
    shortDate: "Mar 15, 2024",
    dateTime: "2024-03-15",
    desc: "A 36-hour marathon where 48 teams competed to build tech solutions across AI, IoT, and sustainability.",
    tags: ["AI/ML", "IoT", "SustainTech"],
  },
  {
    category: "Workshop",
    title: "Design Thinking Intensive: 2-Day Bootcamp",
    shortDate: "Feb 10, 2024",
    dateTime: "2024-02-10",
    desc: "Two days of intensive design thinking workshops led by a senior product designer from Swiggy.",
    tags: ["Design", "Product", "UX"],
  },
  {
    category: "Guest Lecture",
    title: "Building in Public: A Founder's Journey",
    shortDate: "Jan 22, 2024",
    dateTime: "2024-01-22",
    desc: "300 students heard firsthand how the founder of PhonePe built a payments company from zero to ₹1B.",
    tags: ["Entrepreneurship", "Finance", "Startup"],
  },
  {
    category: "Hackathon",
    title: "HealthTech Hack 2023 — Medical Innovation Challenge",
    shortDate: "Oct 7, 2023",
    dateTime: "2023-10-07",
    desc: "Medical tech hackathon in partnership with Apollo Hospitals — 36 teams tackled real clinical problems.",
    tags: ["HealthTech", "AI", "Medical"],
  },
  {
    category: "Startup Meetup",
    title: "Founder's Circle Q3 2023 — Demo Day",
    shortDate: "Sep 15, 2023",
    dateTime: "2023-09-15",
    desc: "Eight student startup pitches in front of five active investors and 120 fellow founders and observers.",
    tags: ["Networking", "Pitching", "Funding"],
  },
  {
    category: "Bootcamp",
    title: "No-Code Revolution: Build Apps Without Code",
    shortDate: "Aug 5, 2023",
    dateTime: "2023-08-05",
    desc: "A three-day hands-on bootcamp where 45 students built and shipped real apps using Bubble and Webflow.",
    tags: ["No-Code", "Bubble", "Webflow"],
  },
];

const categoryBadgeColors: Record<string, { bg: string; text: string }> = {
  Hackathon:            { bg: "rgba(255,94,44,0.10)",  text: "#D94E1F" },
  Workshop:             { bg: "rgba(59,130,246,0.10)", text: "#2563EB" },
  "Guest Lecture":      { bg: "rgba(168,85,247,0.10)", text: "#7C3AED" },
  "Startup Meetup":     { bg: "rgba(22,163,74,0.10)",  text: "#16A34A" },
  Bootcamp:             { bg: "rgba(217,119,6,0.10)",  text: "#D97706" },
  "Innovation Challenge": { bg: "rgba(220,38,38,0.10)", text: "#DC2626" },
};

const heroStats = [
  { value: "100+",  label: "Events Hosted" },
  { value: "3000+", label: "Participants"  },
  { value: "6",     label: "Event Types"   },
  { value: "5 Yrs", label: "Running Strong"},
];

const heroCards = [
  { icon: Code,     label: "Hackathons",     count: "12 events", detail: "AI · IoT · SustainTech · HealthTech",   accent: "rgba(255,94,44,0.15)", color: "#FF5E2C" },
  { icon: BookOpen, label: "Workshops",      count: "28 events", detail: "Design · Product · Development",        accent: "rgba(59,130,246,0.15)", color: "#3B82F6" },
  { icon: Mic,      label: "Guest Lectures", count: "35 events", detail: "Industry leaders & startup founders",   accent: "rgba(124,58,237,0.15)", color: "#7C3AED" },
];

export default function EventsPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  return (
    <div style={{ background: "#FFFFFF", position: "relative" }}>
      <PageGeometric />

      <PageHero
        tag="Events Archive"
        line1="MAKE"
        line2="IT"
        line3="HAPPEN"
        scriptText="— 100+ events and counting"
        description="Over 100 events, workshops, hackathons, and lectures — each one shaping students into the innovators and entrepreneurs of tomorrow."
        stats={[
          { value: "100+", label: "Events Hosted" },
          { value: "3000+", label: "Participants" },
          { value: "6", label: "Event Types" },
          { value: "5 Yrs", label: "Running Strong" },
        ]}
        watermark="EVENTS"
      />

      {/* ── CATEGORY CHIPS ────────────────────────────────────────────── */}
      <section style={{ background: "#FFFFFF", paddingTop: "48px", paddingBottom: "48px" }}>
        <div className="page-container">
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-3 items-stretch">
            {eventCategories.map((cat, i) => (
              <FadeIn key={cat.name} delay={i * 0.06}>
                <div className="card-light cursor-pointer text-center" style={{ padding: "16px 10px" }}>
                  <cat.icon size={22} className="mx-auto mb-2" style={{ color: cat.color }} />
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "11px", fontWeight: 700, color: "#000000", marginBottom: "2px" }}>
                    {cat.name}
                  </p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "10px", color: "#6B7280" }}>{cat.count}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ──────────────────────────────────────────────────── */}
      <section style={{ background: "#FFFFFF", paddingTop: "72px", paddingBottom: "72px" }}>
        <div className="page-container">
          <FadeIn className="mb-12">
            <span className="section-tag">Event History</span>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(28px,5vw,40px)", color: "#000000", marginTop: "8px" }}>
              Past Events
            </h2>
          </FadeIn>

          {/* On mobile hide the dot/line; show a clean card stack instead */}
          <div className="relative">
            {/* Vertical line — hidden on small screens */}
            <div className="hidden sm:block absolute top-4 bottom-4"
              style={{ left: "11px", width: "1px", background: "linear-gradient(to bottom, transparent, rgba(255,94,44,0.35) 4%, rgba(255,94,44,0.35) 96%, transparent)" }} />

            <div className="space-y-5">
              {events.map((event, i) => {
                const colors = categoryBadgeColors[event.category] || { bg: "rgba(255,94,44,0.10)", text: "#D94E1F" };
                return (
                  <FadeIn key={event.title} delay={i * 0.08}>
                    <div className="flex items-start gap-4 sm:gap-6">

                      {/* Dot — hidden on mobile */}
                      <div className="hidden sm:flex w-6 flex-shrink-0 justify-center" style={{ paddingTop: "22px" }}>
                        <div className="w-3.5 h-3.5 rounded-full"
                          style={{ background: "#FF5E2C", boxShadow: "0 0 0 3px #FFFFFF, 0 0 0 5px rgba(255,94,44,0.22)" }} />
                      </div>

                      {/* Card */}
                      <div
                        className="flex-1 bg-white"
                        onMouseEnter={() => setHoveredCard(i)}
                        onMouseLeave={() => setHoveredCard(null)}
                        style={{
                          borderRadius: "16px",
                          padding: "clamp(16px, 4vw, 28px)",
                          border: `1px solid ${hoveredCard === i ? "rgba(255,94,44,0.25)" : "rgba(0,0,0,0.08)"}`,
                          boxShadow: hoveredCard === i
                            ? "0 12px 48px rgba(0,0,0,0.09), 0 4px 16px rgba(0,0,0,0.05)"
                            : "0 2px 16px rgba(0,0,0,0.05)",
                          transform: hoveredCard === i ? "translateY(-4px)" : "none",
                          transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.18s ease",
                          minWidth: 0,
                          overflow: "hidden",
                        }}
                      >
                        {/* Date + badge */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <div className="flex items-center gap-1.5" style={{ color: "#6B7280", fontSize: "13px" }}>
                            <Calendar size={12} />
                            <time dateTime={event.dateTime} style={{ fontFamily: "var(--font-body)" }}>{event.shortDate}</time>
                          </div>
                          <span style={{
                            fontFamily: "var(--font-body)", fontSize: "11px", fontWeight: 700,
                            padding: "3px 10px", borderRadius: "999px",
                            background: colors.bg, color: colors.text,
                          }}>
                            {event.category}
                          </span>
                        </div>

                        <h3 style={{
                          fontFamily: "var(--font-heading)",
                          fontWeight: 900,
                          fontSize: "clamp(16px, 3vw, 22px)",
                          color: "#000000",
                          marginBottom: "8px",
                          lineHeight: 1.25,
                        }}>
                          {event.title}
                        </h3>

                        <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", lineHeight: 1.7, color: "#6B7280", marginBottom: "20px" }}>
                          {event.desc}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-5">
                          {event.tags.map((tag) => (
                            <span key={tag} style={{
                              fontFamily: "var(--font-body)", fontSize: "10px", fontWeight: 600,
                              padding: "3px 10px", borderRadius: "999px",
                              background: "rgba(255,94,44,0.06)", color: "#FF5E2C",
                              border: "1px solid rgba(255,94,44,0.14)",
                            }}>
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Continuous photo loop */}
                        <div style={{ overflow: "hidden", borderRadius: "10px", position: "relative", width: "100%" }}>
                          {/* fade masks */}
                          <div style={{
                            pointerEvents: "none", position: "absolute", inset: "0 auto 0 0",
                            width: "40px", zIndex: 10,
                            background: "linear-gradient(to right, #ffffff, transparent)",
                          }} />
                          <div style={{
                            pointerEvents: "none", position: "absolute", inset: "0 0 0 auto",
                            width: "40px", zIndex: 10,
                            background: "linear-gradient(to left, #ffffff, transparent)",
                          }} />

                          <div className="photo-loop-track">
                            {[...Array(8), ...Array(8)].map((_, j) => (
                              <div
                                key={j}
                                className="flex items-center justify-center flex-shrink-0"
                                style={{
                                  width: "clamp(110px, 20vw, 160px)",
                                  height: "clamp(74px, 13vw, 108px)",
                                  borderRadius: "8px",
                                  background: "rgba(255,94,44,0.06)",
                                  border: "1px solid rgba(255,94,44,0.08)",
                                }}
                              >
                                <ImgIcon size={18} style={{ color: "rgba(255,94,44,0.35)" }} />
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section style={{ background: "linear-gradient(160deg, #FFFFFF 0%, #FFFFFF 50%, #FFFFFF 100%)", paddingTop: "72px", paddingBottom: "72px" }}>
        <FadeIn>
          <div className="page-container text-center">
            <span className="section-tag">What&apos;s Next</span>
            <h2 style={{
              fontFamily: "var(--font-heading)", fontWeight: 900,
              fontSize: "clamp(26px,5vw,40px)", color: "#000000",
              marginTop: "12px", marginBottom: "16px",
            }}>
              Don&apos;t Miss the Next Event
            </h2>
            <p style={{
              fontFamily: "var(--font-body)", fontSize: "clamp(15px,2vw,18px)",
              lineHeight: 1.72, color: "#374151",
              maxWidth: "520px", margin: "0 auto 32px",
            }}>
              Stay updated with all upcoming hackathons, workshops, and events at MLRIT CIE.
              Follow us on Instagram or sign up for our newsletter.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="btn-primary">Subscribe to Newsletter <ArrowRight size={16} /></button>
              <button className="btn-secondary-light">Follow on Instagram</button>
            </div>
          </div>
        </FadeIn>
      </section>

    </div>
  );
}
