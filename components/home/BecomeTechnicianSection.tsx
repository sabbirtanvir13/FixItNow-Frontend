"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Wrench, ArrowRight, ShieldCheck, TrendingUp, Users, Clock, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function BecomeTechnicianSection() {
  return (
    <section className="relative w-full py-20 bg-emerald-900 overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="absolute h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[150px]" />
        <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-emerald-500/20 blur-[120px]" />
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
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-400 uppercase tracking-wider mb-3 bg-orange-500/10 px-3 py-1.5 rounded-full border border-orange-500/20">
              <Wrench className="size-4" />
              BECOME A TECHNICIAN
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Want to Grow Your<br />Business as a Professional?
            </h2>

            <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
              Join FixItNow as a verified technician and get more jobs, more customers and more income.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button size="lg" asChild className="gap-2 h-12 px-8 text-base shadow-lg shadow-orange-600/20 bg-orange-600 hover:bg-orange-700">
                <Link href="#">
                  Register as Technician
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="gap-2 h-12 px-8 text-base border-slate-600 text-slate-300 hover:bg-slate-800">
                <Link href="#">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>

          {/* Center - Technician Image */}
          <div className="relative aspect-square lg:aspect-[4/5] max-w-lg mx-auto lg:col-span-1">
            <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-emerald-800 shadow-2xl">
              <Image
                src="/hero-fix.png"
                alt="Professional Technician"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 via-transparent to-transparent" />
            </div>
          </div>

          {/* Right - Benefits Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-xl"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-4">Benefits</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex size-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shrink-0 mt-0.5">
                    <Clock className="size-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">Flexible Working Hours</h4>
                    <p className="text-xs text-slate-500">Work on your own schedule</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex size-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 shrink-0 mt-0.5">
                    <Calendar className="size-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">Flexible Schedule</h4>
                    <p className="text-xs text-slate-500">Choose when to work</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex size-6 items-center justify-center rounded-full bg-amber-100 text-amber-600 shrink-0 mt-0.5">
                    <ShieldCheck className="size-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">Secure Payments</h4>
                    <p className="text-xs text-slate-500">Get paid on time</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex size-6 items-center justify-center rounded-full bg-purple-100 text-purple-600 shrink-0 mt-0.5">
                    <TrendingUp className="size-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">Grow Your Income</h4>
                    <p className="text-xs text-slate-500">Earn more with us</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  )
}