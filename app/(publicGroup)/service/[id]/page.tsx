import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import {
  getDataById,
  getCurrentCustomerAction,
  getTechnicianDetailsAction,
} from "../../_action/serviceAction";
import { ServiceDetailView } from "./ServiceDetailView";

interface ServiceDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: ServiceDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const response = await getDataById("services", id);

  if (!response?.success || !response?.data) {
    return {
      title: "Service Details | FixtNow",
      description: "Book reliable and verified home repair services on FixtNow.",
    };
  }

  const service = response.data;
  return {
    title: `${service.title} - Book Verified Service | FixtNow`,
    description:
      service.description ||
      `Professional ${service.title} in ${service.location || "Bangladesh"}. Verified technicians, transparent pricing, 30-day warranty.`,
    openGraph: {
      title: `${service.title} | FixtNow`,
      description: service.description || "Expert service at your doorstep.",
      images: service.image ? [{ url: service.image }] : [],
    },
  };
}

export default async function ServiceDetailsPage({
  params,
}: ServiceDetailsPageProps) {
  const { id } = await params;

  // 1. Authoritatively fetch the service details from backend
  const response = await getDataById("services", id);

  if (!response?.success || !response?.data) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[75vh] px-4 bg-[#F5F7FA]">
        <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl shadow-slate-200/50 flex flex-col items-center max-w-md text-center border border-slate-200/80">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-5 ring-8 ring-red-50/50">
            <ShieldAlert className="w-8 h-8 stroke-[1.8]" />
          </div>
          <h2 className="text-[#0B1729] text-2xl font-black mb-2 tracking-tight">
            Service Not Found
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6">
            {response?.message ||
              "The requested service could not be located. It may have been retired or temporarily disabled."}
          </p>
          <Link
            href="/service"
            className="w-full bg-[#0B1729] hover:bg-[#FF6B00] text-white px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 shadow-md flex items-center justify-center gap-2 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Explore Available Services
          </Link>
        </div>
      </div>
    );
  }

  const service = response.data;

  // 2. Fetch authenticated user data (if logged in) to pre-fill customer fields
  const userResult = await getCurrentCustomerAction();
  const currentUser = userResult?.authenticated ? userResult.data : null;

  // 3. Fetch full technician profile if technician_id exists
  let technicianDetails = null;
  const techId = service.technician_id || service.technician?.id;
  if (techId) {
    const techRes = await getTechnicianDetailsAction(techId);
    if (techRes?.success && techRes?.data) {
      technicianDetails = techRes.data;
    }
  }

  return (
    <ServiceDetailView
      service={service}
      initialUser={currentUser}
      technicianDetails={technicianDetails}
    />
  );
}