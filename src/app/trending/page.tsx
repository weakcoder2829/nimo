"use client";

import React, { useState } from "react";
import Link from "next/link";
import AppLayout from "@/components/AppLayout";
import PostCard from "@/components/PostCard";
import { INITIAL_POSTS, TRENDING_TAGS, Post } from "@/lib/mockData";
import {
  TrendingUp,
  Hash,
  ArrowUpRight,
  Award,
} from "lucide-react";

export default function TrendingPage() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);

  const filters = [
    { label: "🔥 All Trending", value: "All" },
    { label: "🤫 Confessions", value: "#confession" },
    { label: "📚 Exam Stress", value: "#examstress" },
    { label: "🍕 Canteen", value: "#canteen" },
    { label: "🏢 Hostel", value: "#hostel" },
    { label: "💪 Gym", value: "#gym" },
  ];

  const filteredPosts = posts
    .filter((p) => {
      if (selectedFilter === "All") return true;
      return p.tag === selectedFilter;
    })
    .sort((a, b) => b.upvotes - a.upvotes);

  const handleVote = (id: string, delta: number) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, upvotes: p.upvotes + delta } : p))
    );
  };

  return (
    <AppLayout activeCollege="Aggarwal Clg">
      <div className="max-w-6xl mx-auto px-4 py-4 md:py-6 space-y-6">
        {/* Page Title Header (Glassmorphic) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/80">
          <div>
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-foreground flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              <span>Campus Pulse & Trends</span>
            </h1>
            <p className="font-body text-xs sm:text-sm text-muted-foreground mt-0.5">
              The highest upvoted confessions, alerts, and banter across Faridabad colleges
            </p>
          </div>

          <span className="clay-badge text-primary text-xs font-heading font-bold w-fit">
            Updated Real-Time
          </span>
        </div>

        {/* Filters Bar (Clay Pills) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {filters.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setSelectedFilter(f.value)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-heading font-bold transition-all shrink-0 ${
                selectedFilter === f.value
                  ? "clay-button-primary text-white"
                  : "clay-button-secondary text-muted-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* 2 Column Layout: Left Ranked Feed + Right Trending Sidebar */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* LEFT: Ranked Posts List */}
          <div className="flex-1 space-y-4">
            {filteredPosts.map((post, index) => (
              <div key={post.id} className="relative group">
                {/* Trend Rank Badge */}
                <div className="absolute -left-2 sm:-left-3 -top-2 z-10">
                  <span
                    className={`clay-badge font-heading font-black text-xs ${
                      index === 0
                        ? "clay-button-primary text-white border-amber-400"
                        : index === 1
                        ? "bg-slate-400 text-white"
                        : index === 2
                        ? "bg-amber-700 text-white"
                        : "text-muted-foreground"
                    }`}
                  >
                    #{index + 1}
                  </span>
                </div>

                <PostCard post={post} onUpvote={handleVote} />
              </div>
            ))}
          </div>

          {/* RIGHT SIDEBAR: Trending Tags & Leaderboard */}
          <aside className="w-full lg:w-80 space-y-4 shrink-0">
            <div className="clay-card p-5 space-y-4">
              <div className="flex items-center gap-2 font-heading font-bold text-base text-foreground pb-2 border-b border-border/60">
                <Hash className="w-4 h-4 text-primary" />
                <span># Trending Tags</span>
              </div>

              <div className="space-y-2">
                {TRENDING_TAGS.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedFilter(item.tag)}
                    className={`flex items-center justify-between p-2.5 rounded-2xl cursor-pointer transition-colors ${
                      selectedFilter === item.tag
                        ? "bg-primary/10 border border-primary/20 text-primary"
                        : "hover:bg-muted/60 text-foreground"
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="font-heading font-bold text-sm flex items-center gap-1">
                        <span>{item.tag}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground" />
                      </div>
                      <div className="text-xs text-muted-foreground font-heading">
                        {item.postsCount}
                      </div>
                    </div>

                    {item.isRising ? (
                      <span className="clay-badge text-emerald-600 dark:text-emerald-400 text-[10px] font-heading font-bold">
                        +48%
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground font-heading font-semibold">
                        Top 5
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Campus Leaderboard */}
            <div className="clay-card p-5 space-y-3">
              <div className="font-heading font-bold text-sm text-foreground flex items-center gap-2">
                <Award className="w-4 h-4 text-primary" />
                <span>College Radar Rankings</span>
              </div>
              <div className="space-y-2 text-xs font-heading">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary font-bold">
                  <span>1. Aggarwal Clg</span>
                  <span>1,420 yaks</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-muted/40 text-muted-foreground">
                  <span>2. DAV Centenary Clg</span>
                  <span>890 yaks</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-muted/40 text-muted-foreground">
                  <span>3. JC Bose UST (YMCA)</span>
                  <span>740 yaks</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </AppLayout>
  );
}
