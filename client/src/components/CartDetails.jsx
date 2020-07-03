import React, { Component } from "react";
import { getProductByPKId } from "../services/productService";
import { deleteCartByPkId } from "../services/cartService";
import _arrayBufferToBase64 from "../utils/toBase64String";
import { updateCart } from "../services/cartService";
import { getUserById } from "../services/userService";
import { regenerateToken, loginWithJwt } from "../services/authService";
import { toast } from "react-toastify";
import TableHead from "./common/TableHead";
import TableBody from "./common/TableBody";
import TotalRow from "./common/TotalRow";
import CheckoutModal from "./common/CheckoutModal";

class CartDetails extends Component {
  state = {
    products: [],
    removeBtn: {
      row: null,
      show: false,
    },
    totalPrice: 0,
    showModal: false,
  };

  calculateTotalPrice = (prices) => {
    const _prices = [];
    prices.forEach((val, i) => {
      const calculated = val.price * val.quantity;
      _prices.push(calculated);
    });

    let totalPrice = 0;

    for (let i = 0; i < _prices.length; i++) {
      totalPrice += _prices[i];
    }

    this.setState({ totalPrice });
  };

  getProductsOnPageLoad = async (user) => {
    //gets products by product id from
    //user prop when page loads or updates
    const productsArray = [];
    const priceArray = [];

    for (let i = 0; i < user.Carts.length; i++) {
      const productId = user.Carts[i].ProductId;
      let { data: product } = await getProductByPKId(productId);
      product.imgSrc = _arrayBufferToBase64(product.data.data);

      const obj = {
        product: product,
        cartId: user.Carts[i].id,
        quantity: user.Carts[i].quantity,
      };
      const calculatePriceObject = {
        price: product.price,
        quantity: user.Carts[i].quantity,
      };
      productsArray.push(obj);
      priceArray.push(calculatePriceObject);
    }
    return {
      priceArray: priceArray,
      productsArray: productsArray,
    };
  };
  async componentDidMount() {
    const user = this.props.user;
    const userId = this.props.match.params.id;
    const { priceArray, productsArray } = await this.getProductsOnPageLoad(
      user
    );
    this.calculateTotalPrice(priceArray);
    this.setState({ products: productsArray });
  }
  async componentDidUpdate(prevProps) {
    const user = this.props.user;
    if (this.props.user.id !== prevProps.user.id) {
      const { priceArray, productsArray } = await this.getProductsOnPageLoad(
        user
      );
      this.calculateTotalPrice(priceArray);
      this.setState({ products: productsArray });
    }
  }

  calculateQuantity = async (currentQuantity, currentIndex, add) => {
    try {
      console.log("quantity change");
      const products = [...this.state.products];

      if (products[currentIndex].quantity === 0 && !add) return;

      let totalPrice = this.state.totalPrice;
      const pricePerUnit = products[currentIndex].product.price;
      const userId = this.props.user.id;
      const cartId = this.props.user.Carts[currentIndex].id;
      const productName = products[currentIndex].product.name;
      const productId = products[currentIndex].product.id;
      const quantityInCart = add
        ? products[currentIndex].quantity + 1
        : products[currentIndex].quantity - 1;

      add
        ? (products[currentIndex].quantity += 1)
        : (products[currentIndex].quantity -= 1);

      add ? (totalPrice += pricePerUnit) : (totalPrice -= pricePerUnit);

      const { data: cart } = await updateCart(
        cartId,
        productName,
        quantityInCart,
        userId,
        productId
      );
      this.setState({ products, totalPrice });

      //refresh issue (same as in AccountEditForm.jsx line 115)
      //we have to do this to regenerate a new JWT so the user can be read off of it
      const { data: updatedUser } = await getUserById(userId);
      const { data: token } = await regenerateToken(updatedUser);

      if (token) {
        loginWithJwt(token);
        //window.location = `/cart/${userId}`;
      }
    } catch (ex) {
      toast.error("Error Updating cart");
    }
  };

  calculatePrice = (quantity, price) => {
    const total = quantity * price;

    return parseFloat(total.toFixed(2));
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
    try {
      //dirty fix for cart length
      //this function should really be lifted to app.js
      let cartLength = parseInt(
        document.getElementById("cart-number").innerText
      );
      cartLength -= 1;
      document.getElementById("cart-number").innerText = cartLength;
      await deleteCartByPkId(product.cartId);
      //clone array
      var originalProducts = [...this.state.products];
      var originalTotalPrice = this.state.totalPrice;
      let totalPrice = this.state.totalPrice;
      const quantity = product.quantity;
      const priceToSubtract = quantity * product.product.price;
      const products = originalProducts.filter(
        (item) => item.product.id !== product.product.id
      );
      totalPrice -= priceToSubtract;
      this.setState({ products, totalPrice });
      //refresh issue (same as in AccountEditForm.jsx line 115)
      //we have to do this to regenerate a new JWT so the user can be read off of it
      const { data: updatedUser } = await getUserById(this.props.user.id);
      const { data: token } = await regenerateToken(updatedUser);

      if (token) {
        loginWithJwt(token);
        //window.location = `/cart/${userId}`;
      }
    } catch (ex) {
      if (ex.response.status === 404) {
        toast.error("Unable to delete this cart item");
        this.setState({
          products: originalProducts,
          totalPrice: originalTotalPrice,
        });
      }
    }
  };
  handleChangeQuantity() {}

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    const { products, showModal } = this.state;
    console.log("products render cart page", products.length);
    if (products.length === 0)
      return <h1 style={{ marginTop: "100px" }}>Cart is Empty</h1>;
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
        <CheckoutModal isOpen={showModal} closeModal={this.toggleModal} />
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
                handleChangeQuantity={this.handleChangeQuantity}
                calculateQuantity={this.calculateQuantity}
                calculatePrice={this.calculatePrice}
                removeBtn={this.state.removeBtn}
              />
            </table>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-8">
            <TotalRow
              totalPrice={this.state.totalPrice}
              toggleModal={this.toggleModal}
            />
          </div>
        </div>
      </>
    );
  }
}

export default CartDetails;
