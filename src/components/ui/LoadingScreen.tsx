"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const LETTERS = ["C", "I", "E"];

/* Expanding ring — pure CSS div */
function Ring({ delay, size }: { delay: number; size: number }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0.6 }}
      animate={{ scale: 1, opacity: 0 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "absolute",
        width:  size,
        height: size,
        borderRadius: "50%",
        border: "1.5px solid rgba(255,255,255,0.55)",
        pointerEvents: "none",
      }}
    />
  );
}

export default function LoadingScreen() {
  const pathname              = usePathname();
  const [visible, setVisible] = useState(true);
  const [burst,   setBurst]   = useState(false);
  const [key,     setKey]     = useState(0);

  const run = () => {
    setBurst(false);
    setVisible(true);
    const t1 = setTimeout(() => setBurst(true),  860);
    const t2 = setTimeout(() => setVisible(false), 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  };

  useEffect(run, []);
  useEffect(() => { setKey(k => k + 1); return run(); }, [pathname]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={key}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.22, ease: "easeIn" } }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* ── Dark background — fades out during burst ── */}
          <motion.div
            animate={burst ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.65, ease: "easeIn", delay: 0.1 }}
            style={{ position: "absolute", inset: 0, background: "#000000" }}
          />

          {/* ── Radial bloom — white glow expands from centre ── */}
          {burst && (
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 6, opacity: 0 }}
              transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "absolute",
                width: "40vw", height: "40vw",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,255,255,0.92) 0%, rgba(255,94,44,0.35) 35%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
          )}

          {/* ── Expanding rings ── */}
          {burst && (
            <div style={{ position: "absolute", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Ring delay={0}    size={200} />
              <Ring delay={0.1}  size={380} />
              <Ring delay={0.2}  size={580} />
              <Ring delay={0.32} size={820} />
              <Ring delay={0.44} size={1100} />
            </div>
          )}

          {/* ── Orange chromatic ghost (behind) ── */}
          {burst && (
            <motion.div
              initial={{ scale: 1, opacity: 0.55, x: 6, y: -4 }}
              animate={{ scale: 20, opacity: 0 }}
              transition={{ duration: 0.62, ease: [0.55, 0, 1, 0.45] }}
              style={{
                position: "absolute",
                display: "flex", alignItems: "baseline", gap: "0.02em",
                fontFamily: "var(--font-heading)", fontWeight: 900,
                fontSize: "clamp(96px, 20vw, 200px)",
                lineHeight: 1, letterSpacing: "-0.06em",
                color: "#FF5E2C",
                pointerEvents: "none", userSelect: "none",
              }}
            >
              CIE.
            </motion.div>
          )}

          {/* ── Main CIE text ── */}
          <motion.div
            animate={burst
              ? { scale: 18, opacity: 0 }
              : { scale: 1,  opacity: 1 }}
            transition={burst
              ? { duration: 0.58, ease: [0.55, 0, 1, 0.45] }
              : { duration: 0 }}
            style={{
              position: "relative", zIndex: 1,
              display: "flex", alignItems: "baseline", gap: "0.02em",
              transformOrigin: "center",
            }}
          >
            {LETTERS.map((letter, i) => (
              <div key={letter} style={{ overflow: "hidden" }}>
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.38, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    display: "block",
                    fontFamily: "var(--font-heading)", fontWeight: 900,
                    fontSize: "clamp(96px, 20vw, 200px)",
                    lineHeight: 1, letterSpacing: "-0.06em",
                    color: "#FFFFFF",
                  }}
                >
                  {letter}
                </motion.span>
              </div>
            ))}
            <div style={{ overflow: "hidden" }}>
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.3, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: "block",
                  fontFamily: "var(--font-heading)", fontWeight: 900,
                  fontSize: "clamp(96px, 20vw, 200px)",
                  lineHeight: 1, color: "#FF5E2C",
                }}
              >
                .
              </motion.span>
            </div>
          </motion.div>

          {/* ── Subtitle ── */}
          <motion.div
            style={{ position: "relative", zIndex: 1, overflow: "hidden", marginTop: "14px" }}
            animate={burst ? { opacity: 0, y: 8 } : {}}
            transition={{ duration: 0.2 }}
          >
            <motion.p
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: 0.36 }}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(10px, 1.2vw, 13px)",
                fontWeight: 600, letterSpacing: "0.22em",
                textTransform: "uppercase", color: "#FF5E2C", margin: 0,
              }}
            >
              Centre for Innovation &amp; Entrepreneurship
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
