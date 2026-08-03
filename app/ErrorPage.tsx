import React from "react";
import { Wrench, Shield, RefreshCw, Home, ArrowRight, AlertTriangle } from "lucide-react";

export default function ErrorPage(): React.JSX.Element {
    return (
        <div className="relative min-h-screen w-full flex items-center justify-center bg-slate-950 text-slate-100 overflow-hidden font-sans p-4 select-none">

            {/* 🌊 Background 3 Blur Circles Moving */}
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-orange-500/20 rounded-full blur-[120px] animate-blob" />
            <div className="absolute top-1/2 -right-20 w-96 h-96 bg-amber-600/15 rounded-full blur-[140px] animate-blob animation-delay-2000" />
            <div className="absolute -bottom-32 left-1/3 w-80 h-80 bg-orange-600/15 rounded-full blur-[130px] animate-blob animation-delay-4000" />

            {/* 🟠 Background Orange Radial Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.12)_0%,transparent_70%)] pointer-events-none" />

            {/* ✨ Glowing Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i: number) => (
                    <div
                        key={i}
                        className="absolute bg-orange-400/60 rounded-full blur-[1px] animate-float"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 4 + 2}px`,
                            height: `${Math.random() * 4 + 2}px`,
                            animationDuration: `${Math.random() * 5 + 3}s`,
                            animationDelay: `${Math.random() * 2}s`,
                        }}
                    />
                ))}
            </div>

            {/* 💳 Glassmorphism Card with Enter Animation */}
            <div className="relative z-10 w-full max-w-md p-8 sm:p-10 rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 shadow-2xl shadow-orange-950/20 animate-card-enter overflow-hidden">

                {/* 🌟 Top Shimmer Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent animate-shimmer" />

                <div className="flex flex-col items-center text-center">

                    {/* Central Icons Container */}
                    <div className="relative flex items-center justify-center w-28 h-28 mb-6">

                        {/* 🛡️ Shield Pulse (Trust Indicator) */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-24 h-24 rounded-full bg-orange-500/10 border border-orange-500/20 animate-ping opacity-75" />
                            <Shield className="absolute w-20 h-20 text-orange-500/40" />
                        </div>

                        {/* 🔧 Rotating Wrench */}
                        <div className="relative z-10 animate-spin-slow">
                            <Wrench className="w-12 h-12 text-orange-400 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                        </div>

                        {/* ⚡ Shaking Error Badge */}
                        <div className="absolute -top-1 -right-1 z-20 animate-shake">
                            <div className="p-1.5 rounded-full bg-slate-900 border border-orange-500/40 text-orange-400 shadow-lg">
                                <AlertTriangle className="w-4 h-4" />
                            </div>
                        </div>
                    </div>

                    {/* Error Typography */}
                    <h1 className="text-3xl font-bold tracking-tight mb-2 bg-gradient-to-r from-white via-slate-200 to-orange-200 bg-clip-text text-transparent">
                        System Maintenance
                    </h1>
                    <p className="text-sm text-slate-400 mb-8 leading-relaxed max-w-xs">
                        We are facing a temporary glitch. Our technical team is on it. Please try again shortly.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full">

                        {/* 🔄 Try Again Button */}
                        <button
                            onClick={() => window.location.reload()}
                            className="group relative flex items-center justify-center gap-2 w-full sm:w-1/2 px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-slate-950 font-semibold text-sm transition-all duration-300 shadow-lg shadow-orange-500/20 active:scale-95 cursor-pointer"
                        >
                            <RefreshCw className="w-4 h-4 transition-transform duration-500 group-hover:rotate-180" />
                            <span>Try Again</span>
                        </button>

                        {/* 🏠 Go Home Button */}
                        <a
                            href="/"
                            className="group relative flex items-center justify-center gap-2 w-full sm:w-1/2 px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 text-slate-200 font-semibold text-sm transition-all duration-300 hover:border-slate-600 active:scale-95 cursor-pointer"
                        >
                            <Home className="w-4 h-4 text-slate-400 group-hover:text-orange-400 transition-colors" />
                            <span>Go Home</span>
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </a>

                    </div>
                </div>
            </div>
        </div>
    );
}