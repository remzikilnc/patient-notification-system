import React, {Fragment} from 'react';
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