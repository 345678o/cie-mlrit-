"use client";

import { useEffect, useRef } from "react";
import "./ScrollStack.css";

export function ScrollStackItem({ children, className = "" }) {
  return (
    <div className={`scroll-stack-card${className ? " " + className : ""}`}>
      {children}
    </div>
  );
}

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

export default function ScrollStack({
  children,
  stackTop = 0.12, // pile anchor — fraction of viewport height from the top
  fan = 52, // px vertical offset between stacked cards (each stays partly visible)
  vhPerCard = 1.1, // scroll distance per card, in viewport heights → sets section height
  itemScale = 0.035, // scale shrink per card landing on top
  baseScale = 0.86, // minimum scale for the backmost card
}) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const cards = Array.from(inner.querySelectorAll(":scope > .scroll-stack-card"));
    if (!cards.length) return;
    const n = cards.length;
    const seg = 1 / n;
    const last = new Map();

    const update = () => {
      const scrollTop = window.scrollY;
      const vh = window.innerHeight;
      const stackTopPx = stackTop * vh;

      const outerTop = outer.getBoundingClientRect().top + scrollTop; // doc-absolute
      const outerH = outer.offsetHeight;
      const scrollable = Math.max(1, outerH - vh);
      const p = (scrollTop - outerTop) / scrollable; // section progress (can be <0 or >1)
      const pc = clamp(p, 0, 1);

      // per-card entered fraction (card 0 already resting at p=0)
      const entered = cards.map((_, i) =>
        easeOutCubic(clamp((pc - (i - 1) * seg) / seg, 0, 1))
      );

      cards.forEach((card, i) => {
        const restY = stackTopPx + i * fan;
        const enterY = stackTopPx + vh * 0.92; // start a screen below the anchor
        const y = restY + (1 - entered[i]) * (enterY - restY);

        // continuous depth = how many later cards have stacked on top (fractional → smooth)
        let depth = 0;
        for (let j = i + 1; j < n; j++) depth += entered[j];
        const scale = Math.max(baseScale, 1 - depth * itemScale);
        let opacity = Math.max(0.8, 1 - depth * 0.04);
        // once past the section, fade the pile out as it exits so it never
        // visually collides with the content (CTA) that follows
        if (p > 1) opacity *= clamp(1 - (p - 1) / 0.12, 0, 1);

        // positioning mode: fixed while in the section (no flow tail → no white gap),
        // absolute before/after so the pile parks and scrolls away with the page
        let position, top;
        if (p < 0) {
          position = "absolute";
          top = y; // relative to outer top, which is below the viewport top here
        } else if (p > 1) {
          position = "absolute";
          top = scrollable + y; // parked near the bottom → scrolls away into the CTA
        } else {
          position = "fixed";
          top = 0; // y is measured from the viewport top
        }

        const prev = last.get(i);
        if (
          !prev ||
          prev.position !== position ||
          Math.abs(prev.top - top) > 0.1 ||
          Math.abs(prev.y - y) > 0.1 ||
          Math.abs(prev.s - scale) > 0.0005 ||
          Math.abs(prev.o - opacity) > 0.005
        ) {
          card.style.position = position;
          card.style.top = `${top}px`;
          card.style.transform = `translate3d(0, ${y}px, 0) scale(${scale})`;
          card.style.opacity = String(opacity);
          card.style.zIndex = String(i + 1);
          last.set(i, { position, top, y, s: scale, o: opacity });
        }
      });
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, [stackTop, fan, vhPerCard, itemScale, baseScale]);

  // pure scroll spacer — cards are pulled out of flow (fixed/absolute), so no empty gaps
  const n = Array.isArray(children) ? children.length : 1;

  return (
    <div
      ref={outerRef}
      className="scroll-stack-outer"
      style={{ height: `${n * vhPerCard * 100}vh` }}
    >
      <div ref={innerRef} className="scroll-stack-inner">
        {children}
      </div>
    </div>
  );
}
