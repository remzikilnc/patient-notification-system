"use client";

import React, {useState} from "react";
import {Combobox} from "@headlessui/react";
import {PiCaretUpDownLight} from "react-icons/pi";
import {BsCheck2} from "react-icons/bs";
import {classNames} from "@/lib/functions/classNames";

export default function UIFormInputSelectableWithIcon({options = "down", data, label, selectedValue, setSelectedValue}) {
  const [query, setQuery] = useState("");

  const filterDataItem = item => {
    if (typeof item === "number") {
      return item === parseInt(query, 10);
    }
    if (typeof item === "string") {
      return item.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, ""));
    }
    return false;
  };

  const filteredData = query === "" ? data : data.filter(filterDataItem);

  return (
    <Combobox as="div" value={selectedValue} onChange={setSelectedValue}>
      {label && <Combobox.Label className="block text-xs font-thin text-theme dark:text-themePassiveText mb-1">{label}</Combobox.Label>}

      <div className="relative">
        <Combobox.Input
          className={`block w-full rounded-md  ${
            options === "up" ? "rounded-t-none" : ""
          } border border-gray-300 bg-white py-2 px-3 text-sm placeholder-gray-500 focus:border-themeSecondary dark:focus:border-themeSecondary dark:text-themePassiveText  focus:text-themePassiveText focus:outline-none focus:ring-0 sm:text-sm`}
          onChange={event => setQuery(event.target.value)}
          displayValue={item => item}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <PiCaretUpDownLight className="h-5 w-5 text-gray-400 " aria-hidden="true" />
        </Combobox.Button>

        {filteredData.length > 0 && (
          <Combobox.Options className={`absolute z-10 ${options === "up" ? "bottom-full" : ""} mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}>
            {filteredData.map((item, index) => (
              <Combobox.Option key={index} value={item} className={({active}) => classNames("relative cursor-default select-none py-2 pl-3 pr-9 ", active ? "bg-primary text-white" : "text-gray-900 dark:text-themePassiveText")}>
                {({active, selected}) => (
                  <>
                    <span className={classNames("block truncate", selected ? "font-semibold dark:text-themeActiveText" : "")}>{item}</span>
                    {selected ? (
                      <span className={classNames("absolute inset-y-0 right-0 flex items-center pr-4", active ? "text-white" : "text-themeSecondary")}>
                        <BsCheck2 className="h-5 w-5 " aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
