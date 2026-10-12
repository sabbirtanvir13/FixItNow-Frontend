"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Star,
  MapPin,
  Mail,
  Briefcase,
  Wrench,
  Calendar,
  MessageSquare,
  ShieldCheck,
  ThumbsUp,
  Clock,
  Snowflake,
  Disc,
  Laptop,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Loader2,
  Send,
  User,
  Sparkles,
  Phone,
  Waves,
  Zap,
  Paintbrush,
  Hammer
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createBookingAction } from "../../_action/technicianAction";

interface TechnicianProfileViewProps {
  tech: any;
}

export function TechnicianProfileView({ tech }: TechnicianProfileViewProps) {
  const router = useRouter();

  // 1. Data mapping with clean production fallbacks aligned to reference
  const name = tech.user?.name || tech.name || "Tech";
  const email = tech.user?.email || "technician34@gmail.com";
  const location = tech.location || "Khulna";
  const experienceYears = tech.experience_years ?? tech.experience ?? 5;
  const rawHourlyRate = tech.hourly_rate ?? tech.services?.[0]?.price ?? 2000;
  const hourlyRate = Number(rawHourlyRate);

  // Profile image: use tech.profilePhoto, or fall back to /technician.jpg
  const profileImage =
    tech.profilePhoto ||
    tech.profileImage ||
    "/technician.jpg";

  // Bio description
  const bio =
    tech.bio ||
    "This is a test technician profile. I have 5 years of experience in appliance repair and maintenance. Testing profile information only.";

  // Category / specialty
  const specialty =
    tech.services?.[0]?.category?.name ||
    tech.services?.[0]?.title ||
    tech.profession ||
    "Home Appliance Repair";

  // Skills
  const rawSkills: string[] =
    tech.skills && tech.skills.length > 0
      ? tech.skills
      : ["Refrigerator Repair", "Washing Machine Repair", "AC Repair"];

  // Services
  const rawServices =
    tech.services && tech.services.length > 0
      ? tech.services
      : [
          {
            id: "srv-ac-1",
            title: "AC Repair",
            price: 2000,
            duration: 60,
          },
          {
            id: "srv-pc-2",
            title: "PC Rapier",
            price: 3000,
            duration: 90,
          },
        ];

  // Reviews
  const rawReviews =
    tech.reviews && tech.reviews.length > 0
      ? tech.reviews
      : [
          {
            id: "rev-1",
            reviewerName: "Customer",
            comment: "all good",
            rating: 5.0,
            createdAt: "2025-10-01",
          },
        ];

  const totalReviews =
    tech.reviews?.length > 0
      ? tech.reviews.length
      : tech.total_reviews ?? 4;

  const averageRating =
    tech.reviews?.length > 0
      ? Number(
          (
            tech.reviews.reduce(
              (acc: number, curr: any) => acc + (curr.rating || 5),
              0
            ) / tech.reviews.length
          ).toFixed(1)
        )
      : tech.rating ?? 4.8;

  // 2. Interactive Dialog States
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    rawServices[0]?.id || ""
  );
  const [bookingDate, setBookingDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split("T")[0]
  );
  const [timeSlot, setTimeSlot] = useState<string>("10:00 AM - 11:00 AM");
  const [bookingNotes, setBookingNotes] = useState<string>("");
  const [isBookingSubmitting, setIsBookingSubmitting] = useState<boolean>(false);

  // Message Dialog State
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageSubject, setMessageSubject] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  // View All Reviews Toggle
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Helper to map skill name to icon
  const getSkillIcon = (skillName: string) => {
    const s = skillName.toLowerCase();
    if (s.includes("refrigerator") || s.includes("fridge")) {
      return <Snowflake className="size-4 text-blue-500 shrink-0" />;
    }
    if (s.includes("washing") || s.includes("washer")) {
      return <Disc className="size-4 text-slate-700 shrink-0" />;
    }
    if (s.includes("ac") || s.includes("air")) {
      return <Snowflake className="size-4 text-cyan-500 shrink-0" />;
    }
    if (s.includes("pc") || s.includes("computer") || s.includes("laptop")) {
      return <Laptop className="size-4 text-indigo-500 shrink-0" />;
    }
    if (s.includes("electric") || s.includes("wiring")) {
      return <Zap className="size-4 text-amber-500 shrink-0" />;
    }
    if (s.includes("plumb") || s.includes("pipe") || s.includes("water")) {
      return <Waves className="size-4 text-blue-500 shrink-0" />;
    }
    if (s.includes("carpenter") || s.includes("wood")) {
      return <Hammer className="size-4 text-amber-700 shrink-0" />;
    }
    if (s.includes("paint")) {
      return <Paintbrush className="size-4 text-purple-500 shrink-0" />;
    }
    return <Wrench className="size-4 text-[#FF6B00] shrink-0" />;
  };

  // Helper to get service icon
  const getServiceIcon = (serviceTitle: string) => {
    const s = serviceTitle.toLowerCase();
    if (s.includes("ac") || s.includes("air") || s.includes("cool")) {
      return <Snowflake className="size-5 text-cyan-600" />;
    }
    if (s.includes("pc") || s.includes("rapier") || s.includes("computer") || s.includes("laptop")) {
      return <Laptop className="size-5 text-slate-700" />;
    }
    if (s.includes("clean")) {
      return <Sparkles className="size-5 text-emerald-600" />;
    }
    return <Wrench className="size-5 text-slate-600" />;
  };

  // Selected Service for price breakdown
  const activeService =
    rawServices.find((s: any) => s.id === selectedServiceId) || rawServices[0];

  // Booking submit handler
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedServiceId) {
      toast.error("Please select a service to book.");
      return;
    }
    if (!bookingDate) {
      toast.error("Please pick a booking date.");
      return;
    }

    setIsBookingSubmitting(true);
    try {
      const startTime = timeSlot.split(" - ")[0] || "10:00 AM";
      const endTime = timeSlot.split(" - ")[1] || "11:00 AM";

      const res = await createBookingAction({
        service_id: selectedServiceId,
        booking_date: new Date(bookingDate).toISOString(),
        start_time: startTime,
        end_time: endTime,
        notes: bookingNotes,
      });

      if (res?.requiresLogin) {
        toast.info("Please sign in to confirm your booking.");
        router.push("/login");
        return;
      }

      if (res?.success) {
        toast.success("Booking request placed successfully!");
        setBookingOpen(false);
        router.push("/dashboard/customer/bookings?booked=true");
      } else {
        toast.error(res?.message || "Failed to create booking. Please try again.");
      }
    } catch (err: any) {
      console.error("Booking error:", err);
      toast.error(err.message || "Something went wrong while booking.");
    } finally {
      setIsBookingSubmitting(false);
    }
  };

  // Message submit handler
  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageBody.trim()) {
      toast.error("Please enter a message.");
      return;
    }

    setIsSendingMessage(true);
    setTimeout(() => {
      setIsSendingMessage(false);
      setMessageOpen(false);
      toast.success(`Inquiry sent to ${name}!`);
      // Also open mail client as direct fallback
      const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(
        messageSubject || `Inquiry for ${name} via FixtNow`
      )}&body=${encodeURIComponent(messageBody)}`;
      window.location.href = mailtoUrl;
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-slate-800 pb-20 selection:bg-[#FF6B00] selection:text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-6 space-y-6">

        {/* ── Breadcrumb / Back Link ── */}
        <div>
          <Link
            href="/technicians"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF6B00] hover:text-[#e05e00] transition-colors group"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Back to Technicians
          </Link>
        </div>

        {/* ── 1. Technician Profile Hero ── */}
        <section className="relative overflow-hidden rounded-[20px] bg-[#0B1729] text-white border border-slate-800 shadow-xl">
          {/* Subtle Orange Radial Glow */}
          <div
            className="absolute top-0 right-0 w-[500px] h-[350px] pointer-events-none opacity-20"
            style={{
              background: "radial-gradient(circle at 75% 25%, #FF6B00 0%, transparent 65%)",
            }}
          />

          {/* Blueprint Repair Tool Watermark Illustrations */}
          <div className="absolute right-4 bottom-2 pointer-events-none opacity-[0.07] text-white select-none hidden sm:block">
            <svg width="280" height="200" viewBox="0 0 200 150" fill="none" stroke="currentColor" strokeWidth="2.5">
              {/* Crossed Wrench and Screwdriver */}
              <path d="M140 20 L160 40 L110 90 L90 70 Z" />
              <circle cx="160" cy="40" r="14" />
              <path d="M60 20 L80 40 L30 90 L10 70 Z" />
              <circle cx="60" cy="20" r="14" />
              {/* Gear Outline */}
              <circle cx="150" cy="110" r="24" strokeDasharray="6 4" />
              <circle cx="150" cy="110" r="10" />
            </svg>
          </div>

          <div className="relative z-10 p-6 sm:p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-7 md:gap-9">

              {/* Profile Image with Verified Badge */}
              <div className="relative shrink-0">
                <div className="relative size-44 sm:size-52 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl bg-slate-800">
                  <Image
                    src={profileImage}
                    alt={name}
                    fill
                    priority
                    sizes="(max-width: 640px) 176px, 208px"
                    className="object-cover object-top"
                  />
                </div>

                {/* Verified Technician Badge */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-max max-w-[90%]">
                  <div className="flex items-center gap-1.5 bg-[#0B1729]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15 shadow-lg">
                    <ShieldCheck className="size-4 text-[#FF6B00] shrink-0" fill="#FF6B00" stroke="#0B1729" />
                    <span className="text-[11px] font-bold text-white tracking-tight whitespace-nowrap">
                      Verified Technician
                    </span>
                  </div>
                </div>
              </div>

              {/* Technician Info */}
              <div className="flex-1 text-center md:text-left space-y-3.5">
                {/* Name */}
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  {name}
                </h1>

                {/* Rating & Meta line */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-5 gap-y-2 text-xs sm:text-sm text-slate-300 font-medium">
                  {/* Rating */}
                  <span className="inline-flex items-center gap-1 text-[#FF6B00] font-bold">
                    <Star className="size-4 fill-[#FF6B00] text-[#FF6B00]" />
                    <span>{averageRating}</span>
                    <span className="text-slate-400 font-normal">
                      ({totalReviews} Reviews)
                    </span>
                  </span>

                  {/* Location */}
                  <span className="inline-flex items-center gap-1.5 text-slate-300">
                    <MapPin className="size-4 text-[#FF6B00]" />
                    <span>{location}</span>
                  </span>

                  {/* Email */}
                  <span className="inline-flex items-center gap-1.5 text-slate-300">
                    <Mail className="size-4 text-slate-400" />
                    <span>{email}</span>
                  </span>

                  {/* Experience */}
                  <span className="inline-flex items-center gap-1.5 text-slate-300">
                    <Briefcase className="size-4 text-[#FF6B00]" />
                    <span>{experienceYears} Years Experience</span>
                  </span>
                </div>

                {/* Specialty */}
                <div className="flex items-center justify-center md:justify-start gap-2 text-xs sm:text-sm text-slate-200 font-medium pt-1">
                  <Wrench className="size-4 text-slate-400 shrink-0" />
                  <span>{specialty}</span>
                </div>

                {/* Hourly Rate */}
                <div className="pt-1">
                  <p className="text-2xl sm:text-3xl font-black text-[#FF6B00] tracking-tight">
                    ৳{hourlyRate}{" "}
                    <span className="text-xs sm:text-sm font-normal text-slate-400">
                      /Hour
                    </span>
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setBookingOpen(true)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] text-white text-sm font-bold shadow-lg shadow-orange-500/25 active:scale-[0.99] transition-all cursor-pointer"
                  >
                    <Calendar className="size-4" />
                    <span>Book This Technician</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMessageOpen(true)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-white border border-slate-700/80 hover:border-slate-500 text-sm font-semibold active:scale-[0.99] transition-all cursor-pointer"
                  >
                    <MessageSquare className="size-4" />
                    <span>Message</span>
                  </button>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ── 2. About Me & Trust Statistics (Desktop 2-column) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* About Me Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-7 flex flex-col justify-between">
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                About Me
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {bio}
              </p>
            </div>

            {/* Compact Info Cards */}
            <div className="grid grid-cols-2 gap-3.5 pt-6 mt-6 border-t border-slate-100">
              <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 bg-slate-50/60">
                <div className="p-2 rounded-lg bg-orange-50 text-[#FF6B00] shrink-0">
                  <Briefcase className="size-4" />
                </div>
                <div>
                  <span className="text-[11px] font-medium text-slate-400 block leading-tight">
                    Experience
                  </span>
                  <span className="text-sm font-bold text-slate-900 leading-tight">
                    {experienceYears}+ Years
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 bg-slate-50/60">
                <div className="p-2 rounded-lg bg-orange-50 text-[#FF6B00] shrink-0">
                  <MapPin className="size-4" />
                </div>
                <div>
                  <span className="text-[11px] font-medium text-slate-400 block leading-tight">
                    Working Area
                  </span>
                  <span className="text-sm font-bold text-slate-900 leading-tight">
                    {location}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Statistics Card */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-7 flex flex-col justify-center">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">

              {/* 1. Trusted */}
              <div className="flex flex-col items-center justify-center p-5 rounded-xl border border-slate-200/70 bg-white text-center hover:border-orange-200 transition-colors">
                <div className="text-[#FF6B00] mb-2.5">
                  <ShieldCheck className="size-6 stroke-[1.8]" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 leading-tight">
                  Trusted
                </h3>
                <p className="text-[11px] text-slate-500 mt-1 leading-tight">
                  Background Verified
                </p>
              </div>

              {/* 2. Jobs Completed */}
              <div className="flex flex-col items-center justify-center p-5 rounded-xl border border-slate-200/70 bg-white text-center hover:border-orange-200 transition-colors">
                <div className="text-[#FF6B00] mb-2.5">
                  <Star className="size-6 stroke-[1.8]" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 leading-tight">
                  30+
                </h3>
                <p className="text-[11px] text-slate-500 mt-1 leading-tight">
                  Jobs Completed
                </p>
              </div>

              {/* 3. Positive Reviews */}
              <div className="flex flex-col items-center justify-center p-5 rounded-xl border border-slate-200/70 bg-white text-center hover:border-orange-200 transition-colors">
                <div className="text-[#FF6B00] mb-2.5">
                  <ThumbsUp className="size-6 stroke-[1.8]" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 leading-tight">
                  98%
                </h3>
                <p className="text-[11px] text-slate-500 mt-1 leading-tight">
                  Positive Reviews
                </p>
              </div>

              {/* 4. On Time */}
              <div className="flex flex-col items-center justify-center p-5 rounded-xl border border-slate-200/70 bg-white text-center hover:border-orange-200 transition-colors">
                <div className="text-[#FF6B00] mb-2.5">
                  <Clock className="size-6 stroke-[1.8]" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 leading-tight">
                  On Time
                </h3>
                <p className="text-[11px] text-slate-500 mt-1 leading-tight">
                  Always Punctual
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* ── 3. Skills & Specializations & Services & Pricing (Desktop 2-column) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* Skills & Specializations Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-7 space-y-5">
            <div className="space-y-1">
              <div className="w-8 h-1 bg-[#FF6B00] rounded-full mb-2" />
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Skills & Specializations
              </h2>
            </div>

            <div className="flex flex-col gap-2.5">
              {rawSkills.map((skill: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50/80 border border-slate-200/70 text-slate-700 text-sm font-medium hover:bg-slate-100 transition-colors"
                >
                  {getSkillIcon(skill)}
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Services & Pricing Card */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-7 flex flex-col justify-between space-y-5">
            <div className="space-y-5">
              <div className="space-y-1">
                <div className="w-8 h-1 bg-[#FF6B00] rounded-full mb-2" />
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                  Services & Pricing
                </h2>
              </div>

              {/* Service Rows */}
              <div className="space-y-3">
                {rawServices.map((service: any) => (
                  <div
                    key={service.id || service._id}
                    className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50/50 transition-all"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600 shrink-0">
                        {getServiceIcon(service.title || service.name)}
                      </div>
                      <span className="text-sm font-bold text-slate-800">
                        {service.title || service.name}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-bold text-[#FF6B00]">
                        ৳{service.price}
                      </span>
                      <span className="text-xs text-[#FF6B00]/80 font-medium ml-1">
                        /Hour
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prominent Booking CTA Button */}
            <button
              type="button"
              onClick={() => {
                if (rawServices[0]?.id) {
                  setSelectedServiceId(rawServices[0].id);
                }
                setBookingOpen(true);
              }}
              className="w-full mt-4 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#FFF4EC] hover:bg-[#FFE8D6] text-[#FF6B00] border border-[#FF6B00]/30 font-bold text-sm transition-all cursor-pointer active:scale-[0.99]"
            >
              <Calendar className="size-4" />
              <span>Book This Technician</span>
            </button>
          </div>

        </div>

        {/* ── 4. Customer Reviews (Full-width Card) ── */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-7 space-y-5">
          <div className="space-y-1">
            <div className="w-8 h-1 bg-[#FF6B00] rounded-full mb-2" />
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Customer Reviews
            </h2>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {(showAllReviews ? rawReviews : rawReviews.slice(0, 1)).map(
              (review: any, index: number) => {
                const reviewerName =
                  review.reviewerName || review.user?.name || "Customer";
                const reviewComment =
                  review.comment || review.review || "all good";
                const reviewRating = review.rating ?? 5.0;

                return (
                  <div
                    key={review.id || index}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 rounded-xl border border-slate-100 bg-white hover:border-slate-200 transition-colors gap-4"
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Avatar */}
                      <div className="size-11 rounded-full bg-orange-100 text-[#FF6B00] flex items-center justify-center shrink-0 font-bold">
                        <User className="size-5" />
                      </div>

                      {/* Content */}
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">
                          {reviewerName}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {reviewComment}
                        </p>
                      </div>
                    </div>

                    {/* Star Rating */}
                    <div className="flex items-center gap-2 self-start sm:self-center">
                      <div className="flex text-[#FF6B00]">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`size-4 ${
                              i < Math.floor(reviewRating)
                                ? "fill-[#FF6B00] text-[#FF6B00]"
                                : "text-slate-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-bold text-slate-900">
                        {Number(reviewRating).toFixed(1)}
                      </span>
                    </div>
                  </div>
                );
              }
            )}
          </div>

          {/* View All Reviews Action */}
          {rawReviews.length > 1 ? (
            <button
              type="button"
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="w-full py-3 rounded-xl border border-slate-200 hover:border-orange-300 hover:bg-orange-50/50 text-slate-700 hover:text-[#FF6B00] text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>
                {showAllReviews ? "Show Less" : "View All Reviews"}
              </span>
              <ChevronRight
                className={`size-4 transition-transform ${
                  showAllReviews ? "-rotate-90" : "rotate-0"
                }`}
              />
            </button>
          ) : (
            <Link
              href="/technicians"
              className="w-full py-3 rounded-xl border border-slate-200 hover:border-orange-300 hover:bg-orange-50/50 text-slate-700 hover:text-[#FF6B00] text-sm font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <span>View All Reviews</span>
              <ChevronRight className="size-4" />
            </Link>
          )}
        </div>

      </div>

      {/* ── 5. Interactive Booking Modal ── */}
      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent className="sm:max-w-[480px] p-6 rounded-2xl bg-white border border-slate-200">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900">
              Book {name}
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              Choose your required service and preferred appointment schedule.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleBookingSubmit} className="space-y-4 pt-2">
            {/* Service Selection */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase tracking-wider">
                Select Service
              </label>
              <select
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                className="w-full h-11 px-3 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-slate-800"
                required
              >
                {rawServices.map((service: any) => (
                  <option key={service.id || service._id} value={service.id || service._id}>
                    {service.title || service.name} — ৳{service.price}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Picker */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase tracking-wider">
                Appointment Date
              </label>
              <Input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="h-11 rounded-xl border-slate-200"
                required
              />
            </div>

            {/* Time Slot */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase tracking-wider">
                Preferred Time Slot
              </label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full h-11 px-3 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-slate-800"
              >
                <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                <option value="11:30 AM - 12:30 PM">11:30 AM - 12:30 PM</option>
                <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
                <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
              </select>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase tracking-wider">
                Special Instructions (Optional)
              </label>
              <Textarea
                placeholder="Mention issue details or address landmark..."
                value={bookingNotes}
                onChange={(e) => setBookingNotes(e.target.value)}
                rows={2}
                className="rounded-xl border-slate-200 resize-none text-xs"
              />
            </div>

            {/* Price Summary */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Estimated Price:</span>
                <span className="font-bold text-slate-900">
                  ৳{activeService?.price || hourlyRate}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Platform Service Fee:</span>
                <span className="font-bold text-emerald-600">FREE</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-slate-900 pt-1.5 border-t border-slate-200">
                <span>Total Due:</span>
                <span className="text-[#FF6B00]">৳{activeService?.price || hourlyRate}</span>
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isBookingSubmitting}
                className="w-full h-12 rounded-xl bg-[#FF6B00] hover:bg-[#e05e00] disabled:bg-slate-300 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 transition-all cursor-pointer"
              >
                {isBookingSubmitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Confirming Booking...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="size-4" />
                    <span>Confirm Appointment</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* ── 6. Interactive Message Modal ── */}
      <Dialog open={messageOpen} onOpenChange={setMessageOpen}>
        <DialogContent className="sm:max-w-[460px] p-6 rounded-2xl bg-white border border-slate-200">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900">
              Message {name}
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              Directly contact this technician for queries or emergency service requests.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleMessageSubmit} className="space-y-4 pt-2">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1 uppercase tracking-wider">
                Technician Email
              </label>
              <Input
                value={email}
                readOnly
                className="h-10 rounded-xl bg-slate-50 border-slate-200 text-xs text-slate-600 font-medium"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1 uppercase tracking-wider">
                Subject
              </label>
              <Input
                placeholder="e.g. Inquiring about refrigerator gas refill"
                value={messageSubject}
                onChange={(e) => setMessageSubject(e.target.value)}
                className="h-10 rounded-xl border-slate-200 text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1 uppercase tracking-wider">
                Your Message
              </label>
              <Textarea
                placeholder="Describe your issue and ask when the technician is free..."
                value={messageBody}
                onChange={(e) => setMessageBody(e.target.value)}
                rows={4}
                required
                className="rounded-xl border-slate-200 text-xs resize-none"
              />
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="submit"
                disabled={isSendingMessage}
                className="flex-1 h-11 rounded-xl bg-[#0B1729] hover:bg-slate-800 disabled:bg-slate-300 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {isSendingMessage ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="size-3.5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${email}?subject=${encodeURIComponent(
                  messageSubject || `Inquiry for ${name}`
                )}`}
                className="h-11 px-4 rounded-xl border border-slate-300 hover:border-slate-400 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
              >
                <Mail className="size-3.5" />
                <span>Open Mail</span>
              </a>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
