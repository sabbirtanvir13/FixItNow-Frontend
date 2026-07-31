import React from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Shield, Calendar, User, CheckCircle } from "lucide-react";
import { getSingleUser } from "../../_action/userActions";

export default async function AdminUserDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await getSingleUser(id);
  const user = res.success ? res.data : null;

  if (!user) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold text-red-600">User not found.</h2>
        <Link href="/dashboard/admin/users" className="text-blue-600 underline mt-4 inline-block">Back to Users</Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6 font-sans">
      <div className="flex items-center space-x-3">
        <Link href="/dashboard/admin/users" className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">User Profile Details</h1>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
        <div className="flex items-center space-x-4 border-b border-gray-100 pb-6">
          <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-bold">
            {user.name?.charAt(0) || "U"}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
            <span className="text-xs font-bold uppercase text-gray-400">User Role</span>
            <p className="text-sm font-semibold text-gray-800">{user.role}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
            <span className="text-xs font-bold uppercase text-gray-400">Active Status</span>
            <p className="text-sm font-semibold text-green-600">{user.active_status}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
            <span className="text-xs font-bold uppercase text-gray-400">Created At</span>
            <p className="text-sm text-gray-700">{new Date(user.created_at).toLocaleString()}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
            <span className="text-xs font-bold uppercase text-gray-400">Updated At</span>
            <p className="text-sm text-gray-700">{new Date(user.updated_at).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}