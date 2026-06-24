'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const PATH =
  'M 60 100 L 840 100 C 1000 100, 1000 400, 840 400 L 160 400 C 0 400, 0 700, 160 700 L 940 700';

const EVENTS = [
  {
    cx: 150,
    cy: 100,
    date: 'SUMMER 2026',
    title: 'Z Infra Solutions Architect Intern',
    company: 'IBM',
    achievement: 'RAG platform · C-suite demos · 75% ↓ truncated LLM outputs',
    delay: 0.05,
  },
  {
    cx: 750,
    cy: 100,
    date: 'SUMMER 2025',
    title: 'SWE Intern',
    company: 'Fintech Global Center',
    achievement: 'Bond optimizer · 40% faster allocation · automated audit pipeline',
    delay: 0.4,
  },
  {
    cx: 700,
    cy: 400,
    date: 'SUMMER 2024',
    title: 'SWE Intern',
    company: 'Fintech Global Center',
    achievement: 'Yield simulator · 15% ↓ pricing error vs benchmarks',
    delay: 0.7,
  },
  {
    cx: 300,
    cy: 400,
    date: 'AUG 2023',
    title: 'BS Computer Science',
    company: 'University of Maryland',
    achievement: "Dean's List · Minor in Philosophy",
    delay: 1.0,
  },
  {
    cx: 900,
    cy: 700,
    date: 'SUMMER 2022',
    title: 'SWE Intern',
    company: 'ManTech',
    achievement: 'PowerApps audit automation pipeline',
    delay: 1.65,
  },
];

export default function CareerTimeline() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="work" ref={sectionRef} className="py-20 px-6 max-w-5xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
        className="font-serif font-light text-3xl text-[#0A0A0A] lowercase mb-10 tracking-wide"
      >
        work
      </motion.h2>

      <svg
        className="w-full h-auto overflow-visible"
        viewBox="0 0 1000 960"
        preserveAspectRatio="xMidYMid meet"
        aria-label="Career progression timeline"
        role="img"
      >
        <motion.path
          d={PATH}
          fill="none"
          stroke="#0A0A0A"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
        />

        {EVENTS.map((ev) => (
          <motion.g
            key={ev.date + ev.company}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: ev.delay, duration: 0.3 }}
          >
            <circle
              cx={ev.cx}
              cy={ev.cy}
              r={10}
              fill="#ffffff"
              stroke="#0A0A0A"
              strokeWidth={1.5}
            />
            <text
              x={ev.cx}
              y={ev.cy + 38}
              textAnchor="middle"
              fontSize="11"
              fontWeight="500"
              letterSpacing="0.06em"
              fill="#6B6B6B"
              fontFamily="var(--font-inter), system-ui, sans-serif"
            >
              {ev.date}
            </text>
            <text
              x={ev.cx}
              y={ev.cy + 58}
              textAnchor="middle"
              fontSize="15"
              fontWeight="500"
              fill="#0A0A0A"
              fontFamily="var(--font-inter), system-ui, sans-serif"
            >
              {ev.title}
            </text>
            <text
              x={ev.cx}
              y={ev.cy + 76}
              textAnchor="middle"
              fontSize="13"
              fill="#6B6B6B"
              fontFamily="var(--font-inter), system-ui, sans-serif"
            >
              {ev.company}
            </text>
            <text
              x={ev.cx}
              y={ev.cy + 96}
              textAnchor="middle"
              fontSize="11"
              fill="#9B9B9B"
              fontFamily="var(--font-jetbrains), Menlo, monospace"
            >
              {ev.achievement}
            </text>
          </motion.g>
        ))}
      </svg>
    </section>
  );
}
