"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import "./FlowingMenu.css";

export default function FlowingMenu({
  items = [],
  textColor = "#000000",
  bgColor = "#FFFFFF",
  hoverColor = "#E8521A",
  borderColor = "rgba(0,0,0,0.08)",
  onItemClick,
  onItemHover,
}) {
  return (
    <div className="menu-wrap" style={{ backgroundColor: bgColor }}>
      <nav className="menu">
        {items.map((item, idx) => (
          <MenuItem
            key={idx}
            {...item}
            index={idx}
            textColor={textColor}
            hoverColor={hoverColor}
            borderColor={borderColor}
            onItemClick={onItemClick}
            onItemHover={onItemHover}
          />
        ))}
      </nav>
    </div>
  );
}

function MenuItem({ link, text, image, index, textColor, hoverColor, borderColor, onItemClick, onItemHover }) {
  const textRef = useRef(null);
  const tlRef  = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;
    gsap.fromTo(
      textRef.current,
      { y: "105%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 0.72, delay: 0.28 + index * 0.065, ease: "power3.out" }
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseEnter = () => {
    if (!textRef.current) return;
    if (tlRef.current) tlRef.current.kill();

    tlRef.current = gsap.timeline()
      /* rotate out */
      .to(textRef.current, {
        rotateX: -90,
        duration: 0.18,
        ease: "power2.in",
        transformOrigin: "center top",
      })
      /* swap colour while invisible */
      .set(textRef.current, { color: hoverColor, rotateX: 90, transformOrigin: "center bottom" })
      /* rotate in with new colour */
      .to(textRef.current, {
        rotateX: 0,
        duration: 0.26,
        ease: "power2.out",
      });

    if (onItemHover) onItemHover(image);
  };

  const handleMouseLeave = () => {
    if (!textRef.current) return;
    if (tlRef.current) tlRef.current.kill();

    tlRef.current = gsap.timeline()
      .to(textRef.current, {
        rotateX: 90,
        duration: 0.18,
        ease: "power2.in",
        transformOrigin: "center bottom",
      })
      .set(textRef.current, { color: textColor, rotateX: -90, transformOrigin: "center top" })
      .to(textRef.current, {
        rotateX: 0,
        duration: 0.26,
        ease: "power2.out",
      });

    if (onItemHover) onItemHover(null);
  };

  return (
    <div className="menu__item" style={{ borderColor }}>
      <a
        className="menu__item-link"
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onItemClick}
        style={{ color: textColor, perspective: "600px" }}
      >
        <span style={{ display: "inline-block", overflow: "hidden", lineHeight: "1.1" }}>
          <span ref={textRef} style={{ display: "inline-block" }}>
            {text}
          </span>
        </span>
      </a>
    </div>
  );
}
