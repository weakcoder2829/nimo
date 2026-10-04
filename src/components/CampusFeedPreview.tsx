"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowBigUp,
  ArrowBigDown,
  MessageCircle,
  Flame,
  ArrowRight,
  Sparkles,
  MapPin,
  Clock,
  Send,
} from "lucide-react";

export interface FeedPost {
  id: string;
  avatarIcon: string;
  avatarBg: string;
  authorLabel: string;
  location: string;
  timeAgo: string;
  category: "confession" | "overheard" | "hot" | "exams" | "hostel";
  content: string;
  upvotes: number;
  commentsCount: number;
  userVote: "up" | "down" | null;
  comments: Array<{
    id: string;
    avatarIcon: string;
    text: string;
    timeAgo: string;
    upvotes: number;
  }>;
}

export const INITIAL_FEED_POSTS: FeedPost[] = [
  {
    id: "post-1",
    avatarIcon: "🦊",
    avatarBg: "#f1f5f9",
    authorLabel: "Anonymous YMCAian",
    location: "JC Bose UST (YMCA) &bull; Library 2nd Floor",
    timeAgo: "5m ago",
    category: "confession",
    content:
      "I told everyone in my hostel wing that I am solving LeetCode hard problems in the silent library zone, but I have actually spent the last 2 hours deciding what parantha to eat in Sector 15.",
    upvotes: 48,
    commentsCount: 6,
    userVote: null,
    comments: [
      {
        id: "c-1",
        avatarIcon: "🦉",
        text: "Paneer pyaaz with extra butter at Sector 15 is the only correct answer.",
        timeAgo: "2m ago",
        upvotes: 12,
      },
    ],
  },
  {
    id: "post-2",
    avatarIcon: "🦎",
    avatarBg: "#f1f5f9",
    authorLabel: "Aggarwal Student",
    location: "Aggarwal College &bull; Block B Lawn",
    timeAgo: "18m ago",
    category: "overheard",
    content:
      "Overheard near Canteen: 'Bhai attendance 74.8% hai, prof keh rahe hain ek period extra attend karo tabhi admit card milega.' Peak semester panic mode has officially begun.",
    upvotes: 62,
    commentsCount: 9,
    userVote: null,
    comments: [
      {
        id: "c-2",
        avatarIcon: "🐺",
        text: "Medical certificate banwa le chup chap sab theek ho jayega 😂",
        timeAgo: "10m ago",
        upvotes: 18,
      },
    ],
  },
  {
    id: "post-3",
    avatarIcon: "🐼",
    avatarBg: "#f1f5f9",
    authorLabel: "Anonymous Hostelite",
    location: "Faridabad Hostel Wing &bull; Block C",
    timeAgo: "42m ago",
    category: "hostel",
    content:
      "To whoever made midnight chai and butter toast at 2:30 AM in room 204: the whole corridor was sniffing the air like bloodhounds. Please share next time.",
    upvotes: 35,
    commentsCount: 4,
    userVote: null,
    comments: [
      {
        id: "c-3",
        avatarIcon: "🦄",
        text: "Kettle confiscated ho jayegi warden ko pata laga toh chup raho",
        timeAgo: "30m ago",
        upvotes: 14,
      },
    ],
  },
  {
    id: "post-4",
    avatarIcon: "🦉",
    avatarBg: "#f1f5f9",
    authorLabel: "MRIIRS Scholar",
    location: "Manav Rachna (MRIIRS) &bull; Central Audi",
    timeAgo: "1h ago",
    category: "confession",
    content:
      "Accidentally replied 'Love you too' to my project guide on WhatsApp instead of 'Noted sir'. He just replied '👍'. Currently planning which Himalayan cave to relocate to.",
    upvotes: 89,
    commentsCount: 14,
    userVote: null,
    comments: [],
  },
];

