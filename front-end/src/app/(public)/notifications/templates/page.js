import React from 'react';
import NotificationTemplateCard from '@/components/notification/template/card';
import { getNotificationsTemplates } from '@/actions/notifications/templates';
import UIButtonPrimary from '@/components/ui/button/primary';
import Link from 'next/link';
import { LuLayoutTemplate } from 'react-icons/lu';

async function Page() {
    const data = await getNotificationsTemplates();
    return (
        <div>
            <div className="grid gap-8 md:bg-white bg-body grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {data.length > 0 ? (
                    <NotificationTemplateCard data={data} />
                ) : (
                    <div className="flex justify-center col-span-3 p-12 flex-col items-center h-64 overflow-hidden  w-full">
                        <div className="text-center my-4 ">
                            <span className="flex justify-center rounded-md text-primary items-center">
                                <LuLayoutTemplate className="h-16 w-16" />
                            </span>
                            <span className="gap-y-1 flex flex-col">
                                <h2 className="text-xs sm:text-2xl truncate text-primary">No templates found</h2>
                                <p className="text-passiveText  text-xs sm:text-sm">Create a new template to get started</p>
                            </span>
                        </div>
                        <UIButtonPrimary type="link">
                            <Link className=" font-thin sm:font-semibold" href="/notifications/templates/create">
                                Create a new template
                            </Link>
                        </UIButtonPrimary>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Page;
