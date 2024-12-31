import { AUTH_STORE, HOST } from "@/constants/Service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const api_client = axios.create({
  baseURL: HOST,
});

api_client.interceptors.request.use(async (config) => {
  const data = await AsyncStorage.getItem(AUTH_STORE);
  const token = data ? JSON.parse(data).state.session.token : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api_client;
