'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import NotificationTemplateCardMenu from '@/components/notification/template/card/menu';
import { IoMdMail } from 'react-icons/io';
import { MdSms } from 'react-icons/md';
import fetchServer from '@/lib/fetch-server';

const NotificationTemplateCard = ({ data }) => {
    const [template, setTemplate] = useState(data);
    const handleDeleteClick = async id => {
        const res = await fetchServer({
            endpoint: `/notifications/templates/${id}`,
            method: 'DELETE',
        });
        res.status === 204 && setTemplate(template.filter(template => template.id !== id));
    };

    return template.map(template => {
        return (
            <div key={template.id} className="rounded-md md:bg-body bg-white border border-passiveBorder shadow-sm relative overflow-hidden">
                <div className="absolute inset-0 -z-10">
                    <span className="flex w-full h-full justify-center items-center">
                        {template.notificationTypes.includes('EMAIL') && <IoMdMail className="text-primary/70 opacity-5  left-0 h-full" />}
                        {template.notificationTypes.includes('SMS') && <MdSms className="text-primary/70 opacity-5 w-1/2 h-full" />}
                    </span>
                </div>
                <div className="flex space-y-1.5 px-4 py-4 border-b border-border flex-row items-center gap-3 border-none mb-0">
                    <div className="flex-1 flex gap-x-0.5">
                        {template.notificationTypes.map(type => (
                            <div key={type} className="inline-flex items-center text-white bg-black rounded-md border px-2 py-0.5 text-xs font-semibold transition-colors lowercase">
                                {type}
                            </div>
                        ))}
                    </div>

                    <NotificationTemplateCardMenu id={template?.id} handleDeleteClick={handleDeleteClick} />
                </div>
                <div className="p-4 pt-0">
                    <Link href={`/notifications/templates/${template.id}`}>
                        <div className="flex flex-col gap-2">
                            <div>
                                <div className="text-base truncate font-semibold text-default-900 capitalize mb-1">{template.title}</div>
                                <div className="text-xs  text-passiveText font-medium  lg:h-[32px] line-clamp-2">{template.textMessage}</div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        );
    });
};

export default NotificationTemplateCard;
