"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Eye, Heart, Award, Users, BookOpen, Link2, Mail, ImageOff } from "lucide-react";
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
    name: "Dr. Rajesh Kumar",
    designation: "Director, CIE",
    dept: "Computer Science & Engineering",
    expertise: "AI & Machine Learning",
    bio: "Leading CIE's vision and strategic direction, guiding students from ideation to impactful ventures.",
    linkedin: "#",
    email: "rajesh@mlrit.ac.in",
    confirmed: false,
  },
  {
    name: "Prof. Anitha Reddy",
    designation: "Faculty Coordinator",
    dept: "Electronics & Communication",
    expertise: "IoT & Embedded Systems",
    bio: "Bridging hardware and software, mentoring students building connected devices and embedded products.",
    linkedin: "#",
    email: "anitha@mlrit.ac.in",
    confirmed: false,
  },
  {
    name: "Dr. Suresh Babu",
    designation: "Faculty Advisor",
    dept: "Mechanical Engineering",
    expertise: "Product Design & Manufacturing",
    bio: "Guiding product-first startups through design thinking, prototyping, and manufacturing readiness.",
    linkedin: "#",
    email: "suresh@mlrit.ac.in",
    confirmed: false,
  },
  {
    name: "Prof. Kavitha Sharma",
    designation: "Faculty Coordinator",
    dept: "MBA",
    expertise: "Business Strategy & Finance",
    bio: "Helping student founders build sustainable business models, navigate finance, and pitch to investors.",
    linkedin: "#",
    email: "kavitha@mlrit.ac.in",
    confirmed: false,
  },
];

/* ─── Faculty card ───────────────────────────────────────────────── */
function FacultyCard({ member }: { member: FacultyMember }) {
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div
      className="card-light flex flex-col"
      style={{ borderRadius: "16px", overflow: "hidden" }}
    >
      {/* Photo / placeholder */}
      <div
        style={{
          position: "relative",
          height: "200px",
          background: "linear-gradient(145deg, rgba(232,82,26,0.06) 0%, rgba(232,82,26,0.02) 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
          />
        ) : (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "72px", height: "72px", borderRadius: "50%",
                background: `${ORANGE}14`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-heading)", fontWeight: 900,
                fontSize: "24px", color: ORANGE,
              }}
            >
              {initials}
            </div>
            {!member.confirmed && (
              <span
                style={{
                  display: "flex", alignItems: "center", gap: "5px",
                  fontSize: "10px", fontWeight: 600, letterSpacing: "0.06em",
                  color: T_MUTED,
                  background: "rgba(0,0,0,0.04)",
                  border: "1px solid rgba(0,0,0,0.08)",
                  padding: "3px 10px", borderRadius: "999px",
                }}
              >
                <ImageOff size={10} /> Photo Coming Soon
              </span>
            )}
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: "clamp(18px,3vw,26px)", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3
          style={{
            fontFamily: "var(--font-heading)", fontWeight: 800,
            fontSize: "17px", color: T_HEAD, letterSpacing: "-0.01em",
            marginBottom: "4px",
          }}
        >
          {member.name}
        </h3>
        <p style={{ fontSize: "13px", fontWeight: 700, color: ORANGE, marginBottom: "2px" }}>
          {member.designation}
        </p>
        <p style={{ fontSize: "12px", color: T_MUTED, marginBottom: "12px" }}>
          {member.dept}
        </p>
        <p
          style={{
            fontSize: "13.5px", lineHeight: 1.68, color: T_BODY,
            flex: 1, marginBottom: "14px",
          }}
        >
          {member.bio}
        </p>
        <span
          style={{
            display: "inline-block", fontSize: "10.5px", fontWeight: 700,
            letterSpacing: "0.05em", padding: "3px 10px", borderRadius: "999px",
            background: `${ORANGE}0d`, color: ORANGE,
            border: `1px solid ${ORANGE}22`, marginBottom: "16px",
          }}
        >
          {member.expertise}
        </span>
        <div style={{ display: "flex", gap: "8px" }}>
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary-light"
              style={{ fontSize: "12px", padding: "6px 12px", gap: "5px" }}
            >
              <Link2 size={11} /> LinkedIn
            </a>
          )}
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="btn-secondary-light"
              style={{ fontSize: "12px", padding: "6px 12px", gap: "5px" }}
            >
              <Mail size={11} /> Email
            </a>
          )}
        </div>
      </div>
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

      {/* ── Faculty & Mentors ─────────────────────────────────────── */}
      <section style={{ background: BG_WHITE, ...SECTION_PY }}>
        <div className="page-container">
          <FadeIn>
            <SectionHeader
              tag="Faculty & Mentors"
              heading="Our Leadership Board"
              sub="Meet the faculty who guide CIE — details and photographs will be updated after college confirmation."
            />
          </FadeIn>

          {/* Placeholder notice */}
          <FadeIn delay={0.05}>
            <div
              style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "14px 20px", borderRadius: "10px",
                background: `${ORANGE}08`,
                border: `1px solid ${ORANGE}20`,
                marginBottom: "clamp(28px,4vw,44px)",
              }}
            >
              <div
                style={{
                  width: "8px", height: "8px", borderRadius: "50%",
                  background: ORANGE, flexShrink: 0,
                }}
              />
              <p style={{ fontSize: "13.5px", color: T_BODY, lineHeight: 1.6 }}>
                <strong style={{ color: T_HEAD }}>Placeholder section.</strong>{" "}
                Faculty photographs and final details will be added once confirmed by the college.
                Profile cards below show the layout structure — replace data in{" "}
                <code style={{ fontSize: "12px", background: "rgba(0,0,0,0.06)", padding: "1px 6px", borderRadius: "4px" }}>
                  about/page.tsx → faculty[]
                </code>{" "}
                to update.
              </p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {faculty.map((member, i) => (
              <FadeIn key={member.name} delay={i * 0.08}>
                <FacultyCard member={member} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
