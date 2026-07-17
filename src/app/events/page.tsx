import { allEvents } from "@/lib/api/event";
import Image from "next/image";
import Link from "next/link";
import { FiCalendar, FiClock, FiMapPin, FiUser, FiArrowRight } from "react-icons/fi";

// টাইপ সেফটির জন্য ইন্টারফেস ডিফাইন করা
interface EventItem {
  _id: string;
  title: string;
  organizer: string;
  price: number;
  category: string;
  location: string;
  date: string;
  time: string;
  bannerImage: string;
  description: string;
}

const Page = async () => {
  const allEventsData: EventItem[] = (await allEvents()) || [];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-100 px-4 py-12 md:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Page Title / Section Header */}
        <div className="border-b border-slate-200 dark:border-white/5 pb-6">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-violet-600 dark:from-white dark:via-zinc-200 dark:to-violet-400 bg-clip-text text-transparent">
            Explore Upcoming Events
          </h1>
          <p className="text-slate-500 dark:text-zinc-400 text-sm md:text-base mt-2">
            Discover amazing tech summits, musical nights, and business networking sessions near you.
          </p>
        </div>

        {/* Empty State Fallback */}
        {allEventsData.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-slate-200 dark:border-zinc-800 rounded-3xl">
            <p className="text-slate-400">No events available right now. Check back later!</p>
          </div>
        ) : (
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allEventsData.map((event) => {
              // ডেট ফরম্যাটিং: e.g. "18 May, 2027"
              const formattedDate = new Date(event.date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              });

              return (
                <div
                  key={event._id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 dark:border-white/5 bg-white dark:bg-zinc-900/40 shadow-sm dark:shadow-none backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/5"
                >
                  {/* Banner Image & Category Tag */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-800">
                    <Image
                      src={event.bannerImage || "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600"}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Dark overlay gradients */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent" />
                    
                    {/* Category Tag */}
                    <span className="absolute top-4 left-4 capitalize text-xs font-semibold px-3 py-1 rounded-full bg-white/90 dark:bg-zinc-950/80 backdrop-blur-md text-violet-600 dark:text-violet-400 border border-slate-200/50 dark:border-white/10 shadow-sm">
                      {event.category}
                    </span>

                    {/* Ticket Price Tag */}
                    <span className="absolute bottom-4 right-4 text-sm font-bold px-3 py-1 rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-600/20">
                      {event.price === 0 ? "Free" : `৳${event.price}`}
                    </span>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      {/* Organizer */}
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 dark:text-zinc-500">
                        <FiUser className="text-violet-500/70" />
                        <span className="truncate">{event.organizer}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white line-clamp-1 group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors">
                        {event.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-slate-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                        {event.description}
                      </p>
                    </div>

                    {/* Metadata (Date, Time, Venue) */}
                    <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-white/5 text-xs text-slate-600 dark:text-zinc-400">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-2">
                          <FiCalendar className="text-violet-500 shrink-0" />
                          <span className="truncate">{formattedDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiClock className="text-violet-500 shrink-0" />
                          <span className="truncate">{event.time}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <FiMapPin className="text-violet-500 shrink-0" />
                        <span className="truncate" title={event.location}>
                          {event.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Link / Button Footer */}
                  <div className="px-6 pb-6 pt-0">
                    <Link
                      href={`/events/${event._id}`}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-900 text-sm font-semibold text-slate-700 dark:text-zinc-300 transition-all duration-200 hover:bg-violet-600 dark:hover:bg-violet-600 hover:text-white dark:hover:text-white hover:border-transparent"
                    >
                      Get Tickets
                      <FiArrowRight className="text-base group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;