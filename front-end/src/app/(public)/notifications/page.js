import React from 'react';
import NotificationSendCard from '@/components/notification/dashboard/send-card';
import { getNotificationsTemplates } from '@/actions/notifications/templates';

export default async function Page() {
  const data = await getNotificationsTemplates();
    return (
        <section>
            <title>PN | Notification | Dashboard</title>
            <NotificationSendCard data={data} />
        </section>
    );
}

