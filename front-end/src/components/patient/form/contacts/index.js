"use client";
import React, {Fragment, useState} from 'react';
import SensitiveDataCell from "@/components/ui/table/cell/sensitive";
import UIButtonPrimary from "@/components/ui/button/primary";
import PatientContactModal from "@/components/patient/contact/modal";

const PatientFormContacts = ({contacts, handleSaveContact, addRowText}) => {
    const [showModal, setShowModal] = useState(false);
    const [contact, setContact] = useState({});

    const handleEditClick = (contact) => {
        setContact(contact);
        setShowModal(true);
    }
    const handleAddClick = () => {
        setContact({});
        setShowModal(true);
    };

    return (
        <Fragment>
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full py-2 align-middle">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full divide-y-2 divide-gray-300 ">
                            <thead className="bg-gray-50 ">
                            <tr>
                                <th scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900  sm:pl-6">
                                    <a href="#" className="group inline-flex">
                                        Name
                                    </a>
                                </th>
                                <th scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    <a href="#" className="group inline-flex">
                                        Surname
                                    </a>
                                </th>
                                <th scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    <a href="#" className="group inline-flex">
                                        Type
                                    </a>
                                </th>
                                <th scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    <a href="#" className="group inline-flex">
                                        E-mail
                                    </a>
                                </th>
                                <th scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    <a href="#" className="group inline-flex">
                                        Phone
                                    </a>
                                </th>
                                <th scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    <a href="#" className="group inline-flex">
                                        Contact Preference
                                    </a>
                                </th>
                                <th scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    <a href="#" className="group inline-flex"></a>
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                            {contacts?.map((contact, index) => (
                                <tr key={index}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{contact?.name}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{contact?.surname}</td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Type</td>
                                    <SensitiveDataCell data={contact?.email}/>
                                    <SensitiveDataCell data={contact?.phoneNumber}/>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Email</td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-thin sm:pr-6">
                                        <button
                                            type="button"
                                            onClick={handleEditClick.bind(this, contact)}
                                            className="text-white mr-4 p-1 bg-primary rounded hover:bg-secondary md:text-sm text-xs"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={e => {
                                                console.log(contact.id);
                                            }}
                                            className="bg-red-600 p-1 text-white rounded hover:bg-red-700 md:text-sm text-xs"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <UIButtonPrimary className="w-full justify-center py-4 focus:!ring-0 focus:!ring-offset-0" type="button" onClick={handleAddClick}>{addRowText}</UIButtonPrimary>
                    </div>
                </div>
            </div>
            <PatientContactModal setIsOpen={setShowModal} isOpen={showModal} contact={contact} handleSaveContact={handleSaveContact}/>
        </Fragment>
    );
};

export default PatientFormContacts;