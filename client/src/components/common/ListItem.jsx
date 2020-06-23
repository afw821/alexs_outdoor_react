import React, { useState } from "react";

const ListItem = ({ selectedTab, items, handleChange }) => {
  console.log('selected tab', selectedTab);
  return (
    <ul className="list-group" style={{ cursor: "pointer"}}>
      {items.map((item, index) => (
        <li
          name={item.name}
          key={item.id}
          onClick={() => handleChange(item)}
          className={
            item.name === selectedTab.name ? "list-group-item active" : "list-group-item"
          }
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default ListItem;
