"use client"

import Link from "next/link"
import { Zap } from "lucide-react"

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/service" },
  { label: "Technicians", href: "/technicians" },
  { label: "About Us", href: "/About" },
  { label: "Contact", href: "/Contact" },
]

const supportLinks = [
  { label: "Help Center", href: "#" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Refund Policy", href: "#" },
]

export function Footer() {
  return (
    <footer className="w-full bg-[#0B1729] text-white border-t border-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">

          {/* Brand Column */}
          <div className="flex flex-col gap-4 lg:col-span-4">
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group w-fit">
              <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF6B00] to-[#E05E00] shadow-lg shadow-orange-500/20 transition-transform group-hover:scale-105">
                <Zap className="size-5 text-white" strokeWidth={2.5} fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight text-white leading-none">
                  FixtNow
                </span>
                <span className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5">
                  Skilled People, Trusted Work.
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mt-1">
              Connecting you with trusted and verified professionals for all your home service needs.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 mt-2">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="size-9 rounded-full bg-slate-800/80 text-slate-400 hover:bg-[#FF6B00] hover:text-white transition-all flex items-center justify-center"
                aria-label="Facebook"
              >
                <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Twitter / X */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="size-9 rounded-full bg-slate-800/80 text-slate-400 hover:bg-[#FF6B00] hover:text-white transition-all flex items-center justify-center"
                aria-label="Twitter"
              >
                <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="size-9 rounded-full bg-slate-800/80 text-slate-400 hover:bg-[#FF6B00] hover:text-white transition-all flex items-center justify-center"
                aria-label="Instagram"
              >
                <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="size-9 rounded-full bg-slate-800/80 text-slate-400 hover:bg-[#FF6B00] hover:text-white transition-all flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3 lg:col-span-2 sm:col-span-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Quick Links
            </p>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-[#FF6B00] transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-3 lg:col-span-3 sm:col-span-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Support
            </p>
            <ul className="flex flex-col gap-2.5">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-[#FF6B00] transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Download Our App */}
          <div className="flex flex-col gap-3 lg:col-span-3 sm:col-span-2">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Download Our App
            </p>
            <div className="flex flex-col gap-3 max-w-[200px]">
              {/* Google Play Badge */}
              <a
                href="#"
                className="flex items-center gap-3 bg-black hover:bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 transition-all shadow-sm group"
              >
                <svg className="size-6 shrink-0" viewBox="0 0 24 24" fill="none">
                  <path d="M3.609 1.814L13.793 12 3.61 22.186A2.217 2.217 0 013 20.615V3.385c0-.6.22-1.168.609-1.571z" fill="#00E676"/>
                  <path d="M17.186 8.609l-3.393 3.391 3.393 3.391 3.844-2.184c1.096-.622 1.096-1.792 0-2.414l-3.844-2.184z" fill="#FFD600"/>
                  <path d="M3.609 1.814l10.184 10.186 3.393-3.391L6.082.91C4.986.288 3.999.689 3.609 1.814z" fill="#00B0FF"/>
                  <path d="M13.793 12L3.609 22.186c.39 1.125 1.377 1.526 2.473.904l11.104-6.304-3.393-3.391z" fill="#FF3D00"/>
                </svg>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] uppercase tracking-wider text-slate-400 font-medium leading-none">GET IT ON</span>
                  <span className="text-sm font-bold text-white tracking-tight leading-tight mt-0.5">Google Play</span>
                </div>
              </a>

              {/* App Store Badge */}
              <a
                href="#"
                className="flex items-center gap-3 bg-black hover:bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 transition-all shadow-sm group"
              >
                <svg className="size-6 shrink-0 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.77 1.06-1.85.95-2.92-.91.04-2.03.61-2.68 1.38-.58.67-1.08 1.76-.94 2.81 1.02.08 2.04-.52 2.67-1.27z"/>
                </svg>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] text-slate-400 font-medium leading-none">Download on the</span>
                  <span className="text-sm font-bold text-white tracking-tight leading-tight mt-0.5">App Store</span>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 text-center sm:text-left">
            &copy; 2025 FixtNow. All rights reserved.
          </p>

          <p className="text-xs text-slate-400 text-center sm:text-right font-medium">
            Skilled People, Trusted Work.
          </p>
        </div>

      </div>
    </footer>
  )
}