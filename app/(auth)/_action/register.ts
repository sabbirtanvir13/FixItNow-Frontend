"use server"

export async function registerUser(prevState: any, formData: FormData) {
  const name = formData.get("name")
  const email = formData.get("email")
  const password = formData.get("password")

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
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