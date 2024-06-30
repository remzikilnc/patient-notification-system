import React, {Fragment} from "react";
import PatientTable from "@/components/patient/table";

export default async function Page() {
  return (
    <div className="relative">
      <title>PN | Patients</title>
      <div className="sm:flex-auto">
        <h1 className="text-xl font-semibold dark:text-themeHoverText">Patients</h1>
        <p className="mt-2 text-sm dark:text-themePassiveText text-themeHover pr-20">Patients are the people who are registered in the system.</p>
      </div>
      <PatientTable />
    </div>
  );
}
