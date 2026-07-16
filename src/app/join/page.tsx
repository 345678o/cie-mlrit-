"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Clock, Bell } from "lucide-react";
import { DEPARTMENTS, type DeptKey } from "@/lib/departments";
import { APPLICATIONS_OPEN } from "@/lib/recruitment";

function DeptGrid({
  excludeKey,
  selectedKey,
  onSelect,
}: {
  excludeKey: DeptKey | null;
  selectedKey: DeptKey | null;
  onSelect: (key: DeptKey) => void;
}) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      className="dept-grid"
      style={{
        maxWidth: "1100px", margin: "0 auto", padding: "0 clamp(16px,4vw,24px)",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(280px,100%), 1fr))",
        gap: "16px",
        position: "relative", zIndex: 1,
      }}
    >
      {DEPARTMENTS.filter((d) => d.key !== excludeKey).map((dept) => {
        const Icon = dept.icon;
        const isSelected = selectedKey === dept.key;
        const isHovered = hovered === dept.key;
        return (
          <motion.button
            key={dept.key}
            onClick={() => onSelect(dept.key)}
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
              border: isSelected ? `2px solid ${dept.color}` : `1.5px solid rgba(255,255,255,${isHovered ? "1" : "0.85"})`,
              background: isSelected ? "#FFFFFF" : `rgba(255,255,255,${isHovered ? "1" : "0.88"})`,
              padding: "24px",
              textAlign: "left",
              transition: "border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease",
              boxShadow: isSelected ? `0 0 0 4px ${dept.color}22` : "none",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: dept.color, opacity: isSelected ? 1 : isHovered ? 0.6 : 0.3, transition: "opacity 0.2s ease" }} />

            <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: `${dept.color}20`, border: `1px solid ${dept.color}40`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
              <Icon size={20} color={dept.color} />
            </div>

            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "17px", color: "#111111", marginBottom: "8px", letterSpacing: "-0.02em" }}>
              {dept.name}
            </p>

            <p style={{ fontFamily: "var(--font-body)", fontSize: "13.5px", color: "rgba(0,0,0,0.55)", lineHeight: 1.55, marginBottom: "12px" }}>
              {dept.desc}
            </p>

            <p style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "11.5px", color: dept.color, letterSpacing: "0.02em" }}>
              {dept.lookingFor}
            </p>

            <div style={{ position: "absolute", top: "14px", right: "14px" }}>
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
                    style={{ width: "26px", height: "26px", borderRadius: "50%", background: dept.color, display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <Check size={14} color="#fff" strokeWidth={3} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

export default function JoinPage() {
  const router = useRouter();
  const [major, setMajor] = useState<DeptKey | null>(null);
  const [minor, setMinor] = useState<DeptKey | null>(null);

  function selectMajor(key: DeptKey) {
    setMajor((prev) => (prev === key ? null : key));
    if (minor === key) setMinor(null);
  }

  function selectMinor(key: DeptKey) {
    setMinor((prev) => (prev === key ? null : key));
  }

  const isValid = !!major && !!minor && major !== minor;

  function proceed() {
    if (!isValid) return;
    try { sessionStorage.setItem("cie-md-prefs", JSON.stringify({ major, minor })); } catch {}
    router.push("/join/apply");
  }

  return (
    <div style={{ minHeight: "100vh", background: "#ff6f00", paddingTop: "calc(var(--nav-height) + 32px)", paddingBottom: "clamp(40px,8vw,80px)", marginTop: "calc(-1 * var(--nav-height))", position: "relative", overflow: "hidden" }}>

      {/* Circle pattern */}
      <svg aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} preserveAspectRatio="xMidYMid slice" viewBox="0 0 1440 900">
        <circle cx="1200" cy="-80"  r="340" fill="none" stroke="rgba(255,255,255,0.50)" strokeWidth="1.5"/>
        <circle cx="1200" cy="-80"  r="260" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1"/>
        <circle cx="1200" cy="-80"  r="180" fill="none" stroke="rgba(255,255,255,0.40)" strokeWidth="1"/>
        <circle cx="1200" cy="-80"  r="100" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1"/>
        <circle cx="160"  cy="860"  r="380" fill="none" stroke="rgba(255,255,255,0.48)" strokeWidth="1.5"/>
        <circle cx="160"  cy="860"  r="280" fill="none" stroke="rgba(255,255,255,0.43)" strokeWidth="1"/>
        <circle cx="160"  cy="860"  r="180" fill="none" stroke="rgba(255,255,255,0.38)" strokeWidth="1"/>
        <circle cx="720"  cy="450"  r="420" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1"/>
        <circle cx="720"  cy="450"  r="300" fill="none" stroke="rgba(255,255,255,0.30)" strokeWidth="1"/>
        <circle cx="80"   cy="200"  r="120" fill="none" stroke="rgba(255,255,255,0.48)" strokeWidth="1"/>
        <circle cx="1360" cy="700"  r="160" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1"/>
        <circle cx="1360" cy="700"  r="90"  fill="none" stroke="rgba(255,255,255,0.40)" strokeWidth="1"/>
        <circle cx="400"  cy="140"  r="3.5" fill="rgba(255,255,255,0.50)"/>
        <circle cx="900"  cy="80"   r="2.5" fill="rgba(255,255,255,0.50)"/>
        <circle cx="1100" cy="320"  r="3"   fill="rgba(255,255,255,0.50)"/>
        <circle cx="260"  cy="600"  r="2.5" fill="rgba(255,255,255,0.50)"/>
        <circle cx="1280" cy="480"  r="3"   fill="rgba(255,255,255,0.50)"/>
        <circle cx="620"  cy="820"  r="2"   fill="rgba(255,255,255,0.50)"/>
      </svg>

      {/* Header */}
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "0 clamp(16px,4vw,24px) clamp(32px,5vw,56px)", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginBottom: "14px" }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 0 3px rgba(34,197,94,0.25)", flexShrink: 0 }} />
          <span style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "10.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)" }}>
            We&apos;re Hiring
          </span>
        </div>
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
          Choose a Major department (your top pick) and a Minor department (your backup).
          You&apos;ll fill out one application covering both on the next step.
        </p>
      </div>

      {/* Major */}
      <div style={{ maxWidth: "1100px", margin: "0 auto 12px", padding: "0 clamp(16px,4vw,24px)", position: "relative", zIndex: 1 }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "18px", color: "#FFFFFF", marginBottom: "16px" }}>
          1. Major Department
        </h2>
      </div>
      <DeptGrid excludeKey={null} selectedKey={major} onSelect={selectMajor} />

      {/* Minor */}
      <AnimatePresence>
        {major && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ maxWidth: "1100px", margin: "40px auto 12px", padding: "0 clamp(16px,4vw,24px)", position: "relative", zIndex: 1 }}>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "18px", color: "#FFFFFF", marginBottom: "16px" }}>
                2. Minor Department
              </h2>
            </div>
            <DeptGrid excludeKey={major} selectedKey={minor} onSelect={selectMinor} />
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
          {isValid ? "Continue to application" : major ? "Select a minor department" : "Select a major department"}
          <ArrowRight size={16} />
        </motion.button>
      </div>
    </div>
  );
}
