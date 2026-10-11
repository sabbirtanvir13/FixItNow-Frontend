'use client'

import { motion, type Variants } from 'framer-motion'
import {
  ArrowRight,
  ShieldCheck,
  Star,
  Search,
  MapPin,
  Clock,
  Zap,
  Wrench,
  CheckCircle2,
  Sparkles,
  Users,
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const floatVariant1: Variants = {
  float: {
    y: [0, -8, 0],
    transition: {
      duration: 4.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

const floatVariant2: Variants = {
  float: {
    y: [0, 8, 0],
    transition: {
      duration: 5.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

const POPULAR_TAGS = [
  { label: 'AC Servicing', query: 'ac' },
  { label: 'Electrical', query: 'electrical' },
  { label: 'Plumbing', query: 'plumbing' },
  { label: 'Appliance Repair', query: 'appliance' },
  { label: 'Deep Cleaning', query: 'cleaning' },
]

export function Hero() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'service' | 'technician'>('service')
  const [service, setService] = useState('')
  const [location, setLocation] = useState('')

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    const params = new URLSearchParams()
    if (service.trim()) params.set('search', service.trim())
    if (location.trim()) params.set('location', location.trim())

    const queryString = params.toString()
    const targetPath = activeTab === 'service' ? '/service' : '/technicians'

    router.push(queryString ? `${targetPath}?${queryString}` : targetPath)
  }

  const handleTagClick = (tagQuery: string) => {
    setService(tagQuery)
    router.push(`/service?search=${encodeURIComponent(tagQuery)}`)
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50/70 via-white to-white pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-100">
      {/* Refined Geometric Backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle dot-grid texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40 [mask-image:radial-gradient(ellipse_at_top,white_40%,transparent_80%)]" />

        {/* Ambient warm lighting glows */}
        <div className="absolute -top-32 right-1/4 w-[500px] h-[500px] bg-orange-400/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 -left-32 w-[400px] h-[400px] bg-amber-300/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column: Value Proposition & Interactive Search (7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-7">
            {/* Top Pill / Platform Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 shadow-xs">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-600" />
                </span>
                <span className="text-xs font-semibold tracking-wide text-orange-950">
                  Dhaka's #1 Trusted Home Service Network
                </span>
                <span className="hidden sm:inline-block text-xs font-medium text-orange-700/80">
                  • 2,500+ Verified Pros
                </span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.12]">
                Expert Home Repairs,{' '}
                <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                  Delivered On Demand.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl font-normal">
                Connect with verified electricians, plumbers, and appliance specialists in minutes.
                Transparent upfront pricing, 30-day service warranty, and guaranteed satisfaction.
              </p>
            </motion.div>

            {/* Modern Search Console */}
            <motion.div variants={itemVariants} className="w-full max-w-2xl">
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl shadow-slate-200/50 p-2 sm:p-2.5 transition-all">
                {/* Search Type Selector Tabs */}
                <div className="flex items-center gap-1 p-1 bg-slate-100/80 rounded-xl mb-2 sm:mb-2.5 w-fit">
                  <button
                    type="button"
                    onClick={() => setActiveTab('service')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      activeTab === 'service'
                        ? 'bg-white text-orange-600 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Find Services
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('technician')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      activeTab === 'technician'
                        ? 'bg-white text-orange-600 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Find Technicians
                  </button>
                </div>

                {/* Form Fields */}
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-stretch gap-2">
                  {/* Service Query Input */}
                  <div className="relative flex-1 group">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-600 transition-colors">
                      <Search className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      placeholder={
                        activeTab === 'service'
                          ? 'What needs fixing? (e.g. AC repair, plumbing)'
                          : 'Technician title (e.g. Electrician, Carpenter)'
                      }
                      className="w-full pl-10 pr-3 py-3 bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium"
                    />
                  </div>

                  {/* Location Input */}
                  <div className="relative sm:w-48 group">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-600 transition-colors">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Location (e.g. Dhaka)"
                      className="w-full pl-10 pr-3 py-3 bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all font-medium"
                    />
                  </div>

                  {/* Search CTA */}
                  <button
                    type="submit"
                    className="py-3 px-6 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-bold text-sm rounded-xl shadow-md shadow-orange-600/25 hover:shadow-orange-600/35 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shrink-0 active:scale-[0.98]"
                  >
                    <span>Search</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                {/* Popular Quick Suggestions */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2.5 px-1">
                  <span className="text-xs font-medium text-slate-500 flex items-center gap-1 mr-1">
                    <Sparkles className="w-3 h-3 text-orange-500" />
                    Popular:
                  </span>
                  {POPULAR_TAGS.map((tag) => (
                    <button
                      key={tag.query}
                      type="button"
                      onClick={() => handleTagClick(tag.query)}
                      className="text-xs font-medium text-slate-600 hover:text-orange-600 bg-slate-100/80 hover:bg-orange-50 px-2.5 py-1 rounded-md transition-colors border border-transparent hover:border-orange-200/60 cursor-pointer"
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Social Proof & Guarantees */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 pt-2"
            >
              {/* Reviewers Stack */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2 overflow-hidden">
                  <Image
                    className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover shadow-xs"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="Customer"
                    width={36}
                    height={36}
                  />
                  <Image
                    className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover shadow-xs"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                    alt="Customer"
                    width={36}
                    height={36}
                  />
                  <Image
                    className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover shadow-xs"
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
                    alt="Customer"
                    width={36}
                    height={36}
                  />
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-full ring-2 ring-white bg-orange-600 text-[11px] font-bold text-white shadow-xs">
                    +15k
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-xs font-bold text-slate-800 ml-1">4.9 / 5</span>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">
                    from 12,000+ verified customer reviews
                  </span>
                </div>
              </div>

              {/* Dividers & Fast Guarantees */}
              <div className="hidden sm:block h-8 w-px bg-slate-200" />

              <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Police Verified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <span>30-Min Arrival</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Premium Visual Showcase (5 cols) */}
          <motion.div
            className="lg:col-span-5 relative flex justify-center lg:justify-end"
            variants={itemVariants}
          >
            <div className="relative w-full max-w-[440px]">
              {/* Ambient Glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-orange-500/20 via-amber-500/10 to-transparent rounded-[32px] blur-xl opacity-70" />

              {/* Main Technician Showcase Card */}
              <div className="relative rounded-[28px] overflow-hidden border border-slate-200/80 bg-white shadow-2xl shadow-slate-300/40">
                <div className="relative aspect-[4/4.8] w-full bg-slate-100 overflow-hidden">
                  <Image
                    src="/hero-fix.png"
                    alt="Professional FixItNow Technician"
                    fill
                    className="object-cover object-top hover:scale-102 transition-transform duration-700 ease-out"
                    priority
                  />
                  {/* Subtle lower gradient for card contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent" />

                  {/* On-image status bar at bottom */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <div>
                      <p className="text-xs font-medium text-orange-300 uppercase tracking-wider">
                        Master Technician
                      </p>
                      <h4 className="text-base font-bold text-white leading-tight">
                        Kamal Hossain
                      </h4>
                      <p className="text-xs text-slate-300">
                        HVAC & Electrical Specialist • 7+ Yrs Exp
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-md text-xs font-bold">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>4.98</span>
                      </div>
                      <span className="text-[10px] text-slate-300 mt-0.5">380+ jobs</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: Live Technician Availability */}
              <motion.div
                className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-slate-100 shadow-slate-900/10 flex items-center gap-3 z-20"
                variants={floatVariant1}
                animate="float"
              >
                <div className="relative flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <Wrench className="w-5 h-5 text-emerald-600" />
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900">Available Now</span>
                    <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 text-[10px] font-semibold rounded">
                      Live
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">Instant response in ~20m</p>
                </div>
              </motion.div>

              {/* Floating Badge 2: 30-Day Guarantee */}
              <motion.div
                className="absolute -bottom-5 -right-3 sm:-right-5 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-slate-100 shadow-slate-900/10 flex items-center gap-3 z-20"
                variants={floatVariant2}
                animate="float"
              >
                <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-slate-900">FixItNow Guarantee</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-orange-600" />
                  </div>
                  <p className="text-[11px] text-slate-500">
                    30-Day Free Re-work Warranty
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}