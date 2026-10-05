"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Wrench, ArrowRight, ShieldCheck, TrendingUp, Users, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function BecomeTechnicianSection() {
  return (
    <section className="relative w-full py-20 bg-slate-900 overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="absolute h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >

          {/* Left Content */}
          <div className="flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-400 uppercase tracking-wider mb-3 bg-orange-500/10 px-3 py-1.5 rounded-full border border-orange-500/20">
              <Wrench className="size-4" />
              For Professionals
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Grow Your Business<br />as a Professional
            </h2>

            <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
              Join FixItNow as a verified technician and get more customers, more jobs, and more income.
            </p>

            {/* Benefits List */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 text-slate-300">
                <div className="flex size-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <ShieldCheck className="size-3.5" />
                </div>
                <span className="text-sm font-medium">Flexible Working Hours</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <div className="flex size-6 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                  <Clock className="size-3.5" />
                </div>
                <span className="text-sm font-medium">Flexible Schedule</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <div className="flex size-6 items-center justify-center rounded-full bg-amber-500/20 text-amber-400">
                  <TrendingUp className="size-3.5" />
                </div>
                <span className="text-sm font-medium">Secure Payments</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <div className="flex size-6 items-center justify-center rounded-full bg-purple-500/20 text-purple-400">
                  <Users className="size-3.5" />
                </div>
                <span className="text-sm font-medium">Grow Your Income</span>
              </div>
            </div>

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

          {/* Right - Technician Image */}
          <div className="relative aspect-square lg:aspect-[4/5] max-w-lg mx-auto">
            <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-slate-800 shadow-2xl">
              <Image
                src="/technician.jpg"
                alt="Professional Technician"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
            </div>

            {/* Floating Badge */}
            <motion.div
              className="absolute -bottom-4 -right-4 bg-orange-600 text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Users className="w-4 h-4" />
              <span className="text-sm font-bold">5000+ Technicians</span>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  )
}