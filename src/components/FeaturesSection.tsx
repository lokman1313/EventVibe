"use client";

import { motion } from "framer-motion";
import { 
  FaCalendarPlus, 
  FaTicketAlt, 
  FaQrcode, 
  FaUsers, 
  FaChartBar, 
  FaShieldAlt 
} from "react-icons/fa";

// ফিচার আইটেমগুলোর লিস্ট
const features = [
  {
    icon: <FaCalendarPlus className="text-2xl text-violet-600 dark:text-violet-400" />,
    title: "Easy Event Creation",
    description: "Organizers can launch concerts, workshops, or festivals within minutes with our intuitive creation suite."
  },
  {
    icon: <FaTicketAlt className="text-2xl text-violet-600 dark:text-violet-400" />,
    title: "Seamless Ticketing",
    description: "Secure and swift ticket booking experience. Multiple payment options and instant confirmation."
  },
  {
    icon: <FaQrcode className="text-2xl text-violet-600 dark:text-violet-400" />,
    title: "Instant QR Check-in",
    description: "Speed up venue entry with secure, scannable QR tickets delivered directly to attendees' mail or profile."
  },
  {
    icon: <FaUsers className="text-2xl text-violet-600 dark:text-violet-400" />,
    title: "Community Hub",
    description: "Connect with like-minded event lovers, follow your favorite organizers, and build your social circle."
  },
  {
    icon: <FaChartBar className="text-2xl text-violet-600 dark:text-violet-400" />,
    title: "Real-time Analytics",
    description: "Track ticket sales, revenue streams, and demographic insights live from your organizer dashboard."
  },
  {
    icon: <FaShieldAlt className="text-2xl text-violet-600 dark:text-violet-400" />,
    title: "Secure & Trusted",
    description: "Built-in fraud protection, verified profiles, and secure payment processing for absolute peace of mind."
  }
];

// ফ্রেমার মোশনের গ্রিড প্যারেন্ট অ্যানিমেশন কনফিগ
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // একটির পর আরেকটি কার্ড পর্যায়ক্রমে অ্যানিমেট হবে
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function FeaturesSection() {
  return (
    <section 
      id="features-section" 
      className="relative w-full py-20 lg:py-28 bg-gray-50 dark:bg-zinc-900/30 transition-colors duration-300"
    >
      {/* ব্যাকগ্রাউন্ড ডেকোরেশন */}
      <div className="absolute top-1/2 left-0 -z-10 h-[250px] w-[250px] rounded-full bg-violet-500/5 blur-[80px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* সেকশন হেডার */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            <span className="text-xs font-bold tracking-widest text-violet-600 dark:text-violet-400 uppercase">
              Why EventVibe
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Packed with Powerful Features <br className="hidden sm:inline" /> 
              for Seamless Experiences
            </h2>
            <p className="text-base text-gray-500 dark:text-gray-400">
              Everything you need to host, discover, or attend outstanding events. We eliminate the friction so you can focus on the vibe.
            </p>
          </motion.div>
        </div>

        {/* ফিচার গ্রিড লেআউট */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }} // হোভার করলে সামান্য উপরে উঠবে
              className="flex flex-col gap-4 p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800/80 shadow-sm hover:shadow-md hover:border-violet-500/30 dark:hover:border-violet-500/20 transition-all duration-300"
            >
              {/* ফিচার আইকন কন্টেইনার */}
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-violet-50 dark:bg-violet-500/10 mb-2">
                {feature.icon}
              </div>

              {/* ফিচার টেক্সট */}
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}