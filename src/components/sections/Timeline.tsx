"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TIMELINE } from "@/lib/data";

function TimelineEntry({
  item,
  index,
}: {
  item: (typeof TIMELINE)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const isCurrent = item.status === "current";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
      className="relative grid md:grid-cols-2 gap-8 md:gap-16 items-start"
    >
      {/* Category label + period (Alternating layout via order utility) */}
      <div 
        className={`${
          index % 2 === 0 ? "md:text-right md:order-1" : "md:text-left md:order-2"
        }`}
      >
        <p
          className={`font-mono text-xs tracking-[0.3em] mb-2 uppercase ${
            isCurrent ? "text-amber" : "text-offwhite/30"
          }`}
        >
          {item.category}
        </p>
        <h3 className="font-serif text-2xl md:text-3xl mb-1 text-offwhite">
          {item.title}
        </h3>
        <p className="font-mono text-xs text-amber/50 mb-4">{item.period}</p>
        <p className="font-grotesk text-sm leading-relaxed text-offwhite/50">
          {item.description}
        </p>
      </div>

      {/* Events list */}
      <div className={`${index % 2 === 0 ? "md:order-2" : "md:order-1"}`}>
        <div
          className={`border-l-2 pl-6 space-y-3 ${
            isCurrent ? "border-amber" : "border-white/10"
          }`}
        >
          {item.events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
              className="relative"
            >
              <div
                className={`absolute -left-7 top-1.5 w-2 h-2 rounded-full border ${
                  isCurrent
                    ? "border-amber bg-amber/30"
                    : "border-white/20 bg-bg"
                }`}
              />
              <p className="font-grotesk text-sm text-offwhite/60">
                {event}
              </p>
            </motion.div>
          ))}

          {/* Current indicator */}
          {isCurrent && (
            <div className="flex items-center gap-2 pt-1">
              <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
              <span className="font-mono text-xs text-amber">PRESENT</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Timeline() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section id="timeline" className="py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-24"
        >
          <div className="h-px w-10 bg-amber/50" />
          <span className="font-mono text-xs text-amber/50 tracking-[0.25em] uppercase">
            BACKGROUND
          </span>
        </motion.div>

        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-20"
        >
          <h2 className="font-serif text-4xl md:text-6xl text-offwhite leading-none">
            Experience & Education.
          </h2>
          <p className="font-grotesk text-offwhite/40 text-sm mt-3 max-w-md">
            A timeline of academics, projects, and the experiences that shaped my technical stack.
          </p>
        </motion.div>

        {/* Timeline entries */}
        <div className="space-y-20 md:space-y-28">
          {TIMELINE.map((item, index) => (
            <TimelineEntry key={item.category + index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}