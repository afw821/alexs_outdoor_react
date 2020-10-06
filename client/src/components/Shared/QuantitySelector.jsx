import React from "react";

const QuantitySelector = ({
  calculateQuantity,
  handleChangeQuantity,
  product,
  index,
  clientWidth,
  renderedFromDetails, //don't need to make mobile res from product details
}) => {
  return (
    <div
      className={
        clientWidth > `${renderedFromDetails ? 100 : 740}`
          ? "def-number-input number-input mt-2"
          : ""
      }
    >
      {clientWidth > `${renderedFromDetails ? 100 : 740}` ? (
        <button
          onClick={() =>
            calculateQuantity(product.quantity, index, false, product)
          }
          className="minus"
        ></button>
      ) : (
        ""
      )}
      <input
        style={
          clientWidth < `${renderedFromDetails ? 100 : 740}`
            ? { width: "75%" }
            : { "": "" }
        }
        className="quantity"
        name="quantity"
        onChange={() => handleChangeQuantity(product.quantity, index)} //Deprecated
        value={product.quantity}
        type="number"
      />
      {clientWidth > `${renderedFromDetails ? 100 : 740}` ? (
        <button
          onClick={() =>
            calculateQuantity(product.quantity, index, true, product)
          }
          className="plus"
        ></button>
      ) : (
        ""
      )}
      {clientWidth > `${renderedFromDetails ? 100 : 740}` ? (
        ""
      ) : (
        <div className="row mt-2 pl-3">
          <div className="col-4 mr-1 responsive-quantity d-flex justify-content-center align-items-center">
            <i
              className="fa fa-minus fa-lg"
              onClick={() =>
                calculateQuantity(product.quantity, index, false, product)
              }
              aria-hidden="true"
            ></i>
          </div>
          <div className="col-4 responsive-quantity d-flex justify-content-center align-items-center">
            <i
              className="fa fa-plus fa-lg"
              onClick={() =>
                calculateQuantity(product.quantity, index, true, product)
              }
              aria-hidden="true"
            ></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuantitySelector;
