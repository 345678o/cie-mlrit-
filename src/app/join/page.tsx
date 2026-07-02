"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Code, FileText, PenLine, Palette, Camera, Mic, BarChart2, ArrowRight } from "lucide-react";
import { PriorityBadge, PreferenceList, type PrefItem } from "@/components/join";

const MAX_PREFS = 3;

const DEPARTMENTS = [
  { key: "tech",        name: "Technical & Product Development", color: "#4A7CDB", icon: Code,      desc: "Build CIE's digital products — websites, tools, AI experiments.", lookingFor: "Problem-solvers who love building things." },
  { key: "content",     name: "Content Writing",                 color: "#CCBA11", icon: FileText,  desc: "Write blog posts, event recaps, newsletters, and long-form stories.", lookingFor: "Storytellers who make ideas land." },
  { key: "creative",    name: "Creative",                        color: "#BE5BFA", icon: PenLine,   desc: "Drive CIE's brand direction — campaigns, themes, visual identity.", lookingFor: "Big-picture thinkers with an eye for detail." },
  { key: "gd",          name: "Graphic Design",                  color: "#68DEF8", icon: Palette,   desc: "Design posters, decks, social assets, and motion content.", lookingFor: "Designers who make people stop scrolling." },
  { key: "photography", name: "Photography and Media",           color: "#FA7712", icon: Camera,    desc: "Capture every CIE moment — photography, video, post-production.", lookingFor: "Visual storytellers with a sharp eye." },
  { key: "ps",          name: "Promotions & Sponsorship",        color: "#D01010", icon: Mic,       desc: "Anchor events, run workshops, and handle PR & outreach.", lookingFor: "Confident communicators who own the room." },
  { key: "ops",         name: "Operations & Finance",            color: "#22C55E", icon: BarChart2, desc: "Manage event logistics, budgets, vendors, and flawless execution.", lookingFor: "Executors who thrive on making things happen." },
];

