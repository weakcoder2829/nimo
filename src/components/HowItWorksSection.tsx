"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Flame, Lock, Filter, ArrowRight } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      icon: ShieldCheck,
      title: "Verify Student Status",
      desc: "Authenticate once using your university roll number or student ID. Your real identity is isolated from your posts forever.",
    },
    {
      num: "02",
      icon: Flame,
      title: "Browse Real-Time Pulse",
      desc: "Explore honest confessions, lecture tea, exam stress, and hostel chronicles from students across Faridabad colleges.",
    },
    {
      num: "03",
      icon: Lock,
      title: "Account Required to Speak",
      desc: "To keep our campus free of outside spam, you must hold a verified student account to post. Every confession gets a fresh persona.",
    },
    {
      num: "04",
      icon: Filter,
      title: "-5 Karma Moderation Rule",
      desc: "Students run the feed. Any post that hits -5 net downvotes is permanently purged to eliminate toxicity and bullying.",
    },
  ];

  return (
    <section id="how-it-works" className="w-full py-16 sm:py-24 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-heading font-bold bg-primary/10 text-primary border border-primary/20">
            <span>HOW NIMO WORKS</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl text-foreground tracking-tight">
            Anonymity built on student accountability
          </h2>
          <p className="font-body text-base text-muted-foreground max-w-xl mx-auto">
            A safe, verified space for Faridabad students to speak truth without fear of social judgment.
          </p>
        </div>

        {/* 4 Steps in Tactile Clay Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="clay-card p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="clay-avatar w-10 h-10 text-xs font-heading font-black text-primary">
                      {step.num}
                    </span>
                    <Icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <h3 className="font-heading font-bold text-base text-foreground">
                    {step.title}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center pt-4">
          <div className="clay-card max-w-xl mx-auto p-6 sm:p-8 space-y-4">
            <h3 className="font-heading font-bold text-lg text-foreground">
              Ready to speak freely? Join your Faridabad campus circle today.
            </h3>
            <Link
              href="/signup"
              className="clay-button-primary px-8 py-3.5 text-xs font-heading font-black rounded-full"
            >
              <span>Create Student Account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
