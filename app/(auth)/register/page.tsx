"use client";

import ROUTES from "@/ROUTES";
import React, { useState } from "react";
import Link from "next/link";
import { register } from "@/lib/action/register.action";
import { useRouter } from "next/navigation";

function page() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const regHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const result = await register({
        name: username,
        email,
        password,
      });
      console.log(result);

      if (result.success) {
        router.push(ROUTES.HOME);
      } else {
        setError(result.message);
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
    
  };



  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4 md:p-8">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:min-h-[700px] lg:grid-cols-2">
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
              Start your journey with us
            </span>

            <h2 className="mb-5 text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl">
              Deliver smarter with ShipFlow.
            </h2>

            <p className="mb-10 max-w-md leading-7 text-slate-300">
              Your next delivery starts here. Create your account and experience
              a simpler way to manage shipments. Send parcels, track their
              journey, and stay informed every step of the way.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
                  <span className="text-xl">✓</span>
                </div>
                <span className="font-medium text-slate-200">
                  Create your account easily
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
                  <span className="text-xl">✓</span>
                </div>
                <span className="font-medium text-slate-200">
                  Manage your shipments
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
                  <span className="text-xl">✓</span>
                </div>
                <span className="font-medium text-slate-200">
                  Stay updated from pickup to delivery
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
          <form className="w-full max-w-md" onSubmit={regHandler}>
            <div className="mb-8">
              <span className="mb-3 block text-sm font-semibold tracking-wider text-blue-600 uppercase">
                Get Started
              </span>

              <h2 className="mb-3 text-3xl font-bold tracking-tight text-slate-900">
                Create an Account
              </h2>

              <p className="text-sm leading-6 text-slate-500">
                Join ShipFlow and start managing your shipments today.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Username
                </label>

                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username..."
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

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
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 hover:shadow-blue-600/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Loading..." : "Create Account"}
              </button>
            </div>

            <p className="mt-8 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                href={ROUTES.LOGIN}
                className="font-semibold text-blue-600 transition hover:text-blue-700"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default page;
