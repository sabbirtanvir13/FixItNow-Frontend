


// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import {
//   LayoutDashboard,
//   BarChart2,
//   FolderKanban,
//   Home,
//   User,
//   Settings,
//   LogOut,
//   Menu,
//   Zap,
// } from "lucide-react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Sheet,
//   SheetContent,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { logout } from "../service/logout";
// import { toast } from "sonner";

// const navLinks = [
//   { label: "Home", href: "/", icon: Home },
//   { label: "Services", href: "/service", icon: LayoutDashboard },
//   { label: "Technicians", href: "/technicians", icon: BarChart2 },
//   { label: "Categories", href: "/cetagory", icon: FolderKanban },
//   { label: "About", href: "/About", icon: FolderKanban },
//   { label: "Contact", href: "/Contact", icon: FolderKanban },
// ];

// export type ITechnicianProfile = {
//   id: string;
//   userId: string;
//   profilePhoto: string | null;
//   bio: string | null;
//   experience_years: number | null;
//   total_reviews: number;
//   skills: string[];
//   location: string | null;
//   hourly_rate: number | null;
//   createdAt: string;
//   updatedAt: string;
// };

// export type IUserProfile = {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
//   active_status: string;
//   created_at: string;
//   updated_at: string;
//   technicianProfile?: ITechnicianProfile | null;
//   profilePhoto?: string | null;
//   profileImage?: string | null;
// };

// export type IUser = {
//   success: boolean;
//   statusCode: number;
//   message: string;
//   data: {
//     profile: IUserProfile;
//   };
// };

// type NavbarProps = {
//   user?: IUser | any;
// };

// export function Navbar({ user }: NavbarProps) {
//   const pathname = usePathname();
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [isLogout, setIsLogout] = useState(false);
//   const router = useRouter();

//   const profile = user?.data?.profile || user?.profile;

//   const roleRaw = (profile?.role || "").toString().trim();
//   const normalizedRole =
//     roleRaw.toLowerCase() === "admin"
//       ? "Admin"
//       : roleRaw.toLowerCase() === "technician"
//         ? "Technician"
//         : roleRaw.toLowerCase() === "customer"
//           ? "Customer"
//           : roleRaw
//             ? roleRaw.charAt(0).toUpperCase() + roleRaw.slice(1).toLowerCase()
//             : "Customer";

//   const dashboardHref =
//     normalizedRole === "Admin"
//       ? "/dashboard/admin"
//       : normalizedRole === "Technician"
//         ? "/dashboard/technician"
//         : "/dashboard/customer";

//   const profileHref =
//     normalizedRole === "Customer"
//       ? "/dashboard/customer/profile"
//       : "/profile";

//   const settingsHref =
//     normalizedRole === "Admin"
//       ? "/dashboard/admin/settings"
//       : "/settings";

//   const userDropdownItems = [
//     {
//       label: "Dashboard",
//       href: dashboardHref,
//       icon: LayoutDashboard,
//       isActive: pathname === dashboardHref || (pathname ? pathname.startsWith(dashboardHref) : false),
//     },
//     {
//       label: "My Profile",
//       href: profileHref,
//       icon: User,
//       isActive: pathname === profileHref,
//     },
//     {
//       label: "Settings",
//       href: settingsHref,
//       icon: Settings,
//       isActive: pathname === settingsHref,
//     },
//   ];

//   const userInitials = profile?.name
//     ? profile.name
//       .split(" ")
//       .map((n: string) => n[0])
//       .join("")
//       .toUpperCase()
//       .slice(0, 2)
//     : "U";

//   const handleUserMenuAction = async (action: string) => {
//     if (action === "logout") {
//       await logout();
//       setIsLogout(true);
//     }
//   };

//   useEffect(() => {
//     if (isLogout) {
//       toast.success("User Sign Out Successfully");
//       router.push("/login");
//     }
//   }, [isLogout, router]);

//   return (
//     <header className="sticky top-0 z-20 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl backdrop-saturate-150">
//       <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

//         {/* Logo */}
//         <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
//           <div className="flex size-8 items-center justify-center rounded-lg bg-primary shadow-sm transition-transform group-hover:scale-105">
//             <Zap className="size-4 text-primary-foreground" strokeWidth={2.5} />
//           </div>
//           <span className="font-semibold text-[15px] tracking-tight text-foreground font-sans">
//             FixItNow
//           </span>
//         </Link>

//         {/* Desktop Nav Links */}
//         <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
//           {navLinks.map(({ label, href }) => {
//             const currentHref = label === "Dashboard" ? dashboardHref : href;
//             const isActive = pathname === currentHref;

