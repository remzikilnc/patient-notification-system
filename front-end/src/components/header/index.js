import React from "react";
import LeftSidebarMobile from "@/components/left-sidebar/mobile";

const Header = ({children}) => {
    return (
        <header className="flex justify-between items-center w-full h-16 border-passiveBorder border-b">
            <LeftSidebarMobile>
                {children}
            </LeftSidebarMobile>
        </header>
    );
};

export default Header;
