"use server";

import { cookies } from "next/headers";

// 🌟 Helper: Manage Base URL Safely
const getBaseUrl = () => {
  const url = process.env.BACKEND_API_URL;
  if (!url) {
    console.warn("⚠️ BACKEND_API_URL is missing in environment variables.");
    return "http://localhost:5000"; // Fallback URL
  }
  return url;
};

// 🌟 Helper: Safely Handle API Responses
const handleApiResponse = async (res: Response) => {
  try {
    const contentType = res.headers.get("content-type");

    // Check if the response is JSON
    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text();
      console.error(`[API Error] Non-JSON response (${res.status}):`, text);

      return {
        success: false,
        statusCode: res.status,
        message: `Server Error (${res.status})`,
        data: null,
      };
    }

    // Safely parse JSON
    return await res.json();
  } catch (error) {
    console.error("[API Error] Failed to parse JSON response:", error);
    return {
      success: false,
      statusCode: res.status || 500,
      message: "Invalid response format from server",
      data: null,
    };
  }
};

// 🌟 Helper: Get Auth Headers Safely
const getAuthHeaders = async (): Promise<HeadersInit | null> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) return null;

    return {
      Cookie: `accessToken=${token}`,
    };
  } catch (error) {
    console.error("[Auth Error] Failed to access cookies:", error);
    return null;
  }
};

/* ============================
   Get All Technicians (Public)
============================ */
export const getAllTechnicians = async () => {
  try {
    const res = await fetch(`${getBaseUrl()}/api/technician`, {
      cache: "no-store",
    });

    return await handleApiResponse(res);
  } catch (error) {
    console.error("[Fetch Error] getAllTechnicians:", error);
    return {
      success: false,
      message: "Failed to connect to the server",
      data: [],
    };
  }
};

/* ============================
   Get Single Technician (Public)
============================ */
export const getTechnicianById = async (id: string) => {
  try {
    const res = await fetch(`${getBaseUrl()}/api/technician/${id}`, {
      cache: "no-store",
    });

    return await handleApiResponse(res);
  } catch (error) {
    console.error(`[Fetch Error] getTechnicianById (${id}):`, error);
    return {
      success: false,
      message: "Failed to connect to the server",
      data: null,
    };
  }
};

/* ============================
   Technician Profile (Private)
============================ */
export const getTechnicianProfile = async () => {
  const headers = await getAuthHeaders();

  if (!headers) {
    return {
      success: false,
      message: "Unauthorized - No Access Token",
      data: null,
    };
  }

  try {
    const res = await fetch(`${getBaseUrl()}/api/technician/profile`, {
      headers,
      cache: "no-store",
    });

    return await handleApiResponse(res);
  } catch (error) {
    console.error("[Fetch Error] getTechnicianProfile:", error);
    return {
      success: false,
      message: "Failed to connect to the server",
      data: null,
    };
  }
};

/* ============================
   Technician Bookings (Private)
============================ */
export const getTechnicianBookings = async () => {
  const headers = await getAuthHeaders();

  if (!headers) {
    return {
      success: false,
      message: "Unauthorized - No Access Token",
      data: [],
    };
  }

  try {
    const res = await fetch(`${getBaseUrl()}/api/technician/bookings`, {
      headers,
      cache: "no-store",
    });

    return await handleApiResponse(res);
  } catch (error) {
    console.error("[Fetch Error] getTechnicianBookings:", error);
    return {
      success: false,
      message: "Failed to connect to the server",
      data: [],
    };
  }
};

/* ============================
   Update Technician Profile
============================ */
export const updateTechnicianProfile = async (payload: Record<string, any>) => {
  const headers = await getAuthHeaders();

  if (!headers) {
    return {
      success: false,
      message: "Unauthorized - No Access Token",
    };
  }

  try {
    const res = await fetch(`${getBaseUrl()}/api/technician/profile`, {
      method: "PUT",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return await handleApiResponse(res);
  } catch (error) {
    console.error("[Fetch Error] updateTechnicianProfile:", error);
    return {
      success: false,
      message: "Failed to update profile",
    };
  }
};

/* ============================
   Update Availability
============================ */
export const updateAvailability = async (payload: Record<string, any>) => {
  const headers = await getAuthHeaders();

  if (!headers) {
    return {
      success: false,
      message: "Unauthorized - No Access Token",
    };
  }

  try {
    const res = await fetch(`${getBaseUrl()}/api/technician/availability`, {
      method: "PUT",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return await handleApiResponse(res);
  } catch (error) {
    console.error("[Fetch Error] updateAvailability:", error);
    return {
      success: false,
      message: "Failed to update availability",
    };
  }
};

/* ============================
   Update Booking Status
============================ */
export const updateBookingStatus = async (
  bookingId: string,
  payload: Record<string, any>
) => {
  const headers = await getAuthHeaders();

  if (!headers) {
    return {
      success: false,
      message: "Unauthorized - No Access Token",
    };
  }

  try {
    const res = await fetch(
      `${getBaseUrl()}/api/technician/bookings/${bookingId}`,
      {
        method: "PATCH",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    return await handleApiResponse(res);
  } catch (error) {
    console.error(`[Fetch Error] updateBookingStatus (${bookingId}):`, error);
    return {
      success: false,
      message: "Failed to update booking status",
    };
  }
};