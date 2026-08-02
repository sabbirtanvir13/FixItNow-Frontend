"use client";

import React, { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Briefcase,
  CheckCircle2,
  Clock,
  DollarSign,
  User,
  MapPin,
  Calendar,
  Star,
  Check,
  X,
  Sparkles,
  AlertTriangle,
  RefreshCw,
  Award,
  Users,
  ShieldCheck,
  ToggleLeft,
  ToggleRight,
  Loader2,
} from "lucide-react";
import { getTechnicianBookings, updateBookingStatus } from "./_action/bookingActions";
import { getAvailabilities } from "./_action/availabilityActions";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { AnalyticsCard } from "@/components/dashboard/AnalyticsCard";
import {
  RevenueChart,
  ServiceCategoryChart,
  UserGrowthChart,
} from "@/components/dashboard/Charts";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";

interface TechnicianBooking {
  id: string;
  status?: string;
  bookingStatus?: string;
  booking_date?: string;
  price?: number;
  start_time?: string;
  end_time?: string;
  location?: string;
  service?: { title?: string; price?: number; category?: { name?: string } };
  customer?: { name?: string; email?: string; phone?: string };
  user?: { name?: string; email?: string };
}

interface Availability {
  id: string;
  day_of_week?: string;
  dayOfWeek?: string;
  start_time?: string;
  end_time?: string;
  is_available?: boolean;
}

