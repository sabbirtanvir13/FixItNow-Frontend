"use client";

import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Star,
  Briefcase,
  BadgeCheck,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  // Legacy / fallback fields
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

export default function TechnicianCard({ technician }: TechnicianCardProps) {
  // Backend Mapping
  const techId = technician.id || (technician as any)._id || technician.userId || "";
  const name = technician.user?.name || technician.name || "Technician";
  const image =
    technician.profilePhoto ||
    technician.profileImage ||
    "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=800";
  const experience = technician.experience_years ?? technician.experience;
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
    <Card className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-300 flex flex-col justify-between">
      
      {/* Top Banner Accent Line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-500 group-hover:opacity-100 opacity-90 transition-opacity duration-300" />

      <div>
        {/* Profile Header Block */}
        <div className="p-6 pb-3 flex items-start gap-4">
          {/* Avatar Container */}
          <Link
            href={`/technicians/${techId}`}
            className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border-2 border-slate-100 shadow-sm ring-2 ring-slate-100 group-hover:ring-indigo-500/30 group-hover:border-white transition-all duration-300 block"
          >
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            {technician.isVerified && (
              <span className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white ring-1 ring-emerald-500/30" />
            )}
          </Link>

          {/* User Meta Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <Link
                href={`/technicians/${techId}`}
                className="text-lg font-extrabold text-slate-900 truncate group-hover:text-indigo-600 transition-colors"
              >
                {name}
              </Link>
              {technician.isVerified && (
                <BadgeCheck className="h-4.5 w-4.5 text-blue-600 flex-shrink-0" />
              )}
            </div>

            <p className="text-[11px] font-bold text-indigo-600 tracking-wider uppercase mt-0.5">
              {categoryName}
            </p>

            {/* Rating & Review Pill */}
            <div className="mt-2.5 flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1 bg-amber-500/10 text-amber-700 px-2.5 py-0.5 rounded-full border border-amber-500/20 text-xs font-bold">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span>{rating > 0 ? rating : "New"}</span>
                <span className="text-[10px] text-amber-600 font-normal">
                  ({totalReviews})
                </span>
              </div>

              {experience !== undefined && experience !== null && (
                <div className="flex items-center gap-1 bg-slate-100/80 text-slate-700 px-2.5 py-0.5 rounded-full border border-slate-200/60 text-xs font-medium">
                  <Briefcase className="h-3 w-3 text-slate-400" />
                  <span>{experience} yrs exp</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <CardContent className="px-6 pb-4 pt-1 space-y-3">
          {/* Location */}
          {location && (
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <MapPin className="h-3.5 w-3.5 text-rose-500 flex-shrink-0" />
              <span className="truncate font-medium">{location}</span>
            </div>
          )}

          {/* Bio Preview */}
          {bio && (
            <p className="line-clamp-2 text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100/80">
              {bio}
            </p>
          )}

          {/* Skills Badges */}
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {skills.slice(0, 3).map((skill, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="rounded-xl text-[11px] font-medium bg-slate-100/70 text-slate-700 border-slate-200/70 px-2.5 py-0.5 group-hover:bg-indigo-50 group-hover:text-indigo-700 group-hover:border-indigo-100 transition-colors"
                >
                  <Sparkles className="mr-1 h-3 w-3 text-indigo-400 inline" />
                  {skill}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </div>

      {/* Footer & Action Button */}
      <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between gap-3 rounded-b-3xl">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
            {technician.hourly_rate
              ? "Rate / Hour"
              : price !== undefined && price !== null
              ? "Starting Price"
              : "Price"}
          </span>
          <h4 className="text-lg font-black text-slate-900">
            {price !== undefined && price !== null ? `৳ ${price}` : "Negotiable"}
          </h4>
        </div>

        <Button
          asChild
          className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-indigo-500/25 px-5 py-2.5 text-xs font-semibold transition-all duration-200"
        >
          <Link href={`/technicians/${techId}`}>
            View Details
            <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>

    </Card>
  );
}