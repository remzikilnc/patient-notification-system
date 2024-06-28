import React from 'react';
import PatientForm from '@/components/patient/form';

async function Page() {
    return (
        <section className="text-themePassiveText grid gap-y-4">
            <PatientForm />
        </section>
    );
}

export default Page;
