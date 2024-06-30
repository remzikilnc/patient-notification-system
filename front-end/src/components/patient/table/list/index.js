import React, {Fragment, useLayoutEffect, useRef, useState} from "react";
import {AiOutlineArrowDown} from "react-icons/ai";
import UITableNotFound from "@/components/ui/table/not-found";
import UITableCell from "@/components/ui/table/cell";
import {updateNestedFilters} from "@/lib/functions/update-nested-filters";
import UITablePagination from "@/components/ui/table/pagination";

const PatientTableList = ({title, icon, pagination, selectedData, setSelectedData, filters, setFilters, columns}) => {
  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);

  const data = pagination.data;

  useLayoutEffect(() => {
    const isIndeterminate = selectedData.length > 0 && selectedData.length < data.length;
    setChecked(selectedData.length === data.length);
    setIndeterminate(isIndeterminate);
    checkbox.current.indeterminate = isIndeterminate;
  }, [selectedData]);

  function toggleAll() {
    setSelectedData(checked || indeterminate ? [] : data);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  const handleSortChange = field => {
    updateNestedFilters({
      setFilters: setFilters,
      category: "sort",
      field: field,
    });
  };

  return (
    <Fragment>
      <div className="overflow-x-auto ">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden border border-passiveBorder rounded-md rounded-b-none">
            <div className="relative">
              <table className="min-w-full table-fixed">
                <thead className="bg-primary text-sm text-white">
                  <tr>
                    <th scope="col" className="relative w-12 px-6 sm:w-16 sm:px-8">
                      <input type="checkbox" className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded accent-white sm:left-6" ref={checkbox} checked={checked} onChange={toggleAll} />
                    </th>
                    {columns?.map(col => (
                      <th key={col.id} scope="col" className={col.action ? "relative py-3.5 pl-3 pr-4 sm:pr-6" : `px-3 py-3.5 text-left text-sm font-normal truncate ${col.sortable ? "group/dropdown cursor-pointer" : ""}`} onClick={col.sortable ? () => handleSortChange(col.id) : undefined}>
                        {col.id === "actions" || col.id === "actions-w-slug" ? (
                          <span className="sr-only">{col.label}</span>
                        ) : (
                          <div className={`flex gap-x-2 ${col.sortable ? "group/dropdown cursor-pointer" : ""} ${filters.sort[col.id] === "ASC" ? "font-semibold" : filters.sort[col.id] === "DESC" ? "font-semibold" : ""} `}>
                            {col.label}
                            {col.sortable && (
                              <AiOutlineArrowDown
                                className={`h-4 w-4  group-hover/dropdown:opacity-100 opacity-0 transition duration-200 ease-in-out -translate-y-1 group-hover/dropdown:translate-y-0.5 group-hover/dropdown:scale-110 ${
                                  filters.sort[col.id] === "asc" ? "opacity-100 translate-y-0.5" : filters.sort[col.id] === "desc" ? "transform rotate-180 opacity-100 translate-y-0.5" : ""
                                }`}
                              />
                            )}
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-passiveBorder">
                  {data.length > 0 ? (
                    data.map(item => (
                      <tr key={item.id} className={selectedData.includes(item) ? "bg-primary/30" : undefined}>
                        <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                          {selectedData.includes(item) && <div className={`absolute inset-y-0 left-0 w-0.5 bg-primaryBorder`} />}
                          <input
                            type="checkbox"
                            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 sm:left-6 accent-primary"
                            value={item.id}
                            checked={selectedData.includes(item)}
                            onChange={e => setSelectedData(e.target.checked ? [...selectedData, item] : selectedData.filter(selectedItem => selectedItem.id !== item.id))}
                          />
                        </td>
                        {columns.map(col => (
                          <UITableCell key={col.id} type={col.type} value={item[col.id]} item={item} colId={col.id} endpoint={col.endpoint} text={col.text} className={col.className} />
                        ))}
                      </tr>
                    ))
                  ) : (
                    <UITableNotFound Icon={icon} title={`No matching ${title}`} />
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <UITablePagination paginationMeta={pagination?.meta} filters={filters} setFilters={setFilters} />
    </Fragment>
  );
};

export default PatientTableList;
