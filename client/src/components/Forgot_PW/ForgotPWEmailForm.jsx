import React from "react";
import Form from "../Shared/Form";
import Joi from "joi-browser";
import { MDBCard, MDBCardBody, MDBModalFooter } from "mdbreact";
import { sendEmailForgotPW } from "../../services/emailService";
import { Link } from "react-router-dom";

class ForgotPWEmailForm extends Form {
  state = {
    data: {
      email: "",
    },
    errors: {},
    submitted: false,
  };

  schema = {
    email: Joi.string().required().label("Email"),
  };

  doSubmit = async () => {
    try {
      this.setState({ showLoader: true });
      const { data, errors } = this.state;

      const { data: result } = await sendEmailForgotPW(data.email);

      this.setState({
        data: {
          email: "",
        },
        submitted: true,
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };

        this.setState({ errors });
      }
    }
  };
  render() {
    const { submitted } = this.state;

    if (submitted)
      return (
        <div className="row">
          <div className="col d-flex justify-content-center mt-3">
            <MDBCard className="form-width" style={{ marginTop: "100px" }}>
              <MDBCardBody>
                <p>
                  If that account is in our system, we will email you a link to
                  reset your password.
                </p>
              </MDBCardBody>
            </MDBCard>
          </div>
        </div>
      );
    else
      return (
        <div className="row">
          <div className="col d-flex justify-content-center mt-3">
            <MDBCard className="form-width" style={{ marginTop: "100px" }}>
              <MDBCardBody>
                <form className="mt-4" onSubmit={this.handleSubmit}>
                  <p className="text-center mb-4">
                    {" "}
                    It happens to the best of us. Enter the email you registered
                    with and we'll send you reset instructions.
                  </p>
                  <div className="grey-text">
                    <div className="form-row">
                      <div className="col">
                        {this.renderMDBInput(
                          "Email",
                          "envelope",
                          "text",
                          "email"
                        )}
                      </div>
                    </div>
                    <div className="row pb-3">
                      <div className="col">
                        {this.renderBtn("Submit", "primary", "submit")}
                      </div>
                    </div>
                  </div>
                </form>
                <MDBModalFooter className="d-flex justify-content-center">
                  Suddenly remembered your password?
                  <Link to="/login">Return to Login</Link>
                </MDBModalFooter>
              </MDBCardBody>
            </MDBCard>
          </div>
        </div>
      );
  }
}

export default ForgotPWEmailForm;
