import AllUsersTable from "@/components/admin/AllUserTable";
import { allUser, User } from "@/lib/api/user";

const AllUsersPage = async (): Promise<JSX.Element> => {
  // ১. সার্ভার সাইড থেকে ডাটা ফেচিং (API crash korle fallback faka array)
  const allusers: User[] = await allUser() || [];

  return (
    <main className="min-h-screen w-full bg-zinc-50 dark:bg-[#08080a] py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* টপ হেডার সেকশন */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-zinc-200 dark:border-white/5 pb-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Users Management
            </h1>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Overview of all users, their roles, and system administration privileges.
            </p>
          </div>
          
          {/* কুইক স্ট্যাটাস উইজেট */}
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-white dark:bg-[#0c0c0e] border border-zinc-200 dark:border-white/5 rounded-xl text-center">
              <span className="block text-xs text-zinc-500 dark:text-zinc-400 font-medium">Total Users</span>
              <span className="text-lg font-bold text-zinc-900 dark:text-white">
                {allusers.length} {/* Optional chaining ekhon ar proyojon nei */}
              </span>
            </div>
          </div>
        </div>

        {/* টেবিল কম্পোনেন্ট */}
        <div className="w-full">
          {/* allusers ekhon guarantee shohoje User[] pathachhe */}
          <AllUsersTable allUsers={allusers} />
        </div>

      </div>
    </main>
  );
};

export default AllUsersPage;