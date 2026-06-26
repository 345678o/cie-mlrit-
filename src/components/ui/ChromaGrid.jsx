"use client";

import { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import './ChromaGrid.css';

export const ChromaGrid = ({
  items = [],
  className = '',
  radius = 300,
  columns = 3,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out',
}) => {
  const rootRef = useRef(null);
  const cardsRef = useRef([]);
  const rafRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const isHovering = useRef(false);
  const isTouchDevice = useRef(false);

  const applyFilters = useCallback(() => {
    const el = rootRef.current;
    if (!el) return;
    const gridRect = el.getBoundingClientRect();
    const mx = mouse.current.x;
    const my = mouse.current.y;

    cardsRef.current.forEach((card) => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2 - gridRect.left;
      const cy = rect.top + rect.height / 2 - gridRect.top;
      const dist = Math.sqrt((mx - cx) ** 2 + (my - cy) ** 2);
      const t = Math.min(1, Math.max(0, (dist - radius * 0.15) / (radius * 0.85)));
      card.style.filter = `grayscale(${t}) brightness(${1 - t * 0.30})`;
    });
  }, [radius]);

  const scheduleFrame = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      applyFilters();
    });
  }, [applyFilters]);

  const animateToGray = useCallback(() => {
    cardsRef.current.forEach((card) => {
      if (!card) return;
      gsap.to(card, {
        filter: 'grayscale(1) brightness(0.70)',
        duration: fadeOut,
        ease: 'power2.out',
        overwrite: true,
      });
    });
  }, [fadeOut]);

  const showAllColor = useCallback(() => {
    cardsRef.current.forEach((card) => {
      if (!card) return;
      gsap.killTweensOf(card);
      card.style.filter = 'grayscale(0) brightness(1)';
    });
  }, []);

  const handleMove = useCallback((e) => {
    if (isTouchDevice.current) return;
    const r = rootRef.current.getBoundingClientRect();
    mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    if (!isHovering.current) {
      isHovering.current = true;
      cardsRef.current.forEach((card) => { if (card) gsap.killTweensOf(card); });
    }
    scheduleFrame();
  }, [scheduleFrame]);

  const handleLeave = useCallback(() => {
    if (isTouchDevice.current) return;
    isHovering.current = false;
    mouse.current = { x: -9999, y: -9999 };
    animateToGray();
  }, [animateToGray]);

  // Touch: highlight tapped card, gray others
  const handleTouchStart = useCallback((e, index) => {
    const gridRect = rootRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    mouse.current = { x: touch.clientX - gridRect.left, y: touch.clientY - gridRect.top };
    cardsRef.current.forEach((card) => { if (card) gsap.killTweensOf(card); });
    applyFilters();
  }, [applyFilters]);

  const handleCardMove = useCallback((e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  }, []);

  const handleCardClick = useCallback((url) => {
    if (url && url !== '#') window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  useEffect(() => {
    // Detect touch-only device (no fine pointer / no hover)
    isTouchDevice.current = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    if (isTouchDevice.current) {
      // Show all cards in color on touch devices
      showAllColor();
    } else {
      cardsRef.current.forEach((card) => {
        if (card) card.style.filter = 'grayscale(1) brightness(0.70)';
      });
    }

    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [items, showAllColor]);

  return (
    <div
      ref={rootRef}
      className={`chroma-grid ${className}`}
      style={{ '--cols': columns }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {items.map((c, i) => (
        <article
          key={i}
          ref={(el) => { cardsRef.current[i] = el; }}
          className="chroma-card"
          onMouseMove={handleCardMove}
          onTouchStart={(e) => handleTouchStart(e, i)}
          onClick={() => handleCardClick(c.url)}
          style={{
            '--card-border': c.borderColor || 'transparent',
            '--card-gradient': c.gradient,
            '--spotlight-color': c.borderColor ? `${c.borderColor}45` : 'rgba(255,255,255,0.22)',
            cursor: c.url && c.url !== '#' ? 'pointer' : 'default',
          }}
        >
          <div className="chroma-img-wrapper">
            <img src={c.image} alt={c.title} loading="lazy" />
          </div>
          <footer className="chroma-info">
            <h3 className="name">{c.title}</h3>
            <p className="role">{c.subtitle}</p>
            {c.handle && <span className="handle">{c.handle}</span>}
          </footer>
        </article>
      ))}
    </div>
  );
};

export default ChromaGrid;
