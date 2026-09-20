"use client";

import React, { useState } from "react";

interface SignInFormProps {
  onSwitchToSignUp: () => void;
}

export default function SignInForm({ onSwitchToSignUp }: SignInFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!username.trim()) {
      setError("Please enter your registered username or roll number.");
      return;
    }
    if (!password) {
      setError("Please enter your account password.");
      return;
    }

    setIsLoading(true);

    // Simulate login authentication
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage(
        `Welcome back, ${username}! You have successfully signed into your account.`
      );
    }, 600);
  };

  return (
    <div className="auth-card">
      <header className="auth-header">
        <h2 className="auth-title">Sign In to Your Account</h2>
        <p className="auth-description">
          Please enter your official username and password to securely access
          your university portal.
        </p>
      </header>

      {error && (
        <div className="alert alert-error" role="alert">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="auth-form" noValidate>
        <div className="form-group">
          <label htmlFor="signin-username" className="form-label">
            Username or University Roll Number
          </label>
          <input
            id="signin-username"
            type="text"
            className="form-input"
            placeholder="e.g. 2024-CS-0104 or karan_sharma"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
            autoComplete="username"
            required
          />
          <span className="form-hint">
            You can sign in using your registered username or official roll
            number.
          </span>
        </div>

        <div className="form-group">
          <label htmlFor="signin-password" className="form-label">
            Account Password
          </label>
          <input
            id="signin-password"
            type="password"
            className="form-input"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            autoComplete="current-password"
            required
          />
          <span className="form-hint">
            Enter the password you created during registration.
          </span>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </div>
      </form>

      <footer className="auth-footer">
        <p>
          Do not have an account yet?{" "}
          <button
            type="button"
            className="link-button"
            onClick={onSwitchToSignUp}
          >
            Create a new account with mobile verification
          </button>
        </p>
      </footer>
    </div>
  );
}
