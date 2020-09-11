import React from "react";
import QuantitySelector from "./QuantitySelector";

const TableBody = ({
  items,
  handleHover,
  handleLeave,
  handleRemoveFromCart,
  handleChangeQuantity,
  calculateQuantity,
  calculatePrice,
  removeBtn,
  clientWidth,
  trItems,
}) => {
  const renderCell = (product, index, column) => {
    return column.content(product, index);
  };

  return (
    <tbody>
      {items.map((product, index) => {
        return (
          <tr
            key={index}
            onMouseEnter={(e) => handleHover(e, index)}
            onMouseLeave={(e) => handleLeave(e, index)}
          >
            {trItems.map((column) => (
              <td key={column.id}>{renderCell(product, index, column)}</td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
