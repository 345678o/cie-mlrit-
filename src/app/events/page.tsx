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
  { icon: Code,      name: "Hackathons",           count: "12 events", color: "#E8521A" },
  { icon: BookOpen,  name: "Workshops",             count: "28 events", color: "#F26B38" },
  { icon: Users,     name: "Startup Meetups",       count: "8 events",  color: "#C04218" },
  { icon: Mic,       name: "Guest Lectures",        count: "35 events", color: "#E8521A" },
  { icon: Trophy,    name: "Innovation Challenges", count: "6 events",  color: "#F26B38" },
  { icon: Lightbulb, name: "Bootcamps",             count: "5 events",  color: "#C04218" },
];

const events = [
  {
    category: "Workshop",
    title: "Workshop Carnival 2.0",
    shortDate: "Apr 10–11, 2026",
    dateTime: "2026-04-10",
    desc: "Where learning goes beyond classrooms — into real skills, real challenges, and real innovation. Explore multiple domains, collaborate with like-minded creators, and push your limits through hands-on experiences that actually matter. Whether you're a coder, designer, strategist, or innovator — there's a space here with your name on it.",
    tags: ["Hands-on Workshops", "Expert Guidance", "Domain Challenges", "Practical Skills"],
  },
  {
    category: "Startup Meetup",
    title: "The Equinox E-Summit 2K24",
    shortDate: "Nov 28–30, 2024",
    dateTime: "2024-11-28",
    desc: "#WherePassionMeetsPerseverance — a 3-day entrepreneurship summit organized by MLRIT CIE and IIC bringing together student innovators, industry leaders, and investors on campus.",
    tags: ["E-Summit", "Entrepreneurship", "CIE × IIC"],
  },
  {
    category: "Innovation Challenge",
    title: "GI Mahotsav 2024",
    shortDate: "Mar 26–28, 2024",
    dateTime: "2024-03-26",
    desc: "Geographical Indications Products Mela — embark on a unique journey through India's rich cultural heritage. Organized by IPFC at MLR Institute of Technology. Explore and acquire the finest GI tagged products from every corner of the country. 10:00 AM – 5:00 PM daily.",
    tags: ["GI Products", "Cultural Heritage", "IPFC × MLRIT", "MSME"],
  },
  {
    category: "Workshop",
    title: "Workshop Carnival",
    shortDate: "Mar 11–16, 2024",
    dateTime: "2024-03-11",
    desc: "Six days of innovation, learning, and creativity — participants explored UI/UX, IoT, and WordPress themes through workshops, hands-on activities, demonstrations, and contests. Organized by MLRIT CIE and IIC.",
    tags: ["IoT", "UI-UX", "WordPress", "Contests"],
  },
  {
    category: "Innovation Challenge",
    title: "B2B — Business to Brand",
    shortDate: "Apr 3–4, 2025",
    dateTime: "2025-04-03",
    desc: "A Brand Revival Hackathon by MLRIT CIE — teams of 3–5 develop strategies to transform brands through Concept & Logo Redesign and Ad-Film Making, backed by exclusive masterclasses from industry experts in design and film.",
    tags: ["Brand Revival", "Logo Design", "Ad-Film Making", "Masterclasses"],
  },
  {
    category: "Innovation Challenge",
    title: "Hustle Mania 2",
    shortDate: "Apr 24, 2023",
    dateTime: "2023-04-24",
    desc: "Persuasion. Innovation. Business. — a high-energy entrepreneurship challenge covering negotiation, sales, advertising, and business strategy. Organized by MLRIT CIE and IIC.",
    tags: ["Business", "Negotiation", "Sales", "Entrepreneurship"],
  },
  {
    category: "Hackathon",
    title: "MetaLoop",
    shortDate: "Oct 6–7, 2023",
    dateTime: "2023-10-06",
    desc: "Ideate. Immerse. Innovate. — a 36-hour metaverse-themed hackathon organized by MLRIT CIE in collaboration with Deeploop. ₹75,000 prize pool. Entry from ₹499.",
    tags: ["Metaverse", "36-Hour Hackathon", "₹75K Prize", "CIE × Deeploop"],
  },
  {
    category: "Innovation Challenge",
    title: "Inventron 2022",
    shortDate: "Jan 27–28, 2023",
    dateTime: "2023-01-27",
    desc: "Formulate Infinite Possibilities — a maze of possibilities destined to a crystal reality. MLRIT CIE's annual innovation challenge where students ideated, prototyped, and presented solutions to real-world problems.",
    tags: ["Innovation", "Prototyping", "Competition"],
  },
];

const categoryBadgeColors: Record<string, { bg: string; text: string }> = {
  Hackathon:            { bg: "rgba(255,94,44,0.10)",  text: "#C04218" },
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
  { icon: Code,     label: "Hackathons",     count: "12 events", detail: "AI · IoT · SustainTech · HealthTech",   accent: "rgba(255,94,44,0.15)", color: "#E8521A" },
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

      <div style={{ position: "relative", zIndex: 1 }}>

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
                const colors = categoryBadgeColors[event.category] || { bg: "rgba(255,94,44,0.10)", text: "#C04218" };
                return (
                  <FadeIn key={event.title} delay={i * 0.08}>
                    <div className="flex items-start gap-4 sm:gap-6">

                      {/* Dot — hidden on mobile */}
                      <div className="hidden sm:flex w-6 flex-shrink-0 justify-center" style={{ paddingTop: "22px" }}>
                        <div className="w-3.5 h-3.5 rounded-full"
                          style={{ background: "#E8521A", boxShadow: "0 0 0 3px #FFFFFF, 0 0 0 5px rgba(255,94,44,0.22)" }} />
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
                              background: "rgba(255,94,44,0.06)", color: "#E8521A",
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

      </div>{/* end z-index wrapper */}

    </div>
  );
}
