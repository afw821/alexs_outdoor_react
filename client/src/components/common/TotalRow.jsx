import React from "react";

const TotalRow = ({ totalPrice }) => {
  return (
    <div className="card" style={{ backgroundColor: "whitesmoke" }}>
      <div className="card-body">
        <div className="row">
          <div className="col-2">
            <h5>Total:</h5>
          </div>
          <div
            className="col-8 d-flex justify-content-end"
            style={{ paddingRight: "80px" }}
          >
            <span>
              <strong>${parseFloat(totalPrice.toFixed(2))}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalRow;
