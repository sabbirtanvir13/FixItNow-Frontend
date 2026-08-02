"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { createReview } from "../../../_action/reviewActions";

interface CreateReviewFormProps {
  bookingId: string;
  technicianId: string;
  serviceTitle?: string;
  technicianName?: string;
}

export default function CreateReviewForm({ bookingId, technicianId, serviceTitle, technicianName }: CreateReviewFormProps) {
  const router = useRouter();
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const maxCommentLength = 500;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (rating < 1 || rating > 5) {
      setError("Please select a rating between 1 and 5 stars.");
      return;
    }
    
    if (comment.trim().length < 10) {
      setError("Comment must be at least 10 characters long.");
      return;
    }

    setLoading(true);

    try {
      const res = await createReview({
        booking_id: bookingId,
        technician_id: technicianId,
        rating,
        comment: comment.trim()
      });

      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/dashboard/customer/reviews");
        }, 1500);
      } else {
        setError(res.message || "Failed to submit review. Please try again.");
      }
    } catch (err: any) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center space-y-4">
        <div className="flex justify-center">
          <CheckCircle2 className="w-16 h-16 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Review Submitted!</h2>
        <p className="text-gray-600 font-medium">Thank you for your feedback. Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">Service</h3>
        <p className="font-semibold text-gray-900">{serviceTitle || "Home Repair Service"}</p>
        <div className="mt-2 text-sm text-gray-600">
          Technician: <strong className="text-gray-800">{technicianName || "Unknown"}</strong>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-900">Rate your experience</label>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= (hoverRating || rating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
            <span className="ml-3 text-sm font-medium text-gray-500">
              {rating > 0 ? `${rating} / 5` : "Select a rating"}
            </span>
          </div>
        </div>

        {/* Comment */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-semibold text-gray-900">Write a comment</label>
            <span className={`text-xs ${comment.length < 10 ? 'text-amber-500' : 'text-gray-500'}`}>
              {comment.length} / {maxCommentLength}
            </span>
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value.slice(0, maxCommentLength))}
            rows={5}
            placeholder="Tell us what you liked or what could be improved (minimum 10 characters)..."
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50 hover:bg-white focus:bg-white resize-none text-sm"
          ></textarea>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center space-x-2 p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm font-medium">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => router.back()}
            disabled={loading}
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || rating === 0 || comment.length < 10}
            className="flex-1 flex justify-center items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <span>Submit Review</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
