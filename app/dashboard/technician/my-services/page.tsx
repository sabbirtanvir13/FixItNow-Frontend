// "use client";

// import React, { useState, useEffect } from "react";
// import {
//   Wrench,
//   Sparkles,
//   Plus,
//   Search,
//   MapPin,
//   Edit3,
//   Trash2,
//   Clock,
//   Image as ImageIcon,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { 
//   createService, 
//   deleteService, 
//   getMyServices, 
//   updateService, 
//   getCategories 
// } from "../_action/myServicesActions";

// interface Category {
//   id: string;
//   name: string;
// }

// interface Service {
//   id: string;
//   title: string;
//   description: string;
//   location: string;
//   price: number;
//   duration: number;
//   image?: string;
//   category?: { id: string; name: string } | string;
//   category_id?: string;
//   isAvailable?: string; // যদি ব্যাকএন্ডে থাকে
// }

// export default function MyServicePage() {
//   const [services, setServices] = useState<Service[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [loadingCategories, setLoadingCategories] = useState(true);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterStatus, setFilterStatus] = useState<"ALL" | "AVAILABLE" | "UNAVAILABLE">("ALL");

//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [editModalId, setEditModalId] = useState<string | null>(null);
//   const [isActionLoading, setIsActionLoading] = useState(false);

//   const parseServicesResponse = (servData: unknown): Service[] => {
//     if (Array.isArray(servData)) {
//       return servData as Service[];
//     }

//     if (servData !== null && typeof servData === "object") {
//       const response = servData as { success?: boolean; data?: unknown; services?: unknown };
//       if (Array.isArray(response.data)) {
//         return response.data as Service[];
//       }
//       if (Array.isArray(response.services)) {
//         return response.services as Service[];
//       }
//     }

//     return [];
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         // ১. সার্ভার অ্যাকশনের মাধ্যমে ক্যাটাগরি ফেচ করা
//         const catRes = await getCategories();
//         const categoriesList = Array.isArray(catRes) 
//           ? catRes 
//           : (catRes?.data || []);

//         setCategories(Array.isArray(categoriesList) ? categoriesList : []);

//         // ২. সার্ভিসগুলো ফেচ করা
//         const servData = await getMyServices();
//         setServices(parseServicesResponse(servData));
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//         setLoadingCategories(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleCreateService = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsActionLoading(true);

//     const formData = new FormData(e.currentTarget);
//     const res = await createService(formData); 

//     if (res.success) {
//       setIsAddModalOpen(false);
//       const updatedServices = await getMyServices();
//       setServices(parseServicesResponse(updatedServices));
//       alert("Service Added Successfully!");
//     } else {
//       alert(res.message || "Failed to add service");
//     }
//     setIsActionLoading(false);
//   };

//   const handleUpdateService = async (e: React.FormEvent<HTMLFormElement>, id: string) => {
//     e.preventDefault();
//     setIsActionLoading(true);

//     const formData = new FormData(e.currentTarget);
//     const res = await updateService(id, formData); 

//     if (res.success) {
//       setEditModalId(null);
//       const updatedServices = await getMyServices();
//       setServices(parseServicesResponse(updatedServices));
//       alert("Service Updated Successfully!");
//     } else {
//       alert(res.message || "Failed to update service");
//     }
//     setIsActionLoading(false);
//   };

//   const handleDeleteService = async (id: string) => {
//     if (!confirm("Are you sure you want to delete this service?")) return;

//     const res = await deleteService(id);
//     if (res.success) {
//       setServices(services.filter(s => s.id !== id));
//       alert("Service Deleted!");
//     } else {
//       alert(res.message || "Failed to delete");
//     }
//   };

//   const filteredServices = services.filter((service) => {
//     const matchesSearch = 
//       service.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
//       service.location?.toLowerCase().includes(searchQuery.toLowerCase());

//     const matchesFilter = 
//       filterStatus === "ALL" || 
//       (filterStatus === "AVAILABLE" ? service.isAvailable !== "UNAVAILABLE" : service.isAvailable === "UNAVAILABLE");

//     return matchesSearch && matchesFilter;
//   });

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
//       {/* Header Section */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
//         <div className="flex items-center gap-3.5">
//           <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20">
//             <Wrench className="w-6 h-6 stroke-[2.5]" />
//           </div>
//           <div>
//             <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
//               My Services
//               <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
//             </h1>
//             <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
//               Manage your services, update details, or add new services
//             </p>
//           </div>
//         </div>

