import React from 'react';
import fetchServer from '@/lib/fetch-server';
import PatientForm from '@/components/patient/form';

async function Page({ params }) {
    const response = await fetchServer({
        endpoint: `/patients/${params.id}?contacts=true`,
    });

    const model = await response.json();
    return (
        <section className="text-themePassiveText grid gap-y-4">
            <PatientForm model={model} />
        </section>
    );
}

export default Page;
