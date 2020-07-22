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
    const {
      isUpdateOpen,
      toggleUpdateModal,
      productId,
      user,
      handleUpdateView,
      indexOfUpdatedProduct,
    } = this.props;

    return (
      <MDBModal isOpen={isUpdateOpen} size="lg">
        <MDBModalHeader
          className="d-flex justify-content-center"
          style={{ backgroundColor: "whitesmoke" }}
        >
          Update Product
        </MDBModalHeader>
        <MDBModalBody>
          <ProductForm
            user={user}
            productId={productId}
            indexOfUpdatedProduct={indexOfUpdatedProduct}
            closeModal={toggleUpdateModal}
            handleUpdateView={handleUpdateView}
          />
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="primary" onClick={() => toggleUpdateModal(null, null)}>
            Close
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    );
  }
}

export default UpdateProduct;
