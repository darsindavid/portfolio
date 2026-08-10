"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Background", href: "#timeline" },
  { label: "Projects", href: "#lab" },
  { label: "Arcade", href: "#arcade" },
  { label: "Terminal", href: "#terminal" },
  { label: "Current Focus", href: "#future" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      // Fade resume button into view once scrolled past the Hero section (~500px)
      setShowResume(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-bg/90 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={scrollToTop}
          data-hover
          className="font-mono text-amber font-bold text-lg tracking-wider hover:text-amber-light transition-colors duration-200"
          aria-label="Scroll to top"
        >
          DDJ
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-hover
              className="font-grotesk text-sm text-offwhite/50 hover:text-offwhite transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-amber group-hover:w-full transition-all duration-300" />
            </a>
          ))}

          {/* Conditional Resume CTA with smooth entry */}
          <AnimatePresence>
            {showResume && (
              <motion.a
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                href="https://drive.google.com/file/d/1WXi-lH0WQV9fXHUA93FDNRzceKVKbAKL/view"
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                className="font-mono text-xs text-amber border border-amber/30 px-3 py-1.5 hover:bg-amber/10 hover:border-amber/60 transition-all duration-200"
              >
                RESUME ↗
              </motion.a>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          data-hover
        >
          <span
            className={`block h-px w-6 bg-offwhite/70 transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-2.5" : ""
            }`}
          />
          <span
            className={`block h-px w-4 bg-offwhite/70 transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-offwhite/70 transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-2.5" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-bg-2 border-t border-white/5 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-offwhite/70 hover:text-amber font-grotesk text-base transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}

              {/* Conditional Mobile Resume Link */}
              {showResume && (
                <motion.a
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  href="https://drive.google.com/file/d/1WXi-lH0WQV9fXHUA93FDNRzceKVKbAKL/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-amber border border-amber/30 px-4 py-2 text-center hover:bg-amber/10 transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  RESUME ↗
                </motion.a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}