export const updateNestedFilters = ({setFilters, category, field, value}) => {
  setFilters(prevFilters => {
    let updatedFilters;

    if (category === "sort") {
      let newSortDirection;
      switch (prevFilters.sort[field]) {
        case "asc":
          newSortDirection = "desc";
          break;
        case "desc":
          newSortDirection = false;
          break;
        default:
          newSortDirection = "asc";
      }

      updatedFilters = {
        ...prevFilters,
        sort: {},
      };

      if (newSortDirection) {
        updatedFilters.sort[field] = newSortDirection;
      }
    } else {
      updatedFilters = {
        ...prevFilters,
        [category]: {
          ...prevFilters[category],
          [field]: value,
        },
      };
    }

    return {
      ...updatedFilters,
      pageNumber: 1,
    };
  });
};
