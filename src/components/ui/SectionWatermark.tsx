"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function SectionWatermark({ index }: { index: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 0.04 } : { opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 font-serif text-[20vw] text-offwhite leading-none select-none pointer-events-none"
      aria-hidden="true"
    >
      {index}
    </motion.div>
  );
}
