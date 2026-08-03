import { cookies } from "next/headers";

export async function getNewAccessToken() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return { success: false, message: "No refresh token found" };
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `refreshToken=${refreshToken}`, // ব্যাকএন্ডে রিফ্রেশ টোকেন পাঠানো বাধ্যতামূলক
      },
      credentials: "include",
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return { success: false, error };
  }
}