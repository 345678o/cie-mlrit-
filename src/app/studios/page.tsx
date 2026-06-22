"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Palette, Camera, Mic, Monitor, Lightbulb, Building2, Calendar, CheckCircle } from "lucide-react";
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
      <section className="py-20" style={{ background: "#F8F9FA" }}>
        <div className="page-container space-y-16">
          {studios.map((studio) => (
            <FadeIn key={studio.name} delay={0.1}>
              <div className="card-light rounded-2xl overflow-hidden" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)" }}>
                <div className="grid lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-black/5 items-start">
                  <div className="lg:col-span-2 p-8 lg:p-10" style={{ background: "linear-gradient(135deg, rgba(255,94,44,0.04) 0%, transparent 100%)" }}>
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                      style={{ background: "rgba(255,94,44,0.1)" }}>
                      <studio.icon size={32} style={{ color: "#FF5E2C" }} />
                    </div>
                    <h2 className="text-2xl font-black mb-4" style={{ color: "#000000" }}>{studio.name}</h2>
                    <p className="leading-relaxed mb-8" style={{ color: "#374151" }}>{studio.desc}</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <Calendar size={16} style={{ color: "#FF5E2C" }} />
                        <span style={{ color: "#374151" }}>{studio.hours}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Building2 size={16} style={{ color: "#FF5E2C" }} />
                        <span style={{ color: "#374151" }}>Capacity: {studio.capacity}</span>
                      </div>
                    </div>
                    <button className="btn-primary mt-8 w-full justify-center">Book This Studio</button>
                  </div>
                  <div className="lg:col-span-3 p-8 lg:p-10">
                    <h3 className="text-sm font-semibold uppercase tracking-widest mb-6" style={{ color: "#FF5E2C" }}>
                      Equipment & Resources
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3 items-start">
                      {studio.equipment.map((item) => (
                        <div key={item} className="flex items-center gap-3">
                          <CheckCircle size={16} style={{ color: "#FF5E2C", flexShrink: 0 }} />
                          <span className="text-sm" style={{ color: "#374151" }}>{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8">
                      <h3 className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "#6B7280" }}>Gallery</h3>
                      <div className="grid grid-cols-3 gap-2 items-stretch">
                        {[1, 2, 3].map((j) => (
                          <div key={j} className="aspect-video rounded-lg flex items-center justify-center"
                            style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.06)" }}>
                            <Camera size={20} style={{ color: "#D1D5DB" }} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-24 relative" style={{ background: "linear-gradient(160deg, #FFFFFF 0%, #FFFFFF 50%, #FFFFFF 100%)" }}>
        <FadeIn className="relative z-10 page-container text-center">
          <span className="section-tag">Book a Space</span>
          <h2 className="text-4xl font-black mt-4 mb-6" style={{ color: "#000000" }}>Ready to Create?</h2>
          <p className="mb-8" style={{ color: "#374151" }}>
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
