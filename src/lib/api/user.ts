import { protectedFetch } from "../core/server";

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean; // Semicolon correction
  image: string;
  createdAt: string;
  updatedAt: string;
  role: string;
}

export const allUser = async (): Promise<User[]> => {
  try {
    // secure return ensuring it always maps correctly
    return await protectedFetch<User[]>("/api/users") || [];
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return []; // fetch fail korle khali array return korbe jate UI crash na kore
  }
};