'use client';

import React, { Fragment } from 'react';
import { updateNestedFilters } from '@/lib/functions/update-nested-filters';
import UIFormLabel from '@/components/ui/form/label';
import UIFormInputSearchWithIcon from '@/components/ui/form/input/search/with-icon';
import UIIconHasBackground from '@/components/ui/icon/has-background';
import { LuFilterX } from 'react-icons/lu';
import { Field, Fieldset, Popover, Transition } from '@headlessui/react';
import { FiFilter } from 'react-icons/fi';
import { BsHash } from 'react-icons/bs';
import { BiRename } from 'react-icons/bi';
import UIButtonSortWithOptions from '@/components/ui/button/sort-with-options';
import UIFormInputSelectableWithIcon from '@/components/ui/form/input/selectable/with-icon';

export default function PatientTableFilter({ filters, setFilters, modelsDefaultFilterValues }) {
    const resetFilters = () => {
        setFilters(modelsDefaultFilterValues);
    };

    const handleFilterChange = (category, field, value) => {
        if (value == null) {
            return;
        }
        updateNestedFilters({
            category: category,
            field: field,
            setFilters: setFilters,
            value: value,
        });
    };

    const handleSortChange = field => {
        updateNestedFilters({
            category: 'sort',
            field: field,
            setFilters: setFilters,
        });
    };

    return (
        <div className="flex flex-row justify-between gap-x-2">
            <div className="w-full max-w-2xl">
                <UIFormLabel className="!text-xs mb-1" htmlFor="search">
                    Search
                </UIFormLabel>
                <UIFormInputSearchWithIcon id="search" name="search" value={filters.filter.search} placeholder="Search" handleChange={e => handleFilterChange('filter', 'search', e.target.value)} />
            </div>
            <div className="rounded my-1 flex gap-x-2">
                <button onClick={resetFilters}>
                    <UIIconHasBackground isActive={!(filters === modelsDefaultFilterValues)} Icon={LuFilterX} text={'Clear Filter'} />
                </button>
                <Popover as="section" aria-labelledby="filter-heading">
                    <div className="flex">
                        <h2 id="filter-heading" className="sr-only">
                            Filters
                        </h2>
                        <div className="relative col-start-1 row-start-1 py-4 w-full">
                            <div className="mx-auto flex space-x-6 text-sm justify-between">
                                <div>
                                    <Popover.Button>
                                        <UIIconHasBackground Icon={FiFilter} text={'Filter'} />
                                    </Popover.Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Transition enter="transition ease-out duration-200" enterFrom="opacity-0 translate-y-1" enterTo="opacity-100 translate-y-0" leave="transition ease-in duration-150" leaveFrom="opacity-100 translate-y-0" leaveTo="opacity-0 translate-y-1">
                        <Popover.Panel className="my-2 absolute bg-white dark:bg-themeDarker dark:border-themeBorderGray border-gray-300 border-01 p-4 rounded shadow-2xl origin-top-right right-0">
                            <div className="flex flex-row flex-nowrap w-full mb-2 justify-between">
                                <span className="dark:text-themePassiveText text-gray-800 flex items-center text-sm">Filters</span>
                                <button onClick={resetFilters}>
                                    <UIIconHasBackground Icon={LuFilterX} text={'Clear'} />
                                </button>
                            </div>
                            <div className="relative z-0 flex flex-1 items-center justify-center w-full sm:inset-0 ">
                                <Fieldset className="w-full grid gap-3 grid-cols-1 sm:grid-cols-2">
                                    <Field>
                                        <UIFormLabel className="!text-xs mb-1" htmlFor="search-id">
                                            ID
                                        </UIFormLabel>
                                        <UIFormInputSearchWithIcon id="search-id" name="search-id" value={filters.filter.id} Icon={BsHash} placeholder="ID" handleChange={e => handleFilterChange('filter', 'id', e.target.value)}>
                                            <UIButtonSortWithOptions defaultValue={filters.sort.id} field="id" handleSortChange={handleSortChange} />
                                        </UIFormInputSearchWithIcon>
                                    </Field>
                                    <Field>
                                        <UIFormLabel className="!text-xs mb-1" htmlFor="search-name">
                                            Name
                                        </UIFormLabel>
                                        <UIFormInputSearchWithIcon id="search-name" name="search-name" value={filters.filter.name} Icon={BiRename} placeholder="Title" handleChange={e => handleFilterChange('filter', 'name', e.target.value)}>
                                            <UIButtonSortWithOptions defaultValue={filters.sort.name} field="name" handleSortChange={handleSortChange} />
                                        </UIFormInputSearchWithIcon>
                                    </Field>
                                    <Field>
                                        <UIFormLabel className="!text-xs mb-1" htmlFor="search-surname">
                                            Last Name
                                        </UIFormLabel>
                                        <UIFormInputSearchWithIcon id="search-surname" name="search-surname" value={filters.filter.surname} Icon={BiRename} placeholder="Surname" handleChange={e => handleFilterChange('filter', 'surname', e.target.value)}>
                                            <UIButtonSortWithOptions defaultValue={filters.sort.surname} field="surname" handleSortChange={handleSortChange} />
                                        </UIFormInputSearchWithIcon>
                                    </Field>
                                    <Field>
                                        <UIFormLabel className="!text-xs mb-1" htmlFor="gender">
                                            Gender
                                        </UIFormLabel>
                                        <UIFormInputSelectableWithIcon id="gender" data={['MALE', 'FEMALE']} selectedValue={filters.filter.gender} setSelectedValue={value => handleFilterChange('filter', 'gender', value)} />
                                    </Field>
                                </Fieldset>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </Popover>
            </div>
        </div>
    );
}
