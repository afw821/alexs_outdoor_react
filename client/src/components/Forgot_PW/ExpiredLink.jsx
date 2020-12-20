import React from "react";
import { MDBCard, MDBCardBody } from "mdbreact";
import { Link } from "react-router-dom";
const ExpiredLink = () => {
  return (
    <div className="row">
      <div className="col d-flex justify-content-center mt-3">
        <MDBCard className="form-width" style={{ marginTop: "100px" }}>
          <MDBCardBody>
            <p>
              It seems the link you clicked is expired. Please click{" "}
              <Link to="/passwordRecovery">here</Link> to return to the
              forgotten password page!
            </p>
          </MDBCardBody>
        </MDBCard>
      </div>
    </div>
  );
};

export default ExpiredLink;
