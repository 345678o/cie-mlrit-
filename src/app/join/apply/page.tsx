"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft, Code, FileText, PenLine, Palette,
  Camera, Mic, BarChart2, ArrowRight, Check,
  Home, Calendar, Mail,
} from "lucide-react";
import { useNavbarVisibility } from "@/context/NavbarContext";

const ORANGE = "#E8521A";
const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const DEPARTMENTS: Record<string, {
  name: string; color: string; icon: any;
  tagline: string; desc: string; skills: string[];
  stats: { label: string; value: string }[];
}> = {
  tech: {
    name: "Tech", color: "#4A7CDB", icon: Code,
    tagline: "Build products that thousands of students use.",
    desc: "We design and build web applications, AI solutions, automation systems, internal tools, and digital experiences for CIE.",
    skills: [],
    stats: [],
  },
  content: {
    name: "Content", color: "#CCBA11", icon: FileText,
    tagline: "Tell stories that make people care.",
    desc: "We produce all written and editorial output for CIE — blog posts, event write-ups, newsletters, captions, and long-form content.",
    skills: [],
    stats: [],
  },
  creative: {
    name: "Creative", color: "#BE5BFA", icon: PenLine,
    tagline: "Shape the ideas that define CIE.",
    desc: "We drive CIE's creative direction — ideating themes, managing brand consistency, and building the visual identity.",
    skills: [],
    stats: [],
  },
  gd: {
    name: "GD — Graphic Design", color: "#68DEF8", icon: Palette,
    tagline: "Make people stop scrolling.",
    desc: "We shape the visual identity of CIE — designing posters, decks, social assets, UI mockups, and motion content.",
    skills: [],
    stats: [],
  },
  photography: {
    name: "Photography", color: "#FA7712", icon: Camera,
    tagline: "Capture every moment of the CIE journey.",
    desc: "We capture every moment — from hackathon late nights to summit keynotes — through photography, videography, and post-production.",
    skills: [],
    stats: [],
  },
  ps: {
    name: "P&S — Public Speaking", color: "#D01010", icon: Mic,
    tagline: "Own the room. Represent CIE everywhere.",
    desc: "We represent CIE in every room — anchoring events, running communication workshops, and handling PR & outreach.",
    skills: [],
    stats: [],
  },
  ops: {
    name: "Ops & Finance", color: "#22C55E", icon: BarChart2,
    tagline: "Keep everything running, flawlessly.",
    desc: "We keep CIE running — managing event logistics, budgets, vendor relations, and ensuring flawless execution every time.",
    skills: [],
    stats: [],
  },
};

const BRANCHES = ["CSE","CSM","CSD","CSIT","IT","EEE","ECE","MECH","AERO"];
const YEARS    = ["1st Year","2nd Year","3rd Year","4th Year"];

type FormState = { name: string; rollNo: string; phone: string; email: string; branch: string; year: string; why: string };
const EMPTY: FormState = { name:"", rollNo:"", phone:"", email:"", branch:"", year:"", why:"" };

function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  return (r*299 + g*587 + b*114) / 1000 > 155;
}

function inputStyle(focused: boolean, color: string): React.CSSProperties {
  return {
    width: "100%", boxSizing: "border-box" as const,
    fontFamily: "var(--font-body)", fontSize: "16px",
    padding: "0 18px", height: "56px",
    borderRadius: "13px",
    border: focused ? `1.5px solid ${color}` : "1px solid #E5E7EB",
    outline: "none",
    background: "#FFFFFF",
    color: "#111111",
    transition: "border-color 0.18s ease, box-shadow 0.18s ease",
    boxShadow: focused ? `0 0 0 3px ${color}18` : "none",
  };
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label style={{
      display:"block", fontFamily:"var(--font-body)", fontWeight:600,
      fontSize:"14px", color:"#374151", marginBottom:"8px",
    }}>{children}</label>
  );
}

function FieldErr({ msg }: { msg: string }) {
  return (
    <motion.p initial={{ opacity:0, y:-4 }} animate={{ opacity:1, y:0 }}
      style={{ fontFamily:"var(--font-body)", fontSize:"12px", color:"#EF4444", marginTop:"6px", fontWeight:500 }}>
      {msg}
    </motion.p>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"16px", marginBottom:"24px" }}>
      <span style={{
        fontFamily:"var(--font-body)", fontWeight:700, fontSize:"12px",
        color:"#0A0A0A", letterSpacing:"-0.01em", whiteSpace:"nowrap" as const,
      }}>{label}</span>
      <div style={{ flex:1, height:"1px", background:"#E5E7EB" }}/>
    </div>
  );
}

// ── Department background decorations ────────────────────────────────────────

