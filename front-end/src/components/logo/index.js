import React from "react";
import Link from "next/link";
import {classNames} from "@/lib/functions/classNames";

export const Logo = ({className}) => {

    return (
        <div className={classNames("flex flex-shrink-0 items-center gap-x-2", className)}>
            <div className="relative h-7 w-7 bg-white rounded-full flex items-center justify-center">
                <span className="absolute h-3.5 w-3.5 rounded-full bg-primary"></span>
            </div>
            <Link className=" flex items-center gap-x-0.5" href="/">
                <span className="font-semibold text-2xl leading-3 text-white">PN System</span>
                <span className="text-xs text-white/80 mb-1">Tiga</span>
            </Link>
        </div>
    );
};
