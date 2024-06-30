import React from "react";
import Link from "next/link";
import PublicLayout from "@/app/(public)/layout";
import UIButtonPrimary from "@/components/ui/button/primary";
import {Logo} from "@/components/logo";

const NotFound = ({statusCode}) => {
  return (
    <PublicLayout>
      <div className="flex flex-col justify-center items-center gap-y-4">
        <Logo className="bg-primary rounded p-4 py-3" />
        <p className="text-6xl font-semibold text-primary">{statusCode ?? "404"}.</p>
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-default-900">Ops! Page Not Found</h1>
        <p className="mb-3 text-passiveText text-sm">Sorry, we couldn’t find the page you’re looking for.</p>
        <UIButtonPrimary type="link">
          <Link href="/">Go To Dashboard</Link>
        </UIButtonPrimary>
      </div>
    </PublicLayout>
  );
};

export default NotFound;
