"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Compass, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="relative w-full py-20 bg-muted/30 border-t border-border/60 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="h-[400px] w-[400px] rounded-full bg-primary/15 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-border/80 bg-card p-8 sm:p-14 text-center shadow-2xl backdrop-blur-xl flex flex-col items-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider mb-4 bg-primary/10 px-3 py-1.5 rounded-full">
            <ShieldCheck className="size-4" />
            Ready to Get Started?
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl max-w-2xl leading-[1.15]">
            Need a trusted professional today?
          </h2>

          {/* Description */}
          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
            Book certified experts in less than a minute and experience hassle-free home repairs and maintenance.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Button size="lg" asChild className="w-full sm:w-auto gap-2 h-12 px-8 text-base shadow-lg shadow-primary/20">
              <Link href="#">
                Book Now
                <ArrowRight className="size-4" />
              </Link>
            </Button>

            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto gap-2 h-12 px-8 text-base bg-background/50">
              <Link href="#">
                <Compass className="size-4" />
                Explore Services
              </Link>
            </Button>
          </div>

        </motion.div>
      </div>
    </section>
  )
}