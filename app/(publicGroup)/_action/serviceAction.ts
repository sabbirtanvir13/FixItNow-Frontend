"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const handleApiResponse = async (res: Response) => {
    const contentType = res.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        console.error("Non-JSON response from backend:", text);
        return {
            success: false,
            statusCode: res.status,
            message: `Server error! Backend returned non-JSON response (Status: ${res.status})`,
            data: null
        };
    }

    return await res.json();
};

const getBaseUrl = () => {
    const url = process.env.BACKEND_API_URL;
    if (!url) {
        return "https://fixitnow-backend-one.vercel.app";
    }
    return url;
};

const getAuthHeaders = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;
    if (!accessToken) return null;
    return {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`
    };
};

export const getAllCategoriesData = async () => {
    try {
        const res = await fetch(`${getBaseUrl()}/api/categories`, {
            cache: "no-store"
        });

        const result = await handleApiResponse(res);
        return result;
    } catch (error) {
        console.error("Get categories Error:", error);
        return { success: false, message: "Failed to connect to the backend server!", data: [] };
    }
};

export const getAllServiceData = async (endpoint: string = "services", tag?: string) => {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")?.value || null;

        const headers: HeadersInit = {};
        if (accessToken) {
            headers["Cookie"] = `accessToken=${accessToken}`;
        }

        const res = await fetch(`${getBaseUrl()}/api/${endpoint}`, {
            headers,
            next: {
                tags: tag ? [tag] : ["getData"]
            },
            cache: "no-store"
        });

        const result = await handleApiResponse(res);
        return result;
    } catch (error) {
        console.error("Get data Error:", error);
        return { success: false, message: "Failed to connect to the backend server!", data: [] };
    }
};

export const getDataById = async (endpoint: string = "services", id: string) => {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")?.value || null;

        const headers: HeadersInit = {};
        if (accessToken) {
            headers["Cookie"] = `accessToken=${accessToken}`;
        }

        const res = await fetch(`${getBaseUrl()}/api/${endpoint}/${id}`, {
            headers,
            cache: "no-store"
        });

        const result = await handleApiResponse(res);
        return result;
    } catch (error) {
        console.error("Get data by ID Error:", error);
        return { success: false, message: "Failed to connect to the backend server!", data: null };
    }
};

export const getCurrentCustomerAction = async () => {
    try {
        const headers = await getAuthHeaders();
        if (!headers) {
            return { success: false, authenticated: false, data: null };
        }

        const res = await fetch(`${getBaseUrl()}/api/auth/me`, {
            headers,
            cache: "no-store"
        });

        const result = await handleApiResponse(res);
        if (result.success && result.data) {
            return { success: true, authenticated: true, data: result.data };
        }
        return { success: false, authenticated: false, data: null };
    } catch (error) {
        console.error("Get Current Customer Error:", error);
        return { success: false, authenticated: false, data: null };
    }
};

export const getTechnicianDetailsAction = async (technicianId: string) => {
    try {
        if (!technicianId) {
            return { success: false, data: null };
        }

        const res = await fetch(`${getBaseUrl()}/api/technician/${technicianId}`, {
            cache: "no-store"
        });

        return await handleApiResponse(res);
    } catch (error) {
        console.error("Get Technician Details Error:", error);
        return { success: false, message: "Failed to fetch technician details", data: null };
    }
};

export interface CreateBookingPayload {
    service_id: string;
    booking_date: string;
    start_time: string;
    end_time: string;
    price?: number;
    fullName?: string;
    phoneNumber?: string;
    address?: string;
    notes?: string;
}

export const createServiceBookingAction = async (payload: CreateBookingPayload) => {
    try {
        const headers = await getAuthHeaders();
        if (!headers) {
            return {
                success: false,
                requiresLogin: true,
                message: "Please sign in or create an account to confirm your booking."
            };
        }

        // Validate payload server-side
        if (!payload.service_id) {
            return { success: false, message: "Service ID is required" };
        }
        if (!payload.booking_date) {
            return { success: false, message: "Appointment date is required" };
        }
        if (!payload.start_time) {
            return { success: false, message: "Appointment time slot is required" };
        }

        // Authoritatively fetch service to verify active status and actual price
        const serviceRes = await fetch(`${getBaseUrl()}/api/services/${payload.service_id}`, {
            cache: "no-store"
        });
        const serviceData = await handleApiResponse(serviceRes);
        if (!serviceData.success || !serviceData.data) {
            return { success: false, message: "Service is not available or does not exist." };
        }

        const verifiedService = serviceData.data;
        const authoritativePrice = Number(verifiedService.price) || payload.price || 0;

        const bookingBody = {
            service_id: payload.service_id,
            booking_date: new Date(payload.booking_date).toISOString(),
            start_time: payload.start_time,
            end_time: payload.end_time || "12:00 PM",
            price: authoritativePrice,
            notes: payload.notes || ""
        };

        const res = await fetch(`${getBaseUrl()}/api/bookings`, {
            method: "POST",
            headers,
            body: JSON.stringify(bookingBody),
            cache: "no-store"
        });

        const result = await handleApiResponse(res);
        return result;
    } catch (error) {
        console.error("Create Booking Error:", error);
        return {
            success: false,
            message: "An unexpected error occurred while confirming your booking. Please try again."
        };
    }
};

export const bookServiceAction = async (serviceId: string): Promise<void> => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;

    if (!accessToken) {
        console.error("Book Service Error: User not logged in!");
        redirect("/login");
        return;
    }

    let bookingCreated = false;

    try {
        const res = await fetch(`${getBaseUrl()}/api/bookings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: `accessToken=${accessToken}`
            },
            body: JSON.stringify({
                service_id: serviceId,
                booking_date: new Date().toISOString(),
                start_time: "10:00 AM",
                end_time: "11:00 AM"
            }),
            cache: "no-store"
        });

        const result = await handleApiResponse(res);

        if (result.success && result.data) {
            bookingCreated = true;
        } else {
            console.error("Book Service Error:", result.message || "Failed to create booking.");
        }
    } catch (error) {
        console.error("Book Service Error:", error);
    }

    if (bookingCreated) {
        redirect("/dashboard/customer/bookings?booked=true");
    }
};
