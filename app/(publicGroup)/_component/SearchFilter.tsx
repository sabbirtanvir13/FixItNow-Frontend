"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Search, Filter, X } from "lucide-react";

interface Category {
  _id?: string;
  id?: string;
  name: string;
}

interface SearchFilterProps {
  categories?: Category[];
}

export default function SearchFilter({ categories = [] }: SearchFilterProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");

  // Debounce technique for continuous typing search
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      if (searchTerm.trim()) {
        params.set("search", searchTerm);
      } else {
        params.delete("search");
      }

      if (selectedCategory) {
        params.set("category", selectedCategory);
      } else {
        params.delete("category");
      }

      replace(`${pathname}?${params.toString()}`);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory, pathname, replace, searchParams]);

  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategory("");
    replace(pathname);
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm mb-10 space-y-4">
      <div className="flex flex-col md:flex-row items-center gap-4">
        
        {/* 🔍 Search Input Box */}
        <div className="relative w-full flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search services by title or description..."
            className="w-full pl-11 pr-10 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm text-gray-900 transition-all placeholder:text-gray-400"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* 🏷️ Category Dropdown Filter */}
        <div className="relative w-full md:w-64">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none z-10" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full pl-10 pr-8 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm text-gray-700 font-medium cursor-pointer appearance-none transition-all"
          >
            <option value="">All Categories</option>
            {categories.map((cat, idx) => (
              <option key={cat._id || cat.id || idx} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-xs text-gray-400">
            ▼
          </div>
        </div>

        {/* 🔄 Reset Filter Button */}
        {(searchTerm || selectedCategory) && (
          <button
            onClick={handleReset}
            className="w-full md:w-auto px-4 py-3 bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 shrink-0"
          >
            <X className="w-4 h-4" />
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}