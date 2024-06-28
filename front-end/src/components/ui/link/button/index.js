import React from 'react';
import Link from 'next/link';
import { classNames } from '@/lib/functions/classNames';

export const UILinkButton = ({ subMenu, activePathName, className, showDefaultIcon }) => {
    const linkClassName = classNames(activePathName === subMenu.activePathName ? 'bg-white text-primary' : 'text-white hover:text-primary transition-all delay-75 ', 'group relative rounded-md py-1.5 px-2 flex items-center text-xs font-medium hover:bg-white', className);

    return (
        <Link href={subMenu.href} className={linkClassName}>
            {subMenu.icon ? <span className="relative z-10">{subMenu.icon}</span> : showDefaultIcon ? <span className={classNames(activePathName === subMenu.activePathName ? 'bg-primary' : 'bg-white', 'mr-3 block transition-all z-10 group-hover:bg-primary duration-200 h-[1px] w-4')}></span> : null}
            <span className="relative z-10">{subMenu.title}</span>
        </Link>
    );
};
