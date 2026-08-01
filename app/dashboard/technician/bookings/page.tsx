

"use client";

import React, { useEffect, useState, useTransition } from "react";
import {
  Calendar,
  Clock,
  User,
  Mail,
  CheckCircle,
  XCircle,
  PlayCircle,
  Briefcase,
  Loader2,
  Eye
} from "lucide-react";
import { getTechnicianBookings, updateBookingStatus } from "../_action/bookingActions";

type BookingStatus = "REQUESTED" | "ACCEPTED" | "IN_PROGRESS" | "COMPLETED" | "DECLINED";

interface Customer {
  id: string;
  name: string;
  email: string;
}

interface Service {
  id: string;
  technician_id: string;
  category_id: string;
  title: string;
  description: string;
  price: number;
  duration: number;
  location: string;
  created_at: string;
  updated_at: string;
}

interface Booking {
  id: string;
  customer_id: string;
  technician_id: string;
  service_id: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  price: number;
  status: BookingStatus;
  created_at: string;
  updated_at: string;
  customer: Customer;
  service: Service;
}

interface BookingActionPageProps {
  initialBookings?: Booking[];
}

const tabs: { label: string; value: BookingStatus }[] = [
  { label: "Incoming Requests", value: "REQUESTED" },
  { label: "Accepted Bookings", value: "ACCEPTED" },
  { label: "In Progress Jobs", value: "IN_PROGRESS" },
  { label: "Completed Jobs", value: "COMPLETED" },
  { label: "Declined Bookings", value: "DECLINED" },
];

