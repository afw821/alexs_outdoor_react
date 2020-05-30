import React from "react";
import AccountInfoRow from "../components/common/AccountInfoRow";

const AccountInfo = (props) => {
  const user = props.user;
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
};

export default AccountInfo;
