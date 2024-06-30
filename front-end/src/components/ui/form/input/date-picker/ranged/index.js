import React, {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function UIFormInputDatePickerRanged({prevStartDate, prevEndDate, className, nextStartDate, nextEndDate, prevSelected, endSelected, prevPlaceHolder = "Start Date", endPlaceHolder = "End Date", ...props}) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <>
      <DatePicker
        className={`border-gray-300 focus:border-secondary rounded-md focus:!ring-0 shadow-sm block w-full bg-white h-[40px] ${error ? "border-red-600" : ""}` + className}
        selected={prevSelected}
        onChange={date => setStartDate(date)}
        selectsStart
        startDate={prevStartDate}
        endDate={prevEndDate}
        dateFormat="dd/MM/yyyy"
        isClearable
        placeholderText={prevPlaceHolder}
        {...props}
      />
      <DatePicker
        className={`border-gray-300 focus:border-secondary rounded-md focus:!ring-0 shadow-sm block w-full bg-white h-[40px] ${error ? "border-red-600" : ""}` + className}
        selected={endSelected}
        onChange={date => setEndDate(date)}
        selectsEnd
        startDate={nextStartDate}
        endDate={nextEndDate}
        minDate={startDate}
        dateFormat="dd/MM/yyyy"
        isClearable
        placeholderText={endPlaceHolder}
        {...props}
      />
    </>
  );
}

export default UIFormInputDatePickerRanged;
