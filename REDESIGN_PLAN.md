# REDESIGN PLAN — ADITYA JAKHAR PORTFOLIO (PURE BLACK + CRIMSON EDITORIAL EDITION)

> **Creative Direction**: Pure Pitch-Black (`#030303` / `#080808`) · Neutral Obsidian Surfaces (`#0B0B0D` – `#1B1B20`) · Surgical Pure Crimson (`#A30D22` / `#E50925` / `#F21D35`) · Monumental Editorial Typography (`Bebas Neue` + `Manrope` + restrained `Caveat`).

---

## 1. Current Visual Weaknesses Identified

1. **Muddy Brownish-Warm Cast Across Every Surface**:
   - Previous backgrounds (`#171313`, `#201919`, `#120E0E`, `#0E0B0B`) contained warm red-brown channels that made dark surfaces read as chocolate/burgundy rather than crisp pitch-black.
   - Secondary/muted text (`#A69B97`) carried a warm taupe-stone tint instead of neutral technical zinc (`#A1A1AA` / `#71717A`).
   - Widespread orange (`#FF5A1F`) across eyebrows, ambient glows, SVG schematics, tags, timelines, and gradients diluted the dramatic pure-black + crimson contrast seen in the four design references.
2. **Hero Composition & Placeholder Weakness**:
   - The previous silhouette stand-in carried warm orange lighting and sat inside a boxed layout flanked by two heavy bordered cards, reducing the monumental impact of `ADITYA JAKHAR` and competing with the central portrait stage.
   - Introductory role labels were overly small (`0.75rem`) rather than confident editorial positioning.
3. **Typography & Section Rhythm**:
   - Excessive uppercase micro-text reduced scannability in cards and descriptions.
   - Section 02 (`Typography Storytelling`) only shifted horizontally by `±5%` and did not transition outlined lettering into solid lettering on scroll as intended.
4. **About Section Stock Aesthetic**:
   - Used a warm-lit generic architectural desk render rather than a bold, high-contrast pure-black & crimson editorial portrait/engineering frame, and used overly wordy copy instead of a crisp, authoritative personal introduction.
5. **Project Exhibition Visuals & Real Repository Grounding**:
   - Cards relied on generic 3-node wire diagrams and root-profile GitHub links (`github.com/Adityajakhar099`) rather than verified per-project repository URLs (`AI-Loan`, `LawLane_AI`, `Campus-lost-found`), verified live deployments (`ai-loan-black.vercel.app`, `campus-lost-found-five.vercel.app`), authentic screenshots, and high-craft architectural exhibition panels with intentional card-to-card ScrollTrigger snapping.
6. **Navigation & Contact Polish**:
   - Navbar used a bulky pill container and lacked refined hover underline choreography and a true full-screen mobile editorial drawer with proper focus/escape/scroll-lock behavior.
   - Contact still exposed an unverified LinkedIn search URL and blank PDF stub instead of clean, verified contact channels on a pure `#030303` canvas with one dominant crimson architectural statement block.

---

## 2. New Design Concept

Synthesizing the four original references into one cohesive **Pure Black + Crimson Creative-Engineer Identity**:

- **Reference 1 (Cinematic Depth & Atmospheric Backlight)**: Pure `#030303` / `#080808` void with a controlled `#E50925` / `#A30D22` radial studio halo behind the central portrait and monumental ghosted backdrop typography.
- **Reference 2 (Clear Structural Hierarchy)**: Crisp `1px solid #29292F` architectural grid hairlines, disciplined `01`–`08` crimson indexing, and scannable neutral-zinc (`#141418`) technical modules.
- **Reference 3 (Oversized Display Type & Central Subject)**: Spanning monumental `ADITYA JAKHAR` `Bebas Neue` typography dominating the first viewport, paired with bold crimson geometric accents and a monolithic closing `LET'S BUILD SOMETHING GREAT.` statement.
- **Reference 4 (Editorial Layouts & Exhibition Grids)**: Asymmetric editorial splits in About, large visual-first exhibition frames in Selected Projects, and restrained `Caveat` personal script accents.

---

## 3. Updated Locked Colour System (`src/styles/tokens.css` & `global.css`)

All brown, sepia, beige, warm-grey, and orange (`#FF5A1F`, `#171313`, `#201919`, `#A69B97`) values are completely removed and replaced with:

