"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Quote, Briefcase, GraduationCap, MapPin, ExternalLink } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import PageGeometric from "@/components/ui/PageGeometric";

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

type Alumni = {
  name: string;
  batch: string;
  role: string;
  company: string;
  location?: string;
  photo?: string;
  linkedin?: string;
  quote: string;
  tags?: string[];
};

const alumni: Alumni[] = [
  {
    name: "Placeholder Name",
    batch: "2022–23",
    role: "Software Engineer",
    company: "Company Name",
    location: "Hyderabad",
    quote: "CIE gave me the confidence to build things from scratch. The culture of experimentation here shaped the way I approach every problem at work.",
    tags: ["Tech", "Product"],
  },
  {
    name: "Placeholder Name",
    batch: "2022–23",
    role: "Product Manager",
    company: "Company Name",
    location: "Bengaluru",
    quote: "Being part of CIE wasn't just about skills — it was about mindset. I learned how to lead, fail fast, and iterate. That's priceless.",
    tags: ["Operations", "Leadership"],
  },
  {
    name: "Placeholder Name",
    batch: "2021–22",
    role: "Founder & CEO",
    company: "Startup Name",
    location: "Mumbai",
    quote: "My startup idea was born in a CIE hackathon. The mentorship and community here turned a rough idea into a funded company.",
    tags: ["Entrepreneurship"],
  },
  {
    name: "Placeholder Name",
    batch: "2021–22",
    role: "UX Designer",
    company: "Company Name",
    location: "Pune",
    quote: "CIE's creative team taught me that design is problem-solving with empathy. I carry that principle into every project I take on.",
    tags: ["Design", "Creative"],
  },
  {
    name: "Placeholder Name",
    batch: "2023–24",
    role: "Data Scientist",
    company: "Company Name",
    location: "Hyderabad",
    quote: "The real-world projects and cross-team collaborations at CIE prepared me for the corporate world better than any classroom ever could.",
    tags: ["Tech", "AI/ML"],
  },
  {
    name: "Placeholder Name",
    batch: "2023–24",
    role: "Marketing Lead",
    company: "Company Name",
    location: "Delhi",
    quote: "From anchoring events to building campaigns, CIE's Promotions team gave me the stage. I haven't stopped performing since.",
    tags: ["Marketing", "P&S"],
  },
];

const BATCHES = ["All", ...Array.from(new Set(alumni.map((a) => a.batch))).sort().reverse()];

const ORANGE = "#FF5E2C";

