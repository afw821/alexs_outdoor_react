import React, { Component } from "react";
import Input from "./Input";
import FileInput from "./FileInput";
import { MDBInput, MDBBtn } from "mdbreact";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data });
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
    e.preventDefault();
    //error handling

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

  renderSelect(label, options) {
    return (
      <select
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
        </div>
      </div>
    );
  }
  renderBtn(label, color) {
    return (
      <div className="text-center">
        <MDBBtn color={color}>{label}</MDBBtn>
      </div>
    );
  }
}

export default Form;
