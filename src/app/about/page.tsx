"use client";

import { motion } from "framer-motion";
import { buttonVariants } from "@heroui/styles";
import { FaArrowRight, FaCalendarAlt, FaUser, FaCheckCircle } from "react-icons/fa";
import NextLink from "next/link";

// ডেমো ব্লগ ডাটা
const blogPosts = [
  {
    id: 1,
    title: "How to Plan a Music Festival in 2026: The Ultimate Guide",
    excerpt: "From securing venue permissions to managing massive crowds, discover the insider secrets to hosting a hit music festival.",
    date: "July 12, 2026",
    author: "Lokman Hossen",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=600&auto=format&fit=crop",
    category: "Planning"
  },
  {
    id: 2,
    title: "Why Seamless Ticketing is Critical for Event Success",
    excerpt: "A look into how digital entry check-ins, automated QR validation, and instant booking processes reduce gate queue times by 70%.",
    date: "June 28, 2026",
    author: "Sarah Kabir",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop",
    category: "Technology"
  },
  {
    id: 3,
    title: "Top 5 Event Styling Trends for This Autumn",
    excerpt: "Explore the most vibrant color palettes, sustainable installations, and interactive visual designs trending in ceremonies this year.",
    date: "May 15, 2026",
    author: "Farhan Ahmed",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop",
    category: "Design"
  }
];

export default function AboutAndBlogSection() {
  return (
    <section className="relative w-full py-20 lg:py-28 bg-white dark:bg-zinc-950 transition-colors duration-300 overflow-hidden">
      
      {/* ডেকোরেটিভ গ্লো */}
      <div className="absolute -top-10 -right-10 -z-10 h-[350px] w-[350px] rounded-full bg-violet-500/5 blur-[120px]" />
      <div className="absolute bottom-1/3 -left-10 -z-10 h-[350px] w-[350px] rounded-full bg-fuchsia-500/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-24 lg:gap-32">
        
        {/* ================= ABOUT US SUB-SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* বাম পাশ: ইমেজ কোলাজ গ্রিড */}
          <div className="lg:col-span-5 grid grid-cols-12 gap-4 h-[350px] sm:h-[400px]">
            <div className="col-span-8 h-full relative rounded-2xl overflow-hidden shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=500&auto=format&fit=crop" 
                alt="Concert crowd" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="col-span-4 flex flex-col gap-4 h-full">
              <div className="h-1/2 relative rounded-2xl overflow-hidden shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=300&auto=format&fit=crop" 
                  alt="Business summit" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-1/2 relative rounded-2xl overflow-hidden shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="https://images.unsplash.com/photo-1505232458627-a72317fac728?q=80&w=300&auto=format&fit=crop" 
                  alt="Event lights" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* ডান পাশ: কন্টেন্ট ও মিশন */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-xs font-bold tracking-widest text-violet-600 dark:text-violet-400 uppercase">
                Who We Are
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mt-2">
                We Connect People with <br />
                Unforgettable Experiences
              </h2>
            </motion.div>

            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed">
              At <strong>EventVibe</strong>, we believe life is a collection of moments, and the best ones are shared. Founded with a vision to revolutionize the event industry, we bridge the gap between passion and seamless organization. Whether you are searching for your next weekend concert or hosting a professional corporate tech summit, we provide the platform to make it happen flawlessly.
            </p>

            {/* কোর ভ্যালু লিস্ট */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-violet-600 dark:text-violet-400 text-lg mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">Host Seamlessly</h4>
                  <p className="text-xs sm:text-sm text-gray-500">Quickly launch ticketing, customize layouts, and manage gates.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-violet-600 dark:text-violet-400 text-lg mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">Attend Worry-Free</h4>
                  <p className="text-xs sm:text-sm text-gray-500">Secure ticket purchases and swift, paperless entry using QR codes.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <NextLink
                href="/about"
                className={buttonVariants({ variant: "primary" }) + " bg-violet-600 hover:bg-violet-700 text-white font-semibold py-6 px-8 rounded-xl inline-flex items-center gap-2"}
              >
                Learn More About Us
                <FaArrowRight />
              </NextLink>
            </div>
          </div>

        </div>


        {/* ================= BLOGS SUB-SECTION ================= */}
        <div>
          
          {/* ব্লগ সেকশন হেডার */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold tracking-widest text-violet-600 dark:text-violet-400 uppercase">
                Resources & News
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-2">
                Latest from EventVibe Blog
              </h2>
            </div>
            <NextLink
              href="/blog"
              className={buttonVariants({ variant: "outline" }) + " border-violet-600/30 dark:border-violet-500/20 text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-500/10 font-bold py-6 px-6 rounded-xl inline-flex items-center justify-center"}
            >
              See All Posts
            </NextLink>
          </div>

          {/* ৩ কলাম ব্লগ গ্রিড */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col rounded-2xl overflow-hidden border border-gray-100 dark:border-zinc-800 bg-gray-50/40 dark:bg-zinc-900/10 hover:shadow-lg transition-all duration-300 group"
              >
                
                {/* ব্লগ ইমেজ কন্টেইনার */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 bg-violet-600 text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                    {post.category}
                  </span>
                </div>

                {/* ব্লগ কন্টেন্ট বডি */}
                <div className="p-6 flex flex-col flex-grow justify-between gap-4">
                  <div className="flex flex-col gap-3">
                    
                    {/* মেটা ইনফরমেশন */}
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1.5">
                        <FaUser className="text-violet-500" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FaCalendarAlt className="text-violet-500" />
                        {post.date}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white line-clamp-2 leading-snug hover:text-violet-600 dark:hover:text-violet-400 transition-colors cursor-pointer">
                      <NextLink href={`/blog/${post.id}`}>
                        {post.title}
                      </NextLink>
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* রিড মোর লিঙ্ক */}
                  <NextLink 
                    href={`/working`} 
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 mt-2 transition-colors group/link"
                  >
                    Read Full Article
                    <FaArrowRight className="text-xs transition-transform group-hover/link:translate-x-1" />
                  </NextLink>

                </div>

              </motion.article>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}