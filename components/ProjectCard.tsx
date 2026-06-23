'use client';
import { motion } from 'framer-motion';
import { Project } from '@/data/projects';

function Badge({ type, children }: { type?: string; children: React.ReactNode }) {
  const styles: Record<string, string> = {
    live: 'bg-green-50 text-green-700 border-green-200',
    wip: 'bg-amber-50 text-amber-700 border-amber-200',
    work: 'bg-purple-50 text-purple-700 border-purple-200',
  };
  const cls = styles[type ?? ''] ?? 'bg-gray-50 text-gray-500 border-gray-200';

  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded border ${cls} flex items-center gap-1.5`}>
      {type === 'live' && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
      )}
      {children}
    </span>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.15 }}
      className="relative border border-[#E5E5E5] rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px]"
        style={{ backgroundColor: project.accent }}
      />

      <div className="px-8 py-7 ml-1">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            {project.badge && <Badge type={project.badgeType}>{project.badge}</Badge>}
          </div>
          <div className="flex gap-3 items-center">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#6B6B6B] hover:text-[#0A0A0A] flex items-center gap-1 transition-colors"
              >
                <ExternalLinkIcon className="w-3 h-3" /> Demo
              </a>
            )}
            {project.githubUrl && !project.privateRepo && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#6B6B6B] hover:text-[#0A0A0A] flex items-center gap-1 transition-colors"
              >
                <GitHubIcon className="w-3 h-3" /> Code
              </a>
            )}
            {project.privateRepo && (
              <span className="text-xs text-[#9B9B9B] italic">private — on request</span>
            )}
          </div>
        </div>

        <h3 className="font-serif text-xl font-semibold text-[#0A0A0A] mb-2">
          {project.title}
        </h3>

        <p className="text-[#6B6B6B] text-sm leading-relaxed mb-5">{project.hook}</p>

        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono px-2.5 py-1 bg-[#F5F5F5] text-[#3D3D3D] rounded-md border border-[#E5E5E5]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
