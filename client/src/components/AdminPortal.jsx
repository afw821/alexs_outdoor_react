import React, { Component } from "react";
import ProductForm from "../components/ProductForm";
import ListItem from "./common/ListItem";
import CategoryManager from "./CategoryManager";
import DropDownBtn from "./common/DropDownBtn";

class AdminPortal extends Component {
  state = {
    selectedTab: { id: 1, name: "Manage Products" },
  };

  handleTabChange = (item) => {
    this.setState({ selectedTab: item });
  };

  render() {
    const { selectedTab } = this.state;
    const { clientWidth } = this.props;
    const options = [
      { id: 1, name: "Manage Products" },
      { id: 2, name: "Category Manager" },
    ];
    return (
      <>
        {clientWidth < 791 && (
          <div className="row" style={{ marginTop: "100px" }}>
            <div className="col d-flex justify-content-center">
              <DropDownBtn
                title={"Select Items to Manage"}
                items={options}
                selectedTab={selectedTab}
                handleChange={this.handleTabChange}
              />
            </div>
          </div>
        )}
        <div className="row">
          {clientWidth > 791 && (
            <div className="col-2" style={{ marginTop: "100px" }}>
              <div className="row">
                <div className="col">
                  <ListItem
                    selectedTab={selectedTab}
                    handleChange={this.handleTabChange}
                    items={options}
                  />
                </div>
              </div>
            </div>
          )}

          <div className={clientWidth > 791 ? "col-10" : "col-12"}>
            <div className="row">
              <div className="col d-flex justify-content-center">
                {selectedTab.name === "Manage Products" ? (
                  <ProductForm user={this.props.user} productId={null} />
                ) : (
                  <CategoryManager user={this.props.user} />
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AdminPortal;
