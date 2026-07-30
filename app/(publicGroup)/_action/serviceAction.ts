"use server";

import { cookies } from "next/headers";

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