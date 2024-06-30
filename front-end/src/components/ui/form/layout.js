import React from 'react';
import UIButtonDanger from '@/components/ui/button/danger';
import UIButtonPrimary from '@/components/ui/button/primary';

const UIFormLayout = ({ submit, isEdit, modelName, modelType, handleDelete, children }) => {
    return (
        <form className="space-y-8 p-1 overflow-hidden" onSubmit={submit}>
            <div className="space-y-8">
                <div className="flex gap-x-0.5 px-0.5 ">
                    <h3 className="text-xl flex-1  font-semibold dark:text-themeHoverText truncate">{isEdit ? `Edit ${modelName ?? ''}` : 'Create Template'}</h3>
                    {isEdit && (
                        <UIButtonDanger type="button" onClick={handleDelete} className="ml-auto flex gap-x-1  px-4 truncate !py-2">
                            Delete<span className="lg:inline truncate hidden">This {modelType}</span>
                        </UIButtonDanger>
                    )}
                </div>
                <div className="col-span-3">
                    <div className="grid grid-cols-1 gap-y-4 gap-x-4 border-b border-passiveBorder pb-5">{children}</div>
                </div>
            </div>

            <div className="pt-5">
                <div className="flex justify-end">
                    <div className="flex items-center gap-4">
                        <UIButtonPrimary type="submit">{isEdit ? 'Update' : 'Create'}</UIButtonPrimary>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default UIFormLayout;
