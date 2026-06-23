'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { NOW_ITEMS } from '@/data/now';

export default function NowStrip() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="now" ref={ref} className="py-16 px-6 max-w-5xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
        className="font-serif font-light text-3xl text-[#0A0A0A] lowercase mb-8 tracking-wide"
      >
        now
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="border-t border-b border-[#E5E5E5] py-6 space-y-4"
      >
        {NOW_ITEMS.map((item) => (
          <div key={item.label} className="flex gap-6 items-baseline">
            <span className="font-mono text-xs text-[#9B9B9B] uppercase tracking-wider w-20 flex-shrink-0">
              {item.label} ·
            </span>
            <span className="text-[#0A0A0A] text-sm leading-relaxed">{item.value}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
