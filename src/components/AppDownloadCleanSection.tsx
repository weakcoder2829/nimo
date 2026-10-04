"use client";

import React, { useState } from "react";
import { Download, QrCode, Smartphone, Sparkles, Check, CheckCircle2, ShieldCheck } from "lucide-react";

export default function AppDownloadCleanSection() {
  const [showQrModal, setShowQrModal] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadApk = (e: React.MouseEvent) => {
    e.preventDefault();
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <section id="download-app" className="w-full py-16 sm:py-24 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="clay-card p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-heading font-bold bg-primary/10 text-primary border border-primary/20">
                <Smartphone className="w-3.5 h-3.5 text-primary" />
                <span>MOBILE APP INSTALL</span>
              </div>

              <h2 className="font-heading font-black text-3xl sm:text-4xl text-foreground tracking-tight leading-tight">
                Take your campus pulse everywhere you walk.
              </h2>

              <p className="font-body text-base text-muted-foreground leading-relaxed">
                Get instant notifications when a confession trends at your college, vote on live lecture banter, and drop whispers from anywhere in Faridabad.
              </p>

              {downloadSuccess && (
                <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-heading font-bold flex items-center gap-2 animate-in fade-in">
                  <Check className="w-4 h-4" />
                  <span>Starting direct APK download (nimo-faridabad-v1.0.apk)</span>
                </div>
              )}

              {/* Download Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  className="clay-button-primary px-6 py-3.5 rounded-2xl flex items-center gap-3 text-left"
                  onClick={handleDownloadApk}
                >
                  <Download className="w-5 h-5 shrink-0" />
                  <div>
                    <span className="text-[10px] font-heading font-bold block opacity-80 uppercase tracking-wider">
                      DIRECT INSTALL
                    </span>
                    <span className="text-sm font-heading font-black block">
                      Download Android .APK
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  className="clay-button-secondary px-5 py-3.5 rounded-2xl flex items-center gap-3 text-left"
                  onClick={() => setShowQrModal(true)}
                >
                  <QrCode className="w-5 h-5 shrink-0 text-muted-foreground" />
                  <div>
                    <span className="text-[10px] font-heading font-bold block text-muted-foreground uppercase tracking-wider">
                      SCAN QR CODE
                    </span>
                    <span className="text-sm font-heading font-bold block text-foreground">
                      Install on Phone
                    </span>
                  </div>
                </button>
              </div>

              {/* App Perks */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-heading text-muted-foreground pt-2">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Lightweight (8.4 MB)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>No Play Store Account Needed</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Full Anonymity Shield</span>
                </div>
              </div>
            </div>

            {/* Right Graphic Preview (Clay Mockup Phone) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="clay-card p-4 w-64 sm:w-72 bg-card border-2 border-border/80 shadow-2xl space-y-4">
                {/* Mock Phone Notch */}
                <div className="w-20 h-4 bg-muted rounded-full mx-auto" />

                {/* Mock Screen Content */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-heading">
                    <span className="font-bold text-primary">nimo mobile</span>
                    <span className="text-[10px] text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      Live
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-muted/40 border border-border/40 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-base">🦊</span>
                      <span className="text-xs font-heading font-bold">Anonymous YMCAian</span>
                    </div>
                    <p className="text-[11px] font-body text-muted-foreground leading-snug">
                      Hostel 2 midnight chai is brewing. Come to room 204.
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1">
                      <span>42 upvotes</span>
                      <span>5m ago</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-muted/40 border border-border/40 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-base">🦉</span>
                      <span className="text-xs font-heading font-bold">Aggarwal Student</span>
                    </div>
                    <p className="text-[11px] font-body text-muted-foreground leading-snug">
                      Internal assessment dates pushed by a week! Let's go 🎉
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1">
                      <span>96 upvotes</span>
                      <span>12m ago</span>
                    </div>
                  </div>
                </div>

                <div className="w-28 h-1 bg-muted-foreground/30 rounded-full mx-auto" />
              </div>
            </div>
          </div>
        </div>

        {/* QR Code Modal (Glassmorphic) */}
        {showQrModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
            <div className="clay-card p-6 sm:p-8 max-w-sm w-full text-center space-y-4 animate-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 border-b border-border/60">
                <span className="font-heading font-bold text-base text-foreground">
                  Scan to Install APK
                </span>
                <button
                  type="button"
                  onClick={() => setShowQrModal(false)}
                  className="text-muted-foreground hover:text-foreground text-sm font-bold"
                >
                  &times;
                </button>
              </div>

              {/* Minimal SVG QR Code placeholder representation */}
              <div className="p-4 rounded-2xl bg-white flex items-center justify-center border border-border shadow-inner mx-auto w-48 h-48">
                <QrCode className="w-36 h-36 text-zinc-900" />
              </div>

              <p className="text-xs text-muted-foreground font-body">
                Point your phone camera to download directly on your Android device.
              </p>

              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="clay-button-secondary w-full py-2.5 text-xs font-heading font-bold rounded-xl"
              >
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
