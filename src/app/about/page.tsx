"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Eye, Heart, Award, Users, BookOpen } from "lucide-react";
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

const objectives = [
  "Foster a culture of innovation, creativity, and entrepreneurial thinking among students",
  "Provide access to state-of-the-art facilities, tools, and resources for prototype development",
  "Connect students with industry mentors, investors, and successful entrepreneurs",
  "Support student-led startups from ideation through market launch",
  "Organize hackathons, workshops, boot camps, and speaker series",
  "Build a vibrant ecosystem that bridges academia and industry",
];

const values = [
  { icon: Target, title: "Innovation First", desc: "We prioritize creative problem-solving and disruptive thinking in everything we do." },
  { icon: Users, title: "Collaboration", desc: "Great ideas emerge when diverse minds work together toward a shared vision." },
  { icon: Heart, title: "Student-Centric", desc: "Every decision, every resource, and every program is designed with our students in mind." },
  { icon: Award, title: "Excellence", desc: "We hold ourselves to the highest standards in programs, facilities, and outcomes." },
  { icon: BookOpen, title: "Continuous Learning", desc: "We embrace failure as a learning opportunity and growth as a constant pursuit." },
  { icon: Eye, title: "Transparency", desc: "Open communication and honest feedback form the foundation of our community." },
];

const achievements = [
  { number: "1000+", label: "Students Mentored" },
  { number: "50+", label: "Active Projects" },
  { number: "20+", label: "Startup Launches" },
  { number: "₹50L+", label: "Funding Raised" },
  { number: "100+", label: "Industry Partners" },
  { number: "5+", label: "Awards Won" },
];

const faculty = [
  { name: "Dr. Rajesh Kumar", role: "Director, CIE", dept: "Computer Science & Engineering", expertise: "AI & Machine Learning" },
  { name: "Prof. Anitha Reddy", role: "Faculty Coordinator", dept: "Electronics & Communication", expertise: "IoT & Embedded Systems" },
  { name: "Dr. Suresh Babu", role: "Faculty Advisor", dept: "Mechanical Engineering", expertise: "Product Design & Manufacturing" },
  { name: "Prof. Kavitha Sharma", role: "Faculty Coordinator", dept: "MBA", expertise: "Business Strategy & Finance" },
];

const visionMission = [
  {
    icon: Eye,
    title: "Our Vision",
    content: "To be the premier innovation ecosystem in South India — a place where bold ideas meet real-world impact, and where every student has the tools and support to become an entrepreneur.",
  },
  {
    icon: Target,
    title: "Our Mission",
    content: "To cultivate an entrepreneurial mindset across MLRIT by providing students with mentorship, funding access, world-class infrastructure, and experiential programs that bridge education with industry.",
  },
];

const heroStats = [
  { value: "1000+", label: "Students Mentored" },
  { value: "20+", label: "Startup Launches" },
  { value: "₹50L+", label: "Funding Raised" },
  { value: "100+", label: "Industry Partners" },
];

const heroCards = [
  { label: "Achievement", title: "1000+ Students mentored since founding", accent: "rgba(255,94,44,0.12)", color: "#FF5E2C" },
  { label: "Milestone", title: "20+ funded startups launched by students", accent: "rgba(22,163,74,0.12)", color: "#16A34A" },
  { label: "Recognition", title: "5+ national awards for innovation excellence", accent: "rgba(124,58,237,0.12)", color: "#7C3AED" },
];

