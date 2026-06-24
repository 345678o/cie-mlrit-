"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
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

const contactInfo = [
  { icon: MapPin, label: "Address", value: "CIE Block, MLRIT Campus, Dundigal, Hyderabad, Telangana 500043", href: null },
  { icon: Mail, label: "Email", value: "ciemlrit@mlrit.ac.in", href: "mailto:ciemlrit@mlrit.ac.in" },
  { icon: Mail, label: "Email (Alt)", value: "cie@mlrinstitutions.ac.in", href: "mailto:cie@mlrinstitutions.ac.in" },
  { icon: Phone, label: "Phone", value: "+91 40 2304 3333", href: "tel:+914023043333" },
  { icon: Clock, label: "Office Hours", value: "Mon–Sat: 9:00 AM – 6:00 PM", href: null },
];

function SvgInstagram() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.5"/></svg>;
}
function SvgLinkedIn() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
}
function SvgYouTube() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M21.593 7.203a2.506 2.506 0 0 0-1.762-1.766C18.265 5.007 12 5 12 5s-6.264-.007-7.831.404a2.56 2.56 0 0 0-1.766 1.778c-.413 1.566-.417 4.814-.417 4.814s-.004 3.264.406 4.814c.23.857.905 1.534 1.763 1.765 1.582.43 7.83.437 7.83.437s6.265.007 7.831-.403a2.515 2.515 0 0 0 1.767-1.763c.414-1.565.417-4.812.417-4.812s.02-3.265-.407-4.831zM9.996 15.005l.005-6 5.207 3.005-5.212 2.995z"/></svg>;
}
function SvgX() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
}

const socials = [
  { Svg: SvgInstagram, label: "Instagram",  handle: "@mlritcie",  href: "https://www.instagram.com/mlritcie/",  color: "#E1306C", bg: "rgba(225,48,108,0.10)", hoverBg: "rgba(225,48,108,0.18)" },
  { Svg: SvgLinkedIn,  label: "LinkedIn",   handle: "MLRIT CIE", href: "https://www.linkedin.com/in/cie-center-for-innovation-and-entrepreneurship-mlrit-935971291/", color: "#0A66C2", bg: "rgba(10,102,194,0.10)", hoverBg: "rgba(10,102,194,0.18)" },
  { Svg: SvgX,         label: "Twitter / X",handle: "@ciemlrit",  href: "https://x.com/ciemlrit?s=20",          color: "#111111", bg: "rgba(0,0,0,0.08)", hoverBg: "rgba(0,0,0,0.14)" },
  { Svg: SvgYouTube,   label: "YouTube",    handle: "MLRIT CIE", href: "https://www.youtube.com/@mlritcie",     color: "#FF0000", bg: "rgba(255,0,0,0.10)", hoverBg: "rgba(255,0,0,0.18)" },
];

