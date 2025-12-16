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

// fetch blog by slug
export async function getBlogBySlug(slug) {
  try {
    const { data } = await apiClient.get(`/blog/slug/${slug}`);
    return data.data; // adjust if your API returns differently
  } catch (err) {
    console.error("getBlogBySlug Error:", err);
    return null;
  }
}

// fetch all pages with active contents
export async function getPagesWithContents() {
  try {
    const { data } = await apiClient.get("/pages");
    // adjust endpoint if different
    return data.data;
  } catch (err) {
    console.error("getPagesWithContents Error:", err);
    return [];
  }
}

export function buildHeroContents(pages = []) {
  return pages.flatMap((page) =>
    (page.active_contents || []).map((content) => ({
      page: page.page_identifier,
      id: content.id,
      title: content.title,
      description: content.detail,
      image: content.image_path,
      type: content.type,
      order: content.order,
    }))
  );
}
