"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Wrench, ArrowRight, Clock, Calendar, ShieldCheck, TrendingUp } from "lucide-react"

export function BecomeTechnicianSection() {
  return (
    <section className="relative w-full overflow-hidden md:overflow-visible bg-[#0B281E] border-y border-emerald-950/40 shadow-2xl min-h-[220px] md:h-[235px] lg:h-[245px] flex items-center">
      {/* Top-Left Organic Curved Cutout at the far left edge of the viewport */}
      <div className="absolute top-0 left-0 w-16 sm:w-24 lg:w-32 h-16 sm:h-24 lg:h-32 pointer-events-none z-20">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full fill-white"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M 0,0 L 55,0 C 46,18 30,42 22,62 C 15,77 7,89 0,98 Z" />
        </svg>
      </div>

      {/* Full-width Photographic Background Texture & Atmospheric Green Gradient */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Subtle workshop work environment overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-overlay"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
        {/* Deep rich forest-green background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071F17] via-[#0A291F] to-[#071E16] opacity-95" />

        {/* Soft ambient center warmth */}
        <div className="absolute left-[50%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-[450px] h-[300px] bg-emerald-500/10 blur-[100px] rounded-full" />
      </div>

      {/* Full-width Inner Alignment Wrapper */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14 h-full flex flex-col md:flex-row items-center justify-between">
        {/* Decorative Organic Shapes behind Technician (Light Green Wave & Warm Orange) */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden hidden md:block">
          {/* Light Green Organic Wave Shape */}
          <svg
            className="absolute right-[230px] sm:right-[260px] lg:right-[310px] xl:right-[340px] top-[-10px] w-[140px] sm:w-[175px] lg:w-[210px] h-[210px] sm:h-[240px] lg:h-[260px] text-[#63C77D]"
            viewBox="0 0 200 240"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M55,15 C115,-15 175,25 188,85 C200,145 165,205 115,228 C65,248 20,205 10,145 C0,85 -5,45 55,15 Z"
              fill="currentColor"
            />
          </svg>

          {/* Vibrant Orange Organic Accent Blob */}
          <svg
            className="absolute right-[240px] sm:right-[270px] lg:right-[320px] xl:right-[350px] bottom-[-22px] w-[105px] sm:w-[125px] lg:w-[150px] h-[105px] sm:h-[125px] lg:h-[150px] text-[#FF6B00]"
            viewBox="0 0 150 150"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M35,45 C55,10 115,10 135,48 C155,88 125,138 85,142 C45,148 12,118 12,78 C12,58 15,80 35,45 Z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* 1. LEFT CONTENT AREA (~42% Width on Desktop) */}
        <div className="relative z-20 flex flex-col justify-center py-6 sm:py-7 pl-6 sm:pl-8 lg:pl-10 pr-4 max-w-full md:max-w-[46%] lg:max-w-[42%] text-left">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full bg-[#114935] border border-emerald-500/35 text-[10px] sm:text-[11px] font-bold text-emerald-300 tracking-wider mb-2.5 shadow-sm">
            <Wrench className="size-3 text-emerald-400 shrink-0" />
            <span>BECOME A TECHNICIAN</span>
          </div>

          {/* Bold White Heading */}
          <h2 className="text-xl sm:text-2xl lg:text-[27px] xl:text-[30px] font-extrabold text-white leading-[1.18] tracking-tight">
            Want to Grow Your<br />Business as a Professional?
          </h2>

          {/* Description */}
          <p className="mt-2 text-[11px] sm:text-xs lg:text-[13px] text-slate-300/90 leading-relaxed font-normal">
            Join FixPro as a verified technician and get more jobs, more customers and more income.
          </p>

          {/* CTA Buttons */}
          <div className="mt-4 sm:mt-4.5 flex flex-wrap items-center gap-2.5 sm:gap-3">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-1.5 px-4.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#FF6B00] hover:bg-[#E65A00] text-white text-[11px] sm:text-xs lg:text-[13px] font-bold shadow-md shadow-orange-500/25 transition-all duration-200 hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Register as Technician</span>
              <ArrowRight className="size-3 sm:size-3.5" />
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center px-4.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/25 hover:border-white/40 text-white text-[11px] sm:text-xs lg:text-[13px] font-medium transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* 2. CENTER-RIGHT TECHNICIAN IMAGE (Overlapping top edge on Desktop) */}
        <div className="relative md:absolute md:left-[41%] lg:left-[45%] xl:left-[47%] md:bottom-0 z-10 w-[240px] sm:w-[270px] lg:w-[310px] xl:w-[340px] h-[210px] sm:h-[240px] md:h-[265px] lg:h-[285px] shrink-0 pointer-events-none my-2 md:my-0">
          <div className="relative w-full h-full">
            <Image
              src="/hero-fix.png"
              alt="Professional Technician"
              fill
              priority
              sizes="(max-width: 768px) 240px, (max-width: 1024px) 280px, 340px"
              className="object-contain object-bottom drop-shadow-[0_12px_22px_rgba(0,0,0,0.55)]"
            />
          </div>
        </div>

        {/* 3. RIGHT FLOATING BENEFITS CARD */}
        <div className="relative z-20 my-4 md:my-0 mr-2 sm:mr-4 lg:mr-6 md:ml-auto w-[calc(100%-2rem)] sm:w-auto md:w-[215px] lg:w-[240px] xl:w-[255px] shrink-0">
          <div className="bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-4 lg:p-4.5 shadow-xl shadow-black/25 border border-slate-100/90">
            <div className="flex flex-col space-y-2.5 sm:space-y-3">
              {/* 1. Flexible Working Hours */}
              <div className="flex items-center gap-2.5">
                <div className="flex size-6 sm:size-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 shrink-0 border border-emerald-100/60">
                  <Clock className="size-3.5 text-emerald-600" />
                </div>
                <span className="text-[11px] sm:text-xs lg:text-[12.5px] font-semibold text-slate-800 tracking-tight leading-snug whitespace-nowrap">
                  Flexible Working Hours
                </span>
              </div>

              {/* 2. Flexible Schedule */}
              <div className="flex items-center gap-2.5">
                <div className="flex size-6 sm:size-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 shrink-0 border border-emerald-100/60">
                  <Calendar className="size-3.5 text-emerald-600" />
                </div>
                <span className="text-[11px] sm:text-xs lg:text-[12.5px] font-semibold text-slate-800 tracking-tight leading-snug whitespace-nowrap">
                  Flexible Schedule
                </span>
              </div>

              {/* 3. Secure Payments */}
              <div className="flex items-center gap-2.5">
                <div className="flex size-6 sm:size-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 shrink-0 border border-emerald-100/60">
                  <ShieldCheck className="size-3.5 text-emerald-600" />
                </div>
                <span className="text-[11px] sm:text-xs lg:text-[12.5px] font-semibold text-slate-800 tracking-tight leading-snug whitespace-nowrap">
                  Secure Payments
                </span>
              </div>

              {/* 4. Grow Your Income */}
              <div className="flex items-center gap-2.5">
                <div className="flex size-6 sm:size-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 shrink-0 border border-emerald-100/60">
                  <TrendingUp className="size-3.5 text-emerald-600" />
                </div>
                <span className="text-[11px] sm:text-xs lg:text-[12.5px] font-semibold text-slate-800 tracking-tight leading-snug whitespace-nowrap">
                  Grow Your Income
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}