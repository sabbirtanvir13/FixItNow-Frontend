"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Search, Plus, Trash2, Edit, Loader2, Filter, Eye, CheckCircle2, XCircle } from "lucide-react";
import { getAllCategories, createCategory, updateCategory, updateCategoryStatus, deleteCategory } from "../_action/categoryActions";

interface CategoryItem {
  id: string;
  name: string;
  description?: string;
  status?: string;
  active_status?: string;
  created_at: string;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isPending, startTransition] = useTransition();
  const [actionMessage, setActionMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const fetchCategoriesData = async () => {
    setLoading(true);
    const res = await getAllCategories({ search, status: statusFilter });
    if (res.success) setCategories(res.data);
    setLoading(false);
  };

  useEffect(() => {
    let isMounted = true;
    async function load() {
      setLoading(true);
      const res = await getAllCategories({ search, status: statusFilter });
      if (isMounted && res.success) setCategories(res.data);
      if (isMounted) setLoading(false);
    }
    load();
    return () => { isMounted = false; };
  }, [statusFilter]);

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    fetchCategoriesData();
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      let res;
      if (editingId) {
        res = await updateCategory(editingId, { name, description });
      } else {
        res = await createCategory({ name, description });
      }

      if (res.success) {
        setActionMessage({ type: "success", text: res.message });
        setIsModalOpen(false);
        setName("");
        setDescription("");
        setEditingId(null);
        fetchCategoriesData();
      } else {
        setActionMessage({ type: "error", text: res.message || "Operation failed" });
      }
    });
  };

  const handleEditClick = (cat: CategoryItem) => {
    setEditingId(cat.id);
    setName(cat.name);
    setDescription(cat.description || "");
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    startTransition(async () => {
      const res = await deleteCategory(id);
      if (res.success) {
        setCategories(categories.filter((c) => c.id !== id));
        setActionMessage({ type: "success", text: res.message });
      } else {
        setActionMessage({ type: "error", text: res.message || "Failed to delete" });
      }
    });
  };

  const handleStatusToggle = async (id: string, currentStatus?: string) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    startTransition(async () => {
      const res = await updateCategoryStatus(id, newStatus);
      if (res.success) {
        setCategories(categories.map((c) => (c.id === id ? { ...c, status: newStatus, active_status: newStatus } : c)));
        setActionMessage({ type: "success", text: "Status updated successfully" });
      } else {
        setActionMessage({ type: "error", text: res.message || "Failed to update status" });
      }
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">🏷️ Category Management</h1>
          <p className="text-sm text-gray-500 mt-1">Create, view, edit, filter, and manage service categories.</p>
        </div>
        <button
          onClick={() => { setEditingId(null); setName(""); setDescription(""); setIsModalOpen(true); }}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-sm"
        >
          <Plus className="w-4 h-4" /> Create Category
        </button>
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
            placeholder="Search category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent text-sm focus:outline-none"
          />
          <button type="submit" className="text-xs bg-blue-600 text-white px-3 py-1 rounded-md font-medium">Search</button>
        </form>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1 text-xs text-gray-500"><Filter className="w-3.5 h-3.5" /><span>Status:</span></div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Categories Table */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[40vh]">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
          <p className="text-gray-500 font-medium">No categories found.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase">
                  <th className="p-4">Category Name</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Created At</th>
                  <th className="p-4 text-right">Operations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {categories.map((cat) => {
                  const currentStatus = cat.status || cat.active_status || "Active";
                  return (
                    <tr key={cat.id} className="hover:bg-gray-50/50 transition">
                      <td className="p-4 font-bold text-gray-900">{cat.name}</td>
                      <td className="p-4 text-gray-500 text-xs max-w-xs truncate">{cat.description || "N/A"}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1 ${currentStatus === "Active" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                          {currentStatus === "Active" ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          {currentStatus}
                        </span>
                      </td>
                      <td className="p-4 text-xs text-gray-500">
                        {new Date(cat.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => handleStatusToggle(cat.id, currentStatus)}
                          disabled={isPending}
                          className="inline-flex p-2 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 rounded-lg transition"
                          title="Change Status"
                        >
                          🔄
                        </button>
                        <button
                          onClick={() => handleEditClick(cat)}
                          className="inline-flex p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition"
                          title="Edit Category"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id)}
                          disabled={isPending}
                          className="inline-flex p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition"
                          title="Delete Category"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <h2 className="text-lg font-bold text-gray-900">{editingId ? "✏️ Edit Category" : "➕ Create Category"}</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Category Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Plumbing Services"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Description</label>
                <textarea
                  placeholder="Short description about category..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none"
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition"
                >
                  {isPending ? "Saving..." : "Save Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}