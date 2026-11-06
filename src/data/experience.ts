export interface ExperienceMilestone {
  id: string
  index: string
  category: 'INTERNSHIP' | 'EDUCATION' | 'SYSTEMS' | 'ALGORITHMS'
  title: string
  organization: string
  summary: string
  highlights: readonly string[]
  tags: readonly string[]
}

export interface NavItem {
  id: string
  index: string
  label: string
  href: string
}

export const siteNavigation: readonly NavItem[] = [
  { id: 'hero', index: '01', label: 'Index', href: '#hero' },
  { id: 'about', index: '02', label: 'About', href: '#about' },
  { id: 'projects', index: '03', label: 'Projects', href: '#projects' },
  { id: 'skills', index: '04', label: 'Skills', href: '#skills' },
  { id: 'experience', index: '05', label: 'Journey', href: '#experience' },
  { id: 'process', index: '06', label: 'Process', href: '#process' },
  { id: 'contact', index: '07', label: 'Contact', href: '#contact' },
] as const

export const heroIdentity = {
  monogram: 'AJ',
  introLabel: "HELLO, I'M",
  scriptIntro: "Hello, I'm",
  firstName: 'ADITYA',
  lastName: 'JAKHAR',
  fullName: 'Aditya Jakhar',
  backdropWatermark: 'SOFTWARE ENGINEER',
  positioning: 'Engineering Ideas. Building Impact.',
  scrollRevealStatement: 'ENGINEERING FULL-STACK & AI SYSTEMS WITH PRECISION.',
  disciplines: [
    'COMPUTER SCIENCE ENGINEER',
    'FULL-STACK DEVELOPER',
    'AI/ML ENTHUSIAST',
  ] as const,
  summary:
    'Computer Science undergraduate at LNMIIT building full-stack web systems and AI-powered software products.',
  rotatingPhrases: [
    'Engineering Digital Experiences',
    'Building AI-Powered Products',
    'Creating Meaningful Software',
    'Turning Ideas Into Impact',
  ] as const,
  /**
   * High-contrast pure-black & crimson studio portrait stand-in until Aditya supplies his photograph.
   */
  portraitPlaceholderUrl: '/images/hero-editorial-standin.jpg',
  portraitUrl: null as string | null,
  links: {
    exploreProjects: '#projects',
    contact: '#contact',
    github: 'https://github.com/Adityajakhar099',
    githubDisplay: 'github.com/Adityajakhar099',
    email: 'mailto:adityajakhar182@gmail.com',
    emailAddress: 'adityajakhar182@gmail.com',
  },
} as const

export const aboutContent = {
  index: '02',
  eyebrow: 'ABOUT ADITYA JAKHAR',
  headlineLines: [
    'COMPUTER SCIENCE',
    'UNDERGRADUATE AT LNMIIT.',
    'SOFTWARE BUILDER.',
  ] as const,
  leadParagraph:
    'I am a Computer Science undergraduate at LNMIIT, interested in software engineering, full-stack systems and AI-powered products.',
  secondaryParagraph:
    'I enjoy turning complex problems into practical software solutions—architecting clean data models, resilient backend APIs, grounded LLM and retrieval pipelines, and responsive interfaces.',
  placeholderImageUrl: '/images/about-editorial.jpg',
  signature: 'Aditya Jakhar',
  technicalLedger: [
    { label: 'Institution', value: 'LNMIIT — B.Tech Computer Science' },
    { label: 'Focus Areas', value: 'Full-Stack Engineering & Applied AI/ML' },
    { label: 'Core Stack', value: 'React · TypeScript · Node.js · FastAPI · Python' },
    { label: 'Base', value: 'Jaipur, India (IST · UTC+5:30)' },
  ] as const,
} as const

/**
 * Verified milestones only — zero fabricated dates, GPAs, or unverified awards.
 */
export const experiences: readonly ExperienceMilestone[] = [
  {
    id: 'celebal-internship',
    index: '01',
    category: 'INTERNSHIP',
    title: 'Software Engineering Intern',
    organization: 'Celebal Technologies',
    summary:
      'Hands-on industry software engineering experience collaborating on structured development workflows, modular application architecture, and production-grade implementation practices.',
    highlights: [
      'Applied modular backend and frontend engineering patterns across structured codebases.',
      'Focused on clean API contracts, maintainable TypeScript/JavaScript and Python modules, and reliable execution.',
    ],
    tags: ['Software Engineering', 'Full-Stack Systems', 'API Design', 'Clean Architecture'],
  },
  {
    id: 'lnmiit-education',
    index: '02',
    category: 'EDUCATION',
    title: 'Computer Science & Engineering Undergraduate',
    organization: 'The LNM Institute of Information Technology (LNMIIT)',
    summary:
      'Rigorous undergraduate foundation in data structures, algorithms, operating systems, database management systems, computer networks, and machine learning.',
    highlights: [
      'Connecting core computer science fundamentals directly to full-stack and applied AI engineering.',
      'Active across collaborative technical builds, systems programming, and peer code reviews.',
    ],
    tags: ['Computer Science', 'DSA', 'DBMS', 'Operating Systems', 'Machine Learning'],
  },
  {
    id: 'flagship-engineering',
    index: '03',
    category: 'SYSTEMS',
    title: 'Full-Stack & AI Product Engineering',
    organization: 'AI-Loan · LawLane AI · MediConnect · Campus Lost & Found',
    summary:
      'Designed and shipped end-to-end applications combining React/TypeScript frontends, FastAPI and Node.js services, relational/document databases, and retrieval-augmented LLM pipelines.',
    highlights: [
      'Built policy-grounded AI systems for financial underwriting (AI-Loan) and statutory traffic compliance & OCR (LawLane AI).',
      'Engineered full-stack MERN platforms for hyperlocal healthcare connectivity (MediConnect — IIT Delhi Hackathon) and OAuth-secured campus recovery (Campus Lost & Found).',
    ],
    tags: ['React', 'TypeScript', 'FastAPI', 'Node.js', 'RAG', 'PostgreSQL', 'MongoDB'],
  },
  {
    id: 'hackathons-coding',
    index: '04',
    category: 'ALGORITHMS',
    title: 'Hackathons & Algorithmic Problem Solving',
    organization: 'Competitive Programming & Rapid Prototyping',
    summary:
      'Consistent algorithmic problem solving in C++ and Python paired with hackathon sprints translating complex problem statements into working software prototypes.',
    highlights: [
      'Practicing graph algorithms, dynamic programming, and time-space complexity optimization.',
      'Turning zero-to-one engineering ideas into structured, demonstrable full-stack applications.',
    ],
    tags: ['C++', 'Python', 'Algorithms', 'Hackathons', 'System Design'],
  },
] as const
