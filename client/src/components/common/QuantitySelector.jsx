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
    </div>
  );
};

export default QuantitySelector;
