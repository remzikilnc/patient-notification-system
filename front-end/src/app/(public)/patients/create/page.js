import React, {Fragment} from "react";
import PatientForm from "@/components/patient/form";

const exampleModel = {
  name: "Remzi",
  surname: "Kılınç",
  middlename: null,
  gender: "MALE",
  birthdate: "2000-08-08",
  email: "remzikilincc@gmail.com",
  phoneNumber: "+905433901348",
  address: "Kahramanmaras, Turkey",
  age: 23,
  notificationTypes: ["SMS", "EMAIL"],
  identifiers: [
    {
      value: "12345",
      type: "Passport",
    },
    {
      value: "67890",
      type: "Driver's License",
    },
  ],
  description: "This is a test model from frontend for adding fast patient model.",
};
export default async function Page() {
  return (
    <Fragment>
      <title>PN | Patient | Create</title>
      <section className="text-themePassiveText grid gap-y-4">
        <PatientForm model={exampleModel} />
      </section>
    </Fragment>
  );
}
