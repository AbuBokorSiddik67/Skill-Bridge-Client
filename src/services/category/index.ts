"use server";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_BASE_URL?.endsWith("/")
    ? process.env.NEXT_PUBLIC_BASE_URL
    : `${process.env.NEXT_PUBLIC_BASE_URL}/`;
};

// 1. Create Category
export const createCategory = async (data: {
  name: string;
}) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const baseUrl = getBaseUrl();

    const res = await fetch(`${baseUrl}categories/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to create category");

    // Using 'max' as per Next.js recommendation for SWR
    revalidateTag("all-categories", "max");
    return result;
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : "Unexpected error occurred",
    };
  }
};

// 2. Get All Categories
export const getAllCategories = async () => {
  try {
    const baseUrl = getBaseUrl();

    const res = await fetch(`${baseUrl}categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { tags: ["all-categories"] },
    });

    const result = await res.json();
    if (!res.ok)
      throw new Error(result.message || "Failed to fetch categories");

    return result;
  } catch (err) {
    return {
      success: false,
      message:
        err instanceof Error ? err.message : "An unexpected error occurred",
    };
  }
};

// 3. Get Single Category
export const getSingleCategory = async (id: string) => {
  try {
    const baseUrl = getBaseUrl();

    const res = await fetch(`${baseUrl}categories/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { tags: ["single-category"] },
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to fetch category");

    return result;
  } catch (err) {
    return {
      success: false,
      message:
        err instanceof Error ? err.message : "An unexpected error occurred",
    };
  }
};

// 4. Update Category
export const updateCategory = async (
  id: string,
  data: { name?: string; description?: string },
) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const baseUrl = getBaseUrl();

    const res = await fetch(`${baseUrl}categories/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to update category");

    revalidateTag("all-categories", "max");
    revalidateTag("single-category", "max");
    return result;
  } catch (err) {
    return {
      success: false,
      message:
        err instanceof Error ? err.message : "An unexpected error occurred",
    };
  }
};

// 5. Delete Category
export const deleteCategory = async (id: string) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    const baseUrl = getBaseUrl();

    const res = await fetch(`${baseUrl}categories/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to delete category");

    revalidateTag("all-categories", "max");
    return result;
  } catch (err) {
    return {
      success: false,
      message:
        err instanceof Error ? err.message : "An unexpected error occurred",
    };
  }
};
