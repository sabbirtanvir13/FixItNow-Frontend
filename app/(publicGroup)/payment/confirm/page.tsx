// import Link from "next/link";
// import { confirmPayment } from "@/app/(publicGroup)/_action/paymentPageAction"; // আপনার প্রজেক্টের পাথ অনুযায়ী ঠিক করে নিন
// import { CheckCircle2, XCircle, ArrowLeft } from "lucide-react";

// interface PageProps {
//     searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
// }

// export default async function PaymentConfirmPage({ searchParams }: PageProps) {
//     const resolvedParams = await searchParams;
    

//     const tranId = (resolvedParams.tran_id || resolvedParams.tranId || resolvedParams.val_id) as string;

//     let result = { success: false, message: "Transaction ID is missing from the request!" };

//     if (tranId) {
//         result = await confirmPayment(tranId);
//     }

//     return (
//         <div className="min-h-screen bg-slate-50/60 py-12 px-4 flex flex-col justify-center items-center selection:bg-indigo-500 selection:text-white">
//             <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200/80 text-center">
                
//                 {result.success ? (
//                     <div>
//                         <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner ring-8 ring-emerald-50/50">
//                             <CheckCircle2 className="size-10 stroke-[1.5]" />
//                         </div>
                        
//                         <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
//                             Payment Successful!
//                         </h1>
//                         <p className="text-slate-500 text-sm mb-8 leading-relaxed">
//                             {result.message || "Your payment has been successfully processed and verified."}
//                         </p>
                        
//                         <div className="space-y-3">
//                             <Link
//                                 href="/payment"
//                                 className="w-full bg-slate-900 hover:bg-indigo-600 text-white py-3.5 px-6 rounded-2xl font-bold text-sm transition-all duration-300 shadow-lg shadow-slate-900/10 hover:shadow-indigo-500/25 block text-center"
//                             >
//                                 View Payment History
//                             </Link>
                            
//                             <Link
//                                 href="/service"
//                                 className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3.5 px-6 rounded-2xl font-semibold text-sm transition-all block text-center"
//                             >
//                                 Explore More Services
//                             </Link>
//                         </div>
//                     </div>
//                 ) : (
//                     <div>
//                         <div className="w-20 h-20 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner ring-8 ring-red-50/50">
//                             <XCircle className="size-10 stroke-[1.5]" />
//                         </div>
                        
//                         <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
//                             Payment Verification Failed
//                         </h1>
//                         <p className="text-slate-500 text-sm mb-8 leading-relaxed">
//                             {result.message || "We could not verify your payment transaction. Please check your payment history or try again."}
//                         </p>
                        
//                         <div className="space-y-3">
//                             <Link
//                                 href="/payment"
//                                 className="w-full bg-slate-900 hover:bg-indigo-600 text-white py-3.5 px-6 rounded-2xl font-bold text-sm transition-all duration-300 shadow-lg shadow-slate-900/10 block text-center"
//                             >
//                                 Go to Payment History
//                             </Link>
                            
//                             <Link
//                                 href="/service"
//                                 className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors mt-2"
//                             >
//                                 <ArrowLeft className="size-4" /> Back to Services
//                             </Link>
//                         </div>
//                     </div>
//                 )}

//             </div>
//         </div>
//     );
// }


