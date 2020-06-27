import React, { Component } from "react";
import ProductForm from "../components/ProductForm";
import ListItem from "./common/ListItem";
import CategoryManager from "./CategoryManager";

class AdminPortal extends Component {
  state = {
    selectedTab: { id: 1, name: "Manage Products" },
  };

  handleTabChange = (item) => {
    this.setState({ selectedTab: item });
  };

  render() {
    const { selectedTab } = this.state;
    return (
      <div className="row">
        <div className="col-2" style={{ marginTop: "100px" }}>
          <ListItem
            selectedTab={selectedTab}
            handleChange={this.handleTabChange}
            items={[
              { id: 1, name: "Manage Products" },
              { id: 2, name: "Manage Categories" },
              { id: 2, name: "Manage Purchases" },
              { id: 2, name: "Manage Carts" },
              { id: 2, name: "Manage Users" },
            ]}
          />
        </div>
        <div className="col-10">
          {selectedTab.name === "Manage Products" ? (
            <ProductForm user={this.props.user} />
          ) : (
            <CategoryManager user={this.props.user} />
          )}
        </div>
      </div>
    );
  }
}

export default AdminPortal;
