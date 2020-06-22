import React from "react";
import Form from "./common/Form";
import Joi from "joi-browser";
import { sendEmail } from "../services/emailService";
import PopUpModal from "./common/PopUpModal";

class ContactForm extends Form {
  state = {
    data: {
      name: "",
      email: "",
      message: "",
    },
    errors: {},
    show: false,
  };

  schema = {
    name: Joi.string().required().min(1).max(25).label("Name"),
    email: Joi.string().email().min(3).max(50).required().label("Email"),
    message: Joi.string().required().min(5).max(255).label("Message"),
  };

  handleModalClick = () => {
    this.setState({ show: !this.state.show });
  };

  doSubmit = async () => {
    try {
      console.log('made it here!');
      const { data } = this.state;
      const result = await sendEmail(data.email, data.message, data.name);

      if (result) {
        const data = {
          name: "",
          email: "",
          message: "",
        };
        this.setState({ data, show: true });
      }
    } catch (ex) {
      console.log("error", ex);
      //toast here
    }
  };

  render() {
    return (
      <>
        <PopUpModal
          show={this.state.show}
          header="Thank You"
          body="Your message has successfully been sent"
          onClose={this.handleModalClick}
        />
        <div className="row" style={{ marginTop: "100px"}}>
          <div className="col-4"></div>
          <div className="col-4">
            <form
              className="pb-5 pl-5 pr-5 pt-4 login-form"
              onSubmit={this.handleSubmit}
            >
              {this.renderInput("name", "Name")}
              {this.renderInput("email", "E-mail", "email")}
              {this.renderTextArea("message", "Message", "text", 5)}
              {this.renderBtn("Submit", "blue", "submit")}
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default ContactForm;
