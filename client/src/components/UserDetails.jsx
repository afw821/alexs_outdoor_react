import React, { Component } from "react";
import { getUserById } from "../services/userService";
import AccountInfo from "./AccountInfo";
import ListItem from "./common/ListItem";
import OrderInfo from "./OrderInfo";

class UserDetails extends Component {
  state = {
    showAccountInfoRow: true,
    selectedTab: "My Account",
    showEditBtn: true,
  };

  handleTabChange = (item) => {
    this.setState({ selectedTab: item });
  };

  handleEditClick = (e) => {
    this.setState({
      showAccountInfoRow: false,
      showEditBtn: false,
    });
  };

  handleCancelClick = (e) => {
    this.setState({
      showAccountInfoRow: true,
      showEditBtn: true,
    });
  };

  handleUserUpdate = (e) => {
    this.setState({
      showAccountInfoRow: true,
      showEditBtn: true,
    });
  };

  render() {
    const { selectedTab, showAccountInfoRow, showEditBtn } = this.state;
    return (
      <div className="row" style={{ marginTop: "125px" }}>
        <div className="col-3">
          <ListItem
            selectedTab={selectedTab}
            handleChange={this.handleTabChange}
            items={["My Account", "Orders"]}
          />
        </div>
        <div className="col-7">
          <div className="jumbotron">
            <div className="row">
              <div className="col d-flex justify-content-center">
                <h5>My Account</h5>
              </div>
            </div>
            <div className="row">
              <div className="col">
                {selectedTab === "My Account" ? (
                  <AccountInfo
                    handleUserUpdate={this.handleUserUpdate}
                    handleCancelClick={this.handleCancelClick}
                    showAccountInfoRow={showAccountInfoRow}
                    user={this.props.user}
                  />
                ) : (
                  <OrderInfo user={this.props.user} />
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-4"></div>
              <div className="col">
                {selectedTab === "My Account" && showEditBtn ? (
                  <button
                    onClick={(e) => this.handleEditClick(e)}
                    className="btn btn-info"
                  >
                    Edit
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserDetails;
