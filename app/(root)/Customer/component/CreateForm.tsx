
"use client";

import React, { useState } from "react";

function CreateForm() {
  const [sender, setSender] = useState({
    name: "",
    phone: "",
    address: {
      addressLine1: "",
      addressLine2: "",
      township: "",
      district: "",
      region: "",
    },
  });

  const [receiver, setReceiver] = useState({
    name: "",
    phone: "",
    address: {
      addressLine1: "",
      addressLine2: "",
      township: "",
      district: "",
      region: "",
    },
  });

  const [description, setDescription] = useState("");
  const [weight, setWeight] = useState("");

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 pb-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Create Shipment
        </h2>
        <p className="text-sm text-gray-500">
          Enter sender, receiver, and package information to create a new
          shipment.
        </p>
      </div>

      <form className="space-y-4">
        {/* Sender Information */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-3 border-b border-gray-100 pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.1a7.5 7.5 0 0 1 15 0A17.9 17.9 0 0 1 12 21.75a17.9 17.9 0 0 1-7.5-1.65Z"
                />
              </svg>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Sender Information
              </h3>
              <p className="text-xs text-gray-500">
                Details of the person sending the package
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Sender Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter sender name..."
                required
                onChange={(e) =>
                  setSender({ ...sender, name: e.target.value })
                }
                value={sender.name}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Sender Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="Enter sender phone number..."
                required
                onChange={(e) =>
                  setSender({ ...sender, phone: e.target.value })
                }
                value={sender.phone}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
              <h4 className="text-sm font-semibold text-gray-800">
                Pickup Address
              </h4>
              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600">
                Sender Location
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  Address Line 1 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="House No., Street Name"
                  required
                  onChange={(e) =>
                    setSender({
                      ...sender,
                      address: {
                        ...sender.address,
                        addressLine1: e.target.value,
                      },
                    })
                  }
                  value={sender.address.addressLine1}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  Address Line 2
                </label>
                <input
                  type="text"
                  placeholder="Ward, village or additional details (optional)"
                  onChange={(e) =>
                    setSender({
                      ...sender,
                      address: {
                        ...sender.address,
                        addressLine2: e.target.value,
                      },
                    })
                  }
                  value={sender.address.addressLine2}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Township <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter township"
                  required
                  value={sender.address.township}
                  onChange={(e) =>
                    setSender({
                      ...sender,
                      address: {
                        ...sender.address,
                        township: e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">
                  District <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter district"
                  required
                  value={sender.address.district}
                  onChange={(e) =>
                    setSender({
                      ...sender,
                      address: {
                        ...sender.address,
                        district: e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  Region / State <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Select or enter region/state"
                  required
                  value={sender.address.region}
                  onChange={(e) =>
                    setSender({
                      ...sender,
                      address: {
                        ...sender.address,
                        region: e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Receiver Information */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-3 border-b border-gray-100 pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.1a7.5 7.5 0 0 1 15 0A17.9 17.9 0 0 1 12 21.75a17.9 17.9 0 0 1-7.5-1.65Z"
                />
              </svg>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Receiver Information
              </h3>
              <p className="text-xs text-gray-500">
                Details of the person receiving the package
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Receiver Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter receiver name..."
                required
                value={receiver.name}
                onChange={(e) =>
                  setReceiver({ ...receiver, name: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Receiver Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="Enter receiver phone number..."
                required
                value={receiver.phone}
                onChange={(e) =>
                  setReceiver({ ...receiver, phone: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
              <h4 className="text-sm font-semibold text-gray-800">
                Delivery Address
              </h4>
              <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-600">
                Receiver Location
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  Address Line 1 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="House No., Street Name"
                  required
                  value={receiver.address.addressLine1}
                  onChange={(e) =>
                    setReceiver({
                      ...receiver,
                      address: {
                        ...receiver.address,
                        addressLine1: e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  Address Line 2
                </label>
                <input
                  type="text"
                  placeholder="Ward, village or additional details (optional)"
                  value={receiver.address.addressLine2}
                  onChange={(e) =>
                    setReceiver({
                      ...receiver,
                      address: {
                        ...receiver.address,
                        addressLine2: e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">
                  Township <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter township"
                  required
                  value={receiver.address.township}
                  onChange={(e) =>
                    setReceiver({
                      ...receiver,
                      address: {
                        ...receiver.address,
                        township: e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">
                  District <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter district"
                  required
                  value={receiver.address.district}
                  onChange={(e) =>
                    setReceiver({
                      ...receiver,
                      address: {
                        ...receiver.address,
                        district: e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  Region / State <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Select or enter region/state"
                  required
                  value={receiver.address.region}
                  onChange={(e) =>
                    setReceiver({
                      ...receiver,
                      address: {
                        ...receiver.address,
                        region: e.target.value,
                      },
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Package Details */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-3 border-b border-gray-100 pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m20.25 7.5-8.25 4.5m0 0L3.75 7.5m8.25 4.5v9m8.25-13.5-8.25-4.5L3.75 7.5m16.5 0v9L12 21l-8.25-4.5v-9"
                />
              </svg>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Package Details
              </h3>
              <p className="text-xs text-gray-500">
                Provide information about the shipment
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">
                Parcel Description
              </label>
              <textarea
                placeholder="Describe the package (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full resize-y rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">
                Weight (kg) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0.1"
                step="0.1"
                placeholder="Estimate parcel weight..."
                required
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Shipment
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateForm;
