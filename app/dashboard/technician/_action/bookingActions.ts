"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const API_BASE_URL = `${process.env.BACKEND_API_URL}/api`;

async function getAuthHeaders() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;
  return {
    "Content-Type": "application/json",
    ...(accessToken ? { Cookie: `accessToken=${accessToken}` } : {}),
  };
}

// Fetch technician bookings (auth-based — backend identifies technician from token)
// Always resolves to a predictable { success, data: Booking[] } shape so the UI
// can render/refresh the tables without extra defensive checks.
export async function getTechnicianBookings() {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/technician/bookings`, {
      method: "GET",
      headers,
      cache: "no-store",
    });

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      console.error("Non-JSON response from bookings endpoint:", await res.text());
      return { success: false, message: `Server error (${res.status})`, data: [] };
    }

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result?.message || "Failed to fetch bookings",
        data: [],
      };
    }

    // Backend may return { data: [...] }, { data: { data: [...] } } or a bare array.
    const list = Array.isArray(result?.data)
      ? result.data
      : Array.isArray(result?.data?.data)
        ? result.data.data
        : Array.isArray(result)
          ? result
          : [];

    return { success: true, data: list, message: result?.message || "" };
  } catch (error: unknown) {
    console.error("Failed to fetch bookings:", error);
    return { success: false, message: "Failed to fetch bookings", data: [] };
  }
}


// Update booking status action
export async function updateBookingStatus(bookingId: string, newStatus: string) {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/technician/bookings/${bookingId}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ status: newStatus }),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to update booking status");
    }

    revalidatePath("/dashboard/bookings");

    return { success: true, data: result.data, message: "Status updated successfully" };
  } catch (error: unknown) {
    console.error("Error updating booking status:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return { success: false, message: errorMessage };
  }
}
