import { HOST } from "@/constants/Service";
import axios from "axios";

const api_client = axios.create({
  baseURL: HOST,
});

export default api_client;