import Link from "next/link";
import { confirmPayment } from "@/app/(publicGroup)/_action/paymentPageAction";
import { 
    CheckCircle2, 
    XCircle, 
    ArrowLeft, 
    Receipt, 
    BadgeCheck, 
    CalendarDays, 
    ShieldCheck,
    Banknote
} from "lucide-react";

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PaymentConfirmPage({ searchParams }: PageProps) {
    const resolvedParams = await searchParams;
    
    const tranId = (resolvedParams.tran_id || resolvedParams.tranId || resolvedParams.val_id) as string;

    // result-এ data object যোগ করা হলো যাতে API রেসপন্সের সাথে ম্যাচ করে
    let result: any = { 
        success: false, 
        message: "Transaction ID is missing from the request!",
        data: null 
    };

    if (tranId) {
        result = await confirmPayment(tranId);
    }

    // API থেকে আসা ডেটাগুলো ভেরিয়েবলে স্টোর করা হচ্ছে
    const displayTranId = result?.data?.transaction_id || tranId || "N/A";
    const amount = result?.data?.amount;
    const paymentStatus = result?.data?.status || "COMPLETED";
    const provider = result?.data?.provider || "Verified";
    const dateTime = result?.data?.created_at 
        ? new Date(result.data.created_at).toLocaleString() 
        : new Date().toLocaleString();

    return (
        <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 flex flex-col justify-center items-center selection:bg-emerald-500 selection:text-white">
            <div className="max-w-[420px] w-full bg-white p-8 rounded-[28px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
                
                {result?.success ? (
                    <div>
                        {/* Success Icon */}
                        <div className="relative mx-auto w-24 h-24 flex items-center justify-center mb-6 animate-in zoom-in duration-500 delay-150">
                            {/* Layered glowing background */}
                            <div className="absolute inset-0 bg-emerald-100 rounded-full animate-pulse opacity-60"></div>
                            <div className="absolute inset-2 bg-emerald-200/50 rounded-full"></div>
                            <div className="relative z-10 w-16 h-16 bg-gradient-to-tr from-emerald-500 to-emerald-400 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                                <CheckCircle2 className="size-8 text-white stroke-[2.5]" />
                            </div>
                        </div>
                        
                        {/* Header text */}
                        <div className="text-center mb-8">
                            <h1 className="text-[22px] font-bold text-slate-900 tracking-tight mb-2">
                                Payment Successful!
                            </h1>
                            <p className="text-slate-500 text-sm leading-relaxed px-2">
                                {result?.message || "Your payment has been successfully processed and verified."}
                            </p>
                        </div>
                        
                        {/* Information Card - API Data Integrated */}
                        <div className="bg-slate-50 rounded-2xl p-4 space-y-4 mb-8 border border-slate-100/80">
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2.5 text-slate-500">
                                    <Receipt className="size-4" /> 
                                    <span>Transaction ID</span>
                                </div>
                                <span className="font-semibold text-slate-700">{displayTranId}</span>
                            </div>

                            {amount && (
                                <>
                                    <div className="h-[1px] bg-slate-200/50 w-full" />
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2.5 text-slate-500">
                                            <Banknote className="size-4" /> 
                                            <span>Amount</span>
                                        </div>
                                        <span className="font-bold text-slate-900">৳ {amount}</span>
                                    </div>
                                </>
                            )}
                            
                            <div className="h-[1px] bg-slate-200/50 w-full" />
                            
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2.5 text-slate-500">
                                    <BadgeCheck className="size-4" /> 
                                    <span>Payment Status</span>
                                </div>
                                <span className="bg-emerald-100 text-emerald-700 font-bold px-2.5 py-1 rounded-full text-[11px] tracking-wide uppercase">
                                    {paymentStatus}
                                </span>
                            </div>
                            
                            <div className="h-[1px] bg-slate-200/50 w-full" />
                            
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2.5 text-slate-500">
                                    <ShieldCheck className="size-4" /> 
                                    <span>Provider</span>
                                </div>
                                <span className="font-semibold text-slate-700">{provider}</span>
                            </div>
                            
                            <div className="h-[1px] bg-slate-200/50 w-full" />
                            
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2.5 text-slate-500">
                                    <CalendarDays className="size-4" /> 
                                    <span>Date & Time</span>
                                </div>
                                <span className="font-medium text-slate-700 text-xs text-right max-w-[130px] leading-tight">
                                    {dateTime}
                                </span>
                            </div>
                        </div>
                        
                        {/* Buttons */}
                        <div className="space-y-3.5">
                            <Link
                                href="/payment"
                                className="flex items-center justify-center w-full h-[52px] bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl font-semibold text-[15px] transition-all duration-300 hover:-translate-y-1 shadow-[0_8px_20px_rgba(16,185,129,0.25)]"
                            >
                                View Payment History
                            </Link>
                            
                            <Link
                                href="/service"
                                className="flex items-center justify-center w-full h-[52px] bg-white border-2 border-slate-100 hover:border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl font-semibold text-[15px] transition-all duration-300 hover:-translate-y-0.5"
                            >
                                Explore More Services
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div>
                        {/* Failure Icon */}
                        <div className="relative mx-auto w-24 h-24 flex items-center justify-center mb-6 animate-in zoom-in duration-500 delay-150">
                            <div className="absolute inset-0 bg-red-100 rounded-full animate-pulse opacity-60"></div>
                            <div className="absolute inset-2 bg-red-200/50 rounded-full"></div>
                            <div className="relative z-10 w-16 h-16 bg-gradient-to-tr from-red-500 to-red-400 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                                <XCircle className="size-8 text-white stroke-[2.5]" />
                            </div>
                        </div>
                        
                        {/* Header text */}
                        <div className="text-center mb-10">
                            <h1 className="text-[22px] font-bold text-slate-900 tracking-tight mb-2">
                                Payment Verification Failed
                            </h1>
                            <p className="text-slate-500 text-sm leading-relaxed px-2">
                                {result?.message || "We could not verify your payment transaction. Please check your payment history or try again."}
                            </p>
                        </div>
                        
                        {/* Buttons */}
                        <div className="space-y-5">
                            <Link
                                href="/payment"
                                className="flex items-center justify-center w-full h-[52px] bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold text-[15px] transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-slate-900/20"
                            >
                                Go to Payment History
                            </Link>
                            
                            <Link
                                href="/service"
                                className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors"
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