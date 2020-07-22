import React, { Component } from "react";
import { getProducts, deleteProduct } from "./../services/productService";
import ProductCard from "./ProductCard";
import ListItem from "./common/ListItem";
import { getCategories } from "../services/categoryService";
import _ from "lodash";
import Paginator from "./common/Paginator";
import { paginate } from "./../utils/paginate";
import SearchBox from "./common/SearchBox";
import { toast } from "react-toastify";
import UpdateProduct from "./common/UpdateProduct";
import ModalPrompt from "./common/ModalPrompt";

class Products extends Component {
  state = {
    products: [],
    categories: [],
    selectedTab: { id: "", name: "All Categories" },
    pageSize: 6,
    currentPage: 1,
    searchQuery: "",
    isUpdateOpen: false,
    productId: null,
    indexOfUpdatedProduct: null,
    isPromptOpen: false,
    productIdToDelete: "",
  };

  async componentDidMount() {
    const { data: products } = await getProducts();
    const { data } = await getCategories();
    const categories = [{ id: "", name: "All Categories" }, ...data];
    this.setState({ products, categories });
  }

  handleTabChange = (item) => {
    const id = item.id;
    const name = item.name;
    this.setState({ selectedTab: { id: id, name: name }, currentPage: 1 });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
      selectedTab: { id: "", name: "All Categories" },
      currentPage: 1,
    });
  };

  handleUpdateView = (updatedProduct, index) => {
    //update view after product update
    //clone products array
    const products = [...this.state.products];
    console.log(index);

    products.splice(index, 1, updatedProduct);
    console.log("products", products);
    this.setState({
      products: products,
    });
    //update product by index
    //set state with updated array
  };

  handleToggleUpdate = (productId, index) => {
    this.setState({
      isUpdateOpen: !this.state.isUpdateOpen,
      productId: productId,
      indexOfUpdatedProduct: index,
    });
  };

  handleTogglePrompt = (id) => {
    console.log("id", id);
    this.setState({
      isPromptOpen: !this.state.isPromptOpen,
      productIdToDelete: id,
    });
  };

  handleDelete = async () => {
    const id = this.state.productIdToDelete;
    const originalProducts = [...this.state.products];
    const products = originalProducts.filter((p) => p.id !== id);
    this.setState({
      products: products,
      isPromptOpen: !this.state.isPromptOpen,
      productIdToDelete: "",
    });
    try {
      await deleteProduct(id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.setState({ products: originalProducts });
      } else if (ex.response && ex.response.status === 500) {
        this.setState({ products: originalProducts });
        toast.error("Product cannot be deleted because it is in a cart");
      }
    }
  };

  getPagedData = () => {
    const {
      products: allProducts,
      categories: allCategories,
      selectedTab,
      pageSize,
      currentPage,
      searchQuery,
    } = this.state;

    let filter = allProducts;
    if (searchQuery) {
      filter = allProducts.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else if (selectedTab && selectedTab.id) {
      filter = allProducts.filter((p) => p.CategoryId === selectedTab.id);
    }
    const sorted = _.orderBy(filter);

    const products = paginate(sorted, currentPage, pageSize);

    return { totalCount: filter.length, data: products };
  };

  render() {
    const {
      products: allProducts,
      categories,
      selectedTab,
      pageSize,
      currentPage,
      searchQuery,
      isUpdateOpen,
      productId,
      isPromptOpen,
      indexOfUpdatedProduct,
    } = this.state;

    const { user } = this.props;
    const { totalCount, data: products } = this.getPagedData();
    return (
      <>
        <UpdateProduct
          isUpdateOpen={isUpdateOpen}
          toggleUpdateModal={this.handleToggleUpdate}
          handleUpdateView={this.handleUpdateView}
          productId={productId}
          indexOfUpdatedProduct={indexOfUpdatedProduct}
          user={user}
        />
        <ModalPrompt
          isOpen={isPromptOpen}
          toggleModal={this.handleTogglePrompt}
          title={"Warning"}
          body={"Are you sure you want to delete this product?"}
          btnText={"Delete Product"}
          handleClick={this.handleDelete}
        />
        <div className="row" style={{ marginTop: "65px" }}>
          <div className="col-2">
            <div className="row">
              <div className="col">
                <SearchBox value={searchQuery} onChange={this.handleSearch} />
              </div>
            </div>
            <div className="row">
              <div className="col d-flex justify-content-center">
                <h5 style={{ fontWeight: "bolder" }}>Filter By Category</h5>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <ListItem
                  items={categories}
                  selectedTab={selectedTab}
                  handleChange={this.handleTabChange}
                />
              </div>
            </div>
          </div>
          <div className="col-8">
            <div className="row">
              <ProductCard
                products={products}
                user={user}
                handleDelete={this.handleTogglePrompt}
                handleToggleUpdate={this.handleToggleUpdate}
              />
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
      </>
    );
  }
}

export default Products;
