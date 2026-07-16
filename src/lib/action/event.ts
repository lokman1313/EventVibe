import { serverMutation } from "../core/server";

export interface EventData {
  title: string;
  organizer: string;
  price: number;
  category: string;
  location: string;
  bannerImage: string;
  description: string;
}

export const postEventData = async (
  eventData: EventData
): Promise<unknown> => {
  return serverMutation("/api/event/post", eventData);
};
