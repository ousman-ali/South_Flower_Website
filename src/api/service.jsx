import apiClient from "./apiClient";

//ftech all
export async function getBatchData(features = []) {
  try {
    const { data } = await apiClient.post("/batch", { features });
    return data;
  } catch (err) {
    console.error("getBatchData Error:", err);
    return null;
  }
}

//fetch product categories
export async function getProductCategories() {
  try {
    const { data } = await apiClient.get("/ecommerce/categories");
    return data.data;
  } catch (err) {
    console.error("getProductCategories Error:", err);
    return null;
  }
}

//fetch blog categories
export async function getBlogCategories() {
  try {
    const { data } = await apiClient.get("/blog/categories");
    return data.data;
  } catch (err) {
    console.error("getBlogCategories Error:", err);
    return null;
  }
}