export default function BookingActionPage({ initialBookings = [] }: BookingActionPageProps) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [activeTab, setActiveTab] = useState<BookingStatus>("REQUESTED");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(
    initialBookings.find((b) => b.status === "REQUESTED") || initialBookings[0] || null
  );
  const [isPending, startTransition] = useTransition();
  const [actionMessage, setActionMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(initialBookings.length === 0);

  const loadBookings = async () => {
    const res = await getTechnicianBookings();
    if (res.success && res.data) {
      setBookings(res.data);
      setSelectedBooking((prev) => {
        const foundCurrent = res.data.find((b: Booking) => b.id === prev?.id);
        if (foundCurrent) return foundCurrent;
        return res.data.find((b: Booking) => b.status === activeTab) || null;
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const filteredBookings = bookings.filter((b) => b.status === activeTab);

  const handleAction = async (bookingId: string, targetStatus: BookingStatus) => {
    setActionMessage(null);
    startTransition(async () => {
      const res = await updateBookingStatus(bookingId, targetStatus);

      if (res.success) {
        await loadBookings();
        setActionMessage({ type: "success", text: `Booking successfully marked as ${targetStatus.toLowerCase()}` });
      } else {
        setActionMessage({ type: "error", text: res.message || "Action failed. Please try again." });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              Booking Management & Actions
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Review and update customer booking lifecycle statuses.
            </p>
          </div>
          {isPending && (
            <div className="flex items-center space-x-2 text-sm text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Updating status...</span>
            </div>
          )}
        </div>

        {/* Status Notification Banner */}
        {actionMessage && (
          <div className={`p-4 rounded-xl text-sm font-medium border ${actionMessage.type === "success"
            ? "bg-green-50 text-green-700 border-green-200"
            : "bg-red-50 text-red-700 border-red-200"
            }`}>
            {actionMessage.text}
          </div>
        )}

        {/* Tabs */}
        <div className="flex overflow-x-auto space-x-2 border-b border-gray-200 pb-2 scrollbar-none">
          {tabs.map((tab) => {
            const count = bookings.filter((b) => b.status === tab.value).length;
            const isActive = activeTab === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => {
                  setActiveTab(tab.value);
                  const firstMatch = bookings.find((b) => b.status === tab.value);
                  setSelectedBooking(firstMatch || null);
                }}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${isActive
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
              >
                <span>{tab.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${isActive ? "bg-blue-700 text-white" : "bg-gray-200 text-gray-700"
                  }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Column: Table View */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              {tabs.find((t) => t.value === activeTab)?.label} Table
            </h2>

            {filteredBookings.length === 0 ? (
              <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center">
                <Briefcase className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                <p className="text-sm font-medium text-gray-600">No records found in this category.</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        <th className="py-3.5 px-4">Service & Customer</th>
                        <th className="py-3.5 px-4">Date & Time</th>
                        <th className="py-3.5 px-4">Price</th>
                        <th className="py-3.5 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                      {filteredBookings.map((booking) => {
                        const isSelected = selectedBooking?.id === booking.id;
                        return (
                          <tr
                            key={booking.id}
                            onClick={() => setSelectedBooking(booking)}
                            className={`transition-colors cursor-pointer ${isSelected
                              ? "bg-blue-50/60 hover:bg-blue-50"
                              : "hover:bg-gray-50/80"
                              }`}
                          >
                            <td className="py-3 px-4">
                              <span className="block text-xs font-bold text-blue-600 uppercase">
                                {booking.service?.title}
                              </span>
                              <span className="block font-semibold text-gray-900 mt-0.5">
                                {booking.customer?.name}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-gray-600 whitespace-nowrap">
                              <div className="flex items-center space-x-1 text-xs">
                                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                <span>{new Date(booking.booking_date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center space-x-1 text-xs mt-1 text-gray-500">
                                <Clock className="w-3.5 h-3.5 text-gray-400" />
                                <span>{booking.start_time}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap font-bold text-green-700">
                              ৳{booking.price}
                            </td>
                            <td className="py-3 px-4 text-right whitespace-nowrap">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedBooking(booking);
                                }}
                                className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-medium transition ${isSelected
                                  ? "bg-blue-600 text-white shadow-sm"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                  }`}
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>{isSelected ? "Selected" : "View"}</span>
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
          </div>

          {/* Right Column: Details & Action Panel */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sticky top-6">
              <h2 className="text-lg font-bold text-gray-900 pb-4 border-b border-gray-100 mb-6">
                Booking Action Panel
              </h2>

              {selectedBooking ? (
                <div className="space-y-6">

                  {/* Overview Card */}
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex justify-between items-center">
                    <div>
                      <span className="text-xs text-gray-400 font-medium uppercase">Service</span>
                      <h3 className="text-base font-bold text-gray-900">{selectedBooking.service?.title}</h3>
                      <p className="text-xs text-gray-600 mt-1">{selectedBooking.service?.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-400 font-medium uppercase">Price</span>
                      <div className="text-xl font-extrabold text-blue-600">৳{selectedBooking.price}</div>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-blue-100 text-blue-600 rounded-md">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Customer Name</p>
                        <p className="text-sm font-semibold text-gray-800">{selectedBooking.customer?.name}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="p-2 bg-blue-100 text-blue-600 rounded-md">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Email</p>
                        <p className="text-sm font-semibold text-gray-800 truncate max-w-[220px]">{selectedBooking.customer?.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Schedule & Location */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-400 block">Date</span>
                      <span className="font-semibold text-gray-800 mt-0.5 block">
                        {new Date(selectedBooking.booking_date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-400 block">Time Slot</span>
                      <span className="font-semibold text-gray-800 mt-0.5 block">
                        {selectedBooking.start_time} - {selectedBooking.end_time}
                      </span>
                    </div>
                  </div>

                  {/* Dynamic Action Buttons */}
                  <div className="pt-6 border-t border-gray-100 flex items-center justify-end gap-3">
                    {selectedBooking.status === "REQUESTED" && (
                      <>
                        <button
                          disabled={isPending}
                          onClick={() => handleAction(selectedBooking.id, "DECLINED")}
                          className="flex items-center space-x-2 px-4 py-2.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 font-medium text-sm transition disabled:opacity-50"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>Decline</span>
                        </button>
                        <button
                          disabled={isPending}
                          onClick={() => handleAction(selectedBooking.id, "ACCEPTED")}
                          className="flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium text-sm shadow-sm transition disabled:opacity-50"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>Accept</span>
                        </button>
                      </>
                    )}

                    {selectedBooking.status === "ACCEPTED" && (
                      <button
                        disabled={isPending}
                        onClick={() => handleAction(selectedBooking.id, "IN_PROGRESS")}
                        className="flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-amber-600 text-white hover:bg-amber-700 font-medium text-sm shadow-sm transition disabled:opacity-50"
                      >
                        <PlayCircle className="w-4 h-4" />
                        <span>Mark In Progress</span>
                      </button>
                    )}

                    {selectedBooking.status === "IN_PROGRESS" && (
                      <button
                        disabled={isPending}
                        onClick={() => handleAction(selectedBooking.id, "COMPLETED")}
                        className="flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-green-600 text-white hover:bg-green-700 font-medium text-sm shadow-sm transition disabled:opacity-50"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Mark Completed</span>
                      </button>
                    )}

                    {["COMPLETED", "DECLINED"].includes(selectedBooking.status) && (
                      <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-2 rounded-md">
                        Final Status: {selectedBooking.status}
                      </span>
                    )}
                  </div>

                </div>
              ) : (
                <div className="py-16 text-center text-gray-400">
                  <p>Select a booking row from the table to perform actions.</p>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}