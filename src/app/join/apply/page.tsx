"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Code, FileText, PenLine, Palette, Camera, Mic, BarChart2 } from "lucide-react";

const ORANGE = "#E8521A";
const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const DEPARTMENTS: Record<string, { name: string; color: string; icon: any; desc: string; skills: string[]; lookingFor: string }> = {
  tech:        { name: "Tech",                      color: "#FF5E2C", icon: Code,      desc: "Builds and maintains CIE's digital infrastructure — website, internal tools, AI experiments, and mobile apps.", skills: ["Web Dev","App Dev","AI / ML","UI Engineering"], lookingFor: "Problem-solvers who love building things that scale." },
  content:     { name: "Content",                   color: "#0EA5E9", icon: FileText,  desc: "Produces all written output for CIE — blog posts, event write-ups, newsletters, captions, and long-form content.", skills: ["Writing","Editing","Storytelling","Research"], lookingFor: "Storytellers who can make ideas land." },
  creative:    { name: "Creative",                  color: "#3B82F6", icon: PenLine,   desc: "Drives CIE's creative direction — ideating themes, managing brand consistency, and building visual identity.", skills: ["Concept Design","Brand Strategy","Campaign Planning","Art Direction"], lookingFor: "Big-picture thinkers with an eye for detail." },
  gd:          { name: "GD — Graphic Design",       color: "#FF7A50", icon: Palette,   desc: "Shapes the visual identity of CIE — posters, decks, social assets, UI mockups, and motion content.", skills: ["Graphic Design","Motion Graphics","Social Media","Figma / Adobe"], lookingFor: "Designers who make people stop scrolling." },
  photography: { name: "Photography",               color: "#D94E1F", icon: Camera,    desc: "Captures every moment of the CIE journey through photography, videography, and professional post-production.", skills: ["Photography","Videography","Photo Editing","Post-production"], lookingFor: "Visual storytellers with a sharp eye." },
  ps:          { name: "P&S — Public Speaking",     color: "#7C3AED", icon: Mic,       desc: "Represents CIE in every room — anchoring events, running communication workshops, and handling PR.", skills: ["Public Speaking","Anchoring","Communication","PR & Outreach"], lookingFor: "Confident communicators who own the room." },
  ops:         { name: "Ops — Operations & Finance", color: "#16A34A", icon: BarChart2, desc: "Keeps everything running — event logistics, budgets, vendor relations, and flawless execution.", skills: ["Event Logistics","Budget Management","Vendor Coordination","Planning"], lookingFor: "Executors who thrive on making things happen." },
};

const BRANCHES = ["CSE","CSE (AI & ML)","CSE (Data Science)","ECE","EEE","Mech","Civil","IT","Chemical","Other"];
const YEARS    = ["1st Year","2nd Year","3rd Year","4th Year"];

type FormState = { name: string; rollNo: string; phone: string; email: string; branch: string; year: string; why: string };
const EMPTY: FormState = { name:"", rollNo:"", phone:"", email:"", branch:"", year:"", why:"" };

function inputStyle(focused: boolean, color: string): React.CSSProperties {
  return {
    width: "100%", boxSizing: "border-box" as const,
    fontFamily: "var(--font-body)", fontSize: "15px",
    padding: "13px 16px", borderRadius: "10px",
    border: focused ? `2px solid ${color}` : "1.5px solid rgba(0,0,0,0.11)",
    outline: "none", background: focused ? "#FAFAFA" : "#F8F8F8",
    color: "#111111", lineHeight: 1.5,
    transition: "all 0.18s ease",
    boxShadow: focused ? `0 0 0 4px ${color}18` : "none",
  };
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label style={{
      display: "block", fontFamily: "var(--font-body)", fontWeight: 700,
      fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase" as const,
      color: "#6B7280", marginBottom: "7px",
    }}>{children}</label>
  );
}

function FieldErr({ children }: { children: React.ReactNode }) {
  return <p style={{ fontFamily: "var(--font-body)", fontSize: "11.5px", color: "#EF4444", marginTop: "5px", fontWeight: 500 }}>{children}</p>;
}

function ApplyForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const rawDept = searchParams.get("dept") ?? "";
  const dept = DEPARTMENTS[rawDept] ?? null;
  const color = dept?.color ?? ORANGE;

  const [form, setForm]       = useState<FormState>(EMPTY);
  const [focused, setFocused] = useState<keyof FormState | "">("");
  const [errors, setErrors]   = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);

  function set(k: keyof FormState, v: string) {
    setForm(p => ({ ...p, [k]: v }));
    if (errors[k]) setErrors(p => ({ ...p, [k]: "" }));
  }

  function validate(): boolean {
    const e: Partial<FormState> = {};
    if (!form.name.trim())   e.name   = "Required";
    if (!form.rollNo.trim()) e.rollNo = "Required";
    if (!/^\d{10}$/.test(form.phone.trim())) e.phone = "10-digit number";
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (!form.branch) e.branch = "Select branch";
    if (!form.year)   e.year   = "Select year";
    if (form.why.trim().length < 30) e.why = "At least 30 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
    fireConfetti(color);
  }

  function fireConfetti(col: string) {
    import("canvas-confetti").then(({ default: confetti }) => {
      const end = Date.now() + 2400;
      const colors = [col, "#FFFFFF", ORANGE, "#FFD700"];
      (function frame() {
        confetti({ particleCount: 5, angle: 60,  spread: 55, origin: { x: 0 }, colors });
        confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors });
        if (Date.now() < end) requestAnimationFrame(frame);
      })();
      confetti({ particleCount: 140, spread: 90, origin: { y: 0.45 }, colors });
    });
  }

  if (!dept) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "16px", color: "#6B7280", marginBottom: "20px" }}>No department selected.</p>
          <button onClick={() => router.push("/join")} style={{ background: ORANGE, color: "#FFFFFF", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "14px", padding: "12px 24px", borderRadius: "999px", border: "none", cursor: "pointer" }}>
            Choose a department
          </button>
        </div>
      </div>
    );
  }

  const Icon = dept.icon;

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <SuccessScreen key="success" dept={dept.name} color={color} />
      ) : (
        <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ minHeight: "100vh" }}>

          {/* ── Two-column layout ── */}
          <div className="apply-layout" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "100vh" }}>

            {/* LEFT — dept panel */}
            <div
              className="apply-left page-hero"
              style={{
                background: color,
                position: "sticky", top: 0,
                height: "100vh",
                display: "flex", flexDirection: "column", justifyContent: "center",
                padding: "calc(var(--nav-height) + 40px) clamp(32px,5vw,64px) 48px",
                overflow: "hidden",
              }}
            >
              {/* grain */}
              <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: GRAIN, opacity: 0.04, mixBlendMode: "multiply" as const, pointerEvents: "none" }} />

              {/* arc decoration */}
              <svg aria-hidden style={{ position: "absolute", top: "-12%", right: "-16%", width: "70%", height: "70%", opacity: 0.12, pointerEvents: "none" }} viewBox="0 0 400 400" fill="none">
                <circle cx="200" cy="200" r="185" stroke="rgba(255,255,255,1)" strokeWidth="52" fill="none" />
              </svg>
              <svg aria-hidden style={{ position: "absolute", bottom: "-8%", left: "-10%", width: "40%", height: "40%", opacity: 0.09, pointerEvents: "none" }} viewBox="0 0 240 240" fill="none">
                <circle cx="120" cy="120" r="105" stroke="rgba(255,255,255,1)" strokeWidth="36" fill="none" />
              </svg>

              {/* ghost watermark */}
              <div aria-hidden style={{ position: "absolute", bottom: "0px", right: "-10px", fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(80px,14vw,200px)", color: "rgba(0,0,0,0.07)", lineHeight: 1, letterSpacing: "-0.06em", userSelect: "none" as const, pointerEvents: "none" }}>
                {rawDept.toUpperCase()}
              </div>

              {/* back button */}
              <button
                onClick={() => router.push("/join")}
                style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "13px", color: "rgba(255,255,255,0.72)", background: "none", border: "none", cursor: "pointer", padding: 0, position: "absolute", top: "calc(var(--nav-height) + 20px)", left: "clamp(32px,5vw,64px)", zIndex: 2, width: "fit-content" }}
              >
                <ChevronLeft size={15} /> All departments
              </button>

              {/* dept content */}
              <div style={{ position: "relative", zIndex: 1 }}>
                {/* icon */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  style={{ width: "56px", height: "56px", borderRadius: "16px", background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px" }}
                >
                  <Icon size={26} style={{ color: "#FFFFFF" }} />
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                  style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.60)", marginBottom: "8px" }}
                >
                  Applying for
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(32px,5vw,58px)", lineHeight: 0.92, letterSpacing: "-0.04em", color: "#FFFFFF", textTransform: "uppercase" as const, marginBottom: "20px" }}
                >
                  {dept.name}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.32 }}
                  style={{ fontFamily: "var(--font-script)", fontSize: "clamp(15px,1.8vw,20px)", color: "rgba(255,255,255,0.85)", marginBottom: "20px", display: "inline-block", transform: "rotate(-1.2deg)", lineHeight: 1.3 }}
                >
                  — {dept.lookingFor}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 0.42 }}
                  style={{ fontFamily: "var(--font-body)", fontSize: "13.5px", lineHeight: 1.78, color: "rgba(255,255,255,0.72)", marginBottom: "24px", maxWidth: "360px" }}
                >
                  {dept.desc}
                </motion.p>

                {/* skill tags */}
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 0.52 }}
                  style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}
                >
                  {dept.skills.map(s => (
                    <span key={s} style={{ fontFamily: "var(--font-body)", fontSize: "11px", fontWeight: 600, padding: "4px 12px", borderRadius: "999px", background: "rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.90)", border: "1px solid rgba(255,255,255,0.20)" }}>
                      {s}
                    </span>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* RIGHT — form */}
            <div className="apply-right" style={{ background: "#F7F7F7", paddingTop: "calc(var(--nav-height) + 48px)", paddingBottom: "80px", paddingLeft: "clamp(24px,4vw,56px)", paddingRight: "clamp(24px,4vw,56px)", overflowY: "auto" }}>
              <motion.div
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* header */}
                <div style={{ marginBottom: "36px" }}>
                  <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase" as const, color: color, marginBottom: "6px" }}>
                    Step 2 of 2 — Your Details
                  </div>
                  <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(24px,3vw,34px)", color: "#111111", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "8px" }}>
                    Fill in the form
                  </h2>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "13.5px", color: "#6B7280", lineHeight: 1.65 }}>
                    All fields required. Be honest — we read every word.
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  <div style={{ display: "grid", gap: "20px" }}>

                    {/* Name + Roll */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }} className="form-row">
                      <div>
                        <Label>Full Name</Label>
                        <input type="text" placeholder="Anamika Kumari" value={form.name}
                          onChange={e => set("name", e.target.value)}
                          onFocus={() => setFocused("name")} onBlur={() => setFocused("")}
                          style={inputStyle(focused === "name", color)} />
                        {errors.name && <FieldErr>{errors.name}</FieldErr>}
                      </div>
                      <div>
                        <Label>Roll Number</Label>
                        <input type="text" placeholder="21B01A0XXX" value={form.rollNo}
                          onChange={e => set("rollNo", e.target.value)}
                          onFocus={() => setFocused("rollNo")} onBlur={() => setFocused("")}
                          style={inputStyle(focused === "rollNo", color)} />
                        {errors.rollNo && <FieldErr>{errors.rollNo}</FieldErr>}
                      </div>
                    </div>

                    {/* Phone + Email */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }} className="form-row">
                      <div>
                        <Label>Phone</Label>
                        <input type="tel" placeholder="9XXXXXXXXX" value={form.phone}
                          onChange={e => set("phone", e.target.value)}
                          onFocus={() => setFocused("phone")} onBlur={() => setFocused("")}
                          style={inputStyle(focused === "phone", color)} />
                        {errors.phone && <FieldErr>{errors.phone}</FieldErr>}
                      </div>
                      <div>
                        <Label>College Email</Label>
                        <input type="email" placeholder="you@mlrit.ac.in" value={form.email}
                          onChange={e => set("email", e.target.value)}
                          onFocus={() => setFocused("email")} onBlur={() => setFocused("")}
                          style={inputStyle(focused === "email", color)} />
                        {errors.email && <FieldErr>{errors.email}</FieldErr>}
                      </div>
                    </div>

                    {/* Branch */}
                    <div>
                      <Label>Branch</Label>
                      <select value={form.branch}
                        onChange={e => set("branch", e.target.value)}
                        onFocus={() => setFocused("branch")} onBlur={() => setFocused("")}
                        style={{ ...inputStyle(focused === "branch", color), appearance: "auto" as any }}
                      >
                        <option value="">Select branch…</option>
                        {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                      {errors.branch && <FieldErr>{errors.branch}</FieldErr>}
                    </div>

                    {/* Year */}
                    <div>
                      <Label>Year of Study</Label>
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                        {YEARS.map(y => (
                          <button key={y} type="button" onClick={() => set("year", y)} style={{
                            fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "13px",
                            padding: "9px 20px", borderRadius: "10px", cursor: "pointer",
                            border: form.year === y ? `2px solid ${color}` : "1.5px solid rgba(0,0,0,0.12)",
                            background: form.year === y ? `${color}14` : "#F8F8F8",
                            color: form.year === y ? color : "#374151",
                            transition: "all 0.18s ease",
                          }}>{y}</button>
                        ))}
                      </div>
                      {errors.year && <FieldErr>{errors.year}</FieldErr>}
                    </div>

                    {/* Why */}
                    <div>
                      <Label>Why {dept.name}?</Label>
                      <textarea
                        placeholder={`Tell us why you want to join ${dept.name} — your passion, experience, and what you'll bring to the team.`}
                        value={form.why} rows={6}
                        onChange={e => set("why", e.target.value)}
                        onFocus={() => setFocused("why")} onBlur={() => setFocused("")}
                        style={{ ...inputStyle(focused === "why", color), resize: "vertical", minHeight: "130px" }}
                      />
                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5px" }}>
                        {errors.why ? <FieldErr>{errors.why}</FieldErr> : <span />}
                        <span style={{ fontFamily: "var(--font-body)", fontSize: "11px", color: form.why.trim().length >= 30 ? color : "#9CA3AF", fontWeight: 600 }}>
                          {form.why.trim().length} / 30+ chars
                        </span>
                      </div>
                    </div>

                    {/* divider */}
                    <div style={{ height: "1px", background: "rgba(0,0,0,0.07)", margin: "4px 0" }} />

                    {/* submit */}
                    <motion.button
                      type="submit" disabled={loading}
                      whileHover={!loading ? { y: -2, boxShadow: `0 12px 32px ${color}40` } : {}}
                      whileTap={!loading ? { scale: 0.98 } : {}}
                      style={{
                        width: "100%", padding: "16px 24px",
                        borderRadius: "12px", border: "none",
                        background: loading ? "#9CA3AF" : color,
                        color: "#FFFFFF",
                        fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "16px",
                        letterSpacing: "-0.01em",
                        cursor: loading ? "not-allowed" : "pointer",
                        transition: "background 0.2s ease, box-shadow 0.2s ease",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                      }}
                    >
                      {loading ? (
                        <>
                          <span style={{ width: "16px", height: "16px", border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#FFF", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
                          Submitting…
                        </>
                      ) : "Submit Application →"}
                    </motion.button>

                    <p style={{ fontFamily: "var(--font-body)", fontSize: "11.5px", color: "#9CA3AF", textAlign: "center" as const, lineHeight: 1.6 }}>
                      Applications close soon. Results notified via college email.
                    </p>

                  </div>
                </form>
              </motion.div>
            </div>
          </div>

          <style>{`
            @keyframes spin { to { transform: rotate(360deg); } }
            @media (max-width: 860px) {
              .apply-layout { grid-template-columns: 1fr !important; }
              .apply-left { position: relative !important; height: auto !important; min-height: 52vh; }
              .apply-right { padding-top: 40px !important; }
            }
            @media (max-width: 600px) { .form-row { grid-template-columns: 1fr !important; } }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SuccessScreen({ dept, color }: { dept: string; color: string }) {
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr" }}
      className="success-layout"
    >
      {/* Left — orange */}
      <div
        className="page-hero"
        style={{
          background: color, position: "relative", overflow: "hidden",
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
          padding: "calc(var(--nav-height) + 40px) clamp(32px,5vw,64px) 64px",
          minHeight: "100vh",
        }}
      >
        <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: GRAIN, opacity: 0.04, mixBlendMode: "multiply" as const, pointerEvents: "none" }} />
        <svg aria-hidden style={{ position: "absolute", top: "-10%", right: "-12%", width: "65%", height: "65%", opacity: 0.12, pointerEvents: "none" }} viewBox="0 0 360 360" fill="none">
          <circle cx="180" cy="180" r="165" stroke="rgba(255,255,255,1)" strokeWidth="48" fill="none" />
        </svg>
        <div aria-hidden style={{ position: "absolute", bottom: "0", right: "-8px", fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(80px,13vw,180px)", color: "rgba(0,0,0,0.07)", lineHeight: 1, letterSpacing: "-0.06em", userSelect: "none" as const, pointerEvents: "none" }}>DONE</div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: "64px", height: "64px", borderRadius: "50%",
              background: "rgba(255,255,255,0.18)",
              border: "2px solid rgba(255,255,255,0.40)",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: "28px", fontSize: "28px",
            }}
          >✓</motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-heading)", fontWeight: 900,
              fontSize: "clamp(42px, 7vw, 96px)",
              lineHeight: 0.88, letterSpacing: "-0.045em",
              textTransform: "uppercase" as const, marginBottom: 0,
            }}
          >
            <span style={{ display: "block", color: "#FFFFFF" }}>YOU'RE</span>
            <span style={{ display: "block", color: "transparent", WebkitTextStroke: "2.5px rgba(255,255,255,0.80)", fontSize: "0.82em", marginTop: "0.04em" }}>IN LINE</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 }}
            style={{ fontFamily: "var(--font-script)", fontSize: "clamp(16px,2vw,22px)", color: "rgba(255,255,255,0.85)", marginTop: "16px", display: "inline-block", transform: "rotate(-1.5deg)" }}
          >
            — we'll be in touch soon
          </motion.p>
        </div>
      </div>

      {/* Right — white */}
      <div style={{ background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(40px,6vw,80px) clamp(32px,5vw,64px)", minHeight: "100vh" }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <div style={{ width: "48px", height: "4px", borderRadius: "2px", background: color, marginBottom: "32px" }} />

          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(22px,3vw,30px)", color: "#111111", letterSpacing: "-0.03em", marginBottom: "16px", lineHeight: 1.15 }}>
            Application Submitted!
          </h2>

          <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", lineHeight: 1.78, color: "#6B7280", marginBottom: "12px" }}>
            We've received your application for <strong style={{ color: "#111111" }}>{dept}</strong>.
          </p>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "15px", lineHeight: 1.78, color: "#6B7280", marginBottom: "40px" }}>
            If you're selected, we'll reach out to your college email. Results typically take 5–7 days after the application window closes.
          </p>

          <div style={{ display: "flex", flexDirection: "column" as const, gap: "10px" }}>
            <motion.button
              onClick={() => router.push("/")}
              whileHover={{ y: -2, boxShadow: `0 8px 24px ${color}30` }}
              whileTap={{ scale: 0.98 }}
              style={{ background: color, color: "#FFFFFF", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "14px", padding: "13px 24px", borderRadius: "10px", border: "none", cursor: "pointer", transition: "all 0.2s ease" }}
            >
              Back to home
            </motion.button>
            <motion.button
              onClick={() => router.push("/join")}
              whileHover={{ y: -1 }}
              style={{ background: "transparent", color: "#6B7280", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "13px", padding: "11px 24px", borderRadius: "10px", border: "1.5px solid rgba(0,0,0,0.10)", cursor: "pointer", transition: "all 0.2s ease" }}
            >
              View all departments
            </motion.button>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .success-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </motion.div>
  );
}

export default function ApplyPage() {
  return (
    <div style={{ background: "#FFFFFF", minHeight: "100vh" }}>
      <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
        <ApplyForm />
      </Suspense>
    </div>
  );
}
