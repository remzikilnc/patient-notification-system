import React, {Fragment} from 'react';
import Header from "@/components/header";
import LeftSidebar from "@/components/left-sidebar";
import LeftSidebarNavigations from "@/components/left-sidebar/navigations";
import LeftSidebarMobile from "@/components/left-sidebar/mobile";

const navigations = [
    {
        title: "Dashboard",
        href: "/",
        activePathName: "/",
    },
    {
        title: "Patients",
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
];
const Layout = ({children}) => {
    return (
        <Fragment>
            <header className="flex justify-between items-center w-full h-16 border-passiveBorder border-b">
                <LeftSidebarMobile>
                    <LeftSidebarNavigations navigations={navigations}/>
                </LeftSidebarMobile>
            </header>
            <main>
                <LeftSidebar>
                    <LeftSidebarNavigations navigations={navigations}/>
                </LeftSidebar>
                <div className="flex justify-center items-center w-full md:pl-64">
                    <div className="md:grid md:grid-cols-12 col-span-12 w-full flex px-4 md:px-0">
                        <div className="h-full w-full md:col-span-10 md:col-start-2 flex md:grid">
                            {children}
                        </div>
                    </div>
                </div>
            </main>
        </Fragment>
    );
};

export default Layout;