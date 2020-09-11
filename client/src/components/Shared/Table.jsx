import React from "react";
import TableHead from "./../Shared/TableHead";
import TableBody from "./../Shared/TableBody";

const Table = ({ options, items, handleHover, handleLeave, trItems }) => {
  return (
    <table className="table">
      <TableHead options={options} />
      <TableBody
        items={items}
        handleHover={handleHover}
        handleLeave={handleLeave}
        trItems={trItems}
      />
    </table>
  );
};

export default Table;
