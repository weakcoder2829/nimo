"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface LandingNavbarProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function LandingNavbar({
  onScrollToSection,
}: LandingNavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`landing-navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Brand in Black & White */}
        <div className="navbar-brand-group">
          <Link href="/" className="navbar-logo">
            <span className="nimo-word-bw">nimo</span>
          </Link>

          <div className="campus-badge-bw">
            Faridabad Colleges
          </div>
        </div>

        {/* Nav Links */}
        <nav className="navbar-links">
          <button
            type="button"
            className="nav-link-btn"
            onClick={() => onScrollToSection("live-feed")}
          >
            Live Feed
          </button>
          <button
            type="button"
            className="nav-link-btn"
            onClick={() => onScrollToSection("how-it-works")}
          >
            How It Works
          </button>
          <button
            type="button"
            className="nav-link-btn"
            onClick={() => onScrollToSection("confessions-section")}
          >
            Post Confession
          </button>
          <button
            type="button"
            className="nav-link-btn"
            onClick={() => onScrollToSection("download-app")}
          >
            Get App
          </button>
          <button
            type="button"
            className="nav-link-btn"
            onClick={() => onScrollToSection("anti-bullying")}
          >
            Rules
          </button>
        </nav>

        {/* Action Buttons: Direct Links to /dashboard, /login and /signup */}
        <div className="navbar-actions">
          <Link
            href="/dashboard"
            className="btn-nav-signin-bw"
            style={{ fontWeight: 600 }}
          >
            Open App
          </Link>

          <Link
            href="/login"
            className="btn-nav-signin-bw"
          >
            Log In
          </Link>

          <Link
            href="/signup"
            className="btn-nav-signup-bw"
          >
            <span>Sign Up</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <button
            type="button"
            className="mobile-nav-item"
            onClick={() => {
              setMobileMenuOpen(false);
              onScrollToSection("live-feed");
            }}
          >
            Live Feed
          </button>
          <button
            type="button"
            className="mobile-nav-item"
            onClick={() => {
              setMobileMenuOpen(false);
              onScrollToSection("how-it-works");
            }}
          >
            How It Works
          </button>
          <button
            type="button"
            className="mobile-nav-item"
            onClick={() => {
              setMobileMenuOpen(false);
              onScrollToSection("confessions-section");
            }}
          >
            Post Confession
          </button>
          <button
            type="button"
            className="mobile-nav-item"
            onClick={() => {
              setMobileMenuOpen(false);
              onScrollToSection("download-app");
            }}
          >
            Get App
          </button>
          <button
            type="button"
            className="mobile-nav-item"
            onClick={() => {
              setMobileMenuOpen(false);
              onScrollToSection("anti-bullying");
            }}
          >
            Honor Code & Anti-Bullying
          </button>
          <div className="mobile-menu-actions">
            <Link
              href="/signup"
              className="btn-mobile-signup"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign Up
            </Link>
            <Link
              href="/login"
              className="btn-mobile-signin"
              onClick={() => setMobileMenuOpen(false)}
            >
              Log In
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
