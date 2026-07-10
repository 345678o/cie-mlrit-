"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

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

export default function ContactForm() {
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

  return submitted ? (
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
            style={{ ...inputStyle, padding: "13px 16px" }}
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
            style={{ ...inputStyle, padding: "13px 16px" }}
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
  );
}
