"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FUTURE_FRAGMENTS } from "@/lib/data";
import SectionWatermark from "@/components/ui/SectionWatermark";

const TYPE_STYLES: Record<string, { label: string; color: string }> = {
  LEARNING: { label: "L", color: "text-amber border-amber/30" },
  BUILDING: { label: "B", color: "text-blue border-blue/30" },
  RESEARCH: { label: "R", color: "text-offwhite/50 border-white/15" },
};

export default function FutureVision() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="future" className="section-padding relative overflow-hidden">
      <SectionWatermark index="07" />
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-4 mb-8"
        >
          <div className="h-px w-10 bg-amber/50" />
          <span className="font-mono text-xs text-amber/50 tracking-[0.25em] uppercase">
            CURRENT FOCUS
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <h2 className="font-serif text-4xl md:text-6xl text-offwhite mb-4">
            What I'm exploring next.
          </h2>
          <p className="font-grotesk text-sm text-offwhite/40 max-w-md">
            The concepts, tools, and ideas currently occupying my terminal.
          </p>
        </motion.div>

        {/* Fragment grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FUTURE_FRAGMENTS.map((fragment, i) => {
            // Default to LEARNING if the type isn't defined
            const style = TYPE_STYLES[fragment.type] || TYPE_STYLES.LEARNING;
            return (
              <FragmentCard
                key={fragment.id}
                fragment={fragment}
                style={style}
                index={i}
              />
            );
          })}
        </div>

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-16 border-t border-white/6 pt-12"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="font-serif text-2xl md:text-3xl text-offwhite/80 italic mb-2">
                "Build what you'd want to use yourself."
              </p>
              <p className="font-mono text-xs text-offwhite/30">
                — Core development philosophy
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2">
              <p className="font-mono text-xs text-amber/50">CURRENT STATUS</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
                <p className="font-mono text-xs text-offwhite/60">
                  Graduate → Learning → Seeking Full-Time Roles
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FragmentCard({
  fragment,
  style,
  index,
}: {
  fragment: (typeof FUTURE_FRAGMENTS)[number];
  style: { label: string; color: string };
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="border border-white/6 bg-bg-2 p-5 hover:border-white/10 transition-colors duration-300 group"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <span
          className={`font-mono text-xs border px-1.5 py-0.5 ${style.color}`}
        >
          {style.label}
        </span>
        <span className="font-mono text-xs text-offwhite/20">
          {fragment.type}
        </span>
      </div>
      <p className="font-grotesk text-sm text-offwhite/60 leading-relaxed group-hover:text-offwhite/75 transition-colors duration-300">
        {fragment.content}
      </p>
    </motion.div>
  );
}