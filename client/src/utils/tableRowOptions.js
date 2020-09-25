import QuantitySelector from "../components/Shared/QuantitySelector";
import React from "react";

export function getTableRowOptions(
  formatDate,
  calculateQuantity,
  handleChangeQuantity,
  clientWidth,
  handleRemoveFromCart,
  removeBtn,
  calculatePrice
) {
  const trItems = [
    {
      id: 1,
      content: (product, index) => (
        <>
          <div className="row">
            <div className="col">
              <strong>{product.product.name}</strong>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              {removeBtn.row === index && (
                <button
                  onClick={(e) => handleRemoveFromCart(e, product)}
                  className="btn btn-sm btn-danger"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </>
      ),
    },
    {
      id: 2,
      content: (product, index) => (
        <QuantitySelector
          calculateQuantity={calculateQuantity}
          handleChangeQuantity={handleChangeQuantity}
          product={product}
          index={index}
          clientWidth={clientWidth}
        />
      ),
    },
    {
      id: 3,
      content: (product, index) => (
        <strong>
          {"$" + calculatePrice(product.quantity, product.product.price)}
        </strong>
      ),
    },
    {
      id: 4,
      content: (product, index) => (
        <>
          {clientWidth > 560 ? "" : <span>{product.product.name}</span>}
          <img
            style={{ maxHeight: "100px", maxWidth: "100px" }}
            src={`data:image/png;base64,${product.product.imgSrc}`}
          />
        </>
      ),
    },
  ];

  const trItemsForOrder = [
    {
      id: 1,
      content: (product, index) => <>{product.product.name}</>,
    },
    {
      id: 2,
      content: (product, index) => <>{product.quantity}</>,
    },
    {
      id: 3,
      content: (product, index) => <> {formatDate(product.purchaseDate)}</>,
    },
    {
      id: 4,
      content: (product, index) => (
        <img
          style={{ maxHeight: "100px", maxWidth: "100px" }}
          src={`data:image/png;base64,${product.product.imgSrc}`}
        />
      ),
    },
  ];

  return {
    trItems,
    trItemsForOrder,
  };
}
