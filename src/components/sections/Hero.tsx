"use client";

import { motion } from "framer-motion";
import SectionWatermark from "@/components/ui/SectionWatermark";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[88svh] flex flex-col items-start justify-end pb-20 pt-28 md:pt-32 px-6 md:px-16 lg:px-24 overflow-hidden"
    >
      {/* Subtle radial amber glow behind text */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.06]"
        style={{
          background:
            "radial-gradient(circle, rgba(232,146,26,1) 0%, transparent 70%)",
        }}
      />

      {/* Chapter marker */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex items-center gap-4 mb-10"
      >
        <div className="h-px w-10 bg-amber/50" />
        <span className="font-mono text-xs text-amber/60 tracking-[0.25em] uppercase">
          PORTFOLIO
        </span>
      </motion.div>

      {/* Main headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-serif text-5xl md:text-7xl lg:text-8xl leading-none text-offwhite mb-3"
      >
        <span className="block">Darsin David J.</span>
        <span className="block text-amber italic mt-2">Software Engineer.</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-8"
      >
        <p className="font-grotesk text-base md:text-lg text-offwhite/50 max-w-md leading-relaxed">
          Recent B.Tech AI/ML graduate. Building resilient web applications, intelligent systems, and tools I actually want to use.
        </p>
      </motion.div>

      {/* Meta info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-6"
      >
        <div className="flex flex-wrap items-center gap-4">
          <StatusDot label="B.Tech AI/ML Graduate" />
          <span className="text-offwhite/20 hidden md:inline">·</span>
          <StatusDot label="IEEE Published" />
          <span className="text-offwhite/20 hidden md:inline">·</span>
          <StatusDot label="Chennai, TN" />
        </div>
      </motion.div>

      {/* CTA row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-10"
      >
        <div className="flex flex-wrap gap-4">
          <a
            href="#lab"
            data-hover
            className="font-mono text-sm text-amber border border-amber/30 px-5 py-2.5 hover:bg-amber/10 hover:border-amber/60 transition-all duration-300"
          >
            VIEW PROJECTS →
          </a>
          <a
  href="https://drive.google.com/file/d/1jXyzhB7jg9Gfs4ssaKg9rP-qIdTXcKpC/view"
  target="_blank"
  rel="noopener noreferrer"
  data-hover
  className="font-mono text-sm text-offwhite/50 border border-white/10 px-5 py-2.5 hover:text-offwhite hover:border-white/20 transition-all duration-300 flex items-center gap-1.5"
>
  RESUME ↗
</a>
        </div>
      </motion.div>

      <SectionWatermark index="01" />
    </section>
  );
}

function StatusDot({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse_slow" />
      <span className="font-mono text-xs text-offwhite/50 tracking-wide">
        {label}
      </span>
    </div>
  );
}