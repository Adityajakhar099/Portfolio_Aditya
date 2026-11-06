# Aditya Jakhar — Developer Portfolio

> **Monochrome Noir × Crimson Editorial Design System**  
> Engineered with React 19, TypeScript, Vite, Tailwind CSS v4, Motion, and GSAP.

[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.x-88CE02?logo=greensock&logoColor=white)](https://gsap.com/)
[![Motion](https://img.shields.io/badge/Motion-14.x-FF0055?logo=framer&logoColor=white)](https://motion.dev/)

---

## Overview

Personal software engineering portfolio for **Aditya Jakhar** (Computer Science undergraduate at LNMIIT Jaipur), focusing on high-performance full-stack web architectures, applied AI/ML systems, and luxury editorial design.

### Key Architectural Highlights
- **Monochrome Noir × Crimson Visual Identity:** Grounded in pure obsidian `#030303`, layered neutral darks (`#080808`, `#0D0D0F`, `#141416`, `#1B1B1F`), crisp ivory typography (`#F5F4F2`), and surgical crimson accents (`#E50925`, `#F21D35`, `#8F071A`).
- **Stationary Portrait & 3-Panel Architectural Choreography:** A stationary studio portrait ($\Delta x = 0, \Delta y = 0$) framed by 3 independently moving vertical architectural panels via live screen-space aperture masking in GSAP (`ScrollTrigger`).
- **Stacked Typography Monolith:** Bold `Bebas Neue` display lockup with balanced optical tracking, tight line-height, and directional entrance masking.
- **Scroll-Controlled Engineering Narrative:** Staggered outline-to-solid typography reveals (`ENGINEERING IDEAS. / BUILDING IMPACT.`) choreographed across scroll phases without layout shift.
- **Responsive Architecture:** Fully audited across 7 distinct breakpoints (`390px`, `430px`, `768px`, `1024px`, `1366px`, `1440px`, `1536px`) with zero horizontal overflow.
- **Accessibility & Performance:** Built with `prefers-reduced-motion` fallbacks, high-contrast focus rings, semantic HTML5 sectioning, and sub-second production bundle size.

---

## Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework & Build** | React 19, TypeScript, Vite 8, React Router DOM 7 |
| **Styling & Design Tokens** | Tailwind CSS v4 (`@tailwindcss/vite`), Semantic CSS Custom Properties (`src/styles/tokens.css`) |
| **Typography** | `@fontsource/bebas-neue` (Display), `@fontsource-variable/manrope` (Body), `@fontsource-variable/caveat` (Handwritten Accent) |
| **Animation & Choreography** | Motion (`motion/react`), GSAP 3 + `@gsap/react` (`ScrollTrigger`) |
| **Icons & Component Utilities** | `lucide-react`, `clsx`, `tailwind-merge`, `class-variance-authority` |
| **Static Verification** | Oxlint (`npm run lint`), TypeScript Strict Type Checking (`npm run build`) |

---

## Project Structure

```text
├── public/
│   ├── images/              # Studio photography & portraits
│   ├── projects/            # Authenticated live project screenshots
│   └── resume.pdf           # Downloadable curriculum vitae
├── src/
│   ├── animations/          # Motion transition curves & GSAP registration
│   ├── assets/              # Bundled SVGs & static assets
│   ├── components/
│   │   ├── Buttons/         # Magnetic buttons & interactive triggers
│   │   ├── Cursor/          # Fine-pointer custom cursor
│   │   ├── Icons/           # Custom SVG glyphs & geometric stars
│   │   ├── Navbar/          # Fixed obsidian blurred navigation
│   │   ├── ProjectCard/     # Editorial exhibition project cards
│   │   └── UI/              # Kinetic text reveal & layout wrappers
│   ├── data/                # Typed data models (projects, skills, experience)
│   ├── hooks/               # Custom hooks (reduced motion, magnetic physics)
│   ├── pages/               # Route views (Home, ProjectDetails)
│   ├── sections/
│   │   ├── Hero/            # Stationary-portrait multi-panel hero stage
│   │   ├── Storytelling/    # Kinetic typography editorial narrative
│   │   ├── About/           # LNMIIT undergraduate journey & ledger
│   │   ├── Projects/        # Horizontal project exhibition gallery
│   │   ├── Skills/          # Categorized technical competencies
│   │   ├── Experience/      # Milestone timeline & academic record
│   │   ├── Process/         # Engineering methodology & principles
│   │   └── Contact/         # High-contrast crimson action stage
│   ├── styles/              # Design tokens, typography scale, global CSS
│   └── utils/               # Class merging & helper functions
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Getting Started

### Prerequisites
- Node.js `18.x` or higher
- npm, pnpm, or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/Adityajakhar099/portfolio-website.git

# Navigate into the project directory
cd portfolio-website

# Install dependencies
npm install
```

### Development
```bash
# Start local development server with HMR
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build & Linting
```bash
# Run static code analysis with Oxlint
npm run lint

# Compile TypeScript and generate production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## Deployment

The project builds to the `dist/` directory and can be deployed directly to Vercel, Netlify, Cloudflare Pages, or GitHub Pages.

### Vercel / Netlify Configuration
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

---

## License

Personal project & portfolio. All rights reserved © 2026 Aditya Jakhar.
