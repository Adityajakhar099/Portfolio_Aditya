export interface ProjectScreenshot {
  src: string
  alt: string
  label: string
  caption?: string
}

export interface ProjectArchitecture {
  summary: string
  layers: readonly string[]
}

export interface ProjectItem {
  id: string
  index: '01' | '02' | '03' | '04'
  slug: string
  title: string
  subtitle: string
  category: string
  description: string
  problem: string
  solution: string
  technologies: readonly string[]
  thumbnail: string
  gallery: readonly ProjectScreenshot[]
  liveUrl: string | null
  githubUrl: string | null
  featured: boolean
  altText: string
  architecture: ProjectArchitecture
  keyFeatures: readonly string[]
}

/**
 * Verified project data grounded directly in Aditya Jakhar's deployed applications and public repositories.
 * Zero fabricated metrics, user counts, or invented features.
 */
export const projects: readonly ProjectItem[] = [
  {
    id: 'ai-loan',
    index: '01',
    slug: 'ai-loan',
    title: 'AI-Loan',
    subtitle: 'Policy-Backed AI Loan Advisory & Underwriting Platform',
    category: 'AI / FinTech Architecture',
    description:
      'An enterprise-style AI loan advisory web platform enabling borrowers and credit officers to query institutional lending guidelines in natural language and receive source-grounded underwriting answers.',
    problem:
      'Loan policy manuals and eligibility guidelines are dense and fragmented, slowing down accurate borrower guidance and underwriting checks.',
    solution:
      'Pairs a strict TypeScript + React interface with an async FastAPI, Pydantic v2, and PostgreSQL/SQLAlchemy backend containerized with Docker for grounded policy Q&A.',
    technologies: [
      'React',
      'TypeScript',
      'FastAPI',
      'Python',
      'PostgreSQL',
      'SQLAlchemy',
      'Docker',
    ],
    thumbnail: '/projects/ai-loan-live.png',
    altText: 'AI-Loan live deployed underwriting advisory interface',
    gallery: [
      {
        src: '/projects/ai-loan-live.png',
        label: 'Live Workspace',
        alt: 'AI-Loan live deployed application interface',
        caption: 'Live deployment — ai-loan-black.vercel.app',
      },
    ],
    architecture: {
      summary:
        'React 18 + TanStack Query Client → FastAPI & Pydantic v2 Service → Policy Retrieval & Inference → Async PostgreSQL 16 Store',
      layers: [
        'React + TypeScript SPA',
        'FastAPI REST Layer',
        'Policy RAG Engine',
        'Async PostgreSQL 16',
      ],
    },
    keyFeatures: [
      'Natural-language loan policy query workspace grounded in official manuals',
      'Typed FastAPI + Pydantic v2 backend with async SQLAlchemy 2.0 persistence',
      'Multi-stage Docker & Docker Compose orchestration for reproducible deployment',
    ],
    liveUrl: 'https://ai-loan-black.vercel.app',
    githubUrl: 'https://github.com/Adityajakhar099/AI-Loan',
    featured: true,
  },
  {
    id: 'lawlane-ai',
    index: '02',
    slug: 'lawlane-ai',
    title: 'LawLane AI',
    subtitle: 'Aegis Traffic AI — RAG, Challan OCR & Statutory Compliance Suite',
    category: 'AI / LegalTech · RAG & OCR',
    description:
      'Deployed as the Aegis Traffic AI suite, LawLane AI combines ChromaDB vector retrieval, LangChain/LangGraph orchestration, Challan OCR parsing, and regional GIS telemetry to analyze Indian traffic statutes and compounding fines.',
    problem:
      'Interpreting statutory clauses, state compounding notifications, and physical traffic challans requires cross-referencing dense legal PDFs and vehicle-class schedules that are slow to search manually.',
    solution:
      'Connects a FastAPI, ChromaDB, and LangGraph RAG + fine-calculation backend to an installable React PWA featuring a live Analytics & GIS Dashboard, Challan OCR analyzer, jurisdiction Fine Calculator, and grounded AI Legal Cop chat.',
    technologies: [
      'Python',
      'FastAPI',
      'LangChain',
      'LangGraph',
      'ChromaDB',
      'Gemini API',
      'Challan OCR',
      'React PWA',
      'Docker',
    ],
    thumbnail: '/images/projects/lawlane-ai-dashboard.png',
    altText:
      'LawLane AI (Aegis Traffic AI) live analytics and regional GIS telemetry dashboard',
    gallery: [
      {
        src: '/images/projects/lawlane-ai-dashboard.png',
        label: 'Dashboard & GIS',
        alt: 'LawLane AI live Aegis Traffic AI analytics dashboard with FastAPI connection and GIS telemetry',
        caption:
          'Analytics Dashboard — FastAPI status, system usage chart, Rajasthan/Maharashtra GIS telemetry & live OCR/fine feed',
      },
      {
        src: '/images/projects/lawlane-ai-interface.png',
        label: 'AI Legal Cop (RAG)',
        alt: 'LawLane AI Traffic Compliance RAG Chat answering a Rajasthan helmet penalty query with statutory PDF citation',
        caption:
          'Traffic Compliance RAG Chat — Grounded legal synthesis citing official state compounding notifications (Section 194 D)',
      },
      {
        src: '/images/projects/lawlane-ai-calculator.png',
        label: 'Fine Calculator',
        alt: 'LawLane AI Compliance Calculator across state jurisdictions, vehicle classes, and repeat offences',
        caption:
          'Compliance Calculator — Jurisdiction-aware statutory fine computation across two-wheeler, LMV, and heavy vehicles',
      },
    ],
    architecture: {
      summary:
        'PDF & Challan OCR Parser → ChromaDB Vector Store → LangGraph Retriever & Fine Engine → FastAPI + Offline-Capable React PWA',
      layers: [
        'Challan OCR & PDF Parser',
        'ChromaDB Vector Index',
        'LangGraph Fine & RAG Engine',
        'FastAPI + React PWA',
      ],
    },
    keyFeatures: [
      'Analytics & Interactive Regional GIS Telemetry tracking OCR scans, fine queries, and state compliance metrics',
      'AI Legal Cop RAG assistant citing official statutory PDF notifications with IndexedDB offline fallback',
      'Challan OCR document analyzer and multi-jurisdiction Compliance Calculator across vehicle categories',
    ],
    liveUrl: 'https://lawlane-ai-1.onrender.com/',
    githubUrl: 'https://github.com/Adityajakhar099/LawLane_AI',
    featured: true,
  },
  {
    id: 'mediconnect-iit-delhi',
    index: '03',
    slug: 'mediconnect-iit-delhi',
    title: 'MediConnect',
    subtitle: 'IIT Delhi Hackathon — Hyperlocal Pharmacy, Medicine & Doctor Platform',
    category: 'Healthcare Full-Stack · IIT Delhi Hackathon',
    description:
      'Built for the IIT Delhi Hackathon, MediConnect connects patients with verified neighborhood pharmacies and clinicians—unifying local medicine stock search, 24/7 store discovery, doctor booking, role portals, and MediBot triage support.',
    problem:
      'Patients searching for urgent prescription availability or verified local doctors face fragmented pharmacy inventories and disconnected consultation workflows.',
    solution:
      'Engineered a full-stack React 19, Express 5, and MongoDB platform featuring unified medicine/pharmacy/doctor search, dedicated Patient, Pharmacy Store, Doctor, and Admin portals, consultation chat, and an embedded MediBot assistant.',
    technologies: [
      'React 19',
      'Vite',
      'Node.js',
      'Express 5',
      'MongoDB',
      'Mongoose',
      'GSAP',
      'REST API',
    ],
    thumbnail: '/images/projects/iit-delhi-dashboard.png',
    altText:
      'MediConnect IIT Delhi Hackathon healthcare platform live overview and hyperlocal search interface',
    gallery: [
      {
        src: '/images/projects/iit-delhi-dashboard.png',
        label: 'Platform Overview',
        alt: 'MediConnect live healthcare platform overview with medicine, pharmacy, and doctor search',
        caption:
          'Live Platform Overview — Hyperlocal medicine availability search, verified 24/7 pharmacies, and doctor discovery',
      },
      {
        src: '/images/projects/iit-delhi-interface.png',
        label: 'MediBot Support',
        alt: 'MediConnect live MediBot Support interactive triage and appointment assistant',
        caption:
          'MediBot Support — Real-time interactive assistant guiding medicine lookups, emergency guidance, and doctor booking',
      },
      {
        src: '/images/projects/iit-delhi-portal.png',
        label: 'Role Portals',
        alt: 'MediConnect Patient and Pharmacy role registration portal',
        caption:
          'Multi-Role Access — Dedicated Patient and Pharmacy Store registration & inventory management workflows',
      },
    ],
    architecture: {
      summary:
        'React 19 + Router v7 SPA → Express 5 Session & REST API → Role-Based Store/Doctor/Patient Controllers → MongoDB & Mongoose',
      layers: [
        'React 19 Search & MediBot UI',
        'Role Portals & Consultation',
        'Express 5 Session API',
        'MongoDB Inventory & Booking',
      ],
    },
    keyFeatures: [
      'Unified hyperlocal search across medicine stock, verified 24/7 neighborhood pharmacies, and specialist doctors',
      'Role-based workspaces for Patients, Pharmacy Stores (inventory & orders), Doctors, and Administrators',
      'Built-in MediBot Support triage assistant and live doctor-patient consultation messaging workflow',
    ],
    liveUrl: 'https://iit-delhi.vercel.app/',
    githubUrl: 'https://github.com/Adityajakhar099/iit_delhi_hack',
    featured: true,
  },
  {
    id: 'campus-lost-and-found',
    index: '04',
    slug: 'campus-lost-and-found',
    title: 'Campus Lost & Found',
    subtitle: 'OAuth-Secured University Item Reporting & Claim Platform',
    category: 'Full-Stack MERN Platform',
    description:
      'A full-stack university utility platform built with MongoDB, Express, React, and Node.js featuring Google OAuth 2.0 authentication, structured lost/found reporting, location tracking, and verified claim workflows.',
    problem:
      'Lost campus belongings get buried in unindexed group chats without identity verification, structured location metadata, or claim tracking.',
    solution:
      'Centralizes lost and found reports behind institutional Google OAuth login with MongoDB Atlas persistence, user dashboards, and structured claim verification.',
    technologies: [
      'React',
      'Node.js',
      'Express',
      'MongoDB Atlas',
      'Passport.js',
      'Google OAuth 2.0',
    ],
    thumbnail: '/projects/campus-lost-found-live.png',
    altText: 'Campus Lost & Found Google OAuth portal deployment',
    gallery: [
      {
        src: '/projects/campus-lost-found-live.png',
        label: 'OAuth Portal',
        alt: 'Campus Lost & Found Google OAuth portal deployment',
        caption: 'Live deployment — Google OAuth Campus Portal',
      },
    ],
    architecture: {
      summary:
        'React Client (Vercel) → Node.js & Express Session API → Passport Google OAuth 2.0 → MongoDB Atlas Cloud Store',
      layers: [
        'React Reporting Portal',
        'Passport Google OAuth',
        'Express Claim Service',
        'MongoDB Atlas Store',
      ],
    },
    keyFeatures: [
      'Institutional Google OAuth 2.0 authentication via Passport.js and Express sessions',
      'Lost & found item submission with image uploads, location details, and status tracking',
      'Dedicated user dashboard for managing personal reports and claim verification flows',
    ],
    liveUrl: 'https://campus-lost-found-clean.vercel.app',
    githubUrl: 'https://github.com/Adityajakhar099/Campus-lost-found',
    featured: true,
  },
] as const

export const featuredProjects: readonly ProjectItem[] = projects.filter(
  (project) => project.featured,
)
