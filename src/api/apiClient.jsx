// lib/apiClient.js
import axios from "axios";
import { headers } from "./apiHeaders";

const apiUrl = process.env.NEXT_PUBLIC_API_URL; // client safe env var

if (!apiUrl) {
  // optional: throw on server build if you want early failure
  // (You can omit this if you prefer)
  throw new Error("NEXT_PUBLIC_API_URL is not defined in your .env");
}

const apiClient = axios.create({
  baseURL: apiUrl,
  timeout: 30000,
  headers: headers,
});

// Optional: add a request logger (useful during dev)
if (process.env.NODE_ENV === "development") {
  apiClient.interceptors.request.use((config) => {
    console.log("[apiClient] Request:", config.method, config.url);
    return config;
  });
  apiClient.interceptors.response.use(
    (res) => {
      console.log("[apiClient] Response:", res.status, res.config.url);
      return res;
    },
    (err) => {
      console.warn(
        "[apiClient] Response error:",
        err?.response?.status,
        err?.config?.url
      );
      return Promise.reject(err);
    }
  );
}

export default apiClient;
