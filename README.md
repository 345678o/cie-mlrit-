<div align="center">

# CIE — MLRIT

### Centre for Innovation & Entrepreneurship

The official website of the **Centre for Innovation & Entrepreneurship** at **MLR Institute of Technology**, Hyderabad — the campus hub where students ideate, build, and launch impactful solutions.

<br/>

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-r184-000000?logo=threedotjs&logoColor=white)

</div>

---

## ✦ Overview

A fast, animated, content-rich marketing site for the MLRIT CIE. Built on the Next.js App Router with a motion-heavy, dark, editorial aesthetic — 3D accents, scroll-linked galleries, and a custom council showcase.

## ✦ Tech Stack

| Layer | Tools |
|-------|-------|
| **Framework** | Next.js 16 (App Router, Turbopack), React 19 |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4, inline CSS-in-JS |
| **Animation** | Framer Motion, GSAP (+ ScrollTrigger), Lenis smooth scroll |
| **3D / Visuals** | Three.js, @react-three/fiber, @react-three/drei, canvas-confetti |
| **Fonts** | Manrope, Inter, Caveat (`next/font/google`) + self-hosted Rockstar Display |

## ✦ Pages

| Route | Purpose |
|-------|---------|
| `/` | Landing — hero, highlights, stats |
| `/about` | Mission, vision, story |
| `/verticals` · `/verticals/[id]` | Innovation verticals + detail |
| `/council` | Student council showcase (flip cards by department) |
| `/events` | Event panels with interactive image galleries |
| `/alumni` | Alumni spotlights |
| `/tours` | Virtual campus tour — horizontal scroll gallery |
| `/facilities` · `/studios` | Spaces & labs |
| `/join` · `/join/apply` | Recruitment + application form |
| `/contact` | Contact + map |

## ✦ Getting Started

**Prerequisites:** Node.js 18.18+ (20+ recommended).

```bash
# install dependencies
npm install

# run dev server (Turbopack)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Lint with ESLint |

## ✦ Project Structure

```
public/            Static assets — fonts, council photos, event images
src/
  app/             App Router pages, layout, global styles
  components/
    layout/        Navbar, Footer
    ui/            Reusable UI — LoadingScreen, ChromaGrid, ScrollStack, BackToTop
next.config.ts     Image optimization (avif/webp), remote patterns
```

## ✦ Performance Notes

- Images served as AVIF/WebP via `next/image` config; council photos optimized (~70% smaller).
- Intro `LoadingScreen` runs once per page load — not on client-side route changes.
- Navbar backdrop blur tuned + scroll listener rAF-throttled to avoid scroll jank.

## ✦ Deployment

Optimized for [Vercel](https://vercel.com). Push to the connected branch to trigger a build, or:

```bash
npm run build && npm run start
```

---

<div align="center">

Built with ☕ by the **CIE MLRIT** team.

</div>
