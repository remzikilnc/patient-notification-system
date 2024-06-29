import React, { Fragment } from 'react';
import UIFormLabel from '@/components/ui/form/label';
import UIFormInputText from '@/components/ui/form/input/text';
import UIButtonDanger from '@/components/ui/button/danger';
import UIButtonPrimary from '@/components/ui/button/primary';
import { IoAddOutline } from 'react-icons/io5';

const UIFormInputKeyValue = ({ identifiers, label, onChange, onAdd, onRemove }) => {
    return (
        <Fragment>
            {identifiers.map((identifier, index) => (
                <div key={index} className="grid grid-cols-12 gap-x-2">
                    <div className="flex flex-col col-span-5">
                        <UIFormLabel className="!font-medium" label={`${label} Type`} />
                        <UIFormInputText className="flex " type="text" name="type" value={identifier.type} onChange={event => onChange(index, event)} />
                    </div>
                    <div className="flex flex-col col-span-5 xl:col-span-6">
                        <UIFormLabel className="!font-medium" label={`${label} Value`} />
                        <UIFormInputText type="text" name="value" value={identifier.value} onChange={event => onChange(index, event)} />
                    </div>
                    <div className="col-span-2 xl:col-span-1 items-end justify-center flex">
                        <UIButtonDanger type="button" className="h-[40px] w-full justify-center" onClick={() => onRemove(index)}>
                            Delete
                        </UIButtonDanger>
                    </div>
                </div>
            ))}
            <UIButtonPrimary type="button" className="h-[40px] mt-2 justify-center text-activeText gap-x-0.5 !backdrop-blur-xl" onClick={onAdd}>
                <IoAddOutline className="h-5 w-5" />
                <span>NEW {label}</span>
            </UIButtonPrimary>
        </Fragment>
    );
};

export default UIFormInputKeyValue;
