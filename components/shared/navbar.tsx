"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BarChart2,
  FolderKanban,
  Home,
  User,
  Settings,
  LogOut,
  Menu,
  Zap,
  Search,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { logout } from "../service/logout";
import { toast } from "sonner";
import { ThemePalettePicker } from "./ThemePalettePicker";

const navLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "Services", href: "/service", icon: LayoutDashboard },
  { label: "Technicians", href: "/technicians", icon: BarChart2 },
  { label: "How It Works", href: "/how-it-works", icon: Home },
  { label: "About", href: "/About", icon: FolderKanban },
];

export type ITechnicianProfile = {
  id: string;
  userId: string;
  profilePhoto: string | null;
  bio: string | null;
  experience_years: number | null;
  total_reviews: number;
  skills: string[];
  location: string | null;
  hourly_rate: number | null;
  createdAt: string;
  updatedAt: string;
};

export type IUserProfile = {
  id: string;
  name: string;
  email: string;
  role: string;
  active_status: string;
  created_at: string;
  updated_at: string;
  technicianProfile?: ITechnicianProfile | null;
  profilePhoto?: string | null;
  profileImage?: string | null;
  avatar?: string | null;
  photo?: string | null;
  image?: string | null;
};

export type IUser = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    profile: IUserProfile;
  };
};

type NavbarProps = {
  user?: IUser | any;
};

