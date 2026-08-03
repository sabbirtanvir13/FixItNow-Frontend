"use server"

import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import jwt, { JwtPayload } from "jsonwebtoken"

type LoginResult = {
  success: boolean
  statusCode?: number
  message?: string
  roleMismatch?: string
  data?: {
    accessToken: string
    refreshToken: string
  }
}

export const loginAction = async (prevState: LoginResult | null, fromData: FormData): Promise<LoginResult> => {
  const email = fromData.get("email")
  const password = fromData.get("password")
  const selectedRole = (fromData.get("role") as string) || "Customer"

  // Defensive validation: ensure required fields are present
  if (!email || !password) {
    return { success: false, message: "Missing email or password" }
  }

  const payload = { email, password }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })

  const result = await res.json()

  if (result.success) {
    const cookieStore = await cookies()

    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    })

    cookieStore.set("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    })

    const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload & {
      role: string
    }

    const backendRole = decodedToken?.role

    // Role mismatch check — compare selected tab role with actual account role
    if (
      (selectedRole === "Customer" && backendRole === "Technician") ||
      (selectedRole === "Technician" && backendRole === "Customer")
    ) {
      // Clear the cookies we just set since the role is wrong
      cookieStore.delete("accessToken")
      cookieStore.delete("refreshToken")

      return {
        success: false,
        message: `Role mismatch`,
        roleMismatch:
          selectedRole === "Customer"
            ? "You selected Customer but this account belongs to a Technician."
            : "You selected Technician but this account belongs to a Customer.",
      }
    }

    // Redirect based on actual backend role
    if (backendRole === "Admin") {
      redirect("/dashboard/admin")
    } else if (backendRole === "Technician") {
      redirect("/dashboard/technician")
    } else if (backendRole === "Customer") {
      redirect("/dashboard/customer")
    } else {
      redirect("/login")
    }
  }

  return result
}