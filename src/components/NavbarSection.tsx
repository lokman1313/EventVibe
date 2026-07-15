"use client";

import { useState } from "react";
import NextLink from "next/link";
import { Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { ThemeSwitch } from "./ThemeSwitch";

export default function NavbarSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // রোলের উপর ভিত্তি করে নেভিগেশন ডিফাইন করা
  const getNavItems = () => {
    // ইউজার লগইন না থাকলে বা রোল না থাকলে ডিফল্ট মেনু
    if (!user || !user.role) {
      return [
        { label: "Home", href: "/" },
        { label: "Browse Events", href: "/events" },
        { label: "About Us", href: "/about" },
      ];
    }

    const role = user.role.toLowerCase();

    if (role === "admin") {
      return [
        { label: "Home", href: "/" },
        { label: "Browse Events", href: "/events" },
        { label: "Create Event", href: "/create-event" },
        { label: "Users", href: "/all-users" },
        { label: "Analytics", href: "/analytics" },
      ];
    }

    if (role === "client" || role === "user") {
      return [
        { label: "Home", href: "/" },
        { label: "Browse Events", href: "/events" },
        { label: "About Us", href: "/about" },
        { label: "My Bookings", href: "/bookings" },
        { label: "Profile", href: "/profile" },
      ];
    }

    // অন্য যেকোনো রোলের জন্য সেফটি ফলব্যাক
    return [
      { label: "Home", href: "/" },
      { label: "Browse Events", href: "/events" },
    ];
  };

  // navItems ডিফাইন করার সময় নিশ্চিত হওয়া যাতে এটি কখনো undefined না হয়
  const navItems = getNavItems() || [];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/80 dark:border-white/10 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md transition-colors duration-300">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* লোগো সেকশন */}
          <NextLink href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Event<span className="text-violet-600 group-hover:text-violet-400 transition-colors">Vibe</span>
            </span>
          </NextLink>

          {/* ডেস্কটপ রাইট কন্টেন্ট (মেনু + থিম সুইচ + অথ) */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-6">
              {navItems.map((item) => (
                <li key={item.label}>
                  <NextLink
                    href={item.href}
                    className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-violet-500 dark:hover:text-violet-400 transition-colors"
                  >
                    {item.label}
                  </NextLink>
                </li>
              ))}
            </ul>

            <div className="h-5 w-px bg-gray-200 dark:bg-white/10" />
            
            {/* থিম সুইচ */}
            <ThemeSwitch />

            <div className="h-5 w-px bg-gray-200 dark:bg-white/10" />

            {/* অথ সেকশন */}
            {user ? (
              <Button
                onPress={() => authClient.signOut()}
                className="bg-red-500/10 text-red-500 dark:text-red-400 hover:bg-red-500/20 font-medium"
                size="sm"
                variant="flat"
              >
                Logout
              </Button>
            ) : (
              <div className="flex items-center gap-4">
                <NextLink href="/login" className="text-sm font-medium text-violet-600 dark:text-violet-500 transition-colors">
                  Sign In
                </NextLink>
                <NextLink href="/signup">
                  <Button className="bg-violet-500 hover:bg-violet-600 dark:bg-violet-600 dark:hover:bg-violet-700 text-white font-medium shadow-md shadow-violet-500/10">
                    Get Started
                  </Button>
                </NextLink>
              </div>
            )}
          </div>

          {/* মোবাইল কন্ট্রোলস (থিম সুইচ + হ্যামবার্গার মেনু) */}
          <div className="flex md:hidden items-center gap-4">
            <ThemeSwitch />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* মোবাইল ড্রপডাউন মেনু */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-screen border-t border-gray-100 dark:border-white/5 py-4" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-2 px-2 pb-2">
            {navItems.map((item) => (
              <NextLink
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-base font-medium text-gray-600 dark:text-gray-300 hover:text-violet-500 dark:hover:text-violet-400 py-2.5 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-900 transition-all"
              >
                {item.label}
              </NextLink>
            ))}
            
            <div className="border-t border-gray-100 dark:border-white/5 pt-4 mt-2">
              {user ? (
                <Button
                  onPress={() => authClient.signOut()}
                  className="w-full bg-red-500/10 text-red-500 dark:text-red-400 font-medium py-6"
                  variant="flat"
                >
                  Logout
                </Button>
              ) : (
                <div className="flex flex-col gap-3">
                  <NextLink href="/login" onClick={() => setIsMenuOpen(false)} className="text-center font-medium text-violet-600 dark:text-violet-400 py-2.5 rounded-lg border border-gray-200 dark:border-zinc-800">
                    Sign In
                  </NextLink>
                  <NextLink href="/signup" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-violet-600 text-white font-medium py-6 shadow-sm">
                      Get Started
                    </Button>
                  </NextLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}