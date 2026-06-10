"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Timeline", href: "#timeline" },
  { label: "Lab", href: "#lab" },
  { label: "Arcade", href: "#arcade" },
  { label: "Terminal", href: "#terminal" },
  { label: "Contact", href: "#contact" },
];

const LOGO_EGGS = [
  null,
  null,
  null,
  null,
  "Pattern detected. Keep going.",
  "You clicked 5 times. You're one of us.",
  "Okay now you're just showing off.",
  "ACHIEVEMENT UNLOCKED: Excessive Clicker",
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [eggMsg, setEggMsg] = useState<string | null>(null);
  const eggTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = () => {
    const next = logoClicks + 1;
    setLogoClicks(next);
    const msg = LOGO_EGGS[Math.min(next, LOGO_EGGS.length - 1)];
    if (msg) {
      setEggMsg(msg);
      if (eggTimeout.current) clearTimeout(eggTimeout.current);
      eggTimeout.current = setTimeout(() => setEggMsg(null), 3000);
    }
  };

  return (
    <>
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
            onClick={handleLogoClick}
            data-hover
            className="font-mono text-amber font-bold text-lg tracking-wider hover:text-amber-light transition-colors duration-200 relative"
            aria-label="Home"
          >
            DDJ
            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-amber group-hover:w-full transition-all duration-300" />
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

            {/* Resume CTA */}
            <a
              href="#terminal"
              data-hover
              className="font-mono text-xs text-amber border border-amber/30 px-3 py-1.5 hover:bg-amber/10 hover:border-amber/60 transition-all duration-200"
            >
              RESUME ↓
            </a>
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
                <a
                  href="#terminal"
                  className="font-mono text-sm text-amber border border-amber/30 px-4 py-2 text-center hover:bg-amber/10 transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  RESUME ↓
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Easter egg message */}
      <AnimatePresence>
        {eggMsg && (
          <motion.div
            initial={{ opacity: 0, y: -8, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -8, x: "-50%" }}
            className="fixed top-16 left-1/2 z-50 font-mono text-xs text-amber bg-bg-2 border border-amber/20 px-4 py-2 whitespace-nowrap"
          >
            {eggMsg}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
