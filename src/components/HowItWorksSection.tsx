"use client";

import React from "react";
import Link from "next/link";

export default function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      title: "Verify Your Student Status",
      desc: "Create an account using your university roll number or student credentials. Your real identity is verified once and permanently isolated from your posts.",
    },
    {
      num: "02",
      title: "Browse Real-Time Campus Pulse",
      desc: "Explore honest confessions, lecture tea, exam stress, and hostel chronicles from students across Faridabad colleges.",
    },
    {
      num: "03",
      title: "Account Required to Speak",
      desc: "To keep our campus free of outside spam, you must hold a verified student account to post. Every confession gets a fresh anonymous avatar.",
    },
    {
      num: "04",
      title: "The -5 Karma Moderation Rule",
      desc: "Students control the feed. Posts that drop to -5 net downvotes are permanently vanished to eliminate toxicity and bullying.",
    },
  ];

  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="section-container">
        <div className="section-header-clean text-center">
          <div className="section-badge-bw">HOW NIMO WORKS</div>
          <h2 className="section-title">Anonymity built on student accountability</h2>
          <p className="section-subtitle">
            A safe, verified space for Faridabad students to speak truth without fear of judgment.
          </p>
        </div>

        <div className="how-steps-grid">
          {steps.map((step) => (
            <div key={step.num} className="how-step-card">
              <div className="step-number">{step.num}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="how-it-works-cta">
          <p className="how-cta-text">
            Ready to speak freely? Join your Faridabad campus circle today.
          </p>
          <Link href="/signup" className="btn-black">
            Create Student Account
          </Link>
        </div>
      </div>
    </section>
  );
}
