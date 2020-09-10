import React from "react";

const TableHead = ({ options, clientWidth }) => {
  return (
    <thead className="thead-dark">
      <tr>
        {options.map((option) => (
          <th key={option.id} scope="col">
            {option.header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
