import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { AiFillDelete } from 'react-icons/ai';
import { BiPencil } from 'react-icons/bi';
import { PiDotsThreeOutlineFill } from 'react-icons/pi';
import Link from 'next/link';

const NotificationTemplateCardMenu = ({ id, handleDeleteClick }) => {
    return (
        <Menu>
            <MenuButton className="inline-flex items-center justify-center text-sm font-semibold ring-offset-background focus-visible:outline-none focus-visible:ring-0 disabled:opacity-50 whitespace-nowrap disabled:pointer-events-none data-[open]:scale-105 flex-none h-8 w-8 bg-white rounded-md border border-passiveBorder border-opacity-70 hover:scale-105 transition-all duration-200">
                <PiDotsThreeOutlineFill className="h-4 w-4" />
            </MenuButton>

            <MenuItems transition anchor="bottom end" className="w-52 origin-top-right rounded-xl border border-passiveBorder bg-white p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0">
                <MenuItem>
                    <Link href={`/notifications/templates/${id}`} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-primary data-[focus]:text-white">
                        <BiPencil className="size-4" />
                        Edit
                    </Link>
                </MenuItem>
                <div className="my-1 mx-2 h-px bg-passiveBorder" />
                <MenuItem>
                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-red-600 data-[focus]:text-white" onClick={() => handleDeleteClick(id)}>
                        <AiFillDelete className="size-4" />
                        Delete
                    </button>
                </MenuItem>
            </MenuItems>
        </Menu>
    );
};

export default NotificationTemplateCardMenu;
