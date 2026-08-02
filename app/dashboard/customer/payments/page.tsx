"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  CreditCard, 
  Calendar, 
  Eye, 
  RotateCcw,
  Receipt,
  Loader2,
  AlertCircle
} from "lucide-react";
import { getPaymentHistory } from "../../../(publicGroup)/_action/paymentPageAction";
import { IPayment } from "../../../../lib/types";

export default function CustomerPaymentHistoryPage() {
  const [payments, setPayments] = useState<IPayment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await getPaymentHistory();
        if (res?.success) {
          setPayments(res.data || []);
        } else {
          setError(res?.message || "Failed to load payment history");
        }
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const renderStatusBadge = (status: string) => {
    const badges: Record<string, { bg: string; text: string; label: string }> = {
      PENDING: { bg: "bg-yellow-100", text: "text-yellow-700", label: "🟡 PENDING" },
      COMPLETED: { bg: "bg-green-100", text: "text-green-700", label: "🟢 COMPLETED" },
      FAILED: { bg: "bg-red-100", text: "text-red-700", label: "🔴 FAILED" },
      CANCELLED: { bg: "bg-gray-100", text: "text-gray-700", label: "⚪ CANCELLED" },
    };

    const current = badges[status] || { bg: "bg-gray-100", text: "text-gray-700", label: status };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${current.bg} ${current.text}`}>
        {current.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center space-x-3">
          <AlertCircle className="w-5 h-5" />
          <p className="font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-sans">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Payment History</h1>
      </div>

      {payments.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
          <Receipt className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No payments found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {payments.map((payment) => (
            <div key={payment.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col">
              <div className="p-5 flex-grow space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900 line-clamp-1" title={payment.booking?.service?.title || "Unknown Service"}>
                      {payment.booking?.service?.title || "Service Payment"}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">TXN: {payment.transaction_id || "N/A"}</p>
                  </div>
                  {renderStatusBadge(payment.status)}
                </div>

                <div className="space-y-2 text-sm text-gray-600 pt-2 border-t border-gray-100">
                  <div className="flex justify-between">
                    <span className="flex items-center space-x-1.5"><Calendar className="w-4 h-4 text-gray-400" /> <span>Date</span></span>
                    <span className="font-medium">{new Date(payment.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center space-x-1.5"><CreditCard className="w-4 h-4 text-gray-400" /> <span>Amount</span></span>
                    <span className="font-semibold text-blue-600">৳{payment.amount}</span>
                  </div>
                  {payment.booking?.technician?.user && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Technician</span>
                      <span className="font-medium line-clamp-1">{payment.booking.technician.user.name}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 border-t border-gray-100 flex items-center justify-between gap-2 mt-auto">
                <Link
                  href={`/dashboard/customer/payments/${payment.id}`}
                  className="px-4 py-2 bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg flex items-center space-x-1.5 transition shadow-sm w-full justify-center"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </Link>

                {(payment.status === "FAILED" || payment.status === "CANCELLED") && (
                  <Link
                    href={`/payment/create/${payment.booking_id}`}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg flex items-center space-x-1.5 transition shadow-sm w-full justify-center"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Retry Pay</span>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
