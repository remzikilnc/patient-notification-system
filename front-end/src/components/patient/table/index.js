"use client";

import React, {Fragment, useState} from "react";
import {useFetchData} from "@/lib/useFetchData";
import PatientTableFilter from "@/components/patient/table/filter";
import UIButtonDanger from "@/components/ui/button/danger";
import fetchServer from "@/lib/fetch-server";
import UITableLoading from "@/components/ui/table/loading";

export default function PatientTable() {
    const [selectedData, setSelectedData] = useState([]);
    const {filters, setFilters, data: modelPagination, error, mutate} = useFetchData("patients", modelsDefaultFilterValues);
    async function handleAction(actionType) {
        let updatedModelData = [...modelPagination.content];
        for (const model of selectedData) {
            try {
                let response;
                if (actionType === "delete") {
                    response = await deleteModel(model.id);
                    if (response.ok) {
                      /*  toastAlertSuccess(`${model.name} has been deleted.`);*/
                        updatedModelData = updatedModelData.filter(existingModel => existingModel.id !== model.id);
                    }
                }
            } catch (error) {
                /*toastAlertError(`An error occurred while trying to ${actionType} ${model.name}. Reason: ${error.message}`);*/
            }
        }
        setSelectedData([]);
        await mutate({
            ...modelPagination,
            data: updatedModelData,
        });
    }

    if (error) {
        return (
            <div className="text-center text-black">
                <span>An error occured, please try again later.</span>
            </div>
        );
    }

    return (
        <Fragment>
            <div className="mb-1 z-10">
                <PatientTableFilter/>
            </div>
            <div className="relative">
                {selectedData.length > 0 && (
                    <div className="absolute left-12 flex h-auto top-1 pt-1.5 items-center space-x-3 bg-white dark:bg-themeSecondary sm:left-16 z-10">
                        <div className="items-center justify-center">
                            <UIButtonDanger onClick={() => handleAction("delete")}>Delete</UIButtonDanger>
                        </div>
                    </div>
                )}
                {modelPagination ? <>table</> : <UITableLoading />}
            </div>
        </Fragment>
    );
}

const modelsDefaultFilterValues = {
    filter: {
        name: "",
    },
    sort: {
        id: "asc",
    },
    pageNumber: 1,
    pageLimit: 10,
};


async function deleteModel(modalId) {
    return fetchServer({method: "DELETE", endpoint:`/patients/${modalId}`});
}