//         {/* Add Service Modal Button */}
//         <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
//           <DialogTrigger asChild>
//             <Button className="h-11 px-5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-all duration-300">
//               <Plus className="mr-2 h-5 w-5 stroke-[3]" />
//               Add New Service
//             </Button>
//           </DialogTrigger>
//           <DialogContent className="sm:max-w-[700px] bg-white dark:bg-[#07090e] border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
//             <DialogHeader>
//               <DialogTitle className="text-xl font-bold">Add New Service</DialogTitle>
//               <DialogDescription>Fill in the details below to list a new service.</DialogDescription>
//             </DialogHeader>

//             <form onSubmit={handleCreateService} className="py-4 flex flex-col gap-5">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 <div className="space-y-2 md:col-span-2">
//                   <label className="text-sm font-semibold">Service Title</label>
//                   <Input name="title" required placeholder="e.g. AC Repair & Maintenance" className="h-11 rounded-xl" />
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-semibold">Category</label>
//                   <select name="category_id" required defaultValue="" className="flex h-11 w-full rounded-xl border px-3 text-sm bg-transparent">
//                     <option value="" disabled>{loadingCategories ? "Loading..." : "Select a category..."}</option>
//                     {categories.map((cat) => (
//                       <option key={cat.id} value={cat.id}>{cat.name}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-semibold">Location</label>
//                   <Input name="location" required placeholder="e.g. Dhaka, Bangladesh" className="h-11 rounded-xl" />
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-semibold">Price (৳)</label>
//                   <Input name="price" type="number" required placeholder="e.g. 1500" className="h-11 rounded-xl" />
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm font-semibold">Duration (Minutes)</label>
//                   <Input name="duration" type="number" required placeholder="e.g. 60" className="h-11 rounded-xl" />
//                 </div>

//                 <div className="space-y-2 md:col-span-2">
//                   <label className="text-sm font-semibold flex items-center gap-1.5">
//                     <ImageIcon className="w-4 h-4 text-amber-500" /> Image URL (Optional)
//                   </label>
//                   <Input name="image" placeholder="https://example.com/service-image.jpg" className="h-11 rounded-xl" />
//                 </div>

//                 <div className="space-y-2 md:col-span-2">
//                   <label className="text-sm font-semibold">Description</label>
//                   <textarea name="description" required placeholder="Write a detailed description..." className="flex min-h-[100px] w-full rounded-xl border px-3 py-3 text-sm bg-transparent"></textarea>
//                 </div>
//               </div>

//               <div className="flex justify-end gap-3 mt-4 pt-4 border-t">
//                 <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
//                 <Button type="submit" disabled={isActionLoading} className="bg-amber-500 text-slate-950 font-bold">
//                   {isActionLoading ? "Saving..." : "Save Service"}
//                 </Button>
//               </div>
//             </form>
//           </DialogContent>
//         </Dialog>
//       </div>

//       {/* Search and Filters */}
//       <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//         <div className="relative w-full sm:w-80">
//           <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//           <Input 
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search by title, location..." 
//             className="h-11 pl-10 pr-4 rounded-xl" 
//           />
//         </div>

//         <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
//           <Button onClick={() => setFilterStatus("ALL")} variant="outline" className={`h-10 rounded-xl font-bold ${filterStatus === "ALL" ? "bg-amber-500 text-slate-950" : ""}`}>
//             All ({services.length})
//           </Button>
//         </div>
//       </div>

//       {/* Services List / Grid */}
//       {loading ? (
//         <div className="text-center py-10 text-slate-500 font-medium">Loading services...</div>
//       ) : filteredServices.length === 0 ? (
//         <div className="text-center py-10 text-slate-500 font-medium">No services found.</div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
//           {filteredServices.map((service) => (
//             <div key={service.id} className="group relative bg-white dark:bg-[#07090e] border rounded-3xl p-4 flex flex-col sm:flex-row gap-5 shadow-sm">
//               <div className="relative w-full sm:w-52 h-52 sm:h-auto rounded-2xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
//                 <img 
//                   src={service.image || "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop"} 
//                   alt={service.title} 
//                   className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
//                 />
//               </div>

//               <div className="flex flex-col justify-between flex-1 py-1">
//                 <div>
//                   <h3 className="text-xl font-bold line-clamp-1">{service.title}</h3>
//                   <p className="text-xs flex items-center gap-1.5 mt-2 font-medium text-slate-500">
//                     <MapPin className="w-4 h-4 text-amber-500 shrink-0" /> {service.location}
//                   </p>

