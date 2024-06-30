import React from "react";
import {BiChevronRight, BiChevronsRight, BiChevronLeft, BiChevronsLeft} from "react-icons/bi";
import UIFormInputSelectableWithIcon from "@/components/ui/form/input/selectable/with-icon";

export default function UITablePagination({paginationMeta, filters, setFilters}) {
  const selectableLimits = [1, 5, 10, 20, 50];
  const {current_page: currentPage, last_page: lastPageNumber} = paginationMeta;
  const range = 1;

  const firstPageInRange = Math.max(1, currentPage - range);
  const lastPageInRange = Math.min(lastPageNumber, currentPage + range);
  const prevPage = Math.max(1, currentPage - 1);
  const nextPage = Math.min(lastPageNumber, currentPage + 1);

  const handlePageChange = newPageNumber => {
    setFilters(prevFilters => ({
      ...prevFilters,
      pageNumber: newPageNumber,
    }));
  };

  const handleLimitChange = newLimitNumber => {
    setFilters(prevFilters => ({
      ...prevFilters,
      pageLimit: newLimitNumber,
      pageNumber: 1,
    }));
  };

  const pageButtons = [];
  for (let i = firstPageInRange; i <= lastPageInRange; i++) {
    pageButtons.push(
      <button
        key={i}
        disabled={filters.pageNumber === i}
        onClick={() => handlePageChange(i)}
        className={`inline-flex items-center border-t-2 px-4 pt-1 text-sm font-medium ${i === currentPage ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-primary"}`}
      >
        {i}
      </button>
    );
  }

  return (
    <nav className="flex justify-between mt-[-1px] gap-x-2">
      <div className="lg:block hidden border p-1 px-2 border-gray-300 text-gray-500 rounded-t-none rounded-md">
        <span>Page: {currentPage} </span>
      </div>
      <div className="flex justify-center ">
        <div className="-mt-px flex w-auto">
          <button
            disabled={filters.pageNumber === 1}
            onClick={() => handlePageChange(1)}
            className={`items-center border-t-2 border-transparent pt-1 pr-1 text-sm font-medium text-gray-500 hidden sm:inline-flex ${filters.pageNumber === 1 ? "cursor-not-allowed" : "cursor-pointer hover:border-primary hover:text-gray-700"}`}
          >
            <BiChevronsLeft className="mr-3 h-5 w-5 " aria-hidden="true" />
          </button>
        </div>

        <div className="-mt-px flex w-auto">
          <button
            disabled={filters.pageNumber === prevPage}
            onClick={() => handlePageChange(prevPage)}
            className={`inline-flex items-center border-t-2 border-transparent pt-1 pr-1 text-sm font-medium text-gray-500 ${filters.pageNumber === prevPage ? "cursor-not-allowed" : "cursor-pointer hover:border-primary hover:text-gray-700"}`}
          >
            <BiChevronLeft className="mr-3 h-5 w-5 " aria-hidden="true" />
          </button>
        </div>

        <div className="hidden md:-mt-px md:flex justify-center">{pageButtons}</div>

        <div className="-mt-px flex w-auto">
          <button
            disabled={filters.pageNumber === nextPage}
            onClick={() => handlePageChange(nextPage)}
            className={`inline-flex items-center border-t-2 border-transparent pt-1 pr-1 text-sm font-medium text-gray-500 ${filters.pageNumber === nextPage ? "cursor-not-allowed" : "cursor-pointer hover:border-primary hover:text-gray-700"}`}
          >
            <BiChevronRight className="ml-3 h-5 w-5 " aria-hidden="true" />
          </button>
        </div>

        <div className="-mt-px flex w-auto">
          <button
            disabled={filters.pageNumber === lastPageNumber}
            onClick={() => handlePageChange(lastPageNumber)}
            className={`items-center border-t-2 border-transparent pt-1 pr-1 text-sm font-medium text-gray-500 hidden sm:inline-flex ${filters.pageNumber === lastPageNumber ? "cursor-not-allowed" : "cursor-pointer  hover:border-primary hover:text-gray-700"}`}
          >
            <BiChevronsRight className="ml-3 h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="w-20">
        <UIFormInputSelectableWithIcon options={"up"} data={selectableLimits} selectedValue={filters.pageLimit} setSelectedValue={value => handleLimitChange(value)} />
      </div>
    </nav>
  );
}
