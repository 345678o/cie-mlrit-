"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link2, Mail, Users, ChevronDown, ChevronUp, Code, Palette, Camera, PenLine, Mic, BarChart2 } from "lucide-react";
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
  members: Member[];
};

const facultyCoordinators: Member[] = [
  { name: "Dr. Rajesh Kumar", role: "Director, CIE", dept: "Computer Science & Engineering", linkedin: "#", email: "rajesh@mlrit.ac.in" },
  { name: "Prof. Anitha Reddy", role: "Faculty Coordinator", dept: "Electronics & Communication", linkedin: "#", email: "anitha@mlrit.ac.in" },
  { name: "Dr. Suresh Babu", role: "Faculty Advisor", dept: "Mechanical Engineering", linkedin: "#", email: "suresh@mlrit.ac.in" },
];

const studentLeadership: Member[] = [
  { name: "Karan Gupta", role: "President", dept: "CSE Final Year", year: "2024-25", linkedin: "#", email: "president@ciemlrit.in" },
  { name: "Sneha Patel", role: "Vice President", dept: "ECE Final Year", year: "2024-25", linkedin: "#", email: "vp@ciemlrit.in" },
];

const teams: TeamSection[] = [
  {
    team: "Tech",
    color: "#FF5E2C",
    members: [
      { name: "Rohit Sharma", role: "Tech Lead", dept: "CSE — 3rd Year", linkedin: "#" },
      { name: "Divya Krishnan", role: "Frontend Developer", dept: "CSE — 2nd Year", linkedin: "#" },
      { name: "Amit Sinha", role: "Backend Developer", dept: "CSE — 3rd Year", linkedin: "#" },
      { name: "Nisha Rao", role: "AI / ML Engineer", dept: "IT — 2nd Year", linkedin: "#" },
      { name: "Karthik Menon", role: "App Developer", dept: "CSE — 3rd Year", linkedin: "#" },
    ],
  },
  {
    team: "Creative",
    color: "#3B82F6",
    members: [
      { name: "Meera Iyer", role: "Creative Lead", dept: "MBA — 2nd Year", linkedin: "#" },
      { name: "Aditya Kumar", role: "Content Writer", dept: "CSE — 3rd Year", linkedin: "#" },
      { name: "Kavya Sharma", role: "Social Media Manager", dept: "ECE — 2nd Year", linkedin: "#" },
      { name: "Nikhil Bhat", role: "Copywriter", dept: "IT — 3rd Year", linkedin: "#" },
      { name: "Riya Kapoor", role: "Brand Strategist", dept: "MBA — 1st Year", linkedin: "#" },
    ],
  },
  {
    team: "GD — Graphic Design",
    color: "#FF7A50",
    members: [
      { name: "Priya Nair", role: "Design Lead", dept: "ECE — 3rd Year", linkedin: "#" },
      { name: "Rahul Singh", role: "UI / UX Designer", dept: "CSE — 2nd Year", linkedin: "#" },
      { name: "Anjali Verma", role: "Graphic Designer", dept: "MBA — 1st Year", linkedin: "#" },
      { name: "Rohan Verma", role: "Motion Designer", dept: "CSE — 3rd Year", linkedin: "#" },
      { name: "Preethi Kumar", role: "Illustrator", dept: "IT — 2nd Year", linkedin: "#" },
    ],
  },
  {
    team: "Photography",
    color: "#D94E1F",
    members: [
      { name: "Arjun Mehta", role: "Photography Lead", dept: "ECE — 2nd Year", linkedin: "#" },
      { name: "Pooja Reddy", role: "Videographer", dept: "CSE — 3rd Year", linkedin: "#" },
      { name: "Siddharth Rao", role: "Photo Editor", dept: "MBA — 2nd Year", linkedin: "#" },
      { name: "Ananya Singh", role: "Event Photographer", dept: "ECE — 3rd Year", linkedin: "#" },
    ],
  },
  {
    team: "P&S — Public Speaking",
    color: "#7C3AED",
    members: [
      { name: "Tanvi Patil", role: "P&S Lead", dept: "ECE — 3rd Year", linkedin: "#" },
      { name: "Harsh Gupta", role: "Event Anchor", dept: "CSE — 2nd Year", linkedin: "#" },
      { name: "Shreya Nambiar", role: "Workshop Facilitator", dept: "MBA — 2nd Year", linkedin: "#" },
      { name: "Vikram Desai", role: "PR Executive", dept: "IT — 3rd Year", linkedin: "#" },
      { name: "Ayush Patel", role: "Communication Manager", dept: "CSE — 3rd Year", linkedin: "#" },
    ],
  },
  {
    team: "Ops — Operations & Finance",
    color: "#16A34A",
    members: [
      { name: "Vivek Nair", role: "Operations Lead", dept: "MBA — 2nd Year", linkedin: "#" },
      { name: "Shruti Joshi", role: "Finance Manager", dept: "CSE — 3rd Year", linkedin: "#" },
      { name: "Manish Kumar", role: "Event Coordinator", dept: "MBA — 1st Year", linkedin: "#" },
      { name: "Deepa Pillai", role: "Logistics Head", dept: "ECE — 3rd Year", linkedin: "#" },
      { name: "Surya Teja", role: "Accounts Manager", dept: "MBA — 2nd Year", linkedin: "#" },
    ],
  },
];

