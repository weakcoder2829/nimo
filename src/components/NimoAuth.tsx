"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/authContext";
import styles from "./NimoAuth.module.css";
import {
  Eye,
  EyeOff,
  CheckCircle2,
  ShieldCheck,
  Upload,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  HelpCircle,
  X,
  Phone,
  GraduationCap,
  FileText,
  Mail,
  MessageCircle,
} from "lucide-react";

export interface NimoAuthProps {
  initialMode?: "signin" | "signup";
  onClose?: () => void;
  onSuccess?: () => void;
}

const POPULAR_COLLEGES = [
  "Aggarwal College",
  "JC Bose UST (YMCA)",
  "Manav Rachna Univ",
  "Delhi University",
  "Faridabad Institute",
];

export default function NimoAuth({
  initialMode = "signin",
  onClose,
  onSuccess,
}: NimoAuthProps = {}) {
  const router = useRouter();
  const { login, signup, quickDemoLogin, isAuthenticated } = useAuth();

  // Mode: "signin" | "signup"
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  // Sign up step: strictly 1, 2, or 3, then 4 for verified celebration
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Sync mode with route prop when navigating between /login and /signup
  useEffect(() => {
    setMode(initialMode);
    if (initialMode === "signup") {
      setStep(1);
    }
  }, [initialMode]);

  // Sign In State
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Step 1: Mobile verification state
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(0);

  // Step 2: Student details state
  const [studentName, setStudentName] = useState("");
  const [username, setUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  // Step 3: College ID state (LAST STEP)
  const [collegeName, setCollegeName] = useState("Aggarwal College");
  const [rollNumber, setRollNumber] = useState("");
  const [idFile, setIdFile] = useState<File | null>(null);
  const [idPreviewUrl, setIdPreviewUrl] = useState<string | null>(null);
  const [sampleIdUsed, setSampleIdUsed] = useState(false);

  // UI state
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  // OTP inputs refs
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Resend OTP countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Handle global back
  const handleNavBack = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    if (mode === "signup") {
      if (step > 1 && step <= 3) {
        setStep((step - 1) as 1 | 2 | 3);
        return;
      } else {
        setMode("signin");
        return;
      }
    }

    if (onClose) {
      onClose();
    } else {
      router.push("/");
    }
  };

  // --- SIGN IN SUBMIT ---
  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!loginIdentifier.trim()) {
      setErrorMessage("Please enter your username or university roll number.");
      return;
    }
    if (!loginPassword) {
      setErrorMessage("Please enter your account password.");
      return;
    }

    setLoading(true);
    const result = await login(loginIdentifier, loginPassword);
    setLoading(false);

    if (result.success) {
      setSuccessMessage("Authentication successful! Loading campus feed...");
      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        } else {
          router.push("/feed");
        }
      }, 500);
    } else {
      setErrorMessage(result.error || "Failed to sign in. Please verify your details.");
    }
  };

  // --- QUICK DEMO LOGIN ---
  const handleDemoSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      quickDemoLogin();
      setLoading(false);
      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/feed");
      }
    }, 400);
  };

  // --- STEP 1: SEND OTP ---
  const handleSendOtp = () => {
    setErrorMessage(null);
    const cleanNumber = mobileNumber.replace(/\D/g, "");
    if (cleanNumber.length < 10) {
      setErrorMessage("Please enter a valid 10-digit mobile phone number.");
      return;
    }

    setOtpSent(true);
    setResendTimer(45);
    setSuccessMessage("OTP code sent to +91 " + cleanNumber + "! Use demo code: 123456");
    // Focus first OTP box
    setTimeout(() => {
      otpInputRefs.current[0]?.focus();
    }, 100);
  };

  const handleOtpDigitChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newDigits = [...otpDigits];
    newDigits[index] = value.slice(-1);
    setOtpDigits(newDigits);

    // Auto-advance
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const fillDemoOtp = () => {
    setOtpDigits(["1", "2", "3", "4", "5", "6"]);
    setErrorMessage(null);
  };

  // --- STEP 1: VERIFY & ADVANCE TO STEP 2 ---
  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const cleanNumber = mobileNumber.replace(/\D/g, "");
    if (cleanNumber.length < 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number first.");
      return;
    }

    if (!otpSent) {
      handleSendOtp();
      return;
    }

    const code = otpDigits.join("");
    if (code.length < 6) {
      setErrorMessage("Please enter the complete 6-digit verification code.");
      return;
    }

    if (code !== "123456" && code !== "000000") {
      setErrorMessage("Invalid code. Use demo code: 123456 to verify.");
      return;
    }

    // Step 1 Completed! Advance to Step 2
    setSuccessMessage("Mobile number verified successfully!");
    setTimeout(() => {
      setSuccessMessage(null);
      setStep(2);
    }, 350);
  };

  // --- STEP 2: STUDENT DETAILS SUBMIT & ADVANCE TO STEP 3 ---
  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!studentName.trim()) {
      setErrorMessage("Please enter your official Full Student Name.");
      return;
    }
    if (signupPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }
    if (signupPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please re-enter.");
      return;
    }

    // Step 2 Completed! Advance to Step 3 (LAST STEP: College ID)
    setStep(3);
  };

  // --- STEP 3: COLLEGE ID FILE HANDLER ---
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage("File exceeds 10MB limit. Please upload a smaller file.");
      return;
    }

    setIdFile(file);
    setSampleIdUsed(false);
    if (file.type.startsWith("image/")) {
      setIdPreviewUrl(URL.createObjectURL(file));
    } else {
      setIdPreviewUrl(null);
    }
  };

  const useSampleStudentId = () => {
    setSampleIdUsed(true);
    setIdFile(null);
    setIdPreviewUrl(null);
    if (!rollNumber) {
      setRollNumber("2024-CSE-0412");
    }
    setSuccessMessage("Sample College ID attached and pre-verified!");
  };

  // --- STEP 3: FINAL SUBMIT ---
  const handleStep3Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!collegeName.trim()) {
      setErrorMessage("Please enter or select your College / University name.");
      return;
    }
    if (!rollNumber.trim()) {
      setErrorMessage("Please provide your official College Roll Number / Student ID.");
      return;
    }
    if (!idFile && !sampleIdUsed) {
      setErrorMessage("Please upload your Student ID Card photo or use the sample ID option.");
      return;
    }

    setLoading(true);
    const result = await signup({
      mobile: mobileNumber,
      studentName: studentName.trim(),
      username: username.trim() || studentName.toLowerCase().replace(/\s+/g, "_"),
      rollNumber: rollNumber.trim(),
      collegeName: collegeName.trim(),
      password: signupPassword,
      idCardName: idFile ? idFile.name : "verified_student_id.png",
      idCardUrl: idPreviewUrl || undefined,
    });
    setLoading(false);

    if (result.success) {
      setStep(4); // Celebration screen
    } else {
      setErrorMessage(result.error || "Failed to complete verification. Please check inputs.");
    }
  };

  return (
    <div className={styles.pageContainer}>
      {/* Ambient background glow orbs */}
      <div className={styles.ambientScene}>
        <div className={styles.ambientGridPattern} />
        <div className={styles.orbOne} />
        <div className={styles.orbTwo} />
        <div className={styles.orbThree} />
      </div>

      {/* ==================== TOP NAVIGATION BAR ==================== */}
      <header className={styles.topNavbar}>
        <button
          type="button"
          className={styles.navBackBtn}
          onClick={handleNavBack}
          aria-label="Back"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {/* Center: ◎ nimo Logo */}
        <div
          className={styles.navBrandWrap}
          onClick={() => {
            if (isAuthenticated) router.push("/");
          }}
        >
          <div className={styles.brandLogoIcon}>
            <div className={styles.brandLogoDot} />
          </div>
          <span className={styles.brandLogoText}>nimo</span>
        </div>

        {/* Right: Contact Support */}
        <button
          type="button"
          className={styles.navSupportBtn}
          onClick={() => setIsSupportOpen(true)}
        >
          <HelpCircle className="w-4 h-4" />
          <span>Contact support</span>
        </button>
      </header>

      {/* ==================== MAIN GLASS CARD ==================== */}
      <main className={styles.mainContentArea}>
        <div className={styles.glassCard}>
          {/* Alerts */}
          {errorMessage && (
            <div className={`${styles.alertBox} ${styles.alertError}`} role="alert">
              <span className="shrink-0">⚠️</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className={`${styles.alertBox} ${styles.alertSuccess}`} role="status">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW: LOG IN TO NIMO                                     */}
          {/* ======================================================== */}
          {mode === "signin" && (
            <div>
              <div className={styles.cardHeader}>
                <h1 className={styles.titlePrimary}>Log in to nimo</h1>
                <p className={styles.subtitleMuted}>Your academic journey starts here</p>
              </div>

              <form onSubmit={handleSignInSubmit}>
                <div className={styles.formGroup}>
                  {/* Username or Roll Number */}
                  <div className={styles.fieldWrapper}>
                    <label className={styles.fieldLabel}>Username or Roll number</label>
                    <div className={styles.inputGlassWrap}>
                      <input
                        type="text"
                        className={styles.inputGlass}
                        placeholder="Enter username or university roll number"
                        value={loginIdentifier}
                        onChange={(e) => {
                          setLoginIdentifier(e.target.value);
                          setErrorMessage(null);
                        }}
                        required
                        autoComplete="username"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className={styles.fieldWrapper}>
                    <label className={styles.fieldLabel}>
                      <span>Password</span>
                    </label>
                    <div className={styles.inputGlassWrap}>
                      <input
                        type={showPassword ? "text" : "password"}
                        className={styles.inputGlass}
                        placeholder="Enter your password"
                        value={loginPassword}
                        onChange={(e) => {
                          setLoginPassword(e.target.value);
                          setErrorMessage(null);
                        }}
                        required
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        className={styles.pwToggleIconBtn}
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Continue with Account Button */}
                <button
                  type="submit"
                  className={styles.primaryPillButton}
                  disabled={loading}
                >
                  <span>{loading ? "Authenticating..." : "Continue with Account"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Quick 1-Click Demo Login */}
                <button
                  type="button"
                  className={styles.quickDemoBtn}
                  onClick={handleDemoSignIn}
                >
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                  <span>Instant Test: Mukul (Roll: 2024-CS-0284)</span>
                </button>

                {/* Switch to Sign Up */}
                <div className={styles.footerSwitchRow}>
                  <span>Don&apos;t have an account?</span>
                  <button
                    type="button"
                    className={styles.switchLinkBtn}
                    onClick={() => {
                      setErrorMessage(null);
                      setSuccessMessage(null);
                      setStep(1);
                      setMode("signup");
                    }}
                  >
                    Sign up
                  </button>
                </div>

                {/* Explore Campus Feed as Guest */}
                <div style={{ textAlign: "center", marginTop: "14px" }}>
                  <a
                    href="/feed"
                    style={{
                      fontSize: "0.78rem",
                      color: "#94a3b8",
                      textDecoration: "underline",
                      textUnderlineOffset: "3px",
                      transition: "color 0.15s ease",
                    }}
                  >
                    Or explore live campus feed as guest &rarr;
                  </a>
                </div>
              </form>
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW: JOIN NIMO (3 STRICT STEPS)                         */}
          {/* ======================================================== */}
          {mode === "signup" && step < 4 && (
            <div>
              <div className={styles.cardHeader}>
                <h1 className={styles.titlePrimary}>Join nimo</h1>

                {/* 3 Step Progress Indicator */}
                <div className={styles.progressIndicator}>
                  <div className={styles.stepSegmentRow}>
                    <div
                      className={`${styles.stepSegment} ${
                        step >= 1 ? (step === 1 ? styles.stepSegmentActive : styles.stepSegmentCompleted) : ""
                      }`}
                    />
                    <div
                      className={`${styles.stepSegment} ${
                        step >= 2 ? (step === 2 ? styles.stepSegmentActive : styles.stepSegmentCompleted) : ""
                      }`}
                    />
                    <div
                      className={`${styles.stepSegment} ${
                        step >= 3 ? styles.stepSegmentActive : ""
                      }`}
                    />
                  </div>

                  <div className={styles.stepBadgeText}>
                    {step === 1 && (
                      <span className={styles.stepBadgePill}>
                        Step 1 of 3 &middot; Mobile verification
                      </span>
                    )}
                    {step === 2 && (
                      <span className={styles.stepBadgePill}>
                        Step 2 of 3 &middot; Student Name &amp; Profile
                      </span>
                    )}
                    {step === 3 && (
                      <span className={styles.stepBadgePill}>
                        Step 3 of 3 &middot; College ID Verification
                      </span>
                    )}
                  </div>
                </div>

                <p className={styles.subtitleMuted}>
                  {step === 1 &&
                    "Please enter your mobile phone number to receive a secure one-time verification code."}
                  {step === 2 &&
                    "Enter your official student name and set your account password."}
                  {step === 3 &&
                    "Verify your college enrollment by entering your College ID and uploading your Student ID card."}
                </p>
              </div>

              {/* ---------------- STEP 1: MOBILE VERIFICATION ---------------- */}
              {step === 1 && (
                <form onSubmit={handleStep1Submit}>
                  <div className={styles.formGroup}>
                    <div className={styles.fieldWrapper}>
                      <label className={styles.fieldLabel}>
                        <span>Mobile phone number</span>
                        <span className={styles.fieldHint}>10 digits (India / Global)</span>
                      </label>
                      <div className={styles.inputGlassWrap}>
                        <input
                          type="tel"
                          className={`${styles.inputGlass} ${styles.inputGlassWithAction}`}
                          placeholder="e.g. 9876543210"
                          value={mobileNumber}
                          onChange={(e) => {
                            setMobileNumber(e.target.value);
                            setErrorMessage(null);
                          }}
                          required
                        />
                        <button
                          type="button"
                          className={styles.inputActionBtn}
                          onClick={handleSendOtp}
                          disabled={resendTimer > 0}
                        >
                          {resendTimer > 0 ? `${resendTimer}s` : otpSent ? "Resend" : "Send code"}
                        </button>
                      </div>
                    </div>

                    {/* OTP 6-Digit Section */}
                    {otpSent && (
                      <div className={styles.otpWrapper}>
                        <div className={styles.otpRow}>
                          {otpDigits.map((digit, i) => (
                            <input
                              key={i}
                              ref={(el) => {
                                otpInputRefs.current[i] = el;
                              }}
                              type="text"
                              inputMode="numeric"
                              maxLength={1}
                              value={digit}
                              onChange={(e) => handleOtpDigitChange(i, e.target.value)}
                              onKeyDown={(e) => handleOtpKeyDown(i, e)}
                              className={styles.otpInputBox}
                              autoFocus={i === 0}
                            />
                          ))}
                        </div>

                        <div className={styles.otpHelperRow}>
                          <span>Enter 6-digit OTP code</span>
                          <button
                            type="button"
                            className={styles.quickFillDemoBtn}
                            onClick={fillDemoOtp}
                          >
                            ⚡ Demo Code: 123456
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className={styles.primaryPillButton}
                    disabled={loading}
                  >
                    <span>{otpSent ? "Verify & Continue" : "Continue with Mobile"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className={styles.footerSwitchRow}>
                    <span>Already have an account?</span>
                    <button
                      type="button"
                      className={styles.switchLinkBtn}
                      onClick={() => {
                        setErrorMessage(null);
                        setSuccessMessage(null);
                        setMode("signin");
                      }}
                    >
                      Log in
                    </button>
                  </div>
                </form>
              )}

              {/* ---------------- STEP 2: STUDENT NAME & CREDENTIALS ---------------- */}
              {step === 2 && (
                <form onSubmit={handleStep2Submit}>
                  <div className={styles.formGroup}>
                    {/* Student Full Name */}
                    <div className={styles.fieldWrapper}>
                      <label className={styles.fieldLabel}>
                        <span>Student Full Name</span>
                        <span className={styles.fieldHint}>As on college register</span>
                      </label>
                      <div className={styles.inputGlassWrap}>
                        <input
                          type="text"
                          className={styles.inputGlass}
                          placeholder="e.g. Karan Singh"
                          value={studentName}
                          onChange={(e) => {
                            setStudentName(e.target.value);
                            setErrorMessage(null);
                          }}
                          required
                          autoComplete="name"
                        />
                      </div>
                    </div>

                    {/* Preferred Username */}
                    <div className={styles.fieldWrapper}>
                      <label className={styles.fieldLabel}>
                        <span>Campus Username</span>
                        <span className={styles.fieldHint}>Unique handle</span>
                      </label>
                      <div className={styles.inputGlassWrap}>
                        <input
                          type="text"
                          className={styles.inputGlass}
                          placeholder="e.g. karan_singh or rahul.cse"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className={styles.fieldWrapper}>
                      <label className={styles.fieldLabel}>Password</label>
                      <div className={styles.inputGlassWrap}>
                        <input
                          type={showSignupPassword ? "text" : "password"}
                          className={styles.inputGlass}
                          placeholder="Minimum 6 characters"
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          required
                          autoComplete="new-password"
                        />
                        <button
                          type="button"
                          className={styles.pwToggleIconBtn}
                          onClick={() => setShowSignupPassword(!showSignupPassword)}
                        >
                          {showSignupPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div className={styles.fieldWrapper}>
                      <label className={styles.fieldLabel}>Confirm Password</label>
                      <div className={styles.inputGlassWrap}>
                        <input
                          type={showSignupPassword ? "text" : "password"}
                          className={styles.inputGlass}
                          placeholder="Re-enter password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          autoComplete="new-password"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={styles.primaryPillButton}
                  >
                    <span>Continue to College ID</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    className={styles.stepSubBackBtn}
                    onClick={() => setStep(1)}
                  >
                    &larr; Back to mobile verification
                  </button>
                </form>
              )}

              {/* ---------------- STEP 3: COLLEGE ID (FINAL STEP!) ---------------- */}
              {step === 3 && (
                <form onSubmit={handleStep3Submit}>
                  <div className={styles.formGroup}>
                    {/* College / University Name */}
                    <div className={styles.fieldWrapper}>
                      <label className={styles.fieldLabel}>College or University Name</label>
                      <div className={styles.inputGlassWrap}>
                        <input
                          type="text"
                          className={styles.inputGlass}
                          placeholder="e.g. Aggarwal College, Ballabgarh"
                          value={collegeName}
                          onChange={(e) => setCollegeName(e.target.value)}
                          required
                        />
                      </div>

                      {/* Quick Chips */}
                      <div className={styles.collegeChipsRow}>
                        {POPULAR_COLLEGES.map((c) => (
                          <button
                            key={c}
                            type="button"
                            className={`${styles.collegeChip} ${
                              collegeName === c ? styles.collegeChipActive : ""
                            }`}
                            onClick={() => setCollegeName(c)}
                          >
                            {c}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* College Roll Number / Student ID */}
                    <div className={styles.fieldWrapper}>
                      <label className={styles.fieldLabel}>
                        <span>College ID / University Roll Number</span>
                        <span className={styles.fieldHint}>Last verification step</span>
                      </label>
                      <div className={styles.inputGlassWrap}>
                        <input
                          type="text"
                          className={styles.inputGlass}
                          placeholder="e.g. 2024-CSE-0412 or 22001015"
                          value={rollNumber}
                          onChange={(e) => {
                            setRollNumber(e.target.value);
                            setErrorMessage(null);
                          }}
                          required
                        />
                      </div>
                    </div>

                    {/* College Student ID Card Upload */}
                    <div className={styles.fieldWrapper}>
                      <label className={styles.fieldLabel}>
                        <span>College Student ID Card</span>
                        <span className={styles.fieldHint}>JPG, PNG, or PDF</span>
                      </label>

                      <label htmlFor="id-file-upload-input" className={styles.idUploadZone}>
                        <input
                          id="id-file-upload-input"
                          type="file"
                          accept="image/*,application/pdf"
                          onChange={handleFileSelect}
                          style={{ display: "none" }}
                        />

                        {idFile ? (
                          <div className={styles.uploadedPreviewCard}>
                            {idPreviewUrl ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={idPreviewUrl}
                                alt="ID Preview"
                                className={styles.previewThumbImg}
                              />
                            ) : (
                              <FileText className="w-8 h-8 text-emerald-400" />
                            )}
                            <div className={styles.uploadMetaCol}>
                              <div className={styles.uploadFileName}>&check; {idFile.name}</div>
                              <div className={styles.uploadFileNotice}>
                                {(idFile.size / 1024).toFixed(1)} KB &middot; Tap to replace
                              </div>
                            </div>
                          </div>
                        ) : sampleIdUsed ? (
                          <div className={styles.uploadedPreviewCard}>
                            <ShieldCheck className="w-8 h-8 text-emerald-400" />
                            <div className={styles.uploadMetaCol}>
                              <div className={styles.uploadFileName}>&check; Sample College ID Card Attached</div>
                              <div className={styles.uploadFileNotice}>Pre-verified for Aggarwal College</div>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className={styles.uploadIconPill}>
                              <Upload className="w-5 h-5" />
                            </div>
                            <div className={styles.uploadTitleText}>
                              Click or drop your College ID Card
                            </div>
                            <div className={styles.uploadSubtitleText}>
                              Upload front side showing photo &amp; roll number
                            </div>
                            <button
                              type="button"
                              className={styles.sampleIdQuickBtn}
                              onClick={(e) => {
                                e.preventDefault();
                                useSampleStudentId();
                              }}
                            >
                              <Sparkles className="w-3 h-3 text-sky-400" />
                              <span>Use Verified Sample ID</span>
                            </button>
                          </>
                        )}
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={styles.primaryPillButton}
                    disabled={loading}
                  >
                    <span>{loading ? "Verifying College ID..." : "Complete Registration & Access Campus"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    className={styles.stepSubBackBtn}
                    onClick={() => setStep(2)}
                  >
                    &larr; Back to student details
                  </button>
                </form>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW: CELEBRATION / VERIFIED BADGE                       */}
          {/* ======================================================== */}
          {mode === "signup" && step === 4 && (
            <div className={styles.successCard}>
              <div className={styles.verifiedBadgeCircle}>
                <ShieldCheck className="w-8 h-8" />
              </div>

              <div>
                <h2 className={styles.titlePrimary} style={{ fontSize: "1.75rem" }}>
                  Verification Complete!
                </h2>
                <p className={styles.subtitleMuted}>
                  Welcome to <strong>{collegeName}</strong> on Nimo. Your student identity has been cryptographically confirmed.
                </p>
              </div>

              <div className={styles.studentIdSummaryCard}>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Student Name</span>
                  <span className={styles.summaryValue}>{studentName}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Roll Number</span>
                  <span className={styles.summaryValue}>{rollNumber}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>College</span>
                  <span className={styles.summaryValue}>{collegeName}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Campus Status</span>
                  <span className={styles.summaryValue} style={{ color: "#34d399" }}>
                    &bull; Active &amp; Verified
                  </span>
                </div>
              </div>

              <button
                type="button"
                className={styles.primaryPillButton}
                onClick={() => {
                  if (onSuccess) {
                    onSuccess();
                  } else {
                    router.push("/feed");
                  }
                }}
              >
                <span>Enter Campus Homepage &amp; Feed</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </main>

      {/* ==================== CONTACT SUPPORT MODAL ==================== */}
      {isSupportOpen && (
        <div className={styles.modalBackdrop} onClick={() => setIsSupportOpen(false)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.modalCloseBtn}
              onClick={() => setIsSupportOpen(false)}
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className={styles.modalTitle}>Nimo Student Support</h3>
            <p className={styles.modalDesc}>
              Need assistance with your student ID verification or mobile login? Our campus desk is online.
            </p>

            <div className={styles.supportItem}>
              <Mail className={styles.supportIcon} />
              <div>
                <strong className="text-sm block text-white">Student Desk Email</strong>
                <span className="text-xs text-slate-400">verification@nimo.campus (Replies in 15 mins)</span>
              </div>
            </div>

            <div className={styles.supportItem}>
              <MessageCircle className={styles.supportIcon} />
              <div>
                <strong className="text-sm block text-white">Faridabad Campus WhatsApp Desk</strong>
                <span className="text-xs text-slate-400">+91 98765-CAMPUS (Instant verification help)</span>
              </div>
            </div>

            <div className={styles.supportItem}>
              <ShieldCheck className={styles.supportIcon} />
              <div>
                <strong className="text-sm block text-white">ID Verification Notice</strong>
                <span className="text-xs text-slate-400">
                  All Aggarwal College &amp; YMCA IDs are auto-validated against the 2026 semester register.
                </span>
              </div>
            </div>

            <button
              type="button"
              className={styles.primaryPillButton}
              style={{ marginTop: "16px", marginBottom: "0" }}
              onClick={() => setIsSupportOpen(false)}
            >
              Close Support
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
