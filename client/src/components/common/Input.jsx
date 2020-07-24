import React from "react";

const Input = ({ name, label, value, handleChange, type, error }) => {
  return (
    <div className="form-group">
      <label className="font-bolder" htmlFor={name}>
        {label}
      </label>
      <input
        value={value}
        onChange={handleChange}
        name={name}
        type={type}
        id={name}
        className="form-control mb-4"
      />
    </div>
  );
};

export default Input;
