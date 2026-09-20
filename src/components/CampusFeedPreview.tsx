"use client";

import React, { useState } from "react";
import Link from "next/link";

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

export const INITIAL_POSTS: FeedPost[] = [
  {
    id: "post-1",
    avatarIcon: "🦊",
    avatarBg: "#f4f4f5",
    authorLabel: "Anonymous YMCAian",
    location: "JC Bose UST (YMCA) • Library 2nd Floor",
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
    avatarBg: "#f4f4f5",
    authorLabel: "Anonymous Student",
    location: "Manav Rachna (MRIIRS) • Campus Lawn",
    timeAgo: "18m ago",
    category: "overheard",
    content:
      "Overheard near Block T: 'Bhai attendance 74.8% hai, prof keh rahe hain ek period extra attend karo tabhi admit card milega.' Peak semester panic mode has begun.",
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
    avatarBg: "#f4f4f5",
    authorLabel: "Anonymous Hostel Resident",
    location: "Faridabad College Hostel • Block B",
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
    avatarBg: "#f4f4f5",
    authorLabel: "Anonymous Scholar",
    location: "Lingaya's Vidyapeeth • CS Lab",
    timeAgo: "1h ago",
    category: "exams",
    content:
      "Lab external asked me the difference between SQL and NoSQL and I accidentally started explaining the plot of Oppenheimer. Still got full marks for confidence.",
    upvotes: 91,
    commentsCount: 11,
    userVote: null,
    comments: [
      {
        id: "c-4",
        avatarIcon: "🦊",
        text: "Legendary move. Confidence is 90% of viva.",
        timeAgo: "40m ago",
        upvotes: 27,
      },
    ],
  },
  {
    id: "post-5",
    avatarIcon: "🦥",
    avatarBg: "#f4f4f5",
    authorLabel: "Anonymous Commuter",
    location: "Bata Chowk Metro • Faridabad",
    timeAgo: "2h ago",
    category: "confession",
    content:
      "Sprint kiya Bata Chowk metro stairs pe 8:50 AM pe taaki 9 AM lecture miss na ho, only to reach college and see 'Class cancelled due to department meeting' message on WhatsApp.",
    upvotes: 74,
    commentsCount: 8,
    userVote: null,
    comments: [
      {
        id: "c-5",
        avatarIcon: "🐼",
        text: "The universal Faridabad student pain.",
        timeAgo: "1h ago",
        upvotes: 21,
      },
    ],
  },
];

interface CampusFeedPreviewProps {
  externalPosts?: FeedPost[];
}

