import React, { Component } from "react";
import { getProductByPKId } from "../../services/productService";
import _arrayBufferToBase64 from "../../utils/toBase64String";
import TableHead from "./../Shared/TableHead";
import { getCartTableOptions } from "../../utils/tableOptions";
class OrderInfo extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const productsArray = [];
    const { user } = this.props;
    for (let i = 0; i < user.Purchases.length; i++) {
      const productId = user.Purchases[i].ProductId;
      const purchaseQuant = user.Purchases[i].quantity;
      const purchaseDate = user.Purchases[i].createdAt;
      let { data: product } = await getProductByPKId(productId);
      product.imgSrc = _arrayBufferToBase64(product.data.data);
      const purchaseObj = {
        product: product,
        quantity: purchaseQuant,
        purchaseDate: purchaseDate,
      };
      productsArray.push(purchaseObj);
    }

    this.setState({ products: productsArray });
  }

  getCurrentMonth = (index) => {
    const monthArr = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    for (let i = 0; i < monthArr.length; i++) {
      if (i === index) return monthArr[i];
    }
  };

  formatDate = (str) => {
    const date = new Date(str);
    const day = date.getDate();
    const index = date.getMonth();
    const fullYr = date.getFullYear();
    const hr = date.getHours();
    const mins = date.getMinutes();
    const month = this.getCurrentMonth(index);
    const formattedDate = `${month} ${day}, ${fullYr} - ${hr}:${mins} hrs`;
    return formattedDate;
  };
  filterOptions = (orderOptions, ...rest) => {
    const filtered = orderOptions.filter((option) =>
      rest.length > 1
        ? option.header !== rest[0] && option.header !== rest[1]
        : option.header !== rest[0]
    );
    return filtered;
  };

  renderTableHeaderOptions = (clientWidth) => {
    const { orderOptions } = getCartTableOptions();

    if (clientWidth < 400)
      return this.filterOptions(orderOptions, "Quantity", "Purchase Date");
    else if (clientWidth < 467)
      return this.filterOptions(orderOptions, "Purchase Date");
    else return orderOptions;
  };

  render() {
    const { user, clientWidth } = this.props;

    if (user.Purchases.length === 0)
      return <div>{`You have no purchases ${user.firstName}!`}</div>;
    else {
      return (
        <table className="table">
          <TableHead options={this.renderTableHeaderOptions(clientWidth)} />
          <tbody>
            {this.state.products.map((product, i) => (
              <tr key={i}>
                <th>{product.product.name}</th>
                {clientWidth < 400 ? (
                  <td style={{ display: "none" }}></td>
                ) : (
                  <td>{product.quantity}</td>
                )}
                {clientWidth < 467 ? (
                  <td style={{ display: "none" }}></td>
                ) : (
                  <td>{this.formatDate(product.purchaseDate)}</td>
                )}
                <td>
                  <img
                    style={{ maxHeight: "100px", maxWidth: "100px" }}
                    src={`data:image/png;base64,${product.product.imgSrc}`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  }
}

export default OrderInfo;
