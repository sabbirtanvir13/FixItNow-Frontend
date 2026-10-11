"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Briefcase, Clock, ShieldCheck, TrendingUp, HeadphonesIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function BusinessCTA() {
  return (
    <section className="relative w-full py-20 bg-gradient-to-r from-orange-50 to-emerald-50 overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="absolute top-0 left-0 h-[400px] w-[400px] rounded-full bg-orange-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-emerald-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center"
        >

          {/* Left Content */}
          <div className="flex flex-col items-start text-left lg:col-span-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 uppercase tracking-wider mb-3 bg-orange-100 px-3 py-1.5 rounded-full border border-orange-200">
              <Briefcase className="size-4" />
              FOR YOUR BUSINESS
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Grow your business & earn more<br />as a professional technician
            </h2>

            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              Join thousands of professionals and get more customers, better opportunities and steady income.
            </p>

            <div className="mt-8">
              <Button size="lg" asChild className="gap-2 h-12 px-8 text-base shadow-lg shadow-orange-600/20 bg-orange-600 hover:bg-orange-700">
                <Link href="#">
                  Become a Technician
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Center - Benefits List */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex size-6 items-center justify-center rounded-full bg-orange-100 text-orange-600 shrink-0 mt-0.5">
                  <Briefcase className="size-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">More Job Opportunities</h4>
                  <p className="text-xs text-slate-500">Access to thousands of jobs</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex size-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shrink-0 mt-0.5">
                  <Clock className="size-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Flexible Schedule</h4>
                  <p className="text-xs text-slate-500">Work when you want</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex size-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 shrink-0 mt-0.5">
                  <ShieldCheck className="size-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Secure Payments</h4>
                  <p className="text-xs text-slate-500">Guaranteed payment</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex size-6 items-center justify-center rounded-full bg-purple-100 text-purple-600 shrink-0 mt-0.5">
                  <HeadphonesIcon className="size-3.5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Dedicated Support</h4>
                  <p className="text-xs text-slate-500">24/7 support team</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Technician Image */}
          <div className="relative aspect-square lg:aspect-[4/5] max-w-lg mx-auto lg:col-span-1">
            <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
              <Image
                src="/hero-fix.png"
                alt="Professional Technician"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  )
}
