"use client";

import React, { useState } from "react";
import { Post } from "@/lib/mockData";
import {
  ArrowBigUp,
  ArrowBigDown,
  MessageCircle,
  Share2,
  Bookmark,
  Flame,
  Check,
  MapPin,
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

  const handleVote = (type: "up" | "down") => {
    if (userVote === type) {
      // cancel vote
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

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin + `/feed#${post.id}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article className="clay-card p-5 sm:p-6 transition-all duration-300">
      {/* Header: Clay Avatar, Author, Hot Badge, College */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="clay-avatar w-11 h-11 text-2xl shrink-0">
            <span>{post.authorAvatar}</span>
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-heading font-bold text-sm text-foreground hover:text-primary transition-colors cursor-pointer">
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
              <span>{post.timeAgo}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="clay-badge hidden sm:inline-flex text-[11px] text-muted-foreground">
            <MapPin className="w-3 h-3 text-primary" />
            <span>{post.college}</span>
          </span>

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

      {/* Post Content Body */}
      <p className="mt-3.5 text-base sm:text-[17px] text-foreground/90 leading-relaxed font-body font-normal">
        {post.content}
      </p>

      {/* Topic Tag (Clay Tag) */}
      {post.tag && (
        <div className="mt-3">
          <span className="clay-badge text-primary bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-colors cursor-pointer text-xs font-heading font-semibold">
            {post.tag}
          </span>
        </div>
      )}

      {/* Engagement & Voting Footer */}
      <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
        {/* Tactile Clay Vote Pill */}
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

        {/* Comments & Share Action Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            className="clay-badge text-muted-foreground hover:text-foreground text-xs font-heading font-semibold py-1.5 px-3 cursor-pointer transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-muted-foreground" />
            <span>{post.commentsCount}</span>
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
    </article>
  );
}
