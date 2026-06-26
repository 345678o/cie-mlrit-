"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link2, Mail, Users, ChevronDown, ChevronUp, Code, Palette, Camera, PenLine, Mic, BarChart2, FileText } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import PageGeometric from "@/components/ui/PageGeometric";

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

type Member = {
  name: string;
  role: string;
  dept: string;
  year?: string;
  linkedin?: string;
  email?: string;
  // Add real photo path here, e.g. "/council/rohit-sharma.jpg"
  photo?: string;
};

type TeamSection = {
  team: string;
  color: string;
  description: string;
  members: Member[];
};

const facultyCoordinators: Member[] = [
  { name: "Dr. Ganesh Miriyala",  role: "Head – CIE, Asst. Professor", dept: "Electronics & Communication Engineering" },
  { name: "Dr. A. Vivek Anand",   role: "Professor",                   dept: "Aerospace Engineering" },
  { name: "Dr. Amritha Saha",     role: "Asst. Professor",             dept: "Humanities & Sciences" },
  { name: "Dr. Sumana Das",       role: "Associate Professor",         dept: "Electrical & Electronics Engineering" },
  { name: "Mr. J. Laxmi Prasad",  role: "Asst. Professor",             dept: "Mechanical Engineering" },
  { name: "Mrs. I. Sapthami",     role: "Asst. Professor",             dept: "Computer Science & Engineering" },
  { name: "Mrs. Lakshmi Saritha", role: "Asst. Professor",             dept: "Computer Science & Machine Learning" },
  { name: "Mrs. A. Sravanthi",    role: "Asst. Professor",             dept: "Computer Science & Design" },
  { name: "Mrs. A. Nirisha",      role: "Asst. Professor",             dept: "Computer Science & IT" },
  { name: "Mr. D. Sandeep",       role: "Asst. Professor",             dept: "Information Technology" },
  { name: "Mr. M. Raju Naik",     role: "Asst. Professor",             dept: "Electronics & Communication Engineering" },
  { name: "Mr. K. Pithamber",     role: "Asst. Professor",             dept: "Electronics & Communication Engineering" },
];

const studentLeadership: Member[] = [
  { name: "Karan Gupta", role: "President", dept: "CSE Final Year", year: "2024-25", linkedin: "#", email: "president@ciemlrit.in" },
  { name: "Sneha Patel", role: "Vice President", dept: "ECE Final Year", year: "2024-25", linkedin: "#", email: "vp@ciemlrit.in" },
];

const teamExpertise: Record<string, string> = {
  "Tech": "Software Development",
  "Content": "Writing & Editing",
  "Creative": "Brand Strategy",
  "GD — Graphic Design": "Visual Design",
  "Photography": "Visual Media",
  "P&S — Public Speaking": "Public Speaking",
  "Ops — Operations & Finance": "Event Operations",
};

