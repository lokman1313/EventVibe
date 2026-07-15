"use client";

import { motion } from "framer-motion";
import {
  FaMusic,
  FaHandshake,
  FaLaptopCode,
  FaMicrophone,
} from "react-icons/fa";

const services = [
  {
    icon: FaMusic,
    title: "Concerts & Shows",
    description:
      "Full-scale concert planning, ticketing, sound management, and crowd control setups.",
  },
  {
    icon: FaLaptopCode,
    title: "Corporate Events",
    description:
      "Professional conferences, tech summits, workshops, and business networking meetups.",
  },
  {
    icon: FaHandshake,
    title: "Social Gatherings",
    description:
      "Private parties, wedding management, community carnivals, and cultural festivals.",
  },
  {
    icon: FaMicrophone,
    title: "Seminars & Panel Discussions",
    description:
      "Hassle-free audio visual setup, stage management, and digital ticketing solutions.",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 bg-white dark:bg-zinc-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-violet-600 dark:text-violet-400 uppercase">
            What We Do
          </span>

          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            Our Professional Services
          </h2>

          <p className="mt-4 text-sm sm:text-base text-gray-500 dark:text-gray-400">
            We offer specialized event solutions tailored to make every occasion
            unforgettable.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? -20 : 20,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                  margin: "-100px",
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className="flex gap-6 rounded-2xl border border-gray-100 bg-gray-50 p-6 transition-all duration-300 hover:border-violet-500/20 dark:border-zinc-800/80 dark:bg-zinc-900/40 sm:p-8"
              >
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-500/10">
                  <Icon className="text-3xl text-violet-600 dark:text-violet-400" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400 sm:text-base">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}