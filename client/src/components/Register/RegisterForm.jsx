import React from "react";
import Form from "../Shared/Form";
import { MDBCard, MDBCardBody, MDBModalFooter } from "mdbreact";
import { getStates } from "../../utils/getStates";
import Joi from "joi-browser";
import { register } from "../../services/userService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { sendEmailRegister } from "../../services/emailService";

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
      const { data } = this.state;
      const { handleSetActiveTab } = this.props;
      const user = await register(
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
      if (user) {
        this.props.history.push("/login");
        handleSetActiveTab("Login");
        sendEmailRegister(user.email, `${user.firstName} ${user.lastName}`);
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
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
                    "firstPassword", //name
                    "Confirm your password",
                    "exclamation-triangle",
                    "password",
                    "password" //name 2
                  )}
                  <div className="row pb-3">
                    <div className="col">
                      {this.renderBtn("Register", "primary", "submit")}
                    </div>
                  </div>
                </div>
              </form>
              <MDBModalFooter className="d-flex justify-content-center">
                <div className="row">
                  <div className="col">
                    <p onClick={() => this.props.handleSetActiveTab("Login")}>
                      Already a member?<Link to="/login"> Login</Link>
                    </p>
                  </div>
                </div>
              </MDBModalFooter>
            </MDBCardBody>
          </MDBCard>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
