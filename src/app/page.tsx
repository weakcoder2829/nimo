"use client";

import React, { useState } from "react";
import NimoSplash from "@/components/NimoSplash";
import LandingNavbar from "@/components/LandingNavbar";
import CampusFeedPreview, { FeedPost, INITIAL_POSTS } from "@/components/CampusFeedPreview";
import HowItWorksSection from "@/components/HowItWorksSection";
import ConfessionComposer from "@/components/ConfessionComposer";
import AppDownloadCleanSection from "@/components/AppDownloadCleanSection";
import AntiBullyingSection from "@/components/AntiBullyingSection";
import LandingFooter from "@/components/LandingFooter";

export default function Home() {
  // Splash screen state (shows "nimo" on pure white background for 2 sec, then fades out)
  const [splashFinished, setSplashFinished] = useState(false);

  // Shared posts state between ConfessionComposer and CampusFeedPreview
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>(INITIAL_POSTS);

  const handleNewPost = (newPost: FeedPost) => {
    setFeedPosts((prev) => [newPost, ...prev]);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="landing-root-bw">
      {/* 2-Second Minimal White Intro Splash Screen */}
      <NimoSplash
        durationMs={2000}
        onFinish={() => setSplashFinished(true)}
      />

      {/* Main Single-Page Landing in Strict Black and White */}
      <div className={`landing-main-shell ${splashFinished ? "landing-revealed" : ""}`}>
        {/* Navigation Bar with Brand, Section Links and Direct Links to /login and /signup */}
        <LandingNavbar onScrollToSection={scrollToSection} />

        {/* 1. HERO SECTION */}
        <section className="hero-section-bw">
          <div className="section-container hero-container">
            <div className="section-badge-bw">
              FARIDABAD COLLEGES • ANONYMOUS TEXT FEED
            </div>

            <h1 className="hero-title-bw">
              What’s really happening on campus{" "}
              <span className="hero-serif-accent-bw">right now.</span>
            </h1>

            <p className="hero-subtitle-bw">
              The unfiltered anonymous text comment section for Faridabad college students.
              Drop confessions, lecture updates, canteen reviews, and hostel thoughts — 100% anonymous.
            </p>

            {/* Exactly 2 buttons: Explore Live Feed & Post Confession */}
            <div className="hero-cta-group">
              <button
                type="button"
                className="btn-hero-primary-bw"
                onClick={() => scrollToSection("live-feed")}
              >
                <span>Explore Live Feed</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
              </button>

              <button
                type="button"
                className="btn-hero-secondary-bw"
                onClick={() => scrollToSection("confessions-section")}
              >
                <span>Post Confession</span>
              </button>
            </div>
          </div>
        </section>

        {/* 2. FEED SECTION */}
        <CampusFeedPreview externalPosts={feedPosts} />

        {/* 3. HOW IT WORKS SECTION */}
        <HowItWorksSection />

        {/* 4. POST BOX SECTION (ACCOUNT REQUIRED TO SPEAK) */}
        <ConfessionComposer
          onPostCreated={handleNewPost}
          isLoggedIn={false}
        />

        {/* 5. DOWNLOAD APP SECTION (DIRECT APK & QR - NO GOOGLE PLAY) */}
        <AppDownloadCleanSection />

        {/* 6. COMMUNITY RULES & ANTI-CYBERBULLYING SECTION */}
        <AntiBullyingSection />

        {/* 7. CLEAN MONOCHROME FOOTER */}
        <LandingFooter onScrollToSection={scrollToSection} />
      </div>
    </div>
  );
}
