"use client";

import React, { useState } from "react";

export default function AppDownloadCleanSection() {
  const [showQrModal, setShowQrModal] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadApk = (e: React.MouseEvent) => {
    e.preventDefault();
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <section id="download-app" className="download-clean-section">
      <div className="section-container">
        <div className="download-clean-grid">
          {/* Left Column: Direct Download Options (No Google Play) */}
          <div className="download-clean-content">
            <div className="section-badge-bw">MOBILE INSTALL</div>
            <h2 className="download-clean-title">
              Take your campus pulse everywhere you walk.
            </h2>
            <p className="download-clean-desc">
              Get instant notifications when a confession trends at your college, vote on live lecture banter, and drop whispers from anywhere in Faridabad.
            </p>

            {downloadSuccess && (
              <div className="download-alert-bw">
                ✓ Starting direct APK download (nimo-faridabad-v1.0.apk)
              </div>
            )}

            {/* Direct Black & White Download Actions - NOT Google Play */}
            <div className="direct-download-buttons">
              <button
                type="button"
                className="btn-download-direct primary"
                onClick={handleDownloadApk}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <div className="btn-download-text">
                  <span className="btn-small-label">DIRECT INSTALL</span>
                  <span className="btn-bold-label">Download Android .APK</span>
                </div>
              </button>

              <button
                type="button"
                className="btn-download-direct secondary"
                onClick={() => setShowQrModal(true)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                <div className="btn-download-text">
                  <span className="btn-small-label">IOS & ANDROID</span>
                  <span className="btn-bold-label">Scan QR Code</span>
                </div>
              </button>
            </div>

            <div className="pwa-install-note">
              <span>📱 iOS users can also tap <strong>Share → Add to Home Screen</strong> in Safari for instantaneous zero-install access.</span>
            </div>
          </div>

          {/* Right Column: Monochrome Wireframe Phone */}
          <div className="download-mockup-col">
            <div className="phone-monochrome-frame">
              <div className="phone-mono-notch"></div>
              <div className="phone-mono-screen">
                <div className="phone-mono-header">
                  <span className="phone-mono-brand">nimo</span>
                  <span className="phone-mono-badge">Faridabad</span>
                </div>
                <div className="phone-mono-body">
                  <div className="phone-mono-card">
                    <span className="pm-tag">JC Bose UST • 4m ago</span>
                    <p className="pm-text">
                      "Sector 15 parantha point is officially our exam survival headquarters."
                    </p>
                    <div className="pm-stats">▲ 52 ▼ • 8 replies</div>
                  </div>

                  <div className="phone-mono-card highlight">
                    <span className="pm-tag">Manav Rachna • 16m ago</span>
                    <p className="pm-text">
                      "Attendance shortage notice issued. May the force be with us all."
                    </p>
                    <div className="pm-stats">▲ 89 ▼ • 14 replies</div>
                  </div>

                  <div className="phone-mono-card">
                    <span className="pm-tag">Lingaya's • 35m ago</span>
                    <p className="pm-text">
                      "CS Lab external asks questions like we built the Linux kernel."
                    </p>
                    <div className="pm-stats">▲ 64 ▼ • 11 replies</div>
                  </div>
                </div>
                <div className="phone-mono-footer">
                  <span>Feed</span>
                  <span className="mono-add-btn">+</span>
                  <span>Confess</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QR Modal */}
      {showQrModal && (
        <div className="nimo-modal-backdrop" onClick={() => setShowQrModal(false)}>
          <div className="qr-modal-bw" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close-bw"
              onClick={() => setShowQrModal(false)}
            >
              ✕
            </button>
            <div className="section-badge-bw">DIRECT PHONE INSTALL</div>
            <h3 className="qr-title-bw">Scan to Install Nimo</h3>
            <p className="qr-subtitle-bw">Point your smartphone camera at this code to open and install Nimo immediately.</p>

            <div className="qr-box-bw">
              <svg className="qr-svg" viewBox="0 0 100 100" fill="none">
                <rect x="5" y="5" width="30" height="30" rx="3" fill="#000000" />
                <rect x="11" y="11" width="18" height="18" fill="#ffffff" />
                <rect x="15" y="15" width="10" height="10" fill="#000000" />

                <rect x="65" y="5" width="30" height="30" rx="3" fill="#000000" />
                <rect x="71" y="11" width="18" height="18" fill="#ffffff" />
                <rect x="75" y="15" width="10" height="10" fill="#000000" />

                <rect x="5" y="65" width="30" height="30" rx="3" fill="#000000" />
                <rect x="11" y="71" width="18" height="18" fill="#ffffff" />
                <rect x="15" y="75" width="10" height="10" fill="#000000" />

                <rect x="42" y="10" width="6" height="6" fill="#000000" />
                <rect x="52" y="18" width="6" height="6" fill="#000000" />
                <rect x="42" y="26" width="6" height="6" fill="#000000" />
                <rect x="10" y="45" width="6" height="6" fill="#000000" />
                <rect x="22" y="48" width="6" height="6" fill="#000000" />
                <rect x="35" y="42" width="6" height="6" fill="#000000" />
                <rect x="48" y="45" width="12" height="12" fill="#000000" />
                <rect x="68" y="45" width="6" height="6" fill="#000000" />
                <rect x="80" y="45" width="10" height="6" fill="#000000" />
                <rect x="42" y="65" width="6" height="6" fill="#000000" />
                <rect x="55" y="72" width="6" height="6" fill="#000000" />
                <rect x="45" y="85" width="8" height="8" fill="#000000" />
                <rect x="65" y="65" width="12" height="6" fill="#000000" />
                <rect x="82" y="75" width="8" height="8" fill="#000000" />
                <rect x="70" y="86" width="15" height="6" fill="#000000" />
              </svg>
            </div>

            <div className="qr-note-bw">
              No store account needed • Direct progressive web application
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
