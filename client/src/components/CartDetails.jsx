import React, { Component } from "react";
import { getProductByPKId } from "../services/productService";
import { deleteCartByPkId } from "../services/cartService";
import _arrayBufferToBase64 from "../utils/toBase64String";
import { updateCart } from "../services/cartService";
import { toast } from "react-toastify";
import TableHead from "./common/TableHead";
import TableBody from "./common/TableBody";
import TotalRow from "./common/TotalRow";

class CartDetails extends Component {
  state = {
    products: [],
    removeBtn: {
      row: null,
      show: false,
    },
    totalPrice: 0,
  };

  calculateTotalPrice = (array) => {
    console.log("calculate total price Array", array);
  };

  async componentDidMount() {
    const productsArray = [];
    const priceArray = [];
    const user = this.props.user;
    const userId = this.props.match.params.id;

    for (let i = 0; i < user.Carts.length; i++) {
      const productId = user.Carts[i].ProductId;
      let { data: product } = await getProductByPKId(productId);
      product.imgSrc = _arrayBufferToBase64(product.data.data);
      //productsArray.push(product);
      const obj = {
        product: product,
        cartId: user.Carts[i].id,
        quantity: user.Carts[i].quantity,
      };
      productsArray.push(obj);
      console.log(product.price);
      priceArray.push(product.price);
    }

    this.calculateTotalPrice(priceArray);

    this.setState({ products: productsArray });
  }

  componentDidUpdate() {
    //refresh issue fix. when refresh
    //tab is clicked from cardetails component page
    if (this.state.products.length === 0) this.componentDidMount();
  }

  addQuantity = async (currentQuantity, currentIndex) => {
    try {
      const products = [...this.state.products];
      const userId = this.props.user.id;
      const cartId = this.props.user.Carts[currentIndex].id;
      const productName = products[currentIndex].product.name;
      const productId = products[currentIndex].product.id;
      const quantityInCart = products[currentIndex].quantity + 1;
      products[currentIndex].quantity += 1;

      const cart = await updateCart(
        cartId,
        productName,
        quantityInCart,
        userId,
        productId
      );
      this.setState({ products });
    } catch (ex) {
      toast.error("Error Updating cart");
    }
  };

  subtractQuantity = async (currentQuantity, currentIndex) => {
    try {
      const products = [...this.state.products];

      if (products[currentIndex].quantity === 0) return;

      const userId = this.props.user.id;
      const cartId = this.props.user.Carts[currentIndex].id;
      const productName = products[currentIndex].product.name;
      const productId = products[currentIndex].product.id;
      const quantityInCart = products[currentIndex].quantity - 1;

      products[currentIndex].quantity -= 1;

      const { data: cart } = await updateCart(
        cartId,
        productName,
        quantityInCart,
        userId,
        productId
      );
      this.setState({ products });
    } catch (ex) {
      toast.error("Error Updating cart");
    }
  };

  calculatePrice = (quantity, price) => {
    return quantity * price;
  };

  handleHover = (e, index) => {
    e.currentTarget.style.backgroundColor = "whitesmoke";
    this.setState({ removeBtn: { row: index, show: true } });
  };

  handleLeave = (e, index) => {
    e.currentTarget.style.backgroundColor = "#fdf9f3";
    this.setState({ removeBtn: { row: null, show: false } });
  };
  handleRemoveFromCart = async (e, product) => {
    //clone array
    const originalProducts = [...this.state.products];
    const products = originalProducts.filter(
      (item) => item.product.id !== product.product.id
    );
    this.setState({ products });
    try {
      await deleteCartByPkId(product.cartId);
    } catch (ex) {
      if (ex.response.status === 404) {
        toast.error("Unable to delete this cart item");
        this.setState({ products: originalProducts });
      }
    }
  };
  handleChangeQuantity() {
    console.log("changed");
  }

  render() {
    const { products } = this.state;
    const options = [
      {
        id: 1,
        header: "Name",
      },
      {
        id: 2,
        header: "Quantity",
      },
      {
        id: 3,
        header: "Price",
      },
      {
        id: 4,
        header: "",
      },
    ];
    return (
      <>
        <div
          className="row d-flex justify-content-center"
          style={{ marginTop: "100px" }}
        >
          <div className="col-8">
            <table className="table">
              <TableHead options={options} />
              <TableBody
                items={products}
                handleHover={this.handleHover}
                handleLeave={this.handleLeave}
                handleRemoveFromCart={this.handleRemoveFromCart}
                subtractQuantity={this.subtractQuantity}
                handleChangeQuantity={this.handleChangeQuantity}
                addQuantity={this.addQuantity}
                calculatePrice={this.calculatePrice}
                removeBtn={this.state.removeBtn}
              />
            </table>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-8">
            <TotalRow totalPrice={this.state.totalPrice} />
          </div>
        </div>
      </>
    );
  }
}

export default CartDetails;