export default function CampusFeedPreview() {
  const [posts, setPosts] = useState<FeedPost[]>(INITIAL_FEED_POSTS);
  const [filter, setFilter] = useState<string>("all");
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({});

  const handleVote = (id: string, type: "up" | "down") => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        if (p.userVote === type) {
          // toggle off
          return {
            ...p,
            userVote: null,
            upvotes: type === "up" ? p.upvotes - 1 : p.upvotes + 1,
          };
        }
        const delta = type === "up" ? (p.userVote === "down" ? 2 : 1) : p.userVote === "up" ? -2 : -1;
        return {
          ...p,
          userVote: type,
          upvotes: p.upvotes + delta,
        };
      })
    );
  };

  const toggleComments = (id: string) => {
    setExpandedComments((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddComment = (postId: string) => {
    const text = (commentDrafts[postId] || "").trim();
    if (!text) return;

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        return {
          ...p,
          commentsCount: p.commentsCount + 1,
          comments: [
            ...p.comments,
            {
              id: `c-${Date.now()}`,
              avatarIcon: "🦊",
              text,
              timeAgo: "Just now",
              upvotes: 1,
            },
          ],
        };
      })
    );

    setCommentDrafts((prev) => ({ ...prev, [postId]: "" }));
  };

  const filteredPosts = posts.filter((p) => {
    if (filter === "all") return true;
    return p.category === filter;
  });

  const filterTabs = [
    { id: "all", label: "🔥 All Live Yaks" },
    { id: "confession", label: "🤫 Confessions" },
    { id: "overheard", label: "👂 Overheard" },
    { id: "hostel", label: "🏢 Hostel & Mess" },
  ];

  return (
    <section id="live-feed" className="w-full py-12 md:py-20 px-4 sm:px-6 relative">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-heading font-bold bg-primary/10 text-primary border border-primary/20">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>REAL-TIME CAMPUS RADAR</span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-4xl text-foreground tracking-tight">
            Live from Faridabad Colleges
          </h2>

          <p className="font-body text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Unfiltered thoughts, cafeteria reviews, and anonymous confessions from students right near you.
          </p>
        </div>

        {/* Filter Tabs (Clay Pills) */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-heading font-bold transition-all shrink-0 ${
                filter === tab.id
                  ? "clay-button-primary text-white"
                  : "clay-button-secondary text-muted-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Claymorphic Posts Feed */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <article key={post.id} className="clay-card p-5 sm:p-6 transition-all duration-300">
              {/* Post Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="clay-avatar w-11 h-11 text-2xl shrink-0">
                    <span>{post.avatarIcon}</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-heading font-bold text-sm text-foreground">
                        {post.authorLabel}
                      </span>
                      <span className="clay-badge text-[10px] font-heading font-bold text-primary uppercase">
                        {post.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-heading mt-0.5">
                      <span dangerouslySetInnerHTML={{ __html: post.location }} />
                      <span>&bull;</span>
                      <span>{post.timeAgo}</span>
                    </div>
                  </div>
                </div>

                <div className="hidden sm:inline-flex items-center gap-1 text-[11px] font-heading font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>5mi Radar</span>
                </div>
              </div>

              {/* Post Content */}
              <p className="mt-3.5 text-base sm:text-[17px] text-foreground/90 leading-relaxed font-body">
                {post.content}
              </p>

              {/* Engagement Bar with Clay Vote Pill */}
              <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
                {/* 3D Clay Vote Container */}
                <div className="clay-vote-container">
                  <button
                    type="button"
                    onClick={() => handleVote(post.id, "up")}
                    className={`clay-vote-btn ${post.userVote === "up" ? "active-up" : ""}`}
                    aria-label="Upvote"
                  >
                    <ArrowBigUp className={`w-5 h-5 ${post.userVote === "up" ? "fill-current" : ""}`} />
                  </button>

                  <span
                    className={`px-2 text-xs font-heading font-black min-w-[28px] text-center ${
                      post.userVote === "up"
                        ? "text-primary"
                        : post.userVote === "down"
                        ? "text-destructive"
                        : "text-foreground"
                    }`}
                  >
                    {post.upvotes}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleVote(post.id, "down")}
                    className={`clay-vote-btn ${post.userVote === "down" ? "active-down" : ""}`}
                    aria-label="Downvote"
                  >
                    <ArrowBigDown className={`w-5 h-5 ${post.userVote === "down" ? "fill-current" : ""}`} />
                  </button>
                </div>

                {/* Comments Toggle Button */}
                <button
                  type="button"
                  onClick={() => toggleComments(post.id)}
                  className="clay-badge text-muted-foreground hover:text-foreground text-xs font-heading font-semibold py-1.5 px-3 cursor-pointer transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-muted-foreground" />
                  <span>{post.commentsCount} comments</span>
                </button>
              </div>

              {/* Expanded Comments List (if toggled) */}
              {expandedComments[post.id] && (
                <div className="mt-4 pt-3 border-t border-border/40 space-y-3 animate-in fade-in">
                  {post.comments.length > 0 ? (
                    <div className="space-y-2">
                      {post.comments.map((c) => (
                        <div key={c.id} className="p-3 rounded-2xl bg-muted/40 border border-border/40 flex items-start gap-2.5">
                          <span className="text-lg">{c.avatarIcon}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm text-foreground font-body">{c.text}</p>
                            <span className="text-[10px] text-muted-foreground font-heading mt-0.5 block">{c.timeAgo}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground font-heading italic">
                      No comments yet. Be the first to drop a reply!
                    </p>
                  )}

                  {/* Comment Input Box */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      placeholder="Reply anonymously..."
                      value={commentDrafts[post.id] || ""}
                      onChange={(e) =>
                        setCommentDrafts({ ...commentDrafts, [post.id]: e.target.value })
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleAddComment(post.id);
                      }}
                      className="flex-1 h-9 px-3 rounded-full text-xs bg-muted/50 border border-border/70 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddComment(post.id)}
                      className="clay-button-primary h-9 px-3 rounded-full text-xs font-bold"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>

        {/* View Full Feed Callout Banner */}
        <div className="text-center pt-4">
          <Link
            href="/feed"
            className="clay-button-primary px-8 py-3.5 text-sm font-heading font-black rounded-full shadow-lg"
          >
            <span>Open Live Campus Feed</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
