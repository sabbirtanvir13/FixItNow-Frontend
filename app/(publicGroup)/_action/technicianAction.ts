"use server";

import { cookies } from "next/headers";

const handleApiResponse = async (res: Response) => {
  const contentType = res.headers.get("content-type");

  if (!contentType || !contentType.includes("application/json")) {
    const text = await res.text();

    console.error("Non-JSON response:", text);

    return {
      success: false,
      statusCode: res.status,
      message: `Server Error (${res.status})`,
      data: null,
    };
  }

  return res.json();
};

const getAuthHeaders = async (): Promise<HeadersInit | null> => {
  const cookieStore = await cookies();

  const token = cookieStore.get("accessToken")?.value;

  if (!token) return null;

  return {
    Cookie: `accessToken=${token}`,
  };
};

/* ============================
   Get All Technicians (Public)
============================ */

export const getAllTechnicians = async () => {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/technician`,
      {
        cache: "no-store",
      }
    );

    return await handleApiResponse(res);
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to connect server",
      data: [],
    };
  }
};

/* ============================
   Get Single Technician (Public)
============================ */

export const getTechnicianById = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/technician/${id}`,
      {
        cache: "no-store",
      }
    );

    return await handleApiResponse(res);
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to connect server",
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
      message: "Unauthorized",
      data: null,
    };
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/technician/profile`,
      {
        headers,
        cache: "no-store",
      }
    );

    return await handleApiResponse(res);
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to connect server",
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
      message: "Unauthorized",
      data: [],
    };
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/technician/bookings`,
      {
        headers,
        cache: "no-store",
      }
    );

    return await handleApiResponse(res);
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to connect server",
      data: [],
    };
  }
};

/* ============================
   Update Technician Profile
============================ */

export const updateTechnicianProfile = async (payload: any) => {
  const headers = await getAuthHeaders();

  if (!headers) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/technician/profile`,
      {
        method: "PUT",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    return await handleApiResponse(res);
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to update profile",
    };
  }
};

/* ============================
   Update Availability
============================ */

export const updateAvailability = async (payload: any) => {
  const headers = await getAuthHeaders();

  if (!headers) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/technician/availability`,
      {
        method: "PUT",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    return await handleApiResponse(res);
  } catch (error) {
    console.error(error);

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
  payload: any
) => {
  const headers = await getAuthHeaders();

  if (!headers) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_API_URL}/api/technician/bookings/${bookingId}`,
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
    console.error(error);

    return {
      success: false,
      message: "Failed to update booking",
    };
  }
};