| Token | Value | Role |
| :--- | :--- | :--- |
| `--color-black-pure` | `#030303` | Primary black — Hero void, Storytelling stage, Contact finale, full-screen drawer |
| `--color-bg-primary` | `#080808` | Main page background |
| `--color-bg-secondary` | `#0B0B0D` | Secondary neutral obsidian section background |
| `--color-surface-elevated` | `#101013` | Elevated architectural containers & recessed frames |
| `--color-surface-card` | `#141418` | Interactive cards & exhibition panels |
| `--color-surface-hover` | `#1B1B20` | Card & control hover surface |
| `--color-crimson-dark` | `#A30D22` | Deep crimson atmosphere, gradients & pressed states |
| `--color-crimson-primary` | `#E50925` | Active indicators, numbered indices, crimson emphasis |
| `--color-red-signal` | `#F21D35` | High-emphasis primary CTAs (used sparingly) |
| `--color-text-primary` | `#F5F2EF` | Ivory display headings & primary foreground |
| `--color-text-secondary` | `#A1A1AA` | Neutral zinc body copy & technical descriptions |
| `--color-text-muted` | `#71717A` | Muted metadata, indices & secondary labels |
| `--color-border-subtle` | `#29292F` | Crisp neutral dark structural borders |
| `--color-border-red` | `rgba(229, 9, 37, 0.30)` | Subtle crimson active/hover border |
| `--color-glow-red` | `rgba(229, 9, 37, 0.13)` | Controlled crimson studio glow |

---

## 4. Section-by-Section Redesign & Layout Architecture

1. **Navbar (`src/components/Navbar/Navbar.tsx`)**:
   - Minimal transparent-to-`#030303/88` header with `1px` `#29292F` bottom border and top `2px` `#E50925` scroll progress bar.
   - Compact `AJ.` personal brand mark, clean indexed links (`01`–`07`) with crimson numbers, refined hover underline animation, smooth spring active indicator, minimal GitHub icon, and sharp crimson Contact button.
   - Full-screen `#030303` mobile navigation drawer with oversized editorial links, Escape/scroll-lock/inert-main accessibility, and prominent Contact CTA.
2. **01 — Hero Experience (`src/sections/Hero/HeroSection.tsx` + `PortraitStage.tsx`)**:
   - Pure `#030303` stage with delicate `#29292F` architectural grid hairlines and controlled `#E50925` volumetric backlight.
   - Monumental spanning `ADITYA JAKHAR` (`Bebas Neue`) layered with subtle ghosted backdrop typography (`SOFTWARE ENGINEER`) and central high-contrast pure-black & crimson studio portrait stand-in (`public/images/hero-editorial-standin.jpg`) inside a precision viewfinder frame.
   - Upgraded hero copy & hierarchy: `HELLO, I'M` → `ADITYA JAKHAR` → `COMPUTER SCIENCE ENGINEER · FULL-STACK DEVELOPER · AI/ML ENTHUSIAST`, paired with refined animated phrase transitions (`"Engineering Digital Experiences"`, `"Building AI-Powered Products"`, `"Creating Meaningful Software"`, `"Turning Ideas Into Impact"`).
   - Preserves the `175svh` desktop scroll-controlled runway (differential portrait zoom, layered typography parallax, `inert`-guarded intro fade, and mid-runway statement reveal) while guaranteeing zero clipping on `1366×768` and `1440×900`.
3. **02 — Typography Storytelling (`src/sections/Storytelling/TypographyStorySection.tsx`)**:
   - Pure `#030303` stage with monumental two-line editorial pairs: `ENGINEERING / IDEAS.`, `BUILDING / IMPACT.`, `CREATING / POSSIBILITIES.`.
   - Scroll-scrubbed horizontal opposite movement, clipped masked entrances, crimson highlighted words, and **scroll-driven outline-to-solid ivory/crimson fill progression** (`useScroll` + `useTransform` driving clip-path fill over hollow stroke type).
4. **03 — About (`src/sections/About/AboutSection.tsx`)**:
   - `#080808` canvas with asymmetric 5/7 editorial grid: dominant vertical darkroom engineering visual (`public/images/about-editorial.jpg`) unveiled via scroll-scrubbed `clip-path` + parallax, paired with concise, authentic LNMIIT Computer Science narrative, red line accents, structured technical specifications, and `Caveat` signature.
5. **04 — Selected Projects Exhibition (`src/sections/Projects/ProjectsSection.tsx` + `ProjectExhibitionCard.tsx`)**:
   - Upgraded with verified repository URLs (`AI-Loan`, `LawLane_AI`, `Campus-lost-found`), verified live demo links, authentic live UI capture for `AI-Loan` framed in a dark monochrome-to-color studio browser viewport, and bespoke high-contrast `#080808`/`#E50925` architectural system preview stages for `LawLane AI` (ChromaDB + LangGraph + Challan RAG) and `Campus Lost & Found` (Google OAuth + MERN Recovery Console).
   - Desktop sticky horizontal GSAP `ScrollTrigger` gallery with smooth scrub **plus intentional card-to-card snapping** (`snap: 1 / (n - 1)`), clickable slide index buttons (`01`, `02`, `03`), keyboard focus-to-scroll sync, and unclipped responsive sizing; clean vertical exhibition cards on mobile/tablet (`< 1024px`).
6. **05 — Technical Ecosystem (`src/sections/Skills/SkillsSection.tsx`)**:
   - `#080808` background, dual opposite-direction typographic marquees (`#0B0B0D` band), and 6 neutral `#141418` interactive ecosystem panels (`Programming`, `Frontend`, `Backend`, `Database`, `AI/ML`, `Development`) with subtle cursor-tracked `rgba(229, 9, 37, 0.13)` spotlight hover (adapted from 21st.dev `Spotlight Card` `#2220`), minimal geometric markers, and crisp typography.
7. **06 — Experience & Journey (`src/sections/Experience/ExperienceSection.tsx`)**:
   - Preserves the vertical timeline & scroll-scrubbed crimson progress spine, upgraded onto `#0B0B0D` / `#141418` neutral obsidian cards with sharper typographic hierarchy, `once: true` entrance reveals (fixing re-entry flicker), and active milestone glow.
8. **07 — Process & 08 — Contact Finale (`ProcessSection.tsx` + `ContactSection.tsx`)**:
   - **Process**: `01 Discover → 02 Plan → 03 Architect → 04 Develop → 05 Test → 06 Deliver` on `#080808` with scroll-linked active step synchronization, connecting progress rail, and minimal technical icons.
   - **Contact & Footer**: Pure `#030303` closing stage with monumental `LET'S BUILD / SOMETHING / GREAT.` typography, **one dominant `#E50925` → `#A30D22` crimson architectural CTA monolith**, verified real contact links ONLY (`adityajakhar182@gmail.com` with copy feedback + `github.com/Adityajakhar099` — removing the unverified LinkedIn search URL and blank PDF stub), and a minimal editorial colophon inside a semantic `<footer>`.

---

## 5. Existing Animations Preserved vs. Refined

- **Preserved**:
  - Desktop `175svh` Hero sticky runway & differential portrait/typography parallax.
  - Desktop GSAP `ScrollTrigger` pinned horizontal project gallery (`>= 1024px`) & vertical mobile fallback.
  - About scroll-scrubbed `clip-path` image reveal & background watermark parallax.
  - Skills opposite-direction CSS GPU marquees.
  - Experience `useScroll` + `useSpring` vertical crimson timeline spine.
  - Process `useScroll` horizontal progress rail.
- **Refined / Added**:
  - Storytelling **scroll-controlled outline-to-solid text fill** + stronger horizontal travel (`±14%`).
  - Projects **card-to-card GSAP snapping**, `document.fonts.ready` `ScrollTrigger.refresh()`, `ignoreMobileResize: true`, and clickable `01 / 02 / 03` slide triggers.
  - Process active step synchronized directly with scroll progress (with hover/click override).
  - Fixed `EditorialTextReveal` hover-pause flash and touch-sticky hover bug; replaced palette sweep with pure `#F21D35` → `#E50925` → `#F5F2EF`.
  - Strict single-owner rule enforced (Motion and GSAP never animate the same property on the same DOM node).

---

## 6. Files to Modify / Create

- **Design System & Docs**: `REDESIGN_PLAN.md`, `design-system.md`, `src/styles/tokens.css`, `src/styles/global.css`, `src/styles/typography.css`, `src/styles/animations.css`
- **Assets**: `public/images/hero-editorial-standin.jpg`, `public/images/about-editorial.jpg`, `public/projects/ai-loan-live.png`, `public/projects/campus-lost-found-live.png` (if non-blank; otherwise authentic MERN console visual)
- **Data**: `src/data/experience.ts`, `src/data/projects.ts`, `src/data/skills.ts`, `src/data/process.ts`
- **Shared Components**: `src/components/Icons/BrandIcons.tsx` (new shared GitHub/arrow marks), `src/components/Navbar/Navbar.tsx`, `src/components/Buttons/variants.ts`, `src/components/UI/PortraitStage.tsx`, `src/components/UI/EditorialTextReveal.tsx`, `src/components/UI/InfiniteMarquee.tsx`, `src/components/UI/SectionHeader.tsx`, `src/components/ProjectCard/ProjectExhibitionCard.tsx`
- **Homepage Sections & Pages**: `src/sections/Hero/HeroSection.tsx`, `src/sections/Storytelling/TypographyStorySection.tsx`, `src/sections/About/AboutSection.tsx`, `src/sections/Projects/ProjectsSection.tsx`, `src/sections/Skills/SkillsSection.tsx`, `src/sections/Experience/ExperienceSection.tsx`, `src/sections/Process/ProcessSection.tsx`, `src/sections/Contact/ContactSection.tsx`, `src/pages/Home/HomePage.tsx`, `src/pages/ProjectDetails/ProjectDetailsPage.tsx`, `src/animations/gsapConfig.ts`

