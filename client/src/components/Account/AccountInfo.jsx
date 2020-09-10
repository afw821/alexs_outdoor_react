import AccountInfoRow from "./AccountInfoRow";
import React, { Component } from "react";
import { getUserById } from "../../services/userService";
import AccountEditForm from "./AccountEditForm";

class AccountInfo extends Component {
  render() {
    const {
      user,
      showAccountInfoRow,
      handleCancelClick,
      handleUserUpdate,
      clientWidth,
    } = this.props;
    if (showAccountInfoRow) {
      return (
        <div className="account-row-wrapper">
          <AccountInfoRow label="First Name" user={user.firstName} />
          <AccountInfoRow label="Last Name" user={user.lastName} />
          <AccountInfoRow label="Email" user={user.email} />
          <AccountInfoRow label="Address" user={user.address} />
          <AccountInfoRow label="Address 2" user={user.address2} />
          <AccountInfoRow label="City" user={user.city} />
          <AccountInfoRow label="State" user={user.state} />
          <AccountInfoRow label="Zip Code" user={user.zipCode} />
        </div>
      );
    } else {
      return (
        <div className="account-edit-wrapper">
          <AccountEditForm
            handleUserUpdate={handleUserUpdate}
            handleCancelClick={handleCancelClick}
            user={user}
            clientWidth={clientWidth}
          />
        </div>
      );
    }
  }
}

export default AccountInfo;
