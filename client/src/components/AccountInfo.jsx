import AccountInfoRow from "../components/common/AccountInfoRow";
import UserContext from "../context/userContext";
import React, { Component } from "react";
import { getUserById } from "../services/userService";

class AccountInfo extends Component {


  render() {
    const { user } = this.props;
    console.log('account info props user', user);
    return (
      <>
        <AccountInfoRow label="First Name" user={user.firstName} />
        <AccountInfoRow label="Last Name" user={user.lastName} />
        <AccountInfoRow label="Email" user={user.email} />
        <AccountInfoRow label="Address" user={user.address} />
        <AccountInfoRow label="Address 2" user={user.address2} />
        <AccountInfoRow label="City" user={user.city} />
        <AccountInfoRow label="State" user={user.state} />
        <AccountInfoRow label="Zip Code" user={user.zipCode} />
      </>
    );
  }
}

export default AccountInfo;
