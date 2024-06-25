import {JsonApiParams} from "@/lib/json-api-params/main";
export function addParametersToApiURL(paramsObj) {
    let apiParams = new JsonApiParams();

    for (const [key, value] of Object.entries(paramsObj)) {
        if (value) {
            if (key === "filter") {
                for (const [filterKey, filterValue] of Object.entries(value)) {
                    if (filterValue) {
                        apiParams.addFilter(filterKey, filterValue);
                    }
                }
            }
            if (key === "sort") {
                for (const [sortKey, sortValue] of Object.entries(value)) {
                    if (sortValue) {
                        apiParams.addSort(sortKey, sortValue);
                    }
                }
            }
            if (key === "include" && value) {
                apiParams.addInclude(value);
            }
            if (key === "pageLimit" && value) {
                apiParams.addPageLimit(value);
            }
            if (key === "pageNumber" && value) {
                apiParams.addCustomParam({page: {number: value}});
            }
        }
    }

    let queryString = apiParams.getQueryString({encode: false});
    return queryString ? "?" + queryString : "";
}
