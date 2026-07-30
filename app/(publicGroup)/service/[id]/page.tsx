


// import Link from "next/link";
// import Image from "next/image";
// import { getDataById } from "../../_action/serviceAction";
// import { 
//   MapPin, 
//   Clock, 
//   ShieldCheck, 
//   UserCheck, 
//   ArrowLeft, 
//   CheckCircle2, 
//   Sparkles,
//   ChevronRight,
//   Zap,
//   Award,
//   Star
// } from "lucide-react";

// interface ServiceDetailsPageProps {
//   params: Promise<{
//     id: string;
//   }>;
// }

// export default async function ServiceDetailsPage({ params }: ServiceDetailsPageProps) {
//   const { id } = await params;
//   const response = await getDataById("services", id);

//   // 🔴 404 / Not Found UI Component
//   if (!response.success || !response.data) {
//     return (
//       <div className="flex flex-col justify-center items-center min-h-[80vh] px-4 bg-slate-50">
//         <div className="bg-white/80 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-2xl shadow-slate-200/60 flex flex-col items-center max-w-md text-center border border-slate-200/80 transition-all">
//           <div className="w-20 h-20 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-6 shadow-inner ring-8 ring-red-50/50">
//             <ShieldCheck className="w-10 h-10 stroke-[1.5]" />
//           </div>
//           <h2 className="text-slate-900 text-2xl font-black mb-2 tracking-tight">Service Not Found</h2>
//           <p className="text-slate-500 text-sm leading-relaxed mb-8">
//             {response.message || "The service you are looking for is currently unavailable or may have been removed."}
//           </p>
//           <Link 
//             href="/service" 
//             className="w-full bg-slate-900 hover:bg-indigo-600 text-white px-6 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 shadow-lg shadow-slate-900/10 hover:shadow-indigo-500/25 flex items-center justify-center gap-2 group"
//           >
//             <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
//             Explore Other Services
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const service = response.data;

//   return (
//     <div className="min-h-screen bg-slate-50/60 py-8 sm:py-12 selection:bg-indigo-500 selection:text-white">
//       {/* Background Ambient Glows */}
//       <div className="fixed top-0 left-1/4 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
//       <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
//         {/* 🔙 Navigation Bar */}
//         <div className="flex items-center justify-between mb-6">
//           <Link 
//             href="/service" 
//             className="group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-all bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-indigo-100"
//           >
//             <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
//             Back to Services
//           </Link>

//           <span className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200/60">
//             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
//             Verified & Available
//           </span>
//         </div>

//         {/* 🌟 HERO & DETAIL CONTAINER */}
//         <div className="space-y-8">

//           {/* Banner & Title Section */}
//           <div className="relative w-full rounded-[2rem] overflow-hidden bg-slate-900 border border-slate-200/80 shadow-2xl shadow-slate-200/50 group">
            
//             {/* Banner Image */}
//             <div className="relative w-full h-[45vh] sm:h-[55vh] min-h-[380px]">
//               <Image 
//                 src={service.image || "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop"} 
//                 alt={service.title} 
//                 fill
//                 priority
//                 className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105 opacity-90"
//               />
//               {/* Modern Multi-layer Overlay Gradient */}
//               <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
//               <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-transparent" />
//             </div>

//             {/* Overlaid Banner Content */}
//             <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
              
//               <div className="max-w-2xl space-y-3">
//                 {service.category && (
//                   <span className="inline-flex items-center gap-1.5 bg-indigo-500/20 backdrop-blur-xl text-indigo-200 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider border border-indigo-400/30">
//                     <Sparkles className="size-3.5 text-indigo-300" />
//                     {service.category.name}
//                   </span>
//                 )}
                
//                 <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-md">
//                   {service.title}
//                 </h1>
//               </div>

//               {/* Dynamic Modern Price Badge */}
//               <div className="flex flex-col items-start md:items-end shrink-0">
//                 <span className="text-xs uppercase font-bold tracking-widest text-indigo-200/80 mb-1">Service Fee</span>
//                 <div className="flex items-baseline gap-1 bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-2xl shadow-2xl">
//                   <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">৳{service.price}</span>
//                   <span className="text-xs text-indigo-200 font-medium">/ Fixed</span>
//                 </div>
//               </div>

//             </div>
//           </div>

