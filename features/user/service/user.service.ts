import api_client from "@/service/api-service";
import { IProfile } from "../types/user.type";

export const updateProfile = async (data: Partial<IProfile["data"]["data"]>) =>
  await api_client.patch("/user/profile", data);
