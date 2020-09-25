import React from "react";
import _arrayBufferToBase64 from "../../utils/toBase64String";
import Form from "./Form";
import {
  addProduct,
  getProductByPKId,
  updateProduct,
} from "../../services/productService";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { getCategories } from "../../services/categoryService";

class ProductForm extends Form {
  state = {
    data: {
      imageSrc: "",
      file: null,
      name: "",
      stock: "",
      description: "",
      price: "",
      selectedCategoryId: "Sporting", //this will also be the tab from ddl that's selected
    },
    categories: [],
    errors: {},
  };

  schema = {
    imageSrc: Joi.string().label("Image"),
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
      imageSrc: "",
      file: null,
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
      const {
        productId,
        closeModal,
        handleUpdateView,
        indexOfUpdatedProduct,
      } = this.props;
      const formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("name", name);
      formData.append("inStock", parseInt(stock));
      formData.append("description", description);
      formData.append("price", parseFloat(price));
      formData.append("CategoryId", parseInt(selectedCategoryId));
      if (productId)
        var { data: updatedProduct } = await updateProduct(formData, productId);
      else var { data } = await addProduct(formData);

      if (data || updatedProduct) {
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
        toast.success(
          `Product Successfully ${productId ? "Updated" : "Added"}.`
        );
        if (productId) {
          updatedProduct.id = productId;
          closeModal(null, null);
          handleUpdateView(updatedProduct, indexOfUpdatedProduct); //this will be re-calculated due to the pagination and filtering in products.jsx
        }
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
        <div
          className="jumbotron form-width-multiple-items"
          style={{ marginTop: "80px" }}
        >
          {!productId && (
            <>
              <div className="row">
                <div className="col d-flex justify-content-center">
                  <h5 className="font-bolder">Add Product</h5>
                </div>
              </div>
              <div className="row d-flex justify-content-center">
                <div className="col-10"></div>
              </div>
            </>
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
                <div className="row">
                  <div className="col d-flex justify-content-center">
                    <button className="btn btn-primary">Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default ProductForm;
