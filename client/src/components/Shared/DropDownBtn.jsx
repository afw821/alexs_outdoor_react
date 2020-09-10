import React from "react";
import {
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdbreact";

const DropDownBtn = ({ title, items, selectedTab, handleChange }) => {
  return (
    <MDBDropdown>
      <MDBDropdownToggle caret color="primary">
        {title}
      </MDBDropdownToggle>
      <MDBDropdownMenu basic>
        {items.map((item) => (
          <MDBDropdownItem
            active={item.name === selectedTab.name}
            key={item.id}
            onClick={() => handleChange(item)}
          >
            {item.name}
          </MDBDropdownItem>
        ))}
      </MDBDropdownMenu>
    </MDBDropdown>
  );
};

export default DropDownBtn;
