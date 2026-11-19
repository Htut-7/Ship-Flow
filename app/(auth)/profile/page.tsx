import { auth } from "@/auth";
import React from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { redirect } from "next/navigation";
import ROUTES from "@/ROUTES";
import { FaUserEdit } from "react-icons/fa";

async function page() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect(ROUTES.LOGIN);
  }

  const role = (session.user as typeof session.user & { role: string }).role;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <Navbar />
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10 lg:py-14">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            My Profile
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Manage your personal information and account details.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 bg-blue-50/50 px-6 py-8 sm:px-8">
            <div className="flex flex-col items-center gap-5 sm:flex-row">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-100 text-3xl font-bold uppercase text-blue-700 ring-4 ring-white shadow-sm">
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt="profile"
                    width={80}
                    height={80}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <div>{session?.user?.name?.charAt(0) || "U"}</div>
                )}
              </div>

              <div className="text-center sm:text-left">
                <h2 className="text-xl font-bold text-gray-900">
                  {session?.user?.name}
                </h2>
                <div className="mt-1">
                  <span className="text-sm text-gray-500">
                    {session?.user?.email}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-8 sm:px-8">
            <h3 className="mb-6 text-lg font-semibold text-gray-900">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Full Name
                </span>
                <p className="mt-2 text-sm font-medium text-gray-800">
                  {session?.user?.name}
                </p>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Email Address
                </span>
                <p className="mt-2 break-all text-sm font-medium text-gray-800">
                  {session?.user?.email}
                </p>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Role
                </span>
                <p className="mt-2 break-all text-sm font-medium text-gray-800">
                  {role}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end border-t border-gray-100 bg-gray-50 px-6 py-5 sm:px-8">
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <FaUserEdit className="h-4 w-4" />
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
