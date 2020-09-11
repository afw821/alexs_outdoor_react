const cartOptions = [
  {
    id: 1,
    header: "Name",
  },
  {
    id: 2,
    header: "Quantity",
  },
  {
    id: 3,
    header: "Price",
  },
  {
    id: 4,
    header: "",
  },
];
const orderOptions = [
  {
    id: 1,
    header: "Product",
  },
  {
    id: 2,
    header: "Quantity",
  },
  {
    id: 3,
    header: "Purchase Date",
  },
  {
    id: 4,
    header: "",
  },
];

export function getCartTableOptions() {
  return {
    cartOptions,
    orderOptions,
  };
}
