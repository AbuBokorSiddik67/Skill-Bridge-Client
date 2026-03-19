"use server";
import { cookies } from "next/headers";
import { ITutorProfile } from "@/types";
import { revalidateTag } from "next/cache";

const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_BASE_URL?.endsWith("/")
    ? process.env.NEXT_PUBLIC_BASE_URL
    : `${process.env.NEXT_PUBLIC_BASE_URL}/`;
};

export const getAllTutors = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const baseUrl = getBaseUrl();

    const res = await fetch(`${baseUrl}tutors`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["all-tutor"] },
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to fetch tutors");

    return result;
  } catch (err) {
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
    const baseUrl = getBaseUrl();

    const res = await fetch(`${baseUrl}tutors/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to create tutor");

    revalidateTag("all-tutor", "max");
    return result;
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unexpected error",
    };
  }
};

export const getSingleTutor = async (id: string) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const baseUrl = getBaseUrl();

    const res = await fetch(`${baseUrl}tutors/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["single-tutor"] },
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to fetch tutor");

    return result;
  } catch (err) {
    return {
      success: false,
      message:
        err instanceof Error ? err.message : "An unexpected error occurred",
    };
  }
};

export const getTutorAccount = async (id: string) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const baseUrl = getBaseUrl();

    const res = await fetch(`${baseUrl}tutors/account/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["tutor-account"] },
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to fetch tutor account");

    return result;
  } catch (err) {
    return {
      success: false,
      message:
        err instanceof Error ? err.message : "An unexpected error occurred",
    };
  }
};

export const updateTutorProfile = async (
  id: string,
  values: Partial<ITutorProfile>,
) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const baseUrl = getBaseUrl();

    const res = await fetch(`${baseUrl}tutors/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to update tutor");

    revalidateTag("all-tutor","max");
    revalidateTag("single-tutor","max");
    return result;
  } catch (err) {
    return {
      success: false,
      message:
        err instanceof Error ? err.message : "An unexpected error occurred",
    };
  }
};

export const deleteTutorProfile = async (id: string) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const baseUrl = getBaseUrl();

    const res = await fetch(`${baseUrl}tutors/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to delete tutor");

    revalidateTag("all-tutor","max");
    return result;
  } catch (err) {
    return {
      success: false,
      message:
        err instanceof Error ? err.message : "An unexpected error occurred",
    };
  }
};
