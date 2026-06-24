"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, Camera, Link2, X, Video, CheckCircle } from "lucide-react";
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

const socials = [
  { icon: Camera, label: "Instagram", handle: "@mlrit_cie", href: "#" },
  { icon: Link2, label: "LinkedIn", handle: "MLRIT CIE", href: "#" },
  { icon: X, label: "Twitter / X", handle: "@mlrit_cie", href: "#" },
  { icon: Video, label: "YouTube", handle: "MLRIT CIE", href: "#" },
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
                      className="flex items-center gap-3 p-3 rounded-lg transition-all"
                      style={{ background: "#FFFFFF", border: "1px solid rgba(0,0,0,0.06)" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,94,44,0.05)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#FFFFFF"; }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,94,44,0.08)" }}>
                        <s.icon size={15} style={{ color: "#FF5E2C" }} />
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
