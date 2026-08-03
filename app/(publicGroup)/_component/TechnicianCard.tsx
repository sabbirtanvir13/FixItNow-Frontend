"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Star,
  BadgeCheck,
  MapPin,
  Check,
  Briefcase
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
    "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=800";

  if (!imagePath) return DEFAULT_IMAGE;

  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  let cleanedPath = imagePath.replace(/\\/g, "/");

  if (cleanedPath.includes("/uploads/")) {
    cleanedPath = "/uploads/" + cleanedPath.split("/uploads/")[1];
  } else if (!cleanedPath.startsWith("/")) {
    cleanedPath = `/${cleanedPath}`;
  }

  const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  return `${backendUrl}${cleanedPath}`;
}

export default function TechnicianCard({ technician }: TechnicianCardProps) {
  const techId = technician.id || (technician as any)._id || technician.userId || "";
  const name = technician.user?.name || technician.name || "Technician";
  const image = formatImageUrl(technician.profilePhoto || technician.profileImage);

  const price =
    technician.hourly_rate ??
    technician.services?.[0]?.price ??
    technician.startingPrice;
  const location = technician.location;
  const bio = technician.bio;
  const skills = technician.skills || [];

  const categoryName =
    technician.services?.[0]?.category?.name ||
    technician.services?.[0]?.title ||
    technician.profession ||
    "Home Service Expert";

  const reviews = technician.reviews || [];
  const totalReviews =
    technician.total_reviews ?? technician.totalReviews ?? reviews.length ?? 0;

  const rating =
    reviews.length > 0
      ? Number(
        (
          reviews.reduce((acc, curr) => acc + (curr.rating || 0), 0) /
          reviews.length
        ).toFixed(1)
      )
      : technician.rating ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="h-full w-full"
    >
      <Card className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition-all duration-300 hover:shadow-xl hover:border-primary/40 flex flex-col justify-between h-full w-full">

        {/* Top Image Banner Section */}
        <div className="relative h-48 w-full overflow-hidden bg-muted m-0 p-0">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50" />

          {/* Category Badge */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-primary-foreground text-xs font-semibold shadow-sm">
            <Briefcase className="h-3 w-3 text-primary" />
            <span className="truncate max-w-[140px]">{categoryName}</span>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs font-semibold shadow-sm">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span>{rating > 0 ? rating : "New"}</span>
            <span className="text-gray-300 text-[10px]">({totalReviews})</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 flex flex-col flex-grow space-y-2">
          {location && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
              <span className="truncate">{location}</span>
            </div>
          )}

          <div className="flex items-center gap-1.5">
            <Link
              href={`/technicians/${techId}`}
              className="text-lg font-bold text-foreground hover:text-primary transition-colors line-clamp-1"
            >
              {name}
            </Link>
            {technician.isVerified && (
              <BadgeCheck className="h-4 w-4 text-primary shrink-0" strokeWidth={2.5} />
            )}
          </div>

          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {bio || `Experienced ${categoryName} ready to provide professional services with top-notch quality.`}
          </p>

          {skills && skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1 mt-auto">
              {skills.slice(0, 3).map((skill, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1 bg-muted/60 border border-border/50 px-2 py-0.5 rounded-md text-[11px] font-medium text-foreground"
                >
                  <Check className="h-3 w-3 text-primary" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border/60 px-4 py-3.5 flex items-center justify-between bg-muted/20">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              {technician.hourly_rate ? "HOURLY RATE" : "STARTING PRICE"}
            </span>
            <span className="text-base font-extrabold text-foreground flex items-center">
              {price !== undefined && price !== null ? `৳${price}` : "Negotiable"}
              {price !== undefined && price !== null && technician.hourly_rate && (
                <span className="text-xs font-normal text-muted-foreground ml-0.5">/hr</span>
              )}
            </span>
          </div>

          <Button
            asChild
            size="sm"
            className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 text-xs font-bold shadow-md shadow-primary/20 transition-all duration-300 cursor-pointer h-9"
          >
            <Link href={`/technicians/${techId}`}>
              Details
            </Link>
          </Button>
        </div>

      </Card>
    </motion.div>
  );
}