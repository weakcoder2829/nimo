"use client";

import React from "react";
import { ShieldCheck, PhoneCall, HeartHandshake, EyeOff, Ban, AlertTriangle } from "lucide-react";

export default function AntiBullyingSection() {
  const policies = [
    {
      code: "01",
      icon: Ban,
      title: "Zero Tolerance for Cyberbullying",
      desc: "Targeted harassment, hate speech, malicious rumors, or intimidation result in an immediate and permanent account suspension. Banter stays fun and safe.",
    },
    {
      code: "02",
      icon: EyeOff,
      title: "Strict No-Doxxing Rule",
      desc: "Never post anyone's real name, personal phone number, hostel room number, or private identity details. Any doxxing post is purged instantly.",
    },
    {
      code: "03",
      icon: AlertTriangle,
      title: "The -5 Downvote Filter",
      desc: "Student democracy in action: the moment any post or comment receives -5 net votes from students, it is purged permanently from the server.",
    },
    {
      code: "04",
      icon: ShieldCheck,
      title: "Decoupled Anonymity",
      desc: "Your university roll verification guarantees genuine student participation, but your post tokens are cryptographically isolated from your name.",
    },
  ];

  return (
    <section id="anti-bullying" className="w-full py-16 sm:py-24 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-heading font-bold bg-primary/10 text-primary border border-primary/20">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" />
            <span>COMMUNITY SAFETY &bull; ZERO CYBERBULLYING</span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-4xl text-foreground tracking-tight">
            Freedom of speech, guarded by community trust
          </h2>

          <p className="font-body text-base text-muted-foreground max-w-xl mx-auto">
            Anonymity is a shield for honesty, never a weapon for harassment. Here is how Nimo maintains a respectful college community.
          </p>
        </div>

        {/* Policies in Clay Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {policies.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.code} className="clay-card p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="clay-badge text-xs font-mono font-bold">
                      RULE {p.code}
                    </span>
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-base text-foreground">
                    {p.title}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Student Mental Health Support Bar (Glassmorphic) */}
        <div className="glass-card p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-border">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="clay-avatar w-12 h-12 text-primary shrink-0 hidden sm:flex">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-base text-foreground">
                Feeling overwhelmed or going through a tough semester?
              </h4>
              <p className="font-body text-xs sm:text-sm text-muted-foreground mt-0.5">
                Confidential student mental health counseling and crisis support lines are free, anonymous, and available 24/7.
              </p>
            </div>
          </div>

          <a
            href="tel:14416"
            className="clay-button-primary px-6 py-3 text-xs font-heading font-black rounded-full shrink-0"
            title="Tele-MANAS National Mental Health Helpline (India)"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call Tele-MANAS: 14416</span>
          </a>
        </div>
      </div>
    </section>
  );
}
