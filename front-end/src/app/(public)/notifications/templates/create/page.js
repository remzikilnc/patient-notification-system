import React from 'react';
import NotificationTemplateForm from '@/components/notification/template/form';

async function Page() {
    return (
        <section className="text-themePassiveText grid gap-y-4">
            <NotificationTemplateForm />
        </section>
    );
}

export default Page;
