"use client";

import { useEffect, useRef } from "react";

/**
 * A <video autoPlay muted loop> whose `autoPlay` attribute alone is
 * unreliable in client-rendered React — it can lose the race with
 * hydration and silently stay paused, rendering as a solid black box.
 * Forces play() explicitly on mount instead.
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

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = true;
    vid.play().catch(() => {});
  }, [src]);

  return (
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
  );
}
