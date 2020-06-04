import React from "react";
import Form from "./common/Form";
import Joi from "joi-browser";
import { getUserById } from "../services/userService";
import { updateUser } from "../services/userService";
import { toast } from "react-toastify";
import { regenerateToken, loginWithJwt } from "../services/authService";

class AccountEditForm extends Form {
  state = {
    data: {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "",
      Purchases: [],
    },
    states: [],
    errors: {},
  };

  schema = {
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().required().email().label("Email"),
    address: Joi.string().required().label("Address"),
    address2: Joi.label("Address 2"),
    city: Joi.string().required().label("City"),
    state: Joi.string().required().label("State"),
    zipCode: Joi.number().required().label("Zip Code"),
    Purchases: Joi.array().label("Purchases"),
    id: Joi.label("ID"),
  };
  mapPurchases(Purchases) {
    return Purchases;
  }
  mapToViewModel(user) {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      address: user.address,
      address2: user.address2,
      city: user.city,
      state: user.state,
      zipCode: user.zipCode,
      Purchases: this.mapPurchases(user.Purchases),
    };
  }

  async populateUserInfo() {
    try {
      const userId = this.props.user.id;
      const { data: user } = await getUserById(userId);
      this.setState({ data: this.mapToViewModel(user) }); //returns array maybe before re-render
      //it passes in empty string??
    } catch (ex) {
      // if (ex.response && ex.response.status === 404)
      console.log(ex);
      //this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    console.log("account edit form cdm props", this.props.user);
    await this.populateUserInfo();
  }

  doSubmit = async () => {
    console.log("update user do submit");
    try {
      const { data } = this.state;
      const result = await updateUser(
        data.id,
        data.firstName,
        data.lastName,
        data.address,
        data.address2,
        data.city,
        data.state,
        data.zipCode,
        data.email
      );
      // to regenerate token THIS IS TO FIX REFRESH ISSUE
      const userId = this.state.data.id;
      let updatedUser = JSON.parse(result.config.data);
      //some reasin id isn't on returned value
      updatedUser.id = userId;
      //add purchases to user object
      updatedUser.Purchases = this.state.data.Purchases;

      if (result.status === 200) {
        //get updated information and pass it into regenerate token (REFRESH ISSUE FIX)
        const { data: token } = await regenerateToken(updatedUser);
        console.log("token", token);
        if (token) {
          //add new jwt with new updated user info into localstorage
          loginWithJwt(token);
          //need page refresh to show updated info
          window.location = `/account/${data.id}`;
        }
        toast.success("Information updated.");
        //this is what takes us back to the account info page
        //this is what sets my account tab and shows edit btn
        this.props.handleUserUpdate();
      }
    } catch (ex) {
      console.log("Error updating the user", ex);
      if (ex.response === 400 || ex.response === 404)
        toast.error("Error updating information.");
    }
  };

  render() {
    console.log("account edit form render props", this.props.user);
    return (
      <form className="mt-4" onSubmit={this.handleSubmit}>
        {this.renderInlineFormGroup("firstName", "First Name", "text")}
        {this.renderInlineFormGroup("lastName", "Last Name", "text")}
        {this.renderInlineFormGroup("email", "Email", "text")}
        {this.renderInlineFormGroup("address", "Address", "text")}
        {this.renderInlineFormGroup("address2", "Address 2", "text")}
        {this.renderInlineFormGroup("city", "City", "text")}
        {this.renderInlineFormGroup("state", "State", "text")}
        {this.renderInlineFormGroup("zipCode", "Zip Code", "text")}
        <div className="row">
          <div className="col-3"></div>
          <div className="col-3">
            {this.renderBtn("Submit", "primary", "submit")}
          </div>
          <div className="col-3">
            <button
              onClick={this.props.handleCancelClick}
              className="btn btn-primary"
              type="button"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default AccountEditForm;
