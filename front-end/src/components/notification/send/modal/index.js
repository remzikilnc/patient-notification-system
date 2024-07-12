import React, {useEffect, useState} from "react";
import {Dialog, DialogBackdrop, DialogPanel} from "@headlessui/react";
import UIButtonPrimary from "@/components/ui/button/primary";
import Link from "next/link";
import UIButtonDanger from "@/components/ui/button/danger";
import {Logo} from "@/components/logo";
import {classNames} from "@/lib/functions/classNames";
import {AiFillSetting} from "react-icons/ai";
import {MdHtml} from "react-icons/md";
import {BsChatLeftText} from "react-icons/bs";
import {CiText} from "react-icons/ci";

/**/

/*Sended:
  <time dateTime={new Date(sendedData?.date).toLocaleDateString()} className="font-medium text-activeText ml-1">
    {sendedData?.date ? new Date(sendedData?.date).toLocaleString() : " Not Sended Yet"}
  </time>*/

/*<h3 className="font-medium text-activeText">{template?.title}</h3>

<div dangerouslySetInnerHTML={{ __html: template?.htmlMessage }}></div>*/

/**/

const NotificationSendModal = ({template, isOpen, setIsOpen, sendedData, handleConfirm}) => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    setPatients(getPatients(template) || []);
  }, [template]);

  console.log(patients);

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 w-screen overflow-y-auto p-4">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel as="main" className="bg-body shadow-xl md:pt-8 pt-16 p-8 rounded-xl max-w-2xl w-full relative">
            <div className="-inset-10 absolute bg-primary/20 -z-10 blur-xl  "></div>
            <div className="flex gap-x-4 mb-2 justify-between ">
              <span className="text-activeText text-sm font-semibold">{template?.title}</span>
              <Link href={`/notifications/templates/${template?.id}`} className="tracking-tight text-white hover:text-white/90 block">
                <AiFillSetting className="h-6 w-6 hover:rotate-45 transition-all duration-200 text-primary" />
              </Link>
            </div>

            <section className="p-4 bg-white rounded-sm border-t-primary border-t-4 w-full">
              <div className="flex flex-col break-words">
                <div className="flex flex-shrink-0 items-center gap-x-1.5 bg-white rounded-xl">
                  <div className="flex items-center mb-0.5">
                    <span className="font-semibold text-sm leading-3 text-primary">PN System</span>
                  </div>
                  <MdHtml className="h-12 w-12 text-primary ml-auto" />
                </div>
                <div className="my-4 px-2 break-words  w-full flex">
                  <div className="w-full break-words overflow-hidden" dangerouslySetInnerHTML={{__html: template?.htmlMessage}} />
                </div>
              </div>
            </section>

            <section className="p-4 my-2 bg-white rounded-sm w-full">
              <div className="flex flex-col">
                <div className="flex flex-shrink-0 items-center gap-x-1.5 bg-white rounded-xl">
                  <div className="flex items-center mb-0.5">
                    <span className="font-semibold text-sm leading-3 text-primary">PN System</span>
                  </div>
                  <CiText className="h-8 w-8 text-primary ml-auto" />
                </div>
                <div className="my-4 px-2">
                  <div dangerouslySetInnerHTML={{__html: template?.textMessage}} />
                </div>
              </div>
            </section>

            {patients?.length > 0 && (
              <section className="w-full">
                <ul role="list" className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 md:gap-x-6 lg:max-w-5xl lg:gap-x-8 lg:gap-y-12 xl:grid-cols-4">
                  {patients?.map(patient => (
                    <li key={patient.id} className="col-span-1">
                      <div className="p-4 bg-white rounded-md rounded-b-none">
                        <div className="space-y-4 flex justify-center items-center flex-col">
                          <span className="rounded-full bg-primary flex h-12 w-12 justify-center items-center text-white font-semibold">{getPatientInitials(patient)}</span>
                          <div className="space-y-2">
                            <div className="text-xs font-medium lg:text-sm flex justify-center items-center flex-col">
                              <h3>
                                {patient.patientName} {patient.patientSurname}
                              </h3>
                              <p className="text-passiveText text-xs font-thin">{patient?.patientEmail}</p>
                              <p className="text-passiveText"></p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {patient?.notificationTypes?.length > 0 && (
                        <div className="flex bg-black text-white justify-around rounded-md">
                          {patient.notificationTypes.map(type => (
                            <div key={type} className="inline-flex items-center  px-2 py-0.5 text-xs font-semibold transition-colors lowercase">
                              {type}
                            </div>
                          ))}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}
            <div className="flex justify-end mt-6">
              <div className="inline-flex gap-x-2">
                <UIButtonPrimary disabled={sendedData?.send} type="button" className="truncate" onClick={() => handleConfirm(template)}>
                  {sendedData?.send ? (
                    "Already Sended"
                  ) : (
                    <>
                      Send <span className="hidden md:inline ml-1">Notification</span>
                    </>
                  )}
                </UIButtonPrimary>
                <UIButtonDanger type="button" className="" onClick={() => setIsOpen(false)}>
                  {" "}
                  Close{" "}
                </UIButtonDanger>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default NotificationSendModal;

const getPatients = template => {
  return template?.criterias?.map(criteria => criteria?.targetPatients.map(patient => patient))[0];
};

const getPatientInitials = patient => {
  return patient.patientName.charAt(0) + patient.patientSurname.charAt(0);
};
