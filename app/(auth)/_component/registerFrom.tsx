"use client"

import { useActionState, useEffect, useState } from "react"
import { useFormStatus } from "react-dom"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Zap, Loader2, User, Link as LinkIcon } from "lucide-react"
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
  const [imageUrl, setImageUrl] = useState<string>("")

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

      <form action={formAction} className="space-y-4">
        {/* Hidden Role Input */}
        <input type="hidden" name="role" value={selectedRole} />

        {/* Profile Image URL Input with Live Preview */}
        <div className="space-y-2">
          <Label htmlFor="profileImage" className="text-sm font-medium text-foreground">
            Profile Image URL <span className="text-muted-foreground font-normal">(Optional)</span>
          </Label>

          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 flex-shrink-0">
              {imageUrl.trim() ? (
                <img
                  src={imageUrl}
                  alt="Profile preview"
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/40"
                  onError={(e) => {
                    // ইমেজ লিংক ভাঙা বা ভুল হলে ডিফল্ট আইকন দেখাবে
                    (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=User"
                  }}
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-muted border-2 border-dashed border-border flex items-center justify-center">
                  <User className="w-5 h-5 text-muted-foreground" />
                </div>
              )}
            </div>

            <div className="relative flex-1">
              <Input
                id="profileImage"
                name="profileImage"
                type="url"
                placeholder="https://example.com/avatar.png"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="h-12 rounded-xl pl-9"
              />
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
          </div>
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