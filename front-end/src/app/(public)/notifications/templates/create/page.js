import React from 'react';
import NotificationTemplateForm from '@/components/notification/template/form';

const exampleModel = {
  "title": "Test Template Age 10 - 30, Gender = MALE",
  "htmlMessage": "<p>Test Template Age 10 - 30, Gender = MALE</p>",
  "textMessage": "Test Template Age 10 - 30, Gender = MALE",
  "notificationTypes": [
    "SMS",
    "EMAIL"
  ]
}
async function Page() {
    return (
        <section className="text-themePassiveText grid gap-y-4">
            <NotificationTemplateForm model={exampleModel} />
        </section>
    );
}

export default Page;
