import React from "react";

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
            <td>
              {" "}
              <div className="def-number-input number-input mt-2">
                <button
                  onClick={() =>
                    calculateQuantity(product.quantity, index, false)
                  }
                  className="minus"
                ></button>
                <input
                  className="quantity"
                  name="quantity"
                  onChange={() => handleChangeQuantity(product.quantity, index)} //Deprecated
                  value={product.quantity}
                  type="number"
                />
                <button
                  onClick={() =>
                    calculateQuantity(product.quantity, index, true)
                  }
                  className="plus"
                ></button>
              </div>
            </td>
            <td>
              <strong>
                {" "}
                {"$" + calculatePrice(product.quantity, product.product.price)}
              </strong>
            </td>
            <td>
              {" "}
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
