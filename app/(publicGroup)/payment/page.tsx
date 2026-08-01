"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, ShieldCheck, CreditCard, ArrowLeft, Eye } from "lucide-react";
import { getPaymentHistory } from "@/app/(publicGroup)/_action/paymentPageAction";

interface Payment {
    id: string;
    _id?: string;
    transaction_id?: string;
    booking_id?: string;
    amount: number;
    currency?: string;
    status: string;
    provider?: string;
    payment_method?: string;
    createdAt?: string;
    date?: string;
}

export default function PaymentHistoryPage() {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadHistory() {
            try {
                const res = await getPaymentHistory();
                if (res.success) {
                    setPayments(res.data || []);
                } else {
                    setError(res.message || "Failed to load payment history.");
                }
            } catch (err) {
                setError("An error occurred while connecting to the server.");
            } finally {
                setLoading(false);
            }
        }
        loadHistory();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50/60 py-12 px-4 flex flex-col justify-center items-center">
                <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/80 text-center">
                    <Loader2 className="size-8 animate-spin text-indigo-600 mx-auto" />
                    <p className="text-slate-500 text-sm mt-4">Loading payment history...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50/60 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Payment History</h1>
                    <Link
                        href="/service"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
                    >
                        <ArrowLeft className="size-4" /> Back to Services
                    </Link>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-medium border border-red-100 text-center">
                        {error}
                    </div>
                )}

                {!error && payments.length === 0 ? (
                    <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm text-center">
                        <CreditCard className="size-12 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-500 text-sm">No payment records found.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {payments.map((payment) => {
                            const paymentId = payment.id || payment._id || "";
                            return (
                                <div key={paymentId} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold text-slate-900">
                                                ৳{payment.amount} {payment.currency || "BDT"}
                                            </span>
                                            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${payment.status === "SUCCESS" || payment.status === "COMPLETED" || payment.status === "completed"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                                }`}>
                                                {payment.status}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-500">
                                            TXN: {payment.transaction_id || paymentId}
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            {payment.createdAt || payment.date
                                                ? new Date(payment.createdAt || payment.date || "").toLocaleString()
                                                : "N/A"}
                                        </p>
                                    </div>
                                    <Link
                                        href={`/payment/${paymentId}`}
                                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg flex items-center gap-1.5 transition"
                                    >
                                        <Eye className="size-3.5" />
                                        <span>View</span>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                )}

                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-400 font-medium">
                    <ShieldCheck className="size-4 text-emerald-500" />
                    <span>Secured by SSLCommerz</span>
                </div>
            </div>
        </div>
    );
}