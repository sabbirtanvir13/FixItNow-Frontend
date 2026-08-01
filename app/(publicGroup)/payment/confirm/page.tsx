import Link from "next/link";
import { confirmPayment } from "@/app/(publicGroup)/_action/paymentPageAction"; // আপনার প্রজেক্টের পাথ অনুযায়ী ঠিক করে নিন
import { CheckCircle2, XCircle, ArrowLeft } from "lucide-react";

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PaymentConfirmPage({ searchParams }: PageProps) {
    const resolvedParams = await searchParams;
    
    // গেটওয়ে থেকে আসা Transaction ID কুয়েরি থেকে বের করা
    const tranId = (resolvedParams.tran_id || resolvedParams.tranId || resolvedParams.val_id) as string;

    let result = { success: false, message: "Transaction ID is missing from the request!" };

    if (tranId) {
        result = await confirmPayment(tranId);
    }

    return (
        <div className="min-h-screen bg-slate-50/60 py-12 px-4 flex flex-col justify-center items-center selection:bg-indigo-500 selection:text-white">
            <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/80 text-center">
                
                {result.success ? (
                    <div>
                        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner ring-8 ring-emerald-50/50">
                            <CheckCircle2 className="size-10 stroke-[1.5]" />
                        </div>
                        
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
                            Payment Successful!
                        </h1>
                        <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                            {result.message || "Your payment has been successfully processed and verified."}
                        </p>
                        
                        <div className="space-y-3">
                            <Link
                                href="/payment"
                                className="w-full bg-slate-900 hover:bg-indigo-600 text-white py-3.5 px-6 rounded-2xl font-bold text-sm transition-all duration-300 shadow-lg shadow-slate-900/10 hover:shadow-indigo-500/25 block text-center"
                            >
                                View Payment History
                            </Link>
                            
                            <Link
                                href="/service"
                                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3.5 px-6 rounded-2xl font-semibold text-sm transition-all block text-center"
                            >
                                Explore More Services
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner ring-8 ring-red-50/50">
                            <XCircle className="size-10 stroke-[1.5]" />
                        </div>
                        
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
                            Payment Verification Failed
                        </h1>
                        <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                            {result.message || "We could not verify your payment transaction. Please check your payment history or try again."}
                        </p>
                        
                        <div className="space-y-3">
                            <Link
                                href="/payment"
                                className="w-full bg-slate-900 hover:bg-indigo-600 text-white py-3.5 px-6 rounded-2xl font-bold text-sm transition-all duration-300 shadow-lg shadow-slate-900/10 block text-center"
                            >
                                Go to Payment History
                            </Link>
                            
                            <Link
                                href="/service"
                                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors mt-2"
                            >
                                <ArrowLeft className="size-4" /> Back to Services
                            </Link>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}