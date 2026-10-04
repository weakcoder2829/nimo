"use client";

import React, { useState, useRef } from "react";
import { Post, PostComment } from "@/lib/mockData";
import {
  Heart,
  MessageCircle,
  Send as PaperPlane,
  Bookmark,
  MoreHorizontal,
  ArrowBigUp,
  ArrowBigDown,
  Sparkles,
  Check,
  MapPin,
  CheckCircle2,
} from "lucide-react";

interface PostCardProps {
  post: Post;
  onUpvote?: (id: string, delta: number) => void;
}

export default function PostCard({ post, onUpvote }: PostCardProps) {
  const [votes, setVotes] = useState(post.upvotes);
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likesCount || 124);
  const [showHeartPop, setShowHeartPop] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<PostComment[]>(post.comments || []);
  const [commentText, setCommentText] = useState("");
  const [copied, setCopied] = useState(false);
  const lastTapRef = useRef<number>(0);

  const handleVote = (type: "up" | "down") => {
    if (userVote === type) {
      setUserVote(null);
      setVotes((v) => (type === "up" ? v - 1 : v + 1));
      onUpvote?.(post.id, type === "up" ? -1 : 1);
    } else {
      const delta = type === "up" ? (userVote === "down" ? 2 : 1) : userVote === "up" ? -2 : -1;
      setUserVote(type);
      setVotes((v) => v + delta);
      onUpvote?.(post.id, delta);
    }
  };

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikesCount((prev) => Math.max(0, prev - 1));
    } else {
      setLiked(true);
      setLikesCount((prev) => prev + 1);
      setShowHeartPop(true);
      setTimeout(() => setShowHeartPop(false), 800);
    }
  };

  // Double tap to like (Instagram gesture)
  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      if (!liked) {
        setLiked(true);
        setLikesCount((prev) => prev + 1);
      }
      setShowHeartPop(true);
      setTimeout(() => setShowHeartPop(false), 800);
    }
    lastTapRef.current = now;
  };

  const handleAddComment = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!commentText.trim()) return;

    const newC: PostComment = {
      id: `c_${Date.now()}`,
      author: "you.anon",
      avatar: "🦊",
      text: commentText.trim(),
      timeAgo: "Just now",
      upvotes: 1,
    };

    setComments((prev) => [...prev, newC]);
    setCommentText("");
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin + `/feed#${post.id}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const quickEmojis = ["❤️", "🔥", "😂", "🙌", "💀", "👏"];

  return (
    <article className="clay-card overflow-hidden transition-all duration-300">
      {/* 1. INSTAGRAM POST HEADER */}
      <div className="p-3.5 sm:p-4 flex items-center justify-between border-b border-border/40">
        <div className="flex items-center gap-3">
          {/* Instagram Story Gradient Ring around Avatar */}
          <div className="ig-story-ring">
            <div className="ig-story-avatar-inner">
              <div className="clay-avatar w-9 h-9 text-lg">
                {post.authorAvatar}
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-black text-xs sm:text-sm text-foreground hover:underline cursor-pointer">
                {post.handle}
              </span>
              <CheckCircle2 className="w-3.5 h-3.5 text-primary fill-primary/10 shrink-0" />
              <span className="text-[11px] text-muted-foreground font-heading">
                &bull; {post.timeAgo}
              </span>
            </div>

            <div className="text-[11px] text-muted-foreground font-heading flex items-center gap-1">
              <MapPin className="w-3 h-3 text-muted-foreground shrink-0" />
              <span className="truncate max-w-[200px]">{post.college}</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="p-1.5 text-muted-foreground hover:text-foreground rounded-full"
          title="More options"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* 2. INSTAGRAM VISUAL CONFESSION CANVAS (Double-tap to like) */}
      <div
        onClick={handleDoubleTap}
        className={`relative aspect-[4/3] sm:aspect-[16/10] bg-gradient-to-br ${
          post.gradientBg || "from-blue-600 via-indigo-600 to-purple-800"
        } p-6 sm:p-8 flex flex-col justify-between text-white select-none cursor-pointer overflow-hidden shadow-inner`}
      >
        {/* Subtle decorative mesh overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-15"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Top bar on canvas: Anonymous badge & category */}
        <div className="relative z-10 flex items-center justify-between text-xs font-heading">
          <span className="px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-white font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Anonymous Yak</span>
          </span>

          {post.tag && (
            <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md font-bold">
              {post.tag}
            </span>
          )}
        </div>

        {/* Centered Quote / Confession Content */}
        <div className="relative z-10 py-4 text-center max-w-lg mx-auto space-y-3">
          <span className="text-3xl sm:text-4xl font-serif text-white/50 block leading-none">“</span>
          <p className="font-heading font-bold text-lg sm:text-xl md:text-2xl text-white leading-snug drop-shadow-sm px-2">
            {post.content}
          </p>
          <span className="text-3xl sm:text-4xl font-serif text-white/50 block leading-none">”</span>
        </div>

        {/* Bottom watermark */}
        <div className="relative z-10 flex items-center justify-between text-[11px] font-heading text-white/70">
          <span>{post.department}</span>
          <span className="font-black tracking-widest text-white/90">nimo.</span>
        </div>

        {/* Floating Heart Pop Animation on Double-Tap */}
        {showHeartPop && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none animate-heart-pop">
            <Heart className="w-24 h-24 text-white fill-white drop-shadow-2xl" />
          </div>
        )}
      </div>

      {/* 3. INSTAGRAM ACTION BAR */}
      <div className="p-3 sm:p-4 space-y-2.5">
        <div className="flex items-center justify-between">
          {/* Left: Like, Comment, Share */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleLike}
              className="transition-transform active:scale-125 focus:outline-none"
              title="Like"
            >
              <Heart
                className={`w-6 h-6 transition-colors ${
                  liked
                    ? "text-[#ed4956] fill-[#ed4956]"
                    : "text-foreground hover:text-muted-foreground"
                }`}
              />
            </button>

            <button
              type="button"
              onClick={() => setShowComments(!showComments)}
              className="text-foreground hover:text-muted-foreground transition-transform active:scale-125 focus:outline-none"
              title="Comment"
            >
              <MessageCircle className="w-6 h-6 -scale-x-100" />
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="text-foreground hover:text-muted-foreground transition-transform active:scale-125 focus:outline-none"
              title="Share"
            >
              {copied ? (
                <Check className="w-5 h-5 text-emerald-500" />
              ) : (
                <PaperPlane className="w-5 h-5 -rotate-45" />
              )}
            </button>
          </div>

          {/* Right: Tactile Clay Vote Pill & Save */}
          <div className="flex items-center gap-3">
            {/* Clay Vote Capsule */}
            <div className="clay-vote-container">
              <button
                type="button"
                onClick={() => handleVote("up")}
                className={`clay-vote-btn ${userVote === "up" ? "active-up" : ""}`}
                aria-label="Upvote"
              >
                <ArrowBigUp className={`w-4 h-4 ${userVote === "up" ? "fill-current" : ""}`} />
              </button>

              <span
                className={`px-1.5 text-xs font-heading font-black min-w-[24px] text-center ${
                  userVote === "up"
                    ? "text-primary"
                    : userVote === "down"
                    ? "text-destructive"
                    : "text-foreground"
                }`}
              >
                {votes}
              </span>

              <button
                type="button"
                onClick={() => handleVote("down")}
                className={`clay-vote-btn ${userVote === "down" ? "active-down" : ""}`}
                aria-label="Downvote"
              >
                <ArrowBigDown className={`w-4 h-4 ${userVote === "down" ? "fill-current" : ""}`} />
              </button>
            </div>

            {/* Bookmark */}
            <button
              type="button"
              onClick={() => setSaved(!saved)}
              className="focus:outline-none"
              title="Save"
            >
              <Bookmark
                className={`w-6 h-6 transition-colors ${
                  saved ? "text-foreground fill-foreground" : "text-foreground hover:text-muted-foreground"
                }`}
              />
            </button>
          </div>
        </div>

        {/* 4. INSTAGRAM SOCIAL PROOF & CAPTION */}
        <div className="space-y-1 text-xs sm:text-sm font-heading">
          {/* Liked by row */}
          <div className="font-bold text-foreground">
            Liked by <span className="hover:underline cursor-pointer">{post.likedBy || "mukul_cse"}</span> and{" "}
            <span>{likesCount.toLocaleString()} others</span>
          </div>

          {/* Caption */}
          <div className="leading-snug">
            <span className="font-black text-foreground mr-1.5 hover:underline cursor-pointer">
              {post.handle}
            </span>
            <span className="font-normal text-foreground/90 font-body">
              {post.content}
            </span>
          </div>

          {/* View comments toggle */}
          {comments.length > 0 && (
            <button
              type="button"
              onClick={() => setShowComments(!showComments)}
              className="text-xs text-muted-foreground hover:text-foreground pt-0.5 block"
            >
              {showComments
                ? "Hide comments"
                : `View all ${comments.length} comments`}
            </button>
          )}

          {/* Expanded Comments List */}
          {showComments && (
            <div className="space-y-1.5 pt-2 border-t border-border/40">
              {comments.map((c) => (
                <div key={c.id} className="text-xs leading-relaxed flex items-start gap-1.5">
                  <span className="font-bold text-foreground shrink-0">
                    {c.author}
                  </span>
                  <span className="font-body text-foreground/90">{c.text}</span>
                  <span className="text-[10px] text-muted-foreground ml-auto shrink-0">
                    {c.timeAgo}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Quick Emoji Reaction Pill Bar */}
          <div className="flex items-center gap-1.5 pt-1 overflow-x-auto pb-0.5 scrollbar-none">
            {quickEmojis.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setCommentText((prev) => prev + emoji)}
                className="w-7 h-7 rounded-full bg-muted/40 hover:bg-muted text-sm flex items-center justify-center transition-transform active:scale-125"
              >
                {emoji}
              </button>
            ))}
          </div>

          {/* Inline Add Comment Input */}
          <form onSubmit={handleAddComment} className="flex items-center gap-2 pt-1 border-t border-border/30">
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 bg-transparent text-xs font-body outline-none placeholder:text-muted-foreground/60 py-1"
            />
            {commentText.trim() && (
              <button
                type="submit"
                className="text-xs font-bold text-primary hover:text-primary/80 font-heading"
              >
                Post
              </button>
            )}
          </form>

          {/* Timestamp */}
          <div className="text-[10px] text-muted-foreground uppercase tracking-wider pt-0.5">
            {post.timeAgo}
          </div>
        </div>
      </div>
    </article>
  );
}
