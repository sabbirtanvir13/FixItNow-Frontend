import {
  LayoutDashboard,
  BriefcaseBusiness,
  CalendarDays,
  ClipboardList,
  CreditCard,
  UserRound,
  Users,
  FolderTree,
  Star,
  Settings,
} from "lucide-react";

export const sidebarMenuItems = {
  CUSTOMER: [
    {
      label: "Dashboard",
      href: "/dashboard/customer",
      icon: LayoutDashboard,
    },
    {
      label: "My Bookings",
      href: "/dashboard/customer/bookings",
      icon: ClipboardList,
    },
    {
      label: "Payment History",
      href: "/dashboard/customer/payments",
      icon: CreditCard,
    },
    {
      label: "My Reviews",
      href: "/dashboard/customer/reviews",
      icon: Star,
    },
    {
      label: "Profile",
      href: "/dashboard/customer/profile",
      icon: UserRound,
    },
  ],

  TECHNICIAN: [
    {
      label: "Dashboard",
      href: "/dashboard/technician",
      icon: LayoutDashboard,
    },
    {
      label: "My Services",
      href: "/dashboard/technician/my-services",
      icon: BriefcaseBusiness,
    },
    {
      label: "Bookings",
      href: "/dashboard/technician/bookings",
      icon: ClipboardList,
    },
    {
      label: "Availability",
      href: "/dashboard/technician/availability",
      icon: CalendarDays,
    },
    {
      label: "Profile",
      href: "/dashboard/technician/profile",
      icon: UserRound,
    },
  ],

  ADMIN: [
    {
      label: "Dashboard",
      href: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      label: "Users",
      href: "/dashboard/admin/users",
      icon: Users,
    },
    {
      label: "Categories",
      href: "/dashboard/admin/categories",
      icon: FolderTree,
    },
    {
      label: "Settings",
      href: "/dashboard/admin/settings",
      icon: Settings,
    },
  ],
};