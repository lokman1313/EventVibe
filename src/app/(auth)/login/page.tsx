"use client";

import { useState } from "react";
import {
  Input,
  Button,
  TextField,
  Label,
  InputGroup,
  Separator,
} from "@heroui/react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

const SignInClient = () => {
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handelSignIn = async () => {
    setIsGoogleLoading(true);
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: redirectPath,
    });

    if (error) {
      console.error(error);
      toast.error(error.message || "Google sign in failed");
      setIsGoogleLoading(false);
    }
  };

  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    const { email, password } = userData;

    const { data, error } = await authClient.signIn.email({
      email: email as string,
      password: password as string,
    });

    if (error) {
      toast.error(error.message);
      setIsLoading(false);
      return;
    }

    if (data) {
      toast.success("Welcome back to the vibe!");
      router.push(redirectPath);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-10 bg-gray-50 dark:bg-[#0d0d0e] bg-gradient-to-b from-transparent to-gray-100 dark:to-black transition-colors duration-300 overflow-hidden">
      
      {/* ব্যাকগ্রাউন্ড গ্লোয়িং অর্বস (শুধুমাত্র ডার্ক মোডে গ্লো করবে, লাইট মোডে একদম ক্লিন থাকবে) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[300px] w-[300px] sm:h-[450px] sm:w-[450px] rounded-full bg-violet-500/10 blur-[100px] hidden dark:block" />
      <div className="absolute bottom-10 right-10 -z-10 h-[200px] w-[200px] rounded-full bg-fuchsia-500/5 blur-[80px] hidden dark:block" />

      {/* মেইন কন্টেইনার কার্ড (লাইট মোডে বর্ডার ও ডো এবং ডার্ক মোডে ট্রান্সলুসেন্ট ব্যাকগ্রাউন্ড) */}
      <div className="w-full max-w-md rounded-2xl border border-gray-200 dark:border-white/10 bg-white/90 dark:bg-[#121214]/80 backdrop-blur-xl shadow-xl dark:shadow-2xl transition-all duration-300 hover:border-violet-500/20 dark:hover:border-violet-500/20">
        <div className="p-8">
          
          {/* হেডার */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Welcome <span className="text-violet-600 dark:text-violet-400">Back</span>
            </h1>
            <p className="text-gray-500 dark:text-zinc-400 text-sm mt-2">
              Sign in to manage your EventVibe account
            </p>
          </div>

          {/* ইমেইল ও পাসওয়ার্ড ফর্ম */}
          <form onSubmit={handelSubmit} className="space-y-5">
            <TextField className="w-full text-gray-900 dark:text-white" name="email" type="email">
              <Label className="text-gray-700 dark:text-zinc-300 font-medium mb-1.5 block text-sm">Email</Label>
              <Input
                name="email"
                placeholder="Enter your email"
                required
                className="bg-gray-100/50 dark:bg-zinc-900/50 border-gray-200 dark:border-white/5 text-gray-950 dark:text-white focus:border-violet-500/50"
              />
            </TextField>

            <TextField className="w-full text-gray-900 dark:text-white">
              <Label className="text-gray-700 dark:text-zinc-300 font-medium mb-1.5 block text-sm">Password</Label>
              <InputGroup className="bg-gray-100/50 dark:bg-zinc-900/50 border border-gray-200 dark:border-white/10 rounded-xl focus-within:border-violet-500/50">
                <InputGroup.Input
                  name="password"
                  type={isVisible ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  className="text-gray-950 dark:text-white placeholder:text-gray-400 dark:placeholder:text-zinc-500 bg-transparent"
                />
                <InputGroup.Suffix>
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    type="button"
                    className="text-gray-400 dark:text-zinc-400 hover:text-gray-950 dark:hover:text-white"
                    aria-label={isVisible ? "Hide password" : "Show password"}
                    onPress={() => setIsVisible(!isVisible)}
                  >
                    {isVisible ? (
                      <FaEyeSlash className="size-4" />
                    ) : (
                      <FaEye className="size-4" />
                    )}
                  </Button>
                </InputGroup.Suffix>
              </InputGroup>
            </TextField>
            
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-violet-600 dark:text-violet-400 hover:text-violet-500 font-medium transition"
              >
                Forgot Password?
              </Link>
            </div>
       
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full h-11 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl transition duration-200 shadow-lg shadow-violet-500/10 active:scale-[0.98]"
            >
              Sign In
            </Button>
          </form>
      
          {/* ডিভাইডার */}
          <div className="my-6 flex items-center gap-3">
            <Separator className="flex-1 bg-gray-200 dark:bg-white/10" />
            <span className="text-xs text-gray-400 dark:text-zinc-500 font-medium uppercase tracking-wider">OR</span>
            <Separator className="flex-1 bg-gray-200 dark:bg-white/10" />
          </div>
  
          {/* গুগল লগইন */}
          <Button
            onPress={handelSignIn}
            isLoading={isGoogleLoading}
            className="w-full h-11 bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 font-medium rounded-xl transition duration-200 flex items-center justify-center gap-2 group"
          >
            {!isGoogleLoading && <FaGoogle className="text-md text-violet-600 dark:text-violet-400 group-hover:scale-105 transition-transform" />}
            Sign in with Google
          </Button>

          {/* সাইনআপ রিডাইরেক্ট */}
          <p className="text-center text-sm text-gray-500 dark:text-zinc-400 mt-6">
            Don't have an account?{" "}
            <Link
              href={`/signup?redirect=${redirectPath}`}
              className="text-violet-600 dark:text-violet-400 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>

        </div>
      </div>
    </section>
  );
};

export default SignInClient;