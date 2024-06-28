'use client';

import React, {  useRef, useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, Switch } from '@headlessui/react';
import UIButtonPrimary from '@/components/ui/button/primary';
import UIFormLabel from '@/components/ui/form/label';
import UIFormInputWithCheckbox from '@/components/ui/form/input/text/with-checkbox';
import UIFormInputSelectableWithIconCheckbox from '@/components/ui/form/input/selectable/with-icon/checkbox';

const NotificationCriteriaModal = ({ criteria = {}, errors, isOpen, setIsOpen, handleCreateCriteria }) => {
    const formRef = useRef();
    const [selectedGender, setSelectedGender] = useState(criteria?.gender || []);

    const submit = e => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        const criteriaData = Object.fromEntries(formData.entries());
        criteriaData.id = criteria?.id;
        criteriaData.gender = selectedGender;
        handleCreateCriteria(criteriaData);
        setIsOpen(false);
    };
    return (
        <>
            <Dialog open={isOpen} as="div" className="relative z-50 focus:outline-none" onClose={() => setIsOpen(false)}>
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel transition className="w-full max-w-3xl rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
                            <DialogTitle as="h3" className="font-medium">
                                {criteria.id ? 'Update' : 'Create'} Criteria
                            </DialogTitle>
                            <form ref={formRef} onSubmit={submit} className="mt-5">
                                <div className="grid grid-cols-1 gap-y-4 gap-x-4 border-b border-passiveBorder pb-5">
                                    <div className="grid md:grid-cols-3 grid-cols-1 gap-y-3 md:gap-y-0 gap-x-6">
                                        <div className="col-span-1">
                                            <UIFormLabel htmlFor="gender" label="Gender" />
                                            <UIFormInputSelectableWithIconCheckbox data={['MALE', 'FEMALE']} selectedValue={selectedGender} setSelectedValue={setSelectedGender} error={errors?.gender} />
                                        </div>
                                        <div className="col-span-1">
                                            <UIFormLabel htmlFor="minAge" label="Minimum Age" />
                                            <UIFormInputWithCheckbox id="minAge" type="number" min="0" max="150" name="minAge" isFocused />
                                        </div>
                                        <div className="col-span-1">
                                            <UIFormLabel htmlFor="maxAge" label="Maximum Age" />
                                            <UIFormInputWithCheckbox id="maxAge" type="number" min="0" max="150" name="maxAge" isFocused />

                                        </div>
                                    </div>
                                </div>
                            </form>

                            <div className="mt-4 flex justify-end">
                                <div className="flex gap-x-2">
                                    <UIButtonPrimary type="button" className="!bg-gray-800 hover:!bg-gray-700" onClick={() => setIsOpen(false)}>
                                        Close
                                    </UIButtonPrimary>
                                    <UIButtonPrimary onClick={submit}>{criteria.id ? 'Update' : 'Create'} Criteria</UIButtonPrimary>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default NotificationCriteriaModal;
