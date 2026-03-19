"use server";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import { revalidateTag } from "next/cache";

// Register User
export const createUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      },
    );
    return await res.json();
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Registration failed",
    };
  }
};

// Login User
export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const result = await res.json();
    const storeCookie = await cookies();
    if (result.success) {
      storeCookie.set("token", result?.data?.token);
    }
    return result;
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Login failed",
    };
  }
};

// Get Current User From Token (Client Side Decoding)
export const getUser = async () => {
  const storeCookie = await cookies();
  const token = storeCookie.get("token")?.value;
  if (token) {
    return jwtDecode(token);
  }
  return null;
};

// Get Me (Fetching full data from Server)
export const getMe = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/me`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      next: { tags: ["my-profile"] },
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: "Failed to fetch profile" };
  }
};

// Get All Students
export const getAllStudents = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/students`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      next: { tags: ["students"] },
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: "Failed to fetch students" };
  }
};

// Update Student Profile
export const updateStudentProfile = async (
  id: string,
  userData: FieldValues,
) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/students/profile-update/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      },
    );

    const result = await res.json();
    if (res.ok) revalidateTag("my-profile","max");
    return result;
  } catch (err) {
    return { success: false, message: "Update failed" };
  }
};

// Delete Student Profile
export const deletedStudentProfile = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admin/deleted-users`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        next: { tags: ["deleted-students"] },
      },
    );

    const result = await res.json();
    return result;
  } catch (err) {
    return { success: false, message: "Deletion failed" };
  }
};

// Delete Student Profile
export const deleteStudentProfile = async (id: string) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/students/delete-profile/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    const result = await res.json();
    if (res.ok) {
      revalidateTag("students", "max");
      revalidateTag("deleted-students", "max")
    }
    return result;
  } catch (err) {
    return { success: false, message: "Deletion failed" };
  }
};

// Logout
export const UserLogOut = async () => {
  const storeCookie = await cookies();
  storeCookie.delete("token");
};
