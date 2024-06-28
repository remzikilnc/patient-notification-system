import React, { useState } from 'react';
import UIFormInputText from '@/components/ui/form/input/text';
import UIFormCheckbox from '@/components/ui/form/input/checkbox';

const UIFormInputWithCheckbox = ({type = "text", className = "", defaultValue="", isFocused = false, error, ...props}) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="flex relative flex-wrap items-stretch w-full group">
      <div className="border border-passiveBorder flex items-center justify-center px-3 first:rounded-l-md last:rounded-r-md group-focus-within:border-primary ring-primary transition duration-100">
        <UIFormCheckbox isChecked={isChecked} setIsChecked={setIsChecked}  />
      </div>
      <div className="flex-1 w-full">
        <UIFormInputText disabled={isChecked} defaultValue={isChecked ? '' : defaultValue} type={type} className={`!border-l-0 !rounded-l-none !outline-0 !ring-0 group-focus-within:border-primary !duration-100 ${className}`} isFocused={isFocused} error={error} {...props} />
      </div>
    </div>
  );
};

export default UIFormInputWithCheckbox;