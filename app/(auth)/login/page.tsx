import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import LoginForm from "../_component/loginFrom"

export default function LoginPage() {
  return (

    <>
      <div className="flex min-h-screen items-center justify-center  p-4">

        <div className="w-full max-w-md">

          <div className="flex flex-col items-center mb-8">


          </div>


          <LoginForm></LoginForm>
        </div>

      </div>
    </>
  )
}
