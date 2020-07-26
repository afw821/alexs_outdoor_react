import React from "react";
import Form from "./common/Form";
import Joi from "joi-browser";
import { sendEmail } from "../services/emailService";
import PopUpModal from "./common/PopUpModal";
import { toast } from "react-toastify";
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
      if (ex.response.stauts === 400 || ex.response.status === 404)
        toast.error("Error sending message");
      else if (ex.response.stauts === 500)
        toast.error("There was an unexpected error");
    }
  };

  render() {
    const lineBreakStyle = {
      borderBottom: "1px solid lightgray",
    };
    return (
      <>
        <PopUpModal
          show={this.state.show}
          header="Thank You"
          body="Your message has successfully been sent"
          onClose={this.handleModalClick}
        />
        <div className="row">
          <div className="col-4"></div>
          <div className="col-4" style={{ marginTop: "100px" }}>
            <div
              className="jumbotron jumbotron-fluid"
              style={{ backgroundColor: "whitesmoke" }}
            >
              <div className="container">
                <div className="row">
                  <div className="col d-flex justify-content-center">
                    <h5 className="font-bolder">Contact Us</h5>
                  </div>
                </div>
                <div className="row d-flex justify-content-center">
                  <div className="col-10" style={lineBreakStyle}></div>
                </div>
                <div className="row">
                  <div className="col">
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
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ContactForm;
