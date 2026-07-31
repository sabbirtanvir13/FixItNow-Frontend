"use client";

import React, { useState, useEffect, useTransition } from "react";
import { 
  Calendar, 
  Clock, 
  Plus, 
  Trash2, 
  Edit3, 
  Loader2, 
  ShieldCheck, 
  ShieldAlert,
  X 
} from "lucide-react";
import { 
  getAvailabilities, 
  addAvailability, 
  updateAvailability, 
  deleteAvailability 
} from "../_action/availabilityActions";

interface AvailabilityItem {
  id: string;
  day: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
}

interface PageProps {
  initialAvailability?: AvailabilityItem[];
}

export default function AvailabilityManagementPage({ 
  initialAvailability = [] 
}: PageProps) {
  const [availabilities, setAvailabilities] = useState<AvailabilityItem[]>(initialAvailability);
  const [isPending, startTransition] = useTransition();
  const [actionMessage, setActionMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Read: সার্ভার অ্যাকশনের মাধ্যমে অ্যাভেইল্যাবিলিটি লিস্ট লোড করা
  useEffect(() => {
    const loadAvailabilities = async () => {
      const res = await getAvailabilities();
      if (res.success && Array.isArray(res.data)) {
        setAvailabilities(res.data as AvailabilityItem[]);
      }
    };
    loadAvailabilities();
  }, []);

  // --- Create Form States ---
  const [day, setDay] = useState("Monday");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [isAvailable, setIsAvailable] = useState(true);

  // --- Update Modal States ---
  const [editingItem, setEditingItem] = useState<AvailabilityItem | null>(null);
  const [editDay, setEditDay] = useState("");
  const [editStartTime, setEditStartTime] = useState("");
  const [editEndTime, setEditEndTime] = useState("");
  const [editIsAvailable, setEditIsAvailable] = useState(true);

  // ১. Create (নতুন স্লট যোগ করা)
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionMessage(null);

    startTransition(async () => {
      const res = await addAvailability({
        day,
        start_time: startTime,
        end_time: endTime,
        is_available: isAvailable,
      });

      if (res.success && res.data) {
        setAvailabilities([...availabilities, res.data]);
        setActionMessage({ type: "success", text: "Availability slot added successfully!" });
        setStartTime("09:00");
        setEndTime("17:00");
      } else {
        setActionMessage({ type: "error", text: res.message || "Failed to add slot." });
      }
    });
  };

  // এডিট মোড ওপেন করা
  const openEditModal = (item: AvailabilityItem) => {
    setEditingItem(item);
    setEditDay(item.day);
    setEditStartTime(item.start_time);
    setEditEndTime(item.end_time);
    setEditIsAvailable(item.is_available);
  };

  // ২. Update (স্লট আপডেট করা)
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    setActionMessage(null);
    startTransition(async () => {
      const res = await updateAvailability(editingItem.id, {
        day: editDay,
        start_time: editStartTime,
        end_time: editEndTime,
        is_available: editIsAvailable,
      });

      if (res.success && res.data) {
        setAvailabilities(
          availabilities.map((item) => (item.id === editingItem.id ? res.data : item))
        );
        setActionMessage({ type: "success", text: "Availability updated successfully!" });
        setEditingItem(null);
      } else {
        setActionMessage({ type: "error", text: res.message || "Failed to update slot." });
      }
    });
  };

  // ৩. Delete (স্লট ডিলিট করা)
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this availability slot?")) return;

    setActionMessage(null);
    startTransition(async () => {
      const res = await deleteAvailability(id);

      if (res.success) {
        setAvailabilities(availabilities.filter((item) => item.id !== id));
        setActionMessage({ type: "success", text: "Availability deleted successfully!" });
      } else {
        setActionMessage({ type: "error", text: res.message || "Failed to delete slot." });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              Availability Management (CRUD)
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Add, update, or remove your working schedule time slots.
            </p>
          </div>
          {isPending && (
            <div className="flex items-center space-x-2 text-sm text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Processing...</span>
            </div>
          )}
        </div>

        {/* Notification Banner */}
        {actionMessage && (
          <div className={`p-4 rounded-xl text-sm font-medium border ${
            actionMessage.type === "success" 
              ? "bg-green-50 text-green-700 border-green-200" 
              : "bg-red-50 text-red-700 border-red-200"
          }`}>
            {actionMessage.text}
          </div>
        )}

        {/* --- CREATE FORM --- */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
            <Plus className="w-5 h-5 text-blue-600" />
            <span>Add New Availability Slot</span>
          </h2>

          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Day</label>
              <select 
                value={day} 
                onChange={(e) => setDay(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
              >
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Start Time</label>
              <input 
                type="time" 
                value={startTime} 
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                required 
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">End Time</label>
              <input 
                type="time" 
                value={endTime} 
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
                required 
              />
            </div>

            <div className="flex items-center h-full pt-6">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={isAvailable} 
                  onChange={(e) => setIsAvailable(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">Available</span>
              </label>
            </div>

            <div>
              <button 
                type="submit" 
                disabled={isPending}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition flex items-center justify-center space-x-1 shadow-sm disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
                <span>Add Slot</span>
              </button>
            </div>
          </form>
        </div>

        {/* --- READ & DELETE/UPDATE LIST --- */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-bold text-gray-900">Your Availability List</h2>

          {availabilities.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg">
              <Calendar className="mx-auto h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">No availability slots found. Add one above!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {availabilities.map((item) => (
                <div 
                  key={item.id} 
                  className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 rounded-xl border border-gray-100 bg-gray-50/60 hover:bg-gray-50 transition gap-4"
                >
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <div>
                      <h3 className="font-bold text-gray-900 text-base">{item.day}</h3>
                      <div className="flex items-center space-x-1.5 text-xs text-gray-600 mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        <span>{item.start_time} - {item.end_time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-end">
                    {item.is_available ? (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Available</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                        <ShieldAlert className="w-3 h-3" />
                        <span>Unavailable</span>
                      </span>
                    )}

                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => openEditModal(item)}
                        className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 transition text-sm"
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 transition text-sm"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* --- UPDATE MODAL --- */}
        {editingItem && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 space-y-4 relative">
              <button 
                onClick={() => setEditingItem(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-bold text-gray-900">Edit Availability Slot</h3>

              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Day</label>
                  <select 
                    value={editDay} 
                    onChange={(e) => setEditDay(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                  >
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Start Time</label>
                  <input 
                    type="time" 
                    value={editStartTime} 
                    onChange={(e) => setEditStartTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                    required 
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">End Time</label>
                  <input 
                    type="time" 
                    value={editEndTime} 
                    onChange={(e) => setEditEndTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                    required 
                  />
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <input 
                    type="checkbox" 
                    checked={editIsAvailable} 
                    onChange={(e) => setEditIsAvailable(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-700">Is Available</span>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                  <button 
                    type="button" 
                    onClick={() => setEditingItem(null)}
                    className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={isPending}
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium shadow-sm flex items-center space-x-1"
                  >
                    {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                    <span>Update Changes</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}