import api_client from "@/service/api-service";
import { IPasswordEdit } from "../types/profile.type";

export const changePassword = async (payload: IPasswordEdit) =>
  await api_client.patch("/auth/change-password", payload);
