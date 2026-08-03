


"use client"

import React, { useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Mail, Lock } from 'lucide-react'
import { loginAction } from '../_action/authAction'
import { toast } from 'sonner'
import { useActionState } from 'react'

const LoginForm = () => {
  const [state, action, pending] = useActionState(loginAction, null)

  useEffect(() => {
    if (!state) return

    if (state.success === false) {
      toast.error(state.message || "Sign In failed")
    } else if (state.success === true) {
      toast.success("Welcome back to FixItNow!")
    }
  }, [state])

  return (
    <Card className="w-full max-w-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xl rounded-2xl p-6 sm:p-10">
      <CardHeader className="space-y-3 text-center pb-6 pt-2">
        <div className="mx-auto bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-1">
          <Lock className="text-primary w-8 h-8" />
        </div>
        <CardTitle className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-slate-500 dark:text-slate-400 font-medium text-base">
          Sign in to your account to continue
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <form action={action} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-700 dark:text-slate-300 font-semibold">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                className="pl-11 h-12 border-slate-300 dark:border-slate-700 focus:border-primary focus:ring-primary rounded-xl bg-white dark:bg-slate-800 dark:text-white"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-slate-700 dark:text-slate-300 font-semibold">Password</Label>
              <a href="#" className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                className="pl-11 h-12 border-slate-300 dark:border-slate-700 focus:border-primary focus:ring-primary rounded-xl bg-white dark:bg-slate-800 dark:text-white"
                required
              />
            </div>
          </div>

          <Button className="w-full h-12 text-base rounded-xl font-bold shadow-md hover:shadow-lg transition-all pt-1 mt-2" type="submit" disabled={pending}>
            {pending ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="pb-4 pt-2 flex justify-center">
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
          Don&apos;t have an account? <a href="/register" className="text-primary hover:underline font-bold">Sign up</a>
        </p>
      </CardFooter>
    </Card>
  )
}

export default LoginForm