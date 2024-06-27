"use client";

import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import useForm from "@/lib/useForm";
import UIFormLabel from "@/components/ui/form/label";
import UIFormInputText from "@/components/ui/form/input/text";
import UIFormInputTextArea from "@/components/ui/form/input/text/area";
import UIButtonPrimary from "@/components/ui/button/primary";
import UIFormInputSelectableWithIcon from "@/components/ui/form/input/selectable/with-icon";
import UIFormInputDatePickerRanged from "@/components/ui/form/input/date-picker/ranged";
import UIFormInputDatePicker from "@/components/ui/form/input/date-picker";
import PatientFormContacts from "@/components/patient/form/contacts";
import fetchServer from "@/lib/fetch-server";
import FormInputSelectableMultiple from "@/components/ui/form/input/selectable/multiple";

const notificationTypes = [{label: "SMS", value: "SMS"}, {label: "E-Mail", value: "EMAIL"}]

const PatientForm = ({model = null}) => {
    const router = useRouter()
    const {handleSubmit, errors, setErrors} = useForm();
    const [selectedGender, setSelectedGender] = useState(model?.gender || 'MALE');
    const [selectedNotificationTypes, setSelectedNotificationTypes] = useState(model?.notificationTypes || []);
    const [contacts, setContacts] = useState(model?.contacts || []);
    const submit = async event => {
        event.preventDefault();

        const formObj = {
            name: event.target.name.value,
            surname: event.target.surname.value,
            gender: selectedGender,
            birthdate: event.target.birthdate.value,
            notificationTypes: selectedNotificationTypes,
            identifiers: []
        };

        const commonParams = {
            formObj,
            onSuccess: data => {
                if (!model) {
                    router.push(`/patients/${data?.id}`);
                }
            },
            onError: errors => {

            }
        };

        if (model) {
            await handleSubmit({...commonParams, endPoint: `patients/${model.id}`, method: "PUT"});
            router.refresh();
        } else {
            await handleSubmit({...commonParams, endPoint: "patients"});
            router.refresh();
        }
    };

    const handleSaveContact = (contact) => {
        if (contact.id) {
             fetchServer({
                method: "PUT",
                endpoint: `/patients/${model.id}/contacts/${contact.id}`,
                body: JSON.stringify(contact)
            }).then(data => data.json()).then(data => {setContacts(contacts.map(c => c?.id === data?.id ? data : c))})
        } else {
           fetchServer({
                method: "POST",
                endpoint: `/patients/${model.id}/contacts`,
                body: JSON.stringify(contact)
            }).then(data => data.json()).then(data => {setContacts([...contacts, data])})
        }
    };

    return (
        <form className="space-y-8 p-1 overflow-hidden" onSubmit={submit}>
            <div className="space-y-8">
                <div>
                    <h3 className="text-xl font-semibold dark:text-themeHoverText">{model ? `Edit ${model.name} ${model.surname}` : "Create Patient"}</h3>
                </div>
                <div className="col-span-3">
                    <div className="grid grid-cols-1 gap-y-4 gap-x-4 border-b border-passiveBorder pb-5">
                        <div className="grid grid-cols-2 gap-x-6">
                            <div className="col-span-1">
                                <UIFormLabel htmlFor="name" className="!font-medium" label="Name"/>
                                <UIFormInputText id="name" name="name" defaultValue={model?.name}
                                                 error={errors?.name} required isFocused autoComplete="title"/>
                            </div>
                            <div className="col-span-1">
                                <UIFormLabel htmlFor="surname" className="!font-medium" label="Surname"/>
                                <UIFormInputText id="surname" name="surname" defaultValue={model?.surname}
                                                 error={errors?.surname} required isFocused autoComplete="surname"/>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
                            <div>
                                <UIFormLabel htmlFor="birthdate" className="!font-medium" label="Birth Date"/>
                                <UIFormInputDatePicker id="birthdate" name="birthdate" maxDate={new Date()}/>
                            </div>
                            <div>
                                <UIFormLabel htmlFor="gender" className="!font-medium" label="Gender"/>
                                <UIFormInputSelectableWithIcon
                                    data={["MALE", "FEMALE"]}
                                    selectedValue={selectedGender}
                                    setSelectedValue={setSelectedGender}
                                    error={errors?.gender}
                                />
                            </div>
                        </div>
                        <div>
                            <UIFormLabel htmlFor="notificationTypes" className="!font-medium" label="Notification Type"/>
                            <FormInputSelectableMultiple
                                data={notificationTypes}
                                onChange={(data) => setSelectedNotificationTypes(data)}
                                initialState={notificationTypes.filter(nt => selectedNotificationTypes.includes(nt.value))}
                                hasSelectAll={false}
                                error={errors?.notificationTypes}
                                disableSearch
                            />
                        </div>
                        <div>
                            <UIFormLabel htmlFor="description" className="!font-medium" label="Description"/>
                            <div className="mt-1">
                                <UIFormInputTextArea
                                    id="description"
                                    name="description"
                                    defaultValue={model?.description}
                                    error={errors?.description}
                                    rows={3}
                                    desc="Write a few sentences about this patient."
                                />
                            </div>
                        </div>
                    </div>
                    {model &&
                        <PatientFormContacts contacts={contacts} setContacts={setContacts} addRowText="Add Contact"
                                             handleSaveContact={handleSaveContact}/>
                    }
                </div>
            </div>

            <div className="pt-5">
                <div className="flex justify-end">
                    <div className="flex items-center gap-4">
                        <UIButtonPrimary>{model ? "Update" : "Create"}</UIButtonPrimary>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default PatientForm;
