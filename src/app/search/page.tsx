"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AppLayout from "@/components/AppLayout";
import PostCard from "@/components/PostCard";
import { INITIAL_POSTS, TRENDING_TAGS, Post } from "@/lib/mockData";
import {
  Search as SearchIcon,
  X,
  TrendingUp,
  Sparkles,
  Flame,
  ArrowUpRight,
  Filter,
} from "lucide-react";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [activeCategory, setActiveCategory] = useState("all");

  const suggestionPills = [
    { label: "🔥 All Viral", value: "" },
    { label: "#confession", value: "#confession" },
    { label: "#examstress", value: "#examstress" },
    { label: "#canteen", value: "#canteen" },
    { label: "#hostel", value: "#hostel" },
    { label: "#gym", value: "#gym" },
    { label: "Aggarwal Clg", value: "Aggarwal" },
    { label: "CSE Dep", value: "CSE" },
  ];

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  const filteredPosts = posts.filter((p) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase().replace("#", "");
    return (
      p.content.toLowerCase().includes(q) ||
      (p.tag && p.tag.toLowerCase().includes(q)) ||
      p.author.toLowerCase().includes(q) ||
      p.handle.toLowerCase().includes(q) ||
      p.department.toLowerCase().includes(q)
    );
  });

  const handleVote = (id: string, delta: number) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, upvotes: p.upvotes + delta } : p))
    );
  };

  return (
    <div className="max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-6">
      {/* Search & Explore Header (Glassmorphic) */}
      <div className="space-y-4">
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-heading font-bold bg-primary/10 text-primary border border-primary/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CAMPUS EXPLORE & RADAR</span>
          </div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-foreground">
            Explore Campus Pulse
          </h1>
          <p className="font-body text-xs sm:text-sm text-muted-foreground">
            Search viral confessions, lecture notes, professors, and campus gossip
          </p>
        </div>

        {/* Search Input Box */}
        <div className="relative">
          <SearchIcon className="w-5 h-5 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search tags, usernames, departments, or keywords..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-10 h-12 rounded-full glass-card border border-border/80 text-sm font-heading text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
            autoFocus
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Suggestion & Hashtag Pills */}
        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          {suggestionPills.map((pill) => (
            <button
              key={pill.label}
              type="button"
              onClick={() => setQuery(pill.value)}
              className={`text-xs font-heading font-bold px-3 py-1 rounded-full transition-all ${
                query.toLowerCase() === pill.value.toLowerCase()
                  ? "clay-button-primary text-white"
                  : "clay-button-secondary text-muted-foreground"
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Trending Topics Grid (Explore Tiles) */}
      {!query && (
        <div className="clay-card p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-border/60">
            <span className="font-heading font-black text-sm text-foreground flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-primary" />
              Viral on Campus Today
            </span>
            <span className="text-[10px] font-heading font-bold text-muted-foreground">
              Updated Live
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {TRENDING_TAGS.map((tag, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setQuery(tag.tag)}
                className="p-3 rounded-2xl bg-muted/40 hover:bg-primary/10 border border-border/50 text-left transition-all group"
              >
                <div className="font-heading font-bold text-xs text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                  <span>{tag.tag}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                </div>
                <div className="text-[10px] text-muted-foreground font-heading mt-0.5">
                  {tag.postsCount}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-muted-foreground font-heading pt-2 border-t border-border/60">
        <span>
          {query ? `Results matching "${query}"` : "Recent Viral Yaks"}
        </span>
        <span>{filteredPosts.length} posts</span>
      </div>

      {/* Results Feed */}
      <div className="space-y-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} onUpvote={handleVote} />
          ))
        ) : (
          <div className="clay-card p-10 text-center space-y-3">
            <span className="text-3xl">🔍</span>
            <h3 className="font-heading font-bold text-base text-foreground">
              No campus yaks found
            </h3>
            <p className="font-body text-xs text-muted-foreground max-w-sm mx-auto">
              No posts matched your query "{query}". Try searching for "#confession" or "#canteen".
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <AppLayout activeCollege="Aggarwal Clg">
      <Suspense
        fallback={
          <div className="min-h-[50vh] flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
        }
      >
        <SearchContent />
      </Suspense>
    </AppLayout>
  );
}
