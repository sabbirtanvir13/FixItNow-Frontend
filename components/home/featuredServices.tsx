

"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, Variants } from "framer-motion"
import { Star, ArrowRight, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { getAllServiceData } from "@/app/(publicGroup)/_action/serviceAction"


export function FeaturedServices() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      const response = await getAllServiceData("services", "services-tag");
      if (response.success && response.data) {
        // লেটেস্ট ৪টি সার্ভিস নেওয়ার জন্য .slice(0, 4) ব্যবহার করা হয়েছে
        setServices(response.data.slice(0, 4));
      }
      setLoading(false);
    }
    fetchServices();
  }, []);

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
    <section className="relative w-full py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Featured Services
            </h2>
            <p className="mt-2 text-base text-slate-600 max-w-xl">
              Top rated and most booked services by our customers
            </p>
          </div>

          <Button variant="outline" asChild className="gap-2 w-fit border-slate-300 text-slate-700 hover:bg-slate-50">
            <Link href="/service">
              View All Services
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading featured services...</div>
        ) : services.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">No featured services found.</div>
        ) : (
          /* ── Services Grid ── */
          <motion.div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:border-orange-500/50 hover:shadow-lg hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                  <Image
                    src={service.image || "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=600&auto=format&fit=crop"}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 z-10 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-semibold text-slate-900 shadow-sm">
                    {service.category?.name || "Service"}
                  </div>
                </div>

                {/* Content Body */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    {/* Rating & Reviews */}
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className="flex text-amber-500">
                        <Star className="size-4 fill-current" />
                      </div>
                      <span className="text-xs font-bold text-slate-900">
                        {service.rating || "4.9"}
                      </span>
                      <span className="text-xs text-slate-500">
                        {service.reviews || "(100+)"}
                      </span>
                    </div>

                    {/* Service Title */}
                    <h3 className="text-base font-semibold text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-2">
                      {service.title}
                    </h3>
                  </div>

                  {/* Footer: Price & Book Now */}
                  <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
                    <div>
                      <span className="text-xs text-slate-500 block">Starting at</span>
                      <span className="text-lg font-bold text-slate-900">
                        ৳{service.price}
                      </span>
                    </div>

                    <Button size="sm" asChild className="gap-1.5 shadow-sm bg-orange-600 hover:bg-orange-700">
                      <Link href={`/service/${service.id}`}>
                        Book Now
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

      </div>
    </section>
  )
}