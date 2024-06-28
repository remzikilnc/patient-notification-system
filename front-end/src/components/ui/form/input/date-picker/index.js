import React, { useState, useEffect, Fragment } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '@/styles/datepickerstyles.css';
import UIFormInputError from '@/components/ui/form/input/error';

function UIFormInputDatePicker({ initialDate, className, error, dateFormat = 'yyyy-MM-dd', placeholder = 'Select a date', ...props }) {
    const parseDate = dateStr => {
        if (!dateStr) return new Date();
        const [year, month, day] = dateStr.split('-');
        return new Date(year, month - 1, day); // JS months are 0-indexed
    };

    const [startDate, setStartDate] = useState(parseDate(initialDate));

    useEffect(() => {
        setStartDate(parseDate(initialDate));
    }, [initialDate]);

    return (
        <Fragment>
            <DatePicker
                portalId="root-portal"
                className={`border-gray-300 w-full focus:border-secondary rounded-md focus:!ring-0 shadow-sm block w-full bg-white h-[40px] ${error ? 'border-red-600' : ''}` + className}
                selected={startDate}
                onChange={date => setStartDate(date)}
                dateFormat={dateFormat}
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
