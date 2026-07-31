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

export const getCategory = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;
    
    try {
        const headers: Record<string, string> = {};
        
        if (accessToken) {
            headers["Cookie"] = `accessToken=${accessToken}`;
            
           
        }

        const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`, {
            headers,
            next: {
                tags: ["category"]
            }
        });

        const result = await handleApiResponse(res);
        return result;
    } catch (error) {
        console.error("Get Category Error:", error);
        return { 
            success: false, 
            message: "Failed to connect to the backend server!", 
            data: [] 
        };
    }
};