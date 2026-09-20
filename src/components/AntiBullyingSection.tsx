"use client";

import React from "react";

export default function AntiBullyingSection() {
  const policies = [
    {
      code: "01",
      title: "Zero Tolerance for Cyberbullying",
      desc: "Targeted harassment, hate speech, malicious rumors, or intimidation result in an immediate and permanent device blacklist. Banter stays light and victim-free.",
    },
    {
      code: "02",
      title: "Strict No-Doxxing Rule",
      desc: "Never post anyone's real names, phone numbers, dorm room numbers, or private contact info. Any doxxing attempt is stripped instantly.",
    },
    {
      code: "03",
      title: "The -5 Downvote Guillotine",
      desc: "Community self-moderation in action: the moment any post or reply hits -5 downvotes from students, it is purged forever from the platform.",
    },
    {
      code: "04",
      title: "Decoupled Student Anonymity",
      desc: "Your university verification guarantees genuine student participation, but your post tokens are cryptographically separated from your real-world identity.",
    },
  ];

  return (
    <section id="anti-bullying" className="anti-bullying-section">
      <div className="section-container">
        <div className="section-header-clean text-center">
          <div className="section-badge-bw">COMMUNITY SAFETY • ZERO CYBERBULLYING</div>
          <h2 className="section-title">Freedom of speech, guarded by community trust</h2>
          <p className="section-subtitle">
            Anonymity is a shield for honesty, never a weapon for harassment. Here is how Nimo maintains a respectful college community.
          </p>
        </div>

        <div className="anti-bullying-grid">
          {policies.map((policy) => (
            <div key={policy.code} className="policy-card">
              <div className="policy-code">RULE {policy.code}</div>
              <h3 className="policy-title">{policy.title}</h3>
              <p className="policy-desc">{policy.desc}</p>
            </div>
          ))}
        </div>

        {/* Student Helpline Bar */}
        <div className="helpline-bar-bw">
          <div className="helpline-text">
            <strong>Feeling overwhelmed or going through a tough time?</strong>
            <p>Confidential student mental health counseling and crisis support lines are free and available 24/7.</p>
          </div>
          <a
            href="tel:14416"
            className="btn-helpline-bw"
            title="Tele-MANAS National Mental Health Helpline (India)"
          >
            Call Tele-MANAS: 14416
          </a>
        </div>
      </div>
    </section>
  );
}
