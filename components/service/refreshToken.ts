"use server";

import { cookies } from "next/headers";

type RefreshTokenResponse = {
  success: boolean;
  message: string;
  data?: {
    accessToken: string;
  };
};

export const getNewAccessToken = async (): Promise<RefreshTokenResponse> => {
  const cookieStore = await cookies();

  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return {
      success: false,
      message: "Refresh token not found!",
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/auth/refresh-token`,
    {
      method: "POST",
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
      cache: "no-store",
    }
  );

  return await res.json();
};