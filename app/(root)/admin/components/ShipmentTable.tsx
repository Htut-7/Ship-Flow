"use client";

import { updateShipmentStatus } from "@/lib/action/updateShipmentStatus.action";
import { Types } from "mongoose";
import React from "react";
import { CiCircleCheck } from "react-icons/ci";
import { FcCancel } from "react-icons/fc";
import { IoIosBicycle } from "react-icons/io";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface shipmentProps {
  shipments: {
    _id: Types.ObjectId;
    trackingNumber: string;
    status: string;

    sender: {
      name: string;
      phone: string;
    };
    receiver: {
      name: string;
      phone: string;
    };
    weight: number;
    deliveryFee: number;
  }[];
}

function ShipmentTable({ shipments }: shipmentProps) {

    const router=useRouter();

    const handleConfirm=async(shipmentId: string)=>{
        const result=await updateShipmentStatus({
            shipmentId,
            status: "confirmed",
        });

        if(!result.success){
            toast.error(result.message || "Failed to update shipment");
        }
        toast.success(result.message);
        router.refresh();
    };

    const handleCancel=async(shipmentId:string)=>{
        const result=await updateShipmentStatus({
            shipmentId,
            status: "cancelled",
        });

        if(!result.success){
            throw new Error(result.message || "Failed to reject shipment");
        }
        router.refresh();
    }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-left text-sm">
          <thead className="bg-gray-50 text-xs font-semibold tracking-wide text-gray-500 uppercase">
            <tr>
              <th className="px-5 py-4">Tracking ID</th>
              <th className="px-5 py-4">Sender</th>
              <th className="px-5 py-4">Receiver</th>
              <th className="px-5 py-4">Weight</th>
              <th className="px-5 py-4">Delivery Fee</th>
              <th className="px-5 py-4">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {shipments.length > 0 ? (
              shipments.map((item) => (
                <tr
                  key={item.trackingNumber}
                  className="transition-colors hover:bg-blue-50/40"
                >
                  <td className="px-5 py-4">
                    <span className="font-semibold text-blue-600">
                      {item.trackingNumber}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-900">
                      {item.sender.name}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {item.sender.phone}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-900">
                      {item.receiver.name}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {item.receiver.phone}
                    </p>
                  </td>
                  <td className="px-5 py-4 font-medium text-gray-700">
                    {item.weight} kg
                  </td>
                  <td className="px-5 py-4 font-medium text-gray-700">
                    {item.deliveryFee.toLocaleString()} MMK
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                          item.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : item.status === "confirmed"
                              ? "bg-blue-100 text-blue-700"
                              : item.status === "assigned"
                                ? "bg-indigo-100 text-indigo-700"
                                : item.status === "picked_up"
                                  ? "bg-purple-100 text-purple-700"
                                  : item.status === "in_transit"
                                    ? "bg-sky-100 text-sky-700"
                                    : item.status === "delivered"
                                      ? "bg-green-100 text-green-700"
                                      : item.status === "cancelled"
                                        ? "bg-red-100 text-red-700"
                                        : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {item.status.replace("_", " ")}
                      </span>

                      {item.status === "pending" && (
                        <>
                          <button
                            className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
                            type="button" onClick={()=>handleConfirm(item._id.toString())}
                          >
                            <CiCircleCheck size={21} />
                          </button>

                          <button
                            className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100"
                            type="button" onClick={()=>handleCancel(item._id.toString())}
                          >
                            <FcCancel size={19} />
                          </button>
                        </>
                      )}

                      {item.status === "confirmed" && (
                        <button className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700">
                          <IoIosBicycle size={21} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-12 text-center text-gray-500"
                >
                  <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-gray-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.8}
                      stroke="currentColor"
                      className="size-6 text-gray-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.25 7.5 12 12m0 0L3.75 7.5M12 12v9m8.25-13.5-7.5-4.33a1.5 1.5 0 0 0-1.5 0l-7.5 4.33A1.5 1.5 0 0 0 3 8.8v6.4a1.5 1.5 0 0 0 .75 1.3l7.5 4.33a1.5 1.5 0 0 0 1.5 0l7.5-4.33a1.5 1.5 0 0 0 .75-1.3V8.8a1.5 1.5 0 0 0-.75-1.3Z"
                      />
                    </svg>
                  </div>
                  <p className="font-medium text-gray-700">
                    No shipments found
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Customer shipments will appear here.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ShipmentTable;
