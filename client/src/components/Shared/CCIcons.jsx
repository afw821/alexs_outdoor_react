import React from "react";
import { MDBIcon } from "mdbreact";
const CCIcons = ({ clientWidth }) => {
  return (
    <>
      {" "}
      <MDBIcon
        style={clientWidth > 749 ? { fontSize: "45px" } : { fontSize: "30px" }}
        fab
        icon="cc-visa"
        className="mr-1"
      />
      <MDBIcon
        style={clientWidth > 749 ? { fontSize: "45px" } : { fontSize: "30px" }}
        fab
        icon="cc-mastercard"
        className="mr-1"
      />
      <MDBIcon
        style={clientWidth > 749 ? { fontSize: "45px" } : { fontSize: "30px" }}
        fab
        icon="cc-amex"
      />
    </>
  );
};

export default CCIcons;
