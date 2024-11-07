"use client"
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
import { useState } from "react"

import toast from "react-hot-toast";
import { useRouter } from "next/navigation"
import axios from "axios"

export function SignupForm() {
  const router = useRouter();
  const [username, setUsername] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
  const accountCreation = async() => {
    const data = {
        username, password,email
    }
    console.log(data);
    const req = await axios.post("/api/auth/signup", data);
    const res = req.data;
    console.log(res);
    if (res.type == "success"){
      toast.success(res.message);
      router.push("/login")
  }
  else {
      toast.error(res.message);
  }
}

  return (
    (<Card className="my-10 mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Signup</CardTitle>
        <CardDescription>
          Enter details below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input value={email} onChange={e=>setEmail(e.target.value)} id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input value={username} onChange={e=>setUsername(e.target.value)} id="username" type="text" placeholder="username" required />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              
            </div>
            <Input value={password} onChange={e=>setPassword(e.target.value)} id="password" type="password" required />
          </div>
          <Button onClick={accountCreation} type="submit" className="w-full">
            Create account
          </Button>
        
        </div>
        <div className="mt-4 text-center text-sm">
          Have an account?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>)
  );
}
