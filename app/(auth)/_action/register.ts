


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

  // ব্যাকএন্ড রাউটের upload.single("profileImage") এর সাথে মিলিয়ে 'profileImage' রিসিভ করা হলো
  const profileImageFile = formData.get("profileImage") as File | null;
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const role = formData.get("role");

  let body: FormData | string;
  let headers: Record<string, string> = {
    cookie: `accessToken=${accessToken || ""}`,
  };

  const hasImage = profileImageFile && profileImageFile.size > 0;

  if (hasImage) {
    const multipart = new FormData();
    multipart.append("name", name as string);
    multipart.append("email", email as string);
    multipart.append("password", password as string);
    multipart.append("role", role as string);

    // ব্যাকএন্ড Multer 'profileImage' ফিল্ড নেম রিসিভ করবে
    multipart.append("profileImage", profileImageFile);

    body = multipart;
  } else {
    body = JSON.stringify({ name, email, password, role });
    headers["Content-Type"] = "application/json";
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
      method: "POST",
      headers,
      body,
    });

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
      revalidateTag("register", "max");
    }

    return {
      success: true,
      statusCode: result.statusCode || 200,
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