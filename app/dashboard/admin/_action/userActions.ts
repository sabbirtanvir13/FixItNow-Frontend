"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const API_BASE_URL = "https://fixitnow-backend-hi9a.onrender.com/api";

async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value || cookieStore.get("token")?.value || "";
}


export async function getAllUsers(query?: { search?: string; role?: string; status?: string }) {
  try {
    const token = await getToken();
    const params = new URLSearchParams();
    if (query?.search) params.append("search", query.search);
    if (query?.role && query.role !== "All") params.append("role", query.role);
    if (query?.status && query.status !== "All") params.append("active_status", query.status);

    const res = await fetch(`${API_BASE_URL}/admin/users?${params.toString()}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to fetch users");
    return { success: true, data: result.data || [] };
  } catch (error: any) {
    console.error("Fetch users error:", error.message);
    return { success: false, message: error.message, data: [] };
  }
}


export async function getSingleUser(id: string) {
  try {
    const token = await getToken();
    const res = await fetch(`${API_BASE_URL}/admin/users`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to fetch users");

    const users = result.data || [];
    const singleUser = users.find((u: any) => u.id === id || u._id === id);

    if (!singleUser) {
      throw new Error("User not found in the system");
    }

    return { success: true, data: singleUser };
  } catch (error: any) {
    console.error("Fetch user detail error:", error.message);
    return { success: false, message: error.message };
  }
}

export async function updateUserStatus(id: string, active_status: string) {
  try {
    const token = await getToken();
    const res = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ active_status }),
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to update user status");

    revalidatePath("/dashboard/admin/users");
    return { success: true, data: result.data, message: "User status updated successfully" };
  } catch (error: any) {
    console.error("Update user status error:", error.message);
    return { success: false, message: error.message };
  }
}


export async function deleteUser(id: string) {
  try {
    const token = await getToken();
    const res = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message || "Failed to delete user");

    revalidatePath("/dashboard/admin/users");
    return { success: true, message: "User deleted successfully" };
  } catch (error: any) {
    console.error("Delete user error:", error.message);
    return { success: false, message: error.message };
  }
}