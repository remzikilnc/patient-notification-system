import React from "react";
import {Logo} from "@/components/logo";

export const LeftSidebar = ({children}) => {
  return (
    <aside className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
      <div className="flex flex-grow flex-col border-r bg-primary border-passiveBorder rounded-r-2xl">
        <div className="px-8 border-b border-white/5">
          <Logo className="py-4 mt-0.5" />
        </div>
        <div className="flex px-4 flex-grow flex-col overflow-y-auto mt-2">{children}</div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
