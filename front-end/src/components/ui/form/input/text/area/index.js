import React, { Fragment } from 'react';
import UIFormInputError from '@/components/ui/form/input/error';

export default function UIFormInputTextArea({ type = 'text', className = '', isFocused = false, error, desc, ...props }) {
    return (
        <Fragment>
            <textarea {...props} className={`sm:text-sm border-gray-300 focus:border-primary focus:ring-primary rounded-md shadow-sm block w-full bg-white ${error ? 'border-red-600' : ''}` + className} />
            {error && <UIFormInputError className="mt-2" message={error} />}
            {desc && <p className="mt-2 text-sm text-gray-500">{desc}</p>}
        </Fragment>
    );
}
