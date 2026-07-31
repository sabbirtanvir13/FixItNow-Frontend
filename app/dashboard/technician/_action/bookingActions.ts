"use server";

import { revalidatePath } from "next/cache";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://fixitnow-backend-hi9a.onrender.com";

// Fetch technician bookings
export async function getTechnicianBookings(technicianId: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/bookings/technician/${technicianId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const data = await res.json();
    return data;
  } catch (error: unknown) {
    console.error("Failed to fetch bookings:", error);
    return { success: false, message: "Failed to fetch bookings", data: [] };
  }
}

// Update booking status action
export async function updateBookingStatus(bookingId: string, newStatus: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/bookings/${bookingId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
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