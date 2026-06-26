"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Palette, Camera, Mic, Monitor, Lightbulb, Building2, Calendar, CheckCircle } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import PageGeometric from "@/components/ui/PageGeometric";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";

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

const studios = [
  {
    icon: Palette,
    name: "Design Studio",
    desc: "A professional creative workspace equipped with the latest design tools for UI/UX, graphic design, and brand identity projects.",
    equipment: ["iMac Pro workstations (8 units)", "Wacom Intuos Pro tablets", "Adobe Creative Cloud (full suite)", "Figma & Sketch licenses", "High-DPI calibrated displays", "Color proofing printer"],
    hours: "Mon–Sat: 9AM – 8PM",
    capacity: "12 people",
    color: "#FF5E2C",
  },
  {
    icon: Camera,
    name: "Photography Studio",
    desc: "A fully equipped photography studio with professional lighting, backdrops, and high-end camera equipment for all photography needs.",
    equipment: ["Canon EOS R5 & Sony A7R IV cameras", "Profoto B10 Plus strobes", "Seamless paper backdrops (12 colors)", "LED panel lighting array", "Tripods, gimbals & accessories", "Lightroom/Capture One licenses"],
    hours: "Mon–Sat: 9AM – 7PM",
    capacity: "6 people",
    color: "#FF7A50",
  },
  {
    icon: Mic,
    name: "Media Studio",
    desc: "A soundproofed recording environment for podcasts, video production, and content creation with broadcast-quality equipment.",
    equipment: ["Shure SM7B podcast microphones", "Sony ZV-E10 video camera", "Teleprompter & ring lights", "Acoustic treatment panels", "4K video editing workstations", "Premiere Pro & Final Cut licenses"],
    hours: "Mon–Sun: 8AM – 10PM",
    capacity: "8 people",
    color: "#D94E1F",
  },
  {
    icon: Monitor,
    name: "Content Studio",
    desc: "A versatile content creation hub for social media, blogs, newsletters, and marketing materials supporting student startups.",
    equipment: ["Content creation workstations (6 units)", "Green screen & chroma backdrop", "Streaming setup (OBS, Streamyard)", "Canva Pro team subscription", "Social media management tools", "Copywriting & SEO tool licenses"],
    hours: "Mon–Sat: 10AM – 8PM",
    capacity: "10 people",
    color: "#FF5E2C",
  },
  {
    icon: Lightbulb,
    name: "Innovation Lab",
    desc: "A fully equipped R&D lab where students can prototype, iterate, and test their ideas with access to cutting-edge tech and hardware.",
    equipment: ["3D printers (FDM & Resin)", "Arduino & Raspberry Pi kits", "Laser cutter & engraver", "Soldering stations & PCB tools", "VR/AR headsets for prototyping", "IoT development kits"],
    hours: "Mon–Sat: 9AM – 9PM",
    capacity: "20 people",
    color: "#FF7A50",
  },
  {
    icon: Building2,
    name: "Startup Incubation Space",
    desc: "A collaborative co-working environment designed specifically for student startups in the early stages of building their company.",
    equipment: ["Hot desks & dedicated desks", "Private meeting rooms (3)", "High-speed fibre internet (1Gbps)", "Whiteboards & brainstorming walls", "Printing & scanning facilities", "Lounge & networking areas"],
    hours: "Mon–Sun: 7AM – 11PM",
    capacity: "30+ people",
    color: "#D94E1F",
  },
];

const heroStats = [
  { value: "6", label: "Studios" },
  { value: "100+", label: "Equipment Items" },
  { value: "7AM–11PM", label: "Max Access" },
  { value: "Free", label: "For CIE Members" },
];

const heroCards = [
  { icon: Palette, name: "Design Studio", detail: "iMac Pros · Adobe CC · Figma", hours: "Mon–Sat  9AM–8PM", accent: "rgba(255,94,44,0.15)", color: "#FF5E2C" },
  { icon: Mic, name: "Media Studio", detail: "Podcast · Video · Soundproofed", hours: "Mon–Sun  8AM–10PM", accent: "rgba(255,133,51,0.15)", color: "#FF7A50" },
  { icon: Lightbulb, name: "Innovation Lab", detail: "3D Print · Laser Cut · IoT Kits", hours: "Mon–Sat  9AM–9PM", accent: "rgba(229,94,0,0.15)", color: "#D94E1F" },
];

