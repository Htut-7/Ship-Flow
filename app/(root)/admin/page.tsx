
import { auth } from "@/auth";
import ROUTES from "@/ROUTES";
import { redirect } from "next/navigation";
import React from "react";
import AdminSidebar from "./components/AdminSidebar";
import Navbar from "@/components/Navbar";

async function page() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect(ROUTES.LOGIN);
  }

  const role=(session.user as typeof session.user & {role: string}).role;

  if(role !== "Admin"){
    redirect(ROUTES.LOGIN);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <Navbar/>
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
