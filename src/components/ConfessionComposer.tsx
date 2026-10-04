"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FeedPost } from "./CampusFeedPreview";
import {
  Send,
  ShieldCheck,
  Sparkles,
  MapPin,
  Lock,
  ArrowRight,
  AlertCircle,
  Check,
} from "lucide-react";

interface ConfessionComposerProps {
  onPostCreated: (newPost: FeedPost) => void;
  isLoggedIn?: boolean;
}

const CLAY_AVATARS = [
  { icon: "🦊", name: "Anonymous Fox" },
  { icon: "🦉", name: "Anonymous Owl" },
  { icon: "🦎", name: "Anonymous Chameleon" },
  { icon: "🐼", name: "Anonymous Panda" },
  { icon: "🦥", name: "Anonymous Sloth" },
];

const FARIDABAD_CAMPUS_LOCATIONS = [
  "Aggarwal College - Central Lawn",
  "Aggarwal College - Canteen Area",
  "JC Bose UST (YMCA) - Central Library",
  "Manav Rachna (MRIIRS) - Campus Quad",
  "Faridabad College - Sector 2 Hub",
  "Sector 15 Market - Student Adda",
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

    if (!isLoggedIn) {
      setShowAuthGate(true);
      return;
    }

    if (!content.trim()) return;

    const chosenAvatar = CLAY_AVATARS[selectedAvatarIdx];

    const newPost: FeedPost = {
      id: `post-${Date.now()}`,
      avatarIcon: chosenAvatar.icon,
      avatarBg: "#f1f5f9",
      authorLabel: chosenAvatar.name,
      location: `${selectedLocation} &bull; Just now`,
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

  const categories = [
    { id: "confession", label: "🤫 Confession" },
    { id: "overheard", label: "👂 Overheard" },
    { id: "hot", label: "🔥 Hot Take" },
    { id: "exams", label: "📚 Exams & Viva" },
    { id: "hostel", label: "🏢 Hostel & Mess" },
  ];

  return (
    <section id="confessions-section" className="w-full py-12 md:py-20 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Guidelines & Pitch */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-heading font-bold bg-primary/10 text-primary border border-primary/20">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>CONFESSION POST BOX</span>
            </div>

            <h2 className="font-heading font-black text-3xl sm:text-4xl text-foreground tracking-tight leading-tight">
              Have something on your chest? Speak freely.
            </h2>

            <p className="font-body text-base text-muted-foreground leading-relaxed">
              No profiles. No usernames. No handles. Share your thoughts, canteen gossip, exam rants, or secrets with fellow Faridabad students.
            </p>

            {/* Account required notice */}
            <div className="clay-card p-5 space-y-3">
              <div className="flex items-center gap-2 font-heading font-bold text-sm text-foreground">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Account Required to Speak</span>
              </div>
              <p className="text-xs text-muted-foreground font-body leading-relaxed">
                To prevent outside spam and harassment, you must have an active student account to post confessions. Your posts remain 100% anonymous.
              </p>
              <div className="flex items-center gap-2.5 pt-1">
                <Link
                  href="/signup"
                  className="clay-button-primary px-3.5 py-1.5 text-xs font-heading font-bold"
                >
                  <span>Sign Up to Speak</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
                <Link
                  href="/login"
                  className="clay-button-secondary px-3.5 py-1.5 text-xs font-heading font-bold"
                >
                  Log In
                </Link>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <span className="clay-avatar w-7 h-7 text-xs font-bold shrink-0">1</span>
                <div>
                  <h4 className="font-heading font-bold text-sm text-foreground">100% Anonymous Identity</h4>
                  <p className="text-xs text-muted-foreground font-body">Never tied to your real name or university roll number.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="clay-avatar w-7 h-7 text-xs font-bold shrink-0">2</span>
                <div>
                  <h4 className="font-heading font-bold text-sm text-foreground">Faridabad Campus Radar</h4>
                  <p className="text-xs text-muted-foreground font-body">Connects Aggarwal College, YMCA, Manav Rachna & neighboring colleges.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Clay Confession Composer Card */}
          <div className="lg:col-span-7">
            <div className="clay-card p-6 sm:p-8 space-y-6">
              {/* Header: Persona Avatar Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="clay-avatar w-12 h-12 text-2xl shrink-0">
                    <span>{CLAY_AVATARS[selectedAvatarIdx].icon}</span>
                  </div>
                  <div>
                    <div className="font-heading font-bold text-sm text-foreground">
                      {CLAY_AVATARS[selectedAvatarIdx].name}
                    </div>
                    <div className="text-xs text-muted-foreground font-heading">
                      Select your anonymous guise
                    </div>
                  </div>
                </div>

                {/* Avatar Picker Pills */}
                <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-muted/50 border border-border/40">
                  {CLAY_AVATARS.map((av, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedAvatarIdx(idx)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-transform ${
                        selectedAvatarIdx === idx
                          ? "clay-button-secondary scale-110 border-primary"
                          : "opacity-60 hover:opacity-100 hover:scale-105"
                      }`}
                      title={av.name}
                    >
                      {av.icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Success Notification */}
              {postedSuccess && (
                <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-heading font-bold flex items-center gap-2 animate-in fade-in">
                  <Check className="w-4 h-4" />
                  <span>Your anonymous confession has been posted to the campus feed!</span>
                </div>
              )}

              {/* Auth Gate Warning */}
              {showAuthGate && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-foreground space-y-2.5 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 text-xs font-heading font-bold">
                      <AlertCircle className="w-4 h-4" />
                      <span>Account Required to Speak</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowAuthGate(false)}
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      &times;
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground font-body">
                    To maintain our trusted student space, please verify your college status or sign in before dropping confessions.
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <Link
                      href="/signup"
                      className="clay-button-primary px-3 py-1.5 text-xs font-bold"
                    >
                      Create Student Account
                    </Link>
                    <Link
                      href="/login"
                      className="clay-button-secondary px-3 py-1.5 text-xs font-bold"
                    >
                      Sign In
                    </Link>
                  </div>
                </div>
              )}

              {/* Confession Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Tactile Inset Textarea */}
                <div className="clay-textarea-box space-y-2">
                  <textarea
                    rows={4}
                    maxLength={300}
                    placeholder="Drop your anonymous college confession, canteen review, lecture tea, or hostel thought (account required to post)..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onClick={() => {
                      if (!isLoggedIn) setShowAuthGate(true);
                    }}
                    className="w-full bg-transparent resize-none border-none outline-none font-body text-base text-foreground placeholder:text-muted-foreground/60 leading-relaxed"
                    required
                  />
                  <div className="flex items-center justify-between text-xs text-muted-foreground font-heading pt-1 border-t border-border/30">
                    <span>100% Anonymous &bull; Encrypted</span>
                    <span className="font-mono">{300 - content.length} chars left</span>
                  </div>
                </div>

                {/* Category Pills (Clay) */}
                <div className="space-y-2">
                  <label className="text-xs font-heading font-bold text-muted-foreground">
                    Choose Topic Category:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id as any)}
                        className={`px-3 py-1.5 rounded-full text-xs font-heading font-bold transition-all ${
                          selectedCategory === cat.id
                            ? "clay-button-primary text-white"
                            : "clay-button-secondary text-muted-foreground"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Campus Pin Dropdown */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-xs font-heading font-bold text-muted-foreground">
                    Campus Location Radar:
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-2xl bg-muted/50 border border-border/80 text-xs font-heading font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                  >
                    {FARIDABAD_CAMPUS_LOCATIONS.map((loc, idx) => (
                      <option key={idx} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Post Action */}
                <div className="pt-2 flex items-center justify-between">
                  <div className="text-xs text-muted-foreground font-heading hidden sm:block">
                    Verified Faridabad student radar
                  </div>

                  <button
                    type="submit"
                    className="clay-button-primary px-6 py-3 text-sm font-heading font-black rounded-2xl w-full sm:w-auto"
                  >
                    <span>Post Anonymously</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
