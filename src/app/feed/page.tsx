"use client";

import React, { useState } from "react";
import Link from "next/link";
import AppLayout from "@/components/AppLayout";
import PostCard from "@/components/PostCard";
import {
  INITIAL_POSTS,
  TRENDING_TAGS,
  CAMPUS_STORIES,
  ACTIVE_COLLEGE_USERS,
  Post,
  CampusStory,
} from "@/lib/mockData";
import {
  Heart,
  Plus,
  Send,
  X,
  Sparkles,
  MapPin,
  TrendingUp,
  Users,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [activeStoryIdx, setActiveStoryIdx] = useState<number | null>(null);
  const [storyReply, setStoryReply] = useState("");
  const [storyLiked, setStoryLiked] = useState(false);
  const [createPostOpen, setCreatePostOpen] = useState(false);
  const [newPostText, setNewPostText] = useState("");
  const [newPostTag, setNewPostTag] = useState("#confession");
  const [newPostGradient, setNewPostGradient] = useState("from-blue-600 via-indigo-600 to-purple-800");

  const handleVote = (id: string, delta: number) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, upvotes: p.upvotes + delta } : p))
    );
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newP: Post = {
      id: `p_${Date.now()}`,
      author: "Verified Student",
      handle: "you.anon",
      authorAvatar: "👨‍💻",
      college: "Aggarwal College",
      department: "Faridabad • Live",
      content: newPostText.trim(),
      upvotes: 1,
      commentsCount: 0,
      repostsCount: 0,
      likesCount: 1,
      likedBy: "you.anon",
      timeAgo: "Just now",
      tag: newPostTag,
      gradientBg: newPostGradient,
      isHot: true,
      comments: [],
    };

    setPosts((prev) => [newP, ...prev]);
    setNewPostText("");
    setCreatePostOpen(false);
  };

  const gradientPresets = [
    { label: "Ocean", val: "from-blue-600 via-indigo-600 to-purple-800" },
    { label: "Sunset", val: "from-amber-600 via-orange-600 to-rose-700" },
    { label: "Neon", val: "from-fuchsia-700 via-pink-700 to-rose-600" },
    { label: "Emerald", val: "from-emerald-600 via-teal-700 to-cyan-800" },
    { label: "Midnight", val: "from-slate-900 via-indigo-950 to-blue-950" },
  ];

  const currentStory: CampusStory | null =
    activeStoryIdx !== null ? CAMPUS_STORIES[activeStoryIdx] : null;

  const nextStory = () => {
    if (activeStoryIdx !== null && activeStoryIdx < CAMPUS_STORIES.length - 1) {
      setActiveStoryIdx(activeStoryIdx + 1);
      setStoryLiked(false);
      setStoryReply("");
    } else {
      setActiveStoryIdx(null);
    }
  };

  const prevStory = () => {
    if (activeStoryIdx !== null && activeStoryIdx > 0) {
      setActiveStoryIdx(activeStoryIdx - 1);
      setStoryLiked(false);
      setStoryReply("");
    }
  };

  return (
    <AppLayout activeCollege="Aggarwal Clg">
      <div className="max-w-5xl mx-auto px-2 sm:px-4 py-3 sm:py-6 flex justify-center gap-8">
        {/* CENTER COLUMN: Instagram Feed (Stories + Posts Stream) */}
        <div className="w-full max-w-[580px] space-y-4">
          {/* ================================================================= */}
          {/* 1. INSTAGRAM STORIES CAROUSEL                                     */}
          {/* ================================================================= */}
          <div className="clay-card p-3 sm:p-4 overflow-hidden">
            <div className="flex items-center gap-4 overflow-x-auto pb-1 scrollbar-none">
              {CAMPUS_STORIES.map((story, idx) => (
                <button
                  key={story.id}
                  type="button"
                  onClick={() => {
                    if (idx === 0) {
                      setCreatePostOpen(true);
                    } else {
                      setActiveStoryIdx(idx);
                      setStoryLiked(false);
                    }
                  }}
                  className="flex flex-col items-center gap-1.5 shrink-0 group cursor-pointer focus:outline-none"
                >
                  <div className="relative">
                    {/* Instagram Gradient Ring */}
                    <div className={idx === 0 ? "p-0.5" : "ig-story-ring"}>
                      <div className="ig-story-avatar-inner">
                        <div className="clay-avatar w-14 h-14 text-2xl transition-transform group-hover:scale-105">
                          {story.avatar}
                        </div>
                      </div>
                    </div>

                    {/* '+' Icon on Your Story */}
                    {idx === 0 && (
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-primary text-white rounded-full flex items-center justify-center border-2 border-card text-xs font-bold shadow-xs">
                        +
                      </div>
                    )}
                  </div>

                  <span className="text-[11px] font-heading font-medium text-foreground max-w-[68px] truncate">
                    {story.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Create Prompt Pill */}
          <div
            onClick={() => setCreatePostOpen(true)}
            className="clay-card p-3 sm:p-3.5 flex items-center gap-3 cursor-pointer hover:border-primary/40 transition-colors"
          >
            <div className="clay-avatar w-9 h-9 text-base shrink-0">👨‍💻</div>
            <div className="flex-1 text-xs sm:text-sm font-heading text-muted-foreground">
              What's your confession or campus tea today?
            </div>
            <button
              type="button"
              className="clay-button-primary px-3.5 py-1.5 text-xs font-heading font-bold rounded-full"
            >
              Post
            </button>
          </div>

          {/* ================================================================= */}
          {/* 2. INSTAGRAM POST FEED STREAM                                     */}
          {/* ================================================================= */}
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} onUpvote={handleVote} />
            ))}
          </div>
        </div>

        {/* =================================================================== */}
        {/* RIGHT COLUMN: Instagram Desktop Sidebar (Profile Switch & Suggestions)*/}
        {/* =================================================================== */}
        <aside className="hidden lg:block w-80 space-y-5 shrink-0 pt-2">
          {/* Current User Instagram Profile Switcher */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="clay-avatar w-12 h-12 text-2xl ring-2 ring-primary/30">
                👨‍💻
              </div>
              <div>
                <div className="font-heading font-black text-xs text-foreground flex items-center gap-1">
                  <span>mukul_cse</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary fill-primary/10" />
                </div>
                <div className="text-[11px] text-muted-foreground font-heading">
                  Aggarwal College &bull; 1.8k pts
                </div>
              </div>
            </div>

            <button
              type="button"
              className="text-xs font-heading font-bold text-primary hover:text-foreground transition-colors"
            >
              Switch
            </button>
          </div>

          {/* Suggested Student Personas */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-heading">
              <span className="font-bold text-muted-foreground">
                Suggested for you
              </span>
              <span className="font-bold text-foreground hover:underline cursor-pointer">
                See All
              </span>
            </div>

            <div className="space-y-2.5">
              {ACTIVE_COLLEGE_USERS.map((user, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="ig-story-ring p-0.5">
                      <div className="ig-story-avatar-inner">
                        <div className="clay-avatar w-8 h-8 text-sm">
                          {user.avatar}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="font-heading font-bold text-xs text-foreground hover:underline cursor-pointer">
                        {user.handle}
                      </div>
                      <div className="text-[10px] text-muted-foreground font-heading">
                        {user.role}
                      </div>
                    </div>
                  </div>

                  <Link href={`/messages?user=${encodeURIComponent(user.name)}`}>
                    <button
                      type="button"
                      className="text-xs font-heading font-bold text-primary hover:text-foreground"
                    >
                      Whisper
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Campus Topics */}
          <div className="clay-card p-4 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-border/40">
              <span className="font-heading font-bold text-xs text-foreground flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-primary" />
                Campus Radar Tags
              </span>
              <span className="text-[10px] font-heading font-semibold text-muted-foreground">
                Live
              </span>
            </div>

            <div className="space-y-2">
              {TRENDING_TAGS.slice(0, 4).map((tag, idx) => (
                <Link key={idx} href={`/search?q=${encodeURIComponent(tag.tag)}`} className="block group">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-heading font-bold text-foreground group-hover:text-primary transition-colors">
                      {tag.tag}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-heading">
                      {tag.postsCount}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Minimal Instagram Footer Links */}
          <div className="text-[11px] text-muted-foreground font-heading space-y-2 leading-relaxed">
            <div className="flex flex-wrap gap-x-2 gap-y-1">
              <Link href="/what-is" className="hover:underline">About</Link> &bull;
              <Link href="/feed" className="hover:underline">Help</Link> &bull;
              <Link href="/feed" className="hover:underline">Privacy</Link> &bull;
              <Link href="/feed" className="hover:underline">Terms</Link> &bull;
              <Link href="/college" className="hover:underline">Locations</Link>
            </div>
            <div>&copy; {new Date().getFullYear()} NIMO FROM FARIDABAD</div>
          </div>
        </aside>
      </div>

      {/* ===================================================================== */}
      {/* 3. INTERACTIVE INSTAGRAM STORY VIEWER MODAL                            */}
      {/* ===================================================================== */}
      {currentStory && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 select-none">
          {/* Close button */}
          <button
            type="button"
            onClick={() => setActiveStoryIdx(null)}
            className="absolute top-4 right-4 text-white hover:text-white/70 p-2 z-50"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Story Container Card */}
          <div className="relative w-full max-w-[420px] h-[82vh] max-h-[720px] rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between p-5 text-white bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
            {/* Top Progress Bars */}
            <div className="space-y-3 z-20">
              <div className="flex items-center gap-1.5 w-full">
                {CAMPUS_STORIES.slice(1).map((s, i) => (
                  <div
                    key={s.id}
                    className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
                  >
                    <div
                      className={`h-full bg-white transition-all duration-300 ${
                        i + 1 < activeStoryIdx!
                          ? "w-full"
                          : i + 1 === activeStoryIdx!
                          ? "w-full animate-pulse"
                          : "w-0"
                      }`}
                    />
                  </div>
                ))}
              </div>

              {/* Story Author Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="ig-story-ring p-0.5">
                    <div className="ig-story-avatar-inner">
                      <div className="clay-avatar w-8 h-8 text-base">
                        {currentStory.avatar}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="font-heading font-black text-xs text-white flex items-center gap-1">
                      <span>{currentStory.title}</span>
                      <span className="text-[10px] text-white/70">&bull; {currentStory.timeAgo}</span>
                    </div>
                    <div className="text-[10px] text-white/70 font-heading">
                      {currentStory.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Story Centered Content */}
            <div className="text-center py-8 px-4 space-y-4 z-20">
              <div className="text-5xl">{currentStory.avatar}</div>
              <p className="font-heading font-black text-xl sm:text-2xl text-white leading-snug drop-shadow-md">
                {currentStory.content}
              </p>
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-heading font-bold text-white">
                <MapPin className="w-3 h-3" />
                <span>{currentStory.activeCount}</span>
              </div>
            </div>

            {/* Bottom Interaction: Whisper Reply & Heart */}
            <div className="flex items-center gap-3 z-20">
              <input
                type="text"
                placeholder={`Reply to ${currentStory.title}...`}
                value={storyReply}
                onChange={(e) => setStoryReply(e.target.value)}
                className="flex-1 h-11 px-4 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white placeholder:text-white/60 text-xs font-body outline-none"
              />
              <button
                type="button"
                onClick={() => setStoryLiked(!storyLiked)}
                className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center active:scale-125 transition-transform"
              >
                <Heart
                  className={`w-6 h-6 ${
                    storyLiked ? "text-rose-500 fill-rose-500" : "text-white"
                  }`}
                />
              </button>
            </div>

            {/* Nav click zones */}
            <button
              type="button"
              onClick={prevStory}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-2 z-30"
              title="Previous story"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={nextStory}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-2 z-30"
              title="Next story"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 4. INSTAGRAM POST CREATOR MODAL                                       */}
      {/* ===================================================================== */}
      {createPostOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-3 select-none">
          <div className="clay-card p-5 sm:p-7 max-w-lg w-full space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-border/50">
              <span className="font-heading font-black text-base text-foreground">
                Create New Campus Post
              </span>
              <button
                type="button"
                onClick={() => setCreatePostOpen(false)}
                className="text-muted-foreground hover:text-foreground text-sm font-bold"
              >
                &times;
              </button>
            </div>

            {/* Gradient Selector for the Instagram Visual Canvas */}
            <div className="space-y-1.5">
              <label className="text-xs font-heading font-bold text-muted-foreground">
                Choose Aesthetic Canvas Theme:
              </label>
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {gradientPresets.map((g) => (
                  <button
                    key={g.label}
                    type="button"
                    onClick={() => setNewPostGradient(g.val)}
                    className={`h-8 px-3 rounded-full bg-gradient-to-r ${g.val} text-white text-xs font-heading font-bold shadow-xs transition-transform ${
                      newPostGradient === g.val ? "scale-105 ring-2 ring-foreground" : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Textarea */}
            <div className="space-y-2">
              <textarea
                rows={4}
                maxLength={300}
                placeholder="What's happening on campus? Confession, tea, canteen review, or exam stress..."
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                className="w-full p-4 rounded-2xl bg-muted/40 border border-border/60 text-sm font-body text-foreground placeholder:text-muted-foreground/60 outline-none resize-none"
                autoFocus
              />
              <div className="text-right text-[11px] text-muted-foreground font-mono">
                {300 - newPostText.length} characters left
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setCreatePostOpen(false)}
                className="clay-button-secondary flex-1 py-2.5 text-xs font-heading font-bold rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreatePost}
                disabled={!newPostText.trim()}
                className="clay-button-primary flex-1 py-2.5 text-xs font-heading font-black rounded-xl disabled:opacity-40"
              >
                Share to Feed
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
