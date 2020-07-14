import React from "react";
import Form from "./common/Form";
import {
  addProduct,
  getProductByPKId,
  updateProduct,
} from "../services/productService";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { getCategories } from "../services/categoryService";
import _arrayBufferToBase64 from "./../utils/toBase64String";

class ProductForm extends Form {
  state = {
    data: {
      imageSrc: "",
      file: null,
      name: "",
      stock: "",
      description: "",
      price: "",
      selectedCategoryId: "select", //this will also be the tab from ddl that's selected
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

  async populateCategories() {
    try {
      const { data: categories } = await getCategories();
      this.setState({ categories });
    } catch (ex) {
      if (ex.response.stauts === 400 || ex.response.status === 404)
        toast.error("Error loading categories");
      else if (ex.response.stauts === 500)
        toast.error("There was an unexpected error");
    }
  }

  mapToViewModel(product) {
    return {
      name: product.name,
      stock: product.inStock,
      description: product.description,
      price: product.price,
      selectedCategoryId: product.CategoryId,
    };
  }

  async populateProduct(id) {
    try {
      const { data: product } = await getProductByPKId(id);
      this.setState({ data: this.mapToViewModel(product) });
    } catch (ex) {
      if (ex.response.status === 400 || ex.response.status === 404)
        toast.error("Error getting product info");
      else if (ex.response.stauts === 500)
        toast.error("There was an unexpected error");
    }
  }

  async componentDidMount() {
    const productId = this.props.productId;
    this.populateCategories();
    if (productId) {
      this.populateProduct(productId);
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
        imageSrc,
      } = this.state.data;

      const productId = this.props.productId;
      const formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("name", name);
      formData.append("inStock", parseInt(stock));
      formData.append("description", description);
      formData.append("price", parseFloat(price));
      formData.append("CategoryId", parseInt(selectedCategoryId));
      if (productId) var { data } = await updateProduct(formData, productId);
      else var { data } = await addProduct(formData);

      if (data) {
        this.setState({
          data: {
            imageSrc: "",
            file: null,
            name: "",
            stock: "",
            description: "",
            price: "",
            selectedCategoryId: "select",
          },
        });

        toast.success("Product Successfully Added.");
      }
    } catch (ex) {
      if (ex.response)
        toast.error("There was an error. Please clear the form and try again");
    }
  };

  render() {
    const { imageSrc, selectedCategoryId } = this.state.data;
    const { categories } = this.state;
    const { productId } = this.props;
    return (
      <>
        <div className="jumbotron" style={{ marginTop: "60px" }}>
          {!productId && (
            <div className="row">
              <div className="col-4"></div>
              <div className="col-6">
                <h5>Add Product</h5>
              </div>
            </div>
          )}

          <form
            className="mt-4"
            onSubmit={this.handleSubmit}
            encType="multipart/form-data"
          >
            <div className="row">
              <div className="col">
                <div className="row">
                  <div className="col">
                    {this.renderFileInput(
                      "imageSrc",
                      "Upload Image",
                      "file",
                      imageSrc,
                      "image upload"
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    {this.renderInput("name", "Name")}
                  </div>
                  <div className="col-6">
                    {this.renderInput("stock", "No. In Stock", "text")}
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    {this.renderTextArea(
                      "description",
                      "Product Description",
                      "text",
                      2
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-6">
                    {this.renderInput("price", "Price")}
                  </div>
                  <div className="col-6">
                    {this.renderDropDownList(
                      "selectedCategoryId",
                      "Category",
                      "text",
                      categories,
                      selectedCategoryId
                    )}
                  </div>
                </div>

                <button className="btn btn-primary">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default ProductForm;
