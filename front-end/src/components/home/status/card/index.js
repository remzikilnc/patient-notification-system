import React from 'react';
import { VscDebugRestart } from 'react-icons/vsc';

const UIButtonCard = ({ status, title,message, Icon, onClick }) => {
    return (
        <button
            onClick={onClick}
            type="button"
            className={`${
                status ? 'bg-success' : 'bg-danger'
            } shadow-xl hover:bg-primary group justify-center rounded-md whitespace-nowrap h-full text-sm font-medium transition-all flex flex-col gap-3 p-4 overflow-hidden items-start relative before:absolute before:left-1/2 before:-translate-x-1/2 before:bottom-1 before:h-[2px] before:w-9 before:bg-primary/50 before:hidden`}
        >
            <span className={`h-10 w-10 rounded-full absolute -top-3 -right-3 z-10 ring-8 ${status ? 'bg-green-200 ring-green-100' : 'bg-red-700 animate-ping group-hover:animate-none duration-150 transition-all ring-red-500'} group-hover:bg-primary group-hover:ring-white`}></span>
            <span className="absolute top-4 right-4 group-hover:hidden inline-flex">
                <Icon className="h-16 w-16 text-black/10 rotate-45 " />
            </span>
            <span className="absolute top-4 right-4 group-hover:inline-flex hidden">
                <VscDebugRestart className="h-16 w-16 rotate-45 text-white/10 group-active:-rotate-90 transition-all duration-200" />
            </span>
            <h2 className="text-white text-xl font-semibold capitalize relative z-10">{title}</h2>
            <p className="text-white text xs font-semibold capitalize relative z-10">{message}</p>
            <div className="flex gap-x-1">
                <span className="text-sm font-semibold bg-white rounded-md p-1 px-2">
                    Status: <span className="text-success uppercase">{status ? 'OK' : 'ERROR'}</span>
                </span>
            </div>
        </button>
    );
};

export default UIButtonCard;
