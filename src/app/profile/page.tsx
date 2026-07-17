import { userSession } from "@/lib/core/session";
import { Button, Card } from "@heroui/react";
import Image from "next/image";
import NextLink from "next/link";
import { HiOutlineMail, HiOutlineIdentification, HiOutlineCalendar } from "react-icons/hi";
import { HiOutlineCog6Tooth, HiOutlineTicket } from "react-icons/hi2";

// ইউজারের টাইপ ইন্টারফেস ডিফাইন করা হলো
interface UserSession {
  id?: string;
  _id?: string; // MongoDB বা অন্যান্য ডিবির জন্য ফলব্যাক
  name: string;
  email: string;
  image?: string | null;
  role?: "admin" | "client" | "user" | string;
  createdAt?: string | Date;
}

const ProfilePage = async () => {
  // সেশন থেকে টাইপ কাস্টিং সহ ইউজার ডেটা আনা
  const user = (await userSession()) as UserSession | null;

  // সেশন না থাকলে সেফ রিটার্ন
  if (!user) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Please sign in first</h2>
        <p className="text-gray-500 dark:text-zinc-400 mt-2 mb-6">You must be logged in to view your profile.</p>
        <NextLink href="/login">
          <Button className="bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl px-6 h-11">
            Sign In Now
          </Button>
        </NextLink>
      </div>
    );
  }

  // মেম্বারশিপ ডেট ফরম্যাটিং সেফটি চেক
  const getMemberSinceDate = (dateVal?: string | Date): string => {
    if (!dateVal) return "Member since 2026";
    try {
      return new Date(dateVal).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
    } catch {
      return "Member since 2026";
    }
  };

  const memberSince = getMemberSinceDate(user.createdAt);
  const userAvatar = user.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200";
  const displayId = user.id || user._id || "N/A";

  return (
    <section className="relative min-h-[90vh] py-12 px-4 bg-gray-50 dark:bg-[#0d0d0e] bg-gradient-to-b from-transparent to-gray-100 dark:to-black transition-colors duration-300">
      
      {/* ব্যাকগ্রাউন্ড গ্লো */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 -z-10 h-[300px] w-[300px] sm:h-[450px] sm:w-[450px] rounded-full bg-violet-500/10 blur-[100px] hidden dark:block" />

      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* প্রোফাইল হেডার কার্ড */}
        <Card className="p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-white/10 bg-white/90 dark:bg-[#121214]/80 backdrop-blur-xl shadow-xl transition-all duration-300">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            
            {/* প্রোফাইল পিকচার */}
            <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-2xl overflow-hidden border-2 border-violet-500/30 shadow-lg bg-gray-100 dark:bg-zinc-800">
              <Image
                src={userAvatar}
                alt={`${user.name}'s avatar`}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* ইউজার বেসিক ইনফো */}
            <div className="flex-1 text-center sm:text-left space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                  {user.name}
                </h1>
                
                {/* রোল ব্যাজ */}
                {user.role && (
                  <span className="inline-flex self-center sm:self-auto items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 border border-violet-500/10">
                    {user.role}
                  </span>
                )}
              </div>

              <p className="text-gray-500 dark:text-zinc-400 text-sm flex items-center justify-center sm:justify-start gap-1.5">
                <HiOutlineCalendar className="text-lg text-violet-500" />
                {memberSince}
              </p>

              {/* কুইক অ্যাকশন বাটন */}
              <div className="pt-2 flex flex-wrap justify-center sm:justify-start gap-3">
                <NextLink href={user.role === "client" ? "/clients/bookings" : "/admin/events"}>
                  <Button className="bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl px-5 h-10 shadow-lg shadow-violet-500/10 flex items-center gap-2 text-sm">
                    <HiOutlineTicket className="text-lg" />
                    {user.role === "client" ? "My Bookings" : "Manage Events"}
                  </Button>
                </NextLink>

                <Button 
                  variant="outline"
                  className="border-gray-200 dark:border-white/10 text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-900 font-semibold rounded-xl px-5 h-10 text-sm flex items-center gap-2"
                >
                  <HiOutlineCog6Tooth className="text-lg" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* প্রোফাইল ডিটেইলস সেকশন */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* ইনফরমেশন কার্ড */}
          <Card className="md:col-span-2 p-6 rounded-2xl border border-gray-200 dark:border-white/10 bg-white/90 dark:bg-[#121214]/80 backdrop-blur-xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Account Information</h2>
            
            <div className="space-y-4">
              {/* ইমেইল */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-gray-100/50 dark:bg-zinc-900/50 border border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-3">
                  <HiOutlineMail className="text-xl text-violet-500" />
                  <div>
                    <p className="text-xs text-gray-400 dark:text-zinc-500 font-medium">Email Address</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-zinc-200">{user.email}</p>
                  </div>
                </div>
              </div>

              {/* ইউজার আইডি */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-gray-100/50 dark:bg-zinc-900/50 border border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-3">
                  <HiOutlineIdentification className="text-xl text-violet-500" />
                  <div>
                    <p className="text-xs text-gray-400 dark:text-zinc-500 font-medium">User ID</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-zinc-200 tracking-wider truncate max-w-[180px] sm:max-w-xs">
                      {displayId}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* ইভেন্ট স্ট্যাটস সম্বলিত কার্ড */}
          <Card className="p-6 rounded-2xl border border-gray-200 dark:border-white/10 bg-white/90 dark:bg-[#121214]/80 backdrop-blur-xl shadow-lg flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Your Activity</h2>
              <p className="text-xs text-gray-400 dark:text-zinc-500 mb-6">Overview of your activity on EventVibe</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-500/10">
                <span className="block text-2xl font-black text-violet-600 dark:text-violet-400">0</span>
                <span className="text-xs text-gray-500 dark:text-zinc-400 font-medium mt-1 block">
                  {user.role === "client" ? "Bookings" : "Events Created"}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-fuchsia-500/5 border border-fuchsia-500/10">
                <span className="block text-2xl font-black text-fuchsia-600 dark:text-fuchsia-400">0</span>
                <span className="text-xs text-gray-500 dark:text-zinc-400 font-medium mt-1 block">Reviews</span>
              </div>
            </div>
          </Card>

        </div>

      </div>
    </section>
  );
};

export default ProfilePage;