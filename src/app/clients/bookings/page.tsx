"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { FiCpu, FiArrowLeft, FiHardDrive } from "react-icons/fi";

const Page = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-100 flex items-center justify-center px-4 transition-colors duration-200">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-violet-500/10 dark:bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md text-center space-y-8 relative z-10">
        
        {/* Animated Icon Container */}
        <div className="relative inline-flex items-center justify-center p-6 rounded-3xl border border-violet-500/20 bg-white dark:bg-zinc-900/40 shadow-xl shadow-violet-500/5 backdrop-blur-xl group">
          <FiCpu className="text-5xl text-violet-500 dark:text-violet-400 animate-spin [animation-duration:10s]" />
          <div className="absolute inset-0 rounded-3xl border border-violet-500/30 scale-105 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none" />
        </div>

        {/* Typography */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 text-violet-600 dark:text-violet-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            Feature in Progress
          </div>
          
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white mt-2">
            Cooking Something Big!
          </h1>
          <p className="text-slate-500 dark:text-zinc-400 text-sm md:text-base max-w-sm mx-auto leading-relaxed">
            We are currently building and optimizing this section to give you the best possible event vibe experience. Stay tuned!
          </p>
        </div>

        {/* Progress Visual */}
        <div className="w-full max-w-xs mx-auto bg-slate-200 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
          <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-full w-2/3 rounded-full animate-pulse" />
        </div>

        {/* Action Button */}
        <div className="max-w-xs mx-auto">
          <Button
            onPress={() => router.back()}
            className="w-full py-6 font-bold text-white bg-violet-600 hover:bg-violet-700 shadow-xl shadow-violet-600/10 rounded-2xl transition-all flex items-center justify-center gap-2"
          >
            <FiArrowLeft /> Go Back Safely
          </Button>
        </div>

        {/* Footer info text */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 dark:text-zinc-600 pt-4">
          <FiHardDrive /> EventVibe Environment // Dev Mode
        </div>
      </div>
    </div>
  );
};

export default Page;