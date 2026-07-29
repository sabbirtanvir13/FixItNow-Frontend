"use client"

import { motion, Variants } from "framer-motion"
import { Search, UserCheck, CalendarCheck, CheckCircle2 } from "lucide-react"

const steps = [
  {
    step: "01",
    title: "Search Service",
    description: "Find the exact home or tech service you need using our smart search bar.",
    icon: Search,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    step: "02",
    title: "Choose Technician",
    description: "Browse verified expert profiles, read real customer reviews, and pick your favorite.",
    icon: UserCheck,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    step: "03",
    title: "Book Time Slot",
    description: "Select a convenient date and time that fits perfectly into your schedule.",
    icon: CalendarCheck,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    step: "04",
    title: "Get Job Done",
    description: "Sit back and relax while our professional technician completes the work flawlessly.",
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
    <section className="relative w-full py-20 bg-muted/30 border-y border-border/60 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider mb-2">
            Simple & Easy Process
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-3 text-base text-muted-foreground max-w-xl">
            Get your services done in just 4 simple steps without any hassle.
          </p>
        </div>

        {/* ── Line Timeline Layout ── */}
        <div className="relative">
          {/* Connecting Horizontal Line for Desktop */}
          <div className="hidden lg:block absolute top-10 left-20 right-20 h-0.5 bg-border/80 z-0" />

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
                    <div className={`flex size-20 items-center justify-center rounded-2xl ${item.bgColor} ${item.color} shadow-md border border-border/60 transition-transform duration-300 group-hover:scale-110 group-hover:border-primary/50 bg-background`}>
                      <Icon className="size-8" />
                    </div>
                    <span className="absolute -top-2 -right-2 flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-sm">
                      {item.step}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed max-w-xs">
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