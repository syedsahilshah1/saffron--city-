"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  KeyRound,
  AlertCircle,
  Building2,
  CheckCircle2,
  Clock,
  HelpCircle,
  X,
  Mail,
  RefreshCw,
  Check
} from "lucide-react";

export default function UbaidAdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Lockout State
  const [isLocked, setIsLocked] = useState(false);
  const [lockExpiresAt, setLockExpiresAt] = useState<string | null>(null);
  const [lockCountdown, setLockCountdown] = useState<string>("");

  // Forgot Password Modal State (6-Digit SMTP OTP Flow)
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState("");
  const [forgotError, setForgotError] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetStep, setResetStep] = useState<"request" | "reset">("request");

  // Lockout countdown timer
  useEffect(() => {
    if (!lockExpiresAt) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const expiry = new Date(lockExpiresAt).getTime();
      const remainingMs = expiry - now;

      if (remainingMs <= 0) {
        setIsLocked(false);
        setLockExpiresAt(null);
        setLockCountdown("");
        setErrorMsg("Lockout period ended. You may now attempt to log in.");
        clearInterval(interval);
      } else {
        const mins = Math.floor(remainingMs / (60 * 1000));
        const secs = Math.floor((remainingMs % (60 * 1000)) / 1000);
        setLockCountdown(`${mins}m ${secs < 10 ? "0" : ""}${secs}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lockExpiresAt]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!username.trim()) {
      setErrorMsg("Please enter your administrator username or email.");
      return;
    }

    if (!password.trim()) {
      setErrorMsg("Please enter your secure access password.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        if (typeof window !== "undefined") {
          localStorage.setItem("saffron_admin_auth", "true");
          localStorage.setItem("saffron_session_token", data.token || "");
          localStorage.setItem("saffron_current_user", JSON.stringify(data.user || {}));
          if (rememberMe) {
            localStorage.setItem("saffron_admin_remember", "true");
          }
          window.location.href = "/dashboard";
        }
      } else {
        if (data.locked) {
          setIsLocked(true);
          setLockExpiresAt(data.lockExpiresAt);
          setErrorMsg(data.message || "Account locked due to 3 failed attempts (30-minute lockout).");
        } else {
          setErrorMsg(data.message || "Invalid credentials. Please verify your email and password.");
        }
      }
    } catch (err) {
      setErrorMsg("Network error contacting security service. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickFillSuperAdmin = () => {
    setUsername("ubaidnasir401@gmail.com");
    setPassword("ubaidnasir401@gmail.com");
    setErrorMsg("");
  };

  // Forgot password handler (SMTP 6-Digit OTP Flow)
  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError("");
    setForgotSuccess("");
    setForgotLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "request", email: forgotEmail.trim() }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setForgotSuccess(`6-digit OTP verification code sent to ${forgotEmail.trim()}! Please check your email inbox.`);
        setOtpCode("");
        setResetStep("reset");
      } else {
        setForgotError(data.message || "Could not find an account with this email address.");
      }
    } catch (err) {
      setForgotError("Failed to communicate with authentication service.");
    } finally {
      setForgotLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError("");
    setForgotSuccess("");

    if (!otpCode.trim() || otpCode.trim().length !== 6) {
      setForgotError("Please enter the complete 6-digit OTP verification code sent to your email.");
      return;
    }

    if (newPassword.length < 6) {
      setForgotError("New password must be at least 6 characters long.");
      return;
    }

    if (confirmPassword && newPassword !== confirmPassword) {
      setForgotError("Passwords do not match. Please re-enter.");
      return;
    }

    setForgotLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reset",
          email: forgotEmail.trim(),
          otp: otpCode.trim(),
          newPassword: newPassword.trim(),
        }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setForgotSuccess("Password updated successfully! Please sign in with your new password.");
        setTimeout(() => {
          setShowForgotModal(false);
          setResetStep("request");
          setPassword("");
          setUsername(forgotEmail);
          setNewPassword("");
          setConfirmPassword("");
          setOtpCode("");
          setSuccessMsg("Password reset successfully. Enter your new password to sign in.");
        }, 1200);
      } else {
        setForgotError(data.message || "Failed to reset password. Please check your OTP code.");
      }
    } catch (err) {
      setForgotError("Failed to update password.");
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-slate-100 relative overflow-hidden selection:bg-[#D49E17] selection:text-slate-950">
      {/* Background Decorative Gold Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#D49E17]/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#D49E17]/5 blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 max-w-7xl w-full mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/images/saffron-city-logo.png"
            alt="Saffron City"
            className="h-12 w-auto object-contain brightness-110 drop-shadow-md group-hover:scale-105 transition-transform"
          />
        </Link>
        <Link
          href="/"
          className="text-xs text-slate-400 hover:text-[#D49E17] transition-colors flex items-center gap-1.5"
        >
          <span>&larr; Return to Public Website</span>
        </Link>
      </header>

      {/* Main Login Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Card Container */}
          <div className="relative rounded-3xl bg-white/95 backdrop-blur-xl border border-amber-300/40 p-7 sm:p-9 shadow-[0_20px_60px_rgba(0,0,0,0.5)] text-slate-900 overflow-hidden">
            {/* Top Gold Border Accent */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-600 via-[#D49E17] to-amber-400" />

            {/* Header / Title */}
            <div className="text-center space-y-2 mb-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D49E17]" />
                <span>Executive Admin Access</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
                Sign In to Portal
              </h1>
              <p className="text-xs text-slate-500">
                Secure Executive Access &bull; Saffron City Management Portal
              </p>
            </div>

            {/* Lockout Warning Banner */}
            {isLocked && (
              <div className="mb-5 p-4 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-900 space-y-2 animate-in zoom-in-95 duration-200">
                <div className="flex items-center gap-2 font-bold text-sm text-rose-700">
                  <Clock className="w-4 h-4 animate-spin text-rose-600" />
                  <span>Security Lockout Active</span>
                </div>
                <p className="text-xs leading-relaxed text-rose-800">
                  3 incorrect password attempts recorded. This account is locked for 30 minutes.
                </p>
                <div className="flex items-center justify-between pt-1 border-t border-rose-200 text-xs font-bold text-rose-700">
                  <span>Unlock Countdown:</span>
                  <span className="font-mono bg-rose-200/70 px-2 py-0.5 rounded text-rose-950">
                    {lockCountdown || "30m 00s"}
                  </span>
                </div>
              </div>
            )}

            {/* Error Message */}
            {errorMsg && !isLocked && (
              <div className="mb-5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-800 animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Success Message */}
            {successMsg && (
              <div className="mb-5 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5 text-xs text-emerald-800 animate-in fade-in duration-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4" autoComplete="off">
              {/* Username Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Admin Email / Username
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    name="admin_email_auth"
                    autoComplete="off"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter administrator email"
                    required
                    disabled={isLocked}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#D49E17] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D49E17]/20 transition-all font-medium disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 block">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotModal(true);
                      setForgotEmail(username || "");
                      setForgotSuccess("");
                      setForgotError("");
                    }}
                    className="text-[11px] text-[#D49E17] hover:underline font-semibold"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="admin_password_auth"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    disabled={isLocked}
                    className="w-full pl-10 pr-11 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#D49E17] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D49E17]/20 transition-all font-medium disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 focus:outline-none"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-[#D49E17] focus:ring-[#D49E17] accent-[#D49E17]"
                  />
                  <span className="text-xs text-slate-600 font-medium">Remember on this device</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || isLocked}
                className="w-full mt-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-[#D49E17] to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-sm tracking-wide transition-all duration-300 shadow-[0_4px_20px_rgba(212, 158, 23,0.35)] hover:shadow-[0_6px_25px_rgba(212, 158, 23,0.5)] active:scale-[0.98] disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : isLocked ? (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Locked ({lockCountdown || "30m"})</span>
                  </>
                ) : (
                  <>
                    <span>Enter Management Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

          </div>
        </div>
      </main>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-slate-900 shadow-2xl relative border border-amber-300">
            <button
              type="button"
              onClick={() => setShowForgotModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 text-[#D49E17] flex items-center justify-center mx-auto mb-3">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-serif">
                {resetStep === "request" ? "Password Recovery" : "Enter Verification OTP"}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {resetStep === "request"
                  ? "Enter your verified administrator email to receive a 6-digit OTP code."
                  : `A 6-digit code was sent to ${forgotEmail}. Enter it below along with your new password.`}
              </p>
            </div>

            {forgotError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{forgotError}</span>
              </div>
            )}

            {forgotSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>{forgotSuccess}</span>
              </div>
            )}

            {resetStep === "request" ? (
              <form onSubmit={handleRequestReset} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Administrator Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="ubaidnasir401@gmail.com"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:border-[#D49E17] focus:bg-white outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="w-full py-3 rounded-xl bg-[#D49E17] hover:bg-amber-600 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  {forgotLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Sending OTP Code via Email...</span>
                    </>
                  ) : (
                    <span>Send 6-Digit OTP Code</span>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    6-Digit Email OTP Code
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    placeholder="123456"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-center font-mono text-xl font-bold tracking-[0.3em] text-slate-900 focus:border-[#D49E17] focus:bg-white outline-none"
                    autoFocus
                  />
                  <p className="text-[11px] text-slate-400 mt-1 text-center">
                    Check your email inbox or spam folder &bull; Valid for 15 minutes
                  </p>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    New Password (min 6 characters)
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:border-[#D49E17] focus:bg-white outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:border-[#D49E17] focus:bg-white outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="w-full py-3 rounded-xl bg-[#D49E17] hover:bg-amber-600 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  {forgotLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Verifying &amp; Updating...</span>
                    </>
                  ) : (
                    <span>Verify OTP &amp; Reset Password</span>
                  )}
                </button>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setResetStep("request");
                      setForgotError("");
                      setForgotSuccess("");
                    }}
                    className="text-[#D49E17] hover:underline cursor-pointer font-medium"
                  >
                    &larr; Change Email
                  </button>

                  <button
                    type="button"
                    onClick={handleRequestReset}
                    disabled={forgotLoading}
                    className="text-[#D49E17] hover:underline cursor-pointer font-medium"
                  >
                    Resend OTP Code
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl w-full mx-auto px-6 py-4 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} Saffron City Official Administration. All rights reserved.
      </footer>
    </div>
  );
}
