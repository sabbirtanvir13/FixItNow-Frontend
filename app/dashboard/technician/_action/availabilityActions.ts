"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

// সমাধান: লাইভ URL-এর সাথে সঠিক রাউটের জন্য শেষে "/api" যুক্ত করা হয়েছে
// BACKEND_API_URL does not include "/api"; append it so every route hits correctly.
const API_BASE_URL = `${process.env.BACKEND_API_URL}/api`;

// কুকি থেকে টোকেন সংগ্রহ করার হেল্পার ফাংশন
async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value || cookieStore.get("token")?.value || "";
}

// ১. সকল অ্যাভেইল্যাবিলিটি ফেচ (Get)
export async function getAvailabilities() {
  try {
    const token = await getToken();
    
    const res = await fetch(`${API_BASE_URL}/technicians/availability`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to fetch availability");
    
    return { success: true, data: result.data };
  } catch (error: any) {
    console.error("Fetch availability error:", error.message);
    return { success: false, message: error.message, data: [] };
  }
}

// ২. নতুন অ্যাভেইল্যাবিলিটি যোগ (Create)
export async function addAvailability(
  payload: { day: string; start_time: string; end_time: string; is_available?: boolean }
) {
  try {
    const token = await getToken();
    
    const res = await fetch(`${API_BASE_URL}/technicians/availability`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to add availability");

    revalidatePath("/dashboard/technician/availability");
    return { success: true, data: result.data, message: "Availability added successfully" };
  } catch (error: any) {
    console.error("Add availability error:", error.message);
    return { success: false, message: error.message };
  }
}

// ৩. নির্দিষ্ট অ্যাভেইল্যাবিলিটি আপডেট (Update)
export async function updateAvailability(
  availabilityId: string,
  payload: { day?: string; start_time?: string; end_time?: string; is_available?: boolean }
) {
  try {
    const token = await getToken();
    
    const res = await fetch(`${API_BASE_URL}/technicians/availability`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id: availabilityId, ...payload }),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to update availability");

    revalidatePath("/dashboard/technician/availability");
    return { success: true, data: result.data, message: "Availability updated successfully" };
  } catch (error: any) {
    console.error("Update availability error:", error.message);
    return { success: false, message: error.message };
  }
}

// ৪. নির্দিষ্ট অ্যাভেইল্যাবিলিটি ডিলিট (Delete)
export async function deleteAvailability(availabilityId: string) {
  try {
    const token = await getToken();
    const res = await fetch(`${API_BASE_URL}/technicians/availability/${availabilityId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to delete availability");

    revalidatePath("/dashboard/technician/availability");
    return { success: true, message: "Availability deleted successfully" };
  } catch (error: any) {
    console.error("Delete availability error:", error.message);
    return { success: false, message: error.message };
  }
}