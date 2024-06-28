import React, { useEffect, useState } from 'react';
import { CgSortAz } from 'react-icons/cg';

export default function UIButtonSortWithOptions({ field, handleSortChange, defaultValue, ...restProps }) {
    const [sortOrder, setSortOrder] = useState(false);

    useEffect(() => {
        setSortOrder(defaultValue);
    }, [defaultValue]);

    const handleClick = () => {
        let nextSortOrder;

        if (sortOrder === 'ASC') {
            nextSortOrder = 'DESC';
        } else if (sortOrder === 'DESC') {
            nextSortOrder = false;
        } else {
            nextSortOrder = 'ASC';
        }

        setSortOrder(nextSortOrder);
        handleSortChange(field, nextSortOrder);
    };

    const getIconRotation = sortOrder => (sortOrder === 'ASC' ? 'rotate-180' : '');

    return (
        <div>
            <button
                onClick={handleClick}
                type="button"
                className={`relative -ml-px inline-flex items-center space-x-2 ${
                    sortOrder === false ? 'bg-white  text-themePassiveText' : 'bg-themeSecondary text-themeActiveText hover:bg-themePrimary'
                } rounded-r-md border border-gray-300  px-4 h-full text-sm font-medium text-gray-700  focus:border-themeSecondary  focus:outline-none focus:ring-1 focus:ring-themeSecondary sm:text-sm `}
                {...restProps}
            >
                <CgSortAz className={`h-5 w-5 text-gray-400 duration-300 transition-all ${getIconRotation(sortOrder)}`} aria-hidden="true" />
                <span className="text-xs">Sort</span>
            </button>
        </div>
    );
}
