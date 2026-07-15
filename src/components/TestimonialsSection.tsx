"use client";

import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Lokman Hossen",
    role: "Lead Event Organizer",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    quote: "EventVibe transformed how we managed our tickets. Booking is completely transparent and checkout is unbelievably smooth!",
    stars: 5
  },
  {
    name: "Ayesha Rahman",
    role: "Regular Attendee",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop",
    quote: "I love the QR-based check-in! No paper tickets, no queues—just quick entry and pure vibes. Highly recommended!",
    stars: 5
  },
  {
    name: "Tanvir Anjum",
    role: "Concert Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    quote: "The dashboard analytics on EventVibe helped us understand our audience demographics and scale ticketing seamlessly.",
    stars: 5
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white dark:bg-zinc-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-violet-600 dark:text-violet-400 uppercase">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-2">
            What Our Community Says
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-gray-50 dark:bg-zinc-900/30 border border-gray-100 dark:border-zinc-800/80 flex flex-col justify-between"
            >
              <div>
                <FaQuoteLeft className="text-3xl text-violet-500/20 mb-4" />
                <p className="text-gray-600 dark:text-gray-400 italic text-sm sm:text-base leading-relaxed mb-6">
                  &ldquo;{test.quote}&rdquo;
                </p>
              </div>
              
              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-200/50 dark:border-zinc-800/50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={test.image}
                  alt={test.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-violet-500/50"
                />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm">{test.name}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-500">{test.role}</p>
                  <div className="flex items-center gap-1 mt-1 text-amber-500 text-xs">
                    {[...Array(test.stars)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}