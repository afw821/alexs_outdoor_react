import React, { Component } from "react";
import Form from "./common/Form";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { updatePassword } from "../services/authService";

class UpdatePassword extends Form {
  state = {
    data: {
      oldPassword: "",
      firstPassword: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    oldPassword: Joi.string().required().min(5).max(50).label("Old Password"),
    firstPassword: Joi.string().required().min(5).max(50).label("New Password"),
    password: Joi.string().required().min(5).max(50).label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const { user } = this.props;
      const result = await updatePassword(
        user.email,
        data.oldPassword,
        data.password
      );
      if (result) {
        toast.success("Password Successfully Updated");
        this.setState({
          data: {
            oldPassword: "",
            firstPassword: "",
            password: "",
          },
        });
      }
    } catch (ex) {
      if (ex.response.stauts === 400 || ex.response.status === 404)
        toast.error(ex.response.data);
      else if (ex.response.stauts === 500)
        toast.error("There was an unexpected error");
    }
  };

  render() {
    return (
      <div className="row">
        <div
          className="col d-flex justify-content-center"
          style={{ marginTop: "100px" }}
        >
          <div className="jumbotron jumbotron-fluid form-width">
            <div className="container">
              <div className="row">
                <div className="col d-flex justify-content-center">
                  <h5 className="font-bolder">Update Password</h5>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <form className="mt-4" onSubmit={this.handleSubmit}>
                    {this.renderInput(
                      "oldPassword",
                      "Old Password",
                      "password"
                    )}
                    {this.renderInput(
                      "firstPassword",
                      "New Password",
                      "password"
                    )}
                    {this.renderInput(
                      "password",
                      "Confirm New Password",
                      "password"
                    )}
                  </form>
                </div>
              </div>
              <div className="row">
                <div className="col d-flex justify-content-center">
                  <button className="btn btn-primary">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdatePassword;
