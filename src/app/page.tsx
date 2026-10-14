"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NimoSplash from "@/components/NimoSplash";
import DesktopLandingPage from "@/components/DesktopLandingPage";
import MobileLandingPage from "@/components/MobileLandingPage";
import { useAuth } from "@/lib/authContext";

/**
 * Root Application Entry:
 * 1. "timo" splash appears for exactly 1 second (1000ms).
 * 2. Two distinct landing pages:
 *    - Mobile (< 768px): Dedicated 1-page mobile landing page with "Speak freely", "How it works", and "Create account".
 *    - PC (>= 768px): Comprehensive desktop landing page.
 */
export default function RootPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [splashFinished, setSplashFinished] = useState(false);
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const checkViewport = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  return (
    <main className="w-full min-h-screen bg-background text-foreground relative">
      {/* 1. TIMO 1-SECOND SPLASH INTRO */}
      <NimoSplash
        durationMs={1000}
        onFinish={() => setSplashFinished(true)}
      />

      {/* 2. PC EXPERIENCE (Screen >= 768px): Desktop Landing Page */}
      <div className="hidden md:block w-full min-h-screen">
        <DesktopLandingPage />
      </div>

      {/* 3. MOBILE EXPERIENCE (Screen < 768px): Dedicated 1-Page Mobile Landing Page */}
      <div className="block md:hidden w-full min-h-screen">
        <MobileLandingPage />
      </div>
    </main>
  );
}
