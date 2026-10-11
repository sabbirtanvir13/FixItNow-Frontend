"use client"

import Link from "next/link"
import { Zap, Share2 } from "lucide-react"

const footerSections = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/service" },
      { label: "Technicians", href: "/technicians" },
      { label: "About Us", href: "/About" },
      { label: "Contact", href: "/Contact" },
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
]

const socialLinks = [
  { label: "Facebook", href: "#", icon: Share2 },
  { label: "Instagram", href: "#", icon: Share2 },
  { label: "LinkedIn", href: "#", icon: Share2 },
  { label: "YouTube", href: "#", icon: Share2 },
]

export function Footer() {
  return (
    <footer className="w-full bg-[#122033] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">

        {/* Top Section */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">

          {/* Brand Column */}
          <div className="flex flex-col gap-4 lg:col-span-4">
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group w-fit">
              <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/20 transition-transform group-hover:scale-105">
                <Zap className="size-5 text-white" strokeWidth={2.5} fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight text-white leading-none">
                  FixItNow
                </span>
                <span className="text-[10px] text-slate-400 font-medium leading-tight">
                  Skilled People, Trusted Work.
                </span>
              </div>
            </Link>
          </div>

          {/* Nav Links Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:col-span-5">
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

          {/* Follow Us Column */}
          <div className="flex flex-col gap-3 lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Follow Us
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  className="size-10 rounded-full bg-slate-800 text-slate-400 hover:bg-orange-600 hover:text-white transition-colors duration-200 flex items-center justify-center"
                  aria-label={label}
                >
                  <Icon className="size-5" />
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 text-center sm:text-left">
            &copy; 2025 FixItNow. All rights reserved.
          </p>

          <p className="text-xs text-slate-400 text-center sm:text-right">
            Skilled People, Trusted Work.
          </p>
        </div>

      </div>
    </footer>
  )
}