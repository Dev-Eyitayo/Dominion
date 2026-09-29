"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginAdminAction } from "@/lib/auth/actions";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams?.get("returnUrl") || "/admin";

  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Enter a valid email address")
        .required("Email address is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      setServerError(null);
      setIsSubmitting(true);

      try {
        const formData = new FormData();
        formData.append("email", values.email);
        formData.append("password", values.password);

        const result = await loginAdminAction(null, formData);

        if (!result.success) {
          setServerError(result.error || "Authentication failed. Please check credentials.");
          setIsSubmitting(false);
          return;
        }

        // Redirect to dashboard or returnUrl
        router.push(returnUrl);
        router.refresh();
      } catch (err: unknown) {
        console.error("Login client error:", err);
        setServerError("A network error occurred. Please try again.");
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="w-full max-w-md bg-white border border-slate-200 p-8 sm:p-10 relative z-10 shadow-none">
      {/* Entity Logo */}
      <div className="text-center mb-8">
        <div className="inline-block">
          <Image
            src="/logo.png"
            alt="Dominion Integrated Electrical & Engineering Limited"
            width={180}
            height={50}
            className="h-10 w-auto object-contain"
            priority
          />
        </div>
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight uppercase">
          Admin Management Panel
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Sign in with authorized administrative credentials
        </p>
      </div>

      {/* Server Alert Message */}
      {serverError && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-600 text-red-800 text-xs font-mono leading-relaxed">
          <div className="font-bold uppercase mb-0.5">Authentication Error</div>
          <div>{serverError}</div>
        </div>
      )}

      {/* Formik Form */}
      <form onSubmit={formik.handleSubmit} className="space-y-5" noValidate>
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-mono uppercase tracking-wider font-bold text-slate-700 mb-2"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="admin@dominionltd.ng"
            className={`w-full px-4 py-3 bg-white border text-xs font-mono text-slate-900 focus:outline-none focus:border-[#0F2B82] transition-colors rounded-none ${
              formik.touched.email && formik.errors.email
                ? "border-red-500 bg-red-50/20"
                : "border-slate-300"
            }`}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-[11px] font-mono text-red-600 mt-1.5">
              {formik.errors.email}
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="password"
              className="block text-xs font-mono uppercase tracking-wider font-bold text-slate-700"
            >
              Password
            </label>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            placeholder="••••••••••••"
            className={`w-full px-4 py-3 bg-white border text-xs font-mono text-slate-900 focus:outline-none focus:border-[#0F2B82] transition-colors rounded-none ${
              formik.touched.password && formik.errors.password
                ? "border-red-500 bg-red-50/20"
                : "border-slate-300"
            }`}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-[11px] font-mono text-red-600 mt-1.5">
              {formik.errors.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 bg-[#0F2B82] hover:bg-[#070D1F] text-white font-mono text-xs uppercase tracking-widest font-bold transition-all border border-[#0F2B82] disabled:opacity-60 disabled:cursor-not-allowed rounded-none mt-2 cursor-pointer"
        >
          {isSubmitting ? "Signing you in..." : "Sign in"}
        </button>
      </form>

      {/* Security Notice Footer */}
      <div className="mt-8 pt-6 border-t border-slate-100 text-center">
        <p className="text-[11px] font-mono text-slate-400">
          CONFIDENTIAL • AUTHORIZED DOMINION PERSONNEL ONLY
        </p>
        <div className="text-[10px] font-mono text-slate-400 mt-1">
          RC: 1655029 • SMEDAN SUID-9142-6143-5422-0697
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#070D1F] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0F2B820D_1px,transparent_1px),linear-gradient(to_bottom,#0F2B820D_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <Suspense fallback={<div className="text-white font-mono text-xs">Loading Admin Portal...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
