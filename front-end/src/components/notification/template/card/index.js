import React, { Fragment } from 'react';
import Link from 'next/link';
import NotificationTemplateCardMenu from '@/components/notification/template/card/menu';
import { IoMdMail } from 'react-icons/io';
import { MdSms } from 'react-icons/md';

const NotificationTemplateCard = ({ key, template }) => {
    return (
        <div key={key} className="rounded-md md:bg-body bg-white border border-passiveBorder shadow-sm relative overflow-hidden">
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

                <NotificationTemplateCardMenu id={template?.id} />
            </div>
            <div className="p-4 pt-0">
                <Link href={`/notifications/templates/${template.id}`}>
                    <div className="flex gap-2">
                        <div>
                            <div className="text-base font-semibold text-default-900 capitalize mb-1">{template.title}</div>
                            <div className="text-xs font-medium text-default-600 transition-all duration-75 lg:h-[32px] overflow-hidden line-clamp-2">{template.message}</div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default NotificationTemplateCard;
