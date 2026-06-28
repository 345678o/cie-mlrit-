"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Calendar } from "lucide-react";

const GRAIN = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

/* ─── Types ─────────────────────────────────────────────────── */
type SlideData = {
  img?: string;
  grad: string;
  heading: string;
  body: string;
};

type EventData = {
  idx: string;
  category: string;
  catColor: string;
  catBg: string;
  date: string;
  dateTime: string;
  tags: string[];
  bg: string;
  slides: SlideData[];
};

/* ─── Event data — 7 events × 6 slides ─────────────────────── */
const FEATURED: EventData[] = [
  {
    idx: "01", category: "Workshop",
    catColor: "#2563EB", catBg: "rgba(59,130,246,0.12)",
    date: "Apr 10–11, 2026", dateTime: "2026-04-10",
    tags: ["Hands-on", "Expert Guidance", "Domain Challenges", "Practical Skills"],
    bg: "#07090f",
    slides: [
      { img: "/events/workshop-carnival-2.jpg", grad: "linear-gradient(145deg,#060d20 0%,#0f2044 55%,#1e40af 100%)", heading: "Workshop Carnival 2.0", body: "Where learning goes beyond classrooms — into real skills, real challenges, and real innovation. Explore multiple domains in one immersive sprint." },
      { grad: "linear-gradient(160deg,#040a18 0%,#0a1836 50%,#1a3380 100%)", heading: "Expert-Led Tracks", body: "Learn directly from practitioners. Each workshop track delivers hands-on expertise in UI/UX, IoT, content creation, and product design." },
      { grad: "linear-gradient(130deg,#050c22 0%,#0f2650 50%,#1e40af 100%)", heading: "Build, Don't Browse", body: "Every session ends with something tangible. Teams prototype, test, and iterate — no passive learning, no slides-only talks." },
      { grad: "linear-gradient(150deg,#060d20 0%,#0d1f40 50%,#2563eb 100%)", heading: "Cross-Domain Collide", body: "Designers collaborate with developers. Strategists work alongside engineers. That friction is where the best ideas are born." },
      { grad: "linear-gradient(140deg,#040a1a 0%,#0b1c38 50%,#1c3fa8 100%)", heading: "Live Feedback Loop", body: "Mentors circulate every hour, giving real-time critique and direction. No waiting till the end to know if you're off track." },
      { grad: "linear-gradient(155deg,#050b1e 0%,#0c1e3e 50%,#1d42b0 100%)", heading: "Skills That Stay", body: "From prototype to portfolio. What you build during Carnival follows you well beyond the campus boundary." },
    ],
  },
  {
    idx: "02", category: "Innovation Challenge",
    catColor: "#DC2626", catBg: "rgba(220,38,38,0.12)",
    date: "Apr 3–4, 2025", dateTime: "2025-04-03",
    tags: ["Brand Revival", "Logo Design", "Ad-Film Making", "Masterclasses"],
    bg: "#070a05",
    slides: [
      { grad: "linear-gradient(145deg,#080c06 0%,#1c2a0d 55%,#4d7c0f 100%)", heading: "Business to Brand", body: "A Brand Revival Hackathon — teams of 3–5 develop full strategies to transform brands through design and storytelling." },
      { grad: "linear-gradient(160deg,#060a04 0%,#14200a 50%,#3d6b0c 100%)", heading: "Visual Identity", body: "Concept sketches evolve into full brand systems — logos, palettes, and typographic language — all under a 48-hour deadline." },
      { grad: "linear-gradient(130deg,#080c05 0%,#1a2a0b 50%,#4a7c0e 100%)", heading: "The Ad-Film Track", body: "Script it. Shoot it. Edit it. Teams produce a complete ad film for their chosen brand — entirely within the hackathon window." },
      { grad: "linear-gradient(150deg,#060905 0%,#182310 50%,#3f6b0a 100%)", heading: "Industry Masterclass", body: "Before the challenge begins, top brand strategists and creative directors share what actually works in the real market." },
      { grad: "linear-gradient(140deg,#0a0e06 0%,#1e2e0d 50%,#527f12 100%)", heading: "Pitch Day", body: "Final brand presentations evaluated live by a panel of industry jurors. High pressure, high stakes, high impact." },
      { grad: "linear-gradient(155deg,#070a05 0%,#1b2a0b 50%,#4e7c10 100%)", heading: "Winners' Circle", body: "The best brand revivals are showcased and celebrated — recognition that extends well beyond the campus." },
    ],
  },
  {
    idx: "03", category: "Innovation Challenge",
    catColor: "#EA580C", catBg: "rgba(234,88,12,0.12)",
    date: "Apr 24, 2023", dateTime: "2023-04-24",
    tags: ["Business", "Negotiation", "Sales", "Strategy"],
    bg: "#0c0804",
    slides: [
      { grad: "linear-gradient(145deg,#0d0803 0%,#3b1a06 55%,#c2410c 100%)", heading: "Hustle Mania", body: "A high-energy entrepreneurship challenge where teams push limits across negotiation, sales, advertising, and business strategy." },
      { grad: "linear-gradient(160deg,#0b0703 0%,#2e1604 50%,#b03a0a 100%)", heading: "The Sales Sprint", body: "Teams hit the floor with a product and a pitch. Real customers, real pressure — close the deal or go home." },
      { grad: "linear-gradient(130deg,#0e0904 0%,#3f1c07 50%,#c74c10 100%)", heading: "Negotiation Duel", body: "Head-to-head rounds of business negotiation. Whoever walks away with the better deal — and the logic to prove it — advances." },
      { grad: "linear-gradient(150deg,#0c0804 0%,#351806 50%,#ba3f0b 100%)", heading: "Ad Blitz", body: "30 minutes to conceptualize and present a full advertising campaign for a surprise brand brief. Speed and clarity win." },
      { grad: "linear-gradient(140deg,#0d0904 0%,#3a1c06 50%,#c04010 100%)", heading: "Strategy Board", body: "Evaluate a failing business, diagnose the root cause, and present a turnaround plan in under an hour." },
      { grad: "linear-gradient(155deg,#0c0803 0%,#381a06 50%,#bc3d0b 100%)", heading: "Hustle Champions", body: "The team that scores highest across all five domains earns the Hustle Mania trophy — and the bragging rights that come with it." },
    ],
  },
  {
    idx: "04", category: "Startup Meetup",
    catColor: "#7C3AED", catBg: "rgba(124,58,237,0.12)",
    date: "Nov 28–30, 2024", dateTime: "2024-11-28",
    tags: ["E-Summit", "Entrepreneurship", "CIE × IIC"],
    bg: "#090709",
    slides: [
      { grad: "linear-gradient(145deg,#0e0618 0%,#2d1057 55%,#6d28d9 100%)", heading: "Equinox E-Summit 2K24", body: "#WherePassionMeetsPerseverance — a 3-day summit bringing student innovators, industry leaders, and investors together at MLRIT." },
      { grad: "linear-gradient(160deg,#0b0516 0%,#250d48 50%,#5e22c4 100%)", heading: "Startup Pitches", body: "Founders take the stage. Investors in the front row. The most promising student ventures compete for funding and mentorship." },
      { grad: "linear-gradient(130deg,#0f0619 0%,#301260 50%,#7c32e8 100%)", heading: "Investor Connect", body: "Structured one-on-one sessions between student entrepreneurs and angel investors — real conversations, real opportunities." },
      { grad: "linear-gradient(150deg,#0d0617 0%,#280e52 50%,#6628d0 100%)", heading: "Speaker Series", body: "Industry veterans share unfiltered lessons from building companies. No scripts, no PR spin — just the truth about entrepreneurship." },
      { grad: "linear-gradient(140deg,#0c0515 0%,#221040 50%,#5a1ebc 100%)", heading: "Innovation Showcase", body: "Stalls, demos, and live prototypes from the most innovative student projects across engineering, design, and business." },
      { grad: "linear-gradient(155deg,#0e0618 0%,#2b0f55 50%,#6e28da 100%)", heading: "Awards Night", body: "The summit closes with recognition across categories — best pitch, best innovation, most scalable venture, and more." },
    ],
  },
  {
    idx: "05", category: "Workshop",
    catColor: "#2563EB", catBg: "rgba(59,130,246,0.12)",
    date: "Mar 11–16, 2024", dateTime: "2024-03-11",
    tags: ["IoT", "UI/UX", "WordPress", "6-Day Sprint"],
    bg: "#060810",
    slides: [
      { grad: "linear-gradient(145deg,#060c1e 0%,#0d1f3c 55%,#1d4ed8 100%)", heading: "Workshop Carnival", body: "Six days of hands-on exploration. Participants tackled UI/UX design, IoT, and WordPress through structured challenges and expert guidance." },
      { grad: "linear-gradient(160deg,#040a18 0%,#0a1930 50%,#1a45c8 100%)", heading: "UI/UX Track", body: "Design thinking meets real products. Teams redesign existing apps and pitch their improvements to practicing UX designers." },
      { grad: "linear-gradient(130deg,#060c20 0%,#0e2040 50%,#2155d8 100%)", heading: "IoT Lab", body: "Sensors, circuits, and code. Participants build working IoT prototypes from scratch with expert guidance on hardware and firmware." },
      { grad: "linear-gradient(150deg,#050a1a 0%,#0c1d38 50%,#1c4ad0 100%)", heading: "WordPress Build", body: "From blank canvas to live website. Participants design, develop, and deploy a fully functional site — in a single session." },
      { grad: "linear-gradient(140deg,#060b1e 0%,#0d1e3a 50%,#1e4dd5 100%)", heading: "Domain Showdowns", body: "Each track ends with a domain-specific contest. The best project across design, IoT, and web earns recognition and prizes." },
      { grad: "linear-gradient(155deg,#050a1c 0%,#0c1c38 50%,#1b48cc 100%)", heading: "Community Builders", body: "Beyond skills — students leave with a network of peers, mentors, and collaborators who share the same drive to create." },
    ],
  },
  {
    idx: "06", category: "Innovation Challenge",
    catColor: "#16A34A", catBg: "rgba(22,163,74,0.12)",
    date: "Mar 26–28, 2024", dateTime: "2024-03-26",
    tags: ["GI Products", "Cultural Heritage", "IPFC × MLRIT", "MSME"],
    bg: "#060b08",
    slides: [
      { grad: "linear-gradient(145deg,#060e0a 0%,#14532d 55%,#16a34a 100%)", heading: "GI Mahotsav 2024", body: "Geographical Indications Products Mela — a unique journey through India's rich cultural heritage and its most protected regional crafts." },
      { grad: "linear-gradient(160deg,#040c07 0%,#104428 50%,#128c40 100%)", heading: "Heritage in Focus", body: "Over 50 GI-tagged products on display — from Banarasi silk to Darjeeling tea. Each tells a story of place, craft, and community." },
      { grad: "linear-gradient(130deg,#060e0b 0%,#155830 50%,#18b050 100%)", heading: "Artisan Stories", body: "Meet the makers behind the products. Live demonstrations of traditional crafts that have been perfected over generations." },
      { grad: "linear-gradient(150deg,#050d08 0%,#124c2a 50%,#14943e 100%)", heading: "Policy & Protection", body: "Panel discussions on how GI tags protect India's cultural exports and what more needs to be done for artisan welfare." },
      { grad: "linear-gradient(140deg,#070f0a 0%,#165a32 50%,#1aae4a 100%)", heading: "MSME Connect", body: "Direct linkages between GI-certified producers and buyers, distributors, and e-commerce platforms — bridging craft and commerce." },
      { grad: "linear-gradient(155deg,#060d09 0%,#145030 50%,#16a048 100%)", heading: "Cultural Economy", body: "Workshops on building sustainable businesses around traditional crafts, with frameworks from IPFC and MSME specialists." },
    ],
  },
  {
    idx: "07", category: "Hackathon",
    catColor: "#C04218", catBg: "rgba(255,94,44,0.12)",
    date: "Oct 6–7, 2023", dateTime: "2023-10-06",
    tags: ["Metaverse", "36-Hour Hackathon", "₹75K Prize", "CIE × Deeploop"],
    bg: "#0b0606",
    slides: [
      { grad: "linear-gradient(145deg,#0c0606 0%,#2d1212 55%,#991b1b 100%)", heading: "MetaLoop", body: "Ideate. Immerse. Innovate. A 36-hour metaverse-themed hackathon with ₹75,000 in prizes and Deeploop as technology partner." },
      { grad: "linear-gradient(160deg,#0a0505 0%,#260f0f 50%,#871618 100%)", heading: "AR/VR Track", body: "Build immersive augmented and virtual reality experiences. Teams push the boundaries of spatial computing in 36 hours." },
      { grad: "linear-gradient(130deg,#0d0707 0%,#301414 50%,#a61e1e 100%)", heading: "Blockchain Track", body: "Smart contracts, NFTs, and decentralized apps. Teams explore the infrastructure layer of the open metaverse." },
      { grad: "linear-gradient(150deg,#0b0606 0%,#2a1010 50%,#901818 100%)", heading: "Virtual Worlds", body: "Design and build navigable 3D environments — social spaces, games, and interactive experiences for the next internet." },
      { grad: "linear-gradient(140deg,#0c0606 0%,#2c1212 50%,#961a1a 100%)", heading: "Deeploop Mentorship", body: "Deeploop engineers embed directly with teams throughout the hackathon — real mentorship, not just scheduled office hours." },
      { grad: "linear-gradient(155deg,#0b0505 0%,#2b1010 50%,#921818 100%)", heading: "Final Showcase", body: "36 hours of building. 10 minutes to present. A panel of Web3 investors and metaverse builders judges the final showcase." },
    ],
  },
];

