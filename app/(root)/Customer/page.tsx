import { auth } from "@/auth";
import React from "react";
import ROUTES from "@/ROUTES";
import { redirect } from "next/navigation";
import { LiaShippingFastSolid } from "react-icons/lia";
import { PiPackage } from "react-icons/pi";
import { LuNavigation } from "react-icons/lu";
import ServiceCard from "@/components/ServiceCard";
import Sidebar from "./component/Sidebar";
import Navbar from "@/components/Navbar";

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
        <Navbar/>
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