function DeptDecor({ deptKey, lightBg }: { deptKey: string; lightBg: boolean }) {
  const s = lightBg ? "rgba(0,0,0,0.07)" : "rgba(255,255,255,0.07)";
  const f = lightBg ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.04)";
  const common: React.CSSProperties = { position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", overflow:"hidden" };

  if (deptKey === "tech") return (
    <svg aria-hidden viewBox="0 0 400 700" preserveAspectRatio="xMidYMid slice" style={common}>
      <defs>
        <pattern id="tgrid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M48 0L0 0 0 48" fill="none" stroke={s} strokeWidth="0.6"/>
        </pattern>
      </defs>
      <rect width="400" height="700" fill="url(#tgrid)"/>
      <circle cx="290" cy="110" r="6" fill={f} stroke={s} strokeWidth="1.5"/>
      <circle cx="80"  cy="310" r="4" fill={f} stroke={s} strokeWidth="1.5"/>
      <circle cx="330" cy="490" r="5" fill={f} stroke={s} strokeWidth="1.5"/>
      <circle cx="140" cy="590" r="3.5" fill={f} stroke={s} strokeWidth="1.5"/>
      <line x1="80" y1="310" x2="290" y2="110" stroke={s} strokeWidth="0.7" strokeDasharray="5,7"/>
      <line x1="290" y1="110" x2="330" y2="490" stroke={s} strokeWidth="0.7" strokeDasharray="5,7"/>
      <rect x="248" y="190" width="130" height="42" rx="8" fill={f} stroke={s} strokeWidth="0.8"/>
      <rect x="256" y="248" width="90" height="28" rx="8" fill={f} stroke={s} strokeWidth="0.8"/>
      <rect x="16" y="420" width="100" height="32" rx="8" fill={f} stroke={s} strokeWidth="0.8"/>
      <rect x="16" y="465" width="70" height="24" rx="8" fill={f} stroke={s} strokeWidth="0.8"/>
    </svg>
  );

  if (deptKey === "content") return (
    <svg aria-hidden viewBox="0 0 400 700" preserveAspectRatio="xMidYMid slice" style={common}>
      <text x="200" y="560" fontFamily="Georgia,serif" fontSize="440" fill={f} fontWeight="900" textAnchor="middle">"</text>
      {[80,150,220,290,360,430,500,565].map((y,i)=>(
        <rect key={i} x="16" y={y} width={80+Math.abs(Math.sin(i+1)*100)} height="6" rx="3" fill={f}/>
      ))}
    </svg>
  );

  if (deptKey === "creative") return (
    <svg aria-hidden viewBox="0 0 400 700" preserveAspectRatio="xMidYMid slice" style={common}>
      <ellipse cx="310" cy="150" rx="120" ry="75" fill="none" stroke={s} strokeWidth="1.2"/>
      <ellipse cx="90"  cy="540" rx="140" ry="90" fill="none" stroke={s} strokeWidth="1.2"/>
      <path d="M 60 80 Q 220 10 360 120 Q 300 280 160 260 Q 30 240 60 80 Z" fill={f} stroke={s} strokeWidth="1"/>
      <circle cx="170" cy="210" r="55" fill="none" stroke={s} strokeWidth="0.9" strokeDasharray="7,5"/>
      <circle cx="170" cy="210" r="28" fill="none" stroke={s} strokeWidth="0.9" strokeDasharray="5,6"/>
    </svg>
  );

  if (deptKey === "gd") return (
    <svg aria-hidden viewBox="0 0 400 700" preserveAspectRatio="xMidYMid slice" style={common}>
      <rect x="220" y="30" width="150" height="150" rx="12" fill="none" stroke={s} strokeWidth="1.2" transform="rotate(18,295,105)"/>
      <circle cx="90" cy="190" r="85" fill="none" stroke={s} strokeWidth="1.2"/>
      <circle cx="90" cy="190" r="55" fill="none" stroke={s} strokeWidth="0.7"/>
      <circle cx="90" cy="190" r="22" fill={f} stroke={s} strokeWidth="1"/>
      <polygon points="295,440 385,650 205,650" fill={f} stroke={s} strokeWidth="1"/>
      <line x1="152" y1="0"   x2="400" y2="365" stroke={s} strokeWidth="0.6"/>
      <line x1="0"   y1="385" x2="220" y2="700" stroke={s} strokeWidth="0.6"/>
    </svg>
  );

  if (deptKey === "photography") return (
    <svg aria-hidden viewBox="0 0 400 700" preserveAspectRatio="xMidYMid slice" style={common}>
      {[0,45,90,135].map((rot,i)=>(
        <ellipse key={i} cx="288" cy="196" rx="116" ry="33" fill="none" stroke={s} strokeWidth="1"
          transform={`rotate(${rot},288,196)`}/>
      ))}
      <circle cx="288" cy="196" r="124" fill="none" stroke={s} strokeWidth="0.7"/>
      <circle cx="288" cy="196" r="86"  fill="none" stroke={s} strokeWidth="0.7"/>
      <circle cx="288" cy="196" r="38"  fill={f}    stroke={s} strokeWidth="1"/>
      <rect x="16" y="476" width="200" height="132" rx="20" fill="none" stroke={s} strokeWidth="1"/>
      <circle cx="76" cy="540" r="38" fill="none" stroke={s} strokeWidth="0.9"/>
      <rect x="86" y="443" width="60" height="22" rx="8" fill={f} stroke={s} strokeWidth="0.7"/>
    </svg>
  );

  if (deptKey === "ps") return (
    <svg aria-hidden viewBox="0 0 400 700" preserveAspectRatio="xMidYMid slice" style={common}>
      <rect x="270" y="56" width="80" height="135" rx="40" fill="none" stroke={s} strokeWidth="1.2"/>
      <path d="M 258 176 Q 258 266 310 266 Q 362 266 362 176" fill="none" stroke={s} strokeWidth="1"/>
      <line x1="310" y1="266" x2="310" y2="310" stroke={s} strokeWidth="1"/>
      <line x1="278" y1="310" x2="342" y2="310" stroke={s} strokeWidth="1"/>
      {[1,2,3].map(i=>(
        <path key={i} d={`M ${358+i*28} 100 Q ${366+i*28} 165 ${358+i*28} 230`} fill="none" stroke={s} strokeWidth="0.9"/>
      ))}
      <rect x="16" y="434" width="212" height="106" rx="22" fill={f} stroke={s} strokeWidth="0.9"/>
      <polygon points="30,508 14,552 60,508" fill={f} stroke={s} strokeWidth="0.6"/>
      <rect x="36" y="455" width="100" height="7" rx="3.5" fill={s}/>
      <rect x="36" y="476" width="70"  height="7" rx="3.5" fill={s}/>
    </svg>
  );

  return (
    <svg aria-hidden viewBox="0 0 400 700" preserveAspectRatio="xMidYMid slice" style={common}>
      {[{h:70,x:0},{h:110,x:1},{h:84,x:2},{h:130,x:3},{h:98,x:4}].map((b,i)=>(
        <rect key={i} x={216+i*36} y={560-b.h} width="24" height={b.h} rx="5" fill={f} stroke={s} strokeWidth="0.9"/>
      ))}
      <line x1="210" y1="560" x2="390" y2="560" stroke={s} strokeWidth="0.9"/>
      <polyline points="220,540 256,515 292,522 328,498 364,505 390,482" fill="none" stroke={s} strokeWidth="1" strokeDasharray="5,4"/>
      {Array.from({length:7},(_,i)=>Array.from({length:5},(_,j)=>(
        <rect key={`${i}-${j}`} x={16+i*32} y={80+j*62} width="26" height="48" rx="6" fill={f} stroke={s} strokeWidth="0.7"/>
      )))}
    </svg>
  );
}

// ── Progress indicator ────────────────────────────────────────────────────────

function ProgressBar({ color }: { color: string }) {
  return (
    <div style={{ display:"flex", alignItems:"flex-start", marginBottom:"40px" }}>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"8px" }}>
        <div style={{ width:"28px", height:"28px", borderRadius:"50%", background:color, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 0 0 4px ${color}22` }}>
          <Check size={13} color="#fff" strokeWidth={3}/>
        </div>
        <span style={{ fontFamily:"var(--font-body)", fontWeight:600, fontSize:"11px", color, whiteSpace:"nowrap" as const }}>Department</span>
      </div>
      <div style={{ flex:1, height:"2px", background:`linear-gradient(to right,${color},${color}50)`, marginTop:"13px", flexShrink:1 }}/>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"8px" }}>
        <div style={{ width:"28px", height:"28px", borderRadius:"50%", background:"#FFFFFF", border:`2px solid ${color}`, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 0 0 4px ${color}18` }}>
          <div style={{ width:"8px", height:"8px", borderRadius:"50%", background:color }}/>
        </div>
        <span style={{ fontFamily:"var(--font-body)", fontWeight:700, fontSize:"11px", color:"#111", whiteSpace:"nowrap" as const }}>Your Details</span>
      </div>
    </div>
  );
}

// ── Main form ─────────────────────────────────────────────────────────────────

