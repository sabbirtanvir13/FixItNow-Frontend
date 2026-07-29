"use client"

import { motion, Variants } from "framer-motion"
import { Users, UserCheck, Briefcase, Smile } from "lucide-react"

const stats = [
  {
    label: "Customers",
    value: "10K+",
    description: "Trusted everyday users",
    icon: Users,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    label: "Professionals",
    value: "500+",
    description: "Verified experts",
    icon: UserCheck,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: "Services",
    value: "50+",
    description: "Wide range of solutions",
    icon: Briefcase,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    label: "Satisfaction",
    value: "98%",
    description: "Positive customer feedback",
    icon: Smile,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
]

export function StatsSection() {
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
      transition: { duration: 0.4, ease: "easeOut" },
    },
  }

  return (
    <section className="relative w-full py-16 bg-muted/30 border-y border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
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
                className="group relative flex items-center gap-4 rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md"
              >
                <div className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${stat.bgColor} ${stat.color} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="size-6" />
                </div>
                
                <div className="flex flex-col">
                  <span className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {stat.value}
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {stat.label}
                  </span>
                  <span className="text-xs text-muted-foreground mt-0.5">
                    {stat.description}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}