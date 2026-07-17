import { eventDeteils } from '@/lib/api/event';
import Image from 'next/image';
import Link from 'next/link';
import { FiCalendar, FiMapPin, FiUser, FiTag, FiArrowLeft, FiAlertTriangle } from 'react-icons/fi';
import { Button } from '@heroui/react';

interface EventData {
  _id: string;
  title: string;
  organizer: string;
  price: number;
  category: string;
  location: string;
  date: string;
  bannerImage: string;
  description: string;
  publishStatus: string;
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const eventData: EventData = await eventDeteils(id);

  if (!eventData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-100 p-4">
        <FiAlertTriangle className="text-amber-500 text-5xl mb-4" />
        <h2 className="text-xl font-bold">Event Not Found</h2>
        <p className="text-slate-500 dark:text-zinc-400 text-sm mt-1">The event you are looking for might have been removed.</p>
        <Link href="/events" className="mt-4 flex items-center gap-2 text-sm text-violet-500 hover:underline">
          <FiArrowLeft /> Back to Explore
        </Link>
      </div>
    );
  }

  // ডেট ফরম্যাটিং (যেমন: 18 May, 2027)
  const formattedDate = new Date(eventData.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-100 transition-colors duration-200 px-4 py-8 md:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Back Button */}
        <Link 
          href="/events" 
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-zinc-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors group"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to all events
        </Link>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left / Center Content: Image & Main Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Aspect Ratio Banner Image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-slate-200 dark:border-white/5 bg-zinc-900 shadow-md">
              <Image
                src={eventData.bannerImage || "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format"}
                alt={eventData.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 800px"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="capitalize text-xs font-semibold px-3 py-1 rounded-full bg-white/90 dark:bg-zinc-950/80 backdrop-blur-md text-violet-600 dark:text-violet-400 border border-slate-200/50 dark:border-white/10 shadow-sm">
                  {eventData.category}
                </span>
              </div>
            </div>

            {/* Event Header Information */}
            <div className="space-y-3">
              <h1 className="text-2xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                {eventData.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-zinc-400">
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-zinc-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/5">
                  <FiUser className="text-violet-500" />
                  <span>Organized by <strong className="text-slate-800 dark:text-zinc-200 font-semibold">{eventData.organizer}</strong></span>
                </div>
              </div>
            </div>

            {/* About / Description */}
            <div className="p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-white/5 bg-white dark:bg-zinc-900/40 backdrop-blur-md shadow-sm dark:shadow-none space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FiTag className="text-violet-500" /> About this Event
              </h3>
              <p className="text-slate-600 dark:text-zinc-300 text-sm md:text-base leading-relaxed whitespace-pre-line">
                {eventData.description}
              </p>
            </div>

          </div>

          {/* Right Content: Sticky Metadata & Ticket Widget Sidebar */}
          <div className="space-y-6 lg:sticky lg:top-6 self-start">
            
            {/* Logistics Info Card */}
            <div className="p-6 rounded-3xl border border-slate-200 dark:border-white/5 bg-white dark:bg-zinc-900/40 backdrop-blur-md shadow-sm dark:shadow-none space-y-4">
              <h4 className="text-sm font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">Date & Venue Details</h4>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-violet-500/10 text-violet-500 border border-violet-500/10 shrink-0">
                    <FiCalendar />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 dark:text-zinc-500">Date</p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{formattedDate}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-violet-500/10 text-violet-500 border border-violet-500/10 shrink-0">
                    <FiMapPin className="shrink-0" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 dark:text-zinc-500">Location</p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{eventData.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket Price Widget Callout */}
            <div className="p-1 rounded-3xl border border-slate-200 dark:border-white/5 bg-white dark:bg-zinc-900/20 shadow-md">
              <div className="p-6 rounded-[22px] bg-gradient-to-b from-slate-50 to-white dark:from-zinc-900 dark:to-zinc-950 border border-slate-100 dark:border-white/5 space-y-6">
                <div>
                  <p className="text-sm text-slate-400 dark:text-zinc-500 font-medium">Ticket Price</p>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-4xl font-black text-slate-900 dark:text-white">
                      {eventData.price === 0 ? "Free" : `৳${eventData.price}`}
                    </span>
                    {eventData.price > 0 && <span className="text-xs text-slate-400 dark:text-zinc-500 font-medium">/ person</span>}
                  </div>
                </div>

                <div className="w-full">
                  <Button 
                    className="w-full py-6 font-bold text-white bg-violet-600 hover:bg-violet-700 shadow-xl shadow-violet-600/10 rounded-2xl transition-all"
                    size="lg"
                  >
                    {eventData.price === 0 ? "Register Now" : "Book Tickets"}
                  </Button>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Page;