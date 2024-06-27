import React, {Fragment} from 'react';
import LeftSidebar from "@/components/left-sidebar";
import LeftSidebarNavigations from "@/components/left-sidebar/navigations";
import LeftSidebarMobile from "@/components/left-sidebar/mobile";
import {GoRelFilePath} from "react-icons/go";
import {RiHome3Line} from "react-icons/ri";
import {MdSpaceDashboard} from "react-icons/md";

const navigations = [
    {
        title: "Dashboard",
        href: "/",
        activePathName: "/",
        icon: <MdSpaceDashboard   className="flex-shrink-0 h-6 w-6 mr-1"/>,
    },
    {
        title: "Patients",
        icon: <GoRelFilePath className="flex-shrink-0 h-6 w-6"/>,
        subMenu: [
            {
                title: "All Patients",
                href: "/patients",
                activePathName: "/patients",
            },
            {
                title: "New Patient",
                href: "/patients/create",
                activePathName: "/patients/create",
            },
        ],
    },
    {
        title: "Notifications",
        icon: <GoRelFilePath className="flex-shrink-0 h-6 w-6"/>,
        subMenu: [
            {
                subMenuTitle: "Templates",
                listClassName: "my-2",
            },
            {
                title: "All Templates",
                href: "/navigation",
                activePathName: "/navigation",
            },
            {
                title: "New Template",
                href: "/navigation/template",
                activePathName: "/navigation",
            },
            {
                subMenuTitle: "Targets",
                listClassName: "my-2",
            },
            {
                title: "All Targets",
                href: "/navigation/targets",
                activePathName: "/navigation",
            },
            {
                title: "New Target",
                href: "/navigation/targets/create",
                activePathName: "/navigation",
            },
        ],
    },
];
const Layout = ({children}) => {
    return (
        <Fragment>
            <header className="flex justify-between items-center w-full h-16 border-passiveBorder border-b md:border-none">
                <LeftSidebarMobile>
                    <LeftSidebarNavigations navigations={navigations}/>
                </LeftSidebarMobile>
            </header>
            <main>
                <LeftSidebar>
                    <LeftSidebarNavigations navigations={navigations}/>
                </LeftSidebar>
                <div className="flex justify-center items-center w-full md:pl-64">
                    <div className="w-full px-6 my-6 md:px-12">
                        <div className="sm:flex sm:flex-col md:border p-0 md:p-6 rounded-xl">
                        {children}
                        </div>
                    </div>
                </div>
            </main>
        </Fragment>
    );
};

export default Layout;