import React, {Fragment, useState} from "react";
import {MultiSelect} from "react-multi-select-component";
import UIFormInputError from "@/components/ui/form/input/error";

const FormInputSelectableMultiple = ({data, initialState, onChange, error, ...props}) => {
  const [selected, setSelected] = useState(initialState ?? []);
  const onChangeHandler = selected => {
    setSelected(selected);
    onChange(selected.map(option => option.value));
  };
  return (
    <Fragment>
      <MultiSelect overrideStrings={{selectSomeItems: " ", allItemsAreSelected: "All options are selected"}} options={data} value={selected} onChange={onChangeHandler} {...props} />
      {error && <UIFormInputError className="mt-2" message={error} />}
    </Fragment>
  );
};

export default FormInputSelectableMultiple;
