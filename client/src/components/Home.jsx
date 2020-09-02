import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBMask,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBView,
  MDBContainer,
  MDBFormInline,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdbreact";
import "../Home.css";

class Home extends Component {
  render() {
    return (
      <div id="contactformpage">
        <MDBView>
          <MDBMask />
          <MDBContainer
            style={{ height: "100%", width: "100%", paddingTop: "10rem" }}
            className="d-flex justify-content-center align-items-center"
          >
            <MDBRow>
              <div className="white-text text-center text-md-left col-md-6 mt-xl-5 mb-5">
                <h1 className="display-4 font-weight-bold">
                  Conquer the Outdoors{" "}
                </h1>
                <hr className="hr-light" />
                <h6 className="mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem
                  repellendus quasi fuga nesciunt dolorum nulla magnam veniam
                  sapiente, fugiat! Commodi sequi non animi ea dolor molestiae
                  iste.
                </h6>
                <MDBBtn outline color="white">
                  Learn More
                </MDBBtn>
              </div>
            </MDBRow>
          </MDBContainer>
        </MDBView>

        <MDBContainer>
          <div className="row" style={{ padding: "5%" }}>
            <div className="col d-flex justify-content-center">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
        </MDBContainer>
      </div>
    );
  }
}

export default Home;
