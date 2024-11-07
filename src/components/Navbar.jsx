"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, User, LogOut, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import axios from "axios"
import { useUserStore } from "@/store/store"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import ThemeToggle from "./ThemeToggle"
import Image from "next/image"
const navItems = [
  { name: "Home", href: "/" },
  { name: "Library", href: "/library" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export default function Navbar() {
const {SetIsLogin, SetEmail, SetUsername, SetUserId, IsLogin, Username, UserId} = useUserStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  const verifyToken = async() => {
    const token = localStorage.getItem("revi-token");
    const req = await axios.post("/api/auth/verify", {
      token: token
    })
    console.log(req)

    if (req.data.type == "success") {
      SetIsLogin(true);
      SetUsername(req.data.user.username);
      SetEmail(req.data.user.email);
      SetUserId(req.data.user._id);
    }
    else {
      toast.error("token expired. Please log in")
    }

  }

  React.useEffect(() => {
   verifyToken();
  }, [])
  

  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href={"/"}>
              <span className="text-2xl font-bold text-primary">
                <Image src="/logo.png" alt="logo" width={40} height={40} />
              </span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
          <ThemeToggle  className="mx-5"/>

            {
                    IsLogin?(
                      <ProfileDropdown Username={Username}/>

                    ):(
                      <div>
                        <Button className={"mx-3"} asChild>
  <Link href="/login">Login</Link>
</Button>


<Button asChild>
  <Link href="/signup">Signup</Link>
</Button>
                        </div>
                    )
                  }
          </div>
          <div className="flex items-center sm:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground">
                  <span className="sr-only">Open main menu</span>
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:hidden">
                <nav className="mt-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <ThemeToggle  className="mx-5"/>
                  {
                    IsLogin?(
                      <ProfileDropdown Username={Username}/>
                    ):(
                      <div>
                        <Button  className={"mx-3"}  asChild>
  <Link href="/login">Login</Link>
</Button>


<Button asChild>
  <Link href="/signup">Signup</Link>
</Button>
                        </div>
                    )
                  }
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

function ProfileDropdown({Username}) {
  const router = useRouter();
const {SetIsLogin, SetEmail, SetUsername, SetUserId, UserId} = useUserStore();

  const logout = () => {
    localStorage.removeItem("revi-token");
    toast.success("Logged out successfully");
    router.push("/login");
    SetIsLogin(false);
    SetEmail("");
    SetUsername("");
    SetUserId("");
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <User className="h-6 w-6" />
          <span className="sr-only">Open user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
      <DropdownMenuItem>
      <p>Welcome, {Username}</p>
      {/* <p>User ID: {UserId}</p> */}
      </DropdownMenuItem>
        <DropdownMenuItem>
          <Link className="flex justify-center items-center" href={"/decks"}>
          <User className="mr-2 h-4 w-4" />
          <span>Decks</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}