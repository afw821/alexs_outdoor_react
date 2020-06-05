import React, { Component } from "react";
import Form from "./common/Form";
import { MDBCard, MDBCardBody } from "mdbreact";
import { getStates } from "../utils/getStates";
import Joi from "joi-browser";
import { register } from "../services/userService";

class RegisterForm extends Form {
  state = {
    data: {
      states: [],
      firstName: "",
      lastName: "",
      address: "",
      address2: "",
      city: "",
      selectedState: "",
      zipCode: "",
      // firstEmail: "",
      email: "",
      firstPassword: "",
      password: "",
      isAdmin: 0,
    },
    errors: {},
  };

  schema = {
    firstName: Joi.string().required().min(2).max(50).label("First Name"),
    lastName: Joi.string().required().min(2).max(50).label("Last Name"),
    address: Joi.string().required().min(2).max(50).label("Address"),
    address2: Joi.label("Address2"),
    city: Joi.string().required().min(2).max(50).label("City"),
    selectedState: Joi.string().required().label("State"),
    states: Joi.array(),
    zipCode: Joi.string().required().min(2).max(50).label("Zip Code"),
    email: Joi.string().email().required().min(5).max(50).label("Email"),
    firstPassword: Joi.string().required().label("Password"),
    password: Joi.string().required().label("Password"),
    isAdmin: Joi.label("Administrator"),
  };

  doSubmit = async () => {
    try {
      console.log("do submit");
      const { data } = this.state;
      await register(
        data.firstName,
        data.lastName,
        data.address,
        data.address2,
        data.city,
        data.selectedState,
        data.zipCode,
        data.email,
        data.password,
        data.isAdmin
      );
      this.props.history.push("/login");
      // window.location = "/home";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.firstEmail = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  async componentDidMount() {
    const data = { ...this.state.data };
    const states = await getStates();
    data.states = states;

    this.setState({ data });
  }

  render() {
    console.log("register props", this.props);
    const { states } = this.state.data;
    return (
      <div className="row">
        <div
          className="col-12 d-flex justify-content-center"
          style={{ marginTop: "100px", marginBottom: "40px" }}
        >
          <MDBCard style={{ backgroundColor: "white", width: "600px" }}>
            <MDBCardBody>
              <form className="mt-4" onSubmit={this.handleSubmit}>
                <p className="h5 text-center mb-4">Sign up</p>
                <div className="grey-text">
                  {this.renderInputFormRow(
                    "First name",
                    "user",
                    "text",
                    "firstName",
                    "Last name",
                    "",
                    "text",
                    "lastName"
                  )}
                  <div className="form-row">
                    <div className="col">
                      {this.renderMDBInput(
                        "Your Email",
                        "envelope",
                        "email",
                        "email"
                      )}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col">
                      {this.renderMDBInput(
                        "Your Address",
                        "envelope",
                        "text",
                        "address"
                      )}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col">
                      {this.renderMDBInput(
                        "Apartment, Studio or floor",
                        "envelope",
                        "text",
                        "address2"
                      )}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col">
                      {this.renderMDBInput("City", "envelope", "text", "city")}
                    </div>
                    <div className="col d-flex align-items-center">
                      {this.renderSelect(
                        "Select a State",
                        states,
                        "selectedState"
                      )}
                    </div>
                    <div className="col">
                      {this.renderMDBInput("Zip", null, "text", "zipCode")}
                    </div>
                  </div>
                  {this.renderInputFormRow(
                    "Your password",
                    "lock",
                    "password",
                    "firstPassword",
                    "Confirm your password",
                    "exclamation-triangle",
                    "password",
                    "password"
                  )}
                  {this.renderBtn("Register", "primary", "submit")}
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
