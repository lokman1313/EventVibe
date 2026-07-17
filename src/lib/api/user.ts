import { protectedFetch } from "../core/server";

export interface User {
  _id: string;
  name: string;
  email: string;
  emailVerified: boolean; 
  image: string;
  createdAt: string;
  updatedAt: string;
  role: "admin" | "client";
}

export const allUser = async (): Promise<User[]> => {
  try {
    return await protectedFetch<User[]>("/api/users") || [];
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return [];
  }
};