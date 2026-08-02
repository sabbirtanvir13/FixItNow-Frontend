"use server";

import { cookies } from "next/headers";

const BASE_URL = process.env.BACKEND_API_URL || "https://fixitnow-backend-one.vercel.app";

async function getAuthHeaders() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value || null;
    return {
        "Content-Type": "application/json",
        ...(accessToken ? { Cookie: `accessToken=${accessToken}` } : {})
    };
}

// পেমেন্ট তৈরি এবং SSLCommerz গেটওয়ে ইউআরএল আনা
export async function createPayment(bookingId: string) {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${BASE_URL}/api/payments/create`, {
            method: "POST",
            headers,
            body: JSON.stringify({ bookingId }),
            cache: "no-store"
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error("Create Payment Error:", error);
        return { success: false, message: "Failed to connect to the server!", data: null };
    }
}

// পেমেন্ট কনফার্ম করা
export async function confirmPayment(tranId: string) {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${BASE_URL}/api/payments/confirm`, {
            method: "POST",
            headers,
            body: JSON.stringify({ tran_id: tranId }),
            cache: "no-store"
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error("Confirm Payment Error:", error);
        return { success: false, message: "Payment confirmation failed!", data: null };
    }
}

// পেমেন্ট হিস্ট্রি আনা
export async function getPaymentHistory() {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${BASE_URL}/api/payments`, {
            headers,
            cache: "no-store"
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error("Payment History Error:", error);
        return { success: false, message: "Failed to fetch payment history!", data: null };
    }
}

// নির্দিষ্ট পেমেন্ট ডিটেইলস আনা
export async function getPaymentDetails(id: string) {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${BASE_URL}/api/payments/${id}`, {
            headers,
            cache: "no-store"
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error("Payment Details Error:", error);
        return { success: false, message: "Failed to fetch payment details!", data: null };
    }
}