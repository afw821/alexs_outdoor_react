import React from "react";
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from "mdbreact";

const ModalPrompt = ({
  isOpen,
  toggleModal,
  title,
  body,
  btnText,
  handleClick,
}) => {
  return (
    <MDBModal isOpen={isOpen}>
      <MDBModalHeader>{title}</MDBModalHeader>
      <MDBModalBody>{body}</MDBModalBody>
      <MDBModalFooter>
        <MDBBtn color="secondary" onClick={toggleModal}>
          Close
        </MDBBtn>
        <MDBBtn color="danger" onClick={handleClick}>
          {btnText}
        </MDBBtn>
      </MDBModalFooter>
    </MDBModal>
  );
};

export default ModalPrompt;
