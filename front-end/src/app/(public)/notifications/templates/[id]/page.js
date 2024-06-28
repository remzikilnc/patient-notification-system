import React from 'react';
import NotificationTemplateForm from '@/components/notification/template/form';
import fetchServer from '@/lib/fetch-server';

async function Page({params}) {
  const response = await fetchServer({
    endpoint: `/notifications/templates/${params.id}?criterias=true`,
  });

  const model = await response.json();
  return (
    <section className="text-themePassiveText grid gap-y-4">
     <NotificationTemplateForm model={model} />
    </section>
  );
}

export default Page;
