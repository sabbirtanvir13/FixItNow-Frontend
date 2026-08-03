"use client"

import { motion, Variants } from "framer-motion"
import { Users, UserCheck, Briefcase, Smile, ArrowUpRight } from "lucide-react"

interface StatItem {
  label: string
  value: string
  description: string
  icon: React.ElementType
  color: string
  bgColor: string
  borderColor: string
  glowColor: string
}

const stats: StatItem[] = [
  {
    label: "Active Customers",
    value: "10K+",
    description: "Trusted everyday users worldwide",
    icon: Users,
    color: "text-blue-500 dark:text-blue-400",
    bgColor: "bg-blue-500/10 dark:bg-blue-400/10",
    borderColor: "group-hover:border-blue-500/40",
    glowColor: "from-blue-500/20 to-indigo-500/20",
  },
  {
    label: "Expert Professionals",
    value: "500+",
    description: "Verified industry experts",
    icon: UserCheck,
    color: "text-emerald-500 dark:text-emerald-400",
    bgColor: "bg-emerald-500/10 dark:bg-emerald-400/10",
    borderColor: "group-hover:border-emerald-500/40",
    glowColor: "from-emerald-500/20 to-teal-500/20",
  },
  {
    label: "Core Services",
    value: "50+",
    description: "Comprehensive solutions suite",
    icon: Briefcase,
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "group-hover:border-primary/40",
    glowColor: "from-primary/20 to-violet-500/20",
  },
  {
    label: "Satisfaction Rate",
    value: "98%",
    description: "Positive customer feedback",
    icon: Smile,
    color: "text-amber-500 dark:text-amber-400",
    bgColor: "bg-amber-500/10 dark:bg-amber-400/10",
    borderColor: "group-hover:border-amber-500/40",
    glowColor: "from-amber-500/20 to-orange-500/20",
  },
]

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
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export function StatsSection() {
  return (
    <section className="relative w-full py-24 bg-background overflow-hidden border-y border-border/40">

      {/* ── Dynamic Ambient Background Elements ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-primary/10 via-blue-500/10 to-purple-500/10 rounded-full blur-[140px] opacity-70" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Optional Section Header to Enhance Professionalism */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border/80 bg-card/60 backdrop-blur-md text-xs font-semibold text-muted-foreground mb-4 shadow-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Trusted by Industry Leaders
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Numbers That Speak For Themselves
          </motion.h2>
        </div>

        {/* ── Stats Grid Cards ── */}
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
                className={`group relative flex flex-col justify-between rounded-3xl border border-border/80 bg-card/40 p-7 shadow-lg backdrop-blur-xl transition-all duration-500 ${stat.borderColor} hover:shadow-2xl hover:bg-card/80 hover:border-border`}
              >
                {/* Glowing Aura on Hover */}
                <div className={`absolute -inset-px rounded-3xl bg-gradient-to-r ${stat.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-md`} />

                {/* Top Section: Icon & Decorative Indicator */}
                <div className="flex items-center justify-between mb-8">
                  {/* Icon Wrapper */}
                  <div className={`relative flex size-14 shrink-0 items-center justify-center rounded-2xl ${stat.bgColor} ${stat.color} border border-white/10 shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                    <Icon className="size-6" />
                  </div>

                  {/* Micro Interaction Arrow */}
                  <div className="flex size-8 items-center justify-center rounded-full bg-muted/50 text-muted-foreground opacity-0 -translate-y-2 translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300">
                    <ArrowUpRight className="size-4" />
                  </div>
                </div>

                {/* Bottom Section: Text Content */}
                <div className="relative flex flex-col z-10">
                  <span className="text-4xl font-extrabold tracking-tight text-foreground bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text">
                    {stat.value}
                  </span>

                  <span className="text-base font-semibold text-foreground mt-2">
                    {stat.label}
                  </span>

                  <span className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {stat.description}
                  </span>
                </div>

                {/* Subtle Bottom Accent Line */}
                <div className="absolute bottom-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-border to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}