"use client"

import { motion, Variants } from "framer-motion"
import { Users, UserCheck, Star, Clock } from "lucide-react"

interface StatItem {
  label: string
  value: string
  description: string
  icon: React.ElementType
}

const stats: StatItem[] = [
  {
    label: "Total Bookings",
    value: "10K+",
    description: "Completed services",
    icon: Users,
  },
  {
    label: "Verified Technicians",
    value: "5K+",
    description: "Background checked",
    icon: UserCheck,
  },
  {
    label: "Average Rating",
    value: "4.8★",
    description: "Customer satisfaction",
    icon: Star,
  },
  {
    label: "On-Time Service",
    value: "98%",
    description: "Punctuality rate",
    icon: Clock,
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export function StatsSection() {
  return (
    <section className="relative w-full py-20 bg-emerald-50/50 overflow-hidden">

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
          >
            Numbers That Speak For Themselves
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 text-base text-slate-600"
          >
            Thousands of customers trust FixItNow for their home and business service needs.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative flex flex-col items-center text-center p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex size-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="size-8" />
                </div>
                <span className="text-4xl font-extrabold text-slate-900 mb-2">
                  {stat.value}
                </span>
                <span className="text-lg font-semibold text-slate-900 mb-1">
                  {stat.label}
                </span>
                <span className="text-sm text-slate-500">
                  {stat.description}
                </span>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}