"use client";

import { Suspense, useState, useEffect, Fragment } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft, ArrowRight, Check,
  Home, Calendar, BarChart2,
} from "lucide-react";
import { useNavbarVisibility } from "@/context/NavbarContext";
import { DEPARTMENT_MAP, isDeptKey, type DeptKey } from "@/lib/departments";
import { BRANCHES, SECTIONS_BY_BRANCH, branchNeedsSection } from "@/lib/branches";
import DynamicQuestionField from "@/components/join/DynamicQuestionField";
import { inputStyle, Label, FieldErr } from "@/components/join/form-primitives";
import { getGrainDataUri } from "@/lib/grain";
import type { Question, IntroForm, ApplyPayload, ApplyResponse, QuestionsResponse } from "@/types/apply";

const ORANGE = "#E8521A";
const GRAIN = getGrainDataUri(0.8);

const YEARS = ["2nd Year","3rd Year"];

const EMPTY_INTRO: IntroForm = { name:"", rollNo:"", phone:"", email:"", branch:"", section:"", year:"", cgpa:"", backlogs:"", aboutYourself:"" };

type Answers = Record<string, string | string[]>;
type Store = { intro: IntroForm; majorAnswers: Answers; minorAnswers: Answers };
const STORE_KEY = "cie-apply-v2";

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

function readStore(): Store {
  if (typeof window === "undefined") return { intro: EMPTY_INTRO, majorAnswers: {}, minorAnswers: {} };
  try {
    const parsed = JSON.parse(sessionStorage.getItem(STORE_KEY) || "") as Partial<Store>;
    return {
      intro: { ...EMPTY_INTRO, ...(isPlainObject(parsed.intro) ? parsed.intro : {}) },
      majorAnswers: isPlainObject(parsed.majorAnswers) ? (parsed.majorAnswers as Answers) : {},
      minorAnswers: isPlainObject(parsed.minorAnswers) ? (parsed.minorAnswers as Answers) : {},
    };
  } catch {
    return { intro: EMPTY_INTRO, majorAnswers: {}, minorAnswers: {} };
  }
}

function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  return (r*299 + g*587 + b*114) / 1000 > 155;
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"16px", marginBottom:"24px" }}>
      <span style={{ fontFamily:"var(--font-body)", fontWeight:700, fontSize:"12px", color:"#0A0A0A", letterSpacing:"-0.01em", whiteSpace:"nowrap" as const }}>{label}</span>
      <div style={{ flex:1, height:"1px", background:"#E5E7EB" }}/>
    </div>
  );
}

// ── Progress indicator (3 steps: Introduction → Major → Minor) ───────────────

