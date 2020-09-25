import { React } from "react";

export default function renderEmailTemplate(array) {
  const calculateTotal = (quantity, price) => {
    return quantity * price;
  };

  const renderRow = array.map(
    (item) =>
      `<tr>
      <td>${item.product.name}</td>
      <td>${item.quantity}</td>
      <td>$${calculateTotal(item.quantity, item.product.price)}</td>
      <td>
        <img style="width:32px; height: 32px"
        alt="picture"
          src="https://www.afwatkins.com/assets/favicon-32x32.png"
        />
      </td>
    </tr>`
  );

  return `<h2>Alex's Outdoor Store</h2><table class="table">
<thead style="border-bottom: 1px solid black;">
  <tr>
    <th style="border-bottom: 1px solid black;">Product</th>
    <th style="border-bottom: 1px solid black;">Quantity</th>
    <th style="border-bottom: 1px solid black;">Total</th>
    <th style="border-bottom: 1px solid black;"></th>
  </tr>
</thead>
<tbody>
 ${renderRow}
</tbody>
</table>`;
}
