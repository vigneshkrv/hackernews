import React from "react";

export default ({ colRef, colLabel, sortBy, onSort, disabled }) => {
  const { colName, colDir } = sortBy;
  return (
    <th
      className="sortStyle"
      style={{ whiteSpace: "nowrap" }}
      onClick={(e) => {
        !disabled && onSort(colRef);
      }}
    >
      <strong>{colLabel}</strong>
    </th>
  );
};
