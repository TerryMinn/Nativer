import api_client from "@/service/api-service";
import { ILogin } from "../types/user.type";

export const loginService = async (payload: ILogin) =>
  await api_client.post("/auth/login", payload);
