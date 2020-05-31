import React, { useEffect, useState, useContext } from "react";
import { getUserById } from "../services/userService";
import AccountInfo from "./AccountInfo";
import ListItem from "./common/ListItem";
import OrderInfo from "./OrderInfo";

const UserDetails = (props) => {
  const [selectedTab, setTab] = useState("My Account");
  const handleTabChange = (item) => {
    setTab(item);
  };
  //Because navbar position is fixed and its underneath navbar
  return (
    <div className="row" style={{ marginTop: "125px" }}>
      <div className="col-3">
        <ListItem
          selectedTab={selectedTab}
          handleChange={handleTabChange}
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
                <AccountInfo user={props.user} />
              ) : (
                  <OrderInfo user={props.user} />
                )}
            </div>

          </div>

          <div className="row">
            <div className="col-4"></div>
            <div className="col">
              {selectedTab === "My Account" ? <button className="btn btn-info">Edit</button> : ""}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
