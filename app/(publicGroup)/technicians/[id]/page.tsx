


// import Image from "next/image";
// import Link from "next/link";
// import {
//   Star,
//   MapPin,
//   Briefcase,
//   BadgeCheck,
//   CheckCircle2,
//   XCircle,
//   ArrowLeft
// } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { getTechnicianById } from "../../_action/technicianAction";

// export default async function TechnicianDetailPage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;
//   const response = await getTechnicianById(id);

//   if (!response?.success || !response.data) {
//     return (
//       <div className="container mx-auto py-24 text-center">
//         <h2 className="text-2xl font-bold">Technician Not Found</h2>
//         <p className="mt-3 text-gray-500">
//           The technician profile you are looking for does not exist or has been removed.
//         </p>
//         <Link href="/technicians">
//           <Button className="mt-5">Back to Technicians</Button>
//         </Link>
//       </div>
//     );
//   }

//   const tech = response.data;

//   // Property Mappings strictly from API response
//   const name = tech.user?.name || tech.name || "Technician";
//   const email = tech.user?.email || "";
//   const image =
//     tech.profilePhoto ||
//     tech.profileImage ||
//     "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=800";
//   const experience = tech.experience_years ?? tech.experience;
//   const location = tech.location;
//   const bio = tech.bio;
//   const skills = tech.skills || [];
//   const services = tech.services || [];
//   const price = tech.hourly_rate ?? services[0]?.price ?? tech.startingPrice;
//   const reviews = tech.reviews || [];
//   const availabilities = tech.availabilities || [];

//   const categoryName =
//     services[0]?.category?.name ||
//     services[0]?.title ||
//     tech.profession ||
//     "Home Service Expert";

//   const totalReviews = reviews.length > 0 ? reviews.length : (tech.total_reviews ?? tech.totalReviews ?? 0);
//   const rating =
//     reviews.length > 0
//       ? Number(
//         (
//           reviews.reduce((acc: number, curr: any) => acc + (curr.rating || 0), 0) /
//           reviews.length
//         ).toFixed(1)
//       )
//       : (tech.rating ?? 0);

//   return (
//     <main className="min-h-screen bg-gray-50/50 py-10">
//       <div className="container mx-auto max-w-6xl px-5 space-y-8">

//         {/* Back Button */}
//         <div>
//           <Link
//             href="/technicians"
//             className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
//           >
//             <ArrowLeft className="h-4 w-4" /> Back to Technicians
//           </Link>
//         </div>

//         {/* 1. Hero Section */}
//         <Card className="overflow-hidden border border-gray-200 shadow-sm rounded-2xl bg-white">
//           <CardContent className="p-6 md:p-8">
//             <div className="flex flex-col md:flex-row items-center gap-6">
//               <div className="relative h-32 w-32 md:h-40 md:w-40 flex-shrink-0 overflow-hidden rounded-2xl border">
//                 <Image
//                   src={image}
//                   alt={name}
//                   fill
//                   className="object-cover"
//                 />
//               </div>

//               <div className="flex-1 text-center md:text-left space-y-2">
//                 <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
//                   <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
//                     {name}
//                   </h1>
//                   {tech.isVerified && (
//                     <Badge className="bg-green-600 hover:bg-green-700">
//                       <BadgeCheck className="mr-1 h-3.5 w-3.5" /> Verified
//                     </Badge>
//                   )}
//                 </div>

//                 <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-600">
//                   <span className="flex items-center gap-1 font-semibold text-amber-500">
//                     <Star className="h-4 w-4 fill-amber-400" />
//                     {rating > 0 ? rating : "New"} ({totalReviews} Reviews)
//                   </span>
//                   {location && (
//                     <span className="flex items-center gap-1">
//                       <MapPin className="h-4 w-4 text-blue-600" />
//                       {location}
//                     </span>
//                   )}
//                   {email && (
//                     <span className="flex items-center gap-1 text-gray-500">
//                       ✉️ {email}
//                     </span>
//                   )}
//                   {experience !== undefined && experience !== null && (
//                     <span className="flex items-center gap-1">
//                       <Briefcase className="h-4 w-4 text-blue-600" />
//                       {experience} Years Experience
//                     </span>
//                   )}
//                 </div>

