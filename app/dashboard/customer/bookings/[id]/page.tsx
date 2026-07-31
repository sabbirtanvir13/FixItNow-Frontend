import React from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, MapPin, User, ShieldCheck } from "lucide-react";
import { getSingleBooking } from "../../_action/bookingActions";

export default async function BookingDetailsPage({ params }: { params: { id: string } }) {
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

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6 font-sans">
      <div className="flex items-center space-x-3">
        <Link href="/dashboard/customer/bookings" className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition text-gray-700">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Booking Details</h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
        
        {/* Header Info */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-4 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Booking ID</span>
            <p className="text-sm font-mono text-gray-800">{booking.id}</p>
          </div>
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
              {booking.bookingStatus}
            </span>
          </div>
        </div>

        {/* Service Information */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">Service Information</h3>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
            <h4 className="text-base font-bold text-gray-900">{booking.service?.title}</h4>
            <p className="text-xs text-gray-600">Price: <strong className="text-blue-600">৳{booking.totalPrice || booking.service?.price}</strong></p>
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
              <h4 className="text-sm font-bold text-gray-900">{booking.technician?.name || "Not Assigned Yet"}</h4>
              <p className="text-xs text-gray-500">{booking.technician?.phone || "Phone number unavailable"}</p>
            </div>
          </div>
        </div>

        {/* Schedule & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">Date & Time</h3>
            <div className="flex items-center space-x-2 text-xs text-gray-700">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>{booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : "N/A"}</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-700">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>{booking.timeSlot}</span>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">Location & Payment</h3>
            <div className="flex items-center space-x-2 text-xs text-gray-700">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>{booking.location}</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-700">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              <span>Payment Status: <strong className={booking.paymentStatus === "PAID" ? "text-green-600" : "text-amber-600"}>{booking.paymentStatus}</strong></span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}  