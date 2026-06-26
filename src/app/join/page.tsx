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

const teams: TeamSection[] = [
  {
    team: "Tech",
    color: "#2563EB",
    description: "Builds and maintains CIE's digital infrastructure — from the website and internal tools to AI experiments and mobile apps. The Tech team turns every idea into a working product.",
    members: [
      { name: "Abhiram",               role: "Member", dept: "Tech", photo: "/council/tech/abhiram.jpg" },
      { name: "Anuj",                  role: "Member", dept: "Tech", photo: "/council/tech/anuj.jpg" },
      { name: "Dasam Pranay",          role: "Member", dept: "Tech", photo: "/council/tech/dasam-pranay.webp" },
      { name: "Ghanashyam Kodekandla", role: "Member", dept: "Tech", photo: "/council/tech/ghanashyam-kodekandla.jpg" },
      { name: "Guna Sai",              role: "Member", dept: "Tech", photo: "/council/tech/guna-sai.jpg" },
      { name: "Jaikar",                role: "Member", dept: "Tech", photo: "/council/tech/jaikar.jpg" },
      { name: "Keertan Kuppili",       role: "Member", dept: "Tech", photo: "/council/tech/keertan-kuppili.png" },
      { name: "Pavan",                 role: "Member", dept: "Tech", photo: "/council/tech/pavan.jpeg" },
      { name: "Teja",                  role: "Member", dept: "Tech", photo: "/council/tech/teja.jpg" },
      { name: "Tribhuvan",             role: "Member", dept: "Tech", photo: "/council/tech/tribhuvan.jpg" },
      { name: "Yashwanth Abhishek",    role: "Member", dept: "Tech", photo: "/council/tech/yashwanth-abhishek.jpg" },
      { name: "Abhinav Sai",           role: "Member", dept: "Tech", photo: "/council/tech/abhinav-sai.jpg" },
      { name: "Adithya Jadhav",        role: "Member", dept: "Tech", photo: "/council/tech/adithya-jadhav.jpg" },
      { name: "Vedik",                 role: "Member", dept: "Tech", photo: "/council/tech/vedik.jpg" },
    ],
  },
  {
    team: "Content",
    color: "#CA8A04",
    description: "Produces all written and editorial output for CIE — blog posts, event write-ups, newsletters, captions, and long-form content that tell our story across every channel.",
    members: [
      { name: "Haritha",   role: "Member", dept: "Content", photo: "/council/content/haritha.jpg" },
      { name: "Harshitha", role: "Member", dept: "Content", photo: "/council/content/harshitha.jpeg" },
      { name: "Jayadeep",  role: "Member", dept: "Content", photo: "/council/content/jayadeep.jpg" },
      { name: "Prashansa", role: "Member", dept: "Content", photo: "/council/content/prashansa.jpg" },
      { name: "Rithvik",   role: "Member", dept: "Content", photo: "/council/content/rithvik.jpg" },
      { name: "Shiva",     role: "Member", dept: "Content", photo: "/council/content/shiva.jpg" },
      { name: "Sreesanth", role: "Member", dept: "Content", photo: "/council/content/sreesanth.jpg" },
    ],
  },
  {
    team: "Creative",
    color: "#9333EA",
    description: "Drives CIE's creative direction and campaigns — ideating themes, managing brand consistency, and building the visual + conceptual identity behind every initiative.",
    members: [
      { name: "Cheeda Shamilini", role: "Member", dept: "Creative", photo: "/council/creatives/Cheeda Shamilini_.jpg" },
      { name: "Harika",           role: "Member", dept: "Creative", photo: "/council/creatives/harika.jpg" },
      { name: "K. Durgamahesh",   role: "Member", dept: "Creative", photo: "/council/creatives/k-durgamahesh.png" },
      { name: "Pearl Angelina",   role: "Member", dept: "Creative", photo: "/council/creatives/pearl-angelina.jpg" },
      { name: "Sadwika",          role: "Member", dept: "Creative", photo: "/council/creatives/sadwika.png" },
      { name: "Saikrishna",       role: "Member", dept: "Creative", photo: "/council/creatives/saikrishna.jpg" },
      { name: "Sushaanth",        role: "Member", dept: "Creative", photo: "/council/creatives/sushaanth.jpg" },
      { name: "Jella Hansika",    role: "Member", dept: "Creative", photo: "/council/creatives/jella-hansika.jpg" },
    ],
  },
  {
    team: "GD — Graphic Design",
    color: "#0891B2",
    description: "Shapes the visual identity of CIE — designing posters, decks, social assets, UI mockups, and motion content that make every event and campaign look world-class.",
    members: [
      { name: "Anuja",                   role: "Member", dept: "GD", photo: "/council/gd/anuja.jpg" },
      { name: "Avinash",                 role: "Member", dept: "GD", photo: "/council/gd/avinash.jpg" },
      { name: "Chanikya",                role: "Member", dept: "GD", photo: "/council/gd/chanikya.png" },
      { name: "Farhana",                 role: "Member", dept: "GD", photo: "/council/gd/farhana.jpg" },
      { name: "Mounith Varma Akkala",    role: "Member", dept: "GD", photo: "/council/gd/mounith-varma-akkala.jpg" },
      { name: "Nikitha Bangari",         role: "Member", dept: "GD", photo: "/council/gd/nikitha-bangari.jpg" },
      { name: "Raja Vivek",              role: "Member", dept: "GD", photo: "/council/gd/rajavivek.jpg" },
      { name: "Tannidi Durga Karthikeya",role: "Member", dept: "GD", photo: "/council/gd/tannidi-durga-karthikeya.jpeg" },
      { name: "Vivek Vardhan",           role: "Member", dept: "GD", photo: "/council/gd/vivek-vardhan.jpg" },
      { name: "Pranav",                  role: "Member", dept: "GD", photo: "/council/gd/pranav.jpg" },
      { name: "Srithejitha",             role: "Member", dept: "GD", photo: "/council/gd/srithejitha.jpg" },
    ],
  },
  {
    team: "Photography",
    color: "#EA580C",
    description: "Captures every moment of the CIE journey — from hackathon late nights to summit keynotes — through photography, videography, and professional post-production.",
    members: [
      { name: "Bhruhathi Konthum", role: "Member", dept: "Photography", photo: "/council/photography/bhruhathi-konthum.jpg" },
      { name: "Ganesh",            role: "Member", dept: "Photography", photo: "/council/photography/ganesh.jpg" },
      { name: "K. Sai Varshith",   role: "Member", dept: "Photography", photo: "/council/photography/k-sai-varshith.jpeg" },
      { name: "Mahesh",            role: "Member", dept: "Photography", photo: "/council/photography/mahesh.jpg" },
      { name: "Mounika Reddy",     role: "Member", dept: "Photography", photo: "/council/photography/mounika-reddy.jpg" },
      { name: "Priyanshu",         role: "Member", dept: "Photography", photo: "/council/photography/priyanshu.jpg" },
      { name: "Shiva",             role: "Member", dept: "Photography", photo: "/council/photography/shiva.jpg" },
      { name: "Shivani",           role: "Member", dept: "Photography", photo: "/council/photography/shivani.png" },
    ],
  },
  {
    team: "P&S — Public Speaking",
    color: "#DC2626",
    description: "Represents CIE in every room — anchoring events, running communication workshops, handling PR, and making sure CIE's message lands clearly with every audience.",
    members: [
      { name: "Sai Mihir Ramaraju",   role: "Member", dept: "P&S", photo: "/council/ps/sai-mihir-ramaraju.jpeg" },
      { name: "Sanjana",              role: "Member", dept: "P&S", photo: "/council/ps/sanjana.jpg" },
      { name: "Yashashri Penikalapti",role: "Member", dept: "P&S", photo: "/council/ps/yashashri-penikalapti.jpg" },
      { name: "Adithya Ganesh",       role: "Member", dept: "P&S", photo: "/council/ps/adithya-ganesh.jpg" },
    ],
  },
  {
    team: "Ops — Operations & Finance",
    color: "#16A34A",
    description: "Keeps everything running — coordinating logistics for every event, managing budgets, vendor relations, and making sure no detail falls through the cracks.",
    members: [
      { name: "Aarthi",          role: "Member", dept: "Ops", photo: "/council/ops/aarthi.jpg" },
      { name: "Bhavana",         role: "Member", dept: "Ops", photo: "/council/ops/bhavana.jpg" },
      { name: "Dheeraj Kumar",   role: "Member", dept: "Ops", photo: "/council/ops/dheeraj-kumar.jpg" },
      { name: "Mahima Tatineni", role: "Member", dept: "Ops", photo: "/council/ops/mahima-tatineni.jpg" },
      { name: "Sai Ganesh",      role: "Member", dept: "Ops", photo: "/council/ops/sai-ganesh.jpg" },
      { name: "Tarun",           role: "Member", dept: "Ops", photo: "/council/ops/tarun.jpg" },
      { name: "Tharun",          role: "Member", dept: "Ops", photo: "/council/ops/tharun.jpg" },
      { name: "Vasanth",         role: "Member", dept: "Ops", photo: "/council/ops/vasanth.jpeg" },
      { name: "Vinay",           role: "Member", dept: "Ops", photo: "/council/ops/vinay.jpg" },
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

function MemberCard({ member, showContact = false, color = "#FF5E2C" }: { member: Member; showContact?: boolean; color?: string }) {
  const initials = member.name.split(" ").map((n) => n[0]).join("").substring(0, 2);
  const bg = `${color}14`;
  return (
    <div className="p-5 rounded-xl card-light group">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0"
          style={{ background: bg, color }}>
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm truncate" style={{ color: "#000000" }}>{member.name}</p>
          <p className="text-xs font-semibold mt-0.5" style={{ color }}>{member.role}</p>
          <p className="text-xs mt-0.5 truncate" style={{ color: "#6B7280" }}>{member.dept}</p>
        </div>
        {showContact && (
          <div className="flex gap-2">
            {member.linkedin && (
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: bg, color }}>
                <Link2 size={12} />
              </a>
            )}
            {member.email && (
              <a href={`mailto:${member.email}`}
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: bg, color }}>
                <Mail size={12} />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
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
            <p className="px-6 pb-4 text-sm leading-relaxed" style={{ color: "#6B7280" }}>
              {section.description}
            </p>
            <div className="px-6 pb-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3 items-stretch">
              {section.members.map((member) => (
                <MemberCard key={member.name} member={member} color={section.color} />
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

            {/* Filter tabs */}
            <div className="flex flex-wrap gap-3">
              {[
                { label: "All", key: "All" },
                ...teams.map((t) => ({ label: deptShort[t.team] ?? t.team, key: t.team, color: t.color })),
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTeam(tab.key)}
                  className="px-7 py-3 rounded-full text-base font-semibold transition-all"
                  style={{
                    background: activeTeam === tab.key
                      ? ((tab as { color?: string }).color ?? "#FF5E2C")
                      : "rgba(255,255,255,0.06)",
                    color: activeTeam === tab.key ? "#FFFFFF" : "rgba(255,255,255,0.60)",
                    border: `1.5px solid ${activeTeam === tab.key ? ((tab as { color?: string }).color ?? "#FF5E2C") : "rgba(255,255,255,0.12)"}`,
                  }}
                >
                  {tab.label}
                </button>
              ))}
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
                  ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=${hex}&color=fff&size=300&bold=true&format=png`;
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
              radius={300}
              columns={3}
              damping={0.45}
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
