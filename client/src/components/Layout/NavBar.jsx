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
  MDBBadge,
} from "mdbreact";

class NavBar extends Component {
  state = {
    collapse: false,
    isWideEnough: false,
  };

  handleClick = (e) => {
    this.setState({ collapse: !this.state.collapse });
  };

  handleHover = (e) => {
    e.currentTarget.style.borderBottom = "2px solid white";
  };

  handleLeave = (e) => {
    e.currentTarget.style.borderBottom = "2px solid transparent";
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
                  onMouseEnter={(e) => this.handleHover(e)}
                  onMouseLeave={(e) => this.handleLeave(e)}
                  className="brd_transparent"
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
                    onMouseEnter={(e) => this.handleHover(e)}
                    onMouseLeave={(e) => this.handleLeave(e)}
                    className="brd_transparent"
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
                    onMouseEnter={(e) => this.handleHover(e)}
                    onMouseLeave={(e) => this.handleLeave(e)}
                    className="brd_transparent"
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
                  onMouseEnter={(e) => this.handleHover(e)}
                  onMouseLeave={(e) => this.handleLeave(e)}
                  className="brd_transparent"
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
                  onMouseEnter={(e) => this.handleHover(e)}
                  onMouseLeave={(e) => this.handleLeave(e)}
                  className="brd_transparent"
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
                    onMouseEnter={(e) => this.handleHover(e)}
                    onMouseLeave={(e) => this.handleLeave(e)}
                    className="brd_transparent"
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
                  <MDBBadge color="danger" className="ml-2">
                    {user.Carts.length}
                  </MDBBadge>
                </MDBNavItem>
              )}
              {this.props.user && (
                <MDBNavItem onClick={(e) => handleSetActiveTab("My Account")}>
                  <MDBNavLink
                    onMouseEnter={(e) => this.handleHover(e)}
                    onMouseLeave={(e) => this.handleLeave(e)}
                    className="brd_transparent"
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
                  <MDBNavLink
                    onMouseEnter={(e) => this.handleHover(e)}
                    onMouseLeave={(e) => this.handleLeave(e)}
                    className="brd_transparent"
                    name="Logout"
                    to="/logout"
                  >
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

export default NavBar;
