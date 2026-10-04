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
  startsAt: new Date("2026-10-30T00:00:00+05:30"),
  endsAt: new Date("2026-11-01T00:00:00+05:30"),
};

function countdown(now: number): string {
  const ms = EVENT.startsAt.getTime() - now;
  if (ms <= 0) return "Happening now";
  const m = Math.floor(ms / 60000);
  const d = Math.floor(m / 1440), h = Math.floor((m % 1440) / 60), min = m % 60;
  return `${d}d ${h}h ${String(min).padStart(2, "0")}m to go`;
}

const SHOW_DELAY_MS = 1800;
// Paper unrolling down from the rod; the roll, swing, shine and CTA are timed off this.
const UNROLL = { delay: 0.3, duration: 1.2, ease: [0.65, 0, 0.35, 1] as const };
const OPENED = UNROLL.delay + UNROLL.duration;
// On close the paper rolls back up into the rod before the poster lifts away.
const ROLL_UP = { duration: 0.5, ease: [0.65, 0, 0.35, 1] as const };

export default function EventPopup() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (Date.now() >= EVENT.endsAt.getTime()) return;
    const t = setTimeout(() => { setNow(Date.now()); setOpen(true); }, SHOW_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    const id = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(id);
  }, [open]);

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
          exit={{ opacity: 0, transition: { duration: 0.3, delay: reduceMotion ? 0 : ROLL_UP.duration + 0.1 } }}
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
              rotate: reduceMotion ? 0 : [0, 0, 1.3, -0.9, 0.5, -0.2, 0],
              transition: instant ?? {
                y: { type: "spring", stiffness: 260, damping: 18 },
                opacity: { duration: 0.2 },
                rotate: { duration: 2.2, delay: OPENED - 0.15, times: [0, 0.01, 0.22, 0.45, 0.66, 0.84, 1], ease: "easeInOut" },
              },
            }}
            exit={{ y: -60, opacity: 0, transition: { duration: 0.3, ease: "easeIn", delay: reduceMotion ? 0 : ROLL_UP.duration } }}
            style={{
              position: "relative",
              width: "min(560px, 100%, calc((100dvh - 180px) * 0.8))",
              marginTop: 44,
              // Pivot far above the rod, as if the cords hang from the ceiling.
              transformOrigin: "50% -45vh",
            }}
          >
            <motion.button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1, transition: instant ?? { delay: OPENED, duration: 0.25 } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              whileHover={{ scale: 1.08 }}
              style={{
                position: "absolute", top: -46, right: -8, zIndex: 4,
                width: 36, height: 36, borderRadius: "999px",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                background: "rgba(22, 23, 29, 0.9)",
                border: "1px solid rgba(var(--primary-rgb), 0.45)",
                color: "#F4F5FA", cursor: "pointer",
              }}
            >
              <X size={18} />
            </motion.button>

            {/* Rod the poster hangs from, with cords up to the ceiling and end knobs */}
            <div aria-hidden="true" style={{
              position: "relative", zIndex: 3,
              width: "calc(100% + 16px)", marginLeft: -8, height: 12, borderRadius: 999,
              background: "linear-gradient(180deg, #C9CFFF 0%, #7484FE 45%, #3A4290 100%)",
              boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
            }}>
              {["10%", "90%"].map((left) => (
                <span key={left} style={{
                  position: "absolute", bottom: "50%", left, width: 1.5, height: "100vh",
                  transform: "translateX(-50%)",
                  background: "linear-gradient(0deg, rgba(201,207,255,0.75), rgba(201,207,255,0))",
                }} />
              ))}
              {[{ left: -7 }, { right: -7 }].map((pos, i) => (
                <span key={i} style={{
                  position: "absolute", top: -3, ...pos, width: 18, height: 18, borderRadius: "50%",
                  background: "radial-gradient(circle at 35% 30%, #F4F5FA 0%, #A5AFFE 35%, #3A4290 100%)",
                  boxShadow: "0 3px 8px rgba(0,0,0,0.5)",
                }} />
              ))}
            </div>

            <div style={{ position: "relative", marginTop: -5 }}>
              {/* Poster — unrolls downward from the rod */}
              <motion.div
                initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)", transition: instant ?? UNROLL }}
                exit={{ clipPath: "inset(0% 0% 100% 0%)", transition: instant ?? ROLL_UP }}
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
                {/* Shadow the rod casts on the paper */}
                <div aria-hidden="true" style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 22, pointerEvents: "none",
                  background: "linear-gradient(180deg, rgba(0,0,0,0.45), rgba(0,0,0,0))",
                }} />
                {/* Shine sweep once it is fully open */}
                {!reduceMotion && (
                  <motion.div
                    aria-hidden="true"
                    initial={{ x: "-130%" }}
                    animate={{ x: "130%", transition: { duration: 0.9, delay: OPENED + 0.1, ease: "easeInOut" } }}
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
                    transition: { top: UNROLL, opacity: { duration: OPENED + 0.15, times: [0, 0.88, 1] } },
                  }}
                  exit={{ top: "0%", opacity: 1, transition: { top: ROLL_UP, opacity: { duration: 0 } } }}
                  style={{
                    position: "absolute", left: "-1%", width: "102%", height: 20,
                    transform: "translateY(-50%)", borderRadius: 999, pointerEvents: "none",
                    background: "linear-gradient(180deg, #F4F5FA 0%, #B9C0FF 35%, #5763BF 75%, #2A2F66 100%)",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.55)",
                  }}
                />
              )}

            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0, transition: instant ?? { delay: OPENED + 0.25, duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
              exit={{ opacity: 0, y: 8, transition: { duration: 0.15 } }}
              style={{ paddingTop: "14px", display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <div style={{
                display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "6px 10px",
                fontFamily: "var(--font-body)", fontSize: "11px", fontWeight: 700,
                letterSpacing: "0.16em", textTransform: "uppercase",
              }}>
                <span style={{ color: "var(--accent-green)" }}>Coming up · {EVENT.tagline}</span>
                <span style={{
                  padding: "4px 10px", borderRadius: 999,
                  background: "rgba(var(--primary-rgb), 0.16)", border: "1px solid rgba(var(--primary-rgb), 0.4)",
                  color: "var(--text-primary)", fontVariantNumeric: "tabular-nums", letterSpacing: "0.1em",
                }}>
                  {countdown(now)}
                </span>
              </div>
              <motion.a
                whileHover={reduceMotion ? undefined : { y: -2, boxShadow: "0 10px 30px rgba(51,255,103,0.35)" }}
                whileTap={{ scale: 0.98 }}
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
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
