import React, { Component } from "react";
import Input from "./Input";
import FileInput from "./FileInput";
import { MDBInput, MDBBtn } from "mdbreact";
import Joi from "joi-browser";
import TextArea from "./TextArea";
import DropDownList from "./DropDownList";
import InlineFormGroup from "./InlineFormGroup";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  doPasswordsMatch = (password, firstPassword) => {
    if (firstPassword !== password) return "Passwords must match";
    else return "Passwords match!";
  };
  doEmailsMatch = (email, firstEmail) => {
    if (firstEmail !== email) return "Emails must match";
    else return "They match!";
  };

  validateOnSubmit = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  handleChange = ({ currentTarget: input }) => {
    console.log("handle change");
    const errors = { ...this.state.errors };
    const data = { ...this.state.data };
    switch (input.name) {
      case "password":
        console.log("password");
        const firstPassword = data.firstPassword;
        const pwErrorMessage = this.doPasswordsMatch(
          input.value,
          firstPassword
        );
        errors[input.name] = pwErrorMessage;
        break;

      case "categories":
        data["selectedCategoryId"] = input.value;
        this.setState({ data, errors });
        return;
      default:
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];
    }
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleFileUpload = (event) => {
    const data = { ...this.state.data };
    const files = event.target.files;
    const reader = new FileReader();
    const readerAsDataUrl = reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      data.imageSrc = e.target.result;
      data.file = files[0];
      this.setState({ data: data });
    };
  };

  handleSubmit = (e) => {
    e.preventDefault();
    //error handling
    const errors = this.validateOnSubmit();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  renderInlineFormGroup(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <InlineFormGroup
        label={label}
        name={name}
        type={type}
        value={data[name] || ""}
        error={errors[name]}
        handleChange={this.handleChange}
      />
    );
  }

  renderInlineFormSelect(name, label, type = "text", options, value) {
    return (
      <div className="form-group row">
        <label htmlFor={name} className="col-sm-2 col-form-label">
          {label}
        </label>
        <div className="col-sm-10">
          <select
            className="custom-select my-1 mr-sm-2"
            name={name}
            value={value}
            onChange={this.handleChange}
            id={name}
          >
            <option>Choose...</option>
            {options.map((state) => (
              <option key={state.key} value={state.key}>
                {state.value}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <>
        <Input
          error={errors[name]}
          name={name}
          value={data[name]}
          label={label}
          handleChange={this.handleChange}
          type={type}
        />
        {name !== "password" && errors[name] && (
          <div className="alert alert-danger">{errors[name]}</div>
        )}
        {name === "password" && errors[name] && (
          <div
            className={
              errors.password === "Passwords must match"
                ? "alert alert-danger"
                : "alert alert-success"
            }
          >
            {errors[name]}
          </div>
        )}
      </>
    );
  }

  renderTextArea(name, label, type, rows) {
    const { data, errors } = this.state;
    return (
      <TextArea
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        type={type}
        error={errors[name]}
        rows={rows}
      />
    );
  }

  renderDropDownList(name, label, type, options, selectedItem) {
    const { data, errors } = this.state;
    return (
      <DropDownList
        error={errors[name]}
        name={name}
        label={label}
        options={options}
        handleChange={this.handleChange}
        selectedItem={selectedItem}
      />
    );
  }

  renderFileInput(name, label, type = "file", imageSrc, alt) {
    const { data, errors } = this.state;
    return (
      <FileInput
        error={errors[name]}
        name={name}
        label={label}
        type={type}
        handleFileUpload={this.handleFileUpload}
        imageSrc={imageSrc}
      />
    );
  }

  renderSelect(label, options, name) {
    return (
      <select
        name={name}
        onChange={this.handleChange}
        className="browser-default custom-select"
        style={{ border: "0", borderBottom: "1px solid lightgray" }}
      >
        <option>{label}</option>
        {options.map((state) => (
          <option value={state.key}>{state.value}</option>
        ))}
      </select>
    );
  }

  renderMDBInput(label, icon, type, name) {
    const { data, errors } = this.state;
    return (
      <>
        <MDBInput
          name={name}
          value={data[name]}
          label={label}
          icon={icon}
          group
          type={type}
          id={name}
          onChange={this.handleChange}
        />
        {errors[name] && (
          <div className="alert alert-danger">{errors[name]}</div>
        )}
      </>
    );
  }

  renderInputFormRow(label, icon, type, name, label2, icon2, type2, name2) {
    const { data, errors } = this.state;
    return (
      <div className="form-row">
        <div className="col">
          <MDBInput
            name={name}
            label={label}
            value={data[name]}
            icon={icon}
            group
            type={type}
            onChange={this.handleChange}
          />
          {errors[name] && (
            <div className="alert alert-danger">{errors[name]}</div>
          )}
        </div>
        <div className="col">
          <MDBInput
            name={name2}
            label={label2}
            value={data[name2]}
            group
            type={type2}
            onChange={this.handleChange}
          />
          {name2 !== "password" && name2 !== "email" && errors[name2] && (
            <div className="alert alert-danger">{errors[name2]}</div>
          )}
          {name2 === "password" && errors[name2] && (
            <div
              className={
                errors.password === "Passwords must match"
                  ? "alert alert-danger"
                  : "alert alert-success"
              }
            >
              {errors[name2]}
            </div>
          )}
        </div>
      </div>
    );
  }
  renderBtn(label, color, type) {
    return (
      <div className="text-center">
        <MDBBtn type={type} color={color}>
          {label}
        </MDBBtn>
      </div>
    );
  }
}

export default Form;
