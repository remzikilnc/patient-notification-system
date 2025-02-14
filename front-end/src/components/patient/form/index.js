"use client";

import React, {Fragment, useState} from "react";
import {useRouter} from "next/navigation";
import useForm from "@/lib/useForm";
import UIFormLabel from "@/components/ui/form/label";
import UIFormInputText from "@/components/ui/form/input/text";
import UIFormInputTextArea from "@/components/ui/form/input/text/area";
import UIFormInputSelectableWithIcon from "@/components/ui/form/input/selectable/with-icon";
import UIFormInputDatePicker from "@/components/ui/form/input/date-picker";
import PatientFormContacts from "@/components/patient/form/contacts";
import fetchServer from "@/lib/fetch-server";
import FormInputSelectableMultiple from "@/components/ui/form/input/selectable/multiple";
import UIFormInputKeyValue from "@/components/ui/form/input/key-value";
import UIFormLayout from "@/components/ui/form/layout";
import {alertError, alertSuccess} from "@/lib/functions/toastAlerts";
import {disableButton} from "@/lib/functions/disableButton";

const notificationTypes = [
  {label: "SMS", value: "SMS"},
  {label: "E-Mail", value: "EMAIL"},
];

const PatientForm = ({model = null}) => {
  const router = useRouter();
  const {handleSubmit, errors} = useForm();
  const [selectedGender, setSelectedGender] = useState(model?.gender || "MALE");
  const [selectedNotificationTypes, setSelectedNotificationTypes] = useState(model?.notificationTypes || []);
  const [contacts, setContacts] = useState(model?.contacts || []);
  const [identifiers, setIdentifiers] = useState(model?.identifiers || []);
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const submit = async event => {
    disableButton(setIsFormDisabled);
    const commonParams = {
      event,
      formObj: {
        gender: selectedGender,
        notificationTypes: selectedNotificationTypes,
        identifiers: identifiers,
      },
      onSuccess: data => {
        if (!model?.id) {
          alertSuccess("Patient created successfully.");
          router.push(`/patients/${data?.id}`);
        } else {
          alertSuccess("Patient updated successfully.");
          router.refresh();
        }
      },
      onError: errors => {
        alertError(errors.message || "An error occurred. Please try again later.");
      },
    };

    const endPoint = model?.id ? `patients/${model.id}` : "patients";
    await handleSubmit({...commonParams, endPoint, method: model?.id ? "PUT" : "POST"});
  };

  const handleSaveContact = contact => {
    if (contact.id) {
      fetchServer({
        method: "PUT",
        endpoint: `/patients/${model.id}/contacts/${contact.id}`,
        body: JSON.stringify(contact),
      })
        .then(res => res.json())
        .then(data => {
          if (data.errors) {
            alertError(data.message || "An error occurred. Please try again later.");
            return;
          }
          alertSuccess("Contact updated successfully.");
          setContacts(contacts.map(c => (c?.id === data?.id ? data : c)));
        });
    } else {
      fetchServer({
        method: "POST",
        endpoint: `/patients/${model.id}/contacts`,
        body: JSON.stringify(contact),
      })
        .then(data => data.json())
        .then(data => {
          if (data.errors) {
            alertError(data.message || "An error occurred. Please try again later.");
            return;
          }
          if (data?.id) {
            alertSuccess("Contact created successfully.");
            setContacts([...contacts, data]);
          }
        });
    }
  };

  const handleDeleteContact = contact => {
    fetchServer({
      method: "DELETE",
      endpoint: `/patients/${model.id}/contacts/${contact.id}`,
    }).then(res => {
      if (res.ok) {
        alertSuccess("Contact deleted successfully.");
        setContacts(contacts.filter(c => c.id !== contact.id));
      } else {
        alertError("An error occurred. Please try again later.");
      }
    });
  };

  const handleIdentifierChange = (index, event) => {
    const values = [...identifiers];
    values[index][event.target.name] = event.target.value;
    setIdentifiers(values);
  };

  const handleAddIdentifier = () => {
    setIdentifiers([...identifiers, {type: "", value: ""}]);
  };

  const handleRemoveIdentifier = index => {
    const values = [...identifiers];
    values.splice(index, 1);
    setIdentifiers(values);
  };

  const handleDeletePatient = () => {
    fetchServer({
      method: "DELETE",
      endpoint: `/patients/${model.id}`,
    }).then(res => (res.ok ? router.push("/patients") : console.error(res)));
  };

  return (
    <UIFormLayout isEdit={model?.id} disabled={isFormDisabled} modelName={model?.name + " " + model?.surname} modelType="Patient" submit={submit} handleDelete={handleDeletePatient}>
      <Fragment>
        <div className="grid grid-cols-1 gap-x-3 gap-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <UIFormLabel htmlFor="name" label="Name" />
              <UIFormInputText id="name" name="name" defaultValue={model?.name} error={errors?.name} isFocused autoComplete="name" />
            </div>
            <div>
              <UIFormLabel htmlFor="middlename" label="Middle Name" />
              <UIFormInputText id="middlename" name="middlename" defaultValue={model?.middlename} error={errors?.middlename} isFocused autoComplete="middlename" />
            </div>
            <div>
              <UIFormLabel htmlFor="surname" label="Surname" />
              <UIFormInputText id="surname" name="surname" defaultValue={model?.surname} error={errors?.surname} isFocused required autoComplete="surname" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3">
            <UIFormInputKeyValue identifiers={identifiers} label="Identifiers" onChange={handleIdentifierChange} onAdd={handleAddIdentifier} onRemove={handleRemoveIdentifier} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <UIFormLabel htmlFor="email" label="Email" />
              <UIFormInputText type="email" id="email" name="email" required={selectedNotificationTypes.includes("EMAIL")} defaultValue={model?.email} error={errors?.email} isFocused autoComplete="email" />
            </div>
            <div>
              <UIFormLabel htmlFor="phoneNumber" label="Phone Number" />
              <UIFormInputText id="phoneNumber" name="phoneNumber" required={selectedNotificationTypes.includes("SMS")} defaultValue={model?.phoneNumber} error={errors?.phoneNumber} isFocused autoComplete="phone" />
            </div>
            <div>
              <UIFormLabel htmlFor="gender" label="Gender" />
              <UIFormInputSelectableWithIcon data={["MALE", "FEMALE"]} selectedValue={selectedGender} setSelectedValue={setSelectedGender} error={errors?.gender} />
            </div>
          </div>
          <div>
            <UIFormLabel htmlFor="notificationTypes" label="Notification Type" />
            <FormInputSelectableMultiple data={notificationTypes} onChange={data => setSelectedNotificationTypes(data)} initialState={notificationTypes.filter(nt => selectedNotificationTypes.includes(nt.value))} hasSelectAll={false} error={errors?.notificationTypes} disableSearch />
          </div>
          <div>
            <UIFormLabel htmlFor="birthdate" label="Birth Date" />
            <UIFormInputDatePicker id="birthdate" name="birthdate" initialDate={model?.birthdate} maxDate={new Date()} />
          </div>
        </div>

        <div>
          <UIFormLabel htmlFor="address" label="Adress" />
          <div className="mt-1">
            <UIFormInputTextArea id="address" name="address" defaultValue={model?.address} error={errors?.address} rows={3} />
          </div>
        </div>

        <div>
          <UIFormLabel htmlFor="description" label="Description" />
          <div className="mt-1">
            <UIFormInputTextArea id="description" name="description" defaultValue={model?.description} error={errors?.description} rows={3} desc="Write a few sentences about this patient." />
          </div>
        </div>
        {model?.id && <PatientFormContacts contacts={contacts} setContacts={setContacts} handleSaveContact={handleSaveContact} handleDeleteContact={handleDeleteContact} />}
      </Fragment>
    </UIFormLayout>
  );
};

export default PatientForm;
