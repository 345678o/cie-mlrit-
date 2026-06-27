"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import { Link2, Mail, Users, ChevronDown, ChevronUp, Code, Palette, Camera, PenLine, Mic, BarChart2, FileText } from "lucide-react";
import Link from "next/link";
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


const studentLeadership: Member[] = [
  { name: "Name Placeholder",  role: "President",      dept: "Technical",            year: "2026-27", linkedin: "#", email: "", photo: "" },
  { name: "Name Placeholder",  role: "Vice President", dept: "Operations & Finance", year: "2026-27", linkedin: "#", email: "", photo: "" },
  { name: "Name Placeholder",  role: "Secretary",      dept: "Operations & Finance", year: "2026-27", linkedin: "#", email: "", photo: "" },
  { name: "Name Placeholder",  role: "Treasurer",      dept: "Operations & Finance", year: "2026-27", linkedin: "#", email: "", photo: "" },
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
      { name: "Ghanashyam Kodekandla", role: "Member", dept: "Tech", photo: "/council/tech/Ghanashyam Kodekandla.png",linkedin:"https://www.linkedin.com/in/ghanashyamkodekandla" },
      { name: "Keertan Kuppili",       role: "Member", dept: "Tech", photo: "/council/tech/Keertan Kuppili .png", linkedin: "https://www.linkedin.com/in/keertan-kuppili-b652b2290/"},
      { name: "T.S Siddarth",          role: "Member", dept: "Tech", photo: "/council/tech/T.S Siddarth.png",linkedin: "#"},
      { name: "Teja Jagathi",          role: "Member", dept: "Tech", photo: "/council/tech/Teja Jagathi.png" ,linkedin: "https://www.linkedin.com/in/teja-jagathi"},
      { name: "Abhiram Ganji",         role: "Member", dept: "Tech", photo: "/council/tech/Abhiram Ganji.png" ,linkedin:"#"},
      { name: "Anuj Lomte",            role: "Member", dept: "Tech", photo: "/council/tech/Anuj Lomte.png" ,linkedin: "https://www.linkedin.com/in/anuj-lomte-918b90344/"},
      { name: "Anamika",               role: "Member", dept: "Tech", photo: "/council/tech/Anamika.jpeg" , linkedin: "https://www.linkedin.com/in/anamikak3131/"},
      { name: "Guna Sai Marni",        role: "Member", dept: "Tech", photo: "/council/tech/Guna Sai Marni.png" ,linkedin: "#"},
      { name: "Jaikar Midithuri",      role: "Member", dept: "Tech", photo: "/council/tech/Jaikar Midithuri.png",linkedin: "https://www.linkedin.com/in/jaikar-midithuri-136614369/"},
      { name: "Athava Sri Pavan",      role: "Member", dept: "Tech", photo: "/council/tech/Athava Sri Pavan.png",linkedin: "https://www.linkedin.com/in/a-sri-pavan-772b8b344/"},
      { name: "Katepally Tribhuvan",   role: "Member", dept: "Tech", photo: "/council/tech/Katepally Tribhuvan.png",linkedin: "https://www.linkedin.com/in/tribhuvan-katepally-30639b335/"},
      { name: "Yashwanth Abhishek",    role: "Member", dept: "Tech", photo: "/council/tech/yashwanth abhishek.png",linkedin: "https://www.linkedin.com/in/yashwanth-abhishek-4626a8323/"},
      { name: "Abhinav Sai",           role: "Member", dept: "Tech", photo: "/council/tech/Abhinav Sai.png",linkedin: "http://www.linkedin.com/in/abhiinavsaig"},
      { name: "Guguloth Adithya Jadhav", role: "Member", dept: "Tech", photo: "/council/tech/Guguloth Adithya Jadhav.png",linkedin:"https://www.linkedin.com/in/adithyajadhav/" },
      { name: "Gannoji Vedik",         role: "Member", dept: "Tech", photo: "/council/tech/Gannoji Vedik.png" ,linkedin:"https://www.linkedin.com/in/vedik-gannoji/"},
      
    ],
  },
  {
    team: "Content",
    color: "#D9C500",
    description: "Produces all written and editorial output for CIE — blog posts, event write-ups, newsletters, captions, and long-form content that tell our story across every channel.",
    members: [
      { name: "Jayadeep",        role: "Member", dept: "Content", photo: "/council/content/Jayadeep.png",linkedin:"https://www.linkedin.com/in/jayadeep-tadakamalla-780077374/" },
      { name: "Prashansa",       role: "Member", dept: "Content", photo: "/council/content/Prashansa .png",linkedin:"https://www.linkedin.com/in/prashansa-b-92218b2b6" },
      { name: "Haritha",         role: "Member", dept: "Content", photo: "/council/content/Haritha.png",linkedin:"#" },
      { name: "Harshitha",       role: "Member", dept: "Content", photo: "/council/content/Harshitha.png",linkedin:"https://www.linkedin.com/in/harshitha-bollepalli-a5b198345" },
      { name: "Ennawar Rithvik", role: "Member", dept: "Content", photo: "/council/content/Ennawar Rithvik .png",linkedin:"https://www.linkedin.com/in/rithvik-e-4a4936341/" },
      { name: "Shiva",           role: "Member", dept: "Content", photo: "/council/content/Shiva.png",linkedin:"https://www.linkedin.com/in/jatavath-shiva-14099338a" },
      { name: "K S Sreesanth",   role: "Member", dept: "Content", photo: "/council/content/K S Sreesanth.png",linkedin:"https://www.linkedin.com/in/sreesanth-ks-29ab92344" },
    ],
  },
  {
    team: "Creative",
    color: "#B65CFF",
    description: "Drives CIE's creative direction and campaigns — ideating themes, managing brand consistency, and building the visual + conceptual identity behind every initiative.",
    members: [
         { name: "Harika Y",          role: "Member", dept: "Creative", photo: "/council/creatives/Harika Y.png",linkedin:"https://www.linkedin.com/in/y-harika-34a391305" },
         { name: "Sai Krishna",       role: "Member", dept: "Creative", photo: "/council/creatives/Sai Krishna.png",linkedin:"https://www.linkedin.com/in/varahala-sai-krishna-46a1b82a4" },
         { name: "Sushaanth",         role: "Member", dept: "Creative", photo: "/council/creatives/sushaanth.png",linkedin:"https://www.linkedin.com/in/sushanth-mandumula-0496bb2b6" },
         { name: "Durga Mahesh",      role: "Member", dept: "Creative", photo: "/council/creatives/Durga Mahesh.png",linkedin:"https://www.linkedin.com/in/durgamahesh-kolukuri" },
         { name: "Cheeda Shamilini",  role: "Member", dept: "Creative", photo: "/council/creatives/Cheeda Shamilini.png",linkedin:"https://www.linkedin.com/in/cheeda-shamilini-naidu-47419a345/" },
         { name: "D Pearl Angelina",  role: "Member", dept: "Creative", photo: "/council/creatives/D Pearl Angelina.png",linkedin:"https://www.linkedin.com/in/pearl-angelina-529705283" },
         { name: "Sadwika Chedimala", role: "Member", dept: "Creative", photo: "/council/creatives/Sadwika Chedimala.png",linkedin:"https://www.linkedin.com/in/sadwika-chedimala-758167387/" },
         { name: "Hansika Jella",     role: "Member", dept: "Creative", photo: "/council/creatives/Hansika Jella.png",linkedin:"https://www.linkedin.com/in/hansika-jella-01b079380" },
    ],
  },
  {
    team: "GD — Graphic Design",
    color: "#61D4F4",
    description: "Shapes the visual identity of CIE — designing posters, decks, social assets, UI mockups, and motion content that make every event and campaign look world-class.",
    members: [
      { name: "Vivek Vardhan",           role: "Member", dept: "GD", photo: "/council/GD/Veivek vardhan.png",linkedin:"https://www.linkedin.com/in/muchinthala-vivek-vardhan-m-0086b9404/" },
      { name: "Avinash",                  role: "Member", dept: "GD", photo: "/council/GD/Avinash.png",linkedin:"https://www.linkedin.com/in/avinash-avi-b49119254" },
      { name: "Chanikya",                 role: "Member", dept: "GD", photo: "/council/GD/chanikya.png",linkedin:"https://www.linkedin.com/in/amancha-chanikya" },
       { name: "Sri Thejitha",             role: "Member", dept: "GD", photo: "/council/GD/Sri Thejitha .png" , linkedin: "http://www.linkedin.com/in/sri-thejitha-76a712374"},
      { name: "Yeruva Indu Reddy",        role: "Member", dept: "GD", photo: "/council/GD/Yeruva Indu Reddy.png",linkedin:"https://www.linkedin.com/in/yeruva-indu-972476345/" },
      { name: "A Farhana Sultana",        role: "Member", dept: "GD", photo: "/council/GD/A Farhana Sultana.png",linkedin:"https://www.linkedin.com/in/achugatla-farhana-sultana-361b94344/" },
      { name: "Mounith Varma Akkala",     role: "Member", dept: "GD", photo: "/council/GD/Mounith Varma Akkala .png",linkedin:"https://www.linkedin.com/in/mounith-varma-akkala-in/" },
      { name: "Bangari Nikitha",          role: "Member", dept: "GD", photo: "/council/GD/Bangari Nikitha.png",linkedin:"https://www.linkedin.com/in/bangari-nikitha-2b61aa345" },
      { name: "Poloju RajaVivek",         role: "Member", dept: "GD", photo: "/council/GD/Poloju RajaVivek.png",linkedin:"https://www.linkedin.com/in/rajavivek-poloju-5a0ba3344/" },
      { name: "Tannidi Durga Karthikeya", role: "Member", dept: "GD", photo: "/council/GD/Tannidi Durga Karthikeya .png",linkedin:"http://www.linkedin.com/in/karthik-undefined-1a972a314" },
      { name: "Kodali Pranav Chandra",    role: "Member", dept: "GD", photo: "/council/GD/Kodali Pranav Chandra.png",linkedin:"https://www.linkedin.com/in/pranav-chandra-kodali-3566b033b/" },
     
    ],
  },
  {
    team: "Photography",
    color: "#FF7A1A",
    description: "Captures every moment of the CIE journey — from hackathon late nights to summit keynotes — through photography, videography, and professional post-production.",
    members: [
      { name: "Priyanshu Roy",     role: "Member", dept: "Photography", photo: "/council/photography/Priyanshu Roy.png",linkedin:"https://www.linkedin.com/in/priyanshu-roy-154a39246" },
      { name: "Anguluri Shiva",    role: "Member", dept: "Photography", photo: "/council/photography/Anguluri Shiva.png",linkedin:"#" },
      { name: "Mattam Shivani",    role: "Member", dept: "Photography", photo: "/council/photography/Mattam Shivani.png",linkedin:"https://www.linkedin.com/in/shivani-mattam-91602b2a5/" },
      { name: "Vavilala Sai Ganesh", role: "Member", dept: "Photography", photo: "/council/photography/Vavilala Sai Ganesh.png",linkedin:"https://www.linkedin.com/in/vavilala-sai-ganesh-25028b3b5/" },
      { name: "K.SAI VARSHITH",    role: "Member", dept: "Photography", photo: "/council/photography/K.SAI VARSHITH.png",linkedin:"https://www.linkedin.com/in/k-sai-varshith-123462345/" },
      { name: "Gorli Mahesh",      role: "Member", dept: "Photography", photo: "/council/photography/Gorli Mahesh.png",linkedin:"https://www.linkedin.com/in/mahesh-gorli-314b89344" },
      { name: "Anam Mounika",      role: "Member", dept: "Photography", photo: "/council/photography/Anam Mounika .png",linkedin:"https://www.linkedin.com/in/mounika-r-20a621316/" },
      { name: "Gothuri Rishith",   role: "Member", dept: "Photography", photo: "/council/photography/Gothuri Rishith.png",linkedin:"https://in.linkedin.com/in/gothuri-rishith-kumar-51390a3bb" },
      { name: "Sai Vashist",       role: "Member", dept: "Photography", photo: "/council/photography/Sai Vashist.png",linkedin:"https://www.linkedin.com/in/vashist23021409" },
      { name: "Konthum Bhruhathi", role: "Member", dept: "Photography", photo: "/council/photography/Konthum Bhruhathi .png",linkedin:"https://www.linkedin.com/in/bhruhathi-konthum-a50755387" },
    ],
  },
  {
    team: "P&S — Public Speaking",
    color: "#E53935",
    description: "Represents CIE in every room — anchoring events, running communication workshops, handling PR, and making sure CIE's message lands clearly with every audience.",
    members: [
      { name: "Sai Mihir Ramaraju",    role: "Member", dept: "P&S", photo: "/council/p&s/Sai Mihir Ramaraju.png",linkedin:"#" },
      { name: "Yashashri Penikalapti", role: "Member", dept: "P&S", photo: "/council/p&s/Yashashri Penikalapti.png",linkedin:"https://www.linkedin.com/in/yashashripenikalapati" },
      { name: "Bandaru Mahith Naidu",  role: "Member", dept: "P&S", photo: "/council/p&s/Bandaru Mahith Naidu.png",linkedin:"https://www.linkedin.com/in/bandarumahithnaidu/" },
      { name: "Sanjana Kovuru",        role: "Member", dept: "P&S", photo: "/council/p&s/Sanjana Kovuru.png",linkedin:"https://www.linkedin.com/in/sanjana-kovuru-18b55b31a/" },
      { name: "Adithya Ganesh",        role: "Member", dept: "P&S", photo: "/council/p&s/Adithya Ganesh.png",linkedin:"https://www.linkedin.com/in/adithya-ganesh-487860398/" },
      { name: "Rithish Kumar",         role: "Member", dept: "P&S", photo: "/council/p&s/Rithish Kumar.png",linkedin:"https://www.linkedin.com/in/rithish-kumar-418242363/" },
    ],
  },
  {
    team: "Ops — Operations & Finance",
    color: "#22C55E",
    description: "Keeps everything running — coordinating logistics for every event, managing budgets, vendor relations, and making sure no detail falls through the cracks.",
    members: [
       { name: "Dheeraj Kumar",     role: "Member", dept: "Ops", photo: "/council/OPS/Dheeraj Kumar.png",linkedin:"#" },
      { name: "Mahima Tatineni",   role: "Member", dept: "Ops", photo: "/council/OPS/Mahima Tatineni.png",linkedin:"https://www.linkedin.com/in/mahima-tatineni" },
      { name: "Aarthi",            role: "Member", dept: "Ops", photo: "/council/OPS/Aarthi.png",linkedin:"https://www.linkedin.com/in/aarthi-reddy-b-626241350/" },
      { name: "Vinay",             role: "Member", dept: "Ops", photo: "/council/OPS/Vinay.png",linkedin:"https://www.linkedin.com/in/dsdvinay" },
      { name: "Bhavana",           role: "Member", dept: "Ops", photo: "/council/OPS/Bhavana .png",linkedin:"https://www.linkedin.com/in/bhavana-inakollu-8698a2395" },
      { name: "A Sai Ganesh",      role: "Member", dept: "Ops", photo: "/council/OPS/ASaiGanesh.png",linkedin:"https://www.linkedin.com/in/sai-ganesh-alleshwaram-a30832316" },
      { name: "Manukonda Tarun",   role: "Member", dept: "Ops", photo: "/council/OPS/Manukonda Tarun.png",linkedin:"https://www.linkedin.com/in/tarun-manukonda-9a5b97344" },
      { name: "Tharun",            role: "Member", dept: "Ops", photo: "/council/OPS/Tharun.png",linkedin:"https://www.linkedin.com/in/tharun-emmadisetti-590ba3344" },
      { name: "M Vasanth Vardhan", role: "Member", dept: "Ops", photo: "/council/OPS/M Vasanth vardhan.png",linkedin:"https://www.linkedin.com/in/vasanth-vardhan-maricherla-21783231a/" },
    ],
  },
];

