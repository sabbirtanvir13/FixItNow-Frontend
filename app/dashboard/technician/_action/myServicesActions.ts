/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const isAccessTokenExist = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  console.log(
    "🔑 [Token Check] Checking Access Token:",
    token ? `Token Found ✅ (Length: ${token.length})` : "Token Not Found ❌"
  );
  return token;
};

// Response হ্যান্ডেল করার জন্য হেল্পার ফাংশন
const handleApiResponse = async (res: Response, actionName: string) => {
  const contentType = res.headers.get("content-type");
  console.log(
    `🌐 [${actionName}] Response Status:`,
    res.status,
    "| Content-Type:",
    contentType
  );

  if (!contentType || !contentType.includes("application/json")) {
    const text = await res.text();
    console.error(`❌ [${actionName}] Non-JSON response from backend:`, text);
    return {
      success: false,
      statusCode: res.status,
      message: `Server error! Backend returned non-JSON response (Status: ${res.status})`,
      data: [],
    };
  }
  const jsonRes = await res.json();
  console.log(`✅ [${actionName}] Parsed JSON Response:`, JSON.stringify(jsonRes, null, 2));
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
  console.log("🚀 ================= [CREATE SERVICE INITIATED] ================= 🚀");
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

    const accessToken = await isAccessTokenExist();
    if (!accessToken) {
      console.error("❌ [Create Service] Error: User not logged in!");
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

    const result = (await handleApiResponse(response, "Create Service")) as ActionResponse;

    if (result.success) {
      revalidateTag("my-services", "max");
      revalidateTag("public-services", "max");
    }

    return result;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Something went wrong";
    console.error("💥 [Create Service] Exception Error:", error);
    return { success: false, message: errorMessage };
  }
}

// ==========================================
// 2. Get My Services Action
// ==========================================
export const getMyServices = async (): Promise<ActionResponse> => {
  console.log("📥 ================= [GET MY SERVICES INITIATED] ================= 📥");
  const accessToken = await isAccessTokenExist();

  if (!accessToken) {
    console.error("❌ [Get My Services] Error: User not logged in!");
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

    const result = await handleApiResponse(res, "Get My Services");
    return result;
  } catch (error) {
    console.error("💥 [Get My Services] Exception Error:", error);
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
  console.log(`📝 ================= [UPDATE SERVICE INITIATED for ID: ${id}] ================= 📝`);

  const category_id = String(formData.get("category_id") || "").trim();

  if (!category_id) {
    console.error("❌ [Update Service] Error: Category selection is required!");
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

  const accessToken = await isAccessTokenExist();

  if (!accessToken) {
    console.error("❌ [Update Service] Error: User not logged in!");
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

    const result = await handleApiResponse(res, "Update Service");

    if (result.success) {
      revalidateTag("my-services", "max");
      revalidateTag("public-services", "max");
    }
    return result;
  } catch (error) {
    console.error("💥 [Update Service] Exception Error:", error);
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
  console.log(`🗑️ ================= [DELETE SERVICE INITIATED for ID: ${id}] ================= 🗑️`);
  const accessToken = await isAccessTokenExist();

  if (!accessToken) {
    console.error("❌ [Delete Service] Error: User not logged in!");
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

    const result = await handleApiResponse(res, "Delete Service");

    if (result.success) {
      revalidateTag("my-services", "max");
      revalidateTag("public-services", "max");
    }
    return result;
  } catch (error) {
    console.error("💥 [Delete Service] Exception Error:", error);
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
  console.log("📂 ================= [GET CATEGORIES INITIATED] ================= 📂");
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

    const result = await handleApiResponse(res, "Get Categories");
    return result;
  } catch (error) {
    console.error("💥 [Get Categories] Exception Error:", error);
    return {
      success: false,
      message: "Failed to connect to the backend server!",
      data: [],
    };
  }
};