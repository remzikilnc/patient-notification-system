import React, {Fragment} from "react";
import UIFormInputError from "@/components/ui/form/input/error";

export default function UIFormTextWithLink({type = "text", linkPrew, className = "", isFocused = false, error, ...props}) {
  return (
    <Fragment>
      <div className="flex">
        <span className={`inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-white px-3 text-gray-500 sm:text-sm ${error ? "border-red-600" : ""}`}>{linkPrew}</span>
        <input
          {...props}
          type={type}
          className={
            " border-gray-300 focus:border-primary focus:ring-themeSecondary" +
            `rounded rounded-l-none shadow-sm block w-full bg-white h-[40px] ${error ? "border-red-600" : ""}` +
            className
          }
        />
      </div>
      {error && <UIFormInputError className="mt-2" message={error} />}
    </Fragment>
  );
}
