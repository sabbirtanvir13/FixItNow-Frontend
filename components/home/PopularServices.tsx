"use client"

import Link from "next/link"
import { motion, Variants } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { 
  PlumbingIcon, 
  ElectricalIcon, 
  ACRepairIcon, 
  HomeApplianceIcon, 
  CarpentryIcon, 
  PaintingIcon, 
  CleaningIcon, 
  MoreServicesIcon 
} from "@/components/icons/ServiceIcons"

const services = [
  { name: "Plumbing", icon: PlumbingIcon, href: "/service?category=plumbing" },
  { name: "Electrical", icon: ElectricalIcon, href: "/service?category=electrical" },
  { name: "AC Repair", icon: ACRepairIcon, href: "/service?category=ac-repair" },
  { name: "Home Appliance", icon: HomeApplianceIcon, href: "/service?category=home-appliance" },
  { name: "Carpentry", icon: CarpentryIcon, href: "/service?category=carpentry" },
  { name: "Painting", icon: PaintingIcon, href: "/service?category=painting" },
  { name: "Cleaning", icon: CleaningIcon, href: "/service?category=cleaning" },
  { name: "More", icon: MoreServicesIcon, href: "/service" },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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

export function PopularServices() {
  return (
    <section className="relative w-full py-12 bg-white border-b border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Popular Services
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Choose from a wide range of professional services
          </p>
        </div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.div key={service.name} variants={itemVariants}>
                <Link
                  href={service.href}
                  className="group flex flex-col items-center justify-center p-5 rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-orange-500/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex size-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600 mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="size-6" />
                  </div>
                  <span className="text-sm font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">
                    {service.name}
                  </span>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

      </div>
    </section>
  )
}
