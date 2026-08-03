

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Star,
  BadgeCheck,
  MapPin,
  Clock,
  DollarSign,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export interface Category {
  id?: string;
  name?: string;
}

export interface Service {
  id?: string;
  title?: string;
  price?: number;
  duration?: number;
  category?: Category;
}

export interface Review {
  id?: string;
  rating: number;
  comment?: string;
}

export interface User {
  id?: string;
  name?: string;
  email?: string;
}

export interface Technician {
  id?: string;
  _id?: string;
  userId?: string;
  profilePhoto?: string | null;
  bio?: string | null;
  experience_years?: number | null;
  total_reviews?: number | null;
  skills?: string[];
  location?: string | null;
  hourly_rate?: number | null;
  isVerified?: boolean;
  user?: User;
  services?: Service[];
  reviews?: Review[];
  name?: string;
  profileImage?: string | null;
  experience?: number | null;
  startingPrice?: number | null;
  totalReviews?: number | null;
  rating?: number | null;
  profession?: string | null;
}

export interface TechnicianCardProps {
  technician: Technician;
}

function formatImageUrl(imagePath?: string | null): string {
  const DEFAULT_IMAGE =
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop";

  if (!imagePath) return DEFAULT_IMAGE;

  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  let cleanedPath = imagePath.replace(/\\/g, "/");
  if (cleanedPath.includes("C:/") || cleanedPath.includes("C:\\")) {
    const fileName = cleanedPath.split(/[\\/]/).pop();
    cleanedPath = `/uploads/${fileName}`;
  } else if (cleanedPath.includes("/uploads/")) {
    cleanedPath = "/uploads/" + cleanedPath.split("/uploads/")[1];
  } else if (!cleanedPath.startsWith("/")) {
    cleanedPath = `/${cleanedPath}`;
  }

  const backendUrl = process.env.NEXT_PUBLIC_API_URL || "https://fixitnow-backend-one.vercel.app";
  return `${backendUrl}${cleanedPath}`;
}

export default function TechnicianCard({ technician }: TechnicianCardProps) {
  const techId = technician.id || (technician as any)._id || technician.userId || "";
  const name = technician.user?.name || technician.name || "Technician";
  const image = formatImageUrl(technician.profilePhoto || technician.profileImage);

  const profession =
    technician.skills?.[0] ||
    technician.services?.[0]?.title ||
    technician.profession ||
    "Expert Technician";

  let calculatedRating = "4.9";
  if (Array.isArray(technician.reviews) && technician.reviews.length > 0) {
    const sum = technician.reviews.reduce((acc: number, r: any) => acc + (r.rating || 0), 0);
    calculatedRating = (sum / technician.reviews.length).toFixed(1);
  } else if (typeof technician.rating === "object" && (technician.rating as any)?.rating) {
    calculatedRating = (technician.rating as any).rating;
  } else if (typeof technician.rating === "number") {
    calculatedRating = technician.rating.toString();
  }

  const totalReviews =
    technician.total_reviews ??
    technician.totalReviews ??
    technician.reviews?.length ??
    0;

  let experienceText = "N/A";
  if (technician.experience_years) {
    experienceText = `${technician.experience_years} Years`;
  } else if (technician.experience) {
    experienceText = `${technician.experience} Years`;
  } else if (technician.bio && technician.bio.match(/\d+/)) {
    const match = technician.bio.match(/(\d+)\s*years/i);
    if (match) experienceText = `${match[1]} Years`;
  }

  const servicePrice = technician.services?.[0]?.price;
  const priceDisplay = technician.hourly_rate
    ? `$${technician.hourly_rate}/hr`
    : servicePrice
      ? `৳${servicePrice}`
      : technician.startingPrice
        ? `৳${technician.startingPrice}`
        : "N/A";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="h-full w-full"
    >
      <div className="group flex flex-col items-center text-center rounded-2xl border border-border/80 bg-card p-5 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg h-full justify-between">

        <div className="w-full flex flex-col items-center">
          {/* Profile Image (সাইজ কিছুটা কমিয়ে ফিট করা হয়েছে) */}
          <div className="relative size-20 mb-3 overflow-hidden rounded-full border-2 border-primary/20 bg-muted">
            <Image
              src={image}
              alt={name}
              fill
              className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Name & Profession */}
          <div className="flex items-center justify-center gap-1">
            <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {name}
            </h3>
            {technician.isVerified && (
              <BadgeCheck className="size-3.5 text-primary shrink-0" strokeWidth={2.5} />
            )}
          </div>

          <p className="text-[11px] font-medium text-muted-foreground mt-0.5 line-clamp-1">
            {profession}
          </p>

          {/* Location */}
          {technician.location && (
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-1">
              <MapPin className="size-3 text-primary shrink-0" />
              <span className="truncate">{technician.location}</span>
            </div>
          )}

          {/* Rating Badge */}
          <div className="mt-2.5 flex items-center gap-1 rounded-full bg-muted/60 px-2.5 py-0.5 text-xs">
            <div className="flex text-amber-500">
              <Star className="size-3 fill-current" />
            </div>
            <span className="font-bold text-foreground text-[11px]">{calculatedRating}</span>
            <span className="text-muted-foreground text-[10px]">({totalReviews})</span>
          </div>

          {/* Experience & Price Meta Grid */}
          <div className="mt-3.5 grid grid-cols-2 gap-2 w-full border-t border-border/60 pt-3 text-left">
            <div className="flex items-center gap-1.5">
              <Clock className="size-3 text-muted-foreground shrink-0" />
              <div>
                <span className="text-[9px] text-muted-foreground block uppercase">Experience</span>
                <span className="text-[11px] font-semibold text-foreground">{experienceText}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <DollarSign className="size-3 text-muted-foreground shrink-0" />
              <div>
                <span className="text-[9px] text-muted-foreground block uppercase">Price</span>
                <span className="text-[11px] font-semibold text-foreground">{priceDisplay}</span>
              </div>
            </div>
          </div>
        </div>

        {/* View Profile Button */}
        <Button size="sm" variant="outline" asChild className="mt-4 w-full gap-1 text-xs h-8 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <Link href={`/technicians/${techId}`}>
            View Profile
            <ArrowRight className="size-3" />
          </Link>
        </Button>

      </div>
    </motion.div>
  );
}