"use client";

import { motion } from "framer-motion";
import { FaMusic, FaLaptop, FaTheaterMasks, FaFutbol, FaPalette } from "react-icons/fa";

const categories = [
  { name: "Music & Concerts", count: "14+ Active Events", icon: <FaMusic />, color: "from-violet-500 to-indigo-600" },
  { name: "Tech & Business", count: "8+ Active Events", icon: <FaLaptop />, color: "from-cyan-500 to-blue-600" },
  { name: "Arts & Theatre", count: "5+ Active Events", icon: <FaTheaterMasks />, color: "from-fuchsia-500 to-pink-600" },
  { name: "Sports & Fitness", count: "12+ Active Events", icon: <FaFutbol />, color: "from-emerald-500 to-teal-600" },
  { name: "Exhibitions", count: "6+ Active Events", icon: <FaPalette />, color: "from-orange-500 to-rose-600" }
];

export default function CategoriesSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-zinc-900/30 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-violet-600 dark:text-violet-400 uppercase">
              Browse by Interest
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-2">
              Explore Popular Categories
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-md">
            Find the perfect vibe for your next weekend. Filter down by your favorite genres instantly.
          </p>
        </div>

        {/* ৫টি ভিন্ন গ্রিড সেপ সহ মডার্ন ক্যাটাগরি গ্রিড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -6 }}
              className={`relative overflow-hidden rounded-2xl p-6 h-48 flex flex-col justify-between cursor-pointer shadow-sm group ${
                index === 0 || index === 1 ? "lg:col-span-3" : "lg:col-span-2"
              }`}
            >
              {/* ব্যাকগ্রাউন্ড গ্রেডিয়েন্ট এবং হোভার জুম ইফেক্ট */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-90 transition-transform duration-500 group-hover:scale-110`} />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
              
              <div className="relative text-white flex justify-between items-start">
                <div className="text-2xl p-3 bg-white/20 backdrop-blur-md rounded-xl">
                  {cat.icon}
                </div>
              </div>

              <div className="relative text-white">
                <h3 className="text-lg font-bold">{cat.name}</h3>
                <span className="text-xs text-white/80 mt-1 block">{cat.count}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}