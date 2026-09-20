"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface NimoAuthProps {
  initialMode?: "signin" | "signup";
  onClose?: () => void;
}

export default function NimoAuth({ initialMode = "signin", onClose }: NimoAuthProps = {}) {
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  const [signupStep, setSignupStep] = useState<number>(1);

  // Sign in state
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // Step 1: Mobile verification state
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [isMobileVerified, setIsMobileVerified] = useState(false);

  // Step 2: University details state
  const [rollNumber, setRollNumber] = useState("");
  const [fullName, setFullName] = useState("");

  // Step 3: University ID upload state
  const [idFile, setIdFile] = useState<File | null>(null);
  const [idPreviewUrl, setIdPreviewUrl] = useState<string | null>(null);

  // Step 4: Password state
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Common notification/feedback state
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [supportOpen, setSupportOpen] = useState(false);

  // Handle Login
  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorNotice(null);
    setLoginStatus(null);

    if (!loginIdentifier.trim()) {
      setErrorNotice("Please enter your registered username or university roll number.");
      return;
    }
    if (!loginPassword) {
      setErrorNotice("Please enter your account password to sign in.");
      return;
    }

    setLoginLoading(true);
    setTimeout(() => {
      setLoginLoading(false);
      setLoginStatus(`Welcome back! Successfully authenticated as ${loginIdentifier}. Redirecting...`);
      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
    }, 600);
  };

  // Step 1: Send OTP
  const handleSendOtp = () => {
    setErrorNotice(null);
    const cleaned = mobileNumber.replace(/\D/g, "");
    if (cleaned.length < 10) {
      setErrorNotice("Please enter a valid 10-digit mobile phone number.");
      return;
    }
    setOtpSent(true);
  };

  // Step 1: Verify OTP
  const handleVerifyOtp = () => {
    setErrorNotice(null);
    if (!otpCode.trim()) {
      setErrorNotice("Please enter the verification code sent to your phone.");
      return;
    }
    if (otpCode.trim() !== "123456" && otpCode.trim().length !== 6) {
      setErrorNotice("Invalid verification code. Please enter 123456 for demo verification.");
      return;
    }
    setIsMobileVerified(true);
    setSignupStep(2);
  };

  // Step 2: Proceed to ID upload
  const handleProceedToId = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorNotice(null);
    if (!rollNumber.trim()) {
      setErrorNotice("Please provide your official university roll number.");
      return;
    }
    if (!fullName.trim()) {
      setErrorNotice("Please enter your full legal student name.");
      return;
    }
    setSignupStep(3);
  };

  // Step 3: Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorNotice(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorNotice("The uploaded file exceeds the 5 MB maximum size limit.");
      return;
    }

    setIdFile(file);
    if (file.type.startsWith("image/")) {
      setIdPreviewUrl(URL.createObjectURL(file));
    } else {
      setIdPreviewUrl(null);
    }
  };

  const handleProceedToPassword = () => {
    setErrorNotice(null);
    if (!idFile) {
      setErrorNotice("Please upload an image or scan of your university ID card to proceed.");
      return;
    }
    setSignupStep(4);
  };

  // Step 4: Complete registration
  const handleCompleteRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorNotice(null);
    if (password.length < 8) {
      setErrorNotice("Your password must contain at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorNotice("The passwords do not match. Please ensure both fields are identical.");
      return;
    }
    setSignupStep(5);
  };

  // Reset and switch modes
  const handleSwitchToSignUp = () => {
    setErrorNotice(null);
    setLoginStatus(null);
    setSignupStep(1);
    setMode("signup");
  };

  const handleSwitchToSignIn = () => {
    setErrorNotice(null);
    setLoginStatus(null);
    setMode("signin");
  };

  const handleBack = () => {
    setErrorNotice(null);
    if (mode === "signup") {
      if (signupStep > 1 && signupStep <= 4) {
        setSignupStep(signupStep - 1);
      } else if (onClose && initialMode === "signup") {
        onClose();
      } else if (initialMode === "signup") {
        router.push("/");
      } else {
        setMode("signin");
      }
    } else {
      if (onClose) {
        onClose();
      } else {
        router.push("/");
      }
    }
  };

  return (
    <div className="nimo-viewport">
      {/* Top Header Navigation */}
      <header className="nimo-topbar">
        <div className="topbar-left">
          <button
            type="button"
            className="topbar-back-btn"
            onClick={handleBack}
            aria-label="Go back"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Back</span>
          </button>
        </div>

        <div className="topbar-center">
          <div className="nimo-brand" onClick={() => router.push("/")} role="button" tabIndex={0}>
            <svg className="nimo-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="8.5" />
              <circle cx="12" cy="12" r="3.5" />
              <line x1="12" y1="3.5" x2="12" y2="8.5" />
            </svg>
            <span className="nimo-wordmark">nimo</span>
          </div>
        </div>

        <div className="topbar-right">
          <button
            type="button"
            className="topbar-support-btn"
            onClick={() => setSupportOpen(true)}
          >
            Contact support
          </button>
        </div>
      </header>

      {/* Main Content Card Container */}
      <main className="nimo-main">
        <div className="nimo-card">
          {errorNotice && (
            <div className="nimo-alert nimo-alert-error" role="alert">
              <span>{errorNotice}</span>
            </div>
          )}

          {loginStatus && (
            <div className="nimo-alert nimo-alert-success" role="status">
              <span>{loginStatus}</span>
            </div>
          )}

          {/* ==================== SIGN IN VIEW ==================== */}
          {mode === "signin" && (
            <div className="flow-step-container">
              <div className="card-heading-group">
                <h1 className="card-title">Log in to nimo</h1>
                <p className="card-subtitle">Your academic journey starts here</p>
              </div>

              {/* Social Quick Auth Buttons */}
              <div className="social-row">
                <button
                  type="button"
                  className="social-btn"
                  title="Sign in with X"
                  onClick={() => setErrorNotice("Social authentication is in demo mode. Please use your username or roll number below.")}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="social-btn"
                  title="Sign in with Apple"
                  onClick={() => setErrorNotice("Apple Sign-in is in demo mode. Please use your credentials below.")}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.76 1.05-1.81.93-2.87-.9.04-2.02.6-2.67 1.36-.58.67-1.09 1.74-.95 2.78 1.02.08 2.07-.51 2.69-1.27z"/>
                  </svg>
                </button>
                <button
                  type="button"
                  className="social-btn"
                  title="Sign in with Google"
                  onClick={() => setErrorNotice("Google authentication is in demo mode. Please use your credentials below.")}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"/>
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                  </svg>
                </button>
              </div>

              <div className="nimo-divider">
                <span>or</span>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSignInSubmit} className="nimo-form">
                <div className="nimo-field">
                  <label htmlFor="signin-id" className="nimo-label">
                    Username or Roll number
                  </label>
                  <input
                    id="signin-id"
                    type="text"
                    className="nimo-input"
                    placeholder="Enter username or university roll number"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    disabled={loginLoading}
                    autoComplete="username"
                  />
                </div>

                <div className="nimo-field">
                  <label htmlFor="signin-pw" className="nimo-label">
                    Password
                  </label>
                  <input
                    id="signin-pw"
                    type="password"
                    className="nimo-input"
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    disabled={loginLoading}
                    autoComplete="current-password"
                  />
                </div>

                <button
                  type="submit"
                  className="nimo-submit-btn"
                  disabled={loginLoading}
                >
                  {loginLoading ? "Signing in..." : "Continue with Account"}
                </button>
              </form>

              <div className="nimo-card-footer">
                <p>
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    className="nimo-inline-link"
                    onClick={handleSwitchToSignUp}
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* ==================== SIGN UP FLOW (SHORT & ONE AFTER ANOTHER) ==================== */}
          {mode === "signup" && (
            <div className="flow-step-container">
              {/* STEP 1: MOBILE VERIFICATION */}
              {signupStep === 1 && (
                <div>
                  <div className="card-heading-group">
                    <h1 className="card-title">Join nimo</h1>
                    <p className="card-subtitle">Step 1 of 4 &middot; Mobile verification</p>
                  </div>

                  <p className="nimo-sentence">
                    Please enter your mobile phone number to receive a secure one-time verification code.
                  </p>

                  <div className="nimo-form">
                    <div className="nimo-field">
                      <label htmlFor="signup-phone" className="nimo-label">
                        Mobile phone number
                      </label>
                      <div className="nimo-input-action">
                        <input
                          id="signup-phone"
                          type="tel"
                          className="nimo-input"
                          placeholder="e.g. 9876543210"
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                          disabled={isMobileVerified}
                        />
                        <button
                          type="button"
                          className="nimo-action-pill"
                          onClick={handleSendOtp}
                        >
                          {otpSent ? "Resend" : "Send code"}
                        </button>
                      </div>
                    </div>

                    {otpSent && (
                      <div className="nimo-field animate-fadein">
                        <label htmlFor="signup-otp-input" className="nimo-label">
                          Verification code
                        </label>
                        <input
                          id="signup-otp-input"
                          type="text"
                          maxLength={6}
                          className="nimo-input"
                          placeholder="Enter 6-digit code (use 123456)"
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                        />
                        <span className="nimo-caption">
                          A 6-digit code was sent. Use <strong>123456</strong> for instant verification.
                        </span>
                      </div>
                    )}

                    {otpSent ? (
                      <button
                        type="button"
                        className="nimo-submit-btn"
                        onClick={handleVerifyOtp}
                      >
                        Verify &amp; Continue
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="nimo-submit-btn"
                        onClick={handleSendOtp}
                      >
                        Continue with Mobile
                      </button>
                    )}
                  </div>

                  <div className="nimo-card-footer">
                    <p>
                      Already have an account?{" "}
                      <button
                        type="button"
                        className="nimo-inline-link"
                        onClick={handleSwitchToSignIn}
                      >
                        Log in
                      </button>
                    </p>
                  </div>
                </div>
              )}

              {/* STEP 2: UNIVERSITY ROLL NUMBER & STUDENT NAME */}
              {signupStep === 2 && (
                <div>
                  <div className="card-heading-group">
                    <h1 className="card-title">Student Information</h1>
                    <p className="card-subtitle">Step 2 of 4 &middot; Academic details</p>
                  </div>

                  <p className="nimo-sentence">
                    Please provide your official university roll number and full student name to connect your academic record.
                  </p>

                  <form onSubmit={handleProceedToId} className="nimo-form">
                    <div className="nimo-field">
                      <label htmlFor="signup-rollno" className="nimo-label">
                        University Roll Number
                      </label>
                      <input
                        id="signup-rollno"
                        type="text"
                        className="nimo-input"
                        placeholder="e.g. 2024-CS-0412"
                        value={rollNumber}
                        onChange={(e) => setRollNumber(e.target.value)}
                        required
                      />
                    </div>

                    <div className="nimo-field">
                      <label htmlFor="signup-name" className="nimo-label">
                        Full Student Name
                      </label>
                      <input
                        id="signup-name"
                        type="text"
                        className="nimo-input"
                        placeholder="e.g. Karan Sharma"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>

                    <button type="submit" className="nimo-submit-btn">
                      Continue to ID Upload
                    </button>
                  </form>

                  <div className="nimo-card-footer">
                    <button
                      type="button"
                      className="nimo-back-link"
                      onClick={() => setSignupStep(1)}
                    >
                      &larr; Back to mobile verification
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: UNIVERSITY ID CARD UPLOAD */}
              {signupStep === 3 && (
                <div>
                  <div className="card-heading-group">
                    <h1 className="card-title">Verify Student ID</h1>
                    <p className="card-subtitle">Step 3 of 4 &middot; Identity verification</p>
                  </div>

                  <p className="nimo-sentence">
                    Please upload a clear photograph or scanned copy of your official University Student ID Card for verification.
                  </p>

                  <div className="nimo-form">
                    <label htmlFor="id-upload-input" className="nimo-upload-zone">
                      <input
                        id="id-upload-input"
                        type="file"
                        accept="image/png, image/jpeg, image/jpg, application/pdf"
                        onChange={handleFileSelect}
                        className="nimo-hidden-file"
                      />
                      {idFile ? (
                        <div className="upload-file-info">
                          <div className="upload-icon-success">&check;</div>
                          <span className="upload-file-name">{idFile.name}</span>
                          <span className="upload-file-size">
                            {(idFile.size / 1024).toFixed(1)} KB &middot; Tap to replace
                          </span>
                        </div>
                      ) : (
                        <div className="upload-placeholder">
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                          </svg>
                          <span className="upload-prompt">Click to select Student ID card</span>
                          <span className="upload-types">Supports JPG, PNG, or PDF</span>
                        </div>
                      )}
                    </label>

                    {idPreviewUrl && (
                      <div className="preview-container">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={idPreviewUrl}
                          alt="Student ID Preview"
                          className="nimo-thumbnail"
                        />
                      </div>
                    )}

                    <button
                      type="button"
                      className="nimo-submit-btn"
                      onClick={handleProceedToPassword}
                    >
                      Continue to Password
                    </button>
                  </div>

                  <div className="nimo-card-footer">
                    <button
                      type="button"
                      className="nimo-back-link"
                      onClick={() => setSignupStep(2)}
                    >
                      &larr; Back to student details
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: PASSWORD SETUP */}
              {signupStep === 4 && (
                <div>
                  <div className="card-heading-group">
                    <h1 className="card-title">Create Password</h1>
                    <p className="card-subtitle">Step 4 of 4 &middot; Secure your account</p>
                  </div>

                  <p className="nimo-sentence">
                    Please choose a secure password to protect your newly registered nimo student profile.
                  </p>

                  <form onSubmit={handleCompleteRegistration} className="nimo-form">
                    <div className="nimo-field">
                      <label htmlFor="signup-pwd" className="nimo-label">
                        Account Password
                      </label>
                      <input
                        id="signup-pwd"
                        type="password"
                        className="nimo-input"
                        placeholder="At least 8 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>

                    <div className="nimo-field">
                      <label htmlFor="signup-cpwd" className="nimo-label">
                        Confirm Password
                      </label>
                      <input
                        id="signup-cpwd"
                        type="password"
                        className="nimo-input"
                        placeholder="Re-enter password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>

                    <div className="nimo-summary-card">
                      <span className="summary-title">Summary:</span>
                      <span className="summary-line">Phone: {mobileNumber}</span>
                      <span className="summary-line">Roll No: {rollNumber}</span>
                      <span className="summary-line">Name: {fullName}</span>
                      <span className="summary-line">ID File: {idFile?.name}</span>
                    </div>

                    <button type="submit" className="nimo-submit-btn">
                      Complete Registration
                    </button>
                  </form>

                  <div className="nimo-card-footer">
                    <button
                      type="button"
                      className="nimo-back-link"
                      onClick={() => setSignupStep(3)}
                    >
                      &larr; Back to ID upload
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 5: REGISTRATION SUCCESS */}
              {signupStep === 5 && (
                <div className="success-view">
                  <div className="success-icon-badge">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>

                  <h1 className="card-title">Welcome to nimo</h1>
                  <p className="card-subtitle">Registration successfully completed</p>

                  <p className="nimo-sentence" style={{ textAlign: "center" }}>
                    Your student profile for <strong>{fullName}</strong> (Roll: {rollNumber}) has been submitted and verified.
                  </p>

                  <button
                    type="button"
                    className="nimo-submit-btn"
                    onClick={() => {
                      router.push("/dashboard");
                    }}
                  >
                    Enter Campus Feed →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Support Dialog Modal */}
      {supportOpen && (
        <div className="nimo-modal-backdrop" onClick={() => setSupportOpen(false)}>
          <div className="nimo-modal" onClick={(e) => e.stopPropagation()}>
            <div className="card-heading-group">
              <h2 className="card-title" style={{ fontSize: "1.3rem" }}>nimo Support</h2>
              <p className="card-subtitle">We are here to assist with your university onboarding</p>
            </div>
            <p className="nimo-sentence">
              For any help with mobile verification, roll number authentication, or ID document review, please reach out to our dedicated campus helpdesk at:
            </p>
            <p className="support-email">support@nimo.edu</p>
            <button
              type="button"
              className="nimo-submit-btn"
              onClick={() => setSupportOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
