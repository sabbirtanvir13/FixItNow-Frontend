"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  BarChart2,
  FolderKanban,
  Home,
  User,
  Settings,
  CreditCard,
  Bell,
  LogOut,
  Menu,
  Zap,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { logout } from "../service/logout"
import { toast } from "sonner"

const navLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "Services", href: "/service", icon: LayoutDashboard },
  { label: "Technicians", href: "/Technicians", icon: BarChart2 },
  { label: "Categories", href: "/Categories", icon: FolderKanban },
  { label: "About", href: "/About", icon: FolderKanban },
  { label: "Contact", href: "/Contact", icon: FolderKanban },
]

const dropdownItems = [
  { label: "View Profile", href: "/profile", icon: User },
  { label: "Account Settings", href: "/settings", icon: Settings },
  { label: "Billing", href: "/billing", icon: CreditCard },
  { label: "Notifications", href: "/notifications", icon: Bell },
]

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
  user?: IUser;
};

export function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLogout,setIsLogout]=useState(false)
  const router=useRouter()
  // Extract profile data safely if user exists
  const profile = user?.data?.profile;
  const userInitials = profile?.name
    ? profile.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  const handleUserMenuAction = async (action: string) => {
    if (action === "logout") {
      await logout();
      setIsLogout(true)
    }
  };


useEffect(()=>{
  if(isLogout){
    toast.success("User Sign Out Successfully")
    router.push("/login")
  }
},[isLogout,router])



  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary shadow-sm transition-transform group-hover:scale-105">
            <Zap className="size-4 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="font-semibold text-[15px] tracking-tight text-foreground font-sans">
            BrandLogo
          </span>
        </Link>

        {/* ── Desktop Nav Links ── */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {navLinks.map(({ label, href }) => {
            const isActive = pathname === href

            return (
              <Link
                key={label}
                href={href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                  "hover:bg-accent hover:text-accent-foreground",
                  isActive
                    ? "text-foreground bg-accent"
                    : "text-muted-foreground"
                )}
              >
                {label}
                {isActive && (
                  <span className="absolute inset-x-3 -bottom-px h-px bg-primary" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* ── Right Side ── */}
        <div className="flex items-center gap-3">

          {profile ? (
            /* Profile Dropdown (Logged In) */
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="relative rounded-full ring-2 ring-border hover:ring-primary/50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
                  aria-label="Open user menu"
                >
                  <Avatar className="size-9 pointer-events-none">
                    <AvatarImage
                      src={profile.technicianProfile?.profilePhoto || "https://api.dicebear.com/9.x/avataaars/svg?seed=" + profile.name}
                      alt={profile.name}
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  {/* Online indicator */}
                  {profile.active_status === "Active" && (
                    <span
                      className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-500 ring-2 ring-background"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                sideOffset={10}
                className="w-60 p-1.5"
              >
                {/* User Header */}
                <div className="px-2 py-2.5">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-9 shrink-0">
                      <AvatarImage
                        src={profile.technicianProfile?.profilePhoto || "https://api.dicebear.com/9.x/avataaars/svg?seed=" + profile.name}
                        alt={profile.name}
                      />
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0">
                      <span className="truncate text-sm font-semibold text-foreground leading-tight">
                        {profile.name}
                      </span>
                      <span className="truncate text-xs text-muted-foreground leading-tight mt-0.5">
                        {profile.email}
                      </span>
                    </div>
                  </div>
                </div>

                <DropdownMenuSeparator className="my-1" />

                <DropdownMenuGroup>
                  {dropdownItems.map(({ label, href, icon: Icon }) => (
                    <DropdownMenuItem
                      key={label}
                      asChild
                    >
                      <Link href={href} className="flex items-center gap-2.5 px-2 py-2 rounded-md cursor-pointer">
                        <Icon className="size-4 text-muted-foreground shrink-0" />
                        <span className="text-sm">{label}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>

                <DropdownMenuSeparator className="my-1" />

                {/* Logout */}
                <DropdownMenuItem
                  onClick={() => handleUserMenuAction("logout")}
                  className="flex items-center gap-2.5 px-2 py-2 rounded-md cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/15"
                >
                  <LogOut className="size-4 shrink-0" />
                  <span className="text-sm font-medium">Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            /* Sign In / Sign Up Buttons (Logged Out) */
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          )}

          {/* Mobile Hamburger Drawer */}
          <div className="md:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-9"
                  aria-label="Open navigation menu"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-72 p-0 flex flex-col justify-between">
                <div>
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

                  {/* Sheet Header */}
                  <div className="flex items-center gap-2.5 px-5 py-4 border-b border-border">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
                      <Zap className="size-4 text-primary-foreground" strokeWidth={2.5} />
                    </div>
                    <span className="font-semibold text-[15px] tracking-tight text-foreground font-sans">
                      BrandLogo
                    </span>
                  </div>

                  {/* Mobile Nav Links */}
                  <nav className="flex flex-col gap-1 p-3" aria-label="Mobile navigation">
                    <p className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                      Menu
                    </p>
                    {navLinks.map(({ label, href, icon: Icon }) => {
                      const isActive = pathname === href

                      return (
                        <Link
                          key={label}
                          href={href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                            "hover:bg-accent hover:text-accent-foreground",
                            isActive
                              ? "bg-accent text-foreground"
                              : "text-muted-foreground"
                          )}
                        >
                          <Icon className="size-4 shrink-0" />
                          {label}
                        </Link>
                      )
                    })}
                  </nav>
                </div>

                {/* Mobile User Card or Auth Buttons */}
                <div className="p-4 border-t border-border bg-background">
                  {profile ? (
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9 shrink-0">
                        <AvatarImage
                          src={profile.technicianProfile?.profilePhoto || "https://api.dicebear.com/9.x/avataaars/svg?seed=" + profile.name}
                          alt={profile.name}
                        />
                        <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                          {userInitials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="truncate text-sm font-semibold text-foreground leading-tight">
                          {profile.name}
                        </span>
                        <span className="truncate text-xs text-muted-foreground leading-tight mt-0.5">
                          {profile.email}
                        </span>
                      </div>

                      {/* Logout */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleUserMenuAction("logout")}
                        className="size-8 shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                        aria-label="Log out"
                      >
                        <LogOut className="size-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/login" onClick={() => setMobileOpen(false)}>Sign In</Link>
                      </Button>
                      <Button className="w-full" asChild>
                        <Link href="/signup" onClick={() => setMobileOpen(false)}>Sign Up</Link>
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
  )
}