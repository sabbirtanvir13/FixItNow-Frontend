// "use client";

// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { useState, useEffect } from "react";
// import { Search, Filter, X } from "lucide-react";

// interface Category {
//   _id?: string;
//   id?: string;
//   name: string;
// }

// interface SearchFilterProps {
//   categories?: Category[];
// }

// export default function SearchFilter({ categories = [] }: SearchFilterProps) {
//   const searchParams = useSearchParams();
//   const pathname = usePathname();
//   const { replace } = useRouter();

//   const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
//   const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");


//   useEffect(() => {
//     const timer = setTimeout(() => {
//       const params = new URLSearchParams(searchParams);

//       if (searchTerm.trim()) {
//         params.set("search", searchTerm);
//       } else {
//         params.delete("search");
//       }

//       if (selectedCategory) {
//         params.set("category", selectedCategory);
//       } else {
//         params.delete("category");
//       }

//       replace(`${pathname}?${params.toString()}`);
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [searchTerm, selectedCategory, pathname, replace, searchParams]);

//   const handleReset = () => {
//     setSearchTerm("");
//     setSelectedCategory("");
//     replace(pathname);
//   };

//   return (
//     <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm mb-10 space-y-4">
//       <div className="flex flex-col md:flex-row items-center gap-4">
        
//         {/* Search Input Box */}
//         <div className="relative w-full flex-1">
//           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Search services by title or description..."
//             className="w-full pl-11 pr-10 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm text-gray-900 transition-all placeholder:text-gray-400"
//           />
//           {searchTerm && (
//             <button
//               onClick={() => setSearchTerm("")}
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
//             >
//               <X className="w-4 h-4" />
//             </button>
//           )}
//         </div>

//         {/*  Category Dropdown Filter */}
//         <div className="relative w-full md:w-64">
//           <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none z-10" />
//           <select
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//             className="w-full pl-10 pr-8 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm text-gray-700 font-medium cursor-pointer appearance-none transition-all"
//           >
//             <option value="">All Categories</option>
//             {categories.map((cat, idx) => (
//               <option key={cat._id || cat.id || idx} value={cat.name}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>
//           <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-xs text-gray-400">
//             ▼
//           </div>
//         </div>

//         {/* Reset Filter Button */}
//         {(searchTerm || selectedCategory) && (
//           <button
//             onClick={handleReset}
//             className="w-full md:w-auto px-4 py-3 bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 shrink-0"
//           >
//             <X className="w-4 h-4" />
//             Clear Filters
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

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
  placeholder?: string;
  categoryLabel?: string;
  searchKey?: string;
  categoryKey?: string;
}

export default function SearchFilter({
  categories = [],
  placeholder = "Search...",
  categoryLabel = "All Categories",
  searchKey = "search",
  categoryKey = "category",
}: SearchFilterProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get(searchKey) || ""
  );

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get(categoryKey) || ""
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (searchTerm.trim()) {
        params.set(searchKey, searchTerm);
      } else {
        params.delete(searchKey);
      }

      if (selectedCategory) {
        params.set(categoryKey, selectedCategory);
      } else {
        params.delete(categoryKey);
      }

      replace(`${pathname}?${params.toString()}`);
    }, 300);

    return () => clearTimeout(timer);
  }, [
    searchTerm,
    selectedCategory,
    pathname,
    replace,
    searchParams,
    searchKey,
    categoryKey,
  ]);

  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategory("");
    replace(pathname);
  };

  return (
    <div className="mb-10 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">

        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={placeholder}
            className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-10 text-sm text-gray-900 transition-all placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category */}
        <div className="relative w-full md:w-64">
          <Filter className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-gray-400" />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-8 text-sm font-medium text-gray-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="">{categoryLabel}</option>

            {categories.map((cat, idx) => (
              <option
                key={cat._id || cat.id || idx}
                value={cat.name}
              >
                {cat.name}
              </option>
            ))}
          </select>

          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">
            ▼
          </span>
        </div>

        {(searchTerm || selectedCategory) && (
          <button
            onClick={handleReset}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-3 text-xs font-semibold text-gray-600 transition hover:bg-red-50 hover:text-red-600 md:w-auto"
          >
            <X className="h-4 w-4" />
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}