import React, {useState, Fragment} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "@/styles/datepickerstyles.css";
import UIFormInputError from "@/components/ui/form/input/error";

function UIFormInputDatePicker({initialDate, className, error, dateFormat = "yyyy-MM-dd", placeholder = "Select a date", ...props}) {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  return (
    <Fragment>
      <DatePicker
        portalId="root-portal"
        className={`border-gray-300 focus:border-secondary rounded-md focus:!ring-0 shadow-sm block w-full bg-white h-[40px] ${error ? "border-red-600" : ""}` + className}
        selected={selectedDate}
        dateFormat={dateFormat}
        onChange={date => setSelectedDate(date)}
        isClearable
        placeholderText={placeholder}
        showYearDropdown
        showMonthDropdown
        monthsShown
        dropdownMode="select"
        {...props}
      />
      {error && <UIFormInputError className="mt-2" message={error} />}
    </Fragment>
  );
}

export default UIFormInputDatePicker;
