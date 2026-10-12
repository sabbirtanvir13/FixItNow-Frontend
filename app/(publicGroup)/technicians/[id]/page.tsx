import Link from "next/link";
import { ArrowLeft, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTechnicianById } from "../../_action/technicianAction";
import { TechnicianProfileView } from "./TechnicianProfileView";

export default async function TechnicianDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await getTechnicianById(id);

  if (!response?.success || !response.data) {
    return (
      <main className="min-h-screen bg-[#F5F7FA] flex items-center justify-center px-4 py-24">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200/80 p-8 text-center shadow-lg shadow-slate-200/50 space-y-5">
          <div className="size-16 bg-orange-50 text-[#FF6B00] rounded-2xl flex items-center justify-center mx-auto shadow-inner">
            <UserX className="size-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Technician Not Found
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed">
              The technician profile you are looking for does not exist or may have been removed.
            </p>
          </div>

          <Link href="/technicians" className="block pt-2">
            <button
              type="button"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#0B1729] hover:bg-slate-800 text-white text-sm font-semibold transition-all shadow-md"
            >
              <ArrowLeft className="size-4" />
              <span>Back to Technicians</span>
            </button>
          </Link>
        </div>
      </main>
    );
  }

  return <TechnicianProfileView tech={response.data} />;
}