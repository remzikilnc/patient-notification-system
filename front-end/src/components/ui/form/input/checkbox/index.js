import React, { useState } from 'react';
import { Checkbox } from '@headlessui/react';
import { FaCheck } from 'react-icons/fa';

const UIFormCheckbox = ({ isChecked, setIsChecked, className, ...props }) => {
    return (
        <Checkbox checked={isChecked} onChange={setIsChecked} className={`group size-5 rounded border bg-white data-[checked]:bg-primary items-center justify-center flex ${className}`} {...props}>
            <FaCheck className="text-white h-3 w-3 items-center opacity-0 group-data-[checked]:opacity-100" />
        </Checkbox>
    );
};

export default UIFormCheckbox;
