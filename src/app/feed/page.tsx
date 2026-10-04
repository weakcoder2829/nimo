"use client";

import React, { useState } from "react";
import Link from "next/link";
import AppLayout from "@/components/AppLayout";
import PostCard from "@/components/PostCard";
import { INITIAL_POSTS, TRENDING_TAGS, Post } from "@/lib/mockData";
import {
  Flame,
  Clock,
  Award,
  Sparkles,
  TrendingUp,
  MapPin,
  ShieldAlert,
  Plus,
} from "lucide-react";

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [activeTab, setActiveTab] = useState<"hot" | "new" | "top">("hot");

  const handleVote = (id: string, delta: number) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, upvotes: p.upvotes + delta } : p))
    );
  };

  const sortedPosts = [...posts].sort((a, b) => {
    if (activeTab === "hot") return (b.isHot ? 1 : 0) - (a.isHot ? 1 : 0);
    if (activeTab === "top") return b.upvotes - a.upvotes;
    return 0; // new
  });

  return (
    <AppLayout activeCollege="Aggarwal Clg">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 md:py-6 flex flex-col lg:flex-row gap-6 justify-center">
        {/* CENTER COLUMN: Main Feed */}
        <div className="flex-1 min-w-0 max-w-2xl w-full space-y-4">
          {/* Header Controls & Tabs (Hot / New / Top) */}
          <div className="flex items-center justify-between glass-card p-2 sm:p-2.5 border border-border/80">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setActiveTab("hot")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-heading font-bold flex items-center gap-1.5 transition-all ${
                  activeTab === "hot"
                    ? "clay-button-primary text-white"
                    : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10"
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Hot</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("new")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-heading font-bold flex items-center gap-1.5 transition-all ${
                  activeTab === "new"
                    ? "clay-button-primary text-white"
                    : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10"
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>New</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("top")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-heading font-bold flex items-center gap-1.5 transition-all ${
                  activeTab === "top"
                    ? "clay-button-primary text-white"
                    : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10"
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Top</span>
              </button>
            </div>

            <div className="hidden sm:inline-flex items-center gap-1 text-[11px] font-heading font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Campus Feed</span>
            </div>
          </div>

          {/* Quick Post Prompt Card (Tactile Clay Card) */}
          <Link href="/post" className="block group">
            <div className="clay-card p-4 transition-all flex items-center gap-3.5">
              <div className="ig-story-ring p-0.5 shrink-0">
                <div className="ig-story-avatar-inner">
                  <div className="clay-avatar w-10 h-10 text-xl group-hover:scale-105 transition-transform">
                    🦬
                  </div>
                </div>
              </div>
              <div className="flex-1 text-xs sm:text-sm font-heading text-muted-foreground">
                What's happening on campus? Drop a yak...
              </div>
              <button
                type="button"
                className="clay-button-primary px-3.5 py-1.5 text-xs font-heading font-bold rounded-xl flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Post</span>
              </button>
            </div>
          </Link>

          {/* Stack of Post Cards */}
          <div className="space-y-4">
            {sortedPosts.map((post) => (
              <PostCard key={post.id} post={post} onUpvote={handleVote} />
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: "Today" Trending & Campus Radar (Desktop) */}
        <aside className="hidden lg:block w-80 space-y-4 shrink-0">
          {/* Trending Box (Clay Card) */}
          <div className="clay-card p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border/60">
              <div className="font-heading font-bold text-sm text-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span>Today on Campus</span>
              </div>
              <span className="clay-badge text-[10px] font-heading font-bold text-primary">
                Trending
              </span>
            </div>

            <div className="space-y-2">
              {TRENDING_TAGS.map((item, idx) => (
                <Link key={idx} href={`/search?q=${encodeURIComponent(item.tag)}`} className="block group">
                  <div className="flex items-center justify-between p-2 rounded-xl hover:bg-muted/60 transition-colors">
                    <div>
                      <div className="font-heading font-bold text-xs text-foreground group-hover:text-primary transition-colors">
                        {item.tag}
                      </div>
                      <div className="text-[11px] text-muted-foreground font-heading">
                        {item.postsCount}
                      </div>
                    </div>
                    {item.isRising && (
                      <span className="clay-badge text-emerald-600 dark:text-emerald-400 text-[10px] font-heading font-bold">
                        Rising
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* College Spotlight (Clay Card) */}
          <div className="clay-card p-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="clay-avatar w-10 h-10 text-primary shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-foreground">
                  Aggarwal College
                </h4>
                <p className="text-xs text-muted-foreground font-heading">Faridabad &bull; Sector 2</p>
              </div>
            </div>
            <p className="text-xs font-body text-muted-foreground leading-relaxed">
              Your radar is locked to Aggarwal College. 1,420 students active in the last 24 hours.
            </p>
            <Link href="/college" className="block pt-1">
              <button
                type="button"
                className="clay-button-secondary w-full py-2 text-xs font-heading font-bold rounded-xl"
              >
                View College Community &rarr;
              </button>
            </Link>
          </div>

          {/* Community Safety Notice (Glass Card) */}
          <div className="glass-card p-4 text-xs text-muted-foreground space-y-1.5 font-heading border border-border/60">
            <div className="flex items-center gap-1.5 font-bold text-foreground">
              <ShieldAlert className="w-3.5 h-3.5 text-primary" />
              <span>Campus Community Guidelines</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Posts with negative 5 votes are auto-deleted. Keep the banter fun, respectful, and safe.
            </p>
          </div>
        </aside>
      </div>
    </AppLayout>
  );
}
