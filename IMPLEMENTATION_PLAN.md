# IMPLEMENTATION PLAN — Phase 2: Immersive Scroll-Driven Homepage

## 1. Architecture & Design Guardrails
- **Preserved System**: `#090909` primary canvas, `#171313` secondary bands, `#201919` elevated surfaces, `#B51220` crimson, `#E52B22` bright red, `#FF5A1F` warm orange, `#F2EDE7` primary text, `#A69B97` muted text; `Bebas Neue` + `Manrope Variable` + `Caveat Variable`.
- **Animation Ownership Rule**:
  - **Motion (`motion/react`)**: Hero `useScroll`/`useTransform` multi-speed parallax & zoom runway, Section 02 kinetic horizontal typography, Section 03 `clip-path` image reveal, Section 05 infinite opposite-direction marquees, Section 06 vertical timeline scroll-progress spine, Section 07 interactive process cards, Section 08 finale entrance, and Navbar scroll progress + active pill (`layoutId`).
  - **GSAP (`gsap` + `ScrollTrigger` via `useGSAP`)**: Desktop pinned horizontal exhibition gallery in Section 04 (`ProjectsSection`), scoped strictly to the gallery track with `gsap.matchMedia()` so desktop (`>= 1024px`) pins cleanly and mobile/tablet (`< 1024px`) stacks naturally without conflicts.
- **Reduced Motion**: Respected globally via `MotionConfig reducedMotion="user"`, `useReducedMotion()`, CSS `@media (prefers-reduced-motion: reduce)`, and `gsap.matchMedia()`.

---

## 2. 21st.dev Component Research & Customizations

| 21st.dev Catalog Reference | Target Section | Customization Applied |
| :--- | :--- | :--- |
| `Smooth Scroll Hero` (`#2061`) & `Zoom Parallax` (`#5967`) | `01. HeroSection` | Adapted `165svh` sticky scroll runway with differential portrait zoom, background display scale/fade, and scroll-revealed bridge statement. |
| `Dia Text Reveal` (`#19853`) & `Animated Text Cycle` (`#1726`) | `01. HeroSection` | Customized chromatic sweep text-cycle in `#FF5A1F` / `#E52B22` / `#B51220` with WCAG pause/play controls. |
| `Full Screen Scroll FX` (`#5794`) & `Rectangular Text Reveal` (`#26076`) | `02. TypographyStorySection` | Scroll-linked opposing horizontal kinetic display lines (`ENGINEERING IDEAS.` / `BUILDING IMPACT.` / `CREATING POSSIBILITIES.`) with alternating filled & outlined condensed type. |
| `Scroll Reveal Image` (`#24466`) & `Sticky Scroll Reveal` (`#952`) | `03. AboutSection` | Scroll-scrubbed `clip-path` portrait/workspace reveal paired with staggered editorial narrative for LNMIIT CS & AI/ML profile. |
| `Portfolio Gallery` (`#7517`) | `04. ProjectsSection` | Desktop GSAP-pinned horizontal exhibition gallery (`AI-Loan`, `LawLane AI`, `Campus Lost & Found`) with distinct architectural schematic visuals + vertical stacked mobile layout. |
| `Infinite Text Marquee` (`#1944`) | `05. SkillsSection` | Opposite-direction infinite technology marquees + 6 interactive category panels. |
| `Sticky Scroll` (`#2837`) | `06. ExperienceSection` & `07. ProcessSection` | Scroll-linked vertical progress timeline (LNMIIT, Celebal internship, Projects, Hackathons) & 6-stage interactive engineering workflow (`01 DISCOVER` – `06 DELIVER`). |
| `Motion Navigation Menu` (`#21349`) & `Magnetic Button` (`#26725`) | `Navbar` & `08. ContactSection` | Spring-animated active section pill, top scroll-progress bar, and magnetic finale CTAs. |

---

## 3. Section-by-Section Execution Sequence

1. **Data Layer**: `src/data/{projects.ts,skills.ts,experience.ts,process.ts}` — Strictly authentic facts (LNMIIT CS undergraduate, Celebal internship, AI-Loan, LawLane AI, Campus Lost & Found, 6 skill domains, 6 process stages).
2. **Hooks & Animation Utilities**: `src/hooks/useActiveSection.ts`, `src/components/UI/InfiniteMarquee.tsx`, `src/components/UI/SectionHeader.tsx`.
3. **Navigation**: Upgrade `src/components/Navbar/Navbar.tsx` with scroll progress bar, active section `layoutId` pill, smooth scrolling, and animated mobile menu.
4. **Section 01 — Hero Experience**: Dominant central studio portrait composition + `165svh` scroll-linked parallax/zoom choreography & emerging statement.
5. **Section 02 — Typography Storytelling**: Kinetic scroll-scrubbed oversized statements.
6. **Section 03 — About Me**: Clip-path visual reveal + asymmetric LNMIIT / Full-Stack / AI-ML narrative.
7. **Section 04 — Selected Projects**: GSAP horizontal exhibition gallery on desktop + stacked reveal cards on mobile, with bespoke system schematics per project.
8. **Section 05 — Technical Arsenal**: Dual opposite-direction marquees + 6 interactive skill matrices.
9. **Section 06 — Experience & Journey**: Scroll-driven glowing timeline spine + milestone cards.
10. **Section 07 — Development Process**: `01 DISCOVER` – `06 DELIVER` interactive connected sequence.
11. **Section 08 — Contact Finale & Footer**: Monumental `LET'S BUILD SOMETHING GREAT.` crimson-accented finale, copyable email, GitHub, LinkedIn, Resume download, and editorial colophon.
12. **Verification**: Multi-scroll-position & multi-viewport (`390px`, `430px`, `768px`, `1366px`, `1440px`) browser screenshot inspection + `npm run build` & `npm run lint`.
