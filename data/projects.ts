export interface Project {
  title: string;
  hook: string;
  stack: string[];
  accent: string;
  badge?: string;
  badgeType?: 'live' | 'wip' | 'work';
  demoUrl?: string;
  githubUrl?: string;
  privateRepo?: boolean;
}

export const PROJECT_DATA: Project[] = [
  {
    title: 'Bias Lens',
    hook: 'Multi-signal bias detection for news and short-form video — TikTok, YouTube Shorts, Reels, X.',
    stack: [
      'Next.js',
      'TypeScript',
      'Python',
      'FastAPI',
      'OpenAI',
      'HuggingFace',
      'Whisper',
      'D3.js',
      'Supabase',
      'Playwright',
      'Vercel',
      'Render',
    ],
    accent: '#3B5BDB',
    badge: 'LIVE',
    badgeType: 'live',
  },
  {
    title: 'IBM RAG Platform',
    hook: 'Enterprise RAG knowledge platform demoed to 40–60 C-suite clients. 762-chunk hybrid retrieval on LinuxONE.',
    stack: ['FastAPI', 'pgvector', 'Qwen', 'Ollama', 'Next.js', 'LinuxONE', 'IBM MQ'],
    accent: '#7048E8',
    badge: 'IBM INTERNSHIP',
    badgeType: 'work',
    privateRepo: true,
  },
  {
    title: 'Serverless Financial Data Pipeline',
    hook: 'Event-driven stock and crypto ingestion pipeline — Kinesis to DynamoDB to a live React dashboard.',
    stack: [
      'AWS Lambda',
      'Kinesis',
      'DynamoDB',
      'S3',
      'API Gateway',
      'React',
      'TypeScript',
      'Recharts',
      'GitHub Actions',
      'Python',
    ],
    accent: '#2F9E44',
    badge: 'IN PROGRESS',
    badgeType: 'wip',
    githubUrl: 'https://github.com/asrivas21/financial-data-pipeline',
  },
  {
    title: 'FGC — Bond Portfolio Optimizer',
    hook: 'SciPy Differential Evolution optimizer enforcing budget, duration, and credit constraints across live bond portfolios.',
    stack: ['Python', 'SciPy', 'Pandas', 'NumPy'],
    accent: '#2F9E44',
    badge: 'FINTECH INTERNSHIP',
    badgeType: 'work',
    privateRepo: true,
  },
  {
    title: 'Autonomous AI Research Agent',
    hook: 'LangChain agent that decomposes research queries, runs sub-tasks in parallel, and emits structured JSON reports.',
    stack: ['Python', 'LangChain', 'OpenAI', 'ChromaDB', 'PyMuPDF', 'arXiv API'],
    accent: '#3B5BDB',
    githubUrl: 'https://github.com/asrivas21/autonomous-ai-agent',
  },
];
