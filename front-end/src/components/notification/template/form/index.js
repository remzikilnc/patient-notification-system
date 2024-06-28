'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useForm from '@/lib/useForm';
import UIFormLabel from '@/components/ui/form/label';
import UIFormInputText from '@/components/ui/form/input/text';
import UIButtonPrimary from '@/components/ui/button/primary';
import FormInputSelectableMultiple from '@/components/ui/form/input/selectable/multiple';
import TemplateFormCriterias from '@/components/notification/template/form/criterias';
import fetchServer from '@/lib/fetch-server';
import UIFormInputTextAreaEditor from '@/components/ui/form/input/text/area/editor';

const notificationTypes = [
    { label: 'SMS', value: 'SMS' },
    { label: 'E-Mail', value: 'EMAIL' },
];

const NotificationTemplateForm = ({ model = null }) => {
    const router = useRouter();
    const { handleSubmit, errors, setErrors } = useForm();
    const [selectedNotificationTypes, setSelectedNotificationTypes] = useState(model?.notificationTypes || []);
    const [criterias, setCriterias] = useState(model?.criterias || []);
    const [message, setMessage] = useState(model?.message || '');

    const submit = async event => {
        event.preventDefault();

        const formObj = {
            title: event.target.title.value,
            message: message,
            notificationTypes: selectedNotificationTypes,
        };

        const commonParams = {
            formObj,
            onSuccess: data => {
                if (!model) {
                    router.push(`/notifications/templates/${data?.id}`);
                }
            },
            onError: errors => {},
        };

        if (model) {
            await handleSubmit({ ...commonParams, endPoint: `notifications/templates/${model.id}`, method: 'PUT' });
            router.refresh();
        } else {
            await handleSubmit({ ...commonParams, endPoint: 'notifications/templates' });
            router.refresh();
        }
    };

    const handleCreateCriteria = async criteria => {
        if (criteria.id) {
            await handleSubmit({
                formObj: { ...criteria, notificationTemplate: { id: model.id } },
                endPoint: `notifications/criterias/${criteria.id}`,
                method: 'PUT',
                onSuccess: data => setCriterias(criterias.map(c => (c?.id === data?.id ? data : c))),
                onError: errors => console.error(errors),
            });
        } else {
            await handleSubmit({
                formObj: { ...criteria, notificationTemplate: { id: model.id } },
                endPoint: `notifications/criterias`,
                onSuccess: data => setCriterias([...criterias, data]),
                onError: errors => console.error(errors),
            });
        }
    };

    const handleDeleteCriteria = criteria => {
        fetchServer({
            method: 'DELETE',
            endpoint: `/notifications/criterias/${criteria.id}`,
        }).then(res => (res.ok ? setCriterias(criterias.filter(c => c.id !== criteria.id)) : console.error(res)));
    };

    return (
        <form className="space-y-8 p-1 overflow-hidden" onSubmit={submit}>
            <div className="space-y-8">
                <div>
                    <h3 className="text-xl font-semibold dark:text-themeHoverText">{model ? `Edit ${model?.title ?? ''}` : 'Create Template'}</h3>
                </div>
                <div className="col-span-3">
                    <div className="grid grid-cols-1 gap-y-4 gap-x-4 border-b border-passiveBorder pb-5">
                        <div className="grid grid-cols-1 gap-x-3 gap-y-3">
                            <div>
                                <UIFormLabel htmlFor="title" label="Title" />
                                <UIFormInputText id="title" name="title" defaultValue={model?.title} error={errors?.title} required isFocused autoComplete="title" />
                            </div>
                            <div className="h-full flex flex-col pb-4">
                                <UIFormLabel htmlFor="message" label="Message" />
                                <UIFormInputTextAreaEditor onChange={text => setMessage(text)} oldValue={message} className="rounded-md border !border-passiveBorder min-h-40" />
                            </div>
                            <div>
                                <UIFormLabel htmlFor="notificationTypes" label="Notification Type" />
                                <FormInputSelectableMultiple
                                    data={notificationTypes}
                                    onChange={data => setSelectedNotificationTypes(data)}
                                    initialState={notificationTypes.filter(nt => selectedNotificationTypes.includes(nt.value))}
                                    hasSelectAll={false}
                                    error={errors?.notificationTypes}
                                    disableSearch
                                />
                            </div>
                        </div>
                    </div>
                    {model && <TemplateFormCriterias criterias={criterias} handleDeleteCriteria={handleDeleteCriteria} handleCreateCriteria={handleCreateCriteria} />}
                </div>
            </div>

            <div className="pt-5">
                <div className="flex justify-end">
                    <div className="flex items-center gap-4">
                        <UIButtonPrimary>{model ? 'Update' : 'Create'}</UIButtonPrimary>
                    </div>
                </div>
            </div>
        </form>
    );
};
export default NotificationTemplateForm;
