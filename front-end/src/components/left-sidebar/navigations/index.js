"use client";

import React, {Fragment} from "react";
import Link from "next/link";
import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/react";
import {usePathname} from "next/navigation";
import {UILinkButton} from "@/components/ui/link/button";

const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
}
export default function LeftSidebarNavigations({navigations}) {
    const activePathName = usePathname();

    const isAnySubMenuActive = subMenu => {
        return subMenu.some(item => item.activePathName === activePathName);
    };

    return (
        <nav className="flex-1 relative">
            <ul className="pb-8 rounded">
            {navigations.map((navigation, index) => (
                <Fragment key={"nav-group-" + index}>
                    {navigation.subMenu && navigation.subMenu.length > 0 ? (
                        <Disclosure as="div" className="mt-1 first:mt-0"
                                    defaultOpen={isAnySubMenuActive(navigation.subMenu)}>
                            <DisclosureButton
                                className={`text-xs p-3 font-semibold group flex w-full items-center justify-between !outline-0 rounded ${
                                    isAnySubMenuActive(navigation.subMenu) ? "bg-white text-primary" : "text-white hover:text-primary hover:bg-white transition-all delay-75"
                                }`}
                                aria-label={navigation.title}
                            >
                                <div className="flex justify-center items-center gap-x-1">
                                    {navigation.icon ? <span className="relative z-10">{navigation.icon}</span> : null}
                                    <span className="relative z-10">{navigation.title}</span>
                                </div>
                                <span className="h-4 w-4 group-data-[open]:rotate-180 relative z-10"> ` </span>
                            </DisclosureButton>
                            <DisclosurePanel className="mt-0.5 text-sm/5 text-white/50 ml-4">
                                {navigation.subMenu.map((subMenu, subIndex) => (
                                    <li key={"sub-nav-" + subIndex}
                                        className={classNames(subIndex > 0 ? `my-0.5 ${subMenu.listClassName ?? ""}` : `${subMenu.listClassName ?? ""}`)}>
                                        <UILinkButton showDefaultIcon className="!p-3 max-h-10" subMenu={subMenu} activePathName={activePathName}/>
                                    </li>
                                ))}
                            </DisclosurePanel>
                        </Disclosure>
                    ) : (
                        <li className="mt-1">
                            <Link href={navigation.href}
                                  className={classNames(activePathName === navigation.activePathName ? "bg-white text-primary" : "hover:bg-white text-white hover:text-primary transition-all delay-75", "rounded text-xs p-3 font-semibold group flex w-full items-center !outline-0")}>
                                {navigation.icon ? <span className="relative z-10">{navigation.icon}</span> : null}
                                <span className="relative z-10">{navigation.title}</span>
                            </Link>
                        </li>
                    )}
                </Fragment>
            ))}
            </ul>
        </nav>
    );
}
