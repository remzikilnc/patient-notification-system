"use client";

import {useCallback, useEffect, useState} from "react";
import useSWR from "swr";
import {addParametersToApiURL} from "@/lib/functions/addParametersToApiURL";
import fetchServer from "@/lib/fetch-server";
import {debounce} from "@/lib/functions/debounce";
import { disableButton } from '@/lib/functions/disableButton';

export const useFetchData = (endpoint, defaultFilters = {}) => {
  const [filters, setFilters] = useState(defaultFilters);
  const [data, setData] = useState(null);
  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  const query = addParametersToApiURL(debouncedFilters);
  const queryUrl = `/${endpoint}${query}`;
  const fetcher = async url => {
    const res = await fetchServer({method: "GET", endpoint: url});
    return await res.json();
  };

  const revalidate = (btn) => {
    disableButton(btn);
    mutate();
  }

  const {
    data: fetchedData,
    error,
    mutate,
  } = useSWR(queryUrl, fetcher, {
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

  return {filters, setFilters, data, error, mutate, revalidate:(btn) => revalidate(btn)};
};
