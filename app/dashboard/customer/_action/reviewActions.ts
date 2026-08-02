// "use server";

// import { revalidatePath } from "next/cache";
// import { cookies } from "next/headers";

// const API_BASE_URL = process.env.BACKEND_API_URL || "https://fixitnow-backend-one.vercel.app/api";

// async function getToken() {
//   const cookieStore = await cookies();
//   return cookieStore.get("accessToken")?.value || cookieStore.get("token")?.value || "";
// }


// export async function getMyReviews() {
//   try {
//     const token = await getToken();
//     const res = await fetch(`${API_BASE_URL}/reviews/my-reviews`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       cache: "no-store",
//     });

//     const result = await res.json();
//     if (!res.ok) throw new Error(result.message || "Failed to fetch reviews");

//     return { success: true, data: result.data || [] };
//   } catch (error: any) {
//     console.error("Fetch reviews error:", error.message);
//     return { success: false, message: error.message, data: [] };
//   }
// }


// export async function getSingleReview(id: string) {
//   try {
//     const token = await getToken();
//     const res = await fetch(`${API_BASE_URL}/reviews/${id}`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       cache: "no-store",
//     });

//     const result = await res.json();
//     if (!res.ok) throw new Error(result.message || "Failed to fetch review details");

//     return { success: true, data: result.data };
//   } catch (error: any) {
//     console.error("Fetch review detail error:", error.message);
//     return { success: false, message: error.message };
//   }
// }


// export async function createReview(payload: { booking_id: string; technician_id: string; rating: number; comment: string }) {
//   try {
//     const token = await getToken();
//     const res = await fetch(`${API_BASE_URL}/reviews`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(payload),
//     });

//     const result = await res.json();
//     if (!res.ok) throw new Error(result.message || "Failed to submit review");

//     revalidatePath("/dashboard/customer/reviews");
//     return { success: true, data: result.data, message: "Review created successfully" };
//   } catch (error: any) {
//     console.error("Create review error:", error.message);
//     return { success: false, message: error.message };
//   }
// }


// export async function updateReview(id: string, payload: { rating: number; comment: string }) {
//   try {
//     const token = await getToken();
//     const res = await fetch(`${API_BASE_URL}/reviews/${id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(payload),
//     });

//     const result = await res.json();
//     if (!res.ok) throw new Error(result.message || "Failed to update review");

//     revalidatePath("/dashboard/customer/reviews");
//     return { success: true, data: result.data, message: "Review updated successfully" };
//   } catch (error: any) {
//     console.error("Update review error:", error.message);
//     return { success: false, message: error.message };
//   }
// }

// export async function deleteReview(id: string) {
//   try {
//     const token = await getToken();
//     const res = await fetch(`${API_BASE_URL}/reviews/${id}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const result = await res.json();
//     if (!res.ok) throw new Error(result.message || "Failed to delete review");

//     revalidatePath("/dashboard/customer/reviews");
//     return { success: true, message: "Review deleted successfully" };
//   } catch (error: any) {
//     console.error("Delete review error:", error.message);
//     return { success: false, message: error.message };
//   }
// }


"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const API_BASE_URL =
  process.env.BACKEND_API_URL ||
  "https://fixitnow-backend-one.vercel.app/api";
console.log("API_BASE_URL =", API_BASE_URL);


async function getToken() {
  const cookieStore = await cookies();
  return (
    cookieStore.get("accessToken")?.value ||
    cookieStore.get("token")?.value ||
    ""
  );
}

async function getHeaders() {
  const token = await getToken();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}


export async function getMyReviews() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/reviews/my-reviews`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
      cache: "no-store",
    });
    console.log("URL =", `${API_BASE_URL}/api/reviews/my-reviews`);

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to fetch reviews");
    }

    return {
      success: true,
      data: result.data || [],
    };
  } catch (error: any) {
    console.error("Fetch reviews error:", error);

    return {
      success: false,
      message: error.message,
      data: [],
    };
  }
}



export async function getSingleReview(id: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/reviews/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to fetch review");
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error: any) {
    console.error("Get review error:", error);

    return {
      success: false,
      message: error.message,
    };
  }
}



export async function createReview(payload: {
  booking_id: string;
  technician_id: string;
  rating: number;
  comment: string;
}) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/reviews`, {
      method: "POST",
      headers: await getHeaders(),
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const result = await res.json();

    console.log("========== CREATE REVIEW ==========");
    console.log("URL:", `${API_BASE_URL}/api/reviews`);
    console.log("Payload:", payload);
    console.log("Status:", res.status);
    console.log("Response:", result);
    console.log("===================================");

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to create review",
      };
    }

    revalidatePath("/dashboard/customer/reviews");
    revalidatePath(`/dashboard/customer/bookings/${payload.booking_id}`);

    return {
      success: true,
      message: result.message || "Review created successfully",
      data: result.data,
    };
  } catch (error: any) {
    console.error("Create review error:", error);

    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
}



export async function updateReview(
  id: string,
  payload: {
    rating: number;
    comment: string;
  }
) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/reviews/${id}`, {
      method: "PATCH",
      headers: await getHeaders(),
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to update review");
    }

    revalidatePath("/dashboard/customer/reviews");

    return {
      success: true,
      message: result.message || "Review updated successfully",
      data: result.data,
    };
  } catch (error: any) {
    console.error("Update review error:", error);

    return {
      success: false,
      message: error.message,
    };
  }
}



export async function deleteReview(id: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/reviews/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to delete review");
    }

    revalidatePath("/dashboard/customer/reviews");

    return {
      success: true,
      message: result.message || "Review deleted successfully",
    };
  } catch (error: any) {
    console.error("Delete review error:", error);

    return {
      success: false,
      message: error.message,
    };
  }
}