import { cookies } from "next/headers";

export const getAllTutors = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tutors`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 3600 },
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to fetch users");
    }

    return result;
  } catch (err) {
    console.error("Fetch Error:", err);
    return {
      success: false,
      message:
        err instanceof Error ? err.message : "An unexpected error occurred",
    };
  }
};