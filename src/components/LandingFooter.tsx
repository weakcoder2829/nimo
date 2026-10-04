"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, MapPin } from "lucide-react";

interface LandingFooterProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function LandingFooter({
  onScrollToSection,
}: LandingFooterProps) {
  return (
    <footer className="w-full py-12 px-4 sm:px-6 border-t border-border/80 bg-background/50 backdrop-blur-md relative z-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Brand & Mission */}
          <div className="space-y-2">
            <Link href="/" className="flex items-center gap-1.5">
              <span className="font-heading font-black text-2xl tracking-tight text-primary">
                nimo<span className="text-foreground">.</span>
              </span>
            </Link>
            <p className="font-body text-xs sm:text-sm text-muted-foreground max-w-sm">
              Anonymous community and confession radar for Faridabad college students.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-heading font-semibold text-muted-foreground">
            <button
              type="button"
              className="hover:text-primary transition-colors cursor-pointer"
              onClick={() => onScrollToSection("live-feed")}
            >
              Live Feed
            </button>
            <button
              type="button"
              className="hover:text-primary transition-colors cursor-pointer"
              onClick={() => onScrollToSection("how-it-works")}
            >
              How It Works
            </button>
            <button
              type="button"
              className="hover:text-primary transition-colors cursor-pointer"
              onClick={() => onScrollToSection("confessions-section")}
            >
              Post Confession
            </button>
            <button
              type="button"
              className="hover:text-primary transition-colors cursor-pointer"
              onClick={() => onScrollToSection("download-app")}
            >
              Mobile App
            </button>
            <button
              type="button"
              className="hover:text-primary transition-colors cursor-pointer"
              onClick={() => onScrollToSection("anti-bullying")}
            >
              Rules
            </button>
            <Link href="/login" className="hover:text-primary transition-colors">
              Log In
            </Link>
            <Link href="/signup" className="hover:text-primary transition-colors font-bold text-foreground">
              Sign Up
            </Link>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-heading text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} nimo &bull; Faridabad Colleges Anonymous Network
          </p>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>100% Cryptographically Dissociated &bull; Zero Ad Tracking</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
