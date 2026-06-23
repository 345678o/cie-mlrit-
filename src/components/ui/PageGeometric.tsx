import React from "react";

/**
 * Decorative geometric layer for white-background pages.
 * Matches the MLR CIE brand: orange arcs, diagonal cuts, grain texture.
 * Usage: place as first child inside any `position:relative` section/div.
 */
export default function PageGeometric() {
  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>

      {/* Grain texture */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        opacity: 0.055, mixBlendMode: "multiply",
      }} />

      {/* Large arc — top right */}
      <svg style={{ position: "absolute", top: "-16%", right: "-8%", width: "48vw", height: "48vw", maxWidth: 560, maxHeight: 560 }}
        viewBox="0 0 560 560" fill="none">
        <circle cx="280" cy="280" r="260" stroke="#E8521A" strokeWidth="70" fill="none" opacity="0.16" />
      </svg>

      {/* Medium arc — bottom right */}
      <svg style={{ position: "absolute", bottom: "-12%", right: "-5%", width: "26vw", height: "26vw", maxWidth: 300, maxHeight: 300 }}
        viewBox="0 0 300 300" fill="none">
        <circle cx="150" cy="150" r="130" stroke="#E8521A" strokeWidth="44" fill="none" opacity="0.13" />
      </svg>

      {/* Diagonal cut — bottom left */}
      <svg style={{ position: "absolute", bottom: 0, left: 0, width: "32vw", height: "32vw", maxWidth: 380, maxHeight: 380 }}
        viewBox="0 0 380 380" fill="none">
        <path d="M0,380 L260,380 L0,120 Z" fill="#E8521A" opacity="0.13" />
        <path d="M0,380 L160,380 L0,240 Z" fill="#E8521A" opacity="0.08" />
      </svg>

      {/* Small arc — top left */}
      <svg style={{ position: "absolute", top: "-6%", left: "-6%", width: "18vw", height: "18vw", maxWidth: 200, maxHeight: 200 }}
        viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="100" r="86" stroke="#E8521A" strokeWidth="34" fill="none" opacity="0.14" />
      </svg>

      {/* Dot grid — top left */}
      <div style={{
        position: "absolute", top: "32px", left: "32px",
        width: "72px", height: "72px",
        backgroundImage: "radial-gradient(circle, rgba(255,94,44,0.55) 1.5px, transparent 1.5px)",
        backgroundSize: "14px 14px",
      }} />

      {/* Dot grid — bottom right */}
      <div style={{
        position: "absolute", bottom: "32px", right: "32px",
        width: "56px", height: "56px",
        backgroundImage: "radial-gradient(circle, rgba(255,94,44,0.40) 1.5px, transparent 1.5px)",
        backgroundSize: "12px 12px",
      }} />

      {/* Diagonal hairline */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        preserveAspectRatio="none" viewBox="0 0 1440 900" fill="none">
        <line x1="0" y1="900" x2="1440" y2="0" stroke="#E8521A" strokeWidth="1" opacity="0.14" />
      </svg>

    </div>
  );
}