export default function TechnicianDashboardPage() {
  const [bookings, setBookings] = useState<TechnicianBooking[]>([]);
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(true);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [bookingRes, availRes] = await Promise.all([
        getTechnicianBookings(),
        getAvailabilities(),
      ]);

      if (bookingRes.success) {
        setBookings(bookingRes.data || []);
      } else {
        setError(bookingRes.message || "Failed to load technician bookings");
      }

      if (availRes.success) {
        setAvailabilities(availRes.data || []);
      }
    } catch (err: any) {
      console.error("Technician dashboard error:", err);
      setError(err.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusUpdate = async (bookingId: string, newStatus: string) => {
    setActionMessage(null);
    startTransition(async () => {
      const res = await updateBookingStatus(bookingId, newStatus);
      if (res.success) {
        setActionMessage(`Booking ${newStatus.toLowerCase()} successfully!`);
        setBookings((prev) =>
          prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus, bookingStatus: newStatus } : b))
        );
      } else {
        setError(res.message || "Failed to update booking status");
      }
    });
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  // --- STATS CALCULATIONS ---
  const totalJobsCount = bookings.length;

  const completedJobsCount = bookings.filter((b) => {
    const st = (b.status || b.bookingStatus || "").toUpperCase();
    return st === "COMPLETED";
  }).length;

  const pendingRequestsCount = bookings.filter((b) => {
    const st = (b.status || b.bookingStatus || "").toUpperCase();
    return ["REQUESTED", "PENDING", "ACCEPTED"].includes(st);
  }).length;

  const cancelledCount = bookings.filter((b) => {
    const st = (b.status || b.bookingStatus || "").toUpperCase();
    return ["CANCELLED", "DECLINED"].includes(st);
  }).length;

  const totalEarnings = bookings.reduce((sum, b) => {
    const st = (b.status || b.bookingStatus || "").toUpperCase();
    if (st === "COMPLETED" || st === "PAID") {
      const price = b.price || b.service?.price || 0;
      return sum + Number(price);
    }
    return sum;
  }, 0);

  const completionRate = totalJobsCount
    ? Math.round((completedJobsCount / totalJobsCount) * 100)
    : 100;

  // --- ANALYTICS DATA ---

  // 1. Monthly Earnings (Last 6 Months)
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const now = new Date();
  const earningsMap: Record<string, number> = {};

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = `${monthNames[d.getMonth()]}`;
    earningsMap[label] = 0;
  }

  bookings.forEach((b) => {
    const st = (b.status || b.bookingStatus || "").toUpperCase();
    if (st === "COMPLETED" || st === "PAID") {
      const dateStr = b.booking_date || new Date().toISOString();
      const d = new Date(dateStr);
      const label = `${monthNames[d.getMonth()]}`;
      if (earningsMap[label] !== undefined) {
        const price = b.price || b.service?.price || 0;
        earningsMap[label] += Number(price);
      }
    }
  });

  const earningsChartData = Object.keys(earningsMap).map((m) => ({
    month: m,
    amount: earningsMap[m],
  }));

  // 2. Job Performance (Bar Chart: Completed, Pending, Cancelled)
  const jobPerformanceData = [
    { name: "Completed", count: completedJobsCount },
    { name: "Pending", count: pendingRequestsCount },
    { name: "Cancelled", count: cancelledCount },
  ];

  // 3. Rating Trend (Line Chart)
  const ratingTrendData = [
    { month: "Jan", users: 4.5 },
    { month: "Feb", users: 4.7 },
    { month: "Mar", users: 4.6 },
    { month: "Apr", users: 4.8 },
    { month: "May", users: 4.9 },
    { month: "Jun", users: 5.0 },
  ];

  // --- PENDING REQUESTS LIST ---
  const pendingRequests = bookings.filter((b) => {
    const st = (b.status || b.bookingStatus || "").toUpperCase();
    return st === "REQUESTED" || st === "PENDING";
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 font-sans">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-6 sm:p-8 rounded-3xl text-white shadow-xl shadow-teal-500/10">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              Technician Portal
            </span>
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome, Professional! 🛠️
          </h1>
          <p className="text-emerald-100 text-sm max-w-xl">
            Manage your service requests, earnings, schedule availability, and customer satisfaction metrics.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={loadData}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-semibold backdrop-blur-md transition flex items-center space-x-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center space-x-2 shadow-md ${
              isOnline ? "bg-white text-emerald-700" : "bg-slate-900 text-white"
            }`}
          >
            {isOnline ? <ToggleRight className="w-4 h-4 text-emerald-600" /> : <ToggleLeft className="w-4 h-4 text-slate-400" />}
            <span>{isOnline ? "Status: Online" : "Status: Offline"}</span>
          </button>
        </div>
      </div>

      {/* Alert Messages */}
      {actionMessage && (
        <div className="p-4 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-2xl text-xs font-semibold flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{actionMessage}</span>
        </div>
      )}
      {error && (
        <div className="p-4 bg-rose-50 text-rose-700 border border-rose-200 rounded-2xl flex items-center justify-between text-xs font-medium">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4" />
            <span>{error}</span>
          </div>
          <button onClick={loadData} className="underline font-semibold">
            Retry
          </button>
        </div>
      )}

      {/* STATISTICS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard
          title="Total Assigned Jobs"
          value={totalJobsCount}
          icon={Briefcase}
          change="+14% this month"
          changeType="positive"
          subtitle="All time requests"
          iconBgColor="bg-blue-50 dark:bg-blue-950/40"
          iconColor="text-blue-600 dark:text-blue-400"
          delay={0.05}
        />
        <StatsCard
          title="Completed Jobs"
          value={completedJobsCount}
          icon={CheckCircle2}
          change={`${completionRate}% completion rate`}
          changeType="positive"
          subtitle="Fulfilled tasks"
          iconBgColor="bg-emerald-50 dark:bg-emerald-950/40"
          iconColor="text-emerald-600 dark:text-emerald-400"
          delay={0.1}
        />
        <StatsCard
          title="Pending Requests"
          value={pendingRequestsCount}
          icon={Clock}
          change={pendingRequestsCount > 0 ? "Requires action" : "All cleared"}
          changeType={pendingRequestsCount > 0 ? "neutral" : "positive"}
          subtitle="Awaiting response"
          iconBgColor="bg-amber-50 dark:bg-amber-950/40"
          iconColor="text-amber-600 dark:text-amber-400"
          delay={0.15}
        />
        <StatsCard
          title="Total Earnings"
          value={`৳${totalEarnings.toLocaleString()}`}
          icon={DollarSign}
          change="Payout earnings"
          changeType="positive"
          subtitle="Verified income"
          iconBgColor="bg-purple-50 dark:bg-purple-950/40"
          iconColor="text-purple-600 dark:text-purple-400"
          delay={0.2}
        />
      </div>

      {/* ANALYTICS GRAPHS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Earnings Analytics (Area Chart - 2 cols) */}
        <AnalyticsCard
          title="Earnings Analytics"
          subtitle="Monthly net earnings overview over past 6 months"
          className="lg:col-span-2"
          delay={0.25}
        >
          <RevenueChart data={earningsChartData} currencyPrefix="৳" areaColor="#10B981" />
        </AnalyticsCard>

        {/* Rating Trend (Line Chart - 1 col) */}
        <AnalyticsCard
          title="Rating Trend"
          subtitle="Monthly customer rating score"
          delay={0.3}
        >
          <UserGrowthChart data={ratingTrendData} />
        </AnalyticsCard>
      </div>

      {/* JOB PERFORMANCE & REQUESTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Job Performance Breakdown (2 cols) */}
        <AnalyticsCard
          title="Job Performance Distribution"
          subtitle="Count of completed vs pending vs cancelled jobs"
          className="lg:col-span-2"
          delay={0.35}
        >
          <ServiceCategoryChart data={jobPerformanceData} barColor="#06B6D4" />
        </AnalyticsCard>

        {/* Performance & Availability Cards (1 col) */}
        <div className="space-y-6">
          {/* Performance Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4"
          >
            <div className="flex items-center space-x-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Performance Score</h3>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center py-2">
              <div className="p-3 bg-amber-50/60 dark:bg-amber-950/20 rounded-xl space-y-1">
                <span className="text-xs text-amber-700 dark:text-amber-400 font-semibold block">Avg Rating</span>
                <span className="text-xl font-extrabold text-amber-600 flex items-center justify-center">
                  4.9 <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 ml-1" />
                </span>
              </div>
              <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/20 rounded-xl space-y-1">
                <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold block">Completion</span>
                <span className="text-xl font-extrabold text-emerald-600">{completionRate}%</span>
              </div>
              <div className="p-3 bg-blue-50/60 dark:bg-blue-950/20 rounded-xl space-y-1">
                <span className="text-xs text-blue-700 dark:text-blue-400 font-semibold block">Clients</span>
                <span className="text-xl font-extrabold text-blue-600">{completedJobsCount}</span>
              </div>
            </div>
          </motion.div>

          {/* Availability Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.45 }}
            className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-teal-600" />
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Working Schedule</h3>
              </div>
              <Link
                href="/dashboard/technician/availability"
                className="text-xs text-teal-600 hover:underline font-semibold"
              >
                Edit
              </Link>
            </div>

            {availabilities.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-4">No working schedule configured.</p>
            ) : (
              <div className="space-y-2 text-xs">
                {availabilities.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl"
                  >
                    <span className="font-bold text-slate-700 dark:text-slate-200">
                      {item.day_of_week || item.dayOfWeek}
                    </span>
                    <span className="text-slate-500 font-medium">
                      {item.start_time} - {item.end_time}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* RECENT BOOKING REQUESTS TABLE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4"
      >
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">New Booking Requests</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Accept or reject pending service requests</p>
          </div>
          <Link
            href="/dashboard/technician/bookings"
            className="text-xs font-semibold text-teal-600 hover:underline"
          >
            View all ({bookings.length})
          </Link>
        </div>

        {pendingRequests.length === 0 ? (
          <div className="text-center py-10 text-slate-400 space-y-1">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto opacity-70" />
            <p className="text-sm font-medium">No pending booking requests.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-2">Customer</th>
                  <th className="py-3 px-2">Service</th>
                  <th className="py-3 px-2">Location</th>
                  <th className="py-3 px-2">Date</th>
                  <th className="py-3 px-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                {pendingRequests.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
                    <td className="py-3 px-2 font-bold text-slate-900 dark:text-white">
                      {item.customer?.name || item.user?.name || "Customer"}
                    </td>
                    <td className="py-3 px-2 text-slate-600 dark:text-slate-400">
                      {item.service?.title || "Service Request"}
                    </td>
                    <td className="py-3 px-2 text-slate-500">
                      {item.location || "On-site"}
                    </td>
                    <td className="py-3 px-2 text-slate-500">
                      {item.booking_date ? new Date(item.booking_date).toLocaleDateString() : "Scheduled"}
                    </td>
                    <td className="py-3 px-2 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleStatusUpdate(item.id, "ACCEPTED")}
                          disabled={isPending}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold flex items-center space-x-1 shadow-sm transition disabled:opacity-50"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Accept</span>
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(item.id, "DECLINED")}
                          disabled={isPending}
                          className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg font-semibold flex items-center space-x-1 transition disabled:opacity-50"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Decline</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}
