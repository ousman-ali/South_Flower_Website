import { headers } from "./apiHeaders";

export async function getBatchData(features = []) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  //   await new Promise((resolve) => setTimeout(resolve, 10000));

  if (!apiUrl) {
    throw new Error("API URL not found. Add NEXT_PUBLIC_API_URL in .env.");
  }

  try {
    const response = await fetch(`${apiUrl}/batch`, {
      method: "POST",
      headers,
      body: JSON.stringify({ features }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("getBatchData Error:", error);
    return null;
  }
}
