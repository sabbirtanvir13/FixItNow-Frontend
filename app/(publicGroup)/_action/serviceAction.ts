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
            data: []
        };
    }

    return await res.json();
};


export const getAllCategoriesData = async () => {
    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
            cache: "no-store"
        });

        const result = await handleApiResponse(res);
        return result;
    } catch (error) {
        console.error("Get categories Error:", error);
        return { success: false, message: "Failed to connect to the backend server!", data: [] };
    }
};

export const getAllServiceData = async (endpoint: string, tag?: string) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;

    if (!accessToken) {
        return {
            success: false,
            message: "User not logged in!",
            data: []
        };
    }

    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/services`, {
            headers: {
                Cookie: `accessToken=${accessToken}`
            },
            next: {
                tags: tag ? [tag] : ["getData"]
            }
        });

        const result = await handleApiResponse(res);
        return result;
    } catch (error) {
        console.error("Get data Error:", error);
        return { success: false, message: "Failed to connect to the backend server!", data: [] };
    }
};


export const getDataById = async (endpoint: string, id: string) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;

    if (!accessToken) {
        return {
            success: false,
            message: "User not logged in!",
            data: null
        };
    }

    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/services/${id}`, {
            headers: {
                Cookie: `accessToken=${accessToken}`
            },
            cache: "no-store"
        });

        const result = await handleApiResponse(res);
        return result;
    } catch (error) {
        console.error("Get data by ID Error:", error);
        return { success: false, message: "Failed to connect to the backend server!", data: null };
    }
};


export const bookServiceAction = async (serviceId: string): Promise<void> => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;

    if (!accessToken) {
        console.error("Book Service Error: User not logged in!");
        return;
    }

    let bookingCreated = false;

    try {
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/bookings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: `accessToken=${accessToken}`
            },
            body: JSON.stringify({
                service_id: serviceId,
                booking_date: new Date().toISOString(),
                start_time: "10:00",
                end_time: "11:00"
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
