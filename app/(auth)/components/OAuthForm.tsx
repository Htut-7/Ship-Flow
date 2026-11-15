
import React from "react";
import { FcGoogle } from "react-icons/fc";

function OAuthForm() {
  return (
    <div className="w-full">
      <div className="w-full">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:shadow-md active:scale-[0.98]"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>
      </div>
    </div>
  );
}

export default OAuthForm;
