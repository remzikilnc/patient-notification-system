import React, {Fragment} from "react";
import UIFormInputError from "@/components/ui/form/input/error";

export default function UIFormInputText({type = "text", className = "", isFocused = false, error, ...props}) {
  return (
    <Fragment>
      <input
        {...props}
        type={type}
        className={
          " border-gray-300 focus:border-themeSecondary focus:ring-primary" +
          `rounded shadow-sm block w-full bg-white h-[40px] ${error ? "border-red-600" : ""}` +
          className
        }
      />
      {error && <UIFormInputError className="mt-2" message={error} />}
    </Fragment>
  );
}
