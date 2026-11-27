import { getCustomer } from "@/lib/action/getCustomers.action";
import React from "react";
import Image from "next/image";
import ActionButton from "./ActionButton";

async function CustomerTable() {
  const result = await getCustomer({
    page: 1,
    pageSize: 10,
    search: "",
  });

  if (!result.success) {
    throw new Error(result.message || "Failed to fetch customers' information");
  }

  const customerData = result.data?.customers || [];

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-gray-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-gray-900">
            Customers
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage and view all registered customers.
          </p>
        </div>

        <div className="relative w-full sm:max-w-sm">
          <svg
            className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="7" strokeWidth="1.8" />
            <path strokeLinecap="round" strokeWidth="1.8" d="m16 16 4 4" />
          </svg>
          <input
            type="text"
            placeholder="Search by customer name & email"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[850px]">
          <div className="grid grid-cols-[1.4fr_1.5fr_0.8fr_0.8fr_1fr] gap-4 border-b border-gray-100 bg-gray-50/80 px-6 py-3.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Customer
            </p>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Email Address
            </p>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Account Type
            </p>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Status
            </p>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Actions
            </p>
          </div>

          <div className="divide-y divide-gray-100">
            {customerData.map((customer) => (
              <div
                key={customer._id.toString()}
                className="grid grid-cols-[1.4fr_1.5fr_0.8fr_0.8fr_1fr] items-center gap-4 px-6 py-4 transition hover:bg-blue-50/40"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-gray-200 bg-gray-100">
                    <Image
                      src={customer.image || "/default-avatar.png"}
                      width={40}
                      height={40}
                      alt="profile"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="truncate text-sm font-semibold text-gray-900">
                    {customer.name}
                  </h3>
                </div>

                <p className="truncate text-sm text-gray-600">
                  {customer.email}
                </p>

                <div>
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    {customer.role}
                  </span>
                </div>

                <div>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                      customer.isActive
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        customer.isActive ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></span>
                    {customer.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                <div>
                  <ActionButton customer={customer}/>
                </div>
              </div>
            ))}
          </div>

          {customerData.length === 0 && (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.7"
                    d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m6-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm10 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
                  />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-gray-900">
                No customers found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Registered customers will appear here.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
        <p className="text-xs text-gray-500">
          Showing{" "}
          <span className="font-semibold text-gray-700">
            {customerData.length}
          </span>{" "}
          customers
        </p>
        <span className="text-xs font-medium text-gray-400">
          Customer Management
        </span>
      </div>
    </div>
  );
}

export default CustomerTable;
