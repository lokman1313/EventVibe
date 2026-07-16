"use client";

import { motion, Variants } from "framer-motion";
import { HiCalendarDays } from "react-icons/hi2";

// ─── Animation Variants (Type-Safe for TS) ───────────────────────────────────

const ringVariants: Variants = {
  animate: {
    rotate: 360,
    transition: { repeat: Infinity, duration: 4, ease: "linear" },
  },
};

const reverseRingVariants: Variants = {
  animate: {
    rotate: -360,
    transition: { repeat: Infinity, duration: 6, ease: "linear" },
  },
};

const pulseVariants: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.8, 1, 0.8],
    transition: { repeat: Infinity, duration: 3, ease: "easeInOut" },
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function HeroLoadingSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4 py-16 bg-gray-50 dark:bg-[#0d0d0e] bg-gradient-to-b from-transparent to-gray-100 dark:to-black transition-colors duration-300 overflow-hidden">
      
      {/* ── Background Glow & Orbs ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[350px] w-[350px] sm:h-[500px] sm:w-[500px] rounded-full bg-violet-500/10 blur-[120px] hidden dark:block" />

      {/* ── Animated Ring Visual (Centered) ── */}
      <div className="flex items-center justify-center relative py-12">
        <motion.div 
          className="relative flex items-center justify-center h-[300px] w-[300px] sm:h-[400px] sm:w-[400px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Outermost ambient ring */}
          <motion.div
            className="absolute h-[280px] w-[280px] sm:h-[360px] sm:w-[360px] rounded-full border border-violet-500/5 dark:border-violet-500/10"
            animate={{ scale: [1, 1.04, 1], opacity: [0.4, 0.2, 0.4] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />

          {/* Outer slow reverse ring */}
          <motion.div
            className="absolute h-[220px] w-[220px] sm:h-[300px] sm:w-[300px] rounded-full border-2 border-transparent"
            style={{
              borderTopColor: "rgba(139, 92, 246, 0.2)",
              borderLeftColor: "rgba(139, 92, 246, 0.2)",
            }}
            variants={reverseRingVariants}
            animate="animate"
          />

          {/* Primary spinning violet ring */}
          <motion.div
            className="absolute h-[180px] w-[180px] sm:h-[240px] sm:w-[240px] rounded-full border-[3px] border-transparent"
            style={{
              borderTopColor: "rgb(139, 92, 246)",
              borderRightColor: "rgba(139, 92, 246, 0.5)",
            }}
            variants={ringVariants}
            animate="animate"
          />

          {/* Static track ring */}
          <div className="absolute h-[180px] w-[180px] sm:h-[240px] sm:w-[240px] rounded-full border-[3px] border-violet-500/10" />

          {/* Floating Glassmorphic Event Card (Inside Ring) */}
          <motion.div 
            className="absolute p-5 w-48 sm:w-56 rounded-2xl border border-white/20 dark:border-white/10 bg-white/70 dark:bg-[#121214]/75 backdrop-blur-xl shadow-xl dark:shadow-2xl flex flex-col items-center text-center"
            variants={pulseVariants}
            animate="animate"
          >
            <div className="h-12 w-12 rounded-xl bg-violet-100 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-3.5">
              <HiCalendarDays className="h-6 w-6" />
            </div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">Music Festival 2026</h3>
            <p className="text-xs text-violet-600 dark:text-violet-400 font-medium mt-1">Live in Dhaka</p>
            
            {/* Infinite loading bar */}
            <div className="w-full mt-4 h-1 rounded-full bg-gray-100 dark:bg-white/10 overflow-hidden">
              <motion.div 
                className="h-full bg-violet-600 dark:bg-violet-500 rounded-full"
                animate={{ width: ["0%", "100%"] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              />
            </div>
            <div className="flex justify-between w-full mt-2 text-[10px] text-gray-400 dark:text-zinc-500 font-medium">
              <span>Sold Out</span>
              <span>100%</span>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}