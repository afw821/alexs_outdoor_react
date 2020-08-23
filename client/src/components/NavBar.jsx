import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBNavLink,
  MDBIcon,
} from "mdbreact";

class NavBar2 extends Component {
  state = {
    collapse: false,
    isWideEnough: false,
  };

  handleClick = (e) => {
    this.setState({ collapse: !this.state.collapse });
  };
  render() {
    const { user, activeTab, handleSetActiveTab } = this.props;
    const { collapse, isWideEnough } = this.state;

    return (
      <header>
        <MDBNavbar
          style={{ backgroundColor: "#343a40", opacity: "1.5" }}
          dark
          expand="md"
          fixed="top"
          scrolling
        >
          <MDBNavbarBrand href="/">
            <strong>Al's Outdoor Store</strong>
          </MDBNavbarBrand>
          {!isWideEnough && <MDBNavbarToggler onClick={this.handleClick} />}
          <MDBCollapse isOpen={collapse} navbar>
            <MDBNavbarNav left>
              <MDBNavItem onClick={(e) => handleSetActiveTab("Home")}>
                <MDBNavLink
                  style={
                    activeTab === "Home" ? { color: "#f6b519" } : { "": "" }
                  }
                  name="Home"
                  to="/home"
                >
                  <strong>Home</strong>
                </MDBNavLink>
              </MDBNavItem>

              {!this.props.user && (
                <MDBNavItem onClick={(e) => handleSetActiveTab("Login")}>
                  <MDBNavLink
                    style={
                      activeTab === "Login" ? { color: "#f6b519" } : { "": "" }
                    }
                    name="Login"
                    to="/login"
                  >
                    <strong>Login</strong>
                  </MDBNavLink>
                </MDBNavItem>
              )}
              {!this.props.user && (
                <MDBNavItem onClick={(e) => handleSetActiveTab("Sign Up")}>
                  <MDBNavLink
                    style={
                      activeTab === "Sign Up"
                        ? { color: "#f6b519" }
                        : { "": "" }
                    }
                    name="Sign Up"
                    to="/register"
                  >
                    <strong>Sign Up</strong>
                  </MDBNavLink>
                </MDBNavItem>
              )}

              <MDBNavItem onClick={(e) => handleSetActiveTab("Products")}>
                <MDBNavLink
                  style={
                    activeTab === "Products" ? { color: "#f6b519" } : { "": "" }
                  }
                  name="Products"
                  to="/products"
                >
                  <strong>Products</strong>
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem onClick={(e) => handleSetActiveTab("Contact")}>
                <MDBNavLink
                  style={
                    activeTab === "Contact" ? { color: "#f6b519" } : { "": "" }
                  }
                  name="Contact"
                  to="/contact"
                >
                  <strong>Contact</strong>
                </MDBNavLink>
              </MDBNavItem>
            </MDBNavbarNav>
            <MDBNavbarNav right>
              {this.props.user && this.props.user.isAdmin && (
                <MDBNavItem onClick={(e) => handleSetActiveTab("Admin Portal")}>
                  <MDBNavLink
                    style={
                      activeTab === "Admin Portal"
                        ? { color: "#f6b519" }
                        : { "": "" }
                    }
                    name="Admin Portal"
                    to="/adminPortal"
                  >
                    <strong>Admin Portal</strong>
                  </MDBNavLink>
                </MDBNavItem>
              )}
              {this.props.user && (
                <MDBNavItem
                  className="d-flex align-items-center"
                  style={{ marginRight: "10px" }}
                  onClick={(e) => handleSetActiveTab("Cart")}
                >
                  <MDBNavLink name="Cart" to={`/cart/${user.id}`}>
                    <MDBIcon
                      style={
                        activeTab === "Cart" ? { color: "#f6b519" } : { "": "" }
                      }
                      icon="shopping-cart"
                    />
                  </MDBNavLink>
                </MDBNavItem>
              )}
              {this.props.user && (
                <MDBNavItem
                  className="d-flex align-items-center"
                  style={{ marginRight: "10px" }}
                  onClick={(e) => handleSetActiveTab("Cart")}
                >
                  <MDBNavLink
                    id="cart-number"
                    name="Cart_Number"
                    to={`/cart/${user.id}`}
                    style={
                      activeTab === "Cart" ? { color: "#f6b519" } : { "": "" }
                    }
                  >
                    <strong>{user.Carts.length}</strong>
                  </MDBNavLink>
                </MDBNavItem>
              )}
              {this.props.user && (
                <MDBNavItem onClick={(e) => handleSetActiveTab("My Account")}>
                  <MDBNavLink
                    style={
                      activeTab === "My Account"
                        ? { color: "#f6b519" }
                        : { "": "" }
                    }
                    name="My Account"
                    to={`/account/${user.id}`}
                  >
                    <strong>My Account</strong>
                  </MDBNavLink>
                </MDBNavItem>
              )}
              {this.props.user && (
                <MDBNavItem onClick={(e) => handleSetActiveTab("Logout")}>
                  <MDBNavLink name="Logout" to="/logout">
                    <strong>Logout</strong>
                  </MDBNavLink>
                </MDBNavItem>
              )}
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
      </header>
    );
  }
}

export default NavBar2;
