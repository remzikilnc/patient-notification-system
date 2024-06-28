'use client';
import React, { Fragment, useState } from 'react';
import SensitiveDataCell from '@/components/ui/table/cell/sensitive';
import UIButtonPrimary from '@/components/ui/button/primary';
import PatientContactModal from '@/components/patient/contact/modal';

const PatientFormContacts = ({ contacts, handleSaveContact, handleDeleteContact }) => {
    const [showModal, setShowModal] = useState(false);
    const [contact, setContact] = useState({});

    const handleEditClick = contact => {
        setContact(contact);
        setShowModal(true);
    };
    const handleAddClick = () => {
        setContact({});
        setShowModal(true);
    };

    return (
        <Fragment>
            <div className="flex justify-between pt-5">
                <h4 className="text-md font-semibold dark:text-themeHoverText">Contacts</h4>
                <UIButtonPrimary type="button" onClick={handleAddClick}>
                    Add Contact
                </UIButtonPrimary>
            </div>

            <div className="overflow-x-auto">
                <div className="inline-block min-w-full py-2 align-middle">
                    <div className="overflow-hidden rounded-md border border-passiveBorder">
                        <table className="min-w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-4 cursor-default">
                                        Name
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Surname
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Type
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        E-mail
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Phone
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Contact Preference
                                    </th>
                                    <th scope="col" className="pl-1 sm:pr-2 pr-2 py-3.5 text-left text-sm font-semibold text-gray-900"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {contacts?.map((contact, index) => (
                                    <tr key={index}>
                                        <td className="whitespace-nowrap py-2.5 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-4">{contact?.name}</td>
                                        <td className="whitespace-nowrap px-3 py-2.5 text-sm text-gray-500">{contact?.surname}</td>
                                        <td className="whitespace-nowrap px-3 py-2.5 text-sm text-gray-500">Type</td>
                                        <SensitiveDataCell data={contact?.email} />
                                        <SensitiveDataCell data={contact?.phoneNumber} />
                                        <td className="whitespace-nowrap px-3 py-2.5 text-sm text-gray-500">Email</td>
                                        <td className="relative whitespace-nowrap py-2.5 pl-1 pr-2 text-right text-sm font-thin sm:pr-2">
                                            <button type="button" onClick={handleEditClick.bind(this, contact)} className="text-white mr-4 p-1 bg-primary rounded hover:bg-secondary md:text-sm text-xs min-w-12">
                                                Edit
                                            </button>
                                            <button type="button" onClick={handleDeleteContact.bind(this, contact)} className="bg-red-600 p-1 text-white rounded hover:bg-red-700 md:text-sm text-xs min-w-12">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <PatientContactModal setIsOpen={setShowModal} isOpen={showModal} contact={contact} handleSaveContact={handleSaveContact} />
        </Fragment>
    );
};

export default PatientFormContacts;
