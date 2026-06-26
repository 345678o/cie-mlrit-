"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Eye, Heart, Award, Users, BookOpen } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import PageGeometric from "@/components/ui/PageGeometric";

/* ─── Design tokens ──────────────────────────────────────────────── */
const ORANGE   = "#E8521A";
const T_HEAD   = "#000000";
const T_BODY   = "#374151";
const T_MUTED  = "#6B7280";

const SECTION_PY: React.CSSProperties = {
  paddingTop:    "clamp(52px, 8vw, 96px)",
  paddingBottom: "clamp(52px, 8vw, 96px)",
};

const BG_WHITE = "#FFFFFF";
const BG_GRAY  = "#F5F5F5";

/* ─── FadeIn helper ──────────────────────────────────────────────── */
function FadeIn({
  children, delay = 0, className = "",
}: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Section header — used in every section ─────────────────────── */
function SectionHeader({
  tag, heading, sub, center = false,
}: {
  tag: string; heading: string; sub?: string; center?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""} style={{ marginBottom: "clamp(36px, 5vw, 60px)" }}>
      <span className="section-tag">{tag}</span>
      <h2
        style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 800,
          fontSize: "clamp(26px, 4vw, 44px)",
          letterSpacing: "-0.03em",
          color: T_HEAD,
          lineHeight: 1.12,
          marginTop: "10px",
          ...(center ? { maxWidth: "none" } : { maxWidth: "520px" }),
        }}
      >
        {heading}
      </h2>
      {sub && (
        <p
          style={{
            marginTop: "14px",
            fontSize: "clamp(15px, 1.4vw, 17px)",
            lineHeight: 1.72,
            color: T_MUTED,
            maxWidth: "560px",
            ...(center ? { margin: "14px auto 0" } : {}),
          }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

/* ─── Data ───────────────────────────────────────────────────────── */
const achievements = [
  { number: "1000+", label: "Students Mentored" },
  { number: "50+",   label: "Active Projects"   },
  { number: "20+",   label: "Startup Launches"  },
  { number: "₹50L+", label: "Funding Raised"    },
  { number: "100+",  label: "Industry Partners" },
  { number: "5+",    label: "Awards Won"        },
];

const visionMission = [
  {
    icon: Eye,
    title: "Our Vision",
    accent: `${ORANGE}10`,
    content:
      "To be the premier innovation ecosystem in South India — a place where bold ideas meet real-world impact, and where every student has the tools and support to become an entrepreneur.",
  },
  {
    icon: Target,
    title: "Our Mission",
    accent: `${ORANGE}10`,
    content:
      "To cultivate an entrepreneurial mindset across MLRIT by providing students with mentorship, funding access, world-class infrastructure, and experiential programs that bridge education with industry.",
  },
];

const objectives = [
  "Foster a culture of innovation, creativity, and entrepreneurial thinking among students.",
  "Provide access to state-of-the-art facilities, tools, and resources for prototype development.",
  "Connect students with industry mentors, investors, and successful entrepreneurs.",
  "Support student-led startups from ideation through market launch.",
  "Organise hackathons, workshops, boot camps, and speaker series.",
  "Build a vibrant ecosystem that bridges academia and industry.",
];

const values = [
  { icon: Target,   title: "Innovation First",      desc: "We prioritize creative problem-solving and disruptive thinking in everything we do." },
  { icon: Users,    title: "Collaboration",          desc: "Great ideas emerge when diverse minds work together toward a shared vision." },
  { icon: Heart,    title: "Student-Centric",        desc: "Every decision, every resource, and every program is designed with our students in mind." },
  { icon: Award,    title: "Excellence",             desc: "We hold ourselves to the highest standards in programs, facilities, and outcomes." },
  { icon: BookOpen, title: "Continuous Learning",    desc: "We embrace failure as a learning opportunity and growth as a constant pursuit." },
  { icon: Eye,      title: "Transparency",           desc: "Open communication and honest feedback form the foundation of our community." },
];

/* ─── Faculty data ───────────────────────────────────────────────────
   Replace placeholder values with real faculty details once confirmed.
   Add photo: "/faculty/dr-name.jpg" to show an actual photo.
   Set confirmed: true to remove the "Photo Coming Soon" badge.       */
type FacultyMember = {
  name: string;
  designation: string;
  dept: string;
  expertise: string;
  bio: string;
  photo?: string;   // e.g. "/faculty/dr-rajesh-kumar.jpg"
  linkedin?: string;
  email?: string;
  confirmed?: boolean;
};

const faculty: FacultyMember[] = [
  {
    name: "Dr. Ganesh Miriyala",
    designation: "Head – CIE, Asst. Professor",
    dept: "Electronics & Communication Engineering",
    expertise: "Wireless Communication",
    bio: "Leads the Centre for Innovation and Entrepreneurship at MLRIT, guiding students from early-stage ideas to impactful ventures through research and mentorship.",
    confirmed: true,
  },
  {
    name: "Dr. A. Vivek Anand",
    designation: "Professor",
    dept: "Aerospace Engineering",
    expertise: "Aerospace Engineering",
    bio: "Brings deep aerospace expertise to CIE, mentoring student innovators working on propulsion, UAVs, and cutting-edge flight technologies.",
    confirmed: true,
  },
  {
    name: "Dr. Amritha Saha",
    designation: "Asst. Professor",
    dept: "Humanities & Sciences",
    expertise: "Synthetic Organic Chemistry & Material Science",
    bio: "Guides research at the intersection of chemistry and materials, helping students develop novel compounds and sustainable material solutions.",
    confirmed: true,
  },
  {
    name: "Dr. Sumana Das",
    designation: "Associate Professor",
    dept: "Electrical & Electronics Engineering",
    expertise: "Power Systems",
    bio: "Mentors students in energy innovation and smart grid technologies, bridging classroom power systems theory with real-world applications.",
    confirmed: true,
  },
  {
    name: "Mr. J. Laxmi Prasad",
    designation: "Asst. Professor",
    dept: "Mechanical Engineering",
    expertise: "Mechatronics",
    bio: "Champions mechatronics innovation, supporting student teams building autonomous systems, robotics, and integrated electromechanical products.",
    confirmed: true,
  },
  {
    name: "Mrs. I. Sapthami",
    designation: "Asst. Professor",
    dept: "Computer Science & Engineering",
    expertise: "Cloud Computing, ML & IoT",
    bio: "Advises students at the convergence of cloud, machine learning, and IoT — helping build scalable, intelligent connected systems.",
    confirmed: true,
  },
  {
    name: "Mrs. Lakshmi Saritha",
    designation: "Asst. Professor",
    dept: "Computer Science & Machine Learning",
    expertise: "Computer Science & Engineering",
    bio: "Guides student innovators in software development and systems design, fostering problem-solving skills that translate ideas into products.",
    confirmed: true,
  },
  {
    name: "Mrs. A. Sravanthi",
    designation: "Asst. Professor",
    dept: "Computer Science & Design",
    expertise: "Computer Science & Engineering",
    bio: "Supports student projects at the intersection of design and engineering, encouraging creative, user-centered technology solutions.",
    confirmed: true,
  },
  {
    name: "Mrs. A. Nirisha",
    designation: "Asst. Professor",
    dept: "Computer Science & IT",
    expertise: "Machine Learning",
    bio: "Mentors students in applied machine learning, helping teams build data-driven products and research-backed AI solutions.",
    confirmed: true,
  },
  {
    name: "Mr. D. Sandeep",
    designation: "Asst. Professor",
    dept: "Information Technology",
    expertise: "Cloud Computing & ML",
    bio: "Guides student ventures in cloud architecture and machine learning deployment, bridging development and scalable infrastructure.",
    confirmed: true,
  },
  {
    name: "Mr. M. Raju Naik",
    designation: "Asst. Professor",
    dept: "Electronics & Communication Engineering",
    expertise: "Embedded Systems",
    bio: "Champions hardware innovation, mentoring students building embedded products from prototypes to production-ready devices.",
    confirmed: true,
  },
  {
    name: "Mr. K. Pithamber",
    designation: "Asst. Professor",
    dept: "Electronics & Communication Engineering",
    expertise: "VLSI System Design",
    bio: "Guides students in chip design and VLSI methodologies, supporting innovation in semiconductor and hardware product development.",
    confirmed: true,
  },
  {
    name: "Mr. Md. Sirajuddin",
    designation: "Asst. Professor",
    dept: "MBA",
    expertise: "HR & Marketing",
    bio: "Helps student founders build go-to-market strategies, develop leadership skills, and navigate the business side of innovation.",
    confirmed: true,
  },
  {
    name: "Mr. K. Arun Kumar",
    designation: "Asst. Professor",
    dept: "Aerospace Engineering",
    expertise: "Propulsion",
    bio: "Mentors students in propulsion technologies and aerospace systems, supporting innovation in next-generation flight and space ventures.",
    confirmed: true,
  },
];

/* ─── Faculty card ───────────────────────────────────────────────── */
function FacultyCard({ member }: { member: FacultyMember }) {
  const initials = member.name
    .split(" ")
    .filter((n) => /^[A-Za-z]/.test(n))
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div
      className="card-light"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "32px 20px 24px",
        position: "relative",
        height: "100%",
      }}
    >
      {/* Orange top accent */}
      <div
        style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "3px",
          background: `linear-gradient(90deg, ${ORANGE}, ${ORANGE}60)`,
          borderRadius: "16px 16px 0 0",
        }}
      />

      {/* Avatar */}
      <div
        style={{
          width: "68px", height: "68px", borderRadius: "50%",
          background: `${ORANGE}10`,
          border: `2px solid ${ORANGE}28`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-heading)", fontWeight: 900,
          fontSize: "22px", color: ORANGE,
          marginBottom: "18px", flexShrink: 0,
        }}
      >
        {initials}
      </div>

      {/* Name */}
      <h3
        style={{
          fontFamily: "var(--font-heading)", fontWeight: 800,
          fontSize: "clamp(15px, 1.4vw, 18px)", color: T_HEAD,
          letterSpacing: "-0.02em", lineHeight: 1.2,
          marginBottom: "6px",
        }}
      >
        {member.name}
      </h3>

      {/* Designation */}
      <p
        style={{
          fontSize: "clamp(12px, 1.1vw, 14px)", fontWeight: 600,
          color: ORANGE, lineHeight: 1.3, marginBottom: "6px",
        }}
      >
        {member.designation}
      </p>

      {/* Department */}
      <p
        style={{
          fontSize: "13px", color: T_MUTED,
          lineHeight: 1.4, marginBottom: "auto", paddingBottom: "20px",
        }}
      >
        {member.dept}
      </p>

      {/* Expertise badge */}
      <span
        style={{
          display: "inline-block",
          fontSize: "11.5px", fontWeight: 700, letterSpacing: "0.03em",
          padding: "5px 13px", borderRadius: "999px",
          background: `${ORANGE}0e`, color: ORANGE,
          border: `1px solid ${ORANGE}28`,
          lineHeight: 1.4,
        }}
      >
        {member.expertise}
      </span>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <div style={{ background: BG_WHITE, position: "relative" }}>
      <PageGeometric />

      <PageHero
        tag="About CIE"
        line1="BUILT TO"
        line2="EMPOWER"
        line3="INSPIRE"
        scriptText="— the story behind MLRIT CIE"
        description="The MLRIT Centre for Innovation & Entrepreneurship is the beating heart of entrepreneurial culture at MLR Institute of Technology — nurturing the next generation of innovators since our founding."
        stats={[
          { value: "1000+", label: "Students Mentored" },
          { value: "20+",   label: "Startup Launches"  },
          { value: "₹50L+", label: "Funding Raised"    },
          { value: "100+",  label: "Industry Partners" },
        ]}
        watermark="ABOUT"
      />

      {/* ── Our Story ─────────────────────────────────────────────── */}
      <section style={{ background: BG_WHITE, ...SECTION_PY }}>
        <div className="page-container">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">

            {/* Left — text */}
            <FadeIn>
              <SectionHeader
                tag="Our Story"
                heading="Built to Empower, Designed to Inspire"
              />
              <p style={{ fontSize: "clamp(15px,1.4vw,17px)", lineHeight: 1.8, color: T_BODY, marginBottom: "20px" }}>
                CIE was established with a singular vision: to create an environment where student
                innovators could thrive. We recognised that the next great startup could emerge from
                any classroom, any lab, or any dormitory — and we set out to provide the scaffolding
                for that potential.
              </p>
              <p style={{ fontSize: "clamp(15px,1.4vw,17px)", lineHeight: 1.8, color: T_BODY }}>
                Today, CIE serves as the innovation nerve centre of MLRIT, offering world-class
                facilities, mentorship from industry veterans, and a community of like-minded peers
                who push each other to think bigger and build better.
              </p>
            </FadeIn>

            {/* Right — achievement grid */}
            <FadeIn delay={0.15}>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4">
                {achievements.map((item, i) => (
                  <div
                    key={item.label}
                    className="card-light flex flex-col items-center text-center"
                    style={{ padding: "clamp(18px,3vw,28px) clamp(14px,2vw,20px)", borderRadius: "14px" }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-heading)", fontWeight: 900,
                        fontSize: "clamp(24px,3.5vw,32px)", lineHeight: 1,
                        color: ORANGE, letterSpacing: "-0.03em",
                      }}
                    >
                      {item.number}
                    </span>
                    <p style={{ fontSize: "12.5px", color: T_MUTED, marginTop: "6px", fontWeight: 500 }}>
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ── Vision & Mission ──────────────────────────────────────── */}
      <section style={{ background: BG_GRAY, ...SECTION_PY }}>
        <div className="page-container">
          <FadeIn>
            <SectionHeader tag="Direction" heading="Vision & Mission" center />
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            {visionMission.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.12}>
                <div
                  className="card-light h-full relative overflow-hidden"
                  style={{ padding: "clamp(28px,4vw,44px)", borderRadius: "18px" }}
                >
                  {/* Decorative blob */}
                  <div
                    className="absolute top-0 right-0 rounded-full pointer-events-none"
                    style={{
                      width: "130px", height: "130px",
                      background: ORANGE, opacity: 0.05,
                      transform: "translate(35%, -35%)",
                    }}
                  />
                  {/* Icon */}
                  <div
                    style={{
                      width: "52px", height: "52px", borderRadius: "14px",
                      background: `${ORANGE}12`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      marginBottom: "24px",
                    }}
                  >
                    <item.icon size={24} style={{ color: ORANGE }} />
                  </div>
                  {/* Orange rule */}
                  <div style={{ width: "32px", height: "3px", background: ORANGE, borderRadius: "2px", marginBottom: "18px" }} />
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)", fontWeight: 800,
                      fontSize: "22px", letterSpacing: "-0.02em",
                      color: T_HEAD, marginBottom: "14px",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "clamp(15px,1.4vw,17px)", lineHeight: 1.78, color: T_BODY }}>
                    {item.content}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Objectives ───────────────────────────────────────── */}
      <section style={{ background: BG_WHITE, ...SECTION_PY }}>
        <div className="page-container">
          <FadeIn>
            <SectionHeader
              tag="What We Aim For"
              heading="Our Core Objectives"
              sub="Six pillars that guide everything CIE builds, organises, and supports."
            />
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-4 items-stretch">
            {objectives.map((obj, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div
                  className="card-light flex items-start gap-4 h-full"
                  style={{ padding: "clamp(18px,3vw,26px)", borderRadius: "14px" }}
                >
                  <span
                    style={{
                      width: "32px", height: "32px", borderRadius: "50%",
                      background: ORANGE, color: "#FFFFFF",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--font-heading)", fontWeight: 900,
                      fontSize: "12px", flexShrink: 0,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p style={{ fontSize: "clamp(14px,1.3vw,16px)", lineHeight: 1.72, color: T_BODY }}>
                    {obj}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Values ───────────────────────────────────────────── */}
      <section style={{ background: BG_GRAY, ...SECTION_PY }}>
        <div className="page-container">
          <FadeIn>
            <SectionHeader
              tag="What We Stand For"
              heading="Core Values"
              sub="The principles we live by — in our programs, our teams, and our community."
              center
            />
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
            {values.map((val, i) => (
              <FadeIn key={val.title} delay={i * 0.08}>
                <div
                  className="card-light h-full"
                  style={{ padding: "clamp(22px,3vw,34px)", borderRadius: "16px" }}
                >
                  <div
                    style={{
                      width: "44px", height: "44px", borderRadius: "12px",
                      background: `${ORANGE}0f`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      marginBottom: "18px",
                    }}
                  >
                    <val.icon size={20} style={{ color: ORANGE }} />
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-heading)", fontWeight: 800,
                      fontSize: "16px", color: T_HEAD, letterSpacing: "-0.01em",
                      marginBottom: "10px",
                    }}
                  >
                    {val.title}
                  </h3>
                  <p style={{ fontSize: "14px", lineHeight: 1.72, color: T_MUTED }}>
                    {val.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── DPIIT Registered Startups ────────────────────────────── */}
      <section style={{ background: BG_WHITE, ...SECTION_PY }}>
        <div className="page-container">
          <FadeIn>
            <SectionHeader
              tag="Startups from CIE"
              heading="DPIIT Registered Ventures"
              sub="Startups founded by MLRIT students and alumni, officially recognised by the Department for Promotion of Industry and Internal Trade."
            />
          </FadeIn>

          <FadeIn delay={0.1}>
            <div style={{ overflowX: "auto", borderRadius: "16px", border: "1px solid #E5E7EB", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-body)", fontSize: "14px" }}>
                <thead>
                  <tr style={{ background: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
                    {["S.No", "Startup / Venture", "Founder(s)", "DPIIT Certificate No."].map((h) => (
                      <th key={h} style={{ padding: "14px 20px", textAlign: "left", fontWeight: 700, fontSize: "12px", letterSpacing: "0.06em", textTransform: "uppercase", color: T_MUTED, whiteSpace: "nowrap" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { no: 1,  name: "Synergem Consultancy Private Limited",  founders: "Goddati Vijay Kumar, G Kishanlal Sachdev",         cert: "DIPP194600" },
                    { no: 2,  name: "Aczen Technologies Private Limited",     founders: "Umasurya Srinivas",                               cert: "DIPP165419" },
                    { no: 3,  name: "Vish & Vin Travels Private Limited",     founders: "Sai Vindhya",                                     cert: "DIPP184129" },
                    { no: 4,  name: "Marktech Creations Private Limited",     founders: "Yuvraj K, Manish Sagar Ramarapu",                 cert: "DIPP145691" },
                    { no: 5,  name: "Digileaf Technologies Private Limited",  founders: "M David Raju",                                    cert: "DIPP145512" },
                    { no: 6,  name: "Nearpik Technologies Private Limited",   founders: "K V Saketh",                                      cert: "DIPP140592" },
                    { no: 7,  name: "Techaro Innov Private Limited",          founders: "G Rugvedh",                                       cert: "DIPP140747" },
                    { no: 8,  name: "Urbane Vehicles India Private Limited",  founders: "Shreya Katlakunta",                               cert: "DIPP136161" },
                    { no: 9,  name: "Amalyle LLP",                            founders: "Kavirayuni Viswanath Saketh, Kavirayuni Ramadevi", cert: "DIPP109394" },
                    { no: 10, name: "Drones Origin Private Limited",          founders: "Abrar Ahmed",                                     cert: "DIPP104449" },
                  ].map((row, i) => (
                    <tr key={row.no}
                      style={{ borderBottom: i < 9 ? "1px solid #F3F4F6" : "none", transition: "background 0.15s ease" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "#FFF7F5")}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                      <td style={{ padding: "16px 20px", color: T_MUTED, fontWeight: 600, fontSize: "13px", width: "60px" }}>{row.no}</td>
                      <td style={{ padding: "16px 20px", color: T_HEAD, fontWeight: 600, lineHeight: 1.4 }}>{row.name}</td>
                      <td style={{ padding: "16px 20px", color: T_BODY, lineHeight: 1.5 }}>{row.founders}</td>
                      <td style={{ padding: "16px 20px", whiteSpace: "nowrap" }}>
                        <span style={{ display: "inline-block", background: `${ORANGE}12`, color: ORANGE, border: `1px solid ${ORANGE}30`, borderRadius: "8px", padding: "3px 10px", fontSize: "12px", fontWeight: 700, letterSpacing: "0.04em" }}>
                          {row.cert}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Faculty & Mentors ─────────────────────────────────────── */}
      <section style={{ background: BG_GRAY, ...SECTION_PY }}>
        <div className="page-container">
          <FadeIn>
            <SectionHeader
              tag="Faculty & Mentors"
              heading="Our Leadership Board"
              sub="The faculty who guide CIE — bringing expertise from across departments to mentor, advise, and drive innovation at MLRIT."
            />
          </FadeIn>

          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            style={{ alignItems: "stretch" }}
          >
            {faculty.map((member, i) => (
              <FadeIn key={member.name} delay={Math.min(i * 0.05, 0.4)} className="flex flex-col">
                <FacultyCard member={member} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
