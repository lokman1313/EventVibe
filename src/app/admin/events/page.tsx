import AllEventTable from "@/components/admin/AllEventTable";
import { allEventsAdmin } from "@/lib/api/event";
import { FiCalendar, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

const page = async () => {
  const allEvents = await allEventsAdmin() || [];

  // ইভেন্টের স্ট্যাটিস্টিকস ক্যালকুলেট করা
  const totalEvents = allEvents.length;
  const publishedEvents = allEvents.filter((e: any) => e.publishStatus === "published").length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-100 px-6 py-8 md:px-10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 dark:border-white/5 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-violet-600 dark:from-white dark:via-zinc-200 dark:to-violet-400 bg-clip-text text-transparent">
              Event Management
            </h1>
            <p className="text-slate-500 dark:text-zinc-400 text-sm mt-1">
              Approve, publish, reject, or delete events across the EventVibe platform.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs bg-violet-100 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 text-violet-600 dark:text-violet-400 px-3 py-1.5 rounded-full font-medium self-start md:self-auto">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            Admin Control Panel
          </div>
        </div>

        {/* Stats Grid Cards (Pending review card removed) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Card 1: Total Events */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-zinc-900/40 p-6 shadow-sm dark:shadow-none backdrop-blur-md transition-all duration-300 hover:border-violet-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-zinc-400">Total Events</p>
                <h3 className="text-3xl font-bold mt-2 text-slate-900 dark:text-white">{totalEvents}</h3>
              </div>
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-zinc-800/80 text-violet-600 dark:text-violet-400 border border-slate-200 dark:border-white/5">
                <FiCalendar className="text-xl" />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-violet-500/5 rounded-full blur-xl" />
          </div>

          {/* Card 2: Live & Published */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-zinc-900/40 p-6 shadow-sm dark:shadow-none backdrop-blur-md transition-all duration-300 hover:border-emerald-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-zinc-400">Live & Published</p>
                <h3 className="text-3xl font-bold mt-2 text-emerald-600 dark:text-emerald-400">{publishedEvents}</h3>
              </div>
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-zinc-800/80 text-emerald-600 dark:text-emerald-400 border border-slate-200 dark:border-white/5">
                <FiCheckCircle className="text-xl" />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl" />
          </div>

        </div>

        {/* Table Wrapper Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-zinc-400 font-medium">
            <FiAlertCircle className="text-violet-500 dark:text-violet-400 text-base" />
            <span>Click actions inside the table to toggle status instantly.</span>
          </div>
          
          <div className="rounded-2xl border border-slate-200 dark:border-white/5 bg-white dark:bg-zinc-900/20 shadow-sm dark:shadow-2xl p-1">
            <AllEventTable allEvents={allEvents} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default page;