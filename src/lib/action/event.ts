import { serverMutation } from "../core/server";

export interface EventData {
  title: string;
  organizer: string;
  price: number;
  category: string;
  location: string;
  bannerImage: string;
  description: string;
  publishStatus: "published" | "unpublished";
  approvalStatus: "approved" | "pending" | "rejected";
  date: string;
  creatorId: string;
  id?: string;
}

export const postEventData = async (
  eventData: EventData
): Promise<unknown> => {
  return serverMutation("/api/event/post", eventData);
};

import { serverDeletion } from "../core/server";

export const deleteEventPermanent = async (
  id: string | number
): Promise<any> => {
  return serverDeletion(`/api/event/delete/${id}`);
};

export const updateEventData = async (
  id: string | number,
  eventData: Partial<EventData>
): Promise<any> => {
  return serverMutation(`/api/event/update/${id}`, eventData ,"PATCH");
};
