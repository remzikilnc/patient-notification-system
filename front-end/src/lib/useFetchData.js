"use client";

import React, {useCallback, useEffect, useState} from "react";
import useSWR from 'swr'
import fetchClient from "@/lib/fetch-client";
import {debounce} from "lodash";
import {addParametersToApiURL} from "@/lib/functions/addParametersToApiURL";

export const fetchClientData = (endpoint, defaultFilters = {}) => {
    const [filters, setFilters] = useState(defaultFilters);
    const [data, setData] = useState(null);
    const [debouncedFilters, setDebouncedFilters] = useState(filters);

    const query = addParametersToApiURL(debouncedFilters);
    const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/${endpoint}${query}`;

    const fetcher = async url => {
        const res = await fetchClient({method: "GET", url});
        return await res.json();
    };

    const {
        data: fetchedData,
        error,
        mutate,
    } = useSWR(url, fetcher, {
        revalidateOnFocus: false,
        dedupingInterval: 32000,
    });

    const debouncedSetFilters = useCallback(debounce(setDebouncedFilters, 300), []);

    useEffect(() => {
        debouncedSetFilters(filters);
    }, [filters]);

    useEffect(() => {
        if (fetchedData) {
            setData(fetchedData);
        }
    }, [fetchedData]);

    return {filters, setFilters, data, error, mutate};
};