//                 <p className="text-sm font-medium text-gray-500">
//                   🛠 {categoryName}
//                 </p>

//                 {price !== undefined && price !== null ? (
//                   <p className="text-xl font-bold text-blue-600">
//                     ৳ {price} <span className="text-sm text-gray-500 font-normal">{tech.hourly_rate ? "/ Hour" : "/ Visit"}</span>
//                   </p>
//                 ) : (
//                   <p className="text-xl font-bold text-blue-600">
//                     Price: <span className="font-normal text-gray-600">Negotiable</span>
//                   </p>
//                 )}
//               </div>

//               <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto">
//                 <Button className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-5">
//                   Book Now
//                 </Button>
//                 <Button variant="outline" className="w-full rounded-xl px-6 py-5">
//                   Contact
//                 </Button>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* 2. Details Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2 space-y-8">

//             {/* About */}
//             <Card className="rounded-2xl border border-gray-200 bg-white">
//               <CardHeader>
//                 <CardTitle className="text-xl">About</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4 text-gray-600">
//                 <p className="text-sm leading-relaxed">
//                   {bio || "No biography provided."}
//                 </p>
//                 <hr />
//                 <div className="grid grid-cols-2 gap-4 text-sm">
//                   <div>
//                     <span className="text-gray-400 block">Experience</span>
//                     <span className="font-semibold text-gray-800">{experience !== undefined && experience !== null ? `${experience}+ Years` : "N/A"}</span>
//                   </div>
//                   <div>
//                     <span className="text-gray-400 block">Working Area</span>
//                     <span className="font-semibold text-gray-800">{location || "N/A"}</span>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Dynamic Skills */}
//             {skills.length > 0 && (
//               <Card className="rounded-2xl border border-gray-200 bg-white">
//                 <CardHeader>
//                   <CardTitle className="text-xl">Skills</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex flex-wrap gap-2">
//                     {skills.map((skill: string, index: number) => (
//                       <Badge key={index} variant="secondary" className="px-3 py-1.5 text-sm rounded-lg">
//                         🏷 {skill}
//                       </Badge>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             )}

//             {/* Dynamic Services */}
//             <Card className="rounded-2xl border border-gray-200 bg-white">
//               <CardHeader>
//                 <CardTitle className="text-xl">Services</CardTitle>
//               </CardHeader>
//               <CardContent className="p-0">
//                 {services.length > 0 ? (
//                   <div className="divide-y divide-gray-100">
//                     {services.map((service: any) => (
//                       <div key={service.id || service._id} className="flex justify-between items-center p-4">
//                         <span className="font-medium text-gray-800">{service.title || service.name}</span>
//                         <span className="font-bold text-blue-600">৳{service.price}</span>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="p-4 text-sm text-gray-500">No specific services listed.</p>
//                 )}
//               </CardContent>
//             </Card>

//             {/* Dynamic Availability */}
//             {availabilities.length > 0 && (
//               <Card className="rounded-2xl border border-gray-200 bg-white">
//                 <CardHeader>
//                   <CardTitle className="text-xl">Availability</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
//                     {availabilities.map((slot: any, idx: number) => (
//                       <div
//                         key={idx}
//                         className={`flex items-center justify-between border rounded-xl p-3 ${slot.isAvailable ? "bg-green-50/50 border-green-200" : "bg-red-50/50 border-red-200 opacity-60"
//                           }`}
//                       >
//                         <span className="text-sm font-medium">{slot.time}</span>
//                         {slot.isAvailable ? (
//                           <CheckCircle2 className="h-4 w-4 text-green-600" />
//                         ) : (
//                           <XCircle className="h-4 w-4 text-red-500" />
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             )}

//             {/* Dynamic Reviews */}
//             <Card className="rounded-2xl border border-gray-200 bg-white">
//               <CardHeader>
//                 <CardTitle className="text-xl">Customer Reviews</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 {reviews.length > 0 ? (
//                   reviews.map((review: any) => (
//                     <div key={review.id || review._id} className="border-b last:border-0 pb-4 last:pb-0">
//                       <div className="flex items-center justify-between mb-1">
//                         <h5 className="font-semibold text-gray-900">👤 {review.reviewerName || review.user?.name || "Customer"}</h5>
//                         <div className="flex text-amber-500">
//                           {[...Array(review.rating || 5)].map((_, i) => (
//                             <Star key={i} className="h-4 w-4 fill-amber-400" />
//                           ))}
//                         </div>
//                       </div>
//                       <p className="text-sm text-gray-600">{review.comment}</p>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-sm text-gray-500">No reviews yet.</p>
//                 )}
//               </CardContent>
//             </Card>

