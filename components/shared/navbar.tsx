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

const navLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "Services", href: "/service", icon: LayoutDashboard },
  { label: "Technicians", href: "/technicians", icon: BarChart2 },
  { label: "Categories", href: "/cetagory", icon: FolderKanban },
  { label: "About", href: "/About", icon: FolderKanban },
  { label: "Contact", href: "/Contact", icon: FolderKanban },
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
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-2xl shadow-sm transition-all duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-600 shadow-md transition-transform duration-300 group-hover:scale-105">
            <Zap className="size-5 text-white" strokeWidth={2.5} fill="currentColor" />
          </div>
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            FixItNow
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1.5" aria-label="Main navigation">
          {navLinks.map(({ label, href }) => {
            const currentHref = label === "Dashboard" ? dashboardHref : href;
            const isActive = pathname === currentHref;

            return (
              <Link
                key={label}
                href={currentHref}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300",
                  isActive
                    ? "text-primary bg-primary/10 shadow-sm"
                    : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Right Side User Profile / Auth */}
        <div className="flex items-center gap-4">
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
                className="rounded-full font-medium text-muted-foreground hover:text-foreground hover:bg-muted px-6"
                asChild
              >
                <Link href="/login">Sign In</Link>
              </Button>
              <Button
                className="rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 px-6 bg-primary hover:bg-primary/90"
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
                  className="size-10 rounded-full bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Menu className="size-5 text-foreground" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[85vw] sm:w-80 p-0 flex flex-col justify-between border-l-0 shadow-2xl"
              >
                <div>
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <div className="flex items-center gap-3 px-6 py-5 border-b border-border/50 bg-muted/20">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-600 shadow-sm">
                      <Zap className="size-4 text-white" strokeWidth={2.5} />
                    </div>
                    <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                      FixItNow
                    </span>
                  </div>

                  <nav className="flex flex-col gap-1 p-4" aria-label="Mobile navigation">
                    <p className="px-3 py-1.5 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                      Menu
                    </p>
                    {navLinks.map(({ label, href, icon: Icon }) => {
                      const currentHref = label === "Dashboard" ? dashboardHref : href;
                      const isActive = pathname === currentHref;

                      return (
                        <Link
                          key={label}
                          href={currentHref}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                            isActive
                              ? "bg-primary/10 text-primary font-semibold"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          <Icon className={cn("size-4 shrink-0", isActive ? "text-primary" : "text-muted-foreground")} />
                          {label}
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                {/* Mobile Bottom Profile Section */}
                <div className="p-4 border-t border-border/50 bg-muted/20">
                  {profile ? (
                    <div className="flex items-center justify-between gap-3 bg-background p-3 rounded-xl border border-border/50 shadow-sm">
                      <div className="flex items-center gap-3 min-w-0">
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
                          <span className="truncate text-xs text-muted-foreground leading-tight mt-0.5">
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
                        className="size-9 shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-lg"
                        aria-label="Log out"
                      >
                        <LogOut className="size-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2.5">
                      <Button variant="outline" className="w-full rounded-xl font-medium" asChild>
                        <Link href="/login" onClick={() => setMobileOpen(false)}>
                          Sign In
                        </Link>
                      </Button>
                      <Button className="w-full rounded-xl font-medium shadow-sm" asChild>
                        <Link href="/signup" onClick={() => setMobileOpen(false)}>
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