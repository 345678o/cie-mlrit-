"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Play, Clock, Users, ArrowRight, Camera, Video } from "lucide-react";
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

const tourTypes = [
  {
    title: "Virtual Campus Tour",
    desc: "Experience the entire MLRIT campus and CIE facilities from anywhere in the world with our immersive 360° virtual tour.",
    duration: "30 min",
    format: "Self-guided",
    icon: Play,
    type: "virtual",
  },
  {
    title: "Innovation Center Tour",
    desc: "A guided walkthrough of the CIE Innovation Center, featuring hands-on demonstrations and meet-and-greets with student innovators.",
    duration: "45 min",
    format: "Guided (group)",
    icon: MapPin,
    type: "in-person",
  },
  {
    title: "Studio Tour",
    desc: "Deep-dive into each of our six specialized studios with live demonstrations of equipment and capabilities.",
    duration: "60 min",
    format: "Guided (small group)",
    icon: Camera,
    type: "in-person",
  },
  {
    title: "Facility Walkthrough",
    desc: "Comprehensive tour of all CIE facilities including Innovation Labs, Maker Space, Meeting Rooms, and Startup Workspace.",
    duration: "90 min",
    format: "Guided (private)",
    icon: MapPin,
    type: "in-person",
  },
  {
    title: "Event Space Tour",
    desc: "Explore our auditorium, event halls, and breakout spaces — ideal for event organizers planning to host at CIE.",
    duration: "30 min",
    format: "On-request",
    icon: Users,
    type: "in-person",
  },
];

const tourTimeline = [
  { time: "0:00", activity: "Welcome & Introduction", desc: "Meet your tour guide and get an overview of CIE's history and mission" },
  { time: "0:10", activity: "Innovation Lab", desc: "Explore our R&D lab with live prototyping demonstrations" },
  { time: "0:30", activity: "Studios Showcase", desc: "Walk through Design, Media, Photography, and Content Studios" },
  { time: "0:55", activity: "Startup Workspace", desc: "See active student startups in their natural environment" },
  { time: "1:15", activity: "Q&A & Networking", desc: "Ask questions and connect with CIE community members" },
  { time: "1:30", activity: "Tour Complete", desc: "Receive your CIE welcome kit and next steps" },
];

const heroStats = [
  { value: "5", label: "Tour Types" },
  { value: "Mon–Sat", label: "Available" },
  { value: "90 min", label: "Max Duration" },
  { value: "Free", label: "No Booking Fee" },
];

const heroTourCards = [
  { icon: Video, label: "Virtual Tour", duration: "30 min", format: "Self-guided · Anywhere", accent: "rgba(255,94,44,0.15)", color: "#FF5E2C" },
  { icon: MapPin, label: "Innovation Center Tour", duration: "45 min", format: "Group guided · Mon–Sat", accent: "rgba(22,163,74,0.15)", color: "#16A34A" },
  { icon: Camera, label: "Studio Tour", duration: "60 min", format: "Small group · Live demo", accent: "rgba(124,58,237,0.15)", color: "#7C3AED" },
];

