
import { auth } from "@/auth";
import ROUTES from "@/ROUTES";
import { redirect } from "next/navigation";
import React from "react";
import AdminSidebar from "./components/AdminSidebar";

async function page() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect(ROUTES.LOGIN);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="flex h-18.25 items-center justify-between gap-6 px-6 lg:px-8">
          <div className="shrink-0">
            <h2 className="text-2xl font-bold tracking-tight text-blue-700">
              Ship-Flow
            </h2>
          </div>

          <div className="hidden max-w-xl flex-1 md:block">
            <input
              type="text"
              placeholder="Search anything here..."
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex shrink-0 items-center gap-3">
            {/* <Profile/> */}
          </div>
        </div>
      </header>

      <div className="flex">
        <AdminSidebar />
        <main className="min-w-0 flex-1 px-6 py-8 lg:px-8">
        </main>
      </div>
    </div>
  );
}

export default page;
