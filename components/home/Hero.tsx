'use client'

import { motion, Variants } from 'framer-motion'
import { ArrowRight, CheckCircle2, ShieldCheck, Users, Star, Search, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const floatingVariants1: Variants = {
  float: {
    y: [0, -14, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
}

const floatingVariants2: Variants = {
  float: {
    y: [0, 16, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
}

const sliderImages = [
  {
    id: 1,
    image: '/technician.jpg',
    title: 'Elite Professionals Ready to Help',
    subtitle: 'Verified Network',
    rating: '4.9/5 (10k+ Reviews)',
  },
  {
    id: 2,
    image: '/technician.jpg',
    title: 'Instant AC & Home Appliance Repair',
    subtitle: 'Expert Technicians',
    rating: '4.8/5 (8k+ Reviews)',
  },
  {
    id: 3,
    image: '/technician.jpg',
    title: 'Reliable Plumbing & Electrical Services',
    subtitle: '24/7 Support',
    rating: '5.0/5 (12k+ Reviews)',
  },
]

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + sliderImages.length) % sliderImages.length)
  }

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen bg-white text-slate-900 pt-24 pb-32 overflow-hidden flex items-center justify-center">

      {/* Light Background Glow Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-[-15%] left-[20%] w-[600px] h-[600px] bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-transparent rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        <motion.div
          className="flex flex-col items-center space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Premium Badge */}
          <motion.div
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 shadow-sm"
            whileHover={{ scale: 1.05 }}
            variants={itemVariants}
          >
            <Sparkles className="w-4 h-4 text-orange-600" />
            <span className="text-xs sm:text-sm font-bold text-orange-800">Trusted Home & Tech Services Network</span>
          </motion.div>

          {/* Headline (Dark & Visible) */}
          <motion.div className="space-y-4 max-w-3xl mx-auto" variants={itemVariants}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-slate-900">
              Find expert services & <br />
              <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 bg-clip-text text-transparent">
                verified technicians
              </span>{' '}
              instantly
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-base sm:text-lg text-slate-700 max-w-2xl mx-auto leading-relaxed font-medium"
            variants={itemVariants}
          >
            Connect with certified professionals for all your home repairs, maintenance, and tech support needs. Fast, reliable, and secure solutions at your doorstep.
          </motion.p>

          {/* Sleek Search Bar */}
          <motion.div
            className="w-full max-w-xl mx-auto relative group my-2"
            variants={itemVariants}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500" />
            <div className="relative flex items-center gap-2 bg-white border border-slate-300 rounded-2xl p-2 shadow-xl">
              <div className="flex items-center gap-3 pl-3 flex-1">
                <Search className="w-5 h-5 text-slate-500 shrink-0" />
                <input
                  type="text"
                  placeholder="Search for services (e.g. AC Repair, Plumbing)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent outline-none text-slate-900 placeholder:text-slate-400 text-sm sm:text-base w-full h-11"
                />
              </div>
              <motion.button
                className="px-6 h-12 bg-orange-600 text-white font-bold rounded-xl shadow-md hover:bg-orange-700 transition-all duration-300 flex items-center gap-2 shrink-0 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div className="flex items-center justify-center gap-4 flex-wrap pt-2 mx-auto" variants={itemVariants}>
            <motion.button
              className="px-8 h-13 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold shadow-lg shadow-orange-600/20 transition-all duration-300 flex items-center gap-2.5 text-base cursor-pointer"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>Explore All Services</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              className="px-8 h-13 border-2 border-slate-300 bg-white hover:bg-slate-100 text-slate-900 rounded-xl font-bold transition-all duration-300 shadow-sm text-base cursor-pointer"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Become a Technician
            </motion.button>
          </motion.div>

          {/* Professional Image Slider Section */}
          <motion.div className="relative w-full max-w-4xl mx-auto mt-12" variants={itemVariants}>
            <div className="relative w-full aspect-[16/10] sm:aspect-[21/10] min-h-[320px] sm:min-h-[380px] rounded-[2rem] p-1.5 bg-gradient-to-b from-orange-500/20 to-slate-200 shadow-2xl overflow-hidden group">

              <div className="relative w-full h-full rounded-[1.75rem] overflow-hidden bg-slate-900 border border-slate-300">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent z-10" />

                {/* Slider Image with Fade Animation */}
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={sliderImages[currentIndex].image}
                    alt={sliderImages[currentIndex].title}
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>

                {/* Slider Content Overlay */}
                <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle2 className="w-4 h-4 text-orange-400" />
                      <span className="text-orange-300 text-xs font-bold tracking-wider uppercase">
                        {sliderImages[currentIndex].subtitle}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {sliderImages[currentIndex].title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 bg-slate-950/80 border border-slate-700 px-4 py-2.5 rounded-xl backdrop-blur-md">
                    <div className="flex gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-white">{sliderImages[currentIndex].rating}</span>
                  </div>
                </div>

                {/* Slider Navigation Buttons */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-slate-950/70 border border-slate-700 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-orange-500 hover:text-slate-950 cursor-pointer"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-slate-950/70 border border-slate-700 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-orange-500 hover:text-slate-950 cursor-pointer"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Slider Indicators (Dots) */}
                <div className="absolute top-4 right-6 z-30 flex items-center gap-1.5">
                  {sliderImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${currentIndex === index ? 'w-6 bg-orange-500' : 'w-2 bg-white/50'
                        }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

              </div>

              {/* Floating Badge Left */}
              <motion.div
                className="absolute -top-6 -left-6 hidden sm:flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl z-30"
                variants={floatingVariants1}
                animate="float"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-black text-slate-900">500+ Experts</p>
                  <p className="text-[10px] font-semibold text-slate-600">Background Checked</p>
                </div>
              </motion.div>

              {/* Floating Badge Right */}
              <motion.div
                className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl z-30"
                variants={floatingVariants2}
                animate="float"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600">
                  <Users className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-black text-slate-900">10k+ Served</p>
                  <p className="text-[10px] font-semibold text-slate-600">Happy Customers</p>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}