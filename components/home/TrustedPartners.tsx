"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Lock, ShieldCheck, Zap, CreditCard, Shield } from "lucide-react";

interface PaymentPartner {
  id: string;
  name: string;
  logo: string;
  category: "Gateway" | "MFS" | "Card" | "Bank";
}

interface TrustFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ROW_1_PARTNERS: PaymentPartner[] = [
  { id: "sslcommerz", name: "SSLCommerz", logo: "/logo/sslcommerz.svg", category: "Gateway" },
  { id: "bkash", name: "bKash", logo: "/logo/bkash.svg", category: "MFS" },
  { id: "nagad", name: "Nagad", logo: "/logo/nagad.svg", category: "MFS" },
  { id: "rocket", name: "Rocket", logo: "/logo/rocket.svg", category: "MFS" },
  { id: "upay", name: "Upay", logo: "/logo/upay.svg", category: "MFS" },
  { id: "visa", name: "Visa", logo: "/logo/visa.svg", category: "Card" },
  { id: "mastercard", name: "Mastercard", logo: "/logo/mastercard.svg", category: "Card" },
  { id: "amex", name: "American Express", logo: "/logo/amex.svg", category: "Card" },
];

const ROW_2_PARTNERS: PaymentPartner[] = [
  { id: "unionpay", name: "UnionPay", logo: "/logo/unionpay.svg", category: "Card" },
  { id: "qcash", name: "Q-Cash", logo: "/logo/qcash.svg", category: "Card" },
  { id: "dbbl-nexus", name: "DBBL Nexus", logo: "/logo/dbbl-nexus.svg", category: "Card" },
  { id: "brac-bank", name: "BRAC Bank", logo: "/logo/brac-bank.svg", category: "Bank" },
  { id: "city-bank", name: "City Bank", logo: "/logo/city-bank.svg", category: "Bank" },
  { id: "dbbl", name: "Dutch-Bangla Bank", logo: "/logo/dbbl.svg", category: "Bank" },
  { id: "ebl", name: "Eastern Bank", logo: "/logo/ebl.svg", category: "Bank" },
  { id: "prime-bank", name: "Prime Bank", logo: "/logo/prime-bank.svg", category: "Bank" },
];

const TRUST_FEATURES: TrustFeature[] = [
  {
    icon: <Lock className="w-5 h-5 text-emerald-500" />,
    title: "256-bit SSL Encryption",
    description: "Bank-grade data encryption for all transactions",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-blue-500" />,
    title: "PCI DSS Compliant",
    description: "Certified with international payment security standards",
  },
  {
    icon: <Zap className="w-5 h-5 text-amber-500" />,
    title: "Instant Confirmation",
    description: "Real-time payment processing & instant booking validation",
  },
  {
    icon: <CreditCard className="w-5 h-5 text-purple-500" />,
    title: "30+ Payment Methods",
    description: "Support for MFS, local & international debit/credit cards",
  },
];

const LogoCard: React.FC<{ partner: PaymentPartner }> = ({ partner }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group relative flex-shrink-0 w-44 sm:w-52 h-24 sm:h-28 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center space-y-1.5 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all duration-300 transform hover:-translate-y-1.5 hover:scale-105 select-none cursor-pointer">
      <div className="relative w-full h-10 sm:h-12 flex items-center justify-center">
        {!imageError ? (
          <Image
            src={partner.logo}
            alt={partner.name}
            fill
            className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-700 dark:text-slate-200">
            <Shield className="w-4 h-4 text-blue-500" />
            <span className="truncate max-w-[120px]">{partner.name}</span>
          </div>
        )}
      </div>

      <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {partner.name}
      </span>
    </div>
  );
};

export default function TrustedPartners() {
  // Duplicate arrays for smooth infinite marquee loops
  const marqueeRow1 = [...ROW_1_PARTNERS, ...ROW_1_PARTNERS, ...ROW_1_PARTNERS];
  const marqueeRow2 = [...ROW_2_PARTNERS, ...ROW_2_PARTNERS, ...ROW_2_PARTNERS];

  return (
    <section className="relative py-20 overflow-hidden bg-slate-50/50 dark:bg-slate-950/50 border-y border-slate-200/60 dark:border-slate-800/60">
      {/* Ambient background glow effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Header Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200/80 dark:border-blue-800/80 text-blue-700 dark:text-blue-300 text-xs font-bold tracking-wide shadow-sm"
          >
            <Lock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>🔒 SSLCommerz Secure Payment Gateway</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            Secure Payments <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Powered by SSLCommerz
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-sm sm:text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
          >
            Mobile Banking • Cards • Internet Banking
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto"
          >
            Pay securely through Bangladesh&apos;s most trusted payment gateway. We support Mobile Financial Services,
            Debit & Credit Cards, and Internet Banking with fast, encrypted, and PCI DSS compliant transactions.
          </motion.p>
        </div>

        {/* Infinite Marquee Rows Container */}
        <div className="space-y-6 py-4 relative">
          {/* Gradient Edge Blurs */}
          <div className="absolute top-0 bottom-0 left-0 w-20 sm:w-32 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-20 sm:w-32 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent z-20 pointer-events-none" />

          {/* Row 1: Leftward Marquee */}
          <div className="overflow-hidden group">
            <div className="flex space-x-5 animate-marquee group-hover:[animation-play-state:paused]">
              {marqueeRow1.map((partner, index) => (
                <LogoCard key={`row1-${partner.id}-${index}`} partner={partner} />
              ))}
            </div>
          </div>

          {/* Row 2: Rightward Marquee */}
          <div className="overflow-hidden group">
            <div className="flex space-x-5 animate-marquee-reverse group-hover:[animation-play-state:paused]">
              {marqueeRow2.map((partner, index) => (
                <LogoCard key={`row2-${partner.id}-${index}`} partner={partner} />
              ))}
            </div>
          </div>
        </div>

        {/* Four Trust Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          {TRUST_FEATURES.map((feature, idx) => (
            <motion.div
              key={`trust-${idx}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * idx }}
              className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/70 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex items-start space-x-3.5"
            >
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 flex-shrink-0">
                {feature.icon}
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  {feature.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Disclaimer */}
        <div className="text-center pt-2">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Trusted by thousands of customers across Bangladesh with secure and encrypted online payments.
          </p>
        </div>
      </div>

      {/* Marquee Animation Keyframes in Tailwind/CSS */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        @keyframes marquee-reverse {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          width: max-content;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 30s linear infinite;
          width: max-content;
        }
      `}</style>
    </section>
  );
}