//           </div>

//           {/* Booking Form Dropdown Dynamic Binding */}
//           <div className="space-y-8">
//             <Card className="sticky top-6 rounded-2xl border border-gray-200 shadow-md bg-white">
//               <CardHeader className="bg-blue-50/50 border-b">
//                 <CardTitle className="text-xl">Booking Card</CardTitle>
//                 <p className="text-2xl font-bold text-blue-600 mt-1">
//                   ৳{price ?? 0}
//                 </p>
//               </CardHeader>
//               <CardContent className="p-6 space-y-4">
//                 <div>
//                   <label className="text-xs font-semibold text-gray-500 block mb-1">Select Service</label>
//                   <select className="w-full border rounded-xl p-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
//                     {services.length > 0 ? (
//                       services.map((srv: any) => (
//                         <option key={srv.id || srv._id}>{srv.title || srv.name} (৳{srv.price})</option>
//                       ))
//                     ) : (
//                       <option>General Service (৳{price ?? 0})</option>
//                     )}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="text-xs font-semibold text-gray-500 block mb-1">Select Date</label>
//                   <input type="date" className="w-full border rounded-xl p-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
//                 </div>

//                 <Button className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 py-6 text-base font-semibold">
//                   Book Appointment
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>

//         </div>
//       </div>
//     </main>
//   );
// }

import Image from "next/image";
import Link from "next/link";
import {
  Star,
  MapPin,
  Briefcase,
  BadgeCheck,
  CheckCircle2,
  XCircle,
  ArrowLeft
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTechnicianById } from "../../_action/technicianAction";

