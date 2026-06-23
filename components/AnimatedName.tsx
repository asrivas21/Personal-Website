'use client';
import { motion } from 'framer-motion';

const EASE_OUT_EXPO: [number, number, number, number] = [0.19, 1, 0.22, 1];

export default function AnimatedName() {
  return (
    <h1 className="font-serif font-light text-[4.5rem] leading-none text-[#0A0A0A]">
      <span className="relative inline-block pt-[0.1em] pr-[0.05em] pb-[0.15em]">
        {/* Top line — scales in, then splits upward */}
        <motion.span
          aria-hidden
          className="absolute inset-x-0 top-0 bottom-0 my-auto h-[3px] bg-[#0A0A0A] block"
          initial={{ scaleX: 0, opacity: 0.5 }}
          animate={{ scaleX: 1, y: '-0.625em', opacity: 1 }}
          transition={{
            scaleX: { delay: 0, duration: 0.7, ease: EASE_OUT_EXPO },
            opacity: { delay: 0, duration: 0.1 },
            y: { delay: 0.7, duration: 0.6, ease: EASE_OUT_EXPO },
          }}
        />
        {/* Bottom line — scales in, then splits downward */}
        <motion.span
          aria-hidden
          className="absolute inset-x-0 top-0 bottom-0 my-auto h-[3px] bg-[#0A0A0A] block"
          initial={{ scaleX: 0, opacity: 0.5 }}
          animate={{ scaleX: 1, y: '0.625em', opacity: 1 }}
          transition={{
            scaleX: { delay: 0, duration: 0.7, ease: EASE_OUT_EXPO },
            opacity: { delay: 0, duration: 0.1 },
            y: { delay: 0.7, duration: 0.6, ease: EASE_OUT_EXPO },
          }}
        />

        {/* "Aman" — slides in from the right */}
        <motion.span
          className="inline-block"
          initial={{ opacity: 0, x: '0.5em' }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0, duration: 0.6, ease: EASE_OUT_EXPO }}
        >
          Aman
        </motion.span>
        {' '}
        {/* "Srivastava" — slides in from the left */}
        <motion.span
          className="inline-block"
          initial={{ opacity: 0, x: '-0.5em' }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0, duration: 0.6, ease: EASE_OUT_EXPO }}
        >
          Srivastava
        </motion.span>
      </span>
    </h1>
  );
}
