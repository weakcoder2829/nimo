"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./ChirpCampusFeed.module.css";

// Interface for a confession post
interface ChirpPost {
  id: string;
  author: string;
  timeAgo: string;
  text: string;
  votes: number;
  userVote: 1 | -1 | null;
  commentsCount: number;
  comments: { id: string; author: string; time: string; text: string }[];
  tags: string[];
}

export default function ChirpCampusFeed() {
  // Theme state: "auto" (follows device prefers-color-scheme) | "light" | "dark"
  const [themeMode, setThemeMode] = useState<"auto" | "light" | "dark">("auto");
  const [systemIsDark, setSystemIsDark] = useState<boolean>(true);

  // Active Tab: "For You" | "Trending" | "Nearby" | "Tags"
  const [activeTab, setActiveTab] = useState<"For You" | "Trending" | "Nearby" | "Tags">("For You");

  // Active Campus
  const [campus, setCampus] = useState("AUSTIN UNIVERSITY 📍");
  const [isCampusModalOpen, setIsCampusModalOpen] = useState(false);

  // Mobile Bottom Nav Selection
  const [mobileNav, setMobileNav] = useState<"home" | "search" | "newpost" | "notifications" | "profile">("home");

  // Search input state
  const [searchQuery, setSearchQuery] = useState("");

  // Modals state
  const [activeCommentsPostId, setActiveCommentsPostId] = useState<string | null>(null);
  const [newCommentText, setNewCommentText] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newPostText, setNewPostText] = useState("");
  const [newPostAuthor, setNewPostAuthor] = useState("@A_Student");

  // Feed Posts - initialized with exact content from Image 2
  const [posts, setPosts] = useState<ChirpPost[]>([
    {
      id: "cp-1",
      author: "@A_Student",
      timeAgo: "5h ago",
      text: "It's finals week, and my roommate is still blaring death metal. I just want to SLEEP.",
      votes: 342,
      userVote: null,
      commentsCount: 68,
      tags: ["#FinalsWeek", "#HostelLife", "#SleepDeprived"],
      comments: [
        { id: "c1", author: "@earplug_master", time: "4h ago", text: "Buy the 3M industrial earplugs, absolute lifesaver!" },
        { id: "c2", author: "@library_owl", time: "3h ago", text: "Come to the 4th floor quiet study room, it's dead silent here." },
        { id: "c3", author: "@metalhead_junior", time: "2h ago", text: "Maybe he's studying by the power of guitar solos 🎸😂" },
      ],
    },
    {
      id: "cp-2",
      author: "@confessed",
      timeAgo: "1h ago",
      text: "Saw Professor Davis helping a stray cat. Wholesome.",
      votes: 110,
      userVote: null,
      commentsCount: 21,
      tags: ["#Wholesome", "#ProfDavis", "#CampusCat"],
      comments: [
        { id: "c4", author: "@cat_whisperer", time: "45m ago", text: "Professor Davis is honestly the kindest faculty member on campus." },
        { id: "c5", author: "@chem_major", time: "30m ago", text: "Was it the little orange tabby near the science building? 🐈" },
      ],
    },
    {
      id: "cp-3",
      author: "@library_ghost",
      timeAgo: "3h ago",
      text: "Whoever left their AirPods in Audi 3, I submitted them to the security desk. Hope you get them back!",
      votes: 215,
      userVote: null,
      commentsCount: 14,
      tags: ["#LostAndFound", "#Audi3", "#GoodKarma"],
      comments: [
        { id: "c6", author: "@forgetful_freshman", time: "2h ago", text: "OMG THOSE ARE MINE! Heading to the security desk right now, thank you so much!!" },
      ],
    },
    {
      id: "cp-4",
      author: "@austin_chatter",
      timeAgo: "8h ago",
      text: "The library 3rd floor AC is colder than my ex's heart. Bring parkas and hot cocoa.",
      votes: 528,
      userVote: null,
      commentsCount: 94,
      tags: ["#LibraryAC", "#Freezing", "#WinterIsHere"],
      comments: [
        { id: "c7", author: "@sweater_weather", time: "7h ago", text: "I literally wear a puffer jacket inside 💀" },
      ],
    },
  ]);

  // Notifications
  const [notifications] = useState([
    { id: "n1", text: "@confessed upvoted your post in #FinalsWeek", time: "10m ago" },
    { id: "n2", text: "@library_owl replied: 'Come to the 4th floor study room...'", time: "1h ago" },
    { id: "n3", text: "Your confession reached +300 upvotes! Campus Contributor unlocked.", time: "3h ago" },
  ]);

  // Auto detect device dark mode
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mql = window.matchMedia("(prefers-color-scheme: dark)");
      setSystemIsDark(mql.matches);

      const handleThemeChange = (e: MediaQueryListEvent) => {
        setSystemIsDark(e.matches);
      };

      mql.addEventListener("change", handleThemeChange);
      return () => mql.removeEventListener("change", handleThemeChange);
    }
  }, []);

  // Compute effective theme
  const effectiveTheme: "dark" | "light" =
    themeMode === "auto" ? (systemIsDark ? "dark" : "light") : themeMode;

  // Handle voting
  const handleVote = (postId: string, direction: 1 | -1) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;

        if (p.userVote === direction) {
          // Revert vote
          return {
            ...p,
            userVote: null,
            votes: p.votes - direction,
          };
        } else if (p.userVote === -direction) {
          // Flip vote
          return {
            ...p,
            userVote: direction,
            votes: p.votes + direction * 2,
          };
        } else {
          // Fresh vote
          return {
            ...p,
            userVote: direction,
            votes: p.votes + direction,
          };
        }
      })
    );
  };

  // Add Comment
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || !activeCommentsPostId) return;

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== activeCommentsPostId) return p;
        const updated = [
          ...p.comments,
          {
            id: `c_${Date.now()}`,
            author: "@you (anonymous)",
            time: "Just now",
            text: newCommentText.trim(),
          },
        ];
        return {
          ...p,
          comments: updated,
          commentsCount: updated.length,
        };
      })
    );
    setNewCommentText("");
  };

  // Create Confession
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost: ChirpPost = {
      id: `cp_${Date.now()}`,
      author: newPostAuthor,
      timeAgo: "Just now",
      text: newPostText.trim(),
      votes: 1,
      userVote: 1,
      commentsCount: 0,
      tags: ["#NewConfession", "#CampusBuzz"],
      comments: [],
    };

    setPosts([newPost, ...posts]);
    setNewPostText("");
    setIsCreateModalOpen(false);
    setActiveTab("For You");
  };

  // Filter posts based on activeTab and searchQuery
  const filteredPosts = posts.filter((post) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesText = post.text.toLowerCase().includes(q);
      const matchesAuthor = post.author.toLowerCase().includes(q);
      const matchesTag = post.tags.some((t) => t.toLowerCase().includes(q));
      return matchesText || matchesAuthor || matchesTag;
    }

    if (activeTab === "Trending") {
      return post.votes >= 150;
    }
    if (activeTab === "Nearby") {
      return post.id === "cp-2" || post.id === "cp-3";
    }
    if (activeTab === "Tags") {
      return post.tags.length > 0;
    }
    return true; // For You
  });

  const activeCommentsPost = posts.find((p) => p.id === activeCommentsPostId);

  return (
    <div
      className={`${styles.siteRoot} ${
        effectiveTheme === "dark" ? styles.themeDark : styles.themeLight
      }`}
      style={{
        backgroundColor: "var(--bg-page)",
        color: "var(--text-primary)",
      }}
    >
      {/* ======================================================== */}
      {/* 1. TOP HEADER NAVBAR                                     */}
      {/* ======================================================== */}
      <header className={styles.topNavbar}>
        {/* Left: Bird Brand & Campus Pill */}
        <div className={styles.navLeft}>
          <Link href="/dashboard" className={styles.brandLink}>
            <svg className={styles.birdLogo} viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
            </svg>
            <span className={styles.brandText}>CHIRP</span>
          </Link>

          <button
            type="button"
            className={styles.campusPill}
            onClick={() => setIsCampusModalOpen(true)}
            title="Switch campus"
          >
            <span className={styles.liveDot} />
            <span>{campus}</span>
          </button>
        </div>

        {/* Center: Search Bar */}
        <div className={styles.navCenter}>
          <div className={styles.searchForm}>
            <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search confessions, #tags, @students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Right: Theme Selector + Post Action */}
        <div className={styles.navRight}>
          {/* Automatic / Manual Theme Selector */}
          <div className={styles.themeGroup} title="Automatic device theme detection (matches Windows / Mac / Mobile OS theme)">
            <button
              type="button"
              className={`${styles.themeBtn} ${themeMode === "auto" ? styles.themeBtnActive : ""}`}
              onClick={() => setThemeMode("auto")}
            >
              ⚡ Auto ({systemIsDark ? "Dark" : "Light"})
            </button>
            <button
              type="button"
              className={`${styles.themeBtn} ${themeMode === "light" ? styles.themeBtnActive : ""}`}
              onClick={() => setThemeMode("light")}
            >
              ☀️ Light
            </button>
            <button
              type="button"
              className={`${styles.themeBtn} ${themeMode === "dark" ? styles.themeBtnActive : ""}`}
              onClick={() => setThemeMode("dark")}
            >
              🌙 Dark
            </button>
          </div>

          <button
            type="button"
            className={styles.postConfessionBtn}
            onClick={() => setIsCreateModalOpen(true)}
          >
            <span>+</span>
            <span>Post Confession</span>
          </button>

          <Link
            href="/login"
            className={styles.iconBtn}
            title="Account / Sign out"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </Link>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. MAIN 3-COLUMN LAYOUT                                  */}
      {/* ======================================================== */}
      <div className={styles.mainContainer}>
        {/* Left Sidebar */}
        <aside className={styles.leftSidebar}>
          <nav className={styles.sideNavList}>
            <button
              type="button"
              className={`${styles.sideNavItem} ${activeTab === "For You" ? styles.sideNavItemActive : ""}`}
              onClick={() => {
                setActiveTab("For You");
                setSearchQuery("");
              }}
            >
              <svg className={styles.sideNavIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
              <span>For You Feed</span>
            </button>

            <button
              type="button"
              className={`${styles.sideNavItem} ${activeTab === "Trending" ? styles.sideNavItemActive : ""}`}
              onClick={() => {
                setActiveTab("Trending");
                setSearchQuery("");
              }}
            >
              <svg className={styles.sideNavIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
              </svg>
              <span>Trending</span>
            </button>

            <button
              type="button"
              className={`${styles.sideNavItem} ${activeTab === "Nearby" ? styles.sideNavItemActive : ""}`}
              onClick={() => {
                setActiveTab("Nearby");
                setSearchQuery("");
              }}
            >
              <svg className={styles.sideNavIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span>Nearby Hostels</span>
            </button>

            <button
              type="button"
              className={`${styles.sideNavItem} ${activeTab === "Tags" ? styles.sideNavItemActive : ""}`}
              onClick={() => {
                setActiveTab("Tags");
                setSearchQuery("");
              }}
            >
              <svg className={styles.sideNavIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
              </svg>
              <span>Campus Tags</span>
            </button>
          </nav>

          {/* Student Status Card */}
          <div className={styles.studentBadgeCard}>
            <div className={styles.studentAvatar}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <div className={styles.studentInfo}>
              <span className={styles.studentName}>Anonymous Student</span>
              <span className={styles.studentHandle}>Verified &bull; 1,240 Karma</span>
            </div>
          </div>
        </aside>

        {/* Center Feed Column (Exact match to reference Image 2) */}
        <main className={styles.feedColumn}>
          {/* Subtitle box matching Image 2 */}
          <div className={styles.feedHeaderBox}>
            <div className={styles.feedLocationSubtitle}>Campus Location</div>
            <h2 className={styles.feedCampusTitle}>{campus}</h2>
          </div>

          {/* Category Tabs: For You, Trending, Nearby, Tags */}
          <div className={styles.tabsContainer}>
            {(["For You", "Trending", "Nearby", "Tags"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                className={`${styles.tabItem} ${activeTab === tab ? styles.tabItemActive : ""}`}
                onClick={() => {
                  setActiveTab(tab);
                  setSearchQuery("");
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Quick Compose Input Box */}
          <div
            className={styles.quickComposeBox}
            onClick={() => setIsCreateModalOpen(true)}
          >
            <div className={styles.authorAvatar}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <span className={styles.quickComposePlaceholder}>
              What&apos;s on your mind on campus? Post anonymously...
            </span>
            <button
              type="button"
              className={styles.postConfessionBtn}
              style={{ padding: "6px 14px", fontSize: "0.8rem" }}
            >
              Post
            </button>
          </div>

          {/* Posts Feed List */}
          <div className={styles.postsList}>
            {filteredPosts.map((post) => (
              <article key={post.id} className={styles.postCard}>
                {/* Header: User avatar + author + time ago */}
                <div className={styles.cardHeader}>
                  <div className={styles.authorGroup}>
                    <div className={styles.authorAvatar}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                    <span className={styles.authorHandle}>{post.author}</span>
                  </div>
                  <span className={styles.timeAgo}>{post.timeAgo}</span>
                </div>

                {/* Confession Text (Exact text from Image 2) */}
                <p className={styles.cardText}>{post.text}</p>

                {/* Post Tags */}
                {post.tags.length > 0 && (
                  <div className={styles.postTagsRow}>
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className={styles.postTagBadge}
                        onClick={() => setSearchQuery(tag)}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action Row: Upvote/Downvote Pill + Comments */}
                <div className={styles.cardActionsRow}>
                  {/* Vote Pill (↑ +342 ↓) */}
                  <div className={styles.votePill}>
                    <button
                      type="button"
                      className={`${styles.voteArrowBtn} ${post.userVote === 1 ? styles.voteArrowBtnActiveUp : ""}`}
                      onClick={() => handleVote(post.id, 1)}
                      aria-label="Upvote"
                      title="Upvote confession"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="19" x2="12" y2="5" />
                        <polyline points="5 12 12 5 19 12" />
                      </svg>
                    </button>

                    <span className={styles.voteCount}>
                      {post.votes > 0 ? `+${post.votes}` : post.votes}
                    </span>

                    <button
                      type="button"
                      className={`${styles.voteArrowBtn} ${post.userVote === -1 ? styles.voteArrowBtnActiveDown : ""}`}
                      onClick={() => handleVote(post.id, -1)}
                      aria-label="Downvote"
                      title="Downvote confession"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <polyline points="19 12 12 19 5 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Comments Button (💬 68 Comments) */}
                  <button
                    type="button"
                    className={styles.commentsBtn}
                    onClick={() => setActiveCommentsPostId(post.id)}
                    title="View and reply to comments"
                  >
                    <svg className={styles.commentBubbleIcon} viewBox="0 0 24 24">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <span>{post.commentsCount} Comments</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className={styles.rightSidebar}>
          {/* Trending Topics */}
          <div className={styles.sidebarCard}>
            <h3 className={styles.sidebarCardTitle}>
              <span>🔥</span>
              <span>Trending on Campus</span>
            </h3>
            <div className={styles.trendingList}>
              {[
                { tag: "#FinalsWeek", count: "342 confessions today" },
                { tag: "#HostelLife", count: "219 confessions today" },
                { tag: "#LibraryAC", count: "185 confessions today" },
                { tag: "#ProfDavis", count: "120 confessions today" },
                { tag: "#LostAndFound", count: "89 confessions today" },
              ].map((item) => (
                <button
                  key={item.tag}
                  type="button"
                  className={styles.trendingItem}
                  onClick={() => setSearchQuery(item.tag)}
                >
                  <span className={styles.trendingTag}>{item.tag}</span>
                  <span className={styles.trendingCount}>{item.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Student Support Helpline */}
          <div className={styles.helplineBanner}>
            <h4 className={styles.helplineTitle}>
              <span>🛡️</span>
              <span>Tele-MANAS Verified</span>
            </h4>
            <p className={styles.helplineDesc}>
              Anonymous student mental wellness and 24/7 helpline: <strong>14416</strong>. You are never alone.
            </p>
          </div>
        </aside>
      </div>

      {/* ======================================================== */}
      {/* 3. MOBILE BOTTOM NAVIGATION BAR                          */}
      {/* ======================================================== */}
      <nav className={styles.mobileBottomNav}>
        <button
          type="button"
          className={`${styles.mobileNavItem} ${mobileNav === "home" ? styles.mobileNavItemActive : ""}`}
          onClick={() => {
            setMobileNav("home");
            setActiveTab("For You");
            setSearchQuery("");
          }}
        >
          <svg className={styles.mobileNavIcon} viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          <span>Home</span>
        </button>

        <button
          type="button"
          className={`${styles.mobileNavItem} ${mobileNav === "search" ? styles.mobileNavItemActive : ""}`}
          onClick={() => {
            setMobileNav("search");
            const term = prompt("Search confessions, tags or handles:", searchQuery);
            if (term !== null) setSearchQuery(term);
          }}
        >
          <svg className={styles.mobileNavIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span>Search</span>
        </button>

        <button
          type="button"
          className={`${styles.mobileNavItem} ${mobileNav === "newpost" ? styles.mobileNavItemActive : ""}`}
          onClick={() => setIsCreateModalOpen(true)}
        >
          <svg className={styles.mobileNavIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8">
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <line x1="12" y1="8" x2="12" y2="16" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
          <span>New Post</span>
        </button>

        <button
          type="button"
          className={`${styles.mobileNavItem} ${mobileNav === "notifications" ? styles.mobileNavItemActive : ""}`}
          onClick={() => alert("Notifications:\n" + notifications.map((n) => `• ${n.text}`).join("\n"))}
        >
          <svg className={styles.mobileNavIcon} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
          </svg>
          <span>Alerts</span>
        </button>

        <Link
          href="/login"
          className={`${styles.mobileNavItem} ${mobileNav === "profile" ? styles.mobileNavItemActive : ""}`}
        >
          <svg className={styles.mobileNavIcon} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
          <span>Profile</span>
        </Link>
      </nav>

      {/* ======================================================== */}
      {/* 4. COMMENTS MODAL                                        */}
      {/* ======================================================== */}
      {activeCommentsPost && (
        <div className={styles.modalBackdrop} onClick={() => setActiveCommentsPostId(null)}>
          <div className={styles.modalWindow} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>
                Comments ({activeCommentsPost.commentsCount})
              </h3>
              <button
                type="button"
                className={styles.modalCloseBtn}
                onClick={() => setActiveCommentsPostId(null)}
              >
                ✕
              </button>
            </div>

            <div className={styles.commentsContainer}>
              {activeCommentsPost.comments.length === 0 ? (
                <p style={{ textAlign: "center", color: "var(--text-muted)", padding: "20px" }}>
                  No comments yet. Be the first student to reply!
                </p>
              ) : (
                activeCommentsPost.comments.map((c) => (
                  <div key={c.id} className={styles.commentItem}>
                    <div className={styles.commentAuthorRow}>
                      <strong>{c.author}</strong>
                      <span>{c.time}</span>
                    </div>
                    <p className={styles.commentText}>{c.text}</p>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={handleAddComment} className={styles.commentInputRow}>
              <input
                type="text"
                className={styles.commentInput}
                placeholder="Write an anonymous reply..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                autoFocus
              />
              <button type="submit" className={styles.commentSubmitBtn}>
                Send
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 5. CREATE POST MODAL                                     */}
      {/* ======================================================== */}
      {isCreateModalOpen && (
        <div className={styles.modalBackdrop} onClick={() => setIsCreateModalOpen(false)}>
          <div className={styles.modalWindow} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>New Campus Confession</h3>
              <button
                type="button"
                className={styles.modalCloseBtn}
                onClick={() => setIsCreateModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePost}>
              <textarea
                className={styles.composeTextarea}
                placeholder="What's happening on campus? Speak freely, 100% anonymously..."
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                autoFocus
                required
              />

              <div className={styles.composeMetaRow}>
                <label style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  Post As:
                </label>
                <select
                  className={styles.personaSelect}
                  value={newPostAuthor}
                  onChange={(e) => setNewPostAuthor(e.target.value)}
                >
                  <option value="@A_Student">@A_Student</option>
                  <option value="@confessed">@confessed</option>
                  <option value="@hostel_insomniac">@hostel_insomniac</option>
                  <option value="@library_ghost">@library_ghost</option>
                  <option value="@campus_anon">@campus_anon</option>
                </select>
              </div>

              <button type="submit" className={styles.publishBtn}>
                Publish Confession
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 6. CAMPUS SELECTOR MODAL                                 */}
      {/* ======================================================== */}
      {isCampusModalOpen && (
        <div className={styles.modalBackdrop} onClick={() => setIsCampusModalOpen(false)}>
          <div className={styles.modalWindow} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Choose Your Campus</h3>
              <button
                type="button"
                className={styles.modalCloseBtn}
                onClick={() => setIsCampusModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                "AUSTIN UNIVERSITY 📍",
                "FARIDABAD CAMPUS 📍",
                "JC BOSE YMCA 📍",
                "MANAV RACHNA 📍",
                "STANFORD CAMPUS 📍",
              ].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setCampus(c);
                    setIsCampusModalOpen(false);
                  }}
                  style={{
                    background: campus === c ? "var(--btn-primary-bg)" : "var(--pill-bg)",
                    color: campus === c ? "var(--btn-primary-text)" : "var(--text-primary)",
                    border: "1px solid var(--border-subtle)",
                    padding: "12px 18px",
                    borderRadius: "14px",
                    fontWeight: 700,
                    fontSize: "0.92rem",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.15s ease",
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