function AlumniCard({ member, index }: { member: Alumni; index: number }) {
  const initials = member.name === "Placeholder Name"
    ? "?"
    : member.name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: "#FFFFFF",
        border: "1.5px solid rgba(0,0,0,0.07)",
        borderRadius: "24px",
        padding: "clamp(24px,3vw,36px)",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
      whileHover={{
        y: -6,
        boxShadow: `0 16px 48px rgba(255,94,44,0.10), 0 0 0 1.5px ${ORANGE}33`,
        transition: { duration: 0.3 },
      }}
    >
      {/* Decorative quote mark */}
      <div aria-hidden="true" style={{
        position: "absolute", top: "20px", right: "24px",
        fontFamily: "Georgia, serif", fontSize: "96px", lineHeight: 1,
        color: `${ORANGE}0D`, fontWeight: 900, userSelect: "none",
        pointerEvents: "none",
      }}>
        "
      </div>

      {/* Quote */}
      <div style={{ position: "relative" }}>
        <Quote size={18} style={{ color: ORANGE, marginBottom: "10px", flexShrink: 0 }} />
        <p style={{
          color: "#1A1A1A", fontSize: "clamp(14px,1.5vw,16px)", lineHeight: 1.7,
          fontStyle: "italic", fontFamily: "var(--font-body)",
        }}>
          {member.quote}
        </p>
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: "rgba(0,0,0,0.07)" }} />

      {/* Profile row */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        {/* Avatar */}
        {member.photo ? (
          <div style={{ width: "52px", height: "52px", borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
            <img src={member.photo} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ) : (
          <div style={{
            width: "52px", height: "52px", borderRadius: "50%", flexShrink: 0,
            background: `${ORANGE}15`, color: ORANGE,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "18px", fontWeight: 800, fontFamily: "var(--font-heading)",
          }}>
            {initials}
          </div>
        )}

        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ color: "#000000", fontSize: "15px", fontWeight: 800, marginBottom: "2px", fontFamily: "var(--font-heading)", lineHeight: 1.2 }}>
            {member.name}
          </p>
          <p style={{ color: "#6B7280", fontSize: "12px", fontWeight: 500, display: "flex", alignItems: "center", gap: "4px", flexWrap: "wrap" }}>
            <Briefcase size={11} style={{ flexShrink: 0 }} />
            {member.role} · {member.company}
          </p>
          {member.location && (
            <p style={{ color: "#9CA3AF", fontSize: "11px", marginTop: "2px", display: "flex", alignItems: "center", gap: "4px" }}>
              <MapPin size={10} style={{ flexShrink: 0 }} />
              {member.location}
            </p>
          )}
        </div>

        {member.linkedin && member.linkedin !== "#" && (
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
            style={{ color: "#0A66C2", flexShrink: 0 }}
            aria-label={`${member.name} on LinkedIn`}>
            <ExternalLink size={16} />
          </a>
        )}
      </div>

      {/* Batch + tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center" }}>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: "4px",
          fontSize: "10px", fontWeight: 700, padding: "4px 10px", borderRadius: "999px",
          background: `${ORANGE}12`, color: ORANGE, letterSpacing: "0.04em",
        }}>
          <GraduationCap size={10} /> Batch {member.batch}
        </span>
        {member.tags?.map((tag) => (
          <span key={tag} style={{
            fontSize: "10px", fontWeight: 600, padding: "4px 10px", borderRadius: "999px",
            background: "rgba(0,0,0,0.05)", color: "#6B7280", letterSpacing: "0.03em",
          }}>
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function AlumniPage() {
  const [activeBatch, setActiveBatch] = useState("All");

  const visible = activeBatch === "All"
    ? alumni
    : alumni.filter((a) => a.batch === activeBatch);

  return (
    <div style={{ background: "#FFFFFF", position: "relative" }}>
      <PageGeometric />
      <PageHero
        tag="Alumni"
        line1="VOICES"
        line2="FROM THE"
        line3="FIELD"
        scriptText="— stories that inspire"
        description="Hear from CIE alumni who've gone on to build products, lead teams, and launch startups — and how their time at MLRIT CIE shaped their journey."
        stats={[
          { value: "100+", label: "Alumni" },
          { value: "40+", label: "Companies" },
          { value: "5+", label: "Startups Founded" },
        ]}
        watermark="ALUMNI"
      />

      <section style={{ background: "#FFFFFF", paddingTop: "clamp(52px,8vw,96px)", paddingBottom: "clamp(52px,8vw,96px)" }}>
        <div style={{ maxWidth: "1280px", width: "100%", margin: "0 auto", paddingInline: "clamp(16px,4vw,48px)" }}>

          <FadeIn>
            <span className="section-tag" style={{ fontSize: "14px", letterSpacing: "1.5px" }}>Testimonials</span>
            <h2 className="font-black" style={{ color: "#000000", fontSize: "clamp(24px,4vw,36px)", lineHeight: 1.1, marginTop: "24px" }}>
              What Our Alumni Say
            </h2>
            <p style={{ color: "#6B7280", fontSize: "clamp(14px,1.5vw,17px)", marginTop: "12px", maxWidth: "560px", lineHeight: 1.7 }}>
              Real stories from people who started where you are — and built something remarkable.
            </p>
          </FadeIn>

          {/* Batch filter */}
          <FadeIn delay={0.08}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "clamp(24px,3vw,40px)" }}>
              {BATCHES.map((batch) => {
                const isActive = activeBatch === batch;
                return (
                  <button
                    key={batch}
                    onClick={() => setActiveBatch(batch)}
                    style={{
                      padding: "8px 20px", borderRadius: "999px", fontSize: "13px", fontWeight: 600,
                      cursor: "pointer", border: isActive ? `1.5px solid ${ORANGE}` : "1.5px solid rgba(0,0,0,0.10)",
                      background: isActive ? ORANGE : "transparent",
                      color: isActive ? "#FFFFFF" : "#6B7280",
                      transition: "all 0.2s ease",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {batch}
                  </button>
                );
              })}
            </div>
          </FadeIn>

          {/* Grid */}
          <motion.div
            key={activeBatch}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 360px), 1fr))",
              gap: "clamp(16px,2.5vw,28px)",
              marginTop: "clamp(32px,4vw,52px)",
            }}
          >
            {visible.map((member, i) => (
              <AlumniCard key={`${member.name}-${member.batch}-${i}`} member={member} index={i} />
            ))}
          </motion.div>

          {visible.length === 0 && (
            <div style={{ textAlign: "center", padding: "80px 0", color: "#9CA3AF" }}>
              No testimonials for this batch yet.
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#F5F5F5", paddingTop: "clamp(48px,8vw,96px)", paddingBottom: "clamp(48px,8vw,96px)" }}>
        <div style={{ maxWidth: "1280px", width: "100%", margin: "0 auto", paddingInline: "clamp(16px,4vw,48px)", textAlign: "center" }}>
          <FadeIn>
            <span className="section-tag" style={{ marginBottom: "24px" }}>Share Your Story</span>
            <h2 className="font-black" style={{ color: "#000000", fontSize: "clamp(22px,4vw,36px)", lineHeight: 1.1, marginTop: "24px", marginBottom: "16px" }}>
              Are You a CIE Alumnus?
            </h2>
            <p style={{ color: "#6B7280", fontSize: "clamp(14px,1.5vw,17px)", marginBottom: "36px", maxWidth: "500px", margin: "0 auto 36px", lineHeight: 1.7 }}>
              We'd love to feature your journey. Write to us and inspire the next generation of CIE members.
            </p>
            <a
              href="mailto:cie@mlrit.ac.in"
              className="btn-primary"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              Share Your Story
            </a>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
