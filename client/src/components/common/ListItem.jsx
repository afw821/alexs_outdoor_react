import React, { useState } from "react";

const ListItem = ({ selectedTab, items, handleChange }) => {
  return (
    <ul className="list-group">
      {items.map((item, index) => (
        <li
          name={item}
          key={index}
          onClick={() => handleChange(item)}
          className={
            item === selectedTab ? "list-group-item active" : "list-group-item"
          }
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default ListItem;
