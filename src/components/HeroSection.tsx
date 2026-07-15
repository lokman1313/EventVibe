"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaChevronDown, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import NextLink from "next/link";
import Link from "next/link";

// স্লাইডারের জন্য ডেমো ইভেন্ট ডেটা (EventVibe থিমের সাথে সামঞ্জস্যপূর্ণ)
const featuredEvents = [
  {
    id: 1,
    title: "Rock Beat Festival 2026",
    date: "Dec 18, 2026",
    location: "Dhaka, Bangladesh",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop",
    category: "Concert"
  },
  {
    id: 2,
    title: "Tech Summit & Expo",
    date: "Nov 05, 2026",
    location: "Dhaka, Bangladesh",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
    category: "Workshop"
  },
  {
    id: 3,
    title: "Art & Fusion Carnival",
    date: "Oct 12, 2026",
    location: "Chittagong, Bangladesh",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
    category: "Festival"
  }
];

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  // স্লাইডার অটো-প্লে করার জন্য ইফেক্ট (প্রতি ৫ সেকেন্ডে পরিবর্তন হবে)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % featuredEvents.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // পরবর্তী সেকশনে স্ক্রোল করার জন্য ফাংশন
  const scrollToNextSection = () => {
    const nextSection = document.getElementById("features-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-[65vh] min-h-[500px] max-h-[750px] flex items-center justify-center overflow-hidden bg-white dark:bg-zinc-950 transition-colors duration-300">
      
      {/* ব্যাকগ্রাউন্ড ডেকোরেティブ গ্লো গ্রেডিয়েন্ট (Violet Thump) */}
      <div className="absolute top-0 left-1/4 -z-10 h-[300px] w-[300px] rounded-full bg-violet-500/10 blur-[100px] dark:bg-violet-500/5" />
      <div className="absolute bottom-10 right-1/4 -z-10 h-[300px] w-[300px] rounded-full bg-fuchsia-500/10 blur-[100px] dark:bg-fuchsia-500/5" />

      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-between py-6">
        
        {/* মেইন কন্টেন্ট গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center my-auto">
          
          {/* বাম পাশ: কন্টেন্ট ও CTA */}
          <div className="md:col-span-7 flex flex-col gap-6 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 mb-4">
                ✨ Live the moment, feel the vibe
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-gray-900 dark:text-white">
                Discover The Best <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500 dark:from-violet-400 dark:to-fuchsia-400">
                  Events
                </span> Around You
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto md:mx-0"
            >
              Whether it&apos;s music concerts, tech conferences, or art festivals—find and book your tickets to amazing experiences instantly.
            </motion.p>

            {/* CTA বাটনসমূহ (Violet Theme) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"
            >
              <Link 
                
                href="/events"
                
                className="bg-violet-600 hover:bg-violet-700 dark:bg-violet-600 dark:hover:bg-violet-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg shadow-violet-500/20 w-full sm:w-auto flex justify-center items-center gap-2"
              >
                Explore Events <FaArrowRight />
              </Link>
              
              <Link 
                
                href="/about"
                
                className="border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-gray-300 font-semibold py-4 px-6 rounded-xl w-full sm:w-auto hover:bg-gray-50 dark:hover:bg-zinc-900"
              >
                About US
              </Link>
            </motion.div>
          </div>

          {/* ডান পাশ: ইন্টারঅ্যাক্টিভ ইভেন্ট স্লাইডার */}
          <div className="hidden md:col-span-5 md:flex flex-col items-center justify-center relative">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-gray-100 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full"
                >
                  {/* ইভেন্ট ইমেজ */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featuredEvents[activeSlide].image}
                    alt={featuredEvents[activeSlide].title}
                    className="w-full h-full object-cover"
                  />
                  {/* ইমেজ ওভারলে গ্রেডিয়েন্ট */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* কার্ডের ভেতরে থাকা ইভেন্ট ডিটেইলস */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white flex flex-col gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-violet-400">
                      {featuredEvents[activeSlide].category}
                    </span>
                    <h3 className="text-xl font-bold line-clamp-1">
                      {featuredEvents[activeSlide].title}
                    </h3>
                    <div className="flex flex-col gap-1 text-xs text-gray-300 mt-1">
                      <span className="flex items-center gap-1.5">
                        <FaCalendarAlt size={12} className="text-violet-400" />
                        {featuredEvents[activeSlide].date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FaMapMarkerAlt size={12} className="text-violet-400" />
                        {featuredEvents[activeSlide].location}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* স্লাইডার ডট ইন্ডিকেটরস (Violet Accent) */}
            <div className="flex gap-2 mt-4">
              {featuredEvents.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeSlide === index ? "w-6 bg-violet-500" : "w-2 bg-gray-300 dark:bg-zinc-800"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

        </div>

        {/* বটম ভিজ্যুয়াল ফ্লো ইন্ডিকেটর */}
        <div className="flex justify-center pt-2">
          <motion.button
            onClick={scrollToNextSection}
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1 text-xs text-gray-400 hover:text-violet-500 dark:hover:text-violet-400 transition-colors"
          >
            <span>Explore Features</span>
            <FaChevronDown className="text-sm" />
          </motion.button>
        </div>

      </div>
    </section>
  );
}