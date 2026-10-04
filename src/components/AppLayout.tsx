"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/authContext";
import NimoAuth from "@/components/NimoAuth";
import {
  Flame,
  Search,
  MessageSquare,
  GraduationCap,
  Sparkles,
  Plus,
  LogOut,
  MapPin,
  ShieldCheck,
  User,
  Heart,
  TrendingUp,
} from "lucide-react";

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
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { label: "Feed", href: "/feed", icon: Flame, badge: null },
    { label: "Explore", href: "/search", icon: Search, badge: null },
    { label: "Trending", href: "/trending", icon: TrendingUp, badge: "Hot" },
    { label: "Whispers", href: "/messages", icon: MessageSquare, badge: "2" },
    { label: "Campus Hub", href: "/college", icon: GraduationCap, badge: null },
  ];

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="w-10 h-10 rounded-full border-3 border-primary/30 border-t-primary animate-spin" />
        <span className="text-xs font-heading font-medium text-muted-foreground mt-3">
          Loading nimo social...
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
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row relative selection:bg-primary/20 selection:text-primary">
      {/* Background ambient lighting glow */}
      <div className="ambient-light-glow">
        <div className="orb-blue" />
        <div className="orb-purple" />
        <div className="orb-teal" />
      </div>

      {/* ========================================================================= */}
      {/* 1. MOBILE TOP HEADER (Glassmorphic)                                       */}
      {/* ========================================================================= */}
      <header className="md:hidden sticky top-0 z-40 px-4 py-2.5 glass-nav-header flex items-center justify-between border-b border-border/80">
        <div className="flex items-center gap-2">
          <Link href="/feed" className="flex items-center gap-1 select-none">
            <span className="font-heading font-black text-2xl tracking-tight text-primary">
              nimo<span className="text-foreground">.</span>
            </span>
          </Link>
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-heading font-bold bg-primary/10 text-primary border border-primary/20 max-w-[130px] truncate">
            <MapPin className="w-2.5 h-2.5 shrink-0" />
            <span className="truncate">{effectiveCollege}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Profile Pill */}
          <button
            type="button"
            onClick={() => setProfileModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-heading font-bold bg-muted/60 hover:bg-muted border border-border/80 text-foreground transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{user.studentName.split(" ")[0]}</span>
          </button>

          <button
            type="button"
            onClick={logout}
            className="p-1.5 rounded-full text-muted-foreground hover:text-destructive transition-colors"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. DESKTOP LEFT SIDEBAR (Glassmorphic Social Navigation Rail)             */}
      {/* ========================================================================= */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 sticky top-0 h-screen glass-sidebar p-5 justify-between select-none shrink-0 z-30">
        <div className="space-y-6">
          {/* Brand & Live Pulse */}
          <div className="space-y-2">
            <Link href="/feed" className="flex items-center gap-2 group">
              <span className="font-heading font-black text-3xl tracking-tight text-primary group-hover:scale-105 transition-transform">
                nimo<span className="text-foreground">.</span>
              </span>
              <span className="clay-badge text-[10px] font-heading font-black text-primary uppercase">
                social
              </span>
            </Link>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-heading">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Campus Radar (5mi active)</span>
            </div>
          </div>

          {/* User Persona Profile Card */}
          <div
            onClick={() => setProfileModalOpen(true)}
            className="clay-card p-3.5 space-y-2 cursor-pointer hover:border-primary/40 transition-all"
            title="Click to view full student profile & karma"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-heading font-semibold text-muted-foreground">
                Verified Student
              </span>
              <span className="text-[10px] font-heading font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                Active &bull; 1,840 pts
              </span>
            </div>
            <div className="font-heading font-bold text-sm text-foreground flex items-center gap-2">
              <div className="clay-avatar w-7 h-7 text-xs">👨‍💻</div>
              <span className="truncate">{user.studentName}</span>
            </div>
            <div className="text-[11px] text-muted-foreground font-heading space-y-0.5">
              <div>ID: <strong className="text-foreground">{user.rollNumber}</strong></div>
              <div className="truncate">{effectiveCollege}</div>
            </div>
          </div>

          {/* Social Navigation Items */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} className="block">
                  <div
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl font-heading text-sm font-bold transition-all ${
                      isActive
                        ? "clay-button-primary text-white shadow-md shadow-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "clay-badge text-primary"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Compose Post Button (Clay 3D Pill) */}
          <Link href="/post" className="block pt-1">
            <button
              type="button"
              className="clay-button-primary w-full h-11 text-sm font-heading font-black rounded-2xl"
            >
              <Plus className="w-4 h-4" />
              <span>Drop Anonymous Yak</span>
            </button>
          </Link>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-4 border-t border-border/60 space-y-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-heading">
            <Link href="/" className="hover:text-primary transition-colors">
              Landing Page
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

          <div className="p-2.5 rounded-2xl glass-card border border-border/50 text-[11px] text-muted-foreground flex items-center gap-2">
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
      {/* 4. MOBILE BOTTOM SOCIAL DOCK (Instagram/Threads Style)                    */}
      {/* ========================================================================= */}
      <nav className="md:hidden fixed bottom-3 left-3 right-3 z-50 rounded-3xl glass-card border border-border/80 px-3 py-2 flex items-center justify-between shadow-2xl backdrop-blur-2xl">
        {/* Feed */}
        <Link href="/feed" className="flex-1">
          <div
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all relative ${
              pathname === "/feed" ? "text-primary font-bold scale-105" : "text-muted-foreground"
            }`}
          >
            <Flame className="w-5 h-5" />
            <span className="text-[10px] font-heading font-bold mt-0.5">Feed</span>
          </div>
        </Link>

        {/* Explore */}
        <Link href="/search" className="flex-1">
          <div
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all relative ${
              pathname === "/search" ? "text-primary font-bold scale-105" : "text-muted-foreground"
            }`}
          >
            <Search className="w-5 h-5" />
            <span className="text-[10px] font-heading font-bold mt-0.5">Explore</span>
          </div>
        </Link>

        {/* Center Compose Post Button */}
        <Link href="/post" className="flex-1 flex justify-center">
          <div className="clay-button-primary w-11 h-11 rounded-full flex items-center justify-center p-0 shadow-lg -mt-3">
            <Plus className="w-6 h-6 text-white" />
          </div>
        </Link>

        {/* Whispers / Messages */}
        <Link href="/messages" className="flex-1">
          <div
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all relative ${
              pathname === "/messages" ? "text-primary font-bold scale-105" : "text-muted-foreground"
            }`}
          >
            <div className="relative">
              <MessageSquare className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary" />
            </div>
            <span className="text-[10px] font-heading font-bold mt-0.5">Whispers</span>
          </div>
        </Link>

        {/* Profile */}
        <button
          type="button"
          onClick={() => setProfileModalOpen(true)}
          className="flex-1 flex flex-col items-center justify-center py-1 text-muted-foreground hover:text-foreground"
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-heading font-bold mt-0.5">Profile</span>
        </button>
      </nav>

      {/* ========================================================================= */}
      {/* 5. STUDENT PERSONA / PROFILE MODAL (Glassmorphic)                         */}
      {/* ========================================================================= */}
      {profileModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="clay-card p-6 sm:p-8 max-w-md w-full space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <div className="flex items-center gap-2 font-heading font-black text-lg text-foreground">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>Student Persona</span>
              </div>
              <button
                type="button"
                onClick={() => setProfileModalOpen(false)}
                className="text-muted-foreground hover:text-foreground text-sm font-bold"
              >
                &times;
              </button>
            </div>

            {/* Profile Avatar & Info */}
            <div className="flex items-center gap-4">
              <div className="clay-avatar w-16 h-16 text-3xl">👨‍💻</div>
              <div>
                <h3 className="font-heading font-black text-lg text-foreground">
                  {user.studentName}
                </h3>
                <div className="text-xs text-primary font-heading font-bold">
                  Roll No: {user.rollNumber}
                </div>
                <div className="text-xs text-muted-foreground font-heading">
                  {effectiveCollege}
                </div>
              </div>
            </div>

            {/* Social Stats: Karma, Yaks, Whispers */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 rounded-2xl bg-muted/40 border border-border/40">
                <div className="font-heading font-black text-lg text-foreground">1,840</div>
                <div className="text-[10px] text-muted-foreground font-heading">Campus Karma</div>
              </div>
              <div className="p-3 rounded-2xl bg-muted/40 border border-border/40">
                <div className="font-heading font-black text-lg text-foreground">24</div>
                <div className="text-[10px] text-muted-foreground font-heading">Total Yaks</div>
              </div>
              <div className="p-3 rounded-2xl bg-muted/40 border border-border/40">
                <div className="font-heading font-black text-lg text-foreground">98%</div>
                <div className="text-[10px] text-muted-foreground font-heading">Positive Pulse</div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-primary/10 border border-primary/20 text-xs font-body text-foreground space-y-1">
              <div className="font-heading font-bold text-primary flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Cryptographic Anonymity Active</span>
              </div>
              <p className="text-[11px] text-muted-foreground">
                Your posts and confessions are completely dissociated from your real student identity.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setProfileModalOpen(false)}
                className="clay-button-primary flex-1 py-2.5 text-xs font-heading font-bold rounded-xl"
              >
                Close Profile
              </button>
              <button
                type="button"
                onClick={() => {
                  setProfileModalOpen(false);
                  logout();
                }}
                className="clay-button-secondary py-2.5 px-4 text-xs font-heading font-bold rounded-xl text-destructive"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
