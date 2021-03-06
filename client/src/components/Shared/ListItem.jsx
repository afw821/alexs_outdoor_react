import React, { useState } from "react";

const ListItem = ({ selectedTab, items, handleChange }) => {
  return (
    <ul className="list-group tab-width" style={{ cursor: "pointer" }}>
      {items.map((item, index) => (
        <li
          name={item.name}
          key={item.id}
          onClick={() => handleChange(item)}
          className={
            item.name === selectedTab.name
              ? "list-group-item active-tab"
              : "list-group-item"
          }
        >
          <strong>{item.name}</strong>
        </li>
      ))}
    </ul>
  );
};

export default ListItem;
