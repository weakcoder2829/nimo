"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/authContext";
import NimoAuth from "@/components/NimoAuth";
import {
  Flame,
  TrendingUp,
  GraduationCap,
  MessageSquare,
  Search,
  PlusCircle,
  LogOut,
  MapPin,
  ShieldCheck,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AppLayoutProps {
  children: React.ReactNode;
  activeCollege?: string;
}

export default function AppLayout({
  children,
  activeCollege = "Aggarwal Clg",
}: AppLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { label: "Feed", href: "/feed", icon: Flame, count: null },
    { label: "Trending", href: "/trending", icon: TrendingUp, count: "Hot" },
    { label: "My College", href: "/college", icon: GraduationCap, count: "1.4k" },
    { label: "Messages", href: "/messages", icon: MessageSquare, count: "2" },
    { label: "Search", href: "/search", icon: Search, count: null },
  ];

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="w-10 h-10 rounded-full border-3 border-primary/30 border-t-primary animate-spin" />
        <span className="text-xs font-heading font-medium text-muted-foreground mt-3">
          Loading nimo...
        </span>
      </div>
    );
  }

  // Gate enforcement: Show glassmorphic sign in if not authenticated
  if (!isAuthenticated || !user) {
    return <NimoAuth initialMode="signin" />;
  }

  const effectiveCollege = user?.collegeName || activeCollege;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row relative">
      {/* Background ambient mesh glow */}
      <div className="ambient-light-glow">
        <div className="orb-blue" />
        <div className="orb-purple" />
        <div className="orb-teal" />
      </div>

      {/* ========================================================================= */}
      {/* 1. MOBILE TOP HEADER (Glassmorphic)                                       */}
      {/* ========================================================================= */}
      <header className="md:hidden sticky top-0 z-40 px-3 py-2.5 glass-nav-header flex items-center justify-between border-b">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-1.5 select-none">
            <span className="font-heading font-black text-2xl tracking-tight text-primary">
              nimo<span className="text-foreground">.</span>
            </span>
          </Link>
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-heading font-medium bg-primary/10 text-primary border border-primary/20 max-w-[140px] truncate">
            <MapPin className="w-2.5 h-2.5 shrink-0" />
            <span className="truncate">{effectiveCollege}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-2.5 py-1 rounded-full text-[11px] font-heading font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            {user.studentName.split(" ")[0]}
          </div>
          <button
            type="button"
            onClick={logout}
            className="p-1.5 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. DESKTOP LEFT SIDEBAR (Glassmorphic)                                    */}
      {/* ========================================================================= */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 sticky top-0 h-screen glass-sidebar p-5 justify-between select-none shrink-0 z-30">
        <div className="space-y-6">
          {/* Logo & Radar Indicator */}
          <div className="space-y-2">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-heading font-black text-3xl tracking-tight text-primary group-hover:scale-105 transition-transform">
                nimo<span className="text-foreground">.</span>
              </span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-heading font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                radar
              </span>
            </Link>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-heading">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>5-Mile Campus Radar Active</span>
            </div>
          </div>

          {/* Student Profile Glass Card */}
          <div className="p-3.5 rounded-2xl glass-card border border-border/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-heading font-semibold text-muted-foreground">
                Verified Student
              </span>
              <span className="text-[10px] font-heading font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                Active
              </span>
            </div>
            <div className="font-heading font-bold text-sm text-foreground flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-primary shrink-0" />
              <span className="truncate">{user.studentName}</span>
            </div>
            <div className="text-[11px] text-muted-foreground font-heading space-y-0.5">
              <div>ID: <strong className="text-foreground">{user.rollNumber}</strong></div>
              <div className="truncate">{effectiveCollege}</div>
            </div>
          </div>

          {/* Navigation Links with Glassmorphic styling */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} className="block">
                  <div
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-heading text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/25 border border-primary/40"
                        : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.count && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {item.count}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Post CTA (Clay Button) */}
          <Link href="/post" className="block pt-2">
            <button
              type="button"
              className="clay-button-primary w-full h-11 text-sm font-heading font-bold rounded-2xl"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Drop Anonymous Yak</span>
            </button>
          </Link>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-4 border-t border-border/80 space-y-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-heading">
            <Link href="/" className="hover:text-primary transition-colors">
              Homepage
            </Link>
            <button
              type="button"
              onClick={logout}
              className="text-xs text-destructive hover:underline transition-all flex items-center gap-1 font-semibold"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>

          <div className="p-2.5 rounded-xl glass-card border border-border/50 text-[11px] text-muted-foreground flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>100% Encrypted & Anonymous. Zero tracking.</span>
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 3. MAIN PAGE VIEW                                                         */}
      {/* ========================================================================= */}
      <main className="flex-1 min-w-0 pb-24 md:pb-8 relative z-10">
        {children}
      </main>

      {/* ========================================================================= */}
      {/* 4. MOBILE BOTTOM DOCK (Glassmorphic Floating Dock)                        */}
      {/* ========================================================================= */}
      <nav className="md:hidden fixed bottom-3 left-3 right-3 z-50 rounded-2xl glass-card border border-border/80 px-2 py-2 flex items-center justify-around shadow-2xl backdrop-blur-2xl">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className="flex-1">
              <div
                className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all relative ${
                  isActive ? "text-primary font-bold scale-105" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-heading font-medium mt-1">{item.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </div>
            </Link>
          );
        })}

        {/* Mobile quick post button */}
        <Link href="/post" className="flex-1">
          <div className="flex flex-col items-center justify-center py-0.5 text-primary">
            <div className="clay-button-primary w-9 h-9 rounded-full flex items-center justify-center p-0">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] font-heading font-semibold mt-0.5">Post</span>
          </div>
        </Link>
      </nav>
    </div>
  );
}
