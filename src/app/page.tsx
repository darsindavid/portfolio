"use client";

import { motion } from "framer-motion";

import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/ui/Navbar";
import ScrollRail from "@/components/ui/ScrollRail";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Timeline from "@/components/sections/Timeline";
import ProjectLab from "@/components/sections/ProjectLab";
import Arcade from "@/components/sections/Arcade";
import Terminal from "@/components/sections/Terminal";
import FutureVision from "@/components/sections/FutureVision";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <CustomCursor />
      {/* Film grain overlay */}
      <div className="film-grain" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeIn" }}
      >
        <Navbar />
        <ScrollRail />

        <main>
          <Hero />

          {/* Divider */}
          <div className="section-divider" />

          <About />

          <div className="section-divider" />

          <Timeline />

          <div className="section-divider" />

          <ProjectLab />

          <div className="section-divider" />

          <Arcade />

          <div className="section-divider" />

          <Terminal />

          <div className="section-divider" />

          <FutureVision />

          <div className="section-divider" />

          <Contact />
        </main>
      </motion.div>
    </>
  );
}