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
const TotalRow = ({ totalPrice, toggleModal, clientWidth }) => {
  return (
    // <div className="card" style={{ backgroundColor: "whitesmoke" }}>
    //   <div className="card-body">
    //     <div className="row">
    //       <div className="col-2">
    //         <h5>Total:</h5>
    //       </div>
    //       <div
    //         className="col-8 d-flex justify-content-end"
    //         style={{ paddingRight: "80px" }}
    //       >
    //         <span>
    //           <strong>${parseFloat(totalPrice.toFixed(2))}</strong>
    //         </span>
    //       </div>
    //       <div className="col-2">
    //         <button onClick={toggleModal} className="btn btn-sm btn-primary">
    //           Checkout
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <MDBCard className="text-center">
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
          <MDBBtn className={clientWidth < 750 ? "btn-sm" : ""} color="primary">
            Continue Shopping
          </MDBBtn>
        </Link>
      </MDBCardBody>
    </MDBCard>
  );
};

export default TotalRow;
