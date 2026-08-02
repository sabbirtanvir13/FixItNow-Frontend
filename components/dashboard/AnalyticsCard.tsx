"use client";

import React from "react";
import { motion } from "framer-motion";

export interface AnalyticsCardProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  subtitle,
  action,
  children,
  delay = 0.1,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
              {subtitle}
            </p>
          )}
        </div>
        {action && <div className="flex items-center space-x-2">{action}</div>}
      </div>

      <div className="w-full flex-1 min-h-[260px] flex flex-col justify-center">
        {children}
      </div>
    </motion.div>
  );
};
