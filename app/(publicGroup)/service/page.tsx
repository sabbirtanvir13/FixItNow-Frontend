

import Link from "next/link";
import Image from "next/image";
import { getAllServiceData } from "../_action/serviceAction";
import SearchFilter from "../_component/SearchFilter";


interface ServicesPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
  }>;
}

export default async function ServicesPage({ searchParams }: ServicesPageProps) {

  const resolvedSearchParams = await searchParams;
  const searchTerm = resolvedSearchParams.search?.toLowerCase() || "";
  const selectedCategory = resolvedSearchParams.category?.toLowerCase() || "";

  const response = await getAllServiceData("services", "services-tag");

  if (!response.success) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-red-500 text-lg font-semibold">
          {response.message || "Failed to load services!"}
        </p>
      </div>
    );
  }

  const allServices = response.data || [];

  const categoriesMap = new Map();
  allServices.forEach((s: any) => {
    if (s.category && s.category.name) {
      categoriesMap.set(s.category.name, s.category);
    }
  });
  const uniqueCategories = Array.from(categoriesMap.values());


  const filteredServices = allServices.filter((service: any) => {
    const matchesSearch =
      !searchTerm ||
      service.title?.toLowerCase().includes(searchTerm) ||
      service.description?.toLowerCase().includes(searchTerm) ||
      service.location?.toLowerCase().includes(searchTerm);

    const matchesCategory =
      !selectedCategory ||
      service.category?.name?.toLowerCase() === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
          Explore Our <span className="text-blue-600">Services</span>
        </h1>
        <p className="mt-3 text-lg text-gray-500 max-w-2xl mx-auto">
          Professional and trusted home repair services right at your doorstep.
        </p>
      </div>

      {/*  Search & Filter Box */}
      <SearchFilter categories={uniqueCategories} />

      {/*  Services Display Grid */}
      {filteredServices.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
          <p className="text-gray-500 text-lg font-medium">
            No services found matching your criteria.
          </p>
          <p className="text-xs text-gray-400 mt-1">Try searching with a different keyword or category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service: any) => {
            const serviceId = service._id || service.id;

            return (
              <div 
                key={serviceId} 
                className="group bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1)] transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-full h-52 overflow-hidden bg-gray-100">
                    <Image 
                      src={service.image || "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=600&auto=format&fit=crop"} 
                      alt={service.title || "Service Image"} 
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl shadow-sm z-10">
                      <span className="text-base font-extrabold text-gray-900">
                        ৳{service.price}
                      </span>
                    </div>

                    {service.category && (
                      <div className="absolute top-3 left-3 z-10">
                        <span className="inline-block bg-blue-600/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                          {service.category.name}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-1">
                      {service.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mb-6 bg-gray-50/80 p-3 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-1.5">
                        <span className="text-blue-500">📍</span>
                        <span>{service.location}</span>
                      </div>
                      <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-blue-500">⏱️</span>
                        <span>{service.duration} mins</span>
                      </div>
                    </div>

                    {service.technician && service.technician.user && (
                      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                        <div className="relative w-11 h-11 shrink-0">
                          <Image 
                            src={service.technician.profilePhoto || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"} 
                            alt={service.technician.user.name} 
                            fill
                            className="rounded-full object-cover ring-2 ring-blue-600/20"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-900">{service.technician.user.name}</h4>
                          <p className="text-xs text-blue-600 font-medium">Verified Technician</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link 
                    href={`/service/${serviceId}`}
                    className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-blue-600 text-white py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <span>View Details</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}