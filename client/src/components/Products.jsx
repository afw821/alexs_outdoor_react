import React, { Component } from "react";
import { getProducts } from "./../services/productService";
import ProductCard from "./ProductCard";

class Products extends Component {
  state = {
    products: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
  };

  async componentDidMount() {
    const { data: products } = await getProducts();

    this.setState({ products });
  }

  render() {
    const { products, pageSize, currentPage, searchQuery } = this.state;
    const { user } = this.props;
    return (
      <div className="row" style={{ marginTop: "65px" }}>
        <div className="col">
          <div className="row">
            <ProductCard products={products} user={user} />
          </div>
        </div>
      </div>
    );
  }
}

export default Products;