const heroCards = [
  { icon: Mail, label: "Email us", value: "ciemlrit@mlrit.ac.in", sub: "cie@mlrinstitutions.ac.in", accent: "rgba(255,94,44,0.15)", color: "#FF5E2C" },
  { icon: MapPin, label: "Visit us", value: "MLRIT Campus, Dundigal", sub: "CIE Block, Hyderabad 500043", accent: "rgba(22,163,74,0.15)", color: "#16A34A" },
  { icon: Clock, label: "Office hours", value: "Mon–Sat, 9AM–6PM", sub: "Drop in anytime during hours", accent: "rgba(59,130,246,0.15)", color: "#3B82F6" },
];

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!formState.name.trim())    newErrors.name    = "Name is required.";
    if (!formState.email.trim())   newErrors.email   = "Email is required.";
    if (!formState.subject)        newErrors.subject  = "Please select a subject.";
    if (!formState.message.trim()) newErrors.message = "Message is required.";
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  const inputStyle = {
    background: "#FFFFFF",
    border: "1.5px solid rgba(0,0,0,0.10)",
    color: "#000000",
    borderRadius: "10px",
    width: "100%",
    padding: "12px 16px",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s ease",
  };

  return (
    <div style={{ background: "#FFFFFF", position: "relative" }}>
      <PageGeometric />
      <PageHero
        tag="Get in Touch"
        line1="LET'S"
        line2="TALK"
        scriptText="— we'd love to hear from you"
        description="Have a question, an idea, or want to collaborate? We'd love to hear from you. The CIE team typically responds within 24 hours."
        cta={{ label: "Send a Message", href: "#contact-form" }}
        watermark="HELLO"
      />

      {/* Form — centered */}
      <section id="contact-form" style={{ paddingTop: "clamp(48px,8vw,72px)", paddingBottom: "clamp(40px,6vw,56px)", background: "#FFFFFF", position: "relative", zIndex: 1 }}>
        <div className="page-container">
          <div style={{ maxWidth: "960px", margin: "0 auto" }}>
            <FadeIn>
              <div style={{
                background: "#FFFFFF",
                border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: "20px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                padding: "clamp(28px,4vw,40px)",
              }}>
                <h2 className="text-2xl font-black mb-2" style={{ color: "#000000" }}>Send a Message</h2>
                <p className="text-sm mb-8" style={{ color: "#6B7280" }}>
                  Fill in the form below and we&apos;ll get back to you as soon as possible.
                </p>
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ background: "rgba(22,163,74,0.10)" }}>
                      <CheckCircle size={32} style={{ color: "#16A34A" }} />
                    </div>
                    <h3 className="text-xl font-black mb-2" style={{ color: "#000000" }}>Message Sent!</h3>
                    <p style={{ color: "#6B7280" }}>Thank you for reaching out. We&apos;ll respond within 24 hours.</p>
                    <button onClick={() => { setSubmitted(false); setFormState({ name: "", email: "", subject: "", message: "" }); }}
                      className="btn-secondary-light mt-6">Send Another</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <div className="grid sm:grid-cols-2 gap-5 items-start">
                      <div>
                        <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#374151" }}>Your Name *</label>
                        <input id="contact-name" type="text" aria-required="true"
                          aria-invalid={!!errors.name} aria-describedby={errors.name ? "contact-name-error" : undefined}
                          value={formState.name} onChange={(e) => { setFormState({ ...formState, name: e.target.value }); setErrors({ ...errors, name: "" }); }}
                          placeholder="Rahul Sharma" style={inputStyle}
                          onFocus={(e) => e.target.style.borderColor = "#FF5E2C"}
                          onBlur={(e) => e.target.style.borderColor = errors.name ? "#DC2626" : "rgba(0,0,0,0.10)"} />
                        <AnimatePresence>
                          {errors.name && (
                            <motion.p id="contact-name-error" role="alert"
                              initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              style={{ color: "#DC2626", fontSize: "12px", marginTop: "4px", fontFamily: "var(--font-body)" }}>
                              {errors.name}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#374151" }}>Email Address *</label>
                        <input id="contact-email" type="email" aria-required="true"
                          aria-invalid={!!errors.email} aria-describedby={errors.email ? "contact-email-error" : undefined}
                          value={formState.email} onChange={(e) => { setFormState({ ...formState, email: e.target.value }); setErrors({ ...errors, email: "" }); }}
                          placeholder="rahul@mlrit.ac.in" style={inputStyle}
                          onFocus={(e) => e.target.style.borderColor = "#FF5E2C"}
                          onBlur={(e) => e.target.style.borderColor = errors.email ? "#DC2626" : "rgba(0,0,0,0.10)"} />
                        <AnimatePresence>
                          {errors.email && (
                            <motion.p id="contact-email-error" role="alert"
                              initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              style={{ color: "#DC2626", fontSize: "12px", marginTop: "4px", fontFamily: "var(--font-body)" }}>
                              {errors.email}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="contact-subject" className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#374151" }}>Subject *</label>
                      <select id="contact-subject" aria-required="true"
                        aria-invalid={!!errors.subject} aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                        value={formState.subject} onChange={(e) => { setFormState({ ...formState, subject: e.target.value }); setErrors({ ...errors, subject: "" }); }}
                        style={{ ...inputStyle, appearance: "none" as const }}
                        onFocus={(e) => e.target.style.borderColor = "#FF5E2C"}
                        onBlur={(e) => e.target.style.borderColor = errors.subject ? "#DC2626" : "rgba(0,0,0,0.10)"}>
                        <option value="" disabled>Select a topic...</option>
                        <option value="join-cie">Joining CIE</option>
                        <option value="studio-booking">Studio Booking</option>
                        <option value="event">Event Inquiry</option>
                        <option value="sponsorship">Sponsorship / Partnership</option>
                        <option value="media">Media / Press</option>
                        <option value="general">General Inquiry</option>
                      </select>
                      <AnimatePresence>
                        {errors.subject && (
                          <motion.p id="contact-subject-error" role="alert"
                            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ color: "#DC2626", fontSize: "12px", marginTop: "4px", fontFamily: "var(--font-body)" }}>
                            {errors.subject}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    <div>
                      <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#374151" }}>Message *</label>
                      <textarea id="contact-message" rows={5} aria-required="true"
                        aria-invalid={!!errors.message} aria-describedby={errors.message ? "contact-message-error" : undefined}
                        value={formState.message} onChange={(e) => { setFormState({ ...formState, message: e.target.value }); setErrors({ ...errors, message: "" }); }}
                        placeholder="Tell us about your idea, question, or how we can help..."
                        style={{ ...inputStyle, resize: "none" as const }}
                        onFocus={(e) => e.target.style.borderColor = "#FF5E2C"}
                        onBlur={(e) => e.target.style.borderColor = errors.message ? "#DC2626" : "rgba(0,0,0,0.10)"} />
                      <AnimatePresence>
                        {errors.message && (
                          <motion.p id="contact-message-error" role="alert"
                            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ color: "#DC2626", fontSize: "12px", marginTop: "4px", fontFamily: "var(--font-body)" }}>
                            {errors.message}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    <div style={{ marginTop: "32px" }}>
                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={!loading ? { scale: 1.02, y: -1 } : {}}
                        whileTap={!loading ? { scale: 0.97 } : {}}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          width: "100%",
                          padding: "14px 32px",
                          borderRadius: "12px",
                          background: loading ? "rgba(232,82,26,0.6)" : "var(--orange)",
                          color: "#FFFFFF",
                          fontSize: "14px",
                          fontWeight: 700,
                          letterSpacing: "0.01em",
                          border: "none",
                          cursor: loading ? "not-allowed" : "pointer",
                          boxShadow: "0 4px 16px rgba(232,82,26,0.28)",
                          transition: "background 0.2s ease, box-shadow 0.2s ease",
                        }}
                        onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(232,82,26,0.42)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(232,82,26,0.28)"; }}
                      >
                        {loading ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={15} />
                            Send Message
                          </>
                        )}
                      </motion.button>
                    </div>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Contact Info + Map — two column */}
      <section style={{ paddingBottom: "clamp(48px,8vw,72px)", background: "#FFFFFF", position: "relative", zIndex: 1 }}>
        <div className="page-container">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* Left: Contact Details */}
            <FadeIn>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#FF5E2C" }}>Get in Touch</p>
              <h2 className="font-black mb-3" style={{ fontSize: "clamp(28px,4vw,40px)", color: "#000000", lineHeight: 1.1 }}>Contact Us</h2>
              <p className="text-sm mb-8" style={{ color: "#6B7280", lineHeight: 1.75 }}>
                Have questions, ideas, or collaboration in mind? We&apos;d love to hear from you. Reach out to us anytime.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "36px" }}>
                {/* Email */}
                <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(255,94,44,0.10)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Mail size={18} style={{ color: "#FF5E2C" }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#9CA3AF" }}>Email</p>
                    <a href="mailto:ciemlrit@mlrit.ac.in" style={{ display: "block", fontSize: "14px", color: "#111111", textDecoration: "none", lineHeight: 1.6 }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#FF5E2C"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#111111"; }}>ciemlrit@mlrit.ac.in</a>
                    <a href="mailto:cie@mlrinstitutions.ac.in" style={{ display: "block", fontSize: "14px", color: "#111111", textDecoration: "none", lineHeight: 1.6 }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#FF5E2C"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#111111"; }}>cie@mlrinstitutions.ac.in</a>
                  </div>
                </div>

                {/* Phone */}
                <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(255,94,44,0.10)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Phone size={18} style={{ color: "#FF5E2C" }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#9CA3AF" }}>Phone</p>
                    <a href="tel:+914023043333" style={{ fontSize: "14px", color: "#111111", textDecoration: "none" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#FF5E2C"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#111111"; }}>+91 40 2304 3333</a>
                  </div>
                </div>

                {/* Address */}
                <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(255,94,44,0.10)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <MapPin size={18} style={{ color: "#FF5E2C" }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#9CA3AF" }}>Address</p>
                    <p style={{ fontSize: "14px", color: "#111111", lineHeight: 1.65 }}>
                      MLR Institute of Technology<br />
                      Dundigal Police Station Road,<br />
                      Hyderabad 500043, Telangana, India
                    </p>
                  </div>
                </div>

                {/* Office Hours */}
                <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(255,94,44,0.10)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Clock size={18} style={{ color: "#FF5E2C" }} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#9CA3AF" }}>Office Hours</p>
                    <p style={{ fontSize: "14px", color: "#111111" }}>Mon–Sat: 9:00 AM – 6:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Open in Maps button */}
              <motion.a
                href="https://www.google.com/maps/place/MLR+Institute+of+Technology,+Dundigal+Police+Station+Road,+Hyderabad,+Telangana+500043,+India"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  width: "100%",
                  padding: "15px 24px",
                  borderRadius: "12px",
                  background: "var(--orange)",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  fontSize: "15px",
                  fontWeight: 700,
                  letterSpacing: "0.01em",
                  boxShadow: "0 4px 16px rgba(232,82,26,0.28)",
                  transition: "box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 22px rgba(232,82,26,0.44)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(232,82,26,0.28)"; }}
              >
                <MapPin size={16} />
                Open in Maps
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
              </motion.a>
            </FadeIn>

            {/* Right: Find Us + Map */}
            <FadeIn delay={0.15}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "#FF5E2C" }}>Find Us</p>
              <h3 className="font-black mb-1" style={{ fontSize: "clamp(20px,3vw,28px)", color: "#000000", lineHeight: 1.1 }}>MLR Institute of Technology</h3>
              <p className="text-sm mb-5" style={{ color: "#6B7280" }}>Dundigal Police Station Road, Hyderabad 500043, Telangana, India</p>
              <div style={{ borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", position: "relative", paddingBottom: "68%", height: 0 }}>
                <iframe
                  src="https://maps.google.com/maps?q=MLR+Institute+of+Technology,+Dundigal+Police+Station+Road,+Hyderabad,+Telangana+500043,+India&output=embed&z=15"
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0, display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="MLRIT CIE Location Map"
                />
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* Follow Us */}
      <section style={{ paddingBottom: "clamp(56px,8vw,88px)", background: "#FFFFFF", position: "relative", zIndex: 1 }}>
        <div className="page-container">
          <FadeIn>
            <h3 className="font-black mb-6" style={{ fontSize: "clamp(18px,2.5vw,24px)", color: "#000000" }}>Follow Us</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 16px", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.08)", textDecoration: "none", background: "#FFFFFF", transition: "background 0.2s ease, border-color 0.2s ease" }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = s.hoverBg;
                    el.style.borderColor = s.color;
                    const icon = el.querySelector(".s-icon") as HTMLElement | null;
                    if (icon) icon.style.background = s.hoverBg;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "#FFFFFF";
                    el.style.borderColor = "rgba(0,0,0,0.08)";
                    const icon = el.querySelector(".s-icon") as HTMLElement | null;
                    if (icon) icon.style.background = s.bg;
                  }}>
                  <div className="s-icon" style={{ width: 32, height: 32, borderRadius: 8, background: s.bg, color: s.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.2s ease" }}>
                    <s.Svg />
                  </div>
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "#000000", margin: 0 }}>{s.label}</p>
                    <p style={{ fontSize: "12px", color: "#6B7280", margin: 0 }}>{s.handle}</p>
                  </div>
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