//           {/* 📊 MAIN CONTENT GRID */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

//             {/* LEFT COLUMN: Key Stats & Full Description (2 Columns on Desktop) */}
//             <div className="lg:col-span-2 space-y-8">

//               {/* Highlight Quick Stats Cards */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
//                 {/* Location Card */}
//                 <div className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-sm hover:shadow-md transition-all flex items-center gap-4 group">
//                   <div className="p-3.5 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
//                     <MapPin className="size-6 stroke-[1.8]" />
//                   </div>
//                   <div>
//                     <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Service Location</span>
//                     <span className="text-base font-bold text-slate-800">{service.location}</span>
//                   </div>
//                 </div>

//                 {/* Duration Card */}
//                 <div className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-sm hover:shadow-md transition-all flex items-center gap-4 group">
//                   <div className="p-3.5 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
//                     <Clock className="size-6 stroke-[1.8]" />
//                   </div>
//                   <div>
//                     <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Estimated Duration</span>
//                     <span className="text-base font-bold text-slate-800">{service.duration} Minutes</span>
//                   </div>
//                 </div>

//               </div>

//               {/* Service Description Section */}
//               <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/70 shadow-sm space-y-6">
                
//                 <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
//                   <div className="p-2.5 bg-slate-100 rounded-xl text-slate-800">
//                     <Zap className="size-5 fill-slate-800" />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-bold text-slate-900">Service Overview</h3>
//                     <p className="text-xs text-slate-500">Everything you need to know about this service</p>
//                   </div>
//                 </div>

//                 {/* Styled Text Content */}
//                 <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-base sm:text-lg whitespace-pre-line">
//                   {service.description}
//                 </div>

//                 {/* Quality Guarantees Pills */}
//                 <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
//                   <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
//                     <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
//                     <span>Background Checked</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
//                     <Award className="size-4 text-indigo-500 shrink-0" />
//                     <span>100% Quality Guaranteed</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
//                     <Star className="size-4 text-amber-500 shrink-0" />
//                     <span>Top Rated Professional</span>
//                   </div>
//                 </div>

//               </div>

//             </div>

//             {/* RIGHT COLUMN: Sticky Booking CTA & Expert Profile (1 Column) */}
//             <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-8">

//               {/* 🎯 Sticky Booking Action Card */}
//               <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/50 space-y-6">
                
//                 <div className="space-y-2">
//                   <div className="flex items-center justify-between text-sm font-semibold text-slate-500">
//                     <span>Base Price</span>
//                     <span className="text-slate-900 font-bold">৳{service.price}</span>
//                   </div>
//                   <div className="flex items-center justify-between text-sm font-semibold text-slate-500">
//                     <span>Service Fee</span>
//                     <span className="text-emerald-600 font-bold">FREE</span>
//                   </div>
//                   <hr className="border-dashed border-slate-200 my-2" />
//                   <div className="flex items-center justify-between text-base font-extrabold text-slate-900">
//                     <span>Total Amount</span>
//                     <span className="text-2xl font-black text-indigo-600">৳{service.price}</span>
//                   </div>
//                 </div>

//                 {/* Primary CTA Button */}
//                 <button className="group relative w-full bg-slate-900 hover:bg-indigo-600 text-white py-4 px-6 rounded-2xl font-bold text-base transition-all duration-300 shadow-xl shadow-slate-900/10 hover:shadow-indigo-500/25 flex items-center justify-center gap-2">
//                   <span>Book Service Now</span>
//                   <ChevronRight className="size-5 transition-transform group-hover:translate-x-1" />
//                 </button>

//                 <p className="text-center text-xs text-slate-400 flex items-center justify-center gap-1.5 font-medium">
//                   <ShieldCheck className="size-4 text-emerald-500" />
//                   Instant Confirmation & Protection
//                 </p>
//               </div>

//               {/* 👷 Technician Profile Card */}
//               {service.technician && service.technician.user && (
//                 <div className="bg-gradient-to-b from-white to-indigo-50/30 p-6 rounded-3xl border border-slate-200/80 shadow-sm relative overflow-hidden">
                  
//                   <div className="flex items-center justify-between mb-5">
//                     <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider flex items-center gap-1.5 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
//                       <UserCheck className="size-3.5" /> Assigned Specialist
//                     </span>
//                   </div>