const CATS = [
  { label: "Hackathons",            n: "12" },
  { label: "Workshops",             n: "28" },
  { label: "Startup Meetups",       n: "8"  },
  { label: "Guest Lectures",        n: "35" },
  { label: "Innovation Challenges", n: "6"  },
  { label: "Bootcamps",             n: "5"  },
];

/* ═══════════════════════════════════════════════════════════════
   EventSection
   ─ Full-viewport section for one event.
   ─ 6 slides navigated horizontally via swipe / trackpad / arrows.
   ─ GSAP timeline: 6 data-s elements stagger out → image track slides
     → new text staggers in. All perfectly synchronized.
═══════════════════════════════════════════════════════════════ */
function EventSection({ ev, index = 0 }: { ev: EventData; index?: number }) {
  const flipped = index % 2 !== 0;
  const [current, setCurrent] = useState(0);
  const animRef    = useRef(false);
  const curRef     = useRef(0);
  const accRef     = useRef(0);
  const autoRef    = useRef<ReturnType<typeof setInterval> | null>(null);
  const pausedRef  = useRef(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const imgColRef  = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const panelRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const [colW, setColW] = useState(0);

  useEffect(() => {
    const ro = new ResizeObserver(() => {
      const w = imgColRef.current?.offsetWidth ?? 0;
      setColW(w);
      if (trackRef.current) gsap.set(trackRef.current, { x: -curRef.current * w });
    });
    if (imgColRef.current) ro.observe(imgColRef.current);
    return () => ro.disconnect();
  }, []);

  const go = useCallback((to: number) => {
    if (animRef.current || to === curRef.current) return;
    if (to < 0 || to >= ev.slides.length) return;

    const from      = curRef.current;
    const isWrap    = from === ev.slides.length - 1 && to === 0;
    const dir       = isWrap ? 1 : (to > from ? 1 : -1);
    const colWidth  = imgColRef.current?.offsetWidth ?? colW;

    animRef.current = true;
    curRef.current  = to;
    accRef.current  = 0;
    setCurrent(to);

    const outPanel = panelRefs.current[from];
    const inPanel  = panelRefs.current[to];
    const outEls   = outPanel ? Array.from(outPanel.querySelectorAll<HTMLElement>("[data-s]")) : [];
    const inEls    = inPanel  ? Array.from(inPanel.querySelectorAll<HTMLElement>("[data-s]"))  : [];

    gsap.set(inPanel, { visibility: "visible", zIndex: 2 });
    gsap.set(inEls,   { x: dir * 52, opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(outPanel, { zIndex: 1, visibility: "hidden" });
        if (outEls.length) gsap.set(outEls, { clearProps: "transform,opacity" });
        animRef.current = false;
      },
    });

    /* 1 — current text slides out */
    if (outEls.length) {
      tl.to(outEls, {
        x: dir * -52, opacity: 0,
        duration: 0.26,
        stagger: { each: 0.038, from: "start" },
        ease: "power2.in",
      });
    }

    /* 2 — image track slides (same beat as text exit ends) */
    tl.to(trackRef.current, {
      x: -to * colWidth,
      duration: 0.62,
      ease: "power3.inOut",
    }, outEls.length ? "-=0.10" : "0");

    /* 3 — new text slides in (overlaps with image slide) */
    tl.to(inEls, {
      x: 0, opacity: 1,
      duration: 0.48,
      stagger: { each: 0.055, from: "start" },
      ease: "power3.out",
    }, "-=0.36");

  }, [colW, ev.slides.length]);

  /* ── Auto-play ── */
  useEffect(() => {
    const tick = setInterval(() => {
      if (pausedRef.current || animRef.current) return;
      const next = (curRef.current + 1) % ev.slides.length;
      if (next === curRef.current) return;
      go(next);
    }, 3500);
    autoRef.current = tick;
    return () => clearInterval(tick);
  }, [go, ev.slides.length]);

  /* ── Horizontal trackpad / mouse wheel ── */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const isHoriz = Math.abs(e.deltaX) > Math.abs(e.deltaY) * 0.6;
      if (!isHoriz) return; /* vertical → let page scroll */
      const delta = e.deltaX;
      if (delta > 0 && curRef.current >= ev.slides.length - 1) return;
      if (delta < 0 && curRef.current <= 0) return;
      e.preventDefault();
      accRef.current += delta;
      if (accRef.current >  55) go(curRef.current + 1);
      if (accRef.current < -55) go(curRef.current - 1);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [go, ev.slides.length]);

  /* ── Touch swipe ── */
  const touchRef = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) =>
    (touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY });
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchRef.current) return;
    const dx = e.changedTouches[0].clientX - touchRef.current.x;
    const dy = e.changedTouches[0].clientY - touchRef.current.y;
    touchRef.current = null;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 44)
      go(dx < 0 ? curRef.current + 1 : curRef.current - 1);
  };

  return (
    <div
      ref={sectionRef}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
      style={{
        display: "flex",
        flexDirection: flipped ? "row-reverse" : "row",
        height: "100vh",
        minHeight: "560px",
        background: ev.bg,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* ══ Left — image column ══ */}
      <div
        ref={imgColRef}
        style={{
          width: "clamp(200px, 44%, 600px)",
          flexShrink: 0,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          ref={trackRef}
          style={{ display: "flex", height: "100%", willChange: "transform" }}
        >
          {ev.slides.map((slide, i) => (
            <div
              key={i}
              style={{
                width: colW > 0 ? `${colW}px` : "44vw",
                flexShrink: 0,
                height: "100%",
                background: slide.grad,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {slide.img && (
                <img
                  src={slide.img}
                  alt={slide.heading}
                  loading={i === 0 ? "eager" : "lazy"}
                  style={{
                    position: "absolute", inset: 0,
                    width: "100%", height: "100%",
                    objectFit: "cover",
                  }}
                />
              )}
              <div style={{
                position: "absolute", inset: 0,
                backgroundImage: GRAIN, opacity: 0.07,
                pointerEvents: "none",
              }} />
              {/* Slide number watermark */}
              <span aria-hidden style={{
                position: "absolute", bottom: "20px", right: "20px",
                fontFamily: "var(--font-heading)", fontWeight: 900,
                fontSize: "clamp(72px,13vw,140px)",
                color: "rgba(255,255,255,0.045)",
                letterSpacing: "-0.06em", lineHeight: 1,
                pointerEvents: "none", userSelect: "none",
              }}>
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ══ Right — text panels ══ */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>

        {ev.slides.map((slide, i) => (
          <div
            key={i}
            ref={el => { panelRefs.current[i] = el; }}
            style={{
              position: "absolute", inset: 0,
              display: "flex", flexDirection: "column", justifyContent: "center",
              padding: "clamp(28px, 5vw, 80px) clamp(24px, 4vw, 64px)",
              visibility: i === 0 ? "visible" : "hidden",
              zIndex: i === 0 ? 2 : 1,
            }}
          >
            {/* ① event number */}
            <span data-s style={{
              display: "block",
              fontFamily: "var(--font-body)", fontWeight: 700,
              fontSize: "9.5px", letterSpacing: "0.18em", textTransform: "uppercase",
              color: "#E8521A", marginBottom: "8px",
            }}>
              {ev.idx}
            </span>

            {/* ② category badge */}
            <span data-s style={{
              display: "inline-flex", alignSelf: "flex-start",
              fontFamily: "var(--font-body)", fontSize: "9.5px", fontWeight: 700,
              letterSpacing: "0.10em", textTransform: "uppercase",
              padding: "4px 12px", borderRadius: "999px",
              background: ev.catBg, color: ev.catColor,
              marginBottom: "22px",
            }}>
              {ev.category}
            </span>

            {/* ③ slide heading (changes per slide) */}
            <h2 data-s style={{
              fontFamily: "var(--font-heading)", fontWeight: 900,
              fontSize: "clamp(24px, 3vw, 50px)",
              letterSpacing: "-0.035em", lineHeight: 1.06,
              color: "#FFFFFF", marginBottom: "16px",
            }}>
              {slide.heading}
            </h2>

            {/* ④ date */}
            <div data-s style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <Calendar size={11} style={{ color: "rgba(255,255,255,0.28)", flexShrink: 0 }} />
              <time dateTime={ev.dateTime} style={{
                fontFamily: "var(--font-body)", fontSize: "12px",
                color: "rgba(255,255,255,0.28)", letterSpacing: "0.04em",
              }}>
                {ev.date}
              </time>
            </div>

            {/* ⑤ slide body copy (changes per slide) */}
            <p data-s style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(12.5px, 1.25vw, 15px)",
              lineHeight: 1.84, color: "rgba(255,255,255,0.40)",
              marginBottom: "22px", maxWidth: "420px",
            }}>
              {slide.body}
            </p>

            {/* ⑥ tags */}
            <div data-s style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
              {ev.tags.map(t => (
                <span key={t} style={{
                  fontFamily: "var(--font-body)", fontSize: "9.5px",
                  fontWeight: 600, letterSpacing: "0.04em",
                  padding: "4px 11px", borderRadius: "999px",
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  color: "rgba(255,255,255,0.38)",
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* ── Dots + counter ── */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 clamp(24px, 4vw, 64px) 28px",
          pointerEvents: "none",
        }}>
          <div style={{ display: "flex", gap: "5px", alignItems: "center", pointerEvents: "all" }}>
            {ev.slides.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Slide ${i + 1}`}
                style={{
                  width: i === current ? "22px" : "6px",
                  height: "6px", borderRadius: "3px",
                  border: "none", cursor: "pointer", padding: 0,
                  background: i === current
                    ? "rgba(255,255,255,0.80)"
                    : "rgba(255,255,255,0.18)",
                  transition: "all 0.35s cubic-bezier(0.32,0,0.24,1)",
                }}
              />
            ))}
          </div>
          <span style={{
            fontFamily: "var(--font-body)", fontSize: "10px",
            fontWeight: 700, letterSpacing: "0.10em",
            color: "rgba(255,255,255,0.24)",
          }}>
            {String(current + 1).padStart(2, "0")} / {String(ev.slides.length).padStart(2, "0")}
          </span>
        </div>

      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Page
═══════════════════════════════════════════════════════════════ */
export default function EventsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(".eh-line",
        { yPercent: 116, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.1, ease: "power3.out", delay: 0.1 }
      );
      gsap.fromTo(".eh-meta",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.9, delay: 0.5, ease: "power2.out" }
      );
      gsap.to(".eh-bg", {
        yPercent: 28, ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top", end: "bottom top", scrub: 1,
        },
      });
      gsap.utils.toArray<HTMLElement>(".cat-item").forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 16 },
          {
            opacity: 1, y: 0, duration: 0.55, delay: i * 0.07, ease: "power2.out",
            scrollTrigger: { trigger: ".cat-strip", start: "top 84%", toggleActions: "play none none none" },
          }
        );
      });
      gsap.utils.toArray<HTMLElement>(".ep-reveal").forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, y: 28 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 84%", toggleActions: "play none none none" },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ background: "#E8521A", marginTop: "calc(-1 * var(--nav-height))" }}>

      {/* ══ HERO ══ */}
      <section
        ref={heroRef}
        style={{
          position: "relative", overflow: "hidden",
          minHeight: "72vh", display: "flex", flexDirection: "column",
          justifyContent: "center", paddingTop: "var(--nav-height)",
        }}
      >
        <div className="eh-bg" style={{
          position: "absolute", inset: "-14%",
          background: "#E8521A", willChange: "transform",
        }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: GRAIN, opacity: 0.06 }} />
        </div>

        <svg aria-hidden style={{ position: "absolute", top: "-18%", right: "-10%", width: "52vw", height: "52vw", maxWidth: 580, maxHeight: 580, opacity: 0.10, pointerEvents: "none" }} viewBox="0 0 580 580" fill="none">
          <circle cx="290" cy="290" r="265" stroke="rgba(255,255,255,1)" strokeWidth="80" fill="none" />
        </svg>
        <svg aria-hidden style={{ position: "absolute", bottom: "-12%", left: "-8%", width: "30vw", height: "30vw", maxWidth: 340, maxHeight: 340, opacity: 0.08, pointerEvents: "none" }} viewBox="0 0 340 340" fill="none">
          <circle cx="170" cy="170" r="150" stroke="rgba(255,255,255,1)" strokeWidth="50" fill="none" />
        </svg>
        <div aria-hidden style={{
          position: "absolute", bottom: "20px", right: "-14px",
          fontFamily: "var(--font-heading)", fontWeight: 900,
          fontSize: "clamp(100px, 20vw, 340px)", color: "rgba(0,0,0,0.06)",
          lineHeight: 1, letterSpacing: "-0.06em",
          userSelect: "none", pointerEvents: "none",
        }}>
          EVENTS
        </div>

        <div className="page-container w-full" style={{
          position: "relative", zIndex: 1,
          paddingTop: "clamp(36px,5vw,56px)",
          paddingBottom: "clamp(48px,6vw,72px)",
        }}>
          <div style={{ overflow: "hidden" }}>
            <div className="eh-line" style={{
              fontFamily: "var(--font-heading)", fontWeight: 900,
              fontSize: "clamp(48px, 11vw, 152px)",
              lineHeight: 0.90, letterSpacing: "-0.045em", textTransform: "uppercase",
              display: "flex", alignItems: "baseline", gap: "0.22em",
            }}>
              <span style={{ color: "#FFFFFF" }}>MAKE</span>
              <span style={{ color: "transparent", WebkitTextStroke: "2.5px rgba(255,255,255,0.80)", fontSize: "0.82em" }}>IT</span>
            </div>
          </div>
          <div style={{ overflow: "hidden" }}>
            <div className="eh-line" style={{
              fontFamily: "var(--font-heading)", fontWeight: 900,
              fontSize: "clamp(48px, 11vw, 152px)",
              lineHeight: 0.90, letterSpacing: "-0.045em", textTransform: "uppercase",
              color: "#FFFFFF", marginTop: "0.04em",
            }}>
              HAPPEN
            </div>
          </div>

          <div className="eh-meta" style={{
            fontFamily: "var(--font-script)", fontSize: "clamp(18px, 2.4vw, 30px)",
            color: "rgba(255,255,255,0.90)", lineHeight: 1.2,
            marginTop: "18px", marginBottom: "20px",
            display: "inline-block", transform: "rotate(-1.5deg)",
          }}>
            — where every event shapes a future
          </div>
          <p className="eh-meta" style={{
            fontFamily: "var(--font-body)", fontSize: "clamp(14px, 1.4vw, 16px)",
            lineHeight: 1.78, color: "rgba(255,255,255,0.72)",
            maxWidth: "min(440px,100%)", marginBottom: 0, display: "block",
          }}>
            Over 100 events, workshops, hackathons, and summits — each one shaping the next generation of innovators and entrepreneurs.
          </p>

        </div>
      </section>

      {/* ══ CATEGORY STRIP ══ */}
      <section style={{ background: "#111111", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="page-container">
          <div className="cat-strip" style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}>
            {CATS.map((c, i) => (
              <div key={c.label} className="cat-item" style={{
                padding: "clamp(18px,3vw,28px) clamp(16px,2.5vw,24px)",
                borderRight: (i + 1) % 3 !== 0 ? "1px solid rgba(255,255,255,0.05)" : "none",
                borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none",
              }}>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(24px,4vw,40px)", letterSpacing: "-0.04em", color: "#FFFFFF", lineHeight: 1, marginBottom: "4px" }}>{c.n}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: "10.5px", color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em" }}>{c.label}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media(min-width:640px){
            .cat-strip{grid-template-columns:repeat(6,1fr)!important;}
            .cat-strip>div{border-bottom:none!important;}
            .cat-strip>div:last-child{border-right:none!important;}
          }
        `}</style>
      </section>

      {/* ══ EVENT SECTIONS — 7 events, each with 6 slides ══ */}
      {FEATURED.map((ev, i) => (
        <EventSection key={i} ev={ev} index={i} />
      ))}

      {/* ══ CTA ══ */}
      <section style={{ background: "#0A0A0A", padding: "clamp(88px,14vw,160px) 0", textAlign: "center" }}>
        <div className="page-container">
          <div className="ep-reveal" style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "22px" }}>
            <div style={{ width: "22px", height: "1px", background: "#E8521A" }} />
            <span style={{ fontFamily: "var(--font-body)", fontSize: "9.5px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#E8521A" }}>What&apos;s Next</span>
            <div style={{ width: "22px", height: "1px", background: "#E8521A" }} />
          </div>
          <h2 className="ep-reveal" style={{ fontFamily: "var(--font-heading)", fontWeight: 900, fontSize: "clamp(36px,7vw,88px)", letterSpacing: "-0.045em", color: "#FFFFFF", lineHeight: 1.04, marginBottom: "20px" }}>
            Don&apos;t miss<br />the next one.
          </h2>
          <p className="ep-reveal" style={{ fontFamily: "var(--font-body)", fontSize: "clamp(14px,1.5vw,17px)", lineHeight: 1.72, color: "rgba(255,255,255,0.36)", maxWidth: "420px", margin: "0 auto 40px" }}>
            Stay updated with all upcoming hackathons, workshops, and events at MLRIT CIE.
          </p>
          <div className="ep-reveal" style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "14px", color: "#FFFFFF", background: "#E8521A", borderRadius: "999px", padding: "13px 30px", textDecoration: "none", letterSpacing: "-0.01em" }}>
              Get Involved <ArrowRight size={14} />
            </Link>
            <a href="https://www.instagram.com/mlritcie/" target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "14px", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: "999px", padding: "13px 30px", textDecoration: "none" }}>
              Follow on Instagram
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
