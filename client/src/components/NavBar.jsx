import React, { useState } from "react";

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
const NavBar = (props) => {
  const user = props.user;
  const count = props.count;
  const [collapse, setCollapse] = useState(false);
  const [isWideEnough, setWideEnough] = useState(false);
  const [isHomeActive, setHomeActive] = useState(true);
  const [isLoginActive, setLoginActive] = useState(false);
  const [isSignUpActive, setSignUpActive] = useState(false);
  const [isProductActive, setProductActive] = useState(false);
  const [isLogoutActive, setLogoutActive] = useState(false);
  const [isContactActive, setContactActive] = useState(false);
  const [isAccountActive, setAccountActive] = useState(false);

  const handleToggleActive = (name) => {
    switch (name) {
      case "Home":
        if (isHomeActive) return;
        setHomeActive(true);
        setLoginActive(false);
        setSignUpActive(false);
        setProductActive(false);
        setLogoutActive(false);
        setContactActive(false);
        setAccountActive(false);
        break;
      case "Login":
        if (isLoginActive) return;
        setLoginActive(true);
        setHomeActive(false);
        setSignUpActive(false);
        setProductActive(false);
        setLogoutActive(false);
        setContactActive(false);
        setAccountActive(false);
        break;
      case "Sign Up":
        if (isSignUpActive) return;
        setSignUpActive(true);
        setLoginActive(false);
        setHomeActive(false);
        setProductActive(false);
        setLogoutActive(false);
        setContactActive(false);
        setAccountActive(false);
        break;
      case "Products":
        if (isProductActive) return;
        setProductActive(true);
        setSignUpActive(false);
        setLoginActive(false);
        setHomeActive(false);
        setLogoutActive(false);
        setContactActive(false);
        setAccountActive(false);
        break;
      case "Logout":
        if (isLogoutActive) return;
        setLogoutActive(true);
        setSignUpActive(false);
        setLoginActive(false);
        setHomeActive(false);
        setProductActive(false);
        setContactActive(false);
        setAccountActive(false);
        break;
      case "Contact":
        if (isContactActive) return;
        setContactActive(true);
        setLogoutActive(false);
        setSignUpActive(false);
        setLoginActive(false);
        setHomeActive(false);
        setProductActive(false);
        setAccountActive(false);
        break;
      case "Account":
        if (isContactActive) return;
        setAccountActive(true);
        setContactActive(true);
        setLogoutActive(false);
        setSignUpActive(false);
        setLoginActive(false);
        setHomeActive(false);
        setProductActive(false);
        break;
    }
  };
  const handleClick = (e) => {
    setCollapse(!collapse);
  };
  return (
    <header>
      <MDBNavbar color="indigo" dark expand="md" fixed="top">
        <MDBNavbarBrand href="/">
          <strong>Alex's Outdoor Store</strong>
        </MDBNavbarBrand>
        {!isWideEnough && <MDBNavbarToggler onClick={handleClick} />}
        <MDBCollapse isOpen={collapse} navbar>
          <MDBNavbarNav left>
            <MDBNavItem
              onClick={(e) => handleToggleActive(e.target.name)}
              active={isHomeActive}
            >
              <MDBNavLink name="Home" to="/home">
                Home
              </MDBNavLink>
            </MDBNavItem>

            {!props.user && (
              <MDBNavItem
                onClick={(e) => handleToggleActive(e.target.name)}
                active={isLoginActive}
              >
                <MDBNavLink name="Login" to="/login">
                  Login
                </MDBNavLink>
              </MDBNavItem>
            )}
            {!props.user && (
              <MDBNavItem
                onClick={(e) => handleToggleActive(e.target.name)}
                active={isSignUpActive}
              >
                <MDBNavLink name="Sign Up" to="/register">
                  Sign Up
                </MDBNavLink>
              </MDBNavItem>
            )}

            <MDBNavItem
              onClick={(e) => handleToggleActive(e.target.name)}
              active={isProductActive}
            >
              <MDBNavLink name="Products" to="/products">
                Products
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem
              onClick={(e) => handleToggleActive(e.target.name)}
              active={isContactActive}
            >
              <MDBNavLink name="Contact" to="/contact">
                Contact
              </MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            {props.user && (
              <MDBNavItem
                className="d-flex align-items-center"
                style={{ marginRight: "10px" }}
                onClick={(e) => console.log("Cart Clicked")}
              >
                <MDBNavLink name="Account" to={`/cart/${user.id}`}>
                  <MDBIcon icon="shopping-cart" />
                </MDBNavLink>
              </MDBNavItem>
            )}
            {props.user && (
              <MDBNavItem
                className="d-flex align-items-center"
                style={{ marginRight: "10px" }}
              >
                <MDBNavLink name="Account" to={`/cart/${user.id}`}>
                  {user.Carts.length}
                </MDBNavLink>
              </MDBNavItem>
            )}
            {props.user && (
              <MDBNavItem
                onClick={(e) => handleToggleActive(e.target.name)}
                active={isAccountActive}
              >
                <MDBNavLink name="Account" to={`/account/${user.id}`}>
                  My Account
                </MDBNavLink>
              </MDBNavItem>
            )}
            {props.user && (
              <MDBNavItem
                onClick={(e) => handleToggleActive(e.target.name)}
                active={isLogoutActive}
              >
                <MDBNavLink name="Logout" to="/logout">
                  Logout
                </MDBNavLink>
              </MDBNavItem>
            )}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>

      {/* <MDBView src={OutdoorPic}>
        <MDBMask
          overlay="black-light"
          className="flex-center flex-column text-white text-center"
        >
          <h2>Welcome to Alex's Outdoor Store</h2>
          <h5>Browse through hudreds of products we have in stock</h5>
          <br />
          <p>Purchases online through our secure Stripe payment option </p>
        </MDBMask>
      </MDBView> */}
    </header>
  );
};

export default NavBar;
