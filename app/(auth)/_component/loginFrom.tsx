// "use client"

// import React, { useState, useEffect } from 'react'
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle
// } from '@/components/ui/card'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { Button } from '@/components/ui/button'
// import { Mail, Lock, User, Wrench } from 'lucide-react'
// import { loginAction } from '../_action/authAction'
// import { toast } from 'sonner'
// import { useActionState } from 'react'

// type Role = "Customer" | "Technician"

// const ROLES: { value: Role; label: string; icon: React.ReactNode }[] = [
//   {
//     value: "Customer",
//     label: "Customer",
//     icon: <User className="w-4 h-4" />,
//   },
//   {
//     value: "Technician",
//     label: "Technician",
//     icon: <Wrench className="w-4 h-4" />,
//   },
// ]

// const LoginForm = () => {
//   const [selectedRole, setSelectedRole] = useState<Role>("Customer")
//   const [state, action, pending] = useActionState(loginAction, null)

//   useEffect(() => {
//     if (!state) return

//     if (state.success === false) {
//       // If there's a role mismatch, show the specific message; otherwise show the generic error
//       toast.error((state as any).roleMismatch || state.message || "Sign In failed")
//     } else if (state.success === true) {
//       toast.success("Welcome back to FixItNow!")
//     }
//   }, [state])

//   return (
//     <Card className="w-full max-w-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xl rounded-2xl p-6 sm:p-10">
//       <CardHeader className="space-y-3 text-center pb-6 pt-2">
//         <div className="mx-auto bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-1">
//           <Lock className="text-primary w-8 h-8" />
//         </div>
//         <CardTitle className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
//           Welcome Back
//         </CardTitle>
//         <CardDescription className="text-slate-500 dark:text-slate-400 font-medium text-base">
//           Sign in to your account to continue
//         </CardDescription>
//       </CardHeader>

//       <CardContent className="space-y-6">
//         {/* Role Selector Tabs */}
//         <div className="flex rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-1 gap-1">
//           {ROLES.map(({ value, label, icon }) => (
//             <button
//               key={value}
//               type="button"
//               onClick={() => setSelectedRole(value)}
//               className={`
//                 flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200
//                 ${selectedRole === value
//                   ? "bg-white dark:bg-slate-900 text-primary shadow-sm border border-slate-200 dark:border-slate-700"
//                   : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
//                 }
//               `}
//             >
//               {icon}
//               {value === "Customer" ? "" : ""} {label}
//             </button>
//           ))}
//         </div>

//         {/* Google Login */}
//         <div>
//           <Button
//             variant="outline"
//             type="button"
//             className="w-full h-12 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold border-slate-200 dark:border-slate-700 rounded-xl"
//           >
//             <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
//               <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
//               <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
//               <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
//               <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
//             </svg>
//             Continue with Google
//           </Button>
//         </div>

//         {/* Divider */}
//         <div className="relative my-2">
//           <div className="absolute inset-0 flex items-center">
//             <span className="w-full border-t border-slate-200 dark:border-slate-800" />
//           </div>
//           <div className="relative flex justify-center text-xs uppercase">
//             <span className="bg-white dark:bg-slate-900 px-3 text-slate-500 dark:text-slate-400 font-semibold rounded-full">
//               Or continue with email
//             </span>
//           </div>
//         </div>

//         {/* Form Fields */}
//         <form action={action} className="space-y-5">
//           {/* Hidden role field — passed to server action via FormData */}
//           <input type="hidden" name="role" value={selectedRole} />

//           <div className="space-y-2">
//             <Label htmlFor="email" className="text-slate-700 dark:text-slate-300 font-semibold">Email</Label>
//             <div className="relative">
//               <Mail className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400" />
//               <Input
//                 id="email"
//                 name="email"
//                 type="email"
//                 placeholder="name@example.com"
//                 className="pl-11 h-12 border-slate-300 dark:border-slate-700 focus:border-primary focus:ring-primary rounded-xl bg-white dark:bg-slate-800 dark:text-white"
//                 required
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <div className="flex items-center justify-between">
//               <Label htmlFor="password" className="text-slate-700 dark:text-slate-300 font-semibold">Password</Label>
//               <a href="#" className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
//                 Forgot password?
//               </a>
//             </div>
//             <div className="relative">
//               <Lock className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400" />
//               <Input
//                 id="password"
//                 name="password"
//                 type="password"
//                 placeholder="••••••••"
//                 className="pl-11 h-12 border-slate-300 dark:border-slate-700 focus:border-primary focus:ring-primary rounded-xl bg-white dark:bg-slate-800 dark:text-white"
//                 required
//               />
//             </div>
//           </div>

//           <Button className="w-full h-12 text-base rounded-xl font-bold shadow-md hover:shadow-lg transition-all pt-1 mt-2" type="submit">
//             {pending ? "Submitting..." : `Sign In as ${selectedRole}`}
//           </Button>
//         </form>
//       </CardContent>

//       <CardFooter className="pb-4 pt-2 flex justify-center">
//         <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
//           Don&apos;t have an account? <a href="/register" className="text-primary hover:underline font-bold">Sign up</a>
//         </p>
//       </CardFooter>
//     </Card>
//   )
// }

// export default LoginForm


"use client"

import React, { useState, useEffect } from 'react'
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
import { Mail, Lock, User, Wrench } from 'lucide-react'
import { loginAction } from '../_action/authAction'
import { toast } from 'sonner'
import { useActionState } from 'react'

type Role = "Customer" | "Technician"

const ROLES: { value: Role; label: string; icon: React.ReactNode }[] = [
  {
    value: "Customer",
    label: "Customer",
    icon: <User className="w-4 h-4" />,
  },
  {
    value: "Technician",
    label: "Technician",
    icon: <Wrench className="w-4 h-4" />,
  },
]

const LoginForm = () => {
  const [selectedRole, setSelectedRole] = useState<Role>("Customer")
  const [state, action, pending] = useActionState(loginAction, null)

  useEffect(() => {
    if (!state) return

    if (state.success === false) {
      toast.error((state as any).roleMismatch || state.message || "Sign In failed")
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
        <div className="flex rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-1 gap-1">
          {ROLES.map(({ value, label, icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => setSelectedRole(value)}
              className={`
                flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200
                ${selectedRole === value
                  ? "bg-white dark:bg-slate-900 text-primary shadow-sm border border-slate-200 dark:border-slate-700"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                }
              `}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>

        <form action={action} className="space-y-5">
          <input type="hidden" name="role" value={selectedRole} />

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
            {pending ? "Signing In..." : `Sign In as ${selectedRole}`}
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