"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  User,
  MapPin,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  RefreshCw,
  Star,
  Activity,
  ChevronRight,
} from "lucide-react";
import { getCustomerBookings } from "./_action/bookingActions";
import { getMyReviews } from "./_action/reviewActions";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { AnalyticsCard } from "@/components/dashboard/AnalyticsCard";
import {
  RevenueChart,
  BookingStatusChart,
  ServiceCategoryChart,
} from "@/components/dashboard/Charts";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";

interface Booking {
  id: string;
  bookingStatus?: string;
  status?: string;
  booking_date?: string;
  bookingDate?: string;
  created_at?: string;
  price?: number;
  totalPrice?: number;
  timeSlot?: string;
  start_time?: string;
  location?: string;
  paymentStatus?: string;
  payment?: { status?: string; amount?: number; paid_at?: string };
  service?: { title?: string; price?: number; category?: { name?: string } };
  technician?: {
    name?: string;
    user?: { name?: string };
  };
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
}

export default function CustomerDashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [bookingRes, reviewRes] = await Promise.all([
        getCustomerBookings(),
        getMyReviews(),
      ]);

      if (bookingRes.success) {
        setBookings(bookingRes.data || []);
      } else {
        setError(bookingRes.message || "Failed to load bookings");
      }

      if (reviewRes.success) {
        setReviews(reviewRes.data || []);
      }
    } catch (err: any) {
      console.error("Dashboard fetch error:", err);
      setError(err.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  // --- STATS CALCULATIONS ---
  const totalBookingsCount = bookings.length;

  const completedCount = bookings.filter((b) => {
    const st = (b.bookingStatus || b.status || "").toUpperCase();
    return st === "COMPLETED";
  }).length;

  const pendingCount = bookings.filter((b) => {
    const st = (b.bookingStatus || b.status || "").toUpperCase();
    return ["REQUESTED", "ACCEPTED", "PAID", "IN_PROGRESS", "PENDING"].includes(st);
  }).length;

  const cancelledCount = bookings.filter((b) => {
    const st = (b.bookingStatus || b.status || "").toUpperCase();
    return ["CANCELLED", "DECLINED"].includes(st);
  }).length;

  // Calculate Total Spent (Sum of completed/paid bookings)
  const totalSpent = bookings.reduce((sum, b) => {
    const st = (b.bookingStatus || b.status || "").toUpperCase();
    const paySt = (b.paymentStatus || b.payment?.status || "").toUpperCase();
    if (st === "COMPLETED" || paySt === "COMPLETED" || st === "PAID") {
      const amount = b.totalPrice || b.price || b.service?.price || b.payment?.amount || 0;
      return sum + Number(amount);
    }
    return sum;
  }, 0);

  // --- ANALYTICS DATA PREPARATION ---

  // 1. Monthly Spending Analytics (Last 6 months)
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const now = new Date();
  const spendingMap: Record<string, number> = {};

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = `${monthNames[d.getMonth()]}`;
    spendingMap[label] = 0;
  }

  bookings.forEach((b) => {
    const dateStr = b.created_at || b.booking_date || b.bookingDate;
    if (dateStr) {
      const d = new Date(dateStr);
      const label = `${monthNames[d.getMonth()]}`;
      if (spendingMap[label] !== undefined) {
        const amount = b.totalPrice || b.price || b.service?.price || 0;
        spendingMap[label] += Number(amount);
      }
    }
  });

  const spendingChartData = Object.keys(spendingMap).map((m) => ({
    month: m,
    amount: spendingMap[m],
  }));

  // 2. Booking Status Analytics (Donut)
  const bookingStatusData = [
    { name: "Completed", value: completedCount, color: "#10B981" },
    { name: "Pending", value: pendingCount, color: "#F59E0B" },
    { name: "Cancelled", value: cancelledCount, color: "#EF4444" },
  ];

  // 3. Category Analytics (Bar Chart)
  const categoryMap: Record<string, number> = {};
  bookings.forEach((b) => {
    const catName = b.service?.category?.name || b.service?.title || "General Maintenance";
    categoryMap[catName] = (categoryMap[catName] || 0) + 1;
  });

  const categoryChartData = Object.keys(categoryMap).map((cat) => ({
    name: cat,
    count: categoryMap[cat],
  }));

  // --- UPCOMING BOOKING ---
  const upcomingBooking = bookings.find((b) => {
    const st = (b.bookingStatus || b.status || "").toUpperCase();
    return ["REQUESTED", "ACCEPTED", "PAID", "IN_PROGRESS"].includes(st);
  });

  // --- RECENT ACTIVITY TIMELINE ---
  const activityList = [
    ...bookings.slice(0, 3).map((b) => ({
      id: `booking-${b.id}`,
      title: `Booking Request: ${b.service?.title || "Home Service"}`,
      timestamp: b.created_at || b.booking_date || b.bookingDate || new Date().toISOString(),
      type: "booking",
      status: (b.bookingStatus || b.status || "REQUESTED").toUpperCase(),
    })),
    ...reviews.slice(0, 2).map((r) => ({
      id: `review-${r.id}`,
      title: `Submitted a ${r.rating}★ review`,
      timestamp: r.created_at || new Date().toISOString(),
      type: "review",
      status: "COMPLETED",
    })),
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 font-sans">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 sm:p-8 rounded-3xl text-white shadow-xl shadow-blue-500/10">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              Customer Portal
            </span>
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back! 👋
          </h1>
          <p className="text-blue-100 text-sm max-w-xl">
            Track your home service bookings, upcoming schedules, and recent spending insights in real-time.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchData}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-semibold backdrop-blur-md transition flex items-center space-x-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
          <Link
            href="/dashboard/customer/bookings"
            className="px-5 py-2.5 bg-white text-blue-600 hover:bg-blue-50 font-bold rounded-xl text-xs shadow-md transition flex items-center space-x-2"
          >
            <span>Book New Service</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 bg-rose-50 text-rose-700 border border-rose-200 rounded-2xl flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5" />
            <span>{error}</span>
          </div>
          <button onClick={fetchData} className="underline font-semibold text-xs">
            Try again
          </button>
        </div>
      )}

      {/* STATISTICS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard
          title="Total Bookings"
          value={totalBookingsCount}
          icon={Calendar}
          change="+8% this month"
          changeType="positive"
          subtitle="All time requests"
          iconBgColor="bg-blue-50 dark:bg-blue-950/40"
          iconColor="text-blue-600 dark:text-blue-400"
          delay={0.05}
        />
        <StatsCard
          title="Completed Services"
          value={completedCount}
          icon={CheckCircle2}
          change={`${totalBookingsCount ? Math.round((completedCount / totalBookingsCount) * 100) : 0}% rate`}
          changeType="positive"
          subtitle="Successfully fulfilled"
          iconBgColor="bg-emerald-50 dark:bg-emerald-950/40"
          iconColor="text-emerald-600 dark:text-emerald-400"
          delay={0.1}
        />
        <StatsCard
          title="Pending Bookings"
          value={pendingCount}
          icon={Clock}
          change={`${pendingCount} active`}
          changeType={pendingCount > 0 ? "neutral" : "positive"}
          subtitle="In progress or waiting"
          iconBgColor="bg-amber-50 dark:bg-amber-950/40"
          iconColor="text-amber-600 dark:text-amber-400"
          delay={0.15}
        />
        <StatsCard
          title="Total Spent"
          value={`৳${totalSpent.toLocaleString()}`}
          icon={CreditCard}
          change="Completed payments"
          changeType="positive"
          subtitle="Verified transactions"
          iconBgColor="bg-purple-50 dark:bg-purple-950/40"
          iconColor="text-purple-600 dark:text-purple-400"
          delay={0.2}
        />
      </div>

      {/* ANALYTICS GRAPHS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Spending Analytics (Area Chart - 2 cols) */}
        <AnalyticsCard
          title="Spending Analytics"
          subtitle="Monthly payment expenditure for the past 6 months"
          className="lg:col-span-2"
          delay={0.25}
        >
          <RevenueChart data={spendingChartData} currencyPrefix="৳" areaColor="#3B82F6" />
        </AnalyticsCard>

        {/* Booking Status Analytics (Donut Chart - 1 col) */}
        <AnalyticsCard
          title="Booking Status"
          subtitle="Distribution by current booking status"
          delay={0.3}
        >
          <BookingStatusChart data={bookingStatusData} />
        </AnalyticsCard>
      </div>

      {/* CATEGORY ANALYTICS & UPCOMING BOOKING */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Service Category Analytics (Bar Chart - 2 cols) */}
        <AnalyticsCard
          title="Service Category Breakdown"
          subtitle="Most booked service categories"
          className="lg:col-span-2"
          delay={0.35}
        >
          <ServiceCategoryChart data={categoryChartData} barColor="#8B5CF6" />
        </AnalyticsCard>

        {/* Upcoming Booking Card (1 col) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between"
        >
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-50 dark:bg-blue-950/40 text-blue-600 rounded-lg">
                <Calendar className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Next Upcoming Service</h3>
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-full">
              Scheduled
            </span>
          </div>

          {upcomingBooking ? (
            <div className="py-4 space-y-3">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Service</span>
                <p className="text-lg font-bold text-slate-900 dark:text-white">
                  {upcomingBooking.service?.title || "Home Repair Service"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-400 pt-1">
                <div className="flex items-center space-x-2">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">
                    Tech: <strong className="text-slate-800 dark:text-slate-200">{upcomingBooking.technician?.user?.name || upcomingBooking.technician?.name || "Assigned"}</strong>
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{upcomingBooking.timeSlot || upcomingBooking.start_time || "Morning"}</span>
                </div>
                <div className="flex items-center space-x-2 col-span-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{upcomingBooking.location || "Dhaka"}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-between items-center border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs font-medium text-slate-500">Price</span>
                <span className="text-sm font-extrabold text-blue-600">
                  ৳{upcomingBooking.totalPrice || upcomingBooking.price || upcomingBooking.service?.price || 0}
                </span>
              </div>
            </div>
          ) : (
            <div className="py-10 text-center space-y-2">
              <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm text-slate-500 font-medium">No upcoming bookings scheduled.</p>
              <Link href="/dashboard/customer/bookings" className="text-xs text-blue-600 hover:underline font-semibold inline-block pt-1">
                Book a service now →
              </Link>
            </div>
          )}

          <Link
            href="/dashboard/customer/bookings"
            className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl text-center transition block mt-2"
          >
            View All Bookings
          </Link>
        </motion.div>
      </div>

      {/* RECENT BOOKINGS TABLE & TIMELINE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Booking Table (2 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45 }}
          className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Bookings</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Latest service activity & status</p>
            </div>
            <Link
              href="/dashboard/customer/bookings"
              className="text-xs font-semibold text-blue-600 hover:underline flex items-center space-x-1"
            >
              <span>See all</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {bookings.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <p className="text-sm font-medium">No bookings found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <th className="py-3 px-2">Service</th>
                    <th className="py-3 px-2">Technician</th>
                    <th className="py-3 px-2">Date</th>
                    <th className="py-3 px-2">Amount</th>
                    <th className="py-3 px-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                  {bookings.slice(0, 5).map((item) => {
                    const st = (item.bookingStatus || item.status || "REQUESTED").toUpperCase();
                    return (
                      <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
                        <td className="py-3 px-2 font-bold text-slate-900 dark:text-white">
                          {item.service?.title || "Service"}
                        </td>
                        <td className="py-3 px-2 text-slate-600 dark:text-slate-400">
                          {item.technician?.user?.name || item.technician?.name || "Pending"}
                        </td>
                        <td className="py-3 px-2 text-slate-500">
                          {item.booking_date || item.bookingDate
                            ? new Date(item.booking_date || item.bookingDate!).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td className="py-3 px-2 font-semibold text-blue-600">
                          ৳{item.totalPrice || item.price || item.service?.price || 0}
                        </td>
                        <td className="py-3 px-2 text-right">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              st === "COMPLETED"
                                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                                : st === "PAID"
                                ? "bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400"
                                : st === "CANCELLED" || st === "DECLINED"
                                ? "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400"
                                : "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
                            }`}
                          >
                            {st}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Activity Timeline (1 col) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4"
        >
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-purple-600" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Activity</h3>
          </div>

          <div className="space-y-4 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
            {activityList.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6">No recent activity logged.</p>
            ) : (
              activityList.map((act) => (
                <div key={act.id} className="flex items-start space-x-3 relative z-10 pl-1">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white font-bold ${
                      act.type === "review"
                        ? "bg-amber-500"
                        : act.status === "COMPLETED"
                        ? "bg-emerald-500"
                        : "bg-blue-500"
                    }`}
                  >
                    {act.type === "review" ? "★" : "•"}
                  </div>
                  <div className="space-y-0.5 text-xs">
                    <p className="font-bold text-slate-800 dark:text-slate-200">{act.title}</p>
                    <p className="text-[10px] text-slate-400">
                      {new Date(act.timestamp).toLocaleDateString()} at{" "}
                      {new Date(act.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
