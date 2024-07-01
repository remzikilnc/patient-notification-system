"use client";

import React, {useState} from "react";
import NotificationTemplateCard from "@/components/notification/template/card";
import UIButtonPrimary from "@/components/ui/button/primary";
import Link from "next/link";
import {LuLayoutTemplate} from "react-icons/lu";
import {useFetchData} from "@/lib/useFetchData";
import UIButtonRefresh from "@/components/ui/button/refresh";
import fetchServer from "@/lib/fetch-server";
import NotificationSendModal from "@/components/notification/send/modal";
import {alertSuccess} from "@/lib/functions/toastAlerts";

export default function Page() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const {data, revalidate} = useFetchData("notifications/templates");
  const [notificationTemplate, setNotificationTemplate] = useState(null);
  const [notificationSendModal, setNotificationSendModal] = useState(false);
  const [isNotificationSended, setIsNotificationSended] = useState([]);

  const handleNotificationClick = template => {
    fetchServer({endpoint: `/notifications/templates/${template.id}?criterias=true`})
      .then(res => res.json())
      .then(data => setNotificationTemplate(data));
    setNotificationSendModal(true);
  };

  const handleSendNotificationClickConfirm = async template => {
    await fetchServer({endpoint: `/notifications/send/${template.id}`, method: "GET"})
      .then(res => res.json())
      .then(data => {
        alertSuccess(data.message);
      });
    setIsNotificationSended(prev => {
      const alreadySended = prev.find(item => item.id === template.id);
      if (alreadySended) {
        return prev;
      }
      return [...prev, {id: template.id, send: true, date: new Date()}];
    });
  };

  return (
    <div className="relative">
      <title>PN | Notification | Templates</title>
      <UIButtonRefresh type="button" className="absolute right-0 top-0" disabled={isButtonDisabled} onClick={() => revalidate(setIsButtonDisabled)}>
        Refresh
      </UIButtonRefresh>
      <div>
        <div className="mb-4 gap-1 flex flex-col pr-20">
          <h1 className="text-2xl font-semibold text-activeText">Notification Templates</h1>
          <p className="text-passiveText text-sm">Create manage and send notifications using templates</p>
          <p className="text-passiveText text-xs">You can send notification hover on the template and click on the send button</p>
        </div>
      </div>
      <div className={`grid gap-10 bg-white grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 ${data?.length === 1 ? "xl:grid-cols-1" : data?.length === 2 ? "xl:grid-cols-2" : "xl:grid-cols-3"}`}>
        {data?.length > 0 ? (
          <NotificationTemplateCard data={data} handleSendNotificationClick={handleNotificationClick} />
        ) : (
          <div className="flex justify-center col-span-3 p-12 flex-col items-center h-64 overflow-hidden  w-full">
            <div className="text-center my-4 ">
              <span className="flex justify-center rounded-md text-primary items-center">
                <LuLayoutTemplate className="h-16 w-16" />
              </span>
              <span className="gap-y-1 flex flex-col">
                <h2 className="text-xs sm:text-2xl truncate text-primary">No templates found</h2>
                <p className="text-passiveText  text-xs sm:text-sm">Create a new template to get started</p>
              </span>
            </div>
            <UIButtonPrimary type="link">
              <Link className=" font-thin sm:font-semibold" href="/notifications/templates/create">
                Create a new template
              </Link>
            </UIButtonPrimary>
          </div>
        )}
      </div>
      <NotificationSendModal template={notificationTemplate} isOpen={notificationSendModal} setIsOpen={setNotificationSendModal} handleConfirm={handleSendNotificationClickConfirm} sendedData={isNotificationSended.find(item => item.id === notificationTemplate?.id)} />
    </div>
  );
}
