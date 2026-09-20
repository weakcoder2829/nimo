"use client";

import React from "react";
import Link from "next/link";

interface LandingFooterProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function LandingFooter({
  onScrollToSection,
}: LandingFooterProps) {
  return (
    <footer className="landing-footer">
      <div className="section-container">
        <div className="footer-clean-row">
          {/* Brand & Mission */}
          <div className="footer-brand-block">
            <div className="footer-brand">
              <span className="footer-logo-word">nimo</span>
            </div>
            <p className="footer-clean-tagline">
              Anonymous comment and confession network for Faridabad college students.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-nav-links">
            <button
              type="button"
              className="footer-link"
              onClick={() => onScrollToSection("live-feed")}
            >
              Live Feed
            </button>
            <button
              type="button"
              className="footer-link"
              onClick={() => onScrollToSection("how-it-works")}
            >
              How It Works
            </button>
            <button
              type="button"
              className="footer-link"
              onClick={() => onScrollToSection("confessions-section")}
            >
              Post Confession
            </button>
            <button
              type="button"
              className="footer-link"
              onClick={() => onScrollToSection("download-app")}
            >
              Get App
            </button>
            <button
              type="button"
              className="footer-link"
              onClick={() => onScrollToSection("anti-bullying")}
            >
              Honor Code & Rules
            </button>
            <Link
              href="/login"
              className="footer-link"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="footer-link"
            >
              Sign Up
            </Link>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="footer-bottom-row">
          <p className="footer-copy">
            © {new Date().getFullYear()} nimo • Faridabad Colleges Anonymous Network
          </p>
          <div className="footer-legal-links">
            <span>Text-only anonymous student commentary</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
