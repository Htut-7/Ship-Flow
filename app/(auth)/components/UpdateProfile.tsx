"use client";

import React, { useState } from "react";
import Image from "next/image";
import { updateProfile } from "@/lib/action/updateProfile.action";
import { useRouter } from "next/navigation";

interface UpdateProfileProps {
  name: string;
  email: string;
  image: string | null;
}

function UpdateProfile({
  name: initialName,
  email: initialEmail,
  image,
}: UpdateProfileProps) {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [currPass, setCurrPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const updateHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await updateProfile({
        name,
        email,
        image: selectedImage,
        currPassword: currPass,
        newPassword: newPass,
      });

      if (!result.success) {
        throw new Error(result.message || "Failed to update profile");
      }

      setSuccess(result.message || "Profile updated successfully");

      setCurrPass("");
      setNewPass("");
      setSelectedImage(null);

      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 lg:py-12">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold text-blue-600">
          ACCOUNT SETTINGS
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Update Profile
        </h2>
        <p className="mt-2 text-sm leading-6 text-gray-500">
          Manage your personal information and keep your account secure.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <form onSubmit={updateHandler}>
          <div className="border-b border-gray-200 px-6 py-6 sm:px-8">
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                Personal Information
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Update your name, email address, and profile photo.
              </p>
            </div>
          </div>

          <div className="space-y-7 px-6 py-7 sm:px-8">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username..."
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
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
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Profile Image
              </label>

              <div className="flex flex-col gap-5 rounded-xl border border-gray-200 bg-gray-50/80 p-5 sm:flex-row sm:items-center">
                <div className="flex shrink-0 items-center gap-4">
                  {image ? (
                    <Image
                      src={image}
                      width={80}
                      height={80}
                      alt="Current Profile"
                      className="h-20 w-20 rounded-full border-2 border-white object-cover shadow-sm"
                    />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-white bg-blue-100 text-2xl font-semibold text-blue-700 shadow-sm">
                      {name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="mb-2 text-sm font-medium text-gray-800">
                    Choose a new profile photo
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setSelectedImage(e.target.files?.[0] || null)
                    }
                    className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-white text-sm text-gray-600 file:mr-4 file:cursor-pointer file:border-0 file:bg-blue-50 file:px-4 file:py-3 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    JPG, PNG or WebP. Maximum size 5 MB.
                  </p>
                  {selectedImage && (
                    <p className="mt-2 truncate text-xs font-medium text-blue-600">
                      Selected: {selectedImage.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 px-6 py-6 sm:px-8">
            <h3 className="text-base font-semibold text-gray-900">
              Change Password
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Leave both password fields empty if you don&apos;t want to change
              your password.
            </p>
          </div>

          <div className="space-y-6 px-6 pb-8 sm:px-8">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <input
                type="password"
                placeholder="Enter your current password..."
                onChange={(e) => setCurrPass(e.target.value)}
                value={currPass}
                autoComplete="current-password"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter your new password..."
                onChange={(e) => setNewPass(e.target.value)}
                value={newPass}
                autoComplete="new-password"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
          </div>

          {(error || success) && (
            <div className="px-6 pb-6 sm:px-8">
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                  {success}
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col-reverse gap-3 border-t border-gray-200 bg-gray-50 px-6 py-5 sm:flex-row sm:items-center sm:justify-end sm:px-8">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex min-w-36 items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
