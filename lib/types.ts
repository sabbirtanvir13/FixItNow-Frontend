export interface IService {
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

  category?: {
    id: string;
    name: string;
  };

  technician?: {
    id: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  };
}


import { LucideIcon } from "lucide-react";

export interface ISidebarItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface NavbarProps {
  user?: {
    id: string;
    name: string;
    email: string;
    role: "Customer" | "Technician" | "Admin";
  };
}


export interface Category {
    id: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
}

export interface IPayment {
  id: string;
  booking_id: string;
  amount: number;
  status: "PENDING" | "COMPLETED" | "FAILED" | "CANCELLED";
  provider: string;
  transaction_id?: string;
  payment_url?: string;
  created_at: string;
  paid_at?: string;
  booking?: {
    id: string;
    status: string;
    price: number;
    booking_date: string;
    time_slot: string;
    location: string;
    service?: {
      title: string;
      price: number;
    };
    technician?: {
      user?: {
        name: string;
        email: string;
      };
    };
    customer?: {
      name: string;
      email: string;
    };
  };
}