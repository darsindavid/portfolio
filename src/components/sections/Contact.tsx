"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWatermark from "@/components/ui/SectionWatermark";

const LINKS = [
  {
    label: "Email",
    value: "drcndvd@gmail.com",
    href: "mailto:drcndvd@gmail.com",
    note: "Fastest response. Usually same day.",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/darsindavid",
    href: "https://linkedin.com/in/darsindavid",
    note: "Professional profile.",
  },
  {
    label: "GitHub",
    value: "github.com/darsindavid",
    href: "https://github.com/darsindavid",
    note: "Code and projects.",
  },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("drcndvd@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <SectionWatermark index="08" />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-4 mb-8"
        >
          <div className="h-px w-10 bg-amber/50" />
          <span className="font-mono text-xs text-amber/50 tracking-[0.25em] uppercase">
            CONTACT
          </span>
        </motion.div>

        {/* Main content */}
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
            >
              <h2 className="font-serif text-4xl md:text-5xl leading-tight text-offwhite mb-6">
                Let's get in touch.
              </h2>
              <p className="font-grotesk text-sm text-offwhite/50 leading-relaxed mb-4">
                I'm currently open to full-time software engineering roles. Whether you're a recruiter, 
                a fellow developer, or someone building something interesting, my inbox is open.
              </p>
              <p className="font-grotesk text-sm text-offwhite/50 leading-relaxed">
                Feel free to reach out if you have a question, a potential opportunity, or just want to connect.
              </p>
            </motion.div>

            {/* Currently label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.35 }}
              className="mt-8 flex items-center gap-3"
            >
              <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
              <span className="font-mono text-xs text-offwhite/40">
                Open to full-time roles · Based in Chennai but happy to relocate :D
              </span>
            </motion.div>
          </div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            {LINKS.map((link, i) => (
              <LinkRow
                key={link.label}
                link={link}
                index={i}
                onCopy={link.label === "Email" ? copyEmail : undefined}
                copied={link.label === "Email" && copiedEmail}
              />
            ))}
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-24 border-t border-white/5 pt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <div>
            <p className="font-mono text-xs text-amber/50 mb-1">Darsin David J</p>
            <p className="font-grotesk text-xs text-offwhite/25">
              Software Engineer
            </p>
          </div>
          <div className="text-right">
            <p className="font-mono text-xs text-offwhite/20">
              © {new Date().getFullYear()} Darsin David J
            </p>
            <p className="font-mono text-xs text-offwhite/15 mt-1">
              Chennai, TN
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function LinkRow({
  link,
  index,
  onCopy,
  copied,
}: {
  link: { label: string; value: string; href: string; note: string };
  index: number;
  onCopy?: () => void;
  copied?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 + index * 0.08 }}
    >
      <a
        href={link.href}
        target={link.href.startsWith("mailto") ? undefined : "_blank"}
        rel="noopener noreferrer"
        data-hover
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={
          onCopy
            ? (e) => {
                e.preventDefault();
                onCopy();
              }
            : undefined
        }
        className="flex items-start justify-between gap-4 border border-white/6 px-4 py-4 hover:border-amber/25 hover:bg-amber/3 transition-all duration-300 group"
      >
        <div>
          <p className="font-mono text-xs text-offwhite/35 mb-1">
            {link.label}
          </p>
          <p className="font-grotesk text-sm text-offwhite/75 group-hover:text-offwhite transition-colors">
            {copied ? "Copied!" : link.value}
          </p>
        </div>
        <div className="text-right shrink-0">
          <p
            className={`font-mono text-xs transition-all duration-300 ${
              hovered ? "text-amber/60 opacity-100" : "text-offwhite/20 opacity-0"
            }`}
          >
            {link.label === "Email" ? "COPY" : "OPEN →"}
          </p>
          <p className="font-mono text-xs text-offwhite/20 mt-1 hidden md:block">
            {link.note}
          </p>
        </div>
      </a>
    </motion.div>
  );
}