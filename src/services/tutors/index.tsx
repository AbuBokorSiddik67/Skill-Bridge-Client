"use server"
import { cookies } from "next/headers";
import { ITutorProfile } from "@/types";

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
      next: { tags: ["all-tutor"] },
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

export const createTutorProfile = async (values: ITutorProfile) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;   
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.endsWith("/")
      ? process.env.NEXT_PUBLIC_BASE_URL
      : `${process.env.NEXT_PUBLIC_BASE_URL}/`;

    const res = await fetch(`${baseUrl}tutors/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `Server Error: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Fetch Error:", err);
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unexpected error",
    };
  }
};

export const getSingleTutor = async (userId: string) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tutors/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["get-single-tutor"] },
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to fetch tutor");
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
}

