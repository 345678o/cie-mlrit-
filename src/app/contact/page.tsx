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
  { Svg: SvgInstagram, label: "Instagram",  handle: "@mlritcie",  href: "https://www.instagram.com/mlritcie/",  hoverColor: "#E1306C", hoverBg: "rgba(225,48,108,0.08)" },
  { Svg: SvgLinkedIn,  label: "LinkedIn",   handle: "MLRIT CIE", href: "https://www.linkedin.com/in/cie-center-for-innovation-and-entrepreneurship-mlrit-935971291/", hoverColor: "#0A66C2", hoverBg: "rgba(10,102,194,0.08)" },
  { Svg: SvgX,         label: "Twitter / X",handle: "@ciemlrit",  href: "https://x.com/ciemlrit?s=20",          hoverColor: "#000000", hoverBg: "rgba(0,0,0,0.05)" },
  { Svg: SvgYouTube,   label: "YouTube",    handle: "MLRIT CIE", href: "https://www.youtube.com/@mlritcie",     hoverColor: "#FF0000", hoverBg: "rgba(255,0,0,0.08)" },
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
        stats={[
          { value: "24 hrs", label: "Avg. Reply Time" },
          { value: "Mon–Sat", label: "Office Hours" },
          { value: "4+", label: "Ways to Reach" },
        ]}
        cta={{ label: "Send a Message", href: "#contact-form" }}
        watermark="HELLO"
      />

      {/* Form + Sidebar */}
      <section className="py-20" style={{ background: "#FFFFFF" }}>
        <div className="page-container">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            <FadeIn className="lg:col-span-3">
              <div className="p-8 rounded-2xl card-light">
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
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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
                    <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5">
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2"><Send size={16} /> Send Message</span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="lg:col-span-2 space-y-6">
              <div className="p-6 rounded-2xl card-light">
                <h3 className="font-black mb-5" style={{ color: "#000000" }}>Contact Information</h3>
                <div className="space-y-4">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(255,94,44,0.08)" }}>
                        <item.icon size={16} style={{ color: "#FF5E2C" }} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest mb-0.5" style={{ color: "#9CA3AF" }}>{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-sm transition-colors" style={{ color: "#374151", textDecoration: "none" }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#FF5E2C"; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#374151"; }}>{item.value}</a>
                        ) : (
                          <p className="text-sm" style={{ color: "#374151" }}>{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl card-light">
                <h3 className="font-black mb-5" style={{ color: "#000000" }}>Follow Us</h3>
                <div className="space-y-3">
                  {socials.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg"
                      style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.06)", textDecoration: "none", transition: "background 0.2s ease" }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = s.hoverBg;
                        const icon = el.querySelector(".s-icon") as HTMLElement | null;
                        if (icon) { icon.style.color = s.hoverColor; icon.style.background = s.hoverBg; }
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.background = "#FFFFFF";
                        const icon = el.querySelector(".s-icon") as HTMLElement | null;
                        if (icon) { icon.style.color = "#6B7280"; icon.style.background = "rgba(0,0,0,0.05)"; }
                      }}>
                      <div className="s-icon w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(0,0,0,0.05)", color: "#6B7280", transition: "color 0.2s ease, background 0.2s ease" }}>
                        <s.Svg />
                      </div>
                      <div>
                        <p className="text-xs font-semibold" style={{ color: "#000000" }}>{s.label}</p>
                        <p className="text-xs" style={{ color: "#6B7280" }}>{s.handle}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden aspect-video flex items-center justify-center card-light">
                <div className="text-center">
                  <MapPin size={28} className="mx-auto mb-2" style={{ color: "#FF5E2C" }} />
                  <p className="text-sm font-semibold" style={{ color: "#000000" }}>MLRIT Campus</p>
                  <p className="text-xs mt-1" style={{ color: "#6B7280" }}>Dundigal, Hyderabad</p>
                  <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
                    className="inline-block mt-3 text-xs btn-secondary-light py-1.5 px-3">Open in Maps</a>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

    </div>
  );
}
