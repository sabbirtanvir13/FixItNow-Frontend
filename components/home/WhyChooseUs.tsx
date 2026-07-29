"use client"

import { motion, Variants } from "framer-motion"
import { 
  ShieldCheck, 
  Tag, 
  Lock, 
  Clock, 
  Headphones, 
  Star 
} from "lucide-react"

const reasons = [
  {
    title: "Verified Professionals",
    description: "All our technicians undergo rigorous background checks and skill verification for your safety.",
    icon: ShieldCheck,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    title: "Transparent Pricing",
    description: "No hidden fees or unexpected costs. Know the exact price before you book any service.",
    icon: Tag,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Secure Payments",
    description: "Pay safely online through encrypted gateway systems with multiple payment options.",
    icon: Lock,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Fast Booking",
    description: "Book your preferred technician or service in less than a minute with our quick scheduling.",
    icon: Clock,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    title: "24/7 Support",
    description: "Our dedicated customer care team is always available to help you with any issues or queries.",
    icon: Headphones,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    title: "Trusted Reviews",
    description: "Read genuine feedback and ratings from thousands of real and satisfied customers.",
    icon: Star,
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
  },
]

export function WhyChooseUs() {
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
    <section className="relative w-full py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider mb-2">
            Why Choose FixItNow
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Experience the Best Service Quality
          </h2>
          <p className="mt-3 text-base text-muted-foreground max-w-xl">
            We are committed to delivering reliable, safe, and top-tier services right to your doorstep.
          </p>
        </div>

        {/* ── Grid Container (6 Cards) ── */}
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {reasons.map((item) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="group relative flex flex-col items-start rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1"
              >
                {/* Icon */}
                <div className={`flex size-12 items-center justify-center rounded-xl ${item.bgColor} ${item.color} mb-5 transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="size-6" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}