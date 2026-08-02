"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";

export interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  subtitle?: string;
  iconBgColor?: string;
  iconColor?: string;
  delay?: number;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  change,
  changeType = "positive",
  subtitle,
  iconBgColor = "bg-blue-50 dark:bg-blue-950/40",
  iconColor = "text-blue-600 dark:text-blue-400",
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {value}
          </h3>
        </div>

        <div className={`p-3 rounded-xl ${iconBgColor} ${iconColor} transition-transform duration-300 group-hover:scale-110`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>

      {(change || subtitle) && (
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs">
          {change && (
            <div className="flex items-center space-x-1.5 font-medium">
              {changeType === "positive" && (
                <span className="flex items-center text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                  <TrendingUp className="w-3.5 h-3.5 mr-1" />
                  {change}
                </span>
              )}
              {changeType === "negative" && (
                <span className="flex items-center text-rose-600 dark:text-rose-400 font-semibold bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-full">
                  <TrendingDown className="w-3.5 h-3.5 mr-1" />
                  {change}
                </span>
              )}
              {changeType === "neutral" && (
                <span className="flex items-center text-slate-600 dark:text-slate-400 font-medium bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                  <Minus className="w-3 h-3 mr-1" />
                  {change}
                </span>
              )}
            </div>
          )}
          {subtitle && (
            <span className="text-slate-400 dark:text-slate-500 font-normal">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
};