//             return (
//               <Link
//                 key={label}
//                 href={currentHref}
//                 className={cn(
//                   "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
//                   "hover:bg-accent hover:text-accent-foreground",
//                   isActive
//                     ? "text-foreground bg-accent"
//                     : "text-muted-foreground"
//                 )}
//               >
//                 {label}
//                 {isActive && (
//                   <span className="absolute inset-x-3 -bottom-px h-px bg-primary" />
//                 )}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Right Side User Profile / Auth */}
//         <div className="flex items-center gap-3">
//           {profile ? (
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <button
//                   type="button"
//                   className="relative rounded-full ring-2 ring-border hover:ring-primary/50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
//                   aria-label="Open user menu"
//                 >
//                   <Avatar className="size-9 pointer-events-none">
//                     <AvatarImage
//                       src={
//                         profile.technicianProfile?.profilePhoto ||
//                         profile.profilePhoto ||
//                         profile.profileImage ||
//                         `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(profile.name || "user")}`
//                       }
//                       alt={profile.name}
//                     />
//                     <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
//                       {userInitials}
//                     </AvatarFallback>
//                   </Avatar>
//                   {profile.active_status === "Active" && (
//                     <span
//                       className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-500 ring-2 ring-background"
//                       aria-hidden="true"
//                     />
//                   )}
//                 </button>
//               </DropdownMenuTrigger>

//               <DropdownMenuContent
//                 align="end"
//                 sideOffset={10}
//                 className="w-60 p-1.5"
//               >
//                 {/* User Header */}
//                 <div className="px-2 py-2.5">
//                   <div className="flex items-center gap-3">
//                     <Avatar className="size-9 shrink-0">
//                       <AvatarImage
//                         src={
//                           profile.technicianProfile?.profilePhoto ||
//                           profile.profilePhoto ||
//                           profile.profileImage ||
//                           `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(profile.name || "user")}`
//                         }
//                         alt={profile.name}
//                       />
//                       <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
//                         {userInitials}
//                       </AvatarFallback>
//                     </Avatar>
//                     <div className="flex flex-col min-w-0">
//                       <span className="truncate text-sm font-semibold text-foreground leading-tight">
//                         {profile.name}
//                       </span>
//                       <span className="truncate text-xs text-muted-foreground leading-tight mt-0.5">
//                         {profile.email}
//                       </span>
//                       <Badge
//                         variant="outline"
//                         className="mt-1.5 w-fit border-primary/20 bg-primary/10 text-primary text-[10px] font-medium px-2 py-0.5 rounded-full leading-none"
//                       >
//                         {normalizedRole}
//                       </Badge>
//                     </div>
//                   </div>
//                 </div>

//                 <DropdownMenuSeparator className="my-1" />

//                 <DropdownMenuGroup>
//                   {userDropdownItems.map(({ label, href, icon: Icon, isActive }) => (
//                     <DropdownMenuItem key={label} asChild>
//                       <Link
//                         href={href}
//                         className={cn(
//                           "flex items-center gap-2.5 px-2 py-2 rounded-md cursor-pointer transition-colors",
//                           isActive
//                             ? "bg-accent text-accent-foreground font-medium"
//                             : "hover:bg-accent/50"
//                         )}
//                       >
//                         <Icon
//                           className={cn(
//                             "size-4 shrink-0",
//                             isActive ? "text-primary" : "text-muted-foreground"
//                           )}
//                         />
//                         <span className="text-sm">{label}</span>
//                       </Link>
//                     </DropdownMenuItem>
//                   ))}
//                 </DropdownMenuGroup>

//                 <DropdownMenuSeparator className="my-1" />

//                 <DropdownMenuItem
//                   onClick={() => handleUserMenuAction("logout")}
//                   className="flex items-center gap-2.5 px-2 py-2 rounded-md cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/15"
//                 >
//                   <LogOut className="size-4 shrink-0" />
//                   <span className="text-sm font-medium">Logout</span>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           ) : (
//             <div className="hidden sm:flex items-center gap-2">
//               <Button variant="ghost" size="sm" asChild>
//                 <Link href="/login">Sign In</Link>
//               </Button>
//               <Button size="sm" asChild>
//                 <Link href="/signup">Sign Up</Link>
//               </Button>
//             </div>
//           )}

//           {/* Mobile Sheet Nav */}
//           <div className="md:hidden">
//             <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
//               <SheetTrigger asChild>
//                 <Button variant="ghost" size="icon" className="size-9">
//                   <Menu className="size-5" />
//                 </Button>
//               </SheetTrigger>

//               <SheetContent side="right" className="w-72 p-0 flex flex-col justify-between">
//                 <div>
//                   <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
//                   <div className="flex items-center gap-2.5 px-5 py-4 border-b border-border">
//                     <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
//                       <Zap className="size-4 text-primary-foreground" strokeWidth={2.5} />
//                     </div>
//                     <span className="font-semibold text-[15px] tracking-tight text-foreground font-sans">
//                       FixItNow
//                     </span>
//                   </div>

//                   <nav className="flex flex-col gap-1 p-3" aria-label="Mobile navigation">
//                     <p className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
//                       Menu
//                     </p>
//                     {navLinks.map(({ label, href, icon: Icon }) => {
//                       const currentHref = label === "Dashboard" ? dashboardHref : href;
//                       const isActive = pathname === currentHref;

//                       return (
//                         <Link
//                           key={label}
//                           href={currentHref}
//                           onClick={() => setMobileOpen(false)}
//                           className={cn(
//                             "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
//                             "hover:bg-accent hover:text-accent-foreground",
//                             isActive
//                               ? "bg-accent text-foreground"
//                               : "text-muted-foreground"
//                           )}
//                         >
//                           <Icon className="size-4 shrink-0" />
//                           {label}
//                         </Link>
//                       );
//                     })}
//                   </nav>
//                 </div>

//                 <div className="p-4 border-t border-border bg-background">
//                   {profile ? (
//                     <div className="flex items-center gap-3">
//                       <Avatar className="size-9 shrink-0">
//                         <AvatarImage
//                           src={
//                             profile.technicianProfile?.profilePhoto ||
//                             profile.profilePhoto ||
//                             profile.profileImage ||
//                             `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(profile.name || "user")}`
//                           }
//                           alt={profile.name}
//                         />
//                         <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
//                           {userInitials}
//                         </AvatarFallback>
//                       </Avatar>
//                       <div className="flex flex-col min-w-0 flex-1">
//                         <span className="truncate text-sm font-semibold text-foreground leading-tight">
//                           {profile.name}
//                         </span>
//                         <span className="truncate text-xs text-muted-foreground leading-tight mt-0.5">
//                           {profile.email}
//                         </span>
//                         <Badge
//                           variant="outline"
//                           className="mt-1 w-fit border-primary/20 bg-primary/10 text-primary text-[10px] font-medium px-2 py-0.5 rounded-full leading-none"
//                         >
//                           {normalizedRole}
//                         </Badge>
//                       </div>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => handleUserMenuAction("logout")}
//                         className="size-8 shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
//                         aria-label="Log out"
//                       >
//                         <LogOut className="size-4" />
//                       </Button>
//                     </div>
//                   ) : (
//                     <div className="flex flex-col gap-2">
//                       <Button variant="outline" className="w-full" asChild>
//                         <Link href="/login" onClick={() => setMobileOpen(false)}>
//                           Sign In
//                         </Link>
//                       </Button>
//                       <Button className="w-full" asChild>
//                         <Link href="/signup" onClick={() => setMobileOpen(false)}>
//                           Sign Up
//                         </Link>
//                       </Button>
//                     </div>
//                   )}
//                 </div>
//               </SheetContent>
//             </Sheet>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// } 

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
    normalizedRole === "Customer"
      ? "/dashboard/customer/profile"
      : "/profile";

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
          <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-blue-600 shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary/20">
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
                      src={
                        profile.technicianProfile?.profilePhoto ||
                        profile.profilePhoto ||
                        profile.profileImage ||
                        `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(
                          profile.name || "user"
                        )}`
                      }
                      alt={profile.name}
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
                        src={
                          profile.technicianProfile?.profilePhoto ||
                          profile.profilePhoto ||
                          profile.profileImage ||
                          `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(
                            profile.name || "user"
                          )}`
                        }
                        alt={profile.name}
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
                <Link href="/signup">Sign Up</Link>
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

                  <nav
                    className="flex flex-col gap-1.5 p-4"
                    aria-label="Mobile navigation"
                  >
                    <p className="px-4 py-2 text-[11px] font-bold text-muted-foreground/70 uppercase tracking-widest">
                      Menu
                    </p>
                    {navLinks.map(({ label, href, icon: Icon }) => {
                      const currentHref =
                        label === "Dashboard" ? dashboardHref : href;
                      const isActive = pathname === currentHref;

                      return (
                        <Link
                          key={label}
                          href={currentHref}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300",
                            isActive
                              ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          <Icon
                            className={cn(
                              "size-5 shrink-0",
                              isActive
                                ? "text-primary-foreground"
                                : "text-muted-foreground"
                            )}
                          />
                          {label}
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                <div className="p-5 border-t border-border/50 bg-muted/10">
                  {profile ? (
                    <div className="flex items-center gap-3 bg-background p-3 rounded-2xl shadow-sm border border-border/50">
                      <Avatar className="size-10 shrink-0">
                        <AvatarImage
                          src={
                            profile.technicianProfile?.profilePhoto ||
                            profile.profilePhoto ||
                            profile.profileImage ||
                            `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(
                              profile.name || "user"
                            )}`
                          }
                          alt={profile.name}
                        />
                        <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                          {userInitials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="truncate text-sm font-bold text-foreground leading-tight">
                          {profile.name}
                        </span>
                        <span className="truncate text-xs text-muted-foreground leading-tight mt-0.5">
                          {profile.email}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleUserMenuAction("logout")}
                        className="size-9 shrink-0 rounded-full text-destructive hover:text-destructive hover:bg-destructive/10"
                        aria-label="Log out"
                      >
                        <LogOut className="size-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Button
                        variant="outline"
                        className="w-full rounded-xl h-11"
                        asChild
                      >
                        <Link
                          href="/login"
                          onClick={() => setMobileOpen(false)}
                        >
                          Sign In
                        </Link>
                      </Button>
                      <Button className="w-full rounded-xl h-11 shadow-md" asChild>
                        <Link
                          href="/signup"
                          onClick={() => setMobileOpen(false)}
                        >
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