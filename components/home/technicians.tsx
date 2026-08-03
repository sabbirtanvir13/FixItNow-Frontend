"use client"

import Link from "next/link"
import { motion, Variants } from "framer-motion"
import { Star, Clock, DollarSign, ArrowRight, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TopRatedTechniciansProps {
  technicians: any[]
}

export function TopRatedTechnicians({ technicians: techniciansList }: TopRatedTechniciansProps) {

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

          <Button variant="outline" className="gap-2 w-fit" asChild>
            <Link href="/technicians">
              View All Technicians
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        {/* ── Technicians Grid (Exactly 4 Cards) ── */}
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {loading ? (
            <div className="col-span-full py-10 text-center text-muted-foreground">
              Loading technicians...
            </div>
          ) : techniciansList.length > 0 ? (
            techniciansList.map((tech: any) => {
              const name = tech.user?.name || tech.name || "Technician"

              // ইমেজ পাথ হ্যান্ডলিং
              let rawImage = tech.profilePhoto || tech.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
              if (rawImage.includes("C:\\") || rawImage.includes("C:/")) {
                const fileName = rawImage.split(/[\\/]/).pop()
                rawImage = `/uploads/${fileName}`
              }
              const image = rawImage

              const profession = tech.skills?.[0] || tech.services?.[0]?.title || tech.profession || "Expert Technician"

              // রেটিং বের করার লজিক
              let calculatedRating = "4.9"
              if (Array.isArray(tech.reviews) && tech.reviews.length > 0) {
                const sum = tech.reviews.reduce((acc: number, r: any) => acc + (r.rating || 0), 0)
                calculatedRating = (sum / tech.reviews.length).toFixed(1)
              } else if (typeof tech.rating === "object" && tech.rating?.rating) {
                calculatedRating = tech.rating.rating
              } else if (typeof tech.rating === "number") {
                calculatedRating = tech.rating.toString()
              }

              const reviewsCount = tech.total_reviews ?? tech.reviews?.length ?? 0

              // ১. অভিজ্ঞতা: experience_years না থাকলে বায়ো থেকে বা ডিফল্ট মান
              let experienceText = "N/A"
              if (tech.experience_years) {
                experienceText = `${tech.experience_years} Years`
              } else if (tech.bio && tech.bio.match(/\d+/)) {
                const match = tech.bio.match(/(\d+)\s*years/i)
                if (match) experienceText = `${match[1]} Years`
              }

              // ২. মূল্য: hourly_rate না থাকলে তাদের services তালিকার প্রথম সার্ভিসের price ব্যবহার করা হবে
              const servicePrice = tech.services?.[0]?.price
              const priceDisplay = tech.hourly_rate
                ? `$${tech.hourly_rate}/hr`
                : servicePrice
                  ? `৳${servicePrice}`
                  : "N/A"

              return (
                <motion.div
                  key={tech.id || tech._id}
                  variants={itemVariants}
                  className="group flex flex-col items-center text-center rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1"
                >
                  {/* Profile Image */}
                  <div className="relative size-24 mb-4 overflow-hidden rounded-full border-2 border-primary/20 bg-muted">
                    <img
                      src={image}
                      alt={name}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Name & Profession */}
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {name}
                  </h3>
                  <p className="text-xs font-medium text-muted-foreground mt-0.5 line-clamp-1">
                    {profession}
                  </p>

                  {/* Rating */}
                  <div className="mt-3 flex items-center gap-1.5 rounded-full bg-muted/60 px-3 py-1 text-xs">
                    <div className="flex text-amber-500">
                      <Star className="size-3.5 fill-current" />
                    </div>
                    <span className="font-bold text-foreground">{calculatedRating}</span>
                    <span className="text-muted-foreground">({reviewsCount})</span>
                  </div>

                  {/* Experience & Price Meta */}
                  <div className="mt-4 grid grid-cols-2 gap-2 w-full border-t border-border/60 pt-4 text-left">
                    <div className="flex items-center gap-2">
                      <Clock className="size-3.5 text-muted-foreground shrink-0" />
                      <div>
                        <span className="text-[10px] text-muted-foreground block">Experience</span>
                        <span className="text-xs font-semibold text-foreground">{experienceText}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <DollarSign className="size-3.5 text-muted-foreground shrink-0" />
                      <div>
                        <span className="text-[10px] text-muted-foreground block">Starting Price</span>
                        <span className="text-xs font-semibold text-foreground">{priceDisplay}</span>
                      </div>
                    </div>
                  </div>

                  {/* View Profile Button */}
                  <Button size="sm" variant="outline" asChild className="mt-5 w-full gap-1.5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Link href={`/technicians/${tech.id || tech._id}`}>
                      View Profile
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </Button>
                </motion.div>
              )
            })
          ) : (
            <div className="col-span-full py-10 text-center text-muted-foreground">
              No technicians available at the moment.
            </div>
          )}
        </motion.div>

      </div>
    </section>
  )
}