const deptShort: Record<string, string> = {
  "Tech": "Technical",
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
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: bg }}>
              <Icon size={18} style={{ color: section.color }} />
            </div>
            <h3 className="text-lg font-black" style={{ color: "#000000" }}>{section.team}</h3>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
              style={{ background: bg, color: section.color }}>
              {section.members.length} members
            </span>
          </div>
          {expanded
            ? <ChevronUp size={18} style={{ color: "#9CA3AF" }} />
            : <ChevronDown size={18} style={{ color: "#9CA3AF" }} />}
        </button>
        {expanded && (
          <div id={accordionId} className="px-6 pb-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3 items-start">
            {section.members.map((member) => (
              <MemberCard key={member.name} member={member} color={section.color} />
            ))}
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
          { value: "3", label: "Faculty Advisors" },
          { value: "2024–25", label: "Current Batch" },
        ]}
        watermark="TEAM"
      />

      {/* Faculty */}
      <section className="py-20" style={{ background: "#FFFFFF" }}>
        <div className="page-container">
          <FadeIn className="mb-10">
            <span className="section-tag">Faculty</span>
            <h2 className="text-3xl font-black mt-2" style={{ color: "#000000" }}>Faculty Coordinators</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start">
            {facultyCoordinators.map((member) => (
              <div key={member.name} className="p-6 rounded-2xl card-light group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-black"
                    style={{ background: "rgba(255,94,44,0.10)", color: "#FF5E2C" }}>
                    {member.name.split(" ").map((n) => n[0]).join("").substring(0, 2)}
                  </div>
                  <div>
                    <p className="font-black" style={{ color: "#000000" }}>{member.name}</p>
                    <p className="text-sm font-semibold" style={{ color: "#FF5E2C" }}>{member.role}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>{member.dept}</p>
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
      <section className="py-20" style={{ background: "#FFFFFF" }}>
        <div className="page-container">
          <FadeIn className="mb-10">
            <span className="section-tag">Leadership</span>
            <h2 className="text-3xl font-black mt-2" style={{ color: "#000000" }}>Student Leadership 2024–25</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-6 items-stretch">
            {studentLeadership.map((member) => (
              <FadeIn key={member.name}>
                <div className="p-8 rounded-2xl card-light relative overflow-hidden"
                  style={{ borderColor: "rgba(255,94,44,0.20)" }}>
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10"
                    style={{ background: "#FF5E2C", transform: "translate(30%, -30%)" }} />
                  <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black mb-4"
                    style={{ background: "rgba(255,94,44,0.10)", color: "#FF5E2C" }}>
                    {member.name.split(" ").map((n) => n[0]).join("").substring(0, 2)}
                  </div>
                  <h3 className="text-xl font-black mb-1" style={{ color: "#000000" }}>{member.name}</h3>
                  <p className="font-bold mb-1" style={{ color: "#FF5E2C" }}>{member.role}</p>
                  <p className="text-sm mb-1" style={{ color: "#6B7280" }}>{member.dept}</p>
                  <p className="text-xs mb-5" style={{ color: "#9CA3AF" }}>Batch {member.year}</p>
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
      <section className="py-20" style={{ background: "#000000" }}>
        <div className="page-container">
          <FadeIn className="mb-10">
            <span className="section-tag" style={{ background: "rgba(255,94,44,0.12)", borderColor: "rgba(255,94,44,0.25)", color: "#FF5E2C" }}>
              Departments
            </span>
            <h2 className="text-4xl font-black mt-2 mb-8" style={{ color: "#FFFFFF" }}>Department Members</h2>

            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { label: "All", key: "All" },
                ...teams.map((t) => ({ label: deptShort[t.team] ?? t.team, key: t.team, color: t.color })),
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTeam(tab.key)}
                  className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
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
      <section className="py-24" style={{ background: "linear-gradient(160deg, #FFFFFF 0%, #FFFFFF 50%, #FFFFFF 100%)" }}>
        <FadeIn className="page-container text-center">
          <span className="section-tag">Join the Team</span>
          <h2 className="text-4xl font-black mt-4 mb-6" style={{ color: "#000000" }}>Want to Be Part of CIE Council?</h2>
          <p className="mb-8 text-lg" style={{ color: "#374151" }}>
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
