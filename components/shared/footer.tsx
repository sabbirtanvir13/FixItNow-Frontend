"use client"

import Link from "next/link"
import { Zap, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// ── Social SVG Icons ──
function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" className="size-4" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" className="size-4" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" className="size-4" {...props}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  )
}

const footerSections = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#" },
      { label: "Integrations", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Changelog", href: "#" },
      { label: "Docs", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Press Kit", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Community", href: "#" },
      { label: "Help Center", href: "#" },
      { label: "Guides", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "Licenses", href: "#" },
    ],
  },
]

const socialLinks = [
  { label: "Twitter", href: "#", icon: TwitterIcon },
  { label: "GitHub", href: "#", icon: GithubIcon },
  { label: "LinkedIn", href: "#", icon: LinkedinIcon },
]

export function Footer() {
  return (
    <footer className="w-full border-t border-border/60 bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          
          {/* Brand & Newsletter Column */}
          <div className="flex flex-col gap-4 lg:col-span-4">
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group w-fit">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary shadow-sm transition-transform group-hover:scale-105">
                <Zap className="size-4 text-primary-foreground" strokeWidth={2.5} />
              </div>
              <span className="font-semibold text-[17px] tracking-tight text-foreground font-sans">
                BrandLogo
              </span>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Empowering developers to build modern web applications faster and smoother. Modern, clean, and scalable.
            </p>

            {/* Newsletter Subscription */}
            <div className="mt-2 flex flex-col gap-2">
              <span className="text-xs font-semibold text-foreground tracking-wide uppercase">
                Subscribe to our newsletter
              </span>
              <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 max-w-sm">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="h-9 text-sm bg-background"
                  required
                />
                <Button type="submit" size="sm" className="h-9 px-3 shrink-0">
                  <Send className="size-3.5 mr-1.5" />
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          {/* Nav Links Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {footerSections.map((section) => (
              <div key={section.title} className="flex flex-col gap-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {section.title}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
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
        <div className="mt-12 pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            &copy; {new Date().getFullYear()} BrandLogo, Inc. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <Button
                key={label}
                variant="ghost"
                size="icon"
                asChild
                className="size-8 text-muted-foreground hover:text-foreground"
              >
                <Link href={href} aria-label={label}>
                  <Icon />
                </Link>
              </Button>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}