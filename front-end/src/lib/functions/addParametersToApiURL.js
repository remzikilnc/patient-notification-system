export function addParametersToApiURL(paramsObj) {
  let query = [];

  for (const [key, value] of Object.entries(paramsObj)) {
    if (key === "sort" && typeof value === "object") {
      for (const [sortKey, sortValue] of Object.entries(value)) {
        query.push(`${key}=${sortKey},${sortValue}`);
      }
    } else if (Array.isArray(value)) {
      value.forEach(item => {
        query.push(`${key}=${encodeURIComponent(item)}`);
      });
    } else if (typeof value === "object") {
      for (const [subKey, subValue] of Object.entries(value)) {
        query.push(`${subKey}=${encodeURIComponent(subValue)}`);
      }
    } else {
      query.push(`${key}=${encodeURIComponent(value)}`);
    }
  }

  return query.length > 0 ? "?" + query.join("&") : "";
}
