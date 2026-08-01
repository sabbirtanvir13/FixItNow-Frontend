"use client";

import React, { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Eye,
  XCircle,
  CreditCard,
  Star,
  Loader2
} from "lucide-react";
import { getCustomerBookings, cancelBookingAction, submitReviewAction } from "../_action/bookingActions";

interface Booking {
  id: string;
  service: { title: string; price: number };
  technician: { name: string; phone?: string };
  bookingDate: string;
  timeSlot: string;
  location: string;
  totalPrice: number;
  paymentStatus: string;
  bookingStatus: string;
}

export default function CustomerBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [isPending, startTransition] = useTransition();
  const [actionMessage, setActionMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Next.js Navigation Hooks
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Review Modal States
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    async function loadData() {
      const res = await getCustomerBookings();
      if (res.success) {
        setBookings(res.data);
      }
      setLoading(false);
    }
    loadData();

    // Show success message if redirected from booking creation
    if (searchParams.get("booked") === "true") {
      setActionMessage({
        type: "success",
        text: "Booking request submitted successfully! Please wait for the technician to accept before making payment."
      });
      // Clean up the URL without reloading the page
      router.replace(pathname);
    }
  }, [searchParams, pathname, router]);

  // Filter bookings based on tabs
  const filteredBookings = bookings.filter((item) => {
    if (activeTab === "All") return true;
    if (activeTab === "Upcoming") return ["REQUESTED", "ACCEPTED", "PAID", "IN_PROGRESS"].includes(item.bookingStatus);
    if (activeTab === "Completed") return item.bookingStatus === "COMPLETED";
    if (activeTab === "Cancelled") return ["CANCELLED", "DECLINED"].includes(item.bookingStatus);
    return true;
  });

  // Status Badge Component
  const renderStatusBadge = (status: string) => {
    const badges: Record<string, { bg: string; text: string; label: string }> = {
      REQUESTED: { bg: "bg-yellow-100", text: "text-yellow-700", label: "🟡 REQUESTED" },
      ACCEPTED: { bg: "bg-blue-100", text: "text-blue-700", label: "🔵 ACCEPTED" },
      PAID: { bg: "bg-purple-100", text: "text-purple-700", label: "🟣 PAID" },
      IN_PROGRESS: { bg: "bg-green-100", text: "text-green-700", label: "🟢 IN_PROGRESS" },
      COMPLETED: { bg: "bg-gray-100", text: "text-gray-700", label: "⚪ COMPLETED" },
      DECLINED: { bg: "bg-red-100", text: "text-red-700", label: "🔴 DECLINED" },
      CANCELLED: { bg: "bg-red-100", text: "text-red-700", label: "🔴 CANCELLED" },
    };

    const current = badges[status] || { bg: "bg-gray-100", text: "text-gray-700", label: status };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${current.bg} ${current.text}`}>
        {current.label}
      </span>
    );
  };

  // Handle Cancel
  const handleCancel = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    startTransition(async () => {
      const res = await cancelBookingAction(id);
      if (res.success) {
        setBookings(bookings.map(b => b.id === id ? { ...b, bookingStatus: "CANCELLED" } : b));
        setActionMessage({ type: "success", text: res.message });
      } else {
        setActionMessage({ type: "error", text: res.message || "Failed to cancel" });
      }
    });
  };

  // Handle Review Submit
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBookingId) return;

    startTransition(async () => {
      const res = await submitReviewAction({ bookingId: selectedBookingId, rating, comment });
      if (res.success) {
        setActionMessage({ type: "success", text: res.message });
        setReviewModalOpen(false);
        setComment("");
      } else {
        setActionMessage({ type: "error", text: res.message || "Failed to submit review" });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-sans">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">My Bookings</h1>
      </div>

      {/* Notification Banner */}
      {actionMessage && (
        <div className={`p-4 rounded-xl text-sm font-medium ${actionMessage.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
          {actionMessage.text}
        </div>
      )}

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-gray-200 pb-3">
        {["All", "Upcoming", "Completed", "Cancelled"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === tab
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab} Bookings
          </button>
        ))}
      </div>

      {/* Booking List Table / Cards */}
      {filteredBookings.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No bookings found in this category.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition">
              
              {/* Service & Info */}
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <h3 className="font-bold text-lg text-gray-900">{item.service?.title || "Service Name"}</h3>
                  {renderStatusBadge(item.bookingStatus)}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-1 text-xs text-gray-600">
                  <div className="flex items-center space-x-1.5">
                    <User className="w-3.5 h-3.5 text-gray-400" />
                    <span>Technician: <strong className="text-gray-800">{item.technician?.name || "Pending Assignment"}</strong></span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>Date: {item.bookingDate ? new Date(item.bookingDate).toLocaleDateString() : "N/A"}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>Slot: {item.timeSlot}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span>Location: {item.location}</span>
                  </div>
                  <div>
                    <span>Price: <strong className="text-blue-600">৳{item.totalPrice || item.service?.price}</strong></span>
                  </div>
                  <div>
                    <span>Payment: <span className={`font-semibold ${item.paymentStatus === "PAID" ? "text-green-600" : "text-amber-600"}`}>{item.paymentStatus}</span></span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end pt-3 md:pt-0 border-t md:border-t-0 border-gray-100">
                <Link
                  href={`/dashboard/customer/bookings/${item.id}`}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium rounded-lg flex items-center space-x-1 transition"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Details</span>
                </Link>

                {item.bookingStatus === "ACCEPTED" && (
                  <Link
                    href={`/payment/create/${item.id}`}
                    className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium rounded-lg flex items-center space-x-1 transition shadow-sm"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Pay Now</span>
                  </Link>
                )}

                {["REQUESTED", "ACCEPTED"].includes(item.bookingStatus) && (
                  <button
                    onClick={() => handleCancel(item.id)}
                    disabled={isPending}
                    className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-medium rounded-lg flex items-center space-x-1 transition"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Cancel</span>
                  </button>
                )}

                {item.bookingStatus === "COMPLETED" && (
                  <button
                    onClick={() => { setSelectedBookingId(item.id); setReviewModalOpen(true); }}
                    className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-medium rounded-lg flex items-center space-x-1 transition"
                  >
                    <Star className="w-3.5 h-3.5" />
                    <span>Leave Review</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Review Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 space-y-4 relative">
            <h3 className="text-lg font-bold text-gray-900">Leave a Review</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Rating (1-5)</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>{r} Stars</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Comment</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                  placeholder="Write your feedback..."
                  required
                />
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setReviewModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium shadow-sm"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}     