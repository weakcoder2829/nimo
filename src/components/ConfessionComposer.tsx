"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FeedPost } from "./CampusFeedPreview";

interface ConfessionComposerProps {
  onPostCreated: (newPost: FeedPost) => void;
  isLoggedIn?: boolean;
}

const MONO_AVATARS = [
  { icon: "🦊", name: "Anonymous Fox" },
  { icon: "🦉", name: "Anonymous Owl" },
  { icon: "🦎", name: "Anonymous Chameleon" },
  { icon: "🐼", name: "Anonymous Panda" },
  { icon: "🦥", name: "Anonymous Sloth" },
];

const FARIDABAD_CAMPUS_LOCATIONS = [
  "JC Bose UST (YMCA) - Central Library",
  "JC Bose UST (YMCA) - College Canteen",
  "Manav Rachna (MRIIRS) - Campus Lawn",
  "Manav Rachna (MRU) - T-Block",
  "Lingaya's Vidyapeeth - CS Department",
  "Sector 15 Market - Student Adda",
  "Faridabad College Hostel Wing",
  "Bata Chowk Metro / NH-19",
];

export default function ConfessionComposer({
  onPostCreated,
  isLoggedIn = false,
}: ConfessionComposerProps) {
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    "confession" | "overheard" | "hot" | "exams" | "hostel"
  >("confession");
  const [selectedAvatarIdx, setSelectedAvatarIdx] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState(FARIDABAD_CAMPUS_LOCATIONS[0]);
  const [postedSuccess, setPostedSuccess] = useState(false);
  const [showAuthGate, setShowAuthGate] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // User requirement: "to speak you need make acoount"
    if (!isLoggedIn) {
      setShowAuthGate(true);
      return;
    }

    if (!content.trim()) return;

    const chosenAvatar = MONO_AVATARS[selectedAvatarIdx];

    const newPost: FeedPost = {
      id: `post-${Date.now()}`,
      avatarIcon: chosenAvatar.icon,
      avatarBg: "#f4f4f5",
      authorLabel: chosenAvatar.name,
      location: `${selectedLocation} • Just now`,
      timeAgo: "Just now",
      category: selectedCategory,
      content: content.trim(),
      upvotes: 1,
      commentsCount: 0,
      userVote: "up",
      comments: [],
    };

    onPostCreated(newPost);
    setContent("");
    setPostedSuccess(true);
    setTimeout(() => {
      setPostedSuccess(false);
    }, 4000);
  };

  return (
    <section id="confessions-section" className="composer-section">
      <div className="section-container">
        <div className="composer-grid">
          {/* Left Column: Heading & Guidelines */}
          <div className="composer-info">
            <div className="section-badge-bw">CONFESSION POST BOX</div>
            <h2 className="composer-heading">
              Have something on your chest? Speak freely?
            </h2>
            <p className="composer-description">
              No profiles. No usernames. No handles. Share your college thoughts, exam rants, canteen reviews, or secrets with fellow Faridabad students.
            </p>

            {/* Account requirement banner */}
            <div className="account-required-banner">
              <div className="banner-title-row">
                <span className="banner-bullet">●</span>
                <strong>Account required to speak</strong>
              </div>
              <p className="banner-desc">
                To prevent outside spam and harassment, you must have an active student account to post confessions. Your posts are never attached to your identity.
              </p>
              <div className="banner-action-row">
                <Link href="/signup" className="btn-small-black">
                  Sign Up to Speak
                </Link>
                <Link href="/login" className="btn-small-outline">
                  Log In
                </Link>
              </div>
            </div>

            <div className="composer-features-list">
              <div className="feature-bullet">
                <div className="bullet-num">01</div>
                <div>
                  <h4>100% Anonymous Identity</h4>
                  <p>Your post is never linked to your name or university roll number.</p>
                </div>
              </div>
              <div className="feature-bullet">
                <div className="bullet-num">02</div>
                <div>
                  <h4>Faridabad Colleges Community</h4>
                  <p>Read and comment with students across JC Bose YMCA, Manav Rachna, and nearby colleges.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Confession Form Card */}
          <div className="composer-card">
            <div className="composer-card-header">
              <div className="composer-active-avatar">
                <div className="avatar-bubble-bw">
                  {MONO_AVATARS[selectedAvatarIdx].icon}
                </div>
                <div>
                  <span className="avatar-title">{MONO_AVATARS[selectedAvatarIdx].name}</span>
                  <span className="avatar-status-bw">Account required to post</span>
                </div>
              </div>

              {/* Avatar Selector */}
              <div className="avatar-picker">
                {MONO_AVATARS.map((av, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`avatar-choice-btn ${selectedAvatarIdx === idx ? "active" : ""}`}
                    onClick={() => setSelectedAvatarIdx(idx)}
                    title={`Switch avatar`}
                  >
                    {av.icon}
                  </button>
                ))}
              </div>
            </div>

            {postedSuccess && (
              <div className="composer-alert-success">
                ✓ Your anonymous confession is now live on the feed!
              </div>
            )}

            {showAuthGate && (
              <div className="composer-auth-gate-alert">
                <div className="auth-gate-header">
                  <strong>⚠️ Account Required to Speak</strong>
                  <button
                    type="button"
                    className="close-gate-btn"
                    onClick={() => setShowAuthGate(false)}
                  >
                    ✕
                  </button>
                </div>
                <p>
                  To protect our Faridabad campus community, you must create a verified student account before posting confessions.
                </p>
                <div className="auth-gate-buttons">
                  <Link href="/signup" className="btn-black-small">
                    Create Account
                  </Link>
                  <Link href="/login" className="btn-outline-small">
                    Log In
                  </Link>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="composer-form">
              <div className="textarea-wrapper">
                <textarea
                  className="composer-textarea"
                  rows={4}
                  maxLength={300}
                  placeholder="Drop your anonymous college confession, canteen review, lecture tea, or hostel thought (account required to post)..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onClick={() => {
                    if (!isLoggedIn) setShowAuthGate(true);
                  }}
                  required
                />
                <div className="char-counter">{300 - content.length} chars left</div>
              </div>

              {/* Tag & Location pickers */}
              <div className="composer-options-row">
                <div className="option-group">
                  <label className="option-label">Category</label>
                  <select
                    className="option-select"
                    value={selectedCategory}
                    onChange={(e) =>
                      setSelectedCategory(
                        e.target.value as "confession" | "overheard" | "hot" | "exams" | "hostel"
                      )
                    }
                  >
                    <option value="confession">Confession</option>
                    <option value="overheard">Overheard</option>
                    <option value="exams">Exams & Viva</option>
                    <option value="hostel">Hostel & Food</option>
                    <option value="hot">Hot Take</option>
                  </select>
                </div>

                <div className="option-group">
                  <label className="option-label">Campus / College Pin</label>
                  <select
                    className="option-select"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  >
                    {FARIDABAD_CAMPUS_LOCATIONS.map((loc, idx) => (
                      <option key={idx} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Actions */}
              <div className="composer-actions">
                <div className="composer-note-bw">
                  Students only • 100% Anonymous
                </div>
                <button
                  type="submit"
                  className="btn-post-confession"
                >
                  <span>Post Anonymously</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