export default function StudiosPage() {
  return (
    <div style={{ background: "#FFFFFF", position: "relative" }}>
      <PageGeometric />
      <PageHero
        tag="Innovation Spaces"
        line1="SIX"
        line2="CREATIVE"
        line3="SPACES"
        scriptText="— where great work happens"
        description="Six purpose-built innovation spaces, each designed to support a different dimension of student creativity — from design and media to hardware prototyping and startup incubation."
        stats={[
          { value: "6", label: "Studios" },
          { value: "100+", label: "Equipment Items" },
          { value: "7AM–11PM", label: "Max Access" },
          { value: "Free", label: "For CIE Members" },
        ]}
        watermark="STUDIOS"
      />

      {/* Studios List */}
      <section style={{ background: "#F8F9FA", paddingTop: "clamp(32px,5vw,56px)", paddingBottom: "clamp(32px,5vw,56px)" }}>
        <ScrollStack
          stackTop={0.1}
          fan={40}
          vhPerCard={1.1}
          itemScale={0.035}
          baseScale={0.86}
        >
          {studios.map((studio) => (
            <ScrollStackItem key={studio.name}>
              <div style={{ maxWidth: "1340px", width: "100%", margin: "0 auto", paddingLeft: "20px", paddingRight: "20px" }}>
                <div className="card-light rounded-3xl overflow-hidden" style={{ boxShadow: "0 18px 60px rgba(0,0,0,0.12), 0 4px 14px rgba(0,0,0,0.06)" }}>
                  <div className="grid lg:grid-cols-[2fr_3fr] divide-y lg:divide-y-0 lg:divide-x divide-black/5 items-stretch" style={{ minHeight: "560px" }}>
                    <div className="p-6 md:p-10 lg:p-14 flex flex-col" style={{ background: "linear-gradient(135deg, rgba(255,94,44,0.05) 0%, transparent 100%)" }}>
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                        style={{ background: "rgba(255,94,44,0.1)", marginBottom: "28px" }}>
                        <studio.icon size={32} style={{ color: "#FF5E2C" }} />
                      </div>
                      <h2 className="text-3xl font-black" style={{ color: "#000000", marginBottom: "24px" }}>{studio.name}</h2>
                      <p style={{ color: "#374151", fontSize: "16px", lineHeight: 1.8, marginBottom: "32px" }}>{studio.desc}</p>
                      <div className="flex flex-col" style={{ gap: "16px" }}>
                        <div className="flex items-center gap-3" style={{ fontSize: "15px" }}>
                          <Calendar size={18} style={{ color: "#FF5E2C", flexShrink: 0 }} />
                          <span style={{ color: "#374151" }}>{studio.hours}</span>
                        </div>
                        <div className="flex items-center gap-3" style={{ fontSize: "15px" }}>
                          <Building2 size={18} style={{ color: "#FF5E2C", flexShrink: 0 }} />
                          <span style={{ color: "#374151" }}>Capacity: {studio.capacity}</span>
                        </div>
                      </div>
                      <div style={{ marginTop: "40px" }}>
                        <button className="btn-primary w-full justify-center">Book This Studio</button>
                      </div>
                    </div>
                    <div className="p-6 md:p-10 lg:p-14 flex flex-col">
                      <h3 className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#FF5E2C", marginTop: "0px", marginBottom: "32px" }}>
                        Equipment & Resources
                      </h3>
                      <div className="grid sm:grid-cols-2" style={{ columnGap: "32px", rowGap: "16px", alignItems: "start" }}>
                        {studio.equipment.map((item) => (
                          <div key={item} className="flex items-start gap-3">
                            <CheckCircle size={18} style={{ color: "#FF5E2C", flexShrink: 0, marginTop: "3px" }} />
                            <span style={{ color: "#374151", fontSize: "15px", lineHeight: 1.7 }}>{item}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ marginTop: "40px" }}>
                        <h3 className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#6B7280", marginBottom: "16px" }}>Gallery</h3>
                        <div className="grid grid-cols-3 gap-3 items-stretch">
                          {[1, 2, 3].map((j) => (
                            <div key={j} className="aspect-video rounded-lg flex items-center justify-center"
                              style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.06)" }}>
                              <Camera size={22} style={{ color: "#D1D5DB" }} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </section>

      {/* Booking CTA */}
      <section className="relative" style={{ background: "linear-gradient(160deg, #FFFFFF 0%, #FFFFFF 50%, #FFFFFF 100%)", paddingTop: "clamp(48px,8vw,96px)", paddingBottom: "clamp(48px,8vw,96px)" }}>
        <FadeIn className="relative z-10 page-container text-center">
          <span className="section-tag" style={{ marginBottom: "32px" }}>Book a Space</span>
          <h2 className="text-4xl font-black" style={{ color: "#000000", marginBottom: "32px" }}>Ready to Create?</h2>
          <p style={{ color: "#374151", marginBottom: "40px" }}>
            All studios are available to MLRIT students and CIE members. Book your slot online
            or visit the CIE office to reserve your preferred space.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">Book a Studio Tour</button>
            <button className="btn-secondary-light">Contact CIE Office</button>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
