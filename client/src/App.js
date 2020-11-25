import React, { Component } from "react";
import NavBar from "./components/Layout/NavBar";
import auth from "./services/authService";
import Footer from "./components/Layout/Footer";
import _arrayBufferToBase64 from "./utils/toBase64String";
import { ToastContainer, toast } from "react-toastify";
import { addItemToCart } from "./services/cartService";
import { regenerateToken, loginWithJwt } from "./services/authService";
import { getProductByPKId } from "./services/productService";
import { getUserById } from "./services/userService";
import { deleteCartByPkId } from "./services/cartService";
import { updateCart } from "./services/cartService";
import { activeTabRefresh } from "./utils/activeTabRefresh";
import "react-toastify/dist/ReactToastify.css";
import ContactPage from "./components/Contact/ContactForm2";
import ClientRoutes from "./components/Layout/ClientRoutes";

class App extends Component {
  state = {
    user: {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "",
      isAdmin: "",
      Purchases: [{}],
      Carts: [{}],
    },
    totalPrice: 0,
    productsInCart: [],
    activeTab: "Home",
    clientWidth: document.documentElement.clientWidth,
  };

  async componentDidMount() {
    const user = auth.getCurrentUser();

    if (user) {
      const {
        priceArray,
        productsArray: productsInCart,
      } = await this.getProductsOnPageLoad(user);
      const totalPrice = this.calculateTotalPrice(priceArray);
      this.setState({ user, totalPrice, productsInCart });
    }
    this.setState({ user });
  }

  componentDidUpdate(prevProps, prevState) {
    const activeTab = this.state.activeTab;
    let location = window.location.pathname;
    const lastIndex = location.lastIndexOf("/");
    const handler = this.handleSetActiveTab;

    activeTabRefresh(activeTab, location, lastIndex, handler);
  }

  handleSetActiveTab = (tab) => {
    this.setState({ activeTab: tab });
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
    return totalPrice;
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

  handleAddToCart = async (state) => {
    try {
      const { data: product, quantity } = state;
      const userId = this.state.user.id;
      const productId = product.id;
      //add item to cart
      const { data } = await addItemToCart(
        `user-cart-${userId}`,
        quantity,
        userId,
        productId
      );

      const user = { ...this.state.user };
      user.Carts.push(data);
      const {
        priceArray,
        productsArray: productsInCart,
      } = await this.getProductsOnPageLoad(user);
      const totalPrice = this.calculateTotalPrice(priceArray);
      this.setState({ user, totalPrice, productsInCart });

      //refresh issue (same as in AccountEditForm.jsx line 115)
      //we have to do this to regenerate a new JWT so the user can be read off of it
      const { data: token } = await regenerateToken(user);

      if (token) {
        loginWithJwt(token);
        //window.location = `/cart/${userId}`;
      }
    } catch (ex) {
      if (ex.response.status === 400) toast.error(ex.response.data);
    }
  };

  handleRemoveFromCart = async (e, product) => {
    try {
      await deleteCartByPkId(product.cartId);
      //clone array
      var originalProducts = [...this.state.productsInCart];
      var user = { ...this.state.user };
      var totalPrice = this.state.totalPrice;
      const quantity = product.quantity;
      const priceToSubtract = quantity * product.product.price;
      const Carts = user.Carts.filter(
        (item) => item.ProductId !== product.product.id
      );
      user.Carts = Carts;
      const productsInCart = originalProducts.filter(
        (item) => item.product.id !== product.product.id
      );
      totalPrice -= priceToSubtract;
      this.setState({ productsInCart, totalPrice, user });
      //refresh issue (same as in AccountEditForm.jsx line 115)
      //we have to do this to regenerate a new JWT so the user can be read off of it
      const { data: updatedUser } = await getUserById(this.state.user.id);
      const { data: token } = await regenerateToken(updatedUser);

      if (token) {
        loginWithJwt(token);
      }
    } catch (ex) {
      if (ex.response.status === 404) {
        toast.error("Unable to delete this cart item");
        this.setState({
          productsInCart: originalProducts,
          user: user,
          totalPrice: totalPrice,
        });
      }
    }
  };
  calculateQuantity = async (currentQuantity, currentIndex, add, product) => {
    try {
      const inStock = product.product.inStock;
      //clone state
      const productsInCart = [...this.state.productsInCart];
      var user = { ...this.state.user };

      if (currentQuantity === 1 && !add)
        return this.handleRemoveFromCart(null, product); //remove from cart if user clicks to 0

      if (currentQuantity >= inStock && add) {
        return toast.info(
          `There are only ${inStock} of ${product.product.name} left in stock!`
        );
      }

      let totalPrice = this.state.totalPrice;
      const pricePerUnit = productsInCart[currentIndex].product.price;
      const userId = this.state.user.id;
      const cartId = user.Carts[currentIndex].id;
      const productName = productsInCart[currentIndex].product.name;
      const productId = productsInCart[currentIndex].product.id;
      const quantityInCart = add
        ? productsInCart[currentIndex].quantity + 1
        : productsInCart[currentIndex].quantity - 1;

      add
        ? (productsInCart[currentIndex].quantity += 1)
        : (productsInCart[currentIndex].quantity -= 1);

      add ? (totalPrice += pricePerUnit) : (totalPrice -= pricePerUnit);

      add
        ? (user.Carts[currentIndex].quantity += 1)
        : (user.Carts[currentIndex].quantity -= 1);

      const { data: cart } = await updateCart(
        cartId,
        productName,
        quantityInCart,
        userId,
        productId
      );
      this.setState({ productsInCart, totalPrice, user });

      //refresh issue (same as in AccountEditForm.jsx line 115)
      //we have to do this to regenerate a new JWT so the user can be read off of it
      const { data: updatedUser } = await getUserById(userId);
      const { data: token } = await regenerateToken(updatedUser);

      if (token) {
        loginWithJwt(token);
      }
    } catch (ex) {
      toast.error("Error Updating cart");
    }
  };
  displayWindowSize = () => {
    let clientWidth = document.documentElement.clientWidth;
    this.setState({ clientWidth });
  };
  render() {
    const {
      user,
      count,
      totalPrice,
      productsInCart,
      activeTab,
      clientWidth,
    } = this.state;
    window.addEventListener("resize", this.displayWindowSize);

    return (
      <>
        <ToastContainer autoClose={3000} hideProgressBar />
        <NavBar
          handleSetActiveTab={this.handleSetActiveTab}
          count={count}
          user={user}
          activeTab={activeTab}
        />
        <div className="container-fluid h100">
          <ClientRoutes
            user={user}
            clientWidth={clientWidth}
            handleRemoveFromCart={this.handleRemoveFromCart}
            handleSetActiveTab={this.handleSetActiveTab}
            calculateQuantity={this.calculateQuantity}
            totalPrice={totalPrice}
            productsInCart={productsInCart}
            handleAddToCart={this.handleAddToCart}
            activeTab={activeTab}
          />
          <Footer clientWidth={clientWidth} />
        </div>
      </>
    );
  }
}

export default App;
