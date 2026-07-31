"use client";

import React, { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { Search, User, Mail, Trash2, Loader2, Filter, Eye } from "lucide-react";
import { getAllUsers, updateUserStatus, deleteUser } from "../_action/userActions";

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: string;
  active_status: string;
  created_at: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isPending, startTransition] = useTransition();
  const [actionMessage, setActionMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      const res = await getAllUsers({ search, role: roleFilter, status: statusFilter });
      if (isMounted && res.success) {
        setUsers(res.data);
      }
      if (isMounted) {
        setLoading(false);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, [roleFilter, statusFilter]);

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await getAllUsers({ search, role: roleFilter, status: statusFilter });
    if (res.success) {
      setUsers(res.data);
    }
    setLoading(false);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    startTransition(async () => {
      const res = await updateUserStatus(id, newStatus);
      if (res.success) {
        setUsers(users.map((u) => (u.id === id ? { ...u, active_status: newStatus } : u)));
        setActionMessage({ type: "success", text: res.message });
      } else {
        setActionMessage({ type: "error", text: res.message || "Failed to update status" });
      }
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    startTransition(async () => {
      const res = await deleteUser(id);
      if (res.success) {
        setUsers(users.filter((u) => u.id !== id));
        setActionMessage({ type: "success", text: res.message });
      } else {
        setActionMessage({ type: "error", text: res.message || "Failed to delete user" });
      }
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">👥 User Management</h1>
          <p className="text-sm text-gray-500 mt-1">View, search, filter, and manage platform users and their access roles.</p>
        </div>
      </div>

      {actionMessage && (
        <div className={`p-4 rounded-xl text-sm font-medium ${actionMessage.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
          {actionMessage.text}
        </div>
      )}

      {/* Search & Filters */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <form onSubmit={handleSearchSubmit} className="flex items-center w-full md:w-96 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-sm focus:outline-none"
          />
          <button type="submit" className="text-xs bg-blue-600 text-white px-3 py-1 rounded-md font-medium">Search</button>
        </form>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1 text-xs text-gray-500"><Filter className="w-3.5 h-3.5" /><span>Role:</span></div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none"
          >
            <option value="All">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Technician">Technician</option>
            <option value="Customer">Customer</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[40vh]">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : users.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500 font-medium">No users found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase">
                  <th className="p-4">Name & Email</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Join Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition">
                    <td className="p-4">
                      <div className="font-bold text-gray-900">{user.name}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <Mail className="w-3 h-3" /> {user.email}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${user.role === "Admin" ? "bg-purple-100 text-purple-700" : user.role === "Technician" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <select
                        value={user.active_status}
                        onChange={(e) => handleStatusChange(user.id, e.target.value)}
                        disabled={isPending}
                        className={`text-xs font-semibold px-2 py-1 rounded-lg border focus:outline-none ${user.active_status === "Active" ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}`}
                      >
                        <option value="Active">Active</option>
                        <option value="Blocked">Blocked</option>
                      </select>
                    </td>
                    <td className="p-4 text-xs text-gray-500">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <Link
                        href={`/dashboard/admin/users/${user.id}`}
                        className="inline-flex p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition"
                        title="View Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(user.id)}
                        disabled={isPending}
                        className="inline-flex p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition"
                        title="Delete User"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}