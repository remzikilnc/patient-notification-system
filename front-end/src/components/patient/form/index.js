"use client";

import React from "react";
import {useRouter} from "next/navigation";
import useForm from "@/lib/useForm";
import UIFormLabel from "@/components/ui/form/label";
import UIFormInputText from "@/components/ui/form/input/text";
import UIFormInputTextArea from "@/components/ui/form/input/text/area";
import UIButtonPrimary from "@/components/ui/button/primary";

const PatientForm = ({model = null}) => {
    const { handleSubmit, errors, setErrors } = useForm();
    const router = useRouter();

    const submit = async event => {
        const commonParams = {
            event,
            onSuccess: data => {
                if (!model) {
                    router.push(`/patients/${data?.id}`);
                }
            },
            onError: errors => {

            }
        };

        if (model) {
            await handleSubmit({ ...commonParams, endPoint: `patients/${model.id}`, method: "PUT" });
        } else {
            await handleSubmit({ ...commonParams, endPoint: "patients" });
        }
    };

    return (
        <form className="space-y-8 divide-y divide-gray-200" onSubmit={submit}>
            <div className="space-y-8">
                <div>
                    <h3 className="text-3xl font-medium leading-6 text-black pb-5">{model ? `Edit ${model.name}` : "Create Patient"}</h3>
                </div>
                <div className="grid grid-cols-3 gap-8">
                    <div className="col-span-2">
                        <div className="grid grid-cols-1 gap-y-4 gap-x-4">
                            <div className="grid grid-cols-2 gap-x-6">
                                <div className="col-span-1">
                                    <UIFormLabel htmlFor="name" className="!font-medium" label="Name"/>
                                    <UIFormInputText id="name" name="name" defaultValue={model?.name} error={errors?.name} required isFocused autoComplete="title"/>
                                </div>
                                <div className="col-span-1">
                                    <UIFormLabel htmlFor="surname" className="!font-medium" label="Surname"/>
                                    <UIFormInputText id="surname" name="surname" defaultValue={model?.surname} error={errors?.surname} required isFocused autoComplete="surname"/>
                                </div>
                            </div>
                            <div>
                                <UIFormLabel htmlFor="link" className="!font-medium" label="Link"/>
                                <UIFormInputText id="link" name="link" defaultValue={model?.link} error={errors?.link} required isFocused autoComplete="link"/>
                            </div>
                            <div>
                                <UIFormLabel htmlFor="description" className="!font-medium" label="Description" />
                                <div className="mt-1">
                                    <UIFormInputTextArea id="description" name="description" defaultValue={model?.description} error={errors?.description} rows={3} desc="Write a few sentences about this patient." />
                                </div>
                            </div>
                        </div>
                    </div>
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