const teams: TeamSection[] = [
  {
    team: "Tech",
    color: "#4A7DFF",
    description: "Builds and maintains CIE's digital infrastructure — from the website and internal tools to AI experiments and mobile apps. The Tech team turns every idea into a working product.",
    members: [
      { name: "Ghanashyam Kodekandla", role: "Member", dept: "Tech", photo: "/council/tech/Ghanashyam Kodekandla.png" },
      { name: "Keertan Kuppili",       role: "Member", dept: "Tech", photo: "/council/tech/Keertan Kuppili .png" },
      { name: "T.S Siddarth",          role: "Member", dept: "Tech", photo: "/council/tech/T.S Siddarth.png" },
      { name: "Teja Jagathi",          role: "Member", dept: "Tech", photo: "/council/tech/Teja Jagathi.png" },
      { name: "Abhiram Ganji",         role: "Member", dept: "Tech", photo: "/council/tech/Abhiram Ganji.png" },
      { name: "Anuj Lomte",            role: "Member", dept: "Tech", photo: "/council/tech/Anuj Lomte.png" },
      { name: "Anamika",               role: "Member", dept: "Tech", photo: "/council/tech/Anamika.jpeg" },
      { name: "Guna Sai Marni",        role: "Member", dept: "Tech", photo: "/council/tech/Guna Sai Marni.png" },
      { name: "Jaikar Midithuri",      role: "Member", dept: "Tech", photo: "/council/tech/Jaikar Midithuri.png" },
      { name: "Athava Sri Pavan",      role: "Member", dept: "Tech", photo: "/council/tech/Athava Sri Pavan.png" },
      { name: "Katepally Tribhuvan",   role: "Member", dept: "Tech", photo: "/council/tech/Katepally Tribhuvan.png" },
      { name: "Yashwanth Abhishek",    role: "Member", dept: "Tech", photo: "/council/tech/yashwanth abhishek.png" },
      { name: "Abhinav Sai",           role: "Member", dept: "Tech", photo: "/council/tech/Abhinav Sai.png" },
      { name: "Guguloth Adithya Jadhav", role: "Member", dept: "Tech", photo: "/council/tech/Guguloth Adithya Jadhav.png" },
      { name: "Gannoji Vedik",         role: "Member", dept: "Tech", photo: "/council/tech/Gannoji Vedik.png" },
      
    ],
  },
  {
    team: "Content",
    color: "#D9C500",
    description: "Produces all written and editorial output for CIE — blog posts, event write-ups, newsletters, captions, and long-form content that tell our story across every channel.",
    members: [
      { name: "Jayadeep",        role: "Member", dept: "Content", photo: "/council/content/Jayadeep.png" },
      { name: "Prashansa",       role: "Member", dept: "Content", photo: "/council/content/Prashansa .png" },
      { name: "Haritha",         role: "Member", dept: "Content", photo: "/council/content/Haritha.png" },
      { name: "Harshitha",       role: "Member", dept: "Content", photo: "/council/content/Harshitha.png" },
      { name: "Ennawar Rithvik", role: "Member", dept: "Content", photo: "/council/content/Ennawar Rithvik .png" },
      { name: "Shiva",           role: "Member", dept: "Content", photo: "/council/content/Shiva.png" },
      { name: "K S Sreesanth",   role: "Member", dept: "Content", photo: "/council/content/K S Sreesanth.png" },
    ],
  },
  {
    team: "Creative",
    color: "#B65CFF",
    description: "Drives CIE's creative direction and campaigns — ideating themes, managing brand consistency, and building the visual + conceptual identity behind every initiative.",
    members: [
         { name: "Harika Y",          role: "Member", dept: "Creative", photo: "/council/creatives/Harika Y.png" },
         { name: "Sai Krishna",       role: "Member", dept: "Creative", photo: "/council/creatives/Sai Krishna.png" },
         { name: "Sushaanth",         role: "Member", dept: "Creative", photo: "/council/creatives/sushaanth.png" },
         { name: "Durga Mahesh",      role: "Member", dept: "Creative", photo: "/council/creatives/Durga Mahesh.png" },
         { name: "Cheeda Shamilini",  role: "Member", dept: "Creative", photo: "/council/creatives/Cheeda Shamilini.png" },
         { name: "D Pearl Angelina",  role: "Member", dept: "Creative", photo: "/council/creatives/D Pearl Angelina.png" },
         { name: "Sadwika Chedimala", role: "Member", dept: "Creative", photo: "/council/creatives/Sadwika Chedimala.png" },
         { name: "Hansika Jella",     role: "Member", dept: "Creative", photo: "/council/creatives/Hansika Jella.png" },
    ],
  },
  {
    team: "GD — Graphic Design",
    color: "#61D4F4",
    description: "Shapes the visual identity of CIE — designing posters, decks, social assets, UI mockups, and motion content that make every event and campaign look world-class.",
    members: [
      { name: "Vivek Vardhan",           role: "Member", dept: "GD", photo: "/council/GD/Veivek vardhan.png" },
      { name: "Avinash",                  role: "Member", dept: "GD", photo: "/council/GD/Avinash.png" },
      { name: "Chanikya",                 role: "Member", dept: "GD", photo: "/council/GD/chanikya.png" },
       { name: "Sri Thejitha",             role: "Member", dept: "GD", photo: "/council/GD/Sri Thejitha .png" },
      { name: "Yeruva Indu Reddy",        role: "Member", dept: "GD", photo: "/council/GD/Yeruva Indu Reddy.png" },
      { name: "A Farhana Sultana",        role: "Member", dept: "GD", photo: "/council/GD/A Farhana Sultana.png" },
      { name: "Mounith Varma Akkala",     role: "Member", dept: "GD", photo: "/council/GD/Mounith Varma Akkala .png" },
      { name: "Bangari Nikitha",          role: "Member", dept: "GD", photo: "/council/GD/Bangari Nikitha.png" },
      { name: "Poloju RajaVivek",         role: "Member", dept: "GD", photo: "/council/GD/Poloju RajaVivek.png" },
      { name: "Tannidi Durga Karthikeya", role: "Member", dept: "GD", photo: "/council/GD/Tannidi Durga Karthikeya .png" },
      { name: "Kodali Pranav Chandra",    role: "Member", dept: "GD", photo: "/council/GD/Kodali Pranav Chandra.png" },
     
    ],
  },
  {
    team: "Photography",
    color: "#FF7A1A",
    description: "Captures every moment of the CIE journey — from hackathon late nights to summit keynotes — through photography, videography, and professional post-production.",
    members: [
      { name: "Priyanshu Roy",     role: "Member", dept: "Photography", photo: "/council/photography/Priyanshu Roy.png" },
      { name: "Anguluri Shiva",    role: "Member", dept: "Photography", photo: "/council/photography/Anguluri Shiva.png" },
      { name: "Mattam Shivani",    role: "Member", dept: "Photography", photo: "/council/photography/Mattam Shivani.png" },
      { name: "Vavilala Sai Ganesh", role: "Member", dept: "Photography", photo: "/council/photography/Vavilala Sai Ganesh.png" },
      { name: "K.SAI VARSHITH",    role: "Member", dept: "Photography", photo: "/council/photography/K.SAI VARSHITH.png" },
      { name: "Gorli Mahesh",      role: "Member", dept: "Photography", photo: "/council/photography/Gorli Mahesh.png" },
      { name: "Anam Mounika",      role: "Member", dept: "Photography", photo: "/council/photography/Anam Mounika .png" },
      { name: "Gothuri Rishith",   role: "Member", dept: "Photography", photo: "/council/photography/Gothuri Rishith.png" },
      { name: "Sai Vashist",       role: "Member", dept: "Photography", photo: "/council/photography/Sai Vashist.png" },
      { name: "Konthum Bhruhathi", role: "Member", dept: "Photography", photo: "/council/photography/Konthum Bhruhathi .png" },
    ],
  },
  {
    team: "P&S — Public Speaking",
    color: "#E53935",
    description: "Represents CIE in every room — anchoring events, running communication workshops, handling PR, and making sure CIE's message lands clearly with every audience.",
    members: [
      { name: "Sai Mihir Ramaraju",    role: "Member", dept: "P&S", photo: "/council/p&s/Sai Mihir Ramaraju.png" },
      { name: "Yashashri Penikalapti", role: "Member", dept: "P&S", photo: "/council/p&s/Yashashri Penikalapti.png" },
      { name: "Bandaru Mahith Naidu",  role: "Member", dept: "P&S", photo: "/council/p&s/Bandaru Mahith Naidu.png" },
      { name: "Sanjana Kovuru",        role: "Member", dept: "P&S", photo: "/council/p&s/Sanjana Kovuru.png" },
      { name: "Adithya Ganesh",        role: "Member", dept: "P&S", photo: "/council/p&s/Adithya Ganesh.png" },
      { name: "Rithish Kumar",         role: "Member", dept: "P&S", photo: "/council/p&s/Rithish Kumar.png" },
    ],
  },
  {
    team: "Ops — Operations & Finance",
    color: "#22C55E",
    description: "Keeps everything running — coordinating logistics for every event, managing budgets, vendor relations, and making sure no detail falls through the cracks.",
    members: [
       { name: "Dheeraj Kumar",     role: "Member", dept: "Ops", photo: "/council/OPS/Dheeraj Kumar.png" },
      { name: "Mahima Tatineni",   role: "Member", dept: "Ops", photo: "/council/OPS/Mahima Tatineni.png" },
      { name: "Aarthi",            role: "Member", dept: "Ops", photo: "/council/OPS/Aarthi.png" },
      { name: "Vinay",             role: "Member", dept: "Ops", photo: "/council/OPS/Vinay.png" },
      { name: "Bhavana",           role: "Member", dept: "Ops", photo: "/council/OPS/Bhavana .png" },
      { name: "A Sai Ganesh",      role: "Member", dept: "Ops", photo: "/council/OPS/ASaiGanesh.png" },
      { name: "Manukonda Tarun",   role: "Member", dept: "Ops", photo: "/council/OPS/Manukonda Tarun.png" },
      { name: "Tharun",            role: "Member", dept: "Ops", photo: "/council/OPS/Tharun.png" },
      { name: "M Vasanth Vardhan", role: "Member", dept: "Ops", photo: "/council/OPS/M Vasanth vardhan.png" },
    ],
  },
];

