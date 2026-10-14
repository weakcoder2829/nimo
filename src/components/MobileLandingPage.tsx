"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Flame,
  CheckCircle2,
} from "lucide-react";

export default function MobileLandingPage() {
  return (
    <div className="w-full min-h-screen min-h-[100dvh] flex flex-col justify-between bg-background text-foreground p-5 pb-8 relative overflow-hidden selection:bg-primary/20 selection:text-primary">
      {/* Subtle ambient lighting */}
      <div className="ambient-light-glow pointer-events-none opacity-40">
        <div className="orb-blue" />
      </div>

      {/* 1. TOP MINIMAL NAV */}
      <header className="flex items-center justify-between pt-2 pb-4 relative z-10">
        <div className="flex items-center gap-2">
          <span className="font-heading font-black text-2xl tracking-tight text-primary lowercase">
            timo<span className="text-foreground">.</span>
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-heading font-semibold bg-primary/10 text-primary border border-primary/20">
            Faridabad
          </span>
        </div>

        <Link
          href="/login"
          className="text-xs font-heading font-bold px-3.5 py-1.5 rounded-full border border-border/80 text-foreground hover:bg-muted/60 transition-colors"
        >
          Log in
        </Link>
      </header>

      {/* 2. MAIN CENTER HERO & "HOW IT WORKS" */}
      <div className="my-auto py-4 space-y-6 relative z-10">
        {/* Main Heading */}
        <div className="space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-heading font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Campus Private Network</span>
          </div>

          <h1 className="font-heading font-black text-4xl sm:text-5xl tracking-tight text-foreground leading-[1.08]">
            Speak freely.<br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
              Stay anonymous.
            </span>
          </h1>

          <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-sm">
            Unfiltered campus confessions, real-time banter, and peer discussions for verified Faridabad college students.
          </p>
        </div>

        {/* How It Works (Compact 3-Step Grid) */}
        <div className="space-y-2.5 pt-2">
          <div className="text-[11px] font-heading font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-primary" />
            <span>How it works</span>
          </div>

          <div className="space-y-2">
            {/* Step 1 */}
            <div className="clay-card p-3 flex items-start gap-3">
              <div className="clay-avatar w-8 h-8 text-xs shrink-0 bg-primary/10 text-primary">
                1
              </div>
              <div>
                <h4 className="font-heading font-bold text-xs text-foreground">
                  Verify Student Status
                </h4>
                <p className="text-[11px] text-muted-foreground font-body leading-snug mt-0.5">
                  1-time verification with college ID. Zero names linked to your posts.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="clay-card p-3 flex items-start gap-3">
              <div className="clay-avatar w-8 h-8 text-xs shrink-0 bg-indigo-500/10 text-indigo-500">
                2
              </div>
              <div>
                <h4 className="font-heading font-bold text-xs text-foreground">
                  Drop Confessions &amp; Yaks
                </h4>
                <p className="text-[11px] text-muted-foreground font-body leading-snug mt-0.5">
                  Share campus gossip, exam rants, or questions 100% anonymously.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="clay-card p-3 flex items-start gap-3">
              <div className="clay-avatar w-8 h-8 text-xs shrink-0 bg-emerald-500/10 text-emerald-500">
                3
              </div>
              <div>
                <h4 className="font-heading font-bold text-xs text-foreground">
                  Student-Led Community
                </h4>
                <p className="text-[11px] text-muted-foreground font-body leading-snug mt-0.5">
                  Upvote the best topics. Posts with negative votes auto-expire.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM ACTIONS (Sticky Feel) */}
      <footer className="space-y-3 pt-2 relative z-10">
        <Link href="/signup" className="block w-full">
          <button
            type="button"
            className="clay-button-primary w-full h-12 text-sm font-heading font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
          >
            <span>Create account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>

        <div className="flex items-center justify-between text-xs font-heading text-muted-foreground px-1">
          <span>Already registered?</span>
          <Link
            href="/login"
            className="font-bold text-primary hover:underline underline-offset-2"
          >
            Log in to account &rarr;
          </Link>
        </div>

        <div className="text-center pt-1 border-t border-border/50">
          <Link
            href="/feed"
            className="text-[11px] font-heading text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            <span>Or explore campus feed as guest</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
