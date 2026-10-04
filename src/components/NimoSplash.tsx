"use client";

import React, { useEffect, useState } from "react";

interface NimoSplashProps {
  onFinish?: () => void;
  durationMs?: number;
}

/**
 * Minimal & Amazing "nimo" Entrance Splash
 * - Pure, high-end minimal backdrop
 * - Geometric "nimo." with breathing live pulse dot
 * - Subtitle: campus social pulse • 5-mile radar
 * - Smooth fade out & tap-to-skip
 */
export default function NimoSplash({
  onFinish,
  durationMs = 1800,
}: NimoSplashProps) {
  const [fadingOut, setFadingOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Show splash for specified duration, then trigger smooth fade-out
    const fadeTimer = setTimeout(() => {
      setFadingOut(true);
    }, durationMs);

    // Completely unmount after fade transition completes
    const hideTimer = setTimeout(() => {
      setHidden(true);
      if (onFinish) onFinish();
    }, durationMs + 380);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [durationMs, onFinish]);

  if (hidden) return null;

  const handleSkip = () => {
    setFadingOut(true);
    setTimeout(() => {
      setHidden(true);
      if (onFinish) onFinish();
    }, 120);
  };

  return (
    <div
      onClick={handleSkip}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#080c14",
        zIndex: 9999999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: fadingOut ? 0 : 1,
        transition: "opacity 0.38s cubic-bezier(0.16, 1, 0.3, 1), transform 0.38s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: fadingOut ? "scale(1.02)" : "scale(1)",
        pointerEvents: fadingOut ? "none" : "auto",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: "absolute",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(56, 189, 248, 0.18) 0%, rgba(37, 99, 235, 0.08) 50%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "14px",
        }}
      >
        {/* Nimo Wordmark with Pulse Dot */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "4px",
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-heading), -apple-system, BlinkMacSystemFont, "Figtree", "Segoe UI", Roboto, sans-serif',
              fontSize: "clamp(4.2rem, 14vw, 6.8rem)",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.05em",
              lineHeight: 0.95,
              textShadow: "0 0 40px rgba(56, 189, 248, 0.35)",
            }}
          >
            nimo
          </span>
          <span
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#38bdf8",
              display: "inline-block",
              boxShadow: "0 0 16px #38bdf8, 0 0 30px rgba(56, 189, 248, 0.6)",
              animation: "pulse 2s infinite",
            }}
          />
        </div>

        {/* Minimal Subtitle Tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            padding: "5px 14px",
            borderRadius: "100px",
            backdropFilter: "blur(8px)",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "#10b981",
              boxShadow: "0 0 8px #10b981",
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-heading), -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: "0.78rem",
              fontWeight: 500,
              color: "#94a3b8",
              letterSpacing: "0.04em",
              textTransform: "lowercase",
            }}
          >
            campus social pulse &bull; 5-mile radar
          </span>
        </div>

        {/* Subtle Tap to Enter Hint */}
        <span
          style={{
            marginTop: "16px",
            fontSize: "0.72rem",
            color: "#64748b",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            fontFamily: 'var(--font-heading), -apple-system, BlinkMacSystemFont, sans-serif',
            opacity: 0.7,
          }}
        >
          Tap anywhere to enter
        </span>
      </div>
    </div>
  );
}
