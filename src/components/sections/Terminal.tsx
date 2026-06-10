"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { TERMINAL_COMMANDS } from "@/lib/data";
import SectionWatermark from "@/components/ui/SectionWatermark";

interface HistoryEntry {
  type: "input" | "output" | "error";
  content: string;
}

const WELCOME = `DARSIN DAVID J — TERMINAL INTERFACE
────────────────────────────────────────────
Type 'help' to see available commands.
────────────────────────────────────────────`;

export default function Terminal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true });

  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([
    { type: "output", content: WELCOME },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdIndex, setCmdIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const runCommand = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase();
    
    // If empty input, just print a new line (like a real terminal)
    if (!cmd) {
      setHistory((prev) => [...prev, { type: "input", content: "" }]);
      return;
    }

    // Add to command history
    setCmdHistory((prev) => [raw, ...prev].slice(0, 50));
    setCmdIndex(-1);

    // Echo the command
    setHistory((prev) => [
      ...prev,
      { type: "input", content: raw },
    ]);

    if (cmd === "clear") {
      setHistory([{ type: "output", content: WELCOME }]);
      return;
    }

    // Look up command
    const output =
      TERMINAL_COMMANDS[cmd] ||
      TERMINAL_COMMANDS[cmd.replace(/^sudo\s+/, "sudo ")] ||
      null;

    if (output) {
      setHistory((prev) => [...prev, { type: "output", content: output }]);
    } else if (cmd.startsWith("sudo ")) {
      // Handle sudo commands not in the map
      setHistory((prev) => [
        ...prev,
        {
          type: "error",
          content: `[sudo] password for visitor: ••••••\nPermission denied. Nice try though.`,
        },
      ]);
    } else if (cmd === "exit" || cmd === "quit") {
      setHistory((prev) => [
        ...prev,
        {
          type: "output",
          content: "Terminal session active. You can't exit a portfolio.\n(Just scroll up.)",
        },
      ]);
    } else {
      setHistory((prev) => [
        ...prev,
        {
          type: "error",
          content: `command not found: ${raw}\nType 'help' for available commands.`,
        },
      ]);
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(cmdIndex + 1, cmdHistory.length - 1);
      setCmdIndex(next);
      setInput(cmdHistory[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(cmdIndex - 1, -1);
      setCmdIndex(next);
      setInput(next === -1 ? "" : cmdHistory[next] ?? "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Only autocomplete if user has typed something
      if (!input.trim()) return; 
      
      const cmds = Object.keys(TERMINAL_COMMANDS);
      const match = cmds.find((c) => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  };

  return (
    <section id="terminal" className="section-padding relative overflow-hidden">
      <SectionWatermark index="06" />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-4 mb-8"
        >
          <div className="h-px w-10 bg-amber/50" />
          <span className="font-mono text-xs text-amber/50 tracking-[0.25em] uppercase">
            TERMINAL
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-offwhite mb-3">
            Command Line.
          </h2>
          <p className="font-grotesk text-sm text-offwhite/40">
            Type{" "}
            <code className="font-mono text-amber/70 text-xs">help</code> to
            start.{" "}
            <code className="font-mono text-amber/70 text-xs">↑↓</code> for
            history.{" "}
            <code className="font-mono text-amber/70 text-xs">Tab</code> to
            complete.
          </p>
        </motion.div>

        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className={`border transition-colors duration-300 ${
            isFocused ? "border-amber/30" : "border-white/8"
          } bg-bg-2`}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Window chrome */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/6">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-white/10" />
              <span className="w-3 h-3 rounded-full bg-white/10" />
              <span className="w-3 h-3 rounded-full bg-amber/50" />
            </div>
            <span className="font-mono text-xs text-offwhite/20">
              visitor@darsin-portfolio:~$
            </span>
            <span className="font-mono text-xs text-offwhite/20 w-16 text-right">
              {history.length - 1} cmds
            </span>
          </div>

          {/* Output area */}
          <div className="h-80 md:h-96 overflow-y-auto px-5 py-4 space-y-3 cursor-text">
            {history.map((entry, i) => (
              <div key={i}>
                {entry.type === "input" ? (
                  <div className="flex items-start gap-2">
                    <span className="text-amber/60 font-mono text-xs shrink-0 mt-0.5">
                      $
                    </span>
                    <span className="font-mono text-sm text-offwhite/90">
                      {entry.content}
                    </span>
                  </div>
                ) : (
                  <pre
                    className={`font-mono text-xs whitespace-pre-wrap leading-relaxed ${
                      entry.type === "error"
                        ? "text-offwhite/40"
                        : "text-offwhite/65"
                    }`}
                  >
                    {entry.content}
                  </pre>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input row */}
          <div className="border-t border-white/6 flex items-center gap-3 px-5 py-3">
            <span className="font-mono text-xs text-amber/60 shrink-0">$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="flex-1 bg-transparent font-mono text-base md:text-sm text-offwhite outline-none caret-amber placeholder:text-offwhite/20"
              placeholder="type a command..."
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="font-mono text-xs text-offwhite/20 mt-4"
        >
          Try: help · whoami · skills · experience · clear
        </motion.p>
      </div>
    </section>
  );
}