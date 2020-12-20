import React from "react";
import Form from "../Shared/Form";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { updateForgetPw } from "../../services/passwordService";
import { isPwResetUrlStillActive } from "./../../services/authService";
class UpdateForgottenPWForm extends Form {
  state = {
    data: {
      firstPassword: "",
      password: "",
    },
    errors: {},
    submitted: false,
  };

  schema = {
    firstPassword: Joi.string().required().label("First Password"),
    password: Joi.string().required().label("Password"),
  };

  async componentDidMount() {
    const { token, userId } = this.props.match.params;
    const isTokenValid = await isPwResetUrlStillActive(token, userId);
    if (!isTokenValid) {
      this.props.history.push("/expiredLink");
    }
  }

  doSubmit = async () => {
    const { token, userId } = this.props.match.params;

    try {
      this.setState({ showLoader: true });
      const { data, errors } = this.state;

      const { data: result } = await updateForgetPw(
        userId,
        token,
        data.password
      );
      if (result.complete) {
        toast.success("Password Successfully Updated");
        this.setState({
          data: {
            firstPassword: "",
            password: "",
          },
          submitted: true,
        });
        //redirect to login
        setTimeout(() => {
          this.props.history.push("/login");
        }, 2000);
      }
    } catch (ex) {
      if (ex.response.status === 400 || ex.response.status === 404)
        toast.error(ex.response.data);
      else if (ex.response.status === 500)
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
                  <h5 className="font-bolder">Reset Password</h5>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <form className="mt-4" onSubmit={this.handleSubmit}>
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
                    <div className="row">
                      <div className="col d-flex justify-content-center">
                        {this.renderBtn("Submit", "blue", "submit")}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateForgottenPWForm;
