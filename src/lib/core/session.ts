"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../auth";

// User type
type User = Awaited<
  ReturnType<typeof auth.api.getSession>
> extends { user: infer U }
  ? U
  : never;

 type SessionUser = {
   id: string;
   createdAt: Date;
   updatedAt: Date;
   email: string;
   emailVerified: boolean;
   name: string;
   image?: string | null;
   role?: string | null;
 };

export const userSession = async (): Promise<SessionUser | null> => {
 
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    return session?.user ?? null;
 
};

export const getToken = async (): Promise<string | null> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.session?.token ?? null;
};

export const requireRole = async (role: string): Promise<SessionUser> => {
  const user = await userSession();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== role) {
    redirect("/unauthorize");
  }

  return user;
};