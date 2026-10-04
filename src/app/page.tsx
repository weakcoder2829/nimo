"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NimoSplash from "@/components/NimoSplash";
import DesktopLandingPage from "@/components/DesktopLandingPage";
import NimoAuth from "@/components/NimoAuth";
import { useAuth } from "@/lib/authContext";

/**
 * Root Application Entry:
 * 1. "nimo" comes first (minimalist entrance splash).
 * 2. After nimo:
 *    - PC (screen >= 768px): Shows the Desktop Landing Page with links to Sign Up, Sign In, and Feed.
 *    - Mobile (screen < 768px): NO landing page! Direct to Sign In / Sign Up (or Feed if already authenticated).
 * 3. Responsive, minimal, and state-of-the-art aesthetics.
 */
export default function RootPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [splashFinished, setSplashFinished] = useState(false);
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  // Detect screen size on client mount and resize
  useEffect(() => {
    const checkViewport = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // When splash finishes, if user is already authenticated on mobile, send straight to /feed
  useEffect(() => {
    if (splashFinished && isDesktop === false && isAuthenticated && user) {
      router.replace("/feed");
    }
  }, [splashFinished, isDesktop, isAuthenticated, user, router]);

  return (
    <main className="w-full min-h-screen bg-background text-foreground relative">
      {/* ========================================================================= */}
      {/* 1. NIMO COMES FIRST: Ultra-clean minimal entrance                         */}
      {/* ========================================================================= */}
      <NimoSplash
        durationMs={1800}
        onFinish={() => setSplashFinished(true)}
      />

      {/* ========================================================================= */}
      {/* 2. PC EXPERIENCE (Screen >= 768px): Desktop Landing Page ONLY             */}
      {/* ========================================================================= */}
      <div className="hidden md:block w-full min-h-screen">
        <DesktopLandingPage />
      </div>

      {/* ========================================================================= */}
      {/* 3. MOBILE EXPERIENCE (Screen < 768px): NO LANDING PAGE!                   */}
      {/* Direct to Sign Up / Sign In Auth (or Campus Feed if authenticated)        */}
      {/* ========================================================================= */}
      <div className="block md:hidden w-full min-h-screen">
        {!isAuthenticated || !user ? (
          <NimoAuth initialMode="signin" />
        ) : (
          <div className="min-h-screen bg-[#080c14] text-white flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="w-10 h-10 rounded-full border-2 border-sky-400 border-t-transparent animate-spin" />
            <p className="text-xs text-slate-400 font-sans tracking-wide">
              Entering campus feed...
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
