"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// --- Story Types ---
interface StoryItem {
  id: string;
  name: string;
  avatar: string;
  hasStory: boolean;
  time: string;
  storyImage?: string;
  storyCaption?: string;
}

// --- Post Types ---
interface PostItem {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  avatarBg?: string;
  time: string;
  text: string;
  quoteStyle?: boolean;
  image?: string | null;
  likes: number;
  isLiked?: boolean;
  comments: number;
  shares: number;
  reactionTag?: string;
  commentsList?: string[];
}

// --- Message Types ---
interface MessageThread {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  online: boolean;
  messages: {
    id: string;
    sender: "them" | "me";
    text: string;
    time: string;
  }[];
}

export default function LoggedInAppView() {
  const router = useRouter();

  // Navigation tab: feed | messages | assistant | notes | profile
  const [activeTab, setActiveTab] = useState<"feed" | "messages" | "assistant" | "notes" | "profile">("feed");

  // Stories data
  const [stories, setStories] = useState<StoryItem[]>([
    {
      id: "s-1",
      name: "mia.vo1d",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      hasStory: true,
      time: "3h ago",
      storyImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
      storyCaption: "Late night library grind with iced coffee ☕📚",
    },
    {
      id: "s-2",
      name: "artsy_kira",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      hasStory: true,
      time: "4h ago",
      storyImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
      storyCaption: "Rooftop sunrise after midterms. Finally breathing.",
    },
    {
      id: "s-3",
      name: "midnight_ymca",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
      hasStory: true,
      time: "6h ago",
      storyImage: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=600&q=80",
      storyCaption: "Secret parantha stall behind Sector 6 is unmatched.",
    },
    {
      id: "s-4",
      name: "helenka_jc",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80",
      hasStory: true,
      time: "8h ago",
      storyImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      storyCaption: "College fest stage preparations are underway! 🎭",
    },
    {
      id: "s-5",
      name: "rohit_mr",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      hasStory: true,
      time: "10h ago",
      storyImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
      storyCaption: "Hackathon project team finally made it to top 5! 💻⚡",
    },
  ]);

  const [activeStoryModal, setActiveStoryModal] = useState<StoryItem | null>(null);

  // Feed Posts
  const [posts, setPosts] = useState<PostItem[]>([
    {
      id: "p-1",
      author: "Jerome Black",
      handle: "@jerome_ymca",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
      time: "5 hours ago",
      text: "No notifications. No noise. Just this view, crisp air, and a reminder that life is so much more than a to-do list.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      likes: 312,
      isLiked: false,
      comments: 6,
      shares: 4,
      reactionTag: "3 friends liked",
      commentsList: [
        "So true! Which spot in Aravalli is this?",
        "Bro skipped the 9 AM DSA lecture for this view 😭",
        "Needed this reminder today honestly.",
      ],
    },
    {
      id: "p-2",
      author: "Luca Romano",
      handle: "@luca_mriirs",
      avatar: "❤️",
      avatarBg: "#ffe4e6",
      time: "2 days ago",
      text: "“I think my favorite kind of love is the quiet kind. The one that doesn't scream or chase, but stays. The one that feels like home.”",
      quoteStyle: true,
      image: null,
      likes: 167,
      isLiked: false,
      comments: 3,
      shares: 2,
      reactionTag: "LOVE IT!!",
      commentsList: [
        "Campus love in the library corner hits different.",
        "Beautifully written anonymous writer ❤️",
      ],
    },
    {
      id: "p-3",
      author: "Anonymous Junior",
      handle: "@ymca_cs27",
      avatar: "⚡",
      avatarBg: "#fef3c7",
      time: "30 minutes ago",
      text: "Shoutout to the guard bhaiya at JC Bose Gate 2 who let us in 5 mins after curfew with our cold coffees. True campus MVP! ☕",
      image: null,
      likes: 89,
      isLiked: false,
      comments: 11,
      shares: 6,
      reactionTag: "Trending in JC Bose",
      commentsList: [
        "Guard bhaiya is legendary, always protects students.",
        "Don't expose him on Nimo bro warden checks this! 💀",
      ],
    },
  ]);

  // Comment Drawer State
  const [activeCommentsPostId, setActiveCommentsPostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState("");

  // Create Post Modal State
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [newPostText, setNewPostText] = useState("");
  const [newPostTag, setNewPostTag] = useState("#JC_Bose_YMCA");

  // Messaging State
  const [threads, setThreads] = useState<MessageThread[]>([
    {
      id: "th-1",
      name: "artsy_kira",
      handle: "@kira_hostel",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      lastMessage: "Did you see that confession about library AC? 😂",
      time: "2m ago",
      unreadCount: 2,
      online: true,
      messages: [
        { id: "m-1", sender: "them", text: "Hey! Are you studying at the central reading room?", time: "11:20 AM" },
        { id: "m-2", sender: "me", text: "Yeah, 2nd floor near the quiet zone.", time: "11:22 AM" },
        { id: "m-3", sender: "them", text: "Did you see that confession about library AC? 😂 Everyone was roasting the warden.", time: "11:24 AM" },
        { id: "m-4", sender: "them", text: "Save me a chair if there's space!", time: "11:25 AM" },
      ],
    },
    {
      id: "th-2",
      name: "Anonymous Senior",
      handle: "@ymca_senior_core",
      avatar: "🦊",
      lastMessage: "DSA notes send kar de bhai, midterms aa rahe hain",
      time: "15m ago",
      unreadCount: 1,
      online: false,
      messages: [
        { id: "m-10", sender: "them", text: "DSA notes send kar de bhai, midterms aa rahe hain", time: "11:05 AM" },
      ],
    },
    {
      id: "th-3",
      name: "mia.vo1d",
      handle: "@mia_mriirs",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      lastMessage: "Sent you the cultural fest rehearsal schedule.",
      time: "1h ago",
      unreadCount: 3,
      online: true,
      messages: [
        { id: "m-20", sender: "them", text: "Sent you the cultural fest rehearsal schedule.", time: "10:15 AM" },
        { id: "m-21", sender: "them", text: "Stage trial starts around 5 PM today.", time: "10:16 AM" },
      ],
    },
    {
      id: "th-4",
      name: "Luca Romano",
      handle: "@luca_romano",
      avatar: "❤️",
      lastMessage: "Thanks for the reply! Really appreciate it.",
      time: "Yesterday",
      unreadCount: 0,
      online: false,
      messages: [
        { id: "m-30", sender: "them", text: "Thanks for the reply! Really appreciate it.", time: "Yesterday" },
      ],
    },
  ]);

  const [activeThreadId, setActiveThreadId] = useState<string>("th-1");
  const [chatMessageInput, setChatMessageInput] = useState("");
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Selected thread
  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeThread?.messages]);

  // Notes & Tasks State
  const [tasks, setTasks] = useState([
    { id: "t-1", text: "Learn AVL rotations & balance factor", done: true },
    { id: "t-2", text: "Practice Red-Black tree properties", done: false },
    { id: "t-3", text: "Graph BFS & DFS recursion exercises", done: false },
    { id: "t-4", text: "Submit DBMS normalization assignment", done: true },
  ]);

  // AI Assistant Polish State
  const [aiDraft, setAiDraft] = useState("");
  const [aiTone, setAiTone] = useState<"witty" | "poetic" | "relatable">("witty");
  const [aiResult, setAiResult] = useState("");
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  // Like Toggle Handler
  const handleToggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          return {
            ...p,
            isLiked,
            likes: isLiked ? p.likes + 1 : p.likes - 1,
          };
        }
        return p;
      })
    );
  };

  // Add Comment Handler
  const handleAddComment = (postId: string) => {
    if (!commentInput.trim()) return;
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: p.comments + 1,
            commentsList: [...(p.commentsList || []), commentInput.trim()],
          };
        }
        return p;
      })
    );
    setCommentInput("");
  };

  // Create Confession Post
  const handlePublishPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost: PostItem = {
      id: `p-${Date.now()}`,
      author: "Anonymous Student",
      handle: "@you_verified",
      avatar: "⚡",
      avatarBg: "#18181b",
      time: "Just now",
      text: `${newPostText.trim()} ${newPostTag}`,
      image: null,
      likes: 1,
      isLiked: true,
      comments: 0,
      shares: 0,
      reactionTag: "Just posted",
      commentsList: [],
    };

    setPosts([newPost, ...posts]);
    setNewPostText("");
    setIsCreatePostOpen(false);
    setActiveTab("feed");
  };

  // Send Chat Message
  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessageInput.trim()) return;

    const newMsg = {
      id: `m-${Date.now()}`,
      sender: "me" as const,
      text: chatMessageInput.trim(),
      time: "Just now",
    };

    setThreads((prev) =>
      prev.map((t) => {
        if (t.id === activeThreadId) {
          return {
            ...t,
            lastMessage: chatMessageInput.trim(),
            time: "Just now",
            messages: [...t.messages, newMsg],
          };
        }
        return t;
      })
    );

    setChatMessageInput("");

    // Simulate friendly reply after 1.5s
    setTimeout(() => {
      const replyMsg = {
        id: `m-reply-${Date.now()}`,
        sender: "them" as const,
        text: "Haha definitely! Let's catch up near the campus canteen soon 👍",
        time: "Just now",
      };

      setThreads((prev) =>
        prev.map((t) => {
          if (t.id === activeThreadId) {
            return {
              ...t,
              lastMessage: replyMsg.text,
              time: "Just now",
              messages: [...t.messages, replyMsg],
            };
          }
          return t;
        })
      );
    }, 1500);
  };

  // Toggle Task Checkbox
  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t))
    );
  };

  // AI Confession Enhancer
  const handleGenerateAi = () => {
    if (!aiDraft.trim()) return;
    setIsAiGenerating(true);
    setTimeout(() => {
      let polished = "";
      if (aiTone === "witty") {
        polished = `“${aiDraft.trim()}” — Also if the professor asks, we were all in attendance in spirit. 10/10 campus logic. #YMCA #CampusLife`;
      } else if (aiTone === "poetic") {
        polished = `“${aiDraft.trim()}” — Some nights in Faridabad are quiet, like old pages turned gently in the silence of our youth. #MidnightThoughts`;
      } else {
        polished = `Real talk: ${aiDraft.trim()}! Why does nobody discuss this? We survived 8 AM lectures for this exact reason. #FaridabadStudentLife`;
      }
      setAiResult(polished);
      setIsAiGenerating(false);
    }, 600);
  };

  return (
    <div className="nimo-app-viewport">
      {/* =====================================================================
          1. TOP APP HEADER (RESPONSIVE)
         ===================================================================== */}
      <header className="app-global-header">
        <div className="header-left">
          <Link href="/" className="app-logo">
            nimo<span className="logo-accent">.</span>
          </Link>
          <div className="campus-badge">
            <span className="live-ping"></span>
            Faridabad Campus • Live
          </div>
        </div>

        <div className="header-center">
          <div className="search-pill">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search confessions, #YMCA, #MRIIRS..."
              className="search-input"
            />
          </div>
        </div>

        <div className="header-right">
          <button
            type="button"
            className="btn-create-post-header"
            onClick={() => setIsCreatePostOpen(true)}
          >
            + Post Confession
          </button>
          <button
            type="button"
            className="header-avatar-btn"
            onClick={() => setActiveTab("profile")}
          >
            <span className="avatar-circle">⚡</span>
          </button>
        </div>
      </header>

      {/* =====================================================================
          2. MAIN RESPONSIVE CONTAINER (SIDEBAR + CONTENT + WIDGETS)
         ===================================================================== */}
      <div className="app-layout-grid">
        {/* LEFT DESKTOP NAVIGATION SIDEBAR */}
        <aside className="app-sidebar-nav">
          <nav className="sidebar-links-list">
            <button
              type="button"
              className={`sidebar-nav-item ${activeTab === "feed" ? "active" : ""}`}
              onClick={() => setActiveTab("feed")}
            >
              <span className="nav-icon">🧭</span>
              <span className="nav-text">Campus Feed</span>
            </button>

            <button
              type="button"
              className={`sidebar-nav-item ${activeTab === "messages" ? "active" : ""}`}
              onClick={() => setActiveTab("messages")}
            >
              <span className="nav-icon nav-badge-wrap">
                💬
                <span className="nav-unread-badge">6</span>
              </span>
              <span className="nav-text">Messages</span>
            </button>

            <button
              type="button"
              className={`sidebar-nav-item ${activeTab === "assistant" ? "active" : ""}`}
              onClick={() => setActiveTab("assistant")}
            >
              <span className="nav-icon">✨</span>
              <span className="nav-text">AI Assistant</span>
            </button>

            <button
              type="button"
              className={`sidebar-nav-item ${activeTab === "notes" ? "active" : ""}`}
              onClick={() => setActiveTab("notes")}
            >
              <span className="nav-icon">📑</span>
              <span className="nav-text">Notes & Hub</span>
            </button>

            <button
              type="button"
              className={`sidebar-nav-item ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              <span className="nav-icon">👤</span>
              <span className="nav-text">My Profile</span>
            </button>
          </nav>

          <div className="sidebar-cta-box">
            <button
              type="button"
              className="btn-sidebar-speak"
              onClick={() => setIsCreatePostOpen(true)}
            >
              Speak Freely
            </button>
          </div>

          <div className="sidebar-footer-profile">
            <div className="footer-profile-info">
              <span className="f-avatar">⚡</span>
              <div className="f-meta">
                <span className="f-name">Ghost Student</span>
                <span className="f-handle">@ymca_verified</span>
              </div>
            </div>
            <Link href="/" className="btn-sidebar-exit" title="Sign Out">
              ↩
            </Link>
          </div>
        </aside>

        {/* =====================================================================
            MAIN CONTENT STAGE
           ===================================================================== */}
        <main className="app-main-stage">
          {/* ==================== TAB 1: CAMPUS FEED ==================== */}
          {activeTab === "feed" && (
            <div className="feed-view-wrap">
              {/* TOP STORIES STRIP (MATCHES DRIBBBLE UX) */}
              <div className="stories-scroller-bar">
                {/* User's story add button */}
                <div
                  className="story-avatar-card"
                  onClick={() => setIsCreatePostOpen(true)}
                >
                  <div className="story-add-circle">+</div>
                  <span className="story-username">you</span>
                </div>

                {/* Friends stories */}
                {stories.map((s) => (
                  <div
                    key={s.id}
                    className="story-avatar-card"
                    onClick={() => setActiveStoryModal(s)}
                  >
                    <div
                      className="story-avatar-img ring-active"
                      style={{ backgroundImage: `url('${s.avatar}')` }}
                    ></div>
                    <span className="story-username">{s.name}</span>
                  </div>
                ))}
              </div>

              {/* FEED SECTION HEADER */}
              <div className="feed-sub-header">
                <div>
                  <h2 className="feed-sub-title">Discover news</h2>
                  <p className="feed-sub-caption">
                    Real-time unedited student chatter from JC Bose, Manav Rachna & Lingaya&apos;s
                  </p>
                </div>
                <button
                  type="button"
                  className="btn-add-confession-circle"
                  onClick={() => setIsCreatePostOpen(true)}
                  title="Post new confession"
                >
                  +
                </button>
              </div>

              {/* FEED POSTS STREAM */}
              <div className="feed-posts-stream">
                {posts.map((post) => (
                  <article key={post.id} className="feed-post-card">
                    {/* Header: Author + Time + Menu */}
                    <div className="post-header-row">
                      <div className="post-author-block">
                        {post.avatar.startsWith("http") ? (
                          <div
                            className="author-avatar-img"
                            style={{ backgroundImage: `url('${post.avatar}')` }}
                          ></div>
                        ) : (
                          <div
                            className="author-avatar-emoji"
                            style={{ backgroundColor: post.avatarBg || "#f4f4f5" }}
                          >
                            {post.avatar}
                          </div>
                        )}
                        <div className="author-details">
                          <span className="author-name">{post.author}</span>
                          <span className="author-meta">
                            {post.handle} • {post.time}
                          </span>
                        </div>
                      </div>
                      <button type="button" className="btn-post-menu">
                        •••
                      </button>
                    </div>

                    {/* Post Text Content */}
                    <div className={`post-text-body ${post.quoteStyle ? "quote-style" : ""}`}>
                      {post.text}
                    </div>

                    {/* Post Image Media */}
                    {post.image && (
                      <div
                        className="post-media-box"
                        style={{ backgroundImage: `url('${post.image}')` }}
                      ></div>
                    )}

                    {/* Stats & Actions Row */}
                    <div className="post-actions-bar">
                      <div className="action-buttons-group">
                        <button
                          type="button"
                          className={`btn-action-trigger ${post.isLiked ? "liked" : ""}`}
                          onClick={() => handleToggleLike(post.id)}
                        >
                          <span className="action-icon">{post.isLiked ? "❤️" : "🤍"}</span>
                          <span className="action-count">{post.likes}</span>
                        </button>

                        <button
                          type="button"
                          className="btn-action-trigger"
                          onClick={() =>
                            setActiveCommentsPostId(
                              activeCommentsPostId === post.id ? null : post.id
                            )
                          }
                        >
                          <span className="action-icon">💬</span>
                          <span className="action-count">{post.comments}</span>
                        </button>

                        <button
                          type="button"
                          className="btn-action-trigger"
                          onClick={() => {
                            if (navigator.clipboard) {
                              navigator.clipboard.writeText(post.text);
                              alert("Confession link copied to clipboard!");
                            }
                          }}
                        >
                          <span className="action-icon">🔗</span>
                          <span className="action-count">{post.shares}</span>
                        </button>
                      </div>

                      {/* Right Tag / Friend reaction */}
                      {post.reactionTag && (
                        <div className="reaction-tag-indicator">
                          {post.reactionTag.includes("friends liked") ? (
                            <div className="friends-liked-cluster">
                              <div className="tiny-avatar-stack">
                                <span className="tiny-pip red"></span>
                                <span className="tiny-pip blue"></span>
                                <span className="tiny-pip green"></span>
                              </div>
                              <span className="friends-text">{post.reactionTag}</span>
                            </div>
                          ) : (
                            <span className="love-pill-badge">{post.reactionTag}</span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Expandable Comments Drawer */}
                    {activeCommentsPostId === post.id && (
                      <div className="post-comments-drawer">
                        <div className="comments-list">
                          {post.commentsList && post.commentsList.length > 0 ? (
                            post.commentsList.map((c, i) => (
                              <div key={i} className="comment-bubble">
                                <span className="comment-ghost">👻 Anonymous:</span>
                                <span className="comment-content">{c}</span>
                              </div>
                            ))
                          ) : (
                            <p className="no-comments-yet">No whispers on this confession yet. Be first!</p>
                          )}
                        </div>

                        <div className="comment-input-bar">
                          <input
                            type="text"
                            placeholder="Write an anonymous whisper..."
                            value={commentInput}
                            onChange={(e) => setCommentInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleAddComment(post.id);
                            }}
                            className="comment-field"
                          />
                          <button
                            type="button"
                            className="btn-send-comment"
                            onClick={() => handleAddComment(post.id)}
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* ==================== TAB 2: MESSAGES (DMs & WHISPERS) ==================== */}
          {activeTab === "messages" && (
            <div className="messages-layout-box">
              {/* Left Column: Conversations List */}
              <div className="threads-column">
                <div className="threads-header">
                  <h3 className="threads-title">Messages</h3>
                  <span className="threads-badge-pill">6 Unread</span>
                </div>

                <div className="threads-search-wrap">
                  <input
                    type="text"
                    placeholder="Search whispers..."
                    className="threads-search-field"
                  />
                </div>

                <div className="threads-list">
                  {threads.map((thread) => (
                    <div
                      key={thread.id}
                      className={`thread-item-card ${activeThreadId === thread.id ? "selected" : ""}`}
                      onClick={() => setActiveThreadId(thread.id)}
                    >
                      <div className="thread-avatar-wrap">
                        {thread.avatar.startsWith("http") ? (
                          <div
                            className="thread-avatar-img"
                            style={{ backgroundImage: `url('${thread.avatar}')` }}
                          ></div>
                        ) : (
                          <div className="thread-avatar-emoji">{thread.avatar}</div>
                        )}
                        {thread.online && <span className="online-green-dot"></span>}
                      </div>

                      <div className="thread-preview-info">
                        <div className="thread-top-row">
                          <span className="thread-contact-name">{thread.name}</span>
                          <span className="thread-timestamp">{thread.time}</span>
                        </div>
                        <p className="thread-last-snippet">{thread.lastMessage}</p>
                      </div>

                      {thread.unreadCount > 0 && (
                        <span className="thread-unread-counter">
                          {thread.unreadCount}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Active Chat Thread */}
              <div className="chat-window-column">
                <div className="chat-window-header">
                  <div className="chat-recipient-meta">
                    {activeThread.avatar.startsWith("http") ? (
                      <div
                        className="chat-header-avatar"
                        style={{ backgroundImage: `url('${activeThread.avatar}')` }}
                      ></div>
                    ) : (
                      <div className="chat-header-avatar-emoji">
                        {activeThread.avatar}
                      </div>
                    )}
                    <div>
                      <h4 className="chat-recipient-name">{activeThread.name}</h4>
                      <span className="chat-recipient-status">
                        {activeThread.online ? "● Online • Verified Student" : "Active recently"}
                      </span>
                    </div>
                  </div>
                  <div className="chat-header-actions">
                    <button type="button" className="btn-chat-ghost-mode" title="Ghost Encrypted Chat">
                      🛡️ Encrypted
                    </button>
                  </div>
                </div>

                {/* Messages Body */}
                <div className="chat-messages-scroll">
                  <div className="chat-security-disclaimer">
                    <span>🔒 End-to-end encrypted anonymous whisper. No real names or phone numbers are shared.</span>
                  </div>

                  {activeThread.messages.map((m) => (
                    <div
                      key={m.id}
                      className={`chat-bubble-row ${m.sender === "me" ? "sent" : "received"}`}
                    >
                      <div className="bubble-content-box">
                        <p className="bubble-text">{m.text}</p>
                        <span className="bubble-time">{m.time}</span>
                      </div>
                    </div>
                  ))}
                  <div ref={chatBottomRef} />
                </div>

                {/* Message Input Bar */}
                <form onSubmit={handleSendChatMessage} className="chat-composer-form">
                  <input
                    type="text"
                    placeholder="Type an anonymous message..."
                    value={chatMessageInput}
                    onChange={(e) => setChatMessageInput(e.target.value)}
                    className="chat-text-input"
                  />
                  <button type="submit" className="btn-send-message">
                    Send ➔
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* ==================== TAB 3: AI ASSISTANT / CREATIONS ==================== */}
          {activeTab === "assistant" && (
            <div className="assistant-view-wrap">
              <div className="assistant-hero-banner">
                <div className="assistant-back-pill">
                  <span>AI Assistant</span>
                  <span className="ai-model-tag">SMM Model v2.4</span>
                </div>
                <h1 className="assistant-main-title">
                  Ready to bring new life to your confessions?
                </h1>
                <p className="assistant-sub-copy">
                  Faridabad Campus AI helper to polish thoughts, check guidelines, and format viral student posts.
                </p>
              </div>

              {/* Quick Prompt Pills */}
              <div className="category-pills-shelf">
                <button
                  type="button"
                  className="cat-pill active"
                  onClick={() => setAiDraft("Why does 8 AM attendance feel like an Olympic trial?")}
                >
                  #Engagement Post
                </button>
                <button
                  type="button"
                  className="cat-pill"
                  onClick={() => setAiDraft("Canteen parantha vs Hostel mess dinner.")}
                >
                  #Trending Memes
                </button>
                <button
                  type="button"
                  className="cat-pill"
                  onClick={() => setAiDraft("Who else got locked in the 3rd floor reading hall?")}
                >
                  #Campus Secrets
                </button>
                <button
                  type="button"
                  className="cat-pill"
                  onClick={() => setAiDraft("Backstage drama at cultural fest rehearsals.")}
                >
                  #Behind-the-Scenes
                </button>
                <button
                  type="button"
                  className="cat-pill"
                  onClick={() => setAiDraft("I think my favorite kind of love is the quiet kind.")}
                >
                  #Throwback Remix
                </button>
              </div>

              {/* Ride the Trend Section */}
              <div className="ride-trend-section">
                <div className="trend-section-title-bar">
                  <h3 className="section-title">Ride the trend</h3>
                  <span className="trend-badge-sub">Trending across Faridabad Colleges</span>
                </div>

                <div className="trend-cards-grid">
                  <div
                    className="trend-card-item"
                    onClick={() =>
                      setAiDraft("Exam Survival 2026: The parantha secret at 3 AM.")
                    }
                  >
                    <div
                      className="trend-cover-photo"
                      style={{
                        backgroundImage:
                          "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=80')",
                      }}
                    ></div>
                    <div className="trend-content-meta">
                      <h4 className="trend-name">Exam Survival 2026</h4>
                      <p className="trend-desc">
                        A growing trend among Faridabad students sharing 3 AM library secrets and midnight tea spots.
                      </p>
                    </div>
                  </div>

                  <div
                    className="trend-card-item"
                    onClick={() =>
                      setAiDraft("Hostel Digital Detox: Badminton under hostel streetlights.")
                    }
                  >
                    <div
                      className="trend-cover-photo"
                      style={{
                        backgroundImage:
                          "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80')",
                      }}
                    ></div>
                    <div className="trend-content-meta">
                      <h4 className="trend-name">Hostel Digital Detox</h4>
                      <p className="trend-desc">
                        Ask wingmates about the best rooftop badminton games and acoustic jam sessions without screens.
                      </p>
                    </div>
                  </div>

                  <div
                    className="trend-card-item"
                    onClick={() =>
                      setAiDraft("No-Buy 2025: Thrifty campus survival hacks.")
                    }
                  >
                    <div
                      className="trend-cover-photo"
                      style={{
                        backgroundImage:
                          "url('https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=400&q=80')",
                      }}
                    ></div>
                    <div className="trend-content-meta">
                      <h4 className="trend-name">No-Buy 2025</h4>
                      <p className="trend-desc">
                        Gen Z movement encouraging zero wasteful spending, free library resources, and carpool groups.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive AI Polisher Box */}
              <div className="ai-polisher-container">
                <h3 className="polisher-title">✨ Confession AI Polisher</h3>
                <p className="polisher-sub">
                  Type any rough confession or thought. The AI will anonymously refine it for viral campus readability.
                </p>

                <textarea
                  rows={3}
                  value={aiDraft}
                  onChange={(e) => setAiDraft(e.target.value)}
                  placeholder="e.g., Attendance policy is too strict and it rains every Monday..."
                  className="ai-input-area"
                />

                <div className="polisher-actions-row">
                  <div className="tone-selector">
                    <button
                      type="button"
                      className={`tone-btn ${aiTone === "witty" ? "active" : ""}`}
                      onClick={() => setAiTone("witty")}
                    >
                      Witty & Sarcastic
                    </button>
                    <button
                      type="button"
                      className={`tone-btn ${aiTone === "poetic" ? "active" : ""}`}
                      onClick={() => setAiTone("poetic")}
                    >
                      Deep & Poetic
                    </button>
                    <button
                      type="button"
                      className={`tone-btn ${aiTone === "relatable" ? "active" : ""}`}
                      onClick={() => setAiTone("relatable")}
                    >
                      Campus Relatable
                    </button>
                  </div>

                  <button
                    type="button"
                    className="btn-run-ai"
                    onClick={handleGenerateAi}
                    disabled={isAiGenerating || !aiDraft.trim()}
                  >
                    {isAiGenerating ? "Polishing..." : "Polish with AI ⚡"}
                  </button>
                </div>

                {aiResult && (
                  <div className="ai-output-result">
                    <span className="output-label">Refined Confession:</span>
                    <p className="output-text">{aiResult}</p>
                    <div className="output-actions">
                      <button
                        type="button"
                        className="btn-copy-result"
                        onClick={() => {
                          if (navigator.clipboard) {
                            navigator.clipboard.writeText(aiResult);
                            alert("Copied to clipboard!");
                          }
                        }}
                      >
                        Copy
                      </button>
                      <button
                        type="button"
                        className="btn-post-result"
                        onClick={() => {
                          setNewPostText(aiResult);
                          setIsCreatePostOpen(true);
                        }}
                      >
                        Publish to Feed ➔
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ==================== TAB 4: NOTES & HUB ==================== */}
          {activeTab === "notes" && (
            <div className="notes-view-wrap">
              <div className="notes-header-bar">
                <div>
                  <h2 className="notes-page-title">Creations & Campus Notes</h2>
                  <p className="notes-page-caption">
                    Personal checklists, lecture audio transcripts, and campus memories
                  </p>
                </div>
              </div>

              {/* 2-Column Masonry Board */}
              <div className="notes-masonry-container">
                {/* 1. Task Card: DSA Practice */}
                <div className="hub-note-card task-card">
                  <div className="card-top-meta">
                    <span className="card-date">09/04/2026</span>
                    <span className="card-badge">Tasks</span>
                  </div>
                  <h4 className="card-heading">DSA Tree Practice</h4>
                  <div className="checklist-container">
                    {tasks.map((task) => (
                      <label key={task.id} className="checklist-row">
                        <input
                          type="checkbox"
                          checked={task.done}
                          onChange={() => handleToggleTask(task.id)}
                          className="task-check"
                        />
                        <span className={`task-label ${task.done ? "completed" : ""}`}>
                          {task.text}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 2. Photo & Note: College Fest May */}
                <div className="hub-note-card photo-note-card">
                  <div className="card-top-meta">
                    <span className="card-date">08/04/2026</span>
                    <span className="card-badge">Notes</span>
                  </div>
                  <div
                    className="card-banner-img"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=500&q=80')",
                    }}
                  ></div>
                  <h4 className="card-heading">College Fest May</h4>
                  <p className="card-body-text">
                    Warm days, fewer crowds, perfect time for annual cultural rehearsals and drama club auditions.
                  </p>
                </div>

                {/* 3. Audio Transcript Card */}
                <div className="hub-note-card transcript-card">
                  <div className="card-top-meta">
                    <span className="card-date">06/04/2026</span>
                    <span className="card-badge">Transcription</span>
                  </div>
                  <div className="audio-file-badge">🎙️ Audio Note</div>
                  <h4 className="card-heading">Lab_Lesson_Transcript.txt</h4>
                  <p className="card-body-text italic">
                    “Alright, let&apos;s start with database normalization. Focus on BCNF vs 3NF decomposition rules. In 3NF, every non-prime attribute must depend directly on the superkey...”
                  </p>
                </div>

                {/* 4. Photo Card: Mountain Hike */}
                <div className="hub-note-card photo-card">
                  <div className="card-top-meta">
                    <span className="card-date">08/04/2026</span>
                    <span className="card-badge">Images</span>
                  </div>
                  <div
                    className="card-full-photo"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=500&q=80')",
                    }}
                  ></div>
                </div>

                {/* 5. Cute Fox Stickers */}
                <div className="hub-note-card sticker-card">
                  <div className="card-top-meta">
                    <span className="card-date">03/04/2026</span>
                    <span className="card-badge">Stickers</span>
                  </div>
                  <div className="stickers-emoji-wrap">
                    <span className="big-sticker">🦊</span>
                    <span className="sparkle-sticker">✨</span>
                    <span className="heart-sticker">💖</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 5: PROFILE ==================== */}
          {activeTab === "profile" && (
            <div className="profile-view-wrap">
              <div className="profile-hero-card">
                <div className="profile-avatar-large">⚡</div>
                <h2 className="profile-name">Ghost Student</h2>
                <span className="profile-tag">@ymca_cs27 • JC Bose UST Faridabad</span>
                <p className="profile-bio">
                  3rd Year Computer Engineering. Frequent library lurker. Zero identity leak, pure college vibes.
                </p>

                <div className="profile-stats-grid">
                  <div className="stat-box">
                    <span className="stat-number">1,420</span>
                    <span className="stat-label">Karma</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-number">18</span>
                    <span className="stat-label">Confessions</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-number">42</span>
                    <span className="stat-label">Whispers</span>
                  </div>
                </div>
              </div>

              <div className="profile-honor-pledge">
                <h4>🛡️ Nimo Student Pledge</h4>
                <p>
                  Your account is protected by hardware token encryption. You are verified via college credentials, but your confessions remain strictly anonymous.
                </p>
                <div className="honor-rules-list">
                  <span>✓ Zero Cyberbullying</span>
                  <span>✓ Zero Doxxing / Real Names</span>
                  <span>✓ Honor Code Enforced</span>
                </div>
              </div>

              <div className="profile-actions-strip">
                <Link href="/" className="btn-profile-signout">
                  Log Out to Landing Page
                </Link>
              </div>
            </div>
          )}
        </main>

        {/* =====================================================================
            RIGHT SIDEBAR (DESKTOP WIDGETS)
           ===================================================================== */}
        <aside className="app-right-sidebar">
          {/* Trending Box */}
          <div className="widget-card">
            <h4 className="widget-heading">🔥 What&apos;s Trending</h4>
            <ul className="widget-trending-list">
              <li
                className="trending-item"
                onClick={() => {
                  setNewPostTag("#YMCA_Curfew");
                  setIsCreatePostOpen(true);
                }}
              >
                <span className="trend-topic">#YMCA_Curfew</span>
                <span className="trend-vol">342 confessions today</span>
              </li>
              <li
                className="trending-item"
                onClick={() => {
                  setNewPostTag("#AravalliHike");
                  setIsCreatePostOpen(true);
                }}
              >
                <span className="trend-topic">#AravalliHike</span>
                <span className="trend-vol">189 confessions today</span>
              </li>
              <li
                className="trending-item"
                onClick={() => {
                  setNewPostTag("#MRIIRS_Fest");
                  setIsCreatePostOpen(true);
                }}
              >
                <span className="trend-topic">#MRIIRS_Fest</span>
                <span className="trend-vol">120 confessions today</span>
              </li>
              <li
                className="trending-item"
                onClick={() => {
                  setNewPostTag("#Library3AM");
                  setIsCreatePostOpen(true);
                }}
              >
                <span className="trend-topic">#Library3AM</span>
                <span className="trend-vol">95 confessions today</span>
              </li>
            </ul>
          </div>

          {/* Quick AI Assistant Card */}
          <div className="widget-card widget-assistant-preview">
            <h4 className="widget-heading">✨ Nimo AI Assistant</h4>
            <p className="widget-caption">
              Turn awkward thoughts into witty, anonymous posts without breaking guidelines.
            </p>
            <button
              type="button"
              className="btn-open-assistant-widget"
              onClick={() => setActiveTab("assistant")}
            >
              Open Creation Desk ➔
            </button>
          </div>

          {/* Safety & Honor Code */}
          <div className="widget-card widget-safety-badge">
            <span className="shield-icon">🛡️</span>
            <div className="safety-meta">
              <h5 className="safety-title">Tele-MANAS Verified</h5>
              <p className="safety-text">24/7 National Student Helpline: 14416</p>
            </div>
          </div>
        </aside>
      </div>

      {/* =====================================================================
          3. BOTTOM MOBILE NAVIGATION DOCK (FIXED ON MOBILE SCREENS)
         ===================================================================== */}
      <nav className="mobile-bottom-dock">
        <button
          type="button"
          className={`dock-btn ${activeTab === "feed" ? "active" : ""}`}
          onClick={() => setActiveTab("feed")}
        >
          <span className="dock-icon">🧭</span>
          <span className="dock-label">Feed</span>
        </button>

        <button
          type="button"
          className={`dock-btn ${activeTab === "assistant" ? "active" : ""}`}
          onClick={() => setActiveTab("assistant")}
        >
          <span className="dock-icon">✨</span>
          <span className="dock-label">Assistant</span>
        </button>

        <button
          type="button"
          className={`dock-btn ${activeTab === "messages" ? "active" : ""}`}
          onClick={() => setActiveTab("messages")}
        >
          <span className="dock-icon dock-badge-pos">
            💬
            <span className="dock-badge">6</span>
          </span>
          <span className="dock-label">Messages</span>
        </button>

        <button
          type="button"
          className={`dock-btn ${activeTab === "notes" ? "active" : ""}`}
          onClick={() => setActiveTab("notes")}
        >
          <span className="dock-icon">📑</span>
          <span className="dock-label">Creations</span>
        </button>

        <button
          type="button"
          className={`dock-btn ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          <span className="dock-icon">👤</span>
          <span className="dock-label">Profile</span>
        </button>
      </nav>

      {/* =====================================================================
          4. STORY VIEWER MODAL
         ===================================================================== */}
      {activeStoryModal && (
        <div className="modal-backdrop" onClick={() => setActiveStoryModal(null)}>
          <div
            className="story-viewer-frame"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Story Progress bar */}
            <div className="story-progress-indicator">
              <div className="story-progress-fill"></div>
            </div>

            {/* Story Author bar */}
            <div className="story-viewer-top">
              <div className="story-user-meta">
                <div
                  className="story-viewer-avatar"
                  style={{ backgroundImage: `url('${activeStoryModal.avatar}')` }}
                ></div>
                <span className="story-viewer-name">{activeStoryModal.name}</span>
                <span className="story-viewer-time">{activeStoryModal.time}</span>
              </div>
              <button
                type="button"
                className="btn-close-story"
                onClick={() => setActiveStoryModal(null)}
              >
                ✕
              </button>
            </div>

            {/* Story Image / Content */}
            <div
              className="story-main-media"
              style={{
                backgroundImage: `url('${activeStoryModal.storyImage}')`,
              }}
            >
              {activeStoryModal.storyCaption && (
                <div className="story-caption-overlay">
                  <p>{activeStoryModal.storyCaption}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          5. POST CONFESSION MODAL
         ===================================================================== */}
      {isCreatePostOpen && (
        <div className="modal-backdrop" onClick={() => setIsCreatePostOpen(false)}>
          <div
            className="create-confession-modal-frame"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header-line">
              <h3 className="modal-title">Speak Freely (Anonymous)</h3>
              <button
                type="button"
                className="btn-close-modal"
                onClick={() => setIsCreatePostOpen(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePublishPost}>
              <textarea
                rows={4}
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                placeholder="Have something on your chest? No names will be attached to this post..."
                className="modal-textarea"
                autoFocus
                required
              />

              <div className="tag-picker-row">
                <span className="tag-picker-label">Tag College:</span>
                {["#JC_Bose_YMCA", "#MRIIRS", "#Lingayas", "#HostelLife"].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className={`tag-picker-chip ${newPostTag === tag ? "active" : ""}`}
                    onClick={() => setNewPostTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <div className="modal-footer-line">
                <div className="modal-safety-note">
                  🔒 Encrypted • Protected by Anti-Bullying Honor Code
                </div>
                <div className="modal-buttons-group">
                  <button
                    type="button"
                    className="btn-cancel-modal"
                    onClick={() => setIsCreatePostOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-publish-modal">
                    Publish Confession
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
