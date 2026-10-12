import { Metadata } from "next";
import { getAllTechnicians } from "../_action/technicianAction";
import { getAllCategoriesData, getCurrentCustomerAction } from "../_action/serviceAction";
import { TechniciansView } from "./TechniciansView";

export const metadata: Metadata = {
  title: "Find Trusted Technicians - Verified Home Service Experts | FixtNow",
  description:
    "Browse verified professionals, compare ratings, experience and pricing, then book the right expert for your home service across Bangladesh.",
};

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
    page?: string;
  }>;
}) {
  const query = await searchParams;

  // Convert query object into query string for backend API
  const queryParams = new URLSearchParams();
  if (query.search) queryParams.set("search", query.search);
  if (query.category) queryParams.set("category", query.category);
  if (query.location) queryParams.set("location", query.location);
  if (query.rating) queryParams.set("rating", query.rating);
  if (query.experience) queryParams.set("experience", query.experience);
  if (query.sort) queryParams.set("sort", query.sort);
  if (query.page) queryParams.set("page", query.page);

  const queryString = queryParams.toString();

  // Fetch real technicians, categories, and authenticated customer
  const [techResponse, catResponse, userResponse] = await Promise.all([
    getAllTechnicians(queryString),
    getAllCategoriesData(),
    getCurrentCustomerAction(),
  ]);

  const technicians = techResponse?.success && Array.isArray(techResponse.data) ? techResponse.data : [];
  const categories = catResponse?.success && Array.isArray(catResponse.data) ? catResponse.data : [];
  const currentUser = userResponse?.authenticated ? userResponse.data : null;

  return (
    <TechniciansView
      initialTechnicians={technicians}
      categories={categories}
      initialUser={currentUser}
      initialQuery={query}
    />
  );
}