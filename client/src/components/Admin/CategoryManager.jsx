import React, { Component } from "react";
import Form from "../Shared/Form";
import Joi from "joi-browser";
import { addCategory } from "../../services/categoryService";
import { toast } from "react-toastify";

class CategoryManager extends Form {
  state = {
    data: {
      category: "",
    },
    errors: {},
  };

  schema = {
    category: Joi.string().min(4).max(30).required().label("Category Name"),
  };

  doSubmit = async () => {
    try {
      const { category } = this.state.data;
      const { data } = await addCategory(category);

      if (data) {
        this.setState({
          data: {
            category: "",
          },
        });
        toast.success("Category Successfully Added.");
      }
    } catch (ex) {
      if (ex.response) toast.error("There was an error. Please try again");
    }
  };
  render() {
    const lineBreakStyle = {
      borderBottom: "1px solid lightgray",
    };
    return (
      <>
        <div
          className="jumbotron form-width-multiple-items"
          style={{
            height: "350px",
            backgroundColor: "whitesmoke",
            marginTop: "100px",
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col d-flex justify-content-center">
                <h5 className="font-bolder">Add Category</h5>
              </div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-10" style={lineBreakStyle}></div>
            </div>
            <div className="row">
              <div className="col">
                <form className="mt-4" onSubmit={this.handleSubmit}>
                  {this.renderInput("category", "Category")}
                  <div className="row ">
                    <div className="col d-flex justify-content-center">
                      <button className="btn btn-primary">Submit</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CategoryManager;