//                   <div className="flex items-center gap-4 mt-3">
//                     <div className="flex items-center gap-1 text-amber-600 font-extrabold text-xl">
//                       <span>৳{service.price?.toLocaleString()}</span>
//                     </div>
//                     <div className="flex items-center gap-1 text-xs text-slate-500 font-medium bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
//                       <Clock className="w-3.5 h-3.5 text-amber-500" /> {service.duration} mins
//                     </div>
//                   </div>
//                 </div>

//                 {/* Actions: Update & Delete */}
//                 <div className="flex items-center gap-3 mt-5 pt-4 border-t">
//                   <Dialog open={editModalId === service.id} onOpenChange={(isOpen) => setEditModalId(isOpen ? service.id : null)}>
//                     <DialogTrigger asChild>
//                       <Button variant="outline" className="flex-1 h-10 text-amber-600 hover:bg-amber-500 hover:text-slate-950 font-bold">
//                         <Edit3 className="w-4 h-4 mr-2" /> Update
//                       </Button>
//                     </DialogTrigger>
//                     <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
//                       <DialogHeader>
//                         <DialogTitle>Update Service</DialogTitle>
//                       </DialogHeader>

//                       <form onSubmit={(e) => handleUpdateService(e, service.id)} className="py-4 flex flex-col gap-5">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                           <div className="space-y-2 md:col-span-2">
//                             <label className="text-sm font-semibold">Title</label>
//                             <Input name="title" defaultValue={service.title} required className="h-11 rounded-xl" />
//                           </div>

//                           <div className="space-y-2">
//                             <label className="text-sm font-semibold">Category</label>
//                             <select 
//                               name="category_id" 
//                               defaultValue={service.category_id || (typeof service.category === 'object' ? service.category?.id : "")} 
//                               required 
//                               className="flex h-11 w-full rounded-xl border px-3 text-sm bg-transparent"
//                             >
//                               {categories.map((cat) => (
//                                 <option key={cat.id} value={cat.id}>{cat.name}</option>
//                               ))}
//                             </select>
//                           </div>

//                           <div className="space-y-2">
//                             <label className="text-sm font-semibold">Location</label>
//                             <Input name="location" defaultValue={service.location} required className="h-11 rounded-xl" />
//                           </div>

//                           <div className="space-y-2">
//                             <label className="text-sm font-semibold">Price (৳)</label>
//                             <Input name="price" type="number" defaultValue={service.price} required className="h-11 rounded-xl" />
//                           </div>

//                           <div className="space-y-2">
//                             <label className="text-sm font-semibold">Duration (Minutes)</label>
//                             <Input name="duration" type="number" defaultValue={service.duration} required className="h-11 rounded-xl" />
//                           </div>

//                           <div className="space-y-2 md:col-span-2">
//                             <label className="text-sm font-semibold flex items-center gap-1.5">
//                               <ImageIcon className="w-4 h-4 text-amber-500" /> Image URL
//                             </label>
//                             <Input name="image" defaultValue={service.image || ""} placeholder="https://example.com/image.jpg" className="h-11 rounded-xl" />
//                           </div>

//                           <div className="space-y-2 md:col-span-2">
//                             <label className="text-sm font-semibold">Description</label>
//                             <textarea name="description" defaultValue={service.description} required className="flex min-h-[100px] w-full rounded-xl border px-3 py-3 text-sm bg-transparent"></textarea>
//                           </div>
//                         </div>

//                         <div className="flex justify-end gap-3 mt-4 pt-4 border-t">
//                           <Button type="button" variant="outline" onClick={() => setEditModalId(null)}>Cancel</Button>
//                           <Button type="submit" disabled={isActionLoading} className="bg-amber-500 text-slate-950 font-bold">
//                              {isActionLoading ? "Updating..." : "Save Changes"}
//                           </Button>
//                         </div>
//                       </form>
//                     </DialogContent>
//                   </Dialog>

//                   <Button 
//                     onClick={() => handleDeleteService(service.id)} 
//                     variant="outline" 
//                     className="flex-1 h-10 text-rose-600 hover:bg-rose-500 hover:text-white font-bold"
//                   >
//                     <Trash2 className="w-4 h-4 mr-2" /> Delete
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Footer Info */}
//       <div className="p-4 bg-white dark:bg-[#07090e] border rounded-2xl flex items-center justify-between text-xs text-slate-500 font-medium">
//         <span>Showing {filteredServices.length} services</span>
//       </div>
//     </div>
//   );
// }



