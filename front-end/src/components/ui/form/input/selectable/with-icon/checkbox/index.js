'use client';

import React, { Fragment, useEffect, useState } from 'react';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { PiCaretUpDownLight } from 'react-icons/pi';
import { BsCheck2 } from 'react-icons/bs';
import UIFormInputError from '@/components/ui/form/input/error';
import UIFormCheckbox from '@/components/ui/form/input/checkbox';

export default function UIFormInputSelectableWithIconCheckbox({ options = 'down', data, error, label, selectedValue, setSelectedValue }) {
    const [query, setQuery] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    const filterDataItem = item => {
        if (typeof item === 'number') {
            return item === parseInt(query, 10);
        }
        if (typeof item === 'string') {
            return item.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''));
        }
        return false;
    };

    const filteredData = query === '' ? data : data.filter(filterDataItem);

    useEffect(() => {
        if (!isChecked) {
            setSelectedValue('');
        }
    }, [isChecked]);

    return (
        <Fragment>
            <div className="flex relative flex-wrap items-stretch w-full group">
                <div className={`${isChecked ? 'border-primary' : ''} border border-passiveBorder flex items-center justify-center px-3 first:rounded-l-md last:rounded-r-md group-focus-within:border-primary ring-primary transition duration-100`}>
                    <UIFormCheckbox isChecked={isChecked} setIsChecked={setIsChecked} />
                </div>
                <div className="flex-1 w-full">
                    <Combobox value={selectedValue} onChange={setSelectedValue}>
                        {label && <Combobox.Label className="block text-xs font-thin text-theme dark:text-themePassiveText mb-1">{label}</Combobox.Label>}
                        <div className="relative">
                            <ComboboxInput
                                disabled={!isChecked}
                                className={`block w-full rounded-md !border-l-0 rounded-l-none ${
                                    options === 'up' ? 'rounded-t-none' : ''
                                } ${isChecked ? 'border-primary' : ''} border h-[40px] border-gray-300 bg-white transition duration-100 py-2 px-3 text-sm placeholder-gray-500 focus:border-primary focus:text-passiveText focus:outline-none focus:ring-0 sm:text-sm`}
                                onChange={event => setQuery(event.target.value)}
                                displayValue={item => item}
                            />
                            <ComboboxButton disabled={!isChecked} className="absolute inset-y-0 right-0 group flex items-center rounded-r-md px-2 focus:outline-none">
                                <PiCaretUpDownLight className="h-5 w-5 text-gray-400 " aria-hidden="true" />
                            </ComboboxButton>

                            {filteredData.length > 0 && (
                                <ComboboxOptions className={`absolute z-10 ${options === 'up' ? 'bottom-full' : ''} group mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}>
                                    {filteredData.map((item, index) => (
                                        <ComboboxOption key={index} value={item} className="group flex justify-between cursor-default select-none items-center gap-2 py-1.5 px-3 data-[focus]:bg-primary data-[selected]:bg-primary data-[selected]:text-white data-[focus]:text-white">
                                            <span>{item}</span>
                                            <BsCheck2 className="invisible size-5 fill-white group-data-[selected]:visible" />
                                        </ComboboxOption>
                                    ))}
                                </ComboboxOptions>
                            )}
                        </div>
                    </Combobox>
                </div>
            </div>

            {error && <UIFormInputError className="mt-2" message={error} />}
        </Fragment>
    );
}
