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