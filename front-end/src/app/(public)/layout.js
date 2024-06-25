import React, {Fragment} from 'react';
import Header from "@/components/header";
import LeftSidebar from "@/components/left-sidebar";

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
            <Header/>
            <LeftSidebar navigations={navigations}/>
            <main className="flex justify-center items-center w-full">
                <div className="sm:grid sm:grid-cols-12 col-span-12 w-full flex px-4 sm:px-0">
                    <div className="h-full w-full sm:col-span-10 sm:col-start-2 flex sm:grid">
                        {children}
                    </div>
                </div>
            </main>
        </Fragment>
    );
};

export default Layout;