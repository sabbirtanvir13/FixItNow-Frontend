"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, Variants } from "framer-motion"
import { Star, Clock, DollarSign, ArrowRight, ShieldCheck, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"

const technicians = [
  {
    id: 1,
    name: "Rahim Ahmed",
    profession: "Senior Electrician",
    rating: 4.9,
    reviews: "(142)",
    experience: "8+ Years",
    price: "$25/hr",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 2,
    name: "Tanvir Hossain",
    profession: "Master Plumber & Pipe Fitter",
    rating: 4.8,
    reviews: "(98)",
    experience: "6+ Years",
    price: "$20/hr",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 3,
    name: "Shariful Islam",
    profession: "AC & Cooling Specialist",
    rating: 5.0,
    reviews: "(115)",
    experience: "10+ Years",
    price: "$30/hr",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 4,
    name: "Kamal Uddin",
    profession: "Professional Painter & Finisher",
    rating: 4.7,
    reviews: "(84)",
    experience: "5+ Years",
    price: "$22/hr",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
    href: "#",
  },
]

export function TopRatedTechnicians() {
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
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider mb-2">
              <ShieldCheck className="size-4" />
              Expert Professionals
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Top Rated Technicians
            </h2>
            <p className="mt-2 text-base text-muted-foreground max-w-xl">
              Book appointments with certified, background-checked, and highly reviewed professionals.
            </p>
          </div>

          <Button variant="outline" className="gap-2 w-fit">
            View All Technicians
            <ArrowRight className="size-4" />
          </Button>
        </div>

        {/* ── Technicians Grid ── */}
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {technicians.map((tech) => (
            <motion.div
              key={tech.id}
              variants={itemVariants}
              className="group flex flex-col items-center text-center rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Profile Image with Badge */}
              <div className="relative size-24 mb-4 overflow-hidden rounded-full border-2 border-primary/20 bg-muted">
                <Image
                  src={tech.image}
                  alt={tech.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Name & Profession */}
              <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                {tech.name}
              </h3>
              <p className="text-xs font-medium text-muted-foreground mt-0.5">
                {tech.profession}
              </p>

              {/* Rating */}
              <div className="mt-3 flex items-center gap-1.5 rounded-full bg-muted/60 px-3 py-1 text-xs">
                <div className="flex text-amber-500">
                  <Star className="size-3.5 fill-current" />
                </div>
                <span className="font-bold text-foreground">{tech.rating}</span>
                <span className="text-muted-foreground">{tech.reviews}</span>
              </div>

              {/* Experience & Price Meta */}
              <div className="mt-4 grid grid-cols-2 gap-2 w-full border-t border-border/60 pt-4 text-left">
                <div className="flex items-center gap-2">
                  <Clock className="size-3.5 text-muted-foreground shrink-0" />
                  <div>
                    <span className="text-[10px] text-muted-foreground block">Experience</span>
                    <span className="text-xs font-semibold text-foreground">{tech.experience}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <DollarSign className="size-3.5 text-muted-foreground shrink-0" />
                  <div>
                    <span className="text-[10px] text-muted-foreground block">Hourly Rate</span>
                    <span className="text-xs font-semibold text-foreground">{tech.price}</span>
                  </div>
                </div>
              </div>

              {/* View Profile Button */}
              <Button size="sm" variant="outline" asChild className="mt-5 w-full gap-1.5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Link href={tech.href}>
                  View Profile
                  <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}