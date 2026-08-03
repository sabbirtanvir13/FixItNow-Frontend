"use server"

export async function registerUser(prevState: any, formData: FormData) {
  const name = formData.get("name")
  const email = formData.get("email")
  const password = formData.get("password")
  const role = formData.get("role") || "Customer"

  try {
    let body: FormData | string
    let headers: Record<string, string> = {}

    const profileImageFile = formData.get("profileImage") as File | null
    const hasImage = profileImageFile && profileImageFile.size > 0

    if (hasImage) {
      // Send as multipart/form-data so backend can receive the image
      const multipart = new FormData()
      multipart.append("name", name as string)
      multipart.append("email", email as string)
      multipart.append("password", password as string)
      multipart.append("role", role as string)
      multipart.append("profileImage", profileImageFile)
      body = multipart
      // Do NOT set Content-Type — browser sets it with boundary automatically
    } else {
      body = JSON.stringify({ name, email, password, role })
      headers["Content-Type"] = "application/json"
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
      method: "POST",
      headers,
      body,
    })

    const result = await res.json()

    if (!res.ok) {
      return { 
        success: false, 
        message: result.message || "Registration failed" 
      }
    }

    return { 
      success: true, 
      message: result.message || "Registration successful",
      data: result.data 
    }
  } catch (error) {
    return { 
      success: false, 
      message: "Something went wrong. Please try again." 
    }
  }
}