//                   <div className="flex flex-col items-center text-center">
                    
//                     {/* Profile Photo */}
//                     <div className="relative mb-4">
//                       <img 
//                         src={service.technician.profilePhoto || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop"} 
//                         alt={service.technician.user.name} 
//                         className="w-20 h-20 rounded-full object-cover shadow-md ring-4 ring-white"
//                       />
//                       <div className="absolute bottom-0 right-0 bg-emerald-500 p-1 rounded-full text-white ring-2 ring-white" title="Verified Expert">
//                         <CheckCircle2 className="size-3.5 stroke-[2.5]" />
//                       </div>
//                     </div>

//                     <h4 className="text-lg font-extrabold text-slate-900">{service.technician.user.name}</h4>
                    
//                     <p className="text-xs text-slate-500 mt-1 mb-4 line-clamp-2 leading-relaxed max-w-xs">
//                       {service.technician.bio || "Certified & highly skilled professional dedicated to high service standards."}
//                     </p>

//                     {/* Skills Pills */}
//                     {service.technician.skills && service.technician.skills.length > 0 && (
//                       <div className="flex flex-wrap justify-center gap-1.5 w-full">
//                         {service.technician.skills.map((skill: string, index: number) => (
//                           <span 
//                             key={index} 
//                             className="bg-white text-slate-600 text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-slate-200/80 shadow-2xl"
//                           >
//                             {skill}
//                           </span>
//                         ))}
//                       </div>
//                     )}

//                   </div>
//                 </div>
//               )}

//             </div>

//           </div>

//         </div>

//       </div>
//     </div>
//   );
// }

import Link from "next/link";
import Image from "next/image";
import { getDataById } from "../../_action/serviceAction";
import { 
  MapPin, 
  Clock, 
  ShieldCheck, 
  UserCheck, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles,
  ChevronRight,
  Zap,
  Award,
  Star
} from "lucide-react";

interface ServiceDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ServiceDetailsPage({ params }: ServiceDetailsPageProps) {
  const { id } = await params;
  const response = await getDataById("services", id);

