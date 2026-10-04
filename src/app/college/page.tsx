"use client";

import React, { useState } from "react";
import Link from "next/link";
import AppLayout from "@/components/AppLayout";
import PostCard from "@/components/PostCard";
import { INITIAL_POSTS, ACTIVE_COLLEGE_USERS, Post } from "@/lib/mockData";
import {
  GraduationCap,
  MapPin,
  Users,
  MessageSquare,
  Sparkles,
  Plus,
} from "lucide-react";

export default function CollegePage() {
  const [selectedDept, setSelectedDept] = useState("All");
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [joined, setJoined] = useState(true);

  const departments = ["All", "CSE Dep", "ECE Dep", "Mech Dep", "BBA Dep", "Campus Wide"];

  const filteredPosts = posts.filter((p) => {
    if (selectedDept === "All") return true;
    return p.department.toLowerCase().includes(selectedDept.toLowerCase());
  });

  const handleVote = (id: string, delta: number) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, upvotes: p.upvotes + delta } : p))
    );
  };

  return (
    <AppLayout activeCollege="Aggarwal Clg">
      <div className="max-w-6xl mx-auto px-4 py-4 md:py-6 space-y-6">
        {/* Hero Banner (Claymorphic Elevated Card) */}
        <div className="clay-card p-6 sm:p-8 relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-950 text-white">
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="clay-badge bg-white/10 text-white border border-white/20 text-xs">
                  Verified Campus Hub
                </span>
                <div className="flex items-center gap-1 text-xs text-cyan-200 font-heading">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Faridabad, Haryana</span>
                </div>
              </div>

              <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl tracking-tight text-white flex items-center gap-3">
                <GraduationCap className="w-9 h-9 sm:w-11 sm:h-11 text-cyan-300 shrink-0" />
                <span>Aggarwal Clg</span>
              </h1>

              <p className="font-body text-sm sm:text-base text-white/80 max-w-xl">
                The official anonymous hub for Aggarwal College students. Live chatter, confessions, exam tips, and canteen reviews.
              </p>

              <div className="flex items-center gap-4 text-xs font-heading pt-1 text-white/70">
                <span className="flex items-center gap-1 font-bold text-white">
                  <Users className="w-4 h-4 text-cyan-300" />
                  1,420 Students Active
                </span>
                <span>&bull;</span>
                <span>#1 Most Active in Faridabad</span>
              </div>
            </div>

            <div className="flex sm:flex-col items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setJoined(!joined)}
                className={`clay-button-primary px-6 py-2.5 text-xs font-heading font-black rounded-full ${
                  joined
                    ? "bg-white text-blue-950 hover:bg-white/90"
                    : "bg-cyan-400 text-blue-950"
                }`}
              >
                {joined ? "Joined Campus" : "Join Campus"}
              </button>
              <Link href="/post">
                <button
                  type="button"
                  className="clay-button-secondary px-5 py-2 text-xs font-heading font-bold rounded-full bg-white/10 text-white border-white/20 hover:bg-white/20"
                >
                  Drop Post Here
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Department Filter (Clay Pills) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {departments.map((dept) => (
            <button
              key={dept}
              type="button"
              onClick={() => setSelectedDept(dept)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-heading font-bold transition-all shrink-0 ${
                selectedDept === dept
                  ? "clay-button-primary text-white"
                  : "clay-button-secondary text-muted-foreground"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* 2-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Feed */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-heading">
              <span>Showing {filteredPosts.length} posts from Aggarwal Clg</span>
              <span>Sorted by Latest</span>
            </div>

            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} onUpvote={handleVote} />
              ))}
            </div>
          </div>

          {/* Right Sidebar: Active Campus Personas */}
          <aside className="w-full lg:w-80 space-y-4 shrink-0">
            <div className="clay-card p-5 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-border/60">
                <span className="font-heading font-bold text-sm text-foreground">Campus Personas</span>
                <span className="clay-badge text-[10px] font-heading font-bold text-primary">
                  Top Voices
                </span>
              </div>

              <div className="space-y-2.5">
                {ACTIVE_COLLEGE_USERS.map((user, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-muted/60 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="relative">
                        <div className="clay-avatar w-9 h-9 text-lg shrink-0">
                          {user.avatar}
                        </div>
                        {user.online && (
                          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-card" />
                        )}
                      </div>
                      <div>
                        <div className="font-heading font-bold text-sm text-foreground">
                          {user.name}
                        </div>
                        <div className="text-[11px] text-muted-foreground font-heading">
                          {user.role}
                        </div>
                      </div>
                    </div>

                    <Link href={`/messages?user=${encodeURIComponent(user.name)}`}>
                      <button
                        type="button"
                        className="clay-badge text-primary hover:bg-primary/10 text-xs font-heading font-bold gap-1 cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Whisper</span>
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick College Info */}
            <div className="clay-card p-5 space-y-2 text-xs text-muted-foreground font-heading">
              <div className="font-bold text-foreground">About Aggarwal College Hub</div>
              <p className="font-body text-xs leading-relaxed">
                Affiliated with MDU Rohtak, NAAC 'A' Accredited. Established in 1971. The nimo channel is managed autonomously by student representatives.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </AppLayout>
  );
}
