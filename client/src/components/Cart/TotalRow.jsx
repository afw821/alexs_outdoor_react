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
} from "mdbreact";
import { Link } from "react-router-dom";
import CCIcons from "./../Shared/CCIcons";
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
            <CCIcons clientWidth={clientWidth} />
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