export default function ToursPage() {
  return (
    <div style={{ background: "#FFFFFF", position: "relative" }}>
      <PageGeometric />
      <PageHero
        tag="Explore CIE"
        line1="SEE"
        line2="WHERE"
        line3="IDEAS LIVE"
        scriptText="— explore MLRIT CIE in person or online"
        description="Whether virtual or in-person, our tours give you an authentic look at the CIE experience — spaces, people, culture, and the energy that makes MLRIT's innovation hub unforgettable."
        stats={[
          { value: "5", label: "Tour Types" },
          { value: "Mon–Sat", label: "Available" },
          { value: "90 min", label: "Max Duration" },
          { value: "Free", label: "No Booking Fee" },
        ]}
        watermark="TOURS"
      />

      {/* Tour Types */}
      <section className="py-24" style={{ background: "#FFFFFF" }}>
        <div className="page-container">
          <FadeIn className="mb-16">
            <span className="section-tag">Tour Options</span>
            <h2 className="text-4xl font-black mt-2" style={{ color: "#000000" }}>Choose Your Tour</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tourTypes.map((tour, i) => (
              <FadeIn key={tour.title} delay={i * 0.1}>
                {/* Internal CSS Grid — 5 fixed rows guarantee pixel-perfect vertical rhythm */}
                <div
                  className="rounded-2xl overflow-hidden card-light"
                  style={{
                    display: "grid",
                    gridTemplateRows: "60px 70px 110px 60px auto",
                    padding: "2rem",
                  }}
                >
                  {/* Row 1: Header — 60px — icon + badge, vertically centred */}
                  <div className="flex items-center justify-between">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "rgba(255,94,44,0.08)" }}
                    >
                      <tour.icon size={22} style={{ color: "#FF5E2C" }} />
                    </div>
                    <span
                      className="flex items-center justify-center h-7 px-3 rounded-full text-xs font-semibold whitespace-nowrap capitalize"
                      style={{
                        background: tour.type === "virtual" ? "rgba(255,94,44,0.10)" : "rgba(0,0,0,0.05)",
                        color: tour.type === "virtual" ? "#FF5E2C" : "#374151",
                        border: `1px solid ${tour.type === "virtual" ? "rgba(255,94,44,0.22)" : "rgba(0,0,0,0.08)"}`,
                      }}
                    >
                      {tour.type}
                    </span>
                  </div>

                  {/* Row 2: Title — 70px — clipped, top-aligned */}
                  <h3
                    className="text-xl font-bold leading-tight flex items-start overflow-hidden pt-4"
                    style={{ color: "#000000" }}
                  >
                    {tour.title}
                  </h3>

                  {/* Row 3: Description — 110px — clipped */}
                  <p
                    className="text-sm leading-7 overflow-hidden"
                    style={{ color: "#374151" }}
                  >
                    {tour.desc}
                  </p>

                  {/* Row 4: Metadata — 60px — column, vertically centred */}
                  <div
                    className="flex flex-col justify-center gap-2 text-xs"
                    style={{ color: "#6B7280" }}
                  >
                    <span className="flex items-center gap-2">
                      <Clock size={12} style={{ color: "#FF5E2C" }} />
                      {tour.duration}
                    </span>
                    <span className="flex items-center gap-2">
                      <Users size={12} style={{ color: "#FF5E2C" }} />
                      {tour.format}
                    </span>
                  </div>

                  {/* Row 5: Footer — auto — button always at same vertical baseline */}
                  <div className="flex items-end pt-2">
                    <button className="btn-primary w-full justify-center text-sm py-2.5">
                      Book This Tour <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Video placeholder */}
      <section className="py-24" style={{ background: "#FFFFFF" }}>
        <div className="page-container">
          <FadeIn className="text-center mb-12">
            <span className="section-tag">Virtual Tour</span>
            <h2 className="text-4xl font-black mt-2" style={{ color: "#000000" }}>Take a Virtual Walk</h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="relative aspect-video rounded-2xl overflow-hidden flex items-center justify-center cursor-pointer group card-light">
              <div className="absolute inset-0 dot-pattern opacity-30" />
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 transition-all group-hover:scale-110"
                  style={{ background: "#FF5E2C", boxShadow: "0 0 40px rgba(255,94,44,0.25)" }}>
                  <Play size={32} className="ml-1 text-white" />
                </div>
                <p className="text-lg font-semibold" style={{ color: "#000000" }}>MLRIT CIE Virtual Tour</p>
                <p className="text-sm mt-1" style={{ color: "#6B7280" }}>Click to watch the full facility walkthrough</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Tour Timeline */}
      <section className="py-24" style={{ background: "#FFFFFF" }}>
        <div className="page-container">
          <FadeIn className="mb-16">
            <span className="section-tag">What to Expect</span>
            <h2 className="text-4xl font-black mt-2" style={{ color: "#000000" }}>Guided Tour Timeline</h2>
          </FadeIn>
          <div>
            {tourTimeline.map((item, i) => (
              <FadeIn key={item.time} delay={i * 0.1}>
                {/* CSS Grid: time-col | marker-col | content-col */}
                <div
                  className="grid"
                  style={{
                    gridTemplateColumns: "clamp(56px, 10vw, 120px) 40px 1fr",
                    minHeight: "90px",
                  }}
                >
                  {/* Time */}
                  <div className="flex items-start justify-end pr-5 pt-1">
                    <span className="text-sm font-bold tabular-nums" style={{ color: "#FF5E2C" }}>
                      {item.time}
                    </span>
                  </div>

                  {/* Marker + connector line */}
                  <div className="flex flex-col items-center">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0 relative z-10 mt-1"
                      style={{
                        background: "#FF5E2C",
                        boxShadow: "0 0 0 4px #FFFFFF, 0 0 0 5px rgba(255,94,44,0.25)",
                      }}
                    />
                    {i < tourTimeline.length - 1 && (
                      <div
                        className="w-px flex-1 mt-2"
                        style={{ background: "linear-gradient(to bottom, rgba(255,94,44,0.30), rgba(255,94,44,0.04))" }}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-8 pl-3">
                    <h3
                      className="font-bold mb-1.5"
                      style={{ color: "#000000", fontSize: "18px", lineHeight: 1.3 }}
                    >
                      {item.activity}
                    </h3>
                    <p style={{ color: "#6B7280", fontSize: "15px", lineHeight: 1.7 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-24" style={{ background: "linear-gradient(160deg, #FFFFFF 0%, #FFFFFF 50%, #FFFFFF 100%)" }}>
        <FadeIn className="page-container text-center">
          <span className="section-tag">Book Now</span>
          <h2 className="text-4xl font-black mt-4 mb-6" style={{ color: "#000000" }}>Ready to Visit?</h2>
          <p className="mb-8 text-lg" style={{ color: "#374151" }}>
            Tours run Monday–Saturday, 10AM–4PM. Groups of up to 20 welcome.
            Individual slots also available. Book 48 hours in advance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">Book a Tour <ArrowRight size={16} /></button>
            <button className="btn-secondary-light">Contact Us</button>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
