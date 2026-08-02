import React from "react";

import EditReviewForm from "./EditReviewForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getSingleReview } from "../../../_action/reviewActions";

export default async function EditReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const res = await getSingleReview(id);
  const review = res.success ? res.data : null;

  if (!review) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold text-red-600">Review not found.</h2>
        <Link href="/dashboard/customer/reviews" className="text-blue-600 underline mt-4 inline-block">
          Back to Reviews
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6 font-sans">
      <div className="flex items-center space-x-3">
        <Link href={`/dashboard/customer/reviews`} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition text-gray-700">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Edit Review</h1>
      </div>

      <EditReviewForm
        reviewId={id}
        initialRating={review.rating}
        initialComment={review.comment}
        serviceTitle={review.service?.title}
        technicianName={review.technician?.user?.name || review.technician?.name}
      />
    </div>
  );
}
