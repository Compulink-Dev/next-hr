export const dynamic = "force-dynamic";

export async function getData(endpoint: string) {
  try {
    const response = await fetch(`${process.env.URL}/api/${endpoint}`, {
      cache: "no-store",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(`Error fetching ${endpoint}:`, await response.text());
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}
