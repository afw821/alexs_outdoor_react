import React, { useEffect, useState } from "react";
import { getUserById } from "../services/userService";
import AccountInfo from "./AccountInfo";
import ListItem from "./common/ListItem";
import OrderInfo from "./OrderInfo";

const UserDetails = (props) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const userId = props.match.params.id;
    getUserById(userId)
      .then((data) => {
        const { data: user } = data;
        setUser(user);
      })
      .catch((ex) => {
        console.log("There was an error finding the user", ex);
      });
  }, []);
  //Because navbar position is fixed and its underneath navbar
  return (
    <div className="row" style={{ marginTop: "125px" }}>
      <div className="col-3">
        <ListItem items={["My Account", "Orders"]} />
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
              <AccountInfo user={user} />
              <OrderInfo user={user} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
