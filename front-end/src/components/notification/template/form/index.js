'use client';

import React, { Fragment, useState } from 'react';
import { useRouter } from 'next/navigation';
import useForm from '@/lib/useForm';
import UIFormLabel from '@/components/ui/form/label';
import UIFormInputText from '@/components/ui/form/input/text';
import UIButtonPrimary from '@/components/ui/button/primary';
import FormInputSelectableMultiple from '@/components/ui/form/input/selectable/multiple';
import TemplateFormCriterias from '@/components/notification/template/form/criterias';
import fetchServer from '@/lib/fetch-server';
import UIFormInputTextAreaEditor from '@/components/ui/form/input/text/area/editor';
import UIFormInputTextArea from '@/components/ui/form/input/text/area';
import UIFormInputError from '@/components/ui/form/input/error';
import UIButtonDanger from '@/components/ui/button/danger';
import UIFormLayout from '@/components/ui/form/layout';

const notificationTypes = [
    { label: 'SMS', value: 'SMS' },
    { label: 'E-Mail', value: 'EMAIL' },
];

const NotificationTemplateForm = ({ model = null }) => {
    const router = useRouter();
    const { handleSubmit, errors, setErrors } = useForm();
    const [selectedNotificationTypes, setSelectedNotificationTypes] = useState(model?.notificationTypes || []);
    const [criterias, setCriterias] = useState(model?.criterias || []);
    const [htmlMessage, setHtmlMessage] = useState(model?.htmlMessage || '');

    const submit = async event => {
        event.preventDefault();

        const formObj = {
            title: event.target.title.value,
            htmlMessage: htmlMessage,
            textMessage: event.target.textMessage.value,
            notificationTypes: selectedNotificationTypes,
        };

        const commonParams = {
            formObj,
            onSuccess: data => {
                if (!model?.id) {
                    router.push(`/notifications/templates/${data?.id}`);
                } else {
                    router.refresh();
                }
            },
            onError: errors => {},
        };

        if (model?.id) {
            await handleSubmit({ ...commonParams, endPoint: `notifications/templates/${model.id}`, method: 'PUT' });
        } else {
            await handleSubmit({ ...commonParams, endPoint: 'notifications/templates' });
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

    const handleDeleteTemplate = () => {
        fetchServer({
            method: 'DELETE',
            endpoint: `/notifications/templates/${model.id}`,
        }).then(res => (res.ok ? router.push('/notifications/templates') : console.error(res)));
    };

    return (
        <UIFormLayout  isEdit={model?.id} modelName={model?.title} modelType="template" submit={submit} handleDelete={handleDeleteTemplate}>
            <Fragment>
                <div className="grid grid-cols-1 gap-x-3 gap-y-3">
                    <div>
                        <UIFormLabel htmlFor="title" label="Title" />
                        <UIFormInputText id="title" name="title" defaultValue={model?.title} error={errors?.title} required isFocused autoComplete="title" />
                    </div>
                    <div className="h-full flex flex-col pb-4">
                        <UIFormLabel htmlFor="message" label="Message" />
                        <UIFormInputTextAreaEditor onChange={text => setHtmlMessage(text)} oldValue={htmlMessage} className="rounded-md border !border-passiveBorder min-h-40" />
                        {errors?.htmlMessage && <UIFormInputError className="mt-2" message={errors?.htmlMessage} />}
                    </div>

                    <div>
                        <UIFormLabel htmlFor="textMessage" label="Text Message" />
                        <UIFormInputTextArea id="textMessage" name="textMessage" label="Text Message" defaultValue={model?.textMessage} error={errors?.textMessage} isFocused />
                    </div>

                    <div>
                        <UIFormLabel htmlFor="notificationTypes" label="Notification Type" />
                        <FormInputSelectableMultiple data={notificationTypes} onChange={data => setSelectedNotificationTypes(data)} initialState={notificationTypes.filter(nt => selectedNotificationTypes.includes(nt.value))} hasSelectAll={false} error={errors?.notificationTypes} disableSearch />
                    </div>
                </div>
                {model?.id && <TemplateFormCriterias criterias={criterias} handleDeleteCriteria={handleDeleteCriteria} handleCreateCriteria={handleCreateCriteria} />}
            </Fragment>
        </UIFormLayout>
    );
};
export default NotificationTemplateForm;
