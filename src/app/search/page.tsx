"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AppLayout from "@/components/AppLayout";
import PostCard from "@/components/PostCard";
import { INITIAL_POSTS, Post } from "@/lib/mockData";
import {
  Search as SearchIcon,
  X,
  TrendingUp,
} from "lucide-react";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);

  const suggestionPills = [
    "#gym",
    "#confession",
    "#canteen",
    "#examstress",
    "#hostel",
    "#lostandfound",
    "Aggarwal Clg",
    "CSE Dep",
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
      p.department.toLowerCase().includes(q)
    );
  });

  const handleVote = (id: string, delta: number) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, upvotes: p.upvotes + delta } : p))
    );
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 md:py-10 space-y-6">
      {/* Search Input Bar (Glassmorphic) */}
      <div className="space-y-4">
        <div className="text-center space-y-1">
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-foreground">
            Search Campus Radar
          </h1>
          <p className="font-body text-xs sm:text-sm text-muted-foreground">
            Find confessions, course tea, hostel questions, or professors
          </p>
        </div>

        <div className="relative">
          <SearchIcon className="w-5 h-5 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search tags, topics, departments, or keywords..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-10 h-12 rounded-2xl glass-card border border-border/80 text-sm font-heading text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
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

        {/* Suggestion Pills (Clay Pills) */}
        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          <span className="text-xs font-heading text-muted-foreground mr-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            Popular:
          </span>
          {suggestionPills.map((pill) => (
            <button
              key={pill}
              type="button"
              onClick={() => setQuery(pill)}
              className={`text-xs font-heading font-bold px-3 py-1 rounded-full transition-all ${
                query.toLowerCase() === pill.toLowerCase()
                  ? "clay-button-primary text-white"
                  : "clay-button-secondary text-muted-foreground"
              }`}
            >
              {pill}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-muted-foreground font-heading pt-2 border-t border-border/60">
        <span>
          {query ? `Results matching "${query}"` : "All Recent Campus Yaks"}
        </span>
        <span>{filteredPosts.length} posts found</span>
      </div>

      {/* Results Feed (Tactile Clay Cards) */}
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
              No posts matched your query "{query}". Try a broader keyword like "#canteen" or "#confession".
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
