import React from "react";
import {IoMdRefreshCircle} from "react-icons/io";

export default function UIButtonRefresh({className = "", children, disabled = false, ...props}) {
  return (
    <button
      {...props}
      className={
        `inline-flex items-center px-4 py-2 bg-primary group border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-secondary focus:bg-secondary active:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition ease-in-out duration-150 ${
          disabled && "opacity-25"
        } ` + className
      }
      disabled={disabled}
    >
      <IoMdRefreshCircle className={`h-8 w-8 group-hover:rotate-180 group-active:rotate-45 transition-all ${disabled ? "rotate-180" : "rotate-0"}`} />
    </button>
  );
}