"use client";

import React, { useState, useEffect } from "react";
import {
  Wrench,
  Sparkles,
  Plus,
  Search,
  MapPin,
  Edit3,
  Trash2,
  Clock,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  createService,
  deleteService,
  getMyServices,
  updateService,
  getCategories
} from "../_action/myServicesActions";

interface Category {
  id: string;
  name: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  duration: number;
  image?: string;
  category?: { id: string; name: string } | string;
  category_id?: string;
  isAvailable?: string;
}

export default function MyServicePage() {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"ALL" | "AVAILABLE" | "UNAVAILABLE">("ALL");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editModalId, setEditModalId] = useState<string | null>(null);
  const [isActionLoading, setIsActionLoading] = useState(false);

  const parseServicesResponse = (servData: unknown): Service[] => {
    if (Array.isArray(servData)) {
      return servData as Service[];
    }

    if (servData !== null && typeof servData === "object") {
      const response = servData as { success?: boolean; data?: unknown; services?: unknown };
      if (Array.isArray(response.data)) {
        return response.data as Service[];
      }
      if (Array.isArray(response.services)) {
        return response.services as Service[];
      }
    }

    return [];
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const catRes = await getCategories();
        const categoriesList = Array.isArray(catRes)
          ? catRes
          : (catRes?.data || []);

        setCategories(Array.isArray(categoriesList) ? categoriesList : []);

        const servData = await getMyServices();
        setServices(parseServicesResponse(servData));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
        setLoadingCategories(false);
      }
    };
    fetchData();
  }, []);

  const handleCreateService = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsActionLoading(true);

    const formData = new FormData(e.currentTarget);
    const res = await createService(formData);

    if (res.success) {
      setIsAddModalOpen(false);
      const updatedServices = await getMyServices();
      setServices(parseServicesResponse(updatedServices));
      alert("Service Added Successfully!");
    } else {
      alert(res.message || "Failed to add service");
    }
    setIsActionLoading(false);
  };

  const handleUpdateService = async (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    setIsActionLoading(true);

    const formData = new FormData(e.currentTarget);
    const res = await updateService(id, formData);

    if (res.success) {
      setEditModalId(null);
      const updatedServices = await getMyServices();
      setServices(parseServicesResponse(updatedServices));
      alert("Service Updated Successfully!");
    } else {
      alert(res.message || "Failed to update service");
    }
    setIsActionLoading(false);
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    const res = await deleteService(id);
    if (res.success) {
      setServices(services.filter(s => s.id !== id));
      alert("Service Deleted!");
    } else {
      alert(res.message || "Failed to delete");
    }
  };

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.location?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterStatus === "ALL" ||
      (filterStatus === "AVAILABLE" ? service.isAvailable !== "UNAVAILABLE" : service.isAvailable === "UNAVAILABLE");

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Wrench className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
              My Services
              <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              Manage your services, update details, or add new services
            </p>
          </div>
        </div>

        {/* Add Service Modal Button */}
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="h-11 px-5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-lg shadow-blue-600/20 transition-all duration-300">
              <Plus className="mr-2 h-5 w-5 stroke-[2.5]" />
              Add New Service
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] bg-white dark:bg-[#07090e] border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Add New Service</DialogTitle>
              <DialogDescription>Fill in the details below to list a new service.</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCreateService} className="py-4 flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold">Service Title</label>
                  <Input name="title" required placeholder="e.g. AC Repair & Maintenance" className="h-11 rounded-xl" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Category</label>
                  <select name="category_id" required defaultValue="" className="flex h-11 w-full rounded-xl border px-3 text-sm bg-transparent">
                    <option value="" disabled>{loadingCategories ? "Loading..." : "Select a category..."}</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Location</label>
                  <Input name="location" required placeholder="e.g. Dhaka, Bangladesh" className="h-11 rounded-xl" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Price (৳)</label>
                  <Input name="price" type="number" required placeholder="e.g. 1500" className="h-11 rounded-xl" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">Duration (Minutes)</label>
                  <Input name="duration" type="number" required placeholder="e.g. 60" className="h-11 rounded-xl" />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-blue-600" /> Image URL (Optional)
                  </label>
                  <Input name="image" placeholder="https://example.com/service-image.jpg" className="h-11 rounded-xl" />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold">Description</label>
                  <textarea name="description" required placeholder="Write a detailed description..." className="flex min-h-[100px] w-full rounded-xl border px-3 py-3 text-sm bg-transparent"></textarea>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-4 pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={isActionLoading} className="bg-blue-600 hover:bg-blue-700 text-white font-bold">
                  {isActionLoading ? "Saving..." : "Save Service"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, location..."
            className="h-11 pl-10 pr-4 rounded-xl"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          <Button onClick={() => setFilterStatus("ALL")} variant="outline" className={`h-10 rounded-xl font-bold ${filterStatus === "ALL" ? "bg-blue-600 text-white hover:bg-blue-700" : ""}`}>
            All ({services.length})
          </Button>
        </div>
      </div>

      {/* Services List / Grid */}
      {loading ? (
        <div className="text-center py-10 text-slate-500 font-medium">Loading services...</div>
      ) : filteredServices.length === 0 ? (
        <div className="text-center py-10 text-slate-500 font-medium">No services found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
          {filteredServices.map((service) => (
            <div key={service.id} className="group relative bg-white dark:bg-[#07090e] border rounded-3xl p-4 flex flex-col sm:flex-row gap-5 shadow-sm">
              <div className="relative w-full sm:w-52 h-52 sm:h-auto rounded-2xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <img
                  src={service.image || "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop"}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="flex flex-col justify-between flex-1 py-1">
                <div>
                  <h3 className="text-xl font-bold line-clamp-1">{service.title}</h3>
                  <p className="text-xs flex items-center gap-1.5 mt-2 font-medium text-slate-500">
                    <MapPin className="w-4 h-4 text-blue-600 shrink-0" /> {service.location}
                  </p>

                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1 text-blue-600 font-extrabold text-xl">
                      <span>৳{service.price?.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500 font-medium bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                      <Clock className="w-3.5 h-3.5 text-blue-600" /> {service.duration} mins
                    </div>
                  </div>
                </div>

                {/* Actions: Update & Delete */}
                <div className="flex items-center gap-3 mt-5 pt-4 border-t">
                  <Dialog open={editModalId === service.id} onOpenChange={(isOpen) => setEditModalId(isOpen ? service.id : null)}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex-1 h-10 text-blue-600 hover:bg-blue-600 hover:text-white font-bold">
                        <Edit3 className="w-4 h-4 mr-2" /> Update
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Update Service</DialogTitle>
                      </DialogHeader>

                      <form onSubmit={(e) => handleUpdateService(e, service.id)} className="py-4 flex flex-col gap-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-semibold">Title</label>
                            <Input name="title" defaultValue={service.title} required className="h-11 rounded-xl" />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-semibold">Category</label>
                            <select
                              name="category_id"
                              defaultValue={service.category_id || (typeof service.category === 'object' ? service.category?.id : "")}
                              required
                              className="flex h-11 w-full rounded-xl border px-3 text-sm bg-transparent"
                            >
                              {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                              ))}
                            </select>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-semibold">Location</label>
                            <Input name="location" defaultValue={service.location} required className="h-11 rounded-xl" />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-semibold">Price (৳)</label>
                            <Input name="price" type="number" defaultValue={service.price} required className="h-11 rounded-xl" />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-semibold">Duration (Minutes)</label>
                            <Input name="duration" type="number" defaultValue={service.duration} required className="h-11 rounded-xl" />
                          </div>

                          <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-semibold flex items-center gap-1.5">
                              <ImageIcon className="w-4 h-4 text-blue-600" /> Image URL
                            </label>
                            <Input name="image" defaultValue={service.image || ""} placeholder="https://example.com/image.jpg" className="h-11 rounded-xl" />
                          </div>

                          <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-semibold">Description</label>
                            <textarea name="description" defaultValue={service.description} required className="flex min-h-[100px] w-full rounded-xl border px-3 py-3 text-sm bg-transparent"></textarea>
                          </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-4 pt-4 border-t">
                          <Button type="button" variant="outline" onClick={() => setEditModalId(null)}>Cancel</Button>
                          <Button type="submit" disabled={isActionLoading} className="bg-blue-600 hover:bg-blue-700 text-white font-bold">
                            {isActionLoading ? "Updating..." : "Save Changes"}
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <Button
                    onClick={() => handleDeleteService(service.id)}
                    variant="outline"
                    className="flex-1 h-10 text-rose-600 hover:bg-rose-500 hover:text-white font-bold"
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer Info */}
      <div className="p-4 bg-white dark:bg-[#07090e] border rounded-2xl flex items-center justify-between text-xs text-slate-500 font-medium">
        <span>Showing {filteredServices.length} services</span>
      </div>
    </div>
  );
}