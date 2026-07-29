"use client"

import Link from "next/link"
import { motion, Variants } from "framer-motion"
import { Search, Star, ShieldCheck, Users, Wrench, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  return (
    <section className="relative w-full overflow-hidden bg-background pt-16 pb-20 md:pt-24 md:pb-32 lg:pt-32 lg:pb-40">
      
      {/* ── Background Glow ── */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="absolute top-[10%] left-[10%] h-[400px] w-[400px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[5%] right-[10%] h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ── Left Side: Content, Search & CTAs ── */}
          <motion.div
            className="flex flex-col items-start text-left lg:col-span-7"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-primary shadow-sm">
                <Wrench className="size-3.5" />
                <span>Trusted Home & Tech Services</span>
              </div>
            </motion.div>

            {/* Large Heading */}
            <motion.div variants={itemVariants} className="mt-6">
              <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-6xl leading-[1.15]">
                Find expert services &{" "}
                <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                  verified technicians
                </span>{" "}
                instantly
              </h1>
            </motion.div>

            {/* Short Description */}
            <motion.div variants={itemVariants} className="mt-6 max-w-xl">
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                Connect with professional technicians for home repairs, maintenance, and technical assistance right when you need them.
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div variants={itemVariants} className="mt-8 w-full max-w-lg">
              <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 rounded-xl border border-border bg-card p-1.5 shadow-lg">
                <div className="relative flex-1 flex items-center">
                  <Search className="absolute left-3 size-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search for services (e.g. AC repair, Plumbing)..."
                    className="border-0 bg-transparent pl-9 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm shadow-none h-11"
                  />
                </div>
                <Button type="submit" size="lg" className="h-11 px-6 font-medium shrink-0">
                  Search
                </Button>
              </form>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full">
              <Button size="lg" className="gap-2 h-12 px-7 text-base shadow-md">
                Find Services
                <ArrowRight className="size-4" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2 h-12 px-7 text-base bg-background/50">
                Become a Technician
              </Button>
            </motion.div>
          </motion.div>

          {/* ── Right Side: Illustration / Image & Floating Cards ── */}
          <motion.div
            className="relative lg:col-span-5 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Main Illustration / Image Card */}
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl border border-border/80 bg-muted/40 p-3 shadow-2xl backdrop-blur-xl overflow-hidden flex flex-col justify-between">
              
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-blue-500/10 pointer-events-none" />

              <div className="relative z-10 h-full rounded-2xl bg-card border border-border/50 flex flex-col items-center justify-center p-6 text-center shadow-inner">
                <div className="size-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 shadow-sm">
                  <Wrench className="size-10" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Professional Excellence</h3>
                <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                  Quality workmanship and trusted professionals at your doorstep.
                </p>
              </div>

              {/* Floating Card 1: Rating */}
              <motion.div
                className="absolute top-6 -left-6 z-20 flex items-center gap-2.5 rounded-2xl border border-border/80 bg-background/90 px-4 py-3 shadow-xl backdrop-blur-md"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex text-amber-500">
                  <Star className="size-4 fill-current" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">4.9 Rating</p>
                  <p className="text-[10px] text-muted-foreground">From verified reviews</p>
                </div>
              </motion.div>

              {/* Floating Card 2: Verified Technicians */}
              <motion.div
                className="absolute bottom-16 -right-6 z-20 flex items-center gap-2.5 rounded-2xl border border-border/80 bg-background/90 px-4 py-3 shadow-xl backdrop-blur-md"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="flex size-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                  <ShieldCheck className="size-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">500+ Technicians</p>
                  <p className="text-[10px] text-muted-foreground">Verified experts</p>
                </div>
              </motion.div>

              {/* Floating Card 3: Happy Customers */}
              <motion.div
                className="absolute -bottom-4 left-6 z-20 flex items-center gap-2.5 rounded-2xl border border-border/80 bg-background/90 px-4 py-3 shadow-xl backdrop-blur-md"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <div className="flex size-8 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                  <Users className="size-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">10,000+ Customers</p>
                  <p className="text-[10px] text-muted-foreground">Happy & satisfied</p>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}