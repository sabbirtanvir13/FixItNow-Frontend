"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.BACKEND_API_URL || "https://fixitnow-backend-hi9a.onrender.com/api";

async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value || cookieStore.get("token")?.value || "";
}


export async function getMyReviews() {
  try {
    const token = await getToken();
    const res = await fetch(`${API_BASE_URL}/reviews/my-reviews`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to fetch reviews");
    
    return { success: true, data: result.data || [] };
  } catch (error: any) {
    console.error("Fetch reviews error:", error.message);
    return { success: false, message: error.message, data: [] };
  }
}


export async function getSingleReview(id: string) {
  try {
    const token = await getToken();
    const res = await fetch(`${API_BASE_URL}/reviews/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to fetch review details");
    
    return { success: true, data: result.data };
  } catch (error: any) {
    console.error("Fetch review detail error:", error.message);
    return { success: false, message: error.message };
  }
}


export async function createReview(payload: { booking_id: string; technician_id: string; rating: number; comment: string }) {
  try {
    const token = await getToken();
    const res = await fetch(`${API_BASE_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to submit review");

    revalidatePath("/dashboard/customer/reviews");
    return { success: true, data: result.data, message: "Review created successfully" };
  } catch (error: any) {
    console.error("Create review error:", error.message);
    return { success: false, message: error.message };
  }
}


export async function updateReview(id: string, payload: { rating: number; comment: string }) {
  try {
    const token = await getToken();
    const res = await fetch(`${API_BASE_URL}/reviews/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to update review");

    revalidatePath("/dashboard/customer/reviews");
    return { success: true, data: result.data, message: "Review updated successfully" };
  } catch (error: any) {
    console.error("Update review error:", error.message);
    return { success: false, message: error.message };
  }
}

export async function deleteReview(id: string) {
  try {
    const token = await getToken();
    const res = await fetch(`${API_BASE_URL}/reviews/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to delete review");

    revalidatePath("/dashboard/customer/reviews");
    return { success: true, message: "Review deleted successfully" };
  } catch (error: any) {
    console.error("Delete review error:", error.message);
    return { success: false, message: error.message };
  }
}