const deptShort: Record<string, string> = {
  "Tech": "Technical & Product Development",
  "Content": "Content Writing",
  "Creative": "Creative",
  "GD — Graphic Design": "Graphic Design",
  "Photography": "Photography",
  "P&S — Public Speaking": "Promotions & Sponsorship",
  "Ops — Operations & Finance": "Operations & Finance",
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
                <h3 className="text-base font-black" style={{ color: "#000000" }}>{deptShort[section.team] ?? section.team}</h3>
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
  { value: `${teams.reduce((s, t) => s + t.members.length, 0) + studentLeadership.length}+`, label: "Total Members" },
  { value: `${teams.length}`, label: "Active Teams" },
  { value: "2024–25", label: "Current Batch" },
];

const heroCards = [
  { icon: Code, label: "Tech", count: `${teams[0].members.length} members`, detail: "Frontend · Backend · AI/ML · Apps", accent: "rgba(255,94,44,0.15)", color: "#FF5E2C" },
  { icon: Palette, label: "GD — Graphic Design", count: `${teams[2].members.length} members`, detail: "UI/UX · Illustration · Motion · Print", accent: "rgba(255,133,51,0.15)", color: "#FF7A50" },
  { icon: Mic, label: "P&S — Public Speaking", count: `${teams[4].members.length} members`, detail: "Anchoring · PR · Workshops · Events", accent: "rgba(124,58,237,0.15)", color: "#7C3AED" },
];

