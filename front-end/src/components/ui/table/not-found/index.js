import React from 'react';

const UITableNotFound = ({title = 'No match', Icon}) => {
    return (
        <tr>
            <td colSpan="8" className="py-6 text-gray-500 dark:text-themePassiveText">
                <div className="flex items-center justify-center flex-col gap-y-6">
                    <Icon className="h-32 w-32 bg-secondary rounded text-white dark:text-theme p-4" />
                    <p className="flex flex-col">
                        <span className="text-black dark:text-themeActiveText text-center">{title}</span>
                        <span className="text-gray-400 dark:text-themePassiveText">Try another search query or different filters.</span>
                    </p>
                </div>
            </td>
        </tr>
    );
};

export default UITableNotFound;
