/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const isAccessTokenExist = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  return token;
};

// Response হ্যান্ডেল করার জন্য হেল্পার ফাংশন
const handleApiResponse = async (res: Response) => {
  const contentType = res.headers.get("content-type");

  if (!contentType || !contentType.includes("application/json")) {
    const text = await res.text();
    return {
      success: false,
      statusCode: res.status,
      message: `Server error! Backend returned non-JSON response (Status: ${res.status})`,
      data: [],
    };
  }
  const jsonRes = await res.json();
  return jsonRes;
};

interface ActionResponse {
  success: boolean;
  statusCode?: number;
  message?: string;
  data?: unknown;
}

// ==========================================
// 1. Create Service Action
// ==========================================
export async function createService(
  formData: FormData
): Promise<ActionResponse> {
  try {
    const category_id = formData.get("category_id");
    const title = formData.get("title");
    const description = formData.get("description");
    const image = formData.get("image");
    const price = formData.get("price");
    const duration = formData.get("duration");
    const location = formData.get("location");

    const payload = {
      category_id: category_id ? String(category_id) : "",
      title: title ? String(title) : "",
      description: description ? String(description) : "",
      image: image ? String(image) : "",
      price: price ? Number(price) : 0,
      duration: duration ? Number(duration) : 0,
      location: location ? String(location) : "",
    };

    const accessToken = await isAccessTokenExist();
    if (!accessToken) {
      return { success: false, message: "User not logged in!" };
    }

    const backendUrl = `${process.env.BACKEND_API_URL}/api/services`;
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const result = (await handleApiResponse(response)) as ActionResponse;

    if (result.success) {
      revalidateTag("my-services", "max");
      revalidateTag("public-services", "max");
    }

    return result;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong";
    return { success: false, message: errorMessage };
  }
}

// ==========================================
// 2. Get My Services Action
// ==========================================
export const getMyServices = async (): Promise<ActionResponse> => {
  const accessToken = await isAccessTokenExist();

  if (!accessToken) {
    return { success: false, message: "User not logged in!", data: [] };
  }

  try {
    const backendUrl = `${process.env.BACKEND_API_URL}/api/services/my-services`;
    const res = await fetch(backendUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      next: {
        tags: ["my-services"],
      },
    });

    const result = await handleApiResponse(res);
    return result;
  } catch (error) {
    return {
      success: false,
      message: "Failed to connect to the backend server!",
      data: [],
    };
  }
};

// ==========================================
// 3. Update Service Action
// ==========================================
export const updateService = async (
  id: string,
  formData: FormData
): Promise<ActionResponse> => {
  const category_id = String(formData.get("category_id") || "").trim();

  if (!category_id) {
    return { success: false, message: "Category selection is required!" };
  }

  const payload = {
    category_id: category_id,
    title: String(formData.get("title") || "").trim(),
    description: String(formData.get("description") || "").trim(),
    image: String(formData.get("image") || "").trim(),
    price: Number(formData.get("price") || 0),
    duration: Number(formData.get("duration") || 0),
    location: String(formData.get("location") || "").trim(),
  };

  const accessToken = await isAccessTokenExist();

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: "User not logged in!",
      data: {},
    };
  }

  try {
    const backendUrl = `${process.env.BACKEND_API_URL}/api/services/${id}`;
    const res = await fetch(backendUrl, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await handleApiResponse(res);

    if (result.success) {
      revalidateTag("my-services", "max");
      revalidateTag("public-services", "max");
    }
    return result;
  } catch (error) {
    return {
      success: false,
      message: "Failed to connect to the backend server!",
    };
  }
};

// ==========================================
// 4. Delete Service Action
// ==========================================

export const deleteService = async (id: string): Promise<ActionResponse> => {
  const accessToken = await isAccessTokenExist();

  if (!accessToken) {
    return { success: false, message: "User not logged in!" };
  }

  try {
    const backendUrl = `${process.env.BACKEND_API_URL}/api/services/${id}`;
    const res = await fetch(backendUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const result = await handleApiResponse(res);

    if (result.success) {
      revalidateTag("my-services", "max");
      revalidateTag("public-services", "max");
    }
    return result;
  } catch (error) {
    return {
      success: false,
      message: "Failed to connect to the backend server!",
    };
  }
};

// ==========================================
// 5. Get Categories Action
// ==========================================
export const getCategories = async (): Promise<ActionResponse> => {
  try {
    const backendUrl = `${process.env.BACKEND_API_URL}/api/categories`;
    const res = await fetch(backendUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 3600,
      },
    });

    const result = await handleApiResponse(res);
    return result;
  } catch (error) {
    return {
      success: false,
      message: "Failed to connect to the backend server!",
      data: [],
    };
  }
};