// ── Council Showcase — notched triangle cards ─────────────────────
const CS_NOTCH = "polygon(0 0, 100% 0, 100% calc(100% - 32px), calc(100% - 32px) 100%, 0 100%)";
type ShowcaseMember = Member & { department: string; deptColor: string };

function CouncilShowcase({ members }: { members: ShowcaseMember[] }) {
  const [active, setActive] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const isTouch = useRef(false);
  const RADIUS = 800;

  const applyChroma = useCallback(() => {
    const grid = gridRef.current;
    if (!grid || isTouch.current) return;
    const gridRect = grid.getBoundingClientRect();
    cardRefs.current.forEach((card) => {
      if (!card) return;
      const r = card.getBoundingClientRect();
      const cx = r.left + r.width / 2 - gridRect.left;
      const cy = r.top + r.height / 2 - gridRect.top;
      const dist = Math.sqrt((mouse.current.x - cx) ** 2 + (mouse.current.y - cy) ** 2);
      const t = Math.min(1, Math.max(0, (dist - RADIUS * 0.15) / (RADIUS * 0.85)));
      card.style.setProperty("--cs-gray", String(t));
      card.style.setProperty("--cs-bright", String(1 - t * 0.32));
    });
  }, []);

  const schedule = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => { rafRef.current = null; applyChroma(); });
  }, [applyChroma]);

  const handleMove = useCallback((e: React.PointerEvent) => {
    if (isTouch.current) return;
    const r = gridRef.current!.getBoundingClientRect();
    mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    schedule();
  }, [schedule]);

  const handleLeave = useCallback(() => {
    if (isTouch.current) return;
    mouse.current = { x: -9999, y: -9999 };
    cardRefs.current.forEach((c) => { if (c) { c.style.setProperty("--cs-gray", "1"); c.style.setProperty("--cs-bright", "0.70"); } });
  }, []);

  useEffect(() => {
    isTouch.current = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    cardRefs.current.forEach((c) => {
      if (!c) return;
      if (isTouch.current) { c.style.setProperty("--cs-gray", "0"); c.style.setProperty("--cs-bright", "1"); }
      else { c.style.setProperty("--cs-gray", "1"); c.style.setProperty("--cs-bright", "0.70"); }
    });
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [members]);

  return (
    <>
      <div ref={gridRef} className="cs-grid" onPointerMove={handleMove} onPointerLeave={handleLeave}>
        {members.map((m, i) => {
          const encoded = m.photo
            ? m.photo.split("/").map((seg) => encodeURIComponent(seg)).join("/")
            : null;
          const flat = encoded
            ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=0a0a0a&color=9aa&size=400&bold=true&format=png`;
          const hero = encoded
            ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=${m.deptColor.replace("#", "")}&color=fff&size=400&bold=true&format=png`;
          const isActive = active === i;
          const scatter = i % 2 === 0 ? -26 : 26;
          return (
            <button
              key={`${m.department}-${m.name}-${i}`}
              ref={(el) => { cardRefs.current[i] = el; }}
              type="button"
              onClick={() => {
                if (isActive && m.linkedin && m.linkedin !== "#") {
                  window.open(m.linkedin, "_blank", "noopener,noreferrer");
                } else {
                  setActive(isActive ? null : i);
                }
              }}
              aria-pressed={isActive}
              className="cs-card"
              style={{
                background: "transparent", border: "none", padding: 0, cursor: "pointer", textAlign: "left",
                transform: `translateY(${isActive ? 0 : scatter}px)`,
                transition: "transform .55s cubic-bezier(.16,1,.3,1)",
              }}
            >
              <div style={{
                position: "relative", aspectRatio: "4 / 5",
                filter: isActive ? `drop-shadow(0 22px 50px ${m.deptColor}66)` : "none",
                transition: "filter .45s ease",
              }}>
                <div className="cs-chroma-wrap" style={{ position: "absolute", inset: 0 }}>
                  <div style={{
                    position: "absolute", inset: 0, clipPath: CS_NOTCH,
                    background: isActive ? m.deptColor : "rgba(255,255,255,0.16)",
                    transition: "background .4s ease",
                  }} />
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
                        objectFit: "cover", objectPosition: "top center",
                        transform: isActive ? "scale(1.06)" : "scale(1)",
                        transition: "transform .55s cubic-bezier(.16,1,.3,1)",
                      }}
                    />
                    {m.linkedin && m.linkedin !== "#" && (
                      <div className="cs-li-overlay">
                        <div className="cs-li-badge">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFFFFF">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                          <span>LinkedIn</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "3px", paddingTop: "12px", paddingInline: "4px" }}>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: isActive ? "15px" : "13px", lineHeight: 1.2, color: isActive ? "#FFFFFF" : "rgba(255,255,255,0.82)", transition: "all .3s ease", overflowWrap: "anywhere" }}>{m.name}</span>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "11px", letterSpacing: "0.3px", color: isActive ? m.deptColor : "rgba(255,255,255,0.45)", transition: "all .3s ease" }}>{deptShort[m.department] ?? m.department}</span>
              </div>
            </button>
          );
        })}
      </div>
      <style>{`
        .cs-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: clamp(18px,2.5vw,32px) clamp(16px,2vw,28px); padding-top: 30px; padding-bottom: 30px; align-items: start; }
        @media (max-width: 639px)  { .cs-card { transform: none !important; } }
        @media (min-width: 640px)  { .cs-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 1024px) { .cs-grid { grid-template-columns: repeat(4, 1fr); } }
        .cs-chroma-wrap { filter: grayscale(var(--cs-gray, 0)) brightness(var(--cs-bright, 1)); transition: filter 0.55s cubic-bezier(.16,1,.3,1); }
        .cs-card[aria-pressed="true"] .cs-chroma-wrap { filter: none !important; }
        .cs-li-overlay { position: absolute; inset: 0; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 16px; background: linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 55%); opacity: 0; transition: opacity 0.25s ease; pointer-events: none; }
        .cs-card:hover .cs-li-overlay { opacity: 1; }
        .cs-li-badge { display: inline-flex; align-items: center; gap: 6px; background: #0A66C2; color: #fff; font-family: var(--font-body); font-size: 12px; font-weight: 700; padding: 6px 12px; border-radius: 999px; letter-spacing: 0.02em; transform: translateY(6px); transition: transform 0.25s ease; }
        .cs-card:hover .cs-li-badge { transform: translateY(0); }
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
          { value: "2024–25", label: "Current Batch" },
        ]}
        watermark="TEAM"
      />

      {/* ── Shared container constant ── max-width 1400px, 32px inline padding */}

      {/* Student Leadership */}
      <section style={{ background: "#FFFFFF", paddingTop: "clamp(48px,8vw,96px)", paddingBottom: "clamp(48px,8vw,96px)" }}>
        <div style={{ maxWidth: "1440px", width: "100%", margin: "0 auto", paddingInline: "clamp(16px,4vw,48px)" }}>
          <FadeIn>
            <span className="section-tag" style={{ fontSize: "14px", letterSpacing: "1.5px" }}>Leadership</span>
            <h2 className="font-black" style={{ color: "#000000", fontSize: "clamp(24px, 4vw, 36px)", lineHeight: 1.1, marginTop: "24px" }}>Student Leadership 2026–27</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-8 items-stretch" style={{ marginTop: "40px" }}>
            {studentLeadership.map((member, i) => (
              <FadeIn key={`${member.role}-${i}`} className="flex flex-col">
                <div className="rounded-2xl card-light relative overflow-hidden"
                  style={{ flex: 1, borderColor: "rgba(255,94,44,0.20)", minHeight: "280px", padding: "clamp(24px,4vw,40px)" }}>
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
                    style={{ background: "#FF5E2C", transform: "translate(30%, -30%)" }} />
                  {member.photo ? (
                    <div className="w-20 h-20 rounded-full mb-6 overflow-hidden flex-shrink-0">
                      <img
                        src={member.photo.split("/").map((seg) => encodeURIComponent(seg)).join("/")}
                        alt={member.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black mb-6"
                      style={{ background: "rgba(255,94,44,0.10)", color: "#FF5E2C" }}>
                      {member.name.split(" ").map((n) => n[0]).join("").substring(0, 2)}
                    </div>
                  )}
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
      <section style={{ background: "#000000", paddingTop: "clamp(48px,8vw,96px)", paddingBottom: "clamp(40px,6vw,72px)" }}>
        <div style={{ maxWidth: "1440px", width: "100%", margin: "0 auto", paddingInline: "clamp(16px,4vw,48px)" }}>

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
              <div className="flex flex-wrap lg:flex-nowrap items-center gap-2" style={{ marginTop: "clamp(24px,3vw,40px)", width: "100%" }}>
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
                        flex: "1 1 clamp(80px,12vw,110px)",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "clamp(36px,5vw,44px)",
                        padding: "0 clamp(12px,2vw,22px)",
                        borderRadius: "9999px",
                        fontSize: "clamp(12px,1.5vw,15px)",
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

            {/* Council cards — triangle notch shape + chroma mouse-proximity effect on desktop */}
            <motion.div
              key={activeTeam}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginTop: "40px" }}
            >
              <CouncilShowcase members={visibleMembers} />
            </motion.div>


          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section style={{ background: "#FFFFFF", paddingTop: "clamp(48px,8vw,96px)", paddingBottom: "clamp(48px,8vw,96px)" }}>
        <div style={{ maxWidth: "1440px", width: "100%", margin: "0 auto", paddingInline: "clamp(16px,4vw,48px)" }}>
        <FadeIn className="text-center">
          <span className="section-tag" style={{ marginBottom: "32px" }}>Join the Team</span>
          <h2 className="text-4xl font-black" style={{ color: "#000000", marginBottom: "32px" }}>Want to Be Part of CIE Council?</h2>
          <p className="text-lg" style={{ color: "#374151", marginBottom: "40px" }}>
            Recruitment for the 2025–26 council opens in July. Apply to join any
            of our teams and help shape the future of innovation at MLRIT.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/join" className="btn-primary">Apply for Council</Link>
            <button className="btn-secondary-light">Learn More</button>
          </div>
        </FadeIn>
        </div>
      </section>
    </div>
  );
}
