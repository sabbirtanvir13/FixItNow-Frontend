"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.BACKEND_API_URL || "https://fixitnow-backend-hi9a.onrender.com/api";

async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value || cookieStore.get("token")?.value || "";
}

export async function getCustomerBookings() {
  try {
    const token = await getToken();
    const res = await fetch(`${API_BASE_URL}/bookings`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to fetch bookings");
    
    return { success: true, data: result.data || [] };
  } catch (error: any) {
    console.error("Fetch bookings error:", error.message);
    return { success: false, message: error.message, data: [] };
  }
}


export async function getSingleBooking(id: string) {
  try {
    const token = await getToken();
    const res = await fetch(`${API_BASE_URL}/bookings/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to fetch booking details");
    
    return { success: true, data: result.data };
  } catch (error: any) {
    console.error("Fetch booking detail error:", error.message);
    return { success: false, message: error.message };
  }
}

export async function cancelBookingAction(id: string) {
  try {
    const token = await getToken();
    const res = await fetch(`${API_BASE_URL}/bookings/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bookingStatus: "CANCELLED" }),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to cancel booking");

    revalidatePath("/dashboard/customer/bookings");
    return { success: true, message: "Booking cancelled successfully" };
  } catch (error: any) {
    console.error("Cancel booking error:", error.message);
    return { success: false, message: error.message };
  }
}


export async function submitReviewAction(payload: { bookingId: string; rating: number; comment: string }) {
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

    revalidatePath("/dashboard/customer/bookings");
    return { success: true, message: "Review submitted successfully" };
  } catch (error: any) {
    console.error("Submit review error:", error.message);
    return { success: false, message: error.message };
  }
}