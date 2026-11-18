
import React, { ReactNode } from "react";

interface serviceProps {
  title: string;
  icon: ReactNode;
  count: number;
}

function ServiceCard({ title, icon, count }: serviceProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-xl text-blue-600">
        {icon}
      </div>

      <div className="mt-5">
        <span className="text-3xl font-bold tracking-tight text-gray-900">
          {count}
        </span>

        <h2 className="mt-1 text-sm font-medium text-gray-500">
          {title}
        </h2>
      </div>
    </div>
  );
}

export default ServiceCard;
