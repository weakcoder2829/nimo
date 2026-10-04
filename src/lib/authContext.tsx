"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface StudentUser {
  studentName: string;
  rollNumber: string;
  collegeName: string;
  mobile: string;
  username: string;
  idCardName?: string;
  idCardUrl?: string;
  joinedAt: string;
  isVerified: boolean;
}

interface AuthContextType {
  user: StudentUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (identifier: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signup: (data: {
    mobile: string;
    studentName: string;
    username: string;
    rollNumber: string;
    collegeName: string;
    password?: string;
    idCardName?: string;
    idCardUrl?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  quickDemoLogin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "nimo_student_session";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<StudentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Hydrate on initial client load
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.rollNumber) {
          setUser(parsed);
        }
      }
    } catch {
      // ignore JSON parse errors
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (identifier: string, password?: string) => {
    if (!identifier.trim()) {
      return { success: false, error: "Please enter your username or college roll number." };
    }
    if (!password || password.length < 4) {
      return { success: false, error: "Please enter your valid password (min 4 characters)." };
    }

    // Check if we have stored matching profile, or create authenticated student profile
    let studentName = "Student";
    let rollNumber = identifier.trim();
    let college = "Aggarwal College";

    // Handle demo / common inputs
    if (identifier.toLowerCase().includes("karan")) {
      studentName = "Karan Singh";
      rollNumber = identifier.includes("-") ? identifier : "2024-CSE-0412";
    } else if (identifier.toLowerCase().includes("mukul")) {
      studentName = "Mukul Sharma";
      rollNumber = "2024-CS-0284";
    } else if (identifier.includes("-") || /\d/.test(identifier)) {
      studentName = "Verified Scholar";
      rollNumber = identifier;
    } else {
      studentName = identifier.charAt(0).toUpperCase() + identifier.slice(1);
    }

    const authenticatedUser: StudentUser = {
      studentName,
      rollNumber,
      collegeName: college,
      mobile: "+91 98765 43210",
      username: identifier.toLowerCase().replace(/\s+/g, "_"),
      joinedAt: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      isVerified: true,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(authenticatedUser));
    // Set a lightweight cookie so next.js or browser recognizes session
    document.cookie = `nimo_session=active; path=/; max-age=604800; SameSite=Lax`;
    setUser(authenticatedUser);
    return { success: true };
  };

  const signup = async (data: {
    mobile: string;
    studentName: string;
    username: string;
    rollNumber: string;
    collegeName: string;
    password?: string;
    idCardName?: string;
    idCardUrl?: string;
  }) => {
    if (!data.mobile) {
      return { success: false, error: "Mobile number is required." };
    }
    if (!data.studentName) {
      return { success: false, error: "Student name is required." };
    }
    if (!data.rollNumber) {
      return { success: false, error: "College ID / Roll Number is required." };
    }

    const newUser: StudentUser = {
      studentName: data.studentName.trim(),
      rollNumber: data.rollNumber.trim().toUpperCase(),
      collegeName: data.collegeName || "Aggarwal College",
      mobile: data.mobile,
      username: data.username.trim() || data.studentName.toLowerCase().replace(/\s+/g, "_"),
      idCardName: data.idCardName || "student_id_verified.pdf",
      idCardUrl: data.idCardUrl,
      joinedAt: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      isVerified: true,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    document.cookie = `nimo_session=active; path=/; max-age=604800; SameSite=Lax`;
    setUser(newUser);
    return { success: true };
  };

  const quickDemoLogin = () => {
    const demoUser: StudentUser = {
      studentName: "Karan Singh",
      rollNumber: "2024-CSE-0412",
      collegeName: "Aggarwal College",
      mobile: "+91 98765 43210",
      username: "karan_singh",
      joinedAt: "Sep 2026",
      isVerified: true,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUser));
    document.cookie = `nimo_session=active; path=/; max-age=604800; SameSite=Lax`;
    setUser(demoUser);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    document.cookie = `nimo_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        quickDemoLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
