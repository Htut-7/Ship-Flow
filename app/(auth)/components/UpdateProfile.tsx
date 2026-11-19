"use client";

import React, { useState } from "react";


function UpdateProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [currPass, setCurrPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10 sm:px-6 lg:py-14">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Update Profile
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Manage your account information and password settings.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 bg-blue-50/50 px-6 py-5 sm:px-8">
          <h3 className="text-base font-semibold text-gray-900">
            Personal Information
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Update your username and email address.
          </p>
        </div>

        <form className="space-y-6 px-6 py-8 sm:px-8">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              placeholder="Enter your username..."
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email address..."
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-white text-sm text-gray-600 file:mr-4 file:cursor-pointer file:border-0 file:bg-blue-50 file:px-4 file:py-3 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
            />
            <p className="text-xs text-gray-500">
              Upload a JPG, PNG, or WebP image.
            </p>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <h3 className="text-base font-semibold text-gray-900">
              Change Password
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Enter your current password before choosing a new one.
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <input
              type="password"
              placeholder="Enter current password..."
              onChange={(e) => setCurrPass(e.target.value)}
              value={currPass}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter your password..."
              onChange={(e) => setNewPass(e.target.value)}
              value={newPass}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </form>

        {error && <p className="px-6 text-sm text-red-500 sm:px-8">{error}</p>}

        <div className="flex justify-end border-t border-gray-100 bg-gray-50 px-6 py-5 sm:px-8">
          <button
            type="submit"
            className="inline-flex min-w-32 items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Loading..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
