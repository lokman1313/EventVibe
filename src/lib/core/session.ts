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

// Session type
type Session = Awaited<
  ReturnType<typeof auth.api.getSession>
>;

export const userSession = async (): Promise<User | null> => {
 
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    return session?.user ;
 
};

export const getToken = async (): Promise<string | null> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.session?.token ?? null;
};

export const requireRole = async (role: string): Promise<User> => {
  const user = await userSession();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== role) {
    redirect("/unauthorize");
  }

  return user;
};