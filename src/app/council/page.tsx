"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link2, Mail, Users, ChevronDown, ChevronUp, Code, Palette, Camera, PenLine, Mic, BarChart2, FileText } from "lucide-react";
import ChromaGrid from "@/components/ui/ChromaGrid";
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
  { name: "Dr. Ganesh Miriyala", role: "Head – CIE, Asst. Professor", dept: "Electronics & Communication Engineering" },
  { name: "Dr. A. Vivek Anand", role: "Professor", dept: "Aerospace Engineering" },
  { name: "Dr. Amritha Saha", role: "Asst. Professor", dept: "Humanities & Sciences" },
  { name: "Dr. Sumana Das", role: "Associate Professor", dept: "Electrical & Electronics Engineering" },
  { name: "Mr. J. Laxmi Prasad", role: "Asst. Professor", dept: "Mechanical Engineering" },
  { name: "Mrs. I. Sapthami", role: "Asst. Professor", dept: "Computer Science & Engineering" },
  { name: "Mrs. Lakshmi Saritha", role: "Asst. Professor", dept: "Computer Science & Machine Learning" },
  { name: "Mrs. A. Sravanthi", role: "Asst. Professor", dept: "Computer Science & Design" },
  { name: "Mrs. A. Nirisha", role: "Asst. Professor", dept: "Computer Science & IT" },
  { name: "Mr. D. Sandeep", role: "Asst. Professor", dept: "Information Technology" },
  { name: "Mr. M. Raju Naik", role: "Asst. Professor", dept: "Electronics & Communication Engineering" },
  { name: "Mr. K. Pithamber", role: "Asst. Professor", dept: "Electronics & Communication Engineering" },
  { name: "Mr. Md. Sirajuddin", role: "Asst. Professor", dept: "MBA" },
  { name: "Mr. K. Arun Kumar", role: "Asst. Professor", dept: "Aerospace Engineering" },
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
    color: "#4A7CDB",
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
    color: "#CCBA11",
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
    color: "#BE5BFA",
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
    color: "#68DEF8",
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
    color: "#FA7712",
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
    color: "#D01010",
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
    color: "#14E31D",
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
            <div style={{ padding: "8px 24px 28px", display: "grid", gap: "32px", gridTemplateColumns: "repeat(1, 1fr)" }}
              className="sm:[grid-template-columns:repeat(2,1fr)] lg:[grid-template-columns:repeat(3,1fr)] xl:[grid-template-columns:repeat(4,1fr)]">
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

      {/* Faculty */}
      <section style={{ background: "#FFFFFF", paddingTop: "64px", paddingBottom: "48px" }}>
        <div className="page-container">
          <FadeIn className="mb-8">
            <span className="section-tag" style={{ fontSize: "14px", letterSpacing: "1.5px" }}>Faculty</span>
            <h2 className="font-black mt-4" style={{ color: "#000000", fontSize: "clamp(24px, 4vw, 36px)", lineHeight: 1.1 }}>Faculty Coordinators</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
            {facultyCoordinators.map((member) => (
              <div key={member.name} className="rounded-2xl card-light group" style={{ padding: "28px 32px" }}>
                <div className="flex items-center gap-5 mb-5">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-black flex-shrink-0"
                    style={{ background: "rgba(255,94,44,0.10)", color: "#FF5E2C" }}>
                    {member.name.split(" ").map((n) => n[0]).join("").substring(0, 2)}
                  </div>
                  <div>
                    <p style={{ color: "#000000", fontSize: "17px", fontWeight: 800, lineHeight: 1.3 }}>{member.name}</p>
                    <p style={{ color: "#FF5E2C", fontSize: "14px", fontWeight: 700, marginTop: "8px" }}>{member.role}</p>
                    <p style={{ color: "#6B7280", fontSize: "13px", marginTop: "8px" }}>{member.dept}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                      className="btn-secondary-light text-xs py-1.5 px-3 gap-1">
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
            ))}
          </div>
        </div>
      </section>

      {/* Student Leadership */}
      <section style={{ background: "#FFFFFF", paddingTop: "48px", paddingBottom: "64px" }}>
        <div className="page-container">
          <FadeIn className="mb-8">
            <span className="section-tag" style={{ fontSize: "14px", letterSpacing: "1.5px" }}>Leadership</span>
            <h2 className="font-black mt-4" style={{ color: "#000000", fontSize: "clamp(24px, 4vw, 36px)", lineHeight: 1.1 }}>Student Leadership 2024–25</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-6 items-stretch">
            {studentLeadership.map((member) => (
              <FadeIn key={member.name} className="flex flex-col">
                <div className="rounded-2xl card-light relative overflow-hidden"
                  style={{ flex: 1, borderColor: "rgba(255,94,44,0.20)", minHeight: "280px", padding: "32px" }}>
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10"
                    style={{ background: "#FF5E2C", transform: "translate(30%, -30%)" }} />
                  <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black mb-6"
                    style={{ background: "rgba(255,94,44,0.10)", color: "#FF5E2C" }}>
                    {member.name.split(" ").map((n) => n[0]).join("").substring(0, 2)}
                  </div>
                  <h3 style={{ color: "#000000", fontSize: "20px", fontWeight: 800, marginBottom: "12px", lineHeight: 1.2 }}>{member.name}</h3>
                  <p style={{ color: "#FF5E2C", fontSize: "16px", fontWeight: 700, marginBottom: "12px" }}>{member.role}</p>
                  <p style={{ color: "#6B7280", fontSize: "15px", lineHeight: 1.6, marginBottom: "8px" }}>{member.dept}</p>
                  <p style={{ color: "#9CA3AF", fontSize: "13px", marginBottom: "24px" }}>Batch {member.year}</p>
                  <div className="flex gap-2">
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                        className="btn-secondary-light text-xs py-1.5 px-3 gap-1">
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
      <section className="pb-16" style={{ background: "#000000", paddingTop: "88px" }}>
        <div className="page-container">
          <FadeIn className="mb-10">
            <span className="section-tag" style={{ background: "rgba(255,94,44,0.12)", borderColor: "rgba(255,94,44,0.25)", color: "#FF5E2C", fontSize: "14px", letterSpacing: "1.5px" }}>
              Departments
            </span>
            <h2 className="font-black" style={{ color: "#FFFFFF", fontSize: "clamp(24px, 4vw, 36px)", lineHeight: 1.1, marginTop: "20px", marginBottom: "56px" }}>Department Members</h2>

            {/* Filter chips */}
            <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              {[
                { label: "All", key: "All" },
                ...teams.map((t) => ({ label: deptShort[t.team] ?? t.team, key: t.team, color: t.color })),
              ].map((tab) => {
                const isActive = activeTeam === tab.key;
                const chipColor = (tab as { color?: string }).color ?? "#F97316";
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTeam(tab.key)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: "90px",
                      height: "44px",
                      padding: "0 20px",
                      borderRadius: "9999px",
                      fontSize: "15px",
                      fontWeight: 500,
                      letterSpacing: "0.2px",
                      whiteSpace: "nowrap",
                      cursor: "pointer",
                      border: isActive ? `1.5px solid ${chipColor}` : "1.5px solid #3A3A3A",
                      background: isActive ? chipColor : "rgba(255,255,255,0.05)",
                      color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.55)",
                      boxShadow: isActive ? `0 0 18px ${chipColor}55, 0 2px 8px rgba(0,0,0,0.3)` : "none",
                      transition: "all 0.25s ease",
                      outline: "none",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.11)";
                        (e.currentTarget as HTMLButtonElement).style.color = "#FFFFFF";
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.25)";
                      } else {
                        (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.03)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
                        (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.55)";
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "#3A3A3A";
                      }
                      (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </FadeIn>

          {/* ChromaGrid */}
          <motion.div
            key={activeTeam}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <ChromaGrid
              items={visibleMembers.map((member) => {
                const hex = member.deptColor.replace("#", "");
                // Falls back to a name-initials avatar in the member's team color.
                // Replace member.photo with a real path ("/council/name.jpg") to use actual photos.
                const avatar = member.photo
                  ? member.photo.split("/").map((seg) => encodeURIComponent(seg)).join("/")
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=${hex}&color=fff&size=300&bold=true&format=png`;
                return {
                  image: avatar,
                  title: member.name,
                  subtitle: member.role,
                  handle: deptShort[member.department] ?? member.department,
                  borderColor: member.deptColor,
                  gradient: `linear-gradient(155deg, ${member.deptColor}22 0%, #0a0a0a 100%)`,
                  url: member.linkedin,
                };
              })}
              radius={800}
              columns={6}
              damping={2}
              fadeOut={0.6}
            />
          </motion.div>

          {/* Count */}
          <div className="mt-6 flex items-center gap-2 justify-center" style={{ color: "rgba(255,255,255,0.30)" }}>
            <Users size={14} />
            <span className="text-sm">{visibleMembers.length} member{visibleMembers.length !== 1 ? "s" : ""}</span>
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section style={{ background: "linear-gradient(160deg, #FFFFFF 0%, #FFFFFF 50%, #FFFFFF 100%)", paddingTop: "96px", paddingBottom: "96px" }}>
        <FadeIn className="page-container text-center">
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
      </section>
    </div>
  );
}
