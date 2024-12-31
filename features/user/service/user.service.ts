import api_client from "@/service/api-service";

export const getProfile = async () => await api_client.post("/user/profile");
