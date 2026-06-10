"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SKILLS } from "@/lib/data";
import SectionWatermark from "@/components/ui/SectionWatermark";

const FACTS = [
  { label: "LOCATION", value: "Chennai, TN" },
  { label: "STATUS", value: "B.Tech CSE (AI & ML) Graduate" },
  { label: "STACK", value: "TypeScript, React, Tailwind CSS, Python" },
  { label: "GOAL", value: "Building resilient, user-centric software" },
];

const FILMS = [
  "Aaranya Kaandam",
  "Fallen Angels",
  "Dev D",
  "Memories of Murder",
  "Pulp Fiction",
  "Kill Bill",
  "Super Deluxe",
  "Requiem for a Dream",
  "Inception",
  "Natchathiram Nagargiradhu",
];

// Updated to match a more grounded tech stack
const CLICK_REVEALS: Record<string, string> = {
  Python: "First language. Still the fastest way to prove an idea works.",
  TypeScript: "Because runtime errors at 2AM are a character flaw.",
  "React.js": "Component-based architecture just makes sense.",
  "Tailwind CSS": "Because writing vanilla CSS for every div is a form of self-sabotage.",
  TensorFlow: "Built two IEEE papers on this. Got it wrong multiple times first.",
  Git: "git blame is the most honest performance review tool.",
};

function SkillTag({ skill }: { skill: string }) {
  const reveal = CLICK_REVEALS[skill];
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={() => reveal && alert(reveal)} 
      data-hover
      title={reveal}
      className={`font-mono text-xs px-2.5 py-1 border transition-all duration-200 ${
        reveal
          ? "border-amber/30 text-amber/80 hover:bg-amber/10 hover:border-amber/60 cursor-pointer"
          : "border-white/10 text-offwhite/40 cursor-default"
      }`}
    >
      {skill}
    </motion.button>
  );
}

function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <SectionWatermark index="02" />
      <div className="max-w-6xl mx-auto">
        {/* Chapter header */}
        <FadeIn className="flex items-center gap-4 mb-10">
          <span className="font-mono text-xs text-amber/50 tracking-[0.25em] uppercase">
            ABOUT
          </span>
          <div className="h-px flex-1 bg-white/5 max-w-xs" />
        </FadeIn>

        {/* Main grid */}
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — Biography */}
          <div>
            <FadeIn delay={0.1}>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-8">
                <span className="text-offwhite">22. Chennai.</span>
                <br />
                <span className="text-offwhite/40 italic">
                  Developer & Builder.
                </span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="font-grotesk text-offwhite/55 leading-relaxed mb-5 text-sm">
                I recently graduated with a B.Tech in Computer Science, specializing in AI & ML. 
                My entry into tech started exactly how you'd expect: unsupervised internet access 
                and too much gaming, which naturally evolved into a curiosity about how things are actually built.
              </p>
              <p className="font-grotesk text-offwhite/55 leading-relaxed mb-5 text-sm">
                Beyond academics, I have experiences in hackathons, working in production environments, 
                and I've co-authored two IEEE publications. I build things to see what happens when you push 
                the button, and I take notes on failure because it's usually more informative than success.
              </p>
              <p className="font-grotesk text-offwhite/55 leading-relaxed text-sm">
                Right now, I'm focused on writing clean code, understanding how systems behave under 
                real-world pressure, and building tools that I'd actually want to use.
              </p>
            </FadeIn>
          </div>

          {/* Right — fact grid + skills */}
          <div className="space-y-8">
            {/* Quick facts */}
            <FadeIn delay={0.15}>
              <div className="border border-white/6 divide-y divide-white/6">
                {FACTS.map((fact) => (
                  <div key={fact.label} className="flex gap-4 px-4 py-3">
                    <span className="font-mono text-xs text-amber/50 w-20 shrink-0 pt-0.5">
                      {fact.label}
                    </span>
                    <span className="font-grotesk text-sm text-offwhite/70">
                      {fact.value}
                    </span>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Skills */}
            <FadeIn delay={0.25}>
              <p className="font-mono text-xs text-offwhite/30 tracking-widest uppercase mb-4">
                TECHNICAL STACK{" "}
                <span className="text-amber/40 normal-case tracking-normal">
                  — click for context
                </span>
              </p>

              <div className="space-y-3">
                <div>
                  <p className="font-mono text-xs text-offwhite/25 mb-2">
                    LANGUAGES
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SKILLS.languages.map((s) => (
                      <SkillTag key={s} skill={s} />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-mono text-xs text-offwhite/25 mb-2">
                    FRAMEWORKS
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SKILLS.frameworks.map((s) => (
                      <SkillTag key={s} skill={s} />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-mono text-xs text-offwhite/25 mb-2">
                    CONCEPTS
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SKILLS.concepts.map((s) => (
                      <SkillTag key={s} skill={s} />
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Publications badge */}
            <FadeIn delay={0.3}>
              <div className="border border-amber/15 bg-amber/5 px-4 py-4">
                <p className="font-mono text-xs text-amber/60 mb-2">
                  PEER-REVIEWED
                </p>
                <p className="font-grotesk text-sm text-offwhite/70 mb-1">
                  IEEE INOACC 2025 — SCOPUS Indexed
                </p>
                <p className="font-grotesk text-sm text-offwhite/70">
                  IEEE NKCon 2025 — In Press
                </p>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Film stack moved to the bottom as an extra detail */}
        <FadeIn delay={0.4} className="mt-12 pt-8 border-t border-white/5">
          <p className="font-mono text-xs text-offwhite/30 tracking-widest uppercase mb-4">
            OFF-SCREEN RECREATION
          </p>
          <div className="flex flex-wrap gap-2">
            {FILMS.map((film) => (
              <span
                key={film}
                className="font-mono text-xs text-offwhite/40 border border-white/8 px-2 py-1"
              >
                {film}
              </span>
            ))}
          </div>
        </FadeIn>

      </div>
    </section>
  );
}