"use client";

import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { PieChart as PieIcon, BarChart3, TrendingUp } from "lucide-react";

// Colors for Pie/Donut Chart
const STATUS_COLORS = {
  COMPLETED: "#10B981", // Emerald 500
  PAID: "#8B5CF6", // Purple 500
  ACCEPTED: "#3B82F6", // Blue 500
  REQUESTED: "#F59E0B", // Amber 500
  PENDING: "#F59E0B",
  IN_PROGRESS: "#06B6D4", // Cyan 500
  CANCELLED: "#EF4444", // Red 500
  DECLINED: "#F43F5E",
};

const PIE_COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4"];

const CustomTooltip = ({ active, payload, label, prefix = "", suffix = "" }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/90 backdrop-blur-sm text-white px-3 py-2 rounded-xl text-xs shadow-xl border border-slate-700 space-y-1">
        <p className="font-semibold text-slate-300">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} className="flex items-center space-x-2 font-medium" style={{ color: entry.color || entry.fill }}>
            <span>{entry.name || "Value"}:</span>
            <span className="font-bold">
              {prefix}{typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value}{suffix}
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// 1. Revenue / Spending Area Chart
export interface RevenueChartProps {
  data: { month: string; amount: number }[];
  height?: number;
  currencyPrefix?: string;
  areaColor?: string;
}

export const RevenueChart: React.FC<RevenueChartProps> = ({
  data,
  height = 260,
  currencyPrefix = "৳",
  areaColor = "#3B82F6",
}) => {
  const isEmpty = !data || data.length === 0 || data.every((d) => d.amount === 0);

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[220px] text-slate-400 dark:text-slate-500">
        <TrendingUp className="w-10 h-10 mb-2 stroke-[1.5] opacity-60" />
        <p className="text-sm font-medium">No revenue/payment data available yet.</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={areaColor} stopOpacity={0.4} />
            <stop offset="95%" stopColor={areaColor} stopOpacity={0.0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.6} />
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#64748B", fontSize: 12 }}
          dy={10}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#64748B", fontSize: 12 }}
          tickFormatter={(val) => `${currencyPrefix}${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
        />
        <Tooltip content={<CustomTooltip prefix={currencyPrefix} />} />
        <Area
          type="monotone"
          dataKey="amount"
          name="Amount"
          stroke={areaColor}
          strokeWidth={3}
          fillOpacity={1}
          fill="url(#revenueGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

// 2. Booking Status Donut / Pie Chart
export interface BookingStatusChartProps {
  data: { name: string; value: number; color?: string }[];
  height?: number;
}

export const BookingStatusChart: React.FC<BookingStatusChartProps> = ({
  data,
  height = 260,
}) => {
  const isEmpty = !data || data.length === 0 || data.every((d) => d.value === 0);

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[220px] text-slate-400 dark:text-slate-500">
        <PieIcon className="w-10 h-10 mb-2 stroke-[1.5] opacity-60" />
        <p className="text-sm font-medium">No booking status distribution data.</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={85}
          paddingAngle={4}
          dataKey="value"
        >
          {data.map((entry, index) => {
            const statusKey = entry.name.toUpperCase();
            const color =
              entry.color ||
              STATUS_COLORS[statusKey as keyof typeof STATUS_COLORS] ||
              PIE_COLORS[index % PIE_COLORS.length];
            return <Cell key={`cell-${index}`} fill={color} stroke="none" />;
          })}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          verticalAlign="bottom"
          height={36}
          iconType="circle"
          formatter={(value) => <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

// 3. Service Category Bar Chart
export interface ServiceCategoryChartProps {
  data: { name: string; count: number }[];
  height?: number;
  barColor?: string;
}

export const ServiceCategoryChart: React.FC<ServiceCategoryChartProps> = ({
  data,
  height = 260,
  barColor = "#8B5CF6",
}) => {
  const isEmpty = !data || data.length === 0 || data.every((d) => d.count === 0);

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[220px] text-slate-400 dark:text-slate-500">
        <BarChart3 className="w-10 h-10 mb-2 stroke-[1.5] opacity-60" />
        <p className="text-sm font-medium">No category bookings data available.</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.6} />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#64748B", fontSize: 11 }}
          dy={10}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#64748B", fontSize: 12 }}
          allowDecimals={false}
        />
        <Tooltip content={<CustomTooltip suffix=" bookings" />} />
        <Bar dataKey="count" name="Bookings" fill={barColor} radius={[8, 8, 0, 0]} barSize={32} />
      </BarChart>
    </ResponsiveContainer>
  );
};

// 4. Multi-Line or Area User Growth Chart (for Admin/Technician)
export interface UserGrowthChartProps {
  data: { month: string; customers?: number; technicians?: number; users?: number }[];
  height?: number;
}

export const UserGrowthChart: React.FC<UserGrowthChartProps> = ({
  data,
  height = 260,
}) => {
  const isEmpty = !data || data.length === 0;

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[220px] text-slate-400 dark:text-slate-500">
        <TrendingUp className="w-10 h-10 mb-2 stroke-[1.5] opacity-60" />
        <p className="text-sm font-medium">No user growth data available.</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.6} />
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#64748B", fontSize: 12 }}
          dy={10}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#64748B", fontSize: 12 }}
          allowDecimals={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          verticalAlign="top"
          align="right"
          height={36}
          iconType="circle"
          formatter={(value) => <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{value}</span>}
        />
        {data[0]?.customers !== undefined && (
          <Line
            type="monotone"
            dataKey="customers"
            name="Customers"
            stroke="#3B82F6"
            strokeWidth={3}
            dot={{ r: 4, fill: "#3B82F6" }}
            activeDot={{ r: 6 }}
          />
        )}
        {data[0]?.technicians !== undefined && (
          <Line
            type="monotone"
            dataKey="technicians"
            name="Technicians"
            stroke="#10B981"
            strokeWidth={3}
            dot={{ r: 4, fill: "#10B981" }}
            activeDot={{ r: 6 }}
          />
        )}
        {data[0]?.users !== undefined && (
          <Line
            type="monotone"
            dataKey="users"
            name="Total Users"
            stroke="#8B5CF6"
            strokeWidth={3}
            dot={{ r: 4, fill: "#8B5CF6" }}
            activeDot={{ r: 6 }}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
};
