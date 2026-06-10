"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SECTIONS = [
  { id: "home" },
  { id: "about" },
  { id: "timeline" },
  { id: "lab" },
  { id: "arcade" },
  { id: "terminal" },
  { id: "future" },
  { id: "contact" },
];

export default function ScrollRail() {
  const { scrollYProgress } = useScroll();
  const [activeSection, setActiveSection] = useState("home");
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div
      className="hidden md:flex fixed left-6 md:left-16 top-1/2 -translate-y-1/2 z-40 flex-col items-start pointer-events-none"
      aria-hidden="true"
    >
      <div className="relative w-px h-[60vh] bg-white/5">
        <motion.div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-amber/60 to-amber/20"
          style={{ height: fillHeight }}
        />

        {SECTIONS.map(({ id }, i) => {
          const top = `${(i / (SECTIONS.length - 1)) * 100}%`;
          const isActive = activeSection === id;
          return (
            <div
              key={id}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ top }}
            >
              <div
                className={`rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-1.5 h-1.5 bg-amber"
                    : "w-1 h-1 bg-white/20"
                }`}
              />
            </div>
          );
        })}
      </div>

      <motion.div
        style={{ opacity: scrollHintOpacity }}
        className="mt-4 flex items-center gap-3"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-amber/60 to-transparent"
        />
        <span className="font-mono text-xs text-offwhite/25 tracking-widest uppercase rotate-90 origin-left ml-2">
          scroll
        </span>
      </motion.div>
    </div>
  );
}
