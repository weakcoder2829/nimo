"use client";

import React, { useState } from "react";
import { Post, PostComment } from "@/lib/mockData";
import {
  ArrowBigUp,
  ArrowBigDown,
  MessageCircle,
  Share2,
  Bookmark,
  Flame,
  Check,
  MapPin,
  Send,
} from "lucide-react";

interface PostCardProps {
  post: Post;
  onUpvote?: (id: string, delta: number) => void;
}

export default function PostCard({ post, onUpvote }: PostCardProps) {
  const [votes, setVotes] = useState(post.upvotes);
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<PostComment[]>(post.comments || []);
  const [commentText, setCommentText] = useState("");

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

  const handleAddComment = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!commentText.trim()) return;

    const newComment: PostComment = {
      id: `c_${Date.now()}`,
      author: "Anonymous Student",
      avatar: "🦊",
      text: commentText.trim(),
      timeAgo: "Just now",
      upvotes: 1,
    };

    setComments((prev) => [...prev, newComment]);
    setCommentText("");
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
      {/* 1. Header: Avatar with sleek story ring, Author persona, Department, College */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Subtle gradient story ring around tactile clay avatar */}
          <div className="ig-story-ring p-0.5">
            <div className="ig-story-avatar-inner">
              <div className="clay-avatar w-11 h-11 text-2xl shrink-0">
                <span>{post.authorAvatar}</span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-heading font-black text-sm text-foreground hover:text-primary transition-colors cursor-pointer">
                {post.author}
              </span>
              {post.isHot && (
                <span className="clay-badge clay-badge-hot">
                  <Flame className="w-3 h-3 fill-current" />
                  <span>Hot Yak</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-heading mt-0.5">
              <span>{post.department}</span>
              <span>&bull;</span>
              <span>{post.college}</span>
              <span>&bull;</span>
              <span>{post.timeAgo}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 text-muted-foreground">
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

      {/* 2. Text-First Anonymous Post Body */}
      <p className="mt-3.5 text-base sm:text-[17px] text-foreground/90 leading-relaxed font-body font-normal">
        {post.content}
      </p>

      {/* 3. Topic Tag Pill */}
      {post.tag && (
        <div className="mt-3">
          <span className="clay-badge text-primary bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer text-xs font-heading font-bold">
            {post.tag}
          </span>
        </div>
      )}

      {/* 4. Tactile Engagement Footer */}
      <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
        {/* Tactile Clay Vote Capsule */}
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

        {/* Comments & Share */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setShowComments(!showComments)}
            className={`clay-badge text-xs font-heading font-semibold py-1.5 px-3 cursor-pointer transition-colors ${
              showComments ? "bg-primary/10 text-primary border-primary/30" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <MessageCircle className="w-4 h-4 text-muted-foreground" />
            <span>{comments.length}</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            title="Share post"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-500 animate-in zoom-in" />
            ) : (
              <Share2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* 5. Expandable Inline Comments */}
      {showComments && (
        <div className="mt-4 pt-3 border-t border-border/40 space-y-3 animate-in fade-in">
          {/* Quick Comment Input */}
          <form onSubmit={handleAddComment} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Drop an anonymous reply..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 h-9 px-3.5 rounded-full text-xs bg-muted/50 border border-border/70 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              type="submit"
              disabled={!commentText.trim()}
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
            <p className="text-xs text-muted-foreground font-heading italic text-center py-1">
              No replies yet. Be the first to drop a reply!
            </p>
          )}
        </div>
      )}
    </article>
  );
}
