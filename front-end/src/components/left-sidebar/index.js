import React from 'react';
import {Logo} from "@/components/logo";
import LeftSidebarNavigations from "@/components/left-sidebar/navigations";

export const LeftSidebar = ({navigations}) => {
    return (
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col dark:bg-themeDarker bg-white">
            <div className="flex flex-grow flex-col border-r bg-primary dark:border-themeBorderGray rounded-r-2xl">
                <div className="px-8 border-b border-white/5">
                    <Logo className="py-4 mt-0.5"/>
                </div>
                <div className="flex px-4 flex-grow flex-col overflow-y-auto">
                    <nav className="flex-1 relative">
                        <ul className="pb-8 rounded">
                            <LeftSidebarNavigations navigations={navigations}/>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default LeftSidebar;