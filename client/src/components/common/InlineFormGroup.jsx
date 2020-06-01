import React from "react";

const InlineFormGroup = ({ label, value, name, type, error, handleChange }) => {
  console.log("inline form group value...", value);
  return (
    <div className="form-group row">
      <label htmlFor={name} className="col-2 col-form-label">
        {label}
      </label>
      <div className="col-10">
        <input
          name={name}
          value={value}
          type={type}
          className="form-control"
          onChange={handleChange}
          id={name}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

export default InlineFormGroup;
