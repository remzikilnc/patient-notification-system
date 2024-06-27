"use client";
import React, { useRef} from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle} from "@headlessui/react";
import UIButtonPrimary from "@/components/ui/button/primary";
import UIFormLabel from "@/components/ui/form/label";
import UIFormInputText from "@/components/ui/form/input/text";
import UIFormInputTextArea from "@/components/ui/form/input/text/area";

const PatientContactModal = ({contact = {},errors, isOpen, setIsOpen, handleSaveContact}) => {
    const formRef = useRef();

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        const contactData = Object.fromEntries(formData.entries());
        if (contact.id) {
            contactData.id = contact.id;
        }
        handleSaveContact(contactData);
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
                                {contact.id ? "Edit" : "Add"} Contact
                            </DialogTitle>
                            <form ref={formRef} onSubmit={submit} className="mt-5">
                                <div className="grid grid-cols-1 gap-y-4 gap-x-4 border-b border-passiveBorder pb-5">
                                    <div className="grid md:grid-cols-2 grid-cols-1 gap-y-3 md:gap-y-0 gap-x-6">
                                        <div className="col-span-1">
                                            <UIFormLabel htmlFor="name" className="!font-medium" label="Name"/>
                                            <UIFormInputText id="name" name="name" defaultValue={contact?.name} error={errors?.name} required isFocused autoComplete="title"/>
                                        </div>
                                        <div className="col-span-1">
                                            <UIFormLabel htmlFor="surname" className="!font-medium" label="Surname"/>
                                            <UIFormInputText id="surname" name="surname" defaultValue={contact?.surname} error={errors?.surname} required isFocused autoComplete="surname"/>
                                        </div>
                                    </div>
                                    <div>
                                        <UIFormLabel htmlFor="notes" className="!font-medium" label="Notes"/>
                                        <div className="mt-1">
                                            <UIFormInputTextArea
                                                id="notes"
                                                name="notes"
                                                defaultValue={contact?.notes}
                                                error={errors?.notes}
                                                rows={3}
                                                desc="Write a few sentences about this contact."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>

                            <div className="mt-4 flex justify-end">
                             <div className="flex gap-x-2">
                                 <UIButtonPrimary type="button" className="!bg-gray-800 hover:!bg-gray-700" onClick={submit}>Close</UIButtonPrimary>
                                 <UIButtonPrimary onClick={submit}>{contact.id ? "Update" : "Create"} Contact</UIButtonPrimary>
                             </div>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default PatientContactModal;

/*
private String name;
private String surname;
private String email;
private String phoneNumber;
private String address;
private String city;
private String state;
private String zip;
private String country;
private String relationship;
private String notes;
private String contactType;
private String contactMethod;
*/
