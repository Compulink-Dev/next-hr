import { cookies } from "next/headers";

export async function getData(endpoint: string) {
  try {
    const cookieHeader = cookies().toString();
    const response = await fetch(`${process.env.URL}/api/${endpoint}`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader, // ✅ Forward session cookies
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

export async function getDataWithStatus(endpoint: string): Promise<{ data: any; status: number }> {
  try {
    const cookieHeader = cookies().toString();
    const response = await fetch(`${process.env.URL}/api/${endpoint}`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader, // ✅ Forward session cookies
      },
    });

    const status = response.status;
    if (!response.ok) {
      return { data: null, status };
    }

    const data = await response.json();
    return { data, status };
  } catch (error) {
    console.error("Fetch error:", error);
    return { data: null, status: 500 };
  }
}
