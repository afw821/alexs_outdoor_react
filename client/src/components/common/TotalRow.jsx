import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBBtn,
  MDBNav,
  MDBNavItem,
  MDBNavLink,
  MDBIcon,
} from "mdbreact";
import { Link } from "react-router-dom";
const TotalRow = ({
  totalPrice,
  toggleModal,
  clientWidth,
  handleSetActiveTab,
}) => {
  return (
    <MDBCard className={`text-center ${clientWidth > 400 ? "" : "tr-width"}`}>
      <MDBCardHeader>
        <MDBNav
          className={clientWidth < 750 ? "d-flex justify-content-center" : ""}
          header
        >
          <MDBNavItem className="d-flex align-items-center">
            <MDBBtn
              className={clientWidth < 750 ? "btn-sm" : ""}
              onClick={toggleModal}
              color="info"
            >
              Checkout
            </MDBBtn>
            <MDBIcon
              style={
                clientWidth > 749 ? { fontSize: "45px" } : { fontSize: "30px" }
              }
              fab
              icon="cc-visa"
              className="mr-1"
            />
            <MDBIcon
              style={
                clientWidth > 749 ? { fontSize: "45px" } : { fontSize: "30px" }
              }
              fab
              icon="cc-mastercard"
              className="mr-1"
            />
            <MDBIcon
              style={
                clientWidth > 749 ? { fontSize: "45px" } : { fontSize: "30px" }
              }
              fab
              icon="cc-amex"
            />
          </MDBNavItem>
        </MDBNav>
      </MDBCardHeader>
      <MDBCardBody>
        <MDBCardTitle>Total</MDBCardTitle>
        <MDBCardText style={{ fontWeight: "bolder", color: "black" }}>
          <strong>${parseFloat(totalPrice.toFixed(2))}</strong>
        </MDBCardText>

        <Link to="/products">
          <MDBBtn
            className={clientWidth < 750 ? "btn-sm" : ""}
            onClick={() => handleSetActiveTab("Products")}
            color="primary"
          >
            Continue Shopping
          </MDBBtn>
        </Link>
      </MDBCardBody>
    </MDBCard>
  );
};

export default TotalRow;
