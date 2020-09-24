import React, { Component } from "react";
import _ from "lodash";
import ModalPrompt from "../Shared/ModalPrompt";
import Paginator from "../Shared/Paginator";
import ProductCard from "../Products/ProductCard";
import UpdateProduct from "../Products/UpdateProduct";
import { paginate } from "../../utils/paginate";
import { getProducts, deleteProduct } from "../../services/productService";
import { getCategories } from "../../services/categoryService";
import { toast } from "react-toastify";
import ProductFilterCol from "./ProductFilterCol";
import ProductFilterMobile from "./ProductFilterMobile";

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

  calculateIndex = (arg) => {
    const { currentPage, pageSize } = this.state;
    const first = (currentPage - 1) * pageSize;
    const index = first + arg;
    return index;
  };

  calculateIndexOfFiltered = (updatedProd) => {
    const products = [...this.state.products];
    const index = products.findIndex(
      (product, i) => updatedProd.id === product.id
    );
    return index;
  };

  handleUpdateView = (updatedProduct, arg) => {
    const products = [...this.state.products];

    const i =
      !this.state.selectedTab.id && !this.state.searchQuery
        ? this.calculateIndex(arg)
        : this.calculateIndexOfFiltered(updatedProduct);

    products.splice(i, 1, updatedProduct);
    this.setState({ products });
  };

  handleToggleUpdate = (productId, index) => {
    this.setState({
      isUpdateOpen: !this.state.isUpdateOpen,
      productId: productId,
      indexOfUpdatedProduct: index,
    });
  };

  handleTogglePrompt = (id) => {
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

    const { user, handleSetActiveTab, clientWidth } = this.props;
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

        {clientWidth < 1000 && (
          <ProductFilterMobile
            searchQuery={searchQuery}
            handleSearch={this.handleSearch}
            categories={categories}
            selectedTab={selectedTab}
            handleTabChange={this.handleTabChange}
          />
        )}
        <div className="row" style={{ marginTop: "85px" }}>
          {clientWidth < 1000 ? (
            ""
          ) : (
            <ProductFilterCol
              searchQuery={searchQuery}
              handleSearch={this.handleSearch}
              categories={categories}
              selectedTab={selectedTab}
              handleTabChange={this.handleTabChange}
            />
          )}

          <div className={`${clientWidth > 1000 ? "col-8" : "col-12"}`}>
            <div className="row mt-3 ml-5">
              <Paginator
                itemsCount={totalCount}
                pageSize={pageSize}
                onPageChange={this.handlePageChange}
                currentPage={currentPage}
              />
            </div>
            <div className="row">
              <ProductCard
                products={products}
                user={user}
                handleDelete={this.handleTogglePrompt}
                handleToggleUpdate={this.handleToggleUpdate}
                handleSetActiveTab={handleSetActiveTab}
                clientWidth={clientWidth}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Products;
