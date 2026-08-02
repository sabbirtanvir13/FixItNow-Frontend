import React from "react";
import { getSingleBooking } from "../../../_action/bookingActions";
import CreateReviewForm from "./CreateReviewForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function CreateReviewPage({ params }: { params: Promise<{ bookingId: string }> }) {
  const { bookingId } = await params;
  
  const res = await getSingleBooking(bookingId);
  const booking = res.success ? res.data : null;

  if (!booking) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold text-red-600">Booking not found.</h2>
        <Link href="/dashboard/customer/bookings" className="text-blue-600 underline mt-4 inline-block">
          Back to Bookings
        </Link>
      </div>
    );
  }

  const technicianId = booking.technician?.id || booking.technicianId;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6 font-sans">
      <div className="flex items-center space-x-3">
        <Link href={`/dashboard/customer/bookings/${bookingId}`} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition text-gray-700">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Leave a Review</h1>
      </div>

      <CreateReviewForm 
        bookingId={bookingId} 
        technicianId={technicianId} 
        serviceTitle={booking.service?.title} 
        technicianName={booking.technician?.user?.name || booking.technician?.name} 
      />
    </div>
  );
}
