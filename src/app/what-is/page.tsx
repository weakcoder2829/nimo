import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldCheck, MapPin, ThumbsUp, HeartHandshake, Sparkles } from "lucide-react";

export default function WhatIsPage() {
  const features = [
    {
      icon: ShieldCheck,
      title: "100% Completely Anonymous",
      description:
        "No names. No bios. No profile photos. Speak your mind freely about exams, canteen gossip, professor quirks, and college confessions without being judged.",
    },
    {
      icon: MapPin,
      title: "5-Mile Campus Radar",
      description:
        "You only see what students within your 5-mile college perimeter are posting. It's an ultra-hyperlocal feed for Aggarwal College and neighboring campuses.",
    },
    {
      icon: ThumbsUp,
      title: "Upvote & Downvote Pulse",
      description:
        "The best thoughts, memes, and campus alerts rise to the top. If a post hits -5 votes, it's removed immediately. The student community runs the feed.",
    },
    {
      icon: HeartHandshake,
      title: "Safe & Supportive Community",
      description:
        "Zero tolerance for cyberbullying, personal attacks, or doxxing. Safe spaces for peer support, mental health, and exam advice.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center px-4 py-8 md:py-16 relative">
      {/* Background ambient mesh glow */}
      <div className="ambient-light-glow">
        <div className="orb-blue" />
        <div className="orb-purple" />
      </div>

      {/* Top Bar: Glassmorphic Nav */}
      <header className="w-full max-w-2xl flex items-center justify-between pb-6 border-b border-border/80 relative z-10">
        <Link href="/feed" className="flex items-center gap-1.5 select-none">
          <span className="font-heading font-black text-2xl tracking-tight text-primary">
            nimo<span className="text-foreground">.</span>
          </span>
          <span className="clay-badge text-[10px] text-primary uppercase">
            college radar
          </span>
        </Link>

        <Link href="/feed">
          <button
            type="button"
            className="px-3.5 py-1.5 rounded-full text-xs font-heading font-semibold text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Feed</span>
          </button>
        </Link>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-2xl mt-8 space-y-8 relative z-10">
        {/* Hero Title & Intro */}
        <div className="space-y-4 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-heading font-bold bg-primary/10 text-primary border border-primary/20">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>About Nimo Campus Platform</span>
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-4xl text-foreground tracking-tight">
            The honest heartbeat of your college campus
          </h1>

          <p className="font-body text-base text-muted-foreground leading-relaxed">
            Nimo connects university students within a 5-mile geographic radar.
            Post anonymously, discover real-time happenings, vote on community topics,
            and connect with verified classmates without personal profiling.
          </p>
        </div>

        {/* Feature Cards in Tactile Clay */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="clay-card p-5 space-y-3">
                <div className="clay-avatar w-10 h-10 text-primary">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-base text-foreground">
                  {feature.title}
                </h3>
                <p className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* College Radar Lock (Clay Card) */}
        <div className="clay-card p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 font-heading font-bold text-base text-foreground">
            <MapPin className="w-5 h-5 text-primary" />
            <span>Faridabad Campus Radar Zone</span>
          </div>
          <p className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Your radar currently synchronizes with Aggarwal College, JC Bose UST (YMCA),
            Manav Rachna, and surrounding institutions in Faridabad, Haryana.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Link href="/feed">
              <button
                type="button"
                className="clay-button-primary px-6 py-2.5 text-xs font-heading font-bold rounded-full"
              >
                <span>Enter Campus Feed</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
            <Link href="/signup">
              <button
                type="button"
                className="clay-button-secondary px-5 py-2.5 text-xs font-heading font-bold rounded-full"
              >
                Verify Student ID
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
