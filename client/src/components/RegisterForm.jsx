import React, { Component } from "react";
import Form from "./common/Form";
import { MDBCard, MDBCardBody } from "mdbreact";
import { getStates } from "../utils/getStates";

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
      zip: "",
      firstEmail: "",
      email: "",
      firstPassword: "",
      password: "",
    },
  };

  async componentDidMount() {
    const data = { ...this.state.data };
    const states = await getStates();
    data.states = states;

    this.setState({ data });
  }

  render() {
    const { states } = this.state.data;
    return (
      <div className="row">
        <div className="col-sm-8 mt-3">
          <MDBCard>
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
                  {this.renderInputFormRow(
                    "Your email",
                    "envelope",
                    "email",
                    "firstEmail",
                    "Confirm your email",
                    "exclamation-triangle",
                    "email",
                    "email"
                  )}
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
                      {this.renderSelect("Select a State", states)}
                    </div>
                    <div className="col">
                      {this.renderMDBInput("Zip", null, "text", "zip")}
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
                  {this.renderBtn("Register", "primary")}
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
