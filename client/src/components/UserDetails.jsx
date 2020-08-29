import React, { Component } from "react";
import AccountInfo from "./AccountInfo";
import ListItem from "./common/ListItem";
import OrderInfo from "./OrderInfo";
import { Link } from "react-router-dom";
import DropDownBtn from "./common/DropDownBtn";

class UserDetails extends Component {
  state = {
    showAccountInfoRow: true,
    selectedTab: { id: 1, name: "My Account" },
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

  getStyle = (clientWidth) => {
    if (clientWidth < 791 && clientWidth > 560)
      return { margin: "0px 10% 0px 10%" };
    else if (clientWidth > 791) return { "": "" };
    else return { margin: "0px 15% 0px 5%" };
  };

  render() {
    const { selectedTab, showAccountInfoRow, showEditBtn } = this.state;
    const { user, clientWidth } = this.props;
    const options = [
      { id: 1, name: "My Account" },
      { id: 2, name: "Orders" },
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
        <div className="row" style={{ marginTop: "125px" }}>
          {clientWidth > 791 && (
            <div className="col-2">
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
          <div
            className={clientWidth > 791 ? "col-10 form-padding" : "col-12"}
            style={this.getStyle(clientWidth)}
          >
            <div className="row">
              <div className="col">
                <div className="jumbotron form-width-my-account">
                  <div className="row">
                    <div className="col d-flex justify-content-center">
                      <h5>My Account</h5>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      {selectedTab.name === "My Account" ? (
                        <AccountInfo
                          handleUserUpdate={this.handleUserUpdate}
                          handleCancelClick={this.handleCancelClick}
                          showAccountInfoRow={showAccountInfoRow}
                          clientWidth={clientWidth}
                          user={user}
                        />
                      ) : (
                        <OrderInfo user={user} clientWidth={clientWidth} />
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col d-flex justify-content-center">
                      {selectedTab.name === "My Account" && showEditBtn ? (
                        <>
                          <button
                            onClick={(e) => this.handleEditClick(e)}
                            className={`btn btn-info ${
                              clientWidth < 791 ? "btn-sm" : ""
                            }`}
                          >
                            Edit
                          </button>
                          <Link to={`/updatePassword/${user.id}`}>
                            <button
                              className={`btn btn-info ${
                                clientWidth < 791 ? "btn-sm" : ""
                              }`}
                            >
                              {clientWidth < 791
                                ? "Update PW"
                                : "Update Password"}
                            </button>
                          </Link>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default UserDetails;
