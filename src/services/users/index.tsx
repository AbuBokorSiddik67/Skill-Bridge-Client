"use server"
import { IUser } from "@/types";
import { jwtDecode } from "jwt-decode";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const getUser = async () => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;
  let decodedData = null;
  if (token) {
    decodedData = await jwtDecode(token);
    return decodedData;
  } else {
    return null;
  }
};

export const updateMyProfile = async (id: string, values: IUser) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    console.log("valus data in index: ", values)

    if (!token) {
      throw new Error("You are not authorized!");
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/students/profile-update/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      },
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to update profile");
    }

    revalidateTag("my-profile", "all-users");

    return {
      success: true,
      message: result.message || "Profile updated successfully!",
      data: result.data,
    };
  } catch (err) {
    console.error("Update Error:", err);
    return {
      success: false,
      message:
        err instanceof Error ? err.message : "An unexpected error occurred",
    };
  }
};

export const getMe = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["my-profile"] },
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to fetch my data");
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

export const getAllUsers = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["all-users"] },
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
