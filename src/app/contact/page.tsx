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
  { icon: Phone, label: "Phone", value: "XXXXXXXXX", href: null },
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

  const CARD = {
    background: "#FFFFFF",
    borderRadius: "22px",
    border: "1px solid rgba(0,0,0,0.08)",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
  } as const;

  const labelStyle = {
    fontFamily: "var(--font-body)",
    fontSize: "10px",
    fontWeight: 700,
    textTransform: "uppercase" as const,
    letterSpacing: "0.12em",
    color: "#9CA3AF",
    marginBottom: "5px",
    display: "block",
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

      {/* ── Section heading ──────────────────────────────────────── */}
      <section style={{ background: "#FFFFFF", paddingTop: "clamp(64px,9vw,100px)", paddingBottom: "clamp(40px,5vw,56px)" }}>
        <div className="page-container">
          <FadeIn>
            <span className="section-tag">Contact</span>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(28px,4.5vw,48px)", color: "#000000", lineHeight: 1.08, letterSpacing: "-0.03em", marginTop: "14px", marginBottom: "14px" }}>
              Get in Touch
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(14px,1.4vw,17px)", color: "#6B7280", lineHeight: 1.72, maxWidth: "520px" }}>
              Whether you have a question, collaboration idea, or partnership inquiry, our team is here to help.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Cards: Info + Form ───────────────────────────────────── */}
      <section id="contact-form" style={{ background: "#FFFFFF", paddingBottom: "clamp(72px,10vw,100px)" }}>
        <div className="page-container">
          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "33% 1fr", gap: "clamp(18px,2.5vw,28px)", alignItems: "start" }}>

            {/* ── LEFT: Info card ── */}
            <FadeIn>
              <div style={{ ...CARD, padding: "clamp(24px,3vw,36px)", position: "sticky", top: "calc(var(--nav-height) + 20px)" }}>
                {/* Orange top accent bar */}
                <div style={{ height: "3px", background: "#E8521A", borderRadius: "2px", marginBottom: "24px" }} />

                <span style={{ ...labelStyle, color: "#E8521A", letterSpacing: "0.14em" }}>Contact Information</span>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(17px,2vw,21px)", color: "#000000", lineHeight: 1.2, marginTop: "6px", marginBottom: "20px" }}>
                  We&apos;re here to help
                </h3>

                {/* Info rows */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {[
                    {
                      icon: Mail, label: "Email",
                      content: (
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                          <a href="mailto:ciemlrit@mlrit.ac.in" style={{ fontFamily: "var(--font-body)", fontSize: "13.5px", color: "#111111", textDecoration: "none", lineHeight: 1.55, transition: "color 0.15s" }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#E8521A"; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#111111"; }}>ciemlrit@mlrit.ac.in</a>
                          <a href="mailto:cie@mlrinstitutions.ac.in" style={{ fontFamily: "var(--font-body)", fontSize: "13.5px", color: "#111111", textDecoration: "none", lineHeight: 1.55, transition: "color 0.15s" }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#E8521A"; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#111111"; }}>cie@mlrinstitutions.ac.in</a>
                        </div>
                      ),
                    },
                    {
                      icon: Phone, label: "Phone",
                      content: (
                        <span style={{ fontFamily: "var(--font-body)", fontSize: "13.5px", color: "#111111" }}>XXXXXXXXX</span>
                      ),
                    },
                    {
                      icon: MapPin, label: "Office Location",
                      content: (
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "13.5px", color: "#374151", lineHeight: 1.6, margin: 0 }}>
                          CIE Block, MLR Institute of Technology<br />Dundigal, Hyderabad 500043<br />Telangana, India
                        </p>
                      ),
                    },
                    {
                      icon: Clock, label: "Office Hours",
                      content: (
                        <p style={{ fontFamily: "var(--font-body)", fontSize: "13.5px", color: "#374151", margin: 0 }}>Mon–Sat: 9:00 AM – 6:00 PM</p>
                      ),
                    },
                  ].map(({ icon: Icon, label, content }, i, arr) => (
                    <div key={label}>
                      <div style={{ display: "flex", gap: "13px", alignItems: "flex-start", padding: "14px 0" }}>
                        <div style={{ width: 34, height: 34, borderRadius: "10px", background: "rgba(232,82,26,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>
                          <Icon size={15} style={{ color: "#E8521A" }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <span style={labelStyle}>{label}</span>
                          {content}
                        </div>
                      </div>
                      {i < arr.length - 1 && <div style={{ height: "1px", background: "rgba(0,0,0,0.06)", marginLeft: "47px" }} />}
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div style={{ height: "1px", background: "rgba(0,0,0,0.07)", margin: "18px 0" }} />

                {/* Social links */}
                <span style={labelStyle}>Follow Us</span>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "10px" }}>
                  {socials.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} title={`${s.label} · ${s.handle}`}
                      style={{ width: 34, height: 34, borderRadius: "9px", background: s.bg, color: s.color, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", transition: "background 0.2s ease, transform 0.15s ease", border: "1px solid rgba(0,0,0,0.05)" }}
                      onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = s.hoverBg; el.style.transform = "translateY(-2px)"; }}
                      onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = s.bg; el.style.transform = "translateY(0)"; }}>
                      <s.Svg />
                    </a>
                  ))}
                </div>

              </div>
            </FadeIn>

            {/* ── RIGHT: Form ── */}
            <FadeIn delay={0.1}>
              <div style={{ ...CARD, padding: "clamp(32px,4vw,48px)" }}>
                <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(22px,3vw,32px)", color: "#000000", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "8px" }}>
                  Send a Message
                </h2>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", color: "#6B7280", lineHeight: 1.68, marginBottom: "36px" }}>
                  Fill in the form below and we&apos;ll get back to you as soon as possible.
                </p>

                {submitted ? (
                  <div style={{ textAlign: "center", padding: "60px 0" }}>
                    <div style={{ width: 68, height: 68, borderRadius: "50%", background: "rgba(22,163,74,0.10)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
                      <CheckCircle size={34} style={{ color: "#16A34A" }} />
                    </div>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "22px", color: "#000000", marginBottom: "10px" }}>Message Sent!</h3>
                    <p style={{ fontFamily: "var(--font-body)", color: "#6B7280", fontSize: "15px" }}>Thank you for reaching out. We&apos;ll respond within 24 hours.</p>
                    <button onClick={() => { setSubmitted(false); setFormState({ name: "", email: "", subject: "", message: "" }); }}
                      className="btn-secondary-light" style={{ marginTop: "28px" }}>Send Another</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }} noValidate>
                    <div className="grid sm:grid-cols-2 gap-6 items-start">
                      <div>
                        <label htmlFor="contact-name" style={labelStyle}>Your Name *</label>
                        <input id="contact-name" type="text" aria-required="true"
                          aria-invalid={!!errors.name} aria-describedby={errors.name ? "contact-name-error" : undefined}
                          value={formState.name} onChange={(e) => { setFormState({ ...formState, name: e.target.value }); setErrors({ ...errors, name: "" }); }}
                          placeholder="Rahul Sharma" style={{ ...inputStyle, padding: "13px 16px" }}
                          onFocus={(e) => e.target.style.borderColor = "#E8521A"}
                          onBlur={(e) => e.target.style.borderColor = errors.name ? "#DC2626" : "rgba(0,0,0,0.10)"} />
                        <AnimatePresence>
                          {errors.name && (
                            <motion.p id="contact-name-error" role="alert" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                              style={{ color: "#DC2626", fontSize: "12px", marginTop: "5px", fontFamily: "var(--font-body)" }}>{errors.name}</motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                      <div>
                        <label htmlFor="contact-email" style={labelStyle}>Email Address *</label>
                        <input id="contact-email" type="email" aria-required="true"
                          aria-invalid={!!errors.email} aria-describedby={errors.email ? "contact-email-error" : undefined}
                          value={formState.email} onChange={(e) => { setFormState({ ...formState, email: e.target.value }); setErrors({ ...errors, email: "" }); }}
                          placeholder="rahul@mlrit.ac.in" style={{ ...inputStyle, padding: "13px 16px" }}
                          onFocus={(e) => e.target.style.borderColor = "#E8521A"}
                          onBlur={(e) => e.target.style.borderColor = errors.email ? "#DC2626" : "rgba(0,0,0,0.10)"} />
                        <AnimatePresence>
                          {errors.email && (
                            <motion.p id="contact-email-error" role="alert" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                              style={{ color: "#DC2626", fontSize: "12px", marginTop: "5px", fontFamily: "var(--font-body)" }}>{errors.email}</motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-subject" style={labelStyle}>Subject *</label>
                      <select id="contact-subject" aria-required="true"
                        aria-invalid={!!errors.subject} aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                        value={formState.subject} onChange={(e) => { setFormState({ ...formState, subject: e.target.value }); setErrors({ ...errors, subject: "" }); }}
                        style={{ ...inputStyle, padding: "13px 16px", appearance: "none" as const }}
                        onFocus={(e) => e.target.style.borderColor = "#E8521A"}
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
                          <motion.p id="contact-subject-error" role="alert" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                            style={{ color: "#DC2626", fontSize: "12px", marginTop: "5px", fontFamily: "var(--font-body)" }}>{errors.subject}</motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    <div>
                      <label htmlFor="contact-message" style={labelStyle}>Message *</label>
                      <textarea id="contact-message" rows={7} aria-required="true"
                        aria-invalid={!!errors.message} aria-describedby={errors.message ? "contact-message-error" : undefined}
                        value={formState.message} onChange={(e) => { setFormState({ ...formState, message: e.target.value }); setErrors({ ...errors, message: "" }); }}
                        placeholder="Tell us about your idea, question, or how we can help..."
                        style={{ ...inputStyle, padding: "13px 16px", resize: "none" as const }}
                        onFocus={(e) => e.target.style.borderColor = "#E8521A"}
                        onBlur={(e) => e.target.style.borderColor = errors.message ? "#DC2626" : "rgba(0,0,0,0.10)"} />
                      <AnimatePresence>
                        {errors.message && (
                          <motion.p id="contact-message-error" role="alert" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                            style={{ color: "#DC2626", fontSize: "12px", marginTop: "5px", fontFamily: "var(--font-body)" }}>{errors.message}</motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    <motion.button
                      type="submit" disabled={loading}
                      whileHover={!loading ? { y: -2 } : {}} whileTap={!loading ? { scale: 0.98 } : {}}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "9px",
                        width: "100%", padding: "16px 32px", borderRadius: "12px",
                        background: loading ? "rgba(232,82,26,0.55)" : "#E8521A",
                        color: "#FFFFFF", fontSize: "15px", fontWeight: 700, letterSpacing: "0.01em",
                        border: "none", cursor: loading ? "not-allowed" : "pointer",
                        boxShadow: loading ? "none" : "0 4px 20px rgba(232,82,26,0.32)",
                        transition: "background 0.2s ease, box-shadow 0.2s ease",
                        fontFamily: "var(--font-body)",
                      }}
                      onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px rgba(232,82,26,0.44)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = loading ? "none" : "0 4px 20px rgba(232,82,26,0.32)"; }}
                    >
                      {loading
                        ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending...</>
                        : <><Send size={16} />Send Message</>}
                    </motion.button>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>

        <style>{`
          @media (max-width: 1023px) { .contact-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ── Visit Us / Map ───────────────────────────────────────── */}
      <section style={{ background: "#F8F8F8", paddingTop: "clamp(64px,9vw,100px)", paddingBottom: "clamp(64px,9vw,100px)", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <div className="page-container">
          <FadeIn>
            <span className="section-tag">Location</span>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(24px,3.5vw,38px)", color: "#000000", lineHeight: 1.1, letterSpacing: "-0.025em", marginTop: "14px", marginBottom: "10px" }}>
              Visit Us
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(14px,1.3vw,16px)", color: "#6B7280", lineHeight: 1.7, maxWidth: "480px", marginBottom: "36px" }}>
              Find the Centre for Innovation &amp; Entrepreneurship at MLR Institute of Technology.
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div style={{ borderRadius: "20px", overflow: "hidden", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 4px 24px rgba(0,0,0,0.07)", height: "450px" }}>
              <iframe
                src="https://maps.google.com/maps?q=MLRIT+CIE&ll=17.5943093,78.4413481&output=embed&z=19"
                style={{ width: "100%", height: "100%", border: 0, display: "block" }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                title="MLRIT CIE — Location Map"
              />
            </div>
            <div style={{ marginTop: "16px", display: "flex", justifyContent: "flex-end" }}>
              <motion.a
                href="https://maps.app.goo.gl/Ls9rSe1kdWnjahzz6"
                target="_blank" rel="noopener noreferrer"
                whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
                style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "10px 20px", borderRadius: "10px", background: "#E8521A", color: "#FFFFFF", textDecoration: "none", fontSize: "13px", fontWeight: 700, fontFamily: "var(--font-body)", boxShadow: "0 3px 14px rgba(232,82,26,0.26)" }}>
                <MapPin size={13} />
                Open in Google Maps
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
              </motion.a>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
