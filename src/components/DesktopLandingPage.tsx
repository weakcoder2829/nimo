"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LandingNavbar from "@/components/LandingNavbar";
import CampusFeedPreview from "@/components/CampusFeedPreview";
import HowItWorksSection from "@/components/HowItWorksSection";
import ConfessionComposer from "@/components/ConfessionComposer";
import AppDownloadCleanSection from "@/components/AppDownloadCleanSection";
import AntiBullyingSection from "@/components/AntiBullyingSection";
import LandingFooter from "@/components/LandingFooter";
import NimoAuth from "@/components/NimoAuth";
import { useAuth } from "@/lib/authContext";
import {
  ArrowRight,
  ShieldCheck,
  MapPin,
  Sparkles,
  Zap,
  LogOut,
  ChevronDown,
  Flame,
  CheckCircle2,
} from "lucide-react";

interface DesktopLandingPageProps {
  onOpenAuth?: (mode: "signin" | "signup") => void;
}

export default function DesktopLandingPage({ onOpenAuth }: DesktopLandingPageProps) {
  const router = useRouter();
  const { user, isAuthenticated, logout, quickDemoLogin } = useAuth();
  const [authModalMode, setAuthModalMode] = useState<"signin" | "signup" | null>(null);

  const handleQuickDemo = () => {
    quickDemoLogin();
    router.push("/feed");
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full min-h-screen bg-background text-foreground relative selection:bg-primary/20 selection:text-primary">
      {/* Background ambient lighting */}
      <div className="ambient-light-glow">
        <div className="orb-blue" />
        <div className="orb-purple" />
        <div className="orb-teal" />
      </div>

      {/* 1. TOP NAVBAR (Glassmorphic) */}
      <LandingNavbar onScrollToSection={scrollToSection} />

      {/* Verified Student Banner (if signed in) */}
      {isAuthenticated && user && (
        <div className="glass-nav-header px-6 py-2.5 flex items-center justify-between text-xs font-heading border-b border-border/60">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              Signed in as <strong>{user.studentName}</strong> (ID: {user.rollNumber}) &bull; {user.collegeName}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/feed"
              className="text-primary hover:underline font-bold flex items-center gap-1"
            >
              <span>Open Campus Feed</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button
              type="button"
              onClick={logout}
              className="text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors"
            >
              <LogOut className="w-3 h-3" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. MINIMALIST HERO SECTION: "NIMO"                                        */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6 z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Radar Active Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-heading font-medium bg-primary/10 text-primary border border-primary/20 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <MapPin className="w-3.5 h-3.5" />
            <span>Faridabad Campus Radar Active &bull; 5-Mile Range</span>
          </div>

          {/* Minimal Brand Mark */}
          <div className="flex items-center justify-center gap-2 select-none">
            <span className="text-xs font-heading font-bold uppercase tracking-widest text-muted-foreground">
              Welcome to
            </span>
            <span className="text-sm font-heading font-black tracking-tight text-primary px-2.5 py-0.5 rounded-lg bg-primary/10 border border-primary/20">
              nimo.
            </span>
          </div>

          {/* Editorial Title */}
          <h1 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-foreground leading-[1.08]">
            Speak Freely.<br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
              Stay Anonymous.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-body text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The private, authenticated pulse of college life. Verified students from Aggarwal College,
            JC Bose UST (YMCA), and Faridabad campuses read, relate, and drop anonymous confessions without judgment.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {!isAuthenticated ? (
              <>
                <Link
                  href="/signup"
                  className="clay-button-primary px-6 py-3.5 text-sm font-heading font-black rounded-full"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify Student ID &amp; Join</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/login"
                  className="clay-button-secondary px-6 py-3.5 text-sm font-heading font-bold rounded-full"
                >
                  <span>Sign In</span>
                </Link>
              </>
            ) : (
              <Link
                href="/feed"
                className="clay-button-primary px-8 py-3.5 text-sm font-heading font-black rounded-full"
              >
                <Sparkles className="w-4 h-4" />
                <span>Enter Campus Feed</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}

            <button
              type="button"
              className="clay-button-secondary px-5 py-3.5 text-sm font-heading font-bold rounded-full gap-1.5"
              onClick={() => scrollToSection("live-feed")}
            >
              <span>Explore Live Yaks</span>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </button>

            {/* 1-Click Instant Demo Login */}
            <button
              type="button"
              onClick={handleQuickDemo}
              className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-full text-xs font-heading font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 transition-all"
              title="1-click demo login as verified student Mukul (Aggarwal College)"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>1-Click Student Demo</span>
            </button>
          </div>

          {/* Trust Indicators (Clay Badges) */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-3 text-xs font-heading text-muted-foreground">
            <div className="clay-badge text-foreground gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>100% Anonymous Identity</span>
            </div>
            <div className="clay-badge text-foreground gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Verified Campus Students Only</span>
            </div>
            <div className="clay-badge text-foreground gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>-5 Karma Anti-Bullying Filter</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. LIVE CAMPUS FEED (Claymorphic)                                         */}
      {/* ========================================================================= */}
      <div id="live-feed">
        <CampusFeedPreview />
      </div>

      {/* ========================================================================= */}
      {/* 4. HOW IT WORKS SECTION                                                  */}
      {/* ========================================================================= */}
      <div id="how-it-works">
        <HowItWorksSection />
      </div>

      {/* ========================================================================= */}
      {/* 5. POST CONFESSION (Claymorphic)                                         */}
      {/* ========================================================================= */}
      <div id="confessions-section">
        <ConfessionComposer
          isLoggedIn={isAuthenticated}
          onPostCreated={() => {
            scrollToSection("live-feed");
          }}
        />
      </div>

      {/* ========================================================================= */}
      {/* 6. DOWNLOAD APP SECTION                                                  */}
      {/* ========================================================================= */}
      <div id="download-app">
        <AppDownloadCleanSection />
      </div>

      {/* ========================================================================= */}
      {/* 7. COMMUNITY RULES & HONOR CODE                                          */}
      {/* ========================================================================= */}
      <div id="anti-bullying">
        <AntiBullyingSection />
      </div>

      {/* ========================================================================= */}
      {/* 8. FOOTER                                                                */}
      {/* ========================================================================= */}
      <LandingFooter onScrollToSection={scrollToSection} />

      {/* Optional Auth Modal (Glassmorphic) */}
      {authModalMode && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md overflow-y-auto flex flex-col items-center justify-center p-4">
          <NimoAuth
            initialMode={authModalMode}
            onClose={() => setAuthModalMode(null)}
            onSuccess={() => {
              setAuthModalMode(null);
              router.push("/feed");
            }}
          />
        </div>
      )}
    </div>
  );
}
