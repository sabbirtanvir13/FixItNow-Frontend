"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  Lock,
  ShieldCheck,
  Smartphone,
  CreditCard,
  Shield,
  ArrowRight,
  CheckCircle2,
  Zap,
  Wifi,
  BatteryMedium,
  Check,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const paymentMethods = [
  { name: "bKash", logo: "/logo/bkash.svg" },
  { name: "Nagad", logo: "/logo/nagad-1.svg" },
  { name: "Visa", logo: "/logo/visa-10.svg" },
  { name: "Mastercard", logo: "/logo/mastercard.svg" },
];

const TRUST_FEATURES = [
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
    icon: <Smartphone className="w-5 h-5 text-purple-500" />,
    title: "Instant Confirmation",
    description: "Real-time payment processing & instant booking validation",
  },
  {
    icon: <CreditCard className="w-5 h-5 text-amber-500" />,
    title: "Multiple Payment Options",
    description: "Support for mobile banking and credit/debit cards",
  },
];

const floatVariant1: Variants = {
  float: {
    y: [0, -8, 0],
    transition: {
      duration: 4.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const floatVariant2: Variants = {
  float: {
    y: [0, 8, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const PaymentMethodCard: React.FC<{ method: (typeof paymentMethods)[0] }> = ({
  method,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex items-center justify-center w-20 h-12 bg-white rounded-xl border border-slate-200 shadow-xs p-2 relative hover:shadow-md transition-shadow">
      {!imageError ? (
        <Image
          src={method.logo}
          alt={method.name}
          width={60}
          height={40}
          className="object-contain"
          onError={() => setImageError(true)}
        />
      ) : (
        <span className="text-xs font-semibold text-slate-600">
          {method.name}
        </span>
      )}
    </div>
  );
};

export default function TrustedPartners() {
  const [selectedMethod, setSelectedMethod] = useState("bKash");

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50/40 to-slate-50 border-y border-slate-100">
      {/* Ambient background glow effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Content (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-700 text-xs font-bold tracking-wide shadow-xs"
            >
              <Lock className="w-3.5 h-3.5 text-blue-600" />
              <span>SAFE & SECURE TRANSACTIONS</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-3"
            >
              <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Secure Online Payments
              </h2>
              <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
                Powered by SSLCommerz
              </h3>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base text-slate-600 leading-relaxed max-w-lg font-normal"
            >
              Enjoy 100% safe and seamless doorstep or online payments with
              Bangladesh's leading payment gateway. Pay easily with bKash,
              Nagad, Rocket, or any Visa and Mastercard debit/credit card.
            </motion.p>

            {/* Supported Payment Logos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="space-y-2.5"
            >
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Supported Gateways & Wallets:
              </span>
              <div className="flex flex-wrap gap-3">
                {paymentMethods.map((method) => (
                  <PaymentMethodCard key={method.name} method={method} />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-2"
            >
              <Button
                size="lg"
                asChild
                className="gap-2 h-12 px-8 text-base font-semibold shadow-lg shadow-blue-600/20 bg-blue-600 hover:bg-blue-700 transition-all rounded-xl"
              >
                <Link href="/service">
                  Book & Pay Securely
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Right - Realistic Smartphone Device Mockup (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[340px]">
              {/* Radial backlight glow behind phone */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/25 via-indigo-500/20 to-purple-500/20 rounded-[60px] blur-3xl scale-95 opacity-80 pointer-events-none" />

              {/* Smartphone Outer Chassis */}
              <div className="relative bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 p-3 rounded-[50px] shadow-[0_25px_60px_-15px_rgba(15,23,42,0.4),0_0_0_1px_rgba(255,255,255,0.15)] ring-1 ring-slate-800">
                {/* Physical side buttons */}
                <div className="absolute -left-[3.5px] top-28 w-[3.5px] h-7 bg-slate-700 rounded-l" />
                <div className="absolute -left-[3.5px] top-40 w-[3.5px] h-11 bg-slate-700 rounded-l" />
                <div className="absolute -left-[3.5px] top-54 w-[3.5px] h-11 bg-slate-700 rounded-l" />
                <div className="absolute -right-[3.5px] top-36 w-[3.5px] h-16 bg-slate-700 rounded-r" />

                {/* Smartphone Screen Inner */}
                <div className="relative rounded-[40px] overflow-hidden bg-slate-50 border border-slate-800 flex flex-col h-[570px] select-none shadow-inner">
                  {/* Status Bar & Dynamic Island */}
                  <div className="relative pt-3 pb-2 px-6 flex items-center justify-between text-[11px] font-semibold text-slate-800 bg-white border-b border-slate-100 z-30">
                    <span>9:41</span>
                    {/* Dynamic Island */}
                    <div className="w-24 h-5 bg-black rounded-full flex items-center justify-end px-2 gap-1.5 shadow-sm">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
                        <div className="w-1 h-1 rounded-full bg-blue-500/60" />
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <Wifi className="w-3.5 h-3.5" />
                      <BatteryMedium className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* App Header */}
                  <div className="bg-white px-5 py-3 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-orange-500 flex items-center justify-center text-white shadow-xs">
                        <Zap className="w-3.5 h-3.5 fill-white" />
                      </div>
                      <span className="text-xs font-bold text-slate-900">
                        FixItNow Pay
                      </span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-bold text-emerald-700">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>SSL 256-Bit</span>
                    </div>
                  </div>

                  {/* Phone Screen Scrollable Content */}
                  <div className="flex-1 p-4 space-y-3.5 overflow-hidden flex flex-col justify-between">
                    {/* Order Details Card */}
                    <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-xs">
                      <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
                        <span>Invoice #FN-8429</span>
                        <span className="font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full text-[10px]">
                          Pending Payment
                        </span>
                      </div>
                      <div className="pt-2.5 flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">
                            AC Master Servicing
                          </h4>
                          <p className="text-[10px] text-slate-500">
                            Technician: Kamal Hossain
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 block">
                            Total
                          </span>
                          <span className="text-base font-extrabold text-slate-900">
                            ৳ 1,200
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Payment Gateway Header */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800">
                          Select Payment Option
                        </span>
                        <span className="text-[10px] font-semibold text-blue-600 flex items-center gap-0.5">
                          <Lock className="w-2.5 h-2.5" /> SSLCommerz
                        </span>
                      </div>

                      {/* Payment Options Radio List */}
                      <div className="space-y-2">
                        {/* Option 1: bKash */}
                        <div
                          onClick={() => setSelectedMethod("bKash")}
                          className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                            selectedMethod === "bKash"
                              ? "bg-pink-50/50 border-pink-500 shadow-xs ring-1 ring-pink-500/30"
                              : "bg-white border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-7 bg-white rounded-lg border border-slate-200/80 flex items-center justify-center p-1">
                              <Image
                                src="/logo/bkash.svg"
                                alt="bKash"
                                width={28}
                                height={18}
                                className="object-contain"
                              />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-900">
                                bKash Direct Pay
                              </p>
                              <p className="text-[10px] text-slate-500">
                                Instant automated pin authorization
                              </p>
                            </div>
                          </div>
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              selectedMethod === "bKash"
                                ? "border-pink-600 bg-pink-600 text-white"
                                : "border-slate-300"
                            }`}
                          >
                            {selectedMethod === "bKash" && (
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            )}
                          </div>
                        </div>

                        {/* Option 2: Nagad */}
                        <div
                          onClick={() => setSelectedMethod("Nagad")}
                          className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                            selectedMethod === "Nagad"
                              ? "bg-amber-50/50 border-amber-500 shadow-xs ring-1 ring-amber-500/30"
                              : "bg-white border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-7 bg-white rounded-lg border border-slate-200/80 flex items-center justify-center p-1">
                              <Image
                                src="/logo/nagad-1.svg"
                                alt="Nagad"
                                width={28}
                                height={18}
                                className="object-contain"
                              />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-900">
                                Nagad Wallet
                              </p>
                              <p className="text-[10px] text-slate-500">
                                Fast & secure checkout
                              </p>
                            </div>
                          </div>
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              selectedMethod === "Nagad"
                                ? "border-amber-600 bg-amber-600 text-white"
                                : "border-slate-300"
                            }`}
                          >
                            {selectedMethod === "Nagad" && (
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            )}
                          </div>
                        </div>

                        {/* Option 3: Card */}
                        <div
                          onClick={() => setSelectedMethod("Card")}
                          className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                            selectedMethod === "Card"
                              ? "bg-blue-50/50 border-blue-500 shadow-xs ring-1 ring-blue-500/30"
                              : "bg-white border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-7 bg-white rounded-lg border border-slate-200/80 flex items-center justify-center p-1">
                              <Image
                                src="/logo/visa-10.svg"
                                alt="Visa"
                                width={28}
                                height={18}
                                className="object-contain"
                              />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-900">
                                Debit / Credit Card
                              </p>
                              <p className="text-[10px] text-slate-500">
                                Visa, Mastercard & Amex
                              </p>
                            </div>
                          </div>
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              selectedMethod === "Card"
                                ? "border-blue-600 bg-blue-600 text-white"
                                : "border-slate-300"
                            }`}
                          >
                            {selectedMethod === "Card" && (
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pay Button inside Mobile */}
                    <div className="space-y-2 pt-1">
                      <button
                        type="button"
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/30 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Pay ৳ 1,200 Securely</span>
                      </button>

                      <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400">
                        <ShieldCheck className="w-3 h-3 text-emerald-500" />
                        <span>Protected by SSLCommerz TLS 1.3</span>
                      </div>
                    </div>
                  </div>

                  {/* iPhone Bottom Home Indicator Bar */}
                  <div className="py-2 flex justify-center bg-white">
                    <div className="w-28 h-1 bg-slate-300 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: SSLCommerz Official Verified Badge (Top-Left) */}
              <motion.div
                className="absolute top-10 -left-4 sm:-left-10 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 shadow-xl border border-slate-200/80 shadow-slate-900/10 flex items-center gap-2.5 z-20"
                variants={floatVariant1}
                animate="float"
              >
                <div className="relative w-24 h-7 flex items-center justify-center">
                  <Image
                    src="/logo/SSLCommerz.png"
                    alt="SSLCommerz"
                    width={96}
                    height={28}
                    className="object-contain"
                  />
                </div>
                <div className="h-6 w-px bg-slate-200" />
                <div className="flex items-center gap-1 text-emerald-700 text-[11px] font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Verified</span>
                </div>
              </motion.div>

              {/* Floating Badge 2: Instant Confirmation Toast (Bottom-Right) */}
              <motion.div
                className="absolute bottom-8 -right-4 sm:-right-8 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-slate-200/80 shadow-slate-900/10 flex items-center gap-3 z-20"
                variants={floatVariant2}
                animate="float"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900">
                      Payment Confirmed
                    </span>
                    <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 text-[9px] font-bold rounded">
                      Instant
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium">
                    100% Encrypted & Authenticated
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Trust Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-16"
        >
          {TRUST_FEATURES.map((feature, idx) => (
            <div
              key={`trust-${idx}`}
              className="bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-300 flex items-start space-x-3.5 hover:border-blue-200"
            >
              <div className="p-2.5 rounded-xl bg-slate-100 flex-shrink-0">
                {feature.icon}
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  {feature.title}
                </h4>
                <p className="text-[11px] text-slate-500 leading-snug">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Bottom Disclaimer */}
        <div className="text-center pt-8">
          <p className="text-xs font-medium text-slate-500">
            Trusted by thousands of customers across Bangladesh with secure and
            encrypted online payments.
          </p>
        </div>
      </div>
    </section>
  );
}
