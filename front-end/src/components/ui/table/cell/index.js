import React from "react";
import Link from "next/link";

const UITableCell = ({type, value, item, colId, endpoint, className, text = "Edit"}) => {
  switch (type) {
    case "text":
      return (
        <td className="whitespace-nowrap px-3 py-4 text-sm">
          {endpoint ? (
            <div className="flex items-center">
              <Link href={`${endpoint}/${value}`} className="text-sm text-gray-600">
                {value}
              </Link>
            </div>
          ) : (
            <div className="flex items-center">
              <div className={`text-sm text-gray-600 ${className}`}>{value}</div>
            </div>
          )}
        </td>
      );
    case "highlight":
      return (
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
          {Array.isArray(value) ? (
            value.length > 0 ? (
              <span className={`inline-flex rounded-md text-center bg-primary px-2 mx-0.5 text-xs font-semibold leading-5 text-white ${className}`}>{value[0].name.charAt(0).toUpperCase() + value[0].name.slice(1)}</span>
            ) : (
              <span className={`inline-flex rounded-md text-center bg-primary px-2 mx-0.5 text-xs font-semibold leading-5 text-white ${className}`}>N/A</span>
            )
          ) : (
            <span className={`inline-flex rounded-md text-center bg-primary px-2 mx-0.5 text-xs font-semibold leading-5 text-white ${className}`}>{value.charAt(0).toUpperCase() + value.slice(1)}</span>
          )}
        </td>
      );
    case "number":
      return (
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
          <div className={`text-gray-600 ${className}`}>{value}</div>
        </td>
      );
    case "date":
      return (
        <td className="whitespace-nowrap px-3 py-4 text-sm">
          <div className="flex items-center">
            <div className={`text-sm text-gray-600 ${className}`}>{new Date(value).toLocaleDateString("tr-TR", {year: "numeric"})}</div>
          </div>
        </td>
      );
    case "boolean":
      return (
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
          {value ? (
            <span className={`inline-flex rounded-md text-center bg-green-300 px-2 text-xs font-semibold leading-5 text-green-800 ${className}`}>Active</span>
          ) : (
            <span className={`inline-flex rounded-md text-center bg-red-300 px-2 text-xs font-semibold leading-5 text-red-800 ${className}`}>Passive</span>
          )}
        </td>
      );
    case "actions":
      return (
        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
          <Link href={`${endpoint}/${item.id}`} className={`cursor-pointer px-2 py-1 mb-2 rounded font-thin text-sm hover:text-themeHoverText text-gray-200 truncate text-center bg-primary hover:bg-secondary ${className}`}>
            {text}
            <span className="sr-only">
              {text} {item.name}
            </span>
          </Link>
        </td>
      );
    default:
      return (
        <td className="whitespace-nowrap px-3 py-4 text-sm">
          <div className="flex items-center">
            <div className={`text-sm text-gray-600 dark:text-themePassiveText ${className}`}>{value}</div>
          </div>
        </td>
      );
  }
};

export default UITableCell;