export default async function TechnicianDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await getTechnicianById(id);

  if (!response?.success || !response.data) {
    return (
      <div className="container mx-auto py-24 text-center">
        <h2 className="text-2xl font-bold">Technician Not Found</h2>
        <p className="mt-3 text-gray-500">
          The technician profile you are looking for does not exist or has been removed.
        </p>
        <Link href="/technicians">
          <Button className="mt-5">Back to Technicians</Button>
        </Link>
      </div>
    );
  }

  const tech = response.data;

  // Property Mappings strictly from API response
  const name = tech.user?.name || tech.name || "Technician";
  const email = tech.user?.email || "";
  const image =
    tech.profilePhoto ||
    tech.profileImage ||
    "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=800";
  const experience = tech.experience_years ?? tech.experience;
  const location = tech.location;
  const bio = tech.bio;
  const skills = tech.skills || [];
  const services = tech.services || [];
  const price = tech.hourly_rate ?? services[0]?.price ?? tech.startingPrice;
  const reviews = tech.reviews || [];
  const availabilities = tech.availabilities || [];

  const categoryName =
    services[0]?.category?.name ||
    services[0]?.title ||
    tech.profession ||
    "Home Service Expert";

  const totalReviews = reviews.length > 0 ? reviews.length : (tech.total_reviews ?? tech.totalReviews ?? 0);
  const rating =
    reviews.length > 0
      ? Number(
        (
          reviews.reduce((acc: number, curr: any) => acc + (curr.rating || 0), 0) /
          reviews.length
        ).toFixed(1)
      )
      : (tech.rating ?? 0);

  return (
    <main className="min-h-screen bg-gray-50/50 py-10">
      <div className="container mx-auto max-w-5xl px-5 space-y-8">

        {/* Back Button */}
        <div>
          <Link
            href="/technicians"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Technicians
          </Link>
        </div>

        {/* 1. Hero Section */}
        <Card className="overflow-hidden border border-gray-200 shadow-sm rounded-2xl bg-white">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative h-32 w-32 md:h-40 md:w-40 flex-shrink-0 overflow-hidden rounded-2xl border">
                <Image
                  src={image}
                  alt={name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 text-center md:text-left space-y-2">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {name}
                  </h1>
                  {tech.isVerified && (
                    <Badge className="bg-green-600 hover:bg-green-700">
                      <BadgeCheck className="mr-1 h-3.5 w-3.5" /> Verified
                    </Badge>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1 font-semibold text-amber-500">
                    <Star className="h-4 w-4 fill-amber-400" />
                    {rating > 0 ? rating : "New"} ({totalReviews} Reviews)
                  </span>
                  {location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      {location}
                    </span>
                  )}
                  {email && (
                    <span className="flex items-center gap-1 text-gray-500">
                      ✉️ {email}
                    </span>
                  )}
                  {experience !== undefined && experience !== null && (
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4 text-blue-600" />
                      {experience} Years Experience
                    </span>
                  )}
                </div>

                <p className="text-sm font-medium text-gray-500">
                  🛠 {categoryName}
                </p>

                {price !== undefined && price !== null ? (
                  <p className="text-xl font-bold text-blue-600">
                    ৳ {price} <span className="text-sm text-gray-500 font-normal">{tech.hourly_rate ? "/ Hour" : "/ Visit"}</span>
                  </p>
                ) : (
                  <p className="text-xl font-bold text-blue-600">
                    Price: <span className="font-normal text-gray-600">Negotiable</span>
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto">
                <Button className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 px-6 py-5">
                  Book Now
                </Button>
                <Button variant="outline" className="w-full rounded-xl px-6 py-5">
                  Contact
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. Details Section */}
        <div className="space-y-8">

          {/* About */}
          <Card className="rounded-2xl border border-gray-200 bg-white">
            <CardHeader>
              <CardTitle className="text-xl">About</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-600">
              <p className="text-sm leading-relaxed">
                {bio || "No biography provided."}
              </p>
              <hr />
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400 block">Experience</span>
                  <span className="font-semibold text-gray-800">{experience !== undefined && experience !== null ? `${experience}+ Years` : "N/A"}</span>
                </div>
                <div>
                  <span className="text-gray-400 block">Working Area</span>
                  <span className="font-semibold text-gray-800">{location || "N/A"}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dynamic Skills */}
          {skills.length > 0 && (
            <Card className="rounded-2xl border border-gray-200 bg-white">
              <CardHeader>
                <CardTitle className="text-xl">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill: string, index: number) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1.5 text-sm rounded-lg">
                      🏷 {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Dynamic Services */}
          <Card className="rounded-2xl border border-gray-200 bg-white">
            <CardHeader>
              <CardTitle className="text-xl">Services</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {services.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {services.map((service: any) => (
                    <div key={service.id || service._id} className="flex justify-between items-center p-4">
                      <span className="font-medium text-gray-800">{service.title || service.name}</span>
                      <span className="font-bold text-blue-600">৳{service.price}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="p-4 text-sm text-gray-500">No specific services listed.</p>
              )}
            </CardContent>
          </Card>

          {/* Dynamic Availability */}
          {availabilities.length > 0 && (
            <Card className="rounded-2xl border border-gray-200 bg-white">
              <CardHeader>
                <CardTitle className="text-xl">Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {availabilities.map((slot: any, idx: number) => (
                    <div
                      key={idx}
                      className={`flex items-center justify-between border rounded-xl p-3 ${slot.isAvailable ? "bg-green-50/50 border-green-200" : "bg-red-50/50 border-red-200 opacity-60"
                        }`}
                    >
                      <span className="text-sm font-medium">{slot.time}</span>
                      {slot.isAvailable ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Dynamic Reviews */}
          <Card className="rounded-2xl border border-gray-200 bg-white">
            <CardHeader>
              <CardTitle className="text-xl">Customer Reviews</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {reviews.length > 0 ? (
                reviews.map((review: any) => (
                  <div key={review.id || review._id} className="border-b last:border-0 pb-4 last:pb-0">
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="font-semibold text-gray-900">👤 {review.reviewerName || review.user?.name || "Customer"}</h5>
                      <div className="flex text-amber-500">
                        {[...Array(review.rating || 5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{review.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No reviews yet.</p>
              )}
            </CardContent>
          </Card>

        </div>
      </div>
    </main>
  );
}