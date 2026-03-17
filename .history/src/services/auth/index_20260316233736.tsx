"use server"
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const loginUser = async (userData: FieldValues) => {
    console.log(userData)
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const result = await res.json();
    const storeCookie = await cookies();
    if (result.success) {
      storeCookie.set("token", result?.data?.token);
    }
    return result;
  } catch (error) {
    console.log(error);
  }
};
