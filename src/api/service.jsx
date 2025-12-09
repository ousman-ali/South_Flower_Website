import apiClient from "./apiClient";

export async function getBatchData(features = []) {
  try {
    const { data } = await apiClient.post("/batch", { features });
    return data;
  } catch (err) {
    console.error("getBatchData Error:", err);
    return null;
  }
}
