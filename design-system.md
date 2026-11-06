# DESIGN SYSTEM — Aditya Jakhar Developer Portfolio

> **Locked Aesthetic**: Pure Black · Crimson · Editorial Typography · Contemporary Creative Engineer

---

## 1. Locked Color Palette (`src/styles/tokens.css` & `src/styles/global.css`)

| Semantic Token | Value | Usage Rule |
| :--- | :--- | :--- |
| `--color-black-pure` | `#030303` | Primary black — Hero stage, Typography Storytelling, Contact finale, full-screen drawer |
| `--color-bg-primary` | `#080808` | Main page background |
| `--color-bg-secondary` | `#0B0B0D` | Secondary neutral dark section surface |
| `--color-surface-elevated` | `#101013` | Elevated architectural frames & containers |
| `--color-surface-card` | `#141418` | Interactive cards, exhibition modules & timeline panels |
| `--color-surface-hover` | `#1B1B20` | Interactive hover surface |
| `--color-crimson-dark` | `#A30D22` | Deep crimson lighting core & pressed CTA states |
| `--color-crimson-primary` | `#E50925` | Active indicators, numbered indices, crimson emphasis |
| `--color-red-signal` | `#F21D35` | High-emphasis primary CTAs (used sparingly) |
| `--color-text-primary` | `#F5F2EF` | Ivory display headings & primary foreground |
| `--color-text-secondary` | `#A1A1AA` | Neutral zinc body copy & technical descriptions |
| `--color-text-muted` | `#71717A` | Secondary metadata, technical labels & muted indices |
| `--color-border-subtle` | `#29292F` | `1px` crisp neutral structural borders & grid rules |
| `--color-border-red` | `rgba(229, 9, 37, 0.30)` | Subtle crimson active/hover border |
| `--color-glow-red` | `rgba(229, 9, 37, 0.13)` | Controlled crimson radial studio glow |

### Chromatic Discipline
- **Zero** brown, sepia, orange, beige, muddy burgundy, or warm-grey surfaces.
- Black and neutral obsidian surfaces (`#030303` – `#1B1B20`) dominate `>= 85%` of every viewport.
- Crimson (`#E50925` / `#A30D22`) and Signal Red (`#F21D35`) are surgical focal accents.

---

## 2. Typography System (`src/styles/typography.css`)

1. **`Bebas Neue` (`--font-display`)**:
   - Monumental hero banner (`ADITYA JAKHAR`), kinetic statements, section headers (`01`–`08`), project titles, numerical indices, and closing `LET'S BUILD SOMETHING GREAT.` statement.
2. **`Manrope Variable` (`--font-body`)**:
   - Navigation, editorial positioning, readable body prose (natural sentence case — never excessive all-caps body text), technical stack tags, and CTAs.
3. **`Caveat Variable` (`--font-accent`)**:
   - Restrained handwritten annotations (`Hello, I'm`, personal signature).

---

## 3. Motion, Scroll Choreography & Accessibility

- **Motion for React (`motion/react`)**: Component reveals, masked staggered text, spring navigation indicator, subtle hover feedback, and scroll-linked parallax/fill transforms.
- **GSAP + ScrollTrigger (`gsap`, `@gsap/react`)**: Pinned desktop horizontal project exhibition (`>= 1024px`) with card-to-card snapping (`snap`), `document.fonts.ready` refresh, and `ignoreMobileResize: true`.
- **Single-Owner Discipline**: Motion and GSAP never animate the same property on the same DOM element simultaneously.
- **Accessibility**: `prefers-reduced-motion: reduce` support across CSS, Motion, and `gsap.matchMedia()`; visible `:focus-visible` outlines; `inert` background locking for mobile drawer and faded hero rails.
