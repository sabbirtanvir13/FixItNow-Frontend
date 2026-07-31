// import { getAllTechnicians } from "../_action/technicianAction";
// import SearchFilter from "../_component/SearchFilter";
// import TechnicianCard from "../_component/TechnicianCard";

import { getAllTechnicians } from "../_action/technicianAction";
import SearchFilter from "../_component/SearchFilter";
import TechnicianCard from "../_component/TechnicianCard";


// export default async function TechniciansPage({
//   searchParams,
// }: {
//   searchParams: Promise<{
//     search?: string;
//     category?: string;
//     location?: string;
//     rating?: string;
//     experience?: string;
//     sort?: string;
//   }>;
// }) {
//   const query = await searchParams;

//   const response = await getAllTechnicians();

//   if (!response?.success) {
//     return (
//       <div className="container mx-auto py-24 text-center">
//         <h2 className="text-2xl font-bold">No Technicians Found</h2>
//         <p className="mt-3 text-gray-500">
//           Please try again later.
//         </p>
//       </div>
//     );
//   }

//   let technicians = response.data || [];

//   // Search
//   if (query.search) {
//     technicians = technicians.filter((item: any) =>
//       item.name?.toLowerCase().includes(query.search!.toLowerCase())
//     );
//   }

//   // Category
//   if (query.category) {
//     technicians = technicians.filter(
//       (item: any) =>
//         item.profession?.toLowerCase() ===
//         query.category!.toLowerCase()
//     );
//   }

//   // Location
//   if (query.location) {
//     technicians = technicians.filter((item: any) =>
//       item.location
//         ?.toLowerCase()
//         .includes(query.location!.toLowerCase())
//     );
//   }

//   // Rating
//   if (query.rating) {
//     technicians = technicians.filter(
//       (item: any) => item.rating >= Number(query.rating)
//     );
//   }

//   // Experience
//   if (query.experience) {
//     technicians = technicians.filter(
//       (item: any) =>
//         item.experience >= Number(query.experience)
//     );
//   }

//   return (
//     <main>
//       {/* Hero */}
//       <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-20 text-white">
//         <div className="container mx-auto px-5 text-center">
//           <h1 className="text-4xl font-bold">
//             Find Trusted Technicians
//           </h1>

//           <p className="mt-5 max-w-2xl mx-auto text-lg text-blue-100">
//             Browse verified professionals, compare ratings,
//             experience and pricing, then book the right expert
//             for your home service.
//           </p>
//         </div>
//       </section>

//       {/* Search */}
//       <section className="container mx-auto -mt-10 px-5">
//         <SearchFilter/>
//       </section>

//       {/* Grid */}
//       <section className="container mx-auto py-16 px-5">

//         <div className="mb-8 flex items-center justify-between">
//           <h2 className="text-2xl font-bold">
//             Available Technicians
//           </h2>

//           <span className="text-gray-500">
//             {technicians.length} Results
//           </span>
//         </div>

//         {technicians.length === 0 ? (
//           <div className="rounded-xl border py-16 text-center">
//             <h3 className="text-xl font-semibold">
//               No Technician Found
//             </h3>

//             <p className="mt-3 text-gray-500">
//               Try changing your search filters.
//             </p>
//           </div>
//         ) : (
//           <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//             {technicians.map((technician: any) => (
//               <TechnicianCard
//                 key={technician.id}
//                 technician={technician}
//               />
//             ))}
//           </div>
//         )}
//       </section>
//     </main>
//   );
// }



export default async function TechniciansPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    category?: string;
    location?: string;
    rating?: string;
    experience?: string;
    sort?: string;
  }>;
}) {
  const query = await searchParams;

  const response = await getAllTechnicians();

  if (!response?.success) {
    return (
      <div className="container mx-auto py-24 text-center">
        <h2 className="text-2xl font-bold">No Technicians Found</h2>
        <p className="mt-3 text-gray-500">
          Please try again later.
        </p>
      </div>
    );
  }

  let technicians = response.data || [];

  // Search (works with technician.user.name & name)
  if (query.search) {
    const searchLower = query.search.toLowerCase();
    technicians = technicians.filter((item: any) => {
      const userName = item.user?.name?.toLowerCase() || "";
      const techName = item.name?.toLowerCase() || "";
      const profession = item.profession?.toLowerCase() || "";
      const bio = item.bio?.toLowerCase() || "";
      return (
        userName.includes(searchLower) ||
        techName.includes(searchLower) ||
        profession.includes(searchLower) ||
        bio.includes(searchLower)
      );
    });
  }

  // Category
  if (query.category) {
    const catLower = query.category.toLowerCase();
    technicians = technicians.filter((item: any) => {
      const matchServices = item.services?.some(
        (s: any) =>
          s.category?.name?.toLowerCase() === catLower ||
          s.title?.toLowerCase().includes(catLower)
      );
      const matchProfession = item.profession?.toLowerCase() === catLower;
      return matchServices || matchProfession;
    });
  }

  // Location
  if (query.location) {
    const locLower = query.location.toLowerCase();
    technicians = technicians.filter((item: any) =>
      item.location?.toLowerCase().includes(locLower)
    );
  }

  // Helper to calculate actual average rating from reviews
  const getAvgRating = (item: any): number => {
    if (item.reviews && item.reviews.length > 0) {
      const sum = item.reviews.reduce((acc: number, r: any) => acc + (r.rating || 0), 0);
      return sum / item.reviews.length;
    }
    return Number(item.rating || 0);
  };

  // Rating Filter (uses actual average rating from reviews)
  if (query.rating) {
    const minRating = Number(query.rating);
    technicians = technicians.filter(
      (item: any) => getAvgRating(item) >= minRating
    );
  }

  // Experience Filter (uses experience_years)
  if (query.experience) {
    const minExp = Number(query.experience);
    technicians = technicians.filter((item: any) => {
      const exp = item.experience_years ?? item.experience ?? 0;
      return Number(exp) >= minExp;
    });
  }

  // Sort (uses hourly_rate or services[0].price or startingPrice)
  if (query.sort) {
    const getTechPrice = (item: any) =>
      item.hourly_rate ?? item.services?.[0]?.price ?? item.startingPrice ?? 0;

    if (query.sort === "price-low") {
      technicians.sort((a: any, b: any) => getTechPrice(a) - getTechPrice(b));
    } else if (query.sort === "price-high") {
      technicians.sort((a: any, b: any) => getTechPrice(b) - getTechPrice(a));
    } else if (query.sort === "rating") {
      technicians.sort((a: any, b: any) => getAvgRating(b) - getAvgRating(a));
    }
  }

  return (
    <main className="min-h-screen bg-gray-50/50 pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-20 text-white">
        <div className="container mx-auto px-5 text-center">
          <h1 className="text-4xl font-bold">
            Find Trusted Technicians
          </h1>

          <p className="mt-5 max-w-2xl mx-auto text-lg text-blue-100">
            Browse verified professionals, compare ratings,
            experience and pricing, then book the right expert
            for your home service.
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="container mx-auto -mt-10 px-5">
        <SearchFilter />
      </section>

      {/* Grid */}
      <section className="container mx-auto py-16 px-5">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Available Technicians
          </h2>

          <span className="text-sm font-medium text-gray-500">
            {technicians.length} Results Found
          </span>
        </div>

        {technicians.length === 0 ? (
          <div className="rounded-xl border bg-white py-16 text-center shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800">
              No Technician Found
            </h3>

            <p className="mt-2 text-gray-500">
              Try changing or resetting your search filters.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {technicians.map((technician: any) => (
              <TechnicianCard
                key={technician.id || technician._id}
                technician={technician}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}