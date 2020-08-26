import React, { Component } from "react";
import ProductForm from "../components/ProductForm";
import ListItem from "./common/ListItem";
import CategoryManager from "./CategoryManager";
import DropDownList from "./common/DropDownList";

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
          <div className="row" style={{ marginTop: "100px" }} id="row-id">
            <div className="col">
              <DropDownList
                name={"ddlTab_cm"}
                label={"Select"}
                options={options}
                handleChange={this.handleTabChange}
                error={null}
                selectedItem={selectedTab.name}
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
                    items={[
                      { id: 1, name: "Manage Products" },
                      { id: 2, name: "Manage Categories" },
                      { id: 3, name: "Manage Purchases" },
                      { id: 4, name: "Manage Carts" },
                      { id: 5, name: "Manage Users" },
                    ]}
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
