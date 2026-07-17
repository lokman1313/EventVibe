"use client";

import { useState } from "react";
import { Button, Input } from "@heroui/react";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPaperPlane,
} from "react-icons/fa";

export default function ComingSoonPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) return;

    setIsSubmitted(true);
    setEmail("");
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-4 py-12 transition-colors duration-300 dark:bg-zinc-950">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/4 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[120px] dark:bg-violet-500/5" />
      <div className="absolute bottom-10 right-10 -z-10 h-[250px] w-[250px] rounded-full bg-fuchsia-500/10 blur-[100px] dark:bg-fuchsia-500/5" />

      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-10 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-5"
        >
          <span className="rounded-full bg-violet-50 px-4 py-2 text-sm font-bold uppercase tracking-[0.2em] text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
            🚀 Coming Soon
          </span>

          <h1 className="text-5xl font-black tracking-tight text-gray-900 dark:text-white sm:text-7xl">
            Event<span className="text-violet-600">Vibe</span>
          </h1>

          <p className="mx-auto max-w-xl text-base leading-7 text-gray-500 dark:text-gray-400">
            We're building something extraordinary for ticket booking, event
            management, and unforgettable live experiences.
            <br />
            <span className="mt-2 block font-semibold text-violet-600 dark:text-violet-400">
              Our website will launch soon.
            </span>
          </p>
        </motion.div>

        {/* Notify Form */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-md"
        >
          {isSubmitted ? (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-600 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
              🎉 Thank you! We'll notify you as soon as EventVibe launches.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1"
                
              />

              <Button
                type="submit"
                className="h-12 rounded-xl bg-violet-600 px-6 font-semibold text-white hover:bg-violet-700"
              >
                Notify Me<FaPaperPlane size={12} className="ml-2 inline" />
              </Button>
            </form>
          )}
        </motion.div>

        {/* Social */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
            Follow Our Journey
          </p>

          <div className="flex justify-center gap-4">
            {[
              {
                icon: <FaFacebookF size={14} />,
                href: "https://www.facebook.com/lokman.hossen.697687",
              },
              {
                icon: <FaTwitter size={14} />,
                href: "#",
              },
              {
                icon: <FaInstagram size={14} />,
                href: "#",
              },
              {
                icon: <FaLinkedinIn size={14} />,
                href: "https://www.linkedin.com/in/lokman-hossen-dev",
              },
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-gray-500 transition-all duration-300 hover:scale-105 hover:bg-violet-600 hover:text-white dark:border-zinc-800 dark:bg-zinc-900 dark:text-gray-400"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}