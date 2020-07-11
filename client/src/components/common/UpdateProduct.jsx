import React from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from "mdbreact";

const UpdateProduct = ({ isUpdateOpen, toggleUpdateModal }) => {
  return (
    <MDBModal isOpen={isUpdateOpen} size="lg">
      <MDBModalHeader>Update Product</MDBModalHeader>
      <MDBModalBody>Update Product</MDBModalBody>
      <MDBModalFooter>
        <MDBBtn color="secondary" onClick={toggleUpdateModal}>
          Close
        </MDBBtn>
        <MDBBtn color="primary">Save changes</MDBBtn>
      </MDBModalFooter>
    </MDBModal>
  );
};

export default UpdateProduct;
