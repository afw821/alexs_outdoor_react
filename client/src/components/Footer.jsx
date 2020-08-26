import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { Link } from "react-router-dom";

const Footer = ({ clientWidth }) => {
  const footerStyle = {
    position: "absolute",
    bottom: "0",
    width: "115%",
    marginLeft: "-20px",
    backgroundColor: "#343a40",
    opacity: "1.5",
  };
  if (clientWidth < 768) return null;
  return (
    <MDBFooter
      //color="indigo"
      dark
      className="font-small pt-4 mt-4"
      style={footerStyle}
    >
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">About this site</h5>
            <p>This site was created with React, Node, Express and MySQL</p>
          </MDBCol>
          <MDBCol md="6">
            <h5 className="title">Links</h5>
            <ul>
              <li className="list-unstyled">
                <Link to="/home">Home</Link>
              </li>
              <li className="list-unstyled">
                <Link to="/products">Products</Link>
              </li>
              <li className="list-unstyled">
                <Link to="/contact">Contact</Link>
              </li>
              <li className="list-unstyled">
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright:{" "}
          <a href="https://alexwatkins.herokuapp.com"> Alex's Outdoor </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
};

export default Footer;