export default function CampusFeedPreview({
  externalPosts,
}: CampusFeedPreviewProps) {
  const [posts, setPosts] = useState<FeedPost[]>(externalPosts || INITIAL_POSTS);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({
    "post-1": true,
  });
  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});
  const [copiedPostId, setCopiedPostId] = useState<string | null>(null);

  React.useEffect(() => {
    if (externalPosts) {
      setPosts(externalPosts);
    }
  }, [externalPosts]);

  const handleVote = (id: string, type: "up" | "down") => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== id) return post;

        let delta = 0;
        let newVote: "up" | "down" | null = type;

        if (post.userVote === type) {
          delta = type === "up" ? -1 : 1;
          newVote = null;
        } else if (post.userVote === null) {
          delta = type === "up" ? 1 : -1;
          newVote = type;
        } else {
          delta = type === "up" ? 2 : -2;
          newVote = type;
        }

        return {
          ...post,
          upvotes: post.upvotes + delta,
          userVote: newVote,
        };
      })
    );
  };

  const toggleComments = (id: string) => {
    setExpandedComments((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAddReply = (postId: string) => {
    const text = replyInputs[postId]?.trim();
    if (!text) return;

    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        const newComment = {
          id: `c-user-${Date.now()}`,
          avatarIcon: "●",
          text,
          timeAgo: "Just now",
          upvotes: 1,
        };
        return {
          ...post,
          commentsCount: post.commentsCount + 1,
          comments: [...post.comments, newComment],
        };
      })
    );

    setReplyInputs((prev) => ({ ...prev, [postId]: "" }));
    setExpandedComments((prev) => ({ ...prev, [postId]: true }));
  };

  const handleShare = (postId: string) => {
    setCopiedPostId(postId);
    navigator.clipboard?.writeText(window.location.href);
    setTimeout(() => {
      setCopiedPostId(null);
    }, 2000);
  };

  const filteredPosts = posts.filter((post) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "hot") return post.upvotes > 50;
    return post.category === activeFilter;
  });

  return (
    <section id="live-feed" className="feed-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-clean">
          <div className="section-badge-bw">FARIDABAD CAMPUS STREAM</div>
          <h2 className="section-title">What students are whispering right now</h2>
          <p className="section-subtitle">
            Local comments, campus gossip, and honest confessions from students in Faridabad colleges. 100% anonymous.
          </p>
        </div>

        {/* Filter Pills in Black and White */}
        <div className="filter-scroll-container">
          <div className="filter-pill-bar">
            {[
              { id: "all", label: "All Posts" },
              { id: "hot", label: "Top Upvoted" },
              { id: "confession", label: "Confessions" },
              { id: "overheard", label: "Overheard" },
              { id: "exams", label: "Exams & Viva" },
              { id: "hostel", label: "Hostel & Food" },
            ].map((filter) => (
              <button
                key={filter.id}
                type="button"
                className={`filter-tab-bw ${activeFilter === filter.id ? "filter-tab-bw-active" : ""}`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Feed Cards Column */}
        <div className="feed-cards-list">
          {filteredPosts.map((post) => {
            const isCommentsOpen = !!expandedComments[post.id];

            return (
              <article key={post.id} className="yak-card-bw">
                {/* Left Karma Vote Column */}
                <div className="yak-vote-column">
                  <button
                    type="button"
                    className={`yak-vote-btn-bw upvote ${post.userVote === "up" ? "voted" : ""}`}
                    onClick={() => handleVote(post.id, "up")}
                    aria-label="Upvote post"
                  >
                    ▲
                  </button>

                  <span className="yak-karma-count-bw">
                    {post.upvotes}
                  </span>

                  <button
                    type="button"
                    className={`yak-vote-btn-bw downvote ${post.userVote === "down" ? "voted" : ""}`}
                    onClick={() => handleVote(post.id, "down")}
                    aria-label="Downvote post"
                  >
                    ▼
                  </button>
                </div>

                {/* Right Post Body */}
                <div className="yak-content-column">
                  {/* Post Metadata Header */}
                  <div className="yak-meta-header">
                    <div className="yak-author-info">
                      <div className="yak-avatar-bw">
                        {post.avatarIcon}
                      </div>
                      <div className="yak-author-text">
                        <span className="yak-author-handle">{post.authorLabel}</span>
                        <div className="yak-submeta">
                          <span className="yak-location">{post.location}</span>
                          <span className="yak-dot">•</span>
                          <span className="yak-time">{post.timeAgo}</span>
                        </div>
                      </div>
                    </div>

                    <span className="category-tag-bw">
                      #{post.category}
                    </span>
                  </div>

                  {/* Post Text */}
                  <div className="yak-text">
                    {post.content}
                  </div>

                  {/* Post Footer Action Bar */}
                  <div className="yak-card-footer">
                    <button
                      type="button"
                      className={`yak-action-btn-bw ${isCommentsOpen ? "active" : ""}`}
                      onClick={() => toggleComments(post.id)}
                    >
                      <span>💬 {post.commentsCount} comments</span>
                    </button>

                    <button
                      type="button"
                      className="yak-action-btn-bw"
                      onClick={() => handleShare(post.id)}
                      title="Copy link"
                    >
                      <span>{copiedPostId === post.id ? "Copied! ✓" : "🔗 Share"}</span>
                    </button>

                    <div className="yak-safe-pill-bw">
                      <span>Anonymous</span>
                    </div>
                  </div>

                  {/* Expandable Comments Drawer */}
                  {isCommentsOpen && (
                    <div className="yak-comments-section">
                      <div className="comments-divider"></div>
                      
                      <div className="comments-list">
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="yak-comment-item">
                            <div className="comment-avatar-bw">{comment.avatarIcon}</div>
                            <div className="comment-bubble-bw">
                              <p className="comment-text">{comment.text}</p>
                              <div className="comment-meta">
                                <span>{comment.timeAgo}</span>
                                <span>•</span>
                                <span>+{comment.upvotes}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Add comment composer */}
                      <div className="comment-input-row">
                        <input
                          type="text"
                          className="comment-input"
                          placeholder="Drop an anonymous reply (account needed to speak)..."
                          value={replyInputs[post.id] || ""}
                          onChange={(e) =>
                            setReplyInputs((prev) => ({
                              ...prev,
                              [post.id]: e.target.value,
                            }))
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleAddReply(post.id);
                            }
                          }}
                        />
                        <button
                          type="button"
                          className="comment-send-btn-bw"
                          onClick={() => handleAddReply(post.id)}
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
