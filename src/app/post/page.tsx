"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AppLayout from "@/components/AppLayout";
import {
  ShieldCheck,
  Send,
  Lock,
  ArrowLeft,
  Sparkles,
  Check,
} from "lucide-react";

export default function CreatePostPage() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("🦬");
  const [selectedDept, setSelectedDept] = useState("CSE Dep (Aggarwal)");
  const [selectedTag, setSelectedTag] = useState("#confession");
  const [posting, setPosting] = useState(false);
  const [success, setSuccess] = useState(false);

  const avatars = ["🦬", "🦉", "🦊", "👻", "🧪", "💪", "🐱", "🚀"];
  const departments = [
    "CSE Dep (Aggarwal)",
    "ECE Dep (Aggarwal)",
    "Mech Dep (Aggarwal)",
    "BBA Dep (Aggarwal)",
    "Campus Wide (Faridabad)",
  ];
  const tags = ["#confession", "#examstress", "#canteen", "#hostel", "#crush", "#rant", "#lostandfound"];

  const maxChars = 300;

  const handlePost = () => {
    if (!content.trim()) return;
    setPosting(true);
    setTimeout(() => {
      setPosting(false);
      setSuccess(true);
      setTimeout(() => {
        router.push("/feed");
      }, 700);
    }, 500);
  };

  return (
    <AppLayout activeCollege="Aggarwal Clg">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Top Header (Glassmorphic) */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-3.5 py-1.5 rounded-full text-xs font-heading font-semibold text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Cancel</span>
          </button>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-heading font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Anonymous Mode</span>
          </div>
        </div>

        {/* Main Claymorphic Post Composer Card */}
        <div className="clay-card p-6 sm:p-8 space-y-6">
          {/* Persona & Department Selector Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border/60">
            {/* Avatar Selector */}
            <div className="flex items-center gap-3">
              <div className="clay-avatar w-12 h-12 text-2xl shrink-0">
                {selectedAvatar}
              </div>

              <div>
                <div className="text-xs font-heading font-bold text-foreground">
                  Anonymous Guise
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {avatars.slice(0, 6).map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setSelectedAvatar(a)}
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-sm transition-transform ${
                        selectedAvatar === a
                          ? "clay-button-secondary scale-110 border-primary"
                          : "opacity-60 hover:opacity-100 hover:scale-105"
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Department Dropdown */}
            <div className="space-y-1">
              <label className="text-[11px] font-heading font-semibold text-muted-foreground block">
                Posting in:
              </label>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="h-9 px-3 rounded-xl bg-muted/50 border border-border text-xs font-heading font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tactile Inset Textarea Box */}
          <div className="clay-textarea-box space-y-2">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value.slice(0, maxChars))}
              placeholder="What's happening on campus? Drop a confession, canteen review, or exam rant..."
              rows={5}
              className="w-full bg-transparent font-body text-base sm:text-lg text-foreground placeholder:text-muted-foreground/60 resize-none outline-none leading-relaxed"
              autoFocus
            />

            <div className="flex items-center justify-between text-xs font-heading text-muted-foreground pt-2 border-t border-border/40">
              <span>Keep it respectful. Zero harassment.</span>
              <span className={`font-mono font-bold ${content.length > 270 ? "text-destructive" : ""}`}>
                {content.length}/{maxChars}
              </span>
            </div>
          </div>

          {/* Tag Selector (Clay Pills) */}
          <div className="space-y-2">
            <label className="text-xs font-heading font-bold text-muted-foreground">
              Tag your post:
            </label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={`text-xs font-heading font-bold px-3 py-1.5 rounded-full transition-all ${
                    selectedTag === tag
                      ? "clay-button-primary text-white"
                      : "clay-button-secondary text-muted-foreground"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Action Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handlePost}
              disabled={!content.trim() || posting || success}
              className="clay-button-primary w-full h-12 text-sm font-heading font-black rounded-2xl disabled:opacity-50"
            >
              {success ? (
                <span className="flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Yak Dropped Successfully! Redirecting...
                </span>
              ) : posting ? (
                <span>Broadcasting to Campus...</span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Drop Anonymous Yak
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Anonymity Shield Card (Glassmorphic) */}
        <div className="glass-card p-4 text-xs text-muted-foreground font-heading space-y-1.5 border border-border/60">
          <div className="flex items-center gap-2 font-bold text-foreground">
            <Lock className="w-4 h-4 text-emerald-500" />
            <span>How your anonymity is protected</span>
          </div>
          <p className="font-body text-xs leading-relaxed">
            Your post is assigned an ephemeral cryptographic session token. There are no user profiles, tracking cookies, or IP logs linked to this yak.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
