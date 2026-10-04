"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AppLayout from "@/components/AppLayout";
import PostCard from "@/components/PostCard";
import { INITIAL_POSTS, TRENDING_TAGS, Post } from "@/lib/mockData";
import {
  Search as SearchIcon,
  X,
  Heart,
  MessageCircle,
  TrendingUp,
  Sparkles,
} from "lucide-react";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const exploreCategories = [
    { label: "✨ For You", val: "" },
    { label: "🤫 Confessions", val: "#confession" },
    { label: "☕ Canteen", val: "#canteen" },
    { label: "📚 Exam Memes", val: "#examstress" },
    { label: "🏢 Hostel Life", val: "#hostel" },
    { label: "💪 Gym", val: "#gym" },
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
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-3 sm:py-6 space-y-5">
      {/* Search Input Bar (Instagram Explore Header) */}
      <div className="space-y-3 max-w-xl mx-auto">
        <div className="relative">
          <SearchIcon className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search campus radar, usernames, or #hashtags..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-9 h-10 rounded-xl bg-muted/60 border border-border/80 text-xs sm:text-sm font-heading text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-1 focus:ring-primary"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Explore Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none justify-start sm:justify-center">
          {exploreCategories.map((cat) => (
            <button
              key={cat.label}
              type="button"
              onClick={() => setQuery(cat.val)}
              className={`px-3 py-1.5 rounded-full text-xs font-heading font-bold transition-all shrink-0 ${
                query.toLowerCase() === cat.val.toLowerCase()
                  ? "clay-button-primary text-white"
                  : "clay-button-secondary text-muted-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* INSTAGRAM EXPLORE TILES GRID                                          */}
      {/* ===================================================================== */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className={`group relative aspect-square rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col justify-between text-white bg-gradient-to-br ${
              post.gradientBg || "from-blue-600 to-indigo-800"
            } cursor-pointer overflow-hidden shadow-sm hover:shadow-lg transition-transform hover:scale-[1.02]`}
          >
            {/* Top tag & author */}
            <div className="flex items-center justify-between text-[11px] font-heading z-10">
              <span className="font-bold opacity-80">@{post.handle}</span>
              {post.tag && (
                <span className="px-2 py-0.5 rounded-full bg-black/20 text-[10px] backdrop-blur-xs font-bold">
                  {post.tag}
                </span>
              )}
            </div>

            {/* Snippet text */}
            <p className="font-heading font-bold text-xs sm:text-sm line-clamp-4 leading-snug drop-shadow-sm z-10 text-center my-auto">
              "{post.content}"
            </p>

            {/* Hover overlay with Instagram Like & Comment Stats */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 z-20 backdrop-blur-xs font-heading font-black text-sm text-white">
              <div className="flex items-center gap-1.5">
                <Heart className="w-5 h-5 fill-white" />
                <span>{post.likesCount || 120}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MessageCircle className="w-5 h-5 fill-white -scale-x-100" />
                <span>{post.commentsCount || 18}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Post Modal (Instagram Detail View) */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 select-none">
          <div className="relative max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setSelectedPost(null)}
              className="absolute -top-10 right-0 text-white hover:text-white/70 p-2 z-50"
            >
              <X className="w-6 h-6" />
            </button>
            <PostCard post={selectedPost} onUpvote={handleVote} />
          </div>
        </div>
      )}
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
