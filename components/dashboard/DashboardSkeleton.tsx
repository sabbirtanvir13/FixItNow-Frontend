"use client";

import React from "react";

export const DashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse p-2 sm:p-4">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <div className="h-7 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
          <div className="h-4 w-72 bg-slate-100 dark:bg-slate-800/60 rounded-md"></div>
        </div>
        <div className="h-10 w-32 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
      </div>

      {/* Stats Cards Skeleton (4 columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded"></div>
                <div className="h-8 w-28 bg-slate-300 dark:bg-slate-700 rounded-lg"></div>
              </div>
              <div className="h-12 w-12 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
            </div>
            <div className="h-4 w-full bg-slate-100 dark:bg-slate-800/60 rounded pt-2"></div>
          </div>
        ))}
      </div>

      {/* Analytics Charts Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="h-5 w-40 bg-slate-200 dark:bg-slate-800 rounded"></div>
          <div className="h-64 bg-slate-100 dark:bg-slate-800/40 rounded-xl"></div>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="h-5 w-36 bg-slate-200 dark:bg-slate-800 rounded"></div>
          <div className="h-64 bg-slate-100 dark:bg-slate-800/40 rounded-xl flex items-center justify-center">
            <div className="w-36 h-36 rounded-full border-8 border-slate-200 dark:border-slate-800"></div>
          </div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="h-5 w-48 bg-slate-200 dark:bg-slate-800 rounded"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-slate-100 dark:bg-slate-800/50 rounded-xl"></div>
          ))}
        </div>
      </div>
    </div>
  );
};
