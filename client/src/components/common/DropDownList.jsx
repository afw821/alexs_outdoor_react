import React from "react";

const DropDownList = ({
  name,
  label,
  options,
  handleChange,
  error,
  selectedItem,
}) => {
  console.log("selected item", selectedItem);
  return (
    <div className="form-group">
      <label className="font-bolder" htmlFor={name}>
        {label}
      </label>
      <select
        className="form-control"
        name={name}
        id={name}
        onChange={handleChange}
        value={selectedItem}
      >
        <option value="select" id="select">
          Select...
        </option>
        {options.map((option) => (
          <option key={option.id} id={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default DropDownList;
