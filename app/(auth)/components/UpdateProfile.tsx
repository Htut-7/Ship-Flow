
"use client";

import React, { useState } from 'react'
import Image from 'next/image';

interface UpdateProfileProps{
  name: string;
  email: string;
  image: string | null;
}

function UpdateProfile({name: initialName, email: initialEmail, image}:UpdateProfileProps) {

  const [name,setName]=useState(initialName);
  const [email,setEmail]=useState(initialEmail);
  const [selectedImage,setSelectedImage]=useState<File | null>(null);
  const [currPass,setCurrPass]=useState("");
  const [newPass,setNewPass]=useState("");
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Update Profile
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Manage your account information and password settings.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <header className="border-b border-gray-200 bg-blue-50/50 px-6 py-6 sm:px-8">
          <h3 className="text-lg font-semibold text-gray-900">
            Personal Information
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Update your username and email address.
          </p>
        </header>

        <form className="space-y-7 px-6 py-8 sm:px-8">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type='text'
              placeholder='Enter your username...'
              onChange={(e)=>setName(e.target.value)}
              value={name}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type='email'
              placeholder='Enter your email address...'
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Profile Image
            </label>
            <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4 sm:flex-row sm:items-center">
              {image && (
                <Image
                  src={image}
                  width={80}
                  height={80}
                  alt='Current Profile'
                  className="h-20 w-20 rounded-full border-2 border-white object-cover shadow-sm"
                />
              )}
              <div className="min-w-0 flex-1">
                <input
                  type='file'
                  accept='image/*'
                  onChange={(e)=>setSelectedImage(e.target.files?.[0] || null)}
                  className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-white text-sm text-gray-600 file:mr-4 file:cursor-pointer file:border-0 file:bg-blue-50 file:px-4 file:py-3 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="mt-2 text-xs text-gray-500">
                  Upload JPG, PNG, and WebP image.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-7">
            <h3 className="text-lg font-semibold text-gray-900">
              Password
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Change your password to keep your account secure.
            </p>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <input
                type='password'
                placeholder='Enter your current password...'
                onChange={(e)=>setCurrPass(e.target.value)}
                value={currPass}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type='password'
                placeholder='Enter your new password...'
                onChange={(e)=>setNewPass(e.target.value)}
                value={newPass}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>
        </form>

        {error && (
          <p className="px-6 pb-4 text-sm font-medium text-red-500 sm:px-8">
            {error}
          </p>
        )}

        <div className="flex justify-end border-t border-gray-100 bg-gray-50 px-6 py-5 sm:px-8">
          <button
            type='submit'
            className="inline-flex min-w-32 items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Loading..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default UpdateProfile
