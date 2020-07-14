import React, { Component } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from "mdbreact";
import ProductForm from "./../ProductForm";

class UpdateProduct extends Component {
  render() {
    const { isUpdateOpen, toggleUpdateModal, productId, user } = this.props;

    return (
      <MDBModal isOpen={isUpdateOpen} size="lg">
        <MDBModalHeader>Update Product</MDBModalHeader>
        <MDBModalBody>
          <ProductForm user={user} productId={productId} />
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={toggleUpdateModal}>
            Close
          </MDBBtn>
          <MDBBtn color="primary">Save changes</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    );
  }
}

export default UpdateProduct;
