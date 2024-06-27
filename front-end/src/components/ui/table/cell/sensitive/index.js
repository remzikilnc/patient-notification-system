import React, { useState } from 'react';

function SensitiveDataCell({ label, data, className }) {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const censorData = (data) => {
        if (isVisible || data.length <= 3) {
            return data;
        }
        return `${data.substring(0, 3)}${'*'.repeat(data.length - 3)}`;
    };

    return (
        <td className={`whitespace-nowrap px-3 py-4 text-sm text-gray-500 cursor-pointer ${className || ''}`} onClick={toggleVisibility} title="Click to show/hide sensitive data">
             {censorData(data)}
        </td>
    );
}

export default SensitiveDataCell;
