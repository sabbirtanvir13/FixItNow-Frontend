"use client";

import React, { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { Star, Edit3, Trash2, Loader2, MessageSquare, Eye, CheckCircle2, Clock } from "lucide-react";
import { getMyReviews, deleteReview } from "../_action/reviewActions";

interface Review {
  id: string;
  booking_id: string;
  technician_id: string;
  rating: number;
  comment: string;
  created_at: string;
  service?: { title: string };
  technician?: { name: string };
}

export default function CustomerReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [isPending, startTransition] = useTransition();
  const [actionMessage, setActionMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  console.log("Customer Reviews Page Loading... 3");

  useEffect(() => {
    async function loadReviews() {
      const res = await getMyReviews();
      if (res.success) {
        setReviews(res.data);
      }
      setLoading(false);
    }
    loadReviews();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    startTransition(async () => {
      const res = await deleteReview(id);
      if (res.success) {
        setReviews(reviews.filter((r) => r.id !== id));
        setActionMessage({ type: "success", text: res.message });
      } else {
        setActionMessage({ type: "error", text: res.message || "Failed to delete review" });
      }
    });
  };

  // ফিল্টারিং লজিক (All, Pending, Submitted)
  const filteredReviews = reviews.filter((review) => {
    if (activeTab === "All") return true;
    if (activeTab === "Submitted") return review.comment && review.rating > 0;
    if (activeTab === "Pending") return !review.comment; // যদি পেন্ডেন্ট রিভিউ থাকে
    return true;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">⭐ My Reviews</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and view all your submitted feedback and ratings.</p>
        </div>
      </div>

      {/* Action Feedback Message */}
      {actionMessage && (
        <div className={`p-4 rounded-xl text-sm font-medium ${actionMessage.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
          {actionMessage.text}
        </div>
      )}

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-gray-200 pb-3">
        {["All", "Pending", "Submitted"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === tab 
                ? "bg-blue-600 text-white shadow-sm" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab} Reviews
          </button>
        ))}
      </div>

      {/* Review List Grid / Table */}
      {filteredReviews.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
          <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No reviews found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredReviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 space-y-4 hover:shadow-md transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header of Card */}
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-semibold uppercase text-gray-400">Service</span>
                    <h3 className="font-bold text-gray-900 text-base">{review.service?.title || "Home Repair Service"}</h3>
                  </div>
                  <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                    {new Date(review.created_at).toLocaleDateString()}
                  </span>
                </div>

                {/* Technician Info */}
                <div className="text-xs text-gray-600">
                  Technician: <strong className="text-gray-800">{review.technician?.name || `ID: ${review.technician_id.slice(0, 8)}...`}</strong>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center space-x-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} 
                    />
                  ))}
                  <span className="text-xs font-bold text-gray-700 ml-1.5">({review.rating}/5)</span>
                </div>

                {/* Comment */}
                <p className="text-sm text-gray-700 italic bg-gray-50 p-3 rounded-lg border border-gray-100">
                  &ldquo;{review.comment || "No comment provided."}&rdquo;
                </p>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <Link 
                  href={`/dashboard/customer/bookings/${review.booking_id}`}
                  className="text-xs text-blue-600 hover:underline flex items-center space-x-1 font-medium"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Booking</span>
                </Link>

                <div className="flex items-center space-x-2">
                  <Link 
                    href={`/dashboard/customer/reviews/${review.id}/edit`}
                    className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition"
                    title="Edit Review"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </Link>
                  <button 
                    onClick={() => handleDelete(review.id)}
                    disabled={isPending}
                    className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition"
                    title="Delete Review"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}