"use client";

import { useEffect, useState } from "react";
import { Palette, Check, Sparkles } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export interface ThemeOption {
  id: "orange" | "green" | "blue" | "purple";
  name: string;
  tagline: string;
  primaryColor: string;
  hoverColor: string;
  lightBg: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: "orange",
    name: "FixtNow Orange",
    tagline: "Signature Vibrant Blaze",
    primaryColor: "#FF6B00",
    hoverColor: "#E05E00",
    lightBg: "#FFF7ED",
  },
  {
    id: "green",
    name: "Emerald Pro",
    tagline: "Fresh & Trusted Tech",
    primaryColor: "#10B981",
    hoverColor: "#059669",
    lightBg: "#ECFDF5",
  },
  {
    id: "blue",
    name: "Ocean Blue",
    tagline: "Royal & Modern Precision",
    primaryColor: "#2563EB",
    hoverColor: "#1D4ED8",
    lightBg: "#EFF6FF",
  },
  {
    id: "purple",
    name: "Cyber Violet",
    tagline: "Premium & Creative Royal",
    primaryColor: "#8B5CF6",
    hoverColor: "#7C3AED",
    lightBg: "#F5F3FF",
  },
];

export function ThemePalettePicker() {
  const [currentTheme, setCurrentTheme] = useState<string>("orange");
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("fixtnow-theme") || "orange";
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const handleSelectTheme = (theme: ThemeOption) => {
    setCurrentTheme(theme.id);
    document.documentElement.setAttribute("data-theme", theme.id);
    localStorage.setItem("fixtnow-theme", theme.id);
    toast.success(`Theme updated to ${theme.name}!`, {
      icon: <Sparkles className="size-4 text-emerald-500" />,
      duration: 2000,
    });
  };

  const activeThemeObj =
    THEME_OPTIONS.find((t) => t.id === currentTheme) || THEME_OPTIONS[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Select Theme Color"
          className="group relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-700/80 bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white transition-all cursor-pointer shadow-sm hover:border-slate-600"
        >
          {/* Active Color Swatch Dot with Pulsing Glow */}
          <span
            className="size-3.5 rounded-full transition-transform duration-300 group-hover:scale-110 shadow-xs"
            style={{
              backgroundColor: activeThemeObj.primaryColor,
              boxShadow: `0 0 8px ${activeThemeObj.primaryColor}80`,
            }}
          />
          <Palette className="size-4 transition-transform duration-300 group-hover:rotate-12" />
          <span className="hidden xl:inline text-xs font-semibold">
            Theme
          </span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-64 p-2 rounded-2xl bg-[#0B1729] border border-slate-800 text-white shadow-2xl backdrop-blur-xl"
      >
        <div className="px-3 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="size-4 text-[#FF6B00]" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
              Color Palette (4 Themes)
            </span>
          </div>
        </div>

        <DropdownMenuSeparator className="bg-slate-800 my-1" />

        <div className="space-y-1.5 py-1">
          {THEME_OPTIONS.map((theme) => {
            const isSelected = currentTheme === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => handleSelectTheme(theme)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                  isSelected
                    ? "bg-slate-800/90 text-white border border-slate-700 shadow-sm"
                    : "hover:bg-slate-800/50 text-slate-300 hover:text-white border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Swatch Circle */}
                  <div
                    className="size-5 rounded-full ring-2 ring-white/20 flex items-center justify-center shrink-0 transition-transform duration-300 shadow-sm"
                    style={{ backgroundColor: theme.primaryColor }}
                  >
                    {isSelected && (
                      <Check className="size-3 text-white stroke-[3]" />
                    )}
                  </div>

                  <div>
                    <div className="text-xs font-bold leading-tight flex items-center gap-1.5">
                      <span>{theme.name}</span>
                      {theme.id === "orange" && (
                        <span className="text-[9px] bg-orange-500/20 text-orange-400 px-1.5 py-0.2 rounded font-semibold uppercase">
                          Default
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5 leading-tight">
                      {theme.tagline}
                    </span>
                  </div>
                </div>

                {isSelected && (
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: theme.primaryColor }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
