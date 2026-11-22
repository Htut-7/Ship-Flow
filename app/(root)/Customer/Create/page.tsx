
import React from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "../component/Sidebar";
import CreateForm from "../component/CreateForm";

function Page() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="sticky top-0 z-50 h-18.25 shrink-0 border-b border-gray-200 bg-white">
        <Navbar />
      </header>

      <div className="grid flex-1 grid-cols-[16rem_minmax(0,1fr)]">
        <Sidebar />

        <main className="min-w-0 p-4 md:p-6">
          <CreateForm />
        </main>
      </div>
    </div>
  );
}

export default Page;
