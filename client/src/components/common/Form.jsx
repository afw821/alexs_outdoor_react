import React, { Component } from "react";
import Input from "./Input";
import FileInput from "./FileInput";
import { MDBInput, MDBBtn } from "mdbreact";
import Joi from "joi-browser";

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
    const errors = { ...this.state.errors };
    const data = { ...this.state.data };
    switch (input.name) {
      case "password":
        const firstPassword = data.firstPassword;
        const pwErrorMessage = this.doPasswordsMatch(
          input.value,
          firstPassword
        );
        errors[input.name] = pwErrorMessage;
        break;
      case "email":
        const firstEmail = data.firstEmail;
        const emailErrorMessage = this.doEmailsMatch(input.value, firstEmail);
        errors[input.name] = emailErrorMessage;
        break;
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
    const files = event.target.files;
    const reader = new FileReader();
    const readerAsDataUrl = reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      this.setState({
        data: {
          imageSrc: e.target.result,
          file: files[0],
        },
      });
    };
  };

  handleSubmit = (e) => {
    console.log("on submit");
    e.preventDefault();
    //error handling
    const errors = this.validateOnSubmit();
    this.setState({ errors: errors || {} });
    console.log("after set state hs errors", errors);
    if (errors) return;

    this.doSubmit();
  };

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        value={data[name]}
        label={label}
        handleChange={this.handleChange}
        type={type}
      />
    );
  }

  renderFileInput(name, label, type = "file", imageSrc, alt) {
    return (
      <FileInput
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
          {name2 === "email" && errors[name2] && (
            <div
              className={
                errors.email === "Emails must match"
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
