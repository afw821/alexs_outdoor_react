import React from "react";
import Form from "./common/Form";
import Joi from "joi-browser";
import { getUserById } from "../services/userService";

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
    address2: Joi.string().required().label("Address 2"),
    city: Joi.string().required().label("City"),
    state: Joi.string().required().label("State"),
    zipCode: Joi.number().required().label("Zip Code"),
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
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    console.log("account edit form cdm props", this.props.user);
    await this.populateUserInfo();
  }

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
            <button onClick={this.props.handleCancelClick} className="btn btn-primary" type="button">Cancel</button>
          </div>
        </div>
      </form>
    );
  }
}

export default AccountEditForm;
