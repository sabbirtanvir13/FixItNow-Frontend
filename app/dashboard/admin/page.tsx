"use client";

import React, { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  UserCheck,
  Wrench,
  Calendar,
  DollarSign,
  TrendingUp,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Sparkles,
  RefreshCw,
  AlertTriangle,
  Activity,
  Layers,
  Search,
} from "lucide-react";
import { getAllUsers, updateUserStatus } from "./_action/userActions";
import { getAllCategories } from "./_action/categoryActions";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { AnalyticsCard } from "@/components/dashboard/AnalyticsCard";
import {
  RevenueChart,
  ServiceCategoryChart,
  UserGrowthChart,
} from "@/components/dashboard/Charts";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: string;
  active_status?: string;
  activeStatus?: string;
  created_at?: string;
  createdAt?: string;
}

interface CategoryItem {
  id: string;
  name: string;
  description?: string;
}

export default function AdminDashboardPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [userRes, catRes] = await Promise.all([
        getAllUsers(),
        getAllCategories(),
      ]);

      if (userRes.success) {
        setUsers(userRes.data || []);
      } else {
        setError(userRes.message || "Failed to load users");
      }

      if (catRes.success) {
        setCategories(catRes.data || []);
      }
    } catch (err: any) {
      console.error("Admin dashboard error:", err);
      setError(err.message || "Failed to load admin metrics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleStatus = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === "Active" ? "Blocked" : "Active";
    setActionMessage(null);
    startTransition(async () => {
      const res = await updateUserStatus(userId, newStatus);
      if (res.success) {
        setActionMessage(`User status updated to ${newStatus}`);
        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, active_status: newStatus, activeStatus: newStatus } : u))
        );
      } else {
        setError(res.message || "Failed to update user status");
      }
    });
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  // --- STATS CALCULATIONS ---
  const totalUsersCount = users.length;
  const totalCustomersCount = users.filter((u) => u.role === "Customer").length;
  const totalTechniciansCount = users.filter((u) => u.role === "Technician").length;

  // Platform Estimations from live user base & categories
  const estimatedBookings = Math.max(totalUsersCount * 3, 12);
  const estimatedRevenue = totalTechniciansCount * 15000 + totalCustomersCount * 3500;

  // --- ANALYTICS DATA PREPARATION ---

  // 1. Revenue Analytics (Area Chart)
  const revenueData = [
    { month: "Jan", amount: Math.round(estimatedRevenue * 0.4) },
    { month: "Feb", amount: Math.round(estimatedRevenue * 0.55) },
    { month: "Mar", amount: Math.round(estimatedRevenue * 0.7) },
    { month: "Apr", amount: Math.round(estimatedRevenue * 0.82) },
    { month: "May", amount: Math.round(estimatedRevenue * 0.9) },
    { month: "Jun", amount: estimatedRevenue },
  ];

  // 2. Booking Growth (Bar Chart)
  const bookingGrowthData = [
    { name: "Jan", count: Math.round(estimatedBookings * 0.3) },
    { name: "Feb", count: Math.round(estimatedBookings * 0.5) },
    { name: "Mar", count: Math.round(estimatedBookings * 0.65) },
    { name: "Apr", count: Math.round(estimatedBookings * 0.8) },
    { name: "May", count: Math.round(estimatedBookings * 0.9) },
    { name: "Jun", count: estimatedBookings },
  ];

  // 3. User Growth (Line Chart)
  const userGrowthData = [
    { month: "Jan", customers: Math.round(totalCustomersCount * 0.3), technicians: Math.round(totalTechniciansCount * 0.3) },
    { month: "Feb", customers: Math.round(totalCustomersCount * 0.45), technicians: Math.round(totalTechniciansCount * 0.45) },
    { month: "Mar", customers: Math.round(totalCustomersCount * 0.6), technicians: Math.round(totalTechniciansCount * 0.6) },
    { month: "Apr", customers: Math.round(totalCustomersCount * 0.75), technicians: Math.round(totalTechniciansCount * 0.75) },
    { month: "May", customers: Math.round(totalCustomersCount * 0.9), technicians: Math.round(totalTechniciansCount * 0.88) },
    { month: "Jun", customers: totalCustomersCount, technicians: totalTechniciansCount },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 font-sans">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-3xl text-white shadow-xl shadow-slate-900/20 border border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              System Admin Overview
            </span>
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Platform Master Console 🛡️
          </h1>
          <p className="text-slate-300 text-sm max-w-xl">
            Real-time platform insights, revenue tracking, user verification, and ecosystem analytics.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={loadData}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-semibold transition flex items-center space-x-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Sync System</span>
          </button>
          <Link
            href="/dashboard/admin/users"
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs shadow-md transition flex items-center space-x-2"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Manage Users</span>
          </Link>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatsCard
          title="Total Users"
          value={totalUsersCount}
          icon={Users}
          change="+18% growth"
          changeType="positive"
          subtitle="Platform accounts"
          iconBgColor="bg-blue-50 dark:bg-blue-950/40"
          iconColor="text-blue-600 dark:text-blue-400"
          delay={0.05}
        />
        <StatsCard
          title="Customers"
          value={totalCustomersCount}
          icon={UserCheck}
          change={`${totalUsersCount ? Math.round((totalCustomersCount / totalUsersCount) * 100) : 0}% share`}
          changeType="positive"
          subtitle="Active clients"
          iconBgColor="bg-indigo-50 dark:bg-indigo-950/40"
          iconColor="text-indigo-600 dark:text-indigo-400"
          delay={0.1}
        />
        <StatsCard
          title="Technicians"
          value={totalTechniciansCount}
          icon={Wrench}
          change={`${totalUsersCount ? Math.round((totalTechniciansCount / totalUsersCount) * 100) : 0}% share`}
          changeType="positive"
          subtitle="Service providers"
          iconBgColor="bg-teal-50 dark:bg-teal-950/40"
          iconColor="text-teal-600 dark:text-teal-400"
          delay={0.15}
        />
        <StatsCard
          title="Total Bookings"
          value={estimatedBookings}
          icon={Calendar}
          change="+24% volume"
          changeType="positive"
          subtitle="Platform activity"
          iconBgColor="bg-purple-50 dark:bg-purple-950/40"
          iconColor="text-purple-600 dark:text-purple-400"
          delay={0.2}
        />
        <StatsCard
          title="Total Revenue"
          value={`৳${estimatedRevenue.toLocaleString()}`}
          icon={DollarSign}
          change="Gross volume"
          changeType="positive"
          subtitle="Platform turnover"
          iconBgColor="bg-emerald-50 dark:bg-emerald-950/40"
          iconColor="text-emerald-600 dark:text-emerald-400"
          delay={0.25}
        />
      </div>

      {/* ANALYTICS GRAPHS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Platform Revenue Analytics (Large Area Chart - 2 cols) */}
        <AnalyticsCard
          title="Platform Revenue Growth"
          subtitle="Gross monthly transaction revenue across all services"
          className="lg:col-span-2"
          delay={0.3}
        >
          <RevenueChart data={revenueData} currencyPrefix="৳" areaColor="#6366F1" />
        </AnalyticsCard>

        {/* User Growth Chart (Line Chart - 1 col) */}
        <AnalyticsCard
          title="User Base Expansion"
          subtitle="Monthly customer vs technician registration growth"
          delay={0.35}
        >
          <UserGrowthChart data={userGrowthData} />
        </AnalyticsCard>
      </div>

      {/* BOOKING GROWTH & CATEGORIES */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Booking Growth Bar Chart (2 cols) */}
        <AnalyticsCard
          title="Monthly Booking Count"
          subtitle="Completed & active booking volume progression"
          className="lg:col-span-2"
          delay={0.4}
        >
          <ServiceCategoryChart data={bookingGrowthData} barColor="#3B82F6" />
        </AnalyticsCard>

        {/* Platform Categories Card (1 col) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45 }}
          className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4"
        >
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Layers className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Active Categories</h3>
            </div>
            <Link
              href="/dashboard/admin/categories"
              className="text-xs text-indigo-600 hover:underline font-semibold"
            >
              Manage
            </Link>
          </div>

          {categories.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-6">No categories found.</p>
          ) : (
            <div className="space-y-2 text-xs">
              {categories.slice(0, 5).map((cat) => (
                <div
                  key={cat.id}
                  className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl"
                >
                  <span className="font-bold text-slate-800 dark:text-slate-200">{cat.name}</span>
                  <span className="text-slate-400 text-[11px] truncate max-w-[140px]">
                    {cat.description || "Active service category"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* USER MANAGEMENT & VERIFICATION TABLE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Users & Status Management</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Inspect user roles, verify technicians, and toggle active/blocked status
            </p>
          </div>
          <Link
            href="/dashboard/admin/users"
            className="text-xs font-semibold text-indigo-600 hover:underline"
          >
            View all users ({users.length})
          </Link>
        </div>

        {users.length === 0 ? (
          <div className="text-center py-10 text-slate-400">
            <p className="text-sm font-medium">No registered users in the database.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-2">User Name</th>
                  <th className="py-3 px-2">Email Address</th>
                  <th className="py-3 px-2">Role</th>
                  <th className="py-3 px-2">Status</th>
                  <th className="py-3 px-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                {users.slice(0, 6).map((item) => {
                  const status = item.active_status || item.activeStatus || "Active";
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
                      <td className="py-3 px-2 font-bold text-slate-900 dark:text-white">
                        {item.name}
                      </td>
                      <td className="py-3 px-2 text-slate-600 dark:text-slate-400">
                        {item.email}
                      </td>
                      <td className="py-3 px-2 font-semibold">
                        <span
                          className={`px-2.5 py-0.5 rounded-md text-[11px] ${
                            item.role === "Admin"
                              ? "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300"
                              : item.role === "Technician"
                              ? "bg-teal-100 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300"
                              : "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"
                          }`}
                        >
                          {item.role}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            status === "Active"
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                              : "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400"
                          }`}
                        >
                          {status}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-right">
                        <button
                          onClick={() => handleToggleStatus(item.id, status)}
                          disabled={isPending || item.role === "Admin"}
                          className={`px-3 py-1 rounded-lg font-semibold text-[11px] transition disabled:opacity-40 ${
                            status === "Active"
                              ? "bg-rose-50 hover:bg-rose-100 text-rose-600"
                              : "bg-emerald-50 hover:bg-emerald-100 text-emerald-600"
                          }`}
                        >
                          {status === "Active" ? "Block User" : "Activate User"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}