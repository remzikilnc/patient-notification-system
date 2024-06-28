import React from "react";
import NotificationTemplateCard from '@/components/notification/template/card';
import { getNotificationsTemplates } from '@/actions/notifications/templates';

async function Page() {
  const data = await getNotificationsTemplates();
  return (
    <div>
      <div className="grid gap-8 md:bg-white bg-body grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {data.map(template => (
          <NotificationTemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
};

export default Page;
