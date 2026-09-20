"use client";

import React, { useState } from "react";

interface SignUpFlowProps {
  onSwitchToSignIn: () => void;
}

export default function SignUpFlow({ onSwitchToSignIn }: SignUpFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Mobile verification state
  const [mobileNumber, setMobileNumber] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const [otpDemoHint, setOtpDemoHint] = useState("");

  // Step 2: University Details state
  const [rollNumber, setRollNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [department, setDepartment] = useState("");
  const [academicYear, setAcademicYear] = useState("");

  // Step 3: University ID Upload state
  const [idFile, setIdFile] = useState<File | null>(null);
  const [idPreviewUrl, setIdPreviewUrl] = useState<string | null>(null);

  // Step 4: Password & confirmation
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Feedback states
  const [statusMessage, setStatusMessage] = useState<{
    type: "error" | "success" | "info";
    text: string;
  } | null>(null);

  // Step 1 handlers
  const handleSendOtp = () => {
    setStatusMessage(null);
    const cleaned = mobileNumber.replace(/\D/g, "");
    if (cleaned.length < 10) {
      setStatusMessage({
        type: "error",
        text: "Please enter a valid mobile phone number containing at least ten digits.",
      });
      return;
    }

    setIsOtpSent(true);
    setOtpDemoHint("123456");
    setStatusMessage({
      type: "info",
      text: `A six-digit verification code has been dispatched to your mobile number +${cleaned}. (For demonstration purposes, please use the code 123456).`,
    });
  };

  const handleVerifyOtp = () => {
    setStatusMessage(null);
    if (!otpCode.trim()) {
      setStatusMessage({
        type: "error",
        text: "Please enter the six-digit verification code sent to your mobile phone.",
      });
      return;
    }

    if (otpCode.trim() !== "123456" && otpCode.trim().length !== 6) {
      setStatusMessage({
        type: "error",
        text: "The verification code you entered is invalid. Please enter 123456 to continue.",
      });
      return;
    }

    setIsMobileVerified(true);
    setStatusMessage({
      type: "success",
      text: "Your mobile phone number has been verified successfully. You may now continue to the university details step.",
    });
  };

  // Step 2 navigation handler
  const handleProceedToIdUpload = () => {
    setStatusMessage(null);
    if (!rollNumber.trim()) {
      setStatusMessage({
        type: "error",
        text: "Please provide your official university roll number before proceeding to the next step.",
      });
      return;
    }
    if (!fullName.trim()) {
      setStatusMessage({
        type: "error",
        text: "Please enter your full legal student name as registered in the university database.",
      });
      return;
    }
    if (!department.trim()) {
      setStatusMessage({
        type: "error",
        text: "Please state your academic department or program of study.",
      });
      return;
    }

    setCurrentStep(3);
  };

  // Step 3 file handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatusMessage(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setStatusMessage({
        type: "error",
        text: "The chosen file is too large. Please select a document or photograph that is under 5 megabytes.",
      });
      return;
    }

    setIdFile(file);

    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setIdPreviewUrl(url);
    } else {
      setIdPreviewUrl(null);
    }

    setStatusMessage({
      type: "success",
      text: `File "${file.name}" has been selected successfully.`,
    });
  };

  const handleProceedToPassword = () => {
    setStatusMessage(null);
    if (!idFile) {
      setStatusMessage({
        type: "error",
        text: "Please upload an image or scanned copy of your official university identity card to continue.",
      });
      return;
    }
    setCurrentStep(4);
  };

  // Step 4 registration submission
  const handleCompleteRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (password.length < 8) {
      setStatusMessage({
        type: "error",
        text: "Your password must be at least eight characters long for account security.",
      });
      return;
    }
    if (password !== confirmPassword) {
      setStatusMessage({
        type: "error",
        text: "The passwords you entered do not match. Please ensure both fields are identical.",
      });
      return;
    }

    setCurrentStep(5);
  };

  return (
    <div className="auth-card">
      <header className="auth-header">
        <h2 className="auth-title">Student Registration Portal</h2>
        <p className="auth-description">
          Please complete each required verification step to establish your
          official university student profile.
        </p>

        {currentStep <= 4 && (
          <div
            className="step-indicator"
            aria-label="Registration Progress Indicator"
          >
            <div className={`step-item ${currentStep >= 1 ? "active" : ""}`}>
              <span className="step-number">1</span>
              <span className="step-label">Mobile</span>
            </div>
            <div className="step-line" />
            <div className={`step-item ${currentStep >= 2 ? "active" : ""}`}>
              <span className="step-number">2</span>
              <span className="step-label">Roll No</span>
            </div>
            <div className="step-line" />
            <div className={`step-item ${currentStep >= 3 ? "active" : ""}`}>
              <span className="step-number">3</span>
              <span className="step-label">Upload ID</span>
            </div>
            <div className="step-line" />
            <div className={`step-item ${currentStep >= 4 ? "active" : ""}`}>
              <span className="step-number">4</span>
              <span className="step-label">Password</span>
            </div>
          </div>
        )}
      </header>

      {statusMessage && (
        <div
          className={`alert alert-${statusMessage.type}`}
          role={statusMessage.type === "error" ? "alert" : "status"}
        >
          {statusMessage.text}
        </div>
      )}

      {/* STEP 1: MOBILE VERIFICATION */}
      {currentStep === 1 && (
        <section className="step-content">
          <h3 className="step-heading">
            Step 1: Mobile Phone Number Verification
          </h3>
          <p className="step-sentence">
            Please enter your primary mobile phone number below so that we can
            deliver a secure one-time verification code to you.
          </p>

          <div className="form-group">
            <label htmlFor="signup-mobile" className="form-label">
              Primary Mobile Phone Number
            </label>
            <div className="input-with-button">
              <input
                id="signup-mobile"
                type="tel"
                className="form-input"
                placeholder="Enter your 10-digit mobile number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                disabled={isMobileVerified}
              />
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleSendOtp}
                disabled={isMobileVerified || !mobileNumber.trim()}
              >
                {isOtpSent ? "Resend Code" : "Send Code"}
              </button>
            </div>
            <span className="form-hint">
              We require an active mobile phone number to authenticate your identity.
            </span>
          </div>

          {isOtpSent && !isMobileVerified && (
            <div className="form-group otp-group">
              <label htmlFor="signup-otp" className="form-label">
                One-Time Verification Code
              </label>
              <div className="input-with-button">
                <input
                  id="signup-otp"
                  type="text"
                  maxLength={6}
                  className="form-input"
                  placeholder="Enter 6-digit code (e.g. 123456)"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleVerifyOtp}
                >
                  Verify Code
                </button>
              </div>
              <span className="form-hint">
                Please enter the six-digit code that was delivered to your mobile device.
              </span>
            </div>
          )}

          {isMobileVerified && (
            <div className="verification-badge">
              <p className="step-sentence text-success">
                ✓ Your mobile phone number has been successfully verified.
              </p>
              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={() => {
                  setStatusMessage(null);
                  setCurrentStep(2);
                }}
              >
                Continue to University Details
              </button>
            </div>
          )}
        </section>
      )}

      {/* STEP 2: UNIVERSITY ROLL NUMBER & DETAILS */}
      {currentStep === 2 && (
        <section className="step-content">
          <h3 className="step-heading">
            Step 2: University Roll Number and Academic Information
          </h3>
          <p className="step-sentence">
            Please enter your official university roll number and student details so we
            can associate this account with your formal university enrollment records.
          </p>

          <div className="form-group">
            <label htmlFor="signup-roll" className="form-label">
              Official University Roll Number
            </label>
            <input
              id="signup-roll"
              type="text"
              className="form-input"
              placeholder="e.g. 2024-CS-0412"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              required
            />
            <span className="form-hint">
              Your roll number is printed on your official university admission documents.
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="signup-fullname" className="form-label">
              Full Legal Student Name
            </label>
            <input
              id="signup-fullname"
              type="text"
              className="form-input"
              placeholder="e.g. Karan Sharma"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <span className="form-hint">
              This name must match the name recorded in official academic documentation.
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="signup-department" className="form-label">
              Academic Department or Program of Study
            </label>
            <input
              id="signup-department"
              type="text"
              className="form-input"
              placeholder="e.g. Computer Science and Engineering"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
            <span className="form-hint">
              Please write the complete title of your university degree or department.
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="signup-year" className="form-label">
              Current Academic Year
            </label>
            <select
              id="signup-year"
              className="form-input"
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
            >
              <option value="">Please select your academic year</option>
              <option value="First Year">First Year (Freshman)</option>
              <option value="Second Year">Second Year (Sophomore)</option>
              <option value="Third Year">Third Year (Junior)</option>
              <option value="Fourth Year">Fourth Year (Senior)</option>
              <option value="Postgraduate">Postgraduate / Masters Program</option>
            </select>
            <span className="form-hint">
              Indicate the current academic year in which you are actively enrolled.
            </span>
          </div>

          <div className="button-group">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setStatusMessage(null);
                setCurrentStep(1);
              }}
            >
              Back to Mobile Verification
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleProceedToIdUpload}
            >
              Continue to ID Card Upload
            </button>
          </div>
        </section>
      )}

      {/* STEP 3: UNIVERSITY ID CARD UPLOAD */}
      {currentStep === 3 && (
        <section className="step-content">
          <h3 className="step-heading">
            Step 3: Upload Official University Student Identity Card
          </h3>
          <p className="step-sentence">
            Please upload a clear photograph or scanned copy of your official
            University Student Identity Card so our administration can confirm
            your enrollment status.
          </p>

          <div className="form-group">
            <label htmlFor="signup-idfile" className="form-label">
              Choose Identity Document File
            </label>
            <input
              id="signup-idfile"
              type="file"
              className="form-input-file"
              accept="image/png, image/jpeg, image/jpg, application/pdf"
              onChange={handleFileChange}
            />
            <span className="form-hint">
              Supported file formats include JPG, PNG, and PDF up to a maximum size of five megabytes.
            </span>
          </div>

          {idFile && (
            <div className="file-preview-container">
              <p className="step-sentence">
                <strong>Selected Document:</strong> {idFile.name} (
                {(idFile.size / 1024).toFixed(1)} KB)
              </p>
              {idPreviewUrl ? (
                <div className="preview-image-wrapper">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={idPreviewUrl}
                    alt="University Student ID Card Preview"
                    className="preview-image"
                  />
                </div>
              ) : (
                <div className="preview-doc-wrapper">
                  <p className="step-sentence">
                    A PDF document has been attached and is ready for upload.
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="info-box">
            <p className="step-sentence">
              Please make sure that your student portrait photograph, full student name,
              and university roll number are legible and uncropped.
            </p>
          </div>

          <div className="button-group">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setStatusMessage(null);
                setCurrentStep(2);
              }}
            >
              Back to University Details
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleProceedToPassword}
            >
              Continue to Account Password
            </button>
          </div>
        </section>
      )}

      {/* STEP 4: PASSWORD & REGISTRATION COMPLETION */}
      {currentStep === 4 && (
        <form onSubmit={handleCompleteRegistration} className="step-content">
          <h3 className="step-heading">
            Step 4: Create Account Password
          </h3>
          <p className="step-sentence">
            Please choose a strong password to safeguard your university student
            account and finalize your registration.
          </p>

          <div className="form-group">
            <label htmlFor="signup-password" className="form-label">
              Create Account Password
            </label>
            <input
              id="signup-password"
              type="password"
              className="form-input"
              placeholder="Enter a secure password (minimum 8 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="form-hint">
              Use a mix of letters, numbers, and special symbols to ensure maximum security.
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="signup-confirmpassword" className="form-label">
              Confirm Account Password
            </label>
            <input
              id="signup-confirmpassword"
              type="password"
              className="form-input"
              placeholder="Re-type your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span className="form-hint">
              Re-enter your chosen password to guarantee accuracy.
            </span>
          </div>

          <div className="review-summary">
            <h4 className="summary-title">Registration Summary:</h4>
            <p className="summary-item">
              <strong>Verified Mobile Number:</strong> {mobileNumber}
            </p>
            <p className="summary-item">
              <strong>University Roll Number:</strong> {rollNumber}
            </p>
            <p className="summary-item">
              <strong>Full Student Name:</strong> {fullName}
            </p>
            <p className="summary-item">
              <strong>University ID Card Document:</strong>{" "}
              {idFile ? idFile.name : "None selected"}
            </p>
          </div>

          <div className="button-group">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setStatusMessage(null);
                setCurrentStep(3);
              }}
            >
              Back to ID Upload
            </button>
            <button type="submit" className="btn btn-primary">
              Submit Complete Registration
            </button>
          </div>
        </form>
      )}

      {/* STEP 5: REGISTRATION SUCCESS */}
      {currentStep === 5 && (
        <section className="step-content success-step">
          <div className="success-icon-badge">✓</div>
          <h3 className="step-heading">Registration Submitted Successfully!</h3>
          <p className="step-sentence">
            Your university student registration has been recorded successfully.
            Your mobile phone number has been verified, your official roll number
            has been linked, and your university identity card has been received
            for review.
          </p>

          <div className="review-summary">
            <p className="summary-item">
              <strong>Student Name:</strong> {fullName}
            </p>
            <p className="summary-item">
              <strong>University Roll Number:</strong> {rollNumber}
            </p>
            <p className="summary-item">
              <strong>Verified Mobile Number:</strong> {mobileNumber}
            </p>
            <p className="summary-item">
              <strong>Department:</strong> {department}
            </p>
            <p className="summary-item">
              <strong>Attached Identity Document:</strong> {idFile?.name}
            </p>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={onSwitchToSignIn}
            >
              Proceed to Sign In Page
            </button>
          </div>
        </section>
      )}

      {currentStep <= 4 && (
        <footer className="auth-footer">
          <p>
            Already possess a registered student account?{" "}
            <button
              type="button"
              className="link-button"
              onClick={onSwitchToSignIn}
            >
              Click here to sign in with your username and password
            </button>
          </p>
        </footer>
      )}
    </div>
  );
}
