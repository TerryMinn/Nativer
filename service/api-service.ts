import { AUTH_STORE, HOST } from "@/constants/Service";
import axios from "axios";
import { getItem } from "@/utils/storage";
import Reactotron from "reactotron-react-native";

const api_client = axios.create({
  baseURL: HOST,
});

api_client.interceptors.request.use(async (config) => {
  const data = await getItem(AUTH_STORE);

  // That is debug config

  const token = Object(data).state.session.token;

  // auth
  config.headers.Authorization = `Bearer ${token}`;

  Reactotron.display({
    name: "API Request",
    value: {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data,
    },
    important: true,
  });

  return config;
});

api_client.interceptors.response.use(
  (response) => {
    Reactotron.display({
      name: "API Response",
      value: {
        url: response.config.url,
        status: response.status,
        data: response.data,
      },
      important: true,
    });
    return response;
  },
  (error) => {
    Reactotron.display({
      name: "API Error",
      value: {
        url: error.config.url,
        status: error.response?.status,
        message: error.message,
        data: error.response?.data,
      },
      important: true,
    });
    return Promise.reject(error);
  }
);

export default api_client;
