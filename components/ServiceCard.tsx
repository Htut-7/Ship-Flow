
import React, { ReactNode } from "react";

interface serviceProps {
  title: string;
  icon: ReactNode;
  count: number;
}

function ServiceCard({ title, icon, count }: serviceProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          {icon}
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-500">
            {title}
          </h2>
        </div>
      </div>

      <div>
        <span className="text-2xl font-bold text-gray-900">
          {count}
        </span>
      </div>
    </div>
  );
}

export default ServiceCard;
