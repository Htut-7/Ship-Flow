import React from "react";
import Link from "next/link";
import Logout from "@/components/Logout";
import ROUTES from "@/ROUTES";
import { PiPackage } from "react-icons/pi";
import { CiClock2 } from "react-icons/ci";
import { FaTruckFast, FaUser } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdBicycle } from "react-icons/io";
import { GoChecklist } from "react-icons/go";

function AdminSidebar() {
  return (
    <aside className="w-64 shrink-0 border-r border-gray-200 bg-white">
      <nav className="flex min-h-[calc(100vh-73px)] flex-col justify-between px-4 py-6">
        <div className="flex flex-col gap-8">
          <div>
            <div className="mb-3 px-3">
              <span className="text-xs font-semibold tracking-wider text-gray-400">
                SHIPMENT MANAGEMENT
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <div>
                <Link
                  href={ROUTES.ALLSHIPMENTS}
                  className="flex items-center gap-3 rounded-lg bg-blue-50 px-3 py-2.5 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-100"
                >
                  <PiPackage className="h-5 w-5 shrink-0" />
                  All Shipments
                </Link>
              </div>

              <div>
                <Link
                  href={ROUTES.PENDING}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
                >
                  <CiClock2 className="h-5 w-5 shrink-0" />
                  Pending Shipments
                </Link>
              </div>

              <div>
                <Link
                  href={ROUTES.INTRANSIT}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
                >
                  <FaTruckFast className="h-5 w-5 shrink-0" />
                  In Transit
                </Link>
              </div>

              <div>
                <Link
                  href={ROUTES.Delivered}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
                >
                  <FaCheckCircle className="h-5 w-5 shrink-0" />
                  Delivered Shipments
                </Link>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-3 px-3">
              <span className="text-xs font-semibold tracking-wider text-gray-400">
                MANAGEMENT
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <div>
                <Link
                  href={ROUTES.CUSTOMERS}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
                >
                  <FaUser className="h-5 w-5 shrink-0" />
                  Customers
                </Link>
              </div>

              <div>
                <Link
                  href={ROUTES.CHECKRIDERS}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
                >
                  <IoMdBicycle className="h-5 w-5 shrink-0" />
                  Riders
                </Link>
              </div>

              <div>
                <Link
                  href={ROUTES.RIDERAPP}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
                >
                  <GoChecklist className="h-5 w-5 shrink-0" />
                  Rider Applications
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-col gap-1">
            <div className="mt-3 border-t border-gray-100 pt-3">
              <Logout />
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export default AdminSidebar;
