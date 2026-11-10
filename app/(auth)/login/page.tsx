
"use client";

import React, { useState } from "react";
import ROUTES from "@/ROUTES";
import Link from "next/link";

function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4 md:p-8">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:min-h-[650px] lg:grid-cols-2">

        <div className="relative flex flex-col justify-between overflow-hidden bg-slate-900 p-8 text-white sm:p-12 lg:p-14">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

          <div className="relative z-10">
            <h1 className="text-2xl font-bold tracking-tight">
              Ship<span className="text-blue-400">Flow</span>
            </h1>
          </div>

          <div className="relative z-10 my-12">
            <span className="mb-5 inline-flex rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm font-medium text-blue-300">
              Simple. Reliable. Efficient.
            </span>

            <h2 className="mb-5 text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl">
              Welcome back to ShipFlow.
            </h2>

            <p className="mb-10 max-w-md leading-7 text-slate-300">
              Your deliveries, all in one place. Stay connected with your
              shipments. Track deliveries, check shipment updates, and manage
              everything from one simple platform.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
                  <span className="text-xl">✓</span>
                </div>
                <span className="font-medium text-slate-200">
                  Track your shipments
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
                  <span className="text-xl">✓</span>
                </div>
                <span className="font-medium text-slate-200">
                  Follow delivery progress
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
                  <span className="text-xl">✓</span>
                </div>
                <span className="font-medium text-slate-200">
                  Get real-time status updates
                </span>
              </div>
            </div>
          </div>

          <div className="relative z-10 border-t border-slate-700 pt-6">
            <p className="text-sm text-slate-400">
              Your shipments, under control.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center p-8 sm:p-12 lg:p-14">
          <form onSubmit={loginHandler} className="w-full max-w-md">
            <div className="mb-10">
              <span className="mb-3 block text-sm font-semibold tracking-wider text-blue-600 uppercase">
                Welcome Back
              </span>

              <h2 className="mb-3 text-3xl font-bold tracking-tight text-slate-900">
                Sign in to your account
              </h2>

              <p className="text-sm leading-6 text-slate-500">
                Sign in to your account to continue.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email address..."
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password..."
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-blue-600/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </div>

            <p className="mt-8 text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <Link
                href={ROUTES.REGISTER}
                className="font-semibold text-blue-600 transition hover:text-blue-700"
              >
                Create an account
              </Link>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}

export default page;
