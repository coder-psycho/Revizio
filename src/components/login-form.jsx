import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import toast from "react-hot-toast"
import { useState } from "react"

export function LoginForm() {
  const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
  const login = async() => {
    const data = {
        username, password
    }
    console.log(data)

  try {
    const req = await axios.post("/api/auth/login", data);
    const res = req.data;
    console.log(res);
    if (res.type == "success"){
        toast.success(res.message);
        SetIsLogin(true);
        localStorage.setItem("revi-token", res.token)
        
    }
    else {
        toast.error(res.message);
    }
  }
  catch(error) {
    toast.error(error.response.data.message)
  }
}
  return (
    (<Card className="my-10 mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input value={email} onChange={e=>setEmail(e.target.value)} id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
          
            </div>
            <Input value={password} onChange={e=>setPassword(e.target.value)} id="password" type="password" required />
          </div>
          <Button onClick={login} type="submit" className="w-full">
            Login
          </Button>
        
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>)
  );
}
