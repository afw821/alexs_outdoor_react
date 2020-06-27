import React, { Component } from "react";
import Form from "../components/common/Form";
import Joi from "joi-browser";
import { addCategory } from "../services/categoryService";
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
    return (
      <>
        <div className="row">
          <div className="col-2"></div>
          <div className="col-6" style={{ marginTop: "100px" }}>
            <div class="jumbotron jumbotron-fluid" style={{ height: "350px" }}>
              <div class="container">
                <div className="row">
                  <div className="col d-flex justify-content-center">
                    <h5>Add Category</h5>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <form className="mt-4" onSubmit={this.handleSubmit}>
                      {this.renderInput("category", "Category")}
                      <button className="btn btn-primary">Submit</button>
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

export default CategoryManager;
