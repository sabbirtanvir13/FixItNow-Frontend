"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, HelpCircle } from "lucide-react"

const faqs = [
  {
    question: "How do I book a service?",
    answer: "Simply search for your required service using our search bar, browse through verified technician profiles, choose your preferred expert, and select a convenient date and time slot to confirm your booking instantly.",
  },
  {
    question: "What payment methods are available?",
    answer: "You can pay securely online through our encrypted payment gateway using credit/debit cards, mobile banking (bKash, Nagad, Rocket), or choose cash on completion depending on the service.",
  },
  {
    question: "Can I cancel or reschedule a booking?",
    answer: "Yes, you can easily cancel or reschedule your booking up to 2 hours before the scheduled time without incurring any cancellation fees.",
  },
  {
    question: "Are the technicians verified?",
    answer: "Absolutely! Every professional on our platform goes through rigorous background checks, national ID verification, and professional skill assessments for your complete safety and peace of mind.",
  },
]

export function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className="relative w-full py-20 bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-slate-600 max-w-lg">
            Everything you need to know about our services
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index
            return (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:border-orange-500/40 shadow-sm"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="flex w-full items-center justify-between p-6 text-left font-semibold text-slate-900 transition-colors"
                >
                  <span className="text-base sm:text-lg">{faq.question}</span>
                  <div className={`flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100 transition-transform duration-300 ${isOpen ? "rotate-180 bg-orange-100 text-orange-600" : "text-slate-500"}`}>
                    <ChevronDown className="size-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-0 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-200 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}