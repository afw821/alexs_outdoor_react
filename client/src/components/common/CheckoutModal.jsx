import React from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from "mdbreact";

const CheckoutModal = ({ isOpen, closeModal, user, handlePurchase }) => {
  return (
    <MDBModal
      isOpen={isOpen}
      //toggle={toggle}
      fullHeight
      position="top"
    >
      <MDBModalHeader>
        {user.firstName}, review your purchase information below
      </MDBModalHeader>
      <MDBModalBody>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </MDBModalBody>
      <MDBModalBody>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </MDBModalBody>

      <MDBModalFooter>
        <MDBBtn color="secondary" onClick={closeModal}>
          Close
        </MDBBtn>
        <MDBBtn
          color="primary"
          onClick={() => handlePurchase(2, 1, "purchase 1", 1)}
        >
          Purchase
        </MDBBtn>
      </MDBModalFooter>
    </MDBModal>
  );
};

export default CheckoutModal;
