"use client";

import React, {Fragment, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {FiMenu} from "react-icons/fi";
import {AiOutlineClose} from "react-icons/ai";
import {Logo} from "@/components/logo";

export default function LeftSidebarMobile({children}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Fragment>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
          <Transition.Child as={Fragment} enter="transition-opacity ease-linear duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity ease-linear duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child as={Fragment} enter="transition ease-in-out duration-300 transform" enterFrom="-translate-x-full" enterTo="translate-x-0" leave="transition ease-in-out duration-300 transform" leaveFrom="translate-x-0" leaveTo="-translate-x-full">
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-primary pt-5 pb-4">
                <div className="flex flex-shrink-0 items-center justify-between px-2">
                  <Logo />
                  <button type="button" className="flex h-10 w-10 items-center justify-center rounded bg-white text-passiveText hover:text-activeText duration-150" onClick={() => setSidebarOpen(false)}>
                    <span className="sr-only">Close sidebar</span>
                    <AiOutlineClose className="h-5 w-5 " aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-5 h-0 flex-1 overflow-y-auto px-2">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0"></div>
          </div>
        </Dialog>
      </Transition.Root>
      <button type="button" className="border-r border-passiveBorder px-4 h-full text-passiveText focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary md:hidden" onClick={() => setSidebarOpen(true)}>
        <span className="sr-only">Open sidebar</span>
        <FiMenu className="h-6 w-6" aria-hidden="true" />
      </button>
    </Fragment>
  );
}
