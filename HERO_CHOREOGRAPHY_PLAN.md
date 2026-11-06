# Cinematic Hero Redesign & Scroll Choreography Plan

## 1. Unified Identity & Visual Composition
- **Unified `ADITYA JAKHAR` Lockup**: Replaces the disconnected `justify-between` split with a single, cohesive centered display lockup (`Bebas Neue`, `clamp(4.6rem, min(11.4vw, 19.5svh), 11.5rem)` on desktop/tablet; tight stacked two-line lockup `clamp(4.35rem, 18.5vw, 6.2rem)` on mobile) sharing one baseline and an intentional `0.34em` editorial gap that converges to `0.18em` on scroll.
- **Anchored Portrait Monolith**: Central pure-black (`#030303`) studio portrait stage with crimson rim lighting, SVG film grain, controlled edge/bottom vignette, precision registration ticks, and 3D perspective (`perspective: 1200px`). Positioned to interlock directly beneath and overlap the lower architectural frame of the name, flanked by connected left/right identity wings.

## 2. Five-Layer Depth Hierarchy
1. **Plane 0 — Ghosted Backdrop Watermark (`z-0`, slowest)**: `SOFTWARE ARCHITECTURE · AI SYSTEMS` counter-drifts horizontally (`xPercent: 4 -> -6`).
2. **Plane 1 — Volumetric Crimson Lighting & Main Name (`z-10`, medium)**: Radial `#E50925` / `#A30D22` studio aura pulses and expands; solid `#F5F2EF` `ADITYA JAKHAR` converges horizontally, then descends and scales *behind* the portrait silhouette (`z-10` under `z-20`).
3. **Plane 2 — Portrait Anchor (`z-20`, prominent)**: Scales forward (`1.0 -> 1.14`) with inner counter-scaled image (`1.03 -> 1.13`), subtle 3D `rotateX` leveling, and vertical lift before dimming into the Pure Black scrim for Scene 04.
4. **Plane 3 — Foreground Wireframe & Statement Stage (`z-30`, focal reveal)**: Subtle stroke echo + Scene 04 three-line `ENGINEERING IDEAS. / BUILDING IMPACT. / CREATING POSSIBILITIES.` with masked line reveals, counter-glides, and scrubbed outline-to-solid crimson/ivory fills.
5. **Plane 4 — Supporting Identity Rails & Horizon Chrome (`z-30`, controlled exit)**: Left disciplines/focus card and right summary/CTAs glide outward and fade cleanly in Scene 02 (switching `inert` + `pointer-events: none` once exited, and restoring seamlessly when scrolling back up).

## 3. Normalized GSAP Timeline (`0.00` → `1.00`, `scrub: 0.65`)
- **Scene 01 — Identity (`0.00` – `0.20`)**: Full unified name + portrait + flanking rails visible at `0%`. Initial scroll gently engages background watermark drift, portrait scale (`1.00 -> 1.04`), crimson glow warmup, and initial name convergence.
- **Scene 02 — Convergence (`0.20` – `0.45`)**: `ADITYA` and `JAKHAR` glide inward into a locked composition; supporting left/right wings translate outward (`±44px`) and fade to `0`; portrait advances (`1.04 -> 1.10`); background watermark drifts opposite.
- **Scene 03 — Portrait Dominance (`0.45` – `0.70`)**: Unified `ADITYA JAKHAR` glides downward and scales wider *behind* the `z-20` portrait (`opacity: 1 -> 0.16`) while a delicate foreground stroke echo passes subtly across; giant background words (`SYSTEMS · INTELLIGENCE`) emerge softly; portrait commands center stage (`scale: 1.14`) without awkward cropping.
- **Scene 04 — Engineering Statement (`0.70` – `0.90`)**: Dark studio scrim deepens gently over the portrait while `ENGINEERING IDEAS.`, `BUILDING IMPACT.`, and `CREATING POSSIBILITIES.` enter via staggered masked reveals, opposite horizontal glides, and scrubbed outline-to-solid fills.
- **Scene 05 — Handoff (`0.90` – `1.00`)**: Portrait settles and recedes (`opacity -> 0.18`); statement locks into final alignment; vertical crimson horizon lead-line (`scaleY: 0 -> 1`) draws down the bottom center to connect directly into `#storytelling` (the Engineering Manifesto section).

## 4. Responsive `gsap.matchMedia()` Architecture
- **Desktop (`>= 1024px`)**: Full pinned stage (`end: '+=270%'`), 3-column initial layout, 5-scene timeline.
- **Tablet (`768px – 1023px`)**: Shorter pinned duration (`end: '+=175%'`), reduced horizontal offsets, compact 2-column supporting deck below portrait.
- **Mobile (`< 768px`)**: Unpinned vertical layout with tight 2-line unified `ADITYA / JAKHAR` display block, scroll-scrubbed portrait parallax, always-accessible CTA buttons, and scroll-triggered statement band.
- **Reduced Motion (`prefers-reduced-motion: reduce`)**: Static unpinned layout with full visual clarity and zero continuous/scrubbed motion.

