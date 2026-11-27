"use client";

import { updateCustomerStatus } from "@/lib/action/updateCustomerStatus.action";
import ROUTES from "@/ROUTES";
import { Types } from "mongoose";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { toast } from "react-toastify";

interface customerProps {
  customer: {
    _id: Types.ObjectId;
    isActive: boolean;
  };
}

function ActionButton({ customer }: customerProps) {
  const router = useRouter();

  const deHandler = async (customerId: string, isActive: boolean) => {
    const result = await updateCustomerStatus({
      customerId,
      isActive,
    });

    if (!result.success) {
      toast.error(result.message || "Failed to update status");
    }
    toast.success(result.message);
    router.refresh();
  };

  const reHandler = async (customerId: string, isActive: boolean) => {
    const result = await updateCustomerStatus({
      customerId,
      isActive,
    });

    if (!result.success) {
      toast.error(result.message || "Failed to update status");
    }
    toast.success(result.message);
    router.refresh();
  };

  return (
    <div className="flex items-center justify-end gap-4">
      <button
        type="button"
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-600 shadow-sm transition-all duration-200 hover:border-blue-300 hover:bg-blue-100 hover:text-blue-700 active:scale-95"
      >
        <Link
          href={ROUTES.CUSTOMERACC}
          className="flex h-full w-full items-center justify-center"
        >
          <MdOutlineRemoveRedEye size={18} />
        </Link>
      </button>

      {customer.isActive ? (
        <button
          type="button"
          onClick={() => deHandler(customer._id.toString(), false)}
          className="inline-flex items-center justify-center rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 shadow-sm transition duration-200 hover:border-red-300 hover:bg-red-50 active:scale-95"
        >
          Deactivate
        </button>
      ) : (
        <button
          type="button"
          onClick={() => reHandler(customer._id.toString(), true)}
          className="inline-flex items-center justify-center rounded-lg border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm transition duration-200 hover:border-emerald-300 hover:bg-emerald-50 active:scale-95"
        >
          Reactivate
        </button>
      )}
    </div>
  );
}

export default ActionButton;
