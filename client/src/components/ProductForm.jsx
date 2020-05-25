import React, { Component } from "react";
import Form from "./common/Form";
import { addProduct } from "../services/productService";

class ProductForm extends Form {
  state = {
    data: {
      imageSrc: "",
      file: null,
      name: "",
      stock: "",
    },
    errors: {},
  };

  doSubmit = async () => {
    try {
      const { file } = this.state.data;
      const formData = new FormData();
      formData.append("file", file, file.name);
      await addProduct(formData);
    } catch (ex) {
      console.log('Do submit error product', ex);
    }
  }

  render() {
    const { imageSrc } = this.state.data;
    return (
      <>
        <div className="row">
          <div className="col-sm-8 mt-3">
            <form
              className="mt-4"
              onSubmit={this.handleSubmit}
              encType="multipart/form-data"
            >
              {this.renderFileInput(
                "file",
                "Upload Image",
                "file",
                imageSrc,
                "image upload"
              )}

              {this.renderInput("name", "Name")}
              {this.renderInput("stock", "No. in Stock")}
              <button className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default ProductForm;
