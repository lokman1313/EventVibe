import { serverMutation } from "../core/server";

export interface EventInput {
  title: string;
  organizer: string;
  price: number;
  category: string;
  location: string;
  date: string;
  bannerImage: string;
  description: string;
  approvalStatus: "pending" | "approved";
  publishStatus: "unpublished" | "published";
}

export interface EventData extends EventInput {
  _id: string;
  creatorId: string;
  time: string;
  status?: "pending" | "unpublished" | "published";
}

export const postEventData = async (
  eventData: EventInput   // EventData থেকে EventInput করো
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
