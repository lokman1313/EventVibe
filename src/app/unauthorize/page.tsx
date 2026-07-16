"use client";

import NextLink from "next/link";
import { Button } from "@heroui/react";
import { HiShieldCheck } from "react-icons/hi2"; // একটি চমৎকার সিকিউরিটি লক আইকন

export default function UnauthorizedPage() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-10 bg-gray-50 dark:bg-[#0d0d0e] bg-gradient-to-b from-transparent to-gray-100 dark:to-black transition-colors duration-300 overflow-hidden">
      
      {/* ব্যাকগ্রাউন্ড গ্লোয়িং অর্বস (শুধুমাত্র ডার্ক মোডে ভিজিবল) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[300px] w-[300px] sm:h-[450px] sm:w-[450px] rounded-full bg-red-500/5 dark:bg-violet-500/10 blur-[120px] hidden dark:block" />
      <div className="absolute bottom-10 right-10 -z-10 h-[200px] w-[200px] rounded-full bg-violet-500/5 blur-[100px] hidden dark:block" />

      {/* মেইন কন্টেইনার কার্ড */}
      <div className="w-full max-w-md rounded-2xl border border-gray-200 dark:border-white/10 bg-white/90 dark:bg-[#121214]/80 backdrop-blur-xl shadow-xl dark:shadow-2xl transition-all duration-300 hover:border-violet-500/20 dark:hover:border-violet-500/20 text-center">
        <div className="p-8 sm:p-10 flex flex-col items-center">
          
          {/* লক/সিকিউরিটি আইকন অ্যানিমেশন সহ */}
          <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-violet-100 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 ring-8 ring-violet-500/5 dark:ring-violet-500/10">
            <HiShieldCheck className="h-10 w-10 animate-pulse" />
          </div>

          {/* টেক্সট কন্টেন্ট */}
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Access <span className="text-violet-600 dark:text-violet-400">Denied</span>
          </h1>
          
          <p className="mt-4 text-base text-gray-500 dark:text-zinc-400 leading-relaxed">
            Oops! You don&apos;t have permission to view this page. It seems your current account role is restricted from accessing this route.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row w-full gap-3 justify-center">
            {/* হোম পেজে যাওয়ার বাটন */}
            <NextLink href="/" className="w-full sm:flex-1">
              <Button className="w-full h-11 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl transition duration-200 shadow-lg shadow-violet-500/10 active:scale-[0.98]">
                Go to Home
              </Button>
            </NextLink>

            {/* লগআউট/লগইন বাটন */}
            <NextLink href="/login" className="w-full sm:flex-1">
              <Button 
                variant="bordered"
                className="w-full h-11 border-gray-200 dark:border-white/10 text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-900 font-semibold rounded-xl transition duration-200"
              >
                Sign In/Switch Account
              </Button>
            </NextLink>
          </div>

          {/* হেল্প ডেক্স টেক্সট */}
          <p className="mt-8 text-xs text-gray-400 dark:text-zinc-500">
            If you believe this is an error, please contact EventVibe Support.
          </p>

        </div>
      </div>
    </section>
  );
}