const deptShort: Record<string, string> = {
  "Tech": "Technical",
  "Content": "Content",
  "Creative": "Creative",
  "GD — Graphic Design": "Graphic Design",
  "Photography": "Photography",
  "P&S — Public Speaking": "P&S",
  "Ops — Operations & Finance": "Ops & Finance",
};

function MemberCard({ member, color = "#FF5E2C", expertise = "", index = 0 }: { member: Member; color?: string; expertise?: string; index?: number }) {
  const initials = member.name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
  const photoSrc = member.photo
    ? member.photo.split("/").map((seg) => encodeURIComponent(seg)).join("/")
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group"
      style={{
        position: "relative",
        borderRadius: "28px",
        overflow: "hidden",
        background: "#111111",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
        transition: "transform 300ms cubic-bezier(0.16,1,0.3,1), box-shadow 300ms ease",
        cursor: "default",
        display: "flex",
        flexDirection: "column",
        borderTop: `6px solid ${color}`,
        aspectRatio: "3 / 4",
      }}
      whileHover={{
        y: -10,
        scale: 1.02,
        boxShadow: `0 20px 48px rgba(0,0,0,0.55), 0 0 0 1px ${color}55`,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      {/* Image — 80% of card */}
      <div style={{ flex: "1 1 80%", overflow: "hidden", position: "relative", background: `${color}18` }}>
        {photoSrc ? (
          <img
            src={photoSrc}
            alt={member.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
              display: "block",
              transition: "transform 300ms cubic-bezier(0.16,1,0.3,1)",
            }}
            className="group-hover:[transform:scale(1.05)]"
          />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "48px", fontWeight: 900, color }}>
            {initials}
          </div>
        )}
      </div>

      {/* Bottom info panel — translucent dark + blur */}
      <div style={{
        flex: "0 0 auto",
        padding: "20px 20px 20px",
        background: "rgba(10,10,10,0.88)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}>
        <p style={{ color: "#FFFFFF", fontSize: "17px", fontWeight: 700, lineHeight: 1.25, marginBottom: "4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {member.name}
        </p>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px", fontWeight: 500, marginBottom: "12px" }}>
          {member.role}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          <span style={{
            fontSize: "11px", fontWeight: 600, padding: "5px 12px", borderRadius: "999px",
            background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.65)",
            letterSpacing: "0.02em", whiteSpace: "nowrap",
          }}>
            {member.dept}
          </span>
          {expertise && (
            <span style={{
              fontSize: "11px", fontWeight: 600, padding: "5px 12px", borderRadius: "999px",
              background: `${color}25`, color,
              letterSpacing: "0.02em", whiteSpace: "nowrap",
            }}>
              {expertise}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

const deptIcon: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>> = {
  "Tech": Code,
  "Content": FileText,
  "Creative": PenLine,
  "GD — Graphic Design": Palette,
  "Photography": Camera,
  "P&S — Public Speaking": Mic,
  "Ops — Operations & Finance": BarChart2,
};

function TeamAccordion({ section }: { section: TeamSection }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = deptIcon[section.team] ?? Users;
  const bg = `${section.color}12`;
  const accordionId = `accordion-${section.team.toLowerCase().replace(/[\s/&]+/g, "-").replace(/[^a-z0-9-]/g, "")}`;
  return (
    <FadeIn>
      <div className="rounded-2xl overflow-hidden card-light">
        <button onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-controls={accordionId}
          className="w-full flex items-center justify-between p-6 text-left">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: bg }}>
              <Icon size={18} style={{ color: section.color }} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-black" style={{ color: "#000000" }}>{section.team}</h3>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full flex-shrink-0"
                  style={{ background: bg, color: section.color }}>
                  {section.members.length} members
                </span>
              </div>
              {!expanded && (
                <p className="text-xs mt-0.5 truncate" style={{ color: "#6B7280", maxWidth: "480px" }}>
                  {section.description}
                </p>
              )}
            </div>
          </div>
          {expanded
            ? <ChevronUp size={18} className="flex-shrink-0 ml-2" style={{ color: "#9CA3AF" }} />
            : <ChevronDown size={18} className="flex-shrink-0 ml-2" style={{ color: "#9CA3AF" }} />}
        </button>
        {expanded && (
          <div id={accordionId}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-6 pb-7 pt-2">
              {section.members.map((member, i) => (
                <MemberCard
                  key={member.name}
                  member={member}
                  color={section.color}
                  expertise={teamExpertise[section.team] ?? ""}
                  index={i}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </FadeIn>
  );
}

const heroStats = [
  { value: `${teams.reduce((s, t) => s + t.members.length, 0) + facultyCoordinators.length + studentLeadership.length}+`, label: "Total Members" },
  { value: `${teams.length}`, label: "Active Teams" },
  { value: `${facultyCoordinators.length}`, label: "Faculty Advisors" },
  { value: "2024–25", label: "Current Batch" },
];

const heroCards = [
  { icon: Code, label: "Tech", count: `${teams[0].members.length} members`, detail: "Frontend · Backend · AI/ML · Apps", accent: "rgba(255,94,44,0.15)", color: "#FF5E2C" },
  { icon: Palette, label: "GD — Graphic Design", count: `${teams[2].members.length} members`, detail: "UI/UX · Illustration · Motion · Print", accent: "rgba(255,133,51,0.15)", color: "#FF7A50" },
  { icon: Mic, label: "P&S — Public Speaking", count: `${teams[4].members.length} members`, detail: "Anchoring · PR · Workshops · Events", accent: "rgba(124,58,237,0.15)", color: "#7C3AED" },
];

// ── Council Showcase — Lando Norris helmet treatment ─────────────
// Notched frame (isosceles-right-triangle corner cut), staggered scatter, lime accent.
// Static: side-view, grayscale, shrunk, grey frame. Click → front zoom, color, lime glow.
// Isosceles-right-triangle notch cut from the bottom-right corner.
const CS_NOTCH = "polygon(0 0, 100% 0, 100% calc(100% - 32px), calc(100% - 32px) 100%, 0 100%)";
type ShowcaseMember = Member & { department: string; deptColor: string };
function CouncilShowcase({ members }: { members: ShowcaseMember[] }) {
  const [active, setActive] = useState<number | null>(null);
  return (
    <>
      <div className="cs-grid">
        {members.map((m, i) => {
          // Filenames contain spaces / special chars — encode each path segment.
          const encoded = m.photo
            ? m.photo.split("/").map((seg) => encodeURIComponent(seg)).join("/")
            : null;
          // Two states like Lando: a "side" (flat) image and a "front" (hero) image.
          const flat = encoded
            ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=0a0a0a&color=9aa&size=400&bold=true&format=png`;
          const hero = encoded
            ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=${m.deptColor.replace("#", "")}&color=fff&size=400&bold=true&format=png`;
          const isActive = active === i;
          // Staggered scatter: even columns sit high, odd columns sit low.
          const scatter = i % 2 === 0 ? -26 : 26;
          return (
            <button
              key={`${m.department}-${m.name}-${i}`}
              type="button"
              onClick={() => setActive(isActive ? null : i)}
              aria-pressed={isActive}
              className="cs-card"
              style={{
                background: "transparent", border: "none", padding: 0, cursor: "pointer", textAlign: "left",
                transform: `translateY(${isActive ? 0 : scatter}px)`,
                transition: "transform .55s cubic-bezier(.16,1,.3,1)",
              }}
            >
              {/* Frame — drop-shadow follows the clipped silhouette (box-shadow would not) */}
              <div style={{
                position: "relative", aspectRatio: "4 / 5",
                filter: isActive ? `drop-shadow(0 22px 50px ${m.deptColor}66)` : "none",
                transition: "filter .45s ease",
              }}>
                {/* Border layer (notched) */}
                <div style={{
                  position: "absolute", inset: 0, clipPath: CS_NOTCH,
                  background: isActive ? m.deptColor : "rgba(255,255,255,0.16)",
                  transition: "background .4s ease",
                }} />
                {/* Content layer (notched, inset = border thickness) */}
                <div style={{
                  position: "absolute", inset: "1.5px", clipPath: CS_NOTCH, overflow: "hidden",
                  background: isActive ? `linear-gradient(155deg, ${m.deptColor}26 0%, #0a0a0a 100%)` : "#0a0a0a",
                  transition: "background .4s ease",
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={isActive ? hero : flat}
                    alt={m.name}
                    className="absolute inset-0 w-full h-full"
                    style={{
                      objectFit: "cover",
                      objectPosition: "top center",
                      transform: isActive ? "scale(1.06)" : "scale(0.80)",
                      filter: "none",
                      transition: "transform .55s cubic-bezier(.16,1,.3,1), filter .5s ease",
                    }}
                  />
                </div>
              </div>
              {/* Label — name stacks above dept, left-aligned, name wraps full-width */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "3px", paddingTop: "12px", paddingInline: "4px" }}>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: isActive ? "15px" : "13px", lineHeight: 1.2, color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.82)", transition: "all .3s ease", overflowWrap: "anywhere" }}>{m.name}</span>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "11px", letterSpacing: "0.3px", color: isActive ? m.deptColor : "rgba(255,255,255,0.45)", transition: "all .3s ease" }}>{deptShort[m.department] ?? m.department}</span>
              </div>
            </button>
          );
        })}
      </div>
      <style>{`
        .cs-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: clamp(18px, 2.5vw, 32px) clamp(16px, 2vw, 28px); padding-top: 30px; padding-bottom: 30px; align-items: start; }
        /* Mobile: kill the staggered scatter so the 2-col grid sits flush. */
        @media (max-width: 639px)  { .cs-card { transform: none !important; } }
        @media (min-width: 640px)  { .cs-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 1024px) { .cs-grid { grid-template-columns: repeat(4, 1fr); } }
      `}</style>
    </>
  );
}

export default function CouncilPage() {
  const [activeTeam, setActiveTeam] = useState("All");
  const allMembers = teams.flatMap((t) =>
    t.members.map((m) => ({ ...m, department: t.team, deptColor: t.color }))
  );
  const visibleMembers = activeTeam === "All" ? allMembers : allMembers.filter((m) => m.department === activeTeam);

  return (
    <div style={{ background: "#FFFFFF", position: "relative" }}>
      <PageGeometric />
      <PageHero
        tag="Our Team"
        line1="MEET"
        line2="THE"
        line3="COUNCIL"
        scriptText="— the people behind the mission"
        description="The passionate students and dedicated faculty who power MLRIT CIE — building programs, running events, and driving the innovation ecosystem forward."
        stats={[
          { value: "30+", label: "Council Members" },
          { value: "6", label: "Active Teams" },
          { value: `${facultyCoordinators.length}`, label: "Faculty Advisors" },
          { value: "2024–25", label: "Current Batch" },
        ]}
        watermark="TEAM"
      />

      {/* ── Shared container constant ── max-width 1400px, 32px inline padding */}

      {/* Faculty */}
      <section style={{ background: "#FFFFFF", paddingTop: "96px", paddingBottom: "48px" }}>
        <div style={{ maxWidth: "1440px", width: "100%", margin: "0 auto", paddingInline: "48px" }}>
          <FadeIn>
            <span className="section-tag" style={{ fontSize: "14px", letterSpacing: "1.5px" }}>Faculty</span>
            <h2 className="font-black" style={{ color: "#000000", fontSize: "clamp(24px, 4vw, 36px)", lineHeight: 1.1, marginTop: "24px" }}>Faculty Coordinators</h2>
          </FadeIn>
          <div style={{ marginTop: "40px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
            {facultyCoordinators.map((member, i) => {
              const initials = member.name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
              return (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl card-light flex flex-col items-center text-center"
                  style={{ padding: "24px 16px 20px" }}
                >
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-black mb-4 flex-shrink-0"
                    style={{ background: "rgba(255,94,44,0.10)", color: "#FF5E2C" }}>
                    {initials}
                  </div>
                  <p style={{ color: "#000000", fontSize: "13px", fontWeight: 800, lineHeight: 1.3, marginBottom: "6px" }}>{member.name}</p>
                  <p style={{ color: "#FF5E2C", fontSize: "11px", fontWeight: 600, marginBottom: "6px", lineHeight: 1.4 }}>{member.role}</p>
                  <span style={{ display: "inline-block", marginTop: "auto", fontSize: "10px", fontWeight: 600, padding: "4px 10px", borderRadius: "999px", background: "rgba(255,94,44,0.08)", color: "#FF5E2C", lineHeight: 1.4, letterSpacing: "0.02em" }}>
                    {member.dept}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Student Leadership */}
      <section style={{ background: "#FFFFFF", paddingTop: "96px", paddingBottom: "96px" }}>
        <div style={{ maxWidth: "1440px", width: "100%", margin: "0 auto", paddingInline: "48px" }}>
          <FadeIn>
            <span className="section-tag" style={{ fontSize: "14px", letterSpacing: "1.5px" }}>Leadership</span>
            <h2 className="font-black" style={{ color: "#000000", fontSize: "clamp(24px, 4vw, 36px)", lineHeight: 1.1, marginTop: "24px" }}>Student Leadership 2024–25</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-8 items-stretch" style={{ marginTop: "40px" }}>
            {studentLeadership.map((member) => (
              <FadeIn key={member.name} className="flex flex-col">
                <div className="rounded-2xl card-light relative overflow-hidden"
                  style={{ flex: 1, borderColor: "rgba(255,94,44,0.20)", minHeight: "280px", padding: "40px" }}>
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
                    style={{ background: "#FF5E2C", transform: "translate(30%, -30%)" }} />
                  <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black mb-6"
                    style={{ background: "rgba(255,94,44,0.10)", color: "#FF5E2C" }}>
                    {member.name.split(" ").map((n) => n[0]).join("").substring(0, 2)}
                  </div>
                  <h3 style={{ color: "#000000", fontSize: "22px", fontWeight: 800, marginBottom: "10px", lineHeight: 1.2 }}>{member.name}</h3>
                  <p style={{ color: "#FF5E2C", fontSize: "16px", fontWeight: 700, marginBottom: "10px" }}>{member.role}</p>
                  <p style={{ color: "#6B7280", fontSize: "15px", lineHeight: 1.6, marginBottom: "6px" }}>{member.dept}</p>
                  <p style={{ color: "#9CA3AF", fontSize: "13px", marginBottom: "28px" }}>Batch {member.year}</p>
                  <div className="flex gap-2">
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="btn-secondary-light text-xs py-1.5 px-3 gap-1">
                        <Link2 size={12} /> LinkedIn
                      </a>
                    )}
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="btn-secondary-light text-xs py-1.5 px-3 gap-1">
                        <Mail size={12} /> Email
                      </a>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Teams — ChromaGrid */}
      <section style={{ background: "#000000", paddingTop: "96px", paddingBottom: "72px" }}>
        <div style={{ maxWidth: "1440px", width: "100%", margin: "0 auto", paddingInline: "48px" }}>

          {/* Badge */}
          <FadeIn>
            <span className="section-tag" style={{ background: "rgba(255,94,44,0.12)", borderColor: "rgba(255,94,44,0.25)", color: "#FF5E2C", fontSize: "14px", letterSpacing: "1.5px" }}>
              Departments
            </span>
          </FadeIn>

          {/* Heading — 24px below badge */}
          <FadeIn delay={0.05}>
            <h2 className="font-black" style={{ color: "#FFFFFF", fontSize: "clamp(24px, 4vw, 36px)", lineHeight: 1.1, marginTop: "24px" }}>
              Department Members
            </h2>
          </FadeIn>

          {/* Filter + ChromaGrid — no extra inner wrapper, inherit 1400px container */}
          <div>

            {/* Filter bar — 40px below heading */}
            <FadeIn delay={0.1}>
              {/* flex-wrap on mobile, nowrap on desktop — chips fill full width via flex:1 */}
              <div className="flex flex-wrap lg:flex-nowrap items-center gap-3" style={{ marginTop: "40px", width: "100%" }}>
                {[
                  { label: "All", key: "All" },
                  ...teams.map((t) => ({ label: deptShort[t.team] ?? t.team, key: t.team, color: t.color })),
                ].map((tab) => {
                  const isActive = activeTeam === tab.key;
                  const chipColor = (tab as { color?: string }).color ?? "#FF5E2C";
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTeam(tab.key)}
                      style={{
                        flex: "1 1 110px",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "44px",
                        padding: "0 22px",
                        borderRadius: "9999px",
                        fontSize: "15px",
                        fontWeight: 500,
                        letterSpacing: "0.15px",
                        whiteSpace: "nowrap",
                        cursor: "pointer",
                        border: isActive ? `1px solid ${chipColor}` : "1px solid rgba(255,255,255,0.12)",
                        background: isActive ? chipColor : "rgba(255,255,255,0.04)",
                        color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.5)",
                        boxShadow: isActive ? `0 2px 16px ${chipColor}55` : "none",
                        transition: "background 0.25s ease, color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
                        outline: "none",
                        textAlign: "center",
                      }}
                      onMouseEnter={(e) => {
                        const btn = e.currentTarget as HTMLButtonElement;
                        if (!isActive) {
                          btn.style.background = "rgba(255,255,255,0.09)";
                          btn.style.color = "#FFFFFF";
                          btn.style.borderColor = "rgba(255,255,255,0.22)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        const btn = e.currentTarget as HTMLButtonElement;
                        if (!isActive) {
                          btn.style.background = "rgba(255,255,255,0.04)";
                          btn.style.color = "rgba(255,255,255,0.5)";
                          btn.style.borderColor = "rgba(255,255,255,0.12)";
                        }
                      }}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </FadeIn>

            {/* ChromaGrid — 40px below filter bar */}
            <motion.div
              key={activeTeam}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginTop: "40px" }}
            >
              <CouncilShowcase members={visibleMembers} />
          </motion.div>

            {/* Count */}
            <div className="mt-8 flex items-center gap-2 justify-center" style={{ color: "rgba(255,255,255,0.25)" }}>
              <Users size={14} />
              <span className="text-sm">{visibleMembers.length} member{visibleMembers.length !== 1 ? "s" : ""}</span>
            </div>

          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section style={{ background: "#FFFFFF", paddingTop: "96px", paddingBottom: "96px" }}>
        <div style={{ maxWidth: "1440px", width: "100%", margin: "0 auto", paddingInline: "48px" }}>
        <FadeIn className="text-center">
          <span className="section-tag" style={{ marginBottom: "32px" }}>Join the Team</span>
          <h2 className="text-4xl font-black" style={{ color: "#000000", marginBottom: "32px" }}>Want to Be Part of CIE Council?</h2>
          <p className="text-lg" style={{ color: "#374151", marginBottom: "40px" }}>
            Recruitment for the 2025–26 council opens in July. Apply to join any
            of our teams and help shape the future of innovation at MLRIT.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">Apply for Council</button>
            <button className="btn-secondary-light">Learn More</button>
          </div>
        </FadeIn>
        </div>
      </section>
    </div>
  );
}
