import React from "react";
import QuantitySelector from "./QuantitySelector";

const TableBody = (props) => {
  const {
    items,
    handleHover,
    handleLeave,
    handleRemoveFromCart,
    handleChangeQuantity,
    calculateQuantity,
    calculatePrice,
    removeBtn,
    clientWidth,
  } = props;
  return (
    <tbody>
      {items.map((product, index) => {
        return (
          <tr
            key={index}
            onMouseEnter={(e) => handleHover(e, index)}
            onMouseLeave={(e) => handleLeave(e, index)}
          >
            {clientWidth > 560 ? (
              <th>
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
              </th>
            ) : (
              <th style={{ display: "none" }}></th>
            )}
            <td>
              {" "}
              <QuantitySelector
                calculateQuantity={calculateQuantity}
                handleChangeQuantity={handleChangeQuantity}
                product={product}
                index={index}
                clientWidth={clientWidth}
              />
            </td>
            <td>
              <strong>
                {" "}
                {"$" + calculatePrice(product.quantity, product.product.price)}
              </strong>
            </td>
            <td>
              {" "}
              {clientWidth > 560 ? "" : <span>{product.product.name}</span>}
              <img
                style={{ maxHeight: "100px", maxWidth: "100px" }}
                src={`data:image/png;base64,${product.product.imgSrc}`}
              />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