function ProgressBar({ step, color }: { step: number; color: string }) {
  const nodes = ["Introduction", "Major", "Minor"];
  return (
    <div style={{ display:"flex", alignItems:"flex-start", marginBottom:"40px" }}>
      {nodes.map((label, i) => {
        const done = i < step;
        const current = i === step;
        return (
          <Fragment key={label}>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"8px" }}>
              <div style={{
                width:"28px", height:"28px", borderRadius:"50%",
                background: done ? color : "#FFFFFF",
                border: done ? "none" : current ? `2px solid ${color}` : "2px solid #E5E7EB",
                display:"flex", alignItems:"center", justifyContent:"center",
                boxShadow: done ? `0 0 0 4px ${color}22` : current ? `0 0 0 4px ${color}18` : "none",
              }}>
                {done ? <Check size={13} color="#fff" strokeWidth={3}/> : <div style={{ width:"8px", height:"8px", borderRadius:"50%", background: current ? color : "#E5E7EB" }}/>}
              </div>
              <span style={{ fontFamily:"var(--font-body)", fontWeight: current ? 700 : 600, fontSize:"11px", color: done ? color : current ? "#111" : "#9CA3AF", whiteSpace:"nowrap" as const }}>{label}</span>
            </div>
            {i < nodes.length - 1 && (
              <div style={{ flex:1, height:"2px", background: i < step ? `linear-gradient(to right,${color},${color}50)` : "#E5E7EB", marginTop:"13px", flexShrink:1 }}/>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

// ── Main form ─────────────────────────────────────────────────────────────────

function ApplyForm() {
  const searchParams = useSearchParams();
  const router       = useRouter();

  // Query params resolve identically on server and client, so they're safe to read
  // synchronously here. The sessionStorage fallback is client-only and must wait for
  // an effect — reading it during the initial render would make the server-rendered
  // HTML (which never sees sessionStorage) mismatch the client's hydration pass.
  const [prefs, setPrefs] = useState<{ major: DeptKey | null; minor: DeptKey | null } | null>(() => {
    const qMajor = searchParams.get("major");
    const qMinor = searchParams.get("minor");
    if (qMajor && isDeptKey(qMajor) && qMinor && isDeptKey(qMinor)) {
      return { major: qMajor, minor: qMinor };
    }
    return null;
  });

  useEffect(() => {
    if (prefs) return;
    try {
      const stored = JSON.parse(sessionStorage.getItem("cie-md-prefs") || "{}") as { major?: string; minor?: string };
      if (stored.major && isDeptKey(stored.major) && stored.minor && isDeptKey(stored.minor)) {
        setPrefs({ major: stored.major, minor: stored.minor });
        return;
      }
    } catch {}
    setPrefs({ major: null, minor: null });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { major, minor } = prefs ?? { major: null, minor: null };

  const rawStep = parseInt(searchParams.get("step") ?? "1", 10);
  const stepIdx = Math.max(0, Math.min(2, (Number.isNaN(rawStep) ? 1 : rawStep) - 1)); // 0=intro 1=major 2=minor

  const currentDeptKey: DeptKey | null = stepIdx === 1 ? major : stepIdx === 2 ? minor : null;
  const currentDept = currentDeptKey ? DEPARTMENT_MAP[currentDeptKey] : null;
  const color = currentDept?.color ?? ORANGE;
  const lightBg = isLightColor(color);
  const onColor      = lightBg ? "rgba(0,0,0,0.88)" : "#FFFFFF";
  const onColorMid   = lightBg ? "rgba(0,0,0,0.58)" : "rgba(255,255,255,0.70)";
  const onColorFaint = lightBg ? "rgba(0,0,0,0.40)" : "rgba(255,255,255,0.46)";

  const { hide, show } = useNavbarVisibility();

  const [intro, setIntro]           = useState<IntroForm>(EMPTY_INTRO);
  const [honeypot, setHoneypot]     = useState("");
  const [majorAnswers, setMajorAnswers] = useState<Answers>({});
  const [minorAnswers, setMinorAnswers] = useState<Answers>({});
  const [majorQuestions, setMajorQuestions] = useState<Question[] | null>(null);
  const [minorQuestions, setMinorQuestions] = useState<Question[] | null>(null);
  const [questionsLoading, setQuestionsLoading] = useState(false);
  const [focused, setFocused]       = useState<string>("");
  const [errors, setErrors]         = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted]   = useState(false);
  const [loading, setLoading]       = useState(false);
  const [hoverBtn, setHoverBtn]     = useState(false);
  const [submitProgress, setSubmitProgress] = useState(0);
  const [candidateId, setCandidateId] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    hide();
    const s = readStore();
    setIntro(s.intro);
    setMajorAnswers(s.majorAnswers);
    setMinorAnswers(s.minorAnswers);
    setHydrated(true);
    return () => show();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Autosave to sessionStorage on every change, so a mid-step reload doesn't lose progress.
  // Gated on `hydrated` so this doesn't fire (with blank initial state) before readStore() runs.
  useEffect(() => {
    if (!hydrated) return;
    persist({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hydrated, intro, majorAnswers, minorAnswers]);

  useEffect(() => {
    setErrors({});
    setSubmitError("");
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }, [stepIdx]);

  useEffect(() => {
    if (stepIdx === 1 && major && majorQuestions === null) {
      setQuestionsLoading(true);
      fetch(`/api/questions?dept=${major}`)
        .then((r) => r.json())
        .then((data: QuestionsResponse) => setMajorQuestions("questions" in data && Array.isArray(data.questions) ? data.questions : []))
        .catch(() => setMajorQuestions([]))
        .finally(() => setQuestionsLoading(false));
    }
    if (stepIdx === 2 && minor && minorQuestions === null) {
      setQuestionsLoading(true);
      fetch(`/api/questions?dept=${minor}&role=minor`)
        .then((r) => r.json())
        .then((data: QuestionsResponse) => setMinorQuestions("questions" in data && Array.isArray(data.questions) ? data.questions : []))
        .catch(() => setMinorQuestions([]))
        .finally(() => setQuestionsLoading(false));
    }
  }, [stepIdx, major, minor, majorQuestions, minorQuestions]);

  function setIntroField(k: keyof IntroForm, v: string) {
    setIntro((p) => {
      const next = { ...p, [k]: v };
      if (k === "branch") next.section = ""; // section options depend on branch, reset on change
      return next;
    });
    if (errors[k]) setErrors((p) => ({ ...p, [k]: "" }));
  }

  function validateIntro(): boolean {
    const e: Record<string, string> = {};
    if (!intro.name.trim())                      e.name   = "Full name is required";
    if (!intro.rollNo.trim())                     e.rollNo = "Roll number is required";
    if (!/^\d{10}$/.test(intro.phone.trim()))     e.phone  = "Enter a valid 10-digit number";
    if (!intro.email.includes("@"))               e.email  = "Enter a valid email address";
    if (!intro.branch)                            e.branch = "Please select your branch";
    if (branchNeedsSection(intro.branch) && !intro.section) e.section = "Please select your section";
    if (!intro.year)                              e.year   = "Please select your year";
    const cgpa = parseFloat(intro.cgpa.trim());
    if (!intro.cgpa.trim())                       e.cgpa   = "CGPA is required";
    else if (Number.isNaN(cgpa) || cgpa < 0 || cgpa > 10) e.cgpa = "Enter a CGPA between 0 and 10";
    if (!intro.backlogs.trim())                   e.backlogs = "Number of backlogs is required";
    else if (!/^\d+$/.test(intro.backlogs.trim())) e.backlogs = "Enter a valid number";
    if (intro.aboutYourself.trim().length < 20)   e.aboutYourself = "Please write at least 20 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function isQuestionVisible(q: Question, answers: Answers): boolean {
    if (!q.showIf) return true;
    const val = answers[q.showIf.id];
    const selected = Array.isArray(val) ? val : val ? [val] : [];
    return q.showIf.includesAny.some((opt) => selected.includes(opt));
  }

  function hasUnspecifiedOther(val: string | string[] | undefined): boolean {
    const arr = Array.isArray(val) ? val : val ? [val] : [];
    return arr.includes("Other");
  }

  function validateAnswers(questions: Question[], answers: Answers): boolean {
    const e: Record<string, string> = {};
    for (const q of questions) {
      if (!isQuestionVisible(q, answers)) continue;
      const val = answers[q.id];
      const str = Array.isArray(val) ? val.join(",") : (val ?? "");
      if (q.required && !str.trim()) e[q.id] = `${q.label} is required`;
      else if (hasUnspecifiedOther(val)) e[q.id] = `Please specify "Other" for ${q.label}`;
      else if (q.minLength && str.trim().length < q.minLength) e[q.id] = `Please write at least ${q.minLength} characters`;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function runWithProgress<T>(work: () => Promise<T>): Promise<T> {
    setLoading(true);
    setSubmitProgress(0);
    const startMs = performance.now();
    await new Promise<void>((resolve) => {
      function tick(now: number) {
        const t = Math.min(1, (now - startMs) / 500);
        setSubmitProgress(t * 80);
        if (t < 1) requestAnimationFrame(tick);
        else resolve();
      }
      requestAnimationFrame(tick);
    });
    try {
      const result = await work();
      setSubmitProgress(100);
      await new Promise((r) => setTimeout(r, 150));
      return result;
    } finally {
      setLoading(false);
    }
  }

  function persist(next: Partial<Store>) {
    const merged = { intro, majorAnswers, minorAnswers, ...next };
    if (typeof window !== "undefined") sessionStorage.setItem(STORE_KEY, JSON.stringify(merged));
  }

  async function handleIntroSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateIntro()) return;
    await runWithProgress(async () => { persist({ intro }); });
    router.push("/join/apply?step=2");
  }

  async function handleMajorSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!majorQuestions || !validateAnswers(majorQuestions, majorAnswers)) return;
    await runWithProgress(async () => { persist({ majorAnswers }); });
    router.push("/join/apply?step=3");
  }

  async function handleMinorSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!minorQuestions || !validateAnswers(minorQuestions, minorAnswers)) return;
    if (!major || !minor) return;
    setSubmitError("");
    try {
      const id = await runWithProgress(async () => {
        const payload: ApplyPayload = {
          intro, honeypot,
          major: { dept: major, answers: majorAnswers },
          minor: { dept: minor, answers: minorAnswers },
        };
        const res = await fetch("/api/apply", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data: ApplyResponse = await res.json();
        if (!res.ok || "error" in data) {
          throw new Error(("error" in data && data.error) || "Submission failed. Please try again.");
        }
        return data.candidateId;
      });
      if (typeof window !== "undefined") sessionStorage.removeItem(STORE_KEY);
      setCandidateId(id);
      setSubmitted(true);
      show();
      fireConfetti(color);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Submission failed. Please try again.");
    }
  }

  function fireConfetti(col: string) {
    import("canvas-confetti").then(({ default: confetti }) => {
      const colors = [col, "#FFFFFF", ORANGE, "#FFD700"];
      confetti({ particleCount: 120, spread: 80, origin: { x: 0.5, y: 0.5 }, colors, scalar: 1 });
      confetti({ particleCount: 60, angle: 60, spread: 55, origin: { x: 0, y: 0.6 }, colors });
      confetti({ particleCount: 60, angle: 120, spread: 55, origin: { x: 1, y: 0.6 }, colors });
      setTimeout(() => {
        confetti({ particleCount: 80, spread: 70, origin: { x: 0.5, y: 0.45 }, colors, scalar: 0.85 });
        confetti({ particleCount: 40, angle: 70,  spread: 50, origin: { x: 0, y: 0.5 }, colors });
        confetti({ particleCount: 40, angle: 110, spread: 50, origin: { x: 1, y: 0.5 }, colors });
      }, 350);
      setTimeout(() => {
        confetti({ particleCount: 50, spread: 100, origin: { x: 0.5, y: 0.35 }, colors, scalar: 0.75, gravity: 0.8 });
      }, 700);
    });
  }

  // prefs === null means the sessionStorage fallback hasn't resolved yet (client-only,
  // runs post-hydration) — render the same blank shell the server saw rather than
  // guessing, so we don't flash "No departments selected" for a sessionStorage user.
  if (prefs === null) {
    return <div style={{ minHeight:"100vh", background:"#F2F2F0" }} />;
  }

  if (!major || !minor) {
    return (
      <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#F2F2F0" }}>
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          style={{ textAlign:"center", maxWidth:"360px", padding:"48px" }}>
          <div style={{ width:"64px", height:"64px", borderRadius:"18px", background:"#F3F4F6", border:"1.5px solid #E5E7EB", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 24px" }}>
            <BarChart2 size={28} color="#9CA3AF"/>
          </div>
          <h2 style={{ fontFamily:"var(--font-heading)", fontWeight:900, fontSize:"28px", color:"#111", letterSpacing:"-0.03em", marginBottom:"12px" }}>
            No departments selected
          </h2>
          <p style={{ fontFamily:"var(--font-body)", fontSize:"15px", color:"#6B7280", lineHeight:1.7, marginBottom:"32px" }}>
            Pick a major and minor department first.
          </p>
          <button onClick={() => router.push("/join")}
            style={{ background:ORANGE, color:"#FFF", fontFamily:"var(--font-body)", fontWeight:700, fontSize:"15px", padding:"14px 28px", borderRadius:"12px", border:"none", cursor:"pointer", display:"inline-flex", alignItems:"center", gap:"8px" }}>
            Choose departments <ArrowRight size={16}/>
          </button>
        </motion.div>
      </div>
    );
  }

  const stepQuestions = stepIdx === 1 ? majorQuestions : stepIdx === 2 ? minorQuestions : null;
  const stepAnswers = stepIdx === 1 ? majorAnswers : minorAnswers;
  const setStepAnswers = stepIdx === 1 ? setMajorAnswers : setMinorAnswers;
  const stepSubmit = stepIdx === 0 ? handleIntroSubmit : stepIdx === 1 ? handleMajorSubmit : handleMinorSubmit;
  const isLastStep = stepIdx === 2;

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <SuccessScreen key="success" deptName={DEPARTMENT_MAP[major].name} color={DEPARTMENT_MAP[major].color} firstName={intro.name.trim().split(" ")[0]} candidateId={candidateId}/>
      ) : (
        <motion.div key="form" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
          style={{ minHeight:"100vh", background:"#F2F2F0", marginTop:"calc(-1 * var(--nav-height))", display:"flex", flexDirection:"column" }}>

          {/* ── Hero Card ── */}
          <section style={{
            background: color, position: "relative", overflow: "hidden",
            paddingTop: "clamp(60px, 8vw, 96px)", paddingBottom: "clamp(48px, 5vw, 72px)",
            paddingLeft: "clamp(24px, 6vw, 80px)", paddingRight: "clamp(24px, 6vw, 80px)",
          }}>
            <div aria-hidden style={{ position:"absolute", inset:0, backgroundImage:GRAIN, opacity:0.03, mixBlendMode:"multiply" as const, pointerEvents:"none", zIndex:0 }}/>
            <div aria-hidden style={{ position:"absolute", bottom:"-20px", right:"0", fontFamily:"var(--font-heading)", fontWeight:900, fontSize:"clamp(80px,18vw,220px)", color:lightBg?"rgba(0,0,0,0.04)":"rgba(255,255,255,0.04)", lineHeight:1, letterSpacing:"-0.06em", userSelect:"none" as const, pointerEvents:"none", zIndex:0 }}>CIE</div>

            <div style={{ position:"relative", zIndex:2, maxWidth:"1040px", margin:"0 auto" }}>
              <motion.button onClick={() => router.push("/join")} whileHover={{ x:-2 }}
                style={{
                  display:"inline-flex", alignItems:"center", gap:"5px",
                  fontFamily:"var(--font-body)", fontWeight:600, fontSize:"12.5px",
                  color:onColorMid,
                  background:lightBg?"rgba(0,0,0,0.08)":"rgba(255,255,255,0.12)",
                  border:`1px solid ${lightBg?"rgba(0,0,0,0.10)":"rgba(255,255,255,0.14)"}`,
                  borderRadius:"999px", padding:"6px 14px 6px 9px",
                  cursor:"pointer", marginBottom:"36px",
                }}>
                <ChevronLeft size={14}/> All departments
              </motion.button>

              <motion.span initial={{ opacity:0 }} animate={{ opacity:1 }}
                style={{ fontFamily:"var(--font-body)", fontWeight:700, fontSize:"10px", letterSpacing:"0.10em", textTransform:"uppercase" as const, color:onColorFaint, display:"block", marginBottom:"16px" }}>
                {stepIdx === 0 ? "Step 1 · Introduction" : stepIdx === 1 ? `Step 2 · Major — ${currentDept?.name}` : `Step 3 · Minor — ${currentDept?.name}`}
              </motion.span>

              <motion.h1 initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
                transition={{ duration:0.65, delay:0.1, ease:[0.16,1,0.3,1] }}
                style={{
                  fontFamily:"var(--font-heading)", fontWeight:900,
                  fontSize:"clamp(28px, 4.5vw, 56px)", lineHeight:1.06,
                  letterSpacing:"-0.04em", color:onColor,
                  marginBottom:"14px", maxWidth:"640px",
                }}>
                {stepIdx === 0 ? "Tell us about yourself" : currentDept?.tagline}
              </motion.h1>

              <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }}
                style={{ fontFamily:"var(--font-body)", fontSize:"14px", lineHeight:1.75, color:onColorMid, maxWidth:"560px" }}>
                {stepIdx === 0 ? "Your basic details — shared across both preferences." : currentDept?.desc}
              </motion.p>
            </div>
          </section>

          {/* ── Application Section ── */}
          <section style={{ background:"#FAFAFA", flex:1 }}>
            <div style={{
              maxWidth:"1040px", margin:"0 auto",
              paddingTop:"clamp(40px,5vw,64px)", paddingBottom:"clamp(64px,8vw,96px)",
              paddingLeft:"clamp(20px,4vw,40px)", paddingRight:"clamp(20px,4vw,40px)",
            }}>
              <div style={{ maxWidth:"420px", marginBottom:"clamp(32px,4vw,48px)" }}>
                <ProgressBar step={stepIdx} color={color}/>
              </div>

              <motion.form key={stepIdx} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
                transition={{ duration:0.5, ease:[0.16,1,0.3,1] }}
                onSubmit={stepSubmit}>

                {stepIdx === 0 && (
                  <>
                    <SectionDivider label="Personal Information"/>
                    <div style={{ display:"grid", gap:"20px", marginBottom:"48px" }}>
                      <div className="form-row" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px" }}>
                        <div>
                          <Label>Full Name</Label>
                          <input type="text" placeholder="Enter your full name" value={intro.name}
                            onChange={e => setIntroField("name", e.target.value)}
                            onFocus={() => setFocused("name")} onBlur={() => setFocused("")}
                            required style={inputStyle(focused==="name", color)}/>
                          {errors.name && <FieldErr msg={errors.name}/>}
                        </div>
                        <div>
                          <Label>Roll Number</Label>
                          <input type="text" placeholder="Enter your roll number" value={intro.rollNo}
                            onChange={e => setIntroField("rollNo", e.target.value)}
                            onFocus={() => setFocused("rollNo")} onBlur={() => setFocused("")}
                            required style={inputStyle(focused==="rollNo", color)}/>
                          {errors.rollNo && <FieldErr msg={errors.rollNo}/>}
                        </div>
                      </div>
                      <div className="form-row" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px" }}>
                        <div>
                          <Label>Phone Number</Label>
                          <input type="tel" placeholder="Enter your phone number" value={intro.phone}
                            onChange={e => setIntroField("phone", e.target.value)}
                            onFocus={() => setFocused("phone")} onBlur={() => setFocused("")}
                            required inputMode="numeric" style={inputStyle(focused==="phone", color)}/>
                          {errors.phone && <FieldErr msg={errors.phone}/>}
                        </div>
                        <div>
                          <Label>Email</Label>
                          <input type="email" placeholder="Enter your email address" value={intro.email}
                            onChange={e => setIntroField("email", e.target.value)}
                            onFocus={() => setFocused("email")} onBlur={() => setFocused("")}
                            required style={inputStyle(focused==="email", color)}/>
                          {errors.email && <FieldErr msg={errors.email}/>}
                        </div>
                      </div>
                    </div>

                    <SectionDivider label="Academic Details"/>
                    <div style={{ display:"grid", gap:"20px", marginBottom:"48px" }}>
                      <div className="form-row" style={{ display:"grid", gridTemplateColumns: branchNeedsSection(intro.branch) ? "1fr 1fr 1fr" : "1fr 1fr", gap:"20px", alignItems:"start" }}>
                        <div>
                          <Label>Branch</Label>
                          <select value={intro.branch}
                            onChange={e => setIntroField("branch", e.target.value)}
                            onFocus={() => setFocused("branch")} onBlur={() => setFocused("")}
                            required style={{ ...inputStyle(focused==="branch", color), appearance:"auto" as React.CSSProperties["appearance"] }}>
                            <option value="">Select your branch…</option>
                            {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
                          </select>
                          {errors.branch && <FieldErr msg={errors.branch}/>}
                        </div>
                        {branchNeedsSection(intro.branch) && (
                          <div>
                            <Label>Section</Label>
                            <select value={intro.section}
                              onChange={e => setIntroField("section", e.target.value)}
                              onFocus={() => setFocused("section")} onBlur={() => setFocused("")}
                              required style={{ ...inputStyle(focused==="section", color), appearance:"auto" as React.CSSProperties["appearance"] }}>
                              <option value="">Select your section…</option>
                              {(SECTIONS_BY_BRANCH[intro.branch] ?? []).map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            {errors.section && <FieldErr msg={errors.section}/>}
                          </div>
                        )}
                        <div>
                          <Label>Year of Study</Label>
                          <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
                            {YEARS.map(y => (
                              <motion.button key={y} type="button" onClick={() => setIntroField("year", y)}
                                whileHover={{ y:-1 }} whileTap={{ scale:0.97 }}
                                style={{
                                  fontFamily:"var(--font-body)", fontWeight:600, fontSize:"14px",
                                  padding:"0 24px", height:"56px", borderRadius:"13px", cursor:"pointer",
                                  border:intro.year===y ? `1.5px solid ${color}` : "1px solid #E5E7EB",
                                  background:intro.year===y ? `${color}10` : "#FFFFFF",
                                  color:intro.year===y ? color : "#374151",
                                  boxShadow:intro.year===y ? `0 0 0 3px ${color}15` : "none",
                                }}>{y}</motion.button>
                            ))}
                          </div>
                          {errors.year && <FieldErr msg={errors.year}/>}
                        </div>
                      </div>
                      <div className="form-row" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px" }}>
                        <div>
                          <Label>CGPA</Label>
                          <input type="text" inputMode="decimal" placeholder="Enter your CGPA" value={intro.cgpa}
                            onChange={e => setIntroField("cgpa", e.target.value)}
                            onFocus={() => setFocused("cgpa")} onBlur={() => setFocused("")}
                            required style={inputStyle(focused==="cgpa", color)}/>
                          {errors.cgpa && <FieldErr msg={errors.cgpa}/>}
                        </div>
                        <div>
                          <Label>Number of Backlogs</Label>
                          <input type="text" inputMode="numeric" placeholder="Enter number of backlogs" value={intro.backlogs}
                            onChange={e => setIntroField("backlogs", e.target.value)}
                            onFocus={() => setFocused("backlogs")} onBlur={() => setFocused("")}
                            required style={inputStyle(focused==="backlogs", color)}/>
                          {errors.backlogs && <FieldErr msg={errors.backlogs}/>}
                        </div>
                      </div>
                    </div>

                    <SectionDivider label="About You"/>
                    <div style={{ display:"grid", gap:"20px", marginBottom:"48px" }}>
                      <div>
                        <Label>Tell us about yourself.</Label>
                        <textarea
                          placeholder="A short intro — who you are, what you're into, anything you'd like us to know."
                          value={intro.aboutYourself} rows={5}
                          required minLength={20}
                          onChange={e => setIntroField("aboutYourself", e.target.value)}
                          onFocus={() => setFocused("aboutYourself")} onBlur={() => setFocused("")}
                          style={{ ...inputStyle(focused==="aboutYourself", color), height:"auto", minHeight:"140px", padding:"16px 18px", lineHeight:"1.65", resize:"vertical" as const }}/>
                        {errors.aboutYourself && <FieldErr msg={errors.aboutYourself}/>}
                      </div>
                    </div>

                    {/* Honeypot — hidden from real users, catches naive bots */}
                    <input
                      type="text" value={honeypot} onChange={e => setHoneypot(e.target.value)}
                      autoComplete="off" tabIndex={-1} aria-hidden
                      style={{ position:"absolute", left:"-9999px", width:"1px", height:"1px", opacity:0 }}
                    />
                  </>
                )}

                {(stepIdx === 1 || stepIdx === 2) && (
                  <>
                    <SectionDivider label={stepIdx === 1 ? "Major Department Questions" : "Minor Department Questions"}/>
                    {questionsLoading || !stepQuestions ? (
                      <p style={{ fontFamily:"var(--font-body)", fontSize:"14px", color:"#6B7280", marginBottom:"48px" }}>Loading questions…</p>
                    ) : (
                      <div style={{ display:"grid", gap:"28px", marginBottom:"48px" }}>
                        {stepQuestions.filter((q) => isQuestionVisible(q, stepAnswers)).map((q) => (
                          <DynamicQuestionField
                            key={q.id}
                            question={q}
                            value={stepAnswers[q.id]}
                            onChange={(v) => setStepAnswers((p) => ({ ...p, [q.id]: v }))}
                            error={errors[q.id]}
                            color={color}
                            focused={focused === q.id}
                            onFocus={() => setFocused(q.id)}
                            onBlur={() => setFocused("")}
                          />
                        ))}
                      </div>
                    )}
                  </>
                )}

                {submitError && (
                  <div style={{ marginBottom:"24px", padding:"12px 16px", borderRadius:"10px", background:"#FEF2F2", border:"1px solid #FCA5A5", color:"#B91C1C", fontFamily:"var(--font-body)", fontSize:"13.5px", fontWeight:500 }}>
                    {submitError}
                  </div>
                )}

                <div style={{ display:"flex", alignItems:"center", gap:"24px", flexWrap:"wrap" }}>
                  <motion.button
                    type="submit" disabled={loading || (stepIdx > 0 && questionsLoading)}
                    onMouseEnter={() => setHoverBtn(true)} onMouseLeave={() => setHoverBtn(false)}
                    whileHover={!loading ? { y:-2 } : {}} whileTap={!loading ? { scale:0.99 } : {}}
                    style={{
                      height:"56px", padding:"0 40px", borderRadius:"13px", border:"none",
                      background:color, color:"#FFFFFF",
                      fontFamily:"var(--font-body)", fontWeight:700, fontSize:"16px",
                      cursor:loading ? "not-allowed" : "pointer",
                      display:"inline-flex", alignItems:"center", justifyContent:"center", gap:"10px",
                      boxShadow: loading ? "none" : `0 4px 24px ${color}35`,
                      letterSpacing:"-0.01em", position:"relative", overflow:"hidden", minWidth:"220px",
                    }}>
                    {loading && (
                      <div style={{ position:"absolute", bottom:0, left:0, height:"3px", background:"rgba(255,255,255,0.55)", width:`${submitProgress}%`, transition:"width 0.05s linear" }}/>
                    )}
                    {loading ? (
                      <>
                        <span style={{ width:"16px", height:"16px", border:"2px solid rgba(255,255,255,0.35)", borderTopColor:"#FFF", borderRadius:"50%", display:"inline-block", animation:"spin 0.7s linear infinite" }}/>
                        {submitProgress < 100 ? (isLastStep ? "Submitting…" : "Saving…") : "Done!"}
                      </>
                    ) : (
                      <>
                        {isLastStep ? "Submit Application" : "Continue"}
                        <motion.span animate={{ x:hoverBtn ? 5 : 0 }} transition={{ duration:0.2 }}>
                          <ArrowRight size={18}/>
                        </motion.span>
                      </>
                    )}
                  </motion.button>
                  <p style={{ fontFamily:"var(--font-body)", fontSize:"13px", color:"#9CA3AF", lineHeight:1.6 }}>
                    Applications reviewed within 5–7 days · Results via email
                  </p>
                </div>

                <p style={{ fontFamily:"var(--font-body)", fontSize:"12.5px", color:"#9CA3AF", lineHeight:1.6, marginTop:"16px" }}>
                  Facing any issues? Contact{" "}
                  <a href="mailto:24r21a67d2@mlrit.ac.in" style={{ color, fontWeight:600, textDecoration:"none" }}>
                    24r21a67d2@mlrit.ac.in
                  </a>
                </p>
              </motion.form>
            </div>
          </section>

          <style>{`
            @keyframes spin { to { transform: rotate(360deg); } }
            @media (max-width: 640px) {
              .form-row { grid-template-columns: 1fr !important; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Success screen ────────────────────────────────────────────────────────────

function SuccessScreen({ deptName, color, firstName, candidateId }: { deptName: string; color: string; firstName: string; candidateId: string }) {
  const router  = useRouter();
  const lightBg = isLightColor(color);
  const onColor = lightBg ? "rgba(0,0,0,0.88)" : "#FFFFFF";
  const onMid   = lightBg ? "rgba(0,0,0,0.58)" : "rgba(255,255,255,0.75)";

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 1.55 } } };
  const item = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } } };

  const TIMELINE = ["Application Submitted", "Under Review", "Shortlisting", "Interview", "Final Selection"];

  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.5 }}
      style={{ minHeight:"100vh", display:"grid", gridTemplateColumns:"40% 60%" }}
      className="success-wrap">

      <div className="page-hero success-hero" style={{
        background:color, position:"relative", overflow:"hidden",
        display:"flex", flexDirection:"column", justifyContent:"flex-end",
        padding:"calc(var(--nav-height) + 40px) clamp(28px,4.5vw,56px) 56px",
        minHeight:"100vh",
      }}>
        <div aria-hidden style={{ position:"absolute", inset:0, backgroundImage:GRAIN, opacity:0.03, mixBlendMode:"multiply" as const, pointerEvents:"none" }}/>
        <svg aria-hidden style={{ position:"absolute", top:"-10%", right:"-12%", width:"65%", height:"65%", opacity:lightBg?0.06:0.10, pointerEvents:"none" }} viewBox="0 0 360 360" fill="none">
          <circle cx="180" cy="180" r="165" stroke={lightBg?"rgba(0,0,0,1)":"rgba(255,255,255,1)"} strokeWidth="48" fill="none"/>
        </svg>
        <div aria-hidden style={{ position:"absolute", bottom:0, right:"-8px", fontFamily:"var(--font-heading)", fontWeight:900, fontSize:"clamp(72px,13vw,180px)", color:lightBg?"rgba(0,0,0,0.04)":"rgba(255,255,255,0.04)", lineHeight:1, letterSpacing:"-0.06em", userSelect:"none" as const, pointerEvents:"none" }}>DONE</div>

        <div style={{ position:"relative", zIndex:1 }}>
          <motion.div initial={{ scale:0, rotate:-20 }} animate={{ scale:1, rotate:0 }}
            transition={{ duration:0.7, delay:0.15, ease:[0.16,1,0.3,1] }}
            style={{ width:"60px", height:"60px", borderRadius:"50%", background:lightBg?"rgba(0,0,0,0.10)":"rgba(255,255,255,0.18)", border:`2px solid ${lightBg?"rgba(0,0,0,0.18)":"rgba(255,255,255,0.40)"}`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"24px" }}>
            <motion.svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <motion.path d="M 6 14 L 11 20 L 22 9"
                stroke={onColor} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"
                initial={{ pathLength:0 }} animate={{ pathLength:1 }}
                transition={{ duration:0.5, delay:0.65, ease:[0.16,1,0.3,1] }}
              />
            </motion.svg>
          </motion.div>

          <motion.h1 initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:0.9, delay:0.22, ease:[0.16,1,0.3,1] }}
            style={{ fontFamily:"var(--font-heading)", fontWeight:900, fontSize:"clamp(40px,7vw,88px)", lineHeight:0.9, letterSpacing:"-0.045em", textTransform:"uppercase" as const, marginBottom:0 }}>
            <span style={{ display:"block", color:onColor }}>YOU&apos;RE</span>
            <span style={{ display:"block", color:"transparent", WebkitTextStroke:`2px ${lightBg?"rgba(0,0,0,0.55)":"rgba(255,255,255,0.75)"}`, fontSize:"0.82em", marginTop:"0.04em" }}>IN LINE</span>
          </motion.h1>

          <motion.p initial={{ opacity:0, x:-12 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.45 }}
            style={{ fontFamily:"var(--font-script)", fontSize:"clamp(15px,2vw,20px)", color:onMid, marginTop:"14px", display:"inline-block", transform:"rotate(-1.5deg)" }}>
            — we&apos;ll be in touch soon
          </motion.p>
        </div>
      </div>

      <div className="success-content" style={{ background:"#FFFFFF", display:"flex", flexDirection:"column", justifyContent:"center", padding:"clamp(40px,6vw,80px) clamp(28px,4vw,56px)", minHeight:"100vh", overflowY:"auto" }}>
        <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
          transition={{ duration:0.55, delay:0.15, ease:[0.16,1,0.3,1] }}
          style={{ maxWidth:"520px", width:"100%", margin:"0 auto" }}>

          <motion.div variants={container} initial="hidden" animate="show">
            <motion.p variants={item} style={{ fontFamily:"var(--font-body)", fontSize:"14px", color:"#9CA3AF", fontWeight:500, marginBottom:"6px" }}>
              Hi, {firstName || "there"} 👋
            </motion.p>

            <motion.h2 variants={item}
              style={{ fontFamily:"var(--font-heading)", fontWeight:900, fontSize:"clamp(24px,3.5vw,34px)", color:"#0A0A0A", letterSpacing:"-0.03em", lineHeight:1.1, marginBottom:"16px" }}>
              Application Submitted<br/>Successfully
            </motion.h2>

            <motion.div variants={item} style={{ display:"flex", gap:"8px", flexWrap:"wrap", marginBottom:"20px" }}>
              <span style={{ display:"inline-flex", alignItems:"center", background:`${color}18`, color, border:`1px solid ${color}40`, borderRadius:"999px", padding:"4px 12px", fontFamily:"var(--font-body)", fontSize:"12px", fontWeight:700 }}>
                {deptName}
              </span>
              <span style={{ display:"inline-flex", alignItems:"center", background:"#F3F4F6", color:"#6B7280", border:"1px solid #E5E7EB", borderRadius:"999px", padding:"4px 12px", fontFamily:"var(--font-body)", fontSize:"12px", fontWeight:600, letterSpacing:"0.03em" }}>
                {candidateId}
              </span>
            </motion.div>

            <motion.div variants={item}
              style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:"#F9FAFB", border:"1.5px solid #E5E7EB", borderRadius:"14px", padding:"14px 18px", marginBottom:"24px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                <div style={{ width:"8px", height:"8px", borderRadius:"50%", background:"#22C55E", boxShadow:"0 0 0 3px #22C55E30" }}/>
                <span style={{ fontFamily:"var(--font-body)", fontSize:"13px", fontWeight:600, color:"#374151" }}>Review Time</span>
              </div>
              <span style={{ fontFamily:"var(--font-body)", fontSize:"13px", fontWeight:700, color:"#111" }}>Within 7 Days</span>
            </motion.div>

            <motion.div variants={item} style={{ marginBottom:"24px" }}>
              <p style={{ fontFamily:"var(--font-body)", fontSize:"14px", fontWeight:600, color:"#111", lineHeight:1.6, marginBottom:"8px" }}>
                Your application has been received successfully.
              </p>
              <p style={{ fontFamily:"var(--font-body)", fontSize:"14px", color:"#6B7280", lineHeight:1.75 }}>
                Thank you for applying to CIE. Our team carefully reviews every application. If you&apos;re shortlisted, you&apos;ll receive an email with the next steps.
              </p>
            </motion.div>

            <motion.div variants={item} style={{ height:"1px", background:"#F3F4F6", marginBottom:"24px" }}/>

            <motion.div variants={item} style={{ marginBottom:"28px" }}>
              <p style={{ fontFamily:"var(--font-body)", fontSize:"11px", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase" as const, color:"#9CA3AF", marginBottom:"16px" }}>
                Recruitment Timeline
              </p>
              <div>
                {TIMELINE.map((label, i) => {
                  const first = i === 0;
                  return (
                    <div key={label} style={{ display:"flex", alignItems:"flex-start", gap:"12px" }}>
                      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flexShrink:0 }}>
                        {first ? (
                          <motion.div initial={{ scale:0 }} animate={{ scale:1 }}
                            transition={{ duration:0.45, delay:1.9, ease:[0.16,1,0.3,1] }}
                            style={{ width:"22px", height:"22px", borderRadius:"50%", background:color, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 0 0 4px ${color}22` }}>
                            <motion.svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <motion.path d="M 2.5 6 L 5 8.5 L 9.5 3.5"
                                stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                                initial={{ pathLength:0 }} animate={{ pathLength:1 }}
                                transition={{ duration:0.35, delay:2.25, ease:[0.16,1,0.3,1] }}
                              />
                            </motion.svg>
                          </motion.div>
                        ) : (
                          <div style={{ width:"22px", height:"22px", borderRadius:"50%", border:"2px solid #E5E7EB", background:"#FFFFFF" }}/>
                        )}
                        {i < TIMELINE.length - 1 && (
                          <div style={{ width:"2px", height:"24px", background:first ? `${color}30` : "#F3F4F6", marginTop:"2px" }}/>
                        )}
                      </div>
                      <p style={{ fontFamily:"var(--font-body)", fontSize:"13.5px", fontWeight:first?700:500, color:first?"#111":"#9CA3AF", paddingTop:"2px", paddingBottom:i < TIMELINE.length-1 ? "24px" : "0", margin:0 }}>
                        {label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div variants={item} style={{ height:"1px", background:"#F3F4F6", marginBottom:"24px" }}/>

            <motion.div variants={item} style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
              <motion.button onClick={() => router.push("/events")}
                whileHover={{ y:-2, boxShadow:`0 8px 24px ${color}35` }} whileTap={{ scale:0.97 }}
                style={{ width:"100%", background:color, color:"#FFF", fontFamily:"var(--font-body)", fontWeight:700, fontSize:"15px", padding:"15px 20px", borderRadius:"12px", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"8px" }}>
                <Calendar size={16}/> Explore Events
              </motion.button>
              <motion.button onClick={() => router.push("/")}
                whileHover={{ y:-2, boxShadow:"0 4px 12px rgba(0,0,0,0.08)" }} whileTap={{ scale:0.97 }}
                style={{ width:"100%", background:"#F9FAFB", color:"#374151", fontFamily:"var(--font-body)", fontWeight:600, fontSize:"14px", padding:"13px 20px", borderRadius:"12px", border:"1.5px solid #E5E7EB", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"8px" }}>
                <Home size={15}/> Return Home
              </motion.button>
              <motion.button onClick={() => router.push("/council")}
                whileHover={{ color }} whileTap={{ scale:0.97 }}
                style={{ width:"100%", background:"transparent", color:"#9CA3AF", fontFamily:"var(--font-body)", fontWeight:600, fontSize:"13.5px", padding:"11px 20px", borderRadius:"12px", border:"1.5px solid transparent", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"7px" }}>
                <ArrowRight size={14}/> View Team
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <style>{`@media(max-width:768px){
        .success-wrap{grid-template-columns:1fr!important}
        .success-hero{min-height:auto!important;padding-bottom:40px!important}
        .success-content{min-height:auto!important}
      }`}</style>
    </motion.div>
  );
}

// ── Page root ─────────────────────────────────────────────────────────────────

export default function ApplyPage() {
  return (
    <div style={{ background:"#F2F2F0", minHeight:"100vh" }}>
      <Suspense fallback={<div style={{ minHeight:"100vh", background:"#F2F2F0" }}/>}>
        <ApplyForm/>
      </Suspense>
    </div>
  );
}
