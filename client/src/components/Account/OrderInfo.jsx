import React, { Component } from "react";
import { getProductByPKId } from "../../services/productService";
import _arrayBufferToBase64 from "../../utils/toBase64String";
import Table from "../Shared/Table";
import TableHead from "./../Shared/TableHead";
import TableBody from "./../Shared/TableBody";
import { getCartTableOptions } from "../../utils/tableHeaderOptions";
import { getTableRowOptions } from "./../../utils/tableRowOptions";

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

  handleHover = (e, index) => {
    e.currentTarget.style.backgroundColor = "whitesmoke";
  };

  handleLeave = (e, index) => {
    e.currentTarget.style.backgroundColor = "white";
  };

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
    return `${month} ${day}, ${fullYr} - ${hr}:${mins} hrs`;
  };

  filterTableOptions = (orderOptions, property, ...rest) => {
    //for mobile reponsiveness
    const filtered = orderOptions.filter((option) =>
      rest.length > 1
        ? option[property] !== rest[0] && option[property] !== rest[1]
        : option[property] !== rest[0]
    );
    return filtered;
  };

  renderTableHeaderOptions = (clientWidth) => {
    const { orderOptions } = getCartTableOptions();

    if (clientWidth < 400)
      return this.filterTableOptions(
        orderOptions,
        "header",
        "Quantity",
        "Purchase Date"
      );
    else if (clientWidth < 467)
      return this.filterTableOptions(orderOptions, "header", "Purchase Date");
    else return orderOptions;
  };

  renderTableRowOptions = (clientWidth) => {
    const { trItemsForOrder: allOptions } = getTableRowOptions(this.formatDate);
    if (clientWidth < 400)
      return this.filterTableOptions(allOptions, "id", 3, 2);
    else if (clientWidth < 467)
      return this.filterTableOptions(allOptions, "id", 3);
    else return allOptions;
  };

  render() {
    const { user, clientWidth } = this.props;
    const { products } = this.state;

    if (user.Purchases.length === 0)
      return <div>{`You have no purchases ${user.firstName}`}</div>;
    else {
      return (
        <Table
          options={this.renderTableHeaderOptions(clientWidth)}
          items={products}
          handleHover={this.handleHover}
          handleLeave={this.handleLeave}
          trItems={this.renderTableRowOptions(clientWidth)}
        />
      );
    }
  }
}

export default OrderInfo;
