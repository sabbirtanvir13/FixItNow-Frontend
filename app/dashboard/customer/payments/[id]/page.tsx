"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock,
  CreditCard,
  Download,
  MapPin,
  Receipt,
  User,
  Wrench,
  Loader2,
  AlertCircle,
  RotateCcw,
  CheckCircle2
} from "lucide-react";
import { getPaymentDetails } from "../../../../(publicGroup)/_action/paymentPageAction";
import { IPayment } from "../../../../../lib/types";

export default function CustomerPaymentDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [payment, setPayment] = useState<IPayment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchDetails() {
      try {
        const res = await getPaymentDetails(id as string);
        if (res?.success) {
          setPayment(res.data);
        } else {
          setError(res?.message || "Failed to load payment details");
        }
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, [id]);

  const handleDownloadReceipt = () => {
    // Skeleton implementation: in real app, might fetch a PDF endpoint
    alert("Receipt download functionality is currently under development. A real implementation would download a PDF invoice.");
  };

  const renderStatusBadge = (status: string) => {
    const badges: Record<string, { bg: string; text: string; label: string; icon: any }> = {
      PENDING: { bg: "bg-yellow-100", text: "text-yellow-700", label: "PENDING", icon: <AlertCircle className="w-4 h-4 mr-1.5" /> },
      COMPLETED: { bg: "bg-green-100", text: "text-green-700", label: "COMPLETED", icon: <CheckCircle2 className="w-4 h-4 mr-1.5" /> },
      FAILED: { bg: "bg-red-100", text: "text-red-700", label: "FAILED", icon: <AlertCircle className="w-4 h-4 mr-1.5" /> },
      CANCELLED: { bg: "bg-gray-100", text: "text-gray-700", label: "CANCELLED", icon: <AlertCircle className="w-4 h-4 mr-1.5" /> },
    };

    const current = badges[status] || { bg: "bg-gray-100", text: "text-gray-700", label: status, icon: <AlertCircle className="w-4 h-4 mr-1.5" /> };
    
    return (
      <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${current.bg} ${current.text}`}>
        {current.icon}
        {current.label}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !payment) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <button onClick={() => router.back()} className="flex items-center text-gray-500 hover:text-gray-700 mb-6 transition">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Payments
        </button>
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-xl flex items-center space-x-3">
          <AlertCircle className="w-6 h-6" />
          <p className="font-medium text-lg">{error || "Payment not found."}</p>
        </div>
      </div>
    );
  }

  const isFailedOrCancelled = payment.status === "FAILED" || payment.status === "CANCELLED";

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 font-sans">
      <button onClick={() => router.back()} className="flex items-center text-gray-500 hover:text-gray-700 transition">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Payments
      </button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Payment Details</h1>
          <p className="text-sm text-gray-500 flex items-center">
            <Receipt className="w-4 h-4 mr-1.5" />
            Transaction ID: {payment.transaction_id || "N/A"}
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          {renderStatusBadge(payment.status)}
          
          <button 
            onClick={handleDownloadReceipt}
            className="flex items-center justify-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition"
          >
            <Download className="w-4 h-4 mr-2" />
            Receipt
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Payment Summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
          <h2 className="text-lg font-bold text-gray-900 flex items-center border-b border-gray-100 pb-3">
            <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
            Payment Information
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Amount Paid</span>
              <span className="text-2xl font-bold text-gray-900">৳{payment.amount}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Provider</span>
              <span className="font-medium text-gray-900 uppercase">{payment.provider}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Created At</span>
              <span className="font-medium text-gray-900">{new Date(payment.created_at).toLocaleString()}</span>
            </div>
            {payment.paid_at && (
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Paid At</span>
                <span className="font-medium text-gray-900">{new Date(payment.paid_at).toLocaleString()}</span>
              </div>
            )}
          </div>

          {isFailedOrCancelled && (
            <div className="pt-4 border-t border-gray-100">
              <Link 
                href={`/payment/create/${payment.booking_id}`}
                className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition shadow-sm"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Retry Payment
              </Link>
            </div>
          )}
        </div>

        {/* Booking Summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <h2 className="text-lg font-bold text-gray-900 flex items-center">
              <Wrench className="w-5 h-5 mr-2 text-blue-600" />
              Service Details
            </h2>
            <Link 
              href={`/dashboard/customer/bookings/${payment.booking_id}`}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition bg-blue-50 px-3 py-1 rounded-lg"
            >
              View Booking
            </Link>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Service Name</p>
              <p className="font-medium text-gray-900">{payment.booking?.service?.title || "N/A"}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1 flex items-center"><Calendar className="w-3 h-3 mr-1" /> Date</p>
                <p className="font-medium text-sm text-gray-900">
                  {payment.booking?.booking_date ? new Date(payment.booking.booking_date).toLocaleDateString() : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1 flex items-center"><Clock className="w-3 h-3 mr-1" /> Time</p>
                <p className="font-medium text-sm text-gray-900">{payment.booking?.time_slot || "N/A"}</p>
              </div>
            </div>
            
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1 flex items-center"><MapPin className="w-3 h-3 mr-1" /> Location</p>
              <p className="font-medium text-sm text-gray-900 line-clamp-2">{payment.booking?.location || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Customer & Technician Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-bold text-gray-900 flex items-center border-b border-gray-100 pb-3">
            <User className="w-5 h-5 mr-2 text-blue-600" />
            Customer Info
          </h2>
          <div className="space-y-2 text-sm">
            <p className="flex justify-between"><span className="text-gray-500">Name</span> <span className="font-medium text-gray-900">{payment.booking?.customer?.name || "N/A"}</span></p>
            <p className="flex justify-between"><span className="text-gray-500">Email</span> <span className="font-medium text-gray-900">{payment.booking?.customer?.email || "N/A"}</span></p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-4">
          <h2 className="text-lg font-bold text-gray-900 flex items-center border-b border-gray-100 pb-3">
            <Wrench className="w-5 h-5 mr-2 text-blue-600" />
            Technician Info
          </h2>
          <div className="space-y-2 text-sm">
            <p className="flex justify-between"><span className="text-gray-500">Name</span> <span className="font-medium text-gray-900">{payment.booking?.technician?.user?.name || "Pending Assignment"}</span></p>
            {payment.booking?.technician?.user?.email && (
               <p className="flex justify-between"><span className="text-gray-500">Email</span> <span className="font-medium text-gray-900">{payment.booking.technician.user.email}</span></p>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