export function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const router = useRouter();

  const profile = user?.data?.profile || user?.profile;

  const roleRaw = (profile?.role || "").toString().trim();
  const normalizedRole =
    roleRaw.toLowerCase() === "admin"
      ? "Admin"
      : roleRaw.toLowerCase() === "technician"
        ? "Technician"
        : roleRaw.toLowerCase() === "customer"
          ? "Customer"
          : roleRaw
            ? roleRaw.charAt(0).toUpperCase() + roleRaw.slice(1).toLowerCase()
            : "Customer";

  const dashboardHref =
    normalizedRole === "Admin"
      ? "/dashboard/admin"
      : normalizedRole === "Technician"
        ? "/dashboard/technician"
        : "/dashboard/customer";

  const profileHref =
    normalizedRole === "Admin"
      ? "/dashboard/admin/profile"
      : normalizedRole === "Technician"
        ? "/dashboard/technician/profile"
        : "/dashboard/customer/profile";

  const settingsHref =
    normalizedRole === "Admin"
      ? "/dashboard/admin/settings"
      : "/settings";

  const userDropdownItems = [
    {
      label: "Dashboard",
      href: dashboardHref,
      icon: LayoutDashboard,
      isActive:
        pathname === dashboardHref ||
        (pathname ? pathname.startsWith(dashboardHref) : false),
    },
    {
      label: "My Profile",
      href: profileHref,
      icon: User,
      isActive: pathname === profileHref,
    },
    {
      label: "Settings",
      href: settingsHref,
      icon: Settings,
      isActive: pathname === settingsHref,
    },
  ];

  const userInitials = profile?.name
    ? profile.name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
    : "U";

  // প্রফাইল ইমেজ সঠিকভাবে রিড করার হেল্পার ফাংশন
  const getProfileImage = () => {
    const rawImg =
      profile?.technicianProfile?.profilePhoto ||
      profile?.profilePhoto ||
      profile?.profileImage ||
      profile?.avatar ||
      profile?.photo ||
      profile?.image;

    if (!rawImg) {
      return `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(
        profile?.name || "user"
      )}`;
    }

    return rawImg;
  };

  const handleUserMenuAction = async (action: string) => {
    if (action === "logout") {
      await logout();
      setIsLogout(true);
    }
  };

  useEffect(() => {
    if (isLogout) {
      toast.success("User Sign Out Successfully");
      router.push("/login");
    }
  }, [isLogout, router]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#0B1729]/95 backdrop-blur-xl shadow-md transition-all duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF6B00] to-[#E05E00] shadow-lg shadow-orange-500/20 transition-transform duration-300 group-hover:scale-105">
            <Zap className="size-5 text-white" strokeWidth={2.5} fill="currentColor" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl tracking-tight text-white leading-none">
              FixtNow
            </span>
            <span className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5">
              Skilled People, Trusted Work.
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1.5" aria-label="Main navigation">
          {navLinks.map(({ label, href }) => {
            const currentHref = label === "Dashboard" ? dashboardHref : href;
            const isActive = pathname === currentHref || (href === "/technicians" && pathname.startsWith("/technicians"));

            return (
              <Link
                key={label}
                href={currentHref}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "text-[#FF6B00] font-semibold after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-6 after:h-0.5 after:bg-[#FF6B00] after:rounded-full"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg"
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Right Side User Profile / Auth */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Theme Palette Picker (4 curated color themes) */}
          <ThemePalettePicker />

          {/* Search Icon */}
          <Button
            variant="ghost"
            size="icon"
            className="size-9 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/60"
            aria-label="Search"
            asChild
          >
            <Link href="/service">
              <Search className="size-5" />
            </Link>
          </Button>

          {/* Notification Bell */}
          <button
            type="button"
            className="relative size-9 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/60 flex items-center justify-center transition-colors"
            aria-label="Notifications"
          >
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 right-1 size-4 bg-[#FF6B00] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none shadow-sm">
              2
            </span>
          </button>

          {profile ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="relative rounded-full ring-2 ring-transparent ring-offset-2 ring-offset-background hover:ring-primary/50 focus-visible:outline-none focus-visible:ring-primary transition-all duration-300 cursor-pointer"
                  aria-label="Open user menu"
                >
                  <Avatar className="size-9 shadow-sm pointer-events-none">
                    <AvatarImage
                      src={getProfileImage()}
                      alt={profile.name || "User"}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-blue-600 text-white text-sm font-semibold">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  {profile.active_status === "Active" && (
                    <span
                      className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-500 ring-2 ring-background shadow-sm"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                sideOffset={12}
                className="w-64 p-2 rounded-xl shadow-xl border-border/50"
              >
                {/* User Header */}
                <div className="px-2 py-3 bg-muted/30 rounded-lg mb-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10 shrink-0 shadow-sm border border-border/50">
                      <AvatarImage
                        src={getProfileImage()}
                        alt={profile.name || "User"}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0">
                      <span className="truncate text-sm font-bold text-foreground leading-tight">
                        {profile.name}
                      </span>
                      <span className="truncate text-xs text-muted-foreground leading-tight mt-1">
                        {profile.email}
                      </span>
                      <Badge
                        variant="secondary"
                        className="mt-2 w-fit bg-primary/10 text-primary hover:bg-primary/15 text-[10px] uppercase font-bold px-2 py-0.5 rounded-md tracking-wider border-none"
                      >
                        {normalizedRole}
                      </Badge>
                    </div>
                  </div>
                </div>

                <DropdownMenuGroup className="space-y-1">
                  {userDropdownItems.map(
                    ({ label, href, icon: Icon, isActive }) => (
                      <DropdownMenuItem key={label} asChild>
                        <Link
                          href={href}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200",
                            isActive
                              ? "bg-primary/10 text-primary font-semibold"
                              : "hover:bg-muted text-muted-foreground hover:text-foreground"
                          )}
                        >
                          <Icon
                            className={cn(
                              "size-4 shrink-0 transition-colors",
                              isActive ? "text-primary" : "text-muted-foreground"
                            )}
                          />
                          <span className="text-sm">{label}</span>
                        </Link>
                      </DropdownMenuItem>
                    )
                  )}
                </DropdownMenuGroup>

                <DropdownMenuSeparator className="my-2 opacity-50" />

                <DropdownMenuItem
                  onClick={() => handleUserMenuAction("logout")}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors duration-200"
                >
                  <LogOut className="size-4 shrink-0" />
                  <span className="text-sm font-semibold">Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <Button
                variant="ghost"
                className="rounded-full font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 px-5"
                asChild
              >
                <Link href="/login">Sign In</Link>
              </Button>
              <Button
                className="rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 px-5 bg-[#FF6B00] hover:bg-[#E05E00] text-white shadow-orange-500/20"
                asChild
              >
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>
          )}

          {/* Mobile Sheet Nav */}
          <div className="md:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-10 rounded-full text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[85vw] sm:w-80 p-0 flex flex-col justify-between border-slate-800 bg-[#0B1729] text-white shadow-2xl"
              >
                <div>
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-800 bg-slate-900/60">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF6B00] to-[#E05E00] shadow-sm">
                      <Zap className="size-4 text-white" strokeWidth={2.5} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-lg tracking-tight text-white leading-none">
                        FixtNow
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium leading-tight mt-0.5">
                        Skilled People, Trusted Work.
                      </span>
                    </div>
                  </div>

                  <div className="px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Color Palette
                    </span>
                    <ThemePalettePicker />
                  </div>

                  <nav className="flex flex-col gap-1 p-4" aria-label="Mobile navigation">
                    <p className="px-3 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Menu
                    </p>
                    {navLinks.map(({ label, href, icon: Icon }) => {
                      const currentHref = label === "Dashboard" ? dashboardHref : href;
                      const isActive = pathname === currentHref || (href === "/technicians" && pathname.startsWith("/technicians"));

                      return (
                        <Link
                          key={label}
                          href={currentHref}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                            isActive
                              ? "bg-[#FF6B00]/15 text-[#FF6B00] font-semibold"
                              : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                          )}
                        >
                          <Icon className={cn("size-4 shrink-0", isActive ? "text-[#FF6B00]" : "text-slate-400")} />
                          {label}
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                {/* Mobile Bottom Profile Section */}
                <div className="p-4 border-t border-slate-800 bg-slate-900/60">
                  {profile ? (
                    <div className="flex items-center justify-between gap-3 bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 shadow-sm">
                      <div className="flex items-center gap-3 min-w-0">
                        <Avatar className="size-10 shrink-0 shadow-sm border border-slate-700">
                          <AvatarImage
                            src={getProfileImage()}
                            alt={profile.name || "User"}
                            className="object-cover"
                          />
                          <AvatarFallback className="bg-[#FF6B00] text-white font-semibold">
                            {userInitials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col min-w-0">
                          <span className="truncate text-sm font-bold text-white leading-tight">
                            {profile.name}
                          </span>
                          <span className="truncate text-xs text-slate-400 leading-tight mt-0.5">
                            {profile.email}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setMobileOpen(false);
                          handleUserMenuAction("logout");
                        }}
                        className="size-9 shrink-0 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg"
                        aria-label="Log out"
                      >
                        <LogOut className="size-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2.5">
                      <Button variant="outline" className="w-full rounded-xl font-medium border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white" asChild>
                        <Link href="/login" onClick={() => setMobileOpen(false)}>
                          Sign In
                        </Link>
                      </Button>
                      <Button className="w-full rounded-xl font-medium shadow-sm bg-[#FF6B00] hover:bg-[#E05E00] text-white" asChild>
                        <Link href="/register" onClick={() => setMobileOpen(false)}>
                          Sign Up
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}