export default function AboutPage() {
  return (
    <div style={{ background: "#FFFFFF", position: "relative" }}>
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
          { value: "20+", label: "Startup Launches" },
          { value: "₹50L+", label: "Funding Raised" },
          { value: "100+", label: "Industry Partners" },
        ]}
        watermark="ABOUT"
      />

      {/* Introduction */}
      <section className="py-20" style={{ background: "#FFFFFF" }}>
        <div className="page-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <span className="section-tag">Our Story</span>
              <h2 className="text-4xl font-black mt-4 mb-6" style={{ color: "#000000" }}>Built to Empower, Designed to Inspire</h2>
              <p className="leading-relaxed mb-6" style={{ color: "#374151" }}>
                CIE was established with a singular vision: to create an environment where student
                innovators could thrive. We recognized that the next great startup could emerge from
                any classroom, any lab, or any dormitory — and we set out to provide the scaffolding
                for that potential.
              </p>
              <p className="leading-relaxed" style={{ color: "#374151" }}>
                Today, CIE serves as the innovation nerve center of MLRIT, offering world-class
                facilities, mentorship from industry veterans, and a community of like-minded peers
                who push each other to think bigger and build better.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="grid grid-cols-2 gap-4 items-stretch justify-items-center">
                {achievements.map((item) => (
                  <div key={item.label} className="p-6 rounded-xl text-center card-light">
                    <div className="text-3xl font-black mb-2" style={{ color: "#FF5E2C" }}>{item.number}</div>
                    <p className="text-sm font-medium" style={{ color: "#374151" }}>{item.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24" style={{ background: "#FFFFFF" }}>
        <div className="page-container">
          <FadeIn className="text-center mb-16">
            <span className="section-tag">Direction</span>
            <h2 className="text-4xl lg:text-5xl font-black mt-2" style={{ color: "#000000" }}>Vision & Mission</h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {visionMission.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.15}>
                <div className="p-10 rounded-2xl h-full card-light relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5"
                    style={{ background: "#FF5E2C", transform: "translate(30%, -30%)" }} />
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                    style={{ background: "rgba(255,94,44,0.08)" }}>
                    <item.icon size={28} style={{ color: "#FF5E2C" }} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: "#000000" }}>{item.title}</h3>
                  <p className="leading-relaxed text-lg" style={{ color: "#374151" }}>{item.content}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-24" style={{ background: "#FFFFFF" }}>
        <div className="page-container">
          <FadeIn className="mb-16">
            <span className="section-tag">What We Aim For</span>
            <h2 className="text-4xl lg:text-5xl font-black mt-2 max-w-lg" style={{ color: "#000000" }}>Our Core Objectives</h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-4 items-start">
            {objectives.map((obj, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="flex items-start gap-4 p-6 rounded-xl card-light">
                  <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0"
                    style={{ background: "#FF5E2C", color: "white" }}>
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <p className="leading-relaxed" style={{ color: "#374151" }}>{obj}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24" style={{ background: "#FFFFFF" }}>
        <div className="page-container">
          <FadeIn className="text-center mb-16">
            <span className="section-tag">What We Stand For</span>
            <h2 className="text-4xl lg:text-5xl font-black mt-2" style={{ color: "#000000" }}>Core Values</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {values.map((val, i) => (
              <FadeIn key={val.title} delay={i * 0.1}>
                <div className="p-8 rounded-2xl h-full card-light">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: "rgba(255,94,44,0.08)" }}>
                    <val.icon size={22} style={{ color: "#FF5E2C" }} />
                  </div>
                  <h3 className="text-lg font-bold mb-3" style={{ color: "#000000" }}>{val.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>{val.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Leadership */}
      <section className="py-24" style={{ background: "#FFFFFF" }}>
        <div className="page-container">
          <FadeIn className="text-center mb-16">
            <span className="section-tag">Leadership</span>
            <h2 className="text-4xl lg:text-5xl font-black mt-2" style={{ color: "#000000" }}>Faculty Leadership</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
            {faculty.map((member, i) => (
              <FadeIn key={member.name} delay={i * 0.1}>
                <div className="p-6 rounded-2xl text-center card-light">
                  <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-black"
                    style={{ background: "rgba(255,94,44,0.1)", color: "#FF5E2C" }}>
                    {member.name.split(" ").slice(-1)[0][0]}
                  </div>
                  <h3 className="font-bold mb-1" style={{ color: "#000000" }}>{member.name}</h3>
                  <p className="text-sm font-semibold mb-1" style={{ color: "#FF5E2C" }}>{member.role}</p>
                  <p className="text-xs mb-3" style={{ color: "#6B7280" }}>{member.dept}</p>
                  <span className="text-xs px-3 py-1 rounded-full"
                    style={{ background: "rgba(255,94,44,0.08)", color: "#FF5E2C", border: "1px solid rgba(255,94,44,0.2)" }}>
                    {member.expertise}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
