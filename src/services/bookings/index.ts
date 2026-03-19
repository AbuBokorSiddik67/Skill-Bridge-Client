"use server";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { IBooking } from "@/types";

const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_BASE_URL?.endsWith("/")
    ? process.env.NEXT_PUBLIC_BASE_URL
    : `${process.env.NEXT_PUBLIC_BASE_URL}/`;
};

export const createBooking = async (bookingData: IBooking) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const baseUrl = getBaseUrl();

    const res = await fetch(`${baseUrl}bookings/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookingData),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to create booking");

    revalidateTag("all-bookings", "max");
    return result;
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unexpected error",
    };
  }
};

export const getAllBookings = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const baseUrl = getBaseUrl();

    const res = await fetch(`${baseUrl}bookings`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["all-bookings"] },
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to fetch bookings");

    return result;
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unexpected error",
    };
  }
};

export const getMyBookings = async (userId: string) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const baseUrl = getBaseUrl();

    // Note: single 'booking' used here as per your route list
    const res = await fetch(`${baseUrl}booking/my-bookings/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["my-bookings"] },
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to fetch your bookings");

    return result;
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unexpected error",
    };
  }
};

export const updateBooking = async (id: string, updateData: IBooking) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const baseUrl = getBaseUrl();

    const res = await fetch(`${baseUrl}bookings/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to update booking");

    revalidateTag("all-bookings", "max");
    revalidateTag("my-bookings", "max");
    return result;
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unexpected error",
    };
  }
};

export const deleteBooking = async (id: string) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const baseUrl = getBaseUrl();

    const res = await fetch(`${baseUrl}bookings/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to delete booking");

    revalidateTag("all-bookings", "max");
    revalidateTag("my-bookings", "max");
    return result;
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unexpected error",
    };
  }
};