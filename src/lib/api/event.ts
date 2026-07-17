import { EventData } from "../action/event";
import { protectedFetch, serverFetch } from "../core/server";

export const allEventsAdmin = async (): Promise<EventData[]> => {
  try {
    return await protectedFetch<EventData[]>("/api/admin/events") || [];
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return [];
  }
};

export const allEvents = async (): Promise<EventData[]> => {
  try {
    return await serverFetch<EventData[]>("/api/events") || [];
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return [];
  }
};

export const eventDeteils = async (id: string): Promise<EventData > => {
  try {
    return await serverFetch<EventData>(`/api/event/${id}`) ;
  } catch (error) {
    console.error("Failed to fetch event details:", error);
    return [] as unknown as EventData;
  }
};