import api_client from "@/service/api-service";
import { ILogin, IRegister } from "../types/user.type";

export const loginService = async (payload: ILogin) =>
  await api_client.post("/auth/login", payload);

export const registerService = async (data: IRegister) => {
  const payload = {
    name: `${data.first_name} ${data.last_name}`,
    email: data.email,
    password: data.password,
  };

  return await api_client.post("/auth/register", payload);
};
