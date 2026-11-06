export interface SkillCategory {
  id: string
  index: string
  title: string
  subtitle: string
  skills: readonly string[]
}

export const marqueeStripPrimary: readonly string[] = [
  'C++',
  'PYTHON',
  'REACT',
  'TYPESCRIPT',
  'NODE.JS',
  'FASTAPI',
  'RAG ARCHITECTURES',
  'LLM INTEGRATION',
  'MONGODB',
  'DOCKER',
] as const

export const marqueeStripSecondary: readonly string[] = [
  'C',
  'JAVA',
  'JAVASCRIPT',
  'EXPRESS',
  'POSTGRESQL',
  'SQL',
  'MACHINE LEARNING',
  'EMBEDDINGS',
  'GIT & GITHUB',
  'SYSTEM ARCHITECTURE',
] as const

export const skillCategories: readonly SkillCategory[] = [
  {
    id: 'programming',
    index: '01',
    title: 'Programming',
    subtitle: 'Systems programming, object-oriented design, and algorithmic problem solving.',
    skills: ['C', 'C++', 'Java', 'Python'],
  },
  {
    id: 'frontend',
    index: '02',
    title: 'Frontend',
    subtitle: 'Component-driven interfaces, typed state architecture, and responsive motion systems.',
    skills: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3 / Tailwind CSS'],
  },
  {
    id: 'backend',
    index: '03',
    title: 'Backend',
    subtitle: 'Asynchronous REST APIs, authentication flows, schema validation, and service layers.',
    skills: ['Node.js', 'Express', 'FastAPI', 'REST APIs'],
  },
  {
    id: 'database',
    index: '04',
    title: 'Database',
    subtitle: 'Document stores, relational schema modeling, async ORMs, and query optimization.',
    skills: ['MongoDB', 'PostgreSQL', 'SQL', 'SQLAlchemy'],
  },
  {
    id: 'ai-ml',
    index: '05',
    title: 'AI / ML',
    subtitle: 'Retrieval-augmented generation, vector search, and grounded LLM product workflows.',
    skills: [
      'Machine Learning',
      'RAG',
      'LLM Integration',
      'Embeddings',
      'LangChain / LangGraph',
      'ChromaDB',
    ],
  },
  {
    id: 'development',
    index: '06',
    title: 'Development',
    subtitle: 'Version control, multi-stage containerization, and modern build toolchains.',
    skills: ['Git', 'GitHub', 'Docker', 'Linux / CLI', 'Vite'],
  },
] as const
