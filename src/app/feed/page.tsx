"use client";

import React, { useState } from "react";
import Link from "next/link";
import AppLayout from "@/components/AppLayout";
import PostCard from "@/components/PostCard";
import { INITIAL_POSTS, TRENDING_TAGS, CAMPUS_STORIES, ACTIVE_COLLEGE_USERS, Post } from "@/lib/mockData";
import {
  Flame,
  Clock,
  Sparkles,
  TrendingUp,
  MapPin,
  ShieldCheck,
  Plus,
  Send,
  Lock,
  Smile,
  Hash,
  ArrowRight,
  MessageSquare,
  Users,
} from "lucide-react";

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [activeTab, setActiveTab] = useState<"for_you" | "radar" | "confessions" | "hot">("for_you");
  const [composeText, setComposeText] = useState("");
  const [composeTag, setComposeTag] = useState("#confession");
  const [composeAvatar, setComposeAvatar] = useState("🦊");
  const [isPosting, setIsPosting] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);
  const [selectedStory, setSelectedStory] = useState<string | null>(null);

  const handleVote = (id: string, delta: number) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, upvotes: p.upvotes + delta } : p))
    );
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composeText.trim()) return;

    setIsPosting(true);
    setTimeout(() => {
      const newPost: Post = {
        id: `post_${Date.now()}`,
        author: "Anonymous Student",
        handle: "@faridabad_anon",
        authorAvatar: composeAvatar,
        college: "Aggarwal Clg",
        department: "CSE Dep",
        content: composeText.trim(),
        upvotes: 1,
        commentsCount: 0,
        repostsCount: 0,
        likesCount: 1,
        timeAgo: "Just now",
        tag: composeTag,
        isHot: true,
        comments: [],
      };

      setPosts((prev) => [newPost, ...prev]);
      setComposeText("");
      setIsPosting(false);
      setPostSuccess(true);
      setTimeout(() => setPostSuccess(false), 3000);
    }, 300);
  };

  const tags = ["#confession", "#examstress", "#canteen", "#hostel", "#crush", "#rant"];
  const avatars = ["🦊", "🦉", "🦬", "👻", "🧪", "💪", "🚀"];

  // Filtered posts according to active social tab
  const filteredPosts = posts.filter((p) => {
    if (activeTab === "hot") return p.isHot || p.upvotes > 70;
    if (activeTab === "confessions") return p.tag?.toLowerCase().includes("confession");
    if (activeTab === "radar") return p.college.includes("Aggarwal");
    return true; // "for_you" returns all
  });

  return (
    <AppLayout activeCollege="Aggarwal Clg">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 sm:py-5 flex flex-col lg:flex-row gap-6 justify-center">
        {/* CENTER COLUMN: Main Social Media Feed */}
        <div className="flex-1 min-w-0 max-w-2xl w-full space-y-4">
          {/* ================================================================= */}
          {/* 1. CAMPUS STORIES / RADAR STATUS BUBBLES CAROUSEL                 */}
          {/* ================================================================= */}
          <div className="clay-card p-3 sm:p-4 overflow-hidden">
            <div className="flex items-center justify-between pb-2 mb-1 px-1">
              <span className="text-[11px] font-heading font-black tracking-wider uppercase text-muted-foreground flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Campus Radar Stories
              </span>
              <span className="text-[10px] font-heading font-bold text-primary">
                Faridabad Hub
              </span>
            </div>

            <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
              {CAMPUS_STORIES.map((story) => (
                <button
                  key={story.id}
                  type="button"
                  onClick={() => setSelectedStory(story.id)}
                  className="flex flex-col items-center gap-1.5 shrink-0 group cursor-pointer focus:outline-none"
                >
                  <div className="relative">
                    <div
                      className={`clay-avatar w-14 h-14 text-2xl transition-transform group-hover:scale-105 ${
                        story.hasUnseen
                          ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                          : "ring-1 ring-border"
                      }`}
                    >
                      <span>{story.avatar}</span>
                    </div>
                    {story.hasUnseen && (
                      <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-primary rounded-full border-2 border-background" />
                    )}
                  </div>
                  <span className="text-[11px] font-heading font-bold text-foreground max-w-[68px] truncate">
                    {story.title}
                  </span>
                  <span className="text-[9px] text-muted-foreground font-heading">
                    {story.activeCount}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* ================================================================= */}
          {/* 2. INLINE SOCIAL COMPOSE BOX (Threads / Twitter Style)            */}
          {/* ================================================================= */}
          <div className="clay-card p-4 sm:p-5 space-y-3">
            <form onSubmit={handleCreatePost} className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div className="clay-avatar w-10 h-10 text-xl shrink-0">
                    {composeAvatar}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <textarea
                    rows={2}
                    maxLength={300}
                    placeholder="What's the tea on campus? Drop a confession, lecture gossip, or canteen rant..."
                    value={composeText}
                    onChange={(e) => setComposeText(e.target.value)}
                    className="w-full bg-transparent resize-none border-none outline-none font-body text-sm sm:text-base text-foreground placeholder:text-muted-foreground/60 leading-relaxed"
                  />
                </div>
              </div>

              {/* Tag Selector & Avatar Pickers */}
              <div className="pt-2 border-t border-border/40 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full">
                  <span className="text-[10px] font-heading font-bold text-muted-foreground mr-1">
                    Tag:
                  </span>
                  {tags.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setComposeTag(t)}
                      className={`text-[11px] font-heading font-bold px-2.5 py-1 rounded-full transition-all shrink-0 ${
                        composeTag === t
                          ? "clay-button-primary text-white"
                          : "clay-button-secondary text-muted-foreground"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-muted-foreground hidden sm:inline">
                    {300 - composeText.length}
                  </span>

                  <button
                    type="submit"
                    disabled={!composeText.trim() || isPosting}
                    className="clay-button-primary px-4 py-1.5 text-xs font-heading font-black rounded-full disabled:opacity-40 flex items-center gap-1.5"
                  >
                    <Send className="w-3 h-3" />
                    <span>Post Yak</span>
                  </button>
                </div>
              </div>
            </form>

            {postSuccess && (
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-heading font-bold text-center animate-in fade-in">
                ✓ Your anonymous yak is now live across Faridabad campus radar!
              </div>
            )}
          </div>

          {/* ================================================================= */}
          {/* 3. SOCIAL TIMELINE TABS (Glassmorphic Segmented Control)          */}
          {/* ================================================================= */}
          <div className="flex items-center justify-between glass-card p-1.5 sm:p-2 border border-border/80">
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setActiveTab("for_you")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-heading font-bold transition-all shrink-0 ${
                  activeTab === "for_you"
                    ? "clay-button-primary text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                For You
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("radar")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-heading font-bold transition-all shrink-0 ${
                  activeTab === "radar"
                    ? "clay-button-primary text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Campus Radar
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("confessions")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-heading font-bold transition-all shrink-0 ${
                  activeTab === "confessions"
                    ? "clay-button-primary text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Confessions
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("hot")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-heading font-bold transition-all shrink-0 flex items-center gap-1 ${
                  activeTab === "hot"
                    ? "clay-button-primary text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Hot Takes</span>
              </button>
            </div>
          </div>

          {/* ================================================================= */}
          {/* 4. SOCIAL MEDIA FEED STREAM                                      */}
          {/* ================================================================= */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} onUpvote={handleVote} />
            ))}
          </div>
        </div>

        {/* =================================================================== */}
        {/* RIGHT COLUMN: Social Media Sidebar (Explore & Trending Radar)       */}
        {/* =================================================================== */}
        <aside className="hidden lg:block w-80 space-y-4 shrink-0">
          {/* Trending Hashtags Box */}
          <div className="clay-card p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border/60">
              <div className="font-heading font-bold text-sm text-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span>Trending on Campus</span>
              </div>
              <span className="clay-badge text-[10px] font-heading font-bold text-primary">
                Faridabad
              </span>
            </div>

            <div className="space-y-2.5">
              {TRENDING_TAGS.map((item, idx) => (
                <Link key={idx} href={`/search?q=${encodeURIComponent(item.tag)}`} className="block group">
                  <div className="flex items-center justify-between p-2 rounded-2xl hover:bg-muted/60 transition-colors">
                    <div>
                      <div className="font-heading font-bold text-xs text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                        <span>{item.tag}</span>
                      </div>
                      <div className="text-[11px] text-muted-foreground font-heading">
                        {item.postsCount}
                      </div>
                    </div>
                    {item.isRising && (
                      <span className="clay-badge text-emerald-600 dark:text-emerald-400 text-[10px] font-heading font-bold">
                        Trending
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Active Campus Personas / Student Circles */}
          <div className="clay-card p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-border/60">
              <div className="font-heading font-bold text-sm text-foreground flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span>Who to Whisper</span>
              </div>
              <span className="text-[10px] text-muted-foreground font-heading">Online</span>
            </div>

            <div className="space-y-2.5">
              {ACTIVE_COLLEGE_USERS.slice(0, 3).map((user, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-2xl hover:bg-muted/40 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <div className="relative">
                      <div className="clay-avatar w-9 h-9 text-base">
                        {user.avatar}
                      </div>
                      {user.online && (
                        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-card" />
                      )}
                    </div>
                    <div>
                      <div className="font-heading font-bold text-xs text-foreground">
                        {user.name}
                      </div>
                      <div className="text-[10px] text-muted-foreground font-heading">
                        {user.role} &bull; {user.karma} pts
                      </div>
                    </div>
                  </div>

                  <Link href={`/messages?user=${encodeURIComponent(user.name)}`}>
                    <button
                      type="button"
                      className="clay-badge text-primary hover:bg-primary/10 text-[11px] font-heading font-bold px-2 py-1"
                    >
                      Whisper
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Campus Radar Card */}
          <div className="clay-card p-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="clay-avatar w-10 h-10 text-primary shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-foreground">
                  Aggarwal College Hub
                </h4>
                <p className="text-xs text-muted-foreground font-heading">Sector 2 &bull; 1,420 online</p>
              </div>
            </div>
            <p className="text-xs font-body text-muted-foreground leading-relaxed">
              Your radar range is locked to 5 miles around Faridabad campuses. Posts stay anonymous and ephemeral.
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
        </aside>
      </div>
    </AppLayout>
  );
}
