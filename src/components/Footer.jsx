import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Github } from "lucide-react"

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
            A flashcard platform that enhances learning with adaptive spaced repetition for efficient knowledge retention.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Quick Links</h2>
            <ul className="space-y-2">
              {["Home", "About", "Library", "Contact"].map((item) => (
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
            © {new Date().getFullYear()} Revizio. Developed by: <a href="https://github.com/itspsychocoder" target="_blank">Psycho Coder</a>
          </div>
          <div className="flex space-x-4">
            <SocialIcon href="https://github.com/itspsychocoder/" Icon={Github} label="Facebook" />
            <SocialIcon href="https://x.com/itspsychocoder" Icon={Twitter} label="Twitter" />
            <SocialIcon href="https://instagram.com/phobic.psycho" Icon={Instagram} label="Instagram" />
            <SocialIcon href="https://linkedin.com/in/hussnain-ahmad/" Icon={Linkedin} label="LinkedIn" />
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialIcon({ href, Icon, label }) {
  return (
    <a href={href} target="_blank" className="text-muted-foreground hover:text-primary" aria-label={label}>
      <Icon className="h-6 w-6" />
    </a>
  )
}