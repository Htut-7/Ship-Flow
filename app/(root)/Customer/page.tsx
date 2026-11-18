import { auth } from "@/auth";
import React from "react";
import ROUTES from "@/ROUTES";
import { redirect } from "next/navigation";
import { LiaShippingFastSolid } from "react-icons/lia";
import { PiPackage } from "react-icons/pi";
import { LuNavigation } from "react-icons/lu";
import ServiceCard from "@/components/ServiceCard";
import Sidebar from "./component/Sidebar";

const services = [
  {
    title: "Total Shipments",
    icon: <PiPackage />,
    count: 0,
  },
  {
    title: "In Transit",
    icon: <LiaShippingFastSolid />,
    count: 0,
  },
  {
    title: "Delivered",
    icon: <LuNavigation />,
    count: 0,
  },
];

async function Page() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect(ROUTES.LOGIN);
  }

  const role = (session.user as typeof session.user & { role: string }).role;

  if (role !== "Customer") {
    redirect(ROUTES.HOME);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
          <h2 className="text-2xl font-bold tracking-tight text-blue-700">
            Ship-Flow
          </h2>

          <div className="hidden max-w-md flex-1 md:block">
            <input
              type="text"
              placeholder="Search for anything..."
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex items-center gap-3">{/* <Profile /> */}</div>
        </div>
      </header>

      <div className="flex">
        <Sidebar />
        <main className="mx-auto max-w-7xl px-6 py-10">
          <div className="mb-10">
            <span className="text-sm font-semibold text-blue-600">
              Welcome back!
            </span>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
              Track and manage your shipments.
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500">
              Create a shipment, check its delivery status, and view your
              shipment history all in one place.
            </p>
          </div>

          <section>
            <h2 className="mb-5 text-lg font-semibold text-gray-900">
              Shipment Overview
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, i) => (
                <ServiceCard
                  key={i}
                  title={service.title}
                  icon={service.icon}
                  count={service.count}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Page;
