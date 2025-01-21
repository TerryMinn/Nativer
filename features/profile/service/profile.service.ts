import api_client from "@/service/api-service";
import { IPasswordEdit, IProfileEdit } from "../types/profile.type";
import { IProfile } from "@/features/user/types/user.type";

export const changePassword = async (payload: IPasswordEdit) =>
  await api_client.patch("/auth/change-password", payload);

export const editInfo = async (Payload: IProfile["data"]["data"]) =>
  await api_client.patch("/auth/edit-info", Payload);
