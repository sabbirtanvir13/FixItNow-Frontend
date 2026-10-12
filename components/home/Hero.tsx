'use client'

import { motion, type Variants } from 'framer-motion'
import {
  ShieldCheck,
  Star,
  Search,
  MapPin,
  Zap,
  Wrench,
  ChevronDown,
} from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const POPULAR_SERVICES = [
  'AC Servicing',
  'Electrical Repair',
  'Plumbing',
  'Appliance Repair',
  'Deep Cleaning',
  'Painting',
  'Carpentry',
]

export function Hero() {
  const router = useRouter()
  const [service, setService] = useState('')
  const [location, setLocation] = useState('')
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false)

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    const params = new URLSearchParams()
    if (service.trim()) params.set('search', service.trim())
    if (location.trim()) params.set('location', location.trim())

    const queryString = params.toString()
    router.push(queryString ? `/service?${queryString}` : '/service')
  }

  return (
    <section className="relative overflow-hidden bg-[#FAF9F6] pt-10 pb-12 sm:pt-14 sm:pb-16 lg:py-16 min-h-[640px] lg:h-[690px] xl:h-[710px] flex items-center border-b border-slate-100/80">
      {/* Background Decor: Warm cream/pale-orange gradients & faint dotted grid */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle dot-grid texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />

        {/* Soft atmospheric warm glows */}
        <div className="absolute -top-24 right-1/4 w-[480px] h-[480px] bg-orange-200/25 rounded-full blur-[110px]" />
        <div className="absolute top-1/3 -left-20 w-[420px] h-[420px] bg-amber-100/40 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* ================= LEFT COLUMN: Headline, Compact Search & Trust Indicators (~55% width) ================= */}
          <div className="lg:col-span-7 flex flex-col space-y-5 lg:space-y-6">
            {/* Trust Badge Pill */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50/90 border border-orange-200/80 shadow-xs">
                <ShieldCheck className="size-3.5 text-[#FF6B00]" />
                <span className="text-xs font-semibold text-[#FF6B00] tracking-wide">
                  Verified • Trusted • Professional
                </span>
                <span className="hidden sm:inline text-xs font-medium text-orange-600/75">
                  • 2,500+ Verified Pros
                </span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.div variants={itemVariants} className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-black tracking-tight text-[#0B1729] leading-[1.12]">
                Find expert services &<br />
                <span className="text-[#FF6B00]">verified technicians</span><br />
                instantly
              </h1>
              <p className="text-xs sm:text-sm lg:text-[14.5px] text-slate-600 leading-relaxed max-w-lg font-normal">
                From home repairs to appliance maintenance, get professional help from
                background-checked, skilled technicians — fast, safe and hassle-free.
              </p>
            </motion.div>

            {/* Compact Horizontal Search Console */}
            <motion.div variants={itemVariants} className="w-full max-w-[580px]">
              <form
                onSubmit={handleSearch}
                className="bg-white rounded-2xl sm:rounded-full border border-slate-200 shadow-lg shadow-slate-200/50 p-2 sm:p-2 sm:pl-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 transition-all relative"
              >
                {/* 1. Location Input */}
                <div className="flex items-center gap-2 flex-1 px-2 py-1">
                  <MapPin className="size-4 text-[#FF6B00] shrink-0" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter your location (e.g. Dhaka)"
                    className="w-full text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 font-medium bg-transparent border-none focus:outline-none"
                  />
                </div>

                {/* Vertical Divider */}
                <div className="hidden sm:block h-7 w-px bg-slate-200 shrink-0" />

                {/* 2. Service Selector */}
                <div className="relative flex items-center gap-2 flex-1 px-2 py-1">
                  <Wrench className="size-4 text-slate-400 shrink-0" />
                  <div
                    onClick={() => setServiceDropdownOpen(!serviceDropdownOpen)}
                    className="flex items-center justify-between w-full cursor-pointer select-none"
                  >
                    <span className={`text-xs sm:text-sm font-medium truncate ${service ? 'text-slate-900' : 'text-slate-400'}`}>
                      {service || 'Select service'}
                    </span>
                    <ChevronDown className={`size-3.5 text-slate-400 transition-transform ${serviceDropdownOpen ? 'rotate-180' : ''}`} />
                  </div>

                  {/* Dropdown Menu */}
                  {serviceDropdownOpen && (
                    <div className="absolute left-0 top-full mt-2 w-56 bg-white rounded-xl border border-slate-200 shadow-xl py-1.5 z-50">
                      <div
                        onClick={() => {
                          setService('')
                          setServiceDropdownOpen(false)
                        }}
                        className="px-3 py-1.5 text-xs text-slate-500 hover:bg-slate-50 cursor-pointer"
                      >
                        All Services
                      </div>
                      {POPULAR_SERVICES.map((srv) => (
                        <div
                          key={srv}
                          onClick={() => {
                            setService(srv)
                            setServiceDropdownOpen(false)
                          }}
                          className={`px-3 py-1.5 text-xs font-medium cursor-pointer transition-colors ${
                            service === srv
                              ? 'bg-orange-50 text-[#FF6B00] font-bold'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {srv}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 3. Orange Search Button */}
                <button
                  type="submit"
                  className="h-10 sm:h-11 px-6 rounded-xl sm:rounded-full bg-[#FF6B00] hover:bg-[#E65A00] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-orange-500/25 transition-all duration-200 hover:shadow-orange-500/35 hover:scale-[1.02] active:scale-[0.98] shrink-0 cursor-pointer"
                >
                  <Search className="size-3.5 sm:size-4" />
                  <span>Search</span>
                </button>
              </form>
            </motion.div>

            {/* Compact Trust Indicators Row Below Search */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-5 sm:gap-7 pt-1"
            >
              {/* 1. Verified Technicians */}
              <div className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-full bg-orange-50 border border-orange-200/60 text-[#FF6B00] shrink-0 shadow-2xs">
                  <ShieldCheck className="size-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900 leading-tight">
                    Verified Technicians
                  </span>
                  <span className="text-[11px] text-slate-500 leading-tight mt-0.5">
                    Background checked
                  </span>
                </div>
              </div>

              {/* 2. Fast & Reliable */}
              <div className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-full bg-orange-50 border border-orange-200/60 text-[#FF6B00] shrink-0 shadow-2xs">
                  <Zap className="size-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900 leading-tight">
                    Fast & Reliable
                  </span>
                  <span className="text-[11px] text-slate-500 leading-tight mt-0.5">
                    Book in minutes
                  </span>
                </div>
              </div>

              {/* 3. Trusted by 50K+ */}
              <div className="flex items-center gap-2.5">
                <div className="flex size-8 items-center justify-center rounded-full bg-orange-50 border border-orange-200/60 text-[#FF6B00] shrink-0 shadow-2xs">
                  <Star className="size-4 fill-orange-500/20" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-900 leading-tight">
                    Trusted by 50K+
                  </span>
                  <span className="text-[11px] text-slate-500 leading-tight mt-0.5">
                    Happy customers
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ================= RIGHT COLUMN: Floating Technician with Organic Shapes (~45% width) ================= */}
          <motion.div
            className="lg:col-span-5 relative flex items-center justify-center lg:justify-end"
            variants={itemVariants}
          >
            <div className="relative w-full max-w-[460px] h-[380px] sm:h-[440px] lg:h-[500px] flex items-center justify-center">
              {/* Soft interior bokeh image in background */}
              <div
                className="absolute inset-2 sm:inset-4 rounded-3xl bg-cover bg-center opacity-25 mix-blend-multiply pointer-events-none"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80')",
                }}
              />

              {/* Overlapping Organic Blob Shapes behind Technician */}
              {/* 1. Warm Golden/Amber Blob (Upper Right) */}
              <div className="absolute top-4 sm:top-8 right-2 sm:right-6 w-52 sm:w-64 h-52 sm:h-64 bg-[#FCD34D]/70 rounded-[45%_55%_65%_35%/50%_45%_55%_50%] pointer-events-none z-0" />

              {/* 2. Soft Fresh Green Blob (Upper Left / Behind verification badge) */}
              <div className="absolute top-8 sm:top-12 left-4 sm:left-10 w-44 sm:w-56 h-44 sm:h-56 bg-[#6EE7B7]/75 rounded-[55%_45%_40%_60%/45%_55%_50%_50%] pointer-events-none z-0" />

              {/* 3. Warm Orange Blob (Lower Left / Waist level) */}
              <div className="absolute bottom-6 sm:bottom-12 left-2 sm:left-6 w-48 sm:w-60 h-48 sm:h-60 bg-[#FF7700]/80 rounded-[50%_50%_60%_40%/60%_40%_50%_50%] pointer-events-none z-0" />

              {/* 4. Small Green Verification Badge near shoulder */}
              <div className="absolute top-[30%] sm:top-[32%] right-[16%] sm:right-[18%] z-20 size-9 sm:size-10 rounded-full bg-[#10B981] text-white flex items-center justify-center shadow-lg shadow-emerald-500/35 border-2 border-white pointer-events-none">
                <ShieldCheck className="size-5" />
              </div>

              {/* 5. Handwritten-style Label ("Skilled Verified Ready!") with curved arrow */}
              <div className="absolute top-0 sm:top-2 right-0 sm:right-2 z-20 flex flex-col items-end pointer-events-none">
                <div className="font-serif italic font-extrabold text-[#1E293B] text-lg sm:text-xl leading-[1.1] tracking-wide text-right">
                  <span>Skilled</span><br />
                  <span>Verified</span><br />
                  <span className="text-[#FF6B00]">Ready!</span>
                </div>
                {/* Curved Orange Arrow pointing toward the technician */}
                <svg
                  className="w-10 sm:w-12 h-8 sm:h-9 text-[#FF6B00] mr-4 mt-1"
                  viewBox="0 0 60 40"
                  fill="none"
                >
                  <path
                    d="M48,4 C42,16 30,28 12,32 M12,32 L22,26 M12,32 L20,38"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* 6. Floating Transparent Technician Cutout */}
              <div className="relative z-10 w-[290px] sm:w-[350px] lg:w-[410px] h-[340px] sm:h-[410px] lg:h-[480px] pointer-events-none">
                <Image
                  src="/hero-fix.png"
                  alt="Professional FixPro Technician"
                  fill
                  priority
                  sizes="(max-width: 768px) 300px, (max-width: 1024px) 360px, 420px"
                  className="object-contain object-bottom drop-shadow-[0_16px_28px_rgba(0,0,0,0.35)]"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}