'use client'

import { motion, Variants } from 'framer-motion'
import { ArrowRight, CheckCircle2, ShieldCheck, Users, Star, Search, Sparkles } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

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
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
}

const floatingVariants1 = {
  float: {
    y: [0, -12, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
}

const floatingVariants2 = {
  float: {
    y: [0, 14, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: 'easeInOut' as const,
      delay: 0.5,
    },
  },
}

const floatingVariants3 = {
  float: {
    y: [0, -10, 0],
    transition: {
      duration: 4.5,
      repeat: Infinity,
      ease: 'easeInOut' as const,
      delay: 1,
    },
  },
}

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen bg-background pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden flex items-center">

      {/* ── Advanced Background Glow Orbs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-primary/30 via-blue-500/20 to-transparent rounded-full blur-[140px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-tl from-blue-600/25 via-primary/15 to-transparent rounded-full blur-[160px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Content (7 Cols) */}
          <motion.div className="space-y-8 lg:col-span-7 flex flex-col items-start text-left" variants={itemVariants}>

            {/* Premium Badge */}
            <motion.div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-primary/10 border border-primary/25 backdrop-blur-md shadow-sm"
              whileHover={{ scale: 1.03 }}
            >
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-primary">Trusted Home & Tech Services</span>
            </motion.div>

            {/* Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-[1.15]">
                Find expert services & <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-primary via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                  verified technicians
                </span>{' '}
                instantly
              </h1>
            </div>

            {/* Description */}
            <motion.p
              className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed font-normal"
              variants={itemVariants}
            >
              Connect with certified professionals for all your home repairs, maintenance, and tech support needs. Our trusted network is ready to help you solve problems quickly and reliably.
            </motion.p>

            {/* Unified Sleek Search Bar */}
            <motion.div
              className="w-full max-w-xl relative group"
              variants={itemVariants}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500" />
              <div className="relative flex items-center gap-2 bg-card/90 border border-border/80 rounded-2xl p-2 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center gap-3 pl-3 flex-1">
                  <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                  <input
                    type="text"
                    placeholder="Search for services (e.g. AC Repair, Plumbing)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-sm sm:text-base w-full h-11"
                  />
                </div>
                <motion.button
                  className="px-6 h-12 bg-gradient-to-r from-primary to-blue-600 text-primary-foreground font-semibold rounded-xl shadow-lg hover:shadow-primary/25 transition-all duration-300 flex items-center gap-2 shrink-0 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Search</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div className="flex items-center gap-4 flex-wrap pt-2" variants={itemVariants}>
              <motion.button
                className="px-8 h-13 bg-primary text-primary-foreground rounded-xl font-semibold shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all duration-300 flex items-center gap-2.5 text-base cursor-pointer"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>Find Services</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.button
                className="px-8 h-13 border-2 border-border/80 bg-background/50 hover:bg-muted text-foreground rounded-xl font-semibold transition-all duration-300 backdrop-blur-md text-base cursor-pointer"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Become a Technician
              </motion.button>
            </motion.div>

          </motion.div>

          {/* Right Content - Glowing Image & Floating Cards (5 Cols) */}
          <motion.div className="relative lg:col-span-5 flex items-center justify-center w-full mt-6 lg:mt-0" variants={itemVariants}>

            {/* Main Image Container with Glow */}
            <div className="relative w-full max-w-[460px] aspect-[4/5] rounded-[2.5rem] p-1.5">

              {/* Vibrant Background Aura */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary via-blue-500 to-indigo-500 rounded-[2.5rem] blur-2xl opacity-40 animate-pulse" />

              {/* Inner Frame */}
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-white/20 bg-muted shadow-2xl z-10">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                <Image
                  src="/technician.jpg"
                  alt="Professional technicians and experts group"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                />

                {/* Overlay Text Inside Image */}
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-white/90 text-xs font-semibold tracking-wider uppercase">Verified Network</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">Elite Professionals Ready</h3>
                </div>
              </div>

              {/* Floating Card 1 - Rating */}
              <motion.div
                className="absolute top-6 -left-6 z-30 flex items-center gap-3 rounded-2xl border border-white/15 bg-background/80 px-4 py-3 shadow-2xl backdrop-blur-xl"
                variants={floatingVariants1}
                animate="float"
              >
                <div className="flex gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <div>
                  <p className="text-xs font-extrabold text-foreground">4.9/5 Rating</p>
                  <p className="text-[10px] text-muted-foreground">Verified Reviews</p>
                </div>
              </motion.div>

              {/* Floating Card 2 - Experts */}
              <motion.div
                className="absolute top-1/2 -right-8 transform -translate-y-1/2 z-30 flex items-center gap-3 rounded-2xl border border-white/15 bg-background/80 px-4 py-3 shadow-2xl backdrop-blur-xl"
                variants={floatingVariants2}
                animate="float"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shadow-inner">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-foreground">500+ Experts</p>
                  <p className="text-[10px] text-muted-foreground">Background Checked</p>
                </div>
              </motion.div>

              {/* Floating Card 3 - Customers Served */}
              <motion.div
                className="absolute -bottom-4 left-6 z-30 flex items-center gap-3 rounded-2xl border border-white/15 bg-background/80 px-4 py-3 shadow-2xl backdrop-blur-xl"
                variants={floatingVariants3}
                animate="float"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shadow-inner">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-foreground">10k+ Served</p>
                  <p className="text-[10px] text-muted-foreground">Happy Customers</p>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}