export default function JoinPage() {
  const router = useRouter();
  const [order, setOrder] = useState<string[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);
  const [warn, setWarn] = useState<string>("");

  const deptMap = useMemo(
    () => Object.fromEntries(DEPARTMENTS.map((d) => [d.key, d])) as Record<string, PrefItem>,
    []
  );

  function toggle(key: string) {
    setOrder((prev) => {
      if (prev.includes(key)) {
        setWarn("");
        return prev.filter((k) => k !== key);
      }
      if (prev.length >= MAX_PREFS) {
        setWarn(`You can select up to ${MAX_PREFS} departments. Remove one to add another.`);
        return prev;
      }
      setWarn("");
      return [...prev, key];
    });
  }

  function move(key: string, dir: -1 | 1) {
    setOrder((prev) => {
      const i = prev.indexOf(key);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }

  function remove(key: string) {
    setWarn("");
    setOrder((prev) => prev.filter((k) => k !== key));
  }

  const isValid = order.length >= 1 && order.length <= MAX_PREFS;

  function proceed() {
    if (isValid) router.push(`/join/apply?depts=${order.join(",")}`);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#ff6f00", paddingTop: "calc(var(--nav-height) + 32px)", paddingBottom: "clamp(40px,8vw,80px)", marginTop: "calc(-1 * var(--nav-height))", position: "relative", overflow: "hidden" }}>

{/* Circle pattern */}
      <svg aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} preserveAspectRatio="xMidYMid slice" viewBox="0 0 1440 900">
        {/* Large rings — top right */}
        <circle cx="1200" cy="-80"  r="340" fill="none" stroke="rgba(255,255,255,0.50)" strokeWidth="1.5"/>
        <circle cx="1200" cy="-80"  r="260" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1"/>
        <circle cx="1200" cy="-80"  r="180" fill="none" stroke="rgba(255,255,255,0.40)" strokeWidth="1"/>
        <circle cx="1200" cy="-80"  r="100" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1"/>
        {/* Large rings — bottom left */}
        <circle cx="160"  cy="860"  r="380" fill="none" stroke="rgba(255,255,255,0.48)" strokeWidth="1.5"/>
        <circle cx="160"  cy="860"  r="280" fill="none" stroke="rgba(255,255,255,0.43)" strokeWidth="1"/>
        <circle cx="160"  cy="860"  r="180" fill="none" stroke="rgba(255,255,255,0.38)" strokeWidth="1"/>
        {/* Medium rings — scattered */}
        <circle cx="720"  cy="450"  r="420" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1"/>
        <circle cx="720"  cy="450"  r="300" fill="none" stroke="rgba(255,255,255,0.30)" strokeWidth="1"/>
        <circle cx="80"   cy="200"  r="120" fill="none" stroke="rgba(255,255,255,0.48)" strokeWidth="1"/>
        <circle cx="1360" cy="700"  r="160" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1"/>
        <circle cx="1360" cy="700"  r="90"  fill="none" stroke="rgba(255,255,255,0.40)" strokeWidth="1"/>
        {/* Small filled dots */}
        <circle cx="400"  cy="140"  r="3.5" fill="rgba(255,255,255,0.50)"/>
        <circle cx="900"  cy="80"   r="2.5" fill="rgba(255,255,255,0.50)"/>
        <circle cx="1100" cy="320"  r="3"   fill="rgba(255,255,255,0.50)"/>
        <circle cx="260"  cy="600"  r="2.5" fill="rgba(255,255,255,0.50)"/>
        <circle cx="1280" cy="480"  r="3"   fill="rgba(255,255,255,0.50)"/>
        <circle cx="620"  cy="820"  r="2"   fill="rgba(255,255,255,0.50)"/>
      </svg>

      {/* Header */}
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 clamp(16px,4vw,24px) clamp(32px,5vw,56px)", textAlign: "center", position: "relative", zIndex: 1 }}>
<span style={{
          display: "inline-block", fontFamily: "var(--font-body)", fontWeight: 700,
          fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.95)", background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.35)",
          borderRadius: "999px", padding: "5px 14px", marginBottom: "24px",
        }}>
          Join CIE Council
        </span>
        <h1 style={{
          fontFamily: "var(--font-heading)", fontWeight: 900,
          fontSize: "clamp(36px, 6vw, 64px)", lineHeight: 0.95,
          letterSpacing: "-0.04em", color: "#FFFFFF", textTransform: "uppercase",
          marginBottom: "20px",
        }}>
          Pick Your<br />
          <span style={{ color: "transparent", WebkitTextStroke: "3px rgba(255,255,255,0.85)" }}>Team</span>
        </h1>
        <p style={{
          fontFamily: "var(--font-body)", fontSize: "clamp(14px,1.5vw,16px)",
          color: "rgba(255,255,255,0.60)", lineHeight: 1.6,
        }}>
          Pick up to 3 departments and rank them by preference. Priority 1 is your
          top choice. You'll fill out a short application on the next step.
        </p>
      </div>

      {/* Department grid */}
      <div className="dept-grid" style={{
        maxWidth: "1100px", margin: "0 auto", padding: "0 clamp(16px,4vw,24px)",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(280px,100%), 1fr))",
        gap: "16px",
        position: "relative", zIndex: 1,
      }}>
        {DEPARTMENTS.map((dept) => {
          const Icon = dept.icon;
          const priority = order.indexOf(dept.key) + 1;
          const isSelected = priority > 0;
          const atLimit = !isSelected && order.length >= MAX_PREFS;
          const isHovered = hovered === dept.key;
          return (
            <motion.button
              key={dept.key}
              onClick={() => toggle(dept.key)}
              aria-pressed={isSelected}
              onMouseEnter={() => setHovered(dept.key)}
              onMouseLeave={() => setHovered(null)}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              style={{
                all: "unset",
                display: "block",
                cursor: "pointer",
                borderRadius: "16px",
                border: isSelected
                  ? `2px solid ${dept.color}`
                  : `1.5px solid rgba(255,255,255,${isHovered ? "1" : "0.85"})`,
                background: isSelected
                  ? `#FFFFFF`
                  : `rgba(255,255,255,${isHovered ? "1" : "0.88"})`,
                padding: "24px",
                textAlign: "left",
                transition: "border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease",
                boxShadow: isSelected ? `0 0 0 4px ${dept.color}22` : "none",
                position: "relative",
                overflow: "hidden",
                opacity: atLimit ? 0.55 : 1,
                transitionProperty: "border-color, background, box-shadow, opacity",
              }}
            >
              {/* Color top bar */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "3px",
                background: dept.color,
                opacity: isSelected ? 1 : isHovered ? 0.6 : 0.3,
                transition: "opacity 0.2s ease",
              }} />

              {/* Icon */}
              <div style={{
                width: "40px", height: "40px", borderRadius: "10px",
                background: `${dept.color}20`,
                border: `1px solid ${dept.color}40`,
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "16px",
              }}>
                <Icon size={20} color={dept.color} />
              </div>

              {/* Name */}
              <p style={{
                fontFamily: "var(--font-heading)", fontWeight: 800,
                fontSize: "17px", color: "#111111", marginBottom: "8px",
                letterSpacing: "-0.02em",
              }}>
                {dept.name}
              </p>

              {/* Desc */}
              <p style={{
                fontFamily: "var(--font-body)", fontSize: "13.5px",
                color: "rgba(0,0,0,0.55)", lineHeight: 1.55, marginBottom: "12px",
              }}>
                {dept.desc}
              </p>

              {/* Looking for */}
              <p style={{
                fontFamily: "var(--font-body)", fontWeight: 600,
                fontSize: "11.5px", color: dept.color,
                letterSpacing: "0.02em",
              }}>
                {dept.lookingFor}
              </p>

              {/* Priority badge */}
              <div style={{ position: "absolute", top: "14px", right: "14px" }}>
                <AnimatePresence>
                  {isSelected && <PriorityBadge priority={priority} color={dept.color} compact />}
                </AnimatePresence>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Limit warning */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 clamp(16px,4vw,24px)", position: "relative", zIndex: 1, minHeight: warn ? undefined : 0 }}>
        <AnimatePresence>
          {warn && (
            <motion.p
              key="warn"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              style={{
                marginTop: "20px",
                fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "13.5px",
                color: "#FFFFFF", background: "rgba(0,0,0,0.28)",
                border: "1px solid rgba(255,255,255,0.35)", borderRadius: "12px",
                padding: "12px 16px", textAlign: "center",
              }}
            >
              {warn}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Your Preferences */}
      <AnimatePresence>
        {order.length > 0 && (
          <motion.div
            key="prefs"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ maxWidth: "720px", margin: "40px auto 0", padding: "0 clamp(16px,4vw,24px)" }}
          >
            <PreferenceList
              items={deptMap}
              order={order}
              onReorder={setOrder}
              onMove={move}
              onRemove={remove}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <div style={{ maxWidth: "1100px", margin: "40px auto 0", padding: "0 clamp(16px,4vw,24px)", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", position: "relative", zIndex: 1 }}>
        <motion.button
          onClick={proceed}
          disabled={!isValid}
          whileHover={isValid ? { scale: 1.03 } : {}}
          whileTap={isValid ? { scale: 0.97 } : {}}
          style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "clamp(14px,2vw,15px)",
            color: isValid ? "#FFFFFF" : "rgba(255,255,255,0.75)",
            background: isValid ? "rgba(0,0,0,0.75)" : "rgba(0,0,0,0.25)",
            border: isValid ? "none" : "1.5px solid rgba(255,255,255,0.30)",
            borderRadius: "999px",
            padding: "15px clamp(24px,4vw,32px)",
            cursor: isValid ? "pointer" : "not-allowed",
            opacity: isValid ? 1 : 0.6,
            transition: "background 0.2s ease, opacity 0.2s ease",
            width: "100%", maxWidth: "360px", justifyContent: "center",
          }}
        >
          {isValid
            ? `Continue with ${order.length} ${order.length === 1 ? "choice" : "choices"}`
            : "Select at least 1 department"}
          <ArrowRight size={16} />
        </motion.button>
      </div>
    </div>
  );
}
