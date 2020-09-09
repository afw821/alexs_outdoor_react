import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AdminPortal from "./components/AdminPortal";
import RegisterForm from "./components/RegisterForm";
import NotFound from "./components/NotFound";
import LoginForm from "./components/LoginForm";
import NavBar from "./components/NavBar";
import auth from "./services/authService";
import Home from "./components/Home";
import Logout from "./components/Logout";
import Footer from "./components/Footer";
import UserDetails from "./components/UserDetails";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import ProtectedRoute from "./components/common/ProtectedRoute";
import UpdatePassword from "./components/UpdatePassword";
import CartDetails from "./components/CartDetails";
import ContactForm from "./components/ContactForm";
import AdminProtectedRoute from "./components/common/AdminProctedRoute";
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
import ContactPage from "./components/ContactForm2";

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
  calculateQuantity = async (currentQuantity, currentIndex, add) => {
    try {
      //clone state
      const productsInCart = [...this.state.productsInCart];
      var user = { ...this.state.user };

      if (productsInCart[currentIndex].quantity === 0 && !add) return;

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
        <ToastContainer />
        <NavBar
          handleSetActiveTab={this.handleSetActiveTab}
          count={count}
          user={user}
          activeTab={activeTab}
        />
        <div className="container-fluid h100">
          <Switch>
            <ProtectedRoute
              path="/account/:id"
              exact
              render={(props) => (
                <UserDetails {...props} user={user} clientWidth={clientWidth} />
              )}
            />
            <ProtectedRoute
              path="/updatePassword/:id"
              exact
              render={(props) => (
                <UpdatePassword
                  {...props}
                  user={user}
                  clientWidth={clientWidth}
                />
              )}
            />
            <ProtectedRoute
              path="/cart/:id"
              exact
              render={(props) => (
                <CartDetails
                  {...props}
                  handleRemoveFromCart={this.handleRemoveFromCart}
                  handleSetActiveTab={this.handleSetActiveTab}
                  calculateQuantity={this.calculateQuantity}
                  totalPrice={totalPrice}
                  productsInCart={productsInCart}
                  user={user}
                  clientWidth={clientWidth}
                />
              )}
            />
            <ProtectedRoute
              path="/product/:id"
              render={(props) => (
                <ProductDetails
                  {...props}
                  handleAddToCart={this.handleAddToCart}
                  user={user}
                  clientWidth={clientWidth}
                />
              )}
            />
            <AdminProtectedRoute
              path="/adminPortal"
              exact
              render={(props) => (
                <AdminPortal {...props} user={user} clientWidth={clientWidth} />
              )}
            />
            <Route
              path="/products"
              exact
              render={(props) => (
                <Products
                  {...props}
                  user={user}
                  handleSetActiveTab={this.handleSetActiveTab}
                  clientWidth={clientWidth}
                />
              )}
            />
            <Route
              path="/register"
              render={(props) => (
                <RegisterForm
                  {...props}
                  activeTab={activeTab}
                  handleSetActiveTab={this.handleSetActiveTab}
                  clientWidth={clientWidth}
                />
              )}
            />
            <Route
              path="/login"
              render={(props) => (
                <LoginForm
                  {...props}
                  activeTab={activeTab}
                  handleSetActiveTab={this.handleSetActiveTab}
                  clientWidth={clientWidth}
                />
              )}
            />
            <Route path="/contact" component={ContactForm} />
            <Route path="/logout" component={Logout} />
            <Route
              path="/home"
              render={(props) => (
                <Home
                  {...props}
                  activeTab={activeTab}
                  handleSetActiveTab={this.handleSetActiveTab}
                  clientWidth={clientWidth}
                />
              )}
            />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/home" />
            <Redirect to="/not-found" />
          </Switch>
          <Footer clientWidth={clientWidth} />
        </div>
      </>
    );
  }
}

export default App;
