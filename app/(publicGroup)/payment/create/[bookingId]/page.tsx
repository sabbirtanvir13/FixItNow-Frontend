"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, CreditCard, Loader2 } from "lucide-react";
import { createPayment } from "@/app/(publicGroup)/_action/paymentPageAction";

export default function CreatePaymentPage() {
    const params = useParams();
    const bookingId = params.bookingId as string;
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handlePayment = async () => {
        setLoading(true);
        setError("");
        
        try {
            const res = await createPayment(bookingId);
            
            // ব্যাকএন্ড থেকে আসা পেমেন্ট গেটওয়ে ইউআরএলটি ক্যাচ করা (paymentUrl বা payment_url উভয়ই চেক করা হচ্ছে)
            const paymentGatewayUrl = res.data?.paymentUrl || res.data?.payment_url;

            if (res.success && paymentGatewayUrl) {
                window.location.href = paymentGatewayUrl;
            } else {
                setError(res.message || "Failed to create payment. Please try again.");
            }
        } catch (err) {
            setError("An error occurred while connecting to the server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/60 py-12 px-4 flex flex-col justify-center items-center">
            <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/80">
                
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                    <Link 
                        href="/service" 
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
                    >
                        <ArrowLeft className="size-4" />
                        Back to Services
                    </Link>
                    <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                        Secure Checkout
                    </span>
                </div>

                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
                        <CreditCard className="size-8" />
                    </div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Complete Payment</h1>
                    <p className="text-slate-500 text-sm mt-1">Click the button below to proceed with your payment securely.</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-medium border border-red-100 text-center">
                        {error}
                    </div>
                )}

                <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="w-full bg-slate-900 hover:bg-indigo-600 text-white py-4 px-6 rounded-2xl font-bold text-base transition-all duration-300 shadow-xl shadow-slate-900/10 hover:shadow-indigo-500/25 flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <Loader2 className="size-5 animate-spin" />
                            <span>Processing...</span>
                        </>
                    ) : (
                        <span>Pay Now</span>
                    )}
                </button>

                <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-400 font-medium">
                    <ShieldCheck className="size-4 text-emerald-500" />
                    <span>Encrypted & Secure Payment Gateway</span>
                </div>

            </div>
        </div>
    );
}