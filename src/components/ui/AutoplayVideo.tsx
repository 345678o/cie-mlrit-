"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

/**
 * A <video autoPlay muted loop> whose `autoPlay` attribute alone is
 * unreliable in client-rendered React — it can lose the race with
 * hydration and silently stay paused, rendering as a solid black box.
 * Forces play() explicitly on mount instead.
 *
 * Some browsers (notably Safari, depending on per-site autoplay settings)
 * reject even a muted play() call. When that happens we show a play
 * button overlay so a real visitor can start it with a click — a click
 * is a user gesture, which every browser allows to start playback.
 */
export default function AutoplayVideo({
  src,
  style,
  className,
  unmuteOnHover = false,
}: {
  src: string;
  style?: React.CSSProperties;
  className?: string;
  unmuteOnHover?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [needsManualPlay, setNeedsManualPlay] = useState(false);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = true;
    vid.play().then(() => setNeedsManualPlay(false)).catch(() => setNeedsManualPlay(true));
  }, [src]);

  const handleManualPlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.play().then(() => setNeedsManualPlay(false)).catch(() => setNeedsManualPlay(true));
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className={className}
        style={{ cursor: unmuteOnHover ? "pointer" : undefined, ...style }}
        onMouseEnter={unmuteOnHover ? (e) => { e.currentTarget.muted = false; } : undefined}
        onMouseLeave={unmuteOnHover ? (e) => { e.currentTarget.muted = true; } : undefined}
      />
      {needsManualPlay && (
        <button
          type="button"
          onClick={handleManualPlay}
          aria-label="Play video"
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.35)", border: "none", cursor: "pointer",
          }}
        >
          <span style={{
            width: "64px", height: "64px", borderRadius: "50%",
            background: "rgba(255,255,255,0.92)", display: "flex",
            alignItems: "center", justifyContent: "center",
          }}>
            <Play size={26} style={{ color: "#0A0A0A", marginLeft: "3px" }} fill="#0A0A0A" />
          </span>
        </button>
      )}
    </div>
  );
}