function ApplyForm() {
  const searchParams = useSearchParams();
  const router       = useRouter();

  const rawDept = searchParams.get("dept") ?? "";
  const dept    = DEPARTMENTS[rawDept] ?? null;
  const color   = dept?.color ?? ORANGE;

  const lightBg      = isLightColor(color);
  const onColor      = lightBg ? "rgba(0,0,0,0.88)" : "#FFFFFF";
  const onColorMid   = lightBg ? "rgba(0,0,0,0.58)" : "rgba(255,255,255,0.70)";
  const onColorFaint = lightBg ? "rgba(0,0,0,0.40)" : "rgba(255,255,255,0.46)";
  const tagBg        = lightBg ? "rgba(0,0,0,0.09)" : "rgba(255,255,255,0.14)";
  const tagBorder    = lightBg ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.20)";

  const { hide, show } = useNavbarVisibility();

  const [form, setForm]           = useState<FormState>(EMPTY);
  const [focused, setFocused]     = useState<keyof FormState | "">("");
  const [errors, setErrors]       = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [hoverBtn, setHoverBtn]   = useState(false);
  const [submitProgress, setSubmitProgress] = useState(0);
  const [appId, setAppId]                   = useState("");

  useEffect(() => {
    hide();
    return () => show();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function set(k: keyof FormState, v: string) {
    setForm(p => ({ ...p, [k]: v }));
    if (errors[k]) setErrors(p => ({ ...p, [k]: "" }));
  }

  function validate(): boolean {
    const e: Partial<FormState> = {};
    if (!form.name.trim())                        e.name   = "Full name is required";
    if (!form.rollNo.trim())                      e.rollNo = "Roll number is required";
    if (!/^\d{10}$/.test(form.phone.trim()))      e.phone  = "Enter a valid 10-digit number";
    if (!form.email.includes("@"))                e.email  = "Enter a valid email address";
    if (!form.branch)                             e.branch = "Please select your branch";
    if (!form.year)                               e.year   = "Please select your year";
    if (form.why.trim().length < 30)              e.why    = "Please write at least 30 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setSubmitProgress(0);
    setAppId(`CIE-2026-${Math.floor(1000 + Math.random() * 9000)}`);

    // RAF-driven fill: 0→90 over 1000ms
    const startMs = performance.now();
    await new Promise<void>(resolve => {
      function tick(now: number) {
        const t = Math.min(1, (now - startMs) / 1000);
        setSubmitProgress(t * 90);
        if (t < 1) requestAnimationFrame(tick);
        else resolve();
      }
      requestAnimationFrame(tick);
    });

    setSubmitProgress(100);
    await new Promise(r => setTimeout(r, 220));
    setLoading(false);
    setSubmitted(true);
    show();
    fireConfetti(color);
  }

  function fireConfetti(col: string) {
    import("canvas-confetti").then(({ default: confetti }) => {
      const colors = [col, "#FFFFFF", ORANGE, "#FFD700"];

      // Initial burst from middle
      confetti({ particleCount: 120, spread: 80, origin: { x: 0.5, y: 0.5 }, colors, scalar: 1 });

      // Left cannon
      confetti({ particleCount: 60, angle: 60, spread: 55, origin: { x: 0, y: 0.6 }, colors });

      // Right cannon
      confetti({ particleCount: 60, angle: 120, spread: 55, origin: { x: 1, y: 0.6 }, colors });

      // Second wave
      setTimeout(() => {
        confetti({ particleCount: 80, spread: 70, origin: { x: 0.5, y: 0.45 }, colors, scalar: 0.85 });
        confetti({ particleCount: 40, angle: 70,  spread: 50, origin: { x: 0, y: 0.5 }, colors });
        confetti({ particleCount: 40, angle: 110, spread: 50, origin: { x: 1, y: 0.5 }, colors });
      }, 350);

      // Third trickle
      setTimeout(() => {
        confetti({ particleCount: 50, spread: 100, origin: { x: 0.5, y: 0.35 }, colors, scalar: 0.75, gravity: 0.8 });
      }, 700);
    });
  }

  if (!dept) {
    return (
      <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#F2F2F0" }}>
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          style={{ textAlign:"center", maxWidth:"360px", padding:"48px" }}>
          <div style={{ width:"64px", height:"64px", borderRadius:"18px", background:"#F3F4F6", border:"1.5px solid #E5E7EB", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 24px" }}>
            <BarChart2 size={28} color="#9CA3AF"/>
          </div>
          <h2 style={{ fontFamily:"var(--font-heading)", fontWeight:900, fontSize:"28px", color:"#111", letterSpacing:"-0.03em", marginBottom:"12px" }}>
            No department selected
          </h2>
          <p style={{ fontFamily:"var(--font-body)", fontSize:"15px", color:"#6B7280", lineHeight:1.7, marginBottom:"32px" }}>
            Pick a department first — each team has its own application.
          </p>
          <button onClick={() => router.push("/join")}
            style={{ background:ORANGE, color:"#FFF", fontFamily:"var(--font-body)", fontWeight:700, fontSize:"15px", padding:"14px 28px", borderRadius:"12px", border:"none", cursor:"pointer", display:"inline-flex", alignItems:"center", gap:"8px" }}>
            Choose a department <ArrowRight size={16}/>
          </button>
        </motion.div>
      </div>
    );
  }

  const Icon = dept.icon;

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <SuccessScreen key="success" dept={dept.name} color={color} firstName={form.name.trim().split(" ")[0]} appId={appId}/>
      ) : (
        <motion.div key="form" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
          style={{ minHeight:"100vh", background:"#F2F2F0", marginTop:"calc(-1 * var(--nav-height))", display:"flex", flexDirection:"column" }}>

          {/* ── Department Hero Card ── */}
          <section style={{
            background: color,
            position: "relative",
            overflow: "hidden",
            paddingTop: "clamp(60px, 8vw, 96px)",
            paddingBottom: "clamp(48px, 5vw, 72px)",
            paddingLeft: "clamp(24px, 6vw, 80px)",
            paddingRight: "clamp(24px, 6vw, 80px)",
          }}>
            {/* Grain */}
            <div aria-hidden style={{ position:"absolute", inset:0, backgroundImage:GRAIN, opacity:0.03, mixBlendMode:"multiply" as const, pointerEvents:"none", zIndex:0 }}/>
            {/* Art */}
            <DeptDecor deptKey={rawDept} lightBg={lightBg}/>
            {/* CIE watermark */}
            <div aria-hidden style={{ position:"absolute", bottom:"-20px", right:"0", fontFamily:"var(--font-heading)", fontWeight:900, fontSize:"clamp(80px,18vw,220px)", color:lightBg?"rgba(0,0,0,0.04)":"rgba(255,255,255,0.04)", lineHeight:1, letterSpacing:"-0.06em", userSelect:"none" as const, pointerEvents:"none", zIndex:0 }}>CIE</div>

            <div style={{ position:"relative", zIndex:2, maxWidth:"1040px", margin:"0 auto" }}>

              {/* Back */}
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

              {/* Icon + label */}
              <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"16px" }}>
                <motion.div initial={{ opacity:0, scale:0.5 }} animate={{ opacity:1, scale:1 }}
                  transition={{ duration:0.5, delay:0.1, ease:[0.16,1,0.3,1] }}
                  style={{
                    width:"44px", height:"44px", borderRadius:"12px",
                    background:lightBg?"rgba(0,0,0,0.10)":"rgba(255,255,255,0.16)",
                    border:`1px solid ${lightBg?"rgba(0,0,0,0.12)":"rgba(255,255,255,0.20)"}`,
                    display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
                  }}>
                  <Icon size={20} style={{ color:onColor }}/>
                </motion.div>
                <motion.span initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.15 }}
                  style={{ fontFamily:"var(--font-body)", fontWeight:700, fontSize:"10px", letterSpacing:"0.10em", textTransform:"uppercase" as const, color:onColorFaint }}>
                  Applying for · {dept.name}
                </motion.span>
              </div>

              {/* Tagline */}
              <motion.h1 initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
                transition={{ duration:0.65, delay:0.2, ease:[0.16,1,0.3,1] }}
                style={{
                  fontFamily:"var(--font-heading)", fontWeight:900,
                  fontSize:"clamp(28px, 4.5vw, 56px)", lineHeight:1.06,
                  letterSpacing:"-0.04em", color:onColor,
                  marginBottom:"14px", maxWidth:"640px",
                }}>
                {dept.tagline}
              </motion.h1>

              {/* Desc */}
              <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3 }}
                style={{ fontFamily:"var(--font-body)", fontSize:"14px", lineHeight:1.75, color:onColorMid, marginBottom:"24px", maxWidth:"560px" }}>
                {dept.desc}
              </motion.p>

              {/* Skills + Stats */}
              <div className="hero-meta" style={{ display:"flex", gap:"clamp(24px,4vw,56px)", flexWrap:"wrap", alignItems:"flex-start" }}>

                {/* Skills */}
                <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.38 }}
                  style={{ display:"flex", flexWrap:"wrap", gap:"6px", flex:"1 1 auto" }}>
                  {dept.skills.map(s => (
                    <span key={s} style={{
                      fontFamily:"var(--font-body)", fontSize:"11px", fontWeight:600,
                      padding:"5px 13px", borderRadius:"999px",
                      background:tagBg, color:onColor, border:`1px solid ${tagBorder}`,
                    }}>{s}</span>
                  ))}
                </motion.div>

                {/* Stats */}
                <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.46 }}
                  style={{
                    display:"grid", gridTemplateColumns:`repeat(${dept.stats.length},1fr)`,
                    borderRadius:"14px",
                    border:`1px solid ${lightBg?"rgba(0,0,0,0.10)":"rgba(255,255,255,0.12)"}`,
                    background:lightBg?"rgba(0,0,0,0.06)":"rgba(255,255,255,0.08)",
                    overflow:"hidden", flexShrink:0,
                  }}>
                  {dept.stats.map((stat, i) => (
                    <div key={stat.label} style={{
                      padding:"14px 20px",
                      borderRight:i < dept.stats.length-1 ? `1px solid ${lightBg?"rgba(0,0,0,0.08)":"rgba(255,255,255,0.10)"}` : "none",
                      textAlign:"center" as const,
                    }}>
                      <div style={{ fontFamily:"var(--font-heading)", fontWeight:900, fontSize:"clamp(18px,2.5vw,26px)", color:onColor, letterSpacing:"-0.03em", lineHeight:1 }}>
                        {stat.value}
                      </div>
                      <div style={{ fontFamily:"var(--font-body)", fontWeight:500, fontSize:"9.5px", color:onColorFaint, marginTop:"4px", letterSpacing:"0.04em", textTransform:"uppercase" as const }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </motion.div>

              </div>
            </div>
          </section>

          {/* ── Application Section ── */}
          <section style={{ background:"#FAFAFA", flex:1 }}>
            <div style={{
              maxWidth:"1040px", margin:"0 auto",
              paddingTop:"clamp(40px,5vw,64px)",
              paddingBottom:"clamp(64px,8vw,96px)",
              paddingLeft:"clamp(20px,4vw,40px)",
              paddingRight:"clamp(20px,4vw,40px)",
            }}>

              {/* Progress */}
              <div style={{ maxWidth:"400px", marginBottom:"clamp(32px,4vw,48px)" }}>
                <ProgressBar color={color}/>
              </div>

              {/* Section intro — left-aligned, compact */}
              <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
                transition={{ duration:0.6, delay:0.1, ease:[0.16,1,0.3,1] }}
                style={{ marginBottom:"clamp(40px,5vw,56px)" }}>
                <span style={{
                  fontFamily:"var(--font-body)", fontWeight:700, fontSize:"11px",
                  letterSpacing:"0.14em", textTransform:"uppercase" as const,
                  color:color, display:"block", marginBottom:"12px",
                }}>Application</span>
                <h2 style={{
                  fontFamily:"var(--font-heading)", fontWeight:900,
                  fontSize:"clamp(28px,4vw,48px)", color:"#0A0A0A",
                  letterSpacing:"-0.04em", lineHeight:1.05, marginBottom:"12px",
                }}>
                  Complete Your Application
                </h2>
                <p style={{
                  fontFamily:"var(--font-body)", fontSize:"15px", color:"#6B7280",
                  lineHeight:1.75, maxWidth:"560px",
                }}>
                  Fill in the details below to apply for the <strong style={{ color:"#374151" }}>{dept.name}</strong> department. Every application is reviewed carefully by our team.
                </p>
              </motion.div>

              {/* Form */}
              <motion.form initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
                transition={{ duration:0.6, delay:0.2, ease:[0.16,1,0.3,1] }}
                onSubmit={handleSubmit} noValidate>

                {/* ── Personal Information ── */}
                <SectionDivider label="Personal Information"/>
                <div style={{ display:"grid", gap:"20px", marginBottom:"48px" }}>

                  <div className="form-row" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px" }}>
                    <div>
                      <Label>Full Name</Label>
                      <input type="text" placeholder="Anamika Kumari" value={form.name}
                        onChange={e => set("name", e.target.value)}
                        onFocus={() => setFocused("name")} onBlur={() => setFocused("")}
                        style={inputStyle(focused==="name", color)}/>
                      {errors.name && <FieldErr msg={errors.name}/>}
                    </div>
                    <div>
                      <Label>Roll Number</Label>
                      <input type="text" placeholder="21B01A0XXX" value={form.rollNo}
                        onChange={e => set("rollNo", e.target.value)}
                        onFocus={() => setFocused("rollNo")} onBlur={() => setFocused("")}
                        style={inputStyle(focused==="rollNo", color)}/>
                      {errors.rollNo && <FieldErr msg={errors.rollNo}/>}
                    </div>
                  </div>

                  <div className="form-row" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px" }}>
                    <div>
                      <Label>Phone Number</Label>
                      <input type="tel" placeholder="9XXXXXXXXX" value={form.phone}
                        onChange={e => set("phone", e.target.value)}
                        onFocus={() => setFocused("phone")} onBlur={() => setFocused("")}
                        style={inputStyle(focused==="phone", color)}/>
                      {errors.phone && <FieldErr msg={errors.phone}/>}
                    </div>
                    <div>
                      <Label>College Email</Label>
                      <input type="email" placeholder="you@mlrit.ac.in" value={form.email}
                        onChange={e => set("email", e.target.value)}
                        onFocus={() => setFocused("email")} onBlur={() => setFocused("")}
                        style={inputStyle(focused==="email", color)}/>
                      {errors.email && <FieldErr msg={errors.email}/>}
                    </div>
                  </div>

                </div>

                {/* ── Academic Details ── */}
                <SectionDivider label="Academic Details"/>
                <div style={{ display:"grid", gap:"20px", marginBottom:"48px" }}>

                  <div className="form-row" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px", alignItems:"start" }}>
                    <div>
                      <Label>Branch</Label>
                      <select value={form.branch}
                        onChange={e => set("branch", e.target.value)}
                        onFocus={() => setFocused("branch")} onBlur={() => setFocused("")}
                        style={{ ...inputStyle(focused==="branch", color), appearance:"auto" as any }}>
                        <option value="">Select your branch…</option>
                        {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                      {errors.branch && <FieldErr msg={errors.branch}/>}
                    </div>
                    <div>
                      <Label>Year of Study</Label>
                      <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
                        {YEARS.map(y => (
                          <motion.button key={y} type="button" onClick={() => set("year", y)}
                            whileHover={{ y:-1 }} whileTap={{ scale:0.97 }}
                            style={{
                              fontFamily:"var(--font-body)", fontWeight:600, fontSize:"14px",
                              padding:"0 24px", height:"56px", borderRadius:"13px", cursor:"pointer",
                              border:form.year===y ? `1.5px solid ${color}` : "1px solid #E5E7EB",
                              background:form.year===y ? `${color}10` : "#FFFFFF",
                              color:form.year===y ? color : "#374151",
                              transition:"all 0.18s ease",
                              boxShadow:form.year===y ? `0 0 0 3px ${color}15` : "none",
                            }}>{y}</motion.button>
                        ))}
                      </div>
                      {errors.year && <FieldErr msg={errors.year}/>}
                    </div>
                  </div>

                </div>

                {/* ── Application ── */}
                <SectionDivider label="Application"/>
                <div style={{ display:"grid", gap:"20px", marginBottom:"48px" }}>

                  <div>
                    <Label>Why do you want to join {dept.name}?</Label>
                    <textarea
                      placeholder={`Tell us why you want to join ${dept.name} — your passion, experience, and what you'll bring to the team.`}
                      value={form.why} rows={6}
                      onChange={e => set("why", e.target.value)}
                      onFocus={() => setFocused("why")} onBlur={() => setFocused("")}
                      style={{
                        ...inputStyle(focused==="why", color),
                        height:"auto", minHeight:"160px",
                        padding:"16px 18px", lineHeight:"1.65",
                        resize:"vertical" as const,
                      }}/>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:"6px" }}>
                      {errors.why ? <FieldErr msg={errors.why}/> : <span/>}
                      <span style={{ fontFamily:"var(--font-body)", fontSize:"12px", fontWeight:600, color:form.why.trim().length>=30 ? color : "#9CA3AF" }}>
                        {form.why.trim().length} / 30+
                      </span>
                    </div>
                  </div>

                </div>

                {/* Submit */}
                <div style={{ display:"flex", alignItems:"center", gap:"24px", flexWrap:"wrap" }}>
                  <motion.button
                    type="submit" disabled={loading}
                    onMouseEnter={() => setHoverBtn(true)}
                    onMouseLeave={() => setHoverBtn(false)}
                    whileHover={!loading ? { y:-2 } : {}}
                    whileTap={!loading ? { scale:0.99 } : {}}
                    style={{
                      height:"56px", padding:"0 40px",
                      borderRadius:"13px", border:"none",
                      background:color, color:"#FFFFFF",
                      fontFamily:"var(--font-body)", fontWeight:700, fontSize:"16px",
                      cursor:loading ? "not-allowed" : "pointer",
                      display:"inline-flex", alignItems:"center", justifyContent:"center", gap:"10px",
                      transition:"box-shadow 0.2s ease",
                      boxShadow: loading ? "none" : `0 4px 24px ${color}35`,
                      letterSpacing:"-0.01em",
                      position:"relative", overflow:"hidden",
                      minWidth:"220px",
                    }}>
                    {loading && (
                      <div style={{
                        position:"absolute", bottom:0, left:0, height:"3px",
                        background:"rgba(255,255,255,0.55)",
                        width:`${submitProgress}%`,
                        transition:"width 0.05s linear",
                      }}/>
                    )}
                    {loading ? (
                      <>
                        <span style={{ width:"16px", height:"16px", border:"2px solid rgba(255,255,255,0.35)", borderTopColor:"#FFF", borderRadius:"50%", display:"inline-block", animation:"spin 0.7s linear infinite" }}/>
                        {submitProgress < 100 ? "Submitting…" : "Done!"}
                      </>
                    ) : (
                      <>
                        Submit Application
                        <motion.span animate={{ x:hoverBtn ? 5 : 0 }} transition={{ duration:0.2 }}>
                          <ArrowRight size={18}/>
                        </motion.span>
                      </>
                    )}
                  </motion.button>

                  <p style={{ fontFamily:"var(--font-body)", fontSize:"13px", color:"#9CA3AF", lineHeight:1.6 }}>
                    Applications reviewed within 5–7 days · Results via college email
                  </p>
                </div>

              </motion.form>

            </div>
          </section>

          <style>{`
            @keyframes spin { to { transform: rotate(360deg); } }
            @media (max-width: 560px) {
              .form-row { grid-template-columns: 1fr !important; }
              .hero-meta { flex-direction: column !important; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Success screen ────────────────────────────────────────────────────────────

function SuccessScreen({ dept, color, firstName, appId }: { dept: string; color: string; firstName: string; appId: string }) {
  const router  = useRouter();
  const lightBg = isLightColor(color);
  const onColor = lightBg ? "rgba(0,0,0,0.88)" : "#FFFFFF";
  const onMid   = lightBg ? "rgba(0,0,0,0.58)" : "rgba(255,255,255,0.75)";

  const container = {
    hidden: {},
    show:   { transition: { staggerChildren: 0.09, delayChildren: 1.55 } },
  };
  const item = {
    hidden: { opacity: 0, y: 14 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
  };

  const TIMELINE = [
    "Application Submitted",
    "Under Review",
    "Shortlisting",
    "Interview",
    "Final Selection",
  ];

  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.5 }}
      style={{ minHeight:"100vh", display:"grid", gridTemplateColumns:"40% 60%" }}
      className="success-wrap">

      {/* Left */}
      <div className="page-hero" style={{
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
            <span style={{ display:"block", color:onColor }}>YOU'RE</span>
            <span style={{ display:"block", color:"transparent", WebkitTextStroke:`2px ${lightBg?"rgba(0,0,0,0.55)":"rgba(255,255,255,0.75)"}`, fontSize:"0.82em", marginTop:"0.04em" }}>IN LINE</span>
          </motion.h1>

          <motion.p initial={{ opacity:0, x:-12 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.45 }}
            style={{ fontFamily:"var(--font-script)", fontSize:"clamp(15px,2vw,20px)", color:onMid, marginTop:"14px", display:"inline-block", transform:"rotate(-1.5deg)" }}>
            — we'll be in touch soon
          </motion.p>
        </div>
      </div>

      {/* Right */}
      <div style={{ background:"#FFFFFF", display:"flex", flexDirection:"column", justifyContent:"center", padding:"clamp(40px,6vw,80px) clamp(28px,4vw,56px)", minHeight:"100vh", overflowY:"auto" }}>
        <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
          transition={{ duration:0.55, delay:0.15, ease:[0.16,1,0.3,1] }}
          style={{ maxWidth:"520px", width:"100%", margin:"0 auto" }}>

          <motion.div variants={container} initial="hidden" animate="show">

            {/* Greeting */}
            <motion.p variants={item}
              style={{ fontFamily:"var(--font-body)", fontSize:"14px", color:"#9CA3AF", fontWeight:500, marginBottom:"6px" }}>
              Hi, {firstName || "there"} 👋
            </motion.p>

            {/* Heading */}
            <motion.h2 variants={item}
              style={{ fontFamily:"var(--font-heading)", fontWeight:900, fontSize:"clamp(24px,3.5vw,34px)", color:"#0A0A0A", letterSpacing:"-0.03em", lineHeight:1.1, marginBottom:"16px" }}>
              Application Submitted<br/>Successfully
            </motion.h2>

            {/* Dept chip + App ID */}
            <motion.div variants={item} style={{ display:"flex", gap:"8px", flexWrap:"wrap", marginBottom:"20px" }}>
              <span style={{ display:"inline-flex", alignItems:"center", background:`${color}18`, color, border:`1px solid ${color}40`, borderRadius:"999px", padding:"4px 12px", fontFamily:"var(--font-body)", fontSize:"12px", fontWeight:700 }}>
                {dept}
              </span>
              <span style={{ display:"inline-flex", alignItems:"center", background:"#F3F4F6", color:"#6B7280", border:"1px solid #E5E7EB", borderRadius:"999px", padding:"4px 12px", fontFamily:"var(--font-body)", fontSize:"12px", fontWeight:600, letterSpacing:"0.03em" }}>
                {appId}
              </span>
            </motion.div>

            {/* Review time card */}
            <motion.div variants={item}
              style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:"#F9FAFB", border:"1.5px solid #E5E7EB", borderRadius:"14px", padding:"14px 18px", marginBottom:"24px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                <div style={{ width:"8px", height:"8px", borderRadius:"50%", background:"#22C55E", boxShadow:"0 0 0 3px #22C55E30" }}/>
                <span style={{ fontFamily:"var(--font-body)", fontSize:"13px", fontWeight:600, color:"#374151" }}>Review Time</span>
              </div>
              <span style={{ fontFamily:"var(--font-body)", fontSize:"13px", fontWeight:700, color:"#111" }}>Within 7 Days</span>
            </motion.div>

            {/* Thank-you message */}
            <motion.div variants={item} style={{ marginBottom:"24px" }}>
              <p style={{ fontFamily:"var(--font-body)", fontSize:"14px", fontWeight:600, color:"#111", lineHeight:1.6, marginBottom:"8px" }}>
                Your application has been received successfully.
              </p>
              <p style={{ fontFamily:"var(--font-body)", fontSize:"14px", color:"#6B7280", lineHeight:1.75 }}>
                Thank you for applying to the <strong style={{ color:"#374151" }}>{dept}</strong>. Our team carefully reviews every application. If you're shortlisted, you'll receive an email with the next steps.
              </p>
            </motion.div>

            {/* Divider */}
            <motion.div variants={item} style={{ height:"1px", background:"#F3F4F6", marginBottom:"24px" }}/>

            {/* Recruitment timeline */}
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
                          <motion.div
                            initial={{ scale:0 }} animate={{ scale:1 }}
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

            {/* Divider */}
            <motion.div variants={item} style={{ height:"1px", background:"#F3F4F6", marginBottom:"24px" }}/>

            {/* Action buttons */}
            <motion.div variants={item} style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
              <motion.button onClick={() => router.push("/events")}
                whileHover={{ y:-2, boxShadow:`0 8px 24px ${color}35` }} whileTap={{ scale:0.97 }}
                style={{ width:"100%", background:color, color:"#FFF", fontFamily:"var(--font-body)", fontWeight:700, fontSize:"15px", padding:"15px 20px", borderRadius:"12px", border:"none", cursor:"pointer", transition:"all 0.2s ease", display:"flex", alignItems:"center", justifyContent:"center", gap:"8px" }}>
                <Calendar size={16}/> Explore Events
              </motion.button>

              <motion.button onClick={() => router.push("/")}
                whileHover={{ y:-2, boxShadow:"0 4px 12px rgba(0,0,0,0.08)" }} whileTap={{ scale:0.97 }}
                style={{ width:"100%", background:"#F9FAFB", color:"#374151", fontFamily:"var(--font-body)", fontWeight:600, fontSize:"14px", padding:"13px 20px", borderRadius:"12px", border:"1.5px solid #E5E7EB", cursor:"pointer", transition:"all 0.2s ease", display:"flex", alignItems:"center", justifyContent:"center", gap:"8px" }}>
                <Home size={15}/> Return Home
              </motion.button>

              <motion.button onClick={() => router.push("/council")}
                whileHover={{ color }} whileTap={{ scale:0.97 }}
                style={{ width:"100%", background:"transparent", color:"#9CA3AF", fontFamily:"var(--font-body)", fontWeight:600, fontSize:"13.5px", padding:"11px 20px", borderRadius:"12px", border:"1.5px solid transparent", cursor:"pointer", transition:"color 0.2s ease", display:"flex", alignItems:"center", justifyContent:"center", gap:"7px" }}>
                <ArrowRight size={14}/> View Team
              </motion.button>
            </motion.div>

          </motion.div>
        </motion.div>
      </div>

      <style>{`@media(max-width:768px){.success-wrap{grid-template-columns:1fr!important}}`}</style>
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
