import React from "react";
import { getGrainDataUri } from "@/lib/grain";

/* Theme tokens — dark (Equinox indigo/green) by default, light = original orange. */
const PG_THEME_CSS = `
:root {
  --pg-a: #7484FE;
  --pg-b: #33FF67;
  --pg-op-arc-md: 0.22;
  --pg-op-cut-sm: 0.14;
  --pg-op-arc-sm: 0.24;
  --pg-dots-a: rgba(116,132,254,0.55);
  --pg-dots-b: rgba(51,255,103,0.40);
}
:root[data-theme="light"] {
  --pg-a: #E8521A;
  --pg-b: #E8521A;
  --pg-op-arc-md: 0.26;
  --pg-op-cut-sm: 0.16;
  --pg-op-arc-sm: 0.28;
  --pg-dots-a: rgba(255,94,44,0.55);
  --pg-dots-b: rgba(255,94,44,0.40);
}
`;

/**
 * Decorative geometric layer for white-background pages.
 * Matches the MLR CIE brand: orange arcs, diagonal cuts, grain texture.
 * Usage: place as first child inside any `position:relative` section/div.
 */
export default function PageGeometric() {
  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0, transform: "translateZ(0)", backfaceVisibility: "hidden", contain: "paint" }}>

      <style>{PG_THEME_CSS}</style>

      {/* Grain texture */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: getGrainDataUri(0.75, 200),
        opacity: 0.05,
      }} />

      {/* Large arc — top right */}
      <svg style={{ position: "absolute", top: "-16%", right: "-8%", width: "48vw", height: "48vw", maxWidth: 560, maxHeight: 560 }}
        viewBox="0 0 560 560" fill="none">
        <circle cx="280" cy="280" r="260" strokeWidth="70" fill="none" opacity="0.32" style={{ stroke: "var(--pg-a)" }} />
      </svg>

      {/* Medium arc — bottom right */}
      <svg style={{ position: "absolute", bottom: "-12%", right: "-5%", width: "26vw", height: "26vw", maxWidth: 300, maxHeight: 300 }}
        viewBox="0 0 300 300" fill="none">
        <circle cx="150" cy="150" r="130" strokeWidth="44" fill="none" style={{ stroke: "var(--pg-b)", opacity: "var(--pg-op-arc-md)" }} />
      </svg>

      {/* Diagonal cut — bottom left */}
      <svg style={{ position: "absolute", bottom: 0, left: 0, width: "32vw", height: "32vw", maxWidth: 380, maxHeight: 380 }}
        viewBox="0 0 380 380" fill="none">
        <path d="M0,380 L260,380 L0,120 Z" opacity="0.26" style={{ fill: "var(--pg-a)" }} />
        <path d="M0,380 L160,380 L0,240 Z" style={{ fill: "var(--pg-b)", opacity: "var(--pg-op-cut-sm)" }} />
      </svg>

      {/* Small arc — top left */}
      <svg style={{ position: "absolute", top: "-6%", left: "-6%", width: "18vw", height: "18vw", maxWidth: 200, maxHeight: 200 }}
        viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="100" r="86" strokeWidth="34" fill="none" style={{ stroke: "var(--pg-b)", opacity: "var(--pg-op-arc-sm)" }} />
      </svg>

      {/* Dot grid — top left */}
      <div style={{
        position: "absolute", top: "32px", left: "32px",
        width: "72px", height: "72px",
        backgroundImage: "radial-gradient(circle, var(--pg-dots-a) 1.5px, transparent 1.5px)",
        backgroundSize: "14px 14px",
      }} />

      {/* Dot grid — bottom right */}
      <div style={{
        position: "absolute", bottom: "32px", right: "32px",
        width: "56px", height: "56px",
        backgroundImage: "radial-gradient(circle, var(--pg-dots-b) 1.5px, transparent 1.5px)",
        backgroundSize: "12px 12px",
      }} />

    </div>
  );
}
