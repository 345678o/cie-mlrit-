"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const LETTERS = ["C", "I", "E"];

export default function LoadingScreen() {
  const pathname           = usePathname();
  const [visible, setVisible] = useState(true);
  const [key, setKey]      = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setVisible(true);
    setKey(k => k + 1);
    const t = setTimeout(() => setVisible(false), 900);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={key}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] } }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#000000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "14px",
          }}
        >
          {/* C — I — E letter by letter */}
          <div style={{ display: "flex", alignItems: "baseline", gap: "0.02em" }}>
            {LETTERS.map((letter, i) => (
              <div key={letter} style={{ overflow: "hidden" }}>
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 0.38,
                    delay: i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    display: "block",
                    fontFamily: "var(--font-heading)",
                    fontWeight: 900,
                    fontSize: "clamp(96px, 20vw, 200px)",
                    lineHeight: 1,
                    letterSpacing: "-0.06em",
                    color: "#FFFFFF",
                  }}
                >
                  {letter}
                </motion.span>
              </div>
            ))}
            {/* Orange dot */}
            <div style={{ overflow: "hidden" }}>
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.3, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: "block",
                  fontFamily: "var(--font-heading)",
                  fontWeight: 900,
                  fontSize: "clamp(96px, 20vw, 200px)",
                  lineHeight: 1,
                  color: "#FF5E2C",
                }}
              >
                .
              </motion.span>
            </div>
          </div>

          {/* Subtitle */}
          <div style={{ overflow: "hidden" }}>
            <motion.p
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: 0.38 }}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(10px, 1.2vw, 13px)",
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#FF5E2C",
                margin: 0,
              }}
            >
              Centre for Innovation &amp; Entrepreneurship
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
