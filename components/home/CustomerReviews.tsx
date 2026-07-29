"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

const reviews = [
  {
    id: 1,
    name: "Farhan Ahmed",
    role: "Homeowner",
    rating: 5,
    review: "FixItNow made it so easy to find a reliable electrician. The technician arrived on time and fixed our switchboard problem in no time. Highly recommended!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    role: "Apartment Resident",
    rating: 5,
    review: "I booked an AC servicing through their platform. The expert was extremely professional, polite, and did a fantastic job. Will definitely use again.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Tanvir Hossain",
    role: "Business Owner",
    rating: 4.8,
    review: "The plumbing emergency support was a lifesaver. Fast booking and transparent pricing with no hidden charges. Great platform!",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Sadia Sultana",
    role: "Homeowner",
    rating: 5,
    review: "Amazing deep cleaning service! My living room and kitchen look brand new. The cleaners were very thorough and professional.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
  },
]

export function CustomerReviews() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  return (
    <section className="relative w-full py-20 bg-muted/30 border-y border-border/60 overflow-hidden">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider mb-2">
            <ShieldCheck className="size-4" />
            Verified Feedback
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What Our Customers Say
          </h2>
          <p className="mt-3 text-base text-muted-foreground max-w-xl">
            Read genuine experiences from homeowners and clients who trust our services.
          </p>
        </div>

        {/* ── Carousel Card Container ── */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl border border-border/80 bg-card p-8 sm:p-12 shadow-xl backdrop-blur-xl">
            <Quote className="absolute top-6 right-8 size-16 text-primary/10 pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex flex-col items-center text-center sm:items-start sm:text-left sm:flex-row gap-8 items-center"
              >
                {/* Customer Photo */}
                <div className="relative size-28 shrink-0 overflow-hidden rounded-full border-4 border-primary/20 bg-muted shadow-md">
                  <Image
                    src={reviews[currentIndex].image}
                    alt={reviews[currentIndex].name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Review Details */}
                <div className="flex-1">
                  {/* Rating Stars */}
                  <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-500 mb-3">
                    {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="size-4 fill-current" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-base sm:text-lg italic leading-relaxed text-foreground/90">
                    &ldquo;{reviews[currentIndex].review}&rdquo;
                  </p>

                  {/* Name & Role */}
                  <div className="mt-6">
                    <h3 className="text-base font-bold text-foreground">
                      {reviews[currentIndex].name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {reviews[currentIndex].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Carousel Navigation Controls ── */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots Indicator */}
            <div className="flex items-center gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === index ? "w-8 bg-primary" : "w-2.5 bg-border hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Next/Prev Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrev}
                className="rounded-full size-11 shadow-sm"
                aria-label="Previous review"
              >
                <ChevronLeft className="size-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                className="rounded-full size-11 shadow-sm"
                aria-label="Next review"
              >
                <ChevronRight className="size-5" />
              </Button>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}