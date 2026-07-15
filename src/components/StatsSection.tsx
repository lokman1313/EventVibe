"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "50k+", label: "Tickets Sold" },
  { value: "450+", label: "Events Hosted" },
  { value: "120+", label: "Verified Organizers" },
  { value: "99.8%", label: "Satisfaction Rate" }
];

export default function StatsSection() {
  return (
    <section className="py-16 bg-violet-600 dark:bg-violet-950 text-white relative overflow-hidden">
      {/* ডেকোরেটিভ গ্লো */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 rounded-full bg-white/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col gap-1"
            >
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
                {stat.value}
              </h2>
              <p className="text-xs sm:text-sm font-medium text-violet-100 dark:text-violet-300 uppercase tracking-widest mt-1">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}