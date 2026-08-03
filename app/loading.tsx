"use client";

import { motion } from "framer-motion";
import { Wrench, ShieldCheck } from "lucide-react";

export default function FixItNowLoader() {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-slate-100">
            {/* Background Glow */}
            <div className="absolute h-72 w-72 rounded-full bg-orange-300/20 blur-3xl" />

            <div className="relative flex flex-col items-center">
                {/* Animated Circle */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "linear",
                    }}
                    className="absolute h-40 w-40 rounded-full border-[4px] border-orange-200 border-t-orange-500"
                />

                {/* Icon Card */}
                <motion.div
                    animate={{
                        y: [0, -10, 0],
                        scale: [1, 1.04, 1],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 2,
                    }}
                    className="relative flex h-32 w-32 items-center justify-center rounded-3xl bg-white shadow-2xl"
                >
                    <ShieldCheck className="absolute h-16 w-16 text-orange-100" />

                    <motion.div
                        animate={{ rotate: [-12, 12, -12] }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.2,
                        }}
                    >
                        <Wrench className="h-12 w-12 text-orange-500" />
                    </motion.div>
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-10 text-3xl font-extrabold tracking-tight text-slate-900"
                >
                    FixIt<span className="text-orange-500">Now</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{
                        repeat: Infinity,
                        duration: 2,
                    }}
                    className="mt-2 text-sm text-slate-500"
                >
                    Connecting you with trusted professionals
                </motion.p>

                {/* Animated Loading Dots */}
                <div className="mt-6 flex gap-2">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            animate={{
                                y: [0, -8, 0],
                                opacity: [0.3, 1, 0.3],
                            }}
                            transition={{
                                repeat: Infinity,
                                delay: i * 0.2,
                                duration: 0.8,
                            }}
                            className="h-3 w-3 rounded-full bg-orange-500"
                        />
                    ))}
                </div>

                {/* Skeleton */}
                <div className="mt-10 w-72 space-y-3">
                    {[1, 2, 3].map((item) => (
                        <motion.div
                            key={item}
                            animate={{
                                opacity: [0.4, 1, 0.4],
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 1.5,
                                delay: item * 0.2,
                            }}
                            className="h-4 rounded-full bg-slate-200"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}