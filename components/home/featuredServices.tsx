// "use client"

// import Image from "next/image"
// import Link from "next/link"
// import { motion, Variants } from "framer-motion"
// import { Star, ArrowRight, ShieldCheck } from "lucide-react"
// import { Button } from "@/components/ui/button"

// const featuredServices = [
//   {
//     id: 1,
//     title: "Complete AC Regular Servicing & Gas Check",
//     category: "AC Repair",
//     price: "$45",
//     rating: 4.9,
//     reviews: "(120)",
//     image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600&auto=format&fit=crop",
//     href: "#",
//   },
//   {
//     id: 2,
//     title: "Full House Deep Cleaning & Sanitization",
//     category: "Cleaner",
//     price: "$85",
//     rating: 4.8,
//     reviews: "(245)",
//     image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=600&auto=format&fit=crop",
//     href: "#",
//   },
//   {
//     id: 3,
//     title: "Advanced Electrical Wiring & Switchboard Repair",
//     category: "Electrician",
//     price: "$35",
//     rating: 5.0,
//     reviews: "(98)",
//     image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=600&auto=format&fit=crop",
//     href: "#",
//   },
//   {
//     id: 4,
//     title: "Emergency Pipe Leakage & Bathroom Fixing",
//     category: "Plumber",
//     price: "$40",
//     rating: 4.7,
//     reviews: "(156)",
//     image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop",
//     href: "#",
//   },
//   {
//     id: 5,
//     title: "Premium Interior Wall Painting & Primer",
//     category: "Painter",
//     price: "$120",
//     rating: 4.9,
//     reviews: "(82)",
//     image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600&auto=format&fit=crop",
//     href: "#",
//   },
//   {
//     id: 6,
//     title: "Professional Sofa, Mattress & Carpet Dry Clean",
//     category: "Cleaner",
//     price: "$50",
//     rating: 4.8,
//     reviews: "(174)",
//     image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=600&auto=format&fit=crop",
//     href: "#",
//   },
// ]

// export function FeaturedServices() {
//   const containerVariants: Variants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.1,
//       },
//     },
//   }

//   const itemVariants: Variants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.4, ease: "easeOut" },
//     },
//   }

//   return (
//     <section className="relative w-full py-20 bg-muted/30 border-y border-border/60">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
//         {/* ── Section Header ── */}
//         <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
//           <div>
//             <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider mb-2">
//               <ShieldCheck className="size-4" />
//               Top Rated Offers
//             </div>
//             <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
//               Featured Services
//             </h2>
//             <p className="mt-2 text-base text-muted-foreground max-w-xl">
//               Hand-picked professional services delivered by verified and top-rated experts near you.
//             </p>
//           </div>

//           <Button variant="outline" className="gap-2 w-fit">
//             View All Services
//             <ArrowRight className="size-4" />
//           </Button>
//         </div>

//         {/* ── Services Grid ── */}
//         <motion.div
//           className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-50px" }}
//         >
//           {featuredServices.map((service) => (
//             <motion.div
//               key={service.id}
//               variants={itemVariants}
//               className="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1"
//             >
//               {/* Image Container */}
//               <div className="relative aspect-video w-full overflow-hidden bg-muted">
//                 <Image
//                   src={service.image}
//                   alt={service.title}
//                   fill
//                   className="object-cover transition-transform duration-500 group-hover:scale-105"
//                 />
//                 <div className="absolute top-3 left-3 z-10 rounded-full bg-background/90 backdrop-blur-md px-3 py-1 text-xs font-semibold text-foreground shadow-sm">
//                   {service.category}
//                 </div>
//               </div>

//               {/* Content Body */}
//               <div className="flex flex-1 flex-col justify-between p-6">
//                 <div>
//                   {/* Rating & Reviews */}
//                   <div className="flex items-center gap-1.5 mb-2">
//                     <div className="flex text-amber-500">
//                       <Star className="size-4 fill-current" />
//                     </div>
//                     <span className="text-xs font-bold text-foreground">
//                       {service.rating}
//                     </span>
//                     <span className="text-xs text-muted-foreground">
//                       {service.reviews}
//                     </span>
//                   </div>

//                   {/* Service Title */}
//                   <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
//                     {service.title}
//                   </h3>
//                 </div>

//                 {/* Footer: Price & Book Now */}
//                 <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
//                   <div>
//                     <span className="text-xs text-muted-foreground block">Starting at</span>
//                     <span className="text-lg font-bold text-foreground">
//                       {service.price}
//                     </span>
//                   </div>

//                   <Button size="sm" asChild className="gap-1.5 shadow-sm">
//                     <Link href={service.href}>
//                       Book Now
//                     </Link>
//                   </Button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>

//       </div>
//     </section>
//   )
// }


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
    <section className="relative w-full py-20 bg-muted/30 border-y border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider mb-2">
              <ShieldCheck className="size-4" />
              Top Rated Offers
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Featured Services
            </h2>
            <p className="mt-2 text-base text-muted-foreground max-w-xl">
              Hand-picked professional services delivered by verified and top-rated experts near you.
            </p>
          </div>

          <Button variant="outline" asChild className="gap-2 w-fit">
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
                className="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                  <Image
                    src={service.image || "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=600&auto=format&fit=crop"}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 z-10 rounded-full bg-background/90 backdrop-blur-md px-3 py-1 text-xs font-semibold text-foreground shadow-sm">
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
                      <span className="text-xs font-bold text-foreground">
                        {service.rating || "4.9"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {service.reviews || "(100+)"}
                      </span>
                    </div>

                    {/* Service Title */}
                    <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {service.title}
                    </h3>
                  </div>

                  {/* Footer: Price & Book Now */}
                  <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
                    <div>
                      <span className="text-xs text-muted-foreground block">Starting at</span>
                      <span className="text-lg font-bold text-foreground">
                        ৳{service.price}
                      </span>
                    </div>

                    <Button size="sm" asChild className="gap-1.5 shadow-sm">
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