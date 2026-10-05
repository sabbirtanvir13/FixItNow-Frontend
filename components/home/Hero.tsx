'use client'

import { motion, Variants } from 'framer-motion'
import { ArrowRight, CheckCircle2, ShieldCheck, Users, Star, Search, MapPin, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
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
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const floatingVariants1: Variants = {
  float: {
    y: [0, -12, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
}

const floatingVariants2: Variants = {
  float: {
    y: [0, 14, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
}

export function Hero() {
  const router = useRouter()
  const [location, setLocation] = useState('')
  const [service, setService] = useState('')

  const handleSearch = () => {
    if (service) {
      router.push(`/service?search=${encodeURIComponent(service)}`)
    } else {
      router.push('/service')
    }
  }

  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] bg-white text-slate-900 pt-24 pb-16 lg:pb-24 overflow-hidden">

      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-[-10%] right-[5%] w-[500px] h-[500px] bg-gradient-to-br from-orange-500/8 via-amber-500/4 to-transparent rounded-full blur-[120px]"
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
          className="absolute bottom-[-10%] left-[5%] w-[400px] h-[400px] bg-gradient-to-br from-emerald-500/6 via-teal-500/3 to-transparent rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column - Content */}
          <div className="flex flex-col space-y-8">
            {/* Trust Badge */}
            <motion.div
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-orange-50 border border-orange-200 shadow-sm w-fit"
              whileHover={{ scale: 1.02 }}
              variants={itemVariants}
            >
              <CheckCircle2 className="w-4 h-4 text-orange-600" />
              <span className="text-xs sm:text-sm font-semibold text-orange-800">
                Verified • Trusted • Professional
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div className="space-y-4" variants={itemVariants}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-slate-900">
                Find expert services &{' '}
                <span className="text-orange-600 relative">
                  verified technicians
                  <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                    <path d="M0 4C50 8 100 0 200 4" stroke="#f97316" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
                  </svg>
                </span>{' '}
                instantly
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl"
              variants={itemVariants}
            >
              From home repairs to appliance maintenance, get professional help from background-checked, skilled technicians — fast, safe and hassle-free.
            </motion.p>

            {/* Search Card */}
            <motion.div
              className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 space-y-4"
              variants={itemVariants}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Location Input */}
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  />
                </div>

                {/* Service Select */}
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <Search className="w-5 h-5" />
                  </div>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all cursor-pointer"
                  >
                    <option value="">Select a service</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="electrical">Electrical</option>
                    <option value="ac-repair">AC Repair</option>
                    <option value="home-appliance">Home Appliance</option>
                    <option value="carpentry">Carpentry</option>
                    <option value="painting">Painting</option>
                    <option value="cleaning">Cleaning</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <motion.button
                onClick={handleSearch}
                className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-lg shadow-orange-600/20 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="flex flex-wrap items-center gap-6 pt-2"
              variants={itemVariants}
            >
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="font-medium">Verified Technicians</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <ShieldCheck className="w-4 h-4 text-blue-500" />
                <span className="font-medium">Fast & Reliable</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="font-medium">Trusted by Customers</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Image Composition */}
          <motion.div
            className="relative"
            variants={itemVariants}
          >
            <div className="relative aspect-square lg:aspect-[4/5] max-w-lg mx-auto">
              {/* Main Image */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
                <Image
                  src="/technician.jpg"
                  alt="Professional Technician"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              </div>

              {/* Orange Decorative Shape */}
              <motion.div
                className="absolute -top-4 -right-4 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />

              {/* Green Verification Badge */}
              <motion.div
                className="absolute -bottom-4 -left-4 bg-emerald-500 text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2"
                variants={floatingVariants1}
                animate="float"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm font-bold">Verified</span>
              </motion.div>

              {/* Floating Rating Card */}
              <motion.div
                className="absolute top-8 -right-8 bg-white rounded-2xl p-4 shadow-xl border border-slate-100"
                variants={floatingVariants2}
                animate="float"
              >
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>
                <p className="text-lg font-bold text-slate-900">4.9</p>
                <p className="text-xs text-slate-500">10k+ reviews</p>
              </motion.div>

              {/* Small Trust Badge */}
              <motion.div
                className="absolute top-8 -left-8 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-slate-100 flex items-center gap-2"
                variants={floatingVariants1}
                animate="float"
              >
                <ShieldCheck className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-semibold text-slate-700">Background Checked</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}