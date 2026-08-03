"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Wrench, Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ISidebarItem } from "@/lib/types";
import { sidebarMenuItems } from "../_config/sidebarMenuItems";
import { logout } from "@/components/service/logout";


interface SidebarProps {
  user?: any;
}

interface SidebarContentProps extends SidebarProps {
  pathname: string;
  setOpen?: (open: boolean) => void;
}

function SidebarContent({ user, pathname, setOpen }: SidebarContentProps) {
  let navItems: ISidebarItem[] = [];


  const role = user?.data?.profile?.role || user?.role;

  switch (role) {
    case "Customer":
      navItems = sidebarMenuItems.CUSTOMER;
      break;
    case "Technician":
      navItems = sidebarMenuItems.TECHNICIAN;
      break;
    case "Admin":
      navItems = sidebarMenuItems.ADMIN;
      break;
    default:
      navItems = [];
  }

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

  return (
    <div className="flex h-full w-full flex-col justify-between border-r bg-background">

      <div className="flex-1 overflow-y-auto">
        <div className="border-b p-6">
          <Link
            href="/"
            onClick={() => setOpen?.(false)}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Wrench className="size-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">FixItNow</h2>
              <p className="text-xs text-muted-foreground">
                Trusted Home Services
              </p>
            </div>
          </Link>
        </div>


        <div className="p-4">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {role ?? "Dashboard"}
          </p>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active =
                pathname === item.href ||
                pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen?.(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  <Icon className="size-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>


      <div className="border-t p-4">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/20"
        >
          <LogOut className="mr-3 size-5" />
          Logout
        </Button>
      </div>
    </div>
  );
}

export default function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>

      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background px-4 lg:hidden">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Wrench className="size-5" />
          </div>
          <span className="text-lg font-bold">FixItNow</span>
        </Link>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="size-6" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-72 p-0">
            <SheetHeader className="sr-only">
              <SheetTitle>Sidebar Navigation</SheetTitle>
            </SheetHeader>
            <SidebarContent
              pathname={pathname}
              user={user}
              setOpen={setOpen}
            />
          </SheetContent>
        </Sheet>
      </header>


      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-72 border-r bg-background lg:flex">
        <SidebarContent pathname={pathname} user={user} />
      </aside>
    </>
  );
}