

"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import { useFormStatus } from "react-dom"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Zap, Loader2, User, Camera, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { registerUser, PostState } from "../_action/register"

type Role = "Customer" | "Technician"

const ROLES: { value: Role; emoji: string; label: string }[] = [
  { value: "Customer", emoji: "👤", label: "Customer" },
  { value: "Technician", emoji: "🛠️", label: "Technician" },
]

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024 // 5 MB
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="w-full h-12 rounded-xl font-bold" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 size-4 animate-spin" />
          Creating account...
        </>
      ) : (
        "Sign Up"
      )}
    </Button>
  )
}

export function RegisterForm() {
  const router = useRouter()
  const [state, formAction] = useActionState<PostState | null, FormData>(registerUser, null)

  const [selectedRole, setSelectedRole] = useState<Role>("Customer")
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (state) {
      if (state.success) {
        toast.success(state.message)
        router.push("/login")
      } else {
        toast.error(state.message)
      }
    }
  }, [state, router])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Only JPG, JPEG, PNG, and WEBP images are allowed.")
      e.target.value = ""
      return
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      toast.error("Image must be smaller than 5 MB.")
      e.target.value = ""
      return
    }

    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleRemoveImage = () => {
    setImageFile(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const wrappedAction = (formData: FormData) => {
    formData.set("role", selectedRole)
    if (imageFile) {
      // ব্যাকএন্ডের upload.single("profileImage") এর সাথে মিলিয়ে এখানেও 'profileImage' দেওয়া হলো
      formData.set("profileImage", imageFile)
    }
    return formAction(formData)
  }

  return (
    <div className="w-full max-w-xl space-y-6 rounded-2xl border border-border bg-card p-6 shadow-xl sm:p-10">
      <div className="flex flex-col items-center space-y-2 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary shadow-md">
          <Zap className="size-6" strokeWidth={2.5} />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Create an Account
        </h1>
        <p className="text-sm text-muted-foreground font-medium">
          Enter your details below to create your account
        </p>
      </div>

      <div className="flex rounded-xl border border-border bg-muted p-1 gap-1">
        {ROLES.map(({ value, emoji, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => setSelectedRole(value)}
            className={`
              flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200
              ${selectedRole === value
                ? "bg-background text-primary shadow-sm border border-border"
                : "text-muted-foreground hover:text-foreground"
              }
            `}
          >
            {emoji} {label}
          </button>
        ))}
      </div>

      <form action={wrappedAction} className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            Profile Image{" "}
            <span className="text-muted-foreground font-normal">(Optional)</span>
          </Label>

          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 flex-shrink-0">
              {imagePreview ? (
                <>
                  <Image
                    src={imagePreview}
                    alt="Profile preview"
                    fill
                    className="rounded-full object-cover border-2 border-primary/40"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-white rounded-full flex items-center justify-center shadow-md hover:bg-destructive/80 transition"
                    aria-label="Remove image"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </>
              ) : (
                <div className="w-16 h-16 rounded-full bg-muted border-2 border-dashed border-border flex items-center justify-center">
                  <User className="w-6 h-6 text-muted-foreground" />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background hover:bg-muted text-sm font-medium text-foreground transition-colors"
              >
                <Camera className="w-4 h-4" />
                {imagePreview ? "Change Image" : "Upload Image"}
              </button>
              <p className="text-[11px] text-muted-foreground">
                JPG, PNG, WEBP · Max 5 MB
              </p>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" type="text" placeholder="Tanvir Ahmed" required className="h-12 rounded-xl" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="m@example.com" required className="h-12 rounded-xl" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" placeholder="••••••••" required className="h-12 rounded-xl" />
        </div>

        <SubmitButton />
      </form>

      <div className="text-center text-sm text-muted-foreground font-medium">
        Already have an account?{" "}
        <Link href="/login" className="font-bold text-primary underline-offset-4 hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  )
}