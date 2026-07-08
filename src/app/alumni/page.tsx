"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
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
  role?: string;
  company?: string;
  location?: string;
  photo?: string;
  linkedin?: string;
  quote: string;
  tags?: string[];
};

const alumni: Alumni[] = [
  {
    name: "Avhilash Tripathy",
    batch: "2024–25",
    role: "Alumnus",
    company: "CIE",
    photo: "/alumni/Avhilash.jpeg",
    quote: "If someone asked me what the best part of my college life was, my answer would always be the same: CIE. I joined as a curious first year student, hoping to find a place where I could learn something beyond the classroom. What I found instead was a second home. Over the next three years, CIE became the place where I laughed the hardest, learned the most, and created memories I'll carry with me for the rest of my life. It wasn't just about organizing events or working on projects. It was about the people. People from different branches, different backgrounds, and different stories came together and somehow became a family. The endless conversations, the chai breaks, the late night planning, the music, the celebrations, the random outings, the chaos before every event, and the joy after every success — those little moments are what made CIE so special. Somewhere along the journey, without even realizing it, CIE shaped me into a better person. It taught me how to work with people, how to lead with empathy, how to trust a team, and how much can be achieved when everyone works towards a common purpose. Today, when I look back at my college life, I don't remember the titles or the responsibilities as much as I remember the smiles, the friendships, and the feeling of belonging. CIE gave me memories that time can never take away and people I'll always be grateful for. Those three years weren't just a part of my college journey, they were the heart of it, and I know I'll spend a lifetime missing them.",
  },
  {
    name: "Ala Tanvi Reddy",
    batch: "2025–26",
    // role/company/location hidden temporarily
    photo: "/alumni/Tanvi.jpeg",
    linkedin: "https://www.linkedin.com/in/ala-tanvi-reddy",
    quote: "If there is one place that truly shaped who I am today, it is CIE. It served as an incredible learning ground where I grew from an operations member to President, developing my communication, networking, organizing, and management abilities. Serving as a student mentor for micro-projects allowed me to sharpen my technical skills while helping others grow. Ultimately, CIE gave me a true understanding of what entrepreneurship means, laying the definitive foundation for my journey. Beyond the work and professional growth, CIE is a space where you do not just learn and improve. It is a place where you find an amazing community of peers and friends. We had so much fun together, and I am walking away with countless unforgettable memories.",
    tags: ["Tech", "Product"],
  },
  {
    name: "Sri Nikhil C",
    batch: "2024–25",
    role: "Founder",
    company: "Deezign",
    photo: "/alumni/Nikhil.jpeg",
    linkedin: "https://coolestdesigner.com",
    quote: "CIE was the best playground for me to learn and apply skills during college. It gave me the right people, the right exposure, and the chance to fail early. Honestly, much of what I excel at today stems directly from what I tinkered with during my time there.",
    tags: ["Design", "Entrepreneurship"],
  },
  {
    name: "Dheera Sameer Nagavarapu",
    batch: "2024–25",
    role: "Analog Layout Engineer",
    company: "Moschip",
    photo: "/alumni/Dheera.png",
    linkedin: "https://www.linkedin.com/in/dheera-sameer-nagavarapu-139429256",
    quote: "Beautiful friendships, rivalries which never seem to die, competitive mad people whose intellect is next to none amongst each other. Learned how to live and also learned how to survive when I can't live. Skills that I could've never learnt if I had sat in between 60 sweaty people in a 4 by 4 room. Everyone who took part in the club found something or the other, a hobby to live for, friends that never detach, a passion for one particular subject (not from the text books), a commitment which engages us every single day, and most of all........the love which not all humans are capable of understanding. So if you are in the club, you'd understand the last sentence. Have a great journey.",
    tags: ["Tech", "Hardware"],
  },
  {
    name: "Harsha Vardhan Reddy",
    batch: "2024–25",
    role: "Supply Chain Engineer",
    company: "Safran Electrical & Power",
    photo: "/alumni/Harsha.png",
    linkedin: "https://www.linkedin.com/in/harsha-vardhan-t-14b027165/",
    quote: "If someone had told me on my first day at CIE where this journey would take me, I probably wouldn't have believed them. I walked into CIE as a Technical Member, somehow found my way into photography, and before I knew it, I was leading the club as Chairperson. Looking back, the roles don't matter as much as the journey. From an introvert who avoided the spotlight to someone who could stand in front of a crowd with confidence — CIE had a lot to do with that. The late-night planning, decoration, roaming the campus at nights (I loved this one, the campus actually looks beautiful), friendships, random conversations, and memories... that's the real takeaway. Somewhere in between, I also found a place to share my experiences of travelling. Watching friends and juniors start exploring because of those conversations was a different kind of happiness. Maybe that's what CIE does. It doesn't just add a line to your resume. It brings out something new. ~ Sasta Traveller.",
    tags: ["Photography", "Leadership"],
  },
  {
    name: "P Neha Chandana",
    batch: "2025–26",
    photo: "/alumni/Neha.jpeg",
    linkedin: "https://www.linkedin.com/in/nehapyarasani11/",
    quote: "CIE will forever be the best journey of my college life that I'd never forget, the four walls of a classroom could never teach me what I've learnt here. This place definitely helped me on reflecting what my true potential is and see what kind of capabilities I hold. It completely shaped my thought process, pushed me out of my comfort zone, and helped me socialize at my absolute best to build the most amazing connections and cheers to few of the best people I've ever met here. Looking back, the three years I spent in this space truly changed me into a different person. It gave me the unshakeable confidence to aspire for so much more in life!",
  },
  {
    name: "Areddy Sai Deeraj Reddy",
    batch: "2025–26",
    photo: "/alumni/SaiDeerajReddy.png",
    linkedin: "https://www.linkedin.com/in/areddy-sai-deeraj-reddy-1845033b1",
    quote: "My journey at the Center for Innovation and Entrepreneurship (CIE) has been one of the most valuable parts of my college experience. Being a part of CIE gave me exposure far beyond academics and helped me understand how ideas are transformed into real initiatives through teamwork, planning, and execution. During my time at CIE, I had the opportunity to work on event coordination, promotions, sponsorship outreach, and community engagement. I was involved in organizing and supporting multiple initiatives, which improved my communication, leadership, and problem-solving skills. The environment at CIE constantly encouraged me to take ownership, work with different teams, and contribute to meaningful projects. From an introvert to an extrovert. From a creative member to the Operations Head. From being someone who simply worked behind the scenes to someone who led teams and made things happen — my journey at CIE has been nothing short of transformative. I started my CIE journey as a member of the Operations and Finance team, eager to learn and contribute. With every event, challenge, and opportunity, I grew — not just in responsibility, but in confidence. Over time, I stepped into a leadership role, coordinating teams, managing operations, organizing hackathons, bootcamps, entrepreneurship events, and B2B programs. CIE wasn't just a place where I organized events; it was where I discovered the leader within me. I mentored juniors on micro-projects, worked with my team to build a humanoid robot, collaborated with people from diverse backgrounds, and learned that great ideas become reality only through teamwork and execution. Today, when I look back, I don't just remember the events or the projects — I remember the person CIE helped me become. It shaped my leadership, strengthened my communication, expanded my network, and gave me the confidence to dream bigger, take ownership, and create meaningful impact. For me, CIE will always be more than a club — it is where my journey of growth truly began.",
    tags: ["Operations", "Leadership"],
  },
  {
    name: "Ajay Chowdary Godavarthi",
    batch: "2024–25",
    photo: "/alumni/AjayChowdary.png",
    linkedin: "https://www.linkedin.com/in/ajay-chowdary-godavarthi-93123127a",
    quote: "From an introvert to an extrovert. From a creative member to the Operations Head. From being someone who simply worked behind the scenes to someone who led teams and made things happen — my journey at CIE has been nothing short of transformative. I started my CIE journey as a member of the Operations and Finance team, eager to learn and contribute. With every event, challenge, and opportunity, I grew — not just in responsibility, but in confidence. Over time, I stepped into a leadership role, coordinating teams, managing operations, organizing hackathons, bootcamps, entrepreneurship events, and B2B programs. CIE wasn't just a place where I organized events; it was where I discovered the leader within me. I mentored juniors on micro-projects, worked with my team to build a humanoid robot, collaborated with people from diverse backgrounds, and learned that great ideas become reality only through teamwork and execution. Today, when I look back, I don't just remember the events or the projects — I remember the person CIE helped me become. It shaped my leadership, strengthened my communication, expanded my network, and gave me the confidence to dream bigger, take ownership, and create meaningful impact. For me, CIE will always be more than a club — it is where my journey of growth truly began.",
    tags: ["Operations", "Leadership"],
  },
  {
    name: "Bodduna Saipragna",
    batch: "2025–26",
    role: "Master's Student",
    company: "University of Milan",
    location: "Italy",
    photo: "/alumni/Pragna.png",
    linkedin: "https://in.linkedin.com/in/bodduna-sai-pragna",
    quote: "CIE is where I found my edge. I joined as the only female member on the technical and product development team, and grew into Joint Secretary — a journey that pushed me to think beyond. I started Torch, organized countless events, and mentored 100+ students across 25+ micro-projects, watching ideas turn into real, working things. Honestly, I spent more time at CIE than in my own classes, because it wasn't just a club, it was a canvas to tinker, break things, and build them better. Looking back, that's where I first saw the entrepreneurial instinct in me.",
    tags: ["Tech", "Leadership"],
  },
];

