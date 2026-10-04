"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Ticket } from "lucide-react";

/* Upcoming-event poster that drops in once per full page load, right after the
   CIE intro (LoadingScreen runs ~1.5s). Stops showing once the event is over. */
const EVENT = {
  title: "The Equinox 2.0",
  tagline: "E-Summit 2K26 · Oct 30 & 31",
  poster: "/events/poster/equinox-2.0.webp",
  href: "https://equinox-2.0.mlritcie.in",
  cta: "Grab your pass ₹769",
  endsAt: new Date("2026-11-01T00:00:00+05:30"),
};

const SHOW_DELAY_MS = 1800;
// Paper unrolling down from the rod; the roll, swing, shine and CTA are timed off this.
const UNROLL = { delay: 0.3, duration: 1.2, ease: [0.65, 0, 0.35, 1] as const };

export default function EventPopup() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (Date.now() >= EVENT.endsAt.getTime()) return;
    const t = setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const instant = reduceMotion ? { duration: 0 } : null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="event-popup"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          onClick={() => setOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 9000,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "16px",
            background: "rgba(10, 11, 18, 0.78)",
            backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
          }}
        >
          {/* Hanging poster — swings from the rod once it has unrolled */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${EVENT.title} — ${EVENT.tagline}`}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: -60, opacity: 0, rotate: 0 }}
            animate={{
              y: 0, opacity: 1,
              rotate: reduceMotion ? 0 : [0, 0, 2.2, -1.6, 0.9, -0.4, 0],
              transition: instant ?? {
                y: { type: "spring", stiffness: 260, damping: 18 },
                opacity: { duration: 0.2 },
                rotate: { duration: 1.6, delay: UNROLL.delay + UNROLL.duration - 0.15, times: [0, 0.01, 0.22, 0.45, 0.66, 0.84, 1], ease: "easeInOut" },
              },
            }}
            exit={{ y: -40, opacity: 0, scale: 0.96, transition: { duration: 0.28, ease: "easeIn" } }}
            style={{
              position: "relative",
              width: "min(560px, 100%, calc((100dvh - 135px) * 0.8))",
              transformOrigin: "50% 0%",
            }}
          >
            {/* Rod the poster hangs from */}
            <div aria-hidden="true" style={{
              position: "relative", zIndex: 3,
              width: "108%", marginLeft: "-4%", height: 12, borderRadius: 999,
              background: "linear-gradient(180deg, #C9CFFF 0%, #7484FE 45%, #3A4290 100%)",
              boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
            }} />

            <div style={{ position: "relative", marginTop: -5 }}>
              {/* Poster — unrolls downward from the rod */}
              <motion.div
                initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)", transition: instant ?? UNROLL }}
                style={{
                  position: "relative", overflow: "hidden",
                  borderRadius: "2px 2px 10px 10px",
                  boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(var(--primary-rgb), 0.25)",
                }}
              >
                <a href={EVENT.href} target="_blank" rel="noopener noreferrer" style={{ display: "block" }}>
                  <Image
                    src={EVENT.poster}
                    alt={`${EVENT.title} poster`}
                    width={1280}
                    height={1600}
                    priority
                    style={{ display: "block", width: "100%", height: "auto" }}
                  />
                </a>
                {/* Shine sweep once it is fully open */}
                {!reduceMotion && (
                  <motion.div
                    aria-hidden="true"
                    initial={{ x: "-130%" }}
                    animate={{ x: "130%", transition: { duration: 0.9, delay: UNROLL.delay + UNROLL.duration + 0.1, ease: "easeInOut" } }}
                    style={{
                      position: "absolute", inset: 0, pointerEvents: "none",
                      background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.28) 50%, transparent 70%)",
                    }}
                  />
                )}
              </motion.div>

              {/* The roll travelling down as the paper unfurls */}
              {!reduceMotion && (
                <motion.div
                  aria-hidden="true"
                  initial={{ top: "0%", opacity: 1 }}
                  animate={{
                    top: "100%", opacity: [1, 1, 0],
                    transition: { top: UNROLL, opacity: { duration: UNROLL.delay + UNROLL.duration + 0.15, times: [0, 0.88, 1] } },
                  }}
                  style={{
                    position: "absolute", left: "-1%", width: "102%", height: 20,
                    transform: "translateY(-50%)", borderRadius: 999, pointerEvents: "none",
                    background: "linear-gradient(180deg, #F4F5FA 0%, #B9C0FF 35%, #5763BF 75%, #2A2F66 100%)",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.55)",
                  }}
                />
              )}

              <motion.button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1, transition: instant ?? { delay: UNROLL.delay + UNROLL.duration, duration: 0.25 } }}
                style={{
                  position: "absolute", top: 10, right: 10, zIndex: 2,
                  width: 34, height: 34, borderRadius: "999px",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(10, 11, 18, 0.7)",
                  border: "1px solid rgba(var(--line-rgb), 0.2)",
                  color: "#F4F5FA", cursor: "pointer",
                }}
              >
                <X size={18} />
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0, transition: instant ?? { delay: UNROLL.delay + UNROLL.duration + 0.25, duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
              style={{ paddingTop: "14px", display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <p style={{
                margin: 0, textAlign: "center",
                fontFamily: "var(--font-body)", fontSize: "11px", fontWeight: 700,
                letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent-green)",
              }}>
                Coming up · {EVENT.tagline}
              </p>
              <a
                href={EVENT.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  padding: "13px 20px", borderRadius: "12px",
                  background: "var(--grad-accent)", color: "var(--on-accent)",
                  fontFamily: "var(--font-body)", fontSize: "15px", fontWeight: 800,
                  textDecoration: "none",
                }}
              >
                <Ticket size={17} /> {EVENT.cta}
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
