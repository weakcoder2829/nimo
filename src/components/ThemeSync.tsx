"use client";

import { useEffect } from "react";

export default function ThemeSync() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const updateTheme = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    // Initial check
    updateTheme(media);

    // Live listener for OS/device theme switches
    if (media.addEventListener) {
      media.addEventListener("change", updateTheme);
      return () => media.removeEventListener("change", updateTheme);
    } else if ((media as any).addListener) {
      (media as any).addListener(updateTheme);
      return () => (media as any).removeListener(updateTheme);
    }
  }, []);

  return null;
}
