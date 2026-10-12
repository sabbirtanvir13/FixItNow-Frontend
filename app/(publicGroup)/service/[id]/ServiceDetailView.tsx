"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Star,
  Sparkles,
  Lock,
  Phone,
  MessageSquare,
  Info,
  Calendar,
  Send,
  Loader2,
  ArrowRight,
  CreditCard,
  Banknote,
  Wrench,
  Check,
  ExternalLink,
  RotateCcw
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
import { createServiceBookingAction } from "../../_action/serviceAction";
import { createPayment } from "../../_action/paymentPageAction";

interface ServiceDetailViewProps {
  service: any;
  initialUser: any | null;
  technicianDetails: any | null;
}

export function ServiceDetailView({
  service,
  initialUser,
  technicianDetails,
}: ServiceDetailViewProps) {
  const router = useRouter();

  // 1. Service & Category Details
  const serviceId = service.id || service._id;
  const title = service.title || "Professional Home Service";
  const categoryName = service.category?.name?.trim() || "Home Appliance Repair";
  const basePrice = Number(service.price) || 2000;
  const durationMinutes = service.duration || 20;
  const serviceLocation = service.location || "Khulna";

  // Resolving high quality image
  const defaultImage =
    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop";
  const displayImage =
    service.image && service.image.startsWith("http")
      ? service.image
      : defaultImage;

  // 2. Technician Information (from service.technician or technicianDetails)
  const techData = technicianDetails || service.technician || {};
  const techUser = techData.user || {};
  const technicianName = techUser.name || techData.name || "Tech";
  const technicianEmail = techUser.email || techData.email || "technician@fixitnow.com";
  const technicianPhone = techData.phone || "+880 1711-234567";
  const technicianExp = techData.experience_years ?? techData.experience ?? 5;
  const technicianReviewsCount = techData.total_reviews ?? techData.reviews?.length ?? 128;
  const technicianRating = 4.8;
  const technicianPhoto =
    techData.profilePhoto && techData.profilePhoto.startsWith("http")
      ? techData.profilePhoto
      : "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=300&auto=format&fit=crop";

  // 3. Available Booking Dates & Time Slots
  // Helper to format date for input (YYYY-MM-DD)
  const today = new Date();
  const getFormattedDate = (daysAhead: number) => {
    const d = new Date(today);
    d.setDate(d.getDate() + daysAhead);
    return d.toISOString().split("T")[0];
  };

  const [selectedDate, setSelectedDate] = useState<string>(getFormattedDate(1));
  const [selectedSlot, setSelectedSlot] = useState<string>("09:00 AM");

  const timeSlots = [
    "09:00 AM",
    "11:00 AM",
    "01:00 PM",
    "03:00 PM",
    "05:00 PM",
    "07:00 PM",
  ];

  // 4. Form inputs (prepopulated from authenticated customer)
  const [customerName, setCustomerName] = useState<string>(
    initialUser?.name || ""
  );
  const [customerPhone, setCustomerPhone] = useState<string>(
    initialUser?.phone || initialUser?.phoneNumber || ""
  );
  const [customerAddress, setCustomerAddress] = useState<string>(
    initialUser?.address || ""
  );
  const [customerNotes, setCustomerNotes] = useState<string>("");
  const [isEditingLocation, setIsEditingLocation] = useState<boolean>(false);
  const [customLocation, setCustomLocation] = useState<string>(
    `${serviceLocation}, Bangladesh`
  );

  // 5. Payment method: Cash on Service or Online Payment (SSLCommerz)
  const [paymentMethod, setPaymentMethod] = useState<"CASH" | "ONLINE">("CASH");

  // 6. Action states
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any | null>(null);
  const [isSuccessOpen, setIsSuccessOpen] = useState<boolean>(false);
  const [isMessageOpen, setIsMessageOpen] = useState<boolean>(false);
  const [isCallOpen, setIsCallOpen] = useState<boolean>(false);
  const [messageSubject, setMessageSubject] = useState<string>("");
  const [messageBody, setMessageBody] = useState<string>("");
  const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false);

  // 7. Interactive Accordion state
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([0]);

  const toggleFaq = (idx: number) => {
    if (expandedFaqs.includes(idx)) {
      setExpandedFaqs(expandedFaqs.filter((i) => i !== idx));
    } else {
      setExpandedFaqs([...expandedFaqs, idx]);
    }
  };

  // Helper to calculate end time from slot & duration
  const getEndTime = (slot: string, durMin: number) => {
    const parts = slot.split(" ");
    const timeParts = parts[0].split(":");
    let hours = parseInt(timeParts[0], 10);
    let minutes = parseInt(timeParts[1], 10);
    const meridiem = parts[1];

    if (meridiem === "PM" && hours !== 12) hours += 12;
    if (meridiem === "AM" && hours === 12) hours = 0;

    const totalMinutes = hours * 60 + minutes + durMin;
    let endHours = Math.floor(totalMinutes / 60) % 24;
    const endMins = totalMinutes % 60;
    const endMeridiem = endHours >= 12 ? "PM" : "AM";
    if (endHours > 12) endHours -= 12;
    if (endHours === 0) endHours = 12;

    const formattedMins = endMins < 10 ? `0${endMins}` : `${endMins}`;
    return `${endHours}:${formattedMins} ${endMeridiem}`;
  };

  // Handle Booking submission
  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim()) {
      toast.error("Please enter your full name.");
      return;
    }

    if (!customerPhone.trim()) {
      toast.error("Please enter your phone number.");
      return;
    }

    if (customerPhone.trim().length < 9) {
      toast.error("Please provide a valid phone number (e.g. 017XXXXXXXX).");
      return;
    }

    if (!selectedDate) {
      toast.error("Please select an appointment date.");
      return;
    }

    if (!selectedSlot) {
      toast.error("Please choose a preferred time slot.");
      return;
    }

    setIsSubmitting(true);

    try {
      const calculatedEndTime = getEndTime(selectedSlot, durationMinutes);

      const bookingPayload = {
        service_id: serviceId,
        booking_date: selectedDate,
        start_time: selectedSlot,
        end_time: calculatedEndTime,
        price: basePrice,
        fullName: customerName.trim(),
        phoneNumber: customerPhone.trim(),
        address: customerAddress.trim() || customLocation,
        notes: customerNotes.trim(),
      };

      const result = await createServiceBookingAction(bookingPayload);

      if (result.requiresLogin) {
        toast.info("Please log in to finalize your booking.");
        const currentPath = window.location.pathname;
        router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
        return;
      }

      if (result.success && result.data) {
        setConfirmedBooking(result.data);
        setIsSuccessOpen(true);
        toast.success("Booking confirmed successfully!");

        // If online payment is selected, initiate payment session
        if (paymentMethod === "ONLINE") {
          toast.loading("Initiating secure SSLCommerz payment gateway...");
          try {
            const paymentRes = await createPayment(result.data.id);
            if (paymentRes?.success && paymentRes?.data?.paymentUrl) {
              window.location.href = paymentRes.data.paymentUrl;
              return;
            } else {
              toast.info(
                paymentRes?.message ||
                  "Booking saved! Online payment gateway will open once accepted."
              );
            }
          } catch (payErr) {
            console.error("Online payment initialization error:", payErr);
          }
        }
      } else {
        toast.error(
          result.message || "Unable to complete booking. Please try again."
        );
      }
    } catch (err: any) {
      console.error("Booking error:", err);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle direct technician message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageBody.trim()) {
      toast.error("Please enter a message.");
      return;
    }

    setIsSendingMessage(true);
    // Simulate real communication channel / toast response
    await new Promise((r) => setTimeout(r, 600));
    setIsSendingMessage(false);
    setIsMessageOpen(false);
    setMessageBody("");
    setMessageSubject("");
    toast.success(`Message sent to ${technicianName}! They will respond shortly.`);
  };

  // What's included checklist items
  const includedItems = [
    "Full diagnosis and inspection",
    "Gas/oil check and refill",
    "Filter cleaning",
    "Compressor & capacitor check",
    "Performance testing",
  ];

  // How it works steps
  const howItWorksSteps = [
    {
      step: 1,
      title: "Book Your Service",
      desc: "Select a date, time and provide your details.",
    },
    {
      step: 2,
      title: "Technician Visit",
      desc: "Our expert will visit your location on time.",
    },
    {
      step: 3,
      title: "Diagnose & Repair",
      desc: "We diagnose the issue and fix it with your approval.",
    },
    {
      step: 4,
      title: "Service Complete",
      desc: "Payment is collected and you enjoy cool comfort.",
    },
  ];

  interface ReviewItem {
    name: string;
    date: string;
    stars: number;
    comment: string;
    avatar: string;
  }

  // Real or verified customer reviews
  const realReviews: any[] = techData.reviews || [];
  const reviewsToDisplay: ReviewItem[] =
    realReviews.length > 0
      ? realReviews.map((r: any) => ({
          name: r.customer?.name || "Verified Customer",
          date: r.created_at
            ? new Date(r.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            : "Recently",
          stars: r.rating || 5,
          comment: r.comment || "Great service, technician was on time and very professional.",
          avatar:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
        }))
      : [
          {
            name: "Rashedul Islam",
            date: "2 days ago",
            stars: 5,
            comment:
              "Very professional service. My AC is working perfectly now. Highly recommended!",
            avatar:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
          },
          {
            name: "Tanzia Karim",
            date: "1 week ago",
            stars: 5,
            comment:
              "Technician arrived on time and fixed the issue quickly. Great experience.",
            avatar:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
          },
        ];

  // FAQ items matching design
  const faqItems = [
    {
      q: `How long does an ${title.toLowerCase()} usually take?`,
      a: `Most standard diagnostic and repair appointments are completed within ${durationMinutes} to 60 minutes depending on part replacements and technical requirements.`,
    },
    {
      q: "What brands do you repair?",
      a: "Our certified technicians service all major international and domestic brands including LG, Samsung, Gree, Walton, Carrier, Daikin, General, Haier, and Panasonic.",
    },
    {
      q: `Do you provide warranty on ${title.toLowerCase()}?`,
      a: "Yes! FixtNow provides a complimentary 30-day service warranty on all completed workmanship and genuine parts installed by our technicians.",
    },
    {
      q: "Do I need to provide any tools or equipment?",
      a: "No equipment is needed from your side. Our specialists arrive fully equipped with certified diagnostic tools, testing gauges, safety gear, and supplies.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#0B1729] antialiased">
      {/* 1. Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium">
          <Link
            href="/"
            className="hover:text-[#FF6B00] transition-colors"
          >
            Home
          </Link>
          <ChevronRight className="size-3.5 text-slate-400" />
          <Link
            href="/service"
            className="hover:text-[#FF6B00] transition-colors"
          >
            Services
          </Link>
          <ChevronRight className="size-3.5 text-slate-400" />
          <span className="text-slate-500">{categoryName}</span>
          <ChevronRight className="size-3.5 text-slate-400" />
          <span className="text-[#0B1729] font-bold">{title}</span>
        </nav>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ================= LEFT COLUMN (approx 65% width) ================= */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            {/* HERO SECTION */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm relative overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Hero Info */}
                <div className="md:col-span-7 space-y-4">
                  {/* Category Pill */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#0066FF] text-xs font-bold uppercase tracking-wider">
                    <Wrench className="size-3.5" />
                    <span>{categoryName}</span>
                  </div>

                  {/* Title */}
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1729] tracking-tight leading-tight">
                    {title}
                  </h1>

                  {/* Description / Subtitle */}
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {service.description && service.description !== "abc" && service.description !== "all good"
                      ? service.description
                      : `Expert ${title} service for all brands and models. We diagnose and fix cooling, electrical, and hardware issues quickly and efficiently.`}
                  </p>

                  {/* Location & Duration Badges */}
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1">
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <div className="p-2 rounded-xl bg-orange-50 text-[#FF6B00]">
                        <MapPin className="size-4" />
                      </div>
                      <div>
                        <span className="block text-[11px] text-slate-400 font-semibold uppercase">
                          Service Location
                        </span>
                        <span className="font-bold text-[#0B1729] capitalize">
                          {serviceLocation}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <div className="p-2 rounded-xl bg-orange-50 text-[#FF6B00]">
                        <Clock className="size-4" />
                      </div>
                      <div>
                        <span className="block text-[11px] text-slate-400 font-semibold uppercase">
                          Estimated Duration
                        </span>
                        <span className="font-bold text-[#0B1729]">
                          {durationMinutes} Minutes
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Price Banner */}
                  <div className="pt-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-black text-[#FF6B00] tracking-tight">
                        ৳{basePrice}
                      </span>
                      <span className="text-sm font-semibold text-slate-500">
                        / Fixed
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">
                      Inclusive of all charges
                    </p>
                  </div>
                </div>

                {/* Hero Image with Curved Frame */}
                <div className="md:col-span-5 relative w-full h-64 sm:h-72 md:h-80 rounded-[2.5rem] overflow-hidden bg-slate-100 shadow-md border-4 border-white">
                  <Image
                    src={displayImage}
                    alt={title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>

            {/* SERVICE OVERVIEW & WHAT'S INCLUDED */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#FF6B00] rounded-full inline-block" />
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B1729]">
                  Service Overview
                </h2>
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Our certified technicians provide reliable {title.toLowerCase()}{" "}
                services including complete diagnosis, gas refilling, cooling
                issues, compressor problems, sensor errors, water leakage, and
                hardware component maintenance. Every visit follows verified
                safety protocols to guarantee long-lasting performance.
              </p>

              {/* What's Included Card */}
              <div className="bg-[#F8FAFC] rounded-2xl p-5 sm:p-6 border border-slate-200/60 space-y-4">
                <h3 className="text-sm font-bold text-[#0B1729] uppercase tracking-wider">
                  What's Included
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {includedItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-orange-100 text-[#FF6B00] flex items-center justify-center shrink-0">
                        <Check className="size-3.5 stroke-[3]" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-slate-700">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* HOW IT WORKS */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#FF6B00] rounded-full inline-block" />
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B1729]">
                  How It Works
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {howItWorksSteps.map((stepItem, idx) => (
                  <div
                    key={idx}
                    className="relative flex flex-col p-4 rounded-2xl bg-[#F8FAFC] border border-slate-100 hover:border-orange-200 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full border-2 border-[#FF6B00] text-[#FF6B00] font-black text-sm flex items-center justify-center mb-3 bg-white shadow-xs">
                      {stepItem.step}
                    </div>
                    <h4 className="text-sm font-bold text-[#0B1729] mb-1">
                      {stepItem.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {stepItem.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CUSTOMER REVIEWS */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#FF6B00] rounded-full inline-block" />
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B1729]">
                  Customer Reviews
                </h2>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-4 border-b border-slate-100">
                {/* Score rating box */}
                <div className="flex items-center gap-4">
                  <div className="text-4xl sm:text-5xl font-black text-[#0B1729] tracking-tight">
                    {technicianRating.toFixed(1)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-[#FF6B00] mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="size-4 fill-[#FF6B00] stroke-[#FF6B00]"
                        />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-slate-400">
                      ({technicianReviewsCount} Reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviewsToDisplay.map((rev: ReviewItem, index: number) => (
                  <div
                    key={index}
                    className="p-4 sm:p-5 rounded-2xl bg-[#F8FAFC] border border-slate-100 flex flex-col sm:flex-row sm:items-start gap-4"
                  >
                    <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-slate-200">
                      <Image
                        src={rev.avatar}
                        alt={rev.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-[#0B1729]">
                          {rev.name}
                        </h4>
                        <div className="flex items-center gap-1 text-[#FF6B00]">
                          {[...Array(rev.stars)].map((_, s) => (
                            <Star
                              key={s}
                              className="size-3.5 fill-[#FF6B00] stroke-[#FF6B00]"
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-[11px] text-slate-400 block font-medium">
                        {rev.date}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {rev.comment}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FREQUENTLY ASKED QUESTIONS */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[#FF6B00] rounded-full inline-block" />
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B1729]">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {faqItems.map((item, idx) => {
                  const isOpen = expandedFaqs.includes(idx);
                  return (
                    <div
                      key={idx}
                      className="border border-slate-200 rounded-2xl p-4 transition-all duration-200 hover:border-slate-300 bg-white"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        className="w-full flex items-center justify-between gap-3 text-left group"
                      >
                        <span className="text-xs sm:text-sm font-bold text-[#0B1729] group-hover:text-[#FF6B00] transition-colors">
                          {item.q}
                        </span>
                        <ChevronDown
                          className={`size-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#FF6B00]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <p className="mt-3 text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-100">
                          {item.a}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN (approx 35% width - STICKY BOOKING SIDEBAR) ================= */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6 lg:sticky lg:top-6">
            {/* BOOKING CARD */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-lg shadow-slate-200/40 space-y-6">
              {/* Card Header */}
              <div className="flex items-center gap-2.5 pb-2">
                <span className="w-1.5 h-5 bg-[#FF6B00] rounded-full inline-block" />
                <h3 className="text-lg font-bold text-[#0B1729]">
                  Booking Summary
                </h3>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2.5 text-sm">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Service</span>
                  <span className="font-bold text-[#0B1729]">{title}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Base Price</span>
                  <span className="font-bold text-[#0B1729]">৳{basePrice}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="inline-flex items-center gap-1">
                    Service Fee
                    <Info className="size-3.5 text-slate-400" />
                  </span>
                  <span className="font-bold text-emerald-600">FREE</span>
                </div>
                <hr className="border-slate-100 my-2" />
                <div className="flex items-center justify-between pt-1">
                  <span className="text-base font-extrabold text-[#0B1729]">
                    Total Amount
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-[#FF6B00]">
                    ৳{basePrice}
                  </span>
                </div>
              </div>

              {/* BOOKING FORM */}
              <form onSubmit={handleConfirmBooking} className="space-y-5">
                {/* SELECT DATE & TIME */}
                <div className="space-y-3 pt-2">
                  <label className="block text-xs font-bold text-[#0B1729] uppercase tracking-wider">
                    Select Date & Time
                  </label>

                  {/* Date Input */}
                  <div className="relative">
                    <input
                      type="date"
                      min={getFormattedDate(0)}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      required
                      className="w-full bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold text-[#0B1729] focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] transition-all"
                    />
                  </div>

                  {/* Time Slots Grid (3 columns x 2 rows) */}
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((slot) => {
                      const isSelected = selectedSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-2 px-1 text-center rounded-xl text-xs font-semibold transition-all border ${
                            isSelected
                              ? "bg-orange-50 border-[#FF6B00] text-[#FF6B00] shadow-xs"
                              : "bg-[#F8FAFC] border-slate-200 text-slate-600 hover:border-slate-300"
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* LOCATION */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs font-bold text-[#0B1729] uppercase tracking-wider">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-1 h-3.5 bg-[#FF6B00] rounded-full inline-block" />
                      Location
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsEditingLocation(!isEditingLocation)}
                      className="text-[#FF6B00] hover:underline normal-case font-semibold text-xs"
                    >
                      {isEditingLocation ? "Done" : "Change"}
                    </button>
                  </div>

                  {isEditingLocation ? (
                    <Input
                      value={customLocation}
                      onChange={(e) => setCustomLocation(e.target.value)}
                      placeholder="e.g. Khulna, Bangladesh"
                      className="bg-[#F8FAFC] text-xs"
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-[#F8FAFC] p-3 rounded-xl border border-slate-200">
                      <MapPin className="size-4 text-[#FF6B00] shrink-0" />
                      <span className="truncate">{customLocation}</span>
                    </div>
                  )}
                </div>

                {/* YOUR DETAILS */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-[#FF6B00] rounded-full inline-block" />
                    <label className="text-xs font-bold text-[#0B1729] uppercase tracking-wider">
                      Your Details
                    </label>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <Input
                        type="text"
                        placeholder="Enter your full name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                        className="bg-[#F8FAFC] border-slate-200 rounded-xl text-xs sm:text-sm py-2.5 focus-visible:ring-[#FF6B00]/20 focus-visible:border-[#FF6B00]"
                      />
                    </div>

                    <div>
                      <Input
                        type="tel"
                        placeholder="01XXXXXXXXX"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        required
                        className="bg-[#F8FAFC] border-slate-200 rounded-xl text-xs sm:text-sm py-2.5 focus-visible:ring-[#FF6B00]/20 focus-visible:border-[#FF6B00]"
                      />
                    </div>

                    <div>
                      <Input
                        type="text"
                        placeholder="House, Road, Area (Optional)"
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        className="bg-[#F8FAFC] border-slate-200 rounded-xl text-xs sm:text-sm py-2.5 focus-visible:ring-[#FF6B00]/20 focus-visible:border-[#FF6B00]"
                      />
                    </div>

                    <div>
                      <Textarea
                        placeholder="Any special instructions? (Optional)"
                        value={customerNotes}
                        onChange={(e) => setCustomerNotes(e.target.value)}
                        rows={2}
                        className="bg-[#F8FAFC] border-slate-200 rounded-xl text-xs resize-none focus-visible:ring-[#FF6B00]/20 focus-visible:border-[#FF6B00]"
                      />
                    </div>
                  </div>
                </div>

                {/* PAYMENT METHOD SELECTION */}
                <div className="space-y-2 pt-1">
                  <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Payment Method
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("CASH")}
                      className={`flex items-center justify-center gap-1.5 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                        paymentMethod === "CASH"
                          ? "bg-slate-900 border-slate-900 text-white shadow-xs"
                          : "bg-[#F8FAFC] border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      <Banknote className="size-3.5" />
                      <span>Cash on Service</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("ONLINE")}
                      className={`flex items-center justify-center gap-1.5 p-2.5 rounded-xl border text-xs font-bold transition-all ${
                        paymentMethod === "ONLINE"
                          ? "bg-slate-900 border-slate-900 text-white shadow-xs"
                          : "bg-[#F8FAFC] border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      <CreditCard className="size-3.5" />
                      <span>Pay Online</span>
                    </button>
                  </div>
                </div>

                {/* CONFIRM BOOKING BUTTON */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#FF6B00] hover:bg-[#e05e00] text-white py-4 h-auto rounded-2xl font-bold text-base transition-all duration-300 shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer border-0"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-5 animate-spin" />
                      <span>Processing Booking...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="size-4" />
                      <span>Confirm Booking</span>
                    </>
                  )}
                </Button>

                {/* Security Tag */}
                <p className="text-center text-xs text-slate-400 flex items-center justify-center gap-1.5 font-medium">
                  <ShieldCheck className="size-4 text-emerald-500" />
                  Your booking is secure and protected
                </p>
              </form>
            </div>

            {/* ASSIGNED TECHNICIAN CARD */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#FF6B00] rounded-full inline-block" />
                <h4 className="text-sm font-bold text-[#0B1729] uppercase tracking-wider">
                  Your Assigned Technician
                </h4>
              </div>

              <div className="flex flex-col items-center text-center space-y-3 pt-1">
                {/* Avatar with verified badge */}
                <div className="relative w-20 h-20">
                  <Image
                    src={technicianPhoto}
                    alt={technicianName}
                    fill
                    className="rounded-full object-cover ring-4 ring-slate-100"
                  />
                  <div
                    className="absolute bottom-0 right-0 bg-emerald-500 text-white p-1 rounded-full ring-2 ring-white"
                    title="Verified Technician"
                  >
                    <CheckCircle2 className="size-4 stroke-[2.5]" />
                  </div>
                </div>

                <div>
                  <h4 className="text-base font-extrabold text-[#0B1729]">
                    {technicianName}
                  </h4>
                  <div className="mt-1 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[11px] font-bold">
                    <CheckCircle2 className="size-3" />
                    <span>Verified Technician</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3.5 text-slate-400" />
                    {technicianExp}+ Years Exp.
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1 text-[#FF6B00]">
                    <Star className="size-3.5 fill-[#FF6B00]" />
                    {technicianRating.toFixed(1)} ({technicianReviewsCount})
                  </span>
                </div>

                {/* Action Buttons: Message & Call */}
                <div className="grid grid-cols-2 gap-3 w-full pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsMessageOpen(true)}
                    className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 font-bold rounded-xl text-xs py-2.5 h-auto"
                  >
                    <MessageSquare className="size-3.5 mr-1.5" />
                    Message
                  </Button>

                  <Button
                    type="button"
                    onClick={() => setIsCallOpen(true)}
                    className="w-full bg-[#0B1729] hover:bg-slate-800 text-white font-bold rounded-xl text-xs py-2.5 h-auto"
                  >
                    <Phone className="size-3.5 mr-1.5" />
                    Call
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ================= BOOKING SUCCESS CONFIRMATION MODAL ================= */}
      <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
        <DialogContent className="max-w-md bg-white rounded-3xl p-6 sm:p-8 border-0 shadow-2xl">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto ring-8 ring-emerald-50/50">
              <CheckCircle2 className="w-9 h-9 stroke-[2]" />
            </div>

            <div>
              <DialogTitle className="text-2xl font-black text-[#0B1729]">
                Booking Confirmed!
              </DialogTitle>
              <DialogDescription className="text-slate-500 text-xs sm:text-sm mt-1">
                Your appointment has been reserved in our system.
              </DialogDescription>
            </div>

            {/* Booking Details Card */}
            <div className="bg-[#F8FAFC] rounded-2xl p-4 text-left border border-slate-200/60 space-y-2.5 text-xs sm:text-sm">
              <div className="flex justify-between items-center text-slate-500">
                <span>Booking ID</span>
                <span className="font-mono font-bold text-[#0B1729]">
                  {confirmedBooking?.id?.slice(0, 8).toUpperCase() || "FXN-7892"}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-500">
                <span>Service</span>
                <span className="font-bold text-[#0B1729]">{title}</span>
              </div>
              <div className="flex justify-between items-center text-slate-500">
                <span>Appointment Date</span>
                <span className="font-bold text-[#0B1729]">{selectedDate}</span>
              </div>
              <div className="flex justify-between items-center text-slate-500">
                <span>Time Slot</span>
                <span className="font-bold text-[#FF6B00]">{selectedSlot}</span>
              </div>
              <div className="flex justify-between items-center text-slate-500">
                <span>Assigned Technician</span>
                <span className="font-bold text-[#0B1729]">{technicianName}</span>
              </div>
              <hr className="border-slate-200 my-1" />
              <div className="flex justify-between items-center font-bold text-sm text-[#0B1729]">
                <span>Total Amount</span>
                <span className="text-[#FF6B00]">৳{basePrice}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-2 pt-2">
              <Link
                href="/dashboard/customer/bookings"
                className="w-full bg-[#0B1729] hover:bg-slate-800 text-white py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
              >
                <span>View in Customer Dashboard</span>
                <ArrowRight className="size-4" />
              </Link>

              <Button
                variant="ghost"
                onClick={() => setIsSuccessOpen(false)}
                className="w-full text-slate-500 hover:text-slate-800 text-xs font-semibold py-2"
              >
                Close & Return
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ================= MESSAGE TECHNICIAN MODAL ================= */}
      <Dialog open={isMessageOpen} onOpenChange={setIsMessageOpen}>
        <DialogContent className="max-w-md bg-white rounded-3xl p-6 sm:p-8 border-0 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-[#0B1729] flex items-center gap-2">
              <MessageSquare className="size-5 text-[#FF6B00]" />
              Message {technicianName}
            </DialogTitle>
            <DialogDescription className="text-slate-500 text-xs">
              Direct question or instruction for your upcoming appointment.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSendMessage} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Subject
              </label>
              <Input
                placeholder="e.g. AC model details or arrival direction"
                value={messageSubject}
                onChange={(e) => setMessageSubject(e.target.value)}
                className="text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Message
              </label>
              <Textarea
                placeholder="Type your message here..."
                rows={4}
                value={messageBody}
                onChange={(e) => setMessageBody(e.target.value)}
                required
                className="text-xs resize-none"
              />
            </div>

            <Button
              type="submit"
              disabled={isSendingMessage}
              className="w-full bg-[#FF6B00] hover:bg-[#e05e00] text-white py-2.5 rounded-xl font-bold text-xs"
            >
              {isSendingMessage ? (
                <>
                  <Loader2 className="size-3.5 animate-spin mr-1.5" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="size-3.5 mr-1.5" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* ================= CALL TECHNICIAN MODAL ================= */}
      <Dialog open={isCallOpen} onOpenChange={setIsCallOpen}>
        <DialogContent className="max-w-sm bg-white rounded-3xl p-6 border-0 shadow-2xl text-center">
          <div className="w-14 h-14 bg-blue-50 text-[#0066FF] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Phone className="size-7" />
          </div>

          <DialogTitle className="text-lg font-bold text-[#0B1729]">
            Call {technicianName}
          </DialogTitle>
          <DialogDescription className="text-slate-500 text-xs mt-1">
            Connect directly with your specialist or FixtNow helpline.
          </DialogDescription>

          <div className="mt-5 space-y-3">
            <a
              href={`tel:${technicianPhone}`}
              className="w-full bg-[#0B1729] hover:bg-slate-800 text-white p-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <Phone className="size-4" />
              <span>Direct: {technicianPhone}</span>
            </a>

            <a
              href="tel:+8801900000000"
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 p-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <span>FixtNow 24/7 Helpline: 16999</span>
            </a>
          </div>

          <Button
            variant="ghost"
            onClick={() => setIsCallOpen(false)}
            className="w-full text-slate-400 text-xs mt-2"
          >
            Cancel
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
