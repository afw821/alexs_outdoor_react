import React from "react";
import Form from "../components/common/Form";
import { MDBCard, MDBCardBody } from "mdbreact";
import { login } from "../services/authService";
import Joi from "joi-browser";

class LoginForm extends Form {
  state = {
    data: {
      username: "",
      loginPassword: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    loginPassword: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await login(data.username, data.loginPassword);
      window.location = "/home";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="row">
        <div className="col-4"></div>
        <div className="col-sm-4 mt-3">
          <MDBCard style={{ backgroundColor: "whitesmoke" }}>
            <MDBCardBody>
              <form className="mt-4" onSubmit={this.handleSubmit}>
                <p className="h5 text-center mb-4">Log In</p>
                <div className="grey-text">
                  <div className="form-row">
                    <div className="col">
                      {this.renderMDBInput(
                        "Username",
                        "user",
                        "text",
                        "username"
                      )}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col">
                      {this.renderMDBInput(
                        "Password",
                        "lock",
                        "password",
                        "loginPassword"
                      )}
                    </div>
                  </div>
                  {this.renderBtn("Login", "primary", "submit")}
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </div>
      </div>
    );
  }
}

export default LoginForm;