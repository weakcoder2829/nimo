"use client";

import React, { useEffect, useState } from "react";

interface NimoSplashProps {
  onFinish?: () => void;
  durationMs?: number;
}

export default function NimoSplash({ onFinish, durationMs = 2000 }: NimoSplashProps) {
  const [fadingOut, setFadingOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Start fade out after 2 seconds
    const fadeTimer = setTimeout(() => {
      setFadingOut(true);
    }, durationMs);

    // Completely remove after smooth fade completes
    const hideTimer = setTimeout(() => {
      setHidden(true);
      if (onFinish) onFinish();
    }, durationMs + 500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [durationMs, onFinish]);

  if (hidden) return null;

  return (
    <div
      className={`nimo-splash-container ${fadingOut ? "nimo-splash-fadeout" : ""}`}
      onClick={() => {
        setFadingOut(true);
        setTimeout(() => {
          setHidden(true);
          if (onFinish) onFinish();
        }, 200);
      }}
    >
      <div className="nimo-splash-content">
        <h1 className="nimo-splash-mark">nimo</h1>
      </div>
    </div>
  );
}
