import React, { Component } from "react";
import Form from "./common/Form";
import { addProduct } from "../services/productService";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { getCategories } from "../services/categoryService";
import _arrayBufferToBase64 from './../utils/toBase64String';

class ProductForm extends Form {
  state = {
    data: {
      imageSrc: "",
      file: null,
      name: "",
      stock: "",
      description: "",
      price: "",
      selectedCategoryId: null,
    },
    categories: [],
    errors: {},
  };

  schema = {
    imageSrc: Joi.string().label("Image Source"),
    file: Joi.label("File"),
    name: Joi.string().required().label("Product Name"),
    stock: Joi.number().required().label("Stock"),
    description: Joi.string().required().label("Description"),
    price: Joi.number().required().label("Price"),
    selectedCategoryId: Joi.number().required().label("Category"),
  };

  async componentDidMount() {
    try {
      const { data: categories } = await getCategories();
      this.setState({ categories });
    } catch (ex) {
      console.log("There was an exception", ex);
    }
  }

  doSubmit = async () => {
    try {
      const {
        file,
        name,
        stock,
        description,
        price,
        selectedCategoryId,
        imageSrc
      } = this.state.data;

      // const imgSrc = _arrayBufferToBase64(file);
      // console.log('img src', imgSrc);
      const formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("name", name);
      formData.append("inStock", parseInt(stock));
      formData.append("description", description);
      formData.append("price", parseFloat(price));
      //formData.append("imageSrc", imageSrc);
      formData.append("CategoryId", parseInt(selectedCategoryId));
      const { data } = await addProduct(formData);

      if (data) {
        this.setState({
          data: {
            imageSrc: "",
            file: null,
            name: "",
            stock: "",
            description: "",
            price: "",
          },
        });
        //come back later and figure how to change this with state
        document.getElementById("stock").selectedIndex = 0;
        document.getElementById("selectedCategoryId").selectedIndex = 0;

        toast.success("Product Successfully Added.");
      }
    } catch (ex) {
      console.log("Do submit error product", ex);
      if (ex.response)
        toast.error("There was an error. Please clear the form and try again");
    }
  };

  render() {
    const { imageSrc } = this.state.data;
    const { categories } = this.state;
    const options = [
      { id: 1, name: 1 },
      { id: 2, name: 2 },
      { id: 3, name: 3 },
      { id: 4, name: 4 },
      { id: 5, name: 5 },
      { id: 6, name: 6 },
      { id: 7, name: 7 },
      { id: 8, name: 8 },
      { id: 9, name: 9 },
      { id: 10, name: 10 },
      { id: 11, name: 11 },
      { id: 12, name: 12 },
    ];
    return (
      <>
        <div className="row">
          <div className="col-4"></div>
          <div className="col-4">
            <div className="jumbotron" style={{ marginTop: "60px" }}>
              <div className="row">
                <div className="col-4"></div>
                <div className="col-6">
                  <h5>Add Product</h5>
                </div>
              </div>

              <form
                className="mt-4"
                onSubmit={this.handleSubmit}
                encType="multipart/form-data"
              >
                {this.renderFileInput(
                  "imageSrc",
                  "Upload Image",
                  "file",
                  imageSrc,
                  "image upload"
                )}

                {this.renderInput("name", "Name")}
                {this.renderDropDownList(
                  "stock",
                  "No. In Stock",
                  "text",
                  options
                )}
                {this.renderTextArea(
                  "description",
                  "Product Description",
                  "text",
                  2
                )}

                {this.renderInput("price", "Price")}
                {this.renderDropDownList(
                  "selectedCategoryId",
                  "Category",
                  "text",
                  categories
                )}
                <button className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ProductForm;
