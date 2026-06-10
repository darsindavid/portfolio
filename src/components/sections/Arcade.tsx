"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import SectionWatermark from "@/components/ui/SectionWatermark";

type Phase = "intro" | "toss" | "batting" | "computer-batting" | "result";
type Parity = "ODD" | "EVEN";

interface Achievement {
  id: string;
  label: string;
  desc: string;
}

const MAX_WICKETS = 3;

const ACHIEVEMENTS: Achievement[] = [
  { id: "century", label: "CENTURION", desc: "Scored 100+ in your innings" },
  { id: "duck", label: "GOLDEN DUCK", desc: "Out on 0 runs" },
  { id: "seven", label: "LUCKY 7", desc: "Combined toss sum was exactly 7" },
  { id: "shutout", label: "BOWLED OUT", desc: "Computer scored 0" },
  { id: "perfect", label: "CLEAN SWEEP", desc: "Won by 50+ runs" },
];

export default function Arcade() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const [phase, setPhase] = useState<Phase>("intro");
  const [selectedParity, setSelectedParity] = useState<Parity | null>(null);
  const [selectedNum, setSelectedNum] = useState<number | null>(null);
  
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [playerWickets, setPlayerWickets] = useState(0);
  const [computerWickets, setComputerWickets] = useState(0);
  
  const [gameLog, setGameLog] = useState<string[]>([]);
  const [lastResult, setLastResult] = useState<string | null>(null);
  const [tossResult, setTossResult] = useState<string | null>(null);
  const [waiting, setWaiting] = useState(false);
  
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
    setGameLog((prev) => [msg, ...prev].slice(0, 6));

  const resetGame = () => {
    setPhase("intro");
    setSelectedParity(null);
    setSelectedNum(null);
    setPlayerScore(0);
    setComputerScore(0);
    setPlayerWickets(0);
    setComputerWickets(0);
    setGameLog([]);
    setLastResult(null);
    setTossResult(null);
    setWaiting(false);
  };

  // ── 1. Toss Phase ─────────────────────────────────────────────────────────
  const handleToss = () => {
    if (!selectedParity || !selectedNum || waiting) return;
    setWaiting(true);

    const compNum = Math.ceil(Math.random() * 6);
    const sum = selectedNum + compNum;
    const sumParity: Parity = sum % 2 === 0 ? "EVEN" : "ODD";
    const wonToss = sumParity === selectedParity;

    if (sum === 7) unlockAchievement("seven");

    if (wonToss) {
      setTossResult(`Sum: ${sum} (${sumParity}). You WIN the toss & chose to BAT!`);
    } else {
      setTossResult(`Sum: ${sum} (${sumParity}). CPU WINS the toss & chose to BOWL!`);
    }

    // Move to batting phase after a short delay
    setTimeout(() => {
      setPhase("batting");
      setTossResult(null);
      setSelectedNum(null);
      setSelectedParity(null);
      setWaiting(false);
    }, 2500);
  };

  // ── 2. Player Bats ────────────────────────────────────────────────────────
  const handleBowl = () => {
    if (!selectedNum || waiting) return;
    setWaiting(true);

    const compNum = Math.ceil(Math.random() * 6);
    // Standard Hand Cricket: If numbers match, you are OUT.
    const playerHit = selectedNum !== compNum; 

    const msg = `You: ${selectedNum} | CPU: ${compNum} → ${
      playerHit ? `+${selectedNum} RUNS` : "OUT!"
    }`;
    addLog(msg);

    if (playerHit) {
      const newScore = playerScore + selectedNum;
      setPlayerScore(newScore);
      if (newScore >= 100) unlockAchievement("century");
      setLastResult(`+${selectedNum} runs`);
    } else {
      const newWickets = playerWickets + 1;
      setPlayerWickets(newWickets);
      if (newWickets === 1 && playerScore === 0) unlockAchievement("duck");
      setLastResult("OUT!");
      
      if (newWickets >= MAX_WICKETS) {
        // Innings over — computer bats
        setTimeout(() => {
          setPhase("computer-batting");
          runComputerInnings(playerScore);
        }, 900);
        setWaiting(false);
        setSelectedNum(null);
        return;
      }
    }

    setTimeout(() => {
      setWaiting(false);
      setSelectedNum(null);
    }, 700);
  };

  // ── 3. Computer Bats (auto-play) ──────────────────────────────────────────
  const runComputerInnings = (target: number) => {
    let cScore = 0;
    let cWickets = 0;
    const balls: string[] = [];

    // Reset logs for CPU innings
    setGameLog([]);
    setLastResult(null);

    const playBall = (wicketCount: number, score: number) => {
      // Check if innings should end before bowling the next ball
      if (wicketCount >= MAX_WICKETS || score > target) {
        setTimeout(() => endGame(target, score), 600);
        return;
      }

      const cpNum = Math.ceil(Math.random() * 6);
      const playerBowl = Math.ceil(Math.random() * 6);
      const compHit = cpNum !== playerBowl;

      if (compHit) {
        score += cpNum;
        cScore = score;
        balls.unshift(`CPU: ${cpNum} | You: ${playerBowl} | +${cpNum}`);
      } else {
        wicketCount += 1;
        cWickets = wicketCount;
        balls.unshift(`CPU: ${cpNum} | You: ${playerBowl} | OUT!`);
      }

      setComputerScore(score);
      setComputerWickets(wicketCount);
      setGameLog([...balls].slice(0, 6));

      // Check win condition immediately after ball is played
      if (wicketCount >= MAX_WICKETS || score > target) {
        setTimeout(() => endGame(target, score), 800);
      } else {
        setTimeout(() => playBall(wicketCount, score), 1000);
      }
    };

    setTimeout(() => playBall(0, 0), 1000);
  };

  const endGame = (playerFinal: number, compFinal: number) => {
    setPhase("result");
    if (compFinal === 0) unlockAchievement("shutout");
    if (playerFinal - compFinal >= 50) unlockAchievement("perfect");
  };

  const NUMS = [1, 2, 3, 4, 5, 6];

  return (
    <section id="arcade" className="section-padding relative overflow-hidden">
      <SectionWatermark index="05" />
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex items-center gap-4 mb-8"
        >
          <div className="h-px w-10 bg-amber/50" />
          <span className="font-mono text-xs text-amber/50 tracking-[0.25em] uppercase">
            BREAK TIME
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-offwhite mb-3">
            Hand Cricket.
          </h2>
          <p className="font-grotesk text-sm text-offwhite/40">
            A game I grew up playing. Now it lives in my portfolio.
          </p>
        </motion.div>

        {/* Game container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="border border-white/8 bg-bg-2 relative scanlines overflow-hidden"
        >
          {/* Top bar */}
          <div className="border-b border-white/8 px-5 py-3 flex items-center justify-between">
            <span className="font-mono text-xs text-amber">
              HAND_CRICKET.exe
            </span>
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber/60" />
            </div>
          </div>

          <div className="p-6 min-h-[420px] flex flex-col">
            <AnimatePresence mode="wait">
              
              {/* ── INTRO ── */}
              {phase === "intro" && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-6"
                >
                  <div className="font-mono text-xs text-offwhite/40 space-y-1">
                    <p>HOW TO PLAY:</p>
                    <p className="pl-4 text-offwhite/30">
                      1. Win the toss by guessing the sum's parity (Odd or Even).
                    </p>
                    <p className="pl-4 text-offwhite/30">
                      2. When batting, pick a number (1-6).
                    </p>
                    <p className="pl-4 text-offwhite/30">
                      3. If the CPU picks the SAME number, you are OUT.
                    </p>
                    <p className="pl-4 text-offwhite/30">
                      4. If numbers differ, you score the number you threw.
                    </p>
                    <p className="pl-4 text-offwhite/30">
                      5. {MAX_WICKETS} wickets per innings. Protect your wicket.
                    </p>
                  </div>
                  <button
                    data-hover
                    onClick={() => setPhase("toss")}
                    className="self-start font-mono text-sm text-amber border border-amber/30 px-6 py-3 hover:bg-amber/10 hover:border-amber/60 transition-all"
                  >
                    START MATCH →
                  </button>
                </motion.div>
              )}

              {/* ── TOSS ── */}
              {phase === "toss" && (
                <motion.div
                  key="toss"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-6"
                >
                  {!tossResult ? (
                    <>
                      {/* Parity choice */}
                      <div>
                        <p className="font-mono text-xs text-offwhite/30 mb-2">
                          1. CALL TOSS PARITY:
                        </p>
                        <div className="flex gap-3">
                          {(["ODD", "EVEN"] as Parity[]).map((p) => (
                            <button
                              key={p}
                              data-hover
                              onClick={() => setSelectedParity(p)}
                              className={`font-mono text-sm px-5 py-2 border transition-all ${
                                selectedParity === p
                                  ? "border-amber bg-amber/15 text-amber"
                                  : "border-white/10 text-offwhite/40 hover:border-white/20"
                              }`}
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Number choice */}
                      <div>
                        <p className="font-mono text-xs text-offwhite/30 mb-2">
                          2. THROW NUMBER FOR TOSS:
                        </p>
                        <div className="flex gap-2">
                          {NUMS.map((n) => (
                            <button
                              key={n}
                              data-hover
                              onClick={() => setSelectedNum(n)}
                              className={`w-10 h-10 font-mono text-sm border transition-all ${
                                selectedNum === n
                                  ? "border-amber bg-amber/15 text-amber"
                                  : "border-white/10 text-offwhite/40 hover:border-white/20"
                              }`}
                            >
                              {n}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        data-hover
                        onClick={handleToss}
                        disabled={!selectedParity || !selectedNum || waiting}
                        className="self-start font-mono text-sm text-amber border border-amber/30 px-5 py-2.5 hover:bg-amber/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      >
                        {waiting ? "FLIPPING..." : "TOSS COIN →"}
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center flex-1 min-h-[200px]">
                      <p className="font-mono text-sm text-amber animate-pulse text-center">
                        {tossResult}
                      </p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* ── BATTING ── */}
              {phase === "batting" && (
                <motion.div
                  key="batting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-5 flex-1"
                >
                  {/* Scoreboard */}
                  <div className="grid grid-cols-2 gap-4">
                    <ScoreCard
                      label="YOU"
                      score={playerScore}
                      wickets={playerWickets}
                      active
                    />
                    <ScoreCard
                      label="CPU"
                      score={computerScore}
                      wickets={computerWickets}
                      active={false}
                    />
                  </div>

                  {/* Wickets */}
                  <div className="flex gap-1.5 items-center">
                    <span className="font-mono text-xs text-offwhite/30 mr-1">
                      WICKETS:
                    </span>
                    {Array.from({ length: MAX_WICKETS }).map((_, i) => (
                      <span
                        key={i}
                        className={`w-2 h-5 ${
                          i < playerWickets ? "bg-offwhite/20" : "bg-amber/70"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Last result */}
                  <div className="h-6">
                    <AnimatePresence>
                      {lastResult && (
                        <motion.p
                          key={lastResult + Math.random()}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className={`font-mono text-base font-bold ${
                            lastResult.includes("OUT") ? "text-offwhite/50" : "text-amber"
                          }`}
                        >
                          {lastResult}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Number choice (NO PARITY NEEDED HERE) */}
                  <div>
                    <p className="font-mono text-xs text-offwhite/30 mb-2">
                      THROW NUMBER:
                    </p>
                    <div className="flex gap-2">
                      {NUMS.map((n) => (
                        <button
                          key={n}
                          data-hover
                          onClick={() => setSelectedNum(n)}
                          className={`w-10 h-10 font-mono text-sm border transition-all ${
                            selectedNum === n
                              ? "border-amber bg-amber/15 text-amber"
                              : "border-white/10 text-offwhite/40 hover:border-white/20"
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bowl button */}
                  <button
                    data-hover
                    onClick={handleBowl}
                    disabled={!selectedNum || waiting}
                    className="self-start font-mono text-sm text-amber border border-amber/30 px-5 py-2.5 hover:bg-amber/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    {waiting ? "..." : "BAT →"}
                  </button>

                  {/* Log */}
                  {gameLog.length > 0 && (
                    <div className="border-t border-white/6 pt-3 space-y-1">
                      {gameLog.map((log, i) => (
                        <p
                          key={i}
                          className={`font-mono text-xs ${
                            i === 0 ? "text-offwhite/60" : "text-offwhite/25"
                          }`}
                        >
                          {log}
                        </p>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* ── COMPUTER BATTING ── */}
              {phase === "computer-batting" && (
                <motion.div
                  key="comp-batting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col gap-5 flex-1"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <ScoreCard label="YOU" score={playerScore} wickets={playerWickets} active={false} />
                    <ScoreCard label="CPU" score={computerScore} wickets={computerWickets} active />
                  </div>

                  <p className="font-mono text-xs text-amber animate-pulse">
                    CPU IS CHASING {playerScore + 1} TO WIN...
                  </p>

                  <div className="space-y-1">
                    {gameLog.map((log, i) => (
                      <p key={i} className={`font-mono text-xs ${i === 0 ? "text-offwhite/60" : "text-offwhite/25"}`}>
                        {log}
                      </p>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── RESULT ── */}
              {phase === "result" && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center flex-1 gap-6 text-center"
                >
                  <div>
                    <p className="font-mono text-xs text-offwhite/30 mb-3 tracking-widest">
                      MATCH RESULT
                    </p>
                    <p className="font-serif text-5xl text-offwhite mb-2">
                      {playerScore > computerScore ? (
                        <span className="text-amber">YOU WIN</span>
                      ) : playerScore < computerScore ? (
                        "CPU WINS"
                      ) : (
                        "DRAW"
                      )}
                    </p>
                    <p className="font-mono text-sm text-offwhite/50">
                      You: {playerScore} — CPU: {computerScore}
                    </p>
                    {playerScore > computerScore && (
                      <p className="font-mono text-xs text-amber/60 mt-2">
                        by {playerScore - computerScore} runs
                      </p>
                    )}
                  </div>

                  {achievements.length > 0 && (
                    <div className="border border-amber/20 px-6 py-3 space-y-1">
                      <p className="font-mono text-xs text-amber/50 mb-2">
                        ACHIEVEMENTS
                      </p>
                      {achievements.map((id) => {
                        const a = ACHIEVEMENTS.find((x) => x.id === id);
                        return a ? (
                          <p key={id} className="font-mono text-xs text-offwhite/50">
                            🏆 {a.label} — {a.desc}
                          </p>
                        ) : null;
                      })}
                    </div>
                  )}

                  <button
                    data-hover
                    onClick={resetGame}
                    className="font-mono text-sm text-amber border border-amber/30 px-5 py-2.5 hover:bg-amber/10 transition-all"
                  >
                    PLAY AGAIN →
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Achievement toast */}
        <AnimatePresence>
          {newAchievement && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-6 right-6 z-50 bg-bg-2 border border-amber/30 px-4 py-3 shadow-lg"
            >
              <p className="font-mono text-xs text-amber mb-0.5">
                🏆 ACHIEVEMENT UNLOCKED
              </p>
              <p className="font-mono text-xs text-offwhite/60">
                {newAchievement.label} — {newAchievement.desc}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
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
    <div
      className={`border px-4 py-3 transition-colors ${
        active ? "border-amber/30 bg-amber/5" : "border-white/8"
      }`}
    >
      <p
        className={`font-mono text-xs mb-1 ${
          active ? "text-amber/60" : "text-offwhite/30"
        }`}
      >
        {label}
      </p>
      <p className="font-mono text-3xl text-offwhite">{score}</p>
      <p className="font-mono text-xs text-offwhite/30 mt-0.5">
        {wickets}/{MAX_WICKETS} wkts
      </p>
    </div>
  );
}