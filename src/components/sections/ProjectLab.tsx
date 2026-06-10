"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { PROJECTS } from "@/lib/data";

const STATUS_STYLES: Record<string, string> = {
  LIVE: "text-amber border-amber/40 bg-amber/8",
  GITHUB: "text-blue border-blue/40 bg-blue/8",
  RESEARCH: "text-offwhite/60 border-white/20 bg-white/5",
  PUBLICATION: "text-offwhite/60 border-white/20 bg-white/5",
};

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
    >
      <button
        onClick={handleClick}
        data-hover
        className="w-full text-left group"
      >
        <div
          className={`border transition-all duration-400 ${
            expanded
              ? "border-amber/30 bg-bg-2"
              : "border-white/6 bg-bg-2 hover:border-white/12"
          }`}
        >
          {/* Card header — always visible */}
          <div className="px-6 py-5 flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-xs text-offwhite/40 uppercase tracking-wider">
                  {project.codename}
                </span>
                <span
                  className={`font-mono text-xs border px-2 py-0.5 ${
                    STATUS_STYLES[project.status] || "text-offwhite/40 border-white/10"
                  }`}
                >
                  {project.status}
                </span>
                <span className="font-mono text-xs text-offwhite/25">
                  {project.year}
                </span>
              </div>
              <h3 className="font-serif text-xl md:text-2xl text-offwhite group-hover:text-amber transition-colors duration-300">
                {project.title}
              </h3>
              <p className="font-grotesk text-sm text-offwhite/40 mt-1">
                {project.subtitle}
              </p>
            </div>

            {/* Expand indicator */}
            <motion.div
              animate={{ rotate: expanded ? 45 : 0 }}
              transition={{ duration: 0.25 }}
              className="text-amber/50 text-xl shrink-0 mt-1 font-mono"
            >
              +
            </motion.div>
          </div>

          {/* Tags */}
          <div className="px-6 pb-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs text-offwhite/30 border border-white/8 px-2 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Expanded content */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="border-t border-white/6 px-6 py-6 grid md:grid-cols-3 gap-6">
                  <DetailBlock
                    label="THE PROBLEM"
                    content={project.hypothesis}
                    color="amber"
                  />
                  <DetailBlock
                    label="THE APPROACH"
                    content={project.method}
                    color="default"
                  />
                  <DetailBlock
                    label="THE OUTCOME"
                    content={project.finding}
                    color="default"
                  />
                </div>

                <div className="px-6 pb-6">
                  <div className="border-t border-white/6 pt-4 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="font-mono text-xs text-offwhite/30 mb-1">
                        TECH STACK & HIGHLIGHTS
                      </p>
                      <p className="font-grotesk text-sm text-offwhite/70">
                        {project.outcome}
                      </p>
                    </div>
                    {project.publication && (
                      <span className="font-mono text-xs text-amber/60 border border-amber/20 px-3 py-1">
                        {project.publication}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </button>
    </motion.div>
  );
}

function DetailBlock({
  label,
  content,
  color,
}: {
  label: string;
  content: string;
  color: "amber" | "default";
}) {
  return (
    <div>
      <p
        className={`font-mono text-xs mb-2 ${
          color === "amber" ? "text-amber/60" : "text-offwhite/30"
        }`}
      >
        {label}
      </p>
      <p className="font-grotesk text-sm text-offwhite/60 leading-relaxed">
        {content}
      </p>
    </div>
  );
}

export default function ProjectLab() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="lab" className="py-32 px-6 md:px-16 lg:px-24">
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
            PROJECTS
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="font-serif text-4xl md:text-6xl text-offwhite mb-4">
            Featured Work.
          </h2>
          <p className="font-grotesk text-sm text-offwhite/40 max-w-lg">
            Applications, systems, and research I've built. Click to expand details about architecture, methodology, and outcomes.
          </p>
        </motion.div>

        {/* Project cards */}
        <div className="space-y-4">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Future experiments teaser */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-8 border border-dashed border-white/10 px-6 py-5 flex items-center justify-between"
        >
          <div>
            <p className="font-mono text-xs text-offwhite/25 mb-1">
              CURRENTLY BUILDING
            </p>
            <p className="font-grotesk text-sm text-offwhite/30">
              Exploring new full-stack architectures. Code will be pushed to GitHub soon.
            </p>
          </div>
          <span className="font-mono text-xs text-offwhite/20 border border-dashed border-white/10 px-2 py-1">
            WIP
          </span>
        </motion.div>
      </div>
    </section>
  );
}