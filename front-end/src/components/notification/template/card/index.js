"use client";

import React, {useState} from "react";
import Link from "next/link";
import NotificationTemplateCardMenu from "@/components/notification/template/card/menu";
import {IoMdMail} from "react-icons/io";
import {MdSms} from "react-icons/md";
import fetchServer from "@/lib/fetch-server";
import UIButtonPrimary from "@/components/ui/button/primary";

const NotificationTemplateCard = ({data, handleSendNotificationClick}) => {
  const [template, setTemplate] = useState(data);
  const handleDeleteClick = async id => {
    const res = await deleteModel(id);
    res.status === 204 && setTemplate(template.filter(template => template.id !== id));
  };

  return template.map(template => {
    return (
      <div key={template.id} className="group relative">
        <div>
          <div className="rounded-md group-hover:rounded-b-none md:bg-body bg-white border border-passiveBorder shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 -z-10">
              <span className="flex w-full h-full justify-center items-center">
                {template.notificationTypes.includes("EMAIL") && <IoMdMail className="text-primary/70 opacity-5  left-0 h-full" />}
                {template.notificationTypes.includes("SMS") && <MdSms className="text-primary/70 opacity-5 w-1/2 h-full" />}
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
                    <div className="text-base truncate font-semibold text-default-900 capitalize mb-1 min-h-6">{template.title}</div>
                    <div className="text-xs  text-passiveText font-medium  lg:h-[32px] line-clamp-2">{template.textMessage}</div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <UIButtonPrimary
          type="button"
          onClick={() => handleSendNotificationClick(template)}
          className="w-full absolute bg-success justify-center opacity-0 group-hover:opacity-100 rounded-md rounded-t-none duration-300 py-2 !ring-1 md:ring-2 transition-transform transform md:group-hover:-translate-y-5 translate-y-[-80%] group-hover:-translate-y-1 focus:-translate-y-1 focus:opacity-100 md:focus:-translate-y-5"
        >
          Send Notification
        </UIButtonPrimary>
      </div>
    );
  });
};

export default NotificationTemplateCard;

async function deleteModel(modalId) {
  return fetchServer({method: "DELETE", endpoint: `/notifications/templates/${modalId}`});
}
