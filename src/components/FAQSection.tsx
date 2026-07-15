"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "How do I purchase a ticket for an event?",
    answer: "Simply browse through our active events, click on your preferred event, select the number of tickets, and complete the secure payment process. You'll receive your QR ticket instantly on your email and profile dashboard."
  },
  {
    question: "Can I host and sell tickets for my own event?",
    answer: "Yes, absolutely! Anyone with an organizer account can create and host events. Go to the dashboard, click 'Create Event', fill out the details, set ticket tiers, and start selling immediately."
  },
  {
    question: "What is your refund policy?",
    answer: "Refund policies are determined individually by the event organizers. You can see the refund terms on each event page before purchase. Generally, ticket cancellations are accepted up to 48 hours prior to the event."
  },
  {
    question: "How does the entry process with QR codes work?",
    answer: "At the event entrance, simply open the QR ticket from your EventVibe app/email on your phone. The venue gate management team will scan your code to quickly verify and authorize your entry."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-zinc-900/30 transition-colors duration-300">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-widest text-violet-600 dark:text-violet-400 uppercase">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-2">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left font-bold text-gray-900 dark:text-white hover:text-violet-600 dark:hover:text-violet-400 transition-colors text-sm sm:text-base gap-4"
                >
                  <span>{faq.question}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaChevronDown className="text-gray-400" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-zinc-900 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}