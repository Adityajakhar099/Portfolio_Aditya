# CONTENT ARCHITECTURE — Aditya Jakhar Portfolio

## 1. Brand & Identity Core

- **Full Name**: Aditya Jakhar
- **Disciplines**:
  1. Computer Science Engineer
  2. Full-Stack Developer
  3. AI/ML Enthusiast
- **Signature Positioning**: `"Engineering Ideas. Building Impact."`
- **Voice & Tone**: First-person, technical, articulate, grounded in real systems engineering, zero hype or fabricated claims.
- **Availability Badge Policy**: Conditional (`availability?: { verified: boolean; label: string }`). Hidden by default until an explicit status (e.g., internship/full-time availability) is verified by Aditya.

---

## 2. Full Website Section Map (`01` – `07`)

| Index | Section ID | Title | Primary Purpose | Status |
| :--- | :--- | :--- | :--- | :--- |
| `01` | `#hero` | **HERO** | Immediate identity, monumental `ADITYA JAKHAR` typography, deliberate portrait stage, animated engineering focus, primary CTAs (`Explore Projects`, `GitHub`, `Contact`). | **Phase 1 (Implemented Now)** |
| `02` | `#about` | **ABOUT ME** | Engineering philosophy, CS background, systems + AI/ML curiosity, personal narrative, handwritten signature. | Planned (Phase 2) |
| `03` | `#projects` | **SELECTED PROJECTS** | Deep technical showcase of **AI-Loan**, **LawLane AI**, and **Campus Lost & Found** with case-study drill-down (`/projects/:slug`). | Data Schema Ready · UI Planned |
| `04` | `#skills` | **TECHNICAL SKILLS** | Categorized engineering stack (Languages, Frontend, Backend & APIs, AI/ML & Data, DevOps & Tooling) — no arbitrary percentage bars. | Planned (Phase 2) |
| `05` | `#experience` | **EXPERIENCE AND ACHIEVEMENTS** | Verified academic milestones, engineering roles, hackathons, or technical contributions. | Planned (Phase 3) |
| `06` | `#process` | **DEVELOPMENT PROCESS** | Numbered engineering workflow (`01 Problem Framing` → `02 System Architecture` → `03 Full-Stack & AI Implementation` → `04 Verification & Deployment`). | Planned (Phase 3) |
| `07` | `#contact` | **CONTACT** | Direct engineering collaboration channels, GitHub (`Adityajakhar099`), email, resume link, and clean inquiry interface. | Planned (Phase 3) |

---

## 3. Hero Content Specification (`01. HERO`)

- **Top Navigation**:
  - Brand: `AJ.` / `ADITYA JAKHAR`
  - Section Anchors: `About` (`#about`), `Projects` (`#projects`), `Skills` (`#skills`), `Experience` (`#experience`), `Process` (`#process`), `Contact` (`#contact`)
  - External Link: `GitHub` (`https://github.com/Adityajakhar099`)
- **Intro Annotation** (`Caveat`): `Hello, I'm`
- **Primary Display Headline** (`Bebas Neue`):
  - `ADITYA`
  - `JAKHAR`
- **Identity Roles** (`Manrope` uppercase micro-labels):
  - `Computer Science Engineer`
  - `Full-Stack Developer`
  - `AI/ML Enthusiast`
- **Positioning Tagline**:
  - `"Engineering Ideas. Building Impact."`
- **Animated Capability Statements** (cycled with refined reveal + pause control):
  1. `"Building Digital Experiences"`
  2. `"Developing AI-Powered Products"`
  3. `"Engineering Creative Solutions"`
  4. `"Turning Ideas Into Software"`
- **Portrait Slot**:
  - Deliberate studio placeholder (`portraitUrl: null` until official portrait asset is supplied).
- **Primary & Secondary Actions**:
  - Primary CTA: `Explore Projects` → `#projects`
  - Secondary CTA 1: `GitHub` → `https://github.com/Adityajakhar099`
  - Secondary CTA 2: `Contact` → `#contact`

---

## 4. Project Data Architecture (`src/data/projects.ts`)

Prepared strictly for the three real flagship projects **without inventing unverified features, architectures, or performance metrics**. Fields awaiting repository READMEs/documentation are explicitly typed as `string | null` or empty arrays (`[]`) so the UI never displays fabricated claims.

### Schema Contract (`ProjectItem`)
```ts
export interface ProjectScreenshot {
  src: string
  alt: string
  caption?: string
}

export interface ProjectArchitecture {
  summary: string | null
  components: string[]
  diagramUrl?: string | null
}

export interface ProjectItem {
  id: string
  index: '01' | '02' | '03'
  slug: string
  title: string
  domain: string
  description: string | null
  problemStatement: string | null
  solution: string | null
  techStack: string[]
  screenshots: ProjectScreenshot[]
  architecture: ProjectArchitecture
  keyFeatures: string[]
  githubUrl: string | null
  liveDemoUrl: string | null
  contentStatus: 'awaiting-repo-docs' | 'verified'
}
```

### Registered Flagship Projects
1. **`01` — AI-Loan** (`slug: "ai-loan"`)
   - Domain: `AI / FinTech Engineering`
   - Status: Structured slot ready for verified repository documentation, stack, screenshots, and URLs.
2. **`02` — LawLane AI** (`slug: "lawlane-ai"`)
   - Domain: `AI / LegalTech System`
   - Status: Structured slot ready for verified repository documentation, stack, screenshots, and URLs.
3. **`03` — Campus Lost & Found** (`slug: "campus-lost-and-found"`)
   - Domain: `Full-Stack Web Platform`
   - Status: Structured slot ready for verified repository documentation, stack, screenshots, and URLs.
