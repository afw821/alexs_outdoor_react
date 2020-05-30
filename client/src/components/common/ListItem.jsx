import React, { useState } from "react";

const ListItem = (props) => {
  const [selectedTab, setTab] = useState("My Account");
  const _items = props.items;
  const handleTabChange = (item) => {
    setTab(item);
  };
  return (
    <ul className="list-group">
      {_items.map((item, index) => (
        <li
          name={item}
          key={index}
          onClick={() => handleTabChange(item)}
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