const BATCHES = ["All", ...Array.from(new Set(alumni.map((a) => a.batch))).sort().reverse()];

const ORANGE = "#FF5E2C";

const QUOTE_CLAMP_THRESHOLD = 220;

function AlumniCard({ member, index }: { member: Alumni; index: number }) {
  const initials = member.name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
  const isLong = member.quote.length > QUOTE_CLAMP_THRESHOLD;
  const [expanded, setExpanded] = useState(false);

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
        height: "100%",
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
      <div style={{ position: "relative", flex: 1 }}>
        <Quote size={18} style={{ color: ORANGE, marginBottom: "10px", flexShrink: 0 }} />
        <p style={{
          color: "#1A1A1A", fontSize: "clamp(14px,1.5vw,16px)", lineHeight: 1.7,
          fontStyle: "italic", fontFamily: "var(--font-body)",
          ...(isLong && !expanded ? {
            display: "-webkit-box",
            WebkitLineClamp: 6,
            WebkitBoxOrient: "vertical" as const,
            overflow: "hidden",
          } : {}),
        }}>
          {member.quote}
        </p>
        {isLong && (
          <button
            onClick={() => setExpanded((e) => !e)}
            style={{
              display: "block", marginTop: "10px", padding: 0, border: "none",
              background: "none", color: ORANGE, fontSize: "13px", fontWeight: 700,
              fontFamily: "var(--font-body)", cursor: "pointer",
            }}
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        )}
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: "rgba(0,0,0,0.07)" }} />

      {/* Profile row */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        {/* Avatar */}
        {member.photo ? (
          <div style={{ width: "90px", height: "90px", borderRadius: "50%", overflow: "hidden", flexShrink: 0, position: "relative" }}>
            <Image src={member.photo!} alt={member.name} fill sizes="90px" style={{ objectFit: "cover" }} />
          </div>
        ) : (
          <div style={{
            width: "90px", height: "90px", borderRadius: "50%", flexShrink: 0,
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
          {member.role && member.company && (
            <p style={{ color: "#6B7280", fontSize: "12px", fontWeight: 500, display: "flex", alignItems: "center", gap: "4px", flexWrap: "wrap" }}>
              <Briefcase size={11} style={{ flexShrink: 0 }} />
              {member.role} · {member.company}
            </p>
          )}
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
        description="Students may leave campus, but the experiences, projects, and friendships they built here stay with them. CIE continues to grow with every batch — the people graduate, but the community continues."
        stats={[]}
        watermark="ALUMNI"
      />

      <section style={{ background: "#FFFFFF", paddingTop: "clamp(52px,8vw,96px)", paddingBottom: "clamp(52px,8vw,96px)" }}>
        <div style={{ maxWidth: "1280px", width: "100%", margin: "0 auto", paddingInline: "clamp(16px,4vw,48px)" }}>

          <FadeIn>
            <span className="section-tag" style={{ fontSize: "14px", letterSpacing: "1.5px" }}>Testimonials</span>
            <h2 className="font-black" style={{ color: "#000000", fontSize: "clamp(24px,4vw,36px)", lineHeight: 1.1, marginTop: "24px" }}>
              What Our Alumni Say
            </h2>
            <p style={{ color: "#6B7280", fontSize: "clamp(14px,1.5vw,17px)", marginTop: "12px", maxWidth: "860px", lineHeight: 1.7 }}>
              Everyone&apos;s experience at CIE is different — for some it was their first
              project, for others it was learning to lead a team or organise an event.
              Real stories, real people, real memories from the journey.
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
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 480px), 1fr))",
              gap: "clamp(16px,2.5vw,28px)",
              marginTop: "clamp(32px,4vw,52px)",
              alignItems: "stretch",
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
      <section style={{ background: "#E8521A", paddingTop: "clamp(48px,8vw,96px)", paddingBottom: "clamp(48px,8vw,96px)" }}>
        <div style={{ maxWidth: "1280px", width: "100%", margin: "0 auto", paddingInline: "clamp(16px,4vw,48px)", textAlign: "center" }}>
          <FadeIn>
            <span style={{
              display: "inline-block", background: "rgba(255,255,255,0.2)", color: "#fff",
              fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "11px",
              letterSpacing: "0.14em", textTransform: "uppercase",
              padding: "5px 16px", borderRadius: "999px", marginBottom: "20px",
            }}>We&apos;re Hiring</span>
            <h2 className="font-black" style={{ color: "#ffffff", fontSize: "clamp(24px,4vw,42px)", lineHeight: 1.1, marginTop: "0", marginBottom: "16px" }}>
              Join the CIE Team
            </h2>
            <p style={{ color: "rgba(255,255,255,0.80)", fontSize: "clamp(14px,1.5vw,17px)", marginBottom: "36px", maxWidth: "500px", margin: "0 auto 36px", lineHeight: 1.7 }}>
              We&apos;re looking for passionate students to drive innovation, build communities, and create real impact at MLRIT CIE.
            </p>
            <a
              href="/join"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "#fff", color: "#E8521A",
                fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "14px",
                padding: "12px 28px", borderRadius: "8px", textDecoration: "none",
                letterSpacing: "0.02em",
              }}
            >
              Join Now →
            </a>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
