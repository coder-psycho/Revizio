import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">About Us</h2>
            <p className="text-sm text-muted-foreground">
              We are a company dedicated to providing excellent services and products to our customers.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Quick Links</h2>
            <ul className="space-y-2">
              {["Home", "About", "Services", "Contact"].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-primary">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Contact Us</h2>
            <address className="text-sm text-muted-foreground not-italic">
              <p>123 Main Street</p>
              <p>Anytown, ST 12345</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: info@example.com</p>
            </address>
          </div>
         
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Your Company Name. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <SocialIcon href="#" Icon={Facebook} label="Facebook" />
            <SocialIcon href="#" Icon={Twitter} label="Twitter" />
            <SocialIcon href="#" Icon={Instagram} label="Instagram" />
            <SocialIcon href="#" Icon={Linkedin} label="LinkedIn" />
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialIcon({ href, Icon, label }) {
  return (
    <a href={href} className="text-muted-foreground hover:text-primary" aria-label={label}>
      <Icon className="h-6 w-6" />
    </a>
  )
}