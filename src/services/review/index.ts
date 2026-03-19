"use server";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { IReview } from "@/types";

const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_BASE_URL?.endsWith("/")
    ? process.env.NEXT_PUBLIC_BASE_URL
    : `${process.env.NEXT_PUBLIC_BASE_URL}/`;
};

export const createReview = async (reviewData: IReview) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const baseUrl = getBaseUrl();

    const res = await fetch(`${baseUrl}reviews/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reviewData),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to create review");

    revalidateTag("all-reviews", "max");
    revalidateTag("tutor-reviews", "max");
    return result;
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unexpected error",
    };
  }
};

export const getAllReviews = async () => {
  try {
    const baseUrl = getBaseUrl();

    const res = await fetch(`${baseUrl}reviews`, {
      method: "GET",
      next: { tags: ["all-reviews"] },
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to fetch reviews");

    return result;
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unexpected error",
    };
  }
};

export const getReviewsByTutor = async (tutorId: string) => {
  try {
    const baseUrl = getBaseUrl();

    const res = await fetch(`${baseUrl}reviews/tutor/${tutorId}`, {
      method: "GET",
      next: { tags: ["tutor-reviews"] },
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to fetch tutor reviews");

    return result;
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unexpected error",
    };
  }
};

export const getReviewsByStudent = async (studentId: string) => {
  try {
    const baseUrl = getBaseUrl();

    const res = await fetch(`${baseUrl}reviews/student/${studentId}`, {
      method: "GET",
      next: { tags: ["student-reviews"] },
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to fetch student reviews");

    return result;
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unexpected error",
    };
  }
};

export const deleteReview = async (id: string) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const baseUrl = getBaseUrl();

    const res = await fetch(`${baseUrl}reviews/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to delete review");

    revalidateTag("all-reviews", "max");
    revalidateTag("tutor-reviews", "max");
    revalidateTag("student-reviews", "max");
    return result;
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unexpected error",
    };
  }
};