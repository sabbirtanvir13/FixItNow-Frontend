"use client"

import Link from "next/link"
import { Zap, Share2, MessageCircle, Users } from "lucide-react"

const footerSections = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/service" },
      { label: "Technicians", href: "/technicians" },
      { label: "How It Works", href="/#how-it-works" },
      { label: "About", href: "/About" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Terms & Conditions", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Refund Policy", href: "#" },
    ],
  },
  {
    title: "For Professionals",
    links: [
      { label: "Become a Technician", href: "#" },
      { label: "Technician Login", href: "/login" },
    ],
  },
]

const socialLinks = [
  { label: "Facebook", href: "#", icon: Share2 },
  { label: "Instagram", href: "#", icon: MessageCircle },
  { label: "LinkedIn", href: "#", icon: Users },
]

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">

        {/* Top Section */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">

          {/* Brand Column */}
          <div className="flex flex-col gap-4 lg:col-span-4">
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group w-fit">
              <div className="flex size-8 items-center justify-center rounded-lg bg-orange-600 shadow-sm transition-transform group-hover:scale-105">
                <Zap className="size-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-semibold text-[17px] tracking-tight text-white">
                FixItNow
              </span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Skilled People. Trusted Work.
            </p>
          </div>

          {/* Nav Links Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            {footerSections.map((section) => (
              <div key={section.title} className="flex flex-col gap-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {section.title}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-slate-300 hover:text-white transition-colors duration-150"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 text-center sm:text-left">
            &copy; 2026 FixItNow. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <button
                key={label}
                className="size-8 rounded-full bg-slate-800 text-slate-400 hover:bg-orange-600 hover:text-white transition-colors duration-200 flex items-center justify-center"
                aria-label={label}
              >
                <Icon className="size-4" />
              </button>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}