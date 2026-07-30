// "use server"

// import { cookies } from "next/headers"

// export const GetMe = async () => {
//     const cookieStore = await cookies();
//     const accessToken = cookieStore.get("accessToken")?.value;
    
//     if (!accessToken) {
//         return null;
//     }

//     const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/me`, {
//         headers: {
//             cookie: `accessToken=${accessToken}` 
//         },
//         cache:"no-store",
//         next: {
//             revalidate: 60 * 60 * 24,
//             tags: ["MY-PROFILE"]
//         }
//     });

//     if (!res.ok) {
//         return null;
//     }

//     const result = await res.json(); 
//     return result;
// }


"use server"

import { cookies } from "next/headers"

export const GetMe = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    
    if (!accessToken) {
        return null;
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/me`, {
        headers: {
            cookie: `accessToken=${accessToken}` 
        },
       
        cache: "no-store" 
    });

    if (!res.ok) {
        return null;
    }

    const result = await res.json(); 
    return result;
}