"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import SectionWatermark from "@/components/ui/SectionWatermark";

type Phase = "intro" | "toss" | "toss-choice" | "playing" | "innings-break" | "result";
type Parity = "ODD" | "EVEN";
type Role = "BATTING" | "BOWLING";

interface Achievement {
  id: string;
  label: string;
  desc: string;
}

const MAX_WICKETS = 1;
const NUMS: number[] = [1, 2, 3, 4, 5, 6];

const ACHIEVEMENTS: Achievement[] = [
  { id: "duck", label: "GOLDEN DUCK", desc: "Out on 0 runs" },
  { id: "seven", label: "LUCKY 7", desc: "Combined toss sum was exactly 7" },
  { id: "shutout", label: "BOWLED OUT", desc: "Opponent scored 0" },
];

export default function Arcade() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const [phase, setPhase] = useState<Phase>("intro");
  const [selectedParity, setSelectedParity] = useState<Parity | null>(null);
  const [selectedNum, setSelectedNum] = useState<number | null>(null);
  
  // Gameplay states
  const [playerRole, setPlayerRole] = useState<Role>("BATTING");
  const [innings, setInnings] = useState<1 | 2>(1);
  const [target, setTarget] = useState<number | null>(null);
  
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [playerWickets, setPlayerWickets] = useState(0);
  const [computerWickets, setComputerWickets] = useState(0);
  
  const [gameLog, setGameLog] = useState<string[]>([]);
  const [lastResult, setLastResult] = useState<string | null>(null);
  const [tossResult, setTossResult] = useState<string | null>(null);
  
  // Shuffling animation states
  const [resolvingMove, setResolvingMove] = useState(false);
  const [shuffleNum, setShuffleNum] = useState(1);
  const [revealedPlayerNum, setRevealedPlayerNum] = useState<number | null>(null);
  const [revealedCpuNum, setRevealedCpuNum] = useState<number | null>(null);

  const [achievements, setAchievements] = useState<string[]>([]);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);

  const unlockAchievement = (id: string) => {
    if (achievements.includes(id)) return;
    const a = ACHIEVEMENTS.find((x) => x.id === id);
    if (!a) return;
    setAchievements((prev) => [...prev, id]);
    setNewAchievement(a);
    setTimeout(() => setNewAchievement(null), 3000);
  };

  const addLog = (msg: string) =>
    setGameLog((prev) => [msg, ...prev].slice(0, 4));

  // Shuffling animation loops while calculating moves
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resolvingMove && revealedCpuNum === null) {
      interval = setInterval(() => {
        setShuffleNum(Math.ceil(Math.random() * 6));
      }, 75);
    }
    return () => clearInterval(interval);
  }, [resolvingMove, revealedCpuNum]);

  const resetGame = () => {
    setPhase("intro");
    setSelectedParity(null);
    setSelectedNum(null);
    setPlayerRole("BATTING");
    setInnings(1);
    setTarget(null);
    setPlayerScore(0);
    setComputerScore(0);
    setPlayerWickets(0);
    setComputerWickets(0);
    setGameLog([]);
    setLastResult(null);
    setTossResult(null);
    setResolvingMove(false);
    setRevealedPlayerNum(null);
    setRevealedCpuNum(null);
  };

  // ── 1. Toss Step ──────────────────────────────────────────────────────────
  const handleToss = () => {
    if (!selectedParity || !selectedNum || resolvingMove) return;
    setResolvingMove(true);

    const compNum = Math.ceil(Math.random() * 6);
    const sum = selectedNum + compNum;
    const sumParity: Parity = sum % 2 === 0 ? "EVEN" : "ODD";
    const wonToss = sumParity === selectedParity;

    if (sum === 7) unlockAchievement("seven");

    setTimeout(() => {
      if (wonToss) {
        setTossResult(`Sum was ${sum} (${sumParity}) — You won the toss! 🎉`);
        setPhase("toss-choice");
      } else {
        const cpuChoice = Math.random() > 0.5 ? "BATTING" : "BOWLING";
        setTossResult(`Sum was ${sum} (${sumParity}) — CPU won the toss and wants to ${cpuChoice === "BATTING" ? "Bat" : "Bowl"} first!`);
        setPlayerRole(cpuChoice === "BATTING" ? "BOWLING" : "BATTING");
        setTimeout(() => setPhase("playing"), 2000);
      }
      setResolvingMove(false);
      setSelectedNum(null);
    }, 1000);
  };

  const handleTossChoice = (choice: Role) => {
    setPlayerRole(choice);
    setPhase("playing");
    setTossResult(null);
    setSelectedNum(null);
    setSelectedParity(null);
  };

  // ── 2. Play Turn Step ─────────────────────────────────────────────────────
  const handleDelivery = () => {
    if (!selectedNum || resolvingMove) return;
    
    setResolvingMove(true);
    setLastResult(null);
    setRevealedPlayerNum(null);
    setRevealedCpuNum(null);
    
    const pMove = selectedNum;
    const cMove = Math.ceil(Math.random() * 6);
    const isOut = pMove === cMove;

    // Phase A: Stop shuffle, reveal choices side-by-side
    setTimeout(() => {
      setRevealedPlayerNum(pMove);
      setRevealedCpuNum(cMove);

      // Phase B: Visual drama pause before showing result text
      setTimeout(() => {
        if (playerRole === "BATTING") {
          if (isOut) {
            setPlayerWickets(1);
            setLastResult("OUT! 🛑");
            addLog(`You threw ${pMove}, CPU matched with ${cMove} → You're Out!`);
            if (playerScore === 0) unlockAchievement("duck");
            checkInningsEnd(playerScore);
          } else {
            const newScore = playerScore + pMove;
            setPlayerScore(newScore);
            setLastResult(`+${pMove} Runs! 🏏`);
            addLog(`You scored +${pMove} runs (CPU threw ${cMove})`);
            checkMatchConclusion(newScore, computerScore);
          }
        } else {
          // Player is BOWLING (CPU Bats)
          if (isOut) {
            setComputerWickets(1);
            setLastResult("GOT 'EM! OUT! ☝️");
            addLog(`CPU threw ${cMove}, you matched with ${pMove} → CPU is Out!`);
            if (computerScore === 0) unlockAchievement("shutout");
            checkInningsEnd(computerScore);
          } else {
            const newScore = computerScore + cMove;
            setComputerScore(newScore);
            setLastResult(`CPU gets +${cMove} 🏃`);
            addLog(`CPU scores +${cMove} runs (You threw ${pMove})`);
            checkMatchConclusion(playerScore, newScore);
          }
        }
      }, 500);

    }, 800);
  };

  const checkMatchConclusion = (pScore: number, cScore: number) => {
    if (innings === 2 && target !== null) {
      if ((playerRole === "BATTING" && pScore > target) || (playerRole === "BOWLING" && cScore > target)) {
        setTimeout(() => setPhase("result"), 1000);
        return;
      }
    }
    setResolvingMove(false);
  };

  const checkInningsEnd = (currentInningsScore: number) => {
    if (innings === 1) {
      setTimeout(() => {
        setTarget(currentInningsScore);
        setPhase("innings-break");
      }, 1200);
    } else {
      setTimeout(() => setPhase("result"), 1200);
    }
  };

  const startInnings2 = () => {
    setInnings(2);
    setPlayerRole(playerRole === "BATTING" ? "BOWLING" : "BATTING");
    setLastResult(null);
    setRevealedPlayerNum(null);
    setRevealedCpuNum(null);
    setResolvingMove(false);
    setPhase("playing");
  };

  return (
    <section id="arcade" className="section-padding relative overflow-hidden">
      <SectionWatermark index="05" />
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="flex items-center gap-4 mb-8">
          <div className="h-px w-10 bg-amber/50" />
          <span className="font-mono text-xs text-amber/50 tracking-[0.25em] uppercase">MINI GAME</span>
        </motion.div>

        <div className="mb-10">
          <h2 className="font-serif text-4xl md:text-5xl text-offwhite mb-3">Hand Cricket.</h2>
          <p className="font-grotesk text-sm text-offwhite/40">A game I grew up playing. Now it lives in my portfolio.</p>
        </div>

        {/* Core Screen Area Cabinet */}
        <motion.div 
          animate={lastResult?.includes("OUT") ? { x: [-8, 8, -6, 6, 0], backgroundColor: ["#111", "#1e1010", "#111"] } : {}}
          className="border border-white/8 bg-bg-2 relative scanlines overflow-hidden min-h-[460px] flex flex-col justify-between"
        >
          {/* Top Panel bar */}
          <div className="border-b border-white/8 px-5 py-3 flex items-center justify-between font-mono text-xs text-offwhite/30">
            <span className="text-amber">CRICKET_STATION</span>
            <span>{innings === 1 ? "FIRST INNINGS" : `CHASING TARGET: ${target !== null ? target + 1 : 0}`}</span>
          </div>

          <div className="p-6 flex-1 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              
              {/* PHASE: INTRO */}
              {phase === "intro" && (
                <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                  <p className="font-grotesk text-sm text-offwhite/60 leading-relaxed">
                    Remember playing this under the desk back in school? Same rules apply here. Throw your number—if the CPU matches it, you're out. If not, the runs keep stacking up. Sudden death rules: 1 wicket is all you get.
                  </p>
                  <button onClick={() => setPhase("toss")} className="font-mono text-sm text-amber border border-amber/30 px-6 py-3 hover:bg-amber/10 transition-all">
                    LET'S FLIP FOR TOSS →
                  </button>
                </motion.div>
              )}

              {/* PHASE: TOSS CONTROL */}
              {phase === "toss" && (
                <motion.div key="toss" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                  {!tossResult ? (
                    <div className="space-y-4">
                      <div>
                        <p className="font-mono text-xs text-offwhite/30 mb-2">GUESS THE COIN SUM:</p>
                        <div className="flex gap-2">
                          {(["ODD", "EVEN"] as Parity[]).map((p) => (
                            <button key={p} onClick={() => setSelectedParity(p)} className={`font-mono text-xs px-4 py-2 border ${selectedParity === p ? "border-amber bg-amber/15 text-amber" : "border-white/10 text-offwhite/40"}`}>{p}</button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="font-mono text-xs text-offwhite/30 mb-2">THROW A NUMBER FOR THE FLIP:</p>
                        <div className="flex gap-2">
                          {NUMS.map((n: number) => (
                            <button key={n} onClick={() => setSelectedNum(n)} className={`w-8 h-8 font-mono text-xs border ${selectedNum === n ? "border-amber bg-amber/15 text-amber" : "border-white/10 text-offwhite/40"}`}>{n}</button>
                          ))}
                        </div>
                      </div>
                      <button onClick={handleToss} disabled={!selectedParity || !selectedNum || resolvingMove} className="font-mono text-xs text-amber border border-amber/30 px-4 py-2 disabled:opacity-30">FLIP COIN 🪙</button>
                    </div>
                  ) : (
                    <p className="font-mono text-sm text-amber text-center py-12 animate-pulse">{tossResult}</p>
                  )}
                </motion.div>
              )}

              {/* PHASE: TOSS WIN DECISION INTERFACE */}
              {phase === "toss-choice" && (
                <motion.div key="toss-choice" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-center py-6">
                  <p className="font-mono text-sm text-amber">{tossResult}</p>
                  <p className="font-grotesk text-sm text-offwhite/60">What do you want to do first?</p>
                  <div className="flex justify-center gap-4">
                    <button onClick={() => handleTossChoice("BATTING")} className="font-mono text-xs border border-amber/40 text-amber px-5 py-2.5 hover:bg-amber/5">I WANT TO BAT 🏏</button>
                    <button onClick={() => handleTossChoice("BOWLING")} className="font-mono text-xs border border-white/10 text-offwhite/60 px-5 py-2.5 hover:bg-white/5">I WANT TO BOWL ⚾</button>
                  </div>
                </motion.div>
              )}

              {/* PHASE: CORE INNINGS PLAY FIELD */}
              {phase === "playing" && (
                <motion.div key="playing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 flex-1 flex flex-col justify-between">
                  {/* Scoreboards */}
                  <div className="grid grid-cols-2 gap-4">
                    <ScoreCard label={`YOU (${playerRole})`} score={playerScore} wickets={playerWickets} active={playerRole === "BATTING"} />
                    <ScoreCard label={`CPU (${playerRole === "BATTING" ? "BOWLING" : "BATTING"})`} score={computerScore} wickets={computerWickets} active={playerRole === "BOWLING"} />
                  </div>

                  {/* REVEAL SHOWDOWN HUB ZONE */}
                  <div className="border border-white/5 bg-bg/40 p-4 grid grid-cols-2 gap-4 items-center justify-items-center h-28 relative overflow-hidden rounded-sm">
                    <div className="text-center">
                      <p className="font-mono text-[10px] text-offwhite/30 mb-1">YOUR HAND</p>
                      <AnimatePresence mode="wait">
                        <motion.div 
                          key={revealedPlayerNum ?? "empty-p"}
                          initial={{ scale: 0.7, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="w-12 h-12 border border-white/10 flex items-center justify-center font-mono text-lg font-bold text-offwhite bg-bg"
                        >
                          {resolvingMove && revealedPlayerNum === null ? "⏳" : revealedPlayerNum ?? "-"}
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    <div className="text-center">
                      <p className="font-mono text-[10px] text-offwhite/30 mb-1">CPU HAND</p>
                      <div className={`w-12 h-12 border flex items-center justify-center font-mono text-lg font-bold bg-bg ${resolvingMove && revealedCpuNum === null ? "border-amber/40 text-amber" : "border-white/10 text-offwhite"}`}>
                        {resolvingMove && revealedCpuNum === null ? shuffleNum : revealedCpuNum ?? "-"}
                      </div>
                    </div>

                    <AnimatePresence>
                      {lastResult && (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-bg/80 backdrop-blur-xs flex items-center justify-center">
                          <p className={`font-mono text-sm font-bold tracking-widest ${lastResult.includes("OUT") ? "text-red-500 scale-105" : "text-amber"}`}>{lastResult}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Input Triggers */}
                  <div className="space-y-3">
                    {!resolvingMove && (
                      <div>
                        <p className="font-mono text-[10px] text-offwhite/30 mb-1.5">PICK A NUMBER TO THROW:</p>
                        <div className="flex gap-1.5">
                          {NUMS.map((n: number) => (
                            <button key={n} onClick={() => setSelectedNum(n)} className={`w-9 h-9 font-mono text-xs border ${selectedNum === n ? "border-amber bg-amber/15 text-amber" : "border-white/10 text-offwhite/40 hover:border-white/20"}`}>{n}</button>
                          ))}
                        </div>
                      </div>
                    )}

                    <button onClick={handleDelivery} disabled={!selectedNum || resolvingMove} className="font-mono text-xs text-amber border border-amber/30 px-4 py-2 disabled:opacity-20">
                      {resolvingMove ? "Revealing hands..." : playerRole === "BATTING" ? "HIT IT! 🚀" : "THROW DELIVERY! ⚡"}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* PHASE: INNINGS CHANGE OVERLAY BREAK */}
              {phase === "innings-break" && (
                <motion.div key="innings-break" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10 space-y-4 font-mono">
                  <p className="text-sm text-amber tracking-wider">👋 INNINGS OVER! SWITCHING SIDES</p>
                  <p className="text-xs text-offwhite/50">First innings wrapped up at {target} runs.</p>
                  <p className="text-xs text-amber/70 font-semibold">{playerRole === "BATTING" ? "Time to bowling! Defend this target." : `You need ${target !== null ? target + 1 : 0} runs to win this.`}</p>
                  <button onClick={startInnings2} className="text-xs border border-white/10 px-4 py-2 hover:bg-white/5 transition-all">BRING ON THE SECOND INNINGS →</button>
                </motion.div>
              )}

              {/* PHASE: CONCLUDED SUMMARY LOG */}
              {phase === "result" && (
                <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center space-y-6 py-4">
                  <div>
                    <p className="font-mono text-[10px] text-offwhite/20 mb-2 tracking-widest">MATCH FINISHED</p>
                    <p className="font-serif text-5xl text-offwhite">
                      {playerScore > computerScore ? <span className="text-amber">YOU WIN! 🏆</span> : playerScore < computerScore ? "CPU WINS xd" : "IT'S A TIE! 🤝"}
                    </p>
                    <p className="font-mono text-xs text-offwhite/40 mt-2">Final Score: You ({playerScore}) — CPU ({computerScore})</p>
                  </div>

                  {achievements.length > 0 && (
                    <div className="border border-amber/15 bg-amber/5 px-4 py-2 space-y-0.5 font-mono text-[10px]">
                      <p className="text-amber/40 mb-1">ACHIEVEMENTS UNLOCKED</p>
                      {achievements.map((id) => (
                        <p key={id} className="text-offwhite/50">🏆 {ACHIEVEMENTS.find(x => x.id === id)?.label}</p>
                      ))}
                    </div>
                  )}

                  <button onClick={resetGame} className="font-mono text-xs text-amber border border-amber/30 px-5 py-2.5 hover:bg-amber/10">PLAY ANOTHER ROUND</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ScoreCard({
  label,
  score,
  wickets,
  active,
}: {
  label: string;
  score: number;
  wickets: number;
  active: boolean;
}) {
  return (
    <div className={`border px-4 py-3 transition-colors ${active ? "border-amber/30 bg-amber/5" : "border-white/8"}`}>
      <p className={`font-mono text-xs mb-1 ${active ? "text-amber/60" : "text-offwhite/30"}`}>{label}</p>
      <p className="font-mono text-3xl text-offwhite font-bold">{score}</p>
      <p className="font-mono text-xs text-offwhite/30 mt-0.5">{wickets}/1 Wkts</p>
    </div>
  );
}