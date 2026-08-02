"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const API_BASE_URL = "https://fixitnow-backend-one.vercel.app/api";

async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value || cookieStore.get("token")?.value || "";
}

// ১. সব ক্যাটাগরি ফেচ করা (Search, Filter, Pagination সহ)
export async function getAllCategories(query?: { search?: string; status?: string; page?: number }) {
  try {
    const token = await getToken();
    const params = new URLSearchParams();
    if (query?.search) params.append("search", query.search);
    if (query?.status && query.status !== "All") params.append("status", query.status);
    if (query?.page) params.append("page", query.page.toString());

    const res = await fetch(`${API_BASE_URL}/categories?${params.toString()}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to fetch categories");
    return { success: true, data: result.data || [] };
  } catch (error: any) {
    console.error("Fetch categories error:", error.message);
    return { success: false, message: error.message, data: [] };
  }
}

// ২. নতুন ক্যাটাগরি তৈরি করা (Create)
export async function createCategory(payload: { name: string; description?: string }) {
  try {
    const token = await getToken();
    const res = await fetch(`${API_BASE_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to create category");

    revalidatePath("/dashboard/admin/categories");
    return { success: true, data: result.data, message: "Category created successfully" };
  } catch (error: any) {
    console.error("Create category error:", error.message);
    return { success: false, message: error.message };
  }
}

// ৩. ক্যাটাগরি আপডেট করা (Update)
export async function updateCategory(id: string, payload: { name?: string; description?: string }) {
  try {
    const token = await getToken();
    const res = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to update category");

    revalidatePath("/dashboard/admin/categories");
    return { success: true, data: result.data, message: "Category updated successfully" };
  } catch (error: any) {
    console.error("Update category error:", error.message);
    return { success: false, message: error.message };
  }
}

// ৪. ক্যাটাগরি স্ট্যাটাস পরিবর্তন করা (Change Status Active/Inactive)
export async function updateCategoryStatus(id: string, status: string) {
  try {
    const token = await getToken();
    const res = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status, active_status: status }),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to update status");

    revalidatePath("/dashboard/admin/categories");
    return { success: true, data: result.data, message: "Status updated successfully" };
  } catch (error: any) {
    console.error("Update status error:", error.message);
    return { success: false, message: error.message };
  }
}

// ৫. ক্যাটাগরি ডিলিট করা (Delete)
export async function deleteCategory(id: string) {
  try {
    const token = await getToken();
    const res = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to delete category");

    revalidatePath("/dashboard/admin/categories");
    return { success: true, message: "Category deleted successfully" };
  } catch (error: any) {
    console.error("Delete category error:", error.message);
    return { success: false, message: error.message };
  }
}