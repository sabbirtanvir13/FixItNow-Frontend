/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const isAccessTokenExist = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  console.log(
    "[Action] Checking Access Token:",
    token ? "Token Found ✅" : "Token Not Found ❌"
  );
  return token;
};

// Response হ্যান্ডেল করার জন্য হেল্পার ফাংশন
const handleApiResponse = async (res: Response) => {
  const contentType = res.headers.get("content-type");
  console.log(
    "[Action] Response Status:",
    res.status,
    "| Content-Type:",
    contentType
  );

  if (!contentType || !contentType.includes("application/json")) {
    const text = await res.text();
    console.error("Non-JSON response from backend:", text);
    return {
      success: false,
      statusCode: res.status,
      message: `Server error! Backend returned non-JSON response (Status: ${res.status})`,
      data: [],
    };
  }
  const jsonRes = await res.json();
  console.log("[Action] Parsed JSON Response:", jsonRes);
  return jsonRes;
};

interface ActionResponse {
  success: boolean;
  statusCode?: number;
  message?: string;
  data?: unknown;
}

// // Environment Variable Configuration
// const BACKEND_URL =
//   process.env.BACKEND_API_URL ||
//   process.env.NEXT_PUBLIC_BACKEND_API_URL ||
//   "https://fixitnow-backend-hi9a.onrender.com";

// const API_BASE = BACKEND_URL.replace(/\/api\/?$/, "");

// ==========================================
// 1. Create Service Action
// ==========================================
export async function createService(
  formData: FormData
): Promise<ActionResponse> {
  console.log("[Action] createService called 🚀");
  try {
    const category_id = formData.get("category_id");
    const title = formData.get("title");
    const description = formData.get("description");
    const price = formData.get("price");
    const duration = formData.get("duration");
    const location = formData.get("location");

    const payload = {
      category_id: category_id ? String(category_id) : "",
      title: title ? String(title) : "",
      description: description ? String(description) : "",
      price: price ? Number(price) : 0,
      duration: duration ? Number(duration) : 0,
      location: location ? String(location) : "",
    };

    console.log("[Action] createService Payload:", payload);

    const accessToken = await isAccessTokenExist();
    if (!accessToken) {
      console.error("[Action] createService Error: User not logged in!");
      return { success: false, message: "User not logged in!" };
    }

    const backendUrl = `${process.env.BACKEND_API_URL}/api/services`;
    console.log("[Action] Fetching URL:", backendUrl);

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
      console.log(
        "[Action] Service created successfully, revalidating tags"
      );
      // Next.js 15+ compatible revalidateTag syntax
      revalidateTag("my-services", "max");
      revalidateTag("public-services", "max");
    }

    return result;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";
    console.error("[Action] createService Exception Error:", error);
    return { success: false, message: errorMessage };
  }
}

// ==========================================
// 2. Get My Services Action
// ==========================================
export const getMyServices = async (): Promise<ActionResponse> => {
  console.log("[Action] getMyServices called 📥");
  const accessToken = await isAccessTokenExist();

  if (!accessToken) {
    console.error("[Action] getMyServices Error: User not logged in!");
    return { success: false, message: "User not logged in!", data: [] };
  }

  try {
    const backendUrl = `${process.env.BACKEND_API_URL}/api/services/my-services`;
    console.log("[Action] Fetching URL:", backendUrl);

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
    console.error("[Action] getMyServices Exception Error:", error);
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
  console.log(`[Action] updateService called for ID: ${id} 📝`);

  const category_id = String(formData.get("category_id") || "").trim();

  if (!category_id) {
    console.error("[Action] updateService Error: Category selection is required!");
    return { success: false, message: "Category selection is required!" };
  }

  const payload = {
    category_id: category_id,
    title: String(formData.get("title") || "").trim(),
    description: String(formData.get("description") || "").trim(),
    price: Number(formData.get("price") || 0),
    duration: Number(formData.get("duration") || 0),
    location: String(formData.get("location") || "").trim(),
  };

  console.log("[Action] updateService Payload:", payload);

  const accessToken = await isAccessTokenExist();

  if (!accessToken) {
    console.error("[Action] updateService Error: User not logged in!");
    return {
      success: false,
      statusCode: 401,
      message: "User not logged in!",
      data: {},
    };
  }

  try {
    const backendUrl = `${process.env.BACKEND_API_URL}/api/services/${id}`;
    console.log("[Action] Fetching URL:", backendUrl);

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
      console.log(
        "[Action] Service updated successfully, revalidating tags"
      );
      revalidateTag("my-services", "max");
      revalidateTag("public-services", "max");
    }
    return result;
  } catch (error) {
    console.error("[Action] updateService Exception Error:", error);
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
  console.log(`[Action] deleteService called for ID: ${id} 🗑️`);
  const accessToken = await isAccessTokenExist();

  if (!accessToken) {
    console.error("[Action] deleteService Error: User not logged in!");
    return { success: false, message: "User not logged in!" };
  }

  try {
    const backendUrl = `${process.env.BACKEND_API_URL}/api/services/${id}`;
    console.log("[Action] Fetching URL:", backendUrl);

    const res = await fetch(backendUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const result = await handleApiResponse(res);

    if (result.success) {
      console.log(
        "[Action] Service deleted successfully, revalidating tags"
      );
      revalidateTag("my-services", "max");
      revalidateTag("public-services", "max");
    }
    return result;
  } catch (error) {
    console.error("[Action] deleteService Exception Error:", error);
    return {
      success: false,
      message: "Failed to connect to the backend server!",
    };
  }
};