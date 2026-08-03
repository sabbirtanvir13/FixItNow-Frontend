"use server"

import { isAccessTokenExist } from "@/app/dashboard/technician/_action/myServicesActions";
import { revalidateTag } from "next/cache";

export type PostState = {
  success: boolean;
  statusCode: number;
  message: string;
  data: Record<string, unknown> | null;
}

export const registerUser = async (prevState: PostState | null, formData: FormData): Promise<PostState> => {
  const accessToken = await isAccessTokenExist();

  const profileImageFile = formData.get("profileImage") as File | null;
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const role = formData.get("role");

  // Backend এ পাঠানোর জন্য multipart FormData তৈরি করা
  const multipart = new FormData();
  if (name) multipart.append("name", name as string);
  if (email) multipart.append("email", email as string);
  if (password) multipart.append("password", password as string);
  if (role) multipart.append("role", role as string);

  // ছবি থাকলে এবং ফাইল সাইজ ০ থেকে বড় হলে যুক্ত করা
  if (profileImageFile && profileImageFile.size > 0) {
    multipart.append("profileImage", profileImageFile);
  }

  const backendUrl = process.env.BACKEND_API_URL || "http://localhost:5000";


  try {
    const res = await fetch(`${backendUrl}/api/auth/register`, {
      method: "POST",
      headers: {
        cookie: `accessToken=${accessToken || ""}`,
      },
      body: multipart,
    });
    console.log("Hitting Backend URL:", `${process.env.BACKEND_API_URL}/api/auth/register`);

    const result = await res.json();

    if (!res.ok) {
      console.error("Backend Error:", result);
      return {
        success: false,
        statusCode: res.status,
        message: result?.message || "Registration failed. Please try again.",
        data: null
      };
    }

    if (result.success) {
      // ✅ revalidateTag শুধুমাত্র ১টি আর্গুমেন্ট গ্রহণ করে
      revalidateTag("register", "max");
    }

    return {
      success: true,
      statusCode: result.statusCode || 201,
      message: result.message || "Registration successful",
      data: result.data || null
    };

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong in the server.";
    console.error("Server Action Fetch Error:", error);
    return {
      success: false,
      statusCode: 500,
      message: errorMessage,
      data: null
    };
  }
};