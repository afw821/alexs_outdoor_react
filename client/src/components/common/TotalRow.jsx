import React from "react";

const TotalRow = ({ totalPrice }) => {
  return (
    <div className="card" style={{ backgroundColor: "whitesmoke" }}>
      <div className="card-body">
        <div className="row">
          <div className="col-2">
            <h5>Total:</h5>
          </div>
          <div className="col-8">
            <span>
              <strong>{totalPrice}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalRow;
