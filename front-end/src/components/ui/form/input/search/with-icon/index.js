"use client";
import React from "react";
import {BsSearch} from "react-icons/bs";

export default function UIFormInputSearchWithIcon(props) {
  const {label, handleChange, value, Icon, handleSortClick, children, ...restProps} = props;

  return (
    <div>
      <div className="flex rounded-md shadow-sm">
        <div id="search-container" className="relative flex flex-grow items-stretch z-20">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">{Icon ? <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" /> : <BsSearch className="h-5 w-5 text-themePassiveText" aria-hidden="true" />}</div>
          <input
            value={value}
            type="search"
            onChange={e => handleChange(e)}
            className={`block w-full rounded border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-xs placeholder-gray-500 focus:border-themeSecondary focus:text-themePassiveText focus:ring-0 focus:outline-none ${children ? "rounded-r-none" : ""}`}
            {...restProps}
          />
        </div>
        <div id="transparent_black" className="bg-black/20 absolute inset-0 min-h-screen hidden backdrop-blur-sm -z-10"></div>
        {children}
      </div>
    </div>
  );
}
