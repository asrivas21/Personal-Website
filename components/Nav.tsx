'use client';
import { useEffect, useState } from 'react';

const NAV_ITEMS = ['work', 'projects', 'now'] as const;

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export default function Nav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        visible
          ? 'opacity-100 translate-y-0 bg-white/85 backdrop-blur-[12px] border-b border-[#E5E5E5]'
          : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <a
          href="#hero"
          className="font-serif text-lg font-semibold text-[#0A0A0A] hover:opacity-70 transition-opacity"
        >
          AS
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="text-sm text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/asrivas21"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors"
            aria-label="GitHub"
          >
            <GitHubIcon className="w-4 h-4" />
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs border border-[#0A0A0A] text-[#0A0A0A] px-3 py-1 rounded-full hover:bg-[#0A0A0A] hover:text-white transition-colors"
          >
            resume
          </a>
        </div>
      </div>
    </nav>
  );
}
