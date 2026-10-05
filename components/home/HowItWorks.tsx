"use client"

import { motion, Variants } from "framer-motion"
import { Search, UserCheck, CalendarCheck, CheckCircle2 } from "lucide-react"

const steps = [
  {
    step: "01",
    title: "Choose a Service",
    description: "Find the exact service you need from our wide range of professional offerings.",
    icon: Search,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    step: "02",
    title: "Pick a Technician",
    description: "Browse verified expert profiles and choose the perfect professional for your job.",
    icon: UserCheck,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    step: "03",
    title: "Book & Pay",
    description: "Select your preferred time slot and complete secure payment in minutes.",
    icon: CalendarCheck,
    color: "text-orange-600",
    bgColor: "bg-orange-500/10",
  },
  {
    step: "04",
    title: "Get It Done",
    description: "Relax while our verified technician completes the job to your satisfaction.",
    icon: CheckCircle2,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
]

export function HowItWorks() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  }

  return (
    <section id="how-it-works" className="relative w-full py-20 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-3 text-base text-slate-600 max-w-xl">
            Get your service done in just a few simple steps
          </p>
        </div>

        {/* Line Timeline Layout */}
        <div className="relative">
          {/* Connecting Horizontal Line for Desktop */}
          <div className="hidden lg:block absolute top-10 left-20 right-20 h-0.5 bg-slate-200 z-0" />

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {steps.map((item) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.step}
                  variants={itemVariants}
                  className="group flex flex-col items-center text-center relative"
                >
                  {/* Step Icon Node with Badge */}
                  <div className="relative mb-6">
                    <div className={`flex size-20 items-center justify-center rounded-2xl ${item.bgColor} ${item.color} shadow-md border border-slate-200 transition-transform duration-300 group-hover:scale-110 group-hover:border-orange-500/50 bg-white`}>
                      <Icon className="size-8" />
                    </div>
                    <span className="absolute -top-2 -right-2 flex size-7 items-center justify-center rounded-full bg-orange-600 text-white text-xs font-bold shadow-sm">
                      {item.step}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed max-w-xs">
                    {item.description}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

      </div>
    </section>
  )
}