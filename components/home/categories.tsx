// "use client"

// import Link from "next/link"
// import { motion, Variants } from "framer-motion"
// import { 
//   Zap, 
//   Droplet, 
//   Sparkles, 
//   Paintbrush, 
//   Wind, 
//   Hammer, 
//   Wrench, 
//   Bug, 
//   ArrowRight 
// } from "lucide-react"

// const categories = [
//   {
//     name: "Electrician",
//     count: "140+ Services",
//     icon: Zap,
//     href: "#",
//     color: "text-amber-500",
//     bgColor: "bg-amber-500/10",
//   },
//   {
//     name: "Plumber",
//     count: "120+ Services",
//     icon: Droplet,
//     href: "#",
//     color: "text-blue-500",
//     bgColor: "bg-blue-500/10",
//   },
//   {
//     name: "Cleaner",
//     count: "200+ Services",
//     icon: Sparkles,
//     href: "#",
//     color: "text-emerald-500",
//     bgColor: "bg-emerald-500/10",
//   },
//   {
//     name: "Painter",
//     count: "85+ Services",
//     icon: Paintbrush,
//     href: "#",
//     color: "text-purple-500",
//     bgColor: "bg-purple-500/10",
//   },
//   {
//     name: "AC Repair",
//     count: "95+ Services",
//     icon: Wind,
//     href: "#",
//     color: "text-cyan-500",
//     bgColor: "bg-cyan-500/10",
//   },
//   {
//     name: "Carpenter",
//     count: "110+ Services",
//     icon: Hammer,
//     href: "#",
//     color: "text-orange-500",
//     bgColor: "bg-orange-500/10",
//   },
//   {
//     name: "Appliance Repair",
//     count: "150+ Services",
//     icon: Wrench,
//     href: "#",
//     color: "text-rose-500",
//     bgColor: "bg-rose-500/10",
//   },
//   {
//     name: "Pest Control",
//     count: "70+ Services",
//     icon: Bug,
//     href: "#",
//     color: "text-red-500",
//     bgColor: "bg-red-500/10",
//   },
// ]

// export function PopularCategories() {
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
//     <section className="relative w-full py-20 bg-background">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
//         {/* ── Section Header ── */}
//         <div className="flex flex-col items-center text-center mb-12">
//           <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
//             Popular Categories
//           </h2>
//           <p className="mt-3 text-base text-muted-foreground max-w-xl">
//             Explore our most requested professional services and find verified experts for your needs.
//           </p>
//         </div>

//         {/* ── Categories Grid ── */}
//         <motion.div
//           className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-50px" }}
//         >
//           {categories.map((category) => {
//             const Icon = category.icon
//             return (
//               <motion.div key={category.name} variants={itemVariants}>
//                 <Link
//                   href={category.href}
//                   className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md hover:-translate-y-1"
//                 >
//                   <div className="flex items-center justify-between mb-4">
//                     <div className={`flex size-12 items-center justify-center rounded-xl ${category.bgColor} ${category.color} transition-transform duration-300 group-hover:scale-110`}>
//                       <Icon className="size-6" />
//                     </div>
//                     <ArrowRight className="size-4 text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
//                   </div>

//                   <div>
//                     <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
//                       {category.name}
//                     </h3>
//                     <p className="text-xs text-muted-foreground mt-1">
//                       {category.count}
//                     </p>
//                   </div>
//                 </Link>
//               </motion.div>
//             )
//           })}
//         </motion.div>

//       </div>
//     </section>
//   )
// }



"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, Variants } from "framer-motion"
import { getAllCategoriesData } from "@/app/(publicGroup)/_action/serviceAction"
import { 
  Zap, Droplet, Sparkles, Paintbrush, Wind, 
  Hammer, Wrench, Bug, Briefcase, ArrowRight, Loader2, AlertCircle
} from "lucide-react"

interface Category {
  id: string;
  name: string;
  description?: string;
}

const getCategoryStyles = (name: string) => {
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes("electric")) return { icon: Zap, color: "text-amber-500", bgColor: "bg-amber-500/10" };
  if (lowerName.includes("plumb")) return { icon: Droplet, color: "text-blue-500", bgColor: "bg-blue-500/10" };
  if (lowerName.includes("clean")) return { icon: Sparkles, color: "text-emerald-500", bgColor: "bg-emerald-500/10" };
  if (lowerName.includes("paint")) return { icon: Paintbrush, color: "text-purple-500", bgColor: "bg-purple-500/10" };
  if (lowerName.includes("ac ") || lowerName.includes("air")) return { icon: Wind, color: "text-cyan-500", bgColor: "bg-cyan-500/10" };
  if (lowerName.includes("carpent") || lowerName.includes("wood")) return { icon: Hammer, color: "text-orange-500", bgColor: "bg-orange-500/10" };
  if (lowerName.includes("repair") || lowerName.includes("appliance")) return { icon: Wrench, color: "text-rose-500", bgColor: "bg-rose-500/10" };
  if (lowerName.includes("pest") || lowerName.includes("bug")) return { icon: Bug, color: "text-red-500", bgColor: "bg-red-500/10" };
  
  return { icon: Briefcase, color: "text-indigo-500", bgColor: "bg-indigo-500/10" };
};

export function PopularCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategoriesData();
        
        if (!response.success) {
          throw new Error(response.message || "Something went wrong");
        }

        setCategories(response.data);
      } catch (err: any) {
        console.error("Failed to fetch categories:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  }

  return (
    <section className="relative w-full py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Popular Categories
          </h2>
          <p className="mt-3 text-base text-muted-foreground max-w-xl">
            Explore our most requested professional services and find verified experts for your needs.
          </p>
        </div>

        {/* ── Error State ── */}
        {error ? (
          <div className="flex flex-col items-center justify-center py-10 text-destructive">
            <AlertCircle className="w-10 h-10 mb-3" />
            <p className="text-lg font-medium">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : isLoading ? (
          /* ── Loading State ── */
          <div className="flex justify-center items-center py-20">
             <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : (
          /* ── Categories Grid ── */
          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {categories.map((category) => {
              const { icon: Icon, color, bgColor } = getCategoryStyles(category.name);
              
              return (
                <motion.div key={category.id} variants={itemVariants}>
                  <Link
                    href={`/services?category=${category.id}`}
                    className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`flex size-12 items-center justify-center rounded-xl ${bgColor} ${color} transition-transform duration-300 group-hover:scale-110`}>
                        <Icon className="size-6" />
                      </div>
                      <ArrowRight className="size-4 text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
                    </div>

                    <div>
                      <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Explore Services
                      </p>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        )}

      </div>
    </section>
  )
}