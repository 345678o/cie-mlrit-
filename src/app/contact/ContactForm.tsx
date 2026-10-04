"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

const inputStyle = {
  background: "var(--bg-card)",
  border: "1.5px solid var(--border-medium)",
  color: "var(--text-primary)",
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
  color: "var(--contact-form-label)",
  marginBottom: "5px",
  display: "block",
};

export default function ContactForm() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sendError, setSendError] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!formState.name.trim())    newErrors.name    = "Name is required.";
    if (!formState.email.trim())   newErrors.email   = "Email is required.";
    if (!formState.subject.trim()) newErrors.subject = "Subject is required.";
    if (!formState.message.trim()) newErrors.message = "Message is required.";
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    setErrors({});
    setSendError("");
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formState, website: honeypot }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; fields?: Record<string, string> };
      if (!res.ok) {
        if (data.fields) setErrors(data.fields);
        setSendError(data.error && !data.fields ? data.error : data.fields ? "" : "Could not send your message. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setSendError("Network error — check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return submitted ? (
    <div style={{ textAlign: "center", padding: "60px 0" }}>
      <div style={{ width: 68, height: 68, borderRadius: "50%", background: "var(--contact-success-bg)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
        <CheckCircle size={34} style={{ color: "var(--contact-success)" }} />
      </div>
      <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "22px", color: "var(--text-primary)", marginBottom: "10px" }}>Message Sent!</h3>
      <p style={{ fontFamily: "var(--font-body)", color: "var(--text-muted)", fontSize: "15px" }}>Thank you for reaching out. We&apos;ll respond within 24 hours.</p>
      <button onClick={() => { setSubmitted(false); setFormState({ name: "", email: "", subject: "", message: "" }); }}
        className="btn-secondary-light" style={{ marginTop: "28px" }}>Send Another</button>
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="contact-form-dark" style={{ display: "flex", flexDirection: "column", gap: "24px" }} noValidate>
      <style>{`
        :root:not([data-theme="light"]) .contact-form-dark input::placeholder, :root:not([data-theme="light"]) .contact-form-dark textarea::placeholder { color: var(--text-faint); }
        .contact-spinner { border-color: var(--contact-spinner-ring); border-top-color: var(--contact-spinner-head); }
      `}</style>
      {/* Honeypot — hidden from people, bots fill it in */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>
      <div className="grid sm:grid-cols-2 gap-6 items-start">
        <div>
          <label htmlFor="contact-name" style={labelStyle}>Your Name *</label>
          <input id="contact-name" type="text" aria-required="true"
            aria-invalid={!!errors.name} aria-describedby={errors.name ? "contact-name-error" : undefined}
            value={formState.name} onChange={(e) => { setFormState({ ...formState, name: e.target.value }); setErrors({ ...errors, name: "" }); }}
            style={{ ...inputStyle, padding: "13px 16px" }}
            onFocus={(e) => e.target.style.borderColor = "var(--orange)"}
            onBlur={(e) => e.target.style.borderColor = errors.name ? "var(--contact-error)" : "var(--border-medium)"} />
          <AnimatePresence>
            {errors.name && (
              <motion.p id="contact-name-error" role="alert" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                style={{ color: "var(--contact-error)", fontSize: "12px", marginTop: "5px", fontFamily: "var(--font-body)" }}>{errors.name}</motion.p>
            )}
          </AnimatePresence>
        </div>
        <div>
          <label htmlFor="contact-email" style={labelStyle}>Email Address *</label>
          <input id="contact-email" type="email" aria-required="true"
            aria-invalid={!!errors.email} aria-describedby={errors.email ? "contact-email-error" : undefined}
            value={formState.email} onChange={(e) => { setFormState({ ...formState, email: e.target.value }); setErrors({ ...errors, email: "" }); }}
            style={{ ...inputStyle, padding: "13px 16px" }}
            onFocus={(e) => e.target.style.borderColor = "var(--orange)"}
            onBlur={(e) => e.target.style.borderColor = errors.email ? "var(--contact-error)" : "var(--border-medium)"} />
          <AnimatePresence>
            {errors.email && (
              <motion.p id="contact-email-error" role="alert" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                style={{ color: "var(--contact-error)", fontSize: "12px", marginTop: "5px", fontFamily: "var(--font-body)" }}>{errors.email}</motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" style={labelStyle}>Subject *</label>
        <input id="contact-subject" type="text" aria-required="true"
          aria-invalid={!!errors.subject} aria-describedby={errors.subject ? "contact-subject-error" : undefined}
          value={formState.subject} onChange={(e) => { setFormState({ ...formState, subject: e.target.value }); setErrors({ ...errors, subject: "" }); }}
          placeholder="What is this about?"
          style={{ ...inputStyle, padding: "13px 16px" }}
          onFocus={(e) => e.target.style.borderColor = "var(--orange)"}
          onBlur={(e) => e.target.style.borderColor = errors.subject ? "var(--contact-error)" : "var(--border-medium)"} />
        <AnimatePresence>
          {errors.subject && (
            <motion.p id="contact-subject-error" role="alert" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
              style={{ color: "var(--contact-error)", fontSize: "12px", marginTop: "5px", fontFamily: "var(--font-body)" }}>{errors.subject}</motion.p>
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
          onFocus={(e) => e.target.style.borderColor = "var(--orange)"}
          onBlur={(e) => e.target.style.borderColor = errors.message ? "var(--contact-error)" : "var(--border-medium)"} />
        <AnimatePresence>
          {errors.message && (
            <motion.p id="contact-message-error" role="alert" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
              style={{ color: "var(--contact-error)", fontSize: "12px", marginTop: "5px", fontFamily: "var(--font-body)" }}>{errors.message}</motion.p>
          )}
        </AnimatePresence>
      </div>

      {sendError && (
        <p role="alert" style={{ color: "var(--contact-error)", fontSize: "13px", fontFamily: "var(--font-body)", margin: 0 }}>
          {sendError}{" "}
          <a href="mailto:cie@mlrinstitutions.ac.in" style={{ color: "inherit", textDecoration: "underline" }}>cie@mlrinstitutions.ac.in</a>
        </p>
      )}

      <motion.button
        type="submit" disabled={loading}
        whileHover={!loading ? { y: -2 } : {}} whileTap={!loading ? { scale: 0.98 } : {}}
        style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: "9px",
          width: "100%", padding: "16px 32px", borderRadius: "12px",
          background: loading ? "rgba(var(--primary-rgb), 0.55)" : "var(--grad-accent)",
          color: "var(--on-accent)", fontSize: "15px", fontWeight: 700, letterSpacing: "0.01em",
          border: "none", cursor: loading ? "not-allowed" : "pointer",
          boxShadow: loading ? "none" : "0 4px 20px var(--contact-submit-glow)",
          transition: "background 0.2s ease, box-shadow 0.2s ease",
          fontFamily: "var(--font-body)",
        }}
        onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 28px var(--contact-submit-glow-hover)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = loading ? "none" : "0 4px 20px var(--contact-submit-glow)"; }}
      >
        {loading
          ? <><span className="w-4 h-4 border-2 rounded-full animate-spin contact-spinner" />Sending...</>
          : <><Send size={16} />Send Message</>}
      </motion.button>
    </form>
  );
}
