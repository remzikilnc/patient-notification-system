'use client';
import React, { useState } from 'react';
import UIButtonPrimary from '@/components/ui/button/primary';
import NotificationCriteriaModal from '@/components/notification/criteria/modal';
import { IoAddOutline } from 'react-icons/io5';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { PiDotsThreeOutlineFill } from 'react-icons/pi';
import { BiPencil } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';

const TemplateFormCriterias = ({ criterias, handleCreateCriteria, handleDeleteCriteria }) => {
    const [showModal, setShowModal] = useState(false);
    const [criteria, setCriteria] = useState({});

    const handleEditClick = contact => {
        setCriteria(contact);
        setShowModal(true);
    };
    const handleAddClick = () => {
        setCriteria({});
        setShowModal(true);
    };

    return (
        <section className="border-b border-passiveBorder pb-5">
            <div className="flex justify-between pt-5">
                <UIButtonPrimary className="gap-x-2 w-full justify-center" type="button" onClick={handleAddClick}>
                    <IoAddOutline className="h-5 w-5" />
                    <span> Add Criteria</span>
                </UIButtonPrimary>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-4">
                {criterias.map((criteria, index) => {
                    const validKeys = Object.keys(criteria).filter(key => key !== 'id' && validCriteriaKeys[key] && criteria[key] != null);
                    const numActiveCriteria = validKeys.length;
                    return (
                        <div key={criteria.id} className="bg-white border rounded-md group relative">
                            <span className="text-xs absolute py-0.5 px-1 rounded-tl-md rounded-br-md bg-primary text-white">Id: #{criteria.id}</span>
                            <div className="flex w-full justify-end -ml-2 mt-2">
                                <Menu>
                                    <MenuButton className="inline-flex items-center justify-center text-sm font-semibold ring-offset-background focus-visible:outline-none focus-visible:ring-0 disabled:opacity-50 whitespace-nowrap disabled:pointer-events-none data-[open]:scale-105 flex-none h-8 w-8 bg-white rounded-md border border-passiveBorder border-opacity-70 hover:scale-105 transition-all duration-200">
                                        <PiDotsThreeOutlineFill className="h-4 w-4" />
                                    </MenuButton>

                                    <MenuItems
                                        transition
                                        anchor="bottom end"
                                        className="w-52 origin-top-right rounded-xl border border-passiveBorder bg-white p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                                    >
                                        <MenuItem>
                                            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-primary data-[focus]:text-white" onClick={() => handleEditClick(criteria)}>
                                                <BiPencil className="size-4" />
                                                Edit
                                            </button>
                                        </MenuItem>
                                        <div className="my-1 mx-2 h-px bg-passiveBorder" />
                                        <MenuItem>
                                            <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-red-600 data-[focus]:text-white" onClick={() => handleDeleteCriteria(criteria)}>
                                                <AiFillDelete className="size-4" />
                                                Delete
                                            </button>
                                        </MenuItem>
                                    </MenuItems>
                                </Menu>
                            </div>

                            <span className="w-full flex flex-col items-center justify-center text-sm pt-0 p-2">
                                <span className="font-semibold">Criteria {index + 1}</span>
                                <span className="text-xs">Total Criteria: {numActiveCriteria}</span>
                            </span>
                            <div className={`items-center grid ${numActiveCriteria > 0 ? `grid-cols-${numActiveCriteria}` : 'grid-cols-1'} gap-x-1 bg-white`}>
                                {validKeys.map(key => (
                                    <div key={key} className="flex flex-col bg-body rounded-md rounded-t-none">
                                        <div className="flex flex-col items-center justify-center pt-1 gap-y-2">
                                            <span className="text-xs font-semibold truncate ">{formatCriteriaLabel(key)}</span>
                                            <span className="flex font-semibold w-full items-center truncate justify-center bg-primary rounded-md rounded-t-none text-xs text-white">{criteria[key]}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
            {criterias && <NotificationCriteriaModal setIsOpen={setShowModal} isOpen={showModal} criteria={criteria} handleCreateCriteria={handleCreateCriteria} />}
        </section>
    );
};

export default TemplateFormCriterias;

const validCriteriaKeys = {
    minAge: 'Min Age',
    maxAge: 'Max Age',
    gender: 'Gender',
};
const formatCriteriaLabel = key => {
    switch (key) {
        case 'minAge':
            return 'Min Age';
        case 'maxAge':
            return 'Max Age';
        case 'gender':
            return 'Gender';
    }
};
