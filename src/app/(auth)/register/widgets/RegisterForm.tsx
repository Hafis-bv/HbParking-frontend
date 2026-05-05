"use client";

import { HbParkingLogo } from "@/assets/icons/HbParkingLogo";
import { useAuth } from "@/hooks/useAuth";
import { ContactFormData, contactSchema, ErrorState } from "@/schemas/contact";
import { FirebaseError } from "firebase/app";
import { ChangeEvent, FormEvent, useState } from "react";
import z from "zod";
import axios from "axios";

export function RegisterForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    email: "",
    password: "",
    terms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<ErrorState>({
    email: null,
    password: null,
    terms: null,
    general: null,
  });

  const getStrength = (val: string): number => {
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    return score;
  };

  const strengthColors = [
    "bg-red-500",
    "bg-orange-400",
    "bg-yellow-400",
    "bg-emerald-500",
  ];
  const strength = getStrength(formData.password);

  const { loading, setLoading, handleGoogleLogin, handleEmailRegister } =
    useAuth();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = contactSchema.safeParse(formData);

    if (!result.success) {
      const flattened = z.flattenError(result.error);
      const fieldErrors = flattened.fieldErrors;

      setErrors({
        email: fieldErrors.email?.[0] ?? null,
        password: fieldErrors.password?.[0] ?? null,
        terms: fieldErrors.terms?.[0] ?? null,
        general: null,
      });
      return;
    }

    setLoading(true);

    setErrors({ ...errors, general: null });

    try {
      const user = await handleEmailRegister(formData.email, formData.password);

      const token = await user.getIdToken();
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          token,
        },
        { withCredentials: true },
      );
    } catch (err) {
      if (err instanceof FirebaseError) {
        const code = String(err.code || "");
        if (code === "auth/email-already-in-use") {
          setErrors((prev) => ({ ...prev, general: "User already exists" }));
        } else {
          setErrors((prev) => ({
            ...prev,
            general: "Registration failed. Please try again!",
          }));
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-emerald-50 px-4 py-12">
      <div className="relative w-full max-w-md bg-white rounded-3xl border border-emerald-100 px-9 py-10 overflow-hidden">
        {/* Decorative blob */}
        <div className="pointer-events-none absolute -top-14 -right-14 w-44 h-44 rounded-full bg-emerald-100 opacity-50" />

        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-7">
          <HbParkingLogo />
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-semibold text-emerald-950 tracking-tight leading-tight mb-1.5">
          Create your account
        </h1>
        <p className="text-sm text-gray-500 mb-7">
          Already have one?{" "}
          <a
            href="/login"
            className="text-emerald-600 font-medium hover:underline"
          >
            Sign in
          </a>
        </p>

        {/* Google Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2.5 px-4 py-[11px] bg-emerald-600 cursor-pointer hover:bg-emerald-400 text-white text-sm font-medium rounded-xl transition-all duration-150 hover:shadow-[0_4px_14px_rgba(66,133,244,0.35)] active:scale-[0.985] mb-5"
        >
          <span className="w-[22px] h-[22px] bg-white rounded-[4px] flex items-center justify-center shrink-0">
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
          </span>
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">
            or
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-[13px] font-medium text-gray-700 mb-1.5"
            >
              Email address
            </label>
            <div className="relative">
              <svg
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 stroke-gray-400 fill-none transition-colors duration-150"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <rect x="2" y="4" width="20" height="16" rx="3" />
                <path d="M2 7l10 7 10-7" />
              </svg>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                autoComplete="email"
                name="email"
                className="w-full pl-9 pr-3.5 py-2.5 border border-gray-300 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 placeholder:text-[13px] focus:outline-none focus:border-emerald-500 focus:ring-[3px] focus:ring-emerald-500/10 transition-all duration-150"
              />
            </div>

            {/* Error message */}
            {errors.email && (
              <span className="text-[13px] text-red-500 mb-3">
                {errors.email}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-[13px] font-medium text-gray-700 mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <svg
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 stroke-gray-400 fill-none transition-colors duration-150"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a strong password"
                autoComplete="new-password"
                name="password"
                className="w-full pl-9 pr-10 py-2.5 border border-gray-300 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 placeholder:text-[13px] focus:outline-none focus:border-emerald-500 focus:ring-[3px] focus:ring-emerald-500/10 transition-all duration-150"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600 transition-colors duration-150 cursor-pointer"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <svg
                    className="w-4 h-4 stroke-current fill-none"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 stroke-current fill-none"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            {/* Strength bar */}
            {formData.password.length > 0 && (
              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`h-[3px] flex-1 rounded-full transition-all duration-300 ${
                      i <= strength
                        ? strengthColors[strength - 1]
                        : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Error message */}
            {errors.password && (
              <span className="text-[13px] text-red-500 mb-3">
                {errors.password}
              </span>
            )}
            {/* Error message */}
            {errors.general && (
              <span className="text-[13px] block text-red-500 !mt-5">
                {errors.general}
              </span>
            )}
          </div>

          {/* Terms */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <input
                id="terms"
                type="checkbox"
                checked={formData.terms}
                onChange={(e) => {
                  setFormData({ ...formData, terms: e.target.checked });
                  setErrors({ ...errors, terms: null });
                }}
                className="w-[15px] h-[15px] accent-emerald-600 cursor-pointer"
              />
              <label
                htmlFor="terms"
                className="text-[13px] text-gray-500 cursor-pointer select-none"
              >
                I agree to the{" "}
                <a
                  href="/terms"
                  className="text-emerald-600 font-medium hover:underline"
                >
                  Terms of Service
                </a>
              </label>
            </div>
            {/* Error message */}
            <div className="-mt-3 mb-8">
              {errors.terms && (
                <span className="text-[13px] text-red-500 mb-3">
                  {errors.terms}
                </span>
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            disabled={loading}
            className={`w-full py-3 rounded-xl text-[15px] font-semibold cursor-pointer text-white tracking-tight transition-all duration-150 active:scale-[0.985] bg-emerald-600 hover:bg-emerald-400 hover:shadow-[0_4px_14px_rgba(5,150,105,0.35)]`}
          >
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>
      </div>
    </main>
  );
}
