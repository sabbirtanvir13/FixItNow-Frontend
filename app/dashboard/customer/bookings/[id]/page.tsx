import React from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, MapPin, User, ShieldCheck, CreditCard } from "lucide-react";
import { getSingleBooking } from "../../_action/bookingActions";

// ডাইনামিক স্ট্যাটাস ব্যাজ তৈরি করার ফাংশন
const getStatusBadge = (status: string) => {
  const badges: Record<string, string> = {
    REQUESTED: "bg-yellow-100 text-yellow-700",
    ACCEPTED: "bg-blue-100 text-blue-700",
    PAID: "bg-purple-100 text-purple-700",
    IN_PROGRESS: "bg-green-100 text-green-700",
    COMPLETED: "bg-gray-100 text-gray-700",
    DECLINED: "bg-red-100 text-red-700",
    CANCELLED: "bg-red-100 text-red-700",
  };

  const style = badges[status] || "bg-gray-100 text-gray-700";
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${style}`}>
      {status}
    </span>
  );
};

export default async function BookingDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  // Await the params object (Required in Next.js 15+)
  const { id } = await params;
  const res = await getSingleBooking(id);
  const booking = res.success ? res.data : null;

  if (!booking) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold text-red-600">Booking not found or failed to load.</h2>
        <Link href="/dashboard/customer/bookings" className="text-blue-600 underline mt-4 inline-block">
          Back to Bookings
        </Link>
      </div>
    );
  }

  // ব্যাকএন্ড রেসপন্স স্ট্রাকচার অনুযায়ী সঠিক প্রপার্টি ম্যাপিং
  const displayStatus = booking.status || booking.bookingStatus;
  const displayPrice = booking.price || booking.service?.price;
  const technicianName = booking.technician?.user?.name || booking.technician?.name || "Not Assigned Yet";
  const technicianPhone = booking.technician?.phone || "Phone number unavailable";
  const timeSlotText = booking.start_time && booking.end_time 
    ? `${booking.start_time} - ${booking.end_time}` 
    : (booking.timeSlot || "N/A");

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 font-sans">
      <div className="flex items-center space-x-3">
        <Link href="/dashboard/customer/bookings" className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition text-gray-700">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Booking Details</h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
        
        {/* Header Info with Dynamic Status Badge */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-4 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Booking ID</span>
            <p className="text-sm font-mono text-gray-800">{booking.id}</p>
          </div>
          <div>
            {getStatusBadge(displayStatus)}
          </div>
        </div>

        {/* Service Information */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">Service Information</h3>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
            <h4 className="text-base font-bold text-gray-900">{booking.service?.title}</h4>
            <p className="text-xs text-gray-600">Price: <strong className="text-blue-600">৳{displayPrice}</strong></p>
          </div>
        </div>

        {/* Technician Information */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">Technician Information</h3>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">{technicianName}</h4>
              <p className="text-xs text-gray-500">{technicianPhone}</p>
            </div>
          </div>
        </div>

        {/* Schedule & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">Date & Time</h3>
            <div className="flex items-center space-x-2 text-xs text-gray-700">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>{booking.booking_date ? new Date(booking.booking_date).toLocaleDateString() : (booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : "N/A")}</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-700">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>{timeSlotText}</span>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">Location & Payment</h3>
            <div className="flex items-center space-x-2 text-xs text-gray-700">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>{booking.location || booking.service?.location || "N/A"}</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-700">
              <ShieldCheck className={`w-4 h-4 ${displayStatus === "PAID" ? "text-green-600" : "text-amber-600"}`} />
              <span>Payment Status: <strong className={displayStatus === "PAID" ? "text-green-600" : "text-amber-600"}>{displayStatus}</strong></span>
            </div>
          </div>
        </div>

        {/* Action Button: Pay Now (Visible when status allows payment or ACCEPTED) */}
        {(displayStatus === "ACCEPTED" || displayStatus === "REQUESTED") && displayStatus !== "PAID" && (
          <div className="pt-6 border-t border-gray-100 flex justify-end">
            <Link
              href={`/payment/create/${booking.id}`}
              className="flex items-center space-x-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition"
            >
              <CreditCard className="w-5 h-5" />
              <span>Proceed to Payment</span>
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}