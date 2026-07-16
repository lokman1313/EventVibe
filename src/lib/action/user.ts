import { serverDeletion } from "../core/server";

export const deleteUserPermanent = async (
  id: string | number
): Promise<any> => {
  return serverDeletion(`/api/users/${id}`);
};