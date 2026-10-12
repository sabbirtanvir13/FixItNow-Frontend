"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Star,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Phone,
  MessageSquare,
  SlidersHorizontal,
  Search,
  ArrowRight,
  BadgeCheck,
  Check,
  Calendar,
  Lock,
  Loader2,
  X,
  RotateCcw,
  User,
  Wrench,
  ThumbsUp,
  Layers
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
import { createBookingAction } from "../_action/technicianAction";

interface Category {
  id?: string;
  _id?: string;
  name: string;
}

interface TechniciansViewProps {
  initialTechnicians: any[];
  categories: Category[];
  initialUser: any | null;
  initialQuery: {
    search?: string;
    category?: string;
    location?: string;
    rating?: string;
    experience?: string;
    sort?: string;
    page?: string;
  };
}

// Fallback diverse avatar list for technicians without custom profile photos
const FALLBACK_AVATARS = [
  "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
];

export function TechniciansView({
  initialTechnicians,
  categories,
  initialUser,
  initialQuery,
}: TechniciansViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. Search Bar States (Hero)
  const [searchTerm, setSearchTerm] = useState<string>(initialQuery.search || "");
  const [selectedLocation, setSelectedLocation] = useState<string>(initialQuery.location || "");
  const [selectedCategory, setSelectedCategory] = useState<string>(initialQuery.category || "");

  // 2. Sidebar Filters States
  const [selectedCatFilter, setSelectedCatFilter] = useState<string>(initialQuery.category || "All Categories");
  const [priceRange, setPriceRange] = useState<number>(5000);
  const [selectedRating, setSelectedRating] = useState<number | null>(
    initialQuery.rating ? Number(initialQuery.rating) : null
  );
  const [selectedExperience, setSelectedExperience] = useState<number | null>(
    initialQuery.experience ? Number(initialQuery.experience) : null
  );
  const [availabilityToday, setAvailabilityToday] = useState<boolean>(false);
  const [availabilityTomorrow, setAvailabilityTomorrow] = useState<boolean>(false);

  // 3. Sorting & Pagination States
  const [sortBy, setSortBy] = useState<string>(initialQuery.sort || "highest-rated");
  const [currentPage, setCurrentPage] = useState<number>(
    initialQuery.page ? Math.max(1, parseInt(initialQuery.page, 10)) : 1
  );
  const itemsPerPage = 6;

  // 4. Mobile Filter Drawer
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState<boolean>(false);

  // 5. Booking Modal State
  const [bookingTech, setBookingTech] = useState<any | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingDate, setBookingDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split("T")[0]
  );
  const [bookingSlot, setBookingSlot] = useState<string>("09:00 AM");
  const [selectedServiceId, setSelectedServiceId] = useState<string>("");
  const [customerName, setCustomerName] = useState<string>(initialUser?.name || "");
  const [customerPhone, setCustomerPhone] = useState<string>(
    initialUser?.phone || initialUser?.phoneNumber || ""
  );
  const [customerNotes, setCustomerNotes] = useState<string>("");
  const [isSubmittingBooking, setIsSubmittingBooking] = useState<boolean>(false);
  const [bookingSuccessData, setBookingSuccessData] = useState<any | null>(null);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState<boolean>(false);

  // Locations list for filter dropdown
  const locationOptions = [
    "All Locations",
    "Dhaka, Bangladesh",
    "Khulna, Bangladesh",
    "Chattogram, Bangladesh",
    "Uttara, Dhaka",
    "Mirpur, Dhaka",
    "Dhanmondi, Dhaka",
  ];

  // Quick categories for top pills
  const quickCategories = [
    "All Categories",
    "Appliance Repair",
    "Electrical",
    "Plumbing",
    "Cleaning",
    "Car Repair",
  ];

  // Experience options
  const experienceOptions = [
    { label: "1+ Years", value: 1 },
    { label: "3+ Years", value: 3 },
    { label: "5+ Years", value: 5 },
    { label: "10+ Years", value: 10 },
  ];

  // Rating pill options
  const ratingPillOptions = [
    { label: "★ 4.0+", value: 4.0 },
    { label: "★ 4.5+", value: 4.5 },
    { label: "★ 5.0", value: 5.0 },
  ];

  // Time slot options for booking
  const timeSlotOptions = [
    "09:00 AM",
    "11:00 AM",
    "01:00 PM",
    "03:00 PM",
    "05:00 PM",
    "07:00 PM",
  ];

  // Helper to calculate rating
  const getRating = (tech: any): number => {
    if (tech.reviews && tech.reviews.length > 0) {
      const sum = tech.reviews.reduce((acc: number, r: any) => acc + (r.rating || 0), 0);
      return parseFloat((sum / tech.reviews.length).toFixed(1));
    }
    return 4.8;
  };

  // Helper to calculate price
  const getTechPrice = (tech: any): number => {
    return (
      tech.hourly_rate ??
      tech.services?.[0]?.price ??
      tech.startingPrice ??
      2000
    );
  };

  // Helper to resolve clean avatar
  const getTechAvatar = (tech: any, index: number): string => {
    const photo = tech.profilePhoto || tech.profileImage;
    if (photo && (photo.startsWith("http://") || photo.startsWith("https://"))) {
      return photo;
    }
    return FALLBACK_AVATARS[index % FALLBACK_AVATARS.length];
  };

  // Helper to extract profession/specialist title
  const getProfession = (tech: any): string => {
    if (tech.skills && tech.skills.length > 0 && tech.skills[0] !== "a") {
      return `${tech.skills[0]} Specialist`;
    }
    if (tech.services && tech.services.length > 0) {
      return `${tech.services[0].title || tech.services[0].category?.name} Expert`;
    }
    return tech.profession || "Certified Home Specialist";
  };

  // Filter & Search Logic
  const filteredTechnicians = useMemo(() => {
    let result = [...initialTechnicians];

    // 1. Text Search (Hero search input)
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter((tech) => {
        const name = (tech.user?.name || tech.name || "").toLowerCase();
        const bio = (tech.bio || "").toLowerCase();
        const loc = (tech.location || "").toLowerCase();
        const skillsMatch = (tech.skills || []).some((s: string) =>
          s.toLowerCase().includes(term)
        );
        const servicesMatch = (tech.services || []).some(
          (s: any) =>
            s.title?.toLowerCase().includes(term) ||
            s.category?.name?.toLowerCase().includes(term)
        );
        return (
          name.includes(term) ||
          bio.includes(term) ||
          loc.includes(term) ||
          skillsMatch ||
          servicesMatch
        );
      });
    }

    // 2. Category Filter (Hero dropdown & Sidebar & Quick Pills)
    const activeCategory =
      selectedCatFilter !== "All Categories"
        ? selectedCatFilter
        : selectedCategory && selectedCategory !== "All Categories"
        ? selectedCategory
        : "";

    if (activeCategory) {
      const catLower = activeCategory.toLowerCase();
      result = result.filter((tech) => {
        const skillsMatch = (tech.skills || []).some((s: string) =>
          s.toLowerCase().includes(catLower)
        );
        const servicesMatch = (tech.services || []).some(
          (s: any) =>
            s.category?.name?.toLowerCase().includes(catLower) ||
            s.title?.toLowerCase().includes(catLower)
        );
        const bioMatch = (tech.bio || "").toLowerCase().includes(catLower);
        return skillsMatch || servicesMatch || bioMatch;
      });
    }

    // 3. Location Filter
    if (selectedLocation && selectedLocation !== "All Locations") {
      const locClean = selectedLocation.split(",")[0].toLowerCase().trim();
      result = result.filter((tech) =>
        (tech.location || "").toLowerCase().includes(locClean)
      );
    }

    // 4. Price Range Filter
    if (priceRange < 5000) {
      result = result.filter((tech) => getTechPrice(tech) <= priceRange);
    }

    // 5. Rating Filter
    if (selectedRating !== null) {
      result = result.filter((tech) => getRating(tech) >= selectedRating);
    }

    // 6. Experience Filter
    if (selectedExperience !== null) {
      result = result.filter((tech) => {
        const exp = tech.experience_years ?? tech.experience ?? 0;
        return Number(exp) >= selectedExperience;
      });
    }

    // 7. Sorting
    if (sortBy === "highest-rated") {
      result.sort((a, b) => getRating(b) - getRating(a));
    } else if (sortBy === "lowest-price") {
      result.sort((a, b) => getTechPrice(a) - getTechPrice(b));
    } else if (sortBy === "highest-experience") {
      result.sort((a, b) => {
        const expA = a.experience_years ?? a.experience ?? 0;
        const expB = b.experience_years ?? b.experience ?? 0;
        return expB - expA;
      });
    } else if (sortBy === "most-popular") {
      result.sort((a, b) => {
        const revA = a.total_reviews ?? a.reviews?.length ?? 0;
        const revB = b.total_reviews ?? b.reviews?.length ?? 0;
        return revB - revA;
      });
    }

    return result;
  }, [
    initialTechnicians,
    searchTerm,
    selectedCategory,
    selectedCatFilter,
    selectedLocation,
    priceRange,
    selectedRating,
    selectedExperience,
    sortBy,
  ]);

  // Pagination calculation
  const totalResults = filteredTechnicians.length;
  const totalPages = Math.ceil(totalResults / itemsPerPage) || 1;
  const paginatedTechnicians = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTechnicians.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTechnicians, currentPage, itemsPerPage]);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedLocation("");
    setSelectedCategory("");
    setSelectedCatFilter("All Categories");
    setPriceRange(5000);
    setSelectedRating(null);
    setSelectedExperience(null);
    setAvailabilityToday(false);
    setAvailabilityTomorrow(false);
    setSortBy("highest-rated");
    setCurrentPage(1);
    toast.info("Filters reset to default.");
  };

  // Open Direct Booking Modal
  const handleOpenBooking = (tech: any) => {
    setBookingTech(tech);
    const services = tech.services || [];
    if (services.length > 0) {
      setSelectedServiceId(services[0].id || services[0]._id || "");
    } else {
      setSelectedServiceId("general");
    }
    setIsBookingOpen(true);
  };

  // Submit Direct Booking
  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    if (!customerPhone.trim()) {
      toast.error("Please provide your phone number.");
      return;
    }

    if (!bookingDate) {
      toast.error("Please select an appointment date.");
      return;
    }

    setIsSubmittingBooking(true);

    try {
      // Find actual service ID from technician or fallback
      const validServiceId =
        bookingTech?.services?.[0]?.id ||
        (selectedServiceId !== "general" ? selectedServiceId : null);

      if (!validServiceId) {
        toast.error("This technician has no bookable service attached. Please view their full profile.");
        setIsSubmittingBooking(false);
        return;
      }

      const payload = {
        service_id: validServiceId,
        booking_date: bookingDate,
        start_time: bookingSlot,
        end_time: "11:00 AM",
        notes: `Customer: ${customerName}, Phone: ${customerPhone}. ${customerNotes}`.trim(),
      };

      const result = await createBookingAction(payload);

      if (result.requiresLogin) {
        toast.info("Please sign in to finalize your booking.");
        router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
        return;
      }

      if (result.success && result.data) {
        setBookingSuccessData(result.data);
        setIsBookingOpen(false);
        setIsSuccessDialogOpen(true);
        toast.success("Technician booked successfully!");
      } else {
        toast.error(result.message || "Failed to reserve appointment. Please try again.");
      }
    } catch (err: any) {
      console.error("Booking error:", err);
      toast.error("An error occurred during booking. Please try again.");
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#0B1729] antialiased">
      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-white border-b border-slate-200/80 overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              {/* Floating Verified Trust Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold">
                <ShieldCheck className="size-4 text-emerald-600" />
                <span>Verified Experts • Background Checked</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1729] tracking-tight leading-tight">
                Find <span className="text-[#FF6B00]">Trusted</span> Technicians
              </h1>

              {/* Subtitle */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                Browse verified professionals, compare ratings, experience and pricing,
                then book the right expert for your home service.
              </p>
            </div>

            {/* Right Hero Graphic */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm sm:max-w-md h-56 sm:h-64 rounded-3xl overflow-hidden bg-slate-100 shadow-xl border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop"
                  alt="Verified FixtNow Technicians"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1729]/80 via-transparent to-transparent pointer-events-none" />

                {/* Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
                    <ThumbsUp className="size-3.5 text-[#FF6B00]" />
                    <span className="font-bold">100% Trusted • 5,000+ Bookings</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= HERO SEARCH & FILTER BAR ================= */}
          <div className="mt-8 bg-white rounded-2xl p-2.5 sm:p-3 shadow-lg shadow-slate-200/50 border border-slate-200/80">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 items-center">
              {/* Search by Name/Skill */}
              <div className="md:col-span-5 relative flex items-center">
                <Search className="absolute left-3.5 size-4 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search by name, skill or service..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-[#0B1729] focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 text-slate-400 hover:text-slate-600"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
              </div>

              {/* Location Select */}
              <div className="md:col-span-3 relative flex items-center">
                <MapPin className="absolute left-3.5 size-4 text-slate-400 pointer-events-none" />
                <select
                  value={selectedLocation}
                  onChange={(e) => {
                    setSelectedLocation(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-[#0B1729] appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] transition-all"
                >
                  <option value="">Your Location</option>
                  {locationOptions.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 size-3.5 text-slate-400 pointer-events-none" />
              </div>

              {/* Category Select */}
              <div className="md:col-span-3 relative flex items-center">
                <Layers className="absolute left-3.5 size-4 text-slate-400 pointer-events-none" />
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setSelectedCatFilter(e.target.value || "All Categories");
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-[#0B1729] appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] transition-all"
                >
                  <option value="">All Categories</option>
                  {categories.map((c) => (
                    <option key={c.id || c._id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 size-3.5 text-slate-400 pointer-events-none" />
              </div>

              {/* Search Button */}
              <div className="md:col-span-1">
                <Button
                  onClick={() => setCurrentPage(1)}
                  className="w-full bg-[#FF6B00] hover:bg-[#e05e00] text-white py-2.5 h-auto rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-orange-500/20"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MAIN CONTENT (SIDEBAR + GRID) ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ================= LEFT SIDEBAR (DESKTOP) ================= */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-6 sticky top-6">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-[#FF6B00] rounded-full inline-block" />
                  <h3 className="font-extrabold text-[#0B1729] text-base">Filters</h3>
                </div>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs font-semibold text-[#FF6B00] hover:underline"
                >
                  Reset
                </button>
              </div>

              {/* 1. Service Category */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#0B1729] uppercase tracking-wider">
                  Service Category
                </h4>
                <div className="space-y-2">
                  {quickCategories.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-2.5 text-xs font-medium text-slate-700 cursor-pointer hover:text-[#0B1729] transition-colors"
                    >
                      <input
                        type="radio"
                        name="categoryFilter"
                        checked={selectedCatFilter === cat}
                        onChange={() => {
                          setSelectedCatFilter(cat);
                          setSelectedCategory(cat === "All Categories" ? "" : cat);
                          setCurrentPage(1);
                        }}
                        className="rounded-full text-[#FF6B00] focus:ring-[#FF6B00] size-4 accent-[#FF6B00]"
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 2. Price Range */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex justify-between items-center text-xs font-bold text-[#0B1729] uppercase tracking-wider">
                  <span>Price Range</span>
                  <span className="text-[#FF6B00] font-bold">
                    ৳100 - ৳{priceRange}
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="5000"
                  step="100"
                  value={priceRange}
                  onChange={(e) => {
                    setPriceRange(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="w-full accent-[#FF6B00] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-semibold">
                  <span>৳ 100</span>
                  <span>৳ 5000+</span>
                </div>
              </div>

              {/* 3. Rating */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <h4 className="text-xs font-bold text-[#0B1729] uppercase tracking-wider">
                  Rating
                </h4>
                <div className="flex gap-2">
                  {ratingPillOptions.map((r) => {
                    const isSelected = selectedRating === r.value;
                    return (
                      <button
                        key={r.value}
                        type="button"
                        onClick={() => {
                          setSelectedRating(isSelected ? null : r.value);
                          setCurrentPage(1);
                        }}
                        className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all border ${
                          isSelected
                            ? "bg-orange-50 border-[#FF6B00] text-[#FF6B00]"
                            : "bg-[#F8FAFC] border-slate-200 text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        {r.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Experience */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <h4 className="text-xs font-bold text-[#0B1729] uppercase tracking-wider">
                  Experience
                </h4>
                <div className="space-y-2">
                  {experienceOptions.map((exp) => (
                    <label
                      key={exp.value}
                      className="flex items-center gap-2.5 text-xs font-medium text-slate-700 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="expFilter"
                        checked={selectedExperience === exp.value}
                        onChange={() => {
                          setSelectedExperience(exp.value);
                          setCurrentPage(1);
                        }}
                        className="rounded-full text-[#FF6B00] focus:ring-[#FF6B00] size-4 accent-[#FF6B00]"
                      />
                      <span>{exp.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 5. Availability */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <h4 className="text-xs font-bold text-[#0B1729] uppercase tracking-wider">
                  Availability
                </h4>
                <div className="space-y-2 text-xs">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={availabilityToday}
                      onChange={(e) => setAvailabilityToday(e.target.checked)}
                      className="rounded text-[#FF6B00] focus:ring-[#FF6B00] size-4 accent-[#FF6B00]"
                    />
                    <span className="font-medium text-slate-700">Available Today</span>
                  </label>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={availabilityTomorrow}
                      onChange={(e) => setAvailabilityTomorrow(e.target.checked)}
                      className="rounded text-[#FF6B00] focus:ring-[#FF6B00] size-4 accent-[#FF6B00]"
                    />
                    <span className="font-medium text-slate-700">Available Tomorrow</span>
                  </label>
                </div>
              </div>

              {/* Apply Filters Button */}
              <Button
                type="button"
                onClick={() => {
                  toast.success("Filters applied successfully.");
                }}
                className="w-full bg-[#FF6B00] hover:bg-[#e05e00] text-white py-3 h-auto rounded-xl font-bold text-xs"
              >
                Apply Filters
              </Button>
            </div>
          </aside>

          {/* ================= RIGHT MAIN AREA (GRID + HEADER) ================= */}
          <main className="lg:col-span-9 space-y-6">
            {/* Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
              <div>
                <h2 className="text-2xl font-black text-[#0B1729] tracking-tight">
                  Available Technicians
                </h2>
                <span className="text-xs font-semibold text-slate-500">
                  {totalResults} Results Found
                </span>
              </div>

              {/* Sorting & Mobile Filter Toggle */}
              <div className="flex items-center gap-3">
                {/* Mobile Filter Toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsMobileFiltersOpen(true)}
                  className="lg:hidden text-xs font-bold rounded-xl border-slate-200"
                >
                  <SlidersHorizontal className="size-3.5 mr-1.5" />
                  Filters
                </Button>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <span className="hidden sm:inline">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-[#0B1729] focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] cursor-pointer"
                  >
                    <option value="highest-rated">Highest Rated</option>
                    <option value="lowest-price">Lowest Price</option>
                    <option value="highest-experience">Highest Experience</option>
                    <option value="most-popular">Most Popular</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Quick Horizontal Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {quickCategories.map((cat) => {
                const isSelected = selectedCatFilter === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setSelectedCatFilter(cat);
                      setSelectedCategory(cat === "All Categories" ? "" : cat);
                      setCurrentPage(1);
                    }}
                    className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                      isSelected
                        ? "bg-[#0B1729] border-[#0B1729] text-white shadow-sm"
                        : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Empty State */}
            {filteredTechnicians.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm space-y-4">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
                  <Search className="size-8" />
                </div>
                <h3 className="text-xl font-bold text-[#0B1729]">
                  No Technicians Found
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                  We couldn't find any professionals matching your exact filters. Try
                  loosening your criteria or resetting filters.
                </p>
                <Button
                  onClick={handleResetFilters}
                  className="bg-[#0B1729] hover:bg-[#FF6B00] text-white text-xs font-bold rounded-xl px-5"
                >
                  <RotateCcw className="size-3.5 mr-1.5" />
                  Reset All Filters
                </Button>
              </div>
            ) : (
              /* TECHNICIANS 3-COLUMN CARD GRID */
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedTechnicians.map((tech, idx) => {
                  const techId = tech.id || tech._id;
                  const name = tech.user?.name || tech.name || "Technician";
                  const profession = getProfession(tech);
                  const location = tech.location || "Dhaka, Bangladesh";
                  const rating = getRating(tech);
                  const totalReviews = tech.total_reviews ?? tech.reviews?.length ?? 128;
                  const exp = tech.experience_years ?? tech.experience ?? 5;
                  const price = getTechPrice(tech);
                  const avatar = getTechAvatar(tech, idx);
                  const skills =
                    tech.skills && tech.skills.length > 0
                      ? tech.skills.slice(0, 3)
                      : ["Diagnosis", "Repair", "Maintenance"];

                  return (
                    <div
                      key={techId || idx}
                      className="bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                    >
                      {/* Top Header & Photo Banner */}
                      <div className="relative w-full h-48 bg-slate-100 overflow-hidden">
                        <Image
                          src={avatar}
                          alt={name}
                          fill
                          sizes="(max-width: 768px) 100vw, 350px"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                        {/* Top-Left Verified Badge */}
                        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-emerald-600 text-[11px] font-bold flex items-center gap-1 shadow-sm">
                          <CheckCircle2 className="size-3.5 stroke-[2.5]" />
                          <span>Verified</span>
                        </div>

                        {/* Top-Right Price Badge */}
                        <div className="absolute top-3 right-3 bg-[#0B1729]/90 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[11px] font-bold shadow-sm">
                          ৳{price}/hr
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-1.5">
                          {/* Name + Verified Check */}
                          <div className="flex items-center gap-1.5">
                            <h3 className="text-base font-extrabold text-[#0B1729] group-hover:text-[#FF6B00] transition-colors truncate">
                              {name}
                            </h3>
                            <BadgeCheck className="size-4 text-blue-500 shrink-0" />
                          </div>

                          {/* Profession */}
                          <p className="text-xs font-semibold text-slate-500 line-clamp-1">
                            {profession}
                          </p>

                          {/* Location */}
                          <div className="flex items-center gap-1 text-xs text-slate-500 pt-0.5">
                            <MapPin className="size-3 text-[#FF6B00] shrink-0" />
                            <span className="truncate">{location}</span>
                          </div>

                          {/* Rating & Experience */}
                          <div className="flex items-center gap-3 pt-2 text-xs font-semibold text-slate-500">
                            <span className="flex items-center gap-1 text-[#FF6B00]">
                              <Star className="size-3.5 fill-[#FF6B00]" />
                              {rating} ({totalReviews})
                            </span>
                            <span>•</span>
                            <span className="text-slate-600">
                              {exp} Years Exp.
                            </span>
                          </div>

                          {/* Skill Tags */}
                          <div className="flex flex-wrap gap-1.5 pt-3">
                            {skills.map((skill: string, sIdx: number) => (
                              <span
                                key={sIdx}
                                className="bg-[#F8FAFC] text-slate-600 text-[11px] font-semibold px-2 py-0.5 rounded-md border border-slate-200/80"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Actions (View Profile & Book Now) */}
                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                          <Link
                            href={`/technicians/${techId}`}
                            className="w-full bg-[#0B1729] hover:bg-slate-800 text-white text-center py-2.5 rounded-xl font-bold text-xs transition-colors"
                          >
                            View Profile
                          </Link>

                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleOpenBooking(tech)}
                            className="w-full border-[#FF6B00] text-[#FF6B00] hover:bg-orange-50 font-bold text-xs py-2.5 h-auto rounded-xl"
                          >
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ================= PAGINATION CONTROLS ================= */}
            {totalPages > 1 && (
              <div className="pt-8 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage <= 1}
                  onClick={() => {
                    setCurrentPage((p) => Math.max(1, p - 1));
                    window.scrollTo({ top: 300, behavior: "smooth" });
                  }}
                  className="rounded-xl text-xs font-bold"
                >
                  &lt;
                </Button>

                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pageNum = idx + 1;
                  const isCurrent = currentPage === pageNum;
                  return (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => {
                        setCurrentPage(pageNum);
                        window.scrollTo({ top: 300, behavior: "smooth" });
                      }}
                      className={`size-8 rounded-xl text-xs font-bold transition-all ${
                        isCurrent
                          ? "bg-[#FF6B00] text-white shadow-md shadow-orange-500/20"
                          : "bg-white border border-slate-200 text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage >= totalPages}
                  onClick={() => {
                    setCurrentPage((p) => Math.min(totalPages, p + 1));
                    window.scrollTo({ top: 300, behavior: "smooth" });
                  }}
                  className="rounded-xl text-xs font-bold"
                >
                  &gt;
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ================= DIRECT BOOKING MODAL ================= */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="max-w-md bg-white rounded-3xl p-6 sm:p-7 border-0 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-[#0B1729] flex items-center gap-2">
              <Calendar className="size-5 text-[#FF6B00]" />
              Book {bookingTech?.user?.name || bookingTech?.name || "Technician"}
            </DialogTitle>
            <DialogDescription className="text-slate-500 text-xs">
              Reserve an exclusive appointment with our verified specialist.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleConfirmBooking} className="space-y-4 pt-2">
            {/* Service selector if multiple services exist */}
            {bookingTech?.services && bookingTech.services.length > 0 && (
              <div>
                <label className="block text-xs font-bold text-[#0B1729] uppercase mb-1">
                  Service
                </label>
                <select
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-[#0B1729]"
                >
                  {bookingTech.services.map((s: any) => (
                    <option key={s.id || s._id} value={s.id || s._id}>
                      {s.title} — ৳{s.price}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Date & Time Slot */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#0B1729] uppercase mb-1">
                  Date
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-[#0B1729]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0B1729] uppercase mb-1">
                  Time Slot
                </label>
                <select
                  value={bookingSlot}
                  onChange={(e) => setBookingSlot(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-[#0B1729]"
                >
                  {timeSlotOptions.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Customer Details */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#0B1729] uppercase">
                Your Contact Information
              </label>
              <Input
                placeholder="Full Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                className="text-xs bg-slate-50"
              />
              <Input
                placeholder="Phone Number (e.g. 017XXXXXXXX)"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                required
                className="text-xs bg-slate-50"
              />
              <Textarea
                placeholder="Address & special instructions (Optional)"
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                rows={2}
                className="text-xs bg-slate-50 resize-none"
              />
            </div>

            {/* Confirm Button */}
            <Button
              type="submit"
              disabled={isSubmittingBooking}
              className="w-full bg-[#FF6B00] hover:bg-[#e05e00] text-white py-3 h-auto rounded-xl font-bold text-xs shadow-md shadow-orange-500/25"
            >
              {isSubmittingBooking ? (
                <>
                  <Loader2 className="size-4 animate-spin mr-1.5" />
                  Confirming Booking...
                </>
              ) : (
                <>
                  <Lock className="size-3.5 mr-1.5" />
                  Confirm Appointment
                </>
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* ================= BOOKING SUCCESS CONFIRMATION MODAL ================= */}
      <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
        <DialogContent className="max-w-md bg-white rounded-3xl p-6 sm:p-8 border-0 shadow-2xl text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto ring-8 ring-emerald-50/50">
            <CheckCircle2 className="w-9 h-9 stroke-[2]" />
          </div>

          <DialogTitle className="text-2xl font-black text-[#0B1729]">
            Booking Confirmed!
          </DialogTitle>
          <DialogDescription className="text-slate-500 text-xs sm:text-sm">
            Your appointment request has been reserved in our system.
          </DialogDescription>

          <div className="bg-[#F8FAFC] rounded-2xl p-4 text-left border border-slate-200/60 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Booking ID</span>
              <span className="font-mono font-bold text-[#0B1729]">
                {bookingSuccessData?.id?.slice(0, 8).toUpperCase() || "FXN-8901"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Date & Time</span>
              <span className="font-bold text-[#FF6B00]">
                {bookingDate} • {bookingSlot}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Technician</span>
              <span className="font-bold text-[#0B1729]">
                {bookingTech?.user?.name || bookingTech?.name || "Technician"}
              </span>
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <Link
              href="/dashboard/customer/bookings"
              className="w-full bg-[#0B1729] hover:bg-slate-800 text-white py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2"
            >
              <span>View in Customer Dashboard</span>
              <ArrowRight className="size-4" />
            </Link>

            <Button
              variant="ghost"
              onClick={() => setIsSuccessDialogOpen(false)}
              className="w-full text-slate-500 text-xs"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
