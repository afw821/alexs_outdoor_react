import React, { Component } from "react";
import { getProducts } from "./../services/productService";
import ProductCard from "./ProductCard";
import ListItem from './common/ListItem';
import { getCategories } from '../services/categoryService';
import _ from "lodash";
import Paginator from './common/Paginator';
import { paginate } from './../utils/paginate';

class Products extends Component {
  state = {
    products: [],
    categories: [],
    selectedTab: { id: "", name: "All Categories"},
    pageSize: 6,
    currentPage: 1,
    searchQuery: "",
  };

  async componentDidMount() {
    const { data: products } = await getProducts();
    const { data } = await getCategories();
     const categories = [{ id: "", name: "All Categories"}, ...data];
    this.setState({ products, categories });
  }

  handleTabChange = (item) => {
 
    const id = item.id;
    const name = item.name;
    this.setState({ selectedTab: { id: id, name: name} });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  getPagedData = () => {
    const {    
      products: allProducts,
      categories: allCategories,
      selectedTab,
      pageSize,
      currentPage,
      searchQuery
    } = this.state;

    let filter = allProducts;
    if(searchQuery){
      filter = allProducts.filter(p => 
        p.name.toLowercase().startsWith(searchQuery.toLowercase())
      );
    } else if(selectedTab && selectedTab.id){
      filter = allProducts.filter(p => p.CategoryId === selectedTab.id);
    }
    const sorted = _.orderBy(filter);

    const products = paginate(sorted, currentPage, pageSize);

    return { totalCount: filter.length, data: products };
      
  }

  render() {
    const { 
      products: allProducts, 
      categories, 
      selectedTab , 
      pageSize, currentPage, 
      searchQuery 
    } = this.state;

    const { user } = this.props;
    const { totalCount, data: products } = this.getPagedData();
    return (
      <div className="row" style={{ marginTop: "65px" }}>
        <div className="col-2">
          <h5>Filter By Category:</h5>
        <ListItem items={categories} 
        selectedTab={selectedTab} 
        handleChange={this.handleTabChange} 
        />

        </div>
        <div className="col-8">
          <div className="row">
            <ProductCard products={products} user={user} />
          </div>
          <div className="row">
          <Paginator
              itemsCount={totalCount}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Products;