  if (!response.success || !response.data) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[80vh] px-4 bg-slate-50">
        <div className="bg-white/80 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-2xl shadow-slate-200/60 flex flex-col items-center max-w-md text-center border border-slate-200/80 transition-all">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-6 shadow-inner ring-8 ring-red-50/50">
            <ShieldCheck className="w-10 h-10 stroke-[1.5]" />
          </div>
          <h2 className="text-slate-900 text-2xl font-black mb-2 tracking-tight">Service Not Found</h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-8">
            {response.message || "The service you are looking for is currently unavailable or may have been removed."}
          </p>
          <Link 
            href="/service" 
            className="w-full bg-slate-900 hover:bg-indigo-600 text-white px-6 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 shadow-lg shadow-slate-900/10 hover:shadow-indigo-500/25 flex items-center justify-center gap-2 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Explore Other Services
          </Link>
        </div>
      </div>
    );
  }

  const service = response.data;
  const serviceId = service._id || service.id;

  return (
    <div className="min-h-screen bg-slate-50/60 py-8 sm:py-12 selection:bg-indigo-500 selection:text-white">
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between mb-6">
          <Link 
            href="/service" 
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-all bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-indigo-100"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Back to Services
          </Link>

          <span className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200/60">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Verified & Available
          </span>
        </div>

        {/* Hero Banner Section */}
        <div className="space-y-8">
          <div className="relative w-full rounded-[2rem] overflow-hidden bg-slate-900 border border-slate-200/80 shadow-2xl shadow-slate-200/50 group">
            <div className="relative w-full h-[45vh] sm:h-[55vh] min-h-[380px]">
              <Image 
                src={service.image || "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop"} 
                alt={service.title} 
                fill
                priority
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-transparent" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl space-y-3">
                {service.category && (
                  <span className="inline-flex items-center gap-1.5 bg-indigo-500/20 backdrop-blur-xl text-indigo-200 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider border border-indigo-400/30">
                    <Sparkles className="size-3.5 text-indigo-300" />
                    {service.category.name}
                  </span>
                )}
                
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                  {service.title}
                </h1>
              </div>

              <div className="flex flex-col items-start md:items-end shrink-0">
                <span className="text-xs uppercase font-bold tracking-widest text-indigo-200/80 mb-1">Service Fee</span>
                <div className="flex items-baseline gap-1 bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-2xl shadow-2xl">
                  <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">৳{service.price}</span>
                  <span className="text-xs text-indigo-200 font-medium">/ Fixed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-sm hover:shadow-md transition-all flex items-center gap-4 group">
                  <div className="p-3.5 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                    <MapPin className="size-6 stroke-[1.8]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Service Location</span>
                    <span className="text-base font-bold text-slate-800">{service.location}</span>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-sm hover:shadow-md transition-all flex items-center gap-4 group">
                  <div className="p-3.5 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    <Clock className="size-6 stroke-[1.8]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Estimated Duration</span>
                    <span className="text-base font-bold text-slate-800">{service.duration} Minutes</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/70 shadow-sm space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                  <div className="p-2.5 bg-slate-100 rounded-xl text-slate-800">
                    <Zap className="size-5 fill-slate-800" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Service Overview</h3>
                    <p className="text-xs text-slate-500">Everything you need to know about this service</p>
                  </div>
                </div>

                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-base sm:text-lg whitespace-pre-line">
                  {service.description}
                </div>

                <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                    <span>Background Checked</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <Award className="size-4 text-indigo-500 shrink-0" />
                    <span>100% Quality Guaranteed</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <Star className="size-4 text-amber-500 shrink-0" />
                    <span>Top Rated Professional</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Booking & Technician */}
            <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-8">
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/50 space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm font-semibold text-slate-500">
                    <span>Base Price</span>
                    <span className="text-slate-900 font-bold">৳{service.price}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-semibold text-slate-500">
                    <span>Service Fee</span>
                    <span className="text-emerald-600 font-bold">FREE</span>
                  </div>
                  <hr className="border-dashed border-slate-200 my-2" />
                  <div className="flex items-center justify-between text-base font-extrabold text-slate-900">
                    <span>Total Amount</span>
                    <span className="text-2xl font-black text-indigo-600">৳{service.price}</span>
                  </div>
                </div>

                {/* 🌟 Booking Link target */}
                <Link 
                  href={`/checkout/${serviceId}`}
                  className="group relative w-full bg-slate-900 hover:bg-indigo-600 text-white py-4 px-6 rounded-2xl font-bold text-base transition-all duration-300 shadow-xl shadow-slate-900/10 hover:shadow-indigo-500/25 flex items-center justify-center gap-2"
                >
                  <span>Book Service Now</span>
                  <ChevronRight className="size-5 transition-transform group-hover:translate-x-1" />
                </Link>

                <p className="text-center text-xs text-slate-400 flex items-center justify-center gap-1.5 font-medium">
                  <ShieldCheck className="size-4 text-emerald-500" />
                  Instant Confirmation & Protection
                </p>
              </div>

              {/* Technician Profile Card */}
              {service.technician && service.technician.user && (
                <div className="bg-gradient-to-b from-white to-indigo-50/30 p-6 rounded-3xl border border-slate-200/80 shadow-sm relative overflow-hidden">
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider flex items-center gap-1.5 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                      <UserCheck className="size-3.5" /> Assigned Specialist
                    </span>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-20 h-20 mb-4">
                      <Image 
                        src={service.technician.profilePhoto || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop"} 
                        alt={service.technician.user.name} 
                        fill
                        className="rounded-full object-cover shadow-md ring-4 ring-white"
                      />
                      <div className="absolute bottom-0 right-0 bg-emerald-500 p-1 rounded-full text-white ring-2 ring-white" title="Verified Expert">
                        <CheckCircle2 className="size-3.5 stroke-[2.5]" />
                      </div>
                    </div>

                    <h4 className="text-lg font-extrabold text-slate-900">{service.technician.user.name}</h4>
                    
                    <p className="text-xs text-slate-500 mt-1 mb-4 line-clamp-2 leading-relaxed max-w-xs">
                      {service.technician.bio || "Certified & highly skilled professional dedicated to high service standards."}
                    </p>

                    {service.technician.skills && service.technician.skills.length > 0 && (
                      <div className="flex flex-wrap justify-center gap-1.5 w-full">
                        {service.technician.skills.map((skill: string, index: number) => (
                          <span 
                            key={index} 
                            className="bg-white text-slate-600 text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-slate-200/80 shadow-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}