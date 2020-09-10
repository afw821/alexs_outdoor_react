import React from "react";

const QuantitySelector = ({
  calculateQuantity,
  handleChangeQuantity,
  product,
  index,
  clientWidth,
}) => {
  return (
    <div
      className={clientWidth > 740 ? "def-number-input number-input mt-2" : ""}
    >
      {clientWidth > 740 ? (
        <button
          onClick={() => calculateQuantity(product.quantity, index, false)}
          className="minus"
        ></button>
      ) : (
        ""
      )}
      <input
        style={clientWidth < 740 ? { width: "75%" } : { "": "" }}
        className="quantity"
        name="quantity"
        onChange={() => handleChangeQuantity(product.quantity, index)} //Deprecated
        value={product.quantity}
        type="number"
      />
      {clientWidth > 740 ? (
        <button
          onClick={() => calculateQuantity(product.quantity, index, true)}
          className="plus"
        ></button>
      ) : (
        ""
      )}
      {clientWidth > 740 ? (
        ""
      ) : (
        <div className="row mt-2 pl-3">
          <div className="col-4 mr-1 responsive-quantity d-flex justify-content-center align-items-center">
            <i
              class="fa fa-minus fa-lg"
              onClick={() => calculateQuantity(product.quantity, index, false)}
              aria-hidden="true"
            ></i>
          </div>
          <div className="col-4 responsive-quantity d-flex justify-content-center align-items-center">
            <i
              class="fa fa-plus fa-lg"
              onClick={() => calculateQuantity(product.quantity, index, true)}
              aria-hidden="true"
            ></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuantitySelector;
