import React from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from "mdbreact";

const CheckoutModal = ({ isOpen, closeModal }) => {
  return (
    <MDBModal
      isOpen={isOpen}
      //toggle={toggle}
      fullHeight
      position="top"
    >
      <MDBModalHeader>MDBModal title</MDBModalHeader>
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
        <MDBBtn color="primary">Save changes</MDBBtn>
      </MDBModalFooter>
    </MDBModal>
  );
};

export default CheckoutModal;
