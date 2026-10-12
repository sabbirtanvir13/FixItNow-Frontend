'use client'

import Link from 'next/link'
import {
  Search,
  UserCheck,
  CalendarCheck,
  ShieldCheck,
  Clock,
  CreditCard,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Wrench,
  CheckCircle2,
  Award,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const CUSTOMER_STEPS = [
  {
    step: '01',
    title: 'Find Your Service',
    description:
      'Search our extensive catalogue of home repairs, appliance servicing, electrical, plumbing, and deep cleaning. Filter by price, category, or area.',
    icon: Search,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-100',
    badge: 'Step 1',
  },
  {
    step: '02',
    title: 'Choose a Verified Technician',
    description:
      'Compare top-rated, police-verified technicians. Review their verified customer feedback, hourly rates, skills, and portfolio before deciding.',
    icon: UserCheck,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-100',
    badge: 'Step 2',
  },
  {
    step: '03',
    title: 'Book a Convenient Time',
    description:
      'Select the exact date and time that fits your busy schedule. Provide your address and job details with instant confirmation.',
    icon: CalendarCheck,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-100',
    badge: 'Step 3',
  },
  {
    step: '04',
    title: 'Job Done & 30-Day Warranty',
    description:
      'Your technician arrives on schedule with professional gear, fixes the problem, and cleans up. Pay securely and enjoy our 30-day satisfaction warranty.',
    icon: ShieldCheck,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-100',
    badge: 'Step 4',
  },
]

const PROMISES = [
  {
    icon: ShieldCheck,
    title: '100% Background-Checked',
    desc: 'National ID, criminal record, and technical skill verification for every single technician.',
  },
  {
    icon: CreditCard,
    title: 'Transparent Upfront Pricing',
    desc: 'Clear quotes with zero hidden fees. You know exactly what you pay before the work starts.',
  },
  {
    icon: Award,
    title: '30-Day Service Guarantee',
    desc: 'Not fully satisfied with the repair? We send another technician to fix it for free.',
  },
  {
    icon: Clock,
    title: 'On-Time Arrival',
    desc: 'Real-time booking and punctuality commitment with 30-minute rapid arrival support.',
  },
]

const FAQS = [
  {
    q: 'How are technicians verified on FixtNow?',
    a: 'Every professional undergoes a multi-layer screening process: National ID verification, police background check, hands-on skill assessment, and trade certificate audits.',
  },
  {
    q: 'What if I am unhappy with the service?',
    a: 'All bookings on FixtNow are covered by our 30-Day Quality Guarantee. If any issue reoccurs or the work does not meet standard, we will send an expert to re-do it at zero extra charge.',
  },
  {
    q: 'How do I pay for my service?',
    a: 'You can pay securely online via SSLCommerz (Cards, bKash, Nagad) or choose cash on completion after inspecting the finished job.',
  },
  {
    q: 'Can I reschedule or cancel a booking?',
    a: 'Yes, you can easily reschedule or cancel your appointment directly from your customer dashboard with zero hassle before the technician departs.',
  },
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-900">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-50/70 via-white to-[#FDFBF7] pt-14 pb-16 sm:pt-20 sm:pb-24 border-b border-slate-100">
        {/* Subtle Background Glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-35" />
          <div className="absolute -top-24 right-1/4 w-[480px] h-[480px] bg-orange-400/10 rounded-full blur-[100px]" />
          <div className="absolute top-1/3 -left-20 w-[420px] h-[420px] bg-amber-300/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-orange-600 text-xs font-semibold shadow-xs mb-6">
            <Zap className="size-3.5 fill-current" />
            <span>SIMPLE, TRANSPARENT & RELIABLE</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0B1729] leading-[1.12] mb-6">
            How FixtNow Works for{' '}
            <span className="bg-gradient-to-r from-orange-600 via-[#FF6B00] to-amber-500 bg-clip-text text-transparent">
              Your Everyday Life
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
            Getting top-tier repair and maintenance done is now as easy as ordering food online.
            Follow our proven 4-step process to get verified help at your doorstep.
          </p>

          {/* Quick CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Button asChild size="lg" className="rounded-full bg-[#FF6B00] hover:bg-[#E05E00] text-white px-7 py-3 text-sm font-bold shadow-lg shadow-orange-500/25">
              <Link href="/service">
                <span>Explore Services</span>
                <ArrowRight className="size-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full border-slate-300 text-slate-700 hover:bg-slate-50 px-7 py-3 text-sm font-semibold">
              <Link href="/technicians">
                Browse Technicians
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 2. 4-STEP CUSTOMER JOURNEY */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00]">
            STEP-BY-STEP WORKFLOW
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1729] mt-2 mb-4">
            From Problem to Solution in 4 Easy Steps
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            We take the anxiety and guesswork out of home repairs by pairing you with skilled, accountable pros.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {CUSTOMER_STEPS.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.step}
                className="relative bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`size-12 rounded-xl ${item.bgColor} ${item.color} flex items-center justify-center font-bold text-lg border ${item.borderColor} shadow-xs group-hover:scale-105 transition-transform`}>
                      <Icon className="size-6" />
                    </div>
                    <span className="text-3xl font-black text-slate-200 group-hover:text-orange-200 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  {/* Step Title */}
                  <h3 className="text-lg font-bold text-[#0B1729] mb-2.5">
                    {item.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span className="text-[#FF6B00] font-bold">{item.badge}</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 3. VALUE PROPOSITION / PEACE OF MIND */}
      <section className="py-16 sm:py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00]">
              THE FIXTNOW PROMISE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1729] mt-2 mb-3">
              Why Thousands Trust Us with Their Homes
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We are not just a classifieds list. We provide full accountability, certified talent, and complete consumer protection.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROMISES.map((p, idx) => {
              const Icon = p.icon
              return (
                <div key={idx} className="p-5 sm:p-6 rounded-2xl bg-[#F8FAFC] border border-slate-100 hover:border-orange-200 transition-colors">
                  <div className="size-10 rounded-xl bg-orange-100/70 text-[#FF6B00] flex items-center justify-center mb-4">
                    <Icon className="size-5" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-[#0B1729] mb-1.5">
                    {p.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 4. TECHNICIAN RECRUITMENT BANNER */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-[#0B281E] text-white p-8 sm:p-12 overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#114935] text-emerald-300 text-xs font-bold mb-3 border border-emerald-500/30">
              <Wrench className="size-3.5" />
              <span>FOR TECHNICIANS & CRAFTSMEN</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold leading-tight mb-3">
              Are You a Skilled Professional Looking for Work?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              Join FixtNow to connect with thousands of active homeowners and businesses in your area.
              Set your own hours, build your reputation, and earn on your terms.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild className="rounded-full bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold px-6">
                <Link href="/register">
                  Register as a Pro <ArrowRight className="size-4 ml-1.5" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full bg-white/5 border-white/25 text-white hover:bg-white/10">
                <Link href="/About">Learn More About Us</Link>
              </Button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 w-full md:w-72 shrink-0 text-left">
            <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Sparkles className="size-4 text-[#FF6B00]" />
              <span>Pro Perks</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-200">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-3.5 text-emerald-400" />
                <span>Zero registration fees</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-3.5 text-emerald-400" />
                <span>Flexible working hours</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-3.5 text-emerald-400" />
                <span>Guaranteed weekly payouts</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="size-3.5 text-emerald-400" />
                <span>Dedicated dispute protection</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-16 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00]">
            GOT QUESTIONS?
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1729] mt-2 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Everything you need to know about booking and working with our verified experts.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
              <h4 className="text-sm sm:text-base font-bold text-[#0B1729] flex items-center gap-2.5 mb-2">
                <HelpCircle className="size-4 text-[#FF6B00] shrink-0" />
                <span>{faq.q}</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. BOTTOM CTA */}
      <section className="py-16 bg-[#0B1729] text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Ready to Experience Hassle-Free Repair?
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            Book a trusted expert today in less than two minutes. Transparent pricing, verified quality, and 30-day warranty.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="rounded-full bg-[#FF6B00] hover:bg-[#E05E00] text-white px-8 font-bold shadow-lg shadow-orange-500/20">
              <Link href="/service">
                Book a Service Now
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full border-slate-700 text-slate-200 hover:bg-slate-800 px-8 font-semibold">
              <Link href="/technicians">
                Browse Technicians
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
