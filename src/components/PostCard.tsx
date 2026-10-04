"use client";

import React, { useState } from "react";
import { Post, PostComment } from "@/lib/mockData";
import {
  ArrowBigUp,
  ArrowBigDown,
  MessageCircle,
  Repeat2,
  Heart,
  Share2,
  Bookmark,
  Flame,
  Check,
  MapPin,
  Send,
  MoreHorizontal,
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
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);
  const [reposted, setReposted] = useState(false);
  const [repostsCount, setRepostsCount] = useState(post.repostsCount || 0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<PostComment[]>(post.comments || []);
  const [commentInput, setCommentInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

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
    }
  };

  const handleRepost = () => {
    if (reposted) {
      setReposted(false);
      setRepostsCount((prev) => Math.max(0, prev - 1));
    } else {
      setReposted(true);
      setRepostsCount((prev) => prev + 1);
    }
  };

  const handleAddComment = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!commentInput.trim()) return;

    const newComment: PostComment = {
      id: `c_${Date.now()}`,
      author: "You (Anonymous)",
      avatar: "🦊",
      text: commentInput.trim(),
      timeAgo: "Just now",
      upvotes: 1,
    };

    setComments((prev) => [newComment, ...prev]);
    setCommentInput("");
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin + `/feed#${post.id}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article className="clay-card p-5 sm:p-6 transition-all duration-300">
      {/* 1. Header: Avatar with story ring + Author handle & meta */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Tactile Clay Avatar with gradient ring */}
          <div className="relative">
            <div className="clay-avatar w-12 h-12 text-2xl shrink-0 ring-2 ring-primary/30">
              <span>{post.authorAvatar}</span>
            </div>
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-card" />
          </div>

          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-heading font-black text-sm text-foreground hover:text-primary transition-colors cursor-pointer">
                {post.author}
              </span>
              <CheckCircle2 className="w-3.5 h-3.5 text-primary fill-primary/10 shrink-0" />
              <span className="text-xs text-muted-foreground font-heading">
                {post.handle}
              </span>

              {post.isHot && (
                <span className="clay-badge clay-badge-hot ml-1">
                  <Flame className="w-3 h-3 fill-current" />
                  <span>Hot</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-heading mt-0.5">
              <span>{post.college}</span>
              <span>&bull;</span>
              <span>{post.department}</span>
              <span>&bull;</span>
              <span>{post.timeAgo}</span>
            </div>
          </div>
        </div>

        {/* Top actions: Save & options */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            onClick={() => setSaved(!saved)}
            title={saved ? "Saved" : "Save post"}
          >
            <Bookmark className={`w-4 h-4 ${saved ? "fill-primary text-primary" : ""}`} />
          </button>
        </div>
      </div>

      {/* 2. Main Post Content */}
      <p className="mt-3.5 text-base sm:text-[17px] text-foreground/90 leading-relaxed font-body font-normal">
        {post.content}
      </p>

      {/* Topic Tag if present */}
      {post.tag && (
        <div className="mt-3">
          <span className="clay-badge text-primary bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer text-xs font-heading font-bold">
            {post.tag}
          </span>
        </div>
      )}

      {/* 3. Social Media Engagement Bar */}
      <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between gap-2 flex-wrap">
        {/* Left: Tactile Clay Vote Pill */}
        <div className="clay-vote-container">
          <button
            type="button"
            aria-label="Upvote"
            onClick={() => handleVote("up")}
            className={`clay-vote-btn ${userVote === "up" ? "active-up" : ""}`}
          >
            <ArrowBigUp className={`w-5 h-5 ${userVote === "up" ? "fill-current" : ""}`} />
          </button>

          <span
            className={`px-2 text-xs font-heading font-black min-w-[28px] text-center ${
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
            aria-label="Downvote"
            onClick={() => handleVote("down")}
            className={`clay-vote-btn ${userVote === "down" ? "active-down" : ""}`}
          >
            <ArrowBigDown className={`w-5 h-5 ${userVote === "down" ? "fill-current" : ""}`} />
          </button>
        </div>

        {/* Right: Comments, Repost, Like & Share buttons */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Comments Toggle */}
          <button
            type="button"
            onClick={() => setShowComments(!showComments)}
            className={`clay-badge text-xs font-heading font-semibold py-1.5 px-3 cursor-pointer transition-colors ${
              showComments ? "bg-primary/10 text-primary border-primary/30" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>{comments.length}</span>
          </button>

          {/* Repost / Echo */}
          <button
            type="button"
            onClick={handleRepost}
            className={`clay-badge text-xs font-heading font-semibold py-1.5 px-3 cursor-pointer transition-colors ${
              reposted ? "text-emerald-500 bg-emerald-500/10 border-emerald-500/30" : "text-muted-foreground hover:text-foreground"
            }`}
            title="Echo to campus radar"
          >
            <Repeat2 className="w-4 h-4" />
            <span>{repostsCount}</span>
          </button>

          {/* Like / Heart */}
          <button
            type="button"
            onClick={handleLike}
            className={`clay-badge text-xs font-heading font-semibold py-1.5 px-3 cursor-pointer transition-colors ${
              liked ? "text-rose-500 bg-rose-500/10 border-rose-500/30" : "text-muted-foreground hover:text-foreground"
            }`}
            title="Like yak"
          >
            <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
            <span>{likesCount}</span>
          </button>

          {/* Share */}
          <button
            type="button"
            onClick={handleShare}
            className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            title="Copy share link"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-500 animate-in zoom-in" />
            ) : (
              <Share2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* 4. Expandable Inline Social Comments Thread */}
      {showComments && (
        <div className="mt-4 pt-3 border-t border-border/40 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Quick Comment Input Box */}
          <form onSubmit={handleAddComment} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Drop an anonymous reply..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              className="flex-1 h-9 px-3.5 rounded-full text-xs bg-muted/50 border border-border/70 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="submit"
              disabled={!commentInput.trim()}
              className="clay-button-primary h-9 px-3.5 rounded-full text-xs font-bold disabled:opacity-40"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Comments List */}
          {comments.length > 0 ? (
            <div className="space-y-2 pt-1">
              {comments.map((c) => (
                <div key={c.id} className="p-3 rounded-2xl bg-muted/30 border border-border/30 flex items-start gap-2.5">
                  <div className="clay-avatar w-7 h-7 text-xs shrink-0 mt-0.5">
                    {c.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-bold text-xs text-foreground">
                        {c.author}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-heading">
                        {c.timeAgo}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-foreground/90 font-body mt-0.5">
                      {c.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground font-heading italic text-center py-2">
              No replies yet. Be the first to drop an anonymous reply!
            </p>
          )}
        </div>
      )}
    </article>
  );
}
