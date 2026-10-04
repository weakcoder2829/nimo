"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Flame,
  HelpCircle,
  MessageSquarePlus,
  Smartphone,
  ShieldCheck,
  ArrowRight,
  Menu,
  X,
  MapPin,
  Sparkles,
} from "lucide-react";

interface LandingNavbarProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function LandingNavbar({
  onScrollToSection,
}: LandingNavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-6 py-3 transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto rounded-2xl sm:rounded-full px-4 sm:px-6 py-2.5 transition-all duration-300 flex items-center justify-between glass-nav-header ${
          scrolled ? "shadow-lg shadow-black/5" : ""
        }`}
      >
        {/* Brand Group */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-1.5 group select-none">
            <span className="font-heading font-black text-2xl sm:text-3xl tracking-tight text-primary transition-transform group-hover:scale-105">
              nimo<span className="text-foreground">.</span>
            </span>
          </Link>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-heading font-medium bg-primary/10 text-primary border border-primary/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <MapPin className="w-3 h-3 text-primary" />
            <span>Faridabad Radar</span>
          </div>
        </div>

        {/* Center Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1">
          <button
            type="button"
            className="px-3.5 py-1.5 rounded-full text-xs font-heading font-semibold text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            onClick={() => onScrollToSection("live-feed")}
          >
            Live Feed
          </button>
          <button
            type="button"
            className="px-3.5 py-1.5 rounded-full text-xs font-heading font-semibold text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            onClick={() => onScrollToSection("how-it-works")}
          >
            How It Works
          </button>
          <button
            type="button"
            className="px-3.5 py-1.5 rounded-full text-xs font-heading font-semibold text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            onClick={() => onScrollToSection("confessions-section")}
          >
            Confessions
          </button>
          <button
            type="button"
            className="px-3.5 py-1.5 rounded-full text-xs font-heading font-semibold text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            onClick={() => onScrollToSection("download-app")}
          >
            Get App
          </button>
          <button
            type="button"
            className="px-3.5 py-1.5 rounded-full text-xs font-heading font-semibold text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            onClick={() => onScrollToSection("anti-bullying")}
          >
            Honor Code
          </button>
        </nav>

        {/* Action Buttons: Sign In (Glass) & Sign Up (Clay/Pill) */}
        <div className="flex items-center gap-2">
          <Link
            href="/feed"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-heading font-bold text-foreground hover:text-primary transition-colors"
          >
            <span>Campus Feed</span>
          </Link>

          <Link
            href="/login"
            className="px-4 py-1.5 rounded-full text-xs font-heading font-bold text-foreground border border-border/80 hover:border-primary/50 hover:bg-primary/5 transition-all shadow-xs"
          >
            Log In
          </Link>

          <Link
            href="/signup"
            className="clay-button-primary px-4 py-1.5 rounded-full text-xs font-heading font-bold"
          >
            <span>Sign Up</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer with Glassmorphism */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 p-4 rounded-2xl glass-card border border-border shadow-xl space-y-3 animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col space-y-1">
            <button
              type="button"
              className="text-left px-3.5 py-2.5 rounded-xl text-sm font-heading font-medium hover:bg-primary/10 hover:text-primary transition-colors flex items-center justify-between"
              onClick={() => {
                setMobileMenuOpen(false);
                onScrollToSection("live-feed");
              }}
            >
              <span>Live Campus Feed</span>
              <Flame className="w-4 h-4 text-primary" />
            </button>
            <button
              type="button"
              className="text-left px-3.5 py-2.5 rounded-xl text-sm font-heading font-medium hover:bg-primary/10 hover:text-primary transition-colors flex items-center justify-between"
              onClick={() => {
                setMobileMenuOpen(false);
                onScrollToSection("how-it-works");
              }}
            >
              <span>How It Works</span>
              <HelpCircle className="w-4 h-4 text-muted-foreground" />
            </button>
            <button
              type="button"
              className="text-left px-3.5 py-2.5 rounded-xl text-sm font-heading font-medium hover:bg-primary/10 hover:text-primary transition-colors flex items-center justify-between"
              onClick={() => {
                setMobileMenuOpen(false);
                onScrollToSection("confessions-section");
              }}
            >
              <span>Post Confession</span>
              <MessageSquarePlus className="w-4 h-4 text-muted-foreground" />
            </button>
            <button
              type="button"
              className="text-left px-3.5 py-2.5 rounded-xl text-sm font-heading font-medium hover:bg-primary/10 hover:text-primary transition-colors flex items-center justify-between"
              onClick={() => {
                setMobileMenuOpen(false);
                onScrollToSection("download-app");
              }}
            >
              <span>Mobile App</span>
              <Smartphone className="w-4 h-4 text-muted-foreground" />
            </button>
            <button
              type="button"
              className="text-left px-3.5 py-2.5 rounded-xl text-sm font-heading font-medium hover:bg-primary/10 hover:text-primary transition-colors flex items-center justify-between"
              onClick={() => {
                setMobileMenuOpen(false);
                onScrollToSection("anti-bullying");
              }}
            >
              <span>Safety Rules & Honor Code</span>
              <ShieldCheck className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          <div className="pt-3 border-t border-border/80 flex items-center gap-2">
            <Link
              href="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="clay-button-primary flex-1 py-2.5 text-xs text-center justify-center font-bold"
            >
              Create Account
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 py-2.5 rounded-xl text-xs text-center font-bold border border-border hover:bg-muted transition-colors text-foreground"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
