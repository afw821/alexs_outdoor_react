import React from "react";

const TotalRow = ({ totalPrice, toggleModal }) => {
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
          <div className="col-2">
            <button onClick={toggleModal} className="btn btn-sm btn-primary">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalRow;
