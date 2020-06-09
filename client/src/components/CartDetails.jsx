import React, { Component } from "react";
import { getProductByPKId } from "../services/productService";
import _arrayBufferToBase64 from "../utils/toBase64String";

class CartDetails extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const productsArray = [];
    const user = this.props.user;
    const userId = this.props.match.params.id;

    for (let i = 0; i < user.Carts.length; i++) {
      const productId = user.Carts[i].ProductId;
      let { data: product } = await getProductByPKId(productId);
      product.imgSrc = _arrayBufferToBase64(product.data.data);
      //productsArray.push(product);
      const obj = {
        product: product,
        quantity: user.Carts[i].quantity,
      };
      productsArray.push(obj);
    }

    this.setState({ products: productsArray });
  }

  componentDidUpdate() {
    //refresh issue fix. when refresh
    //tab is clicked from cardetails component page
    if (this.state.products.length === 0) this.componentDidMount();
  }

  addQuantity = (currentQuantity, currentIndex) => {
    const products = [...this.state.products];
    products[currentIndex].quantity += 1;
    this.setState({ products });
  };

  subtractQuantity = (currentQuantity, currentIndex) => {
    const products = [...this.state.products];
    if (products[currentIndex].quantity === 0) return;
    products[currentIndex].quantity -= 1;
    this.setState({ products });
  };

  handleChangeQuantity = (currentQuantity, currentIndex) => {
    console.log("current quant", currentQuantity);
    console.log("index", currentIndex);
  };

  calculatePrice = (quantity, price) => {
    return quantity * price;
  };

  render() {
    const { products } = this.state;
    return (
      <div
        className="row d-flex justify-content-center"
        style={{ marginTop: "100px" }}
      >
        <div className="col-8">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                return (
                  <tr key={index}>
                    <th>
                      <strong>{product.product.name}</strong>
                    </th>
                    <td>
                      {" "}
                      <div className="def-number-input number-input mt-2">
                        <button
                          onClick={() =>
                            this.subtractQuantity(product.quantity, index)
                          }
                          className="minus"
                        ></button>
                        <input
                          className="quantity"
                          name="quantity"
                          onChange={() =>
                            this.handleChangeQuantity(product.quantity, index)
                          }
                          value={product.quantity}
                          type="number"
                        />
                        <button
                          onClick={() =>
                            this.addQuantity(product.quantity, index)
                          }
                          className="plus"
                        ></button>
                      </div>
                    </td>
                    <td>
                      <strong>
                        {" "}
                        {"$" +
                          this.calculatePrice(
                            product.quantity,
                            product.product.price
                          )}
                      </strong>
                    </td>
                    <td>
                      {" "}
                      <img
                        style={{ maxHeight: "100px", maxWidth: "100px" }}
                        src={`data:image/png;base64,${product.product.imgSrc}`}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default CartDetails;
