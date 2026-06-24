'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { PROJECT_DATA } from '@/data/projects';
import ProjectCard from './ProjectCard';

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="projects" ref={ref} className="py-20 px-6 max-w-5xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
        className="font-serif font-light text-3xl text-[#0A0A0A] lowercase mb-10 tracking-wide"
      >
        projects
      </motion.h2>
      <div className="flex flex-col gap-5">
        {PROJECT_DATA.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
