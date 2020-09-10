import React from "react";
import { Button, Modal } from "react-bootstrap";

const PopUpModal = (props) => {
  const { show, header, body, onClose } = props;
  return (
    <Modal show={show}>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button onClick={() => onClose()}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PopUpModal;
