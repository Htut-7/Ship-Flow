
import React from "react";
import Link from "next/link";
import Logout from "@/components/Logout";
import { CiClock2 } from "react-icons/ci";
import { FaTruckFast } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { LuPackageSearch } from "react-icons/lu";
import ROUTES from "@/ROUTES";

function RiderBar() {
  return (
    <aside className="w-64 shrink-0 border-r border-gray-200 bg-white">
      <nav className="flex min-h-[calc(100vh-73px)] flex-col justify-between px-4 py-6">
        <div className="flex flex-col gap-8">
          <div>
            <div className="mb-3 px-3">
              <span className="text-xs font-semibold tracking-wider text-gray-400">
                DELIVERY MANAGEMENT
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <div>
                <Link
                  href={ROUTES.RIDER}
                  className="flex items-center gap-3 rounded-lg bg-blue-50 px-3 py-2.5 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-100"
                >
                  <MdOutlineSpaceDashboard className="h-5 w-5 shrink-0" />
                  Dashboard
                </Link>
              </div>

              <div>
                <Link
                  href={ROUTES.RIDERDELI}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
                >
                  <LuPackageSearch className="h-5 w-5 shrink-0" />
                  My Deliveries
                </Link>
              </div>

              <div>
                <Link
                  href={ROUTES.RIDERPENDING}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
                >
                  <CiClock2 className="h-5 w-5 shrink-0" />
                  Pending Pickups
                </Link>
              </div>

              <div>
                <Link
                  href={ROUTES.RIDERTRANSIT}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
                >
                  <FaTruckFast className="h-5 w-5 shrink-0" />
                  In Transit
                </Link>
              </div>

              <div>
                <Link
                  href={ROUTES.RIDERCOMPLETE}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
                >
                  <FaCheckCircle className="h-5 w-5 shrink-0" />
                  Completed Deliveries
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

export default RiderBar;
