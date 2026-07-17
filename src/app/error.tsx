"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { FiHome, FiRotateCcw, FiAlertCircle } from "react-icons/fi";

interface ErrorPageProps {
  error?: Error & { digest?: string };
  reset?: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ error, reset }) => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-100 flex items-center justify-center px-4 transition-colors duration-200">
      {/* Background Decorative Blur Gradients */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-violet-500/10 dark:bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-fuchsia-500/10 dark:bg-fuchsia-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-lg text-center space-y-8 relative z-10">
        {/* Animated Icon Container */}
        <div className="relative inline-flex items-center justify-center p-6 rounded-3xl border border-violet-500/20 bg-white dark:bg-zinc-900/40 shadow-xl shadow-violet-500/5 backdrop-blur-xl group">
          <FiAlertCircle className="text-6xl text-violet-500 dark:text-violet-400 animate-pulse" />
          <div className="absolute inset-0 rounded-3xl border border-violet-500/30 scale-105 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none" />
        </div>

        {/* Error Typography */}
        <div className="space-y-3">
          <h1 className="text-7xl md:text-8xl font-black tracking-tighter bg-gradient-to-r from-slate-900 via-violet-600 to-fuchsia-600 dark:from-white dark:via-zinc-200 dark:to-violet-400 bg-clip-text text-transparent">
            Oops!
          </h1>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Something went wrong vibe-wise.
          </h2>
          <p className="text-slate-500 dark:text-zinc-400 text-sm md:text-base max-w-sm mx-auto leading-relaxed">
            {error?.message || "The page you are looking for doesn't exist or an unexpected connection error occurred."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-sm mx-auto">
          {reset ? (
            // যদি Next.js Error Boundary থেকে reset হ্যান্ডলার থাকে
            <Button
              onPress={() => reset()}
              className="w-full sm:flex-1 py-6 font-bold text-white bg-violet-600 hover:bg-violet-700 shadow-xl shadow-violet-600/10 rounded-2xl transition-all flex items-center justify-center gap-2"
            >
              <FiRotateCcw /> Try Again
            </Button>
          ) : (
            // নর্মাল 404 বা ব্যাক বাটনের জন্য
            <Button
              onPress={() => router.back()}
              className="w-full sm:flex-1 py-6 font-bold text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/10 bg-white dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-2xl transition-all flex items-center justify-center gap-2"
            >
              <FiRotateCcw /> Go Back
            </Button>
          )}

          <Link href="/" className="w-full sm:flex-1">
            <Button
              className="w-full py-6 font-bold text-white bg-violet-600 hover:bg-violet-700 shadow-xl shadow-violet-600/10 rounded-2xl transition-all flex items-center justify-center gap-2"
            >
              <FiHome /> Go Home
            </Button>
          </Link>
        </div>

        {/* Footer info text */}
        <div className="text-xs text-slate-400 dark:text-zinc-600 pt-4">
          Returned to you by <span className="font-semibold text-violet-500/80">EventVibe</span> Core
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;