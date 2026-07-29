"use client"

import Link from "next/link"
import { motion, Variants } from "framer-motion"
import { Sparkles, Wind, FileSearch, ArrowRight, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"

const offers = [
  {
    id: 1,
    title: "20% Off Deep Cleaning",
    description: "Get your home spotless and sanitized with our expert cleaning service at a discounted rate.",
    code: "CLEAN20",
    icon: Sparkles,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    id: 2,
    title: "AC Service Special Discount",
    description: "Ensure cooling efficiency and save money on your next AC maintenance or gas refill.",
    code: "ACDISCOUNT",
    icon: Wind,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    badgeColor: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  },
  {
    id: 3,
    title: "Free Initial Inspection",
    description: "Book any complex home or appliance repair today and get a completely free professional inspection.",
    code: "FREECHECK",
    icon: FileSearch,
    color: "text-primary",
    bgColor: "bg-primary/10",
    badgeColor: "bg-primary/10 text-primary",
  },
]

export function LatestOffers() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  }

  return (
    <section className="relative w-full py-20 bg-background overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="h-[300px] w-[300px] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider mb-2">
            <Tag className="size-4" />
            Special Deals & Savings
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Latest Offers
          </h2>
          <p className="mt-3 text-base text-muted-foreground max-w-xl">
            Take advantage of our exclusive seasonal discounts and save big on top-tier services.
          </p>
        </div>

        {/* ── Offers Grid ── */}
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {offers.map((offer) => {
            const Icon = offer.icon
            return (
              <motion.div
                key={offer.id}
                variants={itemVariants}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-card p-8 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  {/* Top Bar: Icon & Promo Code Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`flex size-14 items-center justify-center rounded-2xl ${offer.bgColor} ${offer.color} transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="size-7" />
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${offer.badgeColor}`}>
                      Code: {offer.code}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {offer.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                    {offer.description}
                  </p>
                </div>

                {/* Footer CTA */}
                <div className="mt-8 pt-4 border-t border-border/60 flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Limited Time Offer
                  </span>
                  <Button size="sm" asChild className="gap-1.5 shadow-sm">
                    <Link href="#">
                      Claim Offer
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}