"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Wrench, ArrowRight, ShieldCheck, TrendingUp, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BecomeTechnicianSection() {
  return (
    <section className="relative w-full py-20 bg-muted/30 border-y border-border/60 overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="absolute h-[400px] w-[400px] rounded-full bg-primary/10 blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-border/80 bg-card p-8 sm:p-12 lg:p-16 shadow-2xl backdrop-blur-xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* ── Left Content (Heading, Description, CTA) ── */}
            <div className="flex flex-col items-start text-left lg:col-span-8">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider mb-3 bg-primary/10 px-3 py-1.5 rounded-full">
                <Wrench className="size-4" />
                Partner With Us
              </div>
              
              <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Grow your business & earn more as a professional technician
              </h2>
              
              <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                Join thousands of verified experts on FixItNow. Get regular job bookings, flexible working hours, and guaranteed secure weekly payments.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Button size="lg" asChild className="gap-2 h-12 px-8 text-base shadow-lg shadow-primary/20">
                  <Link href="#">
                    Join as Technician
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* ── Right Feature Highlights ── */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-muted/50 border border-border/60">
                <div className="size-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                  <TrendingUp className="size-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">More Bookings</h4>
                  <p className="text-xs text-muted-foreground">Steady stream of local customers</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-muted/50 border border-border/60">
                <div className="size-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                  <ShieldCheck className="size-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Secure Payments</h4>
                  <p className="text-xs text-muted-foreground">Guaranteed timely payouts</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-muted/50 border border-border/60">
                <div className="size-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                  <Users className="size-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Flexible Schedule</h4>
                  <p className="text-xs text-muted-foreground">Work on your own terms</p>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}