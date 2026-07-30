"use client"

import { useActionState, useEffect } from "react"
import { useFormStatus } from "react-dom"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Zap, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { registerUser } from "../_action/register"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="w-full" disabled={pending}>
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
  const [state, formAction] = useActionState(registerUser, null)

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
    <div className="w-full max-w-md space-y-6 rounded-xl border border-border bg-card p-6 shadow-lg sm:p-8">
      
      {/* Header */}
      <div className="flex flex-col items-center space-y-2 text-center">
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-md">
          <Zap className="size-5" strokeWidth={2.5} />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Create an Account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your details below to create your account
        </p>
      </div>

      {/* Form */}
      <form action={formAction} className="space-y-4">
        
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Tanvir Ahmed"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
          />
        </div>

        <SubmitButton />
      </form>

      {/* Footer Link */}
      <div className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Sign In
        </Link>
      </div>

    </div>
  )
}