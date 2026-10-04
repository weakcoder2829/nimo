"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/authContext";
import NimoAuth from "@/components/NimoAuth";
import {
  Home,
  Search,
  Compass,
  Film,
  Send as PaperPlane,
  Heart,
  PlusSquare,
  Menu,
  LogOut,
  MapPin,
  ShieldCheck,
  Sparkles,
  Bookmark,
  Settings,
  Grid,
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
  const [activeTabProfile, setActiveTabProfile] = useState<"posts" | "saved">("posts");

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { label: "Home", href: "/feed", icon: Home, badge: null },
    { label: "Search", href: "/search", icon: Search, badge: null },
    { label: "Explore", href: "/trending", icon: Compass, badge: null },
    { label: "Reels & Radar", href: "/college", icon: Film, badge: null },
    { label: "Messages", href: "/messages", icon: PaperPlane, badge: "2" },
    { label: "Notifications", href: "/feed", icon: Heart, badge: null },
    { label: "Create", href: "/post", icon: PlusSquare, badge: null },
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
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row relative selection:bg-primary/20 selection:text-primary">
      {/* Background ambient mesh glow */}
      <div className="ambient-light-glow">
        <div className="orb-blue" />
        <div className="orb-purple" />
      </div>

      {/* ========================================================================= */}
      {/* 1. MOBILE TOP HEADER (Instagram Style: Logo + Heart + Direct Paper Plane) */}
      {/* ========================================================================= */}
      <header className="md:hidden sticky top-0 z-40 px-4 py-2.5 glass-nav-header flex items-center justify-between border-b border-border/80">
        <Link href="/feed" className="flex items-center gap-1 select-none">
          <span className="font-heading font-black text-2xl tracking-tighter text-foreground">
            nimo<span className="text-primary">.</span>
          </span>
          <span className="text-[10px] text-muted-foreground font-heading uppercase px-1.5 py-0.5 rounded-full bg-muted/60">
            radar
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/trending" className="text-foreground hover:text-muted-foreground">
            <Heart className="w-6 h-6" />
          </Link>

          <Link href="/messages" className="relative text-foreground hover:text-muted-foreground">
            <PaperPlane className="w-6 h-6 -rotate-45" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#ed4956] text-white rounded-full text-[9px] font-heading font-black flex items-center justify-center">
              2
            </span>
          </Link>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. DESKTOP LEFT SIDEBAR (Instagram Web Style Rail)                        */}
      {/* ========================================================================= */}
      <aside className="hidden md:flex flex-col w-60 lg:w-64 sticky top-0 h-screen glass-sidebar p-5 justify-between select-none shrink-0 z-30">
        <div className="space-y-6">
          {/* Instagram Wordmark Logo */}
          <Link href="/feed" className="block pt-2 px-2">
            <span className="font-heading font-black text-3xl tracking-tighter text-foreground hover:opacity-90 transition-opacity">
              nimo<span className="text-primary">.</span>
            </span>
          </Link>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link key={item.label} href={item.href} className="block">
                  <div
                    className={`flex items-center justify-between px-3.5 py-3 rounded-2xl font-heading text-sm transition-all group ${
                      isActive
                        ? "font-black text-foreground bg-black/5 dark:bg-white/10"
                        : "font-semibold text-foreground/80 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <Icon
                        className={`w-6 h-6 transition-transform group-hover:scale-105 ${
                          isActive ? "stroke-[2.5px] text-foreground" : "stroke-2"
                        } ${item.label === "Messages" ? "-rotate-45" : ""}`}
                      />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-[#ed4956] text-white">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}

            {/* Profile Tab */}
            <button
              type="button"
              onClick={() => setProfileModalOpen(true)}
              className="w-full flex items-center gap-4 px-3.5 py-3 rounded-2xl font-heading text-sm font-semibold text-foreground/80 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-all text-left"
            >
              <div className="clay-avatar w-6 h-6 text-xs shrink-0 ring-2 ring-primary/40">
                👨‍💻
              </div>
              <span className="truncate">Profile</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Bottom: More / Sign Out */}
        <div className="pt-4 border-t border-border/60 space-y-2">
          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-heading font-semibold text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Log out</span>
          </button>

          <div className="px-3.5 text-[11px] text-muted-foreground font-heading">
            Aggarwal College Hub &bull; 1.4k online
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 3. MAIN PAGE CONTENT                                                      */}
      {/* ========================================================================= */}
      <main className="flex-1 min-w-0 pb-20 md:pb-8 relative z-10">
        {children}
      </main>

      {/* ========================================================================= */}
      {/* 4. MOBILE BOTTOM BAR (The iconic 5-tab Instagram layout)                  */}
      {/* ========================================================================= */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-nav-header border-t border-border/80 px-4 py-2 flex items-center justify-around shadow-2xl backdrop-blur-2xl">
        {/* 1. Home */}
        <Link href="/feed">
          <div
            className={`p-2 transition-transform active:scale-125 ${
              pathname === "/feed" ? "text-foreground font-bold" : "text-muted-foreground"
            }`}
          >
            <Home className="w-6 h-6" />
          </div>
        </Link>

        {/* 2. Search / Explore */}
        <Link href="/search">
          <div
            className={`p-2 transition-transform active:scale-125 ${
              pathname === "/search" ? "text-foreground font-bold" : "text-muted-foreground"
            }`}
          >
            <Search className="w-6 h-6" />
          </div>
        </Link>

        {/* 3. Create (+) */}
        <Link href="/post">
          <div className="p-2 transition-transform active:scale-125 text-foreground">
            <PlusSquare className="w-6 h-6" />
          </div>
        </Link>

        {/* 4. Reels / Radar */}
        <Link href="/college">
          <div
            className={`p-2 transition-transform active:scale-125 ${
              pathname === "/college" ? "text-foreground font-bold" : "text-muted-foreground"
            }`}
          >
            <Film className="w-6 h-6" />
          </div>
        </Link>

        {/* 5. Profile */}
        <button
          type="button"
          onClick={() => setProfileModalOpen(true)}
          className="p-1 focus:outline-none"
        >
          <div className="clay-avatar w-7 h-7 text-xs ring-2 ring-foreground/30">
            👨‍💻
          </div>
        </button>
      </nav>

      {/* ========================================================================= */}
      {/* 5. INSTAGRAM PROFILE MODAL                                                */}
      {/* ========================================================================= */}
      {profileModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-3 select-none">
          <div className="clay-card p-6 sm:p-8 max-w-md w-full space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <span className="font-heading font-black text-sm text-foreground">
                mukul_cse
              </span>
              <button
                type="button"
                onClick={() => setProfileModalOpen(false)}
                className="text-muted-foreground hover:text-foreground text-sm font-bold"
              >
                &times;
              </button>
            </div>

            {/* Profile Header (Avatar + Stats) */}
            <div className="flex items-center justify-between gap-4">
              <div className="ig-story-ring p-0.5 shrink-0">
                <div className="ig-story-avatar-inner">
                  <div className="clay-avatar w-16 h-16 text-3xl">👨‍💻</div>
                </div>
              </div>

              <div className="flex-1 flex justify-around text-center">
                <div>
                  <div className="font-heading font-black text-base text-foreground">24</div>
                  <div className="text-[11px] text-muted-foreground font-heading">posts</div>
                </div>
                <div>
                  <div className="font-heading font-black text-base text-foreground">1,840</div>
                  <div className="text-[11px] text-muted-foreground font-heading">karma</div>
                </div>
                <div>
                  <div className="font-heading font-black text-base text-foreground">1.4k</div>
                  <div className="text-[11px] text-muted-foreground font-heading">radar</div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="text-xs space-y-1 font-heading">
              <div className="font-bold text-foreground">{user.studentName}</div>
              <div className="text-muted-foreground">ID: {user.rollNumber} &bull; {effectiveCollege}</div>
              <p className="font-body text-foreground/90 leading-snug">
                Building code & surviving Computer Networks labs 🦉 | Verified anonymous voice.
              </p>
            </div>

            {/* Instagram Profile Action Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                className="clay-button-secondary flex-1 py-1.5 text-xs font-heading font-bold rounded-xl"
              >
                Edit Profile
              </button>
              <button
                type="button"
                className="clay-button-secondary flex-1 py-1.5 text-xs font-heading font-bold rounded-xl"
              >
                Share Profile
              </button>
            </div>

            {/* Tabs: Grid / Saved */}
            <div className="flex items-center justify-around border-t border-border/50 pt-2 text-xs font-heading font-bold">
              <button
                type="button"
                onClick={() => setActiveTabProfile("posts")}
                className={`flex items-center gap-1.5 py-1 ${
                  activeTabProfile === "posts" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
                }`}
              >
                <Grid className="w-4 h-4" />
                <span>POSTS</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTabProfile("saved")}
                className={`flex items-center gap-1.5 py-1 ${
                  activeTabProfile === "saved" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span>SAVED</span>
              </button>
            </div>

            {/* Close Button */}
            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={logout}
                className="text-xs text-destructive hover:underline font-semibold"
              >
                Log Out
              </button>
              <button
                type="button"
                onClick={() => setProfileModalOpen(false)}
                className="clay-button-primary px-4 py-1.5 text-xs font-heading font-bold rounded-xl"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
