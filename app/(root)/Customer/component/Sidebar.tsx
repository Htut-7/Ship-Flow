
import Logout from "@/components/Logout";
import ROUTES from "@/ROUTES";
import Link from "next/link";
import React from "react";
import { CiBookmark, CiLocationOn } from "react-icons/ci";
import { MdOutlineHistory, MdOutlineSpaceDashboard } from "react-icons/md";
import { PiPackage } from "react-icons/pi";

function Sidebar() {
  return (
    <div className="w-64 shrink-0">
      <aside className="flex min-h-[calc(100vh-73px)] flex-col justify-between border-r border-gray-200 bg-white px-4 py-6">
        <nav className="flex flex-col gap-2">
          <div>
            <Link
              href={ROUTES.CUSTOMER}
              className="flex items-center gap-3 rounded-lg bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-100"
            >
              <MdOutlineSpaceDashboard className="h-5 w-5 shrink-0" />
              Dashboard
            </Link>
          </div>

          <div>
            <Link
              href={ROUTES.CREATE}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
            >
              <PiPackage className="h-5 w-5 shrink-0" />
              Create Shipment
            </Link>
          </div>

          <div>
            <Link
              href={ROUTES.SHIPMENT}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
            >
              <CiBookmark className="h-5 w-5 shrink-0" />
              My Shipments
            </Link>
          </div>

          <div>
            <Link
              href={ROUTES.TRACK}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
            >
              <CiLocationOn className="h-5 w-5 shrink-0" />
              Track Shipment
            </Link>
          </div>

          <div>
            <Link
              href={ROUTES.HISTORY}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
            >
              <MdOutlineHistory className="h-5 w-5 shrink-0" />
              History
            </Link>
          </div>
        </nav>

        <div className="border-t border-gray-100 pt-5">
          <Logout />
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
