"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Compass } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="relative w-full py-20 bg-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="h-[400px] w-[400px] rounded-full bg-orange-500/10 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 sm:p-14 text-center shadow-xl"
        >
          {/* Heading */}
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl max-w-2xl leading-[1.15]">
            Need a trusted professional today?
          </h2>

          {/* Description */}
          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
            Book a verified technician and get your service done without the hassle.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Button size="lg" asChild className="w-full sm:w-auto gap-2 h-12 px-8 text-base shadow-lg shadow-orange-600/20 bg-orange-600 hover:bg-orange-700">
              <Link href="/technicians">
                Find a Technician
                <ArrowRight className="size-4" />
              </Link>
            </Button>

            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto gap-2 h-12 px-8 text-base border-slate-300 text-slate-700 hover:bg-slate-50">
              <Link href="/service">
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