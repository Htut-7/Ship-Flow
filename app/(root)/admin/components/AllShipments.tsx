import { getShipment } from "@/lib/action/getShipment.action";
import React from "react";
import ShipmentTable from "./ShipmentTable";


async function AllShipments() {
  const result = await getShipment({
    page: 1,
    pageSize: 10,
    filter: "latest",
    status: "all",
  });

  if (!result.success) {
    throw new Error(result.message || "Failed to fetch shipment data");
  }

  const shipment = result.data?.shipments || [];

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            All Shipments
          </h2>
          <span className="mt-1 block text-sm text-gray-500">
            Manage and monitor all customer shipments.
          </span>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white px-5 py-3 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Total Shipments</h3>
          <p className="mt-1 text-2xl font-bold text-gray-900">
            {shipment.length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-amber-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Pending</h3>
            <div className="flex size-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6l4 2m6-2a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z"
                />
              </svg>
            </div>
          </div>
          <p className="mt-3 text-3xl font-bold text-gray-900">
            {shipment.filter((item) => item.status === "pending").length}
          </p>
          <p className="mt-1 text-xs text-gray-400">Awaiting approval</p>
        </div>

        <div className="rounded-xl border border-purple-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">In Transit</h3>
            <div className="flex size-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7h12m0 0-4-4m4 4-4 4M16 17H4m0 0 4 4m-4-4 4-4"
                />
              </svg>
            </div>
          </div>
          <p className="mt-3 text-3xl font-bold text-gray-900">
            {shipment.filter((item) => item.status === "in_transit").length}
          </p>
          <p className="mt-1 text-xs text-gray-400">Currently on the way</p>
        </div>

        <div className="rounded-xl border border-green-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Delivered</h3>
            <div className="flex size-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m5 12 4 4L19 6"
                />
              </svg>
            </div>
          </div>
          <p className="mt-3 text-3xl font-bold text-gray-900">
            {shipment.filter((item) => item.status === "delivered").length}
          </p>
          <p className="mt-1 text-xs text-gray-400">Successfully delivered</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-gray-200 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              Shipment Records
            </h3>
            <span className="mt-1 block text-sm text-gray-500">
              View all shipments submitted by customers.
            </span>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-4.34-4.34m0 0A7.5 7.5 0 1 0 6.05 6.05a7.5 7.5 0 0 0 10.61 10.61Z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search tracking number"
                className="w-full rounded-lg border border-gray-300 py-2.5 pr-3 pl-9 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-64"
              />
            </div>

            <select className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
              <option>All Status</option>
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Assigned</option>
              <option>In Transit</option>
              <option>Delivered</option>
            </select>
          </div>
        </div>

        <div>
          <ShipmentTable shipments={shipment}/>
        </div>

        <div className="flex flex-col gap-2 border-t border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500">
            Showing {shipment.length} of{" "}
            {result.data?.totalShipments ?? shipment.length} shipments
          </p>
          <span className="text-xs text-gray-400">Latest shipments first</span>
        </div>
      </div>
    </div>
  );
}

export default AllShipments;
