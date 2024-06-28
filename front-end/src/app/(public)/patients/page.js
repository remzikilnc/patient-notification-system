import React, { Fragment } from 'react';
import PatientTable from '@/components/patient/table';

const Page = () => {
    return (
        <Fragment>
            <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold dark:text-themeHoverText">Patients</h1>
                <p className="mt-2 text-sm dark:text-themePassiveText text-themeHover">Patients are the people who are registered in the system.</p>
            </div>
            <section className="my-2 flex flex-col gap-2 rounded gap-y-4 relative">
                <PatientTable />
            </section>
        </Fragment>
    );
};

export default Page;
