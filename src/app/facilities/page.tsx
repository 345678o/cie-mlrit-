"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Monitor, Users, Layers, Mic, Calendar, Wifi,
  Coffee, Printer, Handshake, Lightbulb, TrendingUp, Rocket,
} from "lucide-react";
import PageHero from "@/components/layout/PageHero";

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const facilities = [
  {
    icon: Lightbulb,
    title: "Innovation Labs",
    desc: "State-of-the-art workstations with high-performance hardware for development, design, and rapid prototyping.",
  },
  {
    icon: Handshake,
    title: "Mentorship",
    desc: "Industry experts, alumni, and operators guiding startups through product, business strategy, and fundraising.",
  },
  {
    icon: TrendingUp,
    title: "Investor Network",
    desc: "Curated introductions to angel investors and VCs, access to pitch events and demo days across Hyderabad.",
  },
  {
    icon: Layers,
    title: "Co-Working Space",
    desc: "Dedicated startup bays and flexible desks with 24/7 member access, lockers, and a professional environment.",
  },
  {
    icon: Rocket,
    title: "Incubation Programs",
    desc: "Stage-specific programs from ideation to scale — domain tracks in AI/ML, HealthTech, FinTech, and more.",
  },
  {
    icon: Calendar,
    title: "Event Auditorium",
    desc: "A 300-seat fully equipped auditorium with AV, live-streaming setup, and breakout rooms for every event size.",
  },
  {
    icon: Printer,
    title: "Maker Space",
    desc: "Hands-on fabrication with 3D printers, laser cutters, CNC routers, soldering benches, and electronics tools.",
  },
  {
    icon: Wifi,
    title: "High-Speed Internet",
    desc: "1Gbps enterprise fibre with dedicated Wi-Fi 6 network, secure guest access, and 99.9% uptime across CIE.",
  },
  {
    icon: Mic,
    title: "Recording Studio",
    desc: "Professional audio/video gear for content creators — 4K cameras, broadcast mics, green screen, and lighting.",
  },
  {
    icon: Users,
    title: "Meeting Rooms",
    desc: "Three soundproofed meeting rooms seating 6–12, equipped with video conferencing and interactive whiteboards.",
  },
  {
    icon: Coffee,
    title: "Collaboration Zones",
    desc: "Informal lounge areas, writable walls, and casual nooks designed to spark spontaneous creative collaboration.",
  },
  {
    icon: Monitor,
    title: "Digital Resources",
    desc: "Access to premium SaaS tools, cloud credits, software licences, and learning platforms for every CIE member.",
  },
];

export default function FacilitiesPage() {
  return (
    <div style={{ background: "#F5F5F5", minHeight: "100vh" }}>
      <PageHero
        tag="World-Class Infrastructure"
        line1="TOOLS"
        line2="FOR"
        line3="MAKERS"
        scriptText="— world-class innovation infrastructure"
        description="Every workspace, every tool, every room at CIE is designed with one purpose: to remove friction between your ideas and their execution."
        stats={[
          { value: "12+", label: "Unique Spaces" },
          { value: "60+", label: "Workstations" },
          { value: "300", label: "Event Seats" },
          { value: "24/7", label: "Member Access" },
        ]}
        watermark="SPACES"
      />

      {/* ── Facilities Grid ─────────────────────────────────── */}
      <section style={{ padding: "80px 0 100px", background: "#F5F5F5" }}>
        <div className="page-container">

          {/* Heading */}
          <FadeIn className="text-center mb-14">
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 800,
                color: "#111111",
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
              }}
            >
              What We Have for Startups
            </h2>
          </FadeIn>

          {/* Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
            }}
            className="facilities-grid"
          >
            {facilities.map((facility, i) => (
              <FadeIn key={facility.title} delay={i * 0.06}>
                <div
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "14px",
                    border: "1px solid rgba(0,0,0,0.08)",
                    padding: "40px 32px 36px",
                    textAlign: "center",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    transition: "box-shadow 0.25s ease, transform 0.25s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      "0 8px 32px rgba(0,0,0,0.10)";
                    (e.currentTarget as HTMLDivElement).style.transform =
                      "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLDivElement).style.transform =
                      "translateY(0)";
                  }}
                >
                  {/* Icon */}
                  <div style={{ marginBottom: "20px" }}>
                    <facility.icon
                      size={44}
                      strokeWidth={1.6}
                      style={{ color: "#111111" }}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#111111",
                      marginBottom: "14px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {facility.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.7,
                      color: "#555555",
                      maxWidth: "280px",
                    }}
                  >
                    {facility.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section style={{ padding: "60px 0 80px", background: "#FFFFFF" }}>
        <FadeIn className="page-container text-center">
          <h2
            style={{
              fontSize: "clamp(22px, 3vw, 36px)",
              fontWeight: 800,
              color: "#111111",
              marginBottom: "16px",
              letterSpacing: "-0.02em",
            }}
          >
            Ready to Use Our Facilities?
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "#555555",
              maxWidth: "480px",
              margin: "0 auto 32px",
              lineHeight: 1.7,
            }}
          >
            Become a CIE member to unlock access to all our world-class
            facilities, equipment, and workspaces — completely free for MLRIT students.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">Join CIE Now</button>
            <button className="btn-secondary-light">Schedule a Tour</button>
          </div>
        </FadeIn>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .facilities-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 560px) {
          .facilities-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
