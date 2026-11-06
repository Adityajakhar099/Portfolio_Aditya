export interface ProcessStep {
  number: '01' | '02' | '03' | '04' | '05' | '06'
  title: 'DISCOVER' | 'PLAN' | 'ARCHITECT' | 'DEVELOP' | 'TEST' | 'DELIVER'
  subtitle: string
  description: string
  deliverable: string
  iconName: 'compass' | 'map' | 'layers' | 'code' | 'shield-check' | 'rocket'
}

export const developmentProcess: readonly ProcessStep[] = [
  {
    number: '01',
    title: 'DISCOVER',
    subtitle: 'Problem Framing & Domain Understanding',
    description:
      'Deconstruct the core user pain point, clarify technical constraints, and define what a genuinely useful software outcome looks like before writing code.',
    deliverable: 'Problem Scope & Requirements',
    iconName: 'compass',
  },
  {
    number: '02',
    title: 'PLAN',
    subtitle: 'Feature Prioritization & Execution Roadmap',
    description:
      'Break complex ideas into incremental engineering milestones, select the right language and model stack, and map data flows end to end.',
    deliverable: 'Technical Specification & Milestones',
    iconName: 'map',
  },
  {
    number: '03',
    title: 'ARCHITECT',
    subtitle: 'Schemas, APIs & AI Pipeline Design',
    description:
      'Design modular frontend component hierarchies, REST/FastAPI contracts, database schemas, and retrieval/embedding pipelines built for maintainability.',
    deliverable: 'System & Data Architecture',
    iconName: 'layers',
  },
  {
    number: '04',
    title: 'DEVELOP',
    subtitle: 'Clean Full-Stack & AI Implementation',
    description:
      'Write strongly typed, readable frontend and backend code—pairing responsive interfaces with resilient server logic and grounded LLM integrations.',
    deliverable: 'Production-Ready Codebase',
    iconName: 'code',
  },
  {
    number: '05',
    title: 'TEST',
    subtitle: 'Edge Cases, Accessibility & Performance',
    description:
      'Validate API edge cases, responsive layouts across viewports, keyboard navigation, reduced-motion behavior, and runtime bundle efficiency.',
    deliverable: 'Verified & Hardened Build',
    iconName: 'shield-check',
  },
  {
    number: '06',
    title: 'DELIVER',
    subtitle: 'Deployment, Documentation & Iteration',
    description:
      'Ship reproducible builds with clean repository documentation, containerized or cloud-ready configs, and continuous refinement from real usage.',
    deliverable: 'Deployed Software & Docs',
    iconName: 'rocket',